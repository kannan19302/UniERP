# Marketplace API, Data and Integration Contracts

- `MKT-API-001`: Every API shall declare version, authentication, authorization, tenant scope, schemas and errors.
- `MKT-API-002`: Long-running work shall return a durable operation identifier and queryable outcome.
- `MKT-DATA-001`: Every persistent resource shall declare owner, tenant scope, lifecycle, retention and concurrency.
- `MKT-INT-001`: Events shall include ID, type/version, tenant where applicable, aggregate, time, correlation and causation.
- `MKT-INT-002`: Integrations shall define delivery, ordering, retry, deduplication, timeout and reconciliation.

Canonical failures include unauthenticated, forbidden, validation, conflict, rate limit, dependency unavailable and internal failure, all with safe correlation identifiers. Source-derived endpoint, schema and event inventories remain required before coverage is IMPLEMENTED.

