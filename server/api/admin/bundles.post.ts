import { z } from "zod";
import { eq, inArray } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema as s } from "../../utils/db";
import { body } from "../../utils/validation";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin"]),
    input = await body(
      event,
      z
        .object({
          bundleSku: z.string().max(40),
          items: z.array(z.string().max(40)).min(1).max(83),
        })
        .strict(),
    );
  await db().transaction(async (tx) => {
    const p = await tx.query.products.findFirst({
      where: eq(s.products.sku, input.bundleSku),
    });
    if (
      p?.type !== "BUNDLE" ||
      p.status === "PUBLISHED" ||
      input.items.includes(input.bundleSku)
    )
      throw createError({
        statusCode: 409,
        statusMessage: "Edit only an unpublished bundle",
      });
    const children = await tx
      .select()
      .from(s.products)
      .where(inArray(s.products.sku, input.items));
    if (
      children.length !== new Set(input.items).size ||
      children.some((c) => c.type === "BUNDLE")
    )
      throw createError({
        statusCode: 422,
        statusMessage: "Choose valid individual product SKUs",
      });
    await tx
      .delete(s.bundleItems)
      .where(eq(s.bundleItems.bundleSku, input.bundleSku));
    await tx.insert(s.bundleItems).values(
      [...new Set(input.items)].map((itemSku) => ({
        bundleSku: input.bundleSku,
        itemSku,
      })),
    );
    await tx.insert(s.audit).values({
      actorId: u.id,
      action: "bundle.update",
      entity: input.bundleSku,
      detail: { items: input.items },
    });
  });
  return { ok: true };
});
