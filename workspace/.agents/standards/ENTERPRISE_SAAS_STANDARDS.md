<!-- UniERP-Enterprise-SAAS-Standards: 1.0.0 -->
# Enterprise SAAS Engineering Standards: UI, DB, API & Test

This standard document specifies the technical quality criteria enforced across all 31 repositories in the UniERP polyrepo.

---

## 1. UI & Design System Standards (`@kannan19302/ui`)

### Design Token Governance
* **Zero Raw Hex Colors**: Any instance of `#hex` outside token files fails CI.
* **Zero Raw Pixel Spacing**: Any `px` spacing outside token definitions fails CI.
* **Semantic Surfaces**:
  * Canvas: `var(--color-bg)`
  * Elevated Card: `var(--color-bg-elevated)`
  * Sunken Well / Table Header: `var(--color-bg-sunken)`
  * Interactive Hover: `var(--color-bg-hover)`
  * Focus Ring: `var(--color-border-focus)` (2px accessible outline)

### 4-Tier Ergonomic Density Matrix
All enterprise tables, forms, and lists must react to `data-density`:
* `ultra-compact` (24px row): Financial ledgers, stock books, trading screens. Font size >= 11px.
* `compact` (28px row): Operational triage, CRM lead lists, inventory allocations.
* `standard` (32px row): Standard ERP forms, detail views, settings.
* `comfortable` (40px row): Touch-first POS registers, warehouse tablets.

### Accessibility (WCAG 2.2 AA)
* Standard text contrast >= 4.5:1; large text and graphical borders >= 3.0:1 across `strata`, `strata-dark`, and `strata-high-contrast`.
* 100% keyboard navigable (Tab, Shift+Tab, Arrow keys, Enter, Space, Escape) with visible focus indicators.
* Vitest-axe test required on all components (`expect(results).toHaveNoViolations()`).

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
