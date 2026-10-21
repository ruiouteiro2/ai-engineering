# START HERE — AI Engineering Mastery Website for Codex

This package contains the complete specification and reusable catalog/cover starter assets for the AI Engineering Mastery System **website**. It is not a finished app.

## Files

- `CODEX_MASTER_SPEC.md` — full functional, editorial, design, technical, security, ecommerce, legal/operational, test and deployment brief.
- `catalog-seed.json` — 83 truthful PLANNED product entries, including 12 PDFs, 6 PPTs, 12 Skills, 36 Templates, 6 Labs, 6 Blueprints, 4 bundle concepts and 1 free resource; includes 100 case titles and 40 scope domains.
- `assets/covers/*.svg` — 83 original editable concept covers, one per product.
- `assets/brand/*.svg` — provisional logo and favicon.
- `cover-gallery.jpg` — preview of the supplied cover style.
- `generate_catalog.py`, `generate_covers.py` — source scripts to regenerate catalog and cover art.

## How to use with Codex

1. Create an empty repository directory. Put this entire package's files at the repository root (or at least the master brief, seed and `assets/` folder).
2. Open that folder in Codex (IDE/CLI/app).
3. Use the prompt below. Do not ask for the whole site in an unverified single command: let Codex implement phases with working code and tests, while keeping the spec available.
4. When a phase ends, ask Codex for the test results and any launch blockers, then continue.

## Initial Codex prompt (copy/paste)

```text
Read CODEX_MASTER_SPEC.md in full. Treat it as the authoritative, detailed specification for the entire AI Engineering Mastery System ecommerce website. Implement the actual Nuxt 4/TypeScript/PostgreSQL application from an empty repository to production-deployable quality, including: polished responsive public pages, truthful complete seeded catalog, provided SVG cover artwork, admin CMS, customer library, authentication, secure paid downloads, free resources, Lemon Squeezy test checkout and signed idempotent webhooks, content/SEO, privacy/legal placeholders, marketing integrations, accessibility, automated tests, CI/CD, Docker and production runbooks.

Do not produce only a plan: implement the code and test it in phases 0–5, logging actual progress and verification. Maintain a concise AGENTS.md referencing this brief, a PLANS.md and docs/build-log.md. Never invent completed paid products, credentials, merchant approval, sales, reviews, legal conformity, payment success or production deployment. Keep all unavailable SKUs clearly PLANNED/non-purchasable. Use the `assets/covers/` and `catalog-seed.json` provided. Ask only when genuinely blocked by external credentials, legal operator details, seller approval or production domain access; continue independently on all testable work. At the end, provide exact verified commands to run/test/deploy and an honest list of manual activation gates.
```

## Important

Do not put the 170KB specification directly into `AGENTS.md`. It is a reference and source of truth. `AGENTS.md` should contain short conditional project rules and pointers. Codex can inspect the relevant sections when tasks arise. The catalog is a planned product roadmap, not files that already exist. No live selling of empty download promises.
