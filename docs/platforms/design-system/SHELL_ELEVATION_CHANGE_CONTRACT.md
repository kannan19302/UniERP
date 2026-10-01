# Strata v1 shell-folder elevation change contract

Status: R2 coordinated shared UI change, coding complete; consolidated validation awaiting explicit user approval. Owner: PLT-DS. Public contract owner: `@kannan19302/ui`. Baseline inspected 2026-09-27: `design-system` `c3cd4cb`, `platform` `0984a83`, with pre-existing uncommitted shell edits and nine untracked shell directories. This contract records the user's bounded shell-folder request; it does not authorize package publication, deployment, or release.

## Outcome and scope

Establish the necessity and distinct job of every existing `design-system/src/core/shell/` element, elevate required shells against individual source-backed benchmarks, and converge redundant shells without losing a supported consumer behavior. Process the 28 directories in strict alphabetical order. Preserve Strata typography, icons, Neutral/Nova visual language, semantic tokens, radius scale, four density levels where applicable, and the three canonical themes. Do not change other Design System categories or add product-specific authority to L1.

## Acceptance criteria

1. **AC-01** Inventory all 28 shell directories, public APIs, states/variants, dependencies, direct consumers, overlaps, and architectural roles before coding any individual shell.
2. **AC-02** For each shell in alphabetical order, record its purpose and `KEEP`, `MERGE`, `DEPRECATE`, or `REMOVE-CANDIDATE` decision with evidence. A zero import count alone never proves redundancy.
3. **AC-03** For every required shell, inspect actual equivalent references across the requested official shadcn and registry ecosystem plus relevant enterprise sources; select a shell-specific benchmark and record winning/rejected traits.
4. **AC-04** Implement or remove each shell in alphabetical order, preserving supported public behavior, keyboard semantics, tokens, four-tier density, themes, responsive behavior, and consumer compatibility. Keep examples synthetic and presentation-only.
5. **AC-05** Maintain a live ledger with purpose, decision, references, benchmark, gaps, changes/removal, and coding status for every shell. Inventory and authored code are not verification proof.
6. **AC-06** After shell-folder coding and cleanup reach 28 of 28 elements, stop and request the user's explicit approval for the consolidated validation phase before running validation.
7. **AC-07** Once approved, perform the full shell-folder browser, Storybook, visual, accessibility, theme, density, direction, responsive, unit, typecheck, build, exports/dependencies, and representative consumer validation matrix; fix and repeat until each required element has evidence-based `PASS`.
8. **AC-08** Review the complete diff and knowledge delta, record downstream handoff and rollback, and report the exact protocol status. Publication and deployment remain separately authorized.

## Dependency and consumer graph

L1 `design-system/src/core/shell` publishes `@kannan19302/ui/shell` to L4 Storybook and observed consumers in Business Suite, Tenant Admin, Provider Admin, Developer Platform, and their app-specific wrappers. Internal shell dependencies include the context bars, `PageHeader`, `Breadcrumb`, `BrandMark`, theme toggle, and empty states. The ledger records exact observed imports. Source inventory is bounded to the named roots and current working tree; it is not a published-package usage telemetry claim.

## Invariants, recovery, and approval boundary

- No shell fetches business data, makes a permission decision, asserts audit or RLS proof, or commits product mutations. Consumers provide data, permission results, and callbacks.
- Existing published exports and prop meanings are compatibility obligations in package major 1. A proposed breaking removal needs the exact target, mapped consumers, migration, rollback, and explicit approval under `DS-NFR-010` and `DS-PKG-002`/`004`; untracked, unpublished additions are assessed separately.
- Keep all unrelated and pre-existing working-tree edits. Record the precise patch authored in this run, and never infer validation from an existing test/story file.
- If validation fails after approval, repair in scope and repeat. Rollback is a reviewed shell-package patch and consumer reversal; there is no schema or data migration. No feature flag or production rollout is in scope.
- Human direction explicitly defers the full consolidated validation phase until after all coding and a new approval request. The interim status cannot be `DONE` or `PASS`.

## Knowledge delta

`UPDATED`: shell necessity, ownership, benchmark choices, deprecations, and interaction conventions are durable Design Platform knowledge. This change contract and the dated shell ledger are the owning records. Traceability and consumer compatibility evidence must be updated in the validation phase. No API, database, tenant authorization, privacy, or operational contract change is intended; any discovered change requires a revised contract before mutation.
