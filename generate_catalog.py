from pathlib import Path
import json, re, textwrap, hashlib
BASE=Path(__file__).resolve().parent
BRIEF=BASE/'brief'

PDFS=[
('PDF01','Product Discovery, Requirements & Engineering Thinking','FOUNDATION',[
('Engineering with AI','Traditional roles and their responsibilities; working software versus production-ready product; hidden product scope; ethical limits of agent autonomy'),
('Product discovery','Audience, jobs-to-be-done and user segments; problem statement and desired outcomes; competition and assumptions; scope validation without building'),
('Actors and stakeholder modelling','Anonymous visitors, registered users, customers, admins, support, moderators, team owners and external services; privileges; consent and identity boundaries'),
('Functional requirements','Primary and secondary features; user stories and use cases; preconditions, postconditions and invariants; alternate and failure flows; dependencies'),
('Non-functional requirements','Security and privacy; availability and resilience; performance and cost; accessibility and localization; observability and maintenance'),
('Scope and prioritization','MVP versus production completeness; must/should/could and exclusion notes; release milestones; scope creep; technical debt transparency'),
('Business rules and constraints','Eligibility, trials, quotas and limits; plan entitlements; geographic/legal constraints; data retention; timing and cancellation rules'),
('Journey mapping','Discovery, registration, onboarding; paid conversion and renewals; support and reporting; suspension, cancellation and offboarding; interrupted journeys'),
('Data specification','Entities, ownership and relationships; classification and sensitivity; collection purpose and lifecycle; export and deletion; audit metadata'),
('Risk identification','Technical, legal, operational, commercial and security risks; probability/impact matrix; mitigations and responsible ownership'),
('Engineering choices','Stack selection and maturity; build-versus-buy; architectural trade-offs; ADRs and reversible decisions'),
('Complete product requirements documents','PRD structure; functional matrix; acceptance criteria; traceability and evidence; assumptions/open questions'),
('Implementation planning','Vertical slices; dependencies and definition of ready/done; agent handoffs; stage review; measurable release criteria'),
]),
('PDF02','Context Engineering, Prompting & AI Agent Control','FOUNDATION',[
('Agent mental model','LLM, agent, tools, environment and context; capabilities and limitations; separating claims from evidence'),
('Spec-driven prompting','Objectives and acceptance criteria; inputs, output contracts and examples; constraints; scoping and non-goals'),
('Context engineering','Repository map and relevant docs; persistent memory; context window pressure and contradictions; selective reading'),
('Repository rules','AGENTS.md and CLAUDE.md conventions; hierarchy of instructions; rules vs. knowledge; minimal stable guidance'),
('Planning safely','Read-only investigation; impact mapping; dependency analysis; pre-edit plan; approvals for risky actions'),
('Controlled code editing','Diff review; small commits; branch strategy; no unrelated changes; rollback and checkpoint strategies'),
('Investigation over guessing','Minimal reproductions; experiments; hypotheses and evidence; detecting placebo fixes'),
('Agent tool permissions','Terminal, browser and file access; APIs and MCP; prompt injection and least privilege; approval gates'),
('Anatomy of skills','SKILL.md frontmatter; references and scripts; installation scopes; testability and compatibility'),
('AI failure modes','Hallucinated modules; invented APIs; simulated green tests; task drift; circular repairs; unintended repo edits'),
('Sessions and handoffs','Compaction, loss of context and state reconstruction; decision records; handoff checkpoints'),
('Verification-driven engineering','Tests and runtime evidence; independent reviewer; diff and contract checks; explicit uncertainty'),
('Advanced workflows','Spec-first, test-first, planning and testing separation; multiple agents with defined file ownership'),
('Privacy, cost and governance','Secrets, proprietary code, provider privacy; token/cost budgeting; audit and accountability'),
]),
('PDF03','The Complete Application Anatomy','BUILDER',[
('Product and website architecture','Public vs private vs admin surfaces; routing, subdomains and deployment; sitemap and information architecture'),
('Public website essentials','Homepage, features, pricing, FAQ, about, contact and support; documentation and terms; correct identity/disclosure'),
('Supporting and error pages','400, 401, 403, 404, 409, 422, 429, 500, 502, 503; maintenance and downtime; suspended, disabled, expired, unauthorized'),
('SEO and social presence','Titles and descriptions, canonical and hreflang; sitemap robots redirects; Open Graph; structured data'),
('Registration and onboarding','Account creation; invite flows; verification and anti-abuse; initial project setup; incomplete onboarding'),
('Authentication lifecycle','Login, logout and reset; magic links/passkeys/MFA; session expiration and token revocation; concurrent sessions'),
('Account management lifecycle','Profile and preferences; notifications; credentials; export; deletion, suspension, ownership transfer'),
('Teams and organizations','Roles and permissions; invite expiry and revocation; billing owner; tenant isolation; member removal'),
('Navigation and responsiveness','Menus, breadcrumb and search; mobile layouts; keyboard/shortcuts; persistence and focus'),
('UI component states','Inputs, tables, modals and uploads; disabled, loading, empty, pending, success, error; destructive confirmations'),
('All asynchronous states','Offline/partial result; stale data; timeout and retry; polling and cancellation; optimistic update failure'),
('Forms and validation','Client/server parity; errors and field-level help; duplicate submissions; draft saving and data-loss warning'),
('Accessibility end-to-end','Semantic structure; keyboard and focus; contrast and motion; assistive tech; error announcement'),
('Internationalization','Locale routing; timezone and DST; currency and decimal rules; Unicode, plurals and RTL'),
('CRUD and data workflows','Ownership and RBAC; soft/hard deletion; history and restore; bulk operations; concurrent edits'),
('Search, filtering, dashboards','Query design and pagination; filters and sorting; empty result; export and reporting'),
('Notifications and messaging','Email, in-app, push, SMS; preferences and unsubscribe; retries, deduplication and delivery failures'),
('Files and media','Size/type validation; malware and private storage; presigned URLs; transformations, deletion and retention'),
('Background and scheduled tasks','Queue and worker lifecycle; retries, idempotency, poison jobs; progress and cancellation'),
('Pricing and entitlements','Free/paid/trial; usage limits; feature flags; plan change; expiry and offline permissions'),
('Payments and subscriptions','Checkout and failures; provider reconciliation; refunds and charges; cancelled subscriptions and access'),
('Admin and back office','User and organization management; support; audit logs; sensitive actions; role separation'),
('Legal pages and business identity','Privacy, cookie/terms/sales/refund info as applicable; contact details; IP/attribution and notices'),
('Privacy lifecycle flows','Data export, deletion, consent management; processors; retention; backups and permitted exceptions'),
('Support and trust','Help center, tickets, incident notices, status when maintained; abusive use; feedback and complaints'),
('Infrastructure and operations','Dev/staging/prod; DNS/TLS, secret config; object storage; deploy and rollback; emails and backups'),
('Security and reliability','Authorization by resource; concurrency and data integrity; rate limits; failure handling'),
('Release and post-launch','Preflight checklist, evidence, owner acceptance; production smoke tests; support monitoring; vulnerability response'),
]),
('PDF04','Full-Stack Implementation Patterns','BUILDER',[
('Frontend architecture','Composition; layouts; SSR CSR SSG hydration; local/server/global state and typed contracts'),
('Backend architecture','Controller/service/domain/persistence; server-side authorization; consistent error and validation layers'),
('API design','REST/GraphQL conventions; OpenAPI; schemas; errors; versioning; cursor pagination'),
('Data modelling','Entities, relationships and schema constraints; indexes; immutability and audit records'),
('Forms and state','Optimistic updates and rollback; validation; multi-step forms; duplicate submit prevention'),
('Authentication implementation','Secure sessions and tokens; authorization checks; lifecycle events'),
('External integrations','Timeouts, retries, webhooks, signatures, rate limits, circuit breakers and fallbacks'),
('Storage and uploads','Public/private objects; validation; upload processing and metadata'),
('Realtime systems','WebSockets/SSE; reconnection; ordering, deduplication and permission changes'),
('Asynchronous jobs','Queues, idempotency, transaction-outbox; workers and dead-letter jobs'),
('Errors and observability','Structured errors and logs; correlation IDs; user-facing error codes'),
('Reusable patterns','Adapters, repositories, dependency injection, service layering; avoid needless abstraction'),
('AI generated anti-patterns','Duplicated logic, god components, fake validation, frontend-only permission, overdependency'),
('End-to-end implementation workshop','Specification to DB to API to UI, tests, docs and review'),
]),
('PDF05','Software Architecture, Data Integrity & Reliability','PROFESSIONAL',[
('Architectural styles','Layered, hexagonal, modular monolith, distributed services; tradeoffs'),
('Domain modelling','Aggregates, entities and value objects; invariants and domain events'),
('Database performance','Indexes and query plans; N+1; appropriate denormalization; constraints'),
('Transactions and isolation','ACID; dirty/phantom reads; lost updates; serialization; deadlocks'),
('Concurrency','Locks, optimistic concurrency, atomic state transition, idempotency and outbox'),
('Schema evolution','Expand-contract; safe data migration; backfill; rollback and compatibility'),
('Caching','TTL, stale state and invalidation; tenant leak; cache stampede'),
('Event-driven systems','Delivery and ordering semantics; retry and dedup; transactional outbox'),
('Horizontal scaling','Statelessness; pools; message workers; load balancing; hot spots'),
('Performance engineering','Profiling, load/stress/soak; queues and p95/p99; DB execution plans'),
('Resilience','Timeout, retry, circuit breaker, degradation, rate limiting and backpressure'),
('Recovery','Backups, PITR, RPO/RTO, integrity, encrypted storage and restore drills'),
('Reviewing existing architecture','Risk and single points of failure; sustainable refactoring roadmap'),
]),
('PDF06','Security, Testing & Production Quality','PROFESSIONAL',[
('Secure development lifecycle','Threat modelling; SSDF; review and security acceptance'),
('Authentication security','Password hashing, passkeys, MFA, lockout, recovery and session revocation'),
('Authorization','RBAC/ABAC, ownership, BOLA/IDOR, tenant isolation and service credentials'),
('Web application security','XSS, CSRF, injection, SSRF, clickjacking, open redirect, dangerous file upload'),
('API security','Broken object/function auth, mass assignment, excessive data exposure and rate limits'),
('Cryptography and secrets','Key management, signing, rotation, secret log redaction, proper primitives'),
('Supply chain','Third-party dependencies, lockfile and SBOM; provenance, version security'),
('Test strategy','Unit, integration, contracts, E2E and regression; cost-benefit and scope'),
('Advanced tests','Property based, fuzz, mutation, negative, race and failure injection'),
('AI code testing risks','Hallucinated passing tests, shallow mocks, tests mutated to pass, false coverage'),
('Quality gates','CI/CD lint, type, build, scan, tests, review, deployment approvals'),
('Production hardening','TLS, CORS, CSP/security headers, config, least privilege and logs'),
('Accessibility quality','WCAG/keyboard, screen readers and manual validation'),
('Release evidence','Blockers, known risks, signoff, test results and incident readiness'),
]),
('PDF07','Digital Business, Payments & Subscription Engineering','BUSINESS',[
('Digital business types','SaaS, ecommerce, marketplaces, educational products and AI service pricing'),
('Plans and entitlements','Free/premium, metered use, trials, quotas and seat licensing'),
('Checkout engineering','Order summary and totals; addresses, currencies, taxes; validation'),
('Payment state machines','Authorized, captured, pending, failed, disputed; 3DS and redirect'),
('Webhook safety','Signatures, retries, duplicate/out of order events and reconciliation'),
('Subscription lifecycle','Renewal, failure, grace, trial, upgrade/downgrade, cancellation and expiration'),
('Entitlements','Server-side feature and usage checks; eventual consistency and caching'),
('Invoices and taxes','Provider MoR vs direct billing; jurisdiction and financial records'),
('Refunds and disputes','Partial refund, chargeback, reversals, statutory rights, retention of records'),
('Customer operations','Receipts, dunning, cancellation support, complaints and support'),
('Analytics and economics','MRR, ARR, churn, conversion, unit economics, API and infrastructure costs'),
('Fraud and abuse','Trial abuse, stolen payment methods, automation and fairness'),
('Billing recovery','Provider outage, stale state, reconciliation, provider switch, audit'),
]),
('PDF08','Legal, Privacy, Accessibility & Compliance Engineering','BUSINESS',[
('Jurisdiction and classification','Operator country, target countries, B2B/B2C, regulated sectors, minors'),
('Operator identification','Imprint, legal name, business registration, contact and trading disclosures'),
('Data protection fundamentals','Personal data, controllers/processors, legal bases, purpose and minimization'),
('Privacy notice anatomy','Categories, purposes, recipients, transfers, retention, rights and changes'),
('Cookies and tracking','Classify purposes, necessary/nonessential, consent/withdrawal, records and analytics'),
('Terms of use','Service scope, acceptable use, user content, suspension, limitations'),
('Consumer digital rights','Precontract info, digital conformity, withdrawal rights/conditions, refunds and complaints'),
('Subscription transparency','Renewals, clear prices, cancellation, confirmation, dark patterns'),
('Data subject requests','Access, portability, deletion, restrictions, objection, exceptions and evidence'),
('Vendors and transfers','Hosting, analytics, AI vendors, processors, agreements and cross-border transfer'),
('Security incidents and breach reporting','Assessment and response, notification applicability, records'),
('Accessibility law','WCAG vs legal obligation; EU accessibility rules, national exceptions, audit'),
('Intellectual property','Open source licenses, assets, fonts, images, trademarks, AI-generated rights'),
('Online content/platforms','User-generated content moderation, takedowns and platform law applicability'),
('AI-specific regulation','AI Act applicability, transparency, high-risk roles and provider/operator responsibilities'),
('Sector / national variations','Health, finance, education, minors and regulated professional services'),
('UI implementation of legal obligations','Footer, sign-up notice, checkout info, consent dialogs, deletion/export flows'),
('Compliance readiness assessment','Obligations vs not applicable, legal reviewer, tests and evidences'),
]),
('PDF09','The Edge Case Encyclopedia — 100 Engineering Failure Scenarios','EXPERT',[
('AI agent failures','Context loss, fabricated APIs, accidental unrelated edits, corrupt tests, loops, false claims'),
('Authentication and permissions','Cross-user/tenant leak, revoked sessions, broken access, invitation mismanagement'),
('Database integrity','Race, deadlocks, migrations, duplicate data, time zones, Unicode and rounding'),
('Payments','Repeated webhooks, pending access, refunds, inconsistent billing and fraud'),
('Frontend/UX','Hydration mismatch, async race, unsaved forms, stale data, accessibility'),
('Backend and integrations','Retry storms, partial failure, rate limits, payload contracts, inconsistent pagination'),
('Security and supply chain','Secret leak, compromised package, unsafe uploads, XSS and prompt injection'),
('Infrastructure and deployment','Config drift, rollback, DNS/TLS outages, worker failures, storage and quota'),
('Performance','Memory leaks, slow queries, stampede, p95/p99 latency, unexpected AI spend'),
('Operations and business','Deletion incomplete, active billing after closure, consent inconsistency, support failure'),
('Case-by-case evidence model','Symptom; reproduction; causal explanation; fix; tests; preventive control; skill cross-links'),
]),
('PDF10','Advanced Debugging, Incident Response & Recovery','EXPERT',[
('Systematic debugging','Observe versus hypothesize; control variables and evidence'),
('Bug taxonomy','State, logic, data, concurrency, environment, integration and infrastructure'),
('Reproducibility','Minimal reproduction; synthetic fixtures; intermittent failure triggers'),
('Logs, metrics, traces','Structured telemetry, correlation IDs, privacy-aware evidence'),
('Investigation methods','Hypothesis matrix, Git bisect, profiling, diff and impact'),
('Root cause analysis','Five whys, causal graphs, systemic contributory factors'),
('Distributed failure investigation','Duplicates, out of order events, eventual consistency and partial success'),
('Incident command','Severity, containment, communication, coordination and recovery'),
('Safe recovery','Rollback, feature flags, hotfix, backup restore, replay'),
('Regression prevention','Narrow fixes, reproductive tests, contract impact and review'),
('Postmortems','Timeline, blast radius, evidence, learning and corrective actions'),
('AI-assisted incident response','Read-only audit, approvals, agent limitations and independent validation'),
]),
('PDF11','Autonomous Agents, Orchestration & Advanced AI Architecture','ARCHITECT',[
('Agent architecture','Model, tools, context, memory, instructions and autonomy boundaries'),
('Skill modularity','Manifests, progressive disclosure, deterministic scripts and test harness'),
('Task decomposition','Dependency graphs, vertical slices, parallel tasks, acceptance'),
('Multi-agent roles','Architect, coder, tester, security auditor, reviewer and orchestrator'),
('Shared context','Documents of truth, compaction, reentrancy, handoffs, decision log'),
('Tool permissions','Sandbox, minimum privilege, destructive-operation approvals and credential isolation'),
('MCP integration','Auth, external inputs, prompt injection, tool trust and failure handling'),
('Automated development pipeline','Specification, implementation, quality gates and evidence'),
('Agent failures','Loops, false positives, tool misuse, instruction collision, context drift'),
('Independent verification','Reviews, external tests, source evidence and human approval'),
('Cost and latency','Model choice, limits, budgets, measuring value and cache'),
('Portable agent suite','Codex, Claude and generic adapters, versioning, installation and support'),
]),
('PDF12','AI Engineering Governance, Evaluation & Continuous Improvement','ARCHITECT',[
('Engineering governance','Roles, approvals, policy, exceptions and human accountability'),
('Traceability','Requirements to code to tests to evidence, revisions'),
('Evaluation','Benchmarks, reproducibility, negative scenarios, control groups'),
('Skill QA','Correctness, false positives/negatives, run failures, regression compatibility'),
('Agent benchmarking','Success, edits, incidents, time, token cost, quality'),
('Agent security governance','Tools, secrets, least privilege, logs, audit and review'),
('Supply chain governance','SBOM, provenance, version tracking, packages and licenses'),
('Documentation governance','Source quality, review dates, corrections, changelogs'),
('Risk-based release','Approvals, gradual rollout, flags, monitoring, exceptions'),
('Engineering quality metrics','Incident rate, time to recover, change failure, performance, a11y'),
('Maintenance','Technical debt, dependency upgrades, documentation decay, support end'),
('Capstone assessment','Complete inherited app, uncover risks, fix, test, prepare launch and defend decisions'),
]),
]

