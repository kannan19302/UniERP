# Strata v1 calibration change contract

Status: R2 coordinated shared UI change. Owner: PLT-DS. Contract owner: `@kannan19302/ui`. Source baseline: design-system `c3cd4cb`, platform `0984a83` (2026-09-26). This contract authorizes only local, additive calibration; package publication and consumer deployment remain separate actions.

## Outcome and boundary

Calibrate the public Input primitive, DataTable composite, and Breadcrumb navigation primitive, then derive a repeatable protocol. Preserve existing public exports and props, semantic tokens, four densities, three canonical themes, Inter/Lucide, and the shell's sole global StrataBar context. No domain data, identity, tenant authority, API, schema or migration changes.

## Acceptance criteria

1. **AC-01** Inventory each candidate's purpose, variants, states, dependencies, consumers, accessibility, tokens and redundancy before implementation. Record a safe migration for duplicate Input implementations.
2. **AC-02** Research multiple equivalent references per required component, name the winning characteristics and rejected patterns with source URLs and date.
3. **AC-03** Elevate three existing implementations in place with additive APIs and co-located stories/tests; no parallel component or third-party code copy.
4. **AC-04** Validate representative interactive states in a real browser against selected references across theme, density, width, keyboard and accessibility dimensions. Capture browser-visible evidence.
5. **AC-05** Run design-system lint, inventory, typecheck, tests, build and Storybook gates; validate affected consumers where feasible. Treat skipped or environment-blocked checks as incomplete.
6. **AC-06** Publish a frozen execution protocol, benchmark rubric, merge/removal rules, pass/fail gate and evidence ledger grounded in observed calibration results. Update traceability and review the final diff.

## Dependency and impact map

L1 `design-system` supplies Input, DataTable and Breadcrumb to L4 Storybook and applications. `provider-admin`, `tenant-admin`, `business-suite`, and `developer-platform` are observed DataTable/Input consumers. Breadcrumb is exported as an independent local trail; application shells own the global context boundary. Upstream public API is preserved; consumer source migration is outside this bounded phase. Storybook uses local sources and is a dependent L4 surface.

## Invariants, failure and recovery

- Native input/table/nav semantics, keyboard access, focus, visible error and status must survive each theme and density.
- Presentational controls never fetch or authorize business data. Table consumers retain sorting, selection and edit authority.
- No new dependency, contract break, destructive removal or mutation of production/staging.
- If browser or gate evidence fails, record `FAIL` or `NOT VERIFIED`, repair in scope, and do not promote to PASS. Rollback is the isolated component patch and docs; no data migration or flag is needed.

## Knowledge delta and approval

`UPDATED`: shared UI pattern, interaction and accessibility conventions are durable Design Platform knowledge. This contract and the final elevation protocol/evidence belong to PLT-DS. Existing unrelated working-tree modifications remain user-owned. R2 local additive work is within the user's instruction; publication, deployment, removal or breaking API changes require separate exact authorization.
