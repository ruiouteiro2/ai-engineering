import { z } from "zod";
import { eq } from "drizzle-orm";
import { requireUser } from "../../../services/auth";
import { db, schema as s } from "../../../utils/db";
import { body } from "../../../utils/validation";
import { hash } from "../../../utils/crypto";
import { readFileBytes } from "../../../services/storage";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin"]),
    id = getRouterParam(event, "id") || "",
    input = await body(
      event,
      z
        .object({
          status: z.enum(["APPROVED", "REJECTED"]),
          sha256: z.string().regex(/^[a-f0-9]{64}$/),
          reviewNote: z.string().min(20).max(1000),
        })
        .strict(),
    );
  if (!z.uuid().safeParse(id).success)
    throw createError({ statusCode: 404, statusMessage: "Resource not found" });
  const f = await db().query.files.findFirst({ where: eq(s.files.id, id) });
  if (
    !f ||
    f.sha256 !== input.sha256 ||
    hash(await readFileBytes(f.key)) !== f.sha256
  )
    throw createError({
      statusCode: 409,
      statusMessage: "Asset integrity check failed",
    });
  await db().transaction(async (tx) => {
    await tx
      .update(s.files)
      .set({ scanStatus: input.status })
      .where(eq(s.files.id, id));
    await tx.insert(s.audit).values({
      actorId: u.id,
      action: "file.review",
      entity: id,
      detail: {
        status: input.status,
        note: input.reviewNote,
        sha256: f.sha256,
      },
    });
  });
  return { ok: true };
});