PPTS=[
('PPT01','From Idea to Engineering Specification','FOUNDATION',['Idea-to-product lifecycle and gates','Engineering roles and responsibilities','Problem assumptions and discovery map','Personas/stakeholders/actors','User journey diagrams','Functional feature and dependency graph','Functional vs nonfunctional requirement matrix','Architecture decision tree','Implementation phases/checkpoints','PRD / traceability visual walkthrough']),
('PPT02','Complete Application Anatomy','BUILDER',['Full digital product map: public/private/admin/backend/data','Public website routes and SEO/legal content','Complete account lifecycle','Authentication, authorization and organizations','Navigation, components and responsive states','CRUD, data history, concurrency and restore','Messaging, async jobs and notifications','Checkout/subscription/entitlement state machines','Admin, support and audit operations','Privacy and legal notice placement','Production infrastructure, files and backups','Wall-size clickable product completeness systems map']),
('PPT03','Secure Production Architecture','PROFESSIONAL',['Architecture styles and trust boundaries','Complete HTTP request and API flow','Account/session lifecycle','API attack surfaces and controls','Relational data/invariants/indexes','Isolation/deadlock/race diagrams','Caching and tenant invalidation','Queues, idempotency and outbox','Testing layers and CI gates','Secrets, network and TLS','Telemetry, performance and capacity','Backups, rollback and restore diagrams']),
('PPT04','Digital Business & Compliance','BUSINESS',['Business models and pricing systems','Checkout and payment lifecycles','Subscription finite-state machine','Webhook signing, retries and reconciliation','Business identification/legal disclosures','Personal data classification and flow diagrams','Consent, preferences and opt-out','Rights requests and retention','Consumer precontract and digital rights','Third party processors/data transfers','Accessibility/legal conditionality','Business launch checklist with evidence']),
('PPT05','Failure Engineering & Recovery','EXPERT',['Fault taxonomy','Symptom vs root cause diagrams','Decision-tree troubleshooting','Reproduction and experimental method','Races and locking timelines','Distributed partial failures and event ordering','Regression impact network','Incident command and severity','Rollback and restoration workflows','Postmortem causal graphs and corrective loops']),
('PPT06','Agent Architecture & Governance','ARCHITECT',['Anatomy of an agent','Skill manifest/modules/scripts/assets','Context and documentation map','Task dependency planner','Multiagent pipeline and ownership','Trust boundaries/permissions and prompt injection','Implementation and independent-review gates','Benchmark harness/evaluation method','Governance and traceability','Full agent engineering organization model'])
]

