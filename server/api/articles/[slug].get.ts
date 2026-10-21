import { and, eq } from "drizzle-orm";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const p = await db().query.content.findFirst({
    where: and(
      eq(schema.content.slug, getRouterParam(event, "slug") || ""),
      eq(schema.content.published, true),
    ),
  });
  if (!p)
    throw createError({ statusCode: 404, statusMessage: "Article not found" });
  return p;
});
