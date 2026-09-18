# Product requirements — Developer Studio v1

Status: implementation proposal constrained by accepted authorities. DP-RQ identifiers are local handoff IDs, not newly published normative requirements.

## Product intent and identity

A tenant maker moves from an idea to a versioned, testable application or website in one Strata workbench. A specialist can build reusable resources in the organization library and attach compatible immutable versions to projects later. UniERP's identity is an explicit context band, persistent document tabs, layered navigation and a consistent left-toolbox / canvas / right-inspector arrangement. Enterprise controls appear at the relevant decision, not as a wall of dashboard tiles.

The default unit of deployment remains one APP or SITE DevProject. Organization home groups them, and tabs allow concurrent work across projects. No duplicate identity platform, business database, workflow engine, commercial marketplace or provider console is created.

## Personas and outcomes

| Persona | Core job | Success evidence |
| --- | --- | --- |
| Maker | Build a form/page and bind data without losing scope | Both pilot journeys complete with correct persisted content |
| Professional developer | Extend typed source, API and logic safely | Unknown fields survive round trip; contracts and sandbox tests pass |
| Library maintainer | Publish/reuse/upgrade without breaking consumers | Pinned consumers unchanged until explicit upgrade |
| Reviewer / QA | Assess change and evidence independently | Approval is invalidated when the candidate digest changes |
| Tenant security admin | Enforce data and capability boundaries | Negative permission and tenant tests pass at the service |
| Release operator | Promote and recover known artifacts | Identical locks across stages; verified recovery |
| Site editor | Publish localized public content safely | Public allowlist, consent, SEO and accessibility checks pass |
| End user / visitor | Use delivered app/site securely | Runtime functions when authoring is down within policy limits |

## Functional requirement groups

### DP-RQ-01 — Workspace and context

Project-scoped navigation, document tabs, hosted sign-in and utilities. Authority anchor: DEV-SEC-001.

### DP-RQ-02 — Reusable artifacts

Library ownership, exact versions, typed installations, overlays and retirement. Authority anchor: ADR-0005.

### DP-RQ-03 — Website authoring

Pages, CMS, assets, SEO, consent and immutable publication. Authority anchor: SITE-FR-001..005.

### DP-RQ-04 — Application authoring

Forms, data, workflows, rules, mobile and navigation. Authority anchor: PILOT-ACCEPTANCE.

### DP-RQ-05 — Integration and extension

Versioned APIs, SDK, connectors, events and sandbox. Authority anchor: DEV-FR-001..005.

### DP-RQ-06 — Quality and release

Tests, impact, immutable manifests, approval, deployment and recovery. Authority anchor: ADR-0005/0007.

### DP-RQ-07 — Security and operations

Identity, record policy, secrets, audit, quotas and service health. Authority anchor: DEV-SEC-001..005.


Each group is refined into screen stories in 18 and mapped in 17. Acceptance common to every operation: server-derived scope; supported capability; validated input; persisted version/operation result; deterministic error; safe retry; audit where required; loading/empty/error/forbidden recovery; keyboard access. Buttons with no functioning destination are incomplete.

## High-impact acceptance

- A library author creates a draft without a project, publishes an immutable package and installs it through typed mappings. Missing mappings or capabilities block installation.
- Managed source cannot be edited by consumers. Unlocked customization is a separate overlay. Forking produces a distinct owner/id and provenance.
- Linked ranges may propose upgrades in development; production resolves exact versions and hashes. No running release follows mutable head.
- Saving a stale revision returns conflict and preserves both drafts. Closing a dirty tab requires a recoverable choice.
- A package with changed executable capability, broken contract, missing tests or revoked signer cannot silently publish or activate.
- Release approval binds to candidate digest, environment and policy version, with no self-approval. A later mutation invalidates approval.
- Long-running actions expose operation ID, phase, progress, last checkpoint and terminal result; request timeout does not imply failure or success.
- Public website data is an explicit projection, not anonymous access to general tenant APIs. Optional trackers remain inactive until allowed consent.
- Quarantine, credential rotation and restore show affected consumers and retain a durable audit path.
- AI suggestions are untrusted draft proposals. They cannot grant themselves tools, publish, obtain production data or bypass review.

## Measures and qualification targets

Measure time-to-first-successful-preview, pilot task success, recoverable save failures, upgrade rejection accuracy and release failure/recovery rate. Establish a baseline in moderated pilot sessions before promising numerical improvement. Document 12 proposes technical qualification budgets; product outcomes are not benchmarked in this design task.

## Scope boundaries and sequencing

V1 design covers primary paths for the dated inventory plus 32 identified enterprise gaps. Shared patterns cover repeatable dialogs and failure states. Additional customer-specific industries, native runtime redesign, arbitrary new project kinds, provider-wide operations and commercial billing are external platform work. UI links do not transfer their ownership.

Enterprise credibility requires proven behavior, operability, accessibility and compatibility; adding screens alone cannot establish Salesforce/SAP parity. Prioritize the two shared pilots and security/lifecycle foundations before expanding the catalog.
