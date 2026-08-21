# Desktop Client Architecture and TRD

## Boundary

This platform owns desktop shell, secure authentication handoff, updates, deep links and explicitly supported device capabilities. It consumes other platforms only through published contracts; repository proximity or direct imports do not transfer ownership.

## Required design views

- actor, tenant and provider trust zones;
- owned resources and lifecycle state machines;
- synchronous APIs, events and integration dependencies;
- persistent data ownership and retention;
- failure, retry, idempotency and reconciliation paths;
- deployment topology, scaling and recovery;
- implementation-to-test evidence.

## Architecture rules

Business invariants execute in authoritative services, authorization is server-side, tenant context is verified rather than client-trusted, and asynchronous effects carry correlation/causation. Shared behavior is consumed from its owning platform rather than copied.

Primary implementation: `desktop-app`.

Inspected evidence: Desktop repository has only 5 implementation files/1 test and mostly server/public shell files. It is not evidence of a production ERP desktop application.

Current risk: Current maturity is DECLARED/minimal; technology, trust boundary, feature parity and update mechanism are not proven.

