# Verification and acceptance ledger

Target: local production-mode Nitro application and PostgreSQL 16, Node 24.21.0, with synthetic identities/files and mock payments. No real customer data or money was used. The final Git commit identifies the delivered source; commands and limitations below describe what was exercised. Logs/traces containing synthetic account tokens remain local and ignored.

## Reproducible checks

Use README commands with the built server running. Tests are split into deterministic contract checks, real HTTP/PostgreSQL integration checks, and Chromium browser journeys. The browser suite covers catalog/search/notification, mobile/theme/keyboard, email sign-in/preferences/sign-out, public/product routing, admin creation/revision/content publication and every admin section, graceful provider failure, and guest checkout through private download.

The initial implementation was tested on the Windows-mounted WSL workspace. Browser runtime libraries unavailable on the host were unpacked into a temporary directory; no system packages were changed. Standard Linux/CI setup uses `playwright install --with-deps chromium`. On this workspace the equivalent browser command uses `LD_LIBRARY_PATH=/tmp/ai-engineering-browser-libs/root/usr/lib/x86_64-linux-gnu npm run test:e2e`.

Axe scans cover the home page in both themes and admin release gates. Viewports: 320, 375, 768, 1440 and 1920 pixels. Keyboard evidence covers skip-to-content, mobile navigation and outline-dialog Escape. This is not a complete screen-reader certification or a browser compatibility claim beyond Chromium.

Fresh-database evidence: migrations ran twice, seed ran twice, readback returned exactly 83 PLANNED/non-purchasable products. The temporary database was removed afterward. Backup/restore evidence: `.data/backups/ai-engineering-20261021T184004Z.dump` restored into separate `ai_restore_20261021184005`, reading 84 products (83 supplied plus one hidden test SKU) and one test order. The source database remained unchanged. SMTP delivery was accepted and read back from local Mailpit. The built outbox worker delivered one queued synthetic order message with zero failures.

Bounded local performance sample: 50 requests per route, concurrency five, warmed built server, zero errors. Catalog API p50 20 ms / p95 81 ms; home SSR p50 146 ms / p95 304 ms. The local p95 budget is 1,000 ms. Reproduce with `node --env-file=.env scripts/measure.mjs`. These figures are not public-network, staging-capacity, Core Web Vitals or production SLA claims.

## Specification §9.2

“Local” means demonstrated with the documented local adapters. “External gate” means real credentials/operator/host evidence is absent, not silently passed. The original specification permits explicit launch blockers and a safe basic CMS.

