# Data and Business Services Requirements (FRS/SRS/NFR)

## Functional requirements

- `BIZ-FR-001`: The platform shall execute validated domain commands and queries.
- `BIZ-FR-002`: The platform shall persist tenant-isolated records and atomic business effects.
- `BIZ-FR-003`: The platform shall publish durable versioned domain events.
- `BIZ-FR-004`: The platform shall expose versioned client and integration contracts.
- `BIZ-FR-005`: The platform shall support audit, reconciliation, migration and recovery.

## System and non-functional requirements

- `BIZ-NFR-001`: APIs and asynchronous work shall define availability, latency, error and recovery objectives.
- `BIZ-NFR-002`: Mutating operations shall be idempotent, concurrency-safe and auditable.
- `BIZ-NFR-003`: Failures shall be explicit, correlated and recoverable without reporting false success.
- `BIZ-NFR-004`: Critical workflows shall meet WCAG 2.2 AA where a user interface exists.
- `BIZ-NFR-005`: Data retention, residency, backup and deletion behavior shall be documented and tested.

Primary implementation: `api`, `data`, `unierp-contracts`.

Inspected evidence: API has 2,192 implementation files/577 test files across 45 modules; data has 313/9 with extensive Prisma schemas; contracts has 90/43 including versioning, audit and backup/restore types.

Current risk: Very high breadth, many schema files and relatively weak data-layer test count create ownership, RLS, migration and contract-drift risk.