SKILLS=[
('SK01','Project Intelligence Mapper','FOUNDATION','Understand an existing repository before changing it',
 'Detect stack and supported versions; inventory routes, entry points, schema and services; dependency graph; architecture map; unknowns/risks; persist agent-readable context',
 'Repository tree, package files, migrations, documentation; read-only initially',
 'architecture-map.md; dependency-inventory.json; project-context.md; technical-risks.md',
 'Golden fixture repos; correct IDs; evidence citations; no source edits by default'),
('SK02','Complete Product Architect','FOUNDATION','Turn vague ideas into complete, verifiable product specifications',
 'Interpret goals and users; discover business/technical constraints; functional and nonfunctional requirements; page/route inventory; permission model; edge flows; legal questions; architecture choices; implementation stages; verification matrix',
 'Idea, country/business fields, stakeholder constraints and existing repo when provided',
 'PRD.md; feature-register.xlsx/csv; sitemap.md; permissions.csv; architecture-decision-records.md; implementation-plan.md',
 'No invented critical decisions; explicit assumptions; conditional legal checks; compare output against complete reference briefs'),
('SK03','Product Completeness Auditor','BUILDER','Identify forgotten parts of existing applications',
 'Classify application; inspect routes and functional pages; enumerate onboarding, account lifecycle, admin, payments and offboarding; analyze error/loading states; catalog privacy/legal/support/ops gaps; score evidence and uncertainties',
 'Repository, documented product model and optionally authorized app preview',
 'product-completeness-report.md; missing-flows.csv; applicability-matrix.json; remediation-roadmap.md',
 'Route presence != functional flow; avoid claiming legal certification; measure false positives with deliberately incomplete apps'),
('SK04','UX & Accessibility Inspector','BUILDER','Find usability and accessibility defects',
 'Page/information hierarchy; component states; keyboard/focus; labels; contrast; forms; responsivity; async errors; screen reader and manual review recommendations; dark patterns',
 'Accessible app/browser code and permitted preview',
 'ux-audit.md; a11y-findings.csv; reproduction-steps.md',
 'Automated scans do not certify compliance; clear manual-test-required flags'),
('SK05','Security & Authorization Auditor','PROFESSIONAL','Analyze security of authorized applications',
 'Model attack surface; auth/session lifecycle; object access; multi-tenancy; validation; API; secrets; supply chain; logging; uploads; test cases; severity and evidence',
 'Authorized repository and stated threat model',
 'security-findings.json; threat-model.md; remediation-plan.md; regression-tests/',
 'No intrusive testing of third parties; avoid invented vulnerabilities; reports require source evidence'),
('SK06','Database Integrity Guardian','PROFESSIONAL','Protect data correctness and migrations',
 'Schema inference; indexes and constraints; orphan/duplicate risk; transaction/isolation and concurrent updates; migration backfills; retention; restore plan',
 'Read-only schema and test fixture data; DBA approval for production',
 'database-integrity-report.md; invariants.json; migration-plan.md; test-fixtures/',
 'Read-only default; no production data mutation without explicit authorization and recovery plan'),
('SK07','Regression & Testing Guardian','PROFESSIONAL','Protect existing behavior across code changes',
 'Diff impact map; contract identification; select and build unit/integration/e2e/negative/property tests; verify behavior and restored invariants; prevent changed-to-pass tests',
 'Current diff, tests, repo context and requested requirements',
 'change-impact.md; test-results.json; regression-findings.md',
 'Baseline must be observed; distinguish not-run, failed and passing; execute actual tests'),
('SK08','Payments & Subscription Engineer','BUSINESS','Implement and validate robust payment lifecycles',
 'Offer/entitlement model; checkout mapping; provider confirmation; webhook signatures; retry/idempotency; subscription state; refunds, chargebacks, invoice reconciliation; error handling',
 'Payment sandbox provider credentials and application repo',
 'payment-state-machine.md; webhook-matrix.csv; reconciliation-plan.md; payment-tests/',
 'Sandbox only by default; mock/payment evidence; no real payments without authorization'),
('SK09','Legal & Compliance Readiness','BUSINESS','Identify applicable obligations for digital products',
 'Determine legal operator, geography, B2B/B2C, tracking, data mapping and suppliers; list required disclosures and consumer flow; copyright/accessibility/AI rules when applicable; identify legal review needs',
 'Jurisdiction, product model, data flows, supplier list',
 'legal-applicability-matrix.csv; disclosure-inventory.md; privacy-gaps.md; lawyer-review-questions.md',
 'Educational readiness assessment not legal advice; no blanket compliance certification'),
('SK10','Root Cause Investigator','EXPERT','Reproduce and trace difficult defects',
 'Collect symptom/logs; classify issue; recent changes; hypothesis matrix; controlled reproduction; isolate cause; minimal patch proposal; regression tests; postmortem',
 'Authorized repo, sanitized logs, reproducible symptom, environment constraints',
 'root-cause-analysis.md; minimal-reproduction/; verification-results.json',
 'Do not change production before permission; do not conclude without evidence'),
('SK11','Production Readiness Commander','EXPERT','Make evidence-based go/no-go release decisions',
 'Build/CI/test state, secrets/config, DB migration plan, object access, payment provider, DNS/TLS, email, legal, backup/restore, logs, capacity, fallback/rollback, support readiness',
 'Repository, deployment manifests, available staging checks and release data',
 'go-no-go-report.md; blockers.csv; deploy-checklist.md; rollback.md',
 'Must block when evidence missing; no claim of production readiness from code inspection alone'),
('SK12','Multi-Agent Engineering Orchestrator','ARCHITECT','Coordinate safe multiagent changes',
 'Task dependency mapping, agent specialization, context budget, ownership boundaries, tool permissions, parallel execution, integration, independent review and tests, cost/time logging',
 'Goal, repository, agent capabilities and authorization limits',
 'task-graph.md; ownership-matrix.csv; integrated-diff-summary.md; verification-report.md',
 'No conflicting simultaneous file writes; separate agent claims from executed validation')
]

