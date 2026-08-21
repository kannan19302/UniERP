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

## NFRs

- `ERP-NFR-001`: Tenant isolation shall be enforced at API and persistence layers and proven with two-tenant tests.
- `ERP-NFR-002`: Transactional commands shall be idempotent and concurrency safe.
- `ERP-NFR-003`: Audit and outbox events shall commit atomically with state changes.
- `ERP-NFR-004`: Availability, latency, recovery and data-loss objectives shall be defined per critical journey.
- `ERP-NFR-005`: Lists and reports shall remain usable at enterprise data volumes with bounded pagination/export.
- `ERP-NFR-006`: Core workflows shall meet WCAG 2.2 AA and localization requirements.

Vertical modules observed in code are not automatically production commitments; each requires its own verified
requirements and traceability before it can be marked `IMPLEMENTED`.
