# Identity Platform API, Data and Integration Contracts

- `IAM-API-001`: Every API shall declare version, authentication, authorization, tenant scope, schemas and errors.
- `IAM-API-002`: Long-running work shall return a durable operation identifier and queryable outcome.
- `IAM-DATA-001`: Every persistent resource shall declare owner, tenant scope, lifecycle, retention and concurrency.
- `IAM-INT-001`: Events shall include ID, type/version, tenant where applicable, aggregate, time, correlation and causation.
- `IAM-INT-002`: Integrations shall define delivery, ordering, retry, deduplication, timeout and reconciliation.

Canonical failures include unauthenticated, forbidden, validation, conflict, rate limit, dependency unavailable and internal failure, all with safe correlation identifiers. Source-derived endpoint, schema and event inventories remain required before coverage is IMPLEMENTED.

Inbound SSO is governed by the [inbound federation contract](contracts/INBOUND_FEDERATION.md). `SsoConfig` is the canonical record consumed by PLT-IAM; duplicate tenant configuration models are not a federation trust source.
