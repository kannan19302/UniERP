# Marketing Site Requirements (FRS/SRS/NFR)

## Functional requirements

- `MAR-FR-001`: The platform shall publish accessible localized product content.
- `MAR-FR-002`: The platform shall capture and route consented leads and contact requests.
- `MAR-FR-003`: The platform shall serve legal, privacy and security information.
- `MAR-FR-004`: The platform shall manage authorized editorial content and previews.
- `MAR-FR-005`: The platform shall measure acquisition within consent and privacy policy.

## System and non-functional requirements

- `MAR-NFR-001`: APIs and asynchronous work shall define availability, latency, error and recovery objectives.
- `MAR-NFR-002`: Mutating operations shall be idempotent, concurrency-safe and auditable.
- `MAR-NFR-003`: Failures shall be explicit, correlated and recoverable without reporting false success.
- `MAR-NFR-004`: Critical workflows shall meet WCAG 2.2 AA where a user interface exists.
- `MAR-NFR-005`: Data retention, residency, backup and deletion behavior shall be documented and tested.

Primary implementation: `marketing-site`.

Inspected evidence: Marketing site has 222 implementation files/4 tests, 142 app files and a local Prisma schema with Tenant, Domain, Setting, User, Lead and Ticket models.

Current risk: The public site contains its own tenant/user/lead/ticket persistence, creating data ownership and IAM overlap; product claims may drift from verified capabilities.

