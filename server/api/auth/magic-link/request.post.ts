import { z } from "zod";
import { db, schema } from "../../../utils/db";
import { body } from "../../../utils/validation";
import { token, hash } from "../../../utils/crypto";
import { config } from "../../../utils/config";
import { sendMail } from "../../../services/mail";
export default defineEventHandler(async (event) => {
  const { email } = await body(
    event,
    z
      .object({
        email: z
          .email()
          .max(254)
          .transform((v) => v.toLowerCase().trim()),
      })
      .strict(),
  );
  const raw = token();
  await db()
    .insert(schema.magicLinks)
    .values({
      hash: hash(raw),
      email,
      expiresAt: new Date(Date.now() + 15 * 60_000),
    });
  try {
    await sendMail(
      email,
      "Your AI Engineering sign-in link",
      `Open this link to sign in. It expires in 15 minutes and works once.\n${config().baseUrl}/account/verify#token=${raw}\n\nIf you did not request it, ignore this message.`,
    );
  } catch {
    throw createError({
      statusCode: 503,
      statusMessage: "Email is temporarily unavailable. Try again later.",
    });
  }
  return {
    ok: true,
    message: "If email delivery is available, a sign-in link is on its way.",
  };
});
