# Tenant Sites and Studio Requirements (FRS/SRS/NFR)

## Functional requirements

- `SITE-FR-001`: The platform shall create sites and pages from versioned schemas.
- `SITE-FR-002`: The platform shall preview draft content and responsive layouts.
- `SITE-FR-003`: The platform shall publish immutable revisions to tenant domains.
- `SITE-FR-004`: The platform shall render public pages and supported commerce/content blocks.
- `SITE-FR-005`: The platform shall rollback, unpublish and observe site health.

## System and non-functional requirements

- `SITE-NFR-001`: APIs and asynchronous work shall define availability, latency, error and recovery objectives.
- `SITE-NFR-002`: Mutating operations shall be idempotent, concurrency-safe and auditable.
- `SITE-NFR-003`: Failures shall be explicit, correlated and recoverable without reporting false success.
- `SITE-NFR-004`: Critical workflows shall meet WCAG 2.2 AA where a user interface exists.
- `SITE-NFR-005`: Data retention, residency, backup and deletion behavior shall be documented and tested.

Primary implementation: `tenant-sites`, `tenant-site-template`, `web-studio`.

Inspected evidence: Tenant sites has 18 implementation files/1 test; template 1/0; studio 8/1. Observed blocks include collections/cart and tenant header/home; overall maturity is low.

Current risk: Builder, template and runtime contracts are largely undocumented and thinly implemented; safe publication and tenant/domain isolation are not proven.

