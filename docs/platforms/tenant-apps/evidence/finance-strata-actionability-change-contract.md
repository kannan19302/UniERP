# Finance Strata actionability repair — change contract

Date: 2026-09-08  
Status: implementation evidence in progress

## Request and outcome

- Human request: repair Finance screens and buttons that became unresponsive or stubbed after the Strata adoption.
- Outcome: use the canonical dashboard shell once, retain ultra-compact Finance density, and route primary actions to resource-backed workflows instead of placeholder alerts.
- In scope: Finance layout composition, primary actions on the ten redesigned Finance hubs, and missing invoice/vendor-bill resource workspaces.
- Out of scope: new API contracts, schema changes, production deployment, and the older advanced-Finance alert/toast modernization backlog.
- Acceptance: canonical shell is not duplicated; invoice and vendor-bill creation is actionable; hub actions navigate or export; type, token, lint, build, and focused journey evidence are recorded.

## Authority and ownership

- Risk: R2 public UI behavior.
- Platforms: PLT-ERP (accountable experience) and PLT-DS (consumed Strata behavior).
- Owners: Tenant Apps ERP owns Finance journeys; Business Services owns existing Finance resource contracts.
- Requirements: ERP-BR-003 and the tenant-app single-source shell, zero-mock, Strata DL 2.0 rules.
- Repositories: `tenant-apps`; this evidence record in `unierp-platform`.
- Consumers: tenant Finance users.
- Conflict: the Finance route layout mounted a second sidebar/tab/context shell, contrary to the repository's canonical shell rule. The higher-level root shell is retained.

## Design and safety

- Existing `invoiceResource` and `vendorBillResource` definitions are reused; no new endpoint or permission is introduced.
- Invoice and vendor-bill creation remain protected by their existing read/create permissions through `RouteGuard`, `ListView`, and `FormView`.
- Finance uses `data-density="ultra-compact"`; keyboard and responsive behavior remain owned by the canonical shell and Strata components.
- CSV exports operate only on records already loaded into the current view.
- No schema, migration, tenant-boundary, privacy, dependency, or event change.
- Rollback: revert the route/action wiring and the two resource workspace files; no data recovery is required.

## Verification plan

| Claim | Command |
| --- | --- |
| Typed UI compiles | `pnpm typecheck` in `tenant-apps` |
| Strata tokens pass | `pnpm check:tokens` in `tenant-apps` |
| Static quality passes | `pnpm lint` in `tenant-apps` |
| Production bundle compiles | `pnpm build` in `tenant-apps` |
| Primary Finance journeys respond | focused Playwright Finance journey |

Knowledge delta: `UPDATED` — this is dated implementation evidence only; no product requirement or public contract changed.
