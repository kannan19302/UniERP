> **Migration status:** Legacy master TRD retained as input evidence; the new product suite and ADRs are authoritative.

# TRD — UniERP Technical Requirements Document

> **Every technology, from a developer's laptop to production.** One file. Amended, never replaced.
> Established 2026-07-30 · Read `README.md` § 0 before editing.

---

## 1. The open-source mandate (Requirement 0)

**Top priority, overriding all other technical preferences: every component required to run
UniERP in production must be free, open-source, and self-hostable.**

Concretely:

1. **No component may require a paid licence, a hosted-only SaaS account, or a proprietary
   runtime to operate in production.** If it cannot run in a customer's own datacentre with
   no outbound calls to a vendor, it cannot be a dependency.
2. **Managed services are an optional convenience, never a requirement.** We may _support_
   AWS S3 — we must _run on_ MinIO. We may _support_ SendGrid — we must _run on_ Postfix.
3. **Proprietary integrations are always at the edge**, behind an adapter interface, always
   optional, never in a critical path. Stripe is an _adapter_, not a _dependency_.
4. **Licence compatibility is enforced in CI.** Permitted: MIT, Apache-2.0, BSD-2/3, ISC,
   MPL-2.0, PostgreSQL, LGPL (dynamic linking only). Requires an ADR: AGPL, SSPL, BUSL,
   Elastic, "Commons Clause", or any source-available licence. Forbidden: anything with a
   field-of-use or user-count restriction.
5. **Every proprietary adapter ships with a working open alternative in the same release.**
6. **AGPL-3.0 is generally rejected.** If we include an AGPL dependency, any tenant running UniERP and adding their own custom code or extensions would be forced to open-source their proprietary business logic under the AGPL. This makes the platform legally toxic for commercial marketplace use and self-hosters building private extensions.

| Concern            | Open default (mandatory, must work)                            | Optional proprietary adapter            |
| :----------------- | :------------------------------------------------------------- | :-------------------------------------- |
| Database           | PostgreSQL 16 + pgvector                                       | — (none permitted)                      |
| Cache / queue      | Redis 7 (or Valkey)                                            | —                                       |
| Object storage     | MinIO (S3 API)                                                 | AWS S3, Cloudflare R2, Backblaze B2     |
| Email delivery     | Postfix / Mailu / Maddy over SMTP                              | SES, SendGrid, Postmark, Resend         |
| Identity provider  | Keycloak / Authentik / Zitadel (OIDC + SAML)                   | Google Workspace, Microsoft Entra, Okta |
| AI inference       | Ollama (Llama, Mistral, Qwen — runs on-prem)                   | Anthropic, OpenAI, Azure OpenAI         |
| Payments           | Manual + bank-file reconciliation                              | Stripe, Razorpay, Adyen                 |
| Metrics            | Prometheus + Grafana                                           | Datadog, New Relic                      |
| Tracing            | OpenTelemetry + Jaeger/Tempo                                   | Honeycomb, Lightstep                    |
| Errors             | GlitchTip (Sentry-protocol compatible)                         | Sentry SaaS                             |
| Logs               | Loki + Promtail                                                | Elastic Cloud, Splunk                   |
| Search             | PostgreSQL FTS + pgvector                                      | Elasticsearch, Typesense                |
| CI/CD              | Forgejo Actions / Woodpecker (self-host); GitHub Actions today | GitHub Enterprise                       |
| Container registry | Harbor                                                         | GHCR, ECR                               |
| Orchestration      | Docker Compose → K3s/Kubernetes                                | EKS, AKS, GKE                           |
| Secrets            | SOPS + age, or OpenBao (Vault fork)                            | AWS Secrets Manager                     |
| SMS                | Self-hosted gateway / SMPP                                     | Twilio, SNS                             |

> **Note on today's reality:** the program currently uses GitHub (hosting + Actions), which is
> proprietary. This is an accepted, logged exception: it is _development_ infrastructure, not
> a _production runtime_ dependency, and the entire pipeline is expressed in portable
> primitives (containers + shell + Node scripts) so it can be moved to Forgejo Actions or
> Woodpecker without rewriting the build. See § 9 ADR-002.

---

## 2. Language and runtime

