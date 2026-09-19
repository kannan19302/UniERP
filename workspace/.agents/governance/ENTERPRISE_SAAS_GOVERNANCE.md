<!-- UniERP-Enterprise-SAAS-Governance: 1.0.0 -->
# Governance evidence and progress

The [canonical protocol](../../../docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md) owns completion rules.
A score is a summary of a declared evidence set, not proof of product readiness or market leadership.

For a task with N required criteria, report proven criteria / N only when N is nonzero and the denominator is
fixed and disclosed. Keep PASS, FAIL, BLOCKED and NOT VERIFIED separate. A weighted diagnostic must name each
weight, denominator, source, revision and environment. Missing evidence is unknown; do not fabricate a measured
zero, a passing result, or a completion percentage. Zero expected discovery fails closed.

## Runner limitations

Inspect platform/workspace/scripts/run-enterprise-saas-engine.mjs before use. It may execute commands and write
the ledger. Check that it discovers the current workspace inventory and that each metric comes from actual
verification. Presence of a decorator, SQL text, test file or route is only structural evidence.
Do not assume flags provide real remediation or benchmarking without inspecting and verifying the implementation.

The 2026-09-19 documentation audit observed stale repository names in the runner and a ledger UI score of 100
with zero discovered routes. That score cannot prove UI completeness. Revalidate the source and scope before
using it; do not overwrite historical ledger values merely to make documentation agree.

## Completion and failures

Follow numbered acceptance criteria and the relevant repository gates. Report exact commands and working
directories, failed assertions, missing environments and pre-existing failures. A failed required gate prevents
VERIFIED COMPLETE. An unrelated diagnostic does not expand task scope. Preserve tests and security controls.

External publication and commits follow explicit task authorization. Agent reports, personas, recipes and
commercial aspirations do not authorize actions or establish runtime conformance.
