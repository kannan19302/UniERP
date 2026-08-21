# Platform Catalog

The catalog maps product ownership to implementation. A repository is a delivery unit, not automatically a
product boundary. Shared services may support several platforms while retaining one authoritative contract.

| ID | Platform | Actors | Owned surface | Current evidence | Initial risk |
| --- | --- | --- | --- | --- | --- |
| PLT-PAO | Platform Admin OS | provider operators, SRE, security, support | provider control plane | Next.js app; 174 implementation files; 4 tests observed | very broad route inventory with sparse tests |
| PLT-TAD | Tenant Admin | tenant owners and administrators | tenant configuration and governance | Next.js app; 163 implementation files | provider-only and tenant-only responsibilities appear mixed |
| PLT-ERP | Tenant Apps ERP | tenant business users | ERP application suites | 1,025 implementation files; 17 tests observed; 45 API modules | route presence does not prove end-to-end capability |
| PLT-DEV | Developer Platform | extension developers | developer portal, APIs, credentials, sandbox | 164 implementation files plus SDK and extension API | contract/version lifecycle not yet centralized |
| PLT-MKT | Marketplace | publishers, tenant buyers, reviewers | listing, review, purchase, install lifecycle | standalone package plus API modules | authority split across repositories |
| PLT-IAM | Identity Platform | all human and machine principals | OIDC, login, SSO, sessions, entitlement | auth/OIDC controllers, guards and tests inspected | platform-versus-tenant admin boundary needs formal policy |
| PLT-BIZ | Data and Business Services | all clients and integrations | domain APIs, schemas, contracts, events | 45 API modules, 313 data implementation files, 90 contract files | extremely large domain breadth and contract drift risk |
| PLT-DS | Design Platform | product teams and end users | components, tokens, accessibility | 200 design-system files; Storybook repository | duplicated accessibility documents exist |
| PLT-SITE | Tenant Sites and Studio | tenant creators and visitors | site builder, publishing and runtime | three repositories | ownership and publication contract undocumented |
| PLT-MOB | Mobile Client | tenant mobile users | Flutter client | 818 implementation files | parity and offline behavior need evidence |
| PLT-DESK | Desktop Client | tenant desktop users | desktop shell/client | 5 implementation files | capability maturity is minimal |
| PLT-MAR | Marketing Site | prospects and customers | public corporate experience | 222 implementation files | marketing claims require product evidence links |
| PLT-OPS | Runtime and Operations | operators and service owners | deployment, configuration, shared runtime | infra and foundation repositories | operational standards currently dispersed |

## Boundary rules

- Provider operations belong to PLT-PAO; tenant-scoped administration belongs to PLT-TAD.
- Business transactions and records belong to PLT-ERP/PLT-BIZ, not either administration shell.
- Authentication and principal/session lifecycle belong to PLT-IAM. Other platforms consume IAM contracts.
- Reusable UI behavior belongs to PLT-DS. Platform documents define experience needs, not component internals.
- Public extension contracts belong to PLT-DEV; commercial discovery and installation lifecycle belong to PLT-MKT.
- Deployment, telemetry, incident and recovery standards belong to PLT-OPS and are referenced by every platform.
