# Change Contract — FND-P2-006 Operational Governance

## Cycle status

- Status: `PARTIAL` (Repository claims and 31-repo code census measured and verified; fine-grained rosters for services, domains, datastores, contracts, and SLOs in progress)
- Objective: measure and assign accountable ownership, role assignments, profile metrics, and rehearsal freshness across all 31 active estate repositories.
- Risk class: `R2` — engineering governance and ownership clarity.
- Accountable platforms: Platform Governance (`PLT-GOV`).

## Delivered Governance Manifests & Census

1. **Repository Claims Manifest**:
   - `docs/programme/programme-claims.json`: Every one of the 31 active repositories assigned to an accountable platform owner (`PLT-BIZ`, `PLT-IDENTITY`, `PLT-DATA`, `PLT-DESIGN`, `PLT-OPS`, `PLT-DEV`, `PLT-CLIENTS`, `PLT-CORE`, `PLT-WEB`, `PLT-CONTRACTS`, `PLT-GOV`).
2. **Unowned Code Census**:
   - `scripts/check-unowned-code-census.mjs`: Measures all 31 repositories (file counts, code lines, dependencies, language breakdown) and generates `docs/programme/P12-002-CENSUS.json` and `docs/programme/P12-002-CENSUS.md`.
   - Gate check `--verify` confirms 100% ownership coverage and zero unowned repositories.
3. **Rehearsal Freshness**:
   - `scripts/check-rehearsal-freshness.mjs`: Asserts that live recovery rehearsals occurred within the required 48-hour compliance window.

## Verification Evidence

```bash
node scripts/check-unowned-code-census.mjs --verify
node scripts/check-rehearsal-freshness.mjs
```
Census and rehearsal freshness gates pass cleanly with zero unowned code across all 31 repositories.
