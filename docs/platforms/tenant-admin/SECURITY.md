# Tenant Admin Security and Compliance

- `TAD-SEC-001`: Server authorization shall require tenant membership plus explicit permission.
- `TAD-SEC-002`: Tenant policy may strengthen but shall not weaken provider security minimums.
- `TAD-SEC-003`: Sensitive changes shall require recent/step-up authentication.
- `TAD-SEC-004`: API keys, secrets and recovery material shall be shown only at creation and stored encrypted.
- `TAD-SEC-005`: Access and configuration changes shall emit immutable tenant audit records.
- `TAD-SEC-006`: Export/erasure shall honor retention, legal hold, data residency and authorization.

Mandatory negative tests cover tenant swapping, IDOR, role escalation, last-owner removal, SSO lockout, stale
policy overwrite, credential replay and cross-tenant audit search.
