# P12-002 · The Unowned-Code Census

> **Generated automatically by `scripts/check-unowned-code-census.mjs`.**
> Phase **P12-002**: Every claimed repository measured: what it does, what is reachable, what is tested, what is dead, what other repositories import from it.

**Census Date:** 2026-09-03T03:48:40.598Z  
**Total Repositories Claimed:** 31 (31 on disk, 0 planned)  

## 1. Summary Overview

| Repository | Owner | Role Summary | Files | Code Lines | Tests | Consumers (Imported By) |
| :--------- | :---: | :----------- | ----: | ---------: | ----: | :---------------------- |
| `api` | PPLT-BIZ | Business services, domain logic, and financial ... | 23631 | 43,51,214 | 3433 | *(none)* |
| `auth` | PPLT-IDENTITY | Authentication and authorization client primitives | 40 | 1,453 | 3 | api, idp, marketplace, provider-admin-os, tenant-admin, tenant-apps, tenant-sites |
| `blockchain` | PPLT-BIZ | Distributed ledger and smart contracts | 63 | 2,838 | 1 | api, idp |
| `config` | PPLT-OPS | Platform configuration and governance | 19 | 114 | 0 | api, auth, blockchain, data, design-system, developer-platform, framework, idp, sandbox, shared, storybook, tenant-apps |
| `data` | PPLT-DATA | Database schema, migrations, and ORM layer | 385 | 37,51,311 | 8 | api, idp, unierp-workspace |
| `design-system` | PPLT-DESIGN | Meridian and Strata Workbench design system | 1570 | 41,256 | 169 | developer-platform, framework, marketing-site, marketplace, provider-admin-os, storybook, tenant-admin, tenant-apps, tenant-sites, unierp-workspace |
| `desktop-app` | PPLT-CLIENTS | Desktop client application | 31 | 608 | 0 | *(none)* |
| `developer-platform` | PPLT-DEV | Developer platform, CLI, and builder tooling | 241 | 40,712 | 0 | *(none)* |
| `extension-api` | PPLT-DEV | Extension and plugin host contracts | 24 | 738 | 1 | api, extensions, sandbox |
| `extensions` | PPLT-DEV | Vertical extensions (Healthcare, Education, etc.) | 63 | 4,836 | 4 | *(none)* |
| `framework` | PPLT-BIZ | Core application framework and saved views | 65 | 3,723 | 3 | developer-platform, marketplace, provider-admin-os, tenant-admin, tenant-apps, tenant-sites |
| `idp` | PPLT-IDENTITY | Identity provider, OIDC, and SSO services | 313 | 36,625 | 36 | *(none)* |
| `infra` | PPLT-OPS | Cloud infrastructure, Docker, and SRE operations | 112 | 5,373 | 3 | *(none)* |
| `kernel` | PPLT-CORE | Kernel runtime and tenant governor | 35 | 1,138 | 3 | *(none)* |
| `marketing-site` | PPLT-WEB | Corporate marketing and public site | 290 | 26,911 | 1 | *(none)* |
| `marketplace` | PPLT-DEV | Extension marketplace and app store | 61 | 15,795 | 0 | *(none)* |
| `provider-admin-os` | PPLT-OPS | Provider operator administration console | 228 | 29,769 | 6 | *(none)* |
| `sandbox` | PPLT-DEV | Isolated execution sandbox for extensions | 85 | 21,129 | 4 | api |
| `sdk` | PPLT-DEV | Client SDK for TypeScript, Python, Dart | 20 | 327 | 1 | developer-platform, marketplace, provider-admin-os, tenant-admin, tenant-apps, tenant-sites |
| `service-kit` | PPLT-CORE | Service scaffolding and common microservice kit | 27 | 915 | 1 | api, idp |
| `shared` | PPLT-CORE | Converged shared utilities, numbering, and temp... | 72 | 19,522 | 14 | api, auth, blockchain, data, developer-platform, idp, provider-admin-os, tenant-admin, tenant-apps, unierp-workspace |
| `storybook` | PPLT-DESIGN | Interactive component storybook workshop | 489 | 62,649 | 1 | *(none)* |
| `tenant-admin` | PPLT-OPS | Tenant administration console | 234 | 25,991 | 1 | *(none)* |
| `tenant-apps` | PPLT-WEB | Tenant enterprise web applications | 3606 | 2,56,750 | 21 | *(none)* |
| `tenant-site-template` | PPLT-WEB | Corporate tenant site template | 12 | 114 | 0 | *(none)* |
| `tenant-sites` | PPLT-WEB | Tenant corporate website runtime | 33 | 2,918 | 0 | *(none)* |
| `unierp-contracts` | PPLT-CONTRACTS | Published API and event contracts | 117 | 8,698 | 42 | api, kernel, sdk, shared |
| `unierp-mobile` | PPLT-CLIENTS | Flutter native mobile applications | 922 | 1,43,844 | 24 | *(none)* |
| `unierp-platform` | PPLT-GOV | Platform governance, ADRs, and catalog | 799 | 114 | 0 | *(none)* |
| `unierp-workspace` | PPLT-GOV | Polyrepo orchestration, verification, and tooling | 393 | 23,101 | 0 | *(none)* |
| `web-studio` | PPLT-DEV | Low-code application and page builder | 22 | 193 | 0 | *(none)* |

