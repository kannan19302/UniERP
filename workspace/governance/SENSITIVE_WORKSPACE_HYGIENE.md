# Sensitive Workspace Hygiene

Owner: PLT-OPS with Security and each repository owner.

The active estate is declared only by the root `UniERP.code-workspace`; `active-estate.json` is a validated generated package/layer view. Root scratch files, retired checkouts, captures and generated artifacts are classified in `non-active-estate.json`, including entries intentionally retained outside the workspace, and are never source of truth, deployment input, fixtures or audit evidence. A root marked `workspacePresent: false` must remain absent from the active workspace; reappearance fails the non-active-estate gate.

Run `npm run check:sensitive-workspace-hygiene` before a foundation-ready claim. The gate never prints secret content; it reports a path and detection class only. It fails on high-confidence private-key/token signatures, real environment/key files inside active repositories, and root-level scratch files with security-signaling names outside the catalog.

When a finding occurs: stop distribution; identify the owner and data classification without copying content; quarantine or remove only with owner authorization; rotate confirmed credentials through the approved secret manager; check history and CI logs through an approved incident process; then record the remediation and expiry evidence. Do not add a finding to an allowlist merely to obtain a green check.
