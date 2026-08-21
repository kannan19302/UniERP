# Data and Business Services PRD

## Product outcome

Provide canonical domain logic, persistence schemas, public/internal API contracts, events, audit and business transaction integrity for all UniERP clients, integrations, background workers and operators, with explicit tenant, provider and service boundaries.

## Business requirements

- `BIZ-BR-001`: The platform shall expose one authoritative lifecycle for every owned resource.
- `BIZ-BR-002`: Every tenant-owned operation shall preserve tenant isolation and attributable audit.
- `BIZ-BR-003`: Contract compatibility and deprecation shall be explicit and measurable.
- `BIZ-BR-004`: User-visible success shall represent durable system success, not route or request presence.
- `BIZ-BR-005`: Capabilities without implementation and behavioral evidence shall remain UNVERIFIED.

## Scope and maturity

Primary implementation: `api`, `data`, `unierp-contracts`.

Inspected evidence: API has 2,192 implementation files/577 test files across 45 modules; data has 313/9 with extensive Prisma schemas; contracts has 90/43 including versioning, audit and backup/restore types.

Current risk: Very high breadth, many schema files and relatively weak data-layer test count create ownership, RLS, migration and contract-drift risk.

Success measures are lifecycle completion, correctness, security, availability and evidence coverage. File, route or screen count is not a success measure.

