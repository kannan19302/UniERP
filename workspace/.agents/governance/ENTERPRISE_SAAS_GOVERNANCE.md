<!-- UniERP-Enterprise-SAAS-Governance: 1.0.0 -->
# Enterprise SAAS Governance & Mathematical Progress Engine

This document defines the automated, fail-closed governance model that evaluates all 31 repositories in the UniERP polyrepo, calculates real completion percentages (0% to 100%), and strictly prohibits mocked completions.

---

## 📐 Mathematical Percentage Progress Formulation

Progress is not an opinion, estimate, or arbitrary claim. It is computed deterministically across 4 core technical dimensions, weighted equally:

$$\text{Overall Completion \%} = 0.25 \times \text{Score}_{\text{UI}} + 0.25 \times \text{Score}_{\text{DB}} + 0.25 \times \text{Score}_{\text{API}} + 0.25 \times \text{Score}_{\text{Test}}$$

### 1. UI Dimension Score ($\text{Score}_{\text{UI}}$)
$$\text{Score}_{\text{UI}} = \left( \frac{\text{Compliant Pages}}{\text{Total Routes}} \times 0.4 \right) + \left( \frac{\text{Floorplan Conformance}}{\text{Total Workspaces}} \times 0.3 \right) + \left( \frac{\text{Token Gate Clean Checks}}{\text{Total UI Packages}} \times 0.3 \right) \times 100$$
* **Checks**:
  * 0 raw hex color literals.
  * 0 raw pixel margin/padding literals.
  * Explicit `data-density="compact"` or `data-density="ultra-compact"` configuration.
  * Presence of 8 owned canonical floorplans (`DataWorkspace`, `RecordShell`, etc.).
  * Single-source `ContextBar` (`StrataBar`) navigation with 0 redundant page-level breadcrumbs.

### 2. Database Dimension Score ($\text{Score}_{\text{DB}}$)
$$\text{Score}_{\text{DB}} = \left( \frac{\text{Models with tenantId}}{\text{Total Prisma Models}} \times 0.4 \right) + \left( \frac{\text{Tables with Active RLS}}{\text{Total Tables}} \times 0.4 \right) + \left( \frac{\text{Safe DDL Checks}}{\text{Total Migrations}} \times 0.2 \right) \times 100$$
* **Checks**:
  * Universal `tenantId UUID NOT NULL` across all multi-tenant entities.
  * Explicit `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY` in migration SQL.
  * Zero destructive database statements (`DROP TABLE`, `TRUNCATE`, `prisma db push`).

### 3. API Dimension Score ($\text{Score}_{\text{API}}$)
$$\text{Score}_{\text{API}} = \left( \frac{\text{Endpoints with @Permissions}}{\text{Total Endpoints}} \times 0.4 \right) + \left( \frac{\text{Endpoints with @ZodBody}}{\text{Total Mutating Endpoints}} \times 0.3 \right) + \left( \frac{\text{6-Part Module Anatomy Conformant}}{\text{Total Modules}} \times 0.3 \right) \times 100$$
* **Checks**:
  * 100% route guarding with `@UseGuards(JwtAuthGuard, RbacGuard)`.
  * Mandatory `@Permissions(...)` on all non-public routes.
  * Zod schema validation on all POST/PUT/PATCH bodies.
  * Module separation: Module, Controller, Service, Domain Repository, Outbox Handler.

### 4. Test Dimension Score ($\text{Score}_{\text{Test}}$)
$$\text{Score}_{\text{Test}} = \left( \frac{\text{Passing Unit Tests}}{\text{Total Unit Tests}} \times 0.3 \right) + \left( \frac{\text{Passing RLS Isolation Suites}}{\text{Total RLS Suites}} \times 0.3 \right) + \left( \frac{\text{Zero-Violation Axe Suites}}{\text{Total UI Component Suites}} \times 0.2 \right) + \left( \frac{\text{Reachable E2E Routes}}{\text{Total Platform Routes}} \times 0.2 \right) \times 100$$

---

## 🚫 Fail-Closed & Zero-Mock Enforcement Rules

1. **Never Mock Success**: A test suite that was not run (`NOT RUN`) counts as **0% pass**, never as passing.
2. **Never Euphemize Defect**: If a compile check, token gate, or test fails, the status is strictly `PARTIAL` or `FAILED`. It cannot be labeled `DONE`.
3. **Automated Gate Interception**:
   - The master runner script `scripts/run-enterprise-saas-engine.mjs` executes AST parsing and real CLI checks.
   - It computes the live values of each formula and writes them directly to `.agents/memory/ENTERPRISE_SAAS_EXECUTION_LEDGER.json`.
4. **Non-Stopping Remediation Threshold**:
   - The runner runs iterations in a continuous loop (`--continuous`).
   - If score < 100%, it automatically reports the exact delta, logs actionable remediation tasks, and continues until 100% verified completion.
