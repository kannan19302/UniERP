# ADR-0010: UniERP Master Platform Goal and Polyrepo Architecture Boundaries

- Status: Accepted
- Date: 2026-09-03
- Decision owner: UniERP Architecture and Engineering Governance
- Human approval: Approved by project owner as foundational governance baseline on 2026-09-03

## Context

UniERP is a 10-year enterprise multi-tenant ERP platform encompassing 31 repositories, 1,198 web routes, 430 mobile screens, 574 API controllers, and 1,910 database models. Previous organic growth across multiple teams led to architectural friction, including:
1. Cross-module direct dependencies and circular import hazards.
2. Inconsistent isolation mechanisms where 1,810 of 1,865 tenant tables lacked automated database Row-Level Security policies.
3. Absence of clear, explicit boundary definitions and allowed dependency lists for each repository.
4. AI agents lacking repository-specific skills to understand and uphold local standards.

A single unified architectural standard is required to anchor all 31 repositories to one shared North Star goal and provide unequivocal, machine-verifiable boundaries.

## Decision

UniERP formally accepts the **Platform North Star Goal**, the **8-Layer Polyrepo Dependency Law**, and the **Repository Boundary Matrix**.

### 1. The UniERP Master Platform North Star Goal

> **"Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System: delivering 100% Zero-Trust Multi-Tenant Isolation with hardware-enforced PostgreSQL Row-Level Security on every tenant table, Absolute Decimal(19,4) Numeric Precision across all ledgers, Atomic Durable Audit Logging, Sub-100ms P99 Transaction Latency, and a Unified High-Density Strata Workbench Design Language across all 1,198 web routes, native mobile, and desktop clients."**

### 2. The 8-Layer Unidirectional Dependency Law (L0 $\rightarrow$ L7)

Dependencies must flow strictly downward. A repository at Layer $N$ may depend **only** on published packages of Layer $< N$:

```
L7  OPERATIONS     infra · unierp-workspace
L6  EXTENSIONS     extensions (public extension API only)
L5  CLIENTS        desktop-app · unierp-mobile
L4  PRESENTATION   tenant-apps · provider-admin-os · tenant-admin · developer-platform · marketplace · marketing-site · web-studio · tenant-sites · tenant-site-template
L3  SERVICE        api · idp
L2  RUNTIME        data · framework · extension-api · sandbox · blockchain
L1  FOUNDATION     auth · config · design-system · kernel · sdk · service-kit · shared · storybook
L0  CONTRACTS      unierp-contracts (Zero dependencies)
```

**Boundary Rules**:
- **Zero Sideways Imports**: Sibling repositories within the same layer MUST NOT directly import or cross-depend on each other unless explicitly mediated through a lower-layer contract (L0/L1).
- **Zero Upward Imports**: Any package in Layer $N$ importing a package in Layer $\ge N$ is rejected by CI (`check-layer.mjs`).
- **L0 Inviolability**: `unierp-contracts` depends on nothing at all.
- **Direct Database Access Prohibited for Clients**: Presentation (L4) and Clients (L5) MUST NOT connect directly to the database or import `@kannan19302/database`. All data interactions must proceed via authenticated HTTP APIs or the official SDK.

### 3. Repository Boundary & Quality Guarantees

1. **Every repository MUST contain an `.agents/skills/<repo-name>-standards/SKILL.md`**:
   - Encodes repository-specific layer rules, allowed/forbidden imports, and coding anatomy.
   - Guides all future human and AI contributors to maintain architectural integrity.
2. **Every repository MUST maintain an authoritative `ARCHITECTURE.md`**:
   - Contains publication-grade Mermaid diagrams (System Context, Component Anatomy, Data Flow, Tenancy/Security).
3. **Database Row-Level Security Universality**:
   - Every model with a `tenantId` field must be governed by an automated, restrictive PostgreSQL RLS policy and verified under `NOBYPASSRLS`.
4. **Exact Decimal Arithmetic**:
   - Zero `Float` primitives permitted for financial values, inventory quantities, tax calculations, or account balances.

## Consequences

- All 31 repositories now have a single, non-negotiable architectural charter.
- CI gates in `unierp-workspace` will fail closed against any code or dependency violating this boundary matrix.
- Future AI agents will reliably uphold repo-specific conventions through co-located skills.
