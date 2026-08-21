# ADR-0004: Business services remain modular with transactional outbox effects

- Status: Accepted
- Date: 2026-08-21

## Context

The API contains 45 business modules whose workflows cross finance, inventory, sales, procurement,
manufacturing and other contexts. Premature service distribution would turn core business invariants into
distributed transactions.

## Decision

Business capabilities remain modules behind explicit contracts. State changes and their integration/domain
events commit atomically through an outbox. Consumers are idempotent and record delivery/reconciliation state.
Extraction requires evidence of an independent ownership, scaling and release profile plus a replacement for
cross-module transaction guarantees.

## Consequences

Cross-module effects do not use client orchestration or direct service imports. Contracts include causation,
correlation, tenant and version. Atomicity, retry, duplication and reconciliation require behavioral tests.
