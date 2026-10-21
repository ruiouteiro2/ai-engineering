import { and, eq, gt } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { authorizedFile } from "../../services/downloads";
import { db, schema } from "../../utils/db";
import { hash } from "../../utils/crypto";
import { readFileBytes, signedFileUrl } from "../../services/storage";
import { config } from "../../utils/config";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event),
    raw = getRouterParam(event, "token") || "";
  const t = await db().query.downloadTokens.findFirst({
    where: and(
      eq(schema.downloadTokens.hash, hash(raw)),
      eq(schema.downloadTokens.userId, u.id),
      gt(schema.downloadTokens.expiresAt, new Date()),
    ),
  });
  if (!t)
    throw createError({
      statusCode: 410,
      statusMessage:
        "Download link expired. Request a fresh link from your library.",
    });
  const f = await authorizedFile(u, t.fileId);
  setHeader(event, "Cache-Control", "private, no-store");
  setHeader(event, "Referrer-Policy", "no-referrer");
  if (config().storage === "s3")
    return sendRedirect(event, await signedFileUrl(f.key, f.name), 302);
  setHeader(event, "Content-Type", "application/octet-stream");
  setHeader(
    event,
    "Content-Disposition",
    `attachment; filename="${f.name.replace(/[^a-zA-Z0-9._-]/g, "_")}"`,
  );
  return readFileBytes(f.key);
});
