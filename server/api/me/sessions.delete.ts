import { eq } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event);
  await db().delete(schema.sessions).where(eq(schema.sessions.userId, u.id));
  deleteCookie(event, "ae_session", { path: "/" });
  return { ok: true };
});