---

## 2. Detailed Profiles per Repository

### `api` (Programme PLT-BIZ)

- **Role**: Business services, domain logic, and financial ledgers
- **Status**: Present on disk
- **Total Files**: 23631 (13222 code, 3433 test, 40 docs, 125 config)
- **Lines of Code**: 43,51,214 lines (total lines: 1,33,04,525)
- **Testing**: framework=`vitest`, test files=3433, coverage configured=`true`
- **Exports**: 3306 exported symbols
- **Internal In-Family Dependencies**: `auth`, `blockchain`, `config`, `data`, `extension-api`, `sandbox`, `service-kit`, `shared`, `unierp-contracts`
- **Consumers (Imported By)**: none

### `auth` (Programme PLT-IDENTITY)

- **Role**: Authentication and authorization client primitives
- **Status**: Present on disk
- **Total Files**: 40 (11 code, 3 test, 4 docs, 10 config)
- **Lines of Code**: 1,453 lines (total lines: 6,569)
- **Testing**: framework=`vitest`, test files=3, coverage configured=`true`
- **Exports**: 22 exported symbols
- **Internal In-Family Dependencies**: `config`, `shared`
- **Consumers (Imported By)**: `api`, `idp`, `marketplace`, `provider-admin-os`, `tenant-admin`, `tenant-apps`, `tenant-sites`

### `blockchain` (Programme PLT-BIZ)

- **Role**: Distributed ledger and smart contracts
- **Status**: Present on disk
- **Total Files**: 63 (21 code, 1 test, 4 docs, 18 config)
- **Lines of Code**: 2,838 lines (total lines: 10,523)
- **Testing**: framework=`vitest`, test files=1, coverage configured=`true`
- **Exports**: 40 exported symbols
- **Internal In-Family Dependencies**: `config`, `shared`
- **Consumers (Imported By)**: `api`, `idp`

### `config` (Programme PLT-OPS)

- **Role**: Platform configuration and governance
- **Status**: Present on disk
- **Total Files**: 19 (1 code, 0 test, 4 docs, 10 config)
- **Lines of Code**: 114 lines (total lines: 1,290)
- **Testing**: framework=`none`, test files=0, coverage configured=`false`
- **Exports**: 0 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: `api`, `auth`, `blockchain`, `data`, `design-system`, `developer-platform`, `framework`, `idp`, `sandbox`, `shared`, `storybook`, `tenant-apps`

### `data` (Programme PLT-DATA)

- **Role**: Database schema, migrations, and ORM layer
- **Status**: Present on disk
- **Total Files**: 385 (353 code, 8 test, 4 docs, 16 config)
- **Lines of Code**: 37,51,311 lines (total lines: 39,66,167)
- **Testing**: framework=`vitest`, test files=8, coverage configured=`true`
- **Exports**: 149821 exported symbols
- **Internal In-Family Dependencies**: `config`, `shared`
- **Consumers (Imported By)**: `api`, `idp`, `unierp-workspace`

### `design-system` (Programme PLT-DESIGN)