TEMPLATES=[
('T01','Product Requirements Document','Objectives; audiences; scope; functional/nonfunctional requirements; risks; metrics; assumptions; acceptance'),
('T02','Universal Product Scope Register','40 domains; nested requirements; applicability; priority; owner; proof; implementation state; reference IDs'),
('T03','Stakeholder & Role Matrix','Actors; authority; responsibilities; roles; permissions; transfer/escalation and prohibited actions'),
('T04','Requirements Traceability Matrix','Requirement ID; source; implementation; test ID; evidence; status; change history'),
('T05','User Journey & Use Case Map','Actors; triggers; preconditions; happy path; alternate path; failure; postconditions'),
('T06','Architecture Decision Record','Context; options; selection; trade-offs; outcomes; approval; review date'),
('T07','Page & Route Inventory','Route; purpose; auth; role; content; page states; analytics; SEO; accessibility; legal'),
('T08','UI States & Interaction Matrix','Empty/loading/success/error/offline/expired/forbidden; copy; transition; retries; QA'),
('T09','Authorization & Permission Matrix','Actor; role; tenant; resource; operation; constraints; allow/deny tests'),
('T10','Localization Specification','Locales; timezone/DST; currency; number/date; plural; RTL; text growth; fallback'),
('T11','Notification & Email Inventory','Trigger; recipient; channel; template; consent; retries; dedupe; delivery status'),
('T12','Accessibility Audit Workbook','Criterion; page/component; automated/manual checks; status; evidence; risk; remediation'),
('T13','Database Schema & Data Dictionary','Entities; keys; types; relationships; indexes; constraints; sensitivity; retention'),
('T14','API Contract Specification','Endpoints; methods; auth; schemas; errors; pagination; limits; version; samples'),
('T15','Concurrency & Transaction Matrix','Operation; invariant; isolation; locks; idempotency; retries; race tests'),
('T16','Third-Party Integration Register','Vendor; purpose; data sent; secret; rate limits; SLA; fallback; costs; owner'),
('T17','Background Jobs & Events Register','Event; producer; consumer; payload; queue; retry; timeout; idempotency; dead letter'),
('T18','Data Lifecycle & Retention Matrix','Collection; purpose; legal basis; storage; access; export; retention; deletion; backups'),
('T19','Threat Model & Risk Register','Assets; threats; trust boundaries; risk; mitigation; evidence; residual risk'),
('T20','Master Test Plan','Coverage levels; environment; test classes; acceptance criteria; blockers; responsibilities'),
('T21','Test Cases & Fixtures Catalog','Test ID; positive/negative/edge; fixture; steps; expected; observed; result'),
('T22','Regression Impact Matrix','Change; affected modules; contracts; tests; risk; evidence; reviewer'),
('T23','CI/CD Quality Gates','Commands; thresholds; scan; approval; artifact; status; exception owner'),
('T24','Dependency & Supply Chain Register','Name; version; source; license; vulnerability; update policy; SBOM; maintainer'),
('T25','Business Model & Pricing Specification','Models; plans; quotas; trials; currency; taxes; discounts; entitlements'),
('T26','Checkout & Payment State Matrix','Status; provider event; business effect; retry; refund; webhook; reconciliation'),
('T27','Subscription Lifecycle Specification','Trial; active; failed; grace; renewal; upgrade; downgrade; cancel; expired'),
('T28','Financial Reconciliation Workbook','Order; invoice; provider record; amount; currency; refund; discrepancy; resolution'),
('T29','Legal Applicability Matrix','Jurisdiction; operator; obligation; condition; source; document; reviewer; status'),
('T30','Privacy & Cookie Compliance Workbook','Treatments; consent; cookies; vendor; purpose; legal basis; retention; rights'),
('T31','Vendor & Data Processor Register','Vendor; system; contract; category; geography; subprocessors; review; risk'),
('T32','Asset & Intellectual Property Register','Image/font/code/license/owner; attribution; rights; source; resale permissions'),
('T33','Production Operations Runbook','Service; owner; allowed commands; monitoring; alarms; recovery; escalation'),
('T34','Backup & Disaster Recovery Plan','System; backup method; frequency; retention; RPO/RTO; restore test; owner'),
('T35','Incident Report & Postmortem','Severity; timeline; impact; evidence; cause; recovery; preventive action'),
('T36','Launch Go/No-Go Checklist','Blockers; release gate; proof; signoff; rollback; initial production smoke test')]

