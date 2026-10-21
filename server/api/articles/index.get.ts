import { and, eq, desc } from "drizzle-orm";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const kind = String(getQuery(event).kind || "article");
  return db()
    .select()
    .from(schema.content)
    .where(
      and(eq(schema.content.published, true), eq(schema.content.kind, kind)),
    )
    .orderBy(desc(schema.content.updatedAt));
});
