> **Migration status:** Legacy master PRD retained as input evidence; the new product suite is authoritative.

# PRD — UniERP Product Requirements Document

> **The blueprint for the entire Goal.** One file. Amended, never replaced.
> Established 2026-07-30 · Owner: the program · Read `README.md` § 0 before editing.

---

## 1. The Goal

Build **UniERP**: the most advanced enterprise resource planning platform available — composable,
multi-tenant, AI-native, cross-platform, and runnable end-to-end on 100% open-source software
that any organisation can self-host.

**This is a commercial product, not an exercise.** Every requirement below is written on the
assumption that a real company's finance, payroll, inventory, and patient or student records
will live in this system, and that it must still be maintainable in 2036.

### The one-sentence positioning

> _Odoo's breadth and SAP's rigour, delivered with the interface quality of a modern SaaS
> product, on infrastructure you own — with an AI layer that does the work instead of
> describing it._

---

## 2. Why this exists — the problem

| Incumbent              | What it gets right             | Where it fails the customer                                                            |
| :--------------------- | :----------------------------- | :------------------------------------------------------------------------------------- |
| SAP S/4HANA            | Depth, compliance, scale       | Six-figure entry cost, multi-year implementations, hostile UX, total vendor lock-in    |
| Oracle NetSuite        | Cloud-native, broad            | Per-user pricing punishes growth, customisation needs certified partners, no self-host |
| Microsoft Dynamics 365 | Office integration, ecosystem  | Fragmented module licensing, heavy partner dependency, deep Azure coupling             |
| Odoo                   | Open core, modular, affordable | Enterprise features are paywalled, performance degrades at scale, ageing framework     |
| ERPNext                | Genuinely open source, capable | Frappe framework limits UI quality, thin AI story, weak multi-tenancy                  |
| Workday                | Best-in-class HCM              | HCM/finance only, no manufacturing or inventory, closed and premium-priced             |

**The gap:** no product offers _enterprise depth_ + _modern engineering_ + _true open source_

- _native AI_ + _real multi-tenancy_ simultaneously. Mid-market and scale-up companies are
  forced to choose two or three. UniERP targets all five.

### The three customer promises

1. **You own your system.** Self-host on your own hardware, in your own jurisdiction, with
   your own database. No component requires a proprietary licence to run in production.
2. **It grows with you, not against you.** Modules compose. Adding headcount does not
   multiply cost. Extending the system does not require a certified partner.
3. **The software does the work.** AI is embedded in the workflow — reconciling, forecasting,
   drafting, flagging, routing — not bolted on as a chat window.

---

## 3. Who it is for

### Primary segment

Mid-market organisations, **50–5,000 employees**, that have outgrown QuickBooks/Xero plus
spreadsheets but for whom SAP or NetSuite is disproportionate in cost, time, or control.

### Vertical focus (the four shipped verticals)

Healthcare · Education · Real Estate · Field Service — each an independently deployable
microservice on the shared core.

### Personas

| Persona                       | Role                                | What success looks like for them                                                                              |
| :---------------------------- | :---------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| **Priya — CFO**               | Owns the numbers                    | Month-end close in 3 days instead of 15; trial balance always reconciles; audit trail survives scrutiny       |
| **Marcus — Ops Director**     | Runs the business day to day        | One screen showing orders, stock, and capacity; exceptions surface before they become fires                   |
| **Aisha — HR Lead**           | People and payroll                  | Payroll runs without manual correction; leave, attendance, and appraisals in one place                        |
| **Dev — IT Admin**            | Keeps it running                    | Self-hosts confidently; upgrades without fear; provisions users in minutes; passes the security questionnaire |
| **Sam — Frontline**           | Nurse, teacher, technician, cashier | Does the job in 3 taps on a phone, offline, without training                                                  |
| **Ravi — Partner/Integrator** | Extends it for clients              | Builds a vertical module without forking the core                                                             |

---

## 4. Product principles (decision rules, in priority order)

When two requirements conflict, the higher-numbered principle yields to the lower.

