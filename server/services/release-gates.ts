import { eq, and } from "drizzle-orm";
import { db, schema as s } from "../utils/db";
export async function releaseGates() {
  const keys = [
    "privacy",
    "terms",
    "terms-of-sale",
    "refund-policy",
    "imprint",
    "licensing",
  ];
  const legal = await db()
    .select({ slug: s.content.slug })
    .from(s.content)
    .where(and(eq(s.content.published, true), eq(s.content.kind, "legal")));
  const record = await db().query.settings.findFirst({
    where: eq(s.settings.key, "site"),
  });
  const site = (record?.value || {}) as Record<string, unknown>;
  const gates = [
    {
      gate: "Operator identity and legal review",
      passed:
        process.env.SITE_LEGAL_OPERATOR_CONFIGURED === "true" &&
        !!site.operatorName &&
        !!site.operatorCountry &&
        !!site.contactEmail,
    },
    {
      gate: "Reviewed published policies",
      passed: keys.every((key) => legal.some((p) => p.slug === key)),
    },
    {
      gate: "Merchant approval and live credentials",
      passed:
        process.env.MERCHANT_APPROVED === "true" &&
        process.env.PAYMENT_PROVIDER === "lemonsqueezy" &&
        process.env.LEMONSQUEEZY_MODE === "live" &&
        !!process.env.LEMONSQUEEZY_API_KEY &&
        !!process.env.LEMONSQUEEZY_STORE_ID &&
        !!process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    },
    {
      gate: "Production domain and TLS",
      passed: process.env.APP_BASE_URL?.startsWith("https://") === true,
    },
    {
      gate: "Private object storage",
      passed:
        process.env.STORAGE_PROVIDER === "s3" &&
        !!process.env.STORAGE_BUCKET_PRIVATE &&
        !!process.env.STORAGE_ACCESS_KEY &&
        !!process.env.STORAGE_SECRET_KEY,
    },
    {
      gate: "Verified email sender",
      passed:
        process.env.EMAIL_PROVIDER === "smtp" &&
        process.env.EMAIL_SENDER_VERIFIED === "true",
    },
    {
      gate: "Backup and restore evidence",
      passed: process.env.BACKUP_RESTORE_VERIFIED === "true",
    },
    {
      gate: "Privileged access review",
      passed: process.env.ADMIN_ACCESS_REVIEWED === "true",
    },
    {
      gate: "Support and monitoring ownership",
      passed: process.env.OPERATIONS_READY === "true",
    },
  ];
  return gates.map((g) => ({
    ...g,
    status: g.passed ? "CONFIGURED_REQUIRES_OPERATOR_EVIDENCE" : "BLOCKED",
  }));
}
