import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { requireUser } from "../../services/auth";
import { db, schema as s } from "../../utils/db";
import { hash } from "../../utils/crypto";
import { putFile, detectFile } from "../../services/storage";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event, ["admin", "editor"]),
    parts = await readMultipartFormData(event);
  const file = parts?.find((p) => p.name === "file"),
    versionId = parts?.find((p) => p.name === "versionId")?.data.toString();
  if (!file?.filename || !z.uuid().safeParse(versionId).success)
    throw createError({
      statusCode: 422,
      statusMessage: "Select a file and version",
    });
  const version = await db().query.versions.findFirst({
    where: eq(s.versions.id, versionId!),
  });
  if (!version || version.published)
    throw createError({
      statusCode: 409,
      statusMessage: "Upload only to an unpublished version",
    });
  const name = file.filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-150),
    key = randomUUID();
  let mime: string;
  try {
    mime = detectFile(name, file.data);
  } catch {
    throw createError({
      statusCode: 422,
      statusMessage: "File type or size is not allowed",
    });
  }
  await putFile(key, file.data, mime);
  return db().transaction(async (tx) => {
    const [f] = await tx
      .insert(s.files)
      .values({
        versionId: versionId!,
        key,
        name,
        mime,
        size: file.data.length,
        sha256: hash(file.data),
        uploadedBy: u.id,
      })
      .returning();
    await tx.insert(s.audit).values({
      actorId: u.id,
      action: "file.quarantine",
      entity: f!.id,
      detail: { sha256: f!.sha256 },
    });
    return { id: f!.id, name: f!.name, scanStatus: f!.scanStatus };
  });
});
