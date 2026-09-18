---
name: infra-operations-standards
description: Authoritative standards, architectural boundaries, coding anatomy, and verification gates for infra.
version: 1.0.0
author: UniERP Architecture Governance
---

# UniERP Cloud Infrastructure & Orchestration — AI Agent Guidance & Project Skill

This skill governs all code modification, analysis, and testing within `infra` (**Layer L7: Operations**). Every AI agent and software engineer working in this repository MUST follow these rules without exception.

---

## 🏛️ 1. Architectural Position & Boundary Rules

- **Repository**: `infra`
- **Layer**: **L7 (Operations)**
- **Package Identity**: `unierp-infra`
- **Allowed Inbound Callers**: SREs, DevOps engineers, release pipelines
- **Allowed Outbound Dependencies**: All layers (Deployment & runtime configuration only)
- **STRICTLY FORBIDDEN DEPENDENCIES**:
  - ❌ Business domain code
  - ❌ Product feature logic

> **Unidirectional Rule**: You may ONLY import published artifacts from strictly lower layers. Sibling imports within the same layer are prohibited unless mediated through L0 contracts.

---

## 🎯 2. The Platform Goal & Repository Mandate

> **Platform North Star Goal**:  
> "Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System: 100% Zero-Trust Multi-Tenant Isolation, Absolute Decimal(19,4) Numeric Precision, Atomic Durable Audit Logging, Sub-100ms P99 Latency, and Strata Workbench High-Density UI."

### Repository Responsibility Mandate
Terraform IaC, Kubernetes Helm charts, Docker Compose, ArgoCD deployment pipelines, and Cloudflare edge network configurations.

---

## 📐 3. Repository-Specific Coding Standards

### Core Implementation Standards
1. Maintain strict modular boundaries and single-responsibility interfaces.
2. Export all public types from the root `index.ts`.
3. Ensure zero TypeScript compilation errors under `tsc --noEmit`.

---

## 🛡️ 4. Mandatory Pre-Commit Verification Gate

Before submitting or reporting completion on any change in this repository, run and verify:

```bash
docker-compose config
```

All tests must pass with 0 failures and 0 type errors.
