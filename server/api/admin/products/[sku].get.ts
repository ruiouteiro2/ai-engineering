import { eq } from "drizzle-orm";
import { requireUser } from "../../../services/auth";
import { db, schema as s } from "../../../utils/db";
export default defineEventHandler(async (event) => {
  await requireUser(event, ["admin", "editor"]);
  const sku = getRouterParam(event, "sku") || "";
  const p = await db().query.products.findFirst({
    where: eq(s.products.sku, sku),
  });
  if (!p)
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  const versions = await db()
    .select()
    .from(s.versions)
    .where(eq(s.versions.sku, sku));
  const files = await db()
    .select({
      id: s.files.id,
      versionId: s.files.versionId,
      name: s.files.name,
      size: s.files.size,
      sha256: s.files.sha256,
      scanStatus: s.files.scanStatus,
    })
    .from(s.files)
    .innerJoin(s.versions, eq(s.versions.id, s.files.versionId))
    .where(eq(s.versions.sku, sku));
  const bundleItems = await db()
    .select()
    .from(s.bundleItems)
    .where(eq(s.bundleItems.bundleSku, sku));
  return { ...p, versions, files, bundleItems };
});