| Concern             | Choice         | Version              | Why                                                                                                                                                 |
| :------------------ | :------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| Language            | TypeScript     | 5.7+, `strict: true` | One language across API, web, mobile bridge, scripts, and tooling. Shared types and Zod validators are the same objects on both sides of the wire.  |
| Runtime             | Node.js        | 22 LTS               | LTS support window, native fetch/test runner, stable ESM.                                                                                           |
| Package manager     | pnpm           | 9.15+                | Content-addressed store, strict hoisting (catches phantom dependencies), first-class workspaces.                                                    |
| Build orchestration | Turborepo      | 2.3+                 | Content-hash caching and dependency-aware task graph; a full-monorepo typecheck stays viable at this size.                                          |
| Mobile              | Flutter / Dart | 3.x                  | One codebase for iOS and Android with genuinely native performance; the only mature open cross-platform option that does not carry a JS-bridge tax. |
| Desktop             | Tauri          | 2.x                  | Rust core + system webview: ~10 MB binaries vs Electron's ~150 MB, smaller attack surface, reuses the web app.                                      |

**Forbidden:** `any` (use `unknown` + a type guard), `@ts-ignore`, `@ts-nocheck`,
non-null assertion (`!`) on values crossing a trust boundary, and `eval` in any form.

---

## 3. Backend

| Layer               | Technology                                                               | Notes                                                                                                                                        |
| :------------------ | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework           | **NestJS 11**                                                            | DI container, module boundaries, guards/interceptors/pipes map exactly onto our cross-cutting needs (tenancy, RBAC, audit, validation).      |
| HTTP                | Express (Nest platform)                                                  | Fastify migration is a logged future option, not a current need.                                                                             |
| ORM                 | **Prisma 6**                                                             | Type-safe client generated from schema; migration history is the audit trail of the data model.                                              |
| Validation          | **Zod**                                                                  | Single schema shared with the frontend. DTO ⇄ form validation cannot drift.                                                                  |
| API style           | REST + OpenAPI 3.1                                                       | Versioned at `/api/v1`. Client types are **generated**, never hand-written.                                                                  |
| Realtime            | Socket.IO over Redis adapter                                             | Horizontally scalable presence and live updates.                                                                                             |
| Jobs                | **BullMQ** on Redis                                                      | Retries, backoff, rate limits, repeatable/cron jobs, dead-letter queue.                                                                      |
| Events              | **Transactional outbox** in PostgreSQL                                   | The only permitted mechanism for critical cross-module facts. In-memory `EventEmitter2` is for non-critical, same-process notification only. |
| Auth                | **Auth.js** + `@kannan19302/auth`                                              | Sessions, OAuth/OIDC, SAML, TOTP MFA (`otplib`).                                                                                             |
| Security middleware | `helmet`, `@nestjs/throttler`, CSRF double-submit, strict CORS allowlist | Non-negotiable, never disabled.                                                                                                              |
| Logging             | **Pino** (structured JSON)                                               | Correlation ID + tenant ID on every line. `console.log` is banned.                                                                           |
| Metrics             | `prom-client` → Prometheus                                               | RED metrics per endpoint, business metrics per module.                                                                                       |
| Tracing             | OpenTelemetry SDK → OTLP                                                 | Traces span HTTP → service → Prisma → queue.                                                                                                 |
| Files               | `@aws-sdk/client-s3` against MinIO                                       | S3 API only; never a provider-specific feature.                                                                                              |
| Documents           | `pdfkit`, `exceljs`                                                      | Server-side PDF and spreadsheet generation.                                                                                                  |
| Email               | `nodemailer` over SMTP                                                   | Provider-agnostic by construction.                                                                                                           |

### Module structure (mandatory, identical for every module)

```
apps/api/src/modules/<module>/
├── <module>.module.ts        # Nest module: imports, providers, controllers
├── <module>.controller.ts    # HTTP only — no business logic, ever
├── <module>.service.ts       # Business logic; the only layer that touches Prisma
├── dto/                      # Zod schemas + inferred types
├── entities/                 # Domain types
├── events/                   # Outbox event definitions + handlers
├── guards/                   # Module-specific authorization (rare)
└── tests/                    # *.service.spec.ts, *.controller.spec.ts
```

**Boundary rule:** modules never import each other's internals. Cross-module communication is
by domain event, or through an explicitly approved integration port. `pnpm architecture:check`
(dependency-cruiser + a custom boundary script) rejects violations and dependency cycles
mechanically.

---

## 4. Frontend

