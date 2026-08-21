> **Migration status:** Dated architecture assessment retained as evidence. Scores and findings require current verification.

# ARCHITECTURE REVIEW — Honest Assessment & Remediation Programme

> **Scored against the standard of "a platform a business runs on for a decade."**
> Not against "impressive for an AI-built project." One file. Amended, never replaced.
> Assessed 2026-07-30 · Read `README.md` § 0 before editing.

---

## 1. Verdict

# **5.4 / 10**

> **A genuinely impressive product skeleton sitting on a foundation that is currently
> unverifiable.**

The breadth is real and unusual: 45 API modules, 1,836 data models, ~660,000 lines of
application code, web + mobile + desktop clients, four vertical microservices, a transactional
outbox, row-level security, a design-token system, and a local-first AI layer. Very few teams
of any size assemble this much coherent surface area. The _design decisions_ are, almost
without exception, the ones a strong architect would make.

**But the guarantees are switched off.** Every safety property this architecture claims —
type safety, tenant isolation coverage, test coverage, deployment safety — is currently either
disabled, unverified, or unenforced. The architecture is sound _on paper_. The repository does
not currently prove any of it.

**This score is recoverable to 8+ within one focused quarter.** Nothing below requires a
rewrite. Every finding is a discipline-and-enforcement problem, not a design problem — which is
the good kind of bad news.

---

## 2. Scorecard

| #   | Dimension                          |  Score  | One-line verdict                                                             |
| :-- | :--------------------------------- | :-----: | :--------------------------------------------------------------------------- |
| 1   | Domain model & module design       | **8.5** | Genuinely excellent. Correct boundaries, correct contexts.                   |
| 2   | Technology selection               | **9.0** | Near-flawless. Boring where it should be, ambitious where it differentiates. |
| 3   | Multi-tenancy design               | **8.0** | Right model, right mechanism — undermined by unverified coverage.            |
| 4   | **Type safety**                    | **0.5** | **Entirely disabled. 3,241/3,241 files `@ts-nocheck`.**                      |
| 5   | Data-layer structure               | **4.0** | 40,577-line single schema file is past reviewable.                           |
| 6   | Security posture                   | **5.5** | Strong primitives, no continuous proof.                                      |
| 7   | Testing                            | **4.5** | 474 spec files, but no gate that can fail. Coverage is self-reported.        |
| 8   | CI/CD & deployment                 | **3.5** | CI exists; CD does not. Gates are bypassable.                                |
| 9   | Observability                      | **6.5** | Instrumented (OTel, Prometheus, Sentry); no SLOs or alerts.                  |
| 10  | Frontend architecture              | **7.5** | Schema-driven framework + token system is the right answer at this scale.    |
| 11  | Documentation & governance         | **7.0** | Was 30k lines of unread process; now nine enforced documents.                |
| 12  | Scalability headroom               | **6.0** | Design supports it. Nothing proves it.                                       |
| 13  | Open-source compliance             | **8.5** | Genuinely open-first. Only GitHub is a logged exception.                     |
| 14  | Maintainability / agent-legibility | **3.5** | An 8,283-line controller and a 40k-line schema defeat both humans and AI.    |
|     | **Weighted overall**               | **5.4** |                                                                              |

---

## 3. What is genuinely excellent — do not change these

**Do not let the criticism below obscure this. These decisions are correct and should be
defended against future pressure to "simplify."**

| Strength                                                                 | Why it matters                                                                                                                                                                                   |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Modular monolith with earned extraction**                              | The single most common ERP architecture failure is premature microservices. This repo resisted it, and extracted exactly the four verticals that have genuinely independent lifecycles. Correct. |
| **Transactional outbox**                                                 | Recognising that `EventEmitter2` and BullMQ are _not_ a durability guarantee, and building a real outbox with idempotent consumer receipts, is a senior-level call most teams get wrong.         |
| **RLS with a `NOBYPASSRLS` role and `SET LOCAL` inside the transaction** | This is the _correct_ implementation, including the subtlety that transaction pooling forbids session-level state. Most implementations get this wrong and leak across tenants under load.       |
| **PostgreSQL-only, no abstraction layer**                                | Deliberately foreclosing MySQL/Oracle to gain RLS, pgvector, and `JSONB` is the right trade for this product.                                                                                    |
| **Design tokens with 7 themes + orthogonal density**                     | Real design-system engineering, not a component dump. Enables theming, dark mode, high-contrast a11y, and per-user density for free.                                                             |
| **Schema-driven frontend (`@kannan19302/framework`)**                          | The only way 45 modules of CRUD stays maintainable. Hand-building 45 list pages would have been fatal.                                                                                           |
| **Local-first AI (Ollama + pgvector)**                                   | Strategically excellent. It is the single decision that makes healthcare, government, and EU-regulated buyers addressable at all.                                                                |
| **Money as `Decimal(19,4)`, statuses as enums**                          | Correct in the places where being wrong is unrecoverable.                                                                                                                                        |
| **`db:push` disabled at the script level**                               | Enforcing discipline mechanically rather than by documentation. This is exactly the right instinct — it just needs to be applied to the other nine gates.                                        |

