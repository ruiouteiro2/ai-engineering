import { z } from "zod";
import { db, schema } from "../utils/db";
import { body } from "../utils/validation";
export default defineEventHandler(async (event) => {
  const input = await body(
    event,
    z.object({ analytics: z.boolean(), marketing: z.boolean() }).strict(),
  );
  await db()
    .insert(schema.consents)
    .values(
      Object.entries(input).map(([purpose, accepted]) => ({
        purpose,
        accepted,
        policyVersion: "draft-2026-10",
      })),
    );
  return { ok: true };
});
