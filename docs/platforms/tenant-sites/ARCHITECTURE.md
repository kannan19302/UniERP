# Tenant Sites and Studio Architecture and TRD

## Boundary

This platform owns site composition, templates, preview, domains, publishing, public runtime, content/commerce blocks and analytics consent. It consumes other platforms only through published contracts; repository proximity or direct imports do not transfer ownership.

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

Primary implementation: `tenant-sites`, `tenant-site-template`, `web-studio`.

Inspected evidence: Tenant sites has 18 implementation files/1 test; template 1/0; studio 8/1. Observed blocks include collections/cart and tenant header/home; overall maturity is low.

Current risk: Builder, template and runtime contracts are largely undocumented and thinly implemented; safe publication and tenant/domain isolation are not proven.