---

## 4. Findings

### 🔴 F1 — Type safety is completely disabled (CRITICAL)

**Every one of the 3,241 TypeScript source files in `apps/api` and `apps/web` begins with
`// @ts-nocheck`.** A root-level script (`ignore_all.js`) injected it across the tree, and the
four most recent commits are titled "ignore ts errors", "ignore web ts errors", "ignore app
directory TS errors", and "fix-ts-errors".

```
ts-nocheck files : 3,241
total src files  : 3,241        →  100.0%
occurrences of `: any` in apps/api : 9,088
```

**Consequences, in order of severity:**

1. `pnpm typecheck` — which runs in pre-commit, pre-push, _and_ CI — passes unconditionally.
   Three enforcement layers all report green while checking nothing.
2. Every refactor across ~660,000 lines is now unguided. Renaming a Prisma field produces no
   error anywhere; it produces a runtime failure in production.
3. Prisma's entire value proposition — a generated, type-safe client — is nullified.
4. The Zod-shared-between-client-and-server design, which prevents validation drift, is
   unenforced.
5. **Every AI agent working in this repo is now flying blind.** Type errors are the primary
   feedback signal an agent uses to know its change is wrong.

**This is the finding. Everything else is secondary.** A 40,577-line schema is survivable. An
unverified deploy pipeline is survivable. 660,000 lines of unchecked TypeScript in a financial
system is not.

**Honest note on how this happened:** this is what velocity pressure looks like in an
AI-driven codebase. Errors accumulated faster than they were fixed, and suppression was the
path that kept the build green. It is understandable and it is completely reversible — but it
must be reversed deliberately, not opportunistically.

---

### 🔴 F2 — The gates are decorative (CRITICAL)

The repository has ten quality gates. Almost none can currently fail a build.

| Gate                 | Configured                  | Actually blocks? | Why not                                                             |
| :------------------- | :-------------------------- | :--------------- | :------------------------------------------------------------------ |
| Typecheck            | ✅ pre-commit, pre-push, CI | ❌               | 100% `@ts-nocheck`                                                  |
| Lint                 | ✅                          | ⚠️ Partially     | Only 11 files carry `eslint-disable`, so this one mostly works      |
| Coverage             | ✅ CI job exists            | ❌               | `all: false` and **no threshold set** — it reports, it cannot fail  |
| `pnpm audit`         | ✅ CI                       | ❌               | `continue-on-error: true`                                           |
| RLS verification     | ✅ script exists            | ❌               | **`check-rls-verify.mjs` is not wired into CI at all**              |
| Architecture         | ✅                          | ✅               | Genuinely works                                                     |
| Migration discipline | ✅                          | ✅               | Genuinely works                                                     |
| Secret scanning      | ❌                          | ❌               | Not present at any layer                                            |
| Design tokens        | ❌                          | ❌               | No gate; hardcoded values are unenforced                            |
| Licence compliance   | ❌                          | ❌               | No gate, despite open-source-first being a hard product requirement |

Plus: pre-push hooks are bypassable with `git push --no-verify`, and CI does not build
`apps/web` or `apps/api` outside the E2E job — so a build-breaking change can pass CI.

**A gate that cannot fail is worse than no gate**, because it manufactures false confidence.

---

### 🔴 F3 — No continuous deployment; no safe path to production (CRITICAL)

There is **no CD workflow**. `release.yml` versions npm packages via changesets; it does not
deploy anything. Consequently:

