# Change Contract — FND-P0-007 Executable Delivery Safety

## Cycle status

- Status: `PARTIAL`
- Objective: remove the active, misleading deployment path before a verified polyrepo release system exists.
- Risk class: `R3` — release workflow can reach staging/production credentials, data migrations and public artifacts.
- Scope: `unierp-workspace/.github/workflows/cd.yml` and a deterministic safety checker.
- Restricted action respected: no deployment, release, environment mutation, credential access, database action or registry publication is performed.

## Evidence and conflict

The former workflow was automatically triggered by CI and declared staging/production deployment, migration, backup, rollback and tagging behavior. It assumed an `apps/api`/`apps/web` monorepo and several deployment scripts that are absent from the current `unierp-workspace` repository. It therefore could not prove its claims and should not retain a path to real environment credentials.

## Change

The workflow now has only a manual trigger, zero permissions and one job that fails before any external action. `check-disabled-cd.mjs` asserts that it cannot regain automatic triggers, write permissions, secrets, build/publish, migrations, rollout, backup or Git push capabilities. Synthetic safe/unsafe fixtures prove the gate.

## Release enablement prerequisites

Re-enabling delivery requires an owner-approved R3 replacement contract and proof for: the current active-estate release manifest; exact-commit immutable build artifacts with SBOM, provenance, signature and vulnerability policy; consumer/contract and migration compatibility; staging environment topology; human production approval; health/SLO and reconciliation gates; explicit rollback/roll-forward; and a no-production-action dry run. No workflow may be enabled merely because its YAML parses.

> **This is not done.** CD is intentionally disabled, not implemented. A verified release train remains a P0/P2 prerequisite.
