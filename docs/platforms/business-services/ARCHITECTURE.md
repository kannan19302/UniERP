# Data and Business Services Architecture and TRD

## Boundary

This platform owns canonical domain logic, persistence schemas, public/internal API contracts, events, audit and business transaction integrity. It consumes other platforms only through published contracts; repository proximity or direct imports do not transfer ownership.

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

Primary implementation: `api`, `data`, `unierp-contracts`.

Inspected evidence: API has 2,192 implementation files/577 test files across 45 modules; data has 313/9 with extensive Prisma schemas; contracts has 90/43 including versioning, audit and backup/restore types.

Current risk: Very high breadth, many schema files and relatively weak data-layer test count create ownership, RLS, migration and contract-drift risk.