- **Role**: Meridian and Strata Workbench design system
- **Status**: Present on disk
- **Total Files**: 1570 (706 code, 169 test, 9 docs, 11 config)
- **Lines of Code**: 41,256 lines (total lines: 2,16,609)
- **Testing**: framework=`vitest`, test files=169, coverage configured=`true`
- **Exports**: 768 exported symbols
- **Internal In-Family Dependencies**: `config`
- **Consumers (Imported By)**: `developer-platform`, `framework`, `marketing-site`, `marketplace`, `provider-admin-os`, `storybook`, `tenant-admin`, `tenant-apps`, `tenant-sites`, `unierp-workspace`

### `desktop-app` (Programme PLT-CLIENTS)

- **Role**: Desktop client application
- **Status**: Present on disk
- **Total Files**: 31 (7 code, 0 test, 4 docs, 6 config)
- **Lines of Code**: 608 lines (total lines: 1,363)
- **Testing**: framework=`none`, test files=0, coverage configured=`false`
- **Exports**: 0 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: none

### `developer-platform` (Programme PLT-DEV)

- **Role**: Developer platform, CLI, and builder tooling
- **Status**: Present on disk
- **Total Files**: 241 (170 code, 0 test, 5 docs, 10 config)
- **Lines of Code**: 40,712 lines (total lines: 50,633)
- **Testing**: framework=`none`, test files=0, coverage configured=`false`
- **Exports**: 231 exported symbols
- **Internal In-Family Dependencies**: `config`, `design-system`, `framework`, `sdk`, `shared`
- **Consumers (Imported By)**: none

### `extension-api` (Programme PLT-DEV)

- **Role**: Extension and plugin host contracts
- **Status**: Present on disk
- **Total Files**: 24 (8 code, 1 test, 4 docs, 8 config)
- **Lines of Code**: 738 lines (total lines: 1,870)
- **Testing**: framework=`none`, test files=1, coverage configured=`false`
- **Exports**: 43 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: `api`, `extensions`, `sandbox`

### `extensions` (Programme PLT-DEV)

- **Role**: Vertical extensions (Healthcare, Education, etc.)
- **Status**: Present on disk
- **Total Files**: 63 (34 code, 4 test, 4 docs, 23 config)
- **Lines of Code**: 4,836 lines (total lines: 7,182)
- **Testing**: framework=`vitest`, test files=4, coverage configured=`true`
- **Exports**: 134 exported symbols
- **Internal In-Family Dependencies**: `extension-api`
- **Consumers (Imported By)**: none

### `framework` (Programme PLT-BIZ)

- **Role**: Core application framework and saved views
- **Status**: Present on disk
- **Total Files**: 65 (25 code, 3 test, 4 docs, 11 config)
- **Lines of Code**: 3,723 lines (total lines: 17,242)
- **Testing**: framework=`vitest`, test files=3, coverage configured=`true`
- **Exports**: 63 exported symbols
- **Internal In-Family Dependencies**: `config`, `design-system`
- **Consumers (Imported By)**: `developer-platform`, `marketplace`, `provider-admin-os`, `tenant-admin`, `tenant-apps`, `tenant-sites`

### `idp` (Programme PLT-IDENTITY)

- **Role**: Identity provider, OIDC, and SSO services
- **Status**: Present on disk
- **Total Files**: 313 (176 code, 36 test, 4 docs, 18 config)
- **Lines of Code**: 36,625 lines (total lines: 97,423)
- **Testing**: framework=`vitest`, test files=36, coverage configured=`true`
- **Exports**: 235 exported symbols
- **Internal In-Family Dependencies**: `auth`, `blockchain`, `config`, `data`, `service-kit`, `shared`
- **Consumers (Imported By)**: none

### `infra` (Programme PLT-OPS)

- **Role**: Cloud infrastructure, Docker, and SRE operations
- **Status**: Present on disk
- **Total Files**: 112 (42 code, 3 test, 6 docs, 24 config)
- **Lines of Code**: 5,373 lines (total lines: 47,750)
- **Testing**: framework=`none`, test files=3, coverage configured=`false`
- **Exports**: 39 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: none

### `kernel` (Programme PLT-CORE)

- **Role**: Kernel runtime and tenant governor
- **Status**: Present on disk
- **Total Files**: 35 (12 code, 3 test, 4 docs, 10 config)
- **Lines of Code**: 1,138 lines (total lines: 4,501)
- **Testing**: framework=`vitest`, test files=3, coverage configured=`true`
- **Exports**: 20 exported symbols
- **Internal In-Family Dependencies**: `unierp-contracts`
- **Consumers (Imported By)**: none

