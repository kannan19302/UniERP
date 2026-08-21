# UniERP Cross-platform Contracts

- `UNI-API-001`: HTTP and package contracts shall follow the API compatibility standard.
- `UNI-API-002`: Every endpoint shall declare identity, authorization, tenant scope, schemas and canonical errors.
- `UNI-DATA-001`: Every persistent type shall declare platform owner, tenant scope and data lifecycle.
- `UNI-DATA-002`: Monetary contracts shall use decimal amount plus currency; quantity contracts include units.
- `UNI-INT-001`: Events shall be versioned and carry identity, tenant where applicable, aggregate, correlation and causation.
- `UNI-INT-002`: Async consumers shall be idempotent and expose retry/dead-letter/reconciliation state.
- `UNI-INT-003`: Client/BFF calls shall never transfer provider credentials or trust client tenant identifiers.
- `UNI-INT-004`: Extension capabilities, budgets, egress and bundle signatures shall be explicit public contracts.

Contract ownership: Identity owns authentication/token/session protocols; Business Services owns business/data
schemas and events; Developer Platform owns public extension/SDK contracts; Runtime Operations owns health,
telemetry and deployment contracts; Design Platform owns UI packages and tokens.
