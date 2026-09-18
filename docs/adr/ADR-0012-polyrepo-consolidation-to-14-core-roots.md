# ADR-0012: Polyrepo Consolidation to 14 Canonical Brand-Neutral Roots

- Status: Accepted
- Supersedes: ADR-0010 (Platform North Star and Polyrepo Architecture Boundaries)
- Date: 2026-09-18
- Decision Owner: UniERP Platform Architecture and Engineering Governance
- Target Estate: Exactly 14 Git roots (`contracts`, `design-system`, `shared`, `data`, `api`, `idp`, `marketing-site`, `provider-admin`, `business-suite`, `tenant-admin`, `developer-platform`, `mobile`, `desktop-app`, `platform`)

---

## 1. Context

In ADR-0010 (accepted 2026-09-03), UniERP established an 8-layer dependency law across a flat estate of 31 independent Git repositories. While this established strict downward architectural discipline, managing 31 distinct repositories introduced operational friction:
1. Fragmented CI/CD execution and uncoordinated pull requests across 31 separate Git lifecycles.
2. Fragile cross-repository relative links (`file:../auth`, `file:../contracts`, `../unierp-workspace`).
3. Port collision hazards across presentation applications.
4. Redundant boilerplate files (`AGENTS.md`, `.github/workflows`, `tsconfig.json`) duplicated across identical domains.
5. Inability to execute cohesive monorepo-grade typechecking and integration testing.

To solve this without sacrificing product boundaries, enterprise tenancy, or boundary enforcement, the platform consolidates the polyrepo into **14 canonical brand-neutral Git roots**, structuring monorepos cleanly with pnpm workspaces while retaining immutable package identities, clear tenant/provider authority separation, and autonomous lifecycle velocity.

---

## 2. Decision

UniERP formally adopts the **14-Root Consolidated Polyrepo Model**, establishing package-level layering within multi-package repositories, strict separation of Tenant ERP and Tenant Administration, and contiguous network port allocations.

### 2.1 The 14 Canonical Git Roots

The active estate is governed strictly by the root `UniERP.code-workspace`, containing exactly these 14 root repositories:

| Root Repository | Layer Scope | Platform Owner | Description |
|---|---|---|---|
| `contracts` | L0 | `PLT-BIZ` | Schema, OpenAPI, event, and DTO contracts (zero dependencies) |
| `design-system` | L1, L4 | `PLT-DS` | Strata Design System components (L1) and Storybook documentation app (L4) |
| `shared` | L1, L2 | `PLT-OPS` | Cross-platform utilities/validators (L1), config (L1), framework (L2) |
| `data` | L2 | `PLT-BIZ` | PostgreSQL Prisma schema, immutable migrations, and RLS policies |
| `api` | L3 | `PLT-BIZ` | Core NestJS business logic backend (Port 3001) |
| `idp` | L3 | `PLT-IAM` | Sovereign Identity Provider (OIDC / SAML / WebAuthn, Port 3005) |
| `marketing-site` | L4 | `PLT-MAR` | Unified Landing Page & Platform Gateway (Port 4000) |
| `provider-admin` | L4 | `PLT-PAO` | Provider Admin Console — PCC (Port 4001, formerly `provider-admin-os`) |
| `business-suite` | L4 | `PLT-ERP` | Tenant ERP Business Suite — ERP (Port 4002, formerly `tenant-apps`) |
| `tenant-admin` | L4 | `PLT-TAD` | Tenant Administration Console — OCC (Port 4003) |
| `developer-platform` | L4, L6 | `PLT-DEV`, `PLT-MKT`, `PLT-SITE` | Developer portal (Port 4004), Marketplace (Port 4005), Extensions (L6) |
| `mobile` | L5 | `PLT-MOB` | Flutter multi-platform mobile application (Port 4006) |
| `desktop-app` | L5 | `PLT-DESK` | Electron / Node desktop application shell (Port 4007) |
| `platform` | L7 | `PLT-OPS` | Operational infra (`platform/infra`), workspace governance (`platform/workspace`) |

---

### 2.2 Key Architectural Refinements

1. **Provider Admin Console (`provider-admin`)**:
   - Renamed from `provider-admin-os` to `provider-admin`.
   - Host for the Provider Control Center (PCC) managing multi-tenant infrastructure, billing, and cluster health on Port `4001`.

2. **Standalone Separation of `business-suite` & `tenant-admin`**:
   - Split previously merged `tenant-apps` into two distinct Git roots:
     - `business-suite` (Port `4002`): End-user enterprise ERP modules (Finance, CRM, SCM, HCM, Projects).
     - `tenant-admin` (Port `4003`): Organization Control Center (OCC) for tenant administrators (IAM, RBAC, domain routing, integrations).
   - Enforces the non-negotiable security invariant: End-user ERP workspaces must never implicitly bundle or expose tenant governance surfaces.

3. **Elimination of Nested Sub-Repo Sprawl**:
   - Multi-package repositories (`developer-platform`, `shared`, `design-system`) are structured using official `pnpm-workspace.yaml` monorepo workspaces.
   - Redundant nested root files (`.gitignore`, `.dockerignore`, `.gitleaks.toml`, `LICENSE`) are pruned from internal folders and governed at the root.

