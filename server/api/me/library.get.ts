import { eq, and } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema as s } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event);
  return db()
    .selectDistinct({
      fileId: s.files.id,
      name: s.files.name,
      size: s.files.size,
      sha256: s.files.sha256,
      sku: s.products.sku,
      title: s.products.title,
      cover: s.products.cover,
      version: s.versions.version,
      license: s.orders.snapshot,
    })
    .from(s.entitlements)
    .innerJoin(s.orders, eq(s.orders.id, s.entitlements.orderId))
    .innerJoin(s.products, eq(s.products.sku, s.entitlements.sku))
    .innerJoin(s.versions, eq(s.versions.sku, s.products.sku))
    .innerJoin(s.files, eq(s.files.versionId, s.versions.id))
    .where(
      and(
        eq(s.orders.email, u.email),
        eq(s.orders.status, "paid"),
        eq(s.entitlements.active, true),
        eq(s.versions.published, true),
        eq(s.files.scanStatus, "APPROVED"),
      ),
    );
});
