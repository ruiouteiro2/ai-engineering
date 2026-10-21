import { asc } from "drizzle-orm";
import { requireUser } from "../../../services/auth";
import { db, schema } from "../../../utils/db";
export default defineEventHandler(async (event) => {
  await requireUser(event, ["admin", "editor"]);
  return db().select().from(schema.products).orderBy(asc(schema.products.sku));
});
