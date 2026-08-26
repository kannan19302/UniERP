# UniERP Product Documentation

This directory is the authoritative product and platform documentation source for the UniERP polyrepo.
Repository-level `README.md` files may explain installation and local development, but must not redefine
product requirements, architecture boundaries, security policy, or platform contracts.

Start with the [overall UniERP product suite](product/README.md), then follow the owning platform.

## Authority order

1. Accepted architecture decision records (ADRs).
2. Platform specifications in `platforms/<platform>/`.
3. Cross-platform standards in `standards/`.
4. Generated implementation evidence in `evidence/`.
5. Repository README, contribution, support, and historical documents.

When code and an authoritative document disagree, record the discrepancy as a gap. Do not silently present
either side as the intended state.

## Platform map

| Platform | Primary repositories | Documentation owner |
| --- | --- | --- |
| Platform Admin OS | `provider-admin-os`, `api`, `idp`, `infra` | `platforms/platform-admin-os/` |
| Tenant Admin | `tenant-admin`, `api`, `idp` | `platforms/tenant-admin/` |
| Tenant Apps ERP | `tenant-apps`, `api`, `data` | `platforms/tenant-apps/` |
| Developer Platform | `developer-platform`, `sdk`, `extension-api`, `sandbox` | `platforms/developer-platform/` |
| Marketplace | `marketplace`, API marketplace modules, `extensions` | `platforms/marketplace/` |
| Identity Platform | `idp`, `auth` | `platforms/identity/` |
| Data and Business Services | `api`, `data`, `unierp-contracts` | `platforms/business-services/` |
| Design Platform | `design-system`, `storybook`, `framework` | `platforms/design-system/` |
| Tenant Sites and Studio | `tenant-sites`, `tenant-site-template`, `web-studio` | `platforms/tenant-sites/` |
| Mobile Client | `unierp-mobile` | `platforms/mobile/` |
| Desktop Client | `desktop-app` | `platforms/desktop/` |
| Marketing Site | `marketing-site` | `platforms/marketing-site/` |
| Runtime and Operations | `infra`, `config`, `kernel`, `shared`, `service-kit` | `platforms/runtime-operations/` |

## Required suite per platform

Every platform directory must contain:

- `README.md`: ownership, scope, evidence, status and document index.
- `PRD.md`: users, outcomes, business rules, scope and success measures.
- `REQUIREMENTS.md`: functional requirements/FRS, SRS behavior and NFRs.
- `ARCHITECTURE.md`: TRD, runtime design, boundaries, trust zones and decisions.
- `CONTRACTS.md`: API, event, integration and data contracts.
- `SECURITY.md`: IAM, tenant isolation, privacy, compliance and threat requirements.
- `EXPERIENCE.md`: UX, accessibility, localization and design-system requirements.
- `OPERATIONS.md`: infrastructure, delivery, SRE, observability, testing and runbooks.
- `TRACEABILITY.md`: requirement to architecture, implementation and test evidence.
- `adr/`: decisions local to that platform.

Cross-platform rules are defined once in `standards/` and referenced, not copied.

## Evidence vocabulary

| Status | Meaning |
| --- | --- |
| `IMPLEMENTED` | A concrete implementation and a relevant passing test or runtime proof were inspected. |
| `PARTIAL` | Some mechanism exists, but required behavior or proof is incomplete. |
| `DECLARED` | Documentation or route naming expresses intent without sufficient implementation proof. |
| `UNVERIFIED` | Code may exist, but no evidence has yet been inspected. |
| `GAP` | Required behavior is absent or contradicted by inspected evidence. |
| `N/A` | Explicitly outside the platform boundary, with an owner named elsewhere. |

See [documentation governance](standards/DOCUMENTATION_GOVERNANCE.md) and the
[platform catalog](PLATFORM_CATALOG.md).

All AI development agents, independent of provider or runtime, follow the
[AI agent development protocol](standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md). The workspace root `AGENTS.md`
is its mandatory discovery entry point.

The dated [implementation baseline](evidence/IMPLEMENTATION_BASELINE.md) records repository-level source and test signals.
The [requirement traceability coverage matrix](evidence/REQUIREMENT_TRACEABILITY_COVERAGE.md) exposes every linked and unmapped requirement.
The [polyrepo test inventory](evidence/TEST_INVENTORY.md) records current test-like files and evidence gaps.
The [documentation completion audit](evidence/DOCUMENTATION_COMPLETION_AUDIT.md) records the final structural checks and completion boundary.
The [duplication audit](evidence/DOCUMENT_DUPLICATION_AUDIT.md) checks authoritative normative files for exact duplicates.
