import { releaseGates } from "../../services/release-gates";
import { sql, eq } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema as s } from "../../utils/db";
export default defineEventHandler(async (event) => {
  await requireUser(event, ["admin", "editor", "support"]);
  const [p, o, t] = await Promise.all([
    db()
      .select({ count: sql<number>`count(*)::int` })
      .from(s.products),
    db()
      .select({ count: sql<number>`count(*)::int` })
      .from(s.orders),
    db()
      .select({ count: sql<number>`count(*)::int` })
      .from(s.support)
      .where(eq(s.support.status, "OPEN")),
  ]);
  return {
    products: p[0]!.count,
    orders: o[0]!.count,
    openSupport: t[0]!.count,
    paymentMode: process.env.PAYMENT_PROVIDER || "mock",
    liveSelling:
      process.env.SITE_LIVE_PAYMENTS_ENABLED === "true" &&
      (await releaseGates()).every((g) => g.passed),
  };
});