LABS=[
('LAB01','The Incomplete Product Brief','FOUNDATION',['Interpret a deliberately vague brief','Discover missing requirements','Identify actors and authorizations','Map all routes and pages','Specify journeys and error paths','Identify performance/privacy/legal questions','Risk and constraint analysis','Author full PRD, acceptance tests and traceability','Produce safe agent task plan','Audit plan for omissions']),
('LAB02','Build a Complete SaaS','BUILDER',['Architecture and environment','Postgres schema and migrations','Register/login/recovery','Organizations and invitations','RBAC tenant isolation','Main dashboard and CRUD','Loading/error/empty UX states','Admin and configuration','Transactional notifications','Sandbox checkout and subscription flows','Applicable legal/info pages as reviewed examples','Testing/backup/deploy readiness']),
('LAB03','The Vulnerable Application','PROFESSIONAL',['Threat-model scope','Authentication failure analysis','Authorization/IDOR reproduction in isolated test','Tenant isolation','API inputs and access controls','Dangerous uploads','Secrets and logs','Supply chain risks','Patch design','Regression tests','Security evidence report']),
('LAB04','Launch a Digital Business','BUSINESS',['Plans and pricing rules','Entitlement guard','Sandbox provider integration','Raw signed webhooks','Double-delivery and out-of-order tests','Cancellation/refund state','Reconciliation','Personal data inventory','Legal applicability matrix and page placements','Rights requests and support flow','Operations/runbooks','Production go/no-go with blockers']),
('LAB05','The Broken Production System','EXPERT',['Gather symptoms and logs','Minimal failure reproduction','Identify concurrent write bug','Repair data invariant','External API fallback','Find performance bottleneck','Safe migration planning','Simulate failed deployment','Perform rollback','Backup restore drill','Regression test','Postmortem']),
('LAB06','Autonomous Engineering Challenge','ARCHITECT',['Map existing codebase','Interpret change request','Create dependency graph','Assign agent ownership','Control context and tools','Execute isolated parallel changes','Integrate diffs','Resolve conflicts','Run security/completeness skills','Independent test and review','Benchmark time/quality/cost','Write engineering report'])]

