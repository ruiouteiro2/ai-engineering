import {
  createHash,
  randomBytes,
  timingSafeEqual,
  createHmac,
} from "node:crypto";
export const token = () => randomBytes(32).toString("hex");
export const hash = (value: string | Buffer) =>
  createHash("sha256").update(value).digest("hex");
export function verifySignature(
  raw: Buffer,
  signature: string,
  secret: string,
) {
  if (!/^[a-f0-9]{64}$/i.test(signature) || !secret) return false;
  return timingSafeEqual(
    createHmac("sha256", secret).update(raw).digest(),
    Buffer.from(signature, "hex"),
  );
}
