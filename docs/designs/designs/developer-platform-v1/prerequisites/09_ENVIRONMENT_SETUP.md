# Environment and repository setup prerequisites

Do not run broad implementation until the current governance continuation gate permits the specific work packet. Use a disposable local/integration environment; this document does not authorize staging/production mutation or dependency upgrades.

## Source baseline

Read root AGENTS.md, enterprise brain, accepted ADRs and owning specifications. Review each affected repository's status/diff before editing. evidence/REPOSITORY_BASELINE.json records the inspected revisions and package scripts; it is a dated observation, not a substitute for a fresh check. Preserve uncommitted human work and isolate authorized work in an appropriate branch/worktree.

Observed developer-platform tooling is Node >=22 <23 and pnpm 9.15.4. Use repository-pinned tooling and frozen lockfiles; don't upgrade framework or packages as incidental setup. Private package access must come from the approved developer environment, never pasted into a document, command log or design prompt.

## Ordered setup checklist

1. Name the engineer, reviewer, tenant-isolation owner and environment owner. Record approved work packet and repository revisions.
2. Verify Node/pnpm and package registry access; install using the owning repository's documented frozen-lockfile process.
3. Provision disposable PostgreSQL, object storage, queue and managed secret references according to existing development configuration. Keep databases isolated from shared services.
4. Establish a NOBYPASSRLS database test role and two isolated tenant contexts plus a no-context case. A super-admin login cannot establish denial proof.
5. Apply only reviewed migrations to the verified disposable target, using the data repository workflow. Never use reset/force or shared rollback as setup shortcuts.
6. Seed the mandatory universal agent testing account through the existing seed path. Retrieve credentials from the approved environment instructions; do not copy passwords into this package. Negative authorization tests use scoped fixtures/claims through the approved test harness, not invented login credentials.
7. Configure hosted Identity callback allowlists and developer frontend origin. Observed developer dev command uses port 4008; do not assume other service ports or global API prefixes from controller declarations.
8. Resolve contract/SDK versions, sandbox host capabilities and nonsecret environment bindings. Verify no raw secrets reach browser storage or bundles.
9. Start only services required for the chosen pilot. Confirm health and safe test tenant before write tests.
10. Run baseline gates, record discovered tests and failures, then begin the authorized vertical slice.

## Observed commands to select from

Run in the named repository after checking its current package.json. This design-only task does not run production builds or migrations.

| Repository | Relevant observed scripts |
| --- | --- |
| developer-platform | pnpm typecheck; pnpm check:nav; pnpm check:tokens; pnpm test:e2e; pnpm lint; pnpm build |
| api | pnpm typecheck; pnpm lint; pnpm build; pnpm test; pnpm security:plane1; pnpm security:federation; pnpm architecture:check |
| data | pnpm db:generate; pnpm typecheck; pnpm test; reviewed migration workflow only after target verification |
| contracts | pnpm typecheck; pnpm build; pnpm test |
| sdk | pnpm typecheck; pnpm build; no declared test script observed, so add/approve a real consumer verification gate |
| extension-api | pnpm build; test files exist but no declared test script observed—resolve runner and discovery before claiming proof |
| sandbox | pnpm typecheck; pnpm lint; pnpm build; pnpm test; pnpm test:hardening; pnpm test:governor; pnpm test:escape |
| design-system | pnpm typecheck; pnpm lint; pnpm build; pnpm test; pnpm check:tokens; pnpm check:contrast; pnpm check:density; pnpm check:inventory; pnpm check:platform-accents; pnpm check:mobile-tokens |
| tenant-sites | pnpm test plus affected lint/build/typecheck from current package; observed passWithNoTests means zero tests cannot count as proof |
| web-studio | pnpm typecheck; pnpm lint; pnpm build; pnpm test:e2e |

Observed developer lint invokes next lint. Verify compatibility with the installed framework; if unsupported, record the baseline failure and fix the declared lint pipeline in an authorized prerequisite change. Do not relabel a skipped command as passed. Focused test file arguments depend on the actual script wrapper; inspect before appending flags.

The enterprise market runner is intentionally not a setup command: inspected code stages, commits and pushes across repositories. Publication is outside this request. Use scoped gates and recorded evidence instead.
