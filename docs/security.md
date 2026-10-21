# Security and change review

Review scope: the initial application implementation on `main`, compared with README-only base `b0fe435`. Review was performed by the implementing agent in bounded slices (public UI, authorization, publishing, commerce/delivery, operations). It is not an independent penetration test. Evidence applies to the local built Node application and dedicated synthetic database.

## Callable boundaries

| Surface | Server enforcement |
| --- | --- |
| Catalog/search/articles/pages/settings projection | Public, visible/published records only; explicit projected fields; no file keys |
| Lead/contact/consent/auth requests | Strict schemas, honeypot where applicable, same-origin mutation checks, DB-backed rate limits and body limits |
| Magic-link consume | Atomic expiry/unused check; hash-only token storage; cannot choose role |
| `/api/me/*`, account pages | Current authenticated user; email/user-ID ownership; session revocation |
| `/api/admin/products*`, content and uploads | Admin/editor check on server; editorial revisions; legal routes admin only |
| Product/file/version publication, bundle/settings/reconciliation | Administrator only, current state/preconditions and audit writes |
| Admin support/order projections | Explicit admin/support allowlist; editor cannot read customer records |
| Privacy triage, consents, audit, integrations, gates | Administrator only |
| Checkout create/free claim | SKU-only input, server eligibility; free claim requires a verified account; exact snapshot |
| Payment webhook | Raw HMAC, schema, provider/store/environment and current provider state; transaction/advisory lock/dedupe |
| Download issuance and delivery | Current user, paid order, active exact SKU, reviewed published file, expiring user-bound token; repeat authorization at delivery |
| Scheduled mail worker | No HTTP entry; host-supplied credentials and row claims |
| Health, robots, sitemap | Public minimal availability/crawler metadata; no secrets |

All mutable API requests require the configured Origin, except the signed provider webhook. All API/account/admin/checkout responses use private/no-store. Security headers deny framing and MIME sniffing and constrain resources. HTTPS environments receive HSTS. A request cap applies before buffering Node request streams, including chunked uploads. This implementation targets Nitro's Node preset; changing to an edge/web Request preset requires re-verifying the body limiter and storage adapters.

CSP permits inline scripts/styles for Nuxt hydration and current styling. This is a documented hardening limitation, not a claim of strict nonce-based CSP. Content is escaped and arbitrary HTML is unsupported. Proxy IP trust, robust production DDoS controls, external malware scanning and a real security review remain deployment work.

## Findings resolved during implementation

| ID | Finding | Resolution and proof |
| --- | --- | --- |
| R1 | Duplicate/out-of-order payment messages could produce inconsistent access | Per-order transaction lock, payload uniqueness, monotonic terminal revocation; concurrent replay/refund tests |
| R2 | A redirect could be confused with payment confirmation | Completion only reads persisted order state; pending redirect test |
| R3 | Approved metadata alone could publish an empty resource | Real file/hash review/version and license gate; rejection then successful reviewed publication test |
| R4 | New version and release page could drift | Library joins all approved published versions; dynamic release feed; existing-buyer update test |
| R5 | Reserved legal route could bypass legal role by using page kind | Reserved slug and content-kind checks; editor negative test |
| R6 | Content-Length check alone missed chunked oversized bodies | Streaming cap before h3 raw-body buffering; real chunked HTTP 413 test |
| R7 | First pending order followed by paid could miss access email | Dedupe-keyed outbox insertion for every transition to paid; duplicate notifications still produce one job |
| R8 | Build-tool advisories appeared to imply runtime packages | Inspect exact dependency graph and shipped output; explicit expiring exceptions below; no false clean-scan claim |
| R9 | Preview server file watcher missed newly created routes on Windows mount | Verify production build; polling enabled for dev; real route sweep |

## Dependency advisories

The recorded scan reports 11 affected package entries through two high-severity advisory roots. At verification time neither had a patched package version:

- [braces GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): dependency of build-time tooling.
- [node-forge GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv): build/development certificate tooling.

Neither package is present in the verified `.output/server/node_modules` production runtime. The Docker runtime copies only `.output`, not the full dependency tree. These are **known unresolved build-environment findings**; use trusted source inputs and do not expose the dev server. `npm run audit:dependencies` records the complete current audit, blocks new high/critical advisory roots and expires the two scoped exceptions on **2026-11-21**. If a future bundle introduces either runtime package, the exception fails. Review reachability again when Nuxt/Nitro changes; an absent package directory alone is insufficient if a future bundler inlines that library.

No dependencies were downgraded automatically to suppress the report. Exact package lock and metadata are committed. CI artifacts may contain synthetic test screenshots/traces; never upload production traces, local mail or `.env`.

## External release gates

Real legal identity/review, merchant approval, selected hosting/TLS, verified SMTP/DNS, actual S3 privacy/expiry tests, finished files/licenses, external monitoring, operator access review, target-host backup/restore and provider sandbox evidence remain required. Local attestations default false. A release-gate status of configured still requires the operator's evidence.

Partial refunds conservatively revoke the whole order. A previously issued S3 URL can remain usable for up to 60 seconds. Email delivery can duplicate after a worker crash. The local filesystem and mail catcher are loopback-only development adapters. These limits are visible in the architecture/runbook and must be accepted or changed before live sales.

Additional final review findings: the browser exposed a Nuxt component-prefix mismatch and static POST routes shadowing generic admin GET handlers. The content component now uses its generated `AdminContentEditor` name; content/bundles/settings have explicit GET handlers delegating to one role-checked service. The admin browser suite sweeps every section. The initial duplicate-product test also exposed Drizzle query parameters in Nitro's default error log. A synchronous Nitro error hook now emits only a generated request ID, method, status and bounded database code, clears sensitive causes/stacks, and maps uniqueness conflicts to a safe 409. This behavior was matched to the exact installed Nitro/Hookable source and has a real HTTP regression check.
