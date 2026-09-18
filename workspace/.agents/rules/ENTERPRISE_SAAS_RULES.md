<!-- UniERP-Enterprise-SAAS-Rules: 1.0.0 -->
# UniERP Enterprise SAAS Master Rules — Market Dominance Standard

**Strategic North Star:** Stand at the top of the global enterprise software market, out-architecting and out-performing Salesforce, SAP, Oracle, Microsoft Dynamics 365, ServiceNow, and Workday under the definitive tagline:

> **"Enterprise SAAS business platform"** — Unifying CRM, ERP, SCM, HCM, and Tenant Builders across all 31 repositories in the UniERP polyrepo.

---

## 🚫 The 10 Inviolable Platform Laws (Instant CI/Agent Gate Rejection if Breached)

### LAW-01: Non-Stopping Execution Loop (Never Stop or Mock Completion)
1. Every iteration loop runs continuously until full completion (100% verified governance pass).
2. If any governance check or test fails, the agent MUST NOT stop, abort, or mock a passing status.
3. The agent MUST calculate and display the exact percentage progress (0% to 100%), diagnose the failing assertions, trigger automated remediation cycles across UI, DB, API, and Tests, and re-verify until 100% completion is reached.
4. Only explicit R3 restricted human authorization gates (e.g., live production deployment, secret rotation, destructive data purge) may pause execution.

### LAW-02: Strict Zero-Mock Mandate (Production-Grade Real Telemetry Only)
1. **Zero Hardcoded Metrics:** Never hardcode KPI cards, pipeline revenue, or analytical metrics (e.g., `$1,428,500`, `42% Win Rate`, `148 Employees`).
2. **Zero Fallback Registries:** Never intercept API errors in `catch` blocks with dummy arrays or fictional fallback registries (e.g., dummy vendor lists or fake contact records) or messages such as `"Serving local mock fallback registry."`.
3. **Truthful Telemetry:** If data does not exist in the database, display genuine empty states (`$0`, `0`, or clear empty state graphics) or real error banners with retry mechanisms.

### LAW-03: Multi-Tenant PostgreSQL Row-Level Security (RLS) Universality
1. Every business entity table must declare `tenantId UUID NOT NULL` and have an active PostgreSQL RLS policy defined in `setup-rls.sql`.
2. Tables must enforce RLS via:
   ```sql
   ALTER TABLE "crm"."leads" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE "crm"."leads" FORCE ROW LEVEL SECURITY;
   CREATE POLICY tenant_isolation_policy ON "crm"."leads"
     USING ("tenantId" = current_setting('app.current_tenant_id', true)::uuid);
   ```
3. Every table must pass 4-part isolation tests using a `NOBYPASSRLS` database role:
   - Tenant A sees Tenant A's data (Positive Assertion).
   - Tenant A cannot see Tenant B's data (Negative Assertion).
   - Tenant B cannot see Tenant A's data (Cross-Tenant Negative Assertion).
   - Unauthenticated/No-context session sees 0 rows (Fail-Closed Assertion).

### LAW-04: Zero-Trust Permission Guarding & Boundary Separation
1. Every backend HTTP endpoint must register `@UseGuards(JwtAuthGuard, RbacGuard)` and explicit `@Permissions('domain:resource:action')` in the controller method.
2. Provider Control Plane (`pcc.*`) and Tenant Control Plane (`occ.*`) must NEVER cross implicitly:
   - Provider Admin OS (`PLT-PAO`) operates on platform infrastructure, global billing, and tenant provisioning.
   - Tenant Admin (`PLT-TAD`) operates strictly within the boundaries of a single tenant.
3. Unauthorized access returns **403 Forbidden** (never 404 or 500).

### LAW-05: Exact Currency & Financial Math Precision
1. IEEE-754 floating-point numbers (`number`, `float`, `double`) are strictly prohibited near money, inventory quantities, tax rates, or pricing calculations.
2. Use `Decimal(19,4)` in Prisma schemas and `decimal.js` in TypeScript logic.
3. Posted/approved financial records (General Ledger entries, finalized Invoices, payments) are immutable: they can only be amended or reversed via credit notes/reversal entries, never deleted.

### LAW-06: Strata DL 2.0 Design System Adherence (Zero Raw Literals)
1. **Zero Raw Hex Colors:** Never use hardcoded hex codes (`#ffffff`, `#1e293b`) or RGB/HSL literals outside the central token definitions. Always use `var(--color-*)` or `var(--strata-*)`.
2. **Zero Raw Pixel Dimensions:** Never use hardcoded pixel margins/paddings (`padding: 16px`). Always use `var(--space-*)` and `var(--density-*)`.
3. **4-Tier Density Support:** All enterprise screens must support the 4 density levels (`ultra-compact` 24px rows, `compact` 28px rows, `standard` 32px rows, `comfortable` 40px rows).
4. **Accessible Contrast:** All themes must pass WCAG 2.2 AA (>= 4.5:1 for standard text, >= 3.0:1 for large text and graphical borders).

