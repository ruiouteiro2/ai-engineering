import { z } from "zod";
import { requireUser } from "../../services/auth";
import { authorizedFile } from "../../services/downloads";
import { token, hash } from "../../utils/crypto";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event),
    id = z.uuid().safeParse(getRouterParam(event, "id"));
  if (!id.success)
    throw createError({
      statusCode: 404,
      statusMessage: "Download unavailable",
    });
  const f = await authorizedFile(u, id.data),
    raw = token();
  await db().transaction(async (tx) => {
    await tx.insert(schema.downloadTokens).values({
      hash: hash(raw),
      userId: u.id,
      fileId: f.id,
      expiresAt: new Date(Date.now() + 60_000),
    });
    await tx.insert(schema.downloads).values({ userId: u.id, fileId: f.id });
  });
  return { url: "/delivery/" + raw, expiresIn: 60 };
});
