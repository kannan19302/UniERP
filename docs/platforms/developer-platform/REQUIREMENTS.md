# Developer Platform Requirements (FRS/SRS/NFR)

## Functional requirements

- `DEV-FR-001`: The platform shall discover versioned APIs and schemas.
- `DEV-FR-002`: The platform shall create and rotate scoped application credentials.
- `DEV-FR-003`: The platform shall build and validate signed extension bundles.
- `DEV-FR-004`: The platform shall execute untrusted extension code within declared capabilities and budgets.
- `DEV-FR-005`: The platform shall observe calls, failures, quotas and deprecations.

## System and non-functional requirements

- `DEV-NFR-001`: APIs and asynchronous work shall define availability, latency, error and recovery objectives.
- `DEV-NFR-002`: Mutating operations shall be idempotent, concurrency-safe and auditable.
- `DEV-NFR-003`: Failures shall be explicit, correlated and recoverable without reporting false success.
- `DEV-NFR-004`: Critical workflows shall meet WCAG 2.2 AA where a user interface exists.
- `DEV-NFR-005`: Data retention, residency, backup and deletion behavior shall be documented and tested.

Primary implementation: `developer-platform`, `sdk`, `extension-api`, `sandbox`.

Inspected evidence: 164 portal implementation files/2 tests; SDK 5/1; extension API 8/1; sandbox 8/5. Extension API exposes signed-bundle, scope, budget and egress schemas; sandbox uses isolated execution and host-side capability checks.

Current risk: The portal is much broader than the small public SDK/API surface; compatibility, publishing and revocation lifecycles are not yet proven end to end.

