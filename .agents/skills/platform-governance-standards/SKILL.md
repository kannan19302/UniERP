---
name: platform-governance-standards
description: Repository guidance, architectural context, and verification routing for platform.
version: 1.0.0
author: UniERP Architecture Governance
---

# UniERP Platform Architecture Specifications & Standards — AI Agent Guidance & Project Skill

Read the [applicable AGENTS.md](../../../AGENTS.md) first. This skill is subordinate implementation guidance.
Resolve ownership and current topology through that entrypoint; examples and performance aspirations are not
verified product facts. Select verification from the owning package scripts and canonical risk matrix.
The commands below are not a complete substitute for applicable security, integration, lint or build gates.


This skill governs all code modification, analysis, and testing within `platform` (**Layer Normative: Governance**). Every AI agent and software engineer working in this repository MUST follow these rules without exception.

---

## 🏛️ 1. Architectural Position & Boundary Rules

- **Repository**: `platform`
- **Layer**: **Normative (Governance)**
- **Package Identity**: `platform-docs`
- **Allowed Inbound Callers**: All human and AI engineers across the active repositories
- **Allowed Outbound Dependencies**: NONE (Normative specifications depend on no code)
- **STRICTLY FORBIDDEN DEPENDENCIES**:
  - ❌ Runtime code dependencies

> **Unidirectional Rule**: You may ONLY import published artifacts from strictly lower layers. Sibling imports within the same layer are prohibited unless mediated through L0 contracts.

---

## 🎯 2. The Platform Goal & Repository Mandate

> **Platform North Star Goal**:  
> "Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System: 100% Zero-Trust Multi-Tenant Isolation, Absolute Decimal(19,4) Numeric Precision, Atomic Durable Audit Logging, Sub-100ms P99 Latency, and Strata Workbench High-Density UI."

### Repository Responsibility Mandate
Authoritative platform specifications, Architecture Decision Records (ADRs), Product Requirement Documents (PRDs), and traceability catalogs.

---

## 📐 3. Repository-Specific Coding Standards

### Core Implementation Standards
1. Preserve accepted ADRs and link normative facts to their owning specification.
2. Keep generated inventories separate from intent and regenerate them with their owning tools.
3. Verify documentation links, governance discovery and affected protocol gates from the platform root.

---

## 🛡️ 4. Mandatory Pre-Commit Verification Gate

Before submitting or reporting completion on any change in this repository, run and verify:

```bash
node workspace/scripts/check-ai-agent-protocol.mjs
```

All tests must pass with 0 failures and 0 type errors.
