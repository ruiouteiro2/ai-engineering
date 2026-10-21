import { z } from "zod";
import { requireUser } from "../../../services/auth";
import { db, schema } from "../../../utils/db";
import { body } from "../../../utils/validation";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin", "editor"]);
  const input = await body(
    event,
    z
      .object({
        sku: z.string().max(40),
        version: z.string().regex(/^\d+\.\d+\.\d+$/),
        notes: z.string().min(10).max(5000),
        compatibility: z.string().min(3).max(1000),
      })
      .strict(),
  );
  return db().transaction(async (tx) => {
    const [v] = await tx.insert(schema.versions).values(input).returning();
    await tx
      .insert(schema.audit)
      .values({ actorId: u.id, action: "version.create", entity: v!.id });
    return v;
  });
});
