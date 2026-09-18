# UniERP 31-to-13 Repository Topology & Migration Map

This document defines the authoritative, verified 31-to-13 repository consolidation topology for the UniERP polyrepo. It supersedes the legacy 31-flat-repository topology described in ADR-0010, aligning the physical Git estate with the 13 canonical brand-neutral pillars.

## 1. Executive Summary

- **Target Architecture**: Exactly 13 Git root repositories registered in the canonical root `UniERP.code-workspace`.
- **Merged / Nested Sub-Packages**: 6 sub-packages and 2 operational roots nested with preserved history and independent package identities.
- **Externally Retained Published Packages**: 10 auxiliary packages retained outside the active workspace under operator backup and consumed as published `@kannan19302/*` packages via npm.
- **Decommissioned Surface**: `platform-wizard` decommissioned per owner requirement; capabilities unified into `marketing-site` (Unified Landing Page & Platform Gateway on port 4000).
- **Core Invariants Preserved**:
  - PostgreSQL Row-Level Security (`ENABLE` / `FORCE ROW LEVEL SECURITY` with `NOBYPASSRLS`).
  - Strict downward dependency layering (L0 to L7) enforced by canonical Layer Gate (`check-layer.mjs`).
  - Zero-trust RBAC/ABAC authorization via `@Permissions(...)` decorators.
  - Money represented with decimal amount and currency ISO codes; unit-bearing quantities.
  - Transactional outbox with idempotent event consumers.
  - WCAG 2.2 AA accessibility with Strata Design System tokens (`@kannan19302/ui`).

---

## 2. Complete 31-Row Migration Matrix

