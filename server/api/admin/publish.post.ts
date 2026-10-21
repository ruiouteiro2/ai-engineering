import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, schema as s } from "../../utils/db";
import { requireUser } from "../../services/auth";
import { body } from "../../utils/validation";
import { deliverableSkus } from "../../services/eligibility";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin"]),
    input = await body(
      event,
      z
        .object({
          sku: z.string().max(40),
          revision: z.number().int(),
          reviewed: z.literal(true),
        })
        .strict(),
    );
  return db().transaction(async (tx) => {
    const [p] = await tx
      .select()
      .from(s.products)
      .where(eq(s.products.sku, input.sku))
      .for("update");
    if (!p || p.revision !== input.revision)
      throw createError({
        statusCode: 409,
        statusMessage: "Reload the current product revision",
      });
    if (
      (p.priceCents !== null && p.priceCents > 0 && !p.variantId) ||
      p.priceCents === null ||
      p.license === "TO_DEFINE"
    )
      throw createError({
        statusCode: 409,
        statusMessage:
          "Price, provider mapping and reviewed license are required",
      });
    await tx
      .update(s.products)
      .set({ reviewed: true })
      .where(eq(s.products.sku, p.sku));
    await deliverableSkus(p.sku, tx);
    await tx
      .update(s.products)
      .set({
        status: "PUBLISHED",
        purchasable: p.priceCents > 0,
        revision: p.revision + 1,
      })
      .where(eq(s.products.sku, p.sku));
    await tx.insert(s.audit).values({
      actorId: u.id,
      action: "product.publish",
      entity: p.sku,
      detail: { revision: p.revision + 1 },
    });
    return { ok: true };
  });
});
