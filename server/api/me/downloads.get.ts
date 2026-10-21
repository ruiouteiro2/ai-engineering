import { eq, desc } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema as s } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event);
  return db()
    .select({
      id: s.downloads.id,
      fileId: s.files.id,
      name: s.files.name,
      createdAt: s.downloads.createdAt,
    })
    .from(s.downloads)
    .innerJoin(s.files, eq(s.files.id, s.downloads.fileId))
    .where(eq(s.downloads.userId, u.id))
    .orderBy(desc(s.downloads.createdAt))
    .limit(100);
});
