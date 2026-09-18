<!-- UniERP-Agent-Protocol: 1.1.0 -->
# UniERP Development Agent Protocol

This file is the mandatory, provider-neutral entry point for every AI coding agent working anywhere in the
UniERP polyrepo. “Agent” includes interactive assistants, autonomous agents, IDE agents, review bots, and
subagents from any provider. Read this file before planning or changing anything.

The canonical policy is
[`unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md).
Its clauses are mandatory. The machine-readable profile is
[`unierp-platform/docs/standards/AI_AGENT_PROTOCOL.json`](unierp-platform/docs/standards/AI_AGENT_PROTOCOL.json).

## Project-level enterprise brain

Before material analysis, planning, review or mutation, every agent MUST read and apply the project skill at
`unierp-workspace/governance/skills/unierp-enterprise-brain/SKILL.md`. The skill is the shared operational
navigation and decision layer for product vision, platform boundaries, enterprise architecture, domains, data,
security, contracts, experience, delivery, operations and governance. It does not override the instruction
precedence below or duplicate owning platform specifications.

Every material change MUST classify its knowledge delta and follow
`unierp-platform/docs/standards/AI_KNOWLEDGE_LIFECYCLE.md`, so authoritative knowledge,
contracts, traceability and evidence evolve with the codebase. If the project skill or knowledge-lifecycle standard
is unavailable, the governance bundle is incomplete; stop before mutation and report the missing dependency.

## Enterprise SAAS Master Standards (Market Dominance & 11 Pillars)

Every AI agent working in this polyrepo must strictly adhere to the 11 pillars of the **Enterprise SAAS business platform** standard to achieve global market leadership:

- **Rules & Inviolable Laws:** [`.agents/rules/ENTERPRISE_SAAS_RULES.md`](.agents/rules/ENTERPRISE_SAAS_RULES.md) (Non-stopping iteration, zero-mock mandate, PostgreSQL RLS universality, zero-trust `@Permissions`).
- **End-to-End Workflow:** [`.agents/workflow/ENTERPRISE_SAAS_WORKFLOW.md`](.agents/workflow/ENTERPRISE_SAAS_WORKFLOW.md) (7-phase multi-repo delivery from L0 Contracts to L7 Operations).
- **Operational Skill:** [`.agents/skills/salesforce-overtake-engine/SKILL.md`](.agents/skills/salesforce-overtake-engine/SKILL.md) (Run scripts, 10 super-platform moats, and recipes).
- **Knowledge Base & Blueprints:** [`.agents/knowledge/SALESFORCE_OVERTAKE_KNOWLEDGE_BASE.md`](.agents/knowledge/SALESFORCE_OVERTAKE_KNOWLEDGE_BASE.md) (Market parity matrix & 15 industry clouds).
- **Memory & Progress Ledger:** [`.agents/memory/ENTERPRISE_SAAS_EXECUTION_LEDGER.json`](.agents/memory/ENTERPRISE_SAAS_EXECUTION_LEDGER.json) (Real-time progress percentage tracking).
- **Execution Flow:** [`.agents/flow/EXECUTION_FLOW_STATE_MACHINE.md`](.agents/flow/EXECUTION_FLOW_STATE_MACHINE.md) (Automated self-healing remediation loop).
- **Reference Blueprints:** [`.agents/reference/ENTERPRISE_SAAS_REFERENCE_MANUAL.md`](.agents/reference/ENTERPRISE_SAAS_REFERENCE_MANUAL.md) (8 Strata floorplans, NestJS module, RLS tests).
- **Quality Standards:** [`.agents/standards/ENTERPRISE_SAAS_STANDARDS.md`](.agents/standards/ENTERPRISE_SAAS_STANDARDS.md) (UI DL 2.0, DB safe DDL, API Pino/Otel, Tests).
- **Governance & Formulation:** [`.agents/governance/ENTERPRISE_SAAS_GOVERNANCE.md`](.agents/governance/ENTERPRISE_SAAS_GOVERNANCE.md) (Mathematical percentage scoring engine).
- **Agent Fleet Personas:** [`.agents/agents/ENTERPRISE_AGENT_FLEET.md`](.agents/agents/ENTERPRISE_AGENT_FLEET.md) (7 specialized autonomous roles).
- **Automated Runner:** Run `pnpm run overtake:market` or `node unierp-workspace/scripts/run-enterprise-saas-engine.mjs`.

## Instruction precedence

Apply the first relevant authority in this order:

1. Law, safety constraints, and the human’s explicit current request.
2. Accepted UniERP ADRs.
3. The owning platform specification under `unierp-platform/docs/platforms/<platform>/`.
4. Cross-platform standards under `unierp-platform/docs/standards/`, including the canonical agent protocol.
5. A repository-local `AGENTS.md` for implementation detail.
6. Repository configuration, tests, README, and contribution guidance.

Do not silently choose when authorities conflict. Preserve the safer behavior, identify the conflict, and request
an owner decision. Existing code is evidence of current behavior, not automatically the intended design.

## Mandatory work loop

1. **Discover:** read applicable instructions; inspect status/diffs, ownership, nearby code, schemas, contracts,
   tests, and available scripts. Search before inventing a new model, endpoint, event, permission, component, or job.
2. **Classify:** identify affected platforms/repositories and rate risk using the canonical protocol. State material
   assumptions. Create a written change contract for high-risk or cross-repository work.
3. **Design:** update the owning requirement/ADR and published contract before implementation when behavior or a
   boundary changes. Define authorization, tenant scope, data lifecycle, failure modes, compatibility, telemetry,
   rollback, and proof.
4. **Implement:** make the smallest coherent change. Follow local types, lint, formatting, architecture, and design
   tokens. Preserve unrelated human work. Do not create parallel sources of truth or speculative abstractions.
5. **Prove:** add tests at the boundary that can fail for the defect. Run focused checks, then every affected gate.
   Never weaken assertions, skip tests, hide errors, or call unrun work “passing.”
6. **Report:** summarize behavior and risk, list changed repositories/files, commands with pass/fail/not-run status,
   migrations or compatibility impact, and residual risks or required human actions.

## Strict cycle status

Every agent cycle—each implementation/review iteration and every handoff—MUST end with exactly one honest status:
`DONE`, `PARTIAL`, `BLOCKED`, `FAILED`, `NOT STARTED`, or `NOT VERIFIED`.

- `DONE` is allowed only when every in-scope acceptance criterion is satisfied, required evidence passed, the diff
  was reviewed, and no required work remains. “Mostly,” “code written,” or “should work” is not `DONE`.
- Any unmet criterion, required `NOT RUN` check, missing consumer, pending migration, unresolved defect, or unverified
  claim makes the status `PARTIAL` or `NOT VERIFIED`, not `DONE`.
- `BLOCKED` names the exact external dependency or missing authority, evidence of the blocker, completed work, and
  what remains. Time, token budget, complexity, or inconvenience alone is not a blocker.
- `FAILED` means the attempted objective was not achieved. Do not euphemize it as partial success.
- Report separately whether work is designed, implemented, tested, integrated, deployed, and released. Never use
  one state as evidence of another.

Each cycle report MUST state: status, objective, completed items, incomplete items, verification evidence, and the
next required action. If the task is not actually complete, say plainly: **“This is not done.”**

Use [`unierp-platform/docs/standards/AI_CHANGE_CONTRACT_TEMPLATE.md`](unierp-platform/docs/standards/AI_CHANGE_CONTRACT_TEMPLATE.md)
for plans and handoffs.
Use [`unierp-platform/docs/standards/AI_AGENT_PLAYBOOKS.md`](unierp-platform/docs/standards/AI_AGENT_PLAYBOOKS.md)
for triggered workflows and
[`unierp-platform/docs/standards/AI_CYCLE_STATUS_TEMPLATE.md`](unierp-platform/docs/standards/AI_CYCLE_STATUS_TEMPLATE.md)
for every cycle report.

## Non-negotiable UniERP rules

- Ownership follows `unierp-platform/docs/PLATFORM_CATALOG.md`; a directory does not define a product boundary.
- Published contracts—not cross-repository source imports—define integrations.
- Verify tenant context server-side. Every tenant-owned persistence path must enforce tenant scope in service logic
  and PostgreSQL RLS and must have positive, negative, and no-context evidence using a `NOBYPASSRLS` role.
- Provider authority (`pcc.*`) and tenant authority (`occ.*`/tenant permissions) must never cross implicitly. UI
  visibility is not authorization. Deny by default at the server.
- Persistent business changes and their events commit atomically through the outbox. Consumers are version-aware,
  idempotent, retryable, and reconcilable.
- Schema changes use immutable migrations and expand/backfill/contract for compatibility. Never use reset, force,
  or destructive database commands against shared or unknown data.
- HTTP, event, SDK, and extension contracts are additive within a major. Breaking changes need a new major,
  migration path, deprecation evidence, and explicit owner approval.
- Money uses decimal amount plus currency; quantities carry units. Posted/approved records use reversal or amendment,
  not silent deletion.
- Secrets, tokens, credentials, personal data, and production records must not enter prompts, source, fixtures,
  logs, screenshots, or reports. Use synthetic/minimized data.
- User-facing work uses `@kannan19302/ui` and approved tokens, implements loading/empty/error/forbidden/offline states
  as relevant, and meets WCAG 2.2 AA with keyboard and assistive-technology evidence.
- A controller, decorator, schema field, page, mocked test, coverage number, or agent claim alone is not proof.
- Never mark a task complete because time/context/budget is ending, because another agent claimed success, or
  because a patch exists. Correct any earlier overstatement immediately and explicitly.

## Human authorization required

Stop before executing any of these unless the human explicitly authorized the exact action and target:

- production/staging mutation, deployment, release, publication, credential rotation, or external message;
- destructive or irreversible data/file operations, database reset, migration rollback, tenant purge, or history rewrite;
- disabling or weakening authentication, authorization, RLS, encryption, audit, validation, rate limits, or tests;
- committing secrets or using real personal/regulated data outside its approved environment;
- a breaking public contract, support-window reduction, accepted-ADR reversal, or cross-platform ownership transfer;
- dependency upgrades with a new license, unresolved critical vulnerability, or material operational cost.

Approval to edit code is not approval to perform these actions.

## Baseline verification

Select commands from the affected repository’s `package.json` and the canonical protocol. At minimum, changed
typed code requires typecheck; behavior requires focused tests; production code requires lint/build when present.
Database changes require generation plus migration and RLS integration evidence. Auth or route changes in `api`
require the security plane gate. UI changes require token, accessibility, and relevant end-to-end checks.

If a check cannot run, report `NOT RUN` and the concrete reason. A pre-existing failure must be reproduced and
reported separately; do not erase or mislabel it.
