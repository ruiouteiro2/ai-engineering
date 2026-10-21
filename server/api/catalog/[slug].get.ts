import { eq, and, desc } from "drizzle-orm";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const p = await db().query.products.findFirst({
    where: and(
      eq(schema.products.slug, getRouterParam(event, "slug") || ""),
      eq(schema.products.visible, true),
    ),
  });
  if (!p)
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  const safe = {
    sku: p.sku,
    slug: p.slug,
    title: p.title,
    type: p.type,
    tier: p.tier,
    description: p.description,
    status: p.status,
    visible: p.visible,
    purchasable: p.purchasable,
    cover: p.cover,
    data: p.data,
    license: p.license,
    priceCents: p.priceCents,
    currency: p.currency,
    revision: p.revision,
  };
  const releases = await db()
    .select({
      id: schema.versions.id,
      version: schema.versions.version,
      notes: schema.versions.notes,
      compatibility: schema.versions.compatibility,
    })
    .from(schema.versions)
    .where(
      and(eq(schema.versions.sku, p.sku), eq(schema.versions.published, true)),
    )
    .orderBy(desc(schema.versions.createdAt));
  return { ...safe, releases };
});
