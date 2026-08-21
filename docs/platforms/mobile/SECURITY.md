# Mobile Client Security, IAM and Compliance

Security scope: secure token storage, device compromise, biometric step-up, screenshot/clipboard policy, deep-link validation and remote revocation.

- `MOB-SEC-001`: Every operation shall authenticate a principal and enforce platform, tenant, permission and record scope as applicable.
- `MOB-SEC-002`: Authorization shall execute at the authoritative service; UI visibility is not enforcement.
- `MOB-SEC-003`: Secrets and sensitive data shall be minimized, encrypted, redacted from telemetry and access-audited.
- `MOB-SEC-004`: Negative tests shall prove isolation, escalation resistance, replay handling and safe failure.
- `MOB-SEC-005`: Compliance claims shall name scope, control, evidence, owner and review date; no blanket certification is inferred.

Threat modeling and privacy/data-flow review are release requirements for material boundary or data changes.

