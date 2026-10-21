# AI ENGINEERING MASTERY SYSTEM — MASTER IMPLEMENTATION SPECIFICATION FOR CODEX

> **DOCUMENT TYPE:** Complete product, editorial, design, functional, engineering, operations and deployment specification.  
> **AS OF:** 2026-10-21.  
> **TARGET:** Build a complete, professional digital-products ecommerce website from an empty repository to a production-deployable application.  
> **PRIMARY LANGUAGE OF WEBSITE:** English (`en`), with architecture prepared for `pt-PT` localization.  
> **STATUS:** Authoritative implementation brief; not evidence that any products, rights, customer reviews, integrations or legal texts already exist.  
> **IMPLEMENTATION INSTRUCTIONS:** The Codex agent MUST read this document at project kickoff, create small durable `AGENTS.md` and execution plan files in the repository, then implement and verify in phases. This document is reference material; do NOT paste its entirety into every follow-up prompt. Do not treat example prices, metadata, or fictional previews as facts or available goods.

## 0. THE MISSION AND SOURCE OF TRUTH

Build a complete, polished commercial website and operations console for **AI Engineering Mastery System** (working product/system name). The brand's customer promise: *Build with AI. Engineer with confidence.* Our fundamental insight: inexperienced AI-assisted builders can produce visually convincing software but overlook the full lifecycle and product scope that an experienced engineer would examine: discovery, accessibility, identity, roles, secondary routes, complete user states, legal notices, privacy, marketing consents, commerce, security, database integrity, failure modes, operations, backup/restore, deployment, testing, and long-term maintenance.

**Business:** premium self-paced educational digital downloads (PDF, PPTX, code/lab ZIPs, Markdown templates, XLSX, JSON, YAML and installable Agent Skills). No mandatory video recording, live lessons, coaching, calls or client services. Sales are predominantly automated; acquisition through written technical content, visual social posts, free downloads, SEO, email and affiliates. Paid content must actually exist, be versioned and be protected. The full curriculum is described in this brief but initially only placeholder catalog entries and illustrative cover designs exist. Build a website that can launch commercially as soon as legal/operator/payment details, reviewed content and compliance gates are completed. Never suggest a download is ready if unavailable.

**Clarification from previous planning:** the user wants something much deeper than a basic vibe-coding course. The flagship offering trains engineers' thinking across the whole product lifecycle and hundreds of edge conditions. Initial revenue objective discussed: acquiring a €200k home for cash within six months starting from €0. That objective is exceptionally unlikely and NOT a business forecast, guarantee or marketing claim. Optimize for validating sales and durable product quality, not speculative projections.

### 0.1 Established decisions from the conversation

- Independent premium branded site; NOT a third-party course landing page and NOT a conventional video-based LMS.
- Technical education / reference library / downloadable professional tools; written learning, visual atlases, real labs, executable skill packs.
- Six curriculum tiers: Foundation, Builder, Professional, Business, Expert, Architect.
- Complete planned library: 12 major PDFs, 6 PPT visual atlases, 12 skills, 36 reusable templates, 6 labs, 6 business-specific blueprints, 100 failure-engineering cases, and 1 free onboarding resource. Counts describe **planned inventory**, not produced material.
- High-value reusable **Universal Product Scope Register** / Feature Completeness Framework is the knowledge foundation connecting everything.
- Free product: *The AI Software Reality Check — 50 Things AI Coding Agents Forget About Your Application*. Proposed bundle: 20–30 page PDF, 50-point checklist XLSX, project-auditor-lite skill, sample audit report and 3 case studies. All initially marked `PLANNED` until real files are approved.
- Brand flagship: *The AI Engineering Mastery System*; first paid/early launch kit *The Production-Ready AI Builder Kit*, focusing on **The Complete Application Anatomy** and **Complete Product Architect** skill.
- Multiple editions may be sold (Builder, Professional, Ultimate) and individual skills and kits; example prices exist but require validation and explicit activation by the store operator.
- Price hypotheses (not committed): Builder Edition €79; Professional Edition €179; Ultimate Engineering Library €299; Complete Mastery Bundle €449; standalone skills €29–€59; Essentials 4-skill set €99; Professional 8-skill set €179; Ultimate 12-skill suite €299; introductory manuals €19–€99. Product visibility, price and checkout must be driven by catalog state, not hard-coded throughout UI.
- Preferred ecommerce direction: Lemon Squeezy (Merchant of Record); buyer identity/order/entitlement mirrored locally only after verified purchase events, not merely after redirect.
- The website needs full polished, reusable cover art for all catalog items and preview/mockup components. This starter package supplies **editable SVG cover placeholders**, not final authored product artwork.
- All legal obligations are conditional on the actual operator jurisdiction/business/customer/data. No universal legal-template guarantee, no fake legal identity or claim of compliance.
- Do not show bogus testimonials, customer logos, discount countdowns, payment confirmations, sales metrics, or certifications.

### 0.2 Nonnegotiables

1. It must be an actual implementable project: code, application routes, DB migrations, seed data, functionality, APIs, tests, docs, deployment support—not only an aspirational design mockup.
2. All public-facing listed controls must function. No fake buttons, checkout, cart, admin, login or newsletter flows.
3. Production operations MUST be secure-by-default, with no secrets committed, no unverified paid access, no public storage links to paid files, no trusting client-side claims.
4. Implement as many functional features as possible with offline/test provider adapters if external credentials are unavailable; mark real integrations as `BLOCKED_EXTERNAL_CREDENTIALS` until configured. Do not claim live payments, email delivery or production deployment without evidence.
5. Catalog seed entries should use `PLANNED` or `COMING_SOON` states and authentic labels. Only approved and uploaded items can become `AVAILABLE` / `PUBLISHED` with working checkout or downloads.
6. All visual and technical states: empty, loading, pending, success, failure, no connectivity, unauthorized, not found, forbidden, maintenance, rate-limited, expired and deleted.
7. Evidence-driven completion: each phase has tests and verifiable acceptance criteria. Record what passed/failed/skipped and why.
8. Keep cost close to zero at development/validation stage. Avoid paid API calls, heavy SaaS infrastructure, unnecessary dependencies, over-engineering and vendor lock-in.

## 1. BRAND, MARKET, VOICE AND EXPERIENCE

### 1.1 Audience / personas

- **AI beginner builder with technical ambition:** can prompt an LLM into generating screens, does not understand production-critical features.
- **Indie hacker / founder:** needs to ship a legitimate monetized SaaS with correct operational and legal workflows.
- **Experienced developer adopting agent workflows:** wants debugging, scope review, quality gates, structured agent skills.
- **Consultant / technical lead / educator:** wants reusable professionally licensed templates, architecture atlases and training assets.

### 1.2 Positioning

`You don't need more prompts. You need engineering judgment.`

Core teaching path: `UNDERSTAND → SPECIFY → BUILD → BREAK → VERIFY → DEPLOY → OPERATE`.

Communicate benefits, not unverifiable performance claims. Editorial tone: technical, precise, premium, not hysterical, no empty adjectives like 'ultimate' unless a genuine edition name, no false artificial scarcity. Website copy is in fluent professional English; default factual, concise, informative.

### 1.3 Visual direction (creative defaults, to be refined by implementation)

- Premium modern engineering / technical-publishing identity. Understated dark foundation (deep navy/graphite, not generic black-on-purple glow); strategic luminous teal/cyan, blue and brass accents for meaningful hierarchy, restraint with gradients. Contrast accessible in light and dark; default dark but **both light/dark themes supported**.
- Suggested tokens: background `#090E18`, surface `#111B2A`, elevated `#172438`, border `#2A3A51`, main text `#F2F6FC`, muted `#AAB9CC`, brand teal `#42D9D0`, cobalt `#6C85FF`, focus `#FFE08A`; adapt after WCAG contrast checks. Light equivalent with white/slate. Tokens, not magic values.
- Typography: licensed/free compatible variable fonts via standard CDN/self-hosting if allowed; e.g. Inter/Manrope plus a subtle mono for code. Never assume purchased font licenses. Clear hierarchy and excellent readability for dense technical detail.
- Layout: 12-column responsive grid, generous whitespace, systematic 4/8px spacing rhythm, max reading width ~70ch, premium typography, subtle animations that respect `prefers-reduced-motion`.
- Professional product cover mockups with consistent classification (PDF, PPT, Skill, Lab, Blueprint, Bundle); unique visual signature and legible title at realistic retail sizes, no counterfeit 'book' photographs. Cover assets should have at least 3:4 source portrait ratio, social 1:1 / 1.91:1 derivatives, alt text.
- Avoid neon clutter, generic robot/AI stock images, fabricated user photos, unbalanced glowing gradients, low-contrast body text, fake performance metrics.
- Include responsive transitions, microinteractions only where useful: navigation, filters, skeletons, image zoom, table of contents, search; motion low and optional.

### 1.4 Brand elements

Logo concept: elegant abstract combination of `[<>]` engineering brackets / structured layers / verified check, built as scalable SVG logo with wordmark, compact glyph, monochrome variants, favicon and OG templates. Do not imitate any third-party logo. Since the final brand name/domain is undecided, use a configurable `siteSettings.brandName`, `brandShortName`, `siteUrl`; do not hardwire an unavailable domain.

### 1.5 Content-quality rules

- Each product detail has real educational description, intended learner, prerequisites, exact current contents, format, version, last verification date, compatibility, license, author/operator attribution, changelog, preview and clear support/updates policy.
- For unavailable materials state **Coming soon / In preparation**, never present teaser covers as delivered files.
- Do not claim legal certification, code security guarantee, AI accuracy, official endorsement by Codex/Claude/OpenAI/Anthropic or guaranteed customer income.
- Correct tool marks: 'Compatible with Codex and Claude Code' ONLY when verified. No fake affiliation; trademark mention explanatory, correct disclaimers.

## 2. SITE MAP — EVERY PAGE AND ROUTE

All pages must have responsive desktop/tablet/mobile designs; meaningful tab order; 404 and error fallback. Route definitions can be changed with documented rationale, but preserve capabilities.

### 2.1 Public and marketing routes

| Route | Page | Key content/functions |
|---|---|---|
| `/` | Homepage | Hero, thesis, flagship kit, free audit CTA, category navigation, what we teach, interactive product anatomy, skill demo, honest roadmap, FAQ, latest articles, footer |
| `/catalog` | All catalog | Search, filter category/tier/format/compatibility/status/price; sort; pagination; grid/list; no dead-end filters |
| `/library` | Educational guides | PDFs, atlases, study bundles, facets and outcomes |
| `/library/[slug]` | Guide detail | Artwork, overview, index, preview pages, formats/versions, requirements, license, inclusion in bundles, related skills |
| `/skills` | Agent skills | Search, Codex/Claude/universal filters, permissions, outputs, previews, install & compatibility |
| `/skills/[slug]` | Skill detail | Trigger description, capabilities, I/O, examples, supported agent versions, permissions, evaluation evidence, package manifest, license, checkout |
| `/templates` | Template library | Catalog, previews, file formats, templates and checklist details |
| `/templates/[slug]` | Template detail | Fields, sample sheets/previews, exports, usage rights |
| `/atlases` | PPT / visual atlases | Illustrated visual-product category |
| `/atlases/[slug]` | Atlas detail | Slide excerpts, index, requirements |
| `/labs` | Hands-on labs | Scenarios, prerequisites, challenges and reference solutions |
| `/labs/[slug]` | Lab detail | Coverage, safe local reproduction, level |
| `/blueprints` | Product blueprints | SaaS, ecommerce, marketplaces, AI products, community, mobile |
| `/blueprints/[slug]` | Blueprint detail | Modules, requirements, sector-specific cases |
| `/bundles` | Editions & bundles | Price comparison, license terms, exact inclusions and savings only when arithmetically true |
| `/bundles/[slug]` | Bundle detail | Entitlements and component versions, clear exclusions |
| `/free` | Free lead magnet landing | 50 point audit, preview, form/download, benefits, non-misleading cross-sell |
| `/about` | Philosophy and methodology | Problem solved, editorial method, accuracy process, not fake founder bio |
| `/methodology` | Engineering process | Feature completeness matrix, evidence levels, 6 curricular levels, diagrams |
| `/roadmap` | Public catalog roadmap | What is planned; no unreliable release dates, optional notify me |
| `/updates` | Library update log | Releases/version entries/compatibility notes, no invented data |
| `/blog` | Editorial landing | Search, category, tags, article list and pagination |
| `/blog/[slug]` | Article | Markdown editorial, TOC, citations, related products, metadata, syntax-highlight, accessible code |
| `/guides/[slug]` | Evergreen educational guide | Search-oriented public resource distinct from paid downloads |
| `/faq` | FAQ | Searchable and accessible accordion, truthful policies |
| `/contact` | Contact | Secure form, response expectations only if established, spam prevention, privacy text |
| `/affiliates` | Affiliates | Program outline, application/terms and provider link only when enabled |
| `/licensing` | License and usage terms | Personal vs team/trainer rights; permitted uses; version/updates policy |
| `/support` | Customer support hub | Help articles, order lookup, contact and download troubleshooting |
| `/support/[slug]` | Help article | Resolution steps and links |
| `/search` | Unified search | Catalog + editorial grouped, keyboard accessible |
| `/newsletter` | Email subscription | Preferences, proper consent, unsubscribe links |
| `/privacy` | Privacy notice | Reviewed operator-specific text, disclosure of suppliers and rights |
| `/terms` | Terms of service | Reviewed operator-specific text |
| `/terms-of-sale` | Sales terms | Digital product information, fulfillment, license, statutory rights |
| `/refund-policy` | Refund/cancellation information | Jurisdiction-aware non-misleading notice; do not claim statutory rights are waived by default |
| `/cookies` | Cookie / tracking notice | Categories, choices where required, preference management |
| `/imprint` | Legal identity notice | Operator identity placeholders, publish gated until completed |
| `/accessibility` | Accessibility policy/status | Honest description and contact mechanism |
| `/checkout/complete` | Payment return | PENDING until verified order confirmed server-side; poll/retry, support path |
| `/checkout/cancelled` | Checkout exit | Clear status and restart pathway |
| `/404`, error handling | Not found / server error | Branded useful recovery links |

### 2.2 Customer routes (minimal-friction purchase + post-purchase access)

- `/account/sign-in` email magic-link/passwordless or secure conventional auth; no customer forced account creation before checkout when provider supports guest purchases.
- `/account/verify`, `/account/sign-out` and expired-link recovery.
- `/account` library/home overview, next downloads, versions, licensed devices only if relevant.
- `/account/library` purchased files and bundle-entitled contents, filters and new-version notices.
- `/account/orders` purchase history, status, provider receipt links; no made-up invoice generation.
- `/account/orders/[id]` order detail, items, status, failed/refunded access semantics.
- `/account/downloads` download actions with server-side entitlement check and signed links.
- `/account/licenses` install rights, account licenses, package notices and expiration conditions.
- `/account/profile`, `/account/security`, `/account/preferences`, `/account/privacy` (export/delete request handling).
- Customer service access without exposing order data by predictable IDs.

### 2.3 Administration routes (RBAC-protected, separate navigation)

