# Test and qualification strategy

Screens are design coverage, not test coverage. Every production story needs proof at the boundary that can fail. The universal super-admin account supports navigation, but tenant denial requires a NOBYPASSRLS role and restricted principals in the approved harness.

## Boundary matrix

| Boundary | Required test | Failure that must be caught |
| --- | --- | --- |
| Identity/session | Hosted callback, expired session, wrong audience, revoked membership | Client-supplied tenant or stale membership grants access |
| Tenant persistence | Positive tenant A, negative tenant B, no context, NOBYPASSRLS | Reads/writes escape service or PostgreSQL policy |
| Artifact save | Concurrent r12 writers, repeated command, invalid schema | Lost update, duplicate revision or malformed metadata persisted |
| Library installation | Pinned version, managed overlay, fork provenance, missing dependency | Mutable published source or upgrade without impact review |
| Package export | Unknown fields, dependency lock, clean tenant rebind | Dropped metadata, hidden source import or leaked secret |
| Sandbox | Escape, SSRF/DNS/redirect, CPU/memory/timeout, revoked capability | Ambient DB/network access or noisy-neighbor exhaustion |
| Event/job | Crash after commit, duplicate, reorder, DLQ replay, checkpoint resume | Lost event, duplicate business effect or replay across tenants |
| Release | Signature/hash, same bundle promotion, stale approval, self-approval | Unreviewed bytes activate or failed health probe switches traffic |
| Website runtime | Anonymous/private/draft separation, cache keys, domain verification | Private tenant data or draft content becomes public |
| Recovery | Snapshot integrity, isolated restore, manifest reconciliation | Restore reports success with missing dependencies/bindings |
| Accessibility | Automated plus keyboard and screen-reader pilot | Inaccessible canvas, trapped focus or silent validation |
| Performance | Representative projects and concurrent tenants | Unbounded query, editor freeze or quota starvation |

## Pilot evidence packet

For each App and Site pilot, preserve: repository revisions; environment ID and sanitized configuration digest; contract/schema versions; exact test commands; discovered/executed/skipped counts; safe fixture IDs; output artifacts; trace IDs; negative test outcomes; release/package digest; export/import semantic diff; accessibility observations; performance workload and percentiles. No credentials or real tenant data in evidence.

The reviewer must independently inspect the outputs. A mocked controller unit test is useful for logic but does not prove RLS, signing, sandbox isolation or runtime publication. A route inventory is not execution evidence. Failures must be classified as new defect, reproduced baseline defect, environment blocker or invalid test; never weaken assertions to make a gate green.

## Entry and exit

Entry: approved scope, accepted contract or additive reviewed change, disposable environment, deterministic fixture and known expected failure. Exit: typecheck, focused tests, affected lint/build, contract consumer proof and relevant security/UI gates pass. Database paths also need generation, migration and RLS integration evidence. UI stories need token and accessibility checks plus relevant end-to-end coverage. Required Not run means not done.

Use story-specific acceptance in STORY_BACKLOG.json with this matrix. Run focused checks first, broaden to affected gates once, and repeat only after changes or unresolved failures. Keep source and test revisions bound to the same candidate; test evidence for another hash cannot approve the release.
