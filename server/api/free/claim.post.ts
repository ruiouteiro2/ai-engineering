import { z } from "zod";
import { eq } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema as s } from "../../utils/db";
import { body } from "../../utils/validation";
import { deliverableSkus } from "../../services/eligibility";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event),
    { sku } = await body(event, z.object({ sku: z.string().max(40) }).strict());
  return db().transaction(async (tx) => {
    const p = await tx.query.products.findFirst({
      where: eq(s.products.sku, sku),
    });
    if (!p || p.status !== "PUBLISHED" || p.priceCents !== 0 || !p.visible)
      throw createError({
        statusCode: 409,
        statusMessage: "This free resource is not ready",
      });
    const skus = await deliverableSkus(sku, tx);
    const [order] = await tx
      .insert(s.orders)
      .values({
        providerId: `free-${u.id}-${sku}`,
        email: u.email,
        status: "paid",
        total: 0,
        currency: p.currency,
        testMode: false,
        snapshot: {
          sku,
          title: p.title,
          license: p.license,
          skus,
          fulfillment: "free",
        },
        providerUpdatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: s.orders.providerId,
        set: { providerId: `free-${u.id}-${sku}` },
      })
      .returning();
    for (const granted of skus)
      await tx
        .insert(s.entitlements)
        .values({ orderId: order!.id, sku: granted, active: true })
        .onConflictDoNothing();
    return { ok: true, url: "/account/library" };
  });
});