- `/admin` operational summary with real metrics only, pending actions and integration status.
- `/admin/products` list/CRUD/status; `/admin/products/[id]` details, versions, assets, cover, previews, entitlements, prices, FAQ and related products.
- `/admin/categories`, `/admin/collections`, `/admin/bundles`, `/admin/assets` signed upload, versions, integrity hashes.
- `/admin/orders`, `/admin/customers`, `/admin/entitlements`, `/admin/downloads`, `/admin/refunds` (manual reconciliation workflow, do not fabricate provider refunds).
- `/admin/leads`, `/admin/newsletter`, `/admin/content`, `/admin/articles`, `/admin/pages`, `/admin/seo`.
- `/admin/legal`, `/admin/consent`, `/admin/support`, `/admin/affiliates` (read-only provider sync initially), `/admin/settings`.
- `/admin/audit-log`, `/admin/webhooks`, `/admin/integrations`, `/admin/health`, `/admin/release-gates`.
- If a full CMS scope risks launch reliability, prioritize product CRUD, asset upload, release toggles and basic content editing; do not leave fake controls.

### 2.4 Critical journeys and state matrix

**Journey J1: Discover → product → buy → download.** Visitor arrives from social/SEO, sees sample, product facts, checkout, pays provider, returns to PENDING, webhook verified, order created idempotently, email/verified magic link grants library, server checks entitlement before download. Allow for delayed webhook, duplicate hook, refund, chargeback, reused link, invalid order, empty delivery asset.

**Journey J2: Free sample → email → download → optional opt-in.** Email is collected for resource delivery, marketing opt-in distinct where necessary; consent logged; download usable; clear confirmation and unsubscribe.

**Journey J3: Existing customer gets updated PDF/Skill.** Product version uploaded, hash validated, admin publishes, existing entitlements checked against license/version policy; email updates only under lawful basis; library shows current version and changelog.

**Journey J4: Bundle purchase and partial component readiness.** All advertised included materials must be available; if not, bundle pre-sale clearly scoped and buyer's expectations/rights handled. Prefer only sell bundles with deliverables complete. Bundle composition stored as immutable snapshot per order/licensing rules.

**Journey J5: Multiple provider events.** Duplicate, delayed, out-of-order, refunded, chargeback and failed events; verify HMAC, durable event store, idempotent processing and optional verification against provider API.

**Journey J6: User without entitlement attempts direct asset URL.** No public asset leak, 403/not-found without metadata disclosures, server logs attempted access, short-lived signed URL bound to private key.

**Journey J7: Admin updates price, content, cover, state.** Preview draft, validate required fields/files, publish with audit trail and cache/index invalidation; existing purchases retain applicable entitlements.

**Journey J8: Legal/operational notices.** Operator completes jurisdiction identity and reviewed legal pages; analytics consent before nonessential tracking when required; support for data requests; no false audit certification.

**Journey J9: Affiliates.** Track only through supported provider/referrals and valid consent; attribution and payout rules clear; mock/inactive until provider approved.

**Journey J10: Non-JS / keyboard / slow network / mobile.** Core catalog and navigation usable; skeletons, clear failure/success/fallback states; reduced-motion.

## 3. PRODUCT CATALOG AND COMMERCIAL DESIGN

### 3.1 Product entity / types

Types: `FREE_RESOURCE`, `PDF_GUIDE`, `VISUAL_ATLAS`, `AGENT_SKILL`, `TEMPLATE`, `CHECKLIST`, `LAB`, `PRODUCT_BLUEPRINT`, `BUNDLE`, `TRAINER_LICENSE`.

Lifecycle: `IDEA` → `PLANNED` → `IN_PRODUCTION` → `IN_REVIEW` → `READY` → `PUBLISHED` → `ARCHIVED`, with separately tracked `COMING_SOON` visibility and `PURCHASABLE` flag. `PUBLISHED && PURCHASABLE` requires required real files/verified checkout mapping/operator gate. Free can be published with actual verified files and free fulfillment configured.

Catalog examples: `FREE01`, `PDF01–PDF12`, `PPT01–PPT06`, `SK01–SK12`, `T01–T36`, `LAB01–LAB06`, `BP01–BP06`, `EC-001–EC-100`, plus edition/bundle SKUs. Cases can be book sections and optionally stand-alone indexed learning pages; not necessarily 100 distinct checkout products.

### 3.2 Commercial editions (hypotheses, never fabricated checkout)

- **Free — Reality Check**, €0. Initial download file bundle only when created.
- **Builder Edition**, suggested €79, Level 1 + Level 2 materials and relevant skills/templates that are actually complete.
- **Professional Edition**, suggested €179, Levels 1–4; launched only when those materials are ready.
- **Ultimate Engineering Library**, suggested €299, Levels 1–6, encyclopedia and licensed extras as explicitly advertised.
- **Complete Mastery Bundle**, suggested €449, comprehensive educational library + skills. This may overlap Ultimate: resolve naming/entitlement conflicts before sales; never sell two indistinguishable bundles with fake differentiation.
- Standalone skills suggested €29–€59; multi-skill suites suggested €99, €179, €299. Standalone guides/PPT sets priced only after validated research and launch plans.
- Trainer/team license separate, not a trivial toggle. Define number of seats, internal teaching usage, editable decks, redistribution limitations, license enforcement and update duration.

All prices stored in DB/provider variants. VAT display and any discounts must use the correct provider behavior; no static contradictory EUR amounts in checkout UI. Use developer/test pricing until business owner approves actual price and product.

### 3.3 Product detail page anatomy

Breadcrumbs; title/subtitle/tag; cover image and optional hover/showcase carousel; tier; type; current availability; user outcome; contents included (file formats, chapter list, files, size, version); table of contents; compatibility & prerequisites; what it teaches; mini preview of first pages/slides/sample case; what's included and excluded; update policy; licensing; legal purchase terms; support; FAQ; related products; primary CTA contextual (download/checkout/coming-soon/waitlist); mobile sticky buy/download CTA where appropriate; copy share and SEO metadata; transparent price including taxes at provider checkout.

### 3.4 Catalog seed data requirements

Seed all planned items and editorial outlines included later in this document with `status=PLANNED` and polished actual placeholder covers. Render catalog sections with accurate statuses. Initial category pages should not be empty-looking; show helpful roadmap, free material only if actually ready, and 'notify me' where feature is implemented. Publishing depends on real authorized content and live integrations.

### 3.5 Digital delivery / licensing policy design

Licenses: personal-use default; team/trainer variants separately. Files versioned `semantic/edition`, SHA-256 and changelog, compatibility notes for agent skills, license text included in ZIP. Short-lived signed asset URLs, download audit, rate limits; share links are not license rights. Updates available for defined purchased period only, not promise of lifetime access unless contract specifically says so. Refund/revocation models account for legal rights, provider events and practical file copies already received.



## 4. IMPLEMENTATION ARCHITECTURE — CHOSEN DEFAULT

The Codex implementation should use a cohesive TypeScript full-stack deployment unless repository constraints compel a change:

- **Nuxt 4** with Vue 3, TypeScript strict, Nitro server for SSR + typed server API.
- Tailwind CSS with accessible headless UI primitives; minimal dependencies, local design tokens, full responsive support. Motion kept modest.
- **PostgreSQL** with Drizzle ORM and SQL migrations. Transactions/unique constraints essential for payments and entitlements. Zod (or equivalent) validation on **every server boundary**.
- Product/article editorial source: Markdown/JSON curated in repository and/or product DB. The canonical catalog and availability flags must stay coherent. On admin, support metadata changes in DB; build a meaningful real editor and safe content publishing, not fake WYSIWYG if out of scope.
- Authentication: secure passwordless email magic link or established maintained auth library with verified email/session revocation/anti-enumeration; session cookies HttpOnly Secure SameSite. Admin strong auth + MFA where possible, minimum role admin/editor/support/customer.
- **Lemon Squeezy** for checkout/MoR and provider receipts; adaptable `PaymentProvider` module so tests can run with fake sandbox provider. Use test mode until operator approval.
- **S3-compatible private object storage** for paid assets and preview images with clearly separated buckets/prefixes; dev can use MinIO via Docker. SSR images/cover SVGs public; paid ZIP/PDF/PPTX NOT served from `/public`.
- Email provider abstracted (`EmailSender`) with dev file/mail catcher, production configured provider; emails contain no secrets.
- Privacy-first analytics (server event and/or approved privacy-safe service), optional nonessential marketing instrumentation behind consent controls where applicable.
- Docker Compose for dev PostgreSQL/MinIO/email catcher, reproducible Node build/healthchecks, Dockerfile, production deploy guide (generic VPS with reverse proxy + TLS, or compatible hosting), CI GitHub Actions.
- Tests: Vitest, Playwright, integration DB/provider contract tests, a11y automated checks complemented by manual checklist.
- Validate current documentation and supported versions during implementation. Do not invent package APIs or hardcode stale dependency versions. Pin dependencies/lockfile; document maintenance and upgrade policy.

### 4.1 Suggested repository structure

```text
ai-engineering-store/
├── AGENTS.md                 # concise durable rules; link to docs, no duplicated mega-prompt
├── README.md
├── package.json
├── pnpm-lock.yaml
├── nuxt.config.ts
├── drizzle.config.ts
├── app/
│   ├── assets/              # tokens/styles
│   ├── components/          # base + domain-specific
│   ├── composables/
│   ├── layouts/              # public, account, admin
│   ├── middleware/
│   ├── pages/               # all routes in §2
│   ├── plugins/
│   ├── stores/              # only if justified
│   └── utils/
├── server/
│   ├── api/                 # versioned/order/catalog/account/assets/admin endpoints
│   ├── middleware/
│   ├── services/            # catalog, payments, files, email, auth, legal, consent
│   ├── repositories/
│   ├── validators/
│   ├── webhooks/
│   └── utils/
├── db/
│   ├── schema/
│   ├── migrations/
│   └── seeds/
├── content/
│   ├── products/
│   ├── editorial/
│   ├── help/
│   └── legal/              # draft/unpublished placeholders
├── public/
│   ├── covers/              # illustration SVG placeholders only
│   ├── brand/
│   ├── og/
│   └── previews/            # PUBLIC sanitized preview pages only
├── assets-source/           # source design SVG and generator script
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── fixtures/
│   └── accessibility/
├── scripts/                 # health, seed, content/cover generation, release checks
├── docs/
│   ├── brief/MASTER_SPEC.md
│   ├── product-catalog.md
│   ├── content-production.md
│   ├── architecture.md
│   ├── security.md
│   ├── legal-launch-blockers.md
│   ├── deployment.md
│   ├── rollback.md
│   ├── admin-runbook.md
│   ├── accessibility-audit.md
│   ├── test-plan.md
│   └── decision-records/
├── infra/
│   ├── docker/
│   ├── compose.yml
│   └── ci/
├── .env.example
└── .github/workflows/
```

### 4.2 Domain entities and key relationships

**Use real migrations, database constraints, indexes and type-safe access.** Suggested tables below, normalized where appropriate:

| Table / aggregate | Critical fields and invariants |
|---|---|
| `users` | UUID, email unique case-folded, name optional, verified timestamp, locale, lastLoginAt, disabledAt, deletedAt; no plain secrets |
| `sessions` / `magic_links` | Token hashes, expiry, single-use and revocation; prevent reuse/race |
| `roles` / `user_roles` | Customer, support, editor, admin; deny by default; server-side guards |
| `catalog_products` | SKU unique, slug unique, kind, tier, name, blurb, description, status, marketingVisible, publishAt, latestVersion, editorialReviewedAt, legalReviewedAt |
| `catalog_categories` / `product_categories` | Facets/ordering; indexes |
| `product_versions` | Product FK, version unique scoped to product, release notes, publishedAt, compatibility matrix; immutable historical identifiers |
| `product_files` | Version FK, private bucket/key, hash, byte size, MIME, original name, uploadedBy, scanStatus, isPreview, publishedAt |
| `product_media` | Public safe cover/preview, alt, attribution, dimensions, sort |
| `bundles` / `bundle_items` | Bundle composition, edition/upgrade rules, snapshot on sale; no phantom components |
| `product_prices` | Currency cents integer, provider variant ID, status, country applicability/provider price mapping, auditedAt |
| `orders` | Provider IDs unique, customer email, user FK nullable, status, amounts/currency according to provider, createdAt, refundedAt; no blind trust of client |
| `order_items` | Product SKU, version/edition snapshot, provider item IDs unique, quantity, amounts, license code |
| `payment_events` | Provider event ID/fingerprint unique, raw digest, signatureValidated, payload sanitized, receivedAt, processedAt, processing status/retry count; dedupe |
| `entitlements` | User/order item/product, accessState, license type, granted/revoked reason and time, updateUntil; unique relevant tuple |
| `download_events` | File/version/user/entitlement, IP pseudonymization where appropriate, timestamp, result; retention-limited |
| `email_leads` | Email, source, status, createdAt, consent evidence and timestamps |
| `marketing_consents` | User/lead, channel/purpose/version, status, source, timestamp, method, evidence; unsubscribe history |
| `content_articles` | slug, locale, body/repository ref, revision, SEO, publishState, author/editor, timestamps |
| `content_pages` | site copy/FAQ/home sections with publish status and revision |
| `legal_documents` | type, jurisdiction, revision, reviewedBy placeholder, effectiveAt, publishedAt, content, draft flag |
| `cookie_preferences` | consent categories and version, timestamp, user/session pseudonym, signal |
| `support_requests` | ticket ID, topic, details, user/email, status, retention, audit |
| `user_privacy_requests` | request type, identity-verified, status, dueAt as applicable, completion notes |
| `product_waitlists` | email/customer id, product, preference, consent state; avoid duplicate emails |
| `admin_audit_events` | who/when/entity/action/old-new summary without secrets |
| `settings` | brand/contact/support info, feature flags, provider test/live gates, footer/operator identity; schema validated |

Possible later: affiliate referrals only if supported by the configured provider and tracking permission; event analytics aggregated; coupons sourced from provider rather than misleading local-only discounts.

**Invariants**:
- Database is source of truth for entitlements/access; the payment provider is source of truth for payment status. Reconcile divergences; do not grant based solely on `checkout=success` query.
- Payable item requires a valid provider product variant AND published real product files, except transparent explicitly authorized pre-order with legally reviewed disclosure (pre-orders disabled by default).
- A paid file `storageKey` is never exposed in public JSON or a publicly cacheable response.
- Historic purchase must survive product rename/slug change; order snapshots immutable.
- Refund/chargeback must have defined entitlement policy and respect mandatory rights; avoid silently destroying proof of purchase.
- All admin writes logged; only admins may access credentials/provider settings; no arbitrary raw Markdown/HTML XSS exposure.
- Every state transition validated server-side with atomicity, including duplicate webhook concurrency and entitlement uniqueness.

### 4.3 API surface (example contract names)

Public read-only: `GET /api/catalog`, `/api/catalog/:slug`, `/api/catalog/search`, `/api/categories`, `/api/articles`, `/api/pages/:slug`, `/api/settings/public`, `/api/health` (minimal non-sensitive health), `/api/free/resources`.

Customer: `POST /api/auth/magic-link/request`, `POST /api/auth/magic-link/consume`; `GET /api/me`, `/api/me/library`, `/api/me/orders`, `/api/me/downloads`; `POST /api/download/:fileId` (issues short-lived signed URL after auth/entitlement); `POST /api/me/export-request`, `/api/me/deletion-request`; `POST /api/contact`.

Commerce: `POST /api/checkout/create` (only published purchasable variant, validate CSRF/session where needed, price source server-side), `POST /api/webhooks/lemonsqueezy` (verify raw body HMAC), `GET /api/checkout/resolve?token=...` (token not a grant), provider reconciliation task.

