# UniERP Master Platform Goal & Polyrepo Architecture Governance

Status: `AUTHORITATIVE & ACCEPTED`  
Date: 2026-09-03  
Owning Contract: `ADR-0010`  
Applies to: All 31 repositories, human engineers, and AI development agents across all providers.

---

## 🎯 The UniERP Master Platform North Star Goal

> **"Build the world's premier autonomous, multi-tenant Enterprise SaaS Operating System:  
> - 100% Zero-Trust Multi-Tenant Isolation with PostgreSQL Row-Level Security on every tenant table;  
> - Absolute Numeric Integrity with exact Decimal(19,4) arithmetic across financial and stock ledgers;  
> - Durable, Non-Repudiable Audit Logging where business transactions and audit entries are atomic;  
> - Sub-100ms P99 API Latency with end-to-end OpenTelemetry distributed tracing and structured Pino logging;  
> - High-Density, Accessible UI powered by Strata Workbench across Web (1,198 routes), Mobile (430 screens), and Desktop;  
> - Bank-Grade Regulatory Compliance (SOC 2 Type II, SOX 404, ISO 27001, GDPR, HIPAA)."**

---

## 🏛️ The 8-Layer Unidirectional Architecture Hierarchy

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

### Inviolable Layer Rules (Instant Rejection if Violated)
1. **Strict Downward Dependencies**: Layer $N$ may only import published artifacts from Layer $< N$.
2. **Zero Sideways Coupling**: Sibling packages in the same layer must never import each other directly; they must interact via lower-layer contracts (L0) or domain events.
3. **No Direct Database Access from L4/L5**: Presentation apps and client apps must never connect directly to the database or import `@kannan19302/database`. All data flows through authenticated HTTP APIs or the official SDK.
4. **Universal 31-Repository AI Skills**: Every repository must contain `.agents/skills/<repo>-standards/SKILL.md` defining its exact role, boundaries, anatomy, and verification gates.
5. **Authoritative Architecture Documentation**: Every repository must contain `ARCHITECTURE.md` with publication-grade Mermaid diagrams (System Context, Component Anatomy, Data Flow, Tenancy/Security).
