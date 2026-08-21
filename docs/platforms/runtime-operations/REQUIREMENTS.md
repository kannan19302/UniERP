# Runtime and Operations Platform Requirements (FRS/SRS/NFR)

## Functional requirements

- `OPS-FR-001`: The platform shall provision reproducible environments.
- `OPS-FR-002`: The platform shall deploy signed and versioned services with safe rollback.
- `OPS-FR-003`: The platform shall validate and distribute configuration and secrets.
- `OPS-FR-004`: The platform shall enforce tenant resource budgets and runtime policy.
- `OPS-FR-005`: The platform shall collect correlated telemetry and execute recovery.

## System and non-functional requirements

- `OPS-NFR-001`: APIs and asynchronous work shall define availability, latency, error and recovery objectives.
- `OPS-NFR-002`: Mutating operations shall be idempotent, concurrency-safe and auditable.
- `OPS-NFR-003`: Failures shall be explicit, correlated and recoverable without reporting false success.
- `OPS-NFR-004`: Critical workflows shall meet WCAG 2.2 AA where a user interface exists.
- `OPS-NFR-005`: Data retention, residency, backup and deletion behavior shall be documented and tested.

Primary implementation: `infra`, `config`, `kernel`, `shared`, `service-kit`.

Inspected evidence: Infra has 38 implementation files/13 tests with load tests, platform wizard and control-plane assets; kernel 10/5 exposes tenant governor/policy; shared 56/13; service-kit 5/2; config has almost no source implementation.

Current risk: Operational mechanisms are dispersed; config package appears nearly empty; deployment topology and tested recovery evidence are not centrally authoritative.