Admin: `/api/admin/products`, `/api/admin/product-versions`, `/api/admin/uploads/presign`, `/api/admin/publish`, `/api/admin/orders`, `/api/admin/webhooks`, `/api/admin/settings`, `/api/admin/audit`, `/api/admin/leads`, `/api/admin/content`, `/api/admin/health` (guarded). Use appropriate verbs and scoped IDs. API schema tests should be generated from contracts and include malformed input, unauthorized access and feature flags.

### 4.4 Payment mechanics and edge cases — Lemon Squeezy

Read the live official docs **during implementation**: https://docs.lemonsqueezy.com/guides/developer-guide/taking-payments and https://docs.lemonsqueezy.com/guides/developer-guide/webhooks and https://docs.lemonsqueezy.com/help/webhooks/signing-requests .

1. Admin maps internal product variant/SKU to Lemon Squeezy store/variant IDs. Test/live config separate; store/variant IDs never trusted from browser; browser sends product SKU only.
2. Site generates the checkout link server-side, optionally passes a signed internal correlation ID via provider custom data; no relying on untrusted email alone for account linking.
3. Checkout can be hosted or overlay; always have hosted fallback and correct closing/re-entry behavior.
4. Provider webhook received as **raw bytes**. Validate HMAC-SHA256 `X-Signature` in constant time against configured signing secret BEFORE parsing or processing. Return 2xx only when safely persisted; queue/background processing if needed.
5. Idempotency and concurrency: provider resource IDs plus event uniqueness, transactional order/entitlement mutations, replay-safe handler, ignore duplicate effect, process out-of-order states using provider lookup/reconciliation.
6. After redirect show `Processing your purchase` until the server confirms verified `order_created`/required provider state. If delayed, show support and refresh instructions; never display unlocked paid files prematurely.
7. Test duplicate payment notifications, refund, canceled/refunded order, email mismatch, multiple variants, old cart URL, incomplete provider metadata, failed database transaction, temporarily unavailable API, local user created after payment, purchase without prior account.
8. Provider handles its own sale tax/invoicing as MoR according to current agreement, while operator remains responsible for own income and local requirements. Verify platform/account eligibility; no live payments before merchant approval and business/legal readiness.
9. For one-time products, focus on provider order and file fulfillment. Subscriptions only if actually offered; do not build recurring billing UI that does nothing.
10. Retry/replay UI for failed webhooks in admin with audit logs; avoid blind manual toggles that create fraudulent entitlement states.

### 4.5 Secure digital-file storage, download and update

- Private bucket; paid files never committed to public repository or served from public CDN path.
- Admin gets restricted time-limited presigned upload; validate MIME by content, extension, size, SHA-256 and optional malware scan; quarantine before publication.
- On download request, authenticated customer + ownership/order validation + edition/upgrade rights + asset publication + audit record → short-lived signed object URL (e.g. ~60s configurable). No `?email=` URLs as proof.
- Optional anonymous guest download via strong time-limited one-time claim token linked to verified provider purchase; rate-limit, never expose token in logs, require re-auth for future access.
- ZIP skills ship `SKILL.md`, relevant scripts, docs, test fixtures and license. Include checksums/manifest and compatible versions, not secret keys.
- Paid preview pages sanitized (separate public assets, watermarks only if useful); do not leak full PDF in social OG previews or content endpoints.
- Publish versions with changelogs, compatible OS/tools, minimum runtime; email update notices according to communications preference/legal basis; respect access window.

### 4.6 Admin operations in depth

Product editor fields: ID/SKU/type/collection/tier/title/subtitle/slug/description/content outline/outcomes/prerequisites/formats/cover/social OG/previews/FAQs/versions/inclusions/related products/SEO/schema/license/compatibility/status/currency/provider mapping/release gates. Draft preview, autosave as appropriate, publish with explicit review and audit.

Asset management: upload → scan/validate → version → preview → attach product → publish. Never let upload alone grant entitlement. Support download filename normalization, SHA, uploader, external backup policy.

Order/reconciliation dashboard: real provider sync, statuses, held/pending/refunded, support lookup by secure email, event failure handling; no ability to mark fake charge as paid without controlled verified provider action.

Lead management: download requests, consent statuses, unsubscribe, exports with access controls. Never mix consent to receive transactional file with marketing consent without valid legal basis.

Release gate dashboard: required legal operator fields, domain, sender email DNS, processor approval, correct test mode, backup/restore proof, real products, documents reviewed, TLS, production config; only then allow live selling. Block toggling a live flag accidentally.

## 5. SEO, DISCOVERY, MARKETING AND ANALYTICS

- Server-render all core public pages and canonical metadata. Generate unique title, description, social OG/Twitter card, canonical URL, hreflang only for real translations; accessible JSON-LD schema `Product` only when current commercial info real and accurate, `Article`, `BreadcrumbList`, `FAQPage` only with applicable content/schema guidance.
- XML sitemap only publicly indexable pages. Noindex auth/admin/checkout/duplicates/internal filtering. Search indexing should not expose draft products or data.
- Editorial architecture: top-level topical hubs on product completeness, agent mistakes, SaaS launch, privacy, debugging, architecture, security, payments, skills; articles with code examples and links to relevant catalog items.
- Acquisition: original technical educational carousels/images (not fake before/after), shareable mini-audit results, downloadable lead magnet, distribution link parameters and optional affiliate links.
- Provide opt-in email list / segmentation for freebie, guides, skills, product updates. Do not send promotions on mere purchase unless lawful basis/consent policy permits.
- Analytics (if enabled): anonymized/consented pageview, product view, preview open, CTA click, checkout initiation, checkout confirmation, successful delivery, refund, lead signup; conversion funnel and attribution. No fabricated analytics demo with fake production numbers; label sample data.
- Accessibility and page-speed budgets on mobile: Core Web Vitals targets aspirational, real Lighthouse/CrUX measurements recorded; lazy load below fold artwork; avoid hydration of content-only components; responsive images; caching with safe exclusions.
- Search needs typo-tolerant basic full-text across catalog and posts; predictable empty states, accessible controls and URL-query sync. No need for paid Algolia at launch.
- Add social share cards OG designed from truthful product data. Robots noindex draft and account routes.

## 6. LEGAL, PRIVACY AND COMPLIANCE — CONDITIONAL, NOT AUTOMATIC

**Before going live, the business owner MUST identify:** legal operator name/form, country of establishment, trading address/required disclosure, contact email, company/tax IDs where required, markets/consumer categories, payment contract, data controllers/processors, refund rules and document review. Provide editable draft placeholders, never invented factual operator details.

- Privacy notice: categories/purposes/legal bases of processing; supplier list; retention; international transfers; rights; contact; profiling/marketing as applicable. Align text with actual collected data/event tracking, email/analytics and hosting.
- Cookie and non-essential tracking: consent management if legally required, prior blocking, reject/accept/manage with symmetry, storage and withdrawal; essential cookies distinguished; respect regional policies without blanket global claim. Security session cookies are essential where justified.
- EU consumer digital content: precontract disclosures, total price, functionality/compatibility, digital delivery, statutory conformity rights, withdrawal rules and exceptions. Do not pre-tick withdrawal waiver. Check explicit consent/acknowledgement requirements before supplying immediately where an exception is invoked; not universal. Legal review required.
- Terms of sale/licensing: scopes, rights, version updates, support, files redistribution, team/trainer license differences, cancellations/refunds, operator identity; statutory rights cannot be waived via boilerplate.
- Email: transaction/service communications distinguished from marketing; suitable unsubscribe and consent proof where required; retention/deletion; sender-domain SPF/DKIM/DMARC and bounce handling in production.
- Accessibility: implement against WCAG 2.2 AA as engineering target, manually validate screen reader/keyboard; applicable national/ecommerce rules checked by jurisdiction, no unverified certification claim.
- Data subject workflows: verify request identity, export, deletion/retention exception handling, account anonymization, constraints around financial record keeping, backup retention; document incident response.
- Legitimate consumer contact and complaints process; legal footer links functional and finalized before launch.
- Any legal templates shipped as paid material must be jurisdiction-specific, annotated and independently reviewed; legal readiness skill is not legal advice nor a compliance certificate.

## 7. SECURITY AND ENGINEERING REQUIREMENTS

Threat model: credential theft, unauthorized order access, direct paid asset link leaks, admin compromise, CSRF, XSS from rich content, SQL injection, SSRF in external previews, signed URL leakage, unsafe upload, dependency compromise, billing event forgery/replay, newsletter abuse, privacy exposure, admin IDOR/BOLA, cache of private content, clickjacking, provider API abuse.

Security controls:
- Server-only secrets with validated env config; secret manager/env runtime, no client exposure, no `.env` in Git.
- Auth session HttpOnly Secure SameSite cookie with rotation/revocation and expiry; users and admin RBAC; audit critical admin actions.
- Input validation + parameterized SQL/ORM; output escaping; sanitization for Markdown/HTML; strong CSP and appropriate headers; no arbitrary HTML from CMS.
- Account/email/login/API/download rate limiting, anti-enumeration, bot resistance that does not block legitimate people; passwordless token is single-use and hashed.
- CSRF protection for cookie-authenticated writes; CORS restrictive; signed checkout/provider payload sanity; webhooks raw HMAC + idempotent transactional processing.
- Paid storage strictly private, signed links short-lived, limit enumeration/metadata leaks; do not store customer PII in object paths.
- Least-privilege object storage, DB, CI, provider API keys; dependency scanning and pinned lockfile; SBOM when practical.
- Encrypted transit TLS and database/storage encryption where available; backup/restore validated; no customer secrets in logs or analytics.
- Secure upload processing, size/resource limits, MIME sniffing, file scanning where provided, path traversal prevention.
- No admin endpoint from public unguarded paths; tenant/resource authorization checked on every nested object.
- Error pages must not expose traces, env values or credentials.

## 8. ACCESSIBILITY, DESIGN STATES AND UX ACCEPTANCE

- WCAG 2.2 AA engineering target; correct semantic landmarks/hierarchy, form labels, error associations, visible focus, skip link, keyboard nav, modals with focus traps/restoration, accessible disclosure/accordion, toast announcements, alt text, charts textual alternatives, touch target sizing, zoom, color contrast, reduced motion.
- Localization: English public interface with translation-ready message keys, locale-sensitive dates/price, currency format, accessible lang and date/fiscal disclaimers. Do not present untranslated pt-PT pages or hreflang as live.
- Critical UI states: skeleton while loading, error with retry, no results, unauthorized, expired link, email sent, form invalid, failed checkout, pending order, verifying payment, download unavailable, unpublished content, out-of-stock is not a digital product issue, feature disabled, offline.
- Visual QA: desktop 1440/1920, tablet 768, mobile 375/320; no horizontal overflow; header, filters, product cover, purchase CTA, legal footer work across sizes.
- Successful forms must send real request & show server-confirmed result, not just front-end success. All buttons have keyboard/hover/disabled/loading behavior and distinct labels.

## 9. TEST PLAN, ACCEPTANCE CRITERIA AND RELEASE GATES

### 9.1 Automated levels

- `lint`, `typecheck`, `unit`, `integration`, `e2e`, `build`, migration checks and formatting in CI; no green claim if command wasn't run.
- Unit: product publish eligibility, bundle entitlement math, price availability, role guards, state-machine transitions, consent, URL safe builder, content frontmatter validation.
- Integration: Postgres in test container, duplicate webhooks, paid/free entitlement, transaction rollback, refund handling, owner lookup, presign file, consent audit, admin access, marketing opt-out.
- E2E Playwright: public discovery→filter→detail→preview; free claim (with mock provider), purchase/confirm via payment mock; pending state; account library; download; no entitlement; admin publish; real user corrections; mobile keyboard.
- Security checks: XSS payload in article/product fields, CSRF, login token replay, IDOR, improper caching, webhook forgery, expired signed links, brute-force throttling, direct object path access, checkout price tampering.
- Accessibility: axe checks plus manually recorded keyboard/screen-reader passes on important pages. Machine checks alone do not certify compliance.
- Performance: SSR first content, image payload, caching headers, DB indexes; bench under realistic constraints.

### 9.2 Minimum release acceptance scenarios (must be demonstrated)

1. All site routes in §2 route correctly; no blank screens or dummy dead buttons.
2. Catalog contains all planned items with consistent IDs and real placeholder covers.
3. Product statuses truthful; unavailable items cannot check out.
4. Search/filter/sort works with URL state, including no-results case.
5. Fully responsive header/nav/catalog/detail/cart or buy CTA/footer.
6. Original illustrations and all cover assets accessible and appropriately named.
7. Product previews exist as labeled mock/sample, without leaking paid material.
8. Language keys are localization ready; English copy final and proofread.
9. SEO titles, canonical and sitemap avoid drafts/private pages.
10. All legal footer routes render meaningful labeled drafts; LIVE blocked until operator identity/review.
11. Privacy + cookie preference control is real and correctly gates tracking when necessary.
12. Consent/lead forms persist server-side and respect opt-in/opt-out.
13. Contact form persists/sends via test adapter; anti-spam and privacy note.
14. Account sign-in works with mock mail and secure session.
15. Unauthenticated customer data requests return 401/redirect.
16. Non-admin cannot read or write admin resources.
17. Admin CRUD product creates revision, status and auditable history.
18. Admin file upload quarantine/version/review and private storage.
19. Wrong price/variant from client rejected on server.
20. Checkout creation only for eligible products in provider sandbox.
21. Complete page never grants access merely from redirect query.
22. Signed valid webhook accepted and durable.
23. Forged signature rejected.
24. Duplicate webhook produces single order/item entitlement.
25. Out-of-order event results reconciled and logged.
26. Refund/chargeback access policy tested.
27. Guest purchase maps safely to account access.
28. Paid file direct public URL is unavailable.
29. Unauthorized download rejected.
30. Authorized download returns short-lived signed URL.
31. Expired download link fails; new authorized link works.
32. Updated file version appears for existing eligible buyers.
33. Entitlement to one SKU does not grant another.
34. Bundle permissions are exact and documented.
35. Product license exists and shown before sale.
36. Provider connection status clear in admin.
37. Transactional email in dev mail catcher; production disabled without verified sender.
38. Marketing unsubscribe works and is persisted.
39. Logs have no secrets/provider webhook payloads containing unnecessary PII.
40. Database migrations apply idempotently/cleanly from empty DB.
41. Seed is repeatable without duplicate records.
42. Automated tests cleanly pass in local documented commands.
43. Docker dev stack boots from README.
44. Production Docker build succeeds and healthy instance responds.
45. Backup job and successful restore evidenced in staging.
46. Defined rollback instructions tested for site release, not destructive schema changes.
47. Server error and unavailable provider have graceful recovery messages.
48. Mobile/keyboard/contrast accessibility checks recorded.
49. Performance budget and SEO checks recorded on staging.
50. Launch blocker checklist includes legal identity, reviewed terms, seller eligibility, domain/TLS, email DNS, product actual files, correct checkout provider, customer support, evidence and active monitoring.

### 9.3 Deploy requirements

Development: `docker compose up -d` for Postgres/MinIO/mail catcher; `pnpm install`, `pnpm db:migrate`, `pnpm db:seed`, `pnpm dev`; executable README and env docs.

CI: lint/typecheck/unit/integration/e2e/build, dependency scanner, no committed secrets, migrations test. Protected production branch/approval and tagged release. Staging environment should mirror production enough to test checkout sandbox and asset permissions.

Production reference: managed Postgres preferred if affordable, private object bucket, Node/Nitro SSR container, Caddy or nginx with automatic TLS, secure headers, backups, daily restore smoke test or scheduled documented tests, rotation policy, process restart, health endpoint, external uptime monitor, error tracking according to consent/retention.

