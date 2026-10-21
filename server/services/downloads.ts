import { and, eq } from "drizzle-orm";
import { createError } from "h3";
import { db, schema as s } from "../utils/db";
export async function authorizedFile(
  user: { id: string; email: string },
  id: string,
) {
  const [r] = await db()
    .select({ file: s.files })
    .from(s.files)
    .innerJoin(s.versions, eq(s.versions.id, s.files.versionId))
    .innerJoin(s.entitlements, eq(s.entitlements.sku, s.versions.sku))
    .innerJoin(s.orders, eq(s.orders.id, s.entitlements.orderId))
    .where(
      and(
        eq(s.files.id, id),
        eq(s.files.scanStatus, "APPROVED"),
        eq(s.versions.published, true),
        eq(s.entitlements.active, true),
        eq(s.orders.status, "paid"),
        eq(s.orders.email, user.email),
      ),
    )
    .limit(1);
  if (!r)
    throw createError({
      statusCode: 404,
      statusMessage: "Download unavailable",
    });
  return r.file;
}
