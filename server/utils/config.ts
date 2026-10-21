export function config() {
  const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(
    new URL(baseUrl).hostname,
  );
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32)
    throw new Error("SESSION_SECRET must contain at least 32 characters");
  return {
    baseUrl,
    local,
    secret,
    email: process.env.EMAIL_PROVIDER || "mock",
    storage: process.env.STORAGE_PROVIDER || "local",
    payment: process.env.PAYMENT_PROVIDER || "mock",
    live: process.env.SITE_LIVE_PAYMENTS_ENABLED === "true",
  };
}