Document: infra topology, DNS records, TLS, secret setup, `.env.example`, provider credentials test/live, webhook callback configuration, backup schedule, RPO/RTO targets, restoration exercise, incident response, DB migration, deploy and rollback commands, smoke tests, release notes. Never claim deployment to domain without actual credentials/actions.

### 9.4 Environment variables (examples only)

```dotenv
NODE_ENV=development
APP_BASE_URL=http://localhost:3000
DATABASE_URL=postgresql://app:replace_me@localhost:5432/ai_engineering
SESSION_SECRET=replace_with_32plus_random_bytes
AUTH_EMAIL_FROM=dev@example.invalid
EMAIL_PROVIDER=mock
EMAIL_API_KEY=
STORAGE_PROVIDER=s3
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_REGION=us-east-1
STORAGE_BUCKET_PRIVATE=paid-assets
STORAGE_ACCESS_KEY=replace_me
STORAGE_SECRET_KEY=replace_me
LEMONSQUEEZY_MODE=test
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_WEBHOOK_SECRET=
SITE_LIVE_PAYMENTS_ENABLED=false
SITE_ALLOW_FREE_DOWNLOAD=false
ANALYTICS_ENABLED=false
MARKETING_EMAIL_ENABLED=false
BRAND_NAME=AI Engineering Mastery System
SITE_LEGAL_OPERATOR_CONFIGURED=false
```

`SESSION_SECRET`, payment secrets, private storage keys, mail keys and operator identity MUST be injected by the user at deployment, and never filled with invented values or committed into Git. Missing keys must fail safely, especially in production.

## 10. EXECUTION PLAN FOR CODEX — PHASED, VERIFIED, CONTINUOUS

This user wants a functioning complete website rather than only a design, but implementation is too large for one uncontrolled monolithic edit. Proceed through explicit milestones and keep documentation/checkpoints. Do not ask the user to restate established requirements; note unavoidable external blockers only when they truly require secrets, legal identity, purchase account setup or final live deployment authorization.

### Phase 0 — Inspect and scaffold

- Inspect the repository, available tools, environment and docs; choose dependency versions verified against current documentation; set architecture decision records. Initialize Git/lockfile, Nuxt 4 TS app, styles, testing, lint, Docker dev stack, Drizzle schema and migrations. Copy this brief into `docs/brief/MASTER_SPEC.md` and author concise `AGENTS.md` linking it, plus `PLANS.md` with phase completion, blockers and verification log.
- Implement design tokens/components/storyboard quickly, actual responsive site shell, SEO config and graceful error pages.

### Phase 1 — Full public experience, catalog and covers

- Implement all category/detail/bundle/free/blog/help/legal routes; seed entire catalog; original branded SVG covers delivered with this starter; OG templates, responsive layout, states, functional catalog search filters and sort; real preview viewer components; footer/nav and mobile menu. Draft content must be labeled. No purchase CTAs on unavailable items.
- Validate mobile and SEO structure. A reviewer should be able to browse the entire planned catalog without encountering false products or visual holes.

### Phase 2 — Identity, admin and content operations

- Implement DB, session auth, RBAC, admin product/catalog/cover/version CRUD, file-upload/quarantine, SEO and content editor, audit logs, privacy preference storage, lead/waitlist forms. Ensure all public pages are populated with meaningful copy and accurate roadmap states.

### Phase 3 — Commerce, downloads and email

- Payment provider adapter + Lemon Squeezy checkout test mode + webhook verification/idempotency + order/entitlement engine; free-product claim; secure object storage, signed download; customer library/orders; email transactional dev adapter; refunds and delayed orders; e2e purchase sandbox/mock tests. Keep live payments disabled.

### Phase 4 — Marketing, support, analytics and affiliates

- Editorial/SEO workflows, real consent-aware email signup/unsubscribe, campaign tracking, resource delivery, help center, contact/support, lead capture, approved affiliate referral integration where feasible, privacy-safe conversion analytics and admin dashboard. Do not fake paid provider features.

### Phase 5 — Hardening, deployment and handover

- Complete a11y, security, tests, build and CI, load testing appropriate to budget, backups/restore, secrets and headers, release gates, Docker production setup, staging and deploy docs. Replace missing real operator/prod credentials with explicit documented blockers and demonstrate local/staging-ready behavior; DO NOT report 'live' without deployed host/payment/operator docs.

### 10.1 Codex operating instructions

**User prompt for Codex:**

> Read `CODEX_MASTER_SPEC.md` thoroughly as the product source of truth. Build the website as a real, deployable, end-to-end Nuxt 4/TypeScript/PostgreSQL ecommerce application, using the included SVG cover placeholders and full editorial catalog. Execute Phases 0–5 in order, coding and testing rather than writing only a plan. Create a short `AGENTS.md` linked to the spec, an up-to-date `PLANS.md`, and maintain `docs/build-log.md` with actual commands/results and unavoidable blockers. Implement truthful `PLANNED` product states, secure customer library/downloads, functional admin and test-mode commerce. Never fake live transactions, existing course files, reviews, compliance or completed integrations. Work with the context and defaults supplied without repeatedly asking unnecessary questions. Stop only for true external blockers (merchant credentials, legal business identity, final production domain/secrets). Commit by coherent phases, and document evidence of functionality. Finish by providing exact local development, build, test, staging and production activation instructions plus any items that only the operator can complete.

**Implementation discipline:** every phase ends with typecheck/build/test where relevant and a short verified report, before next phase. Do not claim success without executed commands. Avoid huge AGENTS instructions repeated at each prompt. Reference files selectively.

### 10.2 Production launch blocker table

| Gate | Can Codex complete alone? | Requirement |
|---|---|---|
| Website code / layout / covers / catalog placeholders | Yes | Functional, tested project |
| Database + auth + admin + file storage local | Yes | Verified migrations and flows |
| Merchant production account and verification | No | Operator registers/gets approved and provides securely |
| Paid product actual PDF/PPTX/Skill/ZIP files | Not supplied yet | Real authored reviewed content uploaded, no fake downloads |
| Actual business identity and applicable tax setup | No | Operator/legal/accounting professional as applicable |
| Reviewed privacy/terms/refund/legal policies | Cannot certify autonomously | Review for chosen jurisdiction and operator practices |
| Production domain + DNS control + secrets | No | Operator provides authorized access securely |
| Production mail sender/domain verification | No | Operator configures provider and DNS |
| Production billing end-to-end checkout | Requires merchant test/live setup | Test first, then authorized live transaction |
| Monitoring/backups and restoration proof on host | Partly | Configure on actual infrastructure and validate |

## 11. DOCUMENTATION AND REFERENCES FOR IMPLEMENTATION

Validate current documentation, do not assume these links prove a deployed configuration:
- Nuxt documentation: https://nuxt.com/docs/4.x
- Lemon Squeezy integration: https://docs.lemonsqueezy.com/guides/developer-guide
- Lemon Squeezy webhook signing: https://docs.lemonsqueezy.com/help/webhooks/signing-requests
- Agent Skills specification: https://agentskills.io/
- OpenAI Agent Skills overview: https://developers.openai.com/api/docs/guides/tools-skills
- Codex repository instructions and harness example: https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- NIST SSDF: https://csrc.nist.gov/pubs/sp/800/218/final
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- GDPR consolidated Regulation (EU) 2016/679, official EUR-Lex (verify current texts and national rules).

## 12. EDITORIAL CATALOG IMPLEMENTATION RULES

The appendices below are not blog posts or user-facing copy to be blindly pasted. They are the source catalog and curriculum specification. In the website, product pages need curated readable intros, learning outcomes, precise table of contents, illustrative covers, content/previews clearly marked as conceptual when files don't exist. There should be no filler cards or fake reviews. Search/tag related content by shared topical domain IDs. Every skill detail displays supported platforms, runtime/permissions, data it reads/writes, artifacts produced, audit scope and limitations. Treat sample prices as internal configuration until an operator approves them.

### 12.1 Product metadata schema (illustrative JSON, not direct API contract)

```json
{
  "sku": "PDF03",
  "type": "PDF_GUIDE",
  "slug": "complete-application-anatomy",
  "title": "The Complete Application Anatomy",
  "subtitle": "Everything a real application needs beyond its main features",
  "tier": "BUILDER",
  "status": "PLANNED",
  "marketingVisible": true,
  "purchasable": false,
  "formats": ["PDF"],
  "coverAsset": "/covers/PDF03.svg",
  "previewStatus": "ILLUSTRATIVE_ONLY",
  "license": "Personal license — terms pending legal review",
  "updatedAt": null,
  "chapters": [],
  "related": ["PPT02", "SK03", "T02", "BP01"]
}
```

Fields `version`/`releasedAt` must not exist as claimed release dates for unproduced items. Catalog derives only from truth, not attractive fiction.


# EDITORIAL & TOOLING CATALOG — COMPLETE CONTENT INDEX

> **This appendix is authoritative source content for product metadata and category detail pages.** All entries are PLANNED, not actual sellable documents. Chapter headings describe material to author and validate later, not present file contents. The website should use these exact IDs and cross-relations, while writing useful honest teaser copy. 100 failure cases are sections/learning objects, not necessarily separate purchase SKUs.

## A. TWELVE MAJOR PDF HANDBOOKS — DETAILED TABLES OF CONTENTS

### PDF01 — Product Discovery, Requirements & Engineering Thinking  
**Curriculum level:** FOUNDATION.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT01, SK02, T01, T02, LAB01.

**01. Engineering with AI**
- Traditional roles and their responsibilities.
- working software versus production-ready product.
- hidden product scope.
- ethical limits of agent autonomy.

**02. Product discovery**
- Audience, jobs-to-be-done and user segments.
- problem statement and desired outcomes.
- competition and assumptions.
- scope validation without building.

**03. Actors and stakeholder modelling**
- Anonymous visitors, registered users, customers, admins, support, moderators, team owners and external services.
- privileges.
- consent and identity boundaries.

**04. Functional requirements**
- Primary and secondary features.
- user stories and use cases.
- preconditions, postconditions and invariants.
- alternate and failure flows.
- dependencies.

**05. Non-functional requirements**
- Security and privacy.
- availability and resilience.
- performance and cost.
- accessibility and localization.
- observability and maintenance.

**06. Scope and prioritization**
- MVP versus production completeness.
- must/should/could and exclusion notes.
- release milestones.
- scope creep.
- technical debt transparency.

**07. Business rules and constraints**
- Eligibility, trials, quotas and limits.
- plan entitlements.
- geographic/legal constraints.
- data retention.
- timing and cancellation rules.

**08. Journey mapping**
- Discovery, registration, onboarding.
- paid conversion and renewals.
- support and reporting.
- suspension, cancellation and offboarding.
- interrupted journeys.

**09. Data specification**
- Entities, ownership and relationships.
- classification and sensitivity.
- collection purpose and lifecycle.
- export and deletion.
- audit metadata.

**10. Risk identification**
- Technical, legal, operational, commercial and security risks.
- probability/impact matrix.
- mitigations and responsible ownership.

**11. Engineering choices**
- Stack selection and maturity.
- build-versus-buy.
- architectural trade-offs.
- ADRs and reversible decisions.

**12. Complete product requirements documents**
- PRD structure.
- functional matrix.
- acceptance criteria.
- traceability and evidence.
- assumptions/open questions.

**13. Implementation planning**
- Vertical slices.
- dependencies and definition of ready/done.
- agent handoffs.
- stage review.
- measurable release criteria.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF02 — Context Engineering, Prompting & AI Agent Control  
**Curriculum level:** FOUNDATION.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT01, SK01, SK12, T06, LAB01.

**01. Agent mental model**
- LLM, agent, tools, environment and context.
- capabilities and limitations.
- separating claims from evidence.

**02. Spec-driven prompting**
- Objectives and acceptance criteria.
- inputs, output contracts and examples.
- constraints.
- scoping and non-goals.

**03. Context engineering**
- Repository map and relevant docs.
- persistent memory.
- context window pressure and contradictions.
- selective reading.

**04. Repository rules**
- AGENTS.md and CLAUDE.md conventions.
- hierarchy of instructions.
- rules vs. knowledge.
- minimal stable guidance.

**05. Planning safely**
- Read-only investigation.
- impact mapping.
- dependency analysis.
- pre-edit plan.
- approvals for risky actions.

**06. Controlled code editing**
- Diff review.
- small commits.
- branch strategy.
- no unrelated changes.
- rollback and checkpoint strategies.

**07. Investigation over guessing**
- Minimal reproductions.
- experiments.
- hypotheses and evidence.
- detecting placebo fixes.

**08. Agent tool permissions**
- Terminal, browser and file access.
- APIs and MCP.
- prompt injection and least privilege.
- approval gates.

**09. Anatomy of skills**
- SKILL.md frontmatter.
- references and scripts.
- installation scopes.
- testability and compatibility.

**10. AI failure modes**
- Hallucinated modules.
- invented APIs.
- simulated green tests.
- task drift.
- circular repairs.
- unintended repo edits.

**11. Sessions and handoffs**
- Compaction, loss of context and state reconstruction.
- decision records.
- handoff checkpoints.

**12. Verification-driven engineering**
- Tests and runtime evidence.
- independent reviewer.
- diff and contract checks.
- explicit uncertainty.

**13. Advanced workflows**
- Spec-first, test-first, planning and testing separation.
- multiple agents with defined file ownership.

**14. Privacy, cost and governance**
- Secrets, proprietary code, provider privacy.
- token/cost budgeting.
- audit and accountability.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF03 — The Complete Application Anatomy  
**Curriculum level:** BUILDER.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT02, SK03, T02, T07, BP01, LAB02.

**01. Product and website architecture**
- Public vs private vs admin surfaces.
- routing, subdomains and deployment.
- sitemap and information architecture.

**02. Public website essentials**
- Homepage, features, pricing, FAQ, about, contact and support.
- documentation and terms.
- correct identity/disclosure.

**03. Supporting and error pages**
- 400, 401, 403, 404, 409, 422, 429, 500, 502, 503.
- maintenance and downtime.
- suspended, disabled, expired, unauthorized.

**04. SEO and social presence**
- Titles and descriptions, canonical and hreflang.
- sitemap robots redirects.
- Open Graph.
- structured data.

**05. Registration and onboarding**
- Account creation.
- invite flows.
- verification and anti-abuse.
- initial project setup.
- incomplete onboarding.

**06. Authentication lifecycle**
- Login, logout and reset.
- magic links/passkeys/MFA.
- session expiration and token revocation.
- concurrent sessions.

**07. Account management lifecycle**
- Profile and preferences.
- notifications.
- credentials.
- export.
- deletion, suspension, ownership transfer.

**08. Teams and organizations**
- Roles and permissions.
- invite expiry and revocation.
- billing owner.
- tenant isolation.
- member removal.

**09. Navigation and responsiveness**
- Menus, breadcrumb and search.
- mobile layouts.
- keyboard/shortcuts.
- persistence and focus.

**10. UI component states**
- Inputs, tables, modals and uploads.
- disabled, loading, empty, pending, success, error.
- destructive confirmations.

**11. All asynchronous states**
- Offline/partial result.
- stale data.
- timeout and retry.
- polling and cancellation.
- optimistic update failure.

**12. Forms and validation**
- Client/server parity.
- errors and field-level help.
- duplicate submissions.
- draft saving and data-loss warning.

**13. Accessibility end-to-end**
- Semantic structure.
- keyboard and focus.
- contrast and motion.
- assistive tech.
- error announcement.

**14. Internationalization**
- Locale routing.
- timezone and DST.
- currency and decimal rules.
- Unicode, plurals and RTL.

