# Desktop Client Requirements (FRS/SRS/NFR)

## Functional requirements

- `DESK-FR-001`: The platform shall launch an authenticated tenant client.
- `DESK-FR-002`: The platform shall handle approved deep links and file/device integrations.
- `DESK-FR-003`: The platform shall update through signed packages with rollback.
- `DESK-FR-004`: The platform shall isolate web content from privileged desktop APIs.
- `DESK-FR-005`: The platform shall report version, health and diagnostic correlation.

## System and non-functional requirements

- `DESK-NFR-001`: APIs and asynchronous work shall define availability, latency, error and recovery objectives.
- `DESK-NFR-002`: Mutating operations shall be idempotent, concurrency-safe and auditable.
- `DESK-NFR-003`: Failures shall be explicit, correlated and recoverable without reporting false success.
- `DESK-NFR-004`: Critical workflows shall meet WCAG 2.2 AA where a user interface exists.
- `DESK-NFR-005`: Data retention, residency, backup and deletion behavior shall be documented and tested.

Primary implementation: `desktop-app`.

Inspected evidence: Desktop repository has only 5 implementation files/1 test and mostly server/public shell files. It is not evidence of a production ERP desktop application.

Current risk: Current maturity is DECLARED/minimal; technology, trust boundary, feature parity and update mechanism are not proven.

