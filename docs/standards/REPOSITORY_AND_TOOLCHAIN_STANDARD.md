# Repository, package and toolchain standard

Standard ID: `STD-REP-001`  
Status: `ACCEPTED`  
Owner: Runtime Operations (`PLT-OPS`) with Architecture Governance  
Applies to: every repository in `UniERP.code-workspace`

## Purpose

UniERP is a polyrepo. Repository folders are delivery units; product ownership remains defined by
`PLATFORM_CATALOG.md` and `AI_REPOSITORY_PLATFORM_MAP.json`. This standard establishes one active-estate,
package-identity, dependency and JavaScript toolchain contract so local agents, CI and releases resolve the same
sources and build inputs.

The machine-readable policy is
[`REPOSITORY_TOOLCHAIN_POLICY.json`](REPOSITORY_TOOLCHAIN_POLICY.json). The workspace gate is
`node scripts/check-repository-toolchain-policy.mjs` from `unierp-workspace`.

## Canonical estate and disposition

1. `UniERP.code-workspace` is the only active repository inventory.
2. `unierp-workspace/governance/active-estate.json` is a generated catalog of that inventory plus active manifest
   package identities; it must match exactly.
3. `unierp-workspace/governance/non-active-estate.json` classifies known workspace areas that are explicitly
   excluded. It never adds an active repository and cannot override `UniERP.code-workspace`.
4. A directory not listed by the workspace is non-active. It must not be imported, built, tested, deployed,
   scanned as current evidence or treated as a compatibility alias.
5. Archives and scratch/experiments need an explicit disposition outside the active inventory. Re-activation
   requires owner approval and an atomic update of workspace inventory, platform map, agent entrypoint, workflows,
   contracts and evidence.
6. Retired names such as `unierp-api`, `unierp-data`, `unierp-web`, `apps/*` and `packages/*` must not appear in
   active executable paths. A missing active path fails; tooling never falls back to a retired path.

## Package identity and dependencies

1. `@kannan19302/*` is the canonical scope for UniERP-owned JavaScript packages. `@unerp/*` is retired and must
   not appear in active manifests, imports, scripts, Dockerfiles, workflow commands or current documentation.
2. Unscoped application identities already cataloged in `active-estate.json` may remain unscoped. A rename is a
   public/release compatibility change and requires its own contract and consumer migration.
3. Cross-repository dependencies use published package identities and public exports. Local development may use
   `file:`/`link:` overrides, but source imports across repository roots are forbidden.
4. Dependency direction follows the numeric workspace layer. A repository may depend on the same or a lower
   layer only when the platform map and public contract permit it; cycles are forbidden.
5. Every dependency change records license, provenance, compatibility and affected-consumer evidence. Published
   package versions are exact release inputs; local links are never production release evidence.

## JavaScript runtime and package manager

1. Node.js `>=22 <23` is the supported build/runtime line until this standard is superseded.
2. pnpm `9.15.4` is the sole install, resolution, script and workspace package manager. Every JavaScript manifest
   declares `"packageManager": "pnpm@9.15.4"` and `"engines": { "node": ">=22 <23" }`.
3. npm may be used only as the registry publish client when required for npm trusted publishing. It does not
   install or resolve project dependencies.
4. `pnpm-lock.yaml` is the sole JavaScript dependency lock. A manifest with dependencies must commit one lock;
   `package-lock.json` and `yarn.lock` are forbidden in the active estate.
5. CI uses Corepack or an exact pnpm version and `pnpm install --frozen-lockfile`. Local development may not
   silently rewrite a lock with `--no-frozen-lockfile` in a release/verification path.
6. Node/pnpm upgrades are coordinated changes: update this standard and policy, every manifest, CI images/actions,
   developer setup, lockfiles and representative build evidence together.

## Repository contract

Every active repository has:

- root `AGENTS.md` linked to the canonical protocol;
- platform assignment in `AI_REPOSITORY_PLATFORM_MAP.json`;
- manifest identity matching `active-estate.json` when a JavaScript package exists;
- supported lint/typecheck/test/build commands appropriate to its technology and risk, or an explicit
  not-applicable rationale in the platform map;
- one authoritative lock per dependency ecosystem;
- immutable external workflow/action inputs and exact runtime setup;
- ownership, compatibility, security and release evidence required by its platform.

## Failure and compatibility behavior

- Missing inventory, manifest, package identity, toolchain declaration, required lock, directory or nonzero
  discovery fails the gate with an exact path.
- Legacy namespaces, forbidden lockfiles, unsafe path escape, duplicate repository/package identity and dependency
  direction violations fail closed.
- Existing debt may be ratcheted only through an owner-approved, dated exception with a removal criterion. This
  standard establishes no blanket exceptions.
- This standard changes build governance, not public runtime behavior. Rollback is by reverting the policy and
  corresponding manifest/lock changes together; partial rollback is forbidden.

## Acceptance evidence

`STD-REP-001` is implemented only when:

1. the active-estate catalog and platform map each cover every workspace repository exactly once;
2. every JavaScript manifest declares the canonical Node and pnpm policy;
3. required pnpm locks exist and forbidden lockfiles are absent;
4. no active source/manifests/executable configuration uses the retired package namespace;
5. the generated repository/package/dependency inventory matches current manifests; and
6. positive and adversarial gate fixtures pass without using a retired path or zero-target success.
