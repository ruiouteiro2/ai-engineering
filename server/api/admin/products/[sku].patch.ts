import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";
import { db, schema } from "../../../utils/db";
import { requireUser } from "../../../services/auth";
import { body } from "../../../utils/validation";
import { productInput } from "../../../services/product-editor";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin", "editor"]),
    sku = getRouterParam(event, "sku") || "";
  const { revision, ...input } = await body(
    event,
    productInput.extend({ revision: z.number().int().positive() }),
  );
  return db().transaction(async (tx) => {
    const [p] = await tx
      .update(schema.products)
      .set({
        ...input,
        data: input.data as any,
        purchasable: false,
        reviewed: false,
        revision: sql`${schema.products.revision}+1`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(schema.products.sku, sku),
          eq(schema.products.revision, revision),
        ),
      )
      .returning();
    if (!p)
      throw createError({
        statusCode: 409,
        statusMessage:
          "Another edit changed this product. Reload before saving.",
      });
    await tx.insert(schema.audit).values({
      actorId: u.id,
      action: "product.update",
      entity: sku,
      detail: { revision: p.revision },
    });
    return p;
  });
});
