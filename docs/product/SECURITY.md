# UniERP Product Security, IAM and Compliance

- `UNI-SEC-001`: Provider, tenant-admin and tenant-business roles shall be separate and least-privileged.
- `UNI-SEC-002`: Tenant access shall require verified membership/entitlement and persistence-level isolation.
- `UNI-SEC-003`: Service, agent and extension principals shall have bounded audience, scope, lifetime and delegation.
- `UNI-SEC-004`: Privileged/support access shall be time-, purpose- and target-bound with attributable audit.
- `UNI-SEC-005`: Secrets, signing keys and sensitive fields shall be externally protected, rotated and redacted.
- `UNI-SEC-006`: Security-sensitive changes shall require negative/adversarial tests and threat-model updates.
- `UNI-SEC-007`: Privacy/retention/erasure shall cover databases, files, caches, events, exports and backup expiry.
- `UNI-SEC-008`: Compliance statements shall name applicability, control owner, evidence and review date.

Baseline controls are defined once in `standards/SECURITY_BASELINE.md`; platform security documents add local
threats and responsibilities. No legacy checklist or route name establishes compliance.
