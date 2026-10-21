import { eq } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event);
  return db()
    .select({
      createdAt: schema.sessions.createdAt,
      expiresAt: schema.sessions.expiresAt,
    })
    .from(schema.sessions)
    .where(eq(schema.sessions.userId, u.id));
});
