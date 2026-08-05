<div align="center">

# UniERP

**An open-source, self-hostable multi-tenant application platform — that happens to ship an ERP as its first-party app suite.**

[![Licence](https://img.shields.io/badge/licence-AGPL--3.0-blue)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-multi--tenant-informational)]()
[![Self-hosted](https://img.shields.io/badge/self--hosted-yes-success)]()

</div>

---

## Start here

| If you are… | Go to |
| :---------- | :---- |
| **Evaluating UniERP** | [What makes it different](#what-makes-it-different) |
| **Deploying it** | [`unierp-infra`](../unierp-infra) — compose, Kubernetes, runbooks |
| **Building on it** | [`unierp-extension-api`](../unierp-extension-api) — the public contract |
| **Contributing** | [Repository map](#repository-map), then that repo's `CONTRIBUTING.md` |
| **Understanding the design** | [`PLATFORM_ARCHITECTURE.md`](../ERPSys/docs/PLATFORM_ARCHITECTURE.md) |

## What makes it different

Most ERPs are a product. Most app platforms are not self-hostable. UniERP is
deliberately both, and the intersection is close to empty:

- **Tenant isolation enforced by the database, not by application code.** Every
  tenant table carries a row-level-security policy with `FORCE`, and the
  application role is `NOBYPASSRLS`. It is explainable to an auditor in one
  sentence, and it is proven by a two-tenant test per table.
- **Extensions run in a real sandbox.** Third-party code executes in a V8 isolate
  with no ambient authority — no `process`, no `require`, no filesystem — under
  metered CPU, memory, query and egress budgets, with a kill switch.
- **Local-first AI.** Ollama and pgvector, so nothing leaves your infrastructure.
  For healthcare, government and EU-regulated buyers, sending ERP data to a
  vendor's model is often disqualifying.
- **One backend, not forty-five microservices.** Finance, inventory and sales
  write to each other constantly; splitting them would mean a distributed
  transaction on the most correctness-critical paths in the system.

## Repository map

UniERP is a **layered polyrepo**. A repository may depend only on published
artifacts of a **strictly lower layer** — never sideways, never upward. Each
repo's CI asserts this mechanically, so a UI component *cannot* import a
database service. Not "shouldn't": cannot.

### L0 — Contract

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-contracts`](../unierp-contracts) | Every API shape and event schema. **Depends on nothing** — that is what keeps the whole graph acyclic. |

### L1 — Foundation

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-kernel`](../unierp-kernel) | Tenancy context, policy engine, audit, outbox, idempotency |
| [`unierp-design-system`](../unierp-design-system) | Tokens → components → charts → grid → forms. One package, subpath exports |
| [`unierp-sdk`](../unierp-sdk) | The typed client third parties install. Generated from L0 |
| [`unierp-shared`](../unierp-shared) · [`unierp-auth`](../unierp-auth) · [`unierp-service-kit`](../unierp-service-kit) · [`unierp-config`](../unierp-config) | Shared types, session primitives, service scaffolding, build config |

### L2 — Runtime

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-data`](../unierp-data) | Prisma schema, migrations, RLS policies, isolation-test generator |
| [`unierp-framework`](../unierp-framework) | The schema-driven page runtime. First-party and customer modules render through the *same* runtime |
| [`unierp-extension-api`](../unierp-extension-api) | The public contract partners compile against. **3-year support, 12-month deprecation** |
| [`unierp-sandbox`](../unierp-sandbox) | The V8 isolate that runs extension and Studio code |

### L3 — Service

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-api`](../unierp-api) | The modular monolith. 45 business modules, two routers, one deployable |

### L4 — Presentation

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-web`](../unierp-web) | Tenant Admin Portal + Application Layer — what customers use |
| [`unierp-console`](../unierp-console) | Platform Admin Console. Separate origin, separate IdP realm, restricted ingress |
| [`unierp-corporate-website`](../unierp-corporate-website) | Marketing, docs, pricing, status |

### L5 — Clients

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-mobile`](../unierp-mobile) | Flutter app — different language, toolchain and release cadence |

### L6 — Extensions

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-extensions`](../unierp-extensions) | First-party verticals: healthcare, education, real estate, field service. **Depends on nothing but the public API** — that constraint is the proof the API is real |

### L7 — Operations

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-infra`](../unierp-infra) | Compose, Kubernetes, control-plane ingress, load tests, runbooks, the package registry |
| [`unierp-workspace`](../unierp-workspace) | Release-train manifest, shared CI gates, the federated ratchet |

## How the pieces fit at runtime

Fifteen-plus repositories build **three** deployables. Repository topology and
runtime topology are separate decisions:

```
PLANE 0  public          marketing · docs · tenant signup · published tenant sites
PLANE 1  control         admin.unierp.internal — provider-only, MFA, restricted ingress
PLANE 2  tenant admin    app.unierp.com/settings
PLANE 3  application     the 45 business modules
PLANE 4  developer       Studio, workflow/form/report builders, extension runtime

           console ─┐                    ┌─ web · mobile
                    ▼                    ▼
        /api/platform/v1            /api/v1
        ControlPlaneGuard           TenantGuard + RLS
                    └────────┬───────────┘
                             ▼
                    unierp-api  (one deployable)
                             │
        PostgreSQL 16 (RLS) · Redis · MinIO · Ollama · outbox
```

## Licence

AGPL-3.0. Self-hostable in full, with no proprietary runtime dependency.
