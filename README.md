# ai-engineering

AI Engineering Mastery System: a Nuxt 4 storefront and reference library with PostgreSQL persistence, customer accounts, editorial administration, reviewed private assets, and payment-driven access.

All **83 supplied resources are planned**. The supplied ZIP contains outlines and concept covers, not saleable files. Prices, reviews, release dates, operator details and production credentials are not invented. Local synthetic fixtures exercise commerce without charging money.

## Run locally

Requirements: Node **24.21.0**, npm 11 and Docker Compose. Run from this directory in WSL/Linux/macOS:

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run setup
npm run prepare
docker compose up -d postgres
npm run db:migrate
npm run db:seed
npm run dev
```

Alternatively, after migrations/seed, run the production image locally with `docker compose --profile app up -d --build app` instead of `npm run dev`. Stop it with `docker compose --profile app stop app`.

Open **http://localhost:3000**. Keep `APP_BASE_URL` consistent with the browser origin. The database binds only to `127.0.0.1:55437`; the dev server binds only to loopback. `setup` creates random local secrets in ignored `.env` and preserves an existing file. Never replace a database password without coordinating its stored credentials.

The default email adapter writes messages into private `.data/mail/*.json`. To sign in, request a link on `/account/sign-in` and open the link from the newest message addressed to you. These messages contain credentials: do not commit or share them. Optional SMTP catcher: `docker compose --profile smtp up -d mailpit`, set `EMAIL_PROVIDER=smtp`, and use http://localhost:8025. Restart the app after environment changes.

Create your administrator explicitly:

```bash
npm run admin:create -- ruimiguel616@gmail.com
```

Then request a normal sign-in link for that address. The seed never creates an administrator or shared password. Role grants require direct operator access to the CLI/database. The supplied Git identity is not automatically an app login.

## What is implemented

- Responsive light/dark storefront, all category and resource routes, 83 covers, searchable/filterable catalog, labeled outline previews, 40 scope domains and 100 planned failure cases.
- Passwordless single-use sign-in, secure sessions, account preferences, orders, licenses, library, expiring downloads, session revocation and account-data export/privacy requests.
- Role-protected admin catalog/content editing, optimistic revisions, exact bundle inclusions, quarantine/review/version publication, support/privacy triage, audit history, settings and release gates.
- Local checkout plus Lemon Squeezy adapter, raw-byte HMAC verification, transactional duplicate/stale-event handling, entitlement snapshots, refund revocation and provider reconciliation.
- Persisted notification requests, separate marketing confirmation/unsubscribe, cookie choices, contact requests, editorial content, sitemap and canonical metadata.
- Email outbox worker, migrations, reproducible seed, Docker image, CI checks, backup/restore scripts and operator runbooks.

Private files use `.data/private` in local mode. An S3-compatible adapter is implemented for staging/production; actual bucket permissions and signed delivery must be verified against the selected service. The registry could not resolve the investigated MinIO images in this environment, so Compose does not pretend to provide an unverified image. See [architecture decisions](docs/architecture.md).

## Verify

Start the built server in one terminal:

```bash
npm run build
HOST=127.0.0.1 node --env-file=.env .output/server/index.mjs
```

In another:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test:unit
npm run test:integration
npx playwright install --with-deps chromium
npm run test:e2e
npm run audit:dependencies
node --env-file=.env .output/server/worker.mjs
```

Integration/browser tests require the local mock configuration and a running database/app. They create synthetic `TEST-*` resources and `@example.test` identities, then hide their products and unpublish their articles. Test receipts, sessions and audit history remain in the local database. Use a separate database for CI; never point these tests at production.

`npm run mail:work` runs the worker from source. The built worker processes at most 50 jobs per invocation; schedule it every minute on a deployed host. Messages are at-least-once, so a crash immediately after SMTP acceptance can produce a duplicate email. Entitlements themselves remain transactionally idempotent.

## Delivery and operations

- [Verification and acceptance ledger](docs/verification.md)
- [Architecture and data boundaries](docs/architecture.md)
- [Deployment, rollback and backups](docs/operations.md)
- [Security and dependency review](docs/security.md)
- [Build log](docs/build-log.md)
- [Original complete specification](docs/brief/MASTER_SPEC.md)

No production domain has been deployed. Live payments remain blocked until real operator/legal information, finished reviewed files, merchant approval, verified email, private storage, domain/TLS and operational evidence are configured. The admin release-gate page reports configuration; it cannot certify the truth of an operator's external evidence.
