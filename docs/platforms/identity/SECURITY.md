# Identity Platform Security, IAM and Compliance

Security scope: credential handling, token audience/scope, signing keys, replay, session theft, federation trust, delegation and account recovery.

- `IAM-SEC-001`: Every operation shall authenticate a principal and enforce platform, tenant, permission and record scope as applicable.
- `IAM-SEC-002`: Authorization shall execute at the authoritative service; UI visibility is not enforcement.
- `IAM-SEC-003`: Secrets and sensitive data shall be minimized, encrypted, redacted from telemetry and access-audited.
- `IAM-SEC-004`: Negative tests shall prove isolation, escalation resistance, replay handling and safe failure.
- `IAM-SEC-005`: Compliance claims shall name scope, control, evidence, owner and review date; no blanket certification is inferred.
- `IAM-SEC-006`: Federation endpoints and metadata shall be constrained against SSRF, and OIDC tokens shall be verified with discovered keys, exact issuer/audience, expiry, issued-at age and one-time nonce before a local session is created.
- `IAM-SEC-007`: Every server entrypoint shall declare either an intentional public reason or an explicit permission/authority requirement; a permission declaration without its matching enforcing guard is a denial, not a protected route. Tenant-staff RBAC and customer-portal record authority are distinct boundary types.
- `IAM-SEC-008`: Federation credentials shall use authenticated encryption with an identified rotating key, remain redacted from every administrative response, and fail closed when plaintext, tampered or encrypted under an unavailable key.
- `IAM-SEC-009`: Saving federation configuration invalidates prior verification and activation. Activation requires current connection-test evidence; production enablement additionally requires an end-to-end provider exercise and approved egress controls.

Threat modeling and privacy/data-flow review are release requirements for material boundary or data changes.
