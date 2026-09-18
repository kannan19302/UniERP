# Guided development instructions

Use one approved vertical story at a time. Read 00_START_HERE and 15_DECISIONS_AND_READINESS before starting; these instructions do not override the current broad-development NO-GO.

## Repeatable work packet

1. Identify the backlog ID and screen ID. Read its action and acceptance, relevant owning specification, accepted ADRs, current source and local AGENTS.md. Record repository status and revision.
2. Classify platform/repository impact and knowledge delta. For cross-repository or high-risk work, complete the canonical change contract with authorization, tenant scope, compatibility, telemetry, rollback and proof.
3. Search existing models, service methods, contracts, events, permissions and UI components. Treat evidence/OBSERVED_API_ROUTES.json as a search index only; resolve runtime prefixes, guards and service behavior in source.
4. Close pending decisions for this slice. Update owning requirements/contracts before implementation when behavior changes; do not implement a frontend-invented endpoint or permission.
5. Define a failing boundary test. For persistence, include tenant A/B/no-context with NOBYPASSRLS. For runtime extensions, include an escape/capability denial case. For public sites, include anonymous private-data denial.
6. Implement service/contract behavior, then connect approved UI components to it. Keep draft save, publish, promote and runtime activation separate. Use semantic tokens and shared state components.
7. Exercise loading/empty/error/forbidden/offline/conflict as applicable. Preserve user edits on recoverable failure. Recheck server authorization at consequential actions.
8. Run focused tests, typecheck and affected lint/build/security/token/accessibility/end-to-end gates. Record exact command, revision, discovery count, result and evidence path.
9. Review the diff and knowledge changes. Link tests and authoritative requirements back to the story. Obtain the required independent review before merging or publishing under separate authorization.
10. End with one honest cycle status and separate designed/implemented/tested/integrated/deployed/released states. Required work remaining means PARTIAL or NOT VERIFIED, not DONE.

## Copyable engineering brief

> Implement story DEV-xxx for screen DP-xxx from this package within the currently approved work scope. Read root/local agent instructions and the owning platform specifications first. Reuse accepted artifact/package/installation/release contracts. Preserve unrelated work. State contract and tenant boundaries before mutation. Implement the smallest vertical slice with real service integration and negative boundary proof. Run applicable gates and update authoritative knowledge plus traceability. Do not deploy, publish, reset data or change accepted ownership without exact authorization. Report evidence and remaining work honestly.

## Examples of correct decomposition

For DP-080 collaboration, first prove revision concurrency and idempotency in the artifact service, then expose semantic conflict data, then build Base/Server/Local UI, then test keyboard resolution and unsaved recovery. Presence avatars alone do not implement collaboration.

For DP-097 policy simulation, first establish the same server evaluator used by runtime, then add safe explainability output, then expose a simulation-only UI. A client-side role matrix is not authorization.

For DP-017 import, validate schemas and complete dependency/binding mapping without destination writes, then execute an authorized idempotent import, then compare canonical export. A successful upload is not portability.

For DP-089 release, bind approval to candidate digest and target, verify independent approver and expiry, execute stage gates, and activate only after health proof. A green pipeline drawing is not a release system.