### `marketing-site` (Programme PLT-WEB)

- **Role**: Corporate marketing and public site
- **Status**: Present on disk
- **Total Files**: 290 (244 code, 1 test, 7 docs, 16 config)
- **Lines of Code**: 26,911 lines (total lines: 34,773)
- **Testing**: framework=`none`, test files=1, coverage configured=`false`
- **Exports**: 262 exported symbols
- **Internal In-Family Dependencies**: `design-system`
- **Consumers (Imported By)**: none

### `marketplace` (Programme PLT-DEV)

- **Role**: Extension marketplace and app store
- **Status**: Present on disk
- **Total Files**: 61 (33 code, 0 test, 4 docs, 6 config)
- **Lines of Code**: 15,795 lines (total lines: 27,757)
- **Testing**: framework=`vitest`, test files=0, coverage configured=`false`
- **Exports**: 99 exported symbols
- **Internal In-Family Dependencies**: `auth`, `design-system`, `framework`, `sdk`
- **Consumers (Imported By)**: none

### `provider-admin-os` (Programme PLT-OPS)

- **Role**: Provider operator administration console
- **Status**: Present on disk
- **Total Files**: 228 (179 code, 6 test, 4 docs, 16 config)
- **Lines of Code**: 29,769 lines (total lines: 44,420)
- **Testing**: framework=`vitest`, test files=6, coverage configured=`true`
- **Exports**: 204 exported symbols
- **Internal In-Family Dependencies**: `auth`, `design-system`, `framework`, `sdk`, `shared`
- **Consumers (Imported By)**: none

### `sandbox` (Programme PLT-DEV)

- **Role**: Isolated execution sandbox for extensions
- **Status**: Present on disk
- **Total Files**: 85 (28 code, 4 test, 4 docs, 9 config)
- **Lines of Code**: 21,129 lines (total lines: 82,007)
- **Testing**: framework=`vitest`, test files=4, coverage configured=`true`
- **Exports**: 16 exported symbols
- **Internal In-Family Dependencies**: `config`, `extension-api`
- **Consumers (Imported By)**: `api`

### `sdk` (Programme PLT-DEV)

- **Role**: Client SDK for TypeScript, Python, Dart
- **Status**: Present on disk
- **Total Files**: 20 (4 code, 1 test, 5 docs, 7 config)
- **Lines of Code**: 327 lines (total lines: 1,467)
- **Testing**: framework=`none`, test files=1, coverage configured=`false`
- **Exports**: 9 exported symbols
- **Internal In-Family Dependencies**: `unierp-contracts`
- **Consumers (Imported By)**: `developer-platform`, `marketplace`, `provider-admin-os`, `tenant-admin`, `tenant-apps`, `tenant-sites`

### `service-kit` (Programme PLT-CORE)

- **Role**: Service scaffolding and common microservice kit
- **Status**: Present on disk
- **Total Files**: 27 (7 code, 1 test, 4 docs, 8 config)
- **Lines of Code**: 915 lines (total lines: 3,737)
- **Testing**: framework=`vitest`, test files=1, coverage configured=`true`
- **Exports**: 34 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: `api`, `idp`

### `shared` (Programme PLT-CORE)

- **Role**: Converged shared utilities, numbering, and temporal
- **Status**: Present on disk
- **Total Files**: 72 (57 code, 14 test, 4 docs, 8 config)
- **Lines of Code**: 19,522 lines (total lines: 22,156)
- **Testing**: framework=`vitest`, test files=14, coverage configured=`true`
- **Exports**: 651 exported symbols
- **Internal In-Family Dependencies**: `config`, `unierp-contracts`
- **Consumers (Imported By)**: `api`, `auth`, `blockchain`, `data`, `developer-platform`, `idp`, `provider-admin-os`, `tenant-admin`, `tenant-apps`, `unierp-workspace`

### `storybook` (Programme PLT-DESIGN)

- **Role**: Interactive component storybook workshop
- **Status**: Present on disk
- **Total Files**: 489 (304 code, 1 test, 5 docs, 10 config)
- **Lines of Code**: 62,649 lines (total lines: 70,049)
- **Testing**: framework=`none`, test files=1, coverage configured=`false`
- **Exports**: 8 exported symbols
- **Internal In-Family Dependencies**: `config`, `design-system`
- **Consumers (Imported By)**: none

