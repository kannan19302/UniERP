# Mobile Client Requirements (FRS/SRS/NFR)

## Functional requirements

- `MOB-FR-001`: The platform shall authenticate and select authorized tenant context.
- `MOB-FR-002`: The platform shall perform supported mobile business workflows.
- `MOB-FR-003`: The platform shall receive and act on notifications and deep links.
- `MOB-FR-004`: The platform shall cache approved data with explicit freshness and sync state.
- `MOB-FR-005`: The platform shall recover from connectivity loss and merge conflicts.

## System and non-functional requirements

- `MOB-NFR-001`: APIs and asynchronous work shall define availability, latency, error and recovery objectives.
- `MOB-NFR-002`: Mutating operations shall be idempotent, concurrency-safe and auditable.
- `MOB-NFR-003`: Failures shall be explicit, correlated and recoverable without reporting false success.
- `MOB-NFR-004`: Critical workflows shall meet WCAG 2.2 AA where a user interface exists.
- `MOB-NFR-005`: Data retention, residency, backup and deletion behavior shall be documented and tested.

Primary implementation: `unierp-mobile`.

Inspected evidence: Flutter client has 818 implementation files/29 tests and a large GoRouter configuration. Breadth is substantial but parity, offline and platform security evidence remain unmapped.

Current risk: Large route count can mask placeholder/parity gaps; offline conflicts, secure storage and device lifecycle require explicit proof.

## Declared parity exclusions requiring product decision

The legacy mobile exemption file lists `api-platform`, `ext-gateway`, `devops`, `notifications`, `outbox`,
`pwa`, `saved-views`, `fixed-assets`, `subscriptions`, `localization`, `reporting`, `people`,
`service-management`, `blockchain`, `drive` and `search` as deferred. These are `DECLARED` gaps, not permanent
non-goals. Each must be assigned one of: mobile workflow required, API/background-only by design, replaced by a
mobile-native workflow, or explicitly unsupported with customer impact.
