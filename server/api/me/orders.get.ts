import { eq, desc, sql } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  return db()
    .select({
      id: schema.orders.id,
      receiptAvailable: sql<boolean>`${schema.orders.providerId} ~ '^[0-9]+$'`,
      status: schema.orders.status,
      total: schema.orders.total,
      currency: schema.orders.currency,
      snapshot: schema.orders.snapshot,
      testMode: schema.orders.testMode,
      createdAt: schema.orders.createdAt,
    })
    .from(schema.orders)
    .where(eq(schema.orders.email, user.email))
    .orderBy(desc(schema.orders.createdAt));
});
