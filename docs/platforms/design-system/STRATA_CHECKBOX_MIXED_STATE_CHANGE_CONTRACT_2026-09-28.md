# Strata Checkbox mixed-state correction contract — 2026-09-28

## Cycle status

- Status: `PARTIAL`
- Objective: Correct the existing Checkbox `indeterminate` prop so the native input and visible state agree.
- Scope: Shared Checkbox runtime and focused tests in `design-system`; dated evidence and PLT-DS traceability in `platform`.
- Incomplete: Browser accessibility state, package gates, consumer journey, and broader theme/density/reflow/AT matrix remain to be verified.
- Required honesty statement: **This is not done.**

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | `YES` | This contract and current Checkbox comparison packet. |
| Implemented | `YES` | Native input `indeterminate` property now follows the existing prop and is restored on native activation; forwarded ref remains intact. |
| Tested | `YES` for provider gates | Focused and full package tests, typecheck, lint, package build, Storybook standards/build, and live Storybook DOM/AX keyboard sample pass. |
| Integrated | `PARTIAL` | Storybook preview verified. No Business Suite Checkbox use was found in source; no migration in scope. |
| Deployed | `NO` | No deployment authorized or planned. |
| Released | `NO` | No package publication authorized or planned. |

## Request and outcome

- Human request: Complete Strata for the Business Suite with component-level side-by-side comparison and parity.
- User outcome: A tri-state Checkbox exposes the same mixed state to the browser accessibility tree as it shows visually.
- Risk: `R2 — coordinated shared UI behavior and cross-root evidence`.
- Accountable platform: PLT-DS. Traceability owner: PLT-OPS.
- Affected repositories: `design-system`, `platform`.
- Direct evidence consumer: Storybook. Candidate downstream consumer: Business Suite; no shared Checkbox callsite was found.
- Applicable authority: ADR-0009; Design Platform `DS-FR-002`, `DS-NFR-004`, `DS-NFR-009`; Strata Elevation Protocol; workspace and design-system `AGENTS.md`.

## Acceptance criteria

1. AC-01: Preserve the public prop and native input/ref API; when `indeterminate` is true, set the native input’s `indeterminate` property before paint. Do not add redundant `aria-checked` that could override native semantics. Status: `PASS`.
2. AC-02: Add a regression assertion that covers true, false, prop updates and activation, while preserving the forwarded native ref and controlled checked behavior. Status: `PASS`.
3. AC-03: In live Storybook, confirm the browser accessibility snapshot reports mixed state and the visible minus indicator remains; check keyboard state does not leave visual and native state divergent. Status: `PASS` for sampled initial and Tab + Space states; live screen-reader output remains `NOT VERIFIED`.
4. AC-04: Run the focused Checkbox test, design-system typecheck, and relevant build/standards gates; record exact commands/results. Status: `PASS`.
5. AC-05: Update the dated packet, the single Checkbox evidence ledger row, and PLT-DS traceability without claiming full component readiness or Business Suite integration. Status: `PASS`.

## Current and intended behavior

- Current: `indeterminate` changes only the visual minus icon and `data-state`; the native input remains determinate. Browser evidence shows Space can mutate native `checked` while visual `data-state` remains `indeterminate`.
- Intended: The existing `indeterminate` prop is authoritative for both visual treatment and the DOM `HTMLInputElement.indeterminate` property. Native checkbox behavior supplies mixed semantics. The caller continues to own the controlled `indeterminate` prop and selection data; `onChange(checked)` remains unchanged.
- Failure/recovery: If the input node is absent, there is no imperative update; React applies the property when the node mounts. Reverting the focused component and regression test restores prior behavior.

## Compatibility and impact

- Additive/compatible: no prop, export, token, callback, package, or persisted data change. Native indeterminate semantics now match the existing prop name and visual state.
- Consumers: no Business Suite migration is in scope. Reuse consumer owners must validate package compatibility before integration claims.
- Auth, tenant, API, persistence, privacy and audit: no impact.
- Dependencies, rollout flag and migrations: none.
- Publication/deployment: not authorized or included.

## Verification plan

| Requirement | Proof boundary | Command/check | Expected |
| --- | --- | --- | --- |
| AC-02 controlled native property/ref | Checkbox DOM | `pnpm exec vitest run src/inputs/checkbox/checkbox.test.tsx` | PASS — 9/9 focused tests, including React 19 callback-ref cleanup |
| AC-03 browser accessibility state | Storybook Indeterminate story | Browser accessibility snapshot and Tab + Space | PASS — AX `[checked=mixed]` before/after; after Space DOM `checked=true`, `indeterminate=true`, visual `data-state=indeterminate` |
| AC-04 package typing/standards | Design-system package | `pnpm typecheck`, `pnpm check:storybook`, `pnpm lint` | PASS — check:storybook found 120 story files / 113 components; lint gates and typecheck exited 0 |
| AC-04 tests/builds | Design-system and Storybook | `pnpm test`, `pnpm build`, `pnpm --dir storybook build-storybook` | PASS — full suite 132 files / 820 tests after the mixed-state correction and before the final React 19 ref-cleanup refinement; final focused 9-test Checkbox suite and typecheck/lint/package build/Storybook build pass after that refinement. |
| AC-05 records | CSV, dated packet, platform traceability | CSV import/count and diff review | PASS — 113 rows, one Checkbox row, overall remains `NOT VERIFIED` until full matrix/consumer gates pass |

Keyboard/screen-reader follow-up: verify with a supported screen reader before accessibility `PASS`. This local correction cannot claim screen-reader conformance from axe or DOM inspection alone.

## Knowledge delta and completion evidence

- Knowledge delta: `UPDATED` — mixed-state browser evidence exposed a gap in the existing Checkbox semantics.
- Current iteration result: `PARTIAL`; evidence is linked from the PLT-DS traceability ledger.
- Remaining risk: full visual/accessibility matrix, package and affected consumer evidence, and actual Business Suite journey.
- Human action: no release, publication, or production action requested or authorized.
