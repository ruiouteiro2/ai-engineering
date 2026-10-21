import { eq } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  return db()
    .select()
    .from(schema.privacyRequests)
    .where(eq(schema.privacyRequests.userId, user.id));
});
