import { sql } from "drizzle-orm";
import { db } from "../utils/db";
export default defineEventHandler(async () => {
  try {
    await db().execute(sql`select 1`);
    return { status: "ok" };
  } catch {
    throw createError({
      statusCode: 503,
      statusMessage: "Service temporarily unavailable",
    });
  }
});
