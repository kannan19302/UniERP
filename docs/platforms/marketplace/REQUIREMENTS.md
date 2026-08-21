# Marketplace Requirements (FRS/SRS/NFR)

## Functional requirements

- `MKT-FR-001`: The platform shall submit and review publisher/app identity.
- `MKT-FR-002`: The platform shall publish versioned listings with compatibility metadata.
- `MKT-FR-003`: The platform shall purchase or entitle a tenant installation.
- `MKT-FR-004`: The platform shall install, upgrade, disable and uninstall extensions safely.
- `MKT-FR-005`: The platform shall collect ratings, support and security disclosures.

## System and non-functional requirements

- `MKT-NFR-001`: APIs and asynchronous work shall define availability, latency, error and recovery objectives.
- `MKT-NFR-002`: Mutating operations shall be idempotent, concurrency-safe and auditable.
- `MKT-NFR-003`: Failures shall be explicit, correlated and recoverable without reporting false success.
- `MKT-NFR-004`: Critical workflows shall meet WCAG 2.2 AA where a user interface exists.
- `MKT-NFR-005`: Data retention, residency, backup and deletion behavior shall be documented and tested.

Primary implementation: `marketplace`, `extensions`, API marketplace/extension-registry modules.

Inspected evidence: Marketplace app has 34 implementation files/1 test; extensions have 36/5 across healthcare, education, field service and real estate. Catalog data appears local in the UI while registry/service modules also exist.

Current risk: Catalog authority is split and local UI data may not reflect registry truth; commercial and technical lifecycle evidence is sparse.

