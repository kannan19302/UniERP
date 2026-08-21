# Data and Business Services

Platform for all UniERP clients, integrations, background workers and operators. It owns canonical domain logic, persistence schemas, public/internal API contracts, events, audit and business transaction integrity.

Primary implementation: `api`, `data`, `unierp-contracts`.

Inspected evidence: API has 2,192 implementation files/577 test files across 45 modules; data has 313/9 with extensive Prisma schemas; contracts has 90/43 including versioning, audit and backup/restore types.

Current risk: Very high breadth, many schema files and relatively weak data-layer test count create ownership, RLS, migration and contract-drift risk.

## Authoritative suite

- [PRD](PRD.md)
- [Requirements](REQUIREMENTS.md)
- [Architecture/TRD](ARCHITECTURE.md)
- [API, data and integration contracts](CONTRACTS.md)
- [Security/IAM/compliance](SECURITY.md)
- [UX/design requirements](EXPERIENCE.md)
- [Infrastructure, SRE, QA and operations](OPERATIONS.md)
- [Traceability](TRACEABILITY.md)
- [Business-module implementation evidence](modules/README.md)
- [Generated event flow](evidence/event-flow.md)
- [Generated module dependency graph](evidence/module-dependency-graph.md)
- [Generated permission matrix](evidence/permission-matrix.md)
- [Legacy retention matrix evidence](evidence/legacy-data-retention-matrix.md)
- [Legacy deletion-policy evidence](evidence/legacy-deletion-policy.md)
- [Current Prisma data-model inventory](evidence/prisma-data-model-inventory.md)
- [Current RLS migration and tenant-model linkage](evidence/rls-migration-coverage.md)
- [Current API/IDP controller and authorization inventory](evidence/controller-authorization-inventory.md)
- [Current module route-decorator inventory](evidence/module-route-inventory.md)
- [AST method-level controller contract coverage](evidence/ast-controller-coverage.md)
