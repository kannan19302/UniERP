# Developer Platform Security, IAM and Compliance

Security scope: untrusted code, publisher identity, signed artifacts, scoped credentials, egress restrictions and tenant-safe execution.

- `DEV-SEC-001`: Every operation shall authenticate a principal and enforce platform, tenant, permission and record scope as applicable.
- `DEV-SEC-002`: Authorization shall execute at the authoritative service; UI visibility is not enforcement.
- `DEV-SEC-003`: Secrets and sensitive data shall be minimized, encrypted, redacted from telemetry and access-audited.
- `DEV-SEC-004`: Negative tests shall prove isolation, escalation resistance, replay handling and safe failure.
- `DEV-SEC-005`: Compliance claims shall name scope, control, evidence, owner and review date; no blanket certification is inferred.

Threat modeling and privacy/data-flow review are release requirements for material boundary or data changes.

