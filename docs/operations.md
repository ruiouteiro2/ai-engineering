# Operations runbook

## Local startup and stopping

Follow README. `docker compose ps` and `GET /api/health` confirm database/app availability. The health endpoint returns a generic 503 if the database is unavailable. Stop the Node process with Ctrl+C and use `docker compose stop` to stop the task-owned services. Never run `docker compose down -v` against data you need.

The local compose volume is `ai-engineering-pg`. SMTP is an optional profile. Secrets live only in ignored `.env`; generated messages, private files, dumps and test traces are ignored. Build and start commands must run from the repository directory. For Windows use WSL and prefer a native Linux filesystem for large dependency trees; the `/mnt/c` build can be substantially slower.

## Image and production target preparation

```bash
docker build -t ai-engineering:reviewed .
```

The image contains only Nitro runtime output and the bundled email worker, runs as `node`, and includes a database-aware healthcheck. Development/build tooling does not ship. Pin a release image by immutable digest and record its Git revision; do not deploy a mutable `latest` tag.

Before a real deployment, provision a dedicated PostgreSQL database, private S3 bucket, verified SMTP sender and a host with TLS termination. Keep the DB and Node port private. Use Caddy/nginx on the selected host with HTTPS, request body limit 20 MB, request/idle timeouts and explicit reverse-proxy routing. Do not trust arbitrary forwarded IP headers. The app currently rate-limits by the socket peer address, so clients behind a proxy share a rate bucket unless a reviewed trusted-proxy strategy is added; also rate-limit at the edge. Configure the app's exact HTTPS origin in both `APP_BASE_URL` and `NUXT_PUBLIC_SITE_URL`.

Set DNS A/AAAA records to the verified host and configure automatic certificate renewal. Publish the mail provider's actual SPF/DKIM records and an operator-reviewed DMARC policy. Do not copy placeholder DNS values. Verify delivery, bounce handling and unsubscribe with a real test mailbox before enabling production email.

Set `EMAIL_PROVIDER=smtp`, actual SMTP credentials/from address, `STORAGE_PROVIDER=s3`, a private bucket and least-privilege bucket credentials. Remove `STORAGE_ENDPOINT` for native AWS endpoints, or set the verified S3-compatible HTTPS endpoint. Deny public reads/listing. Confirm S3 CORS is unnecessary for redirect downloads unless the UI contract changes.

All `*_VERIFIED`, merchant, legal and operational approval flags default false. They are operator attestations backed by evidence, not automatic certification. Keep `SITE_LIVE_PAYMENTS_ENABLED=false` throughout staging.

## Payment staging and activation

1. Obtain an approved Lemon Squeezy account and test API/store/webhook credentials. Configure `PAYMENT_PROVIDER=lemonsqueezy`, `LEMONSQUEEZY_MODE=test` and a distinct signing secret.
2. Configure the exact HTTPS webhook `/api/webhooks/lemonsqueezy` for `order_created` and `order_refunded`. The provider must preserve the signed raw payload. The application reads the provider's current order state for each valid event.
3. Author real files, verify licenses and safety, upload into an unpublished version, review the stored hash and publish the version. Configure exact one-time variant IDs/currency/prices. Publish products only after review.
4. Perform a provider sandbox purchase, verify receipt, browser completion, database order/entitlement, outbox delivery, account ownership and signed download. Replay events, refund, expire URLs and retry an unavailable provider. Save sanitized evidence and event identifiers.
5. Publish reviewed legal pages and verified operator settings. Verify merchant eligibility, TLS, private object storage, sender DNS, support ownership, backups/restore, admin access and monitoring.
6. A separately authorized live deployment may select live credentials/mappings and set release attestations. Only then enable `SITE_LIVE_PAYMENTS_ENABLED`. Never use test variant IDs with live mode. Recheck the exact release gates and a controlled live transaction under the operator's authorization.

The local mock page never charges money. The actual Lemon provider and production S3/SMTP/DNS are not certified by mock tests.

## Migrations and releases

Take a backup first. Review every SQL migration. Run `npm ci --ignore-scripts`, `npm run prepare`, `npm run db:migrate` from a trusted source checkout with the target database secret supplied securely. The migration journal makes repeat application safe. Do not run `db:seed` on production as a release shortcut; its insert-only behavior is intended for initial catalog setup, not authorization to change a live catalog.

Keep current and previous immutable application images. Prepare a candidate with its own internal port and verify health, identity, authentication, catalog, admin denial and one approved test workflow. Change the reverse-proxy upstream using the host's reviewed procedure. This repository does not assume atomic host deployment. Read back the live release identity and repeat smoke checks after the switch. No actual target host has been selected or deployed.

For an application-only rollback, switch the upstream back to the previous verified image and re-run health/account/download checks. Only roll back code that is compatible with the current schema. Do not reverse destructive migrations or restore an old production database over newer orders without a separate incident plan. The local release start/stop/restart drill is evidence for process recovery, not proof of a remote proxy switch.

## Background work and retention

Run `node .output/server/worker.mjs` every minute with the same database/email configuration, a bounded scheduler timeout and overlap permitted via row locks. Alert on `email_jobs` in FAILED state or attempts >= 5, old pending jobs, HELD payment events, repeated 5xx responses and failed backup jobs. Requeue only a reviewed job, recording the operator action; do not reset all jobs.

Use an external uptime check on `/api/health`, provider dashboard alerts and secret-redacted application/proxy logs. Disable logging of query strings, cookies, authorization headers, message bodies, signed URLs and webhook bodies. Trace IDs should be generated independently of personal data. Set actual retention windows with the operator; purge expired sessions, magic links, download tokens and rate-limit rows on a scheduled job after verification. Keep order/audit retention aligned with the reviewed policy.

## Backups and restore

```bash
bash scripts/backup.sh
bash scripts/restore-drill.sh .data/backups/EXACT_BACKUP_NAME.dump
```

These scripts target only the named development container. Restore creates a separate `ai_restore_TIMESTAMP` database and leaves the source untouched. The dump includes personal data; keep it private. Restore private object/filesystem assets as well as the database. A database-only dump cannot reconstruct paid files.

For production, use encrypted off-host daily full backups plus WAL/PITR if supported, versioned private object storage and a documented restore role. Proposed targets are RPO <= 24 hours and RTO <= 4 hours; they are targets, not measured production guarantees. Run a restore drill on an isolated staging database and object prefix before launch, monthly thereafter, and after backup/config changes. Record dump/object versions, integrity counts, elapsed time, exact app image and an authorized download after restore.

## Incident response

Disable new live checkouts with `SITE_LIVE_PAYMENTS_ENABLED=false`; keep verified webhook/refund processing available. Revoke a compromised user's sessions and disable their account. Rotate affected provider/storage/session secrets through the selected service, review audit events, and reconcile provider orders using authoritative provider reads. Preserve evidence under the retention policy. Never log full payment payloads or email sign-in links to diagnose an incident. Handle deletion requests individually after confirming identity and retention obligations; marking a request complete does not perform deletion automatically.
