import {
  pgTable,
  text,
  uuid,
  timestamp,
  boolean,
  integer,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
const id = () => uuid("id").primaryKey().defaultRandom();
const created = () =>
  timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
export const users = pgTable("users", {
  id: id(),
  email: text("email").notNull().unique(),
  name: text("name").notNull().default(""),
  role: text("role").notNull().default("customer"),
  disabled: boolean("disabled").notNull().default(false),
  preferences: jsonb("preferences").notNull().default({}),
  createdAt: created(),
});
export const sessions = pgTable("sessions", {
  hash: text("hash").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: created(),
});
export const magicLinks = pgTable("magic_links", {
  hash: text("hash").primaryKey(),
  email: text("email").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: created(),
});
export const products = pgTable(
  "products",
  {
    sku: text("sku").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    type: text("type").notNull(),
    tier: text("tier").notNull(),
    description: text("description").notNull(),
    status: text("status").notNull().default("PLANNED"),
    visible: boolean("visible").notNull().default(true),
    purchasable: boolean("purchasable").notNull().default(false),
    cover: text("cover").notNull(),
    data: jsonb("data").$type<Record<string, any>>().notNull().default({}),
    license: text("license").notNull().default("TO_DEFINE"),
    priceCents: integer("price_cents"),
    currency: text("currency").notNull().default("EUR"),
    variantId: text("variant_id").unique(),
    reviewed: boolean("reviewed").notNull().default(false),
    revision: integer("revision").notNull().default(1),
    updatedAt: created(),
  },
  (t) => [
    index("products_type_idx").on(t.type),
    index("products_status_idx").on(t.status),
  ],
);
export const versions = pgTable(
  "versions",
  {
    id: id(),
    sku: text("sku")
      .notNull()
      .references(() => products.sku),
    version: text("version").notNull(),
    notes: text("notes").notNull(),
    compatibility: text("compatibility").notNull().default("Not verified"),
    published: boolean("published").notNull().default(false),
    createdAt: created(),
  },
  (t) => [uniqueIndex("version_sku_unique").on(t.sku, t.version)],
);
export const files = pgTable("files", {
  id: id(),
  versionId: uuid("version_id")
    .notNull()
    .references(() => versions.id),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  mime: text("mime").notNull(),
  size: integer("size").notNull(),
  sha256: text("sha256").notNull(),
  scanStatus: text("scan_status").notNull().default("QUARANTINED"),
  uploadedBy: uuid("uploaded_by")
    .notNull()
    .references(() => users.id),
  createdAt: created(),
});
export const bundleItems = pgTable(
  "bundle_items",
  {
    bundleSku: text("bundle_sku")
      .notNull()
      .references(() => products.sku),
    itemSku: text("item_sku")
      .notNull()
      .references(() => products.sku),
  },
  (t) => [uniqueIndex("bundle_item_unique").on(t.bundleSku, t.itemSku)],
);
export const checkouts = pgTable("checkouts", {
  id: id(),
  tokenHash: text("token_hash").notNull().unique(),
  sku: text("sku")
    .notNull()
    .references(() => products.sku),
  snapshot: jsonb("snapshot").$type<Record<string, any>>().notNull(),
  providerId: text("provider_id"),
  createdAt: created(),
});
export const orders = pgTable(
  "orders",
  {
    id: id(),
    providerId: text("provider_id").notNull().unique(),
    email: text("email").notNull(),
    status: text("status").notNull(),
    total: integer("total").notNull(),
    currency: text("currency").notNull(),
    testMode: boolean("test_mode").notNull(),
    checkoutId: uuid("checkout_id").references(() => checkouts.id),
    snapshot: jsonb("snapshot").$type<Record<string, any>>().notNull(),
    providerUpdatedAt: timestamp("provider_updated_at", {
      withTimezone: true,
    }).notNull(),
    createdAt: created(),
  },
  (t) => [index("orders_email_idx").on(t.email)],
);
export const entitlements = pgTable(
  "entitlements",
  {
    id: id(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id),
    sku: text("sku")
      .notNull()
      .references(() => products.sku),
    active: boolean("active").notNull().default(true),
    createdAt: created(),
  },
  (t) => [uniqueIndex("entitlement_order_sku").on(t.orderId, t.sku)],
);
export const paymentEvents = pgTable("payment_events", {
  hash: text("hash").primaryKey(),
  event: text("event").notNull(),
  providerId: text("provider_id").notNull(),
  status: text("status").notNull(),
  reason: text("reason"),
  receivedAt: created(),
});
export const downloads = pgTable("download_events", {
  id: id(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  fileId: uuid("file_id")
    .notNull()
    .references(() => files.id),
  createdAt: created(),
});
export const downloadTokens = pgTable("download_tokens", {
  hash: text("hash").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  fileId: uuid("file_id")
    .notNull()
    .references(() => files.id),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
export const leads = pgTable("leads", {
  id: id(),
  email: text("email").notNull().unique(),
  marketing: boolean("marketing").notNull().default(false),
  confirmed: boolean("confirmed").notNull().default(false),
  tokenHash: text("token_hash").notNull(),
  createdAt: created(),
});
export const waitlists = pgTable(
  "waitlists",
  {
    id: id(),
    leadId: uuid("lead_id")
      .notNull()
      .references(() => leads.id),
    sku: text("sku")
      .notNull()
      .references(() => products.sku),
    createdAt: created(),
  },
  (t) => [uniqueIndex("waitlist_lead_sku").on(t.leadId, t.sku)],
);
export const consents = pgTable("consents", {
  id: id(),
  leadId: uuid("lead_id").references(() => leads.id),
  userId: uuid("user_id").references(() => users.id),
  purpose: text("purpose").notNull(),
  accepted: boolean("accepted").notNull(),
  policyVersion: text("policy_version").notNull(),
  createdAt: created(),
});
export const support = pgTable("support_requests", {
  id: id(),
  email: text("email").notNull(),
  topic: text("topic").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("OPEN"),
  createdAt: created(),
});
export const privacyRequests = pgTable("privacy_requests", {
  id: id(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  type: text("type").notNull(),
  status: text("status").notNull().default("OPEN"),
  notes: text("notes").notNull().default(""),
  createdAt: created(),
});
export const content = pgTable("content", {
  id: id(),
  slug: text("slug").notNull().unique(),
  kind: text("kind").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  body: text("body").notNull(),
  published: boolean("published").notNull().default(false),
  revision: integer("revision").notNull().default(1),
  updatedAt: created(),
});
export const audit = pgTable("audit_events", {
  id: id(),
  actorId: uuid("actor_id").references(() => users.id),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  detail: jsonb("detail").notNull().default({}),
  createdAt: created(),
});
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
});
export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  resetAt: timestamp("reset_at", { withTimezone: true }).notNull(),
});
export const emailJobs = pgTable("email_jobs", {
  id: id(),
  dedupeKey: text("dedupe_key").notNull().unique(),
  recipient: text("recipient").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("PENDING"),
  attempts: integer("attempts").notNull().default(0),
  availableAt: timestamp("available_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: created(),
});
