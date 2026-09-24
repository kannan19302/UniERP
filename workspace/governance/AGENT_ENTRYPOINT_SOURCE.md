<!-- UniERP-Agent-Protocol: 1.1.0 -->
# UniERP agent entrypoint

This is the single workspace-wide agent instruction source. The copy at
`platform/workspace/governance/AGENT_ENTRYPOINT_SOURCE.md` is authoritative and must match this file.
Every active repository has one short `AGENTS.md` for its own coding rules. Do not copy
workspace rules into repository files.

## Product goal and authority

Deliver a working, tenant-isolated and auditable UniERP v1 for the January 1, 2027
target. Focus on complete customer journeys in the Business Suite, Tenant Admin,
and Developer Platform, supported by truthful Marketing Site and safe Provider Admin
operations. A route, component, module, or score is not a customer outcome or release
proof. Select industry work from observed customer problems and buying evidence.

Apply authority in this order: explicit human direction and law; accepted ADRs;
the owning platform specification; cross-platform standards; repository `AGENTS.md`;
repository configuration and tests. Surface unresolved conflicts and preserve the
safer, compatible behavior. ADR-0012 defines the 14 active roots and package-level
layers. Product intent lives in `platform/docs/product/`; ownership lives in
`platform/docs/PLATFORM_CATALOG.md`.

Before material work read:
- `platform/workspace/governance/skills/unierp-enterprise-brain/SKILL.md`
- `platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`
- `platform/docs/standards/AI_KNOWLEDGE_LIFECYCLE.md`
- the applicable repository `AGENTS.md`, accepted ADR, owning platform requirements,
  contracts, and current evidence.

If a required authority is unavailable, stop before mutation and report it.
The canonical protocol governs risk classification, change contracts, exact status
vocabulary, evidence reports, repository handoffs, and source-control workflow.
The machine-readable profile is `platform/docs/standards/AI_AGENT_PROTOCOL.json`.

## Strict layer rules

| Layer | Owner and allowed role | Boundary |
| --- | --- | --- |
| L0 Contracts | `contracts` publishes versioned HTTP, event, SDK and shared types | No private downstream imports; additive within a major. |
| L1 Foundations | `design-system` UI and `shared` primitives/config | No business orchestration, persistence, or app-specific authority. |
| L2 Data/runtime | `data` persistence; package-level runtime primitives | Immutable migrations, service scoping plus FORCE RLS, NOBYPASSRLS proof, decimal money and unit-bearing quantities. |
| L3 Services/IAM | `api` business behavior and `idp` identity | Validate every boundary; server-side authorization; tenant/provider separation; atomic state, audit and outbox. |
| L4 Products | Business Suite, Tenant Admin, Provider Admin, Developer Platform, Marketing Site; package-level Storybook/marketplace | Consume published contracts and shared UI; never import sibling app source or treat UI visibility as authority. |
| L5 Clients | `mobile`, `desktop-app` | Use published contracts; prove secure storage and supported offline/recovery behavior. |
| L6 Extensions | Extension packages under Developer Platform | Declared capabilities, tenant scope, budgets, signatures, revocation and compatibility. |
| L7 Operations | `platform` infrastructure, release and governance | Build once, pin and verify artifacts, observe, restore, rehearse rollback and obtain release authorization. |

Follow the actual package dependency graph, not directory names. For a multi-root
change: define numbered acceptance criteria and a written R2/R3 change contract;
map owners and consumers; change requirements and L0 contracts first, then data,
services, shared design, consumer UI/clients, and operations evidence. Verify each
upstream boundary before migrating consumers. Parallel work is allowed only for
independent packets with non-overlapping ownership. Keep an explicit cross-root
checkpoint and structured handoff.

## Universal coding and proof rules

Search before creating a concept, API, event, permission, model, component or job.
Use existing owners and public contracts. Keep changes minimal, typed and
deterministic. Validate trust-boundary input; expose canonical errors. Never
weaken authentication, RLS, audit, encryption, validation, rate limits or tests.
Never use destructive database reset or rewrite applied migrations. Keep secrets,
credentials and real personal data out of code, docs, fixtures, logs and reports.
Use the approved seeded test fixtures; restricted-role and NOBYPASSRLS evidence
cannot be replaced by a privileged test account.

User-facing work uses `@kannan19302/ui` and approved tokens, truthful live data,
relevant loading/empty/error/forbidden/offline/conflict states, and WCAG 2.2 AA
evidence. Business records use correct decimal, currency, unit, time and
amendment/reversal semantics. Every persistent business mutation and event
commits atomically; consumers are idempotent, retryable and reconcilable.

Choose checks from the affected package manifests. Typed code needs typecheck;
behavior needs focused tests; production code needs lint/build when available.
Database, auth, contract, UI, accessibility, migration, recovery and integration
checks follow the relevant risk boundary. Zero-target, skipped, missing-environment
or stale-evidence checks do not pass. Review the complete diff and preserve
unrelated working-tree changes.

At each cycle end use exactly one protocol status and an iteration evidence report.
Separate designed, implemented, tested, integrated, deployed and released claims.
Never claim completion from a score or file presence. Classify the knowledge delta
as NONE, UPDATED or REQUIRED-BUT-INCOMPLETE and update the owning authority.

Production/staging mutation, deployment, release, publication, external messaging,
destructive operations, breaking contracts, accepted-ADR reversal, and security
weakening require explicit human authorization for the exact action and target.
The January 1 date does not supply that authorization.
