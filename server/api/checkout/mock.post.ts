import { z } from "zod";
import { eq, and, gt } from "drizzle-orm";
import { createHmac } from "node:crypto";
import { config } from "../../utils/config";
import { body } from "../../utils/validation";
import { hash } from "../../utils/crypto";
import { db, schema } from "../../utils/db";
import { processPayment } from "../../services/payments";
export default defineEventHandler(async (event) => {
  const c = config();
  if (!c.local || c.payment !== "mock")
    throw createError({ statusCode: 404, statusMessage: "Not found" });
  const input = await body(
    event,
    z
      .object({
        token: z.string().regex(/^[a-f0-9]{64}$/),
        email: z.email().max(254),
      })
      .strict(),
  );
  const checkout = await db().query.checkouts.findFirst({
    where: and(
      eq(schema.checkouts.tokenHash, hash(input.token)),
      gt(schema.checkouts.createdAt, new Date(Date.now() - 30 * 60_000)),
    ),
  });
  if (!checkout)
    throw createError({ statusCode: 410, statusMessage: "Checkout expired" });
  const raw = Buffer.from(
    JSON.stringify({
      meta: {
        event_name: "order_created",
        custom_data: { checkout_id: checkout.id },
      },
      data: {
        type: "orders",
        id: "mock-" + checkout.id,
        attributes: {
          store_id: "mock",
          user_email: input.email,
          status: "paid",
          total: checkout.snapshot.priceCents,
          currency: checkout.snapshot.currency,
          test_mode: true,
          updated_at: new Date().toISOString(),
          first_order_item: { variant_id: checkout.snapshot.variantId },
        },
      },
    }),
  );
  const sig = createHmac(
    "sha256",
    process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "",
  )
    .update(raw)
    .digest("hex");
  await processPayment(raw, sig);
  return { url: `/checkout/complete?token=${input.token}` };
});