| Layer               | Technology                                           | Notes                                                                                                                                                                     |
| :------------------ | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework           | **Next.js 15**, App Router                           | Server Components cut client bundle size; streaming and route-level code splitting matter at ERP screen counts.                                                           |
| UI runtime          | React 19                                             | —                                                                                                                                                                         |
| Design system       | **`@kannan19302/ui-*` (14 packages)**                      | Our own system, not a third-party ERP's look. Tokens, theme, components, layout, charts, data-grid, dashboard, notifications, hooks, utils, icons, form-engine, workflow. |
| Primitives          | Radix UI                                             | Unstyled, accessible, keyboard-correct. We own all visuals.                                                                                                               |
| Styling             | CSS Modules + design tokens as CSS custom properties | No Tailwind (token indirection is deliberate), no CSS-in-JS runtime cost. **Hardcoded hex or px in application code is a build failure.**                                 |
| Schema-driven pages | **`@kannan19302/framework`**                               | List/detail/form pages are declared from a schema, not hand-built. This is what makes 45 modules maintainable.                                                            |
| Server state        | TanStack Query                                       | Caching, invalidation, optimistic updates.                                                                                                                                |
| Client state        | Zustand                                              | Only for genuinely client-side UI state.                                                                                                                                  |
| Charts              | Recharts                                             | Composable, SSR-friendly.                                                                                                                                                 |
| Flow/diagram        | `@xyflow/react`                                      | Workflow builder canvas.                                                                                                                                                  |
| Drag & drop         | `dnd-kit`                                            | Accessible, keyboard-operable.                                                                                                                                            |
| Icons               | `lucide-react`                                       | One family, consistently sized.                                                                                                                                           |
| Tables              | Shared `DataTable` from `@kannan19302/ui`                  | Hand-rolled `<table>` markup in a page is a review rejection. Server-side pagination is the default.                                                                      |

---

## 5. Data layer

| Concern       | Choice                                       | Detail                                                                                                                            |
| :------------ | :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| Database      | **PostgreSQL 16** (`pgvector/pgvector:pg16`) | RLS, partitioning, `JSONB`, full-text search, `LISTEN/NOTIFY`, logical replication, pgvector — the reason this is not negotiable. |
| Vectors       | pgvector                                     | Embeddings live beside the rows they describe, so RLS protects them automatically. No second datastore to secure.                 |
| Migrations    | Prisma Migrate                               | `db:migrate` (dev) → `db:deploy` (prod). **`db:push` is disabled at the script level.** Drift fails startup closed.               |
| Connections   | PgBouncer (transaction pooling)              | Required above ~200 concurrent app instances.                                                                                     |
| Cache / queue | Redis 7                                      | Sessions, rate limits, BullMQ, Socket.IO adapter, hot-read cache.                                                                 |
| Storage       | MinIO (S3 API)                               | Per-tenant prefix isolation, server-side encryption, versioning, lifecycle rules.                                                 |
| Search        | Postgres FTS + pgvector hybrid               | No separate search cluster until proven necessary.                                                                                |

Full data model, tenancy, encryption, and retention design: `BACKEND_SCHEMA.md` (legacy reference: `BACKEND_SCHEMA.md`).

---

## 6. AI infrastructure

| Concern               | Choice                                                                                                      | Notes                                                                                                   |
| :-------------------- | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| Local inference       | **Ollama**                                                                                                  | Default and mandatory path. Llama 3.x / Mistral / Qwen. Customer data never leaves the tenant boundary. |
| Embeddings            | `nomic-embed-text` via Ollama                                                                               | Stored in pgvector, protected by the same RLS as the source row.                                        |
| Optional cloud        | Anthropic / OpenAI adapters                                                                                 | **Opt-in per tenant**, off by default, with an explicit data-processing consent record.                 |
| Prompt/response audit | Every AI call logged: tenant, user, model, prompt hash, tokens, latency, outcome                            | Required for compliance and for cost control.                                                           |
| Guardrails            | Permission-scoped retrieval; no AI-initiated financial mutation; every suggestion attributed and reversible | See `PRD.md § 5.3`.                                                                                     |

---

## 7. Infrastructure, build, and hosting

### 7.1 Environments

| Env            | Purpose                    | Data                         | Deploy trigger                                |
| :------------- | :------------------------- | :--------------------------- | :-------------------------------------------- |
| **local**      | Developer machine          | Seeded synthetic             | `docker compose -f docker-compose.dev.yml up` |
| **ci**         | Ephemeral per pipeline run | Fresh migrate + seed         | Every push/PR                                 |
| **staging**    | Pre-production mirror      | Anonymised production-shaped | Auto on green `main`                          |
| **production** | Live                       | Real                         | Manual approval on a tagged release           |

