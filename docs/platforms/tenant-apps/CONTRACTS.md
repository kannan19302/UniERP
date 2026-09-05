# Tenant Apps ERP Contracts

- `ERP-API-001`: Public and client APIs shall use versioned schemas from `unierp-contracts`.
- `ERP-API-002`: Commands shall declare permission, tenant scope, idempotency, lifecycle preconditions and errors.
- `ERP-DATA-001`: Tenant-owned persistent entities shall carry tenant ownership and database isolation policy.
- `ERP-DATA-002`: Monetary values shall use decimal amount plus ISO currency; never binary float.
- `ERP-DATA-003`: Mutable aggregates shall expose version/concurrency semantics.
- `ERP-INT-001`: Domain events shall include event ID, type/version, tenant, aggregate, causation, correlation and time.
- `ERP-INT-002`: External integrations shall define delivery, retry, ordering, deduplication and reconciliation.

Actual endpoint, schema and event inventories are `UNVERIFIED` and must be generated from source before contract
coverage can be claimed.

## Platform Program Contracts
- [UniERP Analytics Enterprise Program R2 Change Contract](ANALYTICS_CHANGE_CONTRACT.md)

