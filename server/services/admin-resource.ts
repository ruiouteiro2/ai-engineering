import type { H3Event } from "h3";
import { releaseGates } from "./release-gates";
import { desc, eq } from "drizzle-orm";
import { requireUser } from "./auth";
import { db, schema as s } from "../utils/db";
import { categories } from "../../shared/catalog";
export async function adminResource(event: H3Event, section: string) {
  const allowed: Record<string, string[]> = {
    orders: ["admin", "support"],
    customers: ["admin", "support"],
    support: ["admin", "support"],
    content: ["admin", "editor"],
    articles: ["admin", "editor"],
    pages: ["admin", "editor"],
    seo: ["admin", "editor"],
    legal: ["admin"],
    leads: ["admin"],
    newsletter: ["admin"],
    consent: ["admin"],
    privacy: ["admin"],
    entitlements: ["admin"],
    downloads: ["admin"],
    refunds: ["admin", "support"],
    assets: ["admin", "editor"],
    bundles: ["admin", "editor"],
    categories: ["admin", "editor"],
    collections: ["admin", "editor"],
    "audit-log": ["admin"],
    webhooks: ["admin"],
    integrations: ["admin"],
    health: ["admin"],
    "release-gates": ["admin"],
    settings: ["admin"],
    affiliates: ["admin"],
  };
  if (!allowed[section])
    throw createError({
      statusCode: 404,
      statusMessage: "Unknown administrative resource",
    });
  await requireUser(event, allowed[section]);
  if (section === "orders" || section === "refunds")
    return db()
      .select()
      .from(s.orders)
      .where(
        section === "refunds" ? eq(s.orders.status, "refunded") : undefined,
      )
      .orderBy(desc(s.orders.createdAt))
      .limit(200);
  if (section === "customers")
    return db()
      .select({
        id: s.users.id,
        email: s.users.email,
        name: s.users.name,
        role: s.users.role,
        disabled: s.users.disabled,
        createdAt: s.users.createdAt,
      })
      .from(s.users)
      .limit(200);
  if (section === "support")
    return db()
      .select()
      .from(s.support)
      .orderBy(desc(s.support.createdAt))
      .limit(200);
  if (section === "privacy")
    return db().select().from(s.privacyRequests).limit(200);
  if (["content", "articles", "pages", "seo", "legal"].includes(section))
    return db()
      .select()
      .from(s.content)
      .where(section === "legal" ? eq(s.content.kind, "legal") : undefined)
      .limit(200);
  if (section === "leads" || section === "newsletter")
    return db()
      .select({
        id: s.leads.id,
        email: s.leads.email,
        marketing: s.leads.marketing,
        confirmed: s.leads.confirmed,
        createdAt: s.leads.createdAt,
      })
      .from(s.leads)
      .limit(200);
  if (section === "consent")
    return db()
      .select()
      .from(s.consents)
      .orderBy(desc(s.consents.createdAt))
      .limit(200);
  if (section === "entitlements")
    return db().select().from(s.entitlements).limit(200);
  if (section === "downloads")
    return db()
      .select()
      .from(s.downloads)
      .orderBy(desc(s.downloads.createdAt))
      .limit(200);
  if (section === "assets")
    return db()
      .select({
        id: s.files.id,
        name: s.files.name,
        size: s.files.size,
        sha256: s.files.sha256,
        scanStatus: s.files.scanStatus,
        versionId: s.files.versionId,
      })
      .from(s.files)
      .limit(200);
  if (section === "bundles") return db().select().from(s.bundleItems);
  if (section === "categories")
    return categories.map((c) => ({ id: c.type, name: c.label, path: c.path }));
  if (section === "collections")
    return db()
      .select({
        sku: s.products.sku,
        tier: s.products.tier,
        type: s.products.type,
        title: s.products.title,
      })
      .from(s.products);
  if (section === "audit-log")
    return db()
      .select()
      .from(s.audit)
      .orderBy(desc(s.audit.createdAt))
      .limit(200);
  if (section === "webhooks")
    return db()
      .select()
      .from(s.paymentEvents)
      .orderBy(desc(s.paymentEvents.receivedAt))
      .limit(200);
  if (section === "settings") return db().select().from(s.settings);
  if (section === "integrations")
    return [
      {
        service: "Payments",
        mode: process.env.PAYMENT_PROVIDER || "mock",
        status: process.env.LEMONSQUEEZY_API_KEY
          ? "CONFIGURED_NOT_VERIFIED"
          : "BLOCKED_EXTERNAL_CREDENTIALS",
      },
      {
        service: "Email",
        mode: process.env.EMAIL_PROVIDER || "mock",
        status:
          process.env.EMAIL_PROVIDER === "smtp"
            ? "CONFIGURED_NOT_VERIFIED"
            : "LOCAL_FILE_CATCHER",
      },
      {
        service: "Storage",
        mode: process.env.STORAGE_PROVIDER || "local",
        status: "VERIFY_ON_TARGET_HOST",
      },
    ];
  if (section === "health") {
    await db().execute("select 1");
    return [
      { service: "Database", status: "CONNECTED" },
      { service: "Application", status: "RUNNING" },
    ];
  }
  if (section === "release-gates") return releaseGates();
  return [
    {
      status: "INACTIVE",
      reason: "Affiliate provider approval and terms are not configured",
    },
  ];
}
