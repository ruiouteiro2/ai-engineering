import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { createError } from "h3";
import { db, schema as s } from "../utils/db";
import { hash, verifySignature } from "../utils/crypto";
import { config } from "../utils/config";
import { lemonRequest } from "./payment-provider";
export const orderAttributes = z
  .object({
    store_id: z.union([z.string(), z.number()]),
    user_email: z.email().transform((v) => v.toLowerCase()),
    status: z.enum([
      "pending",
      "failed",
      "paid",
      "refunded",
      "partial_refund",
      "fraudulent",
    ]),
    total: z.number().int().nonnegative(),
    currency: z.string().regex(/^[A-Z]{3}$/),
    test_mode: z.boolean(),
    updated_at: z.iso.datetime({ offset: true }),
    first_order_item: z.object({
      variant_id: z.union([z.string(), z.number()]),
      quantity: z.number().int().positive().optional(),
    }),
  })
  .passthrough();
const webhookSchema = z.object({
  meta: z
    .object({
      event_name: z.string().max(80),
      custom_data: z.object({ checkout_id: z.uuid() }).optional(),
    })
    .passthrough(),
  data: z.object({
    id: z.union([z.string(), z.number()]),
    type: z.literal("orders"),
    attributes: orderAttributes,
  }),
});
export async function processPayment(raw: Buffer, signature: string) {
  if (
    !verifySignature(
      raw,
      signature,
      process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "",
    )
  )
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid webhook signature",
    });
  let value: unknown;
  try {
    value = JSON.parse(raw.toString("utf8"));
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid JSON" });
  }
  const parsed = webhookSchema.safeParse(value);
  if (!parsed.success)
    throw createError({
      statusCode: 422,
      statusMessage: "Unsupported payment event",
    });
  const event = parsed.data,
    fingerprint = hash(raw),
    providerId = String(event.data.id);
  if (!["order_created", "order_refunded"].includes(event.meta.event_name))
    throw createError({
      statusCode: 422,
      statusMessage: "Unsupported payment event",
    });
  let attrs = event.data.attributes;
  const c = config();
  if (c.payment === "lemonsqueezy") {
    if (!/^\d+$/.test(providerId))
      throw createError({
        statusCode: 422,
        statusMessage: "Invalid provider resource",
      });
    const remote = await lemonRequest(`orders/${providerId}`);
    attrs = orderAttributes.parse(remote.data.attributes);
  } else if (
    c.payment !== "mock" ||
    !c.local ||
    !providerId.startsWith("mock-")
  )
    throw createError({
      statusCode: 403,
      statusMessage: "Payment environment mismatch",
    });
  if (
    attrs.test_mode !==
      (c.payment === "mock" || process.env.LEMONSQUEEZY_MODE === "test") ||
    String(attrs.store_id) !==
      (c.payment === "mock" ? "mock" : process.env.LEMONSQUEEZY_STORE_ID)
  )
    throw createError({
      statusCode: 403,
      statusMessage: "Payment environment mismatch",
    });
  return db().transaction(async (tx) => {
    // Serialize different notifications for the same provider order as well as identical payloads.
    await tx.execute(
      sql`select pg_advisory_xact_lock(hashtext(${providerId}))`,
    );
    const existingEvent = await tx.query.paymentEvents.findFirst({
      where: eq(s.paymentEvents.hash, fingerprint),
    });
    if (existingEvent) return { ok: true, duplicate: true };
    const existing = await tx.query.orders.findFirst({
      where: eq(s.orders.providerId, providerId),
    });
    const checkoutId =
      existing?.checkoutId || event.meta.custom_data?.checkout_id;
    const checkout = checkoutId
      ? await tx.query.checkouts.findFirst({
          where: eq(s.checkouts.id, checkoutId),
        })
      : undefined;
    if (
      !checkout ||
      String(checkout.snapshot.variantId) !==
        String(attrs.first_order_item.variant_id)
    ) {
      await tx.insert(s.paymentEvents).values({
        hash: fingerprint,
        event: event.meta.event_name,
        providerId,
        status: "HELD",
        reason: "Checkout or variant mapping requires reconciliation",
      });
      return { ok: true, held: true };
    }
    if (existing && new Date(attrs.updated_at) < existing.providerUpdatedAt) {
      await tx.insert(s.paymentEvents).values({
        hash: fingerprint,
        event: event.meta.event_name,
        providerId,
        status: "STALE",
      });
      return { ok: true, stale: true };
    }
    // Terminal revocation is monotonic; partial refunds require operator reconciliation and conservatively hold access.
    const terminal = ["refunded", "fraudulent", "partial_refund"];
    const status =
      existing && terminal.includes(existing.status) && attrs.status === "paid"
        ? existing.status
        : attrs.status;
    const [order] = await tx
      .insert(s.orders)
      .values({
        providerId,
        email: attrs.user_email,
        status,
        total: attrs.total,
        currency: attrs.currency,
        testMode: attrs.test_mode,
        checkoutId: checkout.id,
        snapshot: checkout.snapshot,
        providerUpdatedAt: new Date(attrs.updated_at),
      })
      .onConflictDoUpdate({
        target: s.orders.providerId,
        set: { status, providerUpdatedAt: new Date(attrs.updated_at) },
      })
      .returning();
    if (existing && existing.email !== attrs.user_email)
      throw createError({
        statusCode: 409,
        statusMessage: "Order identity requires reconciliation",
      });
    for (const sku of checkout.snapshot.skus as string[])
      await tx
        .insert(s.entitlements)
        .values({ orderId: order!.id, sku, active: status === "paid" })
        .onConflictDoUpdate({
          target: [s.entitlements.orderId, s.entitlements.sku],
          set: { active: status === "paid" },
        });
    await tx.insert(s.paymentEvents).values({
      hash: fingerprint,
      event: event.meta.event_name,
      providerId,
      status: "PROCESSED",
    });
    if (status === "paid")
      await tx
        .insert(s.emailJobs)
        .values({
          dedupeKey: "order-" + order!.id,
          recipient: attrs.user_email,
          subject: "Your AI Engineering library access",
          message: `Your ${attrs.test_mode ? "test " : ""}order has been verified. Sign in with this email address to access your files: ${c.baseUrl}/account/sign-in`,
        })
        .onConflictDoNothing();
    return { ok: true, orderId: order!.id };
  });
}
