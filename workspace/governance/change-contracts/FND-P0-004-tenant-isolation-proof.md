# Change Contract — FND-P0-004 Whole-Schema Tenant Isolation

## Cycle status

- Status: `PARTIAL`
- Cycle objective: remove a simulated multi-tenant isolation “proof” and require the authoritative database-backed RLS verifier for the real data estate.
- Completed this cycle: authoritative database RLS verification executed against live PostgreSQL using the non-bypass application role `unerp_api` (`NOSUPERUSER NOBYPASSRLS`). Verified 1,863 schema tables, 10 runtime DDL tables, and 369 F5 tables with zero exemptions and 0 failures. Created and applied migrations for `tenant_onboarding_progress`, `master_data_import_jobs`, `access_review_*`, and `builder_modules_json_archive_p8_v2`.
- Incomplete this cycle: end-to-end multi-tenant behavioral suite execution across all vertical domain repositories; reviewed provider/tenant cross-domain authority proof.

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | `YES` | FND-P0-004 and root tenant/RLS rules. |
| Implemented | `YES` | `data/src/index.ts` scopes Prisma operations and sets transaction-local tenant context; migrations create `unerp_api NOBYPASSRLS`; database verifier derives expected tables; all 1,863 tables carry RLS + FORCE + `tenant_isolation_*` policy. |
| Tested | `PARTIAL` | `check-rls-verify.mjs` and `check-multi-tenant-isolation-proof.mjs` pass 100% against live PostgreSQL with `unerp_api` role; behavioral integration suite pending containerized run. |
| Integrated | `PARTIAL` | API/IDP use database clients with tenant context session scoping; exact runtime role verified against live PostgreSQL. |
| Deployed | `NOT VERIFIED` | Local/containerized environment verified; production environment unreleased. |
| Released | `NOT APPLICABLE` | No release requested. |

## Design and proof boundary

The workspace isolation command is an orchestration entrypoint, not a simulation. It delegates to the data-owned verifier, which derives the required tenant table set from current schema sources and queries `pg_class`, `pg_policies`, `information_schema` and `pg_roles`. No `DATABASE_APP_URL`, missing verifier, unexpected verifier termination, privileged verifier connection, missing `unerp_api` role, `BYPASSRLS`, absent policy, absent FORCE RLS or zero context must fail the command.

This change does not claim that structural RLS evidence proves all application authorization paths. It removes a false proof so missing production-shaped evidence blocks the continuation gate rather than passing.

> **This is not done.** The complete FND-P0-004 exit requires real application-role positive, tenant-A/tenant-B/no-context tests for every tenant-owned persistence path and reviewed provider/tenant boundary evidence.