**15. CRUD and data workflows**
- Ownership and RBAC.
- soft/hard deletion.
- history and restore.
- bulk operations.
- concurrent edits.

**16. Search, filtering, dashboards**
- Query design and pagination.
- filters and sorting.
- empty result.
- export and reporting.

**17. Notifications and messaging**
- Email, in-app, push, SMS.
- preferences and unsubscribe.
- retries, deduplication and delivery failures.

**18. Files and media**
- Size/type validation.
- malware and private storage.
- presigned URLs.
- transformations, deletion and retention.

**19. Background and scheduled tasks**
- Queue and worker lifecycle.
- retries, idempotency, poison jobs.
- progress and cancellation.

**20. Pricing and entitlements**
- Free/paid/trial.
- usage limits.
- feature flags.
- plan change.
- expiry and offline permissions.

**21. Payments and subscriptions**
- Checkout and failures.
- provider reconciliation.
- refunds and charges.
- cancelled subscriptions and access.

**22. Admin and back office**
- User and organization management.
- support.
- audit logs.
- sensitive actions.
- role separation.

**23. Legal pages and business identity**
- Privacy, cookie/terms/sales/refund info as applicable.
- contact details.
- IP/attribution and notices.

**24. Privacy lifecycle flows**
- Data export, deletion, consent management.
- processors.
- retention.
- backups and permitted exceptions.

**25. Support and trust**
- Help center, tickets, incident notices, status when maintained.
- abusive use.
- feedback and complaints.

**26. Infrastructure and operations**
- Dev/staging/prod.
- DNS/TLS, secret config.
- object storage.
- deploy and rollback.
- emails and backups.

**27. Security and reliability**
- Authorization by resource.
- concurrency and data integrity.
- rate limits.
- failure handling.

**28. Release and post-launch**
- Preflight checklist, evidence, owner acceptance.
- production smoke tests.
- support monitoring.
- vulnerability response.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF04 — Full-Stack Implementation Patterns  
**Curriculum level:** BUILDER.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT02, SK01, T14, LAB02.

**01. Frontend architecture**
- Composition.
- layouts.
- SSR CSR SSG hydration.
- local/server/global state and typed contracts.

**02. Backend architecture**
- Controller/service/domain/persistence.
- server-side authorization.
- consistent error and validation layers.

**03. API design**
- REST/GraphQL conventions.
- OpenAPI.
- schemas.
- errors.
- versioning.
- cursor pagination.

**04. Data modelling**
- Entities, relationships and schema constraints.
- indexes.
- immutability and audit records.

**05. Forms and state**
- Optimistic updates and rollback.
- validation.
- multi-step forms.
- duplicate submit prevention.

**06. Authentication implementation**
- Secure sessions and tokens.
- authorization checks.
- lifecycle events.

**07. External integrations**
- Timeouts, retries, webhooks, signatures, rate limits, circuit breakers and fallbacks.

**08. Storage and uploads**
- Public/private objects.
- validation.
- upload processing and metadata.

**09. Realtime systems**
- WebSockets/SSE.
- reconnection.
- ordering, deduplication and permission changes.

**10. Asynchronous jobs**
- Queues, idempotency, transaction-outbox.
- workers and dead-letter jobs.

**11. Errors and observability**
- Structured errors and logs.
- correlation IDs.
- user-facing error codes.

**12. Reusable patterns**
- Adapters, repositories, dependency injection, service layering.
- avoid needless abstraction.

**13. AI generated anti-patterns**
- Duplicated logic, god components, fake validation, frontend-only permission, overdependency.

**14. End-to-end implementation workshop**
- Specification to DB to API to UI, tests, docs and review.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF05 — Software Architecture, Data Integrity & Reliability  
**Curriculum level:** PROFESSIONAL.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT03, SK06, T15, T34, LAB03.

**01. Architectural styles**
- Layered, hexagonal, modular monolith, distributed services.
- tradeoffs.

**02. Domain modelling**
- Aggregates, entities and value objects.
- invariants and domain events.

**03. Database performance**
- Indexes and query plans.
- N+1.
- appropriate denormalization.
- constraints.

**04. Transactions and isolation**
- ACID.
- dirty/phantom reads.
- lost updates.
- serialization.
- deadlocks.

**05. Concurrency**
- Locks, optimistic concurrency, atomic state transition, idempotency and outbox.

**06. Schema evolution**
- Expand-contract.
- safe data migration.
- backfill.
- rollback and compatibility.

**07. Caching**
- TTL, stale state and invalidation.
- tenant leak.
- cache stampede.

**08. Event-driven systems**
- Delivery and ordering semantics.
- retry and dedup.
- transactional outbox.

**09. Horizontal scaling**
- Statelessness.
- pools.
- message workers.
- load balancing.
- hot spots.

**10. Performance engineering**
- Profiling, load/stress/soak.
- queues and p95/p99.
- DB execution plans.

**11. Resilience**
- Timeout, retry, circuit breaker, degradation, rate limiting and backpressure.

**12. Recovery**
- Backups, PITR, RPO/RTO, integrity, encrypted storage and restore drills.

**13. Reviewing existing architecture**
- Risk and single points of failure.
- sustainable refactoring roadmap.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF06 — Security, Testing & Production Quality  
**Curriculum level:** PROFESSIONAL.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT03, SK05, SK07, LAB03.

**01. Secure development lifecycle**
- Threat modelling.
- SSDF.
- review and security acceptance.

**02. Authentication security**
- Password hashing, passkeys, MFA, lockout, recovery and session revocation.

**03. Authorization**
- RBAC/ABAC, ownership, BOLA/IDOR, tenant isolation and service credentials.

**04. Web application security**
- XSS, CSRF, injection, SSRF, clickjacking, open redirect, dangerous file upload.

**05. API security**
- Broken object/function auth, mass assignment, excessive data exposure and rate limits.

**06. Cryptography and secrets**
- Key management, signing, rotation, secret log redaction, proper primitives.

**07. Supply chain**
- Third-party dependencies, lockfile and SBOM.
- provenance, version security.

**08. Test strategy**
- Unit, integration, contracts, E2E and regression.
- cost-benefit and scope.

**09. Advanced tests**
- Property based, fuzz, mutation, negative, race and failure injection.

**10. AI code testing risks**
- Hallucinated passing tests, shallow mocks, tests mutated to pass, false coverage.

**11. Quality gates**
- CI/CD lint, type, build, scan, tests, review, deployment approvals.

**12. Production hardening**
- TLS, CORS, CSP/security headers, config, least privilege and logs.

**13. Accessibility quality**
- WCAG/keyboard, screen readers and manual validation.

**14. Release evidence**
- Blockers, known risks, signoff, test results and incident readiness.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF07 — Digital Business, Payments & Subscription Engineering  
**Curriculum level:** BUSINESS.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT04, SK08, T26, T27, LAB04.

**01. Digital business types**
- SaaS, ecommerce, marketplaces, educational products and AI service pricing.

**02. Plans and entitlements**
- Free/premium, metered use, trials, quotas and seat licensing.

**03. Checkout engineering**
- Order summary and totals.
- addresses, currencies, taxes.
- validation.

**04. Payment state machines**
- Authorized, captured, pending, failed, disputed.
- 3DS and redirect.

**05. Webhook safety**
- Signatures, retries, duplicate/out of order events and reconciliation.

**06. Subscription lifecycle**
- Renewal, failure, grace, trial, upgrade/downgrade, cancellation and expiration.

**07. Entitlements**
- Server-side feature and usage checks.
- eventual consistency and caching.

**08. Invoices and taxes**
- Provider MoR vs direct billing.
- jurisdiction and financial records.

**09. Refunds and disputes**
- Partial refund, chargeback, reversals, statutory rights, retention of records.

**10. Customer operations**
- Receipts, dunning, cancellation support, complaints and support.

**11. Analytics and economics**
- MRR, ARR, churn, conversion, unit economics, API and infrastructure costs.

**12. Fraud and abuse**
- Trial abuse, stolen payment methods, automation and fairness.

**13. Billing recovery**
- Provider outage, stale state, reconciliation, provider switch, audit.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF08 — Legal, Privacy, Accessibility & Compliance Engineering  
**Curriculum level:** BUSINESS.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT04, SK09, T29, T30, LAB04.

**01. Jurisdiction and classification**
- Operator country, target countries, B2B/B2C, regulated sectors, minors.

**02. Operator identification**
- Imprint, legal name, business registration, contact and trading disclosures.

**03. Data protection fundamentals**
- Personal data, controllers/processors, legal bases, purpose and minimization.

**04. Privacy notice anatomy**
- Categories, purposes, recipients, transfers, retention, rights and changes.

**05. Cookies and tracking**
- Classify purposes, necessary/nonessential, consent/withdrawal, records and analytics.

**06. Terms of use**
- Service scope, acceptable use, user content, suspension, limitations.

**07. Consumer digital rights**
- Precontract info, digital conformity, withdrawal rights/conditions, refunds and complaints.

**08. Subscription transparency**
- Renewals, clear prices, cancellation, confirmation, dark patterns.

**09. Data subject requests**
- Access, portability, deletion, restrictions, objection, exceptions and evidence.

**10. Vendors and transfers**
- Hosting, analytics, AI vendors, processors, agreements and cross-border transfer.

**11. Security incidents and breach reporting**
- Assessment and response, notification applicability, records.

**12. Accessibility law**
- WCAG vs legal obligation.
- EU accessibility rules, national exceptions, audit.

**13. Intellectual property**
- Open source licenses, assets, fonts, images, trademarks, AI-generated rights.

**14. Online content/platforms**
- User-generated content moderation, takedowns and platform law applicability.

**15. AI-specific regulation**
- AI Act applicability, transparency, high-risk roles and provider/operator responsibilities.

**16. Sector / national variations**
- Health, finance, education, minors and regulated professional services.

**17. UI implementation of legal obligations**
- Footer, sign-up notice, checkout info, consent dialogs, deletion/export flows.

**18. Compliance readiness assessment**
- Obligations vs not applicable, legal reviewer, tests and evidences.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF09 — The Edge Case Encyclopedia — 100 Engineering Failure Scenarios  
**Curriculum level:** EXPERT.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT05, SK10, SK11, LAB05.

**01. AI agent failures**
- Context loss, fabricated APIs, accidental unrelated edits, corrupt tests, loops, false claims.

**02. Authentication and permissions**
- Cross-user/tenant leak, revoked sessions, broken access, invitation mismanagement.

**03. Database integrity**
- Race, deadlocks, migrations, duplicate data, time zones, Unicode and rounding.

**04. Payments**
- Repeated webhooks, pending access, refunds, inconsistent billing and fraud.

**05. Frontend/UX**
- Hydration mismatch, async race, unsaved forms, stale data, accessibility.

**06. Backend and integrations**
- Retry storms, partial failure, rate limits, payload contracts, inconsistent pagination.

**07. Security and supply chain**
- Secret leak, compromised package, unsafe uploads, XSS and prompt injection.

**08. Infrastructure and deployment**
- Config drift, rollback, DNS/TLS outages, worker failures, storage and quota.

**09. Performance**
- Memory leaks, slow queries, stampede, p95/p99 latency, unexpected AI spend.

**10. Operations and business**
- Deletion incomplete, active billing after closure, consent inconsistency, support failure.

**11. Case-by-case evidence model**
- Symptom.
- reproduction.
- causal explanation.
- fix.
- tests.
- preventive control.
- skill cross-links.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF10 — Advanced Debugging, Incident Response & Recovery  
**Curriculum level:** EXPERT.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT05, SK10, T35, LAB05.

**01. Systematic debugging**
- Observe versus hypothesize.
- control variables and evidence.

**02. Bug taxonomy**
- State, logic, data, concurrency, environment, integration and infrastructure.

**03. Reproducibility**
- Minimal reproduction.
- synthetic fixtures.
- intermittent failure triggers.

**04. Logs, metrics, traces**
- Structured telemetry, correlation IDs, privacy-aware evidence.

**05. Investigation methods**
- Hypothesis matrix, Git bisect, profiling, diff and impact.

**06. Root cause analysis**
- Five whys, causal graphs, systemic contributory factors.

**07. Distributed failure investigation**
- Duplicates, out of order events, eventual consistency and partial success.

**08. Incident command**
- Severity, containment, communication, coordination and recovery.

**09. Safe recovery**
- Rollback, feature flags, hotfix, backup restore, replay.

**10. Regression prevention**
- Narrow fixes, reproductive tests, contract impact and review.

**11. Postmortems**
- Timeline, blast radius, evidence, learning and corrective actions.

**12. AI-assisted incident response**
- Read-only audit, approvals, agent limitations and independent validation.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF11 — Autonomous Agents, Orchestration & Advanced AI Architecture  
**Curriculum level:** ARCHITECT.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT06, SK12, LAB06.

**01. Agent architecture**
- Model, tools, context, memory, instructions and autonomy boundaries.

**02. Skill modularity**
- Manifests, progressive disclosure, deterministic scripts and test harness.

**03. Task decomposition**
- Dependency graphs, vertical slices, parallel tasks, acceptance.

**04. Multi-agent roles**
- Architect, coder, tester, security auditor, reviewer and orchestrator.

**05. Shared context**
- Documents of truth, compaction, reentrancy, handoffs, decision log.

**06. Tool permissions**
- Sandbox, minimum privilege, destructive-operation approvals and credential isolation.

**07. MCP integration**
- Auth, external inputs, prompt injection, tool trust and failure handling.

**08. Automated development pipeline**
- Specification, implementation, quality gates and evidence.

**09. Agent failures**
- Loops, false positives, tool misuse, instruction collision, context drift.

**10. Independent verification**
- Reviews, external tests, source evidence and human approval.

**11. Cost and latency**
- Model choice, limits, budgets, measuring value and cache.

**12. Portable agent suite**
- Codex, Claude and generic adapters, versioning, installation and support.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

### PDF12 — AI Engineering Governance, Evaluation & Continuous Improvement  
**Curriculum level:** ARCHITECT.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** PPT06, SK12, T36, LAB06.

**01. Engineering governance**
- Roles, approvals, policy, exceptions and human accountability.

**02. Traceability**
- Requirements to code to tests to evidence, revisions.

**03. Evaluation**
- Benchmarks, reproducibility, negative scenarios, control groups.

**04. Skill QA**
- Correctness, false positives/negatives, run failures, regression compatibility.

**05. Agent benchmarking**
- Success, edits, incidents, time, token cost, quality.

**06. Agent security governance**
- Tools, secrets, least privilege, logs, audit and review.

**07. Supply chain governance**
- SBOM, provenance, version tracking, packages and licenses.

**08. Documentation governance**
- Source quality, review dates, corrections, changelogs.

**09. Risk-based release**
- Approvals, gradual rollout, flags, monitoring, exceptions.

**10. Engineering quality metrics**
- Incident rate, time to recover, change failure, performance, a11y.

**11. Maintenance**
- Technical debt, dependency upgrades, documentation decay, support end.

**12. Capstone assessment**
- Complete inherited app, uncover risks, fix, test, prepare launch and defend decisions.

**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.

## B. SIX VISUAL POWERPOINT ATLASES — EXACT INDEX

### PPT01 — From Idea to Engineering Specification  
**Tier:** FOUNDATION. **Deliverables:** editable PPTX + accessible exported PDF; diagrams/captions/slide notes/source refs. No text-only slides mimicking the book.
1. Idea-to-product lifecycle and gates.
2. Engineering roles and responsibilities.
3. Problem assumptions and discovery map.
4. Personas/stakeholders/actors.
5. User journey diagrams.
6. Functional feature and dependency graph.
7. Functional vs nonfunctional requirement matrix.
8. Architecture decision tree.
9. Implementation phases/checkpoints.
10. PRD / traceability visual walkthrough.
**Design requirement:** each thematic section has concept diagram(s), one worked annotated example, common wrong approach, decision diagram and cross-links to PDF and relevant skill. Build as original vector objects when possible.

