# Tenant Apps ERP Requirements (FRS/SRS/NFR)

## Functional capability groups

- `ERP-FR-001`: Finance shall support controlled journals, ledgers, receivables, payables, cash and close.
- `ERP-FR-002`: Order-to-cash shall connect customer, quote/order, fulfillment, invoice, payment and accounting.
- `ERP-FR-003`: Procure-to-pay shall connect supplier, requisition/order, receipt, invoice, payment and accounting.
- `ERP-FR-004`: Inventory shall preserve item, location, lot/serial, reservation and movement integrity.
- `ERP-FR-005`: Manufacturing shall connect BOM/routing, planning, work execution, consumption, output and costing.
- `ERP-FR-006`: People/HR shall manage worker lifecycle, organization, time and controlled personal data.
- `ERP-FR-007`: CRM/service shall manage customer lifecycle, pipeline, cases, SLAs and communication consent.
- `ERP-FR-008`: Reporting shall respect the same authorization and tenant boundaries as source transactions.
- `ERP-FR-009`: Analytics workspaces shall support 8 authoritative user groups (executives, managers, operational users,
  analysts, authors, data stewards, security admins, external auditors) with role-scoped row and column data masking.
- `ERP-FR-010`: Visual query studio and multidimensional pivot matrix shall compile visual ASTs into parameterized SQL
  without client-side SQL generation or injection vulnerability.
- `ERP-FR-011`: High-throughput real-time telemetry, predictive forecasting, and anomaly detection shall support
  reconnection backoff, query timeouts, and graceful offline degradation.
- `ERP-FR-012`: Operational metric catalog shall synchronize with OCC-22 (Organization Intelligence & Insights)
  for enterprise semantic metric certification.

## NFRs

- `ERP-NFR-001`: Tenant isolation shall be enforced at API and persistence layers and proven with two-tenant tests.
- `ERP-NFR-002`: Transactional commands shall be idempotent and concurrency safe.
- `ERP-NFR-003`: Audit and outbox events shall commit atomically with state changes.
- `ERP-NFR-004`: Availability, latency, recovery and data-loss objectives shall be defined per critical journey.
- `ERP-NFR-005`: Lists and reports shall remain usable at enterprise data volumes with bounded pagination/export.
- `ERP-NFR-006`: Core workflows shall meet WCAG 2.2 AA and localization requirements.
- `ERP-NFR-007`: Analytical dashboards and reports shall display 100% truthful data from live databases; mock arrays,
  demo data fallbacks, and browser native dialogs (`alert()`, `confirm()`) are strictly prohibited in production paths.

Vertical modules observed in code are not automatically production commitments; each requires its own verified
requirements and traceability before it can be marked `IMPLEMENTED`.

## Detailed Specifications
- [Sentra Analytics Product & Experience Architecture](ANALYTICS_EXPERIENCE_ARCHITECTURE.md)
- [UniERP Analytics Enterprise Program R2 Change Contract](ANALYTICS_CHANGE_CONTRACT.md)

