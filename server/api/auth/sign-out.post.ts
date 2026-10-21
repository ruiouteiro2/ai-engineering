import { eq } from "drizzle-orm";
import { db, schema } from "../../utils/db";
import { hash } from "../../utils/crypto";
export default defineEventHandler(async (event) => {
  const raw = getCookie(event, "ae_session");
  if (raw)
    await db()
      .delete(schema.sessions)
      .where(eq(schema.sessions.hash, hash(raw)));
  deleteCookie(event, "ae_session", { path: "/" });
  return { ok: true };
});
