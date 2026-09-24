> Historical, non-authoritative copy of `contracts/ARCHITECTURE.md`. Preserved during the 14-root documentation consolidation on 2026-09-24. Current architecture is owned by the accepted ADRs and `platform/docs/platforms/`; current repository rules are in its root `AGENTS.md`.

# Architecture Specification: UniERP Contracts Layer (`unierp-contracts`)

- **Layer**: Layer L0 (Contracts)
- **Package Identity**: `@kannan19302/contracts`
- **Owning ADR**: [ADR-0010: UniERP Master Platform Goal and Polyrepo Architecture Boundaries](../unierp-platform/docs/adr/ADR-0010-platform-north-star-and-polyrepo-boundaries.md)
- **Status**: Authoritative & Production-Active

---

## 1. Executive Summary & Purpose

Single source of truth for all cross-repo DTOs, events, error codes, and interface contracts.

This repository is one delivery unit in the UniERP 31-repository polyrepo estate, anchored by the **UniERP Master Platform North Star Goal**:
> "Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System: delivering 100% Zero-Trust Multi-Tenant Isolation with PostgreSQL Row-Level Security on every tenant table, Absolute Decimal(19,4) Numeric Precision across all ledgers, Atomic Durable Audit Logging, Sub-100ms P99 Transaction Latency, and a Unified High-Density Strata Workbench Design Language across all 1,198 web routes, native mobile, and desktop clients."

---

## 2. System Context & Architectural Boundaries

```mermaid
graph TD
  Contracts["<b>@kannan19302/contracts (L0)</b><br/>DTOs · Events · Errors · Interfaces"]

  L1["Layer L1: Foundation<br/>(auth, config, ui, kernel)"]
  L2["Layer L2: Runtime<br/>(data, framework, extension-api)"]
  L3["Layer L3: Service<br/>(api, idp)"]
  L4["Layer L4: Presentation<br/>(tenant-apps, admin-os)"]
  L5["Layer L5: Clients<br/>(desktop, mobile)"]

  Contracts --> L1
  Contracts --> L2
  Contracts --> L3
  Contracts --> L4
  Contracts --> L5

  classDef c fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
  classDef sub fill:#0f172a,stroke:#64748b,stroke-width:1px,color:#94a3b8;
  class Contracts c;
  class L1,L2,L3,L4,L5 sub;
```

### Boundary Contract
- **Allowed Inbound Consumers**: All Layers L1 to L7
- **Allowed Outbound Dependencies**: NONE (Depends on nothing)
- **Strictly Forbidden Dependencies**:
  - ❌ Any package or runtime from Layers L1-L7
  - ❌ External framework code (NestJS, React, Prisma)

---

## 3. Technology Stack & Key Primitives

- **Core Runtime & Languages**: TypeScript, Vitest, Zod
- **Primary Interface**: `@kannan19302/contracts`
- **Verification Harness**: `pnpm test && pnpm typecheck`

---

## 4. Quality Engineering & Verification Gates

To maintain institutional reliability, this repository is governed by the following continuous quality gates:
1. **Type Safety Gate**: Zero TypeScript/type-checker errors under strict mode.
2. **Layer Boundary Gate**: Verified by `scripts/check-layer.mjs` in `unierp-workspace` to prevent illegal upward or sideways coupling.
3. **Automated Test Suite**: Must execute cleanly with 100% pass rate before branch integration.

---

## 5. Associated AI Skills & Governance Links

- **Project Skill**: [`.agents/skills/contracts-standards/SKILL.md`](.agents/skills/contracts-standards/SKILL.md)
- **Workspace Governance**: [`../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md`](../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md)
- **Canonical Protocol**: [`../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md)