### 7.2 Containers

- Multi-stage Dockerfiles; distroless or Alpine final stage; **non-root user**; read-only
  root filesystem; no build tooling in the runtime layer.
- Pinned base image digests (not floating tags).
- Health endpoints: `/health/live`, `/health/ready`, `/metrics`.
- SBOM (CycloneDX) generated and attached per image; images signed with cosign.

### 7.3 Orchestration path

`docker compose` (local, single-node) → **K3s** (small production) → full Kubernetes (scale).
Manifests are plain YAML + Kustomize overlays. Helm only if a chart must be published for
third parties.

### 7.4 Reference production topology

```
                        ┌──────────────┐
   Internet ──TLS──▶    │   Traefik    │  (open source; ACME/Let's Encrypt, WAF rules)
                        └──────┬───────┘
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        ┌───────────┐   ┌────────────┐   ┌──────────────┐
        │ web (N×)  │   │ api (N×)   │   │ verticals(4) │
        │ Next.js   │   │ NestJS     │   │ NestJS svcs  │
        └───────────┘   └─────┬──────┘   └──────┬───────┘
                              │                 │
        ┌──────────┬──────────┼─────────┬───────┴────┐
        ▼          ▼          ▼         ▼            ▼
   ┌─────────┐ ┌───────┐ ┌────────┐ ┌────────┐ ┌──────────┐
   │Postgres │ │ Redis │ │ MinIO  │ │ Ollama │ │ Postfix  │
   │ +pgvec  │ │       │ │        │ │        │ │          │
   │ primary │ │       │ │        │ │        │ │          │
   │ +replica│ │       │ │        │ │        │ │          │
   └─────────┘ └───────┘ └────────┘ └────────┘ └──────────┘

   Observability: Prometheus + Grafana + Loki + Tempo + GlitchTip
```

### 7.5 Backup and recovery

- Continuous WAL archiving to object storage; **RPO ≤ 5 minutes**.
- Nightly full base backup; 30 daily / 12 monthly / 7 yearly retention.
- **A backup that has not been restored is not a backup** — automated monthly restore
  verification into a scratch instance, asserting row counts and a checksum. Failure pages
  the on-call.
- **RTO ≤ 1 hour**, rehearsed quarterly and logged in `CHANGELOG.md`.

---

## 8. CI/CD — the deployment contract

> **The binding rule: no code with a failing check reaches the remote repository, and no
> artifact with a failing check reaches an environment.** Enforcement is mechanical at three
> layers because any single layer can be bypassed.

### Layer 1 — pre-commit (fast, local, seconds)

`lint-staged` → ESLint `--fix` + Prettier on staged files; commitlint on the message;
a secret scan (gitleaks) on the staged diff.

### Layer 2 — pre-push (the local blocking gate, `scripts/ci/verify.mjs`)

Runs the **same** gate set as CI, so a green local push is a green pipeline:

| #   | Gate                    | Fails the push on                                                                                          |
| :-- | :---------------------- | :--------------------------------------------------------------------------------------------------------- |
| 1   | Branch policy           | Direct push to `main`                                                                                      |
| 2   | Secret scan             | Any credential-shaped string in the diff                                                                   |
| 3   | **Suppression ratchet** | Any _increase_ in `@ts-nocheck` / `@ts-ignore` / `eslint-disable` / `any` counts vs the committed baseline |
| 4   | Lint                    | Any ESLint error                                                                                           |
| 5   | Typecheck               | Any TypeScript error                                                                                       |
| 6   | Architecture            | Cross-module import, dependency cycle, boundary violation                                                  |
| 7   | Migration discipline    | Edited historical migration, `db:push` usage, schema/migration drift                                       |
| 8   | Design tokens           | Hardcoded hex or px in application code                                                                    |
| 9   | Unit tests              | Any failing test                                                                                           |
| 10  | Build                   | API or web build failure                                                                                   |

`--no-verify` is detectable and is treated as a policy violation; CI re-runs every gate
server-side, so bypassing locally only defers the failure.

### Layer 3 — CI (`.github/workflows/ci.yml`)

Every gate above, plus: coverage threshold, dependency licence scan, `pnpm audit`
(**high/critical fail the build** — no `continue-on-error`), CodeQL SAST, Trivy image scan,
SBOM generation, E2E suite, and the k6 smoke load test.

### Layer 4 — CD (`.github/workflows/cd.yml`)

