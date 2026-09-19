<!-- UniERP-Enterprise-SAAS-Standards: 1.0.0 -->
# Enterprise SAAS Engineering Standards: UI, DB, API & Test

> This operational checklist is subordinate to accepted ADRs, owning platform specifications and the canonical agent protocol. Apply relevant rows to the affected boundary; do not infer a universal schema, guard chain, precision or module layout from these examples. Automated accessibility and HTTP reachability are partial evidence only.

This standard document specifies the technical quality criteria enforced across the active repositories in the UniERP polyrepo.

---

## 1. UI & Design System Standards (`@kannan19302/ui`)

The design system is governed by the **10 Pillars of Enterprise Design System Excellence** codified at [`STRATA_DESIGN_SYSTEM_STANDARDS.md`](STRATA_DESIGN_SYSTEM_STANDARDS.md).

### Key Architectural Inviolable Rules
* **100% Token Purity**: Zero raw hex colors, zero raw pixel dimensions outside tokens (verified by `check-tokens.mjs`).
* **CSS Logical Properties**: Mandatory `margin-inline-start/end`, `padding-inline-start/end`, `inset-inline-start/end`; zero physical directions.
* **Universal Ref Forwarding & Polymorphism**: `React.forwardRef` and `asChild` (Radix Slot) on all primitives.
* **4-Tier Ergonomic Density Matrix**: `ultra-compact` (24px row), `compact` (28px row), `standard` (32px row), `comfortable` (40px row).
* **Accessibility (WCAG 2.2 AA & WHCM)**: Contrast $\ge$ 4.5:1, 2px focus ring, `@media (forced-colors: active)` support, and zero `vitest-axe` violations.
* **The 5 Canonical Enterprise States**: Default, Loading/Skeleton (`CLS < 0.05`), Actionable Empty, Error/Incident (`INC-...`), and Unauthorized/403.
* **Package Hygiene**: Mandatory `"sideEffects": ["*.css", "**/*.css"]` and component weight budgets.


---

## 2. Database & Data Persistence Standards (`data`)

### Multi-Schema Organization
* Entities are partitioned by domain schemas: `crm`, `erp`, `finance`, `inventory`, `manufacturing`, `healthcare`, `banking`, `commerce`, `education`, etc.

### Row-Level Security (RLS) Mandate
* Every table with tenant ownership must include:
  ```prisma
  tenantId  String  @db.Uuid
  ```
* Every migration SQL file must explicitly execute `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY`.

### Safe Zero-Downtime Migration Policy
* Never rename columns directly in production. Use the 3-step expand/contract pattern:
  1. **Expand**: Add new nullable column.
  2. **Backfill**: Mirror writes to both old and new columns via application service or database trigger.
  3. **Contract**: Deprecate old column and drop after all clients are updated.
* Prohibit destructive commands (`prisma db push`, `DROP TABLE`, `TRUNCATE`).

### Financial Decimals
* All currency fields must use `@db.Decimal(19, 4)` and be handled via `decimal.js` in TypeScript. Floating-point arithmetic near currency is rejected on sight.

---

## 3. Backend API & Service Standards (`api`)

### NestJS 6-Part Module Architecture
* Strict separation of concerns:
  1. `Module`: Dependency injection wiring only.
  2. `Controller`: Thin HTTP adapter; consumes `@Permissions(...)` and `@ZodBody(...)`.
  3. `Service`: Pure domain orchestration; orchestrates repositories and outbox events.
  4. `Repository`: Data access layer; encapsulates Prisma queries.
  5. `EventHandler`: Listens to domain events, processes asynchronous side effects idempotently.
  6. `Tests`: Unit and integration specs.

### Structured Logging & Observability
* JSON structured logging via Pino. Every log entry must include:
  * `requestId`: Correlated distributed trace ID.
  * `tenantId`: Active tenant UUID.
  * `userId`: Authenticated user UUID.
  * `action`: Domain action verb (`crm.lead.created`, `finance.invoice.posted`).
* OpenTelemetry spans for all outgoing database queries and message broker publishes.

---

## 4. Quality Engineering & Testing Standards

| Test Type | Target Scope | Tooling | Passing Criterion |
| :--- | :--- | :--- | :--- |
| **Unit Tests** | Services, Repositories, Domain Logic | Vitest / Jest | 100% pass rate, testing edge cases and validation. |
| **RLS Isolation Tests** | PostgreSQL tables | pg-client (`NOBYPASSRLS`) | 4-part assertion passing (Positive, Negative, Cross, Fail-closed). |
| **Accessibility Tests** | UI Components | vitest-axe | 0 violations under WCAG 2.2 AA. |
| **End-to-End Tests** | Full-stack platform flows | Playwright | HTTP 200/reachable, table rendering, action modal verification. |
| **Static Gates** | All source files | TypeScript, ESLint, Token Gate | 0 compiler errors, 0 raw hex/pixel violations. |
