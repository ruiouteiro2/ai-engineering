import { eq } from "drizzle-orm";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async () => {
  const s = await db().query.settings.findFirst({
    where: eq(schema.settings.key, "site"),
  });
  const value = (s?.value || {}) as Record<string, string>;
  return {
    brandName:
      value.brandName ||
      process.env.BRAND_NAME ||
      "AI Engineering Mastery System",
    brandShortName: value.brandShortName || "AI Engineering",
    contactEmail: value.contactEmail || null,
  };
});
