<div align="center">

# UniERP

**An open-source, self-hostable multi-tenant application platform — that happens to ship an ERP as its first-party app suite.**

[![CI](https://github.com/kannan19302/UniERP/actions/workflows/ci.yml/badge.svg)](https://github.com/kannan19302/UniERP/actions/workflows/ci.yml)
[![Licence: AGPL-3.0](https://img.shields.io/badge/licence-AGPL--3.0-blue)](LICENSE)
[![Status: pre-release](https://img.shields.io/badge/status-pre--release-orange)](ROADMAP.md)
[![Code of conduct](https://img.shields.io/badge/code%20of%20conduct-Contributor%20Covenant%202.1-purple)](CODE_OF_CONDUCT.md)

</div>

---

> **Project status: pre-release, single maintainer.** The architecture below is
> real and the code exists, but there are no tagged releases, no published
> container images, and the extracted repositories cannot yet install
> standalone — the build is still the [`ERPSys`](https://github.com/kannan19302/ERPSys)
> monorepo. [`ROADMAP.md`](ROADMAP.md) says exactly what is and is not finished,
> and [`GOVERNANCE.md`](GOVERNANCE.md) says who maintains it. Please read both
> before deploying this anywhere that matters.

## Start here

| If you are… | Go to |
| :---------- | :---- |
| **Evaluating UniERP** | [What makes it different](#what-makes-it-different) |
| **Deploying it** | [`unierp-infra`](https://github.com/kannan19302/unierp-infra) — compose, Kubernetes, runbooks |
| **Building on it** | [`unierp-extension-api`](https://github.com/kannan19302/unierp-extension-api) — the public contract |
| **Contributing** | [`CONTRIBUTING.md`](CONTRIBUTING.md) — it starts by telling you which of the repositories below your change belongs in |
| **Stuck, or unsure where to ask** | [`SUPPORT.md`](SUPPORT.md) |
| **Wondering how finished this is** | [`ROADMAP.md`](ROADMAP.md) — read this before you deploy it |
| **Understanding the design** | [`ARCHITECTURE.md`](ARCHITECTURE.md) here, then [`PLATFORM_ARCHITECTURE.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/PLATFORM_ARCHITECTURE.md) for the full specification |

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
| [`unierp-contracts`](https://github.com/kannan19302/unierp-contracts) | Every API shape and event schema. **Depends on nothing** — that is what keeps the whole graph acyclic. |

### L1 — Foundation

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-kernel`](https://github.com/kannan19302/unierp-kernel) | Tenancy context, policy engine, audit, outbox, idempotency |
| [`unierp-design-system`](https://github.com/kannan19302/unierp-design-system) | Tokens → components → charts → grid → forms. One package, subpath exports |
| [`unierp-sdk`](https://github.com/kannan19302/unierp-sdk) | The typed client third parties install. Generated from L0 |
| [`unierp-shared`](https://github.com/kannan19302/unierp-shared) · [`unierp-auth`](https://github.com/kannan19302/unierp-auth) · [`unierp-service-kit`](https://github.com/kannan19302/unierp-service-kit) · [`unierp-config`](https://github.com/kannan19302/unierp-config) | Shared types, session primitives, service scaffolding, build config |

### L2 — Runtime

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-data`](https://github.com/kannan19302/unierp-data) | Prisma schema, migrations, RLS policies, isolation-test generator |
| [`unierp-framework`](https://github.com/kannan19302/unierp-framework) | The schema-driven page runtime. First-party and customer modules render through the *same* runtime |
| [`unierp-extension-api`](https://github.com/kannan19302/unierp-extension-api) | The public contract partners compile against. **3-year support, 12-month deprecation** |
| [`unierp-sandbox`](https://github.com/kannan19302/unierp-sandbox) | The V8 isolate that runs extension and Studio code |

### L3 — Service

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-api`](https://github.com/kannan19302/unierp-api) | The modular monolith. 45 business modules, two routers, one deployable |
| [`unierp-idp`](https://github.com/kannan19302/unierp-idp) | Identity provider. A separate realm per plane, so no customer identity can obtain a control-plane token |

### L4 — Presentation

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-web`](https://github.com/kannan19302/unierp-web) | Tenant Admin Portal + Application Layer — what customers use |
| [`unierp-console`](https://github.com/kannan19302/unierp-console) | Platform Admin Console. Separate origin, separate IdP realm, restricted ingress |
| [`unierp-developer`](https://github.com/kannan19302/unierp-developer) | The developer platform: App Studio, the workflow/form/report builders, and tenant CMS |
| [`unierp-corporate-website`](https://github.com/kannan19302/unierp-corporate-website) | Marketing, docs, pricing, status |
| [`unierp-corporate-site-template`](https://github.com/kannan19302/unierp-corporate-site-template) | Starter template a tenant's public website is generated from |

### L5 — Clients

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-mobile`](https://github.com/kannan19302/unierp-mobile) | Flutter app — different language, toolchain and release cadence |

### L6 — Extensions

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-extensions`](https://github.com/kannan19302/unierp-extensions) | First-party verticals: healthcare, education, real estate, field service. **Depends on nothing but the public API** — that constraint is the proof the API is real |

### L7 — Operations

| Repository | What it is |
| :--------- | :--------- |
| [`unierp-infra`](https://github.com/kannan19302/unierp-infra) | Compose, Kubernetes, control-plane ingress, load tests, runbooks, the package registry |
| [`unierp-workspace`](https://github.com/kannan19302/unierp-workspace) | Release-train manifest, shared CI gates, the federated ratchet |

## Run it locally

The layered repositories above are the **architecture**. The **build** is still
[`ERPSys`](https://github.com/kannan19302/ERPSys), the development monorepo the
polyrepo was extracted from, and that is deliberate rather than unfinished:
[`PLATFORM_ARCHITECTURE.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/PLATFORM_ARCHITECTURE.md)
§ 14 rule 4 keeps the monorepo buildable at every extraction tag until each
consumer has switched to a published artifact. The extracted L3/L4 repositories
still declare `@unerp/*` as `workspace:*`, so they cannot yet install
standalone — see § 14.1 for what unblocks that, and [`ROADMAP.md`](ROADMAP.md)
for where that migration currently stands.

```bash
git clone https://github.com/kannan19302/ERPSys
cd ERPSys
pnpm install
pnpm dev
```

`pnpm dev` starts PostgreSQL, Redis, MinIO and the package registry in Docker
and runs the API, IdP and web app natively — the same Next.js middleware compile
takes ~1 second natively and ~960 seconds in a bind-mounted container on
Windows, so the datastores get Docker and the applications do not.

| | |
| :-- | :-- |
| Web | http://localhost:3000 |
| API | http://localhost:3001/api/v1 · Swagger at `/swagger` |
| IdP | http://localhost:3005 |

Then prove it actually works, rather than assuming green gates mean a working
product:

```bash
pnpm smoke
```

That walks register → log in → read a tenant's data over HTTP against the
running services and fails loudly. It exists because every gate in `pnpm verify`
was green at a point when the application did not boot.

Shared services alone, without the monorepo, come from
[`unierp-infra`](https://github.com/kannan19302/unierp-infra):
`docker compose -f docker-compose.dev.yml up -d`.

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

Copyright (C) 2026 UniERP contributors.

[GNU Affero General Public License v3.0](LICENSE). Self-hostable in full, with
no proprietary runtime dependency — there is no open-core edition holding back
tenant isolation, the sandbox or the audit trail.

The Affero clause is the part worth reading before you build on it: if you run a
modified UniERP as a network service, you owe your users the modified source.
Running it unmodified, or modifying it privately without offering it as a
service, carries no such obligation. Extensions that only compile against
[`unierp-extension-api`](https://github.com/kannan19302/unierp-extension-api)
are separate works and are yours to licence as you choose.