---

### 2.3 Package-Level Layering

Layering applies at the package identity level:

1. **`shared` Root**:
   - `@kannan19302/shared` is **L1** (foundational utilities and validators).
   - `@kannan19302/config` (nested in `shared/config`) is **L1** (typed configuration helpers).
   - `@kannan19302/framework` (nested in `shared/framework`) is **L2** (runtime framework primitives).
   - *Rule*: `@kannan19302/framework` (L2) may depend on `@kannan19302/shared` (L1); `@kannan19302/shared` MUST NOT depend on `@kannan19302/framework`.

2. **`design-system` Root**:
   - `@kannan19302/ui` is **L1** (pure reusable presentation components).
   - `@kannan19302/storybook` (nested in `design-system/storybook`) is an **L4** application surface.
   - *Rule*: Storybook depends downward on `@kannan19302/ui`; the design system never imports Storybook.

3. **`developer-platform` Root**:
   - `@kannan19302/developer` is **L4** (developer portal Next.js app).
   - `@kannan19302/marketplace` (nested in `developer-platform/marketplace`) is **L4** (marketplace Next.js app).
   - `developer-platform/extensions` is **L6** (extension host and sandboxed plugin implementations).

4. **`platform` Root**:
   - Contains operational specifications (`platform/docs`), deployment configurations (`platform/infra`), and governance tooling (`platform/workspace`). All operational tooling operates at **L7**.

---

### 2.4 Separation of Compile-Time vs. Runtime Edges

- **Compile-Time / Build Edges**:
  - Governed strictly by `check-layer.mjs`. Downward only.
  - No package may import code from a sibling at the same or higher layer.
- **Runtime Edges (HTTP / OIDC / WebSocket)**:
  - All L4 presentation apps and L5 clients communicate with L3 (`api` on 3001) via JSON/HTTP over REST and GraphQL, and with L3 (`idp` on 3005) via OIDC Authorization Code Flow with PKCE.
  - Microservice events between internal systems emit atomically through the transactional outbox (`data` $\rightarrow$ BullMQ / Redis $\rightarrow$ `api`).
- **Development Tooling**:
  - Scripts, test runners, and DevTools communicate via local loopback ports and do not establish production dependency edges.

---

### 2.5 Contiguous Network Port Allocation (Ports 4000–4007)

To prevent port contention and streamline local development, the active presentation layer is assigned contiguous ports:

| Service / App | Directory | Local Dev Port | Container Port | Health Endpoint |
|---|---|---|---|---|
| `marketing-site` (Gateway) | `marketing-site` | `4000` | `4000` | `http://localhost:4000/api/health` |
| `provider-admin` (PCC) | `provider-admin` | `4001` | `4001` | `http://localhost:4001/api/health` |
| `business-suite` (ERP) | `business-suite` | `4002` | `4002` | `http://localhost:4002/api/health` |
| `tenant-admin` (OCC) | `tenant-admin` | `4003` | `4003` | `http://localhost:4003/api/health` |
| `developer-platform` | `developer-platform` | `4004` | `4004` | `http://localhost:4004/api/health` |
| `marketplace` | `developer-platform/marketplace` | `4005` | `4005` | `http://localhost:4005/api/health` |
| `mobile` (Web Preview) | `mobile` | `4006` | `4006` | `http://localhost:4006` |
| `desktop-app` | `desktop-app` | `4007` | `4007` | `http://localhost:4007` |
| `api` (Core Backend) | `api` | `3001` | `3001` | `http://localhost:3001/api/v1/health` |
| `idp` (Sovereign IAM) | `idp` | `3005` | `3005` | `http://localhost:3005/health` |
| `storybook` | `design-system/storybook` | `6006` | `6006` | `http://localhost:6006` |

---

### 2.6 Invariant Preservation & Non-Negotiable Guarantees

1. **PostgreSQL RLS Universality**: Every table with `tenantId` is protected with PostgreSQL `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY`. Application queries run under a dedicated `NOBYPASSRLS` role.
2. **Decimal Financial Integrity**: Decimal(19,4) is mandated for currency and unit-bearing quantities; zero float types.
3. **Outbox Pattern**: Persistent domain state and business events commit in a single ACID transaction.
4. **Strata Design Language**: 100% adherence to `@kannan19302/ui` tokens with WCAG 2.2 AA accessibility.
5. **Zero-Trust Role Enforcement**: Strict server-side `@Permissions()` guards; deny-by-default.

---

## 3. Consequences

### Positive
- Clean, standard 14-repository architecture separating core ERP presentation from tenant administration.
- Deterministic, contiguous local port mapping (3001, 3005, 4000–4007, 6006).
- Unified monorepo configs (`pnpm-workspace.yaml`) eliminate duplicate nested dotfiles and directory confusion.
- Layer checker (`check-layer.mjs`) fails closed on unmapped internal packages, invalid targets, and cycles across all 14 roots.
- Universal testing account (`test.agent@unierp.com`) provides deterministic E2E verification across all surfaces.

### Neutral / Operational
- Developers work across 14 focused repositories inside `UniERP.code-workspace`.
- Multi-package roots (`shared`, `developer-platform`) use standard pnpm workspace filter syntax (`pnpm --filter ...`).
