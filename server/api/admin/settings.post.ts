import { z } from "zod";
import { requireUser } from "../../services/auth";
import { db, schema as s } from "../../utils/db";
import { body } from "../../utils/validation";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin"]);
  const input = await body(
    event,
    z
      .object({
        brandName: z.string().min(3).max(100),
        brandShortName: z.string().min(3).max(40),
        contactEmail: z.union([z.email(), z.literal("")]),
        operatorName: z.string().max(200),
        operatorCountry: z.string().max(100),
      })
      .strict(),
  );
  await db().transaction(async (tx) => {
    await tx
      .insert(s.settings)
      .values({ key: "site", value: input })
      .onConflictDoUpdate({ target: s.settings.key, set: { value: input } });
    await tx.insert(s.audit).values({
      actorId: u.id,
      action: "settings.update",
      entity: "site",
      detail: { fields: Object.keys(input) },
    });
  });
  return { ok: true };
});
