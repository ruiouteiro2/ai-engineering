import { and, eq } from "drizzle-orm";
import { createError } from "h3";
import { db, schema as s } from "../utils/db";
export async function deliverableSkus(
  sku: string,
  conn: any = db(),
  seen = new Set<string>(),
): Promise<string[]> {
  if (seen.has(sku) || seen.size > 100)
    throw createError({
      statusCode: 409,
      statusMessage: "Invalid bundle composition",
    });
  seen.add(sku);
  const p = await conn.query.products.findFirst({
    where: eq(s.products.sku, sku),
  });
  if (!p || !p.reviewed || p.license === "TO_DEFINE" || !p.license.trim())
    throw createError({
      statusCode: 409,
      statusMessage: "Editorial and license review required",
    });
  if (p.type === "BUNDLE") {
    const items = await conn
      .select()
      .from(s.bundleItems)
      .where(eq(s.bundleItems.bundleSku, sku));
    if (!items.length)
      throw createError({
        statusCode: 409,
        statusMessage: "Bundle has no reviewed inclusions",
      });
    const out: string[] = [];
    for (const item of items) {
      const child = await conn.query.products.findFirst({
        where: eq(s.products.sku, item.itemSku),
      });
      if (child?.status !== "PUBLISHED")
        throw createError({
          statusCode: 409,
          statusMessage: "Every bundle component must be published",
        });
      out.push(...(await deliverableSkus(item.itemSku, conn, new Set(seen))));
    }
    return [...new Set(out)];
  }
  const files = await conn
    .select({ id: s.files.id })
    .from(s.files)
    .innerJoin(s.versions, eq(s.files.versionId, s.versions.id))
    .where(
      and(
        eq(s.versions.sku, sku),
        eq(s.versions.published, true),
        eq(s.files.scanStatus, "APPROVED"),
      ),
    );
  if (!files.length)
    throw createError({
      statusCode: 409,
      statusMessage: "An approved, published file is required",
    });
  return [sku];
}
export async function checkoutProduct(sku: string) {
  const p = await db().query.products.findFirst({
    where: eq(s.products.sku, sku),
  });
  if (
    !p ||
    p.status !== "PUBLISHED" ||
    !p.purchasable ||
    !p.visible ||
    !p.variantId ||
    p.priceCents === null ||
    p.priceCents < 1
  )
    throw createError({
      statusCode: 409,
      statusMessage: "This resource is not available for purchase",
    });
  const skus = await deliverableSkus(sku);
  return { p, skus };
}
