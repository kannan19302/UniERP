# Strata Checkbox Business Suite consumer contract — 2026-09-28

## Cycle status

- Status: `PARTIAL`
- Risk: `R2 — coordinated shared-package consumer behavior and evidence`
- Objective: Integrate the existing Strata Checkbox into the active Business Suite dynamic custom-record form while preserving the boolean form-data contract and API persistence journey.
- Accountable platform: PLT-DS for the component; PLT-ERP for the Business Suite form and persisted record journey.
- Repositories: `design-system` (upstream package), `business-suite` (consumer), `platform` (contract and traceability).
- Required honesty statement: **This is not done.**

## Authority and dependency graph

- Workspace `AGENTS.md`, the AI Agent Development Protocol, AI Knowledge Lifecycle, Business Suite `AGENTS.md`, design-system `AGENTS.md`, ADR-0009, the Design Platform requirements/contract, and the frozen Strata Elevation Protocol govern this packet.
- Upstream provider: `@kannan19302/ui/inputs` exports `Checkbox`; workspace package version 1.1.0 is built in `design-system/dist` and Business Suite's direct dependency range `^1.0.15` accepts it. The consumer lock resolves the direct dependency to `link:../design-system`. This is local package evidence, not a publication or release claim.
- Consumer: `business-suite/src/components/form-runtime/DynamicFormRenderer.tsx`, used by the authenticated `/app/[module]/[slug]` custom record create/edit route. Its submit handler posts/patches records through the authenticated API client and returns to the list on success.
- Data/API owner remains PLT-ERP/API. This packet does not change either boundary.
- Freeze: the Input/DataTable/Breadcrumb calibration gate remains closed. This bounded Checkbox consumer packet does not authorize mass migration or claim catalog readiness.

## Acceptance criteria

| ID | Criterion | State before implementation |
| --- | --- | --- |
| AC-01 | Replace the active dynamic-form native checkbox with the exported Strata Checkbox, preserving controlled boolean values, default/initial state, conditional disabled behavior, required validation, and the field's visible label/description. | `NOT VERIFIED` |
| AC-02 | Ensure the checkbox has one valid accessible name, no nested label markup, exposes invalid/error description when validation fails, and remains operable by keyboard. | `NOT VERIFIED` |
| AC-03 | Add a focused consumer test proving unchecked/checked boolean values reach the submit callback and required validation blocks submission; validate the shared Checkbox package import with the consumer compiler. | `NOT VERIFIED` |
| AC-04 | Run upstream package proof if provider source changes; run applicable Business Suite typecheck, lint, and focused test, plus a real authenticated route journey when its required backend/test environment is available. | `NOT VERIFIED` |
| AC-05 | Update the owning traceability/evidence records and review the complete scoped diff without altering unrelated working-tree changes. | `NOT VERIFIED` |

## Invariants, compatibility, and recovery

- Keep `onChange(checked: boolean)` and `formData[fieldName]` boolean semantics; API request/response payload shape remains unchanged.
- Use the existing published package subpath; no private source import, new dependency, API, permission, database, schema, event, or migration is introduced.
- Checkbox label/description/error associations must remain native and keyboard accessible. Read-only and conditional-disabled fields stay disabled.
- The application remains responsible for authenticated submission, server authorization, persistence, audit, and success/failure feedback.
- Rollback: revert only the Checkbox import/rendering, its focused test, and this packet's consumer traceability entry. Existing business form and API behavior remains available.
- No release, package publication, deployment, production/staging mutation, or commit/push target is included in this contract.

## Knowledge delta and evidence owners

- Knowledge delta: `UPDATED` — records one proven Business Suite Checkbox consumer and its semantics; does not change the shared component contract or platform requirements.
- Authoritative component contract: `design-system` Checkbox props and package subpath.
- Consumer implementation/test evidence: `business-suite/src/components/form-runtime/`.
- Platform evidence/traceability: `platform/docs/platforms/design-system/TRACEABILITY.md` and this dated contract.
- Required report must separate designed, implemented, tested, integrated, deployed, and released states. Local type/build tests do not establish a deployed/released package or full Business Suite readiness.

## Iteration evidence

- Consumer component test: Node `v22.23.3`, `pnpm exec vitest run src/components/form-runtime/tests/DynamicFormRenderer.checkbox.spec.tsx --pool=threads --poolOptions.threads.maxThreads=1 --poolOptions.threads.minThreads=1` — `PASS`, 3 tests. The test mocks the unrelated DataGrid and Checkbox module surfaces because the current Vitest config eagerly traverses the package barrel and encounters unrelated source/CSS parsing errors. It proves the renderer's prop and boolean-submit mapping, not runtime rendering of the package component.
- Upstream provider evidence: the previous Checkbox iteration reports the real Checkbox suite (9 tests), package typecheck/build and Storybook build passing after the indeterminate/ref changes. This consumer iteration did not change provider source.
- Business Suite `pnpm typecheck` under Node `v22.23.3`: `FAIL`, 746 diagnostics on the pre-existing broad UI export and prop compatibility set; targeted scan found zero diagnostics in `DynamicFormRenderer` and its new test. Package direct and transitive UI versions differ (`1.1.0` direct workspace link and `1.0.15` via Framework), which remains an integration risk.
- Business Suite `pnpm lint`: `NOT RUN` effectively; script fails immediately because `eslint` is not installed in the repository's executable path.
- `pnpm check:tokens`: `FAIL`, six unrelated existing files report 161 violations; none is touched by this packet.
- `node ../platform/workspace/scripts/check-layer.mjs`: `PASS`, expected L4 owner/package detected.
- Authenticated Browser/E2E route journey: `NOT VERIFIED`; no backend fixture/session journey was executed.

| ID | Criterion | Iteration state |
| --- | --- | --- |
| AC-01 | Strata control and boolean/required/disabled mapping implemented. | `PASS` for source inspection and focused callback/conditional-disable assertions. |
| AC-02 | Name, label, description and validation error association implemented. | `PASS` for consumer mapping assertions; actual package screen-reader/browser evidence remains open. |
| AC-03 | Consumer test covers required blocking and boolean true/false submit mapping. | `PASS` for renderer mapping using a mocked Checkbox; package import compile scan reports zero diagnostics in the changed renderer/test files. |
| AC-04 | Consumer/package gates and real route journey. | `FAIL` overall: broad typecheck and token gate fail; lint executable is missing; authenticated journey is not verified. |
| AC-05 | Durable evidence updated and scoped diff reviewed. | `PASS` for scoped consumer/platform diff review; unrelated pre-existing changes remain untouched. |