- Deployment is manual and unrehearsed.
- No staging verification before production.
- No automated migration application, and no rollback procedure.
- No image signing, no SBOM, no container vulnerability scan.
- No health gate after rollout, and therefore no automatic rollback.
- `main` has no enforced branch protection with non-exempt administrators.

For a system intended to hold payroll and patient records, this is the gap between "software"
and "a product a business can depend on."

---

### 🟠 F4 — The 40,577-line schema file (HIGH)

`schema.prisma` is a single file containing 1,836 models and 65 enums.

- No human and no AI agent can read it in one context window. Every change is therefore made
  **without seeing the surrounding model graph** — which is precisely how duplicate entities
  and missing relations get introduced.
- `model Tenant` alone spans 109 lines of back-relations and is a permanent merge-conflict
  hotspot: every new module must edit the same block.
- 1,836 models for an ERP is high but not absurd (SAP has tens of thousands of tables).
  The problem is the **packaging**, not the count.

Prisma has supported multi-file schemas since v5.15. There is no reason for this file to exist.

---

### 🔴 F5 — 364 tenant tables have no RLS policy (CRITICAL)

Originally filed as a theoretical drift risk. The migration-safety gate built alongside this
review **quantified it, and it is not theoretical.**

```
tenant tables created by migrations        : 1,029
last bulk RLS pass                          : 20260719030100_rls_mfa_push_approval
tenant tables created AFTER that pass       :   364   ← no policy in any migration
```

RLS is applied by migrations that loop over the system catalogue (`information_schema` /
`pg_tables`) enabling policies on every table that has a `tenant_id` column. **That loop is
point-in-time: it covers only the tables that exist at the moment it runs.** Every tenant table
created afterwards is unprotected unless someone remembers to add a policy by hand.

Confirmed uncovered tables include financially and personally sensitive ones:

| Table                                                                   | Contains                         |
| :---------------------------------------------------------------------- | :------------------------------- |
| `saas_invoices`                                                         | Billing records                  |
| `payment_transactions`                                                  | Payment history                  |
| `user_profiles`                                                         | Personal data                    |
| `user_identities`                                                       | OAuth identity links             |
| `email_verification_tokens`                                             | Account-takeover-relevant tokens |
| `app_storage_usage`, `usage_alert_rules`, `usage_alert_logs`, +356 more | Various                          |

Two pieces of evidence that this is a systemic gap rather than an oversight in one place:

1. The repository **already knows about the pattern**. Migration `20260722100100_rls_app_settings`
   carries the comment: _"…which ran before this table existed, so it was never covered."_ One
   table was patched individually; the other 364 were not swept.
2. `setup-rls.sql` enumerates only **18** tables explicitly, so it does not cover them either.
3. `scripts/check-rls-verify.mjs` was written to catch exactly this — and **was never wired
   into CI**, so it never ran.

**What this means concretely:** for these 364 tables, tenant isolation depends entirely on the
application-layer Prisma filter. That is layer 3 of the four-layer defence in
`BACKEND_SCHEMA.md § 4.1` — the layers explicitly documented as _"convenience; only [RLS] is
proof."_ A single missing `where: { tenantId }` in any service method touching these tables is
a cross-tenant data leak with nothing behind it to stop the query.

**I have not demonstrated a live leak** — that requires a running database and a targeted probe,
which is `security-sentinel`'s first assignment. What is proven is that the database-level
guarantee is absent for 35% of tenant tables, including the billing and identity ones.

**This is now the second-highest priority in the programme, behind only F1.**

---

### 🟠 F6 — Testing cannot be trusted (HIGH)

474 spec files across 45 modules and 24 packages, plus 12 E2E specs. That is not a trivial
suite. But:

- `vitest.config.ts` sets `coverage.all = false` — coverage is measured **only over files that
  tests already touch**, which mathematically inflates the figure toward 100% regardless of
  reality.
- **No coverage threshold is configured.** The CI coverage job cannot fail.
- With `@ts-nocheck` everywhere, tests are themselves untyped — a test can assert against a
  shape that no longer exists and still pass.
- E2E coverage (12 specs) is thin relative to the journeys in `APP_FLOW.md`.
- I found one 23,201-line test file (`crm.service.coverage.spec.ts`), whose name suggests it
  was written to raise a coverage number rather than to assert behaviour.

