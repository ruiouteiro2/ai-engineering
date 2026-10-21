import { and, eq, desc } from "drizzle-orm";
import { db, schema as s } from "../utils/db";
export default defineEventHandler(async () =>
  db()
    .select({
      sku: s.products.sku,
      title: s.products.title,
      slug: s.products.slug,
      type: s.products.type,
      version: s.versions.version,
      notes: s.versions.notes,
      compatibility: s.versions.compatibility,
      createdAt: s.versions.createdAt,
    })
    .from(s.versions)
    .innerJoin(s.products, eq(s.products.sku, s.versions.sku))
    .where(
      and(
        eq(s.versions.published, true),
        eq(s.products.visible, true),
        eq(s.products.status, "PUBLISHED"),
      ),
    )
    .orderBy(desc(s.versions.createdAt))
    .limit(100),
);
