import { z } from "zod";
import { eq } from "drizzle-orm";
import { requireUser } from "../../../services/auth";
import { db, schema as s } from "../../../utils/db";
import { body } from "../../../utils/validation";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin"]),
    id = getRouterParam(event, "id") || "",
    input = await body(event, z.object({ published: z.boolean() }).strict());
  if (!z.uuid().safeParse(id).success)
    throw createError({ statusCode: 404, statusMessage: "Resource not found" });
  await db().transaction(async (tx) => {
    const files = await tx
      .select()
      .from(s.files)
      .where(eq(s.files.versionId, id));
    if (
      input.published &&
      (!files.length || files.some((f) => f.scanStatus !== "APPROVED"))
    )
      throw createError({
        statusCode: 409,
        statusMessage: "All version files must pass review before publication",
      });
    await tx.update(s.versions).set(input).where(eq(s.versions.id, id));
    await tx.insert(s.audit).values({
      actorId: u.id,
      action: "version.publish",
      entity: id,
      detail: input,
    });
  });
  return { ok: true };
});