```
green main
   └─▶ build + sign images, publish SBOM
        └─▶ deploy staging (automatic)
             └─▶ smoke + migration dry-run against a staging clone
                  └─▶ manual approval (GitHub Environment protection)
                       └─▶ production: migrate → blue/green rollout → health gate
                            └─▶ automatic rollback if health/error-rate gate fails
```

**Deployment invariants:**

- Migrations are **expand → migrate → contract**; every migration is backward-compatible with
  the previously deployed application version for one release.
- No destructive DDL in an automated deploy. Column/table drops require a separate, approved,
  manually-triggered release.
- Every deploy is a signed, immutable, SBOM-carrying image tagged with its commit SHA.
- Rollback is a redeploy of the previous SHA and must complete in under 5 minutes.
- Production secrets never touch CI logs; they are injected at runtime from OpenBao/SOPS.

### Branch protection (must be configured on every remote)

`main` requires: PR review, all status checks green, linear history, signed commits, no force
push, no deletion, and — critically — **administrators are not exempt**.

---

## 9. Architecture Decision Records

> Append here. Never delete or renumber. A decision that is reversed gets a new ADR that
> supersedes the old one; the old one stays with status `SUPERSEDED BY ADR-nnn`.

**ADR-001 — PostgreSQL only, no database abstraction layer.** `ACCEPTED 2026-07-30.`
We depend on RLS, pgvector, `JSONB`, partitioning, and `LISTEN/NOTIFY`. Supporting a second
engine would forbid all of them and roughly halve delivery velocity. _Consequence:_ MySQL and
Oracle shops are not addressable. Accepted.

**ADR-002 — GitHub as development infrastructure, with a portability guarantee.**
`ACCEPTED 2026-07-30.` GitHub is proprietary and therefore in tension with § 1. It is
permitted because it is not a production runtime dependency. _Mitigation:_ the entire pipeline
is expressed in containers, shell, and Node scripts — no GitHub-proprietary build features —
so migration to Forgejo Actions or Woodpecker is a workflow-file rewrite, not a re-architecture.
Reviewed annually.

**ADR-003 — Modular monolith, not microservices, for the core.** `ACCEPTED 2026-07-30.`
`apps/api` stays one deployable. Distributed transactions across finance, inventory, and sales
would be the dominant source of correctness bugs. Extraction must be _earned_ — it requires a
stable contract, outbox delivery, explicit data ownership, verified tenant isolation, an SLO
and runbook, and a rehearsed cutover. The four verticals are extracted because they meet this
bar and have genuinely independent lifecycles.

**ADR-004 — Local-first AI via Ollama.** `ACCEPTED 2026-07-30.`
ERP data is the most sensitive data a company holds. Requiring it to be sent to a third-party
model provider would disqualify us from healthcare, government, and EU-regulated buyers.
_Consequence:_ we accept lower peak model quality as the default, and offer cloud models as an
explicit per-tenant opt-in.

**ADR-005 — Type-suppression ratchet instead of a big-bang `@ts-nocheck` removal.**
`ACCEPTED 2026-07-30.` All 3,241 application source files currently carry `@ts-nocheck`.
Removing it in one change would surface tens of thousands of errors and freeze delivery for
months. Instead: a committed baseline count, a CI gate that fails on any increase, and a
mandatory per-module reduction quota on every feature cycle. See
`ARCHITECTURE_REVIEW.md § R1` (legacy reference: `ARCHITECTURE_REVIEW.md`). _This is the program's highest-priority
technical debt and the ratchet may not be relaxed._

**ADR-006 — The suppression ratchet scans whole workspaces, and its baseline was re-established
once to make that possible.** `ACCEPTED 2026-08-04.`

`scripts/ci/check-suppressions.mjs` previously scanned a hand-written list of four paths:
`apps/api/src`, `apps/web/app`, `apps/web/src`, `packages`. When the platform split introduced
`apps/idp`, `apps/console`, `apps/developer` and `apps/extensions`, every one of them fell
outside that list. Roughly 480 `any` occurrences and four `@ts-nocheck` files were invisible
while the gate still reported green — including `@ts-nocheck` on all four extension entrypoints,
which only surfaced under a manual scan. **A ratchet that a new directory can walk around is not
a ratchet**, and this is precisely the failure mode ADR-005 exists to prevent.

_Decision:_ the scan roots become the pnpm workspace roots — `apps` and `packages` — so any
future application or package is covered by construction rather than by remembering to edit a
list.

