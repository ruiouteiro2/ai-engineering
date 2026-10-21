import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";
import { requireUser } from "../../../services/auth";
import { db, schema as s } from "../../../utils/db";
import { body } from "../../../utils/validation";
import { contentInput, legalSlugs } from "./index.post";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin", "editor"]),
    id = getRouterParam(event, "id") || "",
    { revision, ...input } = await body(
      event,
      contentInput.extend({ revision: z.number().int().positive() }),
    );
  return db().transaction(async (tx) => {
    const old = await tx.query.content.findFirst({
      where: eq(s.content.id, id),
    });
    if (
      (old?.kind === "legal" ||
        input.kind === "legal" ||
        legalSlugs.includes(input.slug)) &&
      u.role !== "admin"
    )
      throw createError({
        statusCode: 403,
        statusMessage: "Legal editing requires an administrator",
      });
    if (legalSlugs.includes(input.slug) && input.kind !== "legal")
      throw createError({
        statusCode: 422,
        statusMessage: "Policy routes require legal content",
      });
    const [r] = await tx
      .update(s.content)
      .set({
        ...input,
        revision: sql`${s.content.revision}+1`,
        updatedAt: new Date(),
      })
      .where(and(eq(s.content.id, id), eq(s.content.revision, revision)))
      .returning();
    if (!r)
      throw createError({
        statusCode: 409,
        statusMessage: "Content changed. Reload and review before saving.",
      });
    await tx.insert(s.audit).values({
      actorId: u.id,
      action: "content.update",
      entity: id,
      detail: { revision: r.revision },
    });
    return r;
  });
});