---

### 🟠 F7 — God classes defeat maintenance (HIGH)

| File                                              |     Lines |
| :------------------------------------------------ | --------: |
| `advanced-finance/advanced-finance.controller.ts` | **8,283** |
| `finance/finance-operations.service.ts`           |     2,955 |
| `inventory/inventory.service.ts`                  |     2,922 |
| `communication/communication.service.ts`          |     2,855 |

An 8,283-line _controller_ is a category error — controllers are supposed to contain routing
and nothing else. Files at this size cannot be reviewed, cannot be safely refactored, and
cannot be loaded into an AI agent's context alongside the code it must interact with. They will
silently become append-only.

---

### 🔴 F13 — CI on `main` is already red, and has been shipped past (CRITICAL)

While wiring the new pipeline I ran the _existing_ gates unchanged. **`pnpm schema:lint` fails
today, on the current `main`, with 264 un-baselined `Float` fields.**

```
$ node scripts/check-schema-lints.mjs
Schema lint failed (Track G.8): `Float` is forbidden in schema.prisma …
  264 fields listed
$ echo $?
1
```

`schema:lint` was already a step in CI's `validate` job. Two conclusions follow, and both are
serious:

1. **CI has been failing on `main` and work was merged anyway.** The four most recent commits
   ("ignore ts errors", "ignore web ts errors", "fix-ts-errors") are consistent with a period
   of pushing directly past a red pipeline.
2. `scripts/schema-lint-baseline.json` carries the instruction _"Never add to this list;
   shrink it"_ — and the schema has since grown 264 fields past it. The gate was designed
   correctly and then outrun.

**I deliberately did not extend the baseline to make the build green.** Doing so would be
precisely the suppression behaviour this whole document set forbids, and it would hide a real
finding. The gate stays red until the underlying schema is fixed. That is the intended
behaviour of a gate.

**Note that this means the tree cannot currently be pushed** under the new hardened pre-push
hook — which is exactly what was asked for ("with errors no code should push to remote repo").
Resolving it is the first task of Phase 0. Of the 264, most are genuine continuous metrics
(latitude, confidence, duration, opacity) that belong in the baseline as `metric` entries; a
minority are money and must become `Decimal`. **They must be separated by hand, deliberately,
one at a time — not swept into the baseline in bulk.** See R11.

### 🟡 F8 — Repository hygiene (MEDIUM)

`ignore_all.js` (the suppression script) was committed at the repository root. Also present:
`cycle-report.json`, `svc.log` files in four satellite repos, `apps/mobile/scratch/add_routes.py`,
`apps/mobile/lib/features/temp_saas.txt`, and loose `.prisma`/`.txt` model fragments in
`packages/database/prisma/`. Individually trivial; collectively they signal that one-off
artifacts are normal here, which invites more of them.

---

### 🔴 F11 — 92 monetary fields typed `Float` in the schema (CRITICAL)

Discovered by the policy gate built alongside this review. `schema.prisma` declares **92 fields
matching a monetary name pattern (`amount`, `total`, `subtotal`, `price`, `cost`, `balance`,
`salary`, `tax`, `claimedAmount`, `paymentAmount`, …) with type `Float`.**

```
schema.prisma:11149   subtotal        Float   @default(0)
schema.prisma:11150   total           Float   @default(0)
schema.prisma:33197   amount          Float
schema.prisma:33271   paymentAmount   Float?  @map("payment_amount")
schema.prisma:33286   claimedAmount   Float?  @map("claimed_amount")
```

IEEE-754 cannot represent most decimal fractions exactly. `0.1 + 0.2 !== 0.3` is not a
curiosity here — it is a ledger that will not reconcile, an invoice total that disagrees with
the sum of its lines by a cent, and an insurance claim amount that fails audit. The failure is
**silent and cumulative**: it appears months later as an unexplainable variance.

The convention is documented correctly (`Decimal(19,4)`) and followed in most of the schema.
These 92 are the exceptions, and several are in the finance and claims paths where it matters
most. **Remediation R11.**

### 🟠 F12 — Unsafe raw SQL and unguarded routes (HIGH) — raw SQL now closed to 1

Two counts measured by the new policy gate, at the time this finding was filed:

