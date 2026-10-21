import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { config } from "../utils/config";
export async function sendMail(to: string, subject: string, text: string) {
  const c = config();
  if (c.email === "mock") {
    if (!c.local)
      throw new Error("Mock mail is restricted to local development");
    const dir = resolve(".data/mail");
    await mkdir(dir, { recursive: true, mode: 0o700 });
    await writeFile(
      resolve(dir, `${Date.now()}-${randomUUID()}.json`),
      JSON.stringify({ to, subject, text }),
      { mode: 0o600 },
    );
    return;
  }
  if (c.email !== "smtp" || !process.env.SMTP_HOST)
    throw new Error("Email provider unavailable");
  if (!c.local && process.env.EMAIL_SENDER_VERIFIED !== "true")
    throw new Error("Production email sender has not been verified");
  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: !c.local,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
    connectionTimeout: 5000,
  });
  await transport.sendMail({
    from: process.env.AUTH_EMAIL_FROM,
    to,
    subject,
    text,
  });
}
