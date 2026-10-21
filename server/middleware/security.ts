import {
  defineEventHandler,
  getHeader,
  getRequestIP,
  setHeader,
  createError,
} from "h3";
import { sql } from "drizzle-orm";
import { db } from "../utils/db";
import { hash } from "../utils/crypto";
import { boundedBody } from "../utils/body-limit";
export default defineEventHandler(async (event) => {
  setHeader(event, "X-Content-Type-Options", "nosniff");
  setHeader(event, "Referrer-Policy", "no-referrer");
  setHeader(event, "X-Frame-Options", "DENY");
  setHeader(
    event,
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  setHeader(
    event,
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' ws://localhost:* ws://127.0.0.1:*; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
  );
  if (process.env.APP_BASE_URL?.startsWith("https:"))
    setHeader(event, "Strict-Transport-Security", "max-age=31536000");
  if (
    event.path.startsWith("/api/") ||
    /^\/(account|admin|checkout)/.test(event.path)
  )
    setHeader(event, "Cache-Control", "private, no-store");
  if (
    !["GET", "HEAD", "OPTIONS"].includes(event.method) &&
    event.path !== "/api/webhooks/lemonsqueezy"
  ) {
    const origin = getHeader(event, "origin");
    if (
      !origin ||
      origin !==
        new URL(process.env.APP_BASE_URL || "http://localhost:3000").origin
    )
      throw createError({
        statusCode: 403,
        statusMessage: "Request origin not allowed",
      });
  }
  const max = event.path.startsWith("/api/admin/uploads")
    ? 20 * 1024 * 1024
    : 128 * 1024;
  if (Number(getHeader(event, "content-length") || 0) > max)
    throw createError({ statusCode: 413, statusMessage: "Request too large" });
  if (
    event.path.startsWith("/api/") &&
    !["GET", "HEAD"].includes(event.method) &&
    event.path !== "/api/webhooks/lemonsqueezy"
  ) {
    const key = hash(
      `${getRequestIP(event) || "unknown"}:${event.path.split("/").slice(0, 4).join("/")}`,
    );
    const limit = event.path.includes("/auth/") ? 12 : 80;
    const result = await db().execute(
      sql`INSERT INTO rate_limits(key,count,reset_at) VALUES(${key},1,now()+interval '10 minutes') ON CONFLICT(key) DO UPDATE SET count=CASE WHEN rate_limits.reset_at < now() THEN 1 ELSE rate_limits.count+1 END,reset_at=CASE WHEN rate_limits.reset_at < now() THEN now()+interval '10 minutes' ELSE rate_limits.reset_at END RETURNING count`,
    );
    if (Number(result.rows[0]?.count) > limit) {
      setHeader(event, "Retry-After", 600);
      throw createError({
        statusCode: 429,
        statusMessage: "Too many requests. Try again later.",
      });
    }
  }
  if (
    event.path.startsWith("/api/") &&
    ["POST", "PUT", "PATCH", "DELETE"].includes(event.method)
  )
    await boundedBody(event, max);
});