### LAW-07: Mandatory 5-File Uniform UI Component Anatomy
Every UI component directory under `src/<category>/<component-name>/` MUST contain exactly 5 co-located files:
```
src/<category>/<component-name>/
├── <component-name>.tsx         # Logic, Props, & TypeScript Interfaces
├── <component-name>.module.css  # Scoped CSS Module (DL 2.0 Tokens)
├── <component-name>.stories.tsx # Storybook Story (CSF 3.0)
├── <component-name>.test.tsx    # Vitest + vitest-axe Unit & A11y Test Suite
└── index.ts                     # Encapsulated Re-export
```

### LAW-08: Mandatory 6-Part Backend Module Anatomy
Every backend module in `d:\UniERP\api` MUST contain:
```
src/modules/<domain>/
├── <domain>.module.ts          # NestJS Module declaration
├── <domain>.controller.ts      # Thin Controller with @Permissions & @ZodBody
├── <domain>.service.ts         # Domain business logic orchestration
├── <domain>.repository.ts     # Domain Repository pattern (Prisma access)
├── <domain>.event-handler.ts   # Outbox event publisher and consumer
└── __tests__/                  # Co-located Unit and RLS Integration tests
```
*Direct `PrismaService` imports inside services are strictly prohibited; all database interactions must flow through the domain repository.*

### LAW-09: Atomic Outbox Pattern & Idempotent Event Delivery
1. Persistent business changes and their corresponding domain events MUST commit atomically in the same database transaction via an outbox table.
2. Event consumers must be version-aware, idempotent (handling duplicate deliveries gracefully via unique event IDs), and self-healing.

### LAW-10: Additive Contract Governance & RFC 9745 Deprecation
1. All public API, DTO, event, and SDK contracts are authored first in `@kannan19302/contracts`.
2. Contracts are strictly additive within a major version.
3. Breaking changes require a major version bump, formal migration scripts, RFC 9745 (`Deprecation`) and RFC 8594 (`Sunset`) headers, and documented backward compatibility.

### LAW-11: Mandatory Loop-Ending Commit and Push to GitHub
1. Every execution loop and autonomous remediation cycle MUST end with staging (`git add`), semantic atomic commit (`git commit`), and pushing (`git push`) all modified code, tests, schemas, and governance artifacts to their respective upstream GitHub repositories.
2. An iteration or task is strictly INCOMPLETE if uncommitted or unpushed changes remain in any repository in the polyrepo.
3. Commit messages MUST follow semantic conventional commits (e.g., `feat(enterprise-saas): ...`, `fix(enterprise-saas): ...`) and document the verified governance score.

---

## 🏛️ Platform Ownership & Boundary Rules

| Platform ID | Platform Name | Owning Repositories | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| **PLT-DEV** | Developer Platform | `developer-platform`, `sdk`, `extension-api`, `extensions` | Tenant API keys, Webhooks, Sandboxes, SDK generation. |
| **PLT-SITE** | Web Studio & Builders | `web-studio`, `tenant-site-template`, `tenant-sites` | Visual website & app builder, AST round-trip editing. |
| **PLT-ERP** | Tenant Applications | `tenant-apps`, `desktop-app`, `unierp-mobile` | Full enterprise ERP/CRM suites across 15 industry clouds. |
| **PLT-TAD** | Tenant Admin (OCC) | `tenant-admin` | Operations Control Center: tenant settings, users, audit logs. |
| **PLT-PAO** | Provider Admin OS (PCC) | `provider-admin-os` | Provider Control Center: tenant lifecycle, clusters, cells. |
| **PLT-MAR** | Marketing Site | `marketing-site` | Corporate portal, product tours, live TCO calculator. |
| **PLT-MKT** | Marketplace | `marketplace` | Extension and industry pack discovery, installation, reviews. |
| **PLT-BIZ** | Business Services & Data | `api`, `data`, `contracts`, `idp`, `auth` | Core domain logic, multi-schema database, RLS, SSO/OIDC. |
| **PLT-DS** | Design System | `design-system`, `storybook` | Strata DL 2.0 component library, tokens, accessibility. |
| **PLT-OPS** | Operations & Workspace | `infra`, `config`, `unierp-workspace`, `kernel`, `service-kit`, `shared`, `blockchain`, `sandbox` | Infrastructure, containerization, blockchain ledger, CI. |

---

## ⚡ Execution Directives for All Agents
1. Always start by reading the current capability status in `.agents/memory/ENTERPRISE_SAAS_EXECUTION_LEDGER.json`.
2. Follow the 7-phase delivery workflow for any feature.
3. Run the automated runner: `node unierp-workspace/scripts/run-enterprise-saas-engine.mjs` to measure current percentage progress.
4. If percentage is < 100%, continuously implement missing components and fix failing gates until 100% is reached.
5. Conclude EVERY execution loop by committing and pushing all modified changes to GitHub across all affected repositories per LAW-11.