### PPT02 — Complete Application Anatomy  
**Tier:** BUILDER. **Deliverables:** editable PPTX + accessible exported PDF; diagrams/captions/slide notes/source refs. No text-only slides mimicking the book.
1. Full digital product map: public/private/admin/backend/data.
2. Public website routes and SEO/legal content.
3. Complete account lifecycle.
4. Authentication, authorization and organizations.
5. Navigation, components and responsive states.
6. CRUD, data history, concurrency and restore.
7. Messaging, async jobs and notifications.
8. Checkout/subscription/entitlement state machines.
9. Admin, support and audit operations.
10. Privacy and legal notice placement.
11. Production infrastructure, files and backups.
12. Wall-size clickable product completeness systems map.
**Design requirement:** each thematic section has concept diagram(s), one worked annotated example, common wrong approach, decision diagram and cross-links to PDF and relevant skill. Build as original vector objects when possible.

### PPT03 — Secure Production Architecture  
**Tier:** PROFESSIONAL. **Deliverables:** editable PPTX + accessible exported PDF; diagrams/captions/slide notes/source refs. No text-only slides mimicking the book.
1. Architecture styles and trust boundaries.
2. Complete HTTP request and API flow.
3. Account/session lifecycle.
4. API attack surfaces and controls.
5. Relational data/invariants/indexes.
6. Isolation/deadlock/race diagrams.
7. Caching and tenant invalidation.
8. Queues, idempotency and outbox.
9. Testing layers and CI gates.
10. Secrets, network and TLS.
11. Telemetry, performance and capacity.
12. Backups, rollback and restore diagrams.
**Design requirement:** each thematic section has concept diagram(s), one worked annotated example, common wrong approach, decision diagram and cross-links to PDF and relevant skill. Build as original vector objects when possible.

### PPT04 — Digital Business & Compliance  
**Tier:** BUSINESS. **Deliverables:** editable PPTX + accessible exported PDF; diagrams/captions/slide notes/source refs. No text-only slides mimicking the book.
1. Business models and pricing systems.
2. Checkout and payment lifecycles.
3. Subscription finite-state machine.
4. Webhook signing, retries and reconciliation.
5. Business identification/legal disclosures.
6. Personal data classification and flow diagrams.
7. Consent, preferences and opt-out.
8. Rights requests and retention.
9. Consumer precontract and digital rights.
10. Third party processors/data transfers.
11. Accessibility/legal conditionality.
12. Business launch checklist with evidence.
**Design requirement:** each thematic section has concept diagram(s), one worked annotated example, common wrong approach, decision diagram and cross-links to PDF and relevant skill. Build as original vector objects when possible.

### PPT05 — Failure Engineering & Recovery  
**Tier:** EXPERT. **Deliverables:** editable PPTX + accessible exported PDF; diagrams/captions/slide notes/source refs. No text-only slides mimicking the book.
1. Fault taxonomy.
2. Symptom vs root cause diagrams.
3. Decision-tree troubleshooting.
4. Reproduction and experimental method.
5. Races and locking timelines.
6. Distributed partial failures and event ordering.
7. Regression impact network.
8. Incident command and severity.
9. Rollback and restoration workflows.
10. Postmortem causal graphs and corrective loops.
**Design requirement:** each thematic section has concept diagram(s), one worked annotated example, common wrong approach, decision diagram and cross-links to PDF and relevant skill. Build as original vector objects when possible.

### PPT06 — Agent Architecture & Governance  
**Tier:** ARCHITECT. **Deliverables:** editable PPTX + accessible exported PDF; diagrams/captions/slide notes/source refs. No text-only slides mimicking the book.
1. Anatomy of an agent.
2. Skill manifest/modules/scripts/assets.
3. Context and documentation map.
4. Task dependency planner.
5. Multiagent pipeline and ownership.
6. Trust boundaries/permissions and prompt injection.
7. Implementation and independent-review gates.
8. Benchmark harness/evaluation method.
9. Governance and traceability.
10. Full agent engineering organization model.
**Design requirement:** each thematic section has concept diagram(s), one worked annotated example, common wrong approach, decision diagram and cross-links to PDF and relevant skill. Build as original vector objects when possible.

## C. TWELVE INSTALLABLE AGENT SKILLS — CONTRACT AND FILE INDEX

### SK01 — Project Intelligence Mapper  
**Tier:** FOUNDATION. **Goal:** Understand an existing repository before changing it.
**Suggested installation folder:** `project-intelligence-mapper/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Detect stack and supported versions.
2. inventory routes, entry points, schema and services.
3. dependency graph.
4. architecture map.
5. unknowns/risks.
6. persist agent-readable context.
**Required inputs:** Repository tree, package files, migrations, documentation; read-only initially.  
**Outputs:** architecture-map.md; dependency-inventory.json; project-context.md; technical-risks.md.  
**Mandatory evaluations / safety:** Golden fixture repos; correct IDs; evidence citations; no source edits by default.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK02 — Complete Product Architect  
**Tier:** FOUNDATION. **Goal:** Turn vague ideas into complete, verifiable product specifications.
**Suggested installation folder:** `complete-product-architect/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Interpret goals and users.
2. discover business/technical constraints.
3. functional and nonfunctional requirements.
4. page/route inventory.
5. permission model.
6. edge flows.
7. legal questions.
8. architecture choices.
9. implementation stages.
10. verification matrix.
**Required inputs:** Idea, country/business fields, stakeholder constraints and existing repo when provided.  
**Outputs:** PRD.md; feature-register.xlsx/csv; sitemap.md; permissions.csv; architecture-decision-records.md; implementation-plan.md.  
**Mandatory evaluations / safety:** No invented critical decisions; explicit assumptions; conditional legal checks; compare output against complete reference briefs.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK03 — Product Completeness Auditor  
**Tier:** BUILDER. **Goal:** Identify forgotten parts of existing applications.
**Suggested installation folder:** `product-completeness-auditor/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Classify application.
2. inspect routes and functional pages.
3. enumerate onboarding, account lifecycle, admin, payments and offboarding.
4. analyze error/loading states.
5. catalog privacy/legal/support/ops gaps.
6. score evidence and uncertainties.
**Required inputs:** Repository, documented product model and optionally authorized app preview.  
**Outputs:** product-completeness-report.md; missing-flows.csv; applicability-matrix.json; remediation-roadmap.md.  
**Mandatory evaluations / safety:** Route presence != functional flow; avoid claiming legal certification; measure false positives with deliberately incomplete apps.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK04 — UX & Accessibility Inspector  
**Tier:** BUILDER. **Goal:** Find usability and accessibility defects.
**Suggested installation folder:** `ux-accessibility-inspector/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Page/information hierarchy.
2. component states.
3. keyboard/focus.
4. labels.
5. contrast.
6. forms.
7. responsivity.
8. async errors.
9. screen reader and manual review recommendations.
10. dark patterns.
**Required inputs:** Accessible app/browser code and permitted preview.  
**Outputs:** ux-audit.md; a11y-findings.csv; reproduction-steps.md.  
**Mandatory evaluations / safety:** Automated scans do not certify compliance; clear manual-test-required flags.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK05 — Security & Authorization Auditor  
**Tier:** PROFESSIONAL. **Goal:** Analyze security of authorized applications.
**Suggested installation folder:** `security-authorization-auditor/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Model attack surface.
2. auth/session lifecycle.
3. object access.
4. multi-tenancy.
5. validation.
6. API.
7. secrets.
8. supply chain.
9. logging.
10. uploads.
11. test cases.
12. severity and evidence.
**Required inputs:** Authorized repository and stated threat model.  
**Outputs:** security-findings.json; threat-model.md; remediation-plan.md; regression-tests/.  
**Mandatory evaluations / safety:** No intrusive testing of third parties; avoid invented vulnerabilities; reports require source evidence.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK06 — Database Integrity Guardian  
**Tier:** PROFESSIONAL. **Goal:** Protect data correctness and migrations.
**Suggested installation folder:** `database-integrity-guardian/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Schema inference.
2. indexes and constraints.
3. orphan/duplicate risk.
4. transaction/isolation and concurrent updates.
5. migration backfills.
6. retention.
7. restore plan.
**Required inputs:** Read-only schema and test fixture data; DBA approval for production.  
**Outputs:** database-integrity-report.md; invariants.json; migration-plan.md; test-fixtures/.  
**Mandatory evaluations / safety:** Read-only default; no production data mutation without explicit authorization and recovery plan.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK07 — Regression & Testing Guardian  
**Tier:** PROFESSIONAL. **Goal:** Protect existing behavior across code changes.
**Suggested installation folder:** `regression-testing-guardian/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Diff impact map.
2. contract identification.
3. select and build unit/integration/e2e/negative/property tests.
4. verify behavior and restored invariants.
5. prevent changed-to-pass tests.
**Required inputs:** Current diff, tests, repo context and requested requirements.  
**Outputs:** change-impact.md; test-results.json; regression-findings.md.  
**Mandatory evaluations / safety:** Baseline must be observed; distinguish not-run, failed and passing; execute actual tests.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK08 — Payments & Subscription Engineer  
**Tier:** BUSINESS. **Goal:** Implement and validate robust payment lifecycles.
**Suggested installation folder:** `payments-subscription-engineer/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Offer/entitlement model.
2. checkout mapping.
3. provider confirmation.
4. webhook signatures.
5. retry/idempotency.
6. subscription state.
7. refunds, chargebacks, invoice reconciliation.
8. error handling.
**Required inputs:** Payment sandbox provider credentials and application repo.  
**Outputs:** payment-state-machine.md; webhook-matrix.csv; reconciliation-plan.md; payment-tests/.  
**Mandatory evaluations / safety:** Sandbox only by default; mock/payment evidence; no real payments without authorization.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK09 — Legal & Compliance Readiness  
**Tier:** BUSINESS. **Goal:** Identify applicable obligations for digital products.
**Suggested installation folder:** `legal-compliance-readiness/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Determine legal operator, geography, B2B/B2C, tracking, data mapping and suppliers.
2. list required disclosures and consumer flow.
3. copyright/accessibility/AI rules when applicable.
4. identify legal review needs.
**Required inputs:** Jurisdiction, product model, data flows, supplier list.  
**Outputs:** legal-applicability-matrix.csv; disclosure-inventory.md; privacy-gaps.md; lawyer-review-questions.md.  
**Mandatory evaluations / safety:** Educational readiness assessment not legal advice; no blanket compliance certification.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK10 — Root Cause Investigator  
**Tier:** EXPERT. **Goal:** Reproduce and trace difficult defects.
**Suggested installation folder:** `root-cause-investigator/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Collect symptom/logs.
2. classify issue.
3. recent changes.
4. hypothesis matrix.
5. controlled reproduction.
6. isolate cause.
7. minimal patch proposal.
8. regression tests.
9. postmortem.
**Required inputs:** Authorized repo, sanitized logs, reproducible symptom, environment constraints.  
**Outputs:** root-cause-analysis.md; minimal-reproduction/; verification-results.json.  
**Mandatory evaluations / safety:** Do not change production before permission; do not conclude without evidence.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK11 — Production Readiness Commander  
**Tier:** EXPERT. **Goal:** Make evidence-based go/no-go release decisions.
**Suggested installation folder:** `production-readiness-commander/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Build/CI/test state, secrets/config, DB migration plan, object access, payment provider, DNS/TLS, email, legal, backup/restore, logs, capacity, fallback/rollback, support readiness.
**Required inputs:** Repository, deployment manifests, available staging checks and release data.  
**Outputs:** go-no-go-report.md; blockers.csv; deploy-checklist.md; rollback.md.  
**Mandatory evaluations / safety:** Must block when evidence missing; no claim of production readiness from code inspection alone.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

### SK12 — Multi-Agent Engineering Orchestrator  
**Tier:** ARCHITECT. **Goal:** Coordinate safe multiagent changes.
**Suggested installation folder:** `multi-agent-engineering-orchestrator/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.
**Workflow index:**
1. Task dependency mapping, agent specialization, context budget, ownership boundaries, tool permissions, parallel execution, integration, independent review and tests, cost/time logging.
**Required inputs:** Goal, repository, agent capabilities and authorization limits.  
**Outputs:** task-graph.md; ownership-matrix.csv; integrated-diff-summary.md; verification-report.md.  
**Mandatory evaluations / safety:** No conflicting simultaneous file writes; separate agent claims from executed validation.
**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.

## D. THIRTY-SIX TEMPLATES — SPECIFICATION OF EACH EDITABLE FILE

### T01 — Product Requirements Document  
**Required fields/sections:** Objectives; audiences; scope; functional/nonfunctional requirements; risks; metrics; assumptions; acceptance.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T02 — Universal Product Scope Register  
**Required fields/sections:** 40 domains; nested requirements; applicability; priority; owner; proof; implementation state; reference IDs.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T03 — Stakeholder & Role Matrix  
**Required fields/sections:** Actors; authority; responsibilities; roles; permissions; transfer/escalation and prohibited actions.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T04 — Requirements Traceability Matrix  
**Required fields/sections:** Requirement ID; source; implementation; test ID; evidence; status; change history.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T05 — User Journey & Use Case Map  
**Required fields/sections:** Actors; triggers; preconditions; happy path; alternate path; failure; postconditions.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T06 — Architecture Decision Record  
**Required fields/sections:** Context; options; selection; trade-offs; outcomes; approval; review date.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T07 — Page & Route Inventory  
**Required fields/sections:** Route; purpose; auth; role; content; page states; analytics; SEO; accessibility; legal.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T08 — UI States & Interaction Matrix  
**Required fields/sections:** Empty/loading/success/error/offline/expired/forbidden; copy; transition; retries; QA.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T09 — Authorization & Permission Matrix  
**Required fields/sections:** Actor; role; tenant; resource; operation; constraints; allow/deny tests.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T10 — Localization Specification  
**Required fields/sections:** Locales; timezone/DST; currency; number/date; plural; RTL; text growth; fallback.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T11 — Notification & Email Inventory  
**Required fields/sections:** Trigger; recipient; channel; template; consent; retries; dedupe; delivery status.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T12 — Accessibility Audit Workbook  
**Required fields/sections:** Criterion; page/component; automated/manual checks; status; evidence; risk; remediation.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T13 — Database Schema & Data Dictionary  
**Required fields/sections:** Entities; keys; types; relationships; indexes; constraints; sensitivity; retention.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T14 — API Contract Specification  
**Required fields/sections:** Endpoints; methods; auth; schemas; errors; pagination; limits; version; samples.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T15 — Concurrency & Transaction Matrix  
**Required fields/sections:** Operation; invariant; isolation; locks; idempotency; retries; race tests.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T16 — Third-Party Integration Register  
**Required fields/sections:** Vendor; purpose; data sent; secret; rate limits; SLA; fallback; costs; owner.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T17 — Background Jobs & Events Register  
**Required fields/sections:** Event; producer; consumer; payload; queue; retry; timeout; idempotency; dead letter.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T18 — Data Lifecycle & Retention Matrix  
**Required fields/sections:** Collection; purpose; legal basis; storage; access; export; retention; deletion; backups.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T19 — Threat Model & Risk Register  
**Required fields/sections:** Assets; threats; trust boundaries; risk; mitigation; evidence; residual risk.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T20 — Master Test Plan  
**Required fields/sections:** Coverage levels; environment; test classes; acceptance criteria; blockers; responsibilities.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T21 — Test Cases & Fixtures Catalog  
**Required fields/sections:** Test ID; positive/negative/edge; fixture; steps; expected; observed; result.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T22 — Regression Impact Matrix  
**Required fields/sections:** Change; affected modules; contracts; tests; risk; evidence; reviewer.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T23 — CI/CD Quality Gates  
**Required fields/sections:** Commands; thresholds; scan; approval; artifact; status; exception owner.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T24 — Dependency & Supply Chain Register  
**Required fields/sections:** Name; version; source; license; vulnerability; update policy; SBOM; maintainer.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T25 — Business Model & Pricing Specification  
**Required fields/sections:** Models; plans; quotas; trials; currency; taxes; discounts; entitlements.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T26 — Checkout & Payment State Matrix  
**Required fields/sections:** Status; provider event; business effect; retry; refund; webhook; reconciliation.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T27 — Subscription Lifecycle Specification  
**Required fields/sections:** Trial; active; failed; grace; renewal; upgrade; downgrade; cancel; expired.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T28 — Financial Reconciliation Workbook  
**Required fields/sections:** Order; invoice; provider record; amount; currency; refund; discrepancy; resolution.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T29 — Legal Applicability Matrix  
**Required fields/sections:** Jurisdiction; operator; obligation; condition; source; document; reviewer; status.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T30 — Privacy & Cookie Compliance Workbook  
**Required fields/sections:** Treatments; consent; cookies; vendor; purpose; legal basis; retention; rights.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T31 — Vendor & Data Processor Register  
**Required fields/sections:** Vendor; system; contract; category; geography; subprocessors; review; risk.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T32 — Asset & Intellectual Property Register  
**Required fields/sections:** Image/font/code/license/owner; attribution; rights; source; resale permissions.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T33 — Production Operations Runbook  
**Required fields/sections:** Service; owner; allowed commands; monitoring; alarms; recovery; escalation.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T34 — Backup & Disaster Recovery Plan  
**Required fields/sections:** System; backup method; frequency; retention; RPO/RTO; restore test; owner.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T35 — Incident Report & Postmortem  
**Required fields/sections:** Severity; timeline; impact; evidence; cause; recovery; preventive action.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