| # | Legacy Repository | Target Path | Package Identity | Layer | Owner | Trust Plane | Runtime Port / Target | Disposition | Provenance / Support Policy |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `unierp-contracts` | `contracts` | `@kannan19302/contracts` (1.0.4) | L0 | PLT-BIZ | cross-platform-contract | Library / Client Gen | **RETAINED** | `git@github.com:kannan19302/unierp-contracts.git` |
| 2 | `auth` | `idp` | `@kannan19302/auth` (1.0.5) | L1 | PLT-IAM | identity | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/auth`; consumed as `@kannan19302/auth@^1.0.4` |
| 3 | `config` | `shared/config` | `@kannan19302/config` (1.0.2) | L1 | PLT-OPS | runtime | Library / Config | **NESTED** | Merged into `shared/config`; git history retained |
| 4 | `design-system` | `design-system` | `@kannan19302/ui` (1.1.0) | L1 | PLT-DS | shared-ui | 374 Strata components | **RETAINED** | `git@github.com:kannan19302/unierp-design-system.git` |
| 5 | `kernel` | `shared` | `@kannan19302/kernel` (1.0.3) | L1 | PLT-BIZ | runtime-core | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/kernel`; primitives in `shared` & `contracts` |
| 6 | `sdk` | `contracts` | `@kannan19302/sdk` (1.0.3) | L1 | PLT-DEV | client-sdk | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/sdk`; API clients generated from `contracts` |
| 7 | `service-kit` | `api` | `@kannan19302/service-kit` (0.2.3) | L1 | PLT-BIZ | service-primitives | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/service-kit`; decorators absorbed in `api` |
| 8 | `shared` | `shared` | `@kannan19302/shared` (1.0.6) | L1 | PLT-OPS | cross-platform-library | Library | **RETAINED** | `git@github.com:kannan19302/unierp-shared.git` |
| 9 | `storybook` | `design-system/storybook` | `@kannan19302/storybook` (0.1.0) | L4 | PLT-DS | ui-documentation | Port 6006 | **NESTED** | Merged into `design-system/storybook` |
| 10 | `blockchain` | `data` | `@kannan19302/blockchain` (1.0.3) | L2 | PLT-BIZ | immutable-ledger | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/blockchain`; PostgreSQL audit in `data` |
| 11 | `data` | `data` | `@kannan19302/database` (1.0.14) | L2 | PLT-BIZ | persistence | PostgreSQL 5432 | **RETAINED** | `git@github.com:kannan19302/unierp-data.git` |
| 12 | `extension-api` | `contracts` | `@kannan19302/extension-api` (1.1.0) | L2 | PLT-DEV | extension-contract | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/extension-api`; consumed by extensions |
| 13 | `framework` | `shared/framework` | `@kannan19302/framework` (0.1.4) | L2 | PLT-OPS | application-framework | Library | **NESTED** | Merged into `shared/framework`; git history retained |
| 14 | `sandbox` | `developer-platform` | `@kannan19302/sandbox` (1.1.0) | L2 | PLT-DEV | isolated-execution | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/sandbox`; extension isolation in dev-plat |
| 15 | `api` | `api` | `@kannan19302/api` (0.0.1) | L3 | PLT-BIZ | business-logic-backend | Port 3001 | **RETAINED** | `git@github.com:kannan19302/unierp-api.git` |
| 16 | `idp` | `idp` | `@kannan19302/idp` (0.0.1) | L3 | PLT-IAM | identity | Port 3005 | **RETAINED** | `git@github.com:kannan19302/unierp-idp.git` |
| 17 | `developer-platform` | `developer-platform` | `@kannan19302/developer` (0.0.1) | L4 | PLT-DEV | developer-ecosystem | Port 4004 | **RETAINED** | `git@github.com:kannan19302/unierp-developer.git` |
| 18 | `marketing-site` | `marketing-site` | `corporate-website` (1.0.0) | L4 | PLT-MAR | public-surface | Port 4000 (Unified Gateway) | **RETAINED** | `git@github.com:kannan19302/unierp-corporate-website.git` |
| 19 | `marketplace` | `developer-platform/marketplace` | `@kannan19302/marketplace` (0.1.0) | L4 | PLT-MKT | marketplace | Port 4005 | **NESTED** | Merged into `developer-platform/marketplace` |
| 20 | `provider-admin-os` | `provider-admin-os` | `@kannan19302/console` (0.1.0) | L4 | PLT-PAO | provider-surface | Port 4001 | **RETAINED** | `git@github.com:kannan19302/unierp-console.git` |
| 21 | `tenant-admin` | `tenant-apps/tenant-admin` | `@kannan19302/tenant-admin` (0.1.0) | L4 | PLT-TAD | tenant-admin | Port 4003 | **NESTED** | Merged into `tenant-apps/tenant-admin` |
| 22 | `tenant-apps` | `tenant-apps` | `@kannan19302/web` (0.0.1) | L4 | PLT-ERP | tenant-surface | Port 4002 | **RETAINED** | `git@github.com:kannan19302/unierp-web.git` |
| 23 | `tenant-site-template` | `developer-platform` | `@kannan19302/corporate-site-template` (1.0.0) | L4 | PLT-SITE | site-template | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/tenant-site-template`; used in site builder |
| 24 | `tenant-sites` | `marketing-site` | `@kannan19302/tenant-sites` (0.1.0) | L4 | PLT-SITE | site-hosting | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/tenant-sites`; dynamic tenant routing |
| 25 | `web-studio` | `developer-platform` | `@kannan19302/web-studio` (0.1.0) | L4 | PLT-DEV | visual-builder | Published npm package | **EXTERNALLY_CONSUMED** | `d:/backup/web-studio`; visual builder in dev-plat |
| 26 | `desktop-app` | `desktop-app` | `@kannan19302/desktop` (1.0.0) | L5 | PLT-DESK | desktop-surface | Port 4007 | **RETAINED** | `git@github.com:kannan19302/unierp-desktop.git` |
| 27 | `mobile` | `mobile` | `unierp-mobile` | L5 | PLT-MOB | mobile-surface | Port 4006 | **RETAINED** | `git@github.com:kannan19302/unierp-mobile.git` |
| 28 | `extensions` | `developer-platform/extensions` | `unierp-extensions` (1.0.0) | L6 | PLT-DEV | extension-ecosystem | Extension Host | **NESTED** | Merged into `developer-platform/extensions` |
| 29 | `infra` | `platform/infra` | Operational Configs | L7 | PLT-OPS | operational-infra | Docker / K8s / TF | **NESTED** | Merged into `platform/infra` |
| 30 | `workspace` | `platform/workspace` | `unierp-programme` | L7 | PLT-OPS | programme-governance | Governance scripts | **NESTED** | Merged into `platform/workspace` |
| 31 | `platform` | `platform` | Operational Parent | L7 | PLT-OPS | operational-governance | Polyrepo Root Container | **RETAINED** | `git@github.com:kannan19302/UniERP.git` |

---

## 3. Resolution of the 10 Unaccounted Identities

The audit identified 10 former root package identities whose standalone repository directories were retired outside the active workspace into `d:/backup`:

1. **`auth` (`@kannan19302/auth`)**: Published as an immutable package on npm (`^1.0.4`). Used as a shared authentication client/interceptor by `api`, `idp`, `provider-admin-os`, `tenant-apps`, and `marketplace`. The server-side identity provider runtime is fully contained within the `idp` repository (OIDC, SAML, WebAuthn).
2. **`kernel` (`@kannan19302/kernel`)**: Published as `@kannan19302/kernel@^1.0.3`. Foundational entity and lifecycle primitives are preserved and natively owned by `contracts` (schema types) and `shared` (runtime helpers).
3. **`sdk` (`@kannan19302/sdk`)**: Published as `@kannan19302/sdk@^1.0.3`. High-level client SDK generation is directly produced by `contracts/scripts` from canonical OpenAPI schemas.
4. **`service-kit` (`@kannan19302/service-kit`)**: Published as `@kannan19302/service-kit@^0.2.3`. Consumed by `api` and `idp`; NestJS microservice controllers, filters, and interceptors are maintained directly in `api/src/common`.
5. **`blockchain` (`@kannan19302/blockchain`)**: Published as `@kannan19302/blockchain@^1.0.3`. Immutability guarantees are enforced natively in PostgreSQL via immutable append-only audit tables and cryptographic hashing in `data/prisma/schema`.
6. **`extension-api` (`@kannan19302/extension-api`)**: Published as `@kannan19302/extension-api@^1.1.0`. Contract interfaces for third-party extensions are consumed by `developer-platform/extensions/*`.
7. **`sandbox` (`@kannan19302/sandbox`)**: Published as `@kannan19302/sandbox@^1.1.0`. Secure isolated V8 runtime execution for extensions is maintained within `developer-platform`.
8. **`tenant-site-template` (`@kannan19302/corporate-site-template`)**: Published as `@kannan19302/corporate-site-template@^1.0.0`. Consumed as a component template by `developer-platform` visual builder.
9. **`tenant-sites` (`@kannan19302/tenant-sites`)**: Published as `@kannan19302/tenant-sites@^0.1.0`. Dynamic multi-tenant routing is unified into `marketing-site` (port 4000) and `tenant-apps` (port 4002).
10. **`web-studio` (`@kannan19302/web-studio`)**: Published as `@kannan19302/web-studio@^0.1.0`. Low-code visual builder capabilities are unified into `developer-platform` (port 4004).

None of these capabilities were lost or mocked; all 10 continue to resolve either as versioned, published npm dependencies or as consolidated code within the 13 canonical roots.
