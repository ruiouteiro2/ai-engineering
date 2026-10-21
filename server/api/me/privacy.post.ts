import { z } from "zod";
import { requireUser } from "../../services/auth";
import { db, schema } from "../../utils/db";
import { body } from "../../utils/validation";
export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  const input = await body(
    event,
    z.object({ type: z.enum(["EXPORT", "DELETE"]) }).strict(),
  );
  const [request] = await db()
    .insert(schema.privacyRequests)
    .values({ userId: user.id, type: input.type })
    .returning({ id: schema.privacyRequests.id });
  return { ok: true, id: request!.id };
});
