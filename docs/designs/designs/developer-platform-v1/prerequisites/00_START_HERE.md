# Developer Platform v1 — prerequisites and development entry point

This is the consolidated design and delivery baseline for 108 screen concepts. It includes the original 76 selected designs and 32 enterprise additions, all ordered in ../design/SCREEN_MANIFEST.json. Use ../design/index.html for visual review. The numeric sequence is the user journey, not a mandate to implement one screen at a time.

## Readiness decision

**The handoff package is actionable; unrestricted feature development is not yet cleared.** The inspected [readiness audit](../../../../unierp-workspace/governance/UNIERP_SAAS_READINESS_AUDIT_2026-08-28.md) records broad development and production NO-GO. [FND-PA-001 owner acceptance](../../../../unierp-workspace/governance/FND-PA-001_OWNER_REVIEW.md) permits the ordered P0 remediation, not broad expansion. This design task does not close those gates or supersede them. Start with the named prerequisite backlog and run the applicable continuation checks against current evidence. Do not infer readiness from old audit counts or screenshots.

The package contains completed design/planning deliverables. Product requirements proposed here still need incorporation into their authoritative owners; contracts and runtime behavior must then be proved. No certificate, production capability or market parity is claimed.

## Reading and execution order

| Step | Document | Outcome |
| --- | --- | --- |
| 1 | [01_CHANGE_CONTRACT](01_CHANGE_CONTRACT.md) | Scope, authority and safety boundaries |
| 2 | [02_PRODUCT_REQUIREMENTS](02_PRODUCT_REQUIREMENTS.md) | Personas, outcomes, functional acceptance |
| 3 | [03_INFORMATION_ARCHITECTURE](03_INFORMATION_ARCHITECTURE.md) | Screen sequence, navigation and flows |
| 4 | [04_ARCHITECTURE](04_ARCHITECTURE.md) | Ownership, runtime boundaries and component model |
| 5 | [05_DATA_AND_CONTRACTS](05_DATA_AND_CONTRACTS.md) | Existing model/contract reuse and lifecycle |
| 6 | [06_SECURITY_THREAT_MODEL](06_SECURITY_THREAT_MODEL.md) | Threats, permission decisions and proof |
| 7 | [07_BUILDER_ENGINEERING_GUIDE](07_BUILDER_ENGINEERING_GUIDE.md) | Shared builder implementation and conformance |
| 8 | [08_DESIGN_SYSTEM_ACCESSIBILITY](08_DESIGN_SYSTEM_ACCESSIBILITY.md) | Deterministic UI and accessible authoring |
| 9 | [09_ENVIRONMENT_SETUP](09_ENVIRONMENT_SETUP.md) | Tooling and isolated development prerequisites |
| 10 | [10_TEST_STRATEGY](10_TEST_STRATEGY.md) | Pilot proof and quality gates |
| 11 | [11_RELEASE_MIGRATION_RECOVERY](11_RELEASE_MIGRATION_RECOVERY.md) | Immutable promotion and recovery |
| 12 | [12_OBSERVABILITY_SLO_CAPACITY](12_OBSERVABILITY_SLO_CAPACITY.md) | Qualification budgets, alerts and runbooks |
| 13 | [13_EPICS_STORIES_SPRINTS](13_EPICS_STORIES_SPRINTS.md) | Delivery waves, owners and planning |
| 14 | [14_GUIDED_DEVELOPMENT](14_GUIDED_DEVELOPMENT.md) | Repeatable execution instructions |
| 15 | [15_DECISIONS_AND_READINESS](15_DECISIONS_AND_READINESS.md) | Decisions and release/start gates |
| 16 | [16_ENTERPRISE_GAP_REVIEW](16_ENTERPRISE_GAP_REVIEW.md) | Market references and added screen rationale |
| 17 | [17_TRACEABILITY](17_TRACEABILITY.md) | Requirements/screens/stories/evidence mapping |
| 18 | [18_IMPLEMENTATION_BACKLOG](18_IMPLEMENTATION_BACKLOG.md) | Story-level acceptance and dependencies |
| 19 | [19_ACCEPTANCE_HANDOFF](19_ACCEPTANCE_HANDOFF.md) | Ready/Done definitions and approval packet |

## Governing sources

- [Platform catalog](../../../../unierp-platform/docs/PLATFORM_CATALOG.md).
- [Developer requirements](../../../../unierp-platform/docs/platforms/developer-platform/REQUIREMENTS.md), [security](../../../../unierp-platform/docs/platforms/developer-platform/SECURITY.md), [contracts](../../../../unierp-platform/docs/platforms/developer-platform/CONTRACTS.md).
- [Tenant Sites requirements](../../../../unierp-platform/docs/platforms/tenant-sites/REQUIREMENTS.md) and [contracts](../../../../unierp-platform/docs/platforms/tenant-sites/CONTRACTS.md).
- [Accepted artifact lifecycle](../../../../unierp-platform/docs/adr/ADR-0005-developer-platform-artifact-and-package-lifecycle.md), [runtime independence](../../../../unierp-platform/docs/adr/ADR-0006-developer-platform-cells-and-runtime-independence.md), [compatibility](../../../../unierp-platform/docs/adr/ADR-0007-developer-platform-compatibility-and-portability.md).
- [Accepted portability matrix](../../../../unierp-platform/docs/platforms/developer-platform/ARTIFACT-PORTABILITY-MATRIX.md) and [pilot acceptance](../../../../unierp-platform/docs/platforms/developer-platform/PILOT-ACCEPTANCE.md).
- [Strata ADR](../../../../unierp-platform/docs/adr/ADR-0009-strata-enterprise-design-language.md) and [Strata skill](../../../../unierp-workspace/governance/skills/unierp-strata-design/SKILL.md).
- [Advanced customization plan](../../../../unierp-platform/docs/platforms/developer-platform/ADVANCED-CUSTOMIZATION-PLAN.md) is a draft; accepted ADRs and owning specifications prevail.

## First work packet

Assign accountable people to the Product, Architecture, Security, Data, SRE and QA roles in document 15. Revalidate readiness and the source baseline. Close project/portability/contract decisions. Provision a disposable tenant-isolation test environment. Then execute the App and Site pilots through the same artifact/installation/release services. These are independently tracked prerequisite stories FND-01..12; screen stories must not bypass them.
