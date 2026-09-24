# Platform catalog

A platform owns product behavior; a Git root is a delivery unit. The active
14-root topology is set by [ADR-0012](adr/ADR-0012-polyrepo-consolidation-to-14-core-roots.md).
Package and repository inventory is generated from
[active-estate.json](../workspace/governance/active-estate.json). This catalog
assigns accountability; it does not claim implementation or release readiness.

| ID | Accountable platform | Owned behavior | Primary active delivery roots |
| --- | --- | --- | --- |
| PLT-PAO | Provider Admin OS | Provider tenant lifecycle, estate operations, bounded support, provider commercial control | `provider-admin`, `api`, `idp` |
| PLT-TAD | Tenant Admin | One-organization configuration, access governance, integrations and audit | `tenant-admin`, `api`, `idp` |
| PLT-ERP | Business Suite | Tenant business workflows, workspaces and reports | `business-suite`, `api`, `data` |
| PLT-DEV | Developer Platform | Developer portal, public API/SDK experience, credentials, extensions and sandbox | `developer-platform`, `contracts`, `api` |
| PLT-MKT | Marketplace | Listing, review, purchase, installation, upgrade and revocation | `developer-platform`, `api` |
| PLT-IAM | Identity Platform | Principals, credentials, sessions, federation and entitlement evaluation | `idp`, `api` |
| PLT-BIZ | Data and Business Services | Domain behavior, canonical master data, schemas, persistence and published business contracts | `contracts`, `data`, `api` |
| PLT-DS | Design Platform | Shared UI components, design tokens, interaction patterns and accessibility | `design-system` |
| PLT-SITE | Tenant Sites and Studio | Tenant site creation, publishing and public runtime contract | `developer-platform`, `api` |
| PLT-MOB | Mobile Client | Supported native mobile journeys, sync and device behavior | `mobile` |
| PLT-DESK | Desktop Client | Supported desktop shell, native integration and updates | `desktop-app` |
| PLT-MAR | Marketing Site | Public product information, acquisition and onboarding handoff | `marketing-site` |
| PLT-OPS | Runtime and Operations | Infrastructure, delivery, telemetry, security operations and recovery | `platform`, `shared` |

## Boundary rules

- Provider operations belong to PLT-PAO; tenant-scoped administration to PLT-TAD;
  business transactions to PLT-ERP and PLT-BIZ. No authority crosses implicitly.
- PLT-IAM owns authentication and session lifecycle. Other platforms consume its
  published contracts and enforce their own server-side resource policy.
- PLT-DS owns reusable UI behavior. Product platforms own workflow needs and consume
  the shared package.
- PLT-DEV owns public extensibility contracts; PLT-MKT owns commercial discovery and
  installation lifecycle. PLT-OPS owns release and recovery.
- A folder, module, schema field or route does not by itself assign platform
  ownership or prove a working capability. Use owning requirements and evidence.
