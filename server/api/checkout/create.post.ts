import { z } from "zod";
import { eq } from "drizzle-orm";
import { body } from "../../utils/validation";
import { db, schema } from "../../utils/db";
import { token, hash } from "../../utils/crypto";
import { checkoutProduct } from "../../services/eligibility";
import { createProviderCheckout } from "../../services/payment-provider";
export default defineEventHandler(async (event) => {
  const { sku } = await body(
    event,
    z.object({ sku: z.string().max(40) }).strict(),
  );
  const { p, skus } = await checkoutProduct(sku),
    raw = token();
  const [checkout] = await db()
    .insert(schema.checkouts)
    .values({
      sku,
      tokenHash: hash(raw),
      snapshot: {
        sku,
        title: p.title,
        license: p.license,
        priceCents: p.priceCents,
        currency: p.currency,
        variantId: p.variantId,
        skus,
      },
    })
    .returning();
  const result = await createProviderCheckout(
    p.variantId!,
    checkout!.id,
    raw,
    p.priceCents!,
    p.currency,
  );
  await db()
    .update(schema.checkouts)
    .set({ providerId: result.id })
    .where(eq(schema.checkouts.id, checkout!.id));
  return { url: result.url };
});
