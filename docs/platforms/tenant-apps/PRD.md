# Tenant Apps ERP PRD

## Product outcome

Provide tenant-isolated systems of record and workflows for finance, sales, procurement, inventory,
manufacturing, HR/people, CRM, projects, service, commerce, communication, reporting and supported verticals.

## Business requirements

- `ERP-BR-001`: Every business record and transaction shall belong to exactly one tenant.
- `ERP-BR-002`: Financial and inventory effects shall be balanced, atomic and auditable.
- `ERP-BR-003`: Business objects shall follow explicit lifecycle states and permissioned transitions.
- `ERP-BR-004`: Cross-module effects shall preserve a traceable causal chain and idempotency.
- `ERP-BR-005`: Money shall preserve currency and decimal precision; quantities shall preserve unit semantics.
- `ERP-BR-006`: Posted/approved records shall be corrected through controlled reversal or amendment, not silent mutation.

Success is measured by correct completed business journeys, tenant isolation, reconciliation and recovery—not
route count or screen availability.