### T36 — Launch Go/No-Go Checklist  
**Required fields/sections:** Blockers; release gate; proof; signoff; rollback; initial production smoke test.  
**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.

## E. SIX LABS — FULL EXERCISE SKELETON

### LAB01 — The Incomplete Product Brief  
**Tier:** FOUNDATION. **Package:** runnable fixture, instructions PDF/MD, challenge workbook, reference solution, automated test criteria, clean local setup, teardown, grading rubric.
1. Interpret a deliberately vague brief.
2. Discover missing requirements.
3. Identify actors and authorizations.
4. Map all routes and pages.
5. Specify journeys and error paths.
6. Identify performance/privacy/legal questions.
7. Risk and constraint analysis.
8. Author full PRD, acceptance tests and traceability.
9. Produce safe agent task plan.
10. Audit plan for omissions.
**Safety:** all credentials fake/test only; self-contained local authorized environment and synthetic data. Never require attacking unknown third-party systems.

### LAB02 — Build a Complete SaaS  
**Tier:** BUILDER. **Package:** runnable fixture, instructions PDF/MD, challenge workbook, reference solution, automated test criteria, clean local setup, teardown, grading rubric.
1. Architecture and environment.
2. Postgres schema and migrations.
3. Register/login/recovery.
4. Organizations and invitations.
5. RBAC tenant isolation.
6. Main dashboard and CRUD.
7. Loading/error/empty UX states.
8. Admin and configuration.
9. Transactional notifications.
10. Sandbox checkout and subscription flows.
11. Applicable legal/info pages as reviewed examples.
12. Testing/backup/deploy readiness.
**Safety:** all credentials fake/test only; self-contained local authorized environment and synthetic data. Never require attacking unknown third-party systems.

### LAB03 — The Vulnerable Application  
**Tier:** PROFESSIONAL. **Package:** runnable fixture, instructions PDF/MD, challenge workbook, reference solution, automated test criteria, clean local setup, teardown, grading rubric.
1. Threat-model scope.
2. Authentication failure analysis.
3. Authorization/IDOR reproduction in isolated test.
4. Tenant isolation.
5. API inputs and access controls.
6. Dangerous uploads.
7. Secrets and logs.
8. Supply chain risks.
9. Patch design.
10. Regression tests.
11. Security evidence report.
**Safety:** all credentials fake/test only; self-contained local authorized environment and synthetic data. Never require attacking unknown third-party systems.

### LAB04 — Launch a Digital Business  
**Tier:** BUSINESS. **Package:** runnable fixture, instructions PDF/MD, challenge workbook, reference solution, automated test criteria, clean local setup, teardown, grading rubric.
1. Plans and pricing rules.
2. Entitlement guard.
3. Sandbox provider integration.
4. Raw signed webhooks.
5. Double-delivery and out-of-order tests.
6. Cancellation/refund state.
7. Reconciliation.
8. Personal data inventory.
9. Legal applicability matrix and page placements.
10. Rights requests and support flow.
11. Operations/runbooks.
12. Production go/no-go with blockers.
**Safety:** all credentials fake/test only; self-contained local authorized environment and synthetic data. Never require attacking unknown third-party systems.

### LAB05 — The Broken Production System  
**Tier:** EXPERT. **Package:** runnable fixture, instructions PDF/MD, challenge workbook, reference solution, automated test criteria, clean local setup, teardown, grading rubric.
1. Gather symptoms and logs.
2. Minimal failure reproduction.
3. Identify concurrent write bug.
4. Repair data invariant.
5. External API fallback.
6. Find performance bottleneck.
7. Safe migration planning.
8. Simulate failed deployment.
9. Perform rollback.
10. Backup restore drill.
11. Regression test.
12. Postmortem.
**Safety:** all credentials fake/test only; self-contained local authorized environment and synthetic data. Never require attacking unknown third-party systems.

### LAB06 — Autonomous Engineering Challenge  
**Tier:** ARCHITECT. **Package:** runnable fixture, instructions PDF/MD, challenge workbook, reference solution, automated test criteria, clean local setup, teardown, grading rubric.
1. Map existing codebase.
2. Interpret change request.
3. Create dependency graph.
4. Assign agent ownership.
5. Control context and tools.
6. Execute isolated parallel changes.
7. Integrate diffs.
8. Resolve conflicts.
9. Run security/completeness skills.
10. Independent test and review.
11. Benchmark time/quality/cost.
12. Write engineering report.
**Safety:** all credentials fake/test only; self-contained local authorized environment and synthetic data. Never require attacking unknown third-party systems.

## F. SIX PRODUCT-SPECIFIC BLUEPRINTS — COMPLETE STRUCTURES

### BP01 — SaaS Product Blueprint  
**Package:** architecture-specific guide, product scope matrix, sitemap, data model, roles, integration checklist, legal applicability questions, security/test cases, worked examples.
1. Single vs multi-tenant.
2. Registration and onboarding.
3. Organization/team creation.
4. Invitations and roles.
5. Entitlements/quotas.
6. Recurring and one-off billing.
7. Trial and cancellation.
8. Support/admin.
9. Usage and infrastructure cost.
10. Cross-tenant security.
11. Data export/erasure.
12. Public API and webhook interoperability.
13. Scale/observability.
14. Specific failure cases.
**Mandatory edge cases:** full state/permission/data/legal assessment; no assumption that every listed page is required for every product.

### BP02 — E-commerce Blueprint  
**Package:** architecture-specific guide, product scope matrix, sitemap, data model, roles, integration checklist, legal applicability questions, security/test cases, worked examples.
1. Catalog and hierarchy.
2. Attributes and variants.
3. Price and tax.
4. Inventory and reservations.
5. Cart/session.
6. Checkout.
7. Shipping and fulfillment.
8. Order lifecycle.
9. Refund/returns.
10. Invoices and documents.
11. Customer area.
12. Discount and promotional logic.
13. Back office.
14. Carriers and payment integrations.
15. Consumer compliance.
16. Race and stock consistency.
**Mandatory edge cases:** full state/permission/data/legal assessment; no assumption that every listed page is required for every product.

### BP03 — Marketplace Blueprint  
**Package:** architecture-specific guide, product scope matrix, sitemap, data model, roles, integration checklist, legal applicability questions, security/test cases, worked examples.
1. Seller registration/onboarding.
2. Identity/verification when required.
3. Profiles and listings.
4. Search/recommendation.
5. Moderation/reporting.
6. Buying/contracting.
7. Platform fees.
8. Provider split payouts where eligible.
9. Refunds and disputes.
10. Reviews/reputation.
11. Buyer and seller safety.
12. Complaints and takedowns.
13. Platform law obligations.
14. Tax/documentation.
15. Fraud controls.
16. Vendor exit/offboarding.
**Mandatory edge cases:** full state/permission/data/legal assessment; no assumption that every listed page is required for every product.

### BP04 — AI-Powered Product Blueprint  
**Package:** architecture-specific guide, product scope matrix, sitemap, data model, roles, integration checklist, legal applicability questions, security/test cases, worked examples.
1. Model/vendor selection.
2. Input/output contracts.
3. Prompt versioning.
4. Context/RAG.
5. Data handling and retention.
6. Token pricing/budget.
7. Quotas/rate limits.
8. Prompt injection and exfiltration.
9. Tool authorization.
10. Evaluation/ground truth.
11. Hallucination handling.
12. Tracing/cost observability.
13. Human review.
14. Data processor contracts.
15. AI regulation applicability.
16. Failure modes.
**Mandatory edge cases:** full state/permission/data/legal assessment; no assumption that every listed page is required for every product.

### BP05 — Community & Social Platform Blueprint  
**Package:** architecture-specific guide, product scope matrix, sitemap, data model, roles, integration checklist, legal applicability questions, security/test cases, worked examples.
1. Accounts/profiles.
2. Posts/comments.
3. Direct messages.
4. Relationships/groups.
5. Visibility and permissions.
6. Notification controls.
7. Search/discovery.
8. Media uploads.
9. Moderation roles.
10. Reporting/appeals.
11. Suspensions/blocks.
12. User privacy.
13. Removal/retention.
14. Minors and safety when relevant.
15. Spam/abuse.
16. Scale and content consistency.
**Mandatory edge cases:** full state/permission/data/legal assessment; no assumption that every listed page is required for every product.

### BP06 — Mobile Application Blueprint  
**Package:** architecture-specific guide, product scope matrix, sitemap, data model, roles, integration checklist, legal applicability questions, security/test cases, worked examples.
1. Native/hybrid choice.
2. OS lifecycle.
3. Navigation/state.
4. Device permissions.
5. Secure local storage.
6. Authentication.
7. Offline data.
8. Sync/conflicts.
9. Push notifications.
10. Background jobs.
11. Deep links.
12. App updates/migrations.
13. Crash reporting.
14. App store release.
15. In-app purchases and policies.
16. Privacy/a11y/store compliance.
**Mandatory edge cases:** full state/permission/data/legal assessment; no assumption that every listed page is required for every product.

## G. THE EDGE-CASE ENCYCLOPEDIA — ALL 100 CASE TITLES

### Category 01 — Agent execution failures
- **EC-001 — Context compacted and essential requirements forgotten**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-002 — Fabricated SDK API accepted without verification**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-003 — Unrelated files altered during a localized fix**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-004 — Agent changes test expectation to pass**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-005 — Repeated attempts cause a repair loop**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-006 — Agent installs hallucinated package name**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-007 — Parallel agents overwrite shared file**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-008 — Stale instructions conflict with current architecture**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-009 — Repository instructions contain malicious prompt injection**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-010 — Agent claims tests passed without executing them**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

### Category 02 — Authentication and authorization
- **EC-011 — Expired session survives password reset**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-012 — Refresh token race creates multiple active sessions**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-013 — User A can read User B object through IDOR**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-014 — Tenant A cache exposes Tenant B data**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-015 — Frontend hides forbidden action but API allows it**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-016 — Revoked invitation remains usable**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-017 — Email change bypasses identity re-verification**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-018 — Password recovery leaks account existence**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-019 — Suspended account retains active token**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-020 — Shared cache returns another user private page**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

### Category 03 — Database and data integrity
- **EC-021 — Lost update during concurrent edits**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-022 — Deadlock during batch processing**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-023 — Destructive migration removes customer data**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-024 — Missing foreign keys produce orphan records**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-025 — Transaction partially applies business event**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-026 — Double form submission creates duplicate record**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-027 — Timezone DST makes booking expire incorrectly**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-028 — Unicode normalization breaks unique handles**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-029 — Floating-point rounding corrupts invoice totals**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-030 — Backup passes creation but fails restore**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

### Category 04 — Payments and commerce
- **EC-031 — Duplicate webhook grants entitlement twice**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-032 — Out-of-order payment events revoke a paid order**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-033 — Provider charge succeeds but local account remains pending**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-034 — Refund processed but paid access remains active**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-035 — Renewal failure ignored and access remains wrong**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-036 — Free trial abuse bypasses eligibility constraints**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-037 — Promotion code redeemable beyond intended limit**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-038 — Checkout redirect returns before provider confirmation**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-039 — Invoiced tax data diverges from transaction**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-040 — Payment provider balance diverges from local ledger**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

### Category 05 — Frontend and user experience
- **EC-041 — Nuxt hydration mismatch breaks controls**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-042 — Old response overwrites newer search results**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-043 — Button double-click submits twice**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-044 — Wizard loses input on browser reload**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-045 — Modal traps keyboard focus incorrectly**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-046 — Backend mutation succeeds but stale UI shows failure**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-047 — Offline state exposes silently unsaved changes**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-048 — Cache shows data from previous logged-in user**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-049 — Small mobile viewport makes footer inaccessible**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-050 — Expired session loops user between routes**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

### Category 06 — Backend APIs and integrations
- **EC-051 — Rate limiter misconfigured behind proxy**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-052 — Remote API outage blocks core app**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-053 — Timeout leaves unknown transaction status**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-054 — Partial success on multi-service workflow**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-055 — Retry creates destructive duplicate operation**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-056 — SSRF via user-provided remote URL**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-057 — Unexpected optional field crashes parser**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-058 — Cursor pagination duplicates or omits records**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-059 — Third-party API version breaks contract**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-060 — Error swallowed by asynchronous worker**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

### Category 07 — Security and supply chain
- **EC-061 — Production credentials committed into Git**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-062 — Sensitive PII printed in application logs**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-063 — Malicious transitive dependency executes script**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-064 — Overprivileged admin API usable by editor**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-065 — Malware smuggled via disguised file extension**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-066 — Stored XSS through content/markdown rendering**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-067 — Permissive CORS exposes authenticated endpoint**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-068 — Token accidentally included in public build**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-069 — Typosquatting library copied from agent suggestion**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-070 — Agent tool obtains excessive file system access**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

### Category 08 — Infrastructure and deployment
- **EC-071 — Wrong environment variables after promotion**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-072 — Database migration breaks backward compatibility**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-073 — Half-complete blue-green rollout**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-074 — Rollback restores code but not compatible schema**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-075 — Expired TLS cert blocks webhook callback**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-076 — Misconfigured DNS prevents login email links**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-077 — Object storage region mismatch denies downloads**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-078 — Worker process fails silently after deploy**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-079 — Node process OOM causes intermittent 502**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-080 — Staging config copied into production checkout**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

