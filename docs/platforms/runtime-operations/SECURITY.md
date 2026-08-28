# Runtime and Operations Platform Security, IAM and Compliance

Security scope: supply chain, CI/CD authority, secrets custody, runtime identity, network isolation, tenant resource abuse and audit.

- `OPS-SEC-001`: Every operation shall authenticate a principal and enforce platform, tenant, permission and record scope as applicable.
- `OPS-SEC-002`: Authorization shall execute at the authoritative service; UI visibility is not enforcement.
- `OPS-SEC-003`: Secrets and sensitive data shall be minimized, encrypted, redacted from telemetry and access-audited.
- `OPS-SEC-004`: Negative tests shall prove isolation, escalation resistance, replay handling and safe failure.
- `OPS-SEC-005`: Compliance claims shall name scope, control, evidence, owner and review date; no blanket certification is inferred.

Threat modeling and privacy/data-flow review are release requirements for material boundary or data changes.
# Durable audit and event integrity

Mandatory security and business audit is append-only, attributable and tamper-evident. A required audit write may
not be downgraded to best effort: it must commit atomically with the business state transition or enter an equally
durable transactionally-written queue with accountable recovery. Events emitted from business changes follow the
same transaction boundary through the outbox; delivery consumers must be version-aware, idempotent, retryable,
dead-lettered, replayable and reconcilable. FND-P0-006 tracks convergence and proof.

