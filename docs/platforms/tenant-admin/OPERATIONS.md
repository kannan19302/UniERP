# Tenant Admin Operations and QA

Declared local commands include build, typecheck, lint, Vitest, E2E and token checks. Release acceptance must
also include tenant-isolation integration tests, permission matrix tests, SSO rollback, secret scanning,
accessibility, browser compatibility and migration rollback.

Telemetry shall identify platform, tenant pseudonym, correlation and operation without recording secrets or
unnecessary personal data. Runbooks are required for tenant lockout, broken SSO, credential compromise,
permission misconfiguration, failed bulk operation, webhook storm and privacy-request failure.