### Category 09 — Performance and scale
- **EC-081 — Cache stampede after product drop**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-082 — N+1 queries on customer library**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-083 — Database connection pool exhausted**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-084 — Memory leak triggered by repeated previews**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-085 — Retry storm floods background queue**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-086 — Traffic burst overrun causes high p99 latency**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-087 — Heavy PDF previews block mobile main thread**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-088 — Unindexed filter query scales superlinearly**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-089 — Long transaction lock causes request pile-up**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-090 — LLM token usage produces unexpected provider bill**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

### Category 10 — Operations and business
- **EC-091 — Account deletion leaves redundant data in provider**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-092 — Complaint cannot be tracked to an owner**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-093 — Closed account still charged for subscription**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-094 — Consent preferences differ between tracker and DB**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-095 — Transactional email bounces without fallback**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-096 — Refunded order still appears purchasable/downloadable**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-097 — Admin action not included in audit trail**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-098 — Vendor sunset causes unavailable webhook endpoint**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-099 — Customer loses access after email change**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.
- **EC-100 — Data incident has no escalation or communication plan**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.

## H. UNIVERSAL PRODUCT SCOPE REGISTER — ALL 40 DOMAINS
A real implementation contains a normalized `scopeDomains` dataset with nested requirements by type of product, actor, jurisdiction and risk. The entries below are parent domains only; each will require numerous sub-requirements. **Never mark scope as compliant by merely rendering a page.**
- **SC-01 — Product Strategy:** Audience, scope, outcomes, nonfunctional needs, stakeholder assumptions.
- **SC-02 — Public Website:** Home, company/about, contact, features, pricing, FAQs, docs.
- **SC-03 — Legal Pages:** Operator identity, privacy, cookies, terms, sales/withdrawal conditions as applicable.
- **SC-04 — SEO & Discoverability:** Metadata, sitemap, robots, canonical, structured data and redirects.
- **SC-05 — User Onboarding:** Registration, invites, verification, initial setup and interrupted onboarding.
- **SC-06 — Authentication:** Login, logout, MFA, sessions, recovery, token revocation.
- **SC-07 — Authorization:** Roles, ownership, per-object permission, tenant isolation.
- **SC-08 — Account Lifecycle:** Profile, suspension, export, account closure, deletion and consent.
- **SC-09 — Organizations & Teams:** Members, invitations, roles, ownership transfers and team lifecycle.
- **SC-10 — Navigation & UX:** Menus, responsive layout, page hierarchy and components.
- **SC-11 — Interface States:** Loading, empty, error, timeout, offline, expired, success and forbidden.
- **SC-12 — Accessibility:** Semantics, keyboard, focus, contrast, motion, AT and usability.
- **SC-13 — Internationalization:** Dates, timezones, locale, money, Unicode and RTL.
- **SC-14 — Application Features:** Core CRUD, history, authorization and workflow edge cases.
- **SC-15 — Search & Reporting:** Filters, sort, pagination, analytics, dashboards and export.
- **SC-16 — Notifications:** Email/push/in-app, preferences, delivery, retries and unsubscribe.
- **SC-17 — Files & Media:** Upload, download, scanning, storage, access, deletion.
- **SC-18 — Backend & APIs:** Contracts, error codes, versioning, limits, validation.
- **SC-19 — Databases:** Integrity, schema, migrations, transactions, indexes, concurrency.
- **SC-20 — Background Jobs:** Events, queues, retry, idempotency, jobs, reconciliation.
- **SC-21 — Third-Party Services:** Contracts, limits, availability, fallback, privacy and cost.
- **SC-22 — Payments & Billing:** Checkout, renewals, receipts, failed charges, refunds, disputes.
- **SC-23 — Administration:** Operator workflows, approvals, support and audit logs.
- **SC-24 — Customer Support:** Documentation, FAQ, help, tickets, complaint channels.
- **SC-25 — Privacy & Data Protection:** Data mapping, transparency, rights, retention, suppliers.
- **SC-26 — Business Compliance:** Contracts, consumer law, invoice rules, licensing, sector obligations.
- **SC-27 — Security:** Threats, auth/access, secrets, storage, supply chain.
- **SC-28 — Quality Assurance:** Unit, integration, e2e, negative and evidence-based testing.
- **SC-29 — Analytics & Measurement:** Events, privacy, reporting and data quality.
- **SC-30 — Performance:** Latency, caching, DB efficiency, capacity and costs.
- **SC-31 — Infrastructure:** DNS, TLS, environment, hosting, storage and network.
- **SC-32 — CI/CD & Deployment:** Build, migrations, deploy, rollback, release approvals.
- **SC-33 — Observability:** Logs, metrics, tracing, alerts, health checks.
- **SC-34 — Backup & Disaster Recovery:** Backups, restore, RPO, RTO and continuity.
- **SC-35 — Maintenance:** Upgrades, vulnerabilities, technical debt, documentation.
- **SC-36 — AI-Specific Risks:** Prompt injection, tool abuse, context, model evaluation, costs.
- **SC-37 — Content & Moderation:** User-generated content, reporting, sanctions, takedowns.
- **SC-38 — Marketing & Growth:** SEO, lead capture, ethical lifecycle email, attribution.
- **SC-39 — Operational Costs:** Infrastructure, services, maintenance, margin and budgeting.
- **SC-40 — Product End-of-Life:** Shutdown, portability, deletion, communications and migration.

### H1. Feature completeness evaluation applied to EVERY substantive functionality

Every feature must be inspected across these 17 dimensions:

1. **Purpose:** business/user objective, success metric and exclusions.
2. **Actors:** roles, anonymous/authenticated users, organization boundary, authorization and ownership.
3. **Inputs:** types, formats, constraints, validation, unknowns and malicious data.
4. **Processing:** atomicity, business invariants, state transitions, side effects.
5. **Outputs:** user-visible success, API response and downstream effects.
6. **Error paths:** expected and unexpected failure handling, retry/cancellation and recovery.
7. **States:** empty, loading, partial, offline, stale, completed, blocked, expired, deleted.
8. **Concurrency:** duplicates, retries, races, optimistic locking, parallel users.
9. **Security:** attack surface, permissions, secrets and abuse.
10. **Privacy:** personal data, minimization, lifecycle and transfers.
11. **Accessibility:** keyboard, semantics, errors, assistive technology.
12. **Performance:** latency, scale, payload and resource consumption.
13. **Integrations:** contracts, provider failure, fallback and idempotency.
14. **Cost:** providers, infrastructure, support and budget limits.
15. **Legal:** conditional disclosure/rights/sector obligations, human legal review.
16. **Tests:** positive, negative, boundary, performance and security evidence.
17. **Maintenance:** observability, versioning, migration, rollback and end-of-life.

Applicability states: APPLICABLE / CONDITIONAL / NOT_APPLICABLE (reason) / UNKNOWN. Verification results: VERIFIED / FAILED / UNVERIFIED / BLOCKED / NOT_APPLICABLE. Do not conflate applicability and verification.

### H2. Canonical account deletion case (cross-reference)

SC-08 account closure/deletion requires subscription state handling, other users' shared data, retained invoices, third-party processor deletion, backups, rights exceptions, role and ownership transfer, abuse prevention, identity verification, evidence. Map it to PDF03, PDF08, SK03, SK09, T18 and T30. This sample illustrates how to relate all products by a shared engineering requirement rather than repeat the same text.


## I. FREE LEAD MAGNET — CONTENT AND FULFILLMENT INDEX

### FREE01 — The AI Software Reality Check

**Marketing subtitle:** *50 Things AI Coding Agents Forget About Your Application.*

Planned package:

1. `reality-check.pdf`: **20–30 pages**, explaining the difference between working prototype and engineered product; why successful demos omit secondary workflows; 50 well-defined checks and evidence examples.
2. `50-point-audit.xlsx`: **exactly 50 checks**, ten each: UX/completeness; authentication/authorization; backend/data; security/production; business/legal/privacy. Add status/applicability/evidence and references, not simplistic self-certification.
3. `project-auditor-lite/SKILL.md`: read-only initial repository mapping and cautious checklist; report limitations; no false legal/security certification.
4. `sample-audit-report.pdf`: clearly fictional illustrative SaaS audit with confirmed/incomplete/unverified/not-applicable statuses.
5. `three-failure-cases.pdf`: IDOR/cross-account leak; duplicated webhook / entitlement; product launched without required legal/customer flows (conditional, jurisdiction-dependent).
6. `getting-started.md`: installation, prerequisites, interpretation of findings, permission warnings, paths to full curriculum.

**Landing page:** illustrative cover, clear downloadable file list, preview, outcome, license, privacy-conscious email input and separately configurable marketing consent. The form cannot offer a file that hasn't been authored. When not ready, offer honest release notification instead.


## J. CROSS-REFERENCES AND BUNDLE MATRIX

| Learning stage | Handbook | Atlas | Agent skills | Templates | Lab |
|---|---|---|---|---|---|
| Foundation | PDF01, PDF02 | PPT01 | SK01, SK02 | T01–T06 | LAB01 |
| Builder | PDF03, PDF04 | PPT02 | SK03, SK04 | T07–T12 | LAB02 |
| Professional | PDF05, PDF06 | PPT03 | SK05, SK06, SK07 | T13–T24 (technical/security) | LAB03 |
| Business | PDF07, PDF08 | PPT04 | SK08, SK09 | T25–T32 | LAB04 |
| Expert | PDF09, PDF10 | PPT05 | SK10, SK11 | T33–T35 + related | LAB05 |
| Architect | PDF11, PDF12 | PPT06 | SK12 + entire suite | T36 + all reusable matrices | LAB06 |

The assignment of templates into curricular levels is pedagogical, not an exclusive licensing definition; bundles must enumerate exact SKUs and included versions in the catalog. Do not sell an item as included until completed.



---

## APPENDIX K — DESIGN ASSETS, COVER MAPPING, AND IMPLEMENTATION INPUTS

This pack ships original **SVG cover concepts** for every seeded catalog product (`assets/covers/<SKU>.svg`). Copy these to the web project's `public/covers/` or configure a build-time asset copy. Visual identity includes a `assets/brand/logo-concept.svg` and `favicon-concept.svg`. The preview contact sheet is `cover-gallery.jpg`.

**Cover licensing/originality:** the included graphics are newly authored vector placeholder artwork. They are not depictions of PDF pages or guarantee that documents exist. All placeholder covers explicitly indicate content is in preparation. The website should display truthful status alongside each cover. The images are editable, resolution-independent and are not encumbered by third-party stock photos. The generator script `generate_covers.py` supports regeneration and modification of the art direction.

**Asset usage rules:** responsive `<img>` with width/height and alt text, lazy load lists, high-priority hero art; avoid loading all 83 covers on first page. Maintain descriptive category-specific media alt text and no cover layout shifts. Actual authored covers may supersede these SVGs by updating the catalog and retaining SKU paths.

**Catalog import:** `catalog-seed.json` includes all 83 planned SKUs, content indices, chapter/subtopic data, related-product references, 100 edge-case titles and 40 parent scope domains. Database seed routine should preserve status/ID, validate foreign references, and be idempotent. All catalog items have `purchasable: false` and do not have defined release dates or prices; that is deliberate.

### K1. Detailed image generation and front-end display expectations

- Category-specific accent palettes (PDF teal, atlas violet/blue, agent skill amber, templates blue, labs purple, blueprints green, bundles warm gold, free teal). Avoid letting color replace labels or accessible contrast.
- A cover art asset for every edition and product, with SKU visible on the illustration and concept status shown. Actual finished files may replace artwork.
- Product card composition: image, title, type/tier, 1–2 line benefits, status, formats, one relevant action; never include an active pay CTA if `purchasable=false`.
- Product detail hero: larger cover mockup with subtle depth and shadows, clearly labeled preview and chapter outline. Optional additional mockups for PDFs (open handbook pages), PowerPoints (individual slides), skills (code manifest tree), templates (table previews) and labs (screenshots) should be **illustrative** until real material exists.
- Responsive visuals should not hide essential information under overlays or colorful gradients; text remains HTML not baked exclusively into images.
- For OG artwork, create square and landscape composites automatically from SVG cover + product label, ensuring appropriate alt/metadata.

### K2. Website feature completeness cross-check (minimum operational details)

For **every site page** specify: user/public/admin actor, route, authentication requirement, breadcrumb, title+meta, primary and secondary CTA, data source, loading/empty/error states, keyboard flow, mobile behavior, localized copy, analytics/consent need, security controls, linked supporting content, tests and release status.

For **every form** specify: validation and examples, spam prevention, backend endpoint, successful persisted result, transactional email if applicable, errors and retry, consent/retention, max length, idempotency and rate limits.

For **every paid downloadable file** specify: actual physical file and version, SKU linkage, ownership, MIME/size/hash, license/usage terms, preview, entitlement and grant method, refund/revocation behavior, version upgrade policy, storage permission, logging and backup.

For **every admin mutation** specify: role authority, CSRF/auth, state transition, audit actor, validation, rollback, risk controls, error/confirmation and verification.

For **every external service** specify: business purpose, data sent and collected, operator data-protection role, secrets, API limitations, contract/retry/idempotency, outage behavior, security, cost/usage and manual recovery procedures.

## APPENDIX L — PRIOR DECISIONS AND REJECTED DIRECTIONS

This project follows iterative decisions made during planning:

1. The objective was originally to generate enough money to buy a €200,000 home outright in six months with zero initial capital. Prior generic web agencies and commission-based industrial brokerage were explicitly rejected as misaligned and low-probability. Do NOT incorporate these businesses into the site.
2. The operator is comfortable building software quickly with AI but does not want a cold-call/service business, paid ads as an assumed prerequisite, or a video teaching business. The sales model must emphasize scalable self-serve downloads and writing-first content.
3. A basic 'how to use AI tools' course was rejected. Education must cover **everything traditional software engineering must consider**, including legal pages, rights and errors, from requirements all the way to production operations and edge cases.
4. A premium written-material catalogue was approved conceptually: PDFs, visual PowerPoints, skills for multiple agent environments, editable templates/checklists, case studies and labs, by progressively advanced levels.
5. A free reality-check diagnostic kit and a full master content index were introduced. A full independent website and customer download library are now requested, with truthful visual placeholders for the not-yet-authored materials.
6. Proposed prices are validation hypotheses; never market earnings outcomes, imply successful sales, or publish unavailable paid goods.

## APPENDIX M — FINAL DEFINITION OF 'DONE'

**A codebase counts as complete/deployable only when:**

- All routes and actual public/admin/customer flows in this spec are implemented and visually cohesive, not mocked behind nonfunctional buttons.
- Catalog contains all seeded products and actual placeholder covers, searchable, with honest statuses and appropriate non-purchasable treatment.
- Real purchase flow is implemented against sandbox/test merchant integration with verifiable webhook/signature/idempotency, and customer entitlements/private downloads; live configuration depends on merchant approval and actual files.
- Admin can publish real products after uploading assets and clearing release gates; admin operations are role-gated and audited.
- Lead/free download, support, email preferences, content, SEO, legal placeholders and privacy controls work, with compliance review explicitly blocked where needed.
- Code compiles, automated and manual acceptance tests are recorded, mobile and accessibility review completed, migrations/seed work, secure production configuration and documented deploy/rollback/restoration instructions exist.
- Any unsatisfied external prerequisites (identity, seller approval, domain, legal review, real content) appear in a single `docs/production-launch-blockers.md`.

**Do not invent production deployment**. A successfully built local/staging system with credentials missing is **deployment-ready but not live**.
