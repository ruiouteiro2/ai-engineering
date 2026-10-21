import { getCookie, createError, type H3Event } from "h3";
import { and, eq, gt } from "drizzle-orm";
import { db, schema } from "../utils/db";
import { hash } from "../utils/crypto";
export async function currentUser(event: H3Event) {
  const raw = getCookie(event, "ae_session");
  if (!raw) return null;
  const [row] = await db()
    .select({ user: schema.users })
    .from(schema.sessions)
    .innerJoin(schema.users, eq(schema.sessions.userId, schema.users.id))
    .where(
      and(
        eq(schema.sessions.hash, hash(raw)),
        gt(schema.sessions.expiresAt, new Date()),
        eq(schema.users.disabled, false),
      ),
    )
    .limit(1);
  return row?.user || null;
}
export async function requireUser(event: H3Event, roles?: string[]) {
  const user = await currentUser(event);
  if (!user)
    throw createError({
      statusCode: 401,
      statusMessage: "Sign in to continue",
    });
  if (roles && !roles.includes(user.role))
    throw createError({
      statusCode: 403,
      statusMessage: "You do not have permission for this action",
    });
  return user;
}
