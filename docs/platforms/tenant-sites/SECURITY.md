# Tenant Sites and Studio Security, IAM and Compliance

Security scope: tenant/domain isolation, content sanitization, upload safety, preview authorization, CSP, cookies/consent and supply-chain integrity.

- `SITE-SEC-001`: Every operation shall authenticate a principal and enforce platform, tenant, permission and record scope as applicable.
- `SITE-SEC-002`: Authorization shall execute at the authoritative service; UI visibility is not enforcement.
- `SITE-SEC-003`: Secrets and sensitive data shall be minimized, encrypted, redacted from telemetry and access-audited.
- `SITE-SEC-004`: Negative tests shall prove isolation, escalation resistance, replay handling and safe failure.
- `SITE-SEC-005`: Compliance claims shall name scope, control, evidence, owner and review date; no blanket certification is inferred.

Threat modeling and privacy/data-flow review are release requirements for material boundary or data changes.

