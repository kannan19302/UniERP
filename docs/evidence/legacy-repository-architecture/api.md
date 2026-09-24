> Historical, non-authoritative copy of `api/ARCHITECTURE.md`. Preserved during the 14-root documentation consolidation on 2026-09-24. Current architecture is owned by the accepted ADRs and `platform/docs/platforms/`; current repository rules are in its root `AGENTS.md`.

# Architecture Specification: UniERP Core Enterprise Business API (`api`)

- **Layer**: Layer L3 (Service)
- **Package Identity**: `@kannan19302/api`
- **Owning ADR**: [ADR-0010: UniERP Master Platform Goal and Polyrepo Architecture Boundaries](../unierp-platform/docs/adr/ADR-0010-platform-north-star-and-polyrepo-boundaries.md)
- **Status**: Authoritative & Production-Active

---

## 1. Executive Summary & Purpose

33 modular business domains (Finance, HR, CRM, SCM, etc.) adhering to the strict 6-part module anatomy with thin controllers and domain repositories.

This repository is one delivery unit in the UniERP 31-repository polyrepo estate, anchored by the **UniERP Master Platform North Star Goal**:
> "Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System: delivering 100% Zero-Trust Multi-Tenant Isolation with PostgreSQL Row-Level Security on every tenant table, Absolute Decimal(19,4) Numeric Precision across all ledgers, Atomic Durable Audit Logging, Sub-100ms P99 Transaction Latency, and a Unified High-Density Strata Workbench Design Language across all 1,198 web routes, native mobile, and desktop clients."

---

## 2. System Context & Architectural Boundaries

```mermaid
graph TD
  Client["Client (Web / Mobile / SDK)"] -->|HTTPS + JWT| Controller["Controller (Thin Handler)<br/>@UseGuards(JwtAuthGuard, RbacGuard)<br/>@Permissions(...) · @ZodBody()"]
  Controller --> Service["Domain Service<br/>(Pure Orchestration & Business Rules)"]
  Service --> Repository["Domain Repository<br/>(finance.repository.ts, etc.)"]
  Repository --> PrismaClient["PrismaClient (Database Access)"]
  PrismaClient --> Postgres[("PostgreSQL (NOBYPASSRLS)")]

  Service --> Outbox["Transactional Outbox (Atomic)"]
  Outbox --> Kafka[("Apache Kafka Event Stream")]
  Service --> Audit["AuditLog Engine (Zero Drops)"]
  Audit --> Postgres

  classDef s fill:#31104b,stroke:#a855f7,stroke-width:2px,color:#fff;
  class Client,Controller,Service,Repository,PrismaClient,Postgres,Outbox,Kafka,Audit s;
```

### Boundary Contract
- **Allowed Inbound Consumers**: L4 (Presentation apps), L5 (Clients)
- **Allowed Outbound Dependencies**: @kannan19302/contracts (L0); L1 packages; L2 packages (data, framework, blockchain)
- **Strictly Forbidden Dependencies**:
  - ❌ Layers L4-L7
  - ❌ Direct UI imports

---

## 3. Technology Stack & Key Primitives

- **Core Runtime & Languages**: NestJS, Fastify, Prisma, Pino, OpenTelemetry, TypeScript
- **Primary Interface**: `@kannan19302/api`
- **Verification Harness**: `pnpm test && pnpm typecheck`

---

## 4. Quality Engineering & Verification Gates

To maintain institutional reliability, this repository is governed by the following continuous quality gates:
1. **Type Safety Gate**: Zero TypeScript/type-checker errors under strict mode.
2. **Layer Boundary Gate**: Verified by `scripts/check-layer.mjs` in `unierp-workspace` to prevent illegal upward or sideways coupling.
3. **Automated Test Suite**: Must execute cleanly with 100% pass rate before branch integration.

---

## 5. Associated AI Skills & Governance Links

- **Project Skill**: [`.agents/skills/api-architecture-standards/SKILL.md`](.agents/skills/api-architecture-standards/SKILL.md)
- **Workspace Governance**: [`../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md`](../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md)
- **Canonical Protocol**: [`../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md)
