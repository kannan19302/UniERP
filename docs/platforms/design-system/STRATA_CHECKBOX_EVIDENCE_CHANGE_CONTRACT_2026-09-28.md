# Strata Checkbox evidence packet change contract — 2026-09-28

Status: `PARTIAL` — evidence packet only; no runtime change. Risk: R2 coordinated documentation/evidence across the design-system and platform repositories. Accountable platform: PLT-DS. Traceability repository owner: PLT-OPS. Direct consumer inspected: Storybook. Candidate downstream consumer: Business Suite.

## Outcome

Produce a bounded, source-revision-bound Checkbox comparison that supports the active Strata readiness audit without claiming implementation or release readiness. The packet updates component evidence in `design-system` and its owner traceability entry in `platform`.

## Acceptance criteria

1. AC-01: Capture Strata Default and official shadcn Base UI at a matched 1280×720 CSS viewport and record exact URLs, dimensions and source revision. Status: `PASS`.
2. AC-02: Inspect three actual equivalents, select one primary using the frozen rubric and explain the decision. Status: `PASS`.
3. AC-03: Inspect local accessible name, indeterminate state, keyboard focus and Space behavior; report defects as observations. Status: `PASS` — mixed-state semantic divergence observed.
4. AC-04: Inventory Business Suite source consumers and state whether a rendered journey is proven. Status: `PASS` — source inventory only; journey not proven.
5. AC-05: Update only the Checkbox ledger row and add linked dated packet/traceability evidence. Status: `PASS`.
6. AC-06: Run runtime tests, package gates and consumer journey checks. Status: `NOT VERIFIED` — excluded from this evidence-only packet while the owner protocol withholds broad implementation until Input, DataTable and Breadcrumb calibrations pass.

## Ownership and dependency boundaries

- PLT-DS owns Checkbox semantics, component package behavior, benchmark decision and provider gates.
- PLT-OPS owns platform traceability; the new traceability entry links to, but does not redefine, the evidence packet.
- Storybook is the local presentation/evidence consumer.
- Business Suite owns its form journeys and any native-checkbox migration decision. The packet found native checkbox source callsites but no shared Strata Checkbox JSX/import; no consumer migration is included.
- No L0 contract, token contract, app source, API, persistence, authorization or data behavior changes.

## Invariants and recovery

- Preserve native checkbox labeling and checked behavior, existing public exports and additive package compatibility.
- Keep visual state observations separate from accessible/native state claims.
- Do not change runtime implementation until the documented calibration gate permits implementation and the owning team can add semantics-focused tests.
- Documentation edits are local and reversible. Revert only this packet/traceability/contract set if the evidence is superseded; preserve other working-tree changes.

## Validation and remaining work

- Completed: live browser comparison, DOM/AX snapshot, Tab focus and Space sample, 3-reference inspection, Business Suite source inventory, CSV semantic import check (113 component rows; exactly one Checkbox row), screenshots and evidence links.
- Not run: automated Checkbox tests, typecheck, lint, token checks, Storybook build, published package validation, consumer build, route journey, axe/screen-reader, theme/density/responsive/RTL/zoom/forced-colors matrix.
- Required next: resolve the calibration gate in its owning packet; then PLT-DS corrects mixed native/ARIA semantics with regression coverage and captures the full required control matrix; Business Suite owner evaluates migration and validates a real user journey.

## Knowledge delta

`UPDATED`: dated Checkbox benchmark evidence and platform traceability now record the live reference comparison and confirmed mixed-state mismatch. No normative design-system requirement or contract changed.
