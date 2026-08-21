# Developer Platform

Platform for extension developers, integration engineers and tenant technical administrators. It owns developer portal, API discovery, credentials, SDKs, extension packaging, capability declaration, sandbox execution and diagnostics.

Primary implementation: `developer-platform`, `sdk`, `extension-api`, `sandbox`.

Inspected evidence: 164 portal implementation files/2 tests; SDK 5/1; extension API 8/1; sandbox 8/5. Extension API exposes signed-bundle, scope, budget and egress schemas; sandbox uses isolated execution and host-side capability checks.

Current risk: The portal is much broader than the small public SDK/API surface; compatibility, publishing and revocation lifecycles are not yet proven end to end.

## Authoritative suite

- [PRD](PRD.md)
- [Requirements](REQUIREMENTS.md)
- [Architecture/TRD](ARCHITECTURE.md)
- [API, data and integration contracts](CONTRACTS.md)
- [Security/IAM/compliance](SECURITY.md)
- [UX/design requirements](EXPERIENCE.md)
- [Infrastructure, SRE, QA and operations](OPERATIONS.md)
- [Traceability](TRACEABILITY.md)
- [Legacy API versioning evidence](evidence/legacy-api-versioning-policy.md)
- [Sandbox threat model evidence](evidence/sandbox-threat-model.md)
- [Current Developer API route inventory](evidence/developer-api-route-inventory.md)
- [AST method-level Developer API controller coverage](evidence/ast-controller-coverage.md)
