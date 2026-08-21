# Platform Admin OS Contracts

## Contract requirements

- `PAO-API-001`: Every provider endpoint shall declare authentication, provider permission, target scope,
  request/response schema, errors, idempotency and audit event.
- `PAO-API-002`: Long-running commands shall return `202` with an operation resource.
- `PAO-DATA-001`: Tenant lifecycle state shall use an explicit state machine and version/concurrency field.
- `PAO-INT-001`: Infrastructure integrations shall use server-side credentials with rotation and health state.

## Canonical error classes

Authentication required, forbidden, validation failure, conflict/stale version, rate limited, dependency
unavailable, operation failed and internal error. Error bodies must carry a correlation identifier and must not
leak secrets or cross-tenant existence.

## Events

Required families include tenant lifecycle requested/completed/failed, privileged policy changed, release
started/completed/failed, incident state changed, subscription changed and marketplace publication decision.
Schemas and actual emitters are currently `UNVERIFIED`.
