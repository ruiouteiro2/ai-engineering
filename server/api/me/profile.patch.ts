import { z } from "zod";
import { eq } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema } from "../../utils/db";
import { body } from "../../utils/validation";
export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  const input = await body(
    event,
    z
      .object({
        name: z.string().trim().max(100),
        preferences: z.object({ updates: z.boolean() }).optional(),
      })
      .strict(),
  );
  await db()
    .update(schema.users)
    .set(input)
    .where(eq(schema.users.id, user.id));
  return { ok: true };
});
