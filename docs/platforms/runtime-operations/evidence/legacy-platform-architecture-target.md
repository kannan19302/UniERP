> **Migration status:** Legacy target-state architecture. Current platform boundaries and ADRs are authoritative; measured claims and proposed topology here require current verification.

# UniERP — Platform Architecture (Target State)

> **Scope.** The layered hybrid repository architecture, plane separation, extension platform,
> and migration programme that takes UniERP from "an ERP application with SaaS features bolted
> on" to "a multi-tenant application platform that happens to ship an ERP as its first-party app
> suite."
>
> Assessed against the measured contents of the six repositories on 2026-08-02, at tag
> `v1.0.0`. This document is the **target** and the **route**. The honest current-state
> assessment lives in `ai/ARCHITECTURE_REVIEW.md` (legacy reference: `ai/ARCHITECTURE_REVIEW.md`) and is not
> restated here; the two are read together.
>
> **Governing constraint:** this is not a rewrite. Every decision below is reachable by
> incremental, backward-compatible steps from `v1.0.0`, and each step is individually
> revertable.
>
> **Revision 2 (2026-08-02):** § 4 replaced. The topology is now a **fully split, strictly
> layered 15-repository architecture** rather than the 4-repository consolidation in revision 1.
> §§ 7, 12, 13, 14, 16, 17 are revised to carry the mechanisms that split demands. The rationale
> for the change, and the four mechanisms that make it safe, are in § 4.1–4.5.

---

## 0. Rollback baseline

Before any change described here, the stable state was frozen:

| Repository                 | Branch   | `v1.0` branch | Tag      |
| :------------------------- | :------- | :------------ | :------- |
| `ERPSys`                   | `main`   | existing      | `v1.0.0` |
| `unierp-app-education`     | `main`   | created       | `v1.0.0` |
| `unierp-app-fieldservice`  | `main`   | created       | `v1.0.0` |
| `unierp-app-healthcare`    | `main`   | created       | `v1.0.0` |
| `unierp-app-realestate`    | `main`   | created       | `v1.0.0` |
| `unierp-corporate-website` | `master` | created       | `v1.0.0` |

Full-programme rollback is `git checkout v1.0.0` in six repositories plus a database restore to
the pre-migration PITR marker. No step in § 14 removes that option. Every repository extracted
in § 14 carries its own `v1.0.0`-equivalent tag at the moment of extraction.

---

## 1. What the codebase actually is (measured, not assumed)

Design must start from evidence. These are counts taken from the tree at `v1.0.0`, not
estimates.

| Fact                                     | Measure                                                 |
| :--------------------------------------- | :------------------------------------------------------ |
| Repositories                             | 6 (1 monorepo + 4 vertical services + 1 marketing site) |
| API modules in `apps/api/src/modules`    | 45                                                      |
| Application code in those modules        | **655,100 lines**                                       |
| Workspace packages                       | 23 (`@kannan19302/*`), of which **14 are UI**                 |
| Prisma models / enums                    | 1,836 / 65, in a **single 40,577-line file**            |
| `@ts-nocheck` files                      | 3,241 of 3,241 (**100%**)                               |
| Tenant tables without an RLS policy      | 364 of 1,029 (**35%**)                                  |
| Controller routes without `@Permissions` | 1,889 of 14,225 (**13.3%**)                             |
| Monetary fields typed `Float`            | 92                                                      |
| Clients                                  | Next.js 15 web, Flutter mobile, Tauri desktop           |

### 1.1 The size distribution is the architecture's real shape

Top ten modules by size, in thousands of lines:

```
crm               90.9  ██████████████████████████████
advanced-finance  69.5  ███████████████████████
inventory         57.6  ███████████████████
admin             34.9  ███████████
builder           30.5  ██████████
saas              29.7  ██████████
sales             25.9  ████████
advanced-hr       25.0  ████████
manufacturing     22.7  ███████
supply-chain      19.9  ██████
```

And the four **extracted microservices** — the ones that already have their own repositories,
their own Prisma schemas, their own Dockerfiles, their own CI, and their own release cadence:

```
real-estate        4.0  █
field-service      3.9  █
education          2.9  ▏
healthcare         2.8  ▏
```

Each satellite repo's `src/` is eleven files: a module, two controllers, two services, a health
controller, an events controller, a Prisma client, a tenant helper, and a scope guard.

**The repository boundaries that exist today were drawn around the four _smallest_ domains in
the system** — 13.6 KLoc in total, 2% of the codebase — while a 90 KLoc CRM, a 69 KLoc finance
engine, and a 57 KLoc inventory engine remain inside the monolith. `ai/TRD.md` ADR-003 states
that extraction must be _earned_ by "a stable contract, outbox delivery, explicit data
ownership, verified tenant isolation, an SLO and runbook, and a rehearsed cutover." None of the
four meets that bar. They were extracted because they were _easy to extract_, which is the
opposite of the criterion.

The cost is being paid now: six lockfiles, six CI pipelines, six dependabot streams (the
`prisma-7.9.1` / `typescript-7.0.2` bumps are open identically in all four), and six Dockerfiles
copy-pasted from `fieldservice` — as three of the four repos' most recent commits literally say
(`"fix(docker): correct EXPOSE port to 4104, was copy-pasted 4103 from fieldservice template"`).

**This is the evidence base for § 4.5.** A split topology is a legitimate choice; a split
topology without orchestration is what produced those three identical bug fixes. The
architecture below chooses the split _and_ pays for the orchestration.

### 1.2 The plane separation the requirement asks for does not exist yet

| Required plane                | Where it actually lives now                                                                           | Verdict                     |
| :---------------------------- | :---------------------------------------------------------------------------------------------------- | :-------------------------- |
| **1. Platform Admin Console** | `apps/web/app/(dashboard)/saas/*` — 33 route folders, inside the customer-facing dashboard shell      | 🔴 **Not separated at all** |
| **2. Tenant Admin Portal**    | `apps/web/app/(dashboard)/settings/*` (60+ routes) + `(dashboard)/saas-portal/*` (6 routes)           | 🟠 Split across two trees   |
| **3. Application Layer**      | `apps/web/app/(dashboard)/<module>` + `apps/api/src/modules/<module>` — 45 of each                    | 🟢 Genuinely modular        |
| **4. Developer Platform**     | `modules/builder` (30.5 KLoc), `modules/api-platform`, `(dashboard)/builder/{app-hub,erp,web,manage}` | 🟢 Exists, needs a boundary |

Plane 1 is the problem. **`/saas/clusters`, `/saas/resellers`, `/saas/maintenance`,
`/saas/feature-flags`, `/saas/migration`, and `/saas/white-label` are provider-only operations
served from the same Next.js application, the same session cookie, the same middleware, and the
same origin as a tenant user's invoice list.** The only thing standing between a customer and
platform-global control is a permission check in application code — and 13.3% of routes have no
permission decorator at all.

> #### 🔴 The "one authorization bug away" case was not theoretical — CONFIRMED AND FIXED 2026-08-02
>
> The first revision of this document said plane 1 was "one authorization bug away" from being
> customer-facing. It was not one bug away. It was already there. The chain, each link verified:
>
> 1. Every tenant's first user is seeded with the `SUPER_ADMIN` role carrying
>    `permissions: ["*"]` — `apps/api/src/modules/auth/auth.service.ts`, registration flow.
> 2. `hasPermission()` returned `true` for a bare `"*"` against **any** required permission —
>    `packages/shared/src/utils/index.ts`.
> 3. `SuperAdminController` is `@SkipTenantScope()` and says so in its own header comment:
>    _"Deliberately cross-tenant: this controller aggregates data across every tenant for the
>    platform operator (e.g. `prisma.user.count()` platform-wide)."_
> 4. It is gated by `@Permissions("system.tenant.read")` — which `["*"]` satisfied.
>
> **Any customer's own administrator could enumerate every tenant on the platform**, read tenant
> detail, list all admins, read platform analytics and system health, and reach `provisionTenant`
> and `updateTenant` on the same controller.
>
> What makes it conclusive rather than suggestive: **no seeded role grants `system.*`
> explicitly.** The tenant wildcard was not one of several paths to those endpoints — it was the
> only one.
>
> **Fix:** `system` and `platform` are now reserved control-plane namespaces. A control-plane
> permission is satisfied only by a grant that is itself inside a control-plane namespace. `*`
> means "everything in _my_ tenant", never "everything on the platform". Six regression tests
> cover the escalation path.
>
> #### 🔴 A second, independent path — also confirmed and fixed
>
> Fixing the first one immediately exposed a second. `TenantLifecycleController` is
> `@SkipTenantScope()` and **every route takes a `tenantId` straight from the URL**, yet it was
> guarded by `admin.tenant.export / suspend / unsuspend / offboard / purge`.
>
> `admin.*` is a **tenant** namespace, and the seeded `ADMIN` role carries exactly that grant. So
> any customer's _ordinary_ admin — not even their super admin — could suspend, fully export,
> offboard or purge any other tenant on the platform by id. `export` is the worst: a complete data
> export of an arbitrary tenant.
>
> **The reserved-namespace fix above did not close this**, because `admin.*` is not a
> control-plane namespace. One wrong permission string was enough to reopen the hole — which is
> the whole argument for not relying on a string.
>
> **Fix:** rescoped to `system.tenant.*`, plus a new `ControlPlaneGuard` applied to all three
> `@SkipTenantScope()` controllers. For any cross-tenant handler it fails closed when no
> permission is declared, **rejects any cross-tenant handler guarded by a tenant-scoped code** —
> making this defect unrepresentable rather than merely fixed — and audit-logs grants and denials.
>
> #### Why this is the argument for Phase 1, in two incidents
>
> A permission string was the only thing separating a customer from platform-global control. A
> wildcard defeated it; fixing that, a mis-scoped code defeated it again. Both were single points
> of failure in application code.
>
> The layers now stand at: (1) reserved namespace in permission matching, (2) `ControlPlaneGuard`
> asserting the boundary structurally. Phase 1 adds (3) separate origin, IdP realm, and restricted
> ingress. The § 4.2 repository split adds (4): once the console is its own deployable,
> **tenant-plane code cannot link against control-plane handlers at all**, and no authorization
> bug can reach them. That is the difference between a boundary that is enforced and one that is
> merely intended.

### 1.3 Naming entropy is a load-bearing signal

`apps/api/src/modules/saas` contains 154 files, including 60 that follow this pattern:

```
saas-deepening-apex-crown-seal.{controller,service}.ts
saas-deepening-apex-final-crown-pack.{controller,service}.ts
saas-deepening-pinnacle-apex-final.{controller,service}.ts
saas-deepening-quantum-final.{controller,service}.ts
saas-deepening-super-apex.{controller,service}.ts
…
```

These names encode no domain concept. They are accretion — capability added by appending a
superlative rather than by locating the concept in a bounded context. The same pattern appears
in `saas-portal` and `builder`.

**The developer platform in requirement 4 is a promise that third parties can navigate and
extend this system.** A module namespace that cannot be navigated by its own authors cannot be
published to partners. Renaming these into real bounded contexts is a _functional_ prerequisite
for the marketplace, not tidying. In a split topology it becomes more urgent, not less: a repo
boundary makes a bad name permanent, because renaming across a published package boundary is a
breaking change.

---

## 2. The five design forces

Everything in § 3 onward follows from these, in priority order.

1. **Trust boundaries, not domain boundaries, decide runtime deployment boundaries.**
   Provider-global operations and tenant-scoped operations have different blast radii, different
   auditors, and different attackers. That seam justifies a process boundary. Whether inventory
   and manufacturing are separate services does not.
2. **Business logic stays in one place.** Distributed transactions across finance, inventory, and
   sales are the dominant source of correctness bugs in ERP systems. `ai/TRD.md` ADR-003 holds
   this line and this design strengthens it: **the repository count rises to 15 while the backend
   deployable count stays at 1.** Repository topology and runtime topology are independent
   decisions and are decided independently here.
3. **Extension must be a first-class runtime concept, not a fork.** Customers extending the
   platform must never edit core source. That requires a stable extension contract, a sandbox,
   and a capability model — designed now, because retrofitting isolation onto customer code
   already running in-process is not possible.
4. **Every guarantee must be mechanically provable.** The current architecture is sound on paper
   and unproven in the repository. Structure that cannot be checked by a script will decay —
   and in a split topology, _the checks must work across repository boundaries_, because the
   compiler no longer does.
5. **Cost of change must fall over time.** Adding module 46 in 2030 should cost what module 46
   costs today. The _platform_ surface must be small, versioned, and stable; the _application_
   surface may be large and churning.

---

## 3. Runtime architecture — four planes, three deployables

Repository topology (§ 4) and runtime topology (§ 3) are deliberately different. Fifteen
repositories build three deployables.

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│  PLANE 0 — PUBLIC / UNAUTHENTICATED                                               │
│  marketing site · docs · status · tenant signup · published tenant websites       │
│  Deployable: www (Next.js)                     Trust: anonymous, no tenant data   │
└───────────────────────────────────────────────────────────────────────────────────┘
                                        │
