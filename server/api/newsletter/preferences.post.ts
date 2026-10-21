import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, schema } from "../../utils/db";
import { body } from "../../utils/validation";
import { hash } from "../../utils/crypto";
export default defineEventHandler(async (event) => {
  const input = await body(
    event,
    z
      .object({
        token: z.string().regex(/^[a-f0-9]{64}$/),
        action: z.enum(["confirm", "unsubscribe"]),
        marketing: z.boolean().default(false),
      })
      .strict(),
  );
  return db().transaction(async (tx) => {
    const lead = await tx.query.leads.findFirst({
      where: eq(schema.leads.tokenHash, hash(input.token)),
    });
    if (!lead)
      throw createError({
        statusCode: 410,
        statusMessage:
          "This preference link has expired. Request a new subscription link.",
      });
    await tx
      .update(schema.leads)
      .set({
        confirmed: input.action === "confirm",
        marketing: input.action === "confirm" && input.marketing,
      })
      .where(eq(schema.leads.id, lead.id));
    if (input.action === "unsubscribe")
      await tx
        .delete(schema.waitlists)
        .where(eq(schema.waitlists.leadId, lead.id));
    await tx.insert(schema.consents).values({
      leadId: lead.id,
      purpose: "newsletter",
      accepted: input.action === "confirm" && input.marketing,
      policyVersion: "draft-2026-10",
    });
    return { ok: true };
  });
});
