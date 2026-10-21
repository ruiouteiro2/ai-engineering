import { z } from "zod";
import { eq } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema as s } from "../../utils/db";
import { body } from "../../utils/validation";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin", "support"]),
    input = await body(
      event,
      z
        .object({
          kind: z.enum(["support", "privacy"]),
          id: z.uuid(),
          status: z.enum(["OPEN", "IN_REVIEW", "COMPLETE", "REJECTED"]),
          notes: z.string().max(1000).default(""),
        })
        .strict(),
    );
  if (input.kind === "privacy" && u.role !== "admin")
    throw createError({
      statusCode: 403,
      statusMessage: "Administrator required",
    });
  await db().transaction(async (tx) => {
    if (input.kind === "support")
      await tx
        .update(s.support)
        .set({ status: input.status })
        .where(eq(s.support.id, input.id));
    else
      await tx
        .update(s.privacyRequests)
        .set({ status: input.status, notes: input.notes })
        .where(eq(s.privacyRequests.id, input.id));
    await tx.insert(s.audit).values({
      actorId: u.id,
      action: input.kind + ".status",
      entity: input.id,
      detail: { status: input.status, notes: input.notes },
    });
  });
  return { ok: true };
});
