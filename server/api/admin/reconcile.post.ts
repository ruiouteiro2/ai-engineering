import { z } from "zod";
import { createHmac } from "node:crypto";
import { requireUser } from "../../services/auth";
import { body } from "../../utils/validation";
import { db, schema } from "../../utils/db";
import { lemonRequest } from "../../services/payment-provider";
import { processPayment } from "../../services/payments";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin"]);
  const input = await body(
    event,
    z
      .object({ providerId: z.string().regex(/^\d+$/), checkoutId: z.uuid() })
      .strict(),
  );
  if (process.env.PAYMENT_PROVIDER !== "lemonsqueezy")
    throw createError({
      statusCode: 409,
      statusMessage:
        "Reconciliation requires a configured Lemon Squeezy test account",
    });
  const remote = await lemonRequest("orders/" + input.providerId);
  const raw = Buffer.from(
    JSON.stringify({
      meta: {
        event_name:
          remote.data.attributes.status === "refunded"
            ? "order_refunded"
            : "order_created",
        custom_data: { checkout_id: input.checkoutId },
      },
      data: remote.data,
    }),
  );
  const signature = createHmac(
    "sha256",
    process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "",
  )
    .update(raw)
    .digest("hex");
  const result = await processPayment(raw, signature);
  await db()
    .insert(schema.audit)
    .values({
      actorId: u.id,
      action: "payment.reconcile",
      entity: input.providerId,
      detail: { checkoutId: input.checkoutId },
    });
  return result;
});