| Finding                                            |                                  Count then | Note                                                                                       |
| :------------------------------------------------- | ------------------------------------------: | :----------------------------------------------------------------------------------------- |
| `$queryRawUnsafe` / `$executeRawUnsafe` call sites | 10 (2 were comment-only mentions, not real) | In `admin`, `analytics`, `hr-advanced`, `saas/storage-metering`, and one test mock.        |
| Controller routes with no `@Permissions` decorator |                     1,889 of 14,225 (13.3%) | Some legitimately public (`/health`, `/ready`); the rest authenticated but not authorised. |

**Update — the 8 real raw-SQL sites were reviewed individually and resolved:**

- **`admin/operations.service.ts`** — `SELECT 1` health check, no interpolation. Converted to `$executeRaw` tagged template.
- **`hr-advanced.service.ts`** — fixed table, tenantId the only variable. Converted to `$queryRaw` tagged template (fully parameterised).
- **`saas/storage-metering.service.ts`** — table identifier was already regex-validated (`/^[a-z0-9_]+$/`), so not exploitable, but rewritten with `Prisma.sql`/`Prisma.raw` instead of manual string interpolation.
- **`analytics-enterprise.service.ts` — 2 sites in `getDataQualityDashboard`** — table names hardcoded by the caller, not user input, so not exploitable, but rewritten the same way for consistency and to retire the pattern.
- **`analytics-enterprise.service.ts` — `getAdHocQuery`, the one CONFIRMED live finding** — this endpoint took `tenantId` as a parameter **and never used it**. Its only protection was a keyword blocklist (`drop`, `truncate`, …) and a table allowlist — neither constrains a `SELECT` to the caller's own tenant. Any user with `analytics.report.create` could have read every tenant's rows through this endpoint. **This was a real, confirmed cross-tenant data exposure, not a theoretical one.**
  - Root cause fix: the endpoint is protected by the global `TenantInterceptor`, which calls `runWithTenantSession` and sets `app.current_tenant_id` at session level before the query runs — and after **R3** closed the RLS gap, every table this query can reach now has RLS enabled _and forced_. That combination is what actually constrains the query to one tenant, not the SQL text.
  - Because that protection is invisible at the call site, a runtime guard was added: before executing, the code now queries `pg_class.relrowsecurity`/`relforcerowsecurity` for the target table and **refuses to run if RLS is not both enabled and forced**. This turns "we believe RLS protects this" into "we verify RLS protects this, on every call" — fail closed, not fail hope.
  - This one call site remains `$queryRawUnsafe` by necessity — the feature's entire purpose is running admin-supplied dynamic SQL text, which cannot be parameterised. It is recorded as a permitted, reviewed exception, not silently suppressed: the ratchet baseline reflects it as 1, and this paragraph is that record. **Remediation R12 is complete for raw SQL.**
- **`admin/tests/operations.service.spec.ts`** — updated the mock to match the production fix above.

**The 1,889 unguarded routes remain open** — that count is large enough to require the same
per-route ratchet-driven approach as `@ts-nocheck` (R1), not a single pass. Tracked ongoing in
the ratchet; `feature-architect`'s per-cycle debt quota should include closing a batch of these
alongside its `@ts-nocheck` quota once R1 tooling patterns are established.

### 🟡 F9 — Observability without operability (MEDIUM)

OpenTelemetry, Prometheus, Sentry, Pino, health endpoints, and a metrics controller are all
wired up — genuinely more than most projects at this stage. What is missing is everything that
makes telemetry _useful_: no defined SLOs, no alert rules, no dashboards in version control, no
runbooks tied to alerts, and no error budget. Instrumentation without alerting means outages
are discovered by customers.

---

### 🟡 F10 — Scale is designed for, not demonstrated (MEDIUM)

The k6 load-test suite exists (smoke, login, list, document-post, stress, tenant-isolation) and
a `load-test.yml` workflow exists. But there is no published capacity model, no evidence of a
run at the stated 10,000-tenant / 100,000-user target, no PgBouncer in the compose topology, no
table partitioning despite obvious candidates (audit logs, stock movements, outbox), and no
read-replica routing for reporting. At 1,836 tables with RLS predicates on every query, **query
planning under RLS is the most likely first scaling wall** — and it is untested.

---

