# Runtime and Operations Platform Architecture and TRD

## Boundary

This platform owns environments, deployment, configuration, tenancy runtime context, policy/governor primitives, observability, SRE, backup/recovery and service conventions. It consumes other platforms only through published contracts; repository proximity or direct imports do not transfer ownership.

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

Primary implementation: `infra`, `config`, `kernel`, `shared`, `service-kit`.

Inspected evidence: Infra has 38 implementation files/13 tests with load tests, platform wizard and control-plane assets; kernel 10/5 exposes tenant governor/policy; shared 56/13; service-kit 5/2; config has almost no source implementation.

Current risk: Operational mechanisms are dispersed; config package appears nearly empty; deployment topology and tested recovery evidence are not centrally authoritative.