BLUEPRINTS=[
('BP01','SaaS Product Blueprint',['Single vs multi-tenant','Registration and onboarding','Organization/team creation','Invitations and roles','Entitlements/quotas','Recurring and one-off billing','Trial and cancellation','Support/admin','Usage and infrastructure cost','Cross-tenant security','Data export/erasure','Public API and webhook interoperability','Scale/observability','Specific failure cases']),
('BP02','E-commerce Blueprint',['Catalog and hierarchy','Attributes and variants','Price and tax','Inventory and reservations','Cart/session','Checkout','Shipping and fulfillment','Order lifecycle','Refund/returns','Invoices and documents','Customer area','Discount and promotional logic','Back office','Carriers and payment integrations','Consumer compliance','Race and stock consistency']),
('BP03','Marketplace Blueprint',['Seller registration/onboarding','Identity/verification when required','Profiles and listings','Search/recommendation','Moderation/reporting','Buying/contracting','Platform fees','Provider split payouts where eligible','Refunds and disputes','Reviews/reputation','Buyer and seller safety','Complaints and takedowns','Platform law obligations','Tax/documentation','Fraud controls','Vendor exit/offboarding']),
('BP04','AI-Powered Product Blueprint',['Model/vendor selection','Input/output contracts','Prompt versioning','Context/RAG','Data handling and retention','Token pricing/budget','Quotas/rate limits','Prompt injection and exfiltration','Tool authorization','Evaluation/ground truth','Hallucination handling','Tracing/cost observability','Human review','Data processor contracts','AI regulation applicability','Failure modes']),
('BP05','Community & Social Platform Blueprint',['Accounts/profiles','Posts/comments','Direct messages','Relationships/groups','Visibility and permissions','Notification controls','Search/discovery','Media uploads','Moderation roles','Reporting/appeals','Suspensions/blocks','User privacy','Removal/retention','Minors and safety when relevant','Spam/abuse','Scale and content consistency']),
('BP06','Mobile Application Blueprint',['Native/hybrid choice','OS lifecycle','Navigation/state','Device permissions','Secure local storage','Authentication','Offline data','Sync/conflicts','Push notifications','Background jobs','Deep links','App updates/migrations','Crash reporting','App store release','In-app purchases and policies','Privacy/a11y/store compliance'])]

EC_GROUPS=[
('Agent execution failures',[
'Context compacted and essential requirements forgotten','Fabricated SDK API accepted without verification','Unrelated files altered during a localized fix','Agent changes test expectation to pass','Repeated attempts cause a repair loop','Agent installs hallucinated package name','Parallel agents overwrite shared file','Stale instructions conflict with current architecture','Repository instructions contain malicious prompt injection','Agent claims tests passed without executing them']),
('Authentication and authorization',[
'Expired session survives password reset','Refresh token race creates multiple active sessions','User A can read User B object through IDOR','Tenant A cache exposes Tenant B data','Frontend hides forbidden action but API allows it','Revoked invitation remains usable','Email change bypasses identity re-verification','Password recovery leaks account existence','Suspended account retains active token','Shared cache returns another user private page']),
('Database and data integrity',[
'Lost update during concurrent edits','Deadlock during batch processing','Destructive migration removes customer data','Missing foreign keys produce orphan records','Transaction partially applies business event','Double form submission creates duplicate record','Timezone DST makes booking expire incorrectly','Unicode normalization breaks unique handles','Floating-point rounding corrupts invoice totals','Backup passes creation but fails restore']),
('Payments and commerce',[
'Duplicate webhook grants entitlement twice','Out-of-order payment events revoke a paid order','Provider charge succeeds but local account remains pending','Refund processed but paid access remains active','Renewal failure ignored and access remains wrong','Free trial abuse bypasses eligibility constraints','Promotion code redeemable beyond intended limit','Checkout redirect returns before provider confirmation','Invoiced tax data diverges from transaction','Payment provider balance diverges from local ledger']),
('Frontend and user experience',[
'Nuxt hydration mismatch breaks controls','Old response overwrites newer search results','Button double-click submits twice','Wizard loses input on browser reload','Modal traps keyboard focus incorrectly','Backend mutation succeeds but stale UI shows failure','Offline state exposes silently unsaved changes','Cache shows data from previous logged-in user','Small mobile viewport makes footer inaccessible','Expired session loops user between routes']),
('Backend APIs and integrations',[
'Rate limiter misconfigured behind proxy','Remote API outage blocks core app','Timeout leaves unknown transaction status','Partial success on multi-service workflow','Retry creates destructive duplicate operation','SSRF via user-provided remote URL','Unexpected optional field crashes parser','Cursor pagination duplicates or omits records','Third-party API version breaks contract','Error swallowed by asynchronous worker']),
('Security and supply chain',[
'Production credentials committed into Git','Sensitive PII printed in application logs','Malicious transitive dependency executes script','Overprivileged admin API usable by editor','Malware smuggled via disguised file extension','Stored XSS through content/markdown rendering','Permissive CORS exposes authenticated endpoint','Token accidentally included in public build','Typosquatting library copied from agent suggestion','Agent tool obtains excessive file system access']),
('Infrastructure and deployment',[
'Wrong environment variables after promotion','Database migration breaks backward compatibility','Half-complete blue-green rollout','Rollback restores code but not compatible schema','Expired TLS cert blocks webhook callback','Misconfigured DNS prevents login email links','Object storage region mismatch denies downloads','Worker process fails silently after deploy','Node process OOM causes intermittent 502','Staging config copied into production checkout']),
('Performance and scale',[
'Cache stampede after product drop','N+1 queries on customer library','Database connection pool exhausted','Memory leak triggered by repeated previews','Retry storm floods background queue','Traffic burst overrun causes high p99 latency','Heavy PDF previews block mobile main thread','Unindexed filter query scales superlinearly','Long transaction lock causes request pile-up','LLM token usage produces unexpected provider bill']),
('Operations and business',[
'Account deletion leaves redundant data in provider','Complaint cannot be tracked to an owner','Closed account still charged for subscription','Consent preferences differ between tracker and DB','Transactional email bounces without fallback','Refunded order still appears purchasable/downloadable','Admin action not included in audit trail','Vendor sunset causes unavailable webhook endpoint','Customer loses access after email change','Data incident has no escalation or communication plan'])]

