# Mobile Client Architecture and TRD

## Boundary

This platform owns mobile-appropriate ERP workflows, authentication, notifications, offline/cache behavior, device integration and secure local state. It consumes other platforms only through published contracts; repository proximity or direct imports do not transfer ownership.

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

Primary implementation: `unierp-mobile`.

Inspected evidence: Flutter client has 818 implementation files/29 tests and a large GoRouter configuration. Breadth is substantial but parity, offline and platform security evidence remain unmapped.

Current risk: Large route count can mask placeholder/parity gaps; offline conflicts, secure storage and device lifecycle require explicit proof.