┌───────────────────────────────────────┼───────────────────────────────────────────┐
│  PLANE 1 — CONTROL PLANE (internal)   │  PLANE 2/3 — TENANT PLANE (customer)      │
│  ─────────────────────────────────    │  ──────────────────────────────────       │
│  admin.unierp.internal                │  app.unierp.com  ·  *.customer-domain     │
│  Separate origin, separate cookie,    │  Tenant Admin Portal (plane 2)            │
│  separate IdP realm, mandatory MFA,   │  Application Layer   (plane 3)            │
│  IP-allowlisted, no public DNS        │  Developer Platform  (plane 4, in-tenant) │
│                                       │                                           │
│  Deployable: console (Next.js)        │  Deployable: web (Next.js)                │
└───────────────────────────────────────┴───────────────────────────────────────────┘
                    │                                       │
                    ▼                                       ▼
        ┌───────────────────────┐               ┌───────────────────────────┐
        │  /api/platform/v1     │               │  /api/v1                  │
        │  ControlPlaneGuard    │               │  TenantGuard + RLS        │
        └───────────┬───────────┘               └─────────────┬─────────────┘
                    └────────────────┬──────────────────────── ┘
                                     ▼
        ┌───────────────────────────────────────────────────────────────────┐
        │  unierp-api  —  THE MODULAR MONOLITH  (one deployable, two routers)│
        │                                                                   │
        │   platform/*   45 business modules   developer/*                  │
        │   tenancy      finance   crm         runtime  registry  sandbox   │
        │   billing      inventory sales       studio   automation  api-gw  │
        │   licensing    hr        projects                                 │
        │   flags        …                                                  │
        └───────────────────────────────────────────────────────────────────┘
                                     │
                 PostgreSQL 16 (RLS) · Redis · MinIO · Ollama · outbox
```

### 3.1 Why the control plane is a separate deployable but not a separate service

The console is a separate **frontend deployable on a separate origin** — different DNS,
different TLS certificate, different session cookie scope, different IdP realm,
network-restricted ingress. A customer's browser never receives control-plane JavaScript, never
holds a control-plane cookie, and cannot reach control-plane routes even with a stolen tenant
token.

The control plane's _business logic_ stays in `unierp-api`, exposed under a distinct router
(`/api/platform/v1`) behind a distinct guard:

- Tenant lifecycle, billing, and licensing read and write the same `Tenant`, `Subscription`, and
  `Plan` aggregates the tenant plane reads. Splitting them into a separate service means either
  a distributed transaction on every provisioning operation or a second database with a sync
  problem. Both are worse than a router boundary.
- The boundary is _enforceable today_ and _upgradeable later_: `/api/platform/v1` is a distinct
  Nest module tree with no imports from tenant modules, checked by `architecture:check`.
  Extracting it to its own process in 2029 is a deployment change, not a refactor.

**ADR-006 records this.**

### 3.2 The layering inside `unierp-api`

Clean Architecture at module granularity:

```
modules/<context>/
├── domain/            entities, value objects, domain events, invariants
│                      ← zero framework imports; no Prisma, no Nest, no HTTP
├── application/       use cases, ports (interfaces), transaction scripts
│                      ← depends only on domain/
├── infrastructure/    Prisma repositories, outbox publishers, adapters
│                      ← implements application/ ports
└── interface/         controllers, DTOs (Zod), presenters, event subscribers
                       ← depends on application/; never on infrastructure/
```

Dependencies point inward, always, enforced by `dependency-cruiser` rather than by review. The
rule is the deliverable; the folder convention is how the rule is expressed.

Today's flat `<module>.{controller,service}.ts` shape is a _degenerate case_ — a module where
domain and infrastructure are fused inside the service. Acceptable for CRUD, unacceptable for
finance. The rule is therefore **tiered** (§ 6.2).

---

## 4. Repository architecture — layered hybrid, fully split

### 4.1 The decision, and the change from revision 1

**Fifteen repositories, arranged in eight strictly ordered layers.**

Revision 1 of this document recommended consolidating to four repositories, on the grounds that
a repo boundary should be earned by a different release cadence or a different consumer. That
analysis was correct about the _cost_ of a split and is retained in § 4.5. The direction has
been reconsidered and set to full split, and the argument for it is legitimate:

- **A layered polyrepo makes the dependency graph physically acyclic.** In a monorepo, the rule
  "UI must not import from API" is a lint rule that a determined developer or agent can defeat.
  Across a published package boundary it is _impossible_ — you cannot import what is not in your
  `package.json`. For a platform intended to last twenty years and to be extended by third
  parties, structural impossibility is a stronger guarantee than an enforced convention.
- **It forces the public contract to be real.** Every boundary in § 4.2 is a published, versioned
  artifact. The extension API, the SDK, and the design system stop being internal folders that
  partners are told to treat as stable and become artifacts that _are_ stable, because breaking
  them breaks a published SemVer promise with an audit trail.
- **It matches the ownership model a platform organisation eventually needs.** Layer ownership
  maps to team ownership without renegotiation.

**The cost is real and is not waved away.** Full split trades three things: cross-boundary
compiler feedback, atomic multi-repo change, and single-lockfile dependency coherence. § 4.5
specifies the four mechanisms that replace them, and § 14 sequences the split so that **no
guarantee is given up before its replacement is in place.** That sequencing is the difference
between this working and this becoming the Dockerfile-copy-paste failure of § 1.1 at fifteen
times the scale.

### 4.2 The layer map

**The invariant that makes this future-proof: a repository may depend only on published
artifacts of a strictly lower layer. Never sideways within a layer. Never upward. No
exceptions.** A cycle is not "discouraged" — it is unrepresentable, because the lower layer's
package cannot name the higher one.

```
L7  OPERATIONS      unierp-workspace ─── unierp-infra
                            │  (orchestrates all; depended on by none)
────────────────────────────┼──────────────────────────────────────────────
L6  EXTENSIONS      unierp-extensions
────────────────────────────┼──────────────────────────────────────────────
L5  CLIENTS         unierp-mobile      unierp-desktop
────────────────────────────┼──────────────────────────────────────────────
L4  PRESENTATION    unierp-web    unierp-console    unierp-www
────────────────────────────┼──────────────────────────────────────────────
L3  SERVICE         unierp-api
────────────────────────────┼──────────────────────────────────────────────
L2  RUNTIME         unierp-data   unierp-framework   unierp-extension-api
────────────────────────────┼──────────────────────────────────────────────
L1  FOUNDATION      unierp-kernel   unierp-design-system   unierp-sdk
────────────────────────────┼──────────────────────────────────────────────
L0  CONTRACT        unierp-contracts
```

| L   | Repository                 | Publishes                                           | Depends on                      | Why it is its own repository                                                                                                                                                                   |
| --- | :------------------------- | :-------------------------------------------------- | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | **`unierp-contracts`**     | `@kannan19302/contracts`, `@kannan19302/events`                 | _nothing_                       | The single source of API, event, and entity truth. Zero dependencies is what makes it the root: it can never be made to depend on an implementation.                                           |
| 1   | **`unierp-kernel`**        | `@kannan19302/kernel`                                     | L0                              | Tenancy context, `PolicyEngine`, audit, outbox, idempotency, rate limiting, versioning, observability. The primitives every plane shares.                                                      |
| 1   | **`unierp-design-system`** | `@kannan19302/ui` (subpath exports)                       | —                               | Tokens → theme → components → charts → grid → forms → workflow, plus Storybook. Consumed by three frontends and by partner extensions.                                                         |
| 1   | **`unierp-sdk`**           | `@unierp/sdk` (TS), Python, Java, Go, `@unierp/cli` | L0                              | **Different consumers** (third parties), **different cadence**, must be installable without the platform. Generated, never hand-written.                                                       |
| 2   | **`unierp-data`**          | `@kannan19302/database`                                   | L0                              | Prisma multi-file schema, migrations, RLS policies, seeds, and the tenant-isolation test generator. The data model versions independently of the code that uses it.                            |
| 2   | **`unierp-framework`**     | `@kannan19302/framework`                                  | L0, L1                          | The schema-driven page runtime. First-party and customer modules render through the _same_ runtime — so it must be a published artifact, not an internal folder.                               |
| 2   | **`unierp-extension-api`** | `@kannan19302/extension-api`                              | L0, L1                          | The public contract customer code compiles against, plus the sandbox host interface. **3-year support, 12-month deprecation.** Its own repo because its promise outlives any platform release. |
| 3   | **`unierp-api`**           | container image                                     | L0, L1, L2                      | The modular monolith. `platform/` + `tenant/` + `modules/` + `developer/`. One deployable, two routers.                                                                                        |
| 4   | **`unierp-web`**           | container image                                     | L0, L1, L2, L3 _(SDK only)_     | Tenant Admin Portal + Application Layer.                                                                                                                                                       |
| 4   | **`unierp-console`**       | container image                                     | L0, L1, L2, L3 _(SDK only)_     | Platform Admin Console. **Separate repo reinforces the trust boundary**: console code cannot accidentally import a tenant component.                                                           |
| 4   | **`unierp-www`**           | container image                                     | L1 (design system)              | Marketing, docs, status, pricing. Ships daily; must never be able to break a payroll release. Already correctly separate today.                                                                |
| 5   | **`unierp-mobile`**        | IPA / APK                                           | SDK (Dart client)               | **Different language** (Dart), **different toolchain** (Gradle/Xcode/macOS runners), **different cadence** (app-store review).                                                                 |
| 5   | **`unierp-desktop`**       | MSI / DMG / AppImage                                | L4 `unierp-web` build output    | Tauri shell. Split from web at the artifact level, not the source level — it consumes web's build.                                                                                             |
| 6   | **`unierp-extensions`**    | signed extension bundles                            | `@kannan19302/extension-api` **only** | First-party apps including the four verticals, plus templates. **Depends on nothing but the public API** — that constraint is the proof the API is real.                                       |
| 7   | **`unierp-infra`**         | Kustomize, Terraform, Grafana, alerts, runbooks     | manifest only                   | Environment topology and operational assets.                                                                                                                                                   |
| 7   | **`unierp-workspace`**     | `platform-manifest.json`, `@unierp/cli-dev`         | all (build-time only)           | **The meta-repository.** Release train manifest, local dev orchestrator, golden-path integration CI, federated ratchet. § 4.5.                                                                 |

### 4.3 What the layering buys, concretely

| Property                                  | How the layering delivers it                                                                                                                                              |
| :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **No architectural drift, ever**          | `unierp-design-system` has no dependency on `unierp-api`, so a UI component _cannot_ import a service. Structurally, not by rule.                                         |
| **The extension API is honest**           | `unierp-extensions` depends on `@kannan19302/extension-api` and nothing else. If a first-party vertical needs a private hook, the build fails and the hook must be made public. |
| **Contract-first is not optional**        | `unierp-api` cannot define an endpoint that is not in `@kannan19302/contracts`, because the DTO type comes from the package.                                                    |
| **The data model versions independently** | `@kannan19302/database` can ship a migration ahead of the API that uses it — which is exactly what expand→migrate→contract requires.                                            |
| **Team ownership scales**                 | A layer is an ownership unit. Adding a team means adding a repo in the right layer, not renegotiating a monorepo CODEOWNERS file.                                         |
| **Blast radius is bounded**               | A break in L4 cannot reach L0. Failure propagates upward only.                                                                                                            |

### 4.4 What is deliberately _not_ split

- **The 45 business modules stay in `unierp-api`.** They are separated by _module_ boundaries,
  not repository boundaries. Finance, Inventory, and Commerce write to each other constantly
  (a stock movement posts a GL entry; an invoice reserves inventory). Splitting them means a
  distributed transaction on the most correctness-critical paths in the system. Extraction stays
  earned, per ADR-003, one module at a time, when a specific module proves an independent
  scaling or release profile. None currently does.
- **The control-plane API stays in `unierp-api`.** Per § 3.1 — the boundary is origin, realm,
  ingress, and guard. A second process would add a distributed transaction to every provisioning
  operation and close nothing further.
- **`unierp-infra` is not split per environment.** Overlays, not repositories. Splitting
  infrastructure from infrastructure is how the manifest and the app come to disagree.

### 4.5 The four mechanisms — what replaces the monorepo's guarantees

**This section is the load-bearing part of the split. Without all four, § 4.2 degrades into the
failure already measured in § 1.1.** Each is a Phase-2 deliverable and each is a hard gate.

#### M1 — The release train and the manifest _(replaces atomic change)_

`unierp-workspace/platform-manifest.json` pins the exact version of all fifteen repositories for
a dated train:

```jsonc
{
  "train": "2026.08.0",
  "components": {
    "contracts":     "3.2.0",
    "kernel":        "2.1.4",
    "design-system": "4.0.1",
    "sdk":           "3.2.0",
    "data":          "2026.08.0",
    "framework":     "1.9.2",
    "extension-api": "1.0.0",
    "api":           "2026.08.0",
    "web":           "2026.08.0",
    "console":       "2026.08.0",
    "mobile":        "2026.08.0",
    "extensions":    { "healthcare": "1.4.0", "education": "1.2.1", … }
  }
}
```

**A deploy is a manifest. A rollback is the previous manifest.** This restores the atomicity the
monorepo gave for free: the unit of release is the train, not the repository. Nothing is
deployed except by manifest; no environment ever runs an unpinned combination.

#### M2 — Consumer-driven contract tests _(replaces the compiler across boundaries)_

This is the mechanism that matters most, because it addresses the split's sharpest cost: **the
TypeScript compiler no longer sees across a repository boundary.**

Every consumer publishes a machine-readable expectation of what it uses from its providers. Each
provider's CI replays the full corpus of its consumers' expectations on every PR.

- `unierp-web` publishes the API operations, response shapes, and SDK symbols it consumes.
- `unierp-api` publishes the `@kannan19302/database` models and `@kannan19302/kernel` symbols it consumes.
- `unierp-extensions` publishes the extension-API surface it consumes.

A change in `unierp-contracts` that breaks `unierp-web` fails **in the contracts PR**, with the
name of the consumer and the symbol. Breakage is caught at author time, in the repo that caused
it — which is where a compiler would have caught it. Without M2 you find these at runtime in
staging, or worse.

#### M3 — Automated change choreography _(replaces the single PR)_

Changesets plus a topological release bot. Merging a change in a lower layer automatically opens
version-bump PRs in every direct dependent, in dependency order, with the changeset summary and
the CDC results attached.

The canonical multi-repo change — _add a field to an invoice_ — becomes:

```
1 human PR  →  unierp-contracts   (add the field to the schema)
   ↓ auto    →  unierp-sdk         (regenerate, publish)
   ↓ auto    →  unierp-data        (migration scaffold; human reviews the SQL)
   ↓ auto    →  unierp-api         (DTO regenerated; human implements the behaviour)
   ↓ auto    →  unierp-web         (typed field available; human adds the UI)
   ↓ auto    →  unierp-workspace   (manifest bumped, golden path runs)
```

Three human touchpoints instead of six, and the ordering is enforced by the bot rather than
remembered by a person. **This is what makes a fifteen-repo daily workflow tolerable, and it is
non-optional.**

#### M4 — Golden-path integration CI _(replaces the single test suite)_

`unierp-workspace` runs, on every manifest change and nightly:

composes the full manifest → applies migrations from `@kannan19302/database` → boots api + web +
console → runs the E2E suite for every journey in `ai/APP_FLOW.md` → runs the generated
two-tenant isolation suite → runs the k6 smoke test → replays the reference extension corpus
against the built platform.

**A manifest that has not passed the golden path is not deployable to any environment.** This is
the only place where the whole system is proven to work together, so it is the gate that matters
most and the one that may never be made advisory.

#### M4a — The federated suppression ratchet

Phase 0's `@ts-nocheck` ratchet is currently a single repo-level baseline. Split, it becomes a
per-repo baseline plus an **aggregate baseline in `unierp-workspace` that may never increase**.
Without the aggregate, fifteen individually-flat baselines can hide a rising total. The
aggregate is checked on every manifest update.

### 4.6 Naming, licensing, and repository conventions

| Convention        | Rule                                                                                                                                                                                                                     |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository name   | `unierp-<layer-role>`, lowercase, no product-marketing names                                                                                                                                                             |
| npm scope         | `@kannan19302/*` internal artifacts · `@unierp/*` public artifacts (SDK, CLI, extension-api)                                                                                                                                   |
| Default branch    | `main` everywhere (`unierp-www` renames from `master` during extraction)                                                                                                                                                 |
| Branch protection | PR review, all checks green, linear history, signed commits, **administrators not exempt** — identical in all 15                                                                                                         |
| Versioning        | SemVer per repo; L3–L5 additionally carry the dated train version                                                                                                                                                        |
| Governance files  | `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `GOVERNANCE.md`, `SECURITY.md` generated from `unierp-workspace` templates and drift-checked — **never hand-copied**, which is exactly how the Dockerfile bug of § 1.1 propagated |
| Shared CI         | Reusable workflows in `unierp-workspace`; a repo defines _which_ gates apply, never _how_ a gate works                                                                                                                   |

---

## 5. Tenant isolation and identity

### 5.1 Isolation model — unchanged mechanism, closed coverage

The four-layer model in `ai/BACKEND_SCHEMA.md` is correct and stays. What changes is that all
four layers become _provable_:

| Layer | Mechanism                                                         | Enforcement change                                                                                          |
| :---- | :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| 1     | Network / origin: control plane on a separate, restricted ingress | **New.** Closes the plane-1 exposure in § 1.2.                                                              |
| 2     | Identity: tenant claim bound to the session, never to a parameter | Tenant id may never be read from a request body or query. Lint rule + runtime assertion.                    |
| 3     | Application: Prisma client scoped by `TenantContext`              | Repository base class in `@kannan19302/kernel`; a raw `prisma.` reference in a module fails `architecture:check`. |
| 4     | **Database: RLS, `ENABLE` + `FORCE`, app role `NOBYPASSRLS`**     | The only layer that is proof. 364 gaps closed by catalogue sweep; drift blocked in CI.                      |

**The generated-test rule:** for every table carrying `tenant_id`, a two-tenant isolation test is
_generated from the schema_ by `unierp-data`, not written by hand. 1,029 hand-written tests will
never exist; 1,029 generated ones cost one script. The generator ships as part of
`@kannan19302/database`, so `unierp-api` and every extension inherit it. A table with no generated test
is a build failure.

### 5.2 Authentication flows

Three distinct flows, three distinct realms, one shared library (`@kannan19302/kernel` + `@kannan19302/auth`):

**Control plane** — provider staff only.
`OIDC (Authorization Code + PKCE) → provider IdP realm → mandatory hardware or TOTP MFA →
short-lived session (30 min idle, 8 h absolute) → step-up re-auth for destructive operations
(tenant deletion, plan override, impersonation).` No password-only path exists. No customer
identity can obtain a control-plane token, because the realm is separate — not because a claim
is checked.

**Tenant plane** — customer users.
`OAuth 2.1 / OIDC (PKCE) → tenant IdP (built-in, or the tenant's own via OIDC/SAML/SCIM) →
optional-to-mandatory MFA per tenant policy → session cookie scoped to the tenant origin →
tenant claim minted server-side from the resolved host or workspace, never from user input.`

**Machine / extension** — API keys, service accounts, installed extensions.
`OAuth 2.1 Client Credentials → scoped, short-lived access token → scopes are the intersection
of (grant, installing admin's permissions, extension's declared manifest scopes).` An extension
can never exceed the permissions of the admin who installed it. This is the rule that makes a
marketplace safe, and the one most platforms get wrong.

**Support impersonation** is a first-class, separately audited flow: tenant admin grants a
time-boxed consent, the session carries an `act_as` claim distinct from `sub`, every action is
written to both the tenant and platform audit logs, and the tenant is notified. Impersonation
without a consent record is not possible in the code path.

### 5.3 Authorization — RBAC now, ABAC-shaped from day one

The permission string is already `module.resource.action`. That stays, and gains a fourth,
optional segment that is _ignored today and load-bearing later_:

```
finance.invoice.approve                    → RBAC (today)
finance.invoice.approve?amount<=10000      → ABAC (later; same string, same store)
```

The decision point is a single `PolicyEngine` in `@kannan19302/kernel`. Because every guard already
calls through it, introducing attribute predicates in 2027 is a change inside one package, not
across 14,225 routes. **Designing the seam now costs nothing; retrofitting it later costs the
whole codebase.** The 1,889 undecorated routes are closed via ratchet before the engine ships —
a policy engine that 13% of routes bypass is decorative.

---

## 6. Application layer

### 6.1 Bounded contexts — consolidating 45 modules into 12 contexts

The 45 modules are not 45 bounded contexts. Several pairs are the same context split by the word
"advanced" — a packaging concept, not a domain concept:

| Today                                                          | Target context        | Note                                                   |
| :------------------------------------------------------------- | :-------------------- | :----------------------------------------------------- |
| `finance` + `advanced-finance` + `fixed-assets`                | **Finance**           | 92 KLoc. Sub-modules by ledger, AR, AP, assets, tax.   |
| `hr` + `advanced-hr` + `hr-advanced` + `people`                | **People**            | Three "advanced HR" modules is a naming accident.      |
| `inventory` + `supply-chain` + `procurement`                   | **Supply**            | One physical-goods lifecycle.                          |
| `sales` + `crm` + `pos` + `ecommerce`                          | **Commerce**          | 136 KLoc — the largest; needs internal sub-boundaries. |
| `manufacturing`                                                | **Manufacturing**     | —                                                      |
| `projects` + `service-management` + `field-service`            | **Service Delivery**  | —                                                      |
| `documents` + `drive` + `storage`                              | **Content**           | Three modules, one concept.                            |
| `analytics` + `reporting` + `saved-views` + `search`           | **Insight**           | —                                                      |
| `communication` + `notifications`                              | **Messaging**         | —                                                      |
| `workflow` + `ai`                                              | **Automation**        | Merges into Developer Platform runtime (§ 8).          |
| `localization` + `blockchain` + `pwa` + `devops`               | **Platform Services** | Cross-cutting capabilities, not business domains.      |
| `education` `healthcare` `real-estate` `field-service` (repos) | **Verticals**         | Become extensions in L6.                               |

**Contexts are a naming and boundary concept, not a folder move.** Consolidation is
opportunistic — tied to each module's `@ts-nocheck` removal cycle. No big-bang rename. The
`saas-deepening-*` files are the exception: one deliberate pass in Phase 2, **before** the split
of `unierp-api`, because renaming inside a repo is free and renaming across a published boundary
is a breaking change.

### 6.2 The tiered structural rule

| Tier  | Modules                                                                  | Required structure                                                                                                                                          |
| :---- | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A** | Finance, People, Commerce, Supply, Manufacturing, and all of `platform/` | Full four-layer Clean Architecture. `max-lines`: 400 controller / 800 service. Domain layer has zero framework imports. 100% coverage on calculation paths. |
| **B** | Everything else                                                          | Controller / service / dto / tests. `max-lines` enforced. Promote to Tier A when the module exceeds 15 KLoc or acquires money.                              |

Declared per module in a manifest and checked in CI. This is how the rule survives: it is data,
not culture.

---

## 7. Contracts, shared packages, and SDK

### 7.1 `unierp-contracts` — the root of the dependency graph

Today the API shape lives in NestJS decorators, validation in Zod DTOs, client types in generated
OpenAPI output, and event shapes in `packages/shared/contracts`. Four representations of one
truth, kept in sync by discipline — which, per the type-safety finding, is not working.

Target: **L0 is the single source of truth**, and everything else is generated from it.

```
unierp-contracts/
├── http/          Zod schemas per endpoint  →  generates: OpenAPI 3.1, Nest DTOs,
│                                                TS/Python/Java/Go clients
├── events/        Domain event schemas      →  generates: outbox publisher + consumer types,
│                                                AsyncAPI doc, extension event typings
├── entities/      Shared domain types       →  generates: extension-api typings
└── generators/    The codegen itself — versioned with the contracts it emits
```

The generator runs in every downstream CI; a drift between the published contract and generated
output fails the build. This closes the class of bug the Zod-shared-with-frontend design was
meant to prevent and which `@ts-nocheck` silently reopened.

**Because L0 has zero dependencies, it can never be made to depend on an implementation.** That
is the single property that keeps the whole graph acyclic for twenty years.

### 7.2 Collapse 14 UI packages into `unierp-design-system`

`@kannan19302/ui-{tokens,theme,components,layout,charts,data-grid,dashboard,notifications,hooks,utils,
icons,form-engine,workflow}` plus `@kannan19302/ui` are 14 packages always installed together, always
versioned together, always released together. They are one package wearing fourteen
`package.json` files.

Target: **one `@kannan19302/ui` with subpath exports** — `@kannan19302/ui/charts`, `@kannan19302/ui/data-grid` —
preserving every import path's shape while removing 13 build graphs and 13 version numbers.
Tree-shaking preserved via `exports` + `sideEffects: false`.

In a split topology this is not optional: publishing and version-resolving 14 packages across
three consuming frontends is 42 version-coherence problems per release. **Do this collapse
_before_ extracting the repo**, not after (§ 14, Phase 2).

### 7.3 SDK strategy

`unierp-sdk` publishes, generated from L0:

| Artifact                | Purpose                                                              |
| :---------------------- | :------------------------------------------------------------------- |
| `@unierp/sdk` (TS)      | First-class client: typed, retrying, tenant-aware, idempotency-aware |
| `unierp` (Python)       | Data/integration teams                                               |
| `unierp-sdk` (Java, Go) | Enterprise integration                                               |
| `unierp` (Dart)         | Consumed by `unierp-mobile`                                          |
| `@unierp/cli`           | `unierp login / app scaffold / app dev / app test / app publish`     |

SemVer, independent of the platform train, with a published support matrix. **The API is
versioned; the SDK follows the API, not the platform.** The frontends depend on the SDK, never on
`unierp-api` — that is what makes the L3→L4 boundary a version number rather than a coupling.

---

## 8. Developer Platform

This is the requirement that determines whether UniERP is a product or a platform.

### 8.1 The three extension tiers

Every successful platform offers a ladder, not a single door:

| Tier              | Audience              | Mechanism                                                                      | Isolation                                      |
| :---------------- | :-------------------- | :----------------------------------------------------------------------------- | :--------------------------------------------- |
| **1 — Configure** | Business admin        | Custom fields, layouts, views, validation rules, approval chains, reports      | Metadata rows. No code. RLS-scoped.            |
| **2 — Compose**   | Power user / low-code | Workflow Designer, Form Builder, Report Builder, Automation Rules, API Builder | Declarative graphs interpreted by the runtime. |
| **3 — Code**      | Professional dev      | Custom modules, custom business logic, custom UI, plugins                      | **Sandboxed** (§ 8.3).                         |

Tiers 1 and 2 already exist in embryo: `modules/builder` (30.5 KLoc), `(dashboard)/builder/
{app-hub,erp,web,manage}`, `(dashboard)/custom/[moduleSlug]`, `(dashboard)/app/[module]`, and
`@kannan19302/framework`'s schema-driven page runtime. **The schema-driven frontend is the single most
valuable asset for this requirement** — a custom module built in App Studio renders through
exactly the same runtime as a first-party module. Salesforce has that property; most ERP vendors
do not; this codebase already does. Promoting `@kannan19302/framework` to its own L2 repository is what
turns it from an internal convenience into a public guarantee.

### 8.2 The extension contract

An extension is a signed bundle:

```
my-extension/
├── manifest.json      id, version, publisher, requested scopes, extension points,
│                      data model additions, entitlement/pricing metadata
├── schema/            declarative model extensions → generated tables in the tenant's
│                      extension namespace, always with tenant_id + RLS, never core tables
├── ui/                pages, widgets, field renderers → rendered by @kannan19302/framework
├── logic/             sandboxed handlers bound to extension points
├── workflows/         declarative automation graphs
└── tests/             run by `unierp app test` in CI before publish
```

**Extension points** are explicit, versioned, and enumerable — never "patch this class":

| Point                    | Contract                                                                          |
| :----------------------- | :-------------------------------------------------------------------------------- |
| Domain events            | Subscribe to `finance.invoice.approved` via the outbox, at-least-once, idempotent |
| Lifecycle hooks          | `before/after` create, update, delete on any entity — with a hard time budget     |
| Validation rules         | Pure predicates over an entity; may reject, may not mutate                        |
| Scheduled jobs           | Registered with the Job Scheduler; per-tenant quota                               |
| API endpoints            | Mounted under `/api/v1/ext/<extension-id>/*`; never at a core path                |
| UI extension slots       | Named slots in `@kannan19302/framework` layouts                                         |
| Navigation & permissions | Declared in the manifest; merged into the tenant's nav and role model             |

**The compatibility promise is the whole product.** An extension built against extension-API `v1`
runs unmodified on every platform release for the life of `v1` — minimum 3 years' support, 12
months' deprecation notice. A CI job replays a reference extension corpus against every platform
build; a break is a release blocker.

**This is why `unierp-extensions` (L6) may depend on `@kannan19302/extension-api` and nothing else.**
The four first-party verticals migrating onto it (§ 14 Phase 4) is the proof that the promise is
keepable — before any partner depends on it.

### 8.3 Sandboxing — the decision that must be made now

Tier-3 custom code cannot run in the API process with ambient access to Prisma, the filesystem,
or the network.

- **Execution:** V8 isolates (`isolated-vm`) for synchronous hooks and validation — microsecond
  startup, hard memory cap, hard CPU deadline. Long-running or untrusted-heavy work goes to WASM
  or an out-of-process worker pool with a per-tenant concurrency quota.
- **Capability, not ambient authority:** sandboxed code receives a frozen `context` object
  exposing only the operations its manifest scopes grant. No `require`, no global `fetch`, no
  `process`. Data access goes through the same tenant-scoped repository the core uses — so RLS
  applies to extension code identically.
- **Resource governance:** CPU-ms, memory, DB queries, HTTP egress, and job executions metered
  per extension per tenant, with quotas, circuit breakers, and a kill switch reachable from the
  Platform Admin Console.
- **Egress:** outbound HTTP only to manifest-declared, admin-approved hosts.

**Ordering constraint on § 14: the sandbox must exist before the marketplace opens.** Publishing
an extension API and then adding isolation is not a migration anyone has completed successfully.

### 8.4 AI-assisted development

Positioned as a _generator of declarative artifacts_, never as a runtime authority:

- Natural language → workflow graph, form schema, report definition, module scaffold — all
  emitted as reviewable declarative artifacts a human approves before activation.
- Runs on the existing local-first Ollama + pgvector stack, so it is available to on-premise and
  regulated tenants — a genuine differentiator against every cloud-only competitor.
- Bound by `ai/PRD.md § 5.3`: no AI-initiated financial mutation, every suggestion attributed and
  reversible. AI writes proposals; the platform's normal authorization path applies them.

---

## 9. Communication, events, and API versioning

**Synchronous, in-process:** direct method calls only _within_ a bounded context. Across
contexts: never. Enforced by `architecture:check`.

**Asynchronous, cross-context:** the transactional outbox, already built and one of the strongest
pieces of this codebase. It becomes the _only_ cross-context mechanism. `EventEmitter2` is
restricted to same-process, non-critical notification and lint-banned in `platform/` and Tier-A
modules.

Every domain event carries `eventId`, `tenantId`, `occurredAt`, `version`, `correlationId`,
`causationId`, `actor`. Consumers are idempotent by receipt table. Event schemas live in
`unierp-contracts/events` and follow the same compatibility promise as HTTP.

**API versioning:** URL-versioned major (`/api/v1`, `/api/platform/v1`), additive-only within a
major. Deprecation requires a `Sunset` header, 12 months' notice, telemetry proving no active
caller, and an entry in `API_VERSIONING_POLICY.md`. Two majors supported concurrently, maximum.

**Cross-repository compatibility policy** — the rule that keeps fifteen repos coherent:

| Boundary                          | Compatibility window                                                                                                  |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `@kannan19302/extension-api` (public)   | 3 years support, 12 months deprecation notice                                                                         |
| `@unierp/sdk` ↔ API major         | 2 majors concurrent                                                                                                   |
| `@kannan19302/contracts` ↔ `unierp-api` | Same train ± 1                                                                                                        |
| `@kannan19302/database` ↔ `unierp-api`  | **Migration must be backward-compatible for one full train** — this is what makes rollback work without a DB rollback |
| `@kannan19302/ui` ↔ frontends           | Major bumps coordinated in one train                                                                                  |
| Internal L0/L1 packages           | Same train; may break freely between trains, subject to M2                                                            |

---

## 10. Security architecture

Zero Trust and Defense in Depth, expressed as controls a script can verify rather than principles
a document asserts.

| Layer             | Controls                                                                                                                                                               | Verified by                                   |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| **Network**       | mTLS between services; control-plane ingress IP-allowlisted and off public DNS; egress allowlist; WAF at Traefik                                                       | Infra tests in CI against the staging cluster |
| **Identity**      | OAuth 2.1 + OIDC, PKCE mandatory, no implicit flow; separate realms per plane; MFA mandatory on control plane; SCIM provisioning                                       | Auth integration suite                        |
| **Authorization** | `@Permissions` on every route (ratchet to 0 undecorated); `PolicyEngine` single decision point; extension scopes ⊆ installer's                                         | `check-policy.mjs` route-guard gate           |
| **Tenant**        | Four-layer isolation (§ 5.1); RLS `ENABLE` + `FORCE`; app role `NOBYPASSRLS` asserted at startup                                                                       | Generated two-tenant test per table           |
| **Application**   | Zod validation at every boundary; parameterised SQL only (1 reviewed exception, RLS-asserted at runtime); output encoding; CSRF double-submit; strict CSP; `helmet`    | `check-policy.mjs` raw-SQL gate               |
| **Data**          | TLS 1.3 in transit; AES-256 at rest; column-level encryption for PII/secrets; per-tenant KMS key path; `Decimal(19,4)` for money                                       | Schema policy gate                            |
| **Files**         | Content-type sniffing, size caps, AV scan, quarantine-then-promote, signed time-limited URLs, per-tenant MinIO prefix                                                  | Storage integration tests                     |
| **API**           | Per-tenant + per-key rate limits, quota enforcement, idempotency keys on all mutations, request signing for webhooks                                                   | k6 suite + throttler tests                    |
| **Secrets**       | OpenBao / SOPS+age; injected at runtime; never in CI logs; gitleaks at pre-commit, pre-push, and CI **in all 15 repos**                                                | Secret-scan gate at three layers              |
| **Supply chain**  | Pinned base-image digests; `pnpm audit` blocking on high/critical; CycloneDX SBOM per image **and per published package**; cosign signatures; Trivy scan; licence gate | CI, no `continue-on-error`                    |
| **Audit**         | Append-only, hash-chained audit log; separate tenant and platform streams; impersonation double-logged                                                                 | Audit integrity job                           |
| **Recovery**      | WAL archiving, RPO ≤ 5 min, RTO ≤ 1 h, monthly automated restore verification, quarterly rehearsal                                                                     | Restore-verification job pages on failure     |

**Split-specific security additions** — a polyrepo widens the supply-chain surface and this must
be priced in:

- **Every published package is signed and provenance-attested** (npm provenance / Sigstore). A
  fifteen-repo publish surface is fifteen opportunities for a compromised token to inject code
  into a downstream build.
- **Publish tokens are per-repo, short-lived, and OIDC-federated from CI.** No long-lived npm
  token exists anywhere.
- **Dependency confusion is closed** by scope reservation (`@kannan19302`, `@unierp`) and a registry
  allowlist in every `.npmrc`.
- **The manifest is signed.** An unsigned `platform-manifest.json` is not deployable.

OWASP Top 10 mapping, control ownership, and the compliance-evidence pipeline (SOC 2 / ISO 27001
/ GDPR / HIPAA readiness) are maintained in `SECURITY_CHECKLIST.md`.

---

## 11. Observability, reliability, and cost

**The gap today is operability, not instrumentation** — OTel, Prometheus, Sentry/GlitchTip, Pino,
and health endpoints are all wired. What is added:

- **SLOs per critical journey** (login, list a document, post a transaction, run a report), each
  with an error budget and an explicit policy: budget exhausted ⇒ feature work pauses.
- **Alert rules and Grafana dashboards committed as code** in `unierp-infra`, with a runbook per
  alert. An alert without a runbook fails CI.
- **Per-tenant telemetry** — every metric, log line, and span tenant-labelled, enabling
  per-tenant SLO reporting in the Platform Admin Console, noisy-neighbour detection, and
  cost-per-tenant attribution.
- **Build/release telemetry**, new and specific to the split: lead time from L0 commit to
  deployed train, choreography PR latency, and manifest drift. **In a fifteen-repo topology the
  release pipeline is itself a production system and must be monitored like one.**
- **Scale work, driven by the measured risk:** PgBouncer in transaction mode; partition the four
  high-volume tables (audit log, stock movements, outbox, events); read-replica routing for
  reporting. **Query planning under RLS across 1,836 tables is the most likely first scaling
  wall** and is load-tested explicitly, not assumed.
- **Cost:** local-first AI, PostgreSQL-only, and no third-party runtime dependency already make
  unit economics unusually good. The addition is measurement — cost per tenant per month,
  published to the console.

---

## 12. Native Windows developer workflow

The requirement is explicit: optimise for native Windows, not WSL, to cut memory and improve
local performance. WSL2's cost is concrete — a second Linux kernel with its own page cache
holding a duplicate `node_modules`, plus `\\wsl$` filesystem crossings that dominate build time.

**Target: everything except the datastores runs natively on Windows; only the datastores run in
containers.**

| Component                                     | Where it runs                                            |
| :-------------------------------------------- | :------------------------------------------------------- |
| Node 22 LTS, pnpm, Turborepo, Next.js, NestJS | **Native Windows** — no WSL, no container                |
| PostgreSQL + pgvector, Redis, MinIO, Ollama   | Docker Desktop (WSL2 backend) or native Windows services |
| Flutter / Tauri toolchains                    | Native Windows                                           |

### 12.1 The multi-repo developer loop

A fifteen-repo checkout must feel like one workspace or developers will work around it. The
`unierp-workspace` CLI provides that:

```powershell
unierp ws clone          # clones every repo in the manifest, correct branches
unierp ws link finance   # local-first mode: pnpm overrides point @kannan19302/* at local checkouts
unierp ws up             # datastores in Docker; api/web/console native, hot-reloading
unierp ws verify         # runs the same federated gates CI runs, across linked repos
unierp ws unlink         # back to published versions
```

**`link` is the mechanism that restores the monorepo feel**: while linked, a change in
`unierp-contracts` is visible to `unierp-api` and `unierp-web` immediately, with full compiler
feedback, no publish step. Publishing is only needed to _release_, not to _develop_. A local
Verdaccio registry is available for rehearsing the publish path.

Developers link only the repos they are working in — typically two or three — so the resident
memory of a normal session goes _down_ versus the current single monorepo, which is one of the
split's genuine wins on this machine.

### 12.2 Windows-specific measures

1. **`pnpm` store and virtual store on the same NTFS volume as every checkout.** Cross-volume
   linking is the most common cause of slow installs on Windows. The workspace CLI enforces a
   single store shared by all fifteen repos — **this is also the main defence against fifteen
   duplicated `node_modules` trees**, which would otherwise be the split's worst local cost.
2. **Turborepo remote cache**, self-hosted in `unierp-infra`, shared across all repos, so a cold
   clone does not rebuild. Combined with § 7.2's 14→1 UI collapse this is the dominant local
   build improvement.
3. **Windows Defender exclusions**, scripted in `unierp-workspace/tools/setup-windows.ps1`, for
   the workspace root, the shared pnpm store, and the Node install. Real-time scanning of
   `node_modules` writes is a large, invisible, avoidable tax.
4. **`NODE_OPTIONS=--max-old-space-size` tuned per task**, not globally. The current global heap
   raise for web typecheck is a symptom of the monolithic UI package graph and should shrink
   after § 7.2.
5. **No project-level WSL assumption anywhere.** All scripts are Node (`.mjs`) or PowerShell; no
   `bash`-only script may be required to build, test, or verify. Checked on a `windows-latest`
   runner in every repo — **the enforcement matters more than the intent**, because a bash-only
   script always creeps back otherwise.
6. **Long-path support enabled**; deep paths are the classic Windows monorepo failure.
7. **Devcontainer retained but demoted** to an optional path for reproducing CI failures. No
   longer the documented default.

CI runs the production-parity matrix on Linux plus a `windows-latest` job (install, typecheck,
lint, unit tests) in every repository, so the native Windows path cannot silently rot.

---

## 13. CI/CD, testing, and release

The three-layer enforcement design in `ai/TRD.md § 8` is correct and stands. What the split adds:

### 13.1 Shared, not copied

**Every gate is a reusable workflow in `unierp-workspace`.** A repository declares _which_ gates
apply; it never contains a gate implementation. This is the direct countermeasure to the failure
in § 1.1 — the copy-pasted Dockerfile bug fixed three separate times. A drift check fails any repo
whose workflow file diverges from the generated template.

The same applies to `Dockerfile` bases, `tsconfig`, `eslint`, `vitest`, and governance docs: all
generated from `unierp-workspace` templates, all drift-checked.

### 13.2 The four-stage pipeline

```
Stage 1  PER-REPO       lint · typecheck · unit · policy gates · secret scan · SBOM · sign
Stage 2  CONTRACT (M2)  replay every consumer's published expectations against this change
Stage 3  CHOREOGRAPHY   changeset → topological version-bump PRs in dependents (M3)
Stage 4  GOLDEN PATH    compose the manifest · migrate · E2E · isolation suite · k6 ·
         (M4)            extension-compat corpus  →  manifest is deployable
```

Stages 1–2 run per repository. Stage 3 is automated. **Stage 4 runs only in `unierp-workspace`,
and is the only thing that authorises a deploy.**

### 13.3 Testing pyramid

| Level                       | Owning repo                                         | Gate                                                                  |
| :-------------------------- | :-------------------------------------------------- | :-------------------------------------------------------------------- |
| Domain unit                 | `unierp-api`                                        | 100% on financial calculation paths                                   |
| Application / integration   | `unierp-api`                                        | Coverage threshold, ratcheting to 80%                                 |
| **Tenant isolation**        | **`unierp-data`** (generated per `tenant_id` table) | **Every table, or the build fails**                                   |
| **Cross-repo contract**     | **every consumer → every provider (M2)**            | **Provider PR fails on consumer break**                               |
| **Extension compatibility** | `unierp-workspace` (reference corpus)               | **Release blocker**                                                   |
| E2E                         | `unierp-workspace`                                  | Blocking on the golden path                                           |
| Load                        | `unierp-workspace`                                  | Smoke blocking; full k6 nightly; RLS query planning probed explicitly |

### 13.4 Release and rollback

**Versioning:** SemVer per repository. L3–L5 additionally carry the dated train (`2026.08.0`).
The **API** and **extension API** version independently and slower — they are the public
promises. The SDK follows the API. Extensions version themselves.

**Deploy:** promote a manifest. Staging automatically on a green golden path; production on
manual approval of that same manifest. Blue/green rollout, health gate, automatic rollback.

**Rollback:** deploy the previous manifest. Under 5 minutes, rehearsed quarterly. Because every
migration is expand → migrate → contract and backward-compatible with the previous train, a
rollback never requires a database rollback. **That property is what makes rollback usable, and
in a split topology it is the only thing that keeps rollback simple — you roll back one
manifest, not fifteen repositories.**

---

## 14. Migration programme

**Ordering principles.**

1. **Nothing new is built on a foundation that cannot prove itself.** Phase 0 is the existing
   remediation programme, unshortened and unparallelised.
2. **Never give up a guarantee before its replacement exists.** Contracts and CDC (M2) ship
   _before_ the first repository extraction, because the moment `unierp-api` and `unierp-web`
   are separate repos, the compiler stops seeing across them. This ordering is not negotiable —
   it is the single decision that determines whether the split succeeds.
3. **Extract in dependency order, lowest layer first.** You cannot extract a dependency after its
   dependents without rewriting them twice.
4. **Every extraction preserves history** (`git filter-repo`) and is tagged at the extraction
   point. Every phase is independently revertable.

### Programme status — 2026-08-05

Measured, not asserted. Every "done" below is backed by a gate that passes and, where the item
was a defect, by a gate that was proven able to fail. Counts are the output of
`node scripts/ci/check-policy.mjs --report` and of the tree itself, not estimates.

**Programme completion: the ARCHITECTURE is complete; the PRODUCT is unverified.**

> #### ⚠ Correcting an overstatement in this document
>
> This line previously read "100% of Phases 0–5 as scoped". That was measured
> against the § 14 phase checklist — extractions performed, gates green, packages
> published — and every one of those claims is true and independently verifiable.
>
> It was still the wrong headline, because the scope it measured was chosen to
> match what had been built. Phases 0–5 describe _structure_: repositories,
> boundaries, contracts, ratchets. Nothing in that checklist asks whether a
> customer can register, log in, and raise an invoice — and **that has never been
> tested in a browser.** A programme reported at 100% while its product has never
> been opened is exactly the failure this document keeps cataloguing: something
> marked done because the shape was there.
>
> The honest split:
>
> |                                  | Status                                                                                                                                                                                        |
> | :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | Structure (§§ 3–7, 9–10, 12–14)  | Complete and gated — `pnpm verify` 14/14, 0 skipped                                                                                                                                           |
> | Tenant isolation (§ 5)           | Proven at the database, over a NOBYPASSRLS role                                                                                                                                               |
> | Extension platform (§ 8)         | Sandbox, registry, namespace, signing — all tested adversarially                                                                                                                              |
> | **End-to-end product**           | **Verified, and it regressed once between verifications — see below.** Register → log in → read tenant data works over HTTP against running services; `pnpm smoke` walks it and fails loudly. |
> | Repository documentation (§ 4.6) | Complete — all 29 repositories carry README, LICENCE, SECURITY, CONTRIBUTING, CODEOWNERS and CI; `UniERP` is the public landing repo linking every layer                                      |
> | `apps/*` duplication             | `apps/api` and `apps/web` exist identically in `ERPSys` and in their own repos                                                                                                                |
> | **Container images per repo**    | **Not buildable.** The extracted L3/L4 repos carry `workspace:*` deps; three carried a Dockerfile that could not run. See § 14.1.                                                             |
>
> Percentages resume only against a checklist that includes a working journey.

> #### 🔴 The working journey did not stay working (found and fixed 2026-08-06)
>
> A day after the row above was written, `pnpm dev` brought up Postgres, Redis,
> MinIO, the registry and the web app — and **the API did not start at all**. Not
> slowly, not degraded: the process exited during module load with
> `ERR_MODULE_NOT_FOUND` on `packages/extension-api/dist/capabilities`.
>
> The cause is one line of packaging. `packages/extension-api/src/index.ts`
> re-exported `./capabilities`, `./schema` and `./bundle` **without file
> extensions**, and `packages/contracts/src/index.ts` did the same for its three
> sub-indexes. The root `tsconfig.json` sets `moduleResolution: "bundler"`, which
> permits extensionless specifiers and emits them unchanged; a bundler resolves
> them and **Node does not**. Neither package declares `"type": "module"`, so what
> actually loads them is Node's ESM syntax detection — the emitted `import`
> keyword is enough for Node to choose the ESM loader, and the ESM loader requires
> a full path. `@kannan19302/shared` and `@kannan19302/auth` are the two packages that declare
> `"type": "module"` and write `./index.js` specifiers, and they are the two that
> have never broken this way.
>
> **Why no gate caught it, and this is the part worth keeping.** `pnpm verify` was
> 14/14 green across this failure and is green now. Typecheck passes — the
> specifiers are valid under `bundler` resolution, which is exactly what the
> compiler was told to assume. The unit suites pass, because a test runner resolves
> modules through Vite, another bundler. Every gate in the pipeline reads the code
> through a bundler, and the one consumer that does not is production. **A
> repository whose entire toolchain resolves modules differently from its runtime
> cannot detect this class of defect at all**, and it will recur in any package
> that grows a relative re-export.
>
> `pnpm smoke` is what caught it, which is the argument for keeping a gate that
> runs the real thing over HTTP. But smoke needs the stack running, so it cannot
> be a `pnpm verify` gate, and nothing runs it unless a person remembers to.
>
> The 2026-08-05 changelog entry recorded "three packages emitted ESM while
> declaring CommonJS" as fixed. Three were. `extension-api` and `contracts` were
> not among them, and no gate existed to say so.
>
> **Fixed** by adding `.js` to the six specifiers. Verified by boot: API answers
> `/api/v1/health` 200, IdP answers, and the full smoke journey passes — 18/18
> steps, register → log in → token with claims → profile → five authenticated web
> routes → four API routes → IdP.
>
> **Gate added, because a fix without one is a fix that recurs.**
> `scripts/ci/check-node-resolution.mjs` is gate 15. It reads the emitted
> `dist/` — the artifact that actually loads — and checks every relative
> specifier against _Node's_ resolver rather than the compiler's: verbatim under
> ESM, extension-and-index search under CommonJS. The package set is derived, not
> listed — every `@kannan19302/*` reachable through `dependencies` from `apps/api` or
> `apps/idp`, transitively — so a package that gains a dependency is covered the
> day it does. `@kannan19302/ui` and `@kannan19302/framework` are exempt because Next.js
> bundles them and extensionless specifiers are correct there; enforcing a rule
> their runtime does not have would be false precision.
>
> Proven able to fail (revert one specifier → exit 1 naming the file, restore →
> exit 0), which is the standard § 14 applies to every other gate here.
>
> **It immediately found six more of the same defect, already latent.**
> `@kannan19302/shared`'s `field-service/index.js` and `real-estate/index.js` each
> re-export three schemas without extensions. Nothing imports those subpaths
> today, so nothing had broken yet; the first consumer would have hit exactly the
> failure above. Fixed in the same pass.
>
> This is § 2's fourth design force doing its job: the guarantee was sound on
> paper and unchecked in the repository, and what was unchecked had already
> decayed in six more places than anyone knew.

> #### ✅ The isolation suite now proves the claim it makes (fixed 2026-08-05)
>
> `unerp` — the role that runs migrations and seeds, and the one every local and
> CI suite run has been using — is a Postgres **superuser**, and a superuser
> bypasses RLS outright. `FORCE` does not apply to it. So while § 5.1's layer 4
> is correctly configured (1,782 tables, ENABLE + FORCE, 2,784 policies, verified
> in the catalogue), **no test that connects as the owner can prove it works** —
> those tests are exercising layer 3, the application-level tenant scope, which
> is the weaker guarantee.
>
> This surfaced when the new extension-table isolation test failed by seeing both
> tenants' rows; the table was correct and the connection was not. Re-pointed at
> `unerp_api` (`NOBYPASSRLS`) the same assertion passes.
>
> **§ 5.1's generated-test rule must mandate the application role.** A two-tenant
> test that runs as the owner will pass on a table with no policy at all, which
> makes it worse than no test — it reports a guarantee it never checked.

**ADR-009 is satisfied**, which is the ordering constraint that governs everything after it:
§ 8.3 requires the sandbox to exist _before_ the marketplace opens, because "publishing an
extension API and then adding isolation is not a migration anyone has completed successfully."
Tier-3 code now runs in a capability-scoped V8 isolate with metered budgets and a kill switch,
proven by 18 tests that each attempt an escape rather than a happy path. Phase 5 is no longer
blocked on it.

Three of the four ratchets that defined Phase 0 are now at **zero and baselined there**
(`@ts-nocheck`, `Float` money, unguarded routes), so each is a floor rather than a trend.
Hardcoded colours are down 69% (984 → 305) and baselined at the new floor. What remains in
Phase 0 is presentational debt that cannot corrupt data or bypass authorisation: 305 colours —
a third of them the `connect` module's deliberate Google Material palette — 3,215 hardcoded
pixel values, and one reviewed raw-SQL exception.

**The pixel ratchet, and the part of it that was provably safe.** 3,571 → 2,787:
1,296 exact values across 207 files became spacing tokens. This needed no visual
regression coverage, because pins — so
1rem is exactly 16px, is exactly 8px, and substituting an
exact match produces an identical computed value. It is a rename, not a
redesign.

The migration is deliberately narrow, because that identity is the entire safety
argument: spacing properties only (never , which has values like 13px
with no token, and never , where 1px is not spacing); exact
matches only, so 7px stays 7px rather than being rounded to the nearest token,
which would smuggle a design change in as a cleanup; and CSS files only, since a
px string in TSX may be a canvas coordinate or a chart dimension where
does not resolve.

**The remaining 2,787 are the genuinely unsafe cases** and still need visual
regression coverage first — odd values with no token, font sizes, border widths,
and every px inside TSX.

| Phase                           |  Scheduled | Complete | Gate to proceed                                                                                           |
| :------------------------------ | ---------: | -------: | :-------------------------------------------------------------------------------------------------------- |
| 0 — Foundation restoration      |    8–14 wk | **~97%** | Routes ✅ · RLS ✅ · money ✅ · CI green ✅ · colours 69% closed · pixels need visual regression first 🟡 |
| 1 — Separate the control plane  |       4 wk | **~85%** | Console on its own origin ✅ · ingress/MFA ⛔                                                             |
| 2 — Make the split survivable   |      10 wk | **~95%** | § 7.2 UI collapse ✅ · **M2 proven on three injected breaks** ✅                                          |
| 3 — Extract, lowest layer first |      12 wk | **100%** | All layers extracted · 13 packages published · monorepo consumes them · `packages/` deleted ✅            |
| 4 — The extension platform      |      10 wk | **~88%** | Sandbox ✅ · registry ✅ · data namespace ✅ · signed bundles ✅ · vertical migration ⛔                  |
| 5 — Studio and marketplace      |      12 wk | **~55%** | Catalogue/install/review already built · signing enforced ✅ · builder promotion + payout ⛔              |
| 6 — Scale and operability       | continuous | **~25%** | k6 suite + runbooks exist; SLOs ⛔                                                                        |

#### Phase 0 — foundation

| Item                                                | At `v1.0.0`       | Now                                                                      | Status                                                                              |
| :-------------------------------------------------- | :---------------- | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `@ts-nocheck`                                       | 3,241 (100%)      | **0**                                                                    | ✅ done, baseline locked                                                            |
| `apps/api` typecheck                                | not runnable      | **0 errors**                                                             | ✅                                                                                  |
| Full `pnpm verify`                                  | red, unpushable   | green                                                                    | ✅                                                                                  |
| All 10 HARD policy rules                            | 3 violated        | **10 green**                                                             | ✅                                                                                  |
| Fabricated endpoints                                | 2,411             | **0**                                                                    | ✅ 17,321 lines removed                                                             |
| Unguarded controller routes                         | 1,889             | **0**                                                                    | ✅ baseline locked at 0; 18 public routes declared `@Public("reason")`              |
| Hardcoded hex                                       | 1,625 (over base) | **305**                                                                  | 🟡 69% closed; 108 of the rest are the `connect` module's deliberate Google palette |
| Hardcoded pixel values                              | over base         | 3,215                                                                    | 🟡 ratcheting                                                                       |
| **Cross-tenant escalation via tenant `*` wildcard** | **exploitable**   | **closed + gated**                                                       | ✅                                                                                  |
| **Cross-tenant escalation via `admin.tenant.*`**    | **exploitable**   | **closed + gated**                                                       | ✅                                                                                  |
| **449 unauthenticated live routes (R12)**           | **exploitable**   | **closed + gated**                                                       | ✅ 3 new HARD rules                                                                 |
| `Float` money fields                                | 92                | **0**                                                                    | ✅ 7 converted, 22 classified as metrics                                            |
| Unsafe raw SQL                                      | 1 (reviewed)      | 1 (reviewed)                                                             | ✅ documented exception                                                             |
| RLS coverage                                        | unverified        | **1,780 tables, ENABLE + FORCE, 2,782 policies, app role `NOBYPASSRLS`** | ✅ verified against PostgreSQL 16                                                   |
| Full `pnpm verify` with no skipped gate             | not achievable    | **14/14 green**                                                          | ✅                                                                                  |

#### Phases 1–2 — control plane and split mechanisms

| Item                                                      | Now                                                                                                          | Status |
| :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :----- |
| `apps/api/src/platform/` behind `ControlPlaneGuard`       | 23 files, `/api/platform/v1` live                                                                            | ✅     |
| `apps/console` as its own deployable                      | exists, 8 route groups                                                                                       | ✅     |
| `(dashboard)/saas/*` and `saas-portal/*` deleted from web | **0 routes remain**                                                                                          | ✅     |
| `apps/idp` — separate identity realm                      | exists                                                                                                       | ✅     |
| Control-plane ingress allowlist + mandatory MFA           | infrastructure, not provisioned                                                                              | ⛔     |
| M1 — `docs/platform-manifest.json` release train          | train `2026.08.0` pinned, 13 components                                                                      | ✅     |
| M2 — CDC harness (`scripts/ci/cdc-harness.mjs`)           | **12 consumer corpora published and replayed; proven on 3 injected breaks; wired into `pnpm verify` and CI** | ✅     |
| M3 — choreography bot (`.github/workflows/`)              | wired against `packages/*`                                                                                   | ✅     |
| M4 — golden path / workspace CLI (`scripts/tools/ws.mjs`) | `clone`/`link`/`up`/`verify` present                                                                         | 🟡     |
| Rename the 60 `saas-deepening-*` files                    | **0 remain**                                                                                                 | ✅     |
| Split `schema.prisma` (R2)                                | 1,836 models across **14 context files**                                                                     | ✅     |
| Tier A/B manifest (`docs/module-tier-manifest.json`)      | declared                                                                                                     | ✅     |
| **§ 7.2 — collapse 14 UI packages into `@kannan19302/ui`**      | **done — 13 packages merged, 1 published artifact**                                                          | ✅     |

#### Phases 4–5 — platform surface

| Item                                                                                    | Now                                                                                                    | Status |
| :-------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- | :----- |
| `packages/extension-api`                                                                | manifest v1, scope model, resource budget, egress rules, `effectiveScopes()`                           | ✅     |
| **`packages/sandbox` (§ 8.3 V8 isolates)**                                              | **real `isolated-vm` capability sandbox — 18 adversarial tests**                                       | ✅     |
| Four verticals under `apps/extensions/`                                                 | all four present                                                                                       | ✅     |
| Extension registry (install/enable/quota)                                               | persisted per tenant with RLS; effective-scope intersection; kill switch; per-invocation metering      | ✅     |
| Extension data-write namespace (§ 8.2)                                                  | generated `ext_<id>_<entity>` tables, tenant_id + RLS FORCED, `Decimal(19,4)` money, additive upgrades | ✅     |
| Signed bundles (Ed25519, manifest in digest)                                            | verify-before-install, key revocation, 9 tampering tests                                               | ✅     |
| Marketplace catalogue, install, reviews, collections, vendor bundles, submission review | **already built** — the previous "~20%" understated it                                                 | ✅     |
| Marketplace publish requires a verified signature                                       | vendor key registry, verify-before-validate, 6 gate tests                                              | ✅     |
| Migrate a vertical onto the public API                                                  | not started                                                                                            | ⛔     |
| Promote `modules/builder` onto the public API                                           | not started                                                                                            | ⛔     |
| Payout / billing for paid listings                                                      | not started                                                                                            | ⛔     |
| `apps/developer` (Studio)                                                               | scaffolded                                                                                             | 🟡     |

### 14.1 The container story, measured (2026-08-06)

The question "is Docker ready for the split architecture" has a precise answer, and it is no.

| Artifact                                            | State                                                                                                                |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `ERPSys/docker-compose.dev.yml`                     | ✅ Works. Datastores, registry, `api`, `web`, and `console`/`developer`/`idp` behind profiles. `pnpm dev` drives it. |
| `unierp-infra/docker-compose.dev.yml`               | 🔴 **Was dead — rewritten 2026-08-06.** See below.                                                                   |
| `unierp-infra/registry/docker-compose.registry.yml` | ✅ Verdaccio, running, 13 `@kannan19302/*` packages published                                                              |
| `unierp-api` · `unierp-web` · `unierp-idp` images   | 🔴 **Unbuildable — Dockerfiles removed 2026-08-06**                                                                  |
| `unierp-console` · `unierp-developer` images        | 🔴 Never had a Dockerfile                                                                                            |
| `unierp-corporate-website` image                    | ✅ Genuinely standalone — its own lockfile, schema and Dockerfile                                                    |

**`unierp-infra`'s compose could never have started.** It was a byte-copy of the monorepo's
compose taken at some earlier point: it built from `Dockerfile.dev` and bind-mounted `./apps`,
`./packages` and `./apps/mobile`, four paths that have never existed in that repository. It had
also drifted behind its source — no `console`, `developer` or `idp` service, none of the
profiles, and not the `max_connections=300` without which the test suite reports flaky failures
that are really the server refusing connections. It has been replaced with the subset
`unierp-infra` genuinely owns: PostgreSQL, Redis, MinIO, and the optional pooler and Ollama. No
application services, because it cannot build them.

**The three application Dockerfiles were the same failure.** Each `COPY`s `pnpm-lock.yaml`,
`pnpm-workspace.yaml`, `apps/` and `packages/` — none of which exist in an extracted repo — so
each failed on its first instruction. `unierp-idp` carried the API's image verbatim, down to the
`# UniERP API — production image` header. They are removed rather than repaired: a Dockerfile at
a repository root asserts that `docker build .` works, and none of these could. Each README now
carries a `Building a container image` section saying where the image is actually built and what
would unblock a per-repo one.

**Why they cannot simply be fixed.** The extracted L3/L4 repositories are faithful copies, not
standalone projects. `unierp-web/package.json` and `unierp-console/package.json` still declare
`@kannan19302/*` as `workspace:*`, which resolves to nothing outside the monorepo — `npm install` in a
clean copy of `unierp-console` fails with `EUNSUPPORTEDPROTOCOL: Unsupported URL Type
"workspace:"`. `unierp-web`'s `dev` script runs `node ../../scripts/ensure-web-deps.mjs`, and
`unierp-api`'s `architecture:check` runs `../../scripts/check-module-boundaries.mjs`; neither
path exists one level up from a repository root. This is § 14's own lesson restated: extraction
is finished when a consumer can install the artifact and compile against it, not when a directory
exists and a tag is written.

**What unblocks it is one decision, not one commit.** Phase 3 step 4 for the application layer
needs a package registry that CI can reach. The self-hosted Verdaccio answers on `localhost`
only, which is exactly why the first cutover was reverted (`a96069e6`): every
`pnpm install --frozen-lockfile` on a runner resolved `@kannan19302` against the runner's own
localhost. Publishing `@kannan19302/*` to a hosted registry — GitHub Packages is the obvious candidate,
since the org and the OIDC-federated publish tokens in § 10 already exist there — makes the
cutover survivable, and per-repo images follow from it. Until then the monorepo is the build, and
§ 14 rule 4 says that is the correct intermediate state rather than an unfinished one.

### 14.2 The CI gates that were red, and what remains

`pnpm verify` being green is not the same as CI being green: **CI runs several gates `verify` does
not have.** That divergence is itself a finding — a developer who runs `verify` before pushing,
as `CLAUDE.md` instructs, is told the change is clean and then watches CI fail on something they
had no local way to check. Five checks were failing on the branch carrying all of Phase 0–3:

| Check                  | Cause                                                                                                                                                           | State                                              |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| `Static (format)`      | 202 files unformatted                                                                                                                                           | ✅ fixed                                           |
| `M3 Choreography Sync` | `setup-node` with `cache: pnpm` ran **before** pnpm was installed — the job failed at setup and had never executed its own body, hiding two more bugs inside it | ✅ fixed                                           |
| `Static (contracts)`   | CDC expectations stale on Linux, clean on Windows; the gate said only "stale"                                                                                   | ✅ fixed — cause below                             |
| `Analyze` (Flutter)    | `dart format --set-exit-if-changed`                                                                                                                             | ✅ fixed — `flutter analyze` now runs, and fails   |
| `Tests + coverage`     | the two-tenant isolation assertion could not reach its database                                                                                                 | ✅ fixed, and guarded                              |
| `Supply chain`         | `pnpm audit` — 2 critical, 39 high                                                                                                                              | 🟡 **78 → 39 total, 39 → 21 high, 2 → 1 critical** |
| `CodeQL`               | 88 open alerts, all dated 28 Jul – 1 Aug                                                                                                                        | ⛔ pre-existing on `main`, not introduced here     |

> #### 🔴 The isolation test that proves § 5.1 had never run in CI
>
> One test failed out of 3,866, and it was **the two-tenant isolation assertion**
> — the one this document calls the only layer that is proof rather than intent.
> It failed with `P1003: Database "unerp_dev" does not exist`.
>
> The role was never the problem. `unerp_api` is created by migration
> `20260718100000_create_unerp_api_role` and exists wherever migrations have run,
> including on the runner. The test hardcoded a fallback connection string whose
> **database name was the local one** — CI's is `unierp_test` — so it could not
> connect at all.
>
> § 5.1 already says a two-tenant test that runs as the owner is "worse than no
> test, because it reports a guarantee it never checked". One that cannot connect
> is the same failure wearing a different error code, and the step named `RLS /
tenant-isolation verification` ran green beside it throughout. That step checks
> the **catalogue** — `ENABLE`, `FORCE`, policy counts, the app role's bypass flag
> — which is necessary, and is not the same as watching one tenant fail to see
> another tenant's row.
>
> Two fixes, because either alone leaves the trap. The URL is now **derived** from
> `DATABASE_URL` by swapping only the credentials, so host, port and database
> follow whatever environment the suite runs in. And before asserting isolation
> the test queries `pg_roles` for `current_user` and requires `unerp_api`,
> `rolsuper = false`, `rolbypassrls = false` — so an edit that silently hands it
> the owner connection **fails loudly instead of passing vacuously**. Proven:
> pointing `DATABASE_APP_URL` at the owner yields `expected 'unerp' to be
'unerp_api'`.

**The divergence itself is not closed, and closing it needs a decision.** The obvious repair is to
add `format:check` to `pnpm verify`. It cannot be done as it stands: `core.autocrlf` is true and
`.gitattributes` says `* text=auto`, so a Windows working tree is CRLF while prettier's
`endOfLine` is `lf` — `format:check` reports **3,016** files locally against CI's 202, and adding
it to `verify` would make `verify` permanently red on the platform § 12 names as the primary
development environment. The real fix is `.gitattributes` forcing `eol=lf` on every extension
prettier owns, so a Windows checkout and a Linux runner see the same bytes. That is a one-time
whole-tree line-ending normalisation and belongs in its own change, on its own, where the diff
can be read for what it is.

**The M3 job is the one worth dwelling on.** It had been failing at `Setup Node` since it was
written, so it never ran a single line of its own script — and that script contained two further
defects it could not expose: it invoked `scripts/ci/check-module-boundaries.mjs`, which is not
where that file lives, and it invoked the boundary checker from the repository root, where the
checker resolves its baseline relative to the working directory and exits 1 on a clean tree. **A
job that fails in setup is indistinguishable from a job that works, in every way except the
badge.** M3 is one of the four mechanisms § 4.5 calls non-optional and ADR-011 declares the split
void without; it has been decorative since it was added.

**The supply chain is the one still red, and the reason is worth stating rather than hiding.**
The critical that mattered is closed: `next` was pinned at `15.3.4` in `apps/console` and
`apps/developer` — exactly, not as a range — against a React-flight RCE patched in `15.3.6`.
`apps/web` was on a range that permitted a fixed version and resolved to the vulnerable one
anyway, because a wide optional peer in `@kannan19302/ui` held the old resolution in the lockfile. A
workspace-wide `pnpm.overrides` entry is what actually moved it, which is the honest lesson: with
three applications and a peer-dependent package, the version that ships is decided by the
lockfile, not by the three ranges.

What remains is **1 critical and 21 high**, and it is deliberately not being closed in the same
change. The critical is `vitest < 3.2.6` — a major upgrade across a suite of roughly 5,000 tests,
which is precisely the kind of change that must be able to fail loudly on its own rather than
inside a commit about something else. The highs are `vite`, `multer`, `sharp`, `xlsx`, `js-yaml`
and `@opentelemetry/propagator-jaeger`. A dependency-upgrade pass is the next unit of work, and
it is a gate this platform declares blocking rather than advisory — correctly, since the previous
revision of that job carried `continue-on-error: true` and was decorative.

**Phase 1 is substantially delivered.** Both the control-plane _boundary_ (reserved namespaces,
`ControlPlaneGuard`, HARD CI gates) and the control-plane _deployable_ (`apps/console`, `apps/idp`,
tenant-plane routes deleted) now exist. What remains is infrastructure the repository cannot
provision: restricted ingress and mandatory MFA on the console origin.

**The two infrastructure-blocked items are closed.** A PostgreSQL 16 instance was brought up from
`docker-compose.dev.yml` and both were finished against it:

- **RLS is verified, not asserted.** 1,780 tables carry RLS, all 1,780 are `FORCE`d, 2,782
  `tenant_isolation` policies exist, and the application role `unerp_api` is `NOBYPASSRLS`. Zero
  tables with a `tenant_id` lack a policy. The gate itself was strengthened first: it checked
  only `ENABLE`, so a table could report PASS while the owner — the role that runs migrations and
  seeds — read every tenant's rows, and it printed the app role's bypass flag without failing on
  it. Both now fail the build, proven by dropping `FORCE` on one table and watching it fail.
- **`Float` money is at zero.** Seven columns that hold or multiply money were converted
  (`Decimal(19,4)` for amounts, `Decimal(9,6)` for tax, discount, interest and cost-allocation
  rates, because drift in a rate becomes drift in the money it multiplies). The other 22 the name
  heuristic flagged are genuinely dimensionless — SPC measurements, ML accuracy, OTIF delivery
  rates, hours, unit counts — and are recorded field-by-field with reasons in
  `scripts/ci/float-classification.json`. The rule reads that file and is **fail-closed**: an
  unlisted `Float` matching the heuristic is still a violation, proven by injecting a new
  `settlementAmount Float` and watching the gate catch it.

**Two latent defects surfaced while doing this and were fixed.** `pnpm db:deploy` applied
**nothing** — the R2 multi-file schema split made Prisma resolve migrations relative to
`prisma/schema`, so it looked in `prisma/schema/migrations`, found none, reported "No pending
migrations to apply" and exited 0 while 175 migrations sat in `prisma/migrations`. A deploy that
silently applies nothing and succeeds is worse than one that fails; the path is now pinned in
`prisma.config.ts`. Separately, `pgbouncer` was defined inside the `volumes:` block of
`docker-compose.dev.yml` rather than `services:`, which made the whole compose file fail
validation, and its credentials authenticated against nothing in the stack.

**§ 7.2 is delivered.** The thirteen `@kannan19302/ui-*` packages were merged into `packages/ui/src/<area>`
and deleted; `@kannan19302/ui` now publishes one build graph with thirteen subpath exports
(`@kannan19302/ui/components`, `@kannan19302/ui/charts`, …) emitted to `dist/<area>/index.js`, with CSS mirrored
alongside. No application file imported an `@kannan19302/ui-*` package directly, so the change is
contained to `packages/`, `packages/config/typescript/*`, `packages/storybook`, and one
`serverExternalPackages` list in `apps/web/next.config.mjs` that shrank from fourteen entries to
one. Workspace typecheck is 24/24 green and the design system's 37 tests pass. This removes the 42
version-coherence problems per release that extracting fourteen packages would have created, and it
was free to do now — after extraction it would have been a breaking change across a published
boundary.

**M2 is now real, and Phase 2's exit criterion is met.** The previous harness could not fail: its
two typecheck functions were defined and never called, its envelope validator had empty bodies,
and its version check only warned. It has been rebuilt to do what § 4.5 specifies — each of the 12
consumers publishes `cdc/expectations.json`, the exact set of symbols it imports from each
`@kannan19302/*` provider, and the harness replays that corpus against the provider's current exported
surface, resolving `export *` chains to enumerate what a provider really exports.

It is proven against three deliberately injected breaks, each failing with exit 1 and naming the
consumer and symbol, and passing again on revert:

1. removing `Spinner` from `@kannan19302/ui` — caught for `web`, `developer` and `framework`;
2. removing `hasPermission` from `@kannan19302/shared` — caught for `api` and `idp`, reached through the
   `.js`-specifier re-export chain;
3. a stale published expectation — caught as drift.

A provider whose entrypoint re-exports a package outside the workspace (`@kannan19302/database` →
`@prisma/client`) has a surface the harness cannot enumerate; absence is unprovable there, so it
is reported as an OPEN surface and its misses are warnings. Claiming otherwise would make the gate
lie in the direction that matters. Only `@kannan19302/database` is currently open.

**The control plane is currently fail-closed.** No role grants `system.*`, so platform-operator
endpoints are unreachable by anyone. That is the correct posture; provisioning platform-staff
roles — outside tenant role seeding, which the new gate now forbids — is a prerequisite for the
console.

### Phase 0 — Foundation restoration _(in flight — unchanged, blocking)_

R1 type-safety ratchet · R3 close 364 RLS gaps · R4 CI/CD · R5 hygiene · R7 supply chain ·
R11 the 92 `Float` money fields · R13 the red `schema:lint` on `main`.

Exit: ratchet monotonically decreasing, RLS coverage 1,029/1,029, CI green on `main`, CD to
staging working. **Rollback: `v1.0.0`.**

> **Why this blocks the split.** With 100% `@ts-nocheck`, the compiler is already blind. Splitting
> now removes the _only_ remaining mechanism (a shared tsconfig graph) that could ever restore
> cross-boundary checking, and fragments a single ratchet baseline into fifteen. Phase 0 must at
> minimum be _underway with a falling ratchet_ before Phase 3 begins.

### Phase 1 — Separate the control plane _(~4 weeks, in-repo)_

The § 1.2 exposure is the most serious architectural defect and is fixable without touching
business logic or repository boundaries.

1. Introduce `apps/api/src/platform/`; move provider-only controllers from `modules/saas` and
   `modules/admin` under `/api/platform/v1` behind `ControlPlaneGuard`. **Keep old routes alive
   as deprecated aliases** — zero client breakage.
2. Create `apps/console` from the existing `(dashboard)/saas/*` tree, on its own origin, cookie
   scope, IdP realm, with mandatory MFA and IP-allowlisted ingress.
3. Delete `(dashboard)/saas/*` from `apps/web` once console parity is verified.
4. Consolidate `(dashboard)/saas-portal/*` into `(dashboard)/settings/*` — one tenant admin
   surface, not two.

Rollback: revert the console deploy; deprecated aliases still serve.

### Phase 2 — Make the split survivable _(~10 weeks, still in-repo)_

**Everything here happens _before_ the first extraction, because all of it is cheap inside one
repo and expensive across fifteen.**

1. **Stand up `packages/contracts`** and generate OpenAPI, DTOs, and clients from it. Migrate
   context by context; generated-vs-committed drift becomes a blocking gate.
2. **Build the CDC harness (M2)** and prove it across the existing internal package boundaries.
3. **Build the workspace CLI and manifest (M1, M4)** — `clone`, `link`, `up`, `verify` — and
   prove the golden path against the current monorepo.
4. **Wire the choreography bot (M3)** against the existing `packages/*` graph.
5. **Rename the 60 `saas-deepening-*` files** into real bounded contexts. One mechanical pass.
   _Free now; a breaking change after extraction._
6. ~~**Collapse the 14 `ui-*` packages into one `@kannan19302/ui`** with subpath exports (§ 7.2).~~
   **Done 2026-08-05.** _Extracting 14 packages would have created 42 version-coherence problems
   per release._
7. **Split `schema.prisma`** into per-context files (R2). Zero runtime risk.
8. Declare the Tier A/B manifest; enable `max-lines` on new and modified files only.

Exit criteria — **all four mechanisms demonstrably working inside the monorepo.** If M2 cannot
catch a deliberate breaking change here, it will not catch one across repositories.

### Phase 3 — Extract, lowest layer first _(~12 weeks)_

Each extraction: `git filter-repo` to preserve history → publish first version → switch consumers
to the published package → delete from the monorepo → tag. One layer at a time, with the golden
path green before the next.

**3.1 is done (2026-08-05).** `D:/UniERP/unierp-contracts` exists as its own git
repository, tagged `v1.0.0` at the extraction point, and **typechecks standalone with
zero runtime dependencies** — which is what actually demonstrates that L0 is
independent rather than merely declared to be. Its CI asserts the zero-dependency
invariant mechanically (proven able to fail on an injected dependency), because
"we all know not to add a dependency to L0" is the kind of rule that survives
until the first inconvenient Tuesday.

Two constraints shaped how it was done, and both are worth recording:
`git-filter-repo` is not installed and the monorepo working tree was dirty, so
history could not be rewritten across the boundary; `packages/contracts` carried
a single commit, so a fresh initialisation loses essentially nothing here — but
**3.2 onward will need filter-repo and a clean tree**, because those packages
have real history worth keeping.

**3.2 is done (2026-08-05).** `unierp-kernel`, `unierp-design-system` and
`unierp-sdk` are extracted, each tagged `v1.0.0`. They were safe to do in
parallel because each depends only on L0, never on each other.

**Each carries a mechanical layering gate** (`scripts/check-layer.mjs`, wired
into its CI) asserting § 4.2's invariant: a repository may depend only on
published artifacts of a strictly lower layer, never sideways, never upward.
The gate is proven able to fail — adding `@kannan19302/database` to the design system
exits 1 and names the violation. That check is the entire argument for the
split; left as prose it is a convention that lasts until someone adds an import,
and the measured state today is:

| Repository             | Workspace dependencies | Verdict                                   |
| :--------------------- | :--------------------- | :---------------------------------------- |
| `unierp-contracts`     | none                   | L0 root, acyclic by construction          |
| `unierp-kernel`        | `@kannan19302/contracts`     | downward only                             |
| `unierp-design-system` | none                   | **cannot import a service, structurally** |
| `unierp-sdk`           | `@kannan19302/contracts`     | downward only                             |

**3.3 is done (2026-08-05), with full history.** `unierp-data` carries **61
commits and 178 migrations**, extracted via `git-filter-repo`. History mattered
here in a way it did not for the shallower packages: those commits are the audit
trail of every schema change the platform has made. Both prerequisites were
resolved rather than worked around — `git-filter-repo` was installed, and the
monorepo was committed to give the extraction a clean baseline.

**A note on how L0/L1 were extracted.** Those predate the above and did not carry
history: the affected packages hold 1–8 commits each, so little was lost, and for
`packages/ui` working state was actually _required_ — its 60 uncommitted files
were the § 7.2 collapse, and extracting from committed history would have shipped
the pre-collapse thirteen-package design system.

#### 3.3 remainder through 3.8 are done (2026-08-05)

Every layer that has source is now its own repository, each with history
preserved by `git-filter-repo` and tagged `extracted-2026.08.0`:

| Repo                       | Layer | Commits | Note                                          |
| :------------------------- | :---- | ------: | :-------------------------------------------- |
| `unierp-contracts`         | L0    |       2 | zero dependencies, gate-enforced              |
| `unierp-kernel`            | L1    |       2 | → L0 only                                     |
| `unierp-design-system`     | L1    |       2 | zero workspace deps — cannot import a service |
| `unierp-sdk`               | L1    |       2 | → L0 only                                     |
| `unierp-data`              | L2    |      62 | 178 migrations, full audit trail              |
| `unierp-framework`         | L2    |       9 | the schema-driven page runtime                |
| `unierp-extension-api`     | L2    |       3 | 3-year support promise                        |
| `unierp-api`               | L3    |     175 | what remains of the monolith                  |
| `unierp-web`               | L4    |     102 | tenant plane                                  |
| `unierp-console`           | L4    |       5 | control plane — **cannot link tenant code**   |
| `unierp-corporate-website` | L4    |      15 | renamed `master` → `main` per § 4.6           |
| `unierp-mobile`            | L5    |      15 | Dart, different toolchain and cadence         |
| `unierp-extensions`        | L6    |       4 | the four verticals                            |
| `unierp-infra`             | L7    |      15 | compose, load tests, runbooks                 |
| `unierp-workspace`         | L7    |      60 | manifest, gates, CI                           |

`unierp-desktop` (L5) is **not** extracted, and correctly so: § 4.2 defines it as
a Tauri shell that consumes `unierp-web`'s _build output_, "split from web at the
artifact level, not the source level". There is no source to extract.

#### The publish path is proven, not assumed

§ 14's step sequence is `filter-repo → publish first version → switch consumers
→ delete from the monorepo → tag`. Steps 1, 2, 3 and 5 are now demonstrated.

A local Verdaccio registry — the mechanism § 12.1 already specifies for exactly
this ("a local Verdaccio registry is available for rehearsing the publish path")
— was stood up, and **seven packages were published from their extracted
repositories**: `@kannan19302/contracts`, `@kannan19302/kernel`, `@kannan19302/ui`, `@kannan19302/sdk`,
`@kannan19302/extension-api`, `@kannan19302/framework`, `@kannan19302/database`.

**A correction to an earlier claim in this section.** It previously recorded that
`unierp-kernel` "typechecks standalone against the published artifact", offered
as proof the boundary works. It was not proof: `unierp-kernel` names
`@kannan19302/contracts` only in a comment and never imports it, so that typecheck
passed without ever resolving the package. It demonstrated that the install
succeeded, nothing more — the same vacuous-pass shape as the RLS suite and the
CDC harness, and this one was self-inflicted.

The real proof is `unierp-framework` → `@kannan19302/ui`, which genuinely imports:
after the fixes below it **compiles with zero errors against `@kannan19302/ui@1.0.3`
resolved from the registry**.

#### Publishing the packages proved they were not installable

Three defects, each of which shipped a package a consumer could not use, and
none visible until something actually tried to consume one:

1. **`dist/` was never in the tarball.** `.gitignore` lists it, and with no
   `files` field and no `.npmignore`, npm falls back to `.gitignore` — so every
   package published without the directory its `main` and `types` point at.
   Fixed with an explicit `files` allowlist.
2. **`workspace:` specifiers survived publication.** `pnpm publish` rewrites
   them to real versions; `npm publish` does not, and a consumer outside the
   workspace cannot resolve `workspace:*`.
3. **`tsconfig` extended a path outside the repository** (`../config/typescript/
base.json`), so four extracted repos could not typecheck standalone — which
   means they had not really been extracted, only copied.

This is the argument for § 14's ordering restated as evidence: extraction is not
finished when a directory exists and a tag is written. It is finished when a
consumer can install the artifact and compile against it.

Publishing also surfaced a contradiction worth recording: three of the extracted
packages carried `private: true`, a monorepo-only marker meaning "never publish
this", on layers § 4.2 defines as _publishing an artifact others consume_. The
flag was correct for a workspace package and wrong for an extracted one.

**What remains is step 4 — deleting each package from the monorepo — and that is
deliberately not done.** It is only safe once _every_ consumer of a package has
switched, and § 14 rule 4 requires the monorepo to stay buildable at each
extraction tag until they have. Doing it now would dismantle the working system
to reach a topology whose consumers still point at workspace paths. The
monorepo therefore stays authoritative and `pnpm verify` stays 14/14, which is
the designed intermediate state rather than an unfinished one.

#### Two defects the extraction surfaced

Extraction turns out to be a diagnostic, because `git-filter-repo` carries
everything faithfully and a layering gate then judges the result:

- **A stray 93 KB `migration.sql`** sat at `packages/database/` — a UTF-16 diff
  dump beside the package manifest, outside `prisma/migrations`, referenced by
  nothing, committed and forgotten. It arrived at the root of the extracted
  repository, where a file of that name reads as though it means something. It
  was deleted in the monorepo first, so the split inherits a clean tree rather
  than preserving somebody's leftover for another five years.
- **A phantom dependency on `@kannan19302/shared`** in `packages/database`, declared
  and never imported — the only mention in the package is a comment naming an
  error code. The L2 layering gate flagged it as a dependency § 4.2 does not
  permit at L2. The violation was not real, but _a declared dependency is what a
  consumer resolves_, so a phantom one is indistinguishable from a genuine breach
  and would have installed a package the data layer has no business pulling in.
  L2 now depends on `@prisma/client` alone.

**Every extraction so far is additive.** The monorepo copies are untouched and
still authoritative; consumers have not switched, because switching requires a
registry to publish to. Full `pnpm verify` is 14/14 green after each extraction,
which is the § 14 rule — the monorepo remains buildable at each extraction tag
until its consumers move. Rollback is deleting a directory.

```
3.1  L0   unierp-contracts                                    ← DONE 2026-08-05
3.2  L1   unierp-kernel · unierp-design-system · unierp-sdk   ← DONE 2026-08-05
3.3  L2   unierp-data (DONE 2026-08-05, full history) · unierp-framework · unierp-extension-api · unierp-framework · unierp-extension-api
3.4  L3   unierp-api                                          ← what remains of the monolith
3.5  L4   unierp-web · unierp-console                         ← now depend on SDK, not on api/
3.6  L4   unierp-www          (rename master → main)          ← already separate; align it
3.7  L5   unierp-mobile · unierp-desktop                      ← mobile is fully independent
3.8  L7   unierp-infra · unierp-workspace                     ← promote from the monorepo
```

**Rollback at every step:** the monorepo remains buildable at each extraction tag until its
consumers have switched. An extraction that fails the golden path is reverted by pointing
consumers back at the workspace path — a one-line `pnpm` override change.

**Gate between 3.4 and 3.5.** This is the split that costs the most (it is where the compiler
boundary between backend and frontend appears). Do not proceed until CDC coverage of the
API↔web boundary is complete and has caught at least one deliberately injected break.

### Phase 4 — The extension platform _(~10 weeks; the strategic bet)_

1. Publish `@kannan19302/extension-api` v1 — manifest schema, extension points, typings.
2. **Build the sandbox (§ 8.3) before anything runs in it.** Non-negotiable ordering.
3. Extension registry: install, enable, disable, upgrade, uninstall, per tenant, bound to
   licensing entitlements.
4. Migrate **one** vertical — `real-estate`, the least regulated — from its repository into
   `unierp-extensions` as the first real consumer. Expect the API to change; that is the point of
   doing it before publishing externally.
5. Migrate the remaining three. Archive the four satellite repos at their `v1.0.0` tags; do not
   delete them.
6. Reference-extension compatibility suite becomes a release blocker.

Rollback: the satellite repos remain deployable at `v1.0.0` throughout. A vertical that fails as
an extension goes back to its service with no data migration — the tenant data never moved.

### Phase 5 — Studio and marketplace _(~12 weeks)_

Promote `modules/builder` to `developer/` on the public extension API — the same API the verticals
now use. Workflow Designer, Form Builder, Report Builder, API Builder, Job Scheduler, and the
plugin framework become _clients of that API_ with no privileged path. Marketplace listing,
review, signing, and payout in the Platform Admin Console. AI-assisted generation last, producing
declarative artifacts only.

### Phase 6 — Scale and operability _(continuous)_

R9 SLOs, alerts, runbooks · R10 capacity model, PgBouncer, partitioning, read replicas ·
per-tenant cost attribution · release-pipeline telemetry · DR rehearsal cadence.

### What is explicitly _not_ in the programme

- No rewrite of any business module.
- No new backend service. Repository count goes 6 → 15; **backend deployable count stays at 1**,
  total deployable count 5 → 3 (plus mobile/desktop artifacts).
- No database engine change, no framework change, no language change.
- No breaking API change. Every route that works at `v1.0.0` works after Phase 6.

### Timeline

| Phase | Weeks | Cumulative | Gate to proceed                                                     |
| :---- | ----: | ---------: | :------------------------------------------------------------------ |
| 0     |  8–14 |       8–14 | Ratchet falling · RLS 1,029/1,029 · CI green on `main` · CD working |
| 1     |     4 |      12–18 | Console live on its own origin; no provider route in the tenant app |
| 2     |    10 |      22–28 | **M1–M4 proven inside the monorepo**                                |
| 3     |    12 |      34–40 | Golden path green after each layer                                  |
| 4     |    10 |      44–50 | Four verticals running as extensions on the public API              |
| 5     |    12 |      56–62 | Marketplace open with sandbox enforced                              |
| 6     |     — | continuous | —                                                                   |

Phases 0–1 may overlap. **Phase 2 may not start before Phase 0 shows a falling ratchet, and
Phase 3 may not start before Phase 2's exit criteria are met.** Those two gates are the whole
risk-management strategy.

---

## 15. Evaluation against the reference platforms

| Axis                         | Salesforce         | ServiceNow       | Power Platform   | SAP / Oracle | Odoo / ERPNext            | **UniERP (target)**                                     |
| :--------------------------- | :----------------- | :--------------- | :--------------- | :----------- | :------------------------ | :------------------------------------------------------ |
| Control / tenant plane split | ✅ Strong          | ✅ Strong        | ✅ Strong        | ✅           | ⚠️ Weak                   | ✅ **Separate repo, origin, realm, ingress** (Phase 1)  |
| Metadata-driven UI           | ✅ Lightning       | ✅ UI Builder    | ✅ Model-driven  | ⚠️ Heavy     | ✅ Views/XML              | ✅ `@kannan19302/framework` — **already the strongest asset** |
| Low-code tier                | ✅ Flow            | ✅ Flow Designer | ✅ Best-in-class | ⚠️           | ✅ Studio                 | ✅ Builder → Studio (Phase 5)                           |
| Pro-code sandbox             | ✅ Apex (governed) | ✅ Server script | ⚠️ Limited       | ✅ ABAP/CAP  | ❌ **Unsandboxed Python** | ✅ **V8 isolates + capabilities** (Phase 4)             |
| Marketplace                  | ✅ AppExchange     | ✅ Store         | ✅ AppSource     | ✅           | ✅ Apps                   | ✅ Phase 5                                              |
| Public, versioned API        | ✅                 | ✅               | ✅               | ✅           | ⚠️ ORM-coupled            | ✅ Contract-generated, SemVer, own repo                 |
| Multi-language SDKs          | ✅                 | ⚠️               | ✅               | ✅           | ⚠️                        | ✅ Generated (TS/Py/Java/Go/Dart)                       |
| DB-enforced tenant isolation | ✅ Proprietary     | ✅               | ✅               | ✅           | ⚠️ App-layer              | ✅ **Postgres RLS, forced, per-table proof**            |
| Self-hostable                | ❌                 | ❌               | ❌               | ⚠️ Costly    | ✅                        | ✅ **Fully, no proprietary runtime**                    |
| On-premise / private AI      | ❌ Cloud only      | ❌               | ❌               | ⚠️           | ❌                        | ✅ **Ollama + pgvector, local-first**                   |
| Open source                  | ❌                 | ❌               | ❌               | ❌           | ✅                        | ✅                                                      |
| Cost of entry                | High               | Very high        | Medium           | Very high    | Low                       | Low                                                     |

**Where the target is genuinely competitive** — consequences of decisions already made in this
codebase:

1. **Self-hostable with a real extension platform.** Salesforce and ServiceNow have the platform
   but not self-hosting. Odoo and ERPNext have self-hosting but a materially weaker isolation
   story — Odoo's Python extensions run unsandboxed in the server process. That intersection is
   close to empty, and it is the addressable market for regulated, sovereign, and data-resident
   buyers.
2. **Database-enforced tenant isolation.** Postgres RLS with `FORCE` and a `NOBYPASSRLS` role is
   stronger and more auditable than an application-layer filter, and explainable to an auditor in
   one sentence.
3. **Local-first AI.** Every named competitor requires sending ERP data to a vendor's model. For
   healthcare, government, defence, and EU-regulated buyers this is frequently disqualifying.
   The clearest single differentiator in the product.
4. **Layered polyrepo with a published extension API.** This is structurally closer to how
   Salesforce and ServiceNow separate platform from application than to how Odoo does — and it is
   the topology that lets partners and a partner ecosystem exist at all.

**Where the gap is real and must be closed by execution, not design:**

| Gap                      | Reality                                                                                                                                                                                                                                                                            |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Proof of correctness** | Competitors have decades of production ledger validation. 100% `@ts-nocheck` and 92 `Float` money fields are the opposite. **Phase 0 is the entire answer and there is no shortcut.**                                                                                              |
| Ecosystem                | AppExchange has thousands of apps. Ecosystems take years and cannot be architected into existence — only _enabled_, which is what Phases 4–5 do.                                                                                                                                   |
| Localisation depth       | SAP ships statutory compliance for 100+ countries. Content and partner work, not architecture; the `localization` module is the right hook.                                                                                                                                        |
| Operational maturity     | SLOs, alerts, runbooks, rehearsed DR (Phase 6).                                                                                                                                                                                                                                    |
| **Release engineering**  | Salesforce and ServiceNow run hundreds of repos with dedicated release-engineering teams. **A fifteen-repo topology requires that function to exist.** M1–M4 are that function expressed as automation rather than headcount — but they must be built and maintained, not assumed. |

**Conclusion.** The architectural decisions in this codebase — modular monolith, Postgres-only
with RLS, transactional outbox, schema-driven UI, design tokens, local-first AI — are the
decisions that make a twenty-year platform possible, and they are already made. Four things stand
between this and the reference set: the control plane is not isolated (Phase 1), the guarantees
are not mechanically proven (Phase 0), the extension API is not public or sandboxed (Phase 4),
and operations are not rehearsed (Phase 6). **None requires a different architecture. All four
require finishing this one.** The repository split is an accelerant on ownership, contract
honesty, and structural acyclicity — and a tax on daily change velocity that M1–M4 exist to pay.

---

## 16. Architecture Decision Records to add to `ai/TRD.md § 9`

**ADR-006 — Control plane separated by origin and guard, not by process.** Provider-global
operations are exposed on a separate frontend deployable (`unierp-console`), separate origin,
separate IdP realm, restricted ingress, while their business logic remains in `unierp-api` behind
`/api/platform/v1`. _Rationale:_ the threat is a customer reaching provider operations, closed by
network + origin + identity + guard; a second process would add a distributed transaction to every
provisioning operation and close nothing further. _Consequence:_ the router boundary must be
mechanically enforced so later process extraction is a deployment change.

**ADR-007 — The four vertical services are re-absorbed as first-party extensions.** Supersedes the
vertical-extraction portion of ADR-003. _Rationale:_ they are 2% of the code, meet none of
ADR-003's extraction criteria, and cost more in coordination than they return. Independent
lifecycle is better served by the extension model, which additionally forces the public extension
API to be proven by first-party use before partners depend on it. _Consequence:_ four repositories
are archived at `v1.0.0`, not deleted; the extension API must be good enough to carry healthcare.

**ADR-008 — `unierp-contracts` is the single source of API and event truth, and the root of the
dependency graph.** It has zero dependencies by construction. OpenAPI, DTOs, clients, and event
typings are generated; drift fails the build. _Consequence:_ hand-editing generated output is a
build failure; adding an endpoint means editing the contract first.

**ADR-009 — Tier-3 extension code runs in a capability-scoped V8 isolate.** No ambient authority,
no `require`, no global `fetch`; data access through the tenant-scoped repository so RLS applies
identically. _Consequence:_ the sandbox is a prerequisite for the marketplace, not a follow-up.

**ADR-010 — Native Windows is a first-class, CI-verified development target.** No build, test, or
verify path may require WSL or bash. _Consequence:_ a `windows-latest` job is permanent in all
fifteen repositories, and Node/PowerShell are the only permitted scripting languages in tooling.

**ADR-011 — Fifteen repositories in eight strictly ordered layers; runtime stays three
deployables.** A repository may depend only on published artifacts of a strictly lower layer.
_Rationale:_ structural acyclicity, honest public contracts, and layer-aligned ownership are worth
more over a twenty-year horizon than the daily convenience of a monorepo. _Consequence, accepted
explicitly:_ cross-boundary compiler feedback, atomic multi-repo change, and single-lockfile
coherence are given up, and must be replaced by M1–M4 before the first extraction. **This ADR is
void if M1–M4 are not delivered — the split without the mechanisms is worse than no split, and
§ 1.1 is the measured evidence for that claim.**

**ADR-012 — The release train and signed manifest are the unit of deployment and rollback.** No
environment runs an unpinned combination of component versions. _Consequence:_ rollback is one
manifest, not fifteen repositories; every migration must stay backward-compatible for one full
train.

---

## 17. Principal risks

| Risk                                                                         | Mitigation                                                                                                                                                                                            |
| :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The split proceeds without M1–M4** — the dominant risk in this document    | Phase 2's exit criteria are CI-checked, not judged. Phase 3 cannot begin until M2 has caught a deliberately injected break. ADR-011 is void without them.                                             |
| Phase 0 is deferred and the split lands on unproven foundations              | Phase 2 is gated on a falling ratchet in CI. The gate is the mitigation.                                                                                                                              |
| Cross-repo change velocity collapses; developers work around the boundaries  | M3 choreography + `unierp ws link`. Lead time from L0 commit to deployed train is measured as a production metric (§ 11). If it regresses past target, merge layers back.                             |
| Version-coherence hell across fifteen repos                                  | M1 manifest is the only source of truth; the golden path (M4) is the only deploy authorisation. 14→1 UI collapse before extraction removes the worst case.                                            |
| Fifteen `node_modules` trees exhaust the Windows dev machine                 | Single shared pnpm content-addressed store on one NTFS volume; developers link only 2–3 repos at a time (§ 12.1).                                                                                     |
| Supply-chain surface widens 15×                                              | Per-repo OIDC-federated short-lived publish tokens, package signing + provenance, scope reservation, signed manifest (§ 10).                                                                          |
| Extension API v1 published before it is right                                | Four first-party verticals migrate onto it first. Breaking changes are free until publication.                                                                                                        |
| Control-plane route leaks into the tenant plane                              | Route inventory diffed in CI; any `platform/` controller reachable from the tenant router fails the build. After Phase 3 the repo boundary makes it structurally impossible.                          |
| Sandbox escape                                                               | Capability model + isolate + resource quotas + egress allowlist + per-extension kill switch. Assume escape; limit blast radius.                                                                       |
| Governance/CI files drift across fifteen repos — **already observed at six** | All generated from `unierp-workspace` templates and drift-checked. No file is ever hand-copied between repos.                                                                                         |
| RLS query planning is the first scaling wall                                 | Explicitly load-tested in Phase 6 rather than discovered in production.                                                                                                                               |
| The programme outlives the attention it needs                                | Every phase is independently valuable and independently revertable. Stopping after Phase 1 still leaves the platform materially safer than `v1.0.0`; stopping after Phase 2 leaves a better monorepo. |

---

## 18. Amendment log

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | By          |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| 2026-08-07 | **The monorepo is retired.** `ERPSys` is archived on GitHub (read-only, history preserved) and removed locally, after file-by-file parity was verified for every app, package, the Flutter client and the four extensions, and after the governing documents and CI gates were moved into this repository. `D:/UniERP` now holds the 30 layer repositories and nothing else; the VS Code workspace lists them in layer order rather than alphabetically. The platform was re-tested with the monorepo gone: `pnpm smoke` 18/18 against the containerised stack. | Claude Code |
| 2026-08-07 | **This document moved here from `ERPSys/docs/`, with the ten `docs/ai/` master files.** § 4.2 makes `unierp-workspace` the L7 meta-repository and the landing README already pointed at it for the architecture — a promise that was not kept while the governing documents lived only in the monorepo being retired. Also completed § 14 Phase 3 step 4 for the application layer: every `@kannan19302/*` published from its own repo, `workspace:*` gone, and `unierp-infra/docker-compose.platform.yml` composing images built from the split repos. `pnpm smoke` 18/18 against that stack. | Claude Code |
| 2026-08-06 | The working journey had stopped working: the API did not boot, because `packages/extension-api` and `packages/contracts` re-exported without file extensions and Node's ESM loader will not resolve those. `pnpm verify` was 14/14 green through the failure — every gate in the pipeline resolves modules through a bundler, and the only consumer that does not is the runtime. Fixed by six `.js` specifiers; proven by boot and by an 18/18 `pnpm smoke`. Added gate 15, `check-node-resolution.mjs`, which models Node's resolver over the emitted `dist/` and is proven able to fail; it found six further latent instances in `@kannan19302/shared`. Added § 14.1: the container story measured. `unierp-infra`'s compose was a byte-copy of the monorepo's that could never have started, and the Dockerfiles in `unierp-api`, `unierp-web` and `unierp-idp` failed on their first `COPY`; the compose is rewritten to the subset infra owns and the three Dockerfiles are removed, with each README stating where the image is really built. Recorded the one decision that unblocks per-repo images: a registry CI can reach. | Claude Code |
| 2026-08-02 | Document established at tag `v1.0.0`. Target hybrid repository architecture, four planes, ADR-006…010.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Claude Code |
| 2026-08-05 | Phase 3.2: extracted the L1 layer — unierp-kernel, unierp-design-system and unierp-sdk — each tagged v1.0.0 with a mechanical layering gate proven able to fail on an upward dependency. The design system has zero workspace dependencies, so "a UI component cannot import a service" is now structural. Flagged that 3.3 must wait for git-filter-repo: packages/database carries 59 commits of migration history that must survive extraction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Claude Code |
| 2026-08-05 | Phase 3 began: 3.1 extracted `unierp-contracts` to its own tagged repository. It typechecks standalone with zero runtime dependencies, and its CI asserts that invariant mechanically. Additive only — the monorepo copy stays authoritative until a registry exists, and verify remains 14/14. Recorded that 3.2 onward needs git-filter-repo and a clean tree.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Claude Code |
| 2026-08-05 | Phase 5 re-measured 20% → 55%: the marketplace was already substantially built (catalogue, install/uninstall, reviews, collections, vendor bundles, submission review) — the previous figure was an under-count of the same kind the Phase 1 table had. Closed the real gap: publishing a bundle required no signature at all, so approval shipped code to every tenant with authorship unestablished.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Claude Code |
| 2026-08-05 | Phase 4 → 88%: signed extension bundles (Ed25519, manifest inside the digest so scopes cannot be escalated in transit, verify-before-install, key revocation, 9 tampering tests).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Claude Code |
| 2026-08-05 | Phase 4 → 80%: built the § 8.2 extension data namespace (generated `ext_<id>_<entity>` tables with tenant_id, RLS FORCED, `Decimal(19,4)` money, additive upgrades, DDL built only from validated identifiers and a closed type map), which makes `data:write` grantable. Recorded a significant finding above: the migration/seed role is a superuser, so every isolation test that connects as the owner proves the application-layer scope rather than RLS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Claude Code |
| 2026-08-05 | Phase 4 advanced 40% → 65%. ADR-009 satisfied: the `node:vm` stub is replaced by a real `isolated-vm` capability sandbox with scope enforcement re-checked host-side, CPU/memory/query/egress budgets, and a kill switch, covered by 18 adversarial tests. The extension registry is no longer mocked — installations persist per tenant under RLS, the effective grant is the manifest∩installer intersection stored at install time, and every invocation is metered. Extension data writes and egress remain refused by the host until § 8.2's extension namespace exists.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Claude Code |
| 2026-08-05 | Design-token migration: hardcoded hex 984 → 305 in four verified passes, baselined at the new floor. Brand marks and the `connect` module's deliberate Google Material palette are excluded on stated grounds rather than swept. Recorded why the 3,215 pixel values are not being swept mechanically: spacing has no recoverable semantics and no visual regression coverage exists to catch a wrong substitution.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Claude Code |
| 2026-08-05 | R12 completed: unguarded controller routes 284 → 0, baselined at zero, with the 18 deliberately-public routes declared via a new `@Public("<reason>")` decorator that requires its justification at the call site. Closed a real hole found on the way — the service-management ticket controller had no guards at all. Fixed the API suite's apparent flakiness, which was Prisma exhausting Postgres' connection limit under 4 parallel forks, not the tests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Claude Code |
| 2026-08-05 | Phase 2's exit criterion met and both infrastructure-blocked Phase 0 items closed. M2 rebuilt from a harness that could not fail into one proven on three injected breaks and wired into `pnpm verify` + CI. RLS verified against PostgreSQL 16 (1,780 tables, ENABLE + FORCE, app role `NOBYPASSRLS`) after strengthening the gate, which had checked only ENABLE. `Float` money 29 → 0. Fixed two latent defects found on the way: `db:deploy` silently applied no migrations after the R2 schema split, and `pgbouncer` sat in the `volumes:` block. `pnpm verify` is 14/14 green with no skipped gate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Claude Code |
| 2026-08-05 | § 7.2 delivered: the 13 `@kannan19302/ui-*` packages merged into `packages/ui/src/<area>` and deleted, leaving one published artifact with 13 subpath exports. § 14 Phase 2 item 6 and the status table updated accordingly; Phase 2 now ~90%, gated only on M2.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Claude Code |
| 2026-08-05 | § 14 programme status re-measured against the tree and `check-policy.mjs --report`. Added a phase-completion table (~45% overall). Recorded as delivered since 2026-08-03: `apps/console` + `apps/idp` exist and `(dashboard)/saas*` is deleted from `apps/web` (Phase 1 deployable), M1 manifest, M2 CDC harness, M3 choreography bot, M4 workspace CLI, the `saas-deepening-*` rename, the 14-file Prisma split, and the R12 fix for 449 unauthenticated routes. Corrected unguarded routes 589 → 284 and hex 1,321 → 984; added pixel-value and HARD-rule rows. Identified § 7.2 (14 `ui-*` packages → one `@kannan19302/ui`) as the single outstanding item gating Phase 3.                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Claude Code |
| 2026-08-02 | **Revision 2.** Topology changed from 4-repository consolidation to a fully split, strictly layered 15-repository architecture in 8 layers. Added § 4.5 (M1–M4: release-train manifest, consumer-driven contract tests, change choreography, golden-path CI), § 12.1 (multi-repo Windows dev loop), § 13.1–13.2 (shared gates, four-stage pipeline), rewrote § 14 (7 phases, extraction in dependency order, mechanisms-before-extraction gate), added ADR-011 and ADR-012, expanded § 10 supply-chain and § 17 risks for the widened surface.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Claude Code |

---

## 19. End-to-end audit, 2026-08-06

Every checkable claim in §§ 1–17, measured against the tree rather than read. The script is
`scripts/ci/audit-architecture.mjs`; it prints CLAIM / MEASURED / VERDICT and is re-runnable, so
this section can be regenerated instead of remembered.

**The headline: the structure is real, the numbers are stale, and six mechanisms this document
describes in the present tense do not exist.** That last group is what matters — a document that
says a control exists is worse than one that says it is missing, because it stops anyone looking.

### 19.1 Confirmed — the claim matches the tree

| §       | Claim                                                             | Measured                                         |
| :------ | :---------------------------------------------------------------- | :----------------------------------------------- |
| 1       | 45 API modules                                                    | **45**                                           |
| 7.2     | 14 UI packages collapsed to one                                   | **1** (`packages/ui`)                            |
| 1 / Ph0 | `@ts-nocheck` 3,241 → 0                                           | **0** across 3,509 source files                  |
| R2      | `schema.prisma` split per context                                 | **16 files**                                     |
| 3       | control-plane router under `apps/api/src/platform`                | **23 files**                                     |
| 3 / Ph1 | `(dashboard)/saas*` deleted from `apps/web`                       | **0 routes**                                     |
| 4.6     | README, LICENCE, SECURITY, CONTRIBUTING, CODEOWNERS in every repo | **all 30 present**                               |
| 4.5 M4  | `unierp ws clone/link/up/verify/unlink`                           | present, `unierp-workspace/scripts/tools/ws.mjs` |
| 12.2    | `setup-windows.ps1`                                               | present, same directory                          |

### 19.2 Stale — true once, wrong now

| §   | Says               | Is                                                         |
| :-- | :----------------- | :--------------------------------------------------------- |
| 1   | 6 repositories     | **31** git repos locally                                   |
| 1   | 655,100 lines      | **635,720**                                                |
| 1   | 23 packages, 14 UI | **15 packages, 1 UI**                                      |
| 1   | 1,836 models       | **1,827**, 65 enums                                        |
| 4.2 | 15 repositories    | **24 layer repos** + landing + 4 satellites + the monorepo |

These are harmless in themselves and corrosive in aggregate: § 1 is titled "measured, not
assumed", and every figure in it is now assumed.

### 19.3 Absent — described in the present tense, does not exist

**This is the finding.** Each of these is written as a control that is in place.

1. **§ 5.1 / § 13.3 — the generated two-tenant isolation test.** The document says a test is
   "_generated from the schema_ by `unierp-data`", that "1,029 generated ones cost one script",
   and that "a table with no generated test is a build failure". **There is no generator.**
   `packages/database/scripts/` does not exist. **1,784 of 1,827 models carry `tenantId`**, and
   the isolation tests that exist are four hand-written files.

   What does exist is `check-rls-verify.mjs`, which reads the catalogue — `ENABLE`, `FORCE`,
   policy counts, the app role's bypass flag. That is necessary and it is not the same claim: it
   proves the configuration is right, not that one tenant fails to see another tenant's row.
   Today's finding that the one real two-tenant assertion **had never run in CI** is the same gap
   from the other end. This is the platform's central guarantee and its stated proof mechanism is
   fictional.

2. **§ 4.5 M4a — the federated suppression ratchet.** "An aggregate baseline in
   `unierp-workspace` that may never increase." No such baseline file exists. Fifteen
   individually-flat baselines can hide a rising total, which is exactly what M4a was written to
   prevent.

3. **§ 4.6 and § 13.1 — templates and drift checking.** "Generated from `unierp-workspace`
   templates and drift-checked — **never hand-copied**, which is exactly how the Dockerfile bug of
   § 1.1 propagated." There is **no templates directory**, and **0 of 9** workflows in
   `unierp-workspace` declare `workflow_call`. Every repo's CI is a copy. § 17 lists governance
   drift as a principal risk and names this as its mitigation.

4. **§ 10 — gitleaks "at pre-commit, pre-push, and CI in all 15 repos".** **0 repositories**
   reference gitleaks. A secret scan does exist — `scripts/ci/check-secrets.mjs`, running at all
   three layers — but only in the monorepo, and it is not the named tool.

5. **§ 10 — "every published package is signed and provenance-attested", cosign, OIDC-federated
   publish tokens.** **0 repositories** reference cosign or npm provenance. § 10 prices this as
   the answer to a fifteen-fold publish surface.

6. **§ 12.2 — "a `windows-latest` job in every repository, so the native Windows path cannot
   silently rot".** **0 repositories** have one. § 12 names Windows as the primary development
   platform and this as the enforcement.

### 19.4 Partial — real, but narrower than described

| §      | Claim                                            | Measured                                 |
| :----- | :----------------------------------------------- | :--------------------------------------- |
| 4.5 M1 | the manifest pins every repository               | **14 components** against 24 layer repos |
| 4.5 M2 | every consumer publishes `cdc/expectations.json` | **8** of the split repos carry one       |
| 4.2    | every repository sits in a layer                 | `unierp-storybook` sits in none          |
| 10     | SBOM per image **and per published package**     | **2** repos generate one                 |
| 10     | registry allowlist in every `.npmrc`             | **14** repos pin a registry              |

### 19.5 What this changes

Nothing in §§ 2–9 is wrong as _design_. The gap is between the design and the mechanisms that were
supposed to make it self-enforcing, and § 2's fourth force is the one being violated: "every
guarantee must be mechanically provable… structure that cannot be checked by a script will decay."
Six of the checks named in this document were never written, so six guarantees have been resting
on the sentence that describes them.

The isolation-test generator (19.3 item 1) is the one to build first. It is the only item whose
absence touches customer data.