1. **Correctness over velocity.** A wrong number in a ledger is worse than a late feature.
   Financial integrity, tenant isolation, and audit trails are never traded for speed.
2. **Open over convenient.** If an open-source option covers 80% of a proprietary one's value,
   take the open one. Lock-in is a defect.
3. **Composable over monolithic.** Every module is independently valuable, independently
   testable, and communicates through events — never through direct imports.
4. **Boring where it counts, ambitious where it differentiates.** Postgres and NestJS are
   boring on purpose. The AI layer, the no-code builder, and the UX are where we take risk.
5. **Multi-tenant from the first line.** Tenancy is a database-enforced invariant, not an
   application filter that a future bug can bypass.
6. **The interface is the product.** Most ERPs lose on UX. Every screen is held to consumer
   SaaS standards.
7. **Automate the gate, not the exception.** If a rule matters, a machine enforces it. Human
   discipline does not scale across a decade and a rotating cast of AI agents.

---

## 5. Functional scope

### 5.1 Core platform (foundation — must be flawless)

| Capability            | Requirement                                                                                                                                 |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **Multi-tenancy**     | Row-Level Security in PostgreSQL, enforced per transaction with a `NOBYPASSRLS` role. Application-layer filtering is defence in depth only. |
| **Identity & access** | Email/password + TOTP MFA, Google OAuth, Microsoft Entra, generic OIDC, SAML 2.0. Session device tracking and revocation.                   |
| **Authorization**     | Role-based with fine-grained `module.resource.action` permissions, plus record-level rules. Deny by default.                                |
| **Audit**             | Immutable, field-level change history on every business entity. Who, what, when, from where, previous value.                                |
| **Workflow engine**   | Visual builder; sequential, parallel, and conditional approval chains; delegation; escalation; SLA tracking.                                |
| **Domain events**     | Transactional outbox. Every cross-module state change is durable and exactly-once from the consumer's perspective.                          |
| **Extensibility**     | Custom fields, custom entities, scripted rules, marketplace extension bundles with a versioned API contract.                                |
| **Localisation**      | 8+ languages, RTL layouts, per-tenant locale, currency, timezone, and fiscal calendar.                                                      |
| **Notifications**     | In-app, email, web push, SMS. Per-user, per-module, per-event preferences with digest batching.                                             |
| **Files**             | S3-compatible object storage, virus scanning, versioning, expiring share links, per-tenant bucket isolation.                                |

### 5.2 Business modules

Currently implemented across 45 API modules. Grouped by domain:

- **Finance** — Chart of accounts, double-entry GL, AR/AP, multi-currency, bank reconciliation,
  tax (GST/VAT), budgets, fixed assets, financial statements, period close
- **Human Resources** — Directory, org chart, payroll engine, leave, attendance, shifts,
  appraisals, training, recruitment, self-service portal
- **CRM & Sales** — Leads, pipeline, quotations, sales orders, delivery notes, returns,
  contracts, campaigns, communications
- **Procurement & Supply Chain** — Vendors, RFQ, purchase orders, goods receipt, shipments,
  carriers, demand forecasting, reorder automation
- **Inventory & Manufacturing** — Multi-warehouse, serial/batch tracking, FIFO/LIFO/weighted-
  average costing, bin locations, cycle counting, BOM, work orders, routing, MRP
- **Projects** — Projects, tasks, milestones, Gantt, timesheets, budgets, resource allocation
- **Retail** — POS terminal, barcode, receipts, cash register, shift management, e-commerce storefront
- **Analytics** — Pivot engine, drag-and-drop dashboard builder, query builder, scheduled
  report delivery, role-based executive dashboards with drill-down
- **Platform services** — API keys, webhooks, OpenAPI docs, import/export wizards, integration
  templates, subscription billing, usage metering, tenant provisioning, super-admin panel
- **Verticals** — Healthcare (EHR, scheduling, e-prescribing, pharmacy, claims), Education
  (SIS, timetabling, fees, attendance, library), Real Estate (portfolio tree, leases, tenant
  portal, commissions, valuation), Field Service (tickets, dispatch, mobile checklists,
  contracts, auto-invoicing)

