import { and, eq, gt } from "drizzle-orm";
import { db, schema } from "../../utils/db";
import { hash } from "../../utils/crypto";
export default defineEventHandler(async (event) => {
  const raw = String(getQuery(event).token || "");
  if (!/^[a-f0-9]{64}$/.test(raw)) return { status: "pending" };
  const c = await db().query.checkouts.findFirst({
    where: and(
      eq(schema.checkouts.tokenHash, hash(raw)),
      gt(schema.checkouts.createdAt, new Date(Date.now() - 86400_000)),
    ),
  });
  if (!c) return { status: "pending" };
  const o = await db().query.orders.findFirst({
    where: eq(schema.orders.checkoutId, c.id),
  });
  return { status: o?.status || "pending" };
});