_Consequence, stated plainly:_ this is the one and only permitted upward movement of the
baseline, and it is a **coverage** change, not a debt increase. The counted total rises from
12,493 to 13,009 `any` because ~484 pre-existing occurrences became visible for the first time;
the remaining +32 is genuine new debt from the split and is owed back under the normal quota.
`@ts-nocheck` remains at 0 across the wider scope. From this baseline the numbers may only fall,
as ADR-005 requires. Any future increase still needs its own ADR.

**Amendment, 2026-08-04 — the builder UI is duplicated, and the count reflects that.**
The platform split moved the builder _pages_ into `apps/developer` but left the components,
stores and hooks they import in `apps/web`, so `apps/developer` did not compile at all. The
25 component files were copied across to make it build. That duplication is counted twice by the
ratchet — a further +54 `any` for code that already existed — and is folded into this baseline
rather than hidden.

It is temporary debt with a known resolution, recorded so it is not mistaken for new code: the
authoring surfaces (`PageBuilderWorkspace`, `BuilderSidebar`, `BuilderProperties`, the editor
workspaces) belong to `apps/developer`, while the runtime renderers (`PublicPageRenderer`,
`DynamicFormRenderer`, `blocks/*`) are consumed by six `apps/web` pages — published tenant sites,
public forms and custom module routes — and must be **extracted into a shared package**, not
copied. Until that extraction, edits must be made in both places. Deleting either copy today
breaks a build.

**ADR-007 — The hardcoded-pixel ratchet counts declarations, not lines, and its baseline is
re-expressed once in that unit.** `ACCEPTED 2026-08-06.`

`Static (format)` had been failing on the Phase 0–3 branch: 202 files were unformatted, 155 of
them CSS. Running the repository's own formatter over them expanded single-line rules —
`.s2 { height: 16px; width: 16px; }` became three lines — and the pixel ratchet, which counted
one hit per matching **line**, rose from 2,257 to 2,324. Not one hardcoded pixel had been
written.

**A gate that fails on `pnpm format` is measuring the wrong thing.** Both obvious ways out are
worse than the problem: bumping the baseline to absorb 67 phantom violations destroys the meaning
of the number, and skipping the formatting leaves a CI check red for the life of the branch. The
rule is about pixel values, and the unit of a pixel value is a declaration — one property, one
value — which is the same count however the file is wrapped.

_Decision:_ `hardcodedSpacing` counts declarations. Comments are stripped, custom-property
definitions (`--space-4: 16px`) stay exempt because a token definition is exactly where a pixel
value belongs, and `0px`/`1px` hairlines remain permitted.

_Consequence, stated plainly:_ the baseline moves from **2,257 (lines) to 2,315 (declarations)**,
and this is a change of unit, not of debt. It is measured, not asserted: the new counter run
against the tree **before** the formatting commit reports 2,315, and against the tree after it
reports 2,315. The formatting added zero. From this baseline the number may only fall, and any
future increase still needs its own ADR.

The 2,315 remain genuinely owed. § 14's reasoning stands: unlike the 1,296 exact spacing values
already migrated, these are odd values with no token, font sizes, border widths and pixels inside
TSX, and substituting them needs visual-regression coverage that does not yet exist. This ADR
makes the number trustworthy; it does not make it acceptable.

**ADR-008 — 10-Platform Architecture over a Unified Backend.** `ACCEPTED 2026-08-16.`
UniERP has been restructured from a monolithic presentation tier into 10 discrete frontend applications (Marketing, Provider OS, Tenant ERP, Tenant Sites, Web Studio, Tenant Admin, Marketplace, Developer, Mobile, Desktop). 
*Decision:* These 10 platforms will share exactly one backend (`unierp-api`) and one identity provider (`unierp-idp`). We will not build 10 separate backend services. 
*Why:* A single backend guarantees that cross-platform interactions (e.g., buying an app in the Marketplace and using it in the Tenant ERP) operate on a single source of truth within a single transactional boundary, preventing distributed data anomalies.
*Consequence:* The UI layer is highly decoupled and role-specific, while the service tier remains a majestic monolith. Ports are strictly allocated (4001-4010) to prevent local development collisions.

---

## 10. Amendment log

| Date       | Change                                                         | By          |
| :--------- | :------------------------------------------------------------- | :---------- |
| 2026-07-30 | Document established; replaces the deleted `.ai/` document set | Claude Code |
| 2026-08-16 | Added ADR-008 (10-platform architecture)                       | Antigravity |