### 5.3 The AI layer — the primary differentiator

AI is a first-class subsystem, not a feature. It runs **locally by default** (Ollama +
pgvector) so that no customer data must leave the tenant's infrastructure.

| Capability                | Description                                                                                          | Status  |
| :------------------------ | :--------------------------------------------------------------------------------------------------- | :------ |
| **Copilot**               | Natural-language query and action across every module, permission-scoped to the asking user          | Built   |
| **Document intelligence** | Invoice/receipt/PO extraction into structured records with confidence scoring and human review queue | Target  |
| **Anomaly detection**     | Flags unusual transactions, expense patterns, and stock movements before posting                     | Target  |
| **Forecasting**           | Demand, cash flow, and churn prediction from the tenant's own history                                | Target  |
| **Autonomous agents**     | Long-running tenant-scoped agents: reconcile the bank feed, chase overdue invoices, rebalance stock  | Vision  |
| **Semantic search**       | Vector search over all documents and records, respecting row-level permissions                       | Partial |

**Hard rule:** every AI action is proposed, attributed, logged, and reversible. AI never posts
to a ledger, approves a workflow, or mutates a financial record without an explicit human
confirmation that is recorded in the audit trail.

### 5.4 Cross-platform reach

Every module ships on **Web** (Next.js), **Mobile** (Flutter, iOS + Android), and **Desktop**
(Windows/macOS/Linux) — with a documented exemption where a surface genuinely does not apply
(e.g. the tax-return builder does not need a phone UI). Offline-first with a sync queue is
required for POS, attendance, and field service.

### 5.5 The 10-Platform Architecture

UniERP operates as a constellation of 10 distinct presentation platforms backed by a single unified core (`unierp-api` and `unierp-idp`). This isolates provider concerns from tenant concerns and runtime environments from authoring environments.

**Provider Platforms (UniERP Internal)**
1. **Marketing Site** (`unierp-corporate-website`): The global front door for UniERP.
2. **Provider Admin OS** (`unierp-console`): The control centre for the platform operator to manage all tenants, billing, and global infrastructure.

**Tenant Platforms (Public/Customers)**
3. **Tenant Apps / ERP** (`unierp-web`): The core business system where end-users run Finance, HR, Sales, etc.
4. **Tenant Sites** (`unierp-tenant-sites`): Public-facing websites, e-commerce storefronts, and portfolios published by tenants.
5. **Web Studio** (`unierp-web-studio`): A no-code/low-code builder (with full-stack escape hatches) where tenants design their Tenant Sites.
6. **Tenant Admin Console** (`unierp-tenant-admin`): A dedicated SaaS portal for tenant administrators to manage users, usage, billing, and platform-level settings for their organization.

**Ecosystem & Edge Platforms**
7. **Marketplace** (`unierp-marketplace`): The unified hub for installing core applications, connectors, plugins, and 3rd-party extensions.
8. **Developer Platform** (`unierp-developer`): Tools and APIs for integrators and partners to build and publish custom extensions.
9. **Mobile App** (`unierp-mobile`): iOS/Android client for frontline tasks.
10. **Desktop App** (`unierp-desktop`): Native client wrapper (Tauri) for heavy offline or integrated workflows.

### 5.6 Revenue Model & Monetization

*(Placeholder: A detailed revenue model covering subscription tiers, metered billing, marketplace rev-share, and partner licensing is pending integration. Once defined, it will dictate the capabilities surfaced in the Provider Admin OS and Tenant Admin Console.)*

---

## 6. Non-functional requirements

These are contractual. A release that misses one does not ship.