## 5. The remediation programme

Ordered by **risk reduced per unit of effort**. R1–R4 are Phase 0 in
`IMPLEMENTATION_PLAN.md` (legacy reference: `IMPLEMENTATION_PLAN.md`) and block all feature work.

### R1 — Restore type safety ⬅ the single highest-value action in the program

Do **not** attempt a big-bang removal: deleting 3,241 `@ts-nocheck` lines at once would surface
tens of thousands of errors and freeze delivery for months. Use a ratchet.

```
Step 1  Commit a baseline: .quality-baseline.json  { tsNocheck: 3241, tsIgnore: N, any: 9088 }
Step 2  CI gate: any INCREASE over baseline fails the build.        ← stops the bleeding today
Step 3  Every feature cycle must remove @ts-nocheck from ≥ 1 complete module and fix the
        resulting errors properly (no `any` substitutions — the ratchet counts those too).
Step 4  Order: packages/shared → packages/database → packages/auth → apps/api modules by
        dependency depth → packages/ui-* → apps/web.
Step 5  Baseline is rewritten downward on every reduction. It may never move up.
Step 6  When it reaches 0: delete the ratchet, enable `strict` everywhere permanently.
```

**Estimate:** 8–14 weeks of sustained effort alongside feature work. **Non-negotiable.**
Nothing else in this document matters until this is underway, because every other guarantee
depends on it.

### R2 — Split the schema

Migrate to Prisma multi-file schemas: `prisma/schema/{platform,finance,sales,procurement,
inventory,hr,projects,manufacturing,retail,analytics,ai,workflow,verticals}.prisma`. No file
over 3,000 lines. Remove the unnecessary `Tenant` back-relations (Prisma does not require them)
to eliminate the merge-conflict hotspot. **Estimate: 1 week. Zero runtime risk** — the
generated client is identical.

### R3 — Close the 364 RLS gaps, then prove isolation continuously ⬅ **start this week**

1. **Immediately**: write one migration that re-runs the catalogue loop over every table with a
   `tenant_id` column, closing all 364 gaps at once. This is low-risk (adding a policy cannot
   corrupt data) and high-value. Verify afterwards that `pg_policies` covers all 1,029 tables.
2. **Prevent recurrence**: `scripts/ci/check-migration-safety.mjs` (delivered with this review)
   now fails any migration that creates a `tenant_id` table without a policy. It is wired into
   the pipeline.
3. **Wire `check-rls-verify.mjs` into CI as a blocking job** (done in the new `ci.yml`).
4. **Confirm the application role is `NOBYPASSRLS`** in every environment — if it is not, the
   policies that _do_ exist have never been enforcing anything.
5. Generate a two-tenant isolation test per protected table from the schema rather than writing
   them by hand.
6. Have `security-sentinel` probe the previously uncovered tables for an actual leak, and treat
   any hit as a Critical incident with a disclosure assessment.

**Estimate: 1 week for steps 1–4; ongoing for 5–6.**

### R4 — Rearchitect CI/CD (delivered with this document set)

Three enforcement layers, no bypass path, real CD to staging and production with signed images,
SBOMs, health gates, and automatic rollback. See `TRD.md § 8`.

### R5 — Repo hygiene (delivered with this document set)

Remove one-off scripts, temp files, and debug artifacts. Extend `.gitignore`. Add a CI check
that rejects new scratch files.

### R6 — Make coverage real

Set `coverage.all = true`. Configure thresholds (start at the honest measured number, ratchet
upward 2 points per month toward 80%). Require 100% on financial calculation paths. Audit the
23,201-line coverage spec and replace it with behavioural tests. **Estimate: 2 weeks + ongoing.**

### R7 — Supply-chain enforcement

Remove `continue-on-error` from `pnpm audit`. Add gitleaks at all three layers, Trivy image
scanning, CycloneDX SBOM generation, and a licence-compliance gate enforcing `TRD.md § 1`.
**Estimate: 3 days.**

### R8 — Decompose the god classes

`advanced-finance.controller.ts` (8,283 lines) splits into sub-controllers by resource, with all
logic moved into focused services. Add an ESLint `max-lines` rule (800 for services, 400 for
controllers) applied to **new and modified** files only, so it does not block existing work.
**Estimate: 2 weeks.**

