import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, schema } from "../utils/db";
import { body } from "../utils/validation";
import { token, hash } from "../utils/crypto";
import { config } from "../utils/config";
import { sendMail } from "../services/mail";
export default defineEventHandler(async (event) => {
  const input = await body(
    event,
    z
      .object({
        email: z
          .email()
          .max(254)
          .transform((v) => v.trim().toLowerCase()),
        sku: z.string().max(40).optional(),
        marketing: z.boolean(),
        website: z.string().max(200).default(""),
      })
      .strict(),
  );
  if (input.website) return { ok: true };
  const confirmToken = token();
  await db().transaction(async (tx) => {
    if (
      input.sku &&
      !(await tx.query.products.findFirst({
        where: eq(schema.products.sku, input.sku),
      }))
    )
      throw createError({
        statusCode: 404,
        statusMessage: "Resource not found",
      });
    const [lead] = await tx
      .insert(schema.leads)
      .values({
        email: input.email,
        marketing: input.marketing,
        tokenHash: hash(confirmToken),
      })
      .onConflictDoUpdate({
        target: schema.leads.email,
        set: { tokenHash: hash(confirmToken) },
      })
      .returning();
    if (input.sku)
      await tx
        .insert(schema.waitlists)
        .values({ leadId: lead!.id, sku: input.sku })
        .onConflictDoNothing();
    // Resubscription requires explicit confirmation; an unchecked optional box never revokes existing consent.
    await tx.insert(schema.consents).values({
      leadId: lead!.id,
      purpose: input.marketing ? "newsletter-request" : "release-notification",
      accepted: true,
      policyVersion: "draft-2026-10",
    });
  });
  try {
    await sendMail(
      input.email,
      "Confirm your AI Engineering preferences",
      `Confirm your ${input.marketing ? "newsletter subscription" : "release notification"}: ${config().baseUrl}/newsletter?token=${confirmToken}&action=confirm&marketing=${input.marketing ? "1" : "0"}\n\nTo cancel notifications: ${config().baseUrl}/newsletter?token=${confirmToken}&action=unsubscribe`,
    );
  } catch {
    throw createError({
      statusCode: 503,
      statusMessage:
        "Your request was saved, but confirmation email is unavailable. Please try again later.",
    });
  }
  return { ok: true };
});
