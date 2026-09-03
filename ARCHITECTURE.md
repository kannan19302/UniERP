# Architecture Specification: UniERP Platform Architecture Specifications & Standards (`unierp-platform`)

- **Layer**: Layer Normative (Governance)
- **Package Identity**: `unierp-platform-docs`
- **Owning ADR**: [ADR-0010: UniERP Master Platform Goal and Polyrepo Architecture Boundaries](../unierp-platform/docs/adr/ADR-0010-platform-north-star-and-polyrepo-boundaries.md)
- **Status**: Authoritative & Production-Active

---

## 1. Executive Summary & Purpose

Authoritative platform specifications, Architecture Decision Records (ADRs), Product Requirement Documents (PRDs), and traceability catalogs.

This repository is one delivery unit in the UniERP 31-repository polyrepo estate, anchored by the **UniERP Master Platform North Star Goal**:
> "Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System: delivering 100% Zero-Trust Multi-Tenant Isolation with PostgreSQL Row-Level Security on every tenant table, Absolute Decimal(19,4) Numeric Precision across all ledgers, Atomic Durable Audit Logging, Sub-100ms P99 Transaction Latency, and a Unified High-Density Strata Workbench Design Language across all 1,198 web routes, native mobile, and desktop clients."

---

## 2. System Context & Architectural Boundaries

```mermaid
graph LR
  Callers["Allowed Inbound Callers<br/>All human and AI engineers across all 31 repositories"] --> Repo["<b>unierp-platform (Normative)</b><br/>UniERP Platform Architecture Specifications & Standards"]
  Repo --> Outbound["Allowed Outbound Dependencies<br/>NONE (Normative specifications depend on no code)"]
  
  Forbidden["Strictly Forbidden<br/>Runtime code dependencies"] -.-x Repo

  classDef r fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
  classDef c fill:#1e293b,stroke:#64748b,stroke-width:1px,color:#fff;
  classDef f fill:#450a0a,stroke:#ef4444,stroke-width:1px,color:#fca5a5;
  class Repo r;
  class Callers,Outbound c;
  class Forbidden f;
```

### Boundary Contract
- **Allowed Inbound Consumers**: All human and AI engineers across all 31 repositories
- **Allowed Outbound Dependencies**: NONE (Normative specifications depend on no code)
- **Strictly Forbidden Dependencies**:
  - ❌ Runtime code dependencies

---

## 3. Technology Stack & Key Primitives

- **Core Runtime & Languages**: Markdown, Mermaid, JSON schemas
- **Primary Interface**: `unierp-platform-docs`
- **Verification Harness**: `node scripts/validate-truth.mjs (via workspace)`

---

## 4. Quality Engineering & Verification Gates

To maintain institutional reliability, this repository is governed by the following continuous quality gates:
1. **Type Safety Gate**: Zero TypeScript/type-checker errors under strict mode.
2. **Layer Boundary Gate**: Verified by `scripts/check-layer.mjs` in `unierp-workspace` to prevent illegal upward or sideways coupling.
3. **Automated Test Suite**: Must execute cleanly with 100% pass rate before branch integration.

---

## 5. Associated AI Skills & Governance Links

- **Project Skill**: [`.agents/skills/platform-governance-standards/SKILL.md`](.agents/skills/platform-governance-standards/SKILL.md)
- **Workspace Governance**: [`../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md`](../unierp-workspace/governance/UNIERP_MASTER_PLATFORM_GOAL.md)
- **Canonical Protocol**: [`../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md)