### R11 — Convert the 92 `Float` monetary fields to `Decimal(19,4)`

Highest correctness risk per unit of effort in the entire programme. Each conversion is an
expand→backfill→contract migration (add the `Decimal` column, dual-write, backfill with
explicit rounding, switch reads, drop the `Float`). **Audit any historical data already stored
through these columns for accumulated error before converting** — the migration preserves the
existing wrong value, it does not correct it. The policy gate now blocks any _new_ `Float`
money field permanently. **Estimate: 2 weeks.**

### R12 — Eliminate unsafe raw SQL; guard every route

Review all 10 `$queryRawUnsafe` / `$executeRawUnsafe` sites: convert to parameterised
`$queryRaw` tagged templates, and confirm each runs on the tenant-scoped transaction client.
**Treat any site that can read across tenants as a Critical incident, not a refactor.** Then
work the 1,889 unguarded routes down via the ratchet, adding `@Permissions` (or an explicit
`@Public` for genuinely public endpoints, so the intent is recorded rather than implied).
**Estimate: 1 week for raw SQL, ongoing for the routes.**

### R9 — Operability

Define SLOs (availability, latency, error rate) per critical journey. Alert rules and Grafana
dashboards committed as code. A runbook per alert. Error budget policy: budget exhausted ⇒
feature work pauses for reliability work. **Estimate: 2 weeks.**

### R10 — Prove scale

Publish a capacity model. Run the load suite at 10× current target and record the result.
Add PgBouncer. Partition the four obvious high-volume tables. Route reporting to a read
replica. **Estimate: 3 weeks.**

---

## 6. Projected trajectory

| Milestone                                    | Overall score | Gate                                             |
| :------------------------------------------- | :-----------: | :----------------------------------------------- |
| Today                                        |    **5.4**    | —                                                |
| R1 ratchet live + R3 + R4 + R5 + R7 complete |    **6.8**    | Bleeding stopped; deploys safe; isolation proven |
| R2 + R6 + R8 complete, `@ts-nocheck` ≤ 50%   |    **7.6**    | Codebase legible to humans and agents again      |
| `@ts-nocheck` = 0, coverage ≥ 80% enforced   |    **8.5**    | Every claimed guarantee is mechanically proven   |
| R9 + R10 complete, scale demonstrated        |    **9.0**    | Genuinely decade-ready                           |

**Realistic timeline to 8.5: one focused quarter.** The architecture does not need to change.
The discipline does.

---

## 7. The honest summary

**What you have built is more architecturally sound than most commercially funded ERP attempts
I have seen.** The module boundaries, the outbox, the RLS design, the local-first AI, the
token system, the schema-driven frontend — these are not beginner decisions. Someone made the
right call repeatedly on questions where the wrong call is easier.

**What you do not yet have is proof that any of it works.** A financial system's value is
entirely in its guarantees, and every guarantee here is currently unenforced. The 100%
`@ts-nocheck` coverage is the clearest possible symptom: at some point, shipping features
became more important than knowing the features were correct.

**For a decade-scale platform, that trade must be reversed permanently, starting now.** The
good news is that this is the recoverable failure mode. Bad architecture requires a rewrite.
Suspended discipline requires a quarter.

**Recommendation: freeze net-new module development. Run Phase 0 to completion. Then build
features on a foundation that can actually carry them for ten years.**

---

## 8. Amendment log

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | By          |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| 2026-08-06 | This document had not been amended since the initial assessment, while `CLAUDE.md` went on quoting its headline — "5.4/10, 100% `@ts-nocheck`" — as every agent's standing priority for two days after those numbers reached zero. A review that is never amended stops describing the system and starts misdirecting the people working on it. The measured state now lives in `docs/PLATFORM_ARCHITECTURE.md` § 14 and is not duplicated here: `@ts-nocheck` 0, unguarded routes 0, `Float` money 0, RLS verified over a `NOBYPASSRLS` role, `pnpm verify` 15/15. R1–R4 are closed; what remains of Phase 0 is presentational debt (309 colours, 2,315 pixel declarations) plus one reviewed raw-SQL exception. Findings F1–F10 stand as written — they are the record of what was found, not a live status board. | Claude Code |
| 2026-07-30 | Initial assessment: 5.4/10. Ten findings, ten remediation items.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Claude Code |