### `tenant-admin` (Programme PLT-OPS)

- **Role**: Tenant administration console
- **Status**: Present on disk
- **Total Files**: 234 (160 code, 1 test, 4 docs, 7 config)
- **Lines of Code**: 25,991 lines (total lines: 39,536)
- **Testing**: framework=`vitest`, test files=1, coverage configured=`false`
- **Exports**: 160 exported symbols
- **Internal In-Family Dependencies**: `auth`, `design-system`, `framework`, `sdk`, `shared`
- **Consumers (Imported By)**: none

### `tenant-apps` (Programme PLT-WEB)

- **Role**: Tenant enterprise web applications
- **Status**: Present on disk
- **Total Files**: 3606 (1039 code, 21 test, 45 docs, 16 config)
- **Lines of Code**: 2,56,750 lines (total lines: 14,40,718)
- **Testing**: framework=`vitest`, test files=21, coverage configured=`true`
- **Exports**: 1521 exported symbols
- **Internal In-Family Dependencies**: `auth`, `config`, `design-system`, `framework`, `sdk`, `shared`
- **Consumers (Imported By)**: none

### `tenant-site-template` (Programme PLT-WEB)

- **Role**: Corporate tenant site template
- **Status**: Present on disk
- **Total Files**: 12 (1 code, 0 test, 4 docs, 4 config)
- **Lines of Code**: 114 lines (total lines: 1,147)
- **Testing**: framework=`none`, test files=0, coverage configured=`false`
- **Exports**: 0 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: none

### `tenant-sites` (Programme PLT-WEB)

- **Role**: Tenant corporate website runtime
- **Status**: Present on disk
- **Total Files**: 33 (16 code, 0 test, 4 docs, 6 config)
- **Lines of Code**: 2,918 lines (total lines: 9,424)
- **Testing**: framework=`vitest`, test files=0, coverage configured=`false`
- **Exports**: 28 exported symbols
- **Internal In-Family Dependencies**: `auth`, `design-system`, `framework`, `sdk`
- **Consumers (Imported By)**: none

### `unierp-contracts` (Programme PLT-CONTRACTS)

- **Role**: Published API and event contracts
- **Status**: Present on disk
- **Total Files**: 117 (102 code, 42 test, 4 docs, 7 config)
- **Lines of Code**: 8,698 lines (total lines: 9,818)
- **Testing**: framework=`none`, test files=42, coverage configured=`false`
- **Exports**: 328 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: `api`, `kernel`, `sdk`, `shared`

### `unierp-mobile` (Programme PLT-CLIENTS)

- **Role**: Flutter native mobile applications
- **Status**: Present on disk
- **Total Files**: 922 (817 code, 24 test, 7 docs, 10 config)
- **Lines of Code**: 1,43,844 lines (total lines: 1,52,425)
- **Testing**: framework=`none`, test files=24, coverage configured=`false`
- **Exports**: 0 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: none

### `unierp-platform` (Programme PLT-GOV)

- **Role**: Platform governance, ADRs, and catalog
- **Status**: Present on disk
- **Total Files**: 799 (1 code, 0 test, 778 docs, 12 config)
- **Lines of Code**: 114 lines (total lines: 57,847)
- **Testing**: framework=`none`, test files=0, coverage configured=`false`
- **Exports**: 0 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: none

### `unierp-workspace` (Programme PLT-GOV)

- **Role**: Polyrepo orchestration, verification, and tooling
- **Status**: Present on disk
- **Total Files**: 393 (203 code, 0 test, 84 docs, 63 config)
- **Lines of Code**: 23,101 lines (total lines: 2,57,314)
- **Testing**: framework=`none`, test files=0, coverage configured=`false`
- **Exports**: 106 exported symbols
- **Internal In-Family Dependencies**: `data`, `design-system`, `shared`
- **Consumers (Imported By)**: none

### `web-studio` (Programme PLT-DEV)

- **Role**: Low-code application and page builder
- **Status**: Present on disk
- **Total Files**: 22 (6 code, 0 test, 4 docs, 5 config)
- **Lines of Code**: 193 lines (total lines: 6,743)
- **Testing**: framework=`none`, test files=0, coverage configured=`false`
- **Exports**: 5 exported symbols
- **Internal In-Family Dependencies**: none
- **Consumers (Imported By)**: none