SCOPES=[
('SC-01','Product Strategy','Audience, scope, outcomes, nonfunctional needs, stakeholder assumptions'),
('SC-02','Public Website','Home, company/about, contact, features, pricing, FAQs, docs'),
('SC-03','Legal Pages','Operator identity, privacy, cookies, terms, sales/withdrawal conditions as applicable'),
('SC-04','SEO & Discoverability','Metadata, sitemap, robots, canonical, structured data and redirects'),
('SC-05','User Onboarding','Registration, invites, verification, initial setup and interrupted onboarding'),
('SC-06','Authentication','Login, logout, MFA, sessions, recovery, token revocation'),
('SC-07','Authorization','Roles, ownership, per-object permission, tenant isolation'),
('SC-08','Account Lifecycle','Profile, suspension, export, account closure, deletion and consent'),
('SC-09','Organizations & Teams','Members, invitations, roles, ownership transfers and team lifecycle'),
('SC-10','Navigation & UX','Menus, responsive layout, page hierarchy and components'),
('SC-11','Interface States','Loading, empty, error, timeout, offline, expired, success and forbidden'),
('SC-12','Accessibility','Semantics, keyboard, focus, contrast, motion, AT and usability'),
('SC-13','Internationalization','Dates, timezones, locale, money, Unicode and RTL'),
('SC-14','Application Features','Core CRUD, history, authorization and workflow edge cases'),
('SC-15','Search & Reporting','Filters, sort, pagination, analytics, dashboards and export'),
('SC-16','Notifications','Email/push/in-app, preferences, delivery, retries and unsubscribe'),
('SC-17','Files & Media','Upload, download, scanning, storage, access, deletion'),
('SC-18','Backend & APIs','Contracts, error codes, versioning, limits, validation'),
('SC-19','Databases','Integrity, schema, migrations, transactions, indexes, concurrency'),
('SC-20','Background Jobs','Events, queues, retry, idempotency, jobs, reconciliation'),
('SC-21','Third-Party Services','Contracts, limits, availability, fallback, privacy and cost'),
('SC-22','Payments & Billing','Checkout, renewals, receipts, failed charges, refunds, disputes'),
('SC-23','Administration','Operator workflows, approvals, support and audit logs'),
('SC-24','Customer Support','Documentation, FAQ, help, tickets, complaint channels'),
('SC-25','Privacy & Data Protection','Data mapping, transparency, rights, retention, suppliers'),
('SC-26','Business Compliance','Contracts, consumer law, invoice rules, licensing, sector obligations'),
('SC-27','Security','Threats, auth/access, secrets, storage, supply chain'),
('SC-28','Quality Assurance','Unit, integration, e2e, negative and evidence-based testing'),
('SC-29','Analytics & Measurement','Events, privacy, reporting and data quality'),
('SC-30','Performance','Latency, caching, DB efficiency, capacity and costs'),
('SC-31','Infrastructure','DNS, TLS, environment, hosting, storage and network'),
('SC-32','CI/CD & Deployment','Build, migrations, deploy, rollback, release approvals'),
('SC-33','Observability','Logs, metrics, tracing, alerts, health checks'),
('SC-34','Backup & Disaster Recovery','Backups, restore, RPO, RTO and continuity'),
('SC-35','Maintenance','Upgrades, vulnerabilities, technical debt, documentation'),
('SC-36','AI-Specific Risks','Prompt injection, tool abuse, context, model evaluation, costs'),
('SC-37','Content & Moderation','User-generated content, reporting, sanctions, takedowns'),
('SC-38','Marketing & Growth','SEO, lead capture, ethical lifecycle email, attribution'),
('SC-39','Operational Costs','Infrastructure, services, maintenance, margin and budgeting'),
('SC-40','Product End-of-Life','Shutdown, portability, deletion, communications and migration')]

# Cross-relations among catalog products. For seed and for website related items.
RELATIONS={
 'PDF01':['PPT01','SK02','T01','T02','LAB01'],'PDF02':['PPT01','SK01','SK12','T06','LAB01'],
 'PDF03':['PPT02','SK03','T02','T07','BP01','LAB02'],'PDF04':['PPT02','SK01','T14','LAB02'],
 'PDF05':['PPT03','SK06','T15','T34','LAB03'],'PDF06':['PPT03','SK05','SK07','LAB03'],
 'PDF07':['PPT04','SK08','T26','T27','LAB04'],'PDF08':['PPT04','SK09','T29','T30','LAB04'],
 'PDF09':['PPT05','SK10','SK11','LAB05'],'PDF10':['PPT05','SK10','T35','LAB05'],
 'PDF11':['PPT06','SK12','LAB06'],'PDF12':['PPT06','SK12','T36','LAB06'],
}

ALL=[]
for sku,title,tier,chapters in PDFS: ALL.append(dict(sku=sku,title=title,type='PDF_GUIDE',tier=tier,chapters=[dict(number=i+1,title=ct,topics=tx.split('; ')) for i,(ct,tx) in enumerate(chapters)],related=RELATIONS.get(sku,[])))
for sku,title,tier,slides in PPTS: ALL.append(dict(sku=sku,title=title,type='VISUAL_ATLAS',tier=tier,sections=slides))
for sku,title,tier,goal,steps,inputs,outputs,evals in SKILLS: ALL.append(dict(sku=sku,title=title,type='AGENT_SKILL',tier=tier,objective=goal,steps=steps.split('; '),inputs=inputs,outputs=outputs,verification=evals))
for sku,title,contents in TEMPLATES: ALL.append(dict(sku=sku,title=title,type='TEMPLATE',tier='CROSS_LEVEL',fields=contents.split('; ')))
for sku,title,tier,steps in LABS: ALL.append(dict(sku=sku,title=title,type='LAB',tier=tier,steps=steps))
for sku,title,steps in BLUEPRINTS: ALL.append(dict(sku=sku,title=title,type='PRODUCT_BLUEPRINT',tier='SPECIALIZATION',chapters=steps))
ALL.insert(0,dict(sku='FREE01',title='The AI Software Reality Check',type='FREE_RESOURCE',tier='FREE',formats=['PDF','XLSX','SKILL','SAMPLE_REPORT'],contents=['20–30-page annotated guide','50-point checklist in six categories','Product Auditor Lite skill','Sample annotated audit','Three realistic failure scenarios'],status='PLANNED'))
for sku,title,type_ in [('BUNDLE-BUILDER','Builder Edition','BUNDLE'),('BUNDLE-PRO','Professional Edition','BUNDLE'),('BUNDLE-ULTIMATE','Ultimate Engineering Library','BUNDLE'),('BUNDLE-MASTERY','Complete Mastery Bundle','BUNDLE')]: ALL.append(dict(sku=sku,title=title,type=type_,tier='BUNDLE'))
# 100 EC items as case catalog sections in PDF09. They are not automatically sellable products.
CAS=[]
for group_idx,(group,names) in enumerate(EC_GROUPS):
 for i,name in enumerate(names):
  num=group_idx*10+i+1
  CAS.append(dict(id=f'EC-{num:03d}',category=group,title=name,contentFormat='symptom/trigger/impact/root-cause/reproduction/fix/test/prevention/cross-references',status='PLANNED'))

for p in ALL:
 p.setdefault('status','PLANNED')
 p['purchasable']=False
 p['published']=False
 p['coverAsset']=f'/covers/{p["sku"]}.svg'
 p['license']='TO_DEFINE'
 p['version']=None
 p['releaseDate']=None
 p['priceCents']=None

(BASE/'catalog-seed.json').write_text(json.dumps({'products':ALL,'edgeCases':CAS,'scopeDomains':[dict(id=a,name=b,coverage=c) for a,b,c in SCOPES]},indent=2,ensure_ascii=False)+'\n',encoding='utf-8')

