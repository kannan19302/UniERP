> Historical, non-authoritative copy of `data/ARCHITECTURE.md`. Preserved during the 14-root documentation consolidation on 2026-09-24. Current architecture is owned by the accepted ADRs and `platform/docs/platforms/`; current repository rules are in its root `AGENTS.md`.

# Architecture Specification: UniERP Database & Data Persistence Engine (`data`)

- **Layer**: Layer L2 (Runtime)
- **Package Identity**: `@kannan19302/database`
- **Owning ADR**: [ADR-0010: UniERP Master Platform Goal and Polyrepo Architecture Boundaries](../unierp-platform/docs/adr/ADR-0010-platform-north-star-and-polyrepo-boundaries.md)
- **Status**: Authoritative & Production-Active

---

## 1. Executive Summary & Purpose

Authoritative Prisma schemas (44 schemas), PostgreSQL migrations, connection pooling, and universal Row-Level Security (RLS).

This repository is one delivery unit in the UniERP 31-repository polyrepo estate, anchored by the **UniERP Master Platform North Star Goal**:
> "Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System: delivering 100% Zero-Trust Multi-Tenant Isolation with PostgreSQL Row-Level Security on every tenant table, Absolute Decimal(19,4) Numeric Precision across all ledgers, Atomic Durable Audit Logging, Sub-100ms P99 Transaction Latency, and a Unified High-Density Strata Workbench Design Language across all 1,198 web routes, native mobile, and desktop clients."

---

## 2. System Context & Architectural Boundaries

```mermaid
graph LR
  PrismaSchemas["Prisma Schemas (44 Parts)<br/>(data/prisma/schema/*.prisma)"] --> Migrations["PostgreSQL Migrations<br/>(data/prisma/migrations/)"]
  Migrations --> Tables["1,865 Multi-Tenant Tables<br/>(schema public)"]
  Tables --> RLS["Universal RLS RESTRICTIVE Policy<br/>tenant_id = current_setting('app.current_tenant_id')"]
  RLS --> Role["App DB Role: unierp_app_role<br/>(NOBYPASSRLS Enforced)"]

  classDef d fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#fff;
  class PrismaSchemas,Migrations,Tables,RLS,Role d;
```

### Boundary Contract
- **Allowed Inbound Consumers**: L3 (api, idp)
- **Allowed Outbound Dependencies**: @kannan19302/contracts (L0); L1 packages
- **Strictly Forbidden Dependencies**:
  - ❌ Layers L3-L7
  - ❌ HTTP controllers
  - ❌ UI components

---

## 3. Technology Stack & Key Primitives

- **Core Runtime & Languages**: Prisma ORM, PostgreSQL 16+, SQL, TypeScript
- **Primary Interface**: `@kannan19302/database`
- **Verification Harness**: `pnpm test && pnpm build`

---

## 4. Quality Engineering & Verification Gates

To maintain institutional reliability, this repository is governed by the following continuous quality gates:
1. **Type Safety Gate**: Zero TypeScript/type-checker errors under strict mode.
2. **Layer Boundary Gate**: Verified by `scripts/check-layer.mjs` in `unierp-workspace` to prevent illegal upward or sideways coupling.
3. **Automated Test Suite**: Must execute cleanly with 100% pass rate before branch integration.

---

## 5. Associated AI Skills & Governance Links

- **Project Skill**: [`.agents/skills/data-persistence-standards/SKILL.md`](.agents/skills/data-persistence-standards/SKILL.md)
- **Workspace Governance**: [`../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md`](../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md)
- **Canonical Protocol**: [`../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md)
