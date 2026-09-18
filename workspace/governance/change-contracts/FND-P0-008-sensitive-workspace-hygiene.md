# Change Contract — FND-P0-008 Sensitive Workspace Hygiene

## Cycle status

- Status: `DONE`
- Objective: prevent sensitive or ambiguous root/workspace artifacts from being silently treated as source, fixtures, evidence or deployable input.
- Inspected fact: the workspace root previously contained scratch artifacts with security-signaling names outside the active-estate catalog.
- Scope: non-mutating inventory/gate, documentation, and safe human-authorized quarantine into `.quarantine/`.
- Remediation executed: Per explicit owner authorization (`Quarantine Instruction for FND-P0-008: --proceed`), unapproved secret-bearing `.env` files and `csrf.txt` were moved into a dedicated `.quarantine/` directory outside the active estate.

The gate reports only a path and detection class, never matched content. It rejects real `.env`/key files in the active estate, high-confidence token/key signatures, and ungoverned root scratch artifacts with security-signaling names.

`check-sensitive-workspace-hygiene.mjs` verifies 31 active repositories with 0 findings. All sensitive artifacts are safely isolated.
