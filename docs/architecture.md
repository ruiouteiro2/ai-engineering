# Architecture decisions

## Application boundary

One Nuxt 4 Node/Nitro SSR application serves Vue pages and explicit server API handlers. PostgreSQL 16 owns users, sessions, catalog, content, files, checkouts, orders, entitlements, consents, support/privacy requests, audit events and the email queue. Drizzle schema and committed migrations define the database contract. There is no direct browser-to-database access.

The default local environment uses PostgreSQL Compose, private filesystem assets and a file email catcher. SMTP and S3 adapters have narrow server-only interfaces. Lemon Squeezy is the intended merchant-of-record provider; the mock adapter is restricted to loopback application origins. Production requires S3 and SMTP plus the release gates.

## Catalog and content

`catalog-seed.json` is preserved as supplied. `scripts/seed.ts` inserts missing records without overwriting administrative edits. Source cover artwork lives in `public/covers`; paid assets never belong in `public`. Catalog visibility, editorial status and purchase eligibility are separate fields. All supplied SKUs are PLANNED and unpriced.

Product publication requires a reviewed license, an explicit price, a provider variant for paid products, and an approved file in a published version, or exact reviewed bundle components. Metadata edits invalidate purchase eligibility. File review checks the stored bytes against the recorded SHA-256 before approval. A human review note is required; this is not an automated malware scanner. Run the actual scanner required by the selected operating environment before approving third-party files.

Bundles contain individual products only. Checkout snapshots preserve exact constituent SKUs and license text; later bundle changes do not retroactively expand old orders. Published versions of an entitled SKU remain available, including later approved updates. A bundle's reviewed license must cover all of its constituents.

CMS text is deliberately plain text with `##` headings, rendered as escaped Vue text. Arbitrary HTML/scripts and plugin embeds are unsupported. Reserved policy slugs require legal content and administrator access. Legal drafts remain labeled until operator identity/review is configured.

## Authentication and authorization

Random magic links expire after 15 minutes and are consumed atomically once. The raw token is sent in a URL fragment and is hashed in PostgreSQL. Sessions use random opaque tokens, stored hashed, with seven-day expiry, HttpOnly/SameSite cookies and Secure on non-local origins. Every sensitive server handler checks the current database role and disabled state.

Customer ownership follows the verified account email matching the provider-confirmed order email. URLs, redirect parameters, provider totals supplied by the client and browser role claims never grant access. There is no password database. Role changes are operational actions through the CLI/database, not an open registration field.

## Payment and fulfillment

Checkout creation accepts only a SKU. Eligibility, price, currency, license, variant and bundle snapshot come from the server. The Lemon adapter checks store currency, variant environment and one-time billing, supplies the server price, and allows only the mapped variant. It accepts provider checkout URLs only on HTTPS Lemon Squeezy subdomains; custom merchant checkout domains require an explicit reviewed extension.

Webhooks verify HMAC against the exact request bytes before parsing. Store/environment checks and authoritative provider reads precede processing. PostgreSQL advisory locks serialize provider-order notifications; a unique payload digest deduplicates retries. Orders, entitlement updates, payment-event disposition and outbox insertion share a transaction. Older events are recorded as stale. Refunded/fraudulent/partially-refunded orders lose access conservatively; a late paid event cannot reverse terminal revocation. Partial refund restoration requires an explicit policy change; the current system does not automatically restore it.

Held unknown mappings appear in admin. Reconciliation requires an administrator, exact order/checkout identifiers and a fresh provider read. It cannot manually declare an order paid. No raw webhook payload is retained. Provider invoices/receipts remain with the merchant; the order screen directs customers to their provider receipt and support.

Downloads check session, order status, exact SKU entitlement, approved file and published version before issuing a 60-second token. Delivery checks them again. Local bytes are served with attachment headers. S3 delivery redirects to a 60-second signed object URL; an already-issued S3 URL can survive revocation for its remaining lifetime.

The outbox worker uses `FOR UPDATE SKIP LOCKED`, five-minute recoverable claims and five delivery attempts. A unique order dedupe key prevents multiple queued access emails. Delivery is at-least-once, not exactly-once SMTP. Failed/exhausted jobs require operator attention.

## Interface and localization

Shared CSS tokens and reusable components govern layout, typography, borders, focus, themes and forms. Original supplied covers provide the visual identity. No paid third-party fonts/kits were introduced. Native dialogs, details, labels, keyboard focus and reduced-motion rules are used.

English is the only shipped language. Typed common UI keys live in `shared/locales/en.ts`; editorial/catalog copy remains in the CMS and seed. Some page-specific English copy remains colocated with its component. A second locale requires extracting that remaining copy and translating content, canonical routes and date/currency presentation before exposing a language selector. There is no nonfunctional language menu.

## Deliberate deviations and external boundaries

- npm replaces unavailable pnpm, with an exact committed lockfile. Node 24 and TypeScript 5.9 match the verified toolchain; TypeScript 7 was incompatible with the installed lint toolchain.
- Local private storage replaces optional MinIO in this environment. Registry checks for investigated MinIO images failed; no nonexistent image is documented as working. Use a verified S3-compatible service for staging and verify anonymous denial, upload, readback, expiry and revocation there.
- File email catcher is the default. An optional pinned Mailpit profile supports SMTP development.
- Deletion requests use an audited manual review workflow because order/legal retention is an operator decision. Account export is immediate; external-processor records require a support request.
- Marketing and analytics integrations are inactive. Preferences are recorded, but no tracking scripts are loaded even when permission is accepted.
- No production infrastructure, domain, merchant account, purchased content, legal identity, monitoring subscription or external messages were provisioned.