| # | Acceptance scenario | Evidence / boundary |
| --- | --- | --- |
| 1 | Routes and working controls | Public route sweep, all 83 detail routes, admin section sweep, customer/admin browser journeys; no fabricated provider controls |
| 2 | Complete seed and covers | Unit invariants and database readback: 83 SKUs; supplied SVG assets |
| 3 | Truthful status / checkout gate | All seed items remain planned; unavailable checkout returns 409 |
| 4 | Search/filter/sort/no results | URL-state catalog browser test; reset recovers 12 results; grouped editorial search |
| 5 | Responsive shell/catalog/detail | Five viewport widths, mobile navigation and overflow check; supplied cover review |
| 6 | Original artwork access | Seed invariant verifies every cover exists; browser renders assets |
| 7 | Labeled safe previews | Native outline dialog; no paid files in public assets |
| 8 | English and localization readiness | Typed shared common UI keys and separate CMS/catalog copy; remaining page-specific copy extraction required for a second language |
| 9 | SEO / private draft exclusions | Sitemap and noindex HTTP assertions; public canonical metadata; no private or draft policy routes in sitemap |
| 10 | Legal routes / live gate | Meaningful labeled drafts; role-protected policy publication and false-by-default release attestations |
| 11 | Cookie controls | Real persisted choices; no optional tracking loaded in either state |
| 12 | Lead/consent persistence | Integration readback of lead consent; separate marketing confirmation |
| 13 | Contact persistence / spam | Real stored support request, honeypot/rate limit, browser error feedback |
| 14 | Passwordless sessions | Real browser email-link consumption and profile readback; secure cookie assertions |
| 15 | Anonymous private denial | HTTP 401 and browser sign-in redirects |
| 16 | Role denial | Customer and editor negative tests; explicit admin route matrix |
| 17 | Audited product editing | Browser create/edit + revision readback; publication/audit integration |
| 18 | Asset quarantine/version/review | Upload quarantine, rejected premature publication, hash approval, published version |
| 19 | Client price/variant tampering | Strict SKU-only checkout schema rejects extra price; server snapshot/provider mapping |
| 20 | Eligible provider sandbox checkout | Local signed mock verified; real Lemon Squeezy sandbox remains an external gate |
| 21 | Redirect does not grant | Pending completion before signed event; browser checkout waits for verified state |
| 22 | Durable valid webhook | Real HTTP HMAC path and PostgreSQL order/entitlement readback |
| 23 | Forged signature | HTTP 401 and raw-byte signature unit checks |
| 24 | Duplicate event | Three concurrent deliveries yield one order/entitlement and one outbox job |
| 25 | Out-of-order reconciliation | Late paid event leaves refunded status; stale event recorded; provider reconciliation adapter is externally gated |
| 26 | Refund / disputed state | Refund revocation demonstrated; fraudulent/partial-refund use the same conservative terminal policy; actual provider dispute notification requires sandbox evidence |
| 27 | Guest to verified account | Browser guest purchase → real local email sign-in → owned library download |
| 28 | No public paid URL | Private filesystem outside public; direct public request 404 |
| 29 | Unauthorized download | Anonymous and second-account negative tests |
| 30 | Short-lived delivery | User-bound 60-second local token and real byte readback; S3 URL adapter requires target-bucket verification |
| 31 | Expiry | Token expiry gives 410; newly issued authorized URLs use a fresh expiry |
| 32 | Updated files | Existing buyer sees approved version 1.1.0 without a new order |
| 33 | Exact SKU | Different account has no file access; exact entitlements read back |
| 34 | Bundle scope | One constituent yields exactly one SKU; published composition cannot be changed; free claim idempotent |
| 35 | License before sale | Server gate and product display; actual commercial licenses still require operator review |
| 36 | Provider status | Admin integrations and gates report local/unverified/blocked states |
| 37 | Transactional email | File catcher/outbox delivery and optional Mailpit SMTP readback; non-local SMTP requires verified-sender flag |
| 38 | Unsubscribe | Confirmation/unsubscribe API followed by PostgreSQL state assertions |
| 39 | Secret-safe logs | Error-redaction hook, safe duplicate-conflict test and staged secret scan; raw webhooks/sign-in tokens not intentionally logged |
| 40 | Empty migrations | Two successful passes on a newly created disposable DB |
| 41 | Repeatable seed | Two passes; exactly 83 rows and all planned |
| 42 | Automated checks | Final command results recorded in build log; dependency exceptions are explicit |
| 43 | Docker dev stack | Compose PostgreSQL healthy; optional pinned Mailpit healthy and SMTP-tested; local files replace unavailable MinIO image |
| 44 | Production container | Docker build and isolated local runtime health/readback; no remote deployment |
| 45 | Backup / restore | Separate local database restoration demonstrated; actual staging host restore remains a launch gate |
| 46 | Rollback | Local image process stop/start recovery; remote proxy/image rollback remains host-specific and unexecuted |
| 47 | Failure recovery | Browser simulated mail outage displays retry guidance; unavailable DB/provider uses safe errors; duplicate record returns sanitized conflict |
| 48 | Accessibility | Axe in tested states, keyboard navigation/dialog and responsive checks; full assistive-technology audit remains external |
| 49 | Performance / SEO | Bounded local latency and SEO evidence above; production network/LCP/CLS/staging budgets need target-host measurement |
| 50 | Launch checklist | Admin release gates plus operations/security runbooks; legal, merchant, actual files, sender, S3, DNS/TLS, support, backups and monitoring are not falsely marked complete |

## Known delivery limits

The application implements a safe basic CMS, not every optional editorial embellishment in the brief. Content uses escaped text/headings rather than arbitrary rich HTML. Category definitions are curated in source; catalog grouping and content changes use admin. Affiliate enrollment, trainer-seat licensing, analytics, marketing campaigns, external error tracking and multi-language publication are inactive until their actual contracts/providers/content exist. Price availability and verified agent compatibility facets are exposed without asserting unverified compatibility. Article search and pagination are implemented; advanced tagging and rich editorial embeds are outside the basic CMS. These are documented scope limits, not inert UI controls.

No real product files, operator legal identity, merchant credentials or selected production host were provided. Provider sandbox, production bucket/email, full legal/accessibility approval and remote rollout evidence therefore remain blocked. Do not describe this repository as a live shop or universally secure/bug-free.