| Category             | Requirement                                                                         | How it is proven                                  |
| :------------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------ |
| **Performance**      | p95 API < 300 ms; p99 < 800 ms; first contentful paint < 1.5 s on 3G                | k6 load suite in CI                               |
| **Scale**            | 10,000 tenants / 100,000 concurrent users / 1 TB per tenant without re-architecture | Load tests + capacity model in `TRD.md`           |
| **Availability**     | 99.9% for self-hosted reference deployment; zero-downtime migrations                | Blue/green deploy + migration discipline gate     |
| **Durability**       | RPO ≤ 5 min, RTO ≤ 1 h                                                              | Automated backup + quarterly restore drill        |
| **Security**         | OWASP ASVS Level 2; zero known high/critical CVEs in production dependencies        | CodeQL, Trivy, `pnpm audit` gates                 |
| **Tenant isolation** | Mathematically impossible to read across tenants via any API path                   | Two-tenant RLS tests on every protected table     |
| **Compliance**       | GDPR (erasure, portability, retention), HIPAA-ready (healthcare), SOC 2 controls    | Retention matrix, PII registry, deletion policy   |
| **Accessibility**    | WCAG 2.2 AA on every shipped screen                                                 | Automated axe checks + manual audit per release   |
| **Type safety**      | 100% of source compiles under TypeScript `strict` with zero suppressions            | Ratchet gate in CI (see `ARCHITECTURE_REVIEW.md`) |
| **Test coverage**    | ≥ 80% on business logic; 100% on financial calculation and tenant-isolation paths   | Coverage gate in CI                               |
| **Openness**         | Zero components that require a paid or proprietary licence to run in production     | Dependency licence scan in CI                     |

---

## 7. Explicit non-goals

Naming these prevents the scope from dissolving.

- **Not a consumer app.** No B2C features, no social layer.
- **Not a low-level BI tool.** We ship dashboards and a query builder; we integrate with
  Metabase/Superset rather than rebuilding them.
- **Not a payment processor.** We integrate with Stripe/Razorpay/others; we never hold funds.
- **Not multi-database.** PostgreSQL only. Supporting MySQL/Oracle would halve our velocity
  and cost us Postgres-specific features (RLS, pgvector, LISTEN/NOTIFY) that we depend on.
- **Not backwards-compatible with any other ERP's schema.** We import from them; we do not
  imitate them.
- **Not a general PaaS.** The extension system serves ERP extension, not arbitrary hosting.

---

## 8. Success criteria

### Product

- A mid-market company runs its full month-end close on UniERP without an external spreadsheet
- Time from bare metal to a provisioned, usable tenant: **under 30 minutes**
- A partner ships a custom vertical module without forking the core
- A CFO chooses UniERP over NetSuite on capability, not only on price

### Engineering (the gate that must be reached first)

- Zero `@ts-nocheck` in the codebase
- Zero high/critical vulnerabilities
- Every table has a passing two-tenant isolation test
- Green pipeline from commit to production deploy, with no manual step and no bypass path
- A new agent (human or AI) reads these nine documents and ships a correct feature on day one

---

## 9. Current state — honest snapshot (2026-07-30)

The platform is **broad but not yet sound**. Approximately 3,500 TypeScript source files,
45 API modules, a 40,000-line Prisma schema, 170 migrations, 24 shared packages, web +
mobile + desktop clients, and four vertical microservices exist and function.

However:

- **100% of `apps/api` and `apps/web` source is marked `@ts-nocheck`** — type safety, the
  foundation of every other guarantee in this document, is currently switched off across the
  entire application layer.
- The 40,000-line single-file Prisma schema is past the point of safe human or agent review.
- Test coverage is not measured against a gate that can fail a build.
- There is no continuous deployment pipeline; deployment is manual.

**Consequently, Phase 0 of `IMPLEMENTATION_PLAN.md` is not new features. It is restoring the
foundation.** The full scored assessment and remediation programme is in
`ARCHITECTURE_REVIEW.md` (legacy reference: `ARCHITECTURE_REVIEW.md`).

---

## 10. Amendment log

| Date       | Change                                                         | By          |
| :--------- | :------------------------------------------------------------- | :---------- |
| 2026-07-30 | Document established; replaces the deleted `.ai/` document set | Claude Code |
| 2026-08-16 | Added § 5.5 (10 Platforms) and § 5.6 (Revenue Model)           | Antigravity |