f=[]
add=f.append
add('# EDITORIAL & TOOLING CATALOG — COMPLETE CONTENT INDEX')
add('')
add('> **This appendix is authoritative source content for product metadata and category detail pages.** All entries are PLANNED, not actual sellable documents. Chapter headings describe material to author and validate later, not present file contents. The website should use these exact IDs and cross-relations, while writing useful honest teaser copy. 100 failure cases are sections/learning objects, not necessarily separate purchase SKUs.')
add('')
add('## A. TWELVE MAJOR PDF HANDBOOKS — DETAILED TABLES OF CONTENTS')
for sku,title,tier,chapters in PDFS:
 add(f'\n### {sku} — {title}  \n**Curriculum level:** {tier}.  **Format:** planned PDF + independently authored code examples, exercises, diagrams and references.  **Related:** {", ".join(RELATIONS.get(sku,[]))}.')
 for i,(ch,subs) in enumerate(chapters,1):
  add(f'\n**{i:02d}. {ch}**')
  for sub in subs.split('; '): add(f'- {sub}.')
 add('\n**Editorial requirement:** every chapter must include learner objectives, context, counterexamples, implementation choices, realistic edge cases, reference links, active exercises, evidence and mini-assessment. Product pages use this index as proposed curriculum and do not present uncreated pages as available.')
add('\n## B. SIX VISUAL POWERPOINT ATLASES — EXACT INDEX')
for sku,title,tier,slides in PPTS:
 add(f'\n### {sku} — {title}  \n**Tier:** {tier}. **Deliverables:** editable PPTX + accessible exported PDF; diagrams/captions/slide notes/source refs. No text-only slides mimicking the book.')
 for i,s in enumerate(slides,1):add(f'{i}. {s}.')
 add('**Design requirement:** each thematic section has concept diagram(s), one worked annotated example, common wrong approach, decision diagram and cross-links to PDF and relevant skill. Build as original vector objects when possible.')
add('\n## C. TWELVE INSTALLABLE AGENT SKILLS — CONTRACT AND FILE INDEX')
for sku,title,tier,goal,steps,inputs,outputs,evals in SKILLS:
 slug=re.sub(r'[^a-z0-9]+','-',title.lower()).strip('-')
 add(f'\n### {sku} — {title}  \n**Tier:** {tier}. **Goal:** {goal}.')
 add(f'**Suggested installation folder:** `{slug}/SKILL.md`; source package with `references/`, `scripts/` only when deterministic tooling is beneficial, `assets/` and `tests/`.')
 add('**Workflow index:**')
 for i,s in enumerate(steps.split('; '),1):add(f'{i}. {s}.')
 add(f'**Required inputs:** {inputs}.  \n**Outputs:** {outputs}.  \n**Mandatory evaluations / safety:** {evals}.')
 add('**Product acceptance:** real runnable smoke evaluation on at least two fixtures (healthy and intentionally flawed), tested Codex/Claude adapters separately; exact current compatible versions/permissions stated, no AI claims without evidence.')
add('\n## D. THIRTY-SIX TEMPLATES — SPECIFICATION OF EACH EDITABLE FILE')
for i,(sku,title,contents) in enumerate(TEMPLATES):
 add(f'\n### {sku} — {title}  \n**Required fields/sections:** {contents}.  \n**Deliverable:** editable Markdown or XLSX/DOCX/JSON/CSV format according to content; instructional examples; sample filled entry; glossary; validation criteria; applicable scope IDs.')
add('\n## E. SIX LABS — FULL EXERCISE SKELETON')
for sku,title,tier,steps in LABS:
 add(f'\n### {sku} — {title}  \n**Tier:** {tier}. **Package:** runnable fixture, instructions PDF/MD, challenge workbook, reference solution, automated test criteria, clean local setup, teardown, grading rubric.')
 for i,s in enumerate(steps,1):add(f'{i}. {s}.')
 add('**Safety:** all credentials fake/test only; self-contained local authorized environment and synthetic data. Never require attacking unknown third-party systems.')
add('\n## F. SIX PRODUCT-SPECIFIC BLUEPRINTS — COMPLETE STRUCTURES')
for sku,title,steps in BLUEPRINTS:
 add(f'\n### {sku} — {title}  \n**Package:** architecture-specific guide, product scope matrix, sitemap, data model, roles, integration checklist, legal applicability questions, security/test cases, worked examples.')
 for i,s in enumerate(steps,1): add(f'{i}. {s}.')
 add('**Mandatory edge cases:** full state/permission/data/legal assessment; no assumption that every listed page is required for every product.')
add('\n## G. THE EDGE-CASE ENCYCLOPEDIA — ALL 100 CASE TITLES')
for group_idx,(group,names) in enumerate(EC_GROUPS):
 add(f'\n### Category {group_idx+1:02d} — {group}')
 for i,name in enumerate(names):
  num=group_idx*10+i+1
  add(f'- **EC-{num:03d} — {name}**: to author with symptom, preconditions, observed impact, reproduction fixture, technical cause, proposed solution, automated regression test, preventive control, relevant skill/template links.')
add('\n## H. UNIVERSAL PRODUCT SCOPE REGISTER — ALL 40 DOMAINS')
add('A real implementation contains a normalized `scopeDomains` dataset with nested requirements by type of product, actor, jurisdiction and risk. The entries below are parent domains only; each will require numerous sub-requirements. **Never mark scope as compliant by merely rendering a page.**')
for sku,name,cov in SCOPES:
 add(f'- **{sku} — {name}:** {cov}.')
add('''
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
''')
add('\n## I. FREE LEAD MAGNET — CONTENT AND FULFILLMENT INDEX')
add('''
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
''')
add('\n## J. CROSS-REFERENCES AND BUNDLE MATRIX')
add('''
| Learning stage | Handbook | Atlas | Agent skills | Templates | Lab |
|---|---|---|---|---|---|
| Foundation | PDF01, PDF02 | PPT01 | SK01, SK02 | T01–T06 | LAB01 |
| Builder | PDF03, PDF04 | PPT02 | SK03, SK04 | T07–T12 | LAB02 |
| Professional | PDF05, PDF06 | PPT03 | SK05, SK06, SK07 | T13–T24 (technical/security) | LAB03 |
| Business | PDF07, PDF08 | PPT04 | SK08, SK09 | T25–T32 | LAB04 |
| Expert | PDF09, PDF10 | PPT05 | SK10, SK11 | T33–T35 + related | LAB05 |
| Architect | PDF11, PDF12 | PPT06 | SK12 + entire suite | T36 + all reusable matrices | LAB06 |

The assignment of templates into curricular levels is pedagogical, not an exclusive licensing definition; bundles must enumerate exact SKUs and included versions in the catalog. Do not sell an item as included until completed.
''')
(BRIEF/'03-content-index.md').write_text('\n'.join(f)+'\n',encoding='utf-8')
print('catalog',len(ALL),'cases',len(CAS),'appendix chars',len('\n'.join(f)))
