import { eq, sql } from "drizzle-orm";
import { db, schema } from "../../../utils/db";
import { requireUser } from "../../../services/auth";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin"]);
  const sku = getRouterParam(event, "sku") || "";
  await db().transaction(async (tx) => {
    await tx
      .update(schema.products)
      .set({
        status: "ARCHIVED",
        purchasable: false,
        visible: false,
        revision: sql`${schema.products.revision}+1`,
      })
      .where(eq(schema.products.sku, sku));
    await tx
      .insert(schema.audit)
      .values({ actorId: u.id, action: "product.archive", entity: sku });
  });
  return { ok: true };
});
