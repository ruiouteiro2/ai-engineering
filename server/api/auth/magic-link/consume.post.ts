import { z } from "zod";
import { and, eq, gt, isNull } from "drizzle-orm";
import { db, schema } from "../../../utils/db";
import { body } from "../../../utils/validation";
import { token, hash } from "../../../utils/crypto";
import { config } from "../../../utils/config";
export default defineEventHandler(async (event) => {
  const input = await body(
    event,
    z.object({ token: z.string().regex(/^[a-f0-9]{64}$/) }).strict(),
  );
  const raw = token();
  await db().transaction(async (tx) => {
    const [link] = await tx
      .update(schema.magicLinks)
      .set({ usedAt: new Date() })
      .where(
        and(
          eq(schema.magicLinks.hash, hash(input.token)),
          isNull(schema.magicLinks.usedAt),
          gt(schema.magicLinks.expiresAt, new Date()),
        ),
      )
      .returning();
    if (!link)
      throw createError({
        statusCode: 410,
        statusMessage:
          "This link has expired or was already used. Request a new one.",
      });
    const [user] = await tx
      .insert(schema.users)
      .values({ email: link.email })
      .onConflictDoUpdate({
        target: schema.users.email,
        set: { email: link.email },
      })
      .returning();
    if (user!.disabled)
      throw createError({
        statusCode: 403,
        statusMessage: "This account is unavailable. Contact support.",
      });
    const old = getCookie(event, "ae_session");
    if (old)
      await tx
        .delete(schema.sessions)
        .where(eq(schema.sessions.hash, hash(old)));
    await tx.insert(schema.sessions).values({
      hash: hash(raw),
      userId: user!.id,
      expiresAt: new Date(Date.now() + 7 * 86400_000),
    });
  });
  setCookie(event, "ae_session", raw, {
    httpOnly: true,
    secure: !config().local,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 86400,
  });
  return { ok: true };
});
