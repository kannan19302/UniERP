# Developer Platform Architecture and TRD

## Boundary

This platform owns developer portal, API discovery, credentials, SDKs, extension packaging, capability declaration, sandbox execution and diagnostics. It consumes other platforms only through published contracts; repository proximity or direct imports do not transfer ownership.

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

Primary implementation: `developer-platform`, `sdk`, `extension-api`, `sandbox`.

Inspected evidence: 164 portal implementation files/2 tests; SDK 5/1; extension API 8/1; sandbox 8/5. Extension API exposes signed-bundle, scope, budget and egress schemas; sandbox uses isolated execution and host-side capability checks.

Current risk: The portal is much broader than the small public SDK/API surface; compatibility, publishing and revocation lifecycles are not yet proven end to end.

