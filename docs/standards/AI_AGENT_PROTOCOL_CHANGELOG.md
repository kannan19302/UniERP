# AI Agent Protocol Changelog

The protocol uses semantic versioning. Patch releases clarify wording without changing obligations. Minor releases
add backward-compatible rules or artifacts. Major releases change status semantics, authority, risk classification,
or remove/relax an obligation. Every version change updates the canonical document, manifest, schema, entrypoint
markers, traceability, and migration note together.

## 1.1.0 — 2026-08-26

Added strict evidence-backed cycle statuses, hard `DONE` predicates, separate lifecycle claim states, correction of
overstatements, and multi-agent coordination. Added JSON Schema, repository/platform ownership mapping, focused
playbooks, PR attestation, and adversarial validation coverage.

Migration: agents and adapters using marker `1.0.0` must update to `1.1.0`. A stale marker fails validation. Handoff
formats must emit exactly one permitted status and the explicit not-done statement when status is not `DONE`.

## 1.0.0 — 2026-08-26

Initial provider-neutral UniERP development protocol: authority, risk, architecture, code, database/RLS, APIs,
contracts/events, auth/tenancy, security/privacy, UI/UX/accessibility, testing, operations, supply chain, source
control, documentation, and completion gates.

