import { eq, and, inArray } from "drizzle-orm";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const p = await db().query.content.findFirst({
    where: and(
      eq(schema.content.slug, getRouterParam(event, "slug") || ""),
      eq(schema.content.published, true),
      inArray(schema.content.kind, ["page", "legal"]),
    ),
  });
  return p
    ? {
        title: p.title,
        summary: p.summary,
        body: p.body,
        draft:
          p.kind === "legal" &&
          process.env.SITE_LEGAL_OPERATOR_CONFIGURED !== "true",
        eyebrow: p.kind === "legal" ? "Operator policy" : "Project information",
      }
    : null;
});
