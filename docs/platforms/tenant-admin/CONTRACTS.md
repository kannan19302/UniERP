# Tenant Admin Contracts

- `TAD-API-001`: Every request shall derive tenant and principal from the verified session and declare a tenant permission.
- `TAD-API-002`: Configuration resources shall expose version/ETag semantics and validation errors.
- `TAD-DATA-001`: Tenant-owned records shall carry tenant ownership and be protected by database isolation policy.
- `TAD-INT-001`: Webhook/API credentials shall be write-only after creation, rotatable and scoped.
- `TAD-INT-002`: SSO metadata changes shall support validation before activation and safe rollback.

Required event families: user lifecycle, role/policy change, authentication policy change, credential rotation,
integration change, retention/erasure request and branding/domain change. Actual schemas remain `UNVERIFIED`.
