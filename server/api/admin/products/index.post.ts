import { z } from "zod";
import { db, schema } from "../../../utils/db";
import { requireUser } from "../../../services/auth";
import { body } from "../../../utils/validation";
import { productInput } from "../../../services/product-editor";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin", "editor"]);
  const input = await body(
    event,
    productInput.extend({
      sku: z
        .string()
        .regex(/^[A-Z0-9-]+$/)
        .max(40),
    }),
  );
  return db().transaction(async (tx) => {
    const [p] = await tx
      .insert(schema.products)
      .values({
        ...input,
        data: input.data as any,
        purchasable: false,
        reviewed: false,
      })
      .returning();
    await tx
      .insert(schema.audit)
      .values({ actorId: u.id, action: "product.create", entity: input.sku });
    return p;
  });
});
