import { z } from "zod";
import { requireUser } from "../../../services/auth";
import { db, schema as s } from "../../../utils/db";
import { body } from "../../../utils/validation";
export const legalSlugs = [
  "privacy",
  "terms",
  "terms-of-sale",
  "refund-policy",
  "imprint",
  "licensing",
];
export const contentInput = z
  .object({
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .max(150),
    kind: z.enum(["article", "guide", "help", "page", "legal"]),
    title: z.string().min(3).max(180),
    summary: z.string().min(10).max(500),
    body: z.string().min(20).max(50000),
    published: z.boolean(),
  })
  .strict();
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin", "editor"]),
    input = await body(event, contentInput);
  if (
    (input.kind === "legal" || legalSlugs.includes(input.slug)) &&
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
  return db().transaction(async (tx) => {
    const [r] = await tx.insert(s.content).values(input).returning();
    await tx
      .insert(s.audit)
      .values({ actorId: u.id, action: "content.create", entity: r!.id });
    return r;
  });
});
