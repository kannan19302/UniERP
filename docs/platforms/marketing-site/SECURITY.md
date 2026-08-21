# Marketing Site Security, IAM and Compliance

Security scope: public input abuse, CMS/editor access, consent, PII minimization, bot/rate controls, dependency and content integrity.

- `MAR-SEC-001`: Every operation shall authenticate a principal and enforce platform, tenant, permission and record scope as applicable.
- `MAR-SEC-002`: Authorization shall execute at the authoritative service; UI visibility is not enforcement.
- `MAR-SEC-003`: Secrets and sensitive data shall be minimized, encrypted, redacted from telemetry and access-audited.
- `MAR-SEC-004`: Negative tests shall prove isolation, escalation resistance, replay handling and safe failure.
- `MAR-SEC-005`: Compliance claims shall name scope, control, evidence, owner and review date; no blanket certification is inferred.

Threat modeling and privacy/data-flow review are release requirements for material boundary or data changes.

