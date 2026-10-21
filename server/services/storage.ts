import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../utils/config";
function client() {
  return new S3Client({
    endpoint: process.env.STORAGE_ENDPOINT || undefined,
    region: process.env.STORAGE_REGION || "us-east-1",
    forcePathStyle: !!process.env.STORAGE_ENDPOINT,
    credentials: {
      accessKeyId: process.env.STORAGE_ACCESS_KEY || "",
      secretAccessKey: process.env.STORAGE_SECRET_KEY || "",
    },
  });
}
function localPath(key: string) {
  if (!/^[a-f0-9-]{36}$/.test(key)) throw Error("Invalid storage key");
  return resolve(process.env.STORAGE_LOCAL_PATH || ".data/private", key);
}
export async function putFile(key: string, data: Buffer, mime: string) {
  if (config().storage === "s3") {
    await client().send(
      new PutObjectCommand({
        Bucket: process.env.STORAGE_BUCKET_PRIVATE,
        Key: key,
        Body: data,
        ContentType: mime,
      }),
    );
    return;
  }
  if (!config().local)
    throw Error("Local asset storage restricted to local development");
  await mkdir(resolve(process.env.STORAGE_LOCAL_PATH || ".data/private"), {
    recursive: true,
    mode: 0o700,
  });
  await writeFile(localPath(key), data, { mode: 0o600, flag: "wx" });
}
export async function readFileBytes(key: string) {
  if (config().storage === "s3") {
    const r = await client().send(
      new GetObjectCommand({
        Bucket: process.env.STORAGE_BUCKET_PRIVATE,
        Key: key,
      }),
    );
    return Buffer.from(await r.Body!.transformToByteArray());
  }
  return readFile(localPath(key));
}
export async function signedFileUrl(key: string, name: string) {
  return getSignedUrl(
    client(),
    new GetObjectCommand({
      Bucket: process.env.STORAGE_BUCKET_PRIVATE,
      Key: key,
      ResponseContentDisposition: `attachment; filename="${name.replace(/[^a-zA-Z0-9._-]/g, "_")}"`,
      ResponseContentType: "application/octet-stream",
    }),
    { expiresIn: 60 },
  );
}
export function detectFile(name: string, data: Buffer) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (!data.length || data.length > 20 * 1024 * 1024)
    throw Error("Files must be between 1 byte and 20 MB");
  if (ext === "pdf" && data.subarray(0, 5).toString() === "%PDF-")
    return "application/pdf";
  if (
    ["zip", "pptx", "xlsx", "docx"].includes(ext || "") &&
    data[0] === 0x50 &&
    data[1] === 0x4b &&
    data[2] === 3 &&
    data[3] === 4
  )
    return "application/zip";
  if (
    ["md", "txt", "csv", "json", "yaml", "yml"].includes(ext || "") &&
    !data.includes(0)
  ) {
    new TextDecoder("utf-8", { fatal: true }).decode(data);
    return "text/plain";
  }
  throw Error("File extension and content do not match an allowed format");
}
