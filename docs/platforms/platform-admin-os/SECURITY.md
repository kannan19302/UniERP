# Platform Admin OS Security, IAM and Compliance

- `PAO-SEC-001`: Only provider principals with explicit entitlements shall establish console sessions.
- `PAO-SEC-002`: Privileged actions shall require least privilege; selected high-risk operations require step-up authentication and dual control.
- `PAO-SEC-003`: Authorization shall execute server-side for every request; hidden navigation is not a control.
- `PAO-SEC-004`: Support access to tenant data shall be time-bound, purpose-bound, approved and audited.
- `PAO-SEC-005`: Credentials shall be stored in an approved secret manager, never browser storage or source.
- `PAO-SEC-006`: Audit records shall capture actor, effective actor/delegation, target, reason, request, decision and outcome.
- `PAO-SEC-007`: Data export, erasure and retention operations shall preserve legal holds and evidence.

Threats requiring explicit tests: tenant principal escalation, confused deputy, IDOR across tenants, replayed
provisioning command, session theft, forged health data, secret exposure, audit suppression and destructive
operation without confirmation.
