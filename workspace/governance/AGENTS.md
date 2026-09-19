<!-- UniERP-Agent-Protocol: 1.1.0 -->
# UniERP Development Agent Protocol

This file is the mandatory, provider-neutral entry point for every AI coding agent working anywhere in the
UniERP polyrepo. “Agent” includes interactive assistants, autonomous agents, IDE agents, review bots, and
subagents from any provider. Read this file before planning or changing anything.

The canonical policy is
[`platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md).
Its clauses are mandatory. The machine-readable profile is
[`platform/docs/standards/AI_AGENT_PROTOCOL.json`](platform/docs/standards/AI_AGENT_PROTOCOL.json).

## Project-level enterprise brain

Before material analysis, planning, review or mutation, every agent MUST read and apply the project skill at
[`platform/workspace/governance/skills/unierp-enterprise-brain/SKILL.md`](platform/workspace/governance/skills/unierp-enterprise-brain/SKILL.md). The skill is the shared operational
navigation and decision layer for product vision, platform boundaries, enterprise architecture, domains, data,
security, contracts, experience, delivery, operations and governance. It does not override the instruction
precedence below or duplicate owning platform specifications.

Every material change MUST classify its knowledge delta and follow
`platform/docs/standards/AI_KNOWLEDGE_LIFECYCLE.md`, so authoritative knowledge,
contracts, traceability and evidence evolve with the codebase. If the project skill or knowledge-lifecycle standard
is unavailable, the governance bundle is incomplete; stop before mutation and report the missing dependency.

## Enterprise SAAS Master Standards (Market Dominance & 11 Pillars)

Every AI agent working in this polyrepo must strictly adhere to the 11 pillars of the **Enterprise SAAS business platform** standard to achieve global market leadership:

- **Rules & Inviolable Laws:** [`.agents/rules/ENTERPRISE_SAAS_RULES.md`](.agents/rules/ENTERPRISE_SAAS_RULES.md) (Scoped iteration, truthful production data, PostgreSQL RLS, and server-side authorization).
- **End-to-End Workflow:** [`.agents/workflow/ENTERPRISE_SAAS_WORKFLOW.md`](.agents/workflow/ENTERPRISE_SAAS_WORKFLOW.md) (7-phase multi-repo delivery from L0 Contracts to L7 Operations).
- **Operational Skill:** [`.agents/skills/salesforce-overtake-engine/SKILL.md`](.agents/skills/salesforce-overtake-engine/SKILL.md) (Run scripts, 10 super-platform moats, and recipes).
- **Knowledge Base & Blueprints:** [`.agents/knowledge/SALESFORCE_OVERTAKE_KNOWLEDGE_BASE.md`](.agents/knowledge/SALESFORCE_OVERTAKE_KNOWLEDGE_BASE.md) (Market parity matrix & 15 industry clouds).
- **Memory & Progress Ledger:** [`.agents/memory/ENTERPRISE_SAAS_EXECUTION_LEDGER.json`](.agents/memory/ENTERPRISE_SAAS_EXECUTION_LEDGER.json) (Real-time progress percentage tracking).
- **Execution Flow:** [`.agents/flow/EXECUTION_FLOW_STATE_MACHINE.md`](.agents/flow/EXECUTION_FLOW_STATE_MACHINE.md) (Automated self-healing remediation loop).
- **Reference Blueprints:** [`.agents/reference/ENTERPRISE_SAAS_REFERENCE_MANUAL.md`](.agents/reference/ENTERPRISE_SAAS_REFERENCE_MANUAL.md) (8 Strata floorplans, NestJS module, RLS tests).
- **Quality Standards:** [`.agents/standards/ENTERPRISE_SAAS_STANDARDS.md`](.agents/standards/ENTERPRISE_SAAS_STANDARDS.md) (UI DL 2.0, DB safe DDL, API Pino/Otel, Tests).
- **Governance & Formulation:** [`.agents/governance/ENTERPRISE_SAAS_GOVERNANCE.md`](.agents/governance/ENTERPRISE_SAAS_GOVERNANCE.md) (Mathematical percentage scoring engine).
- **Agent Fleet Personas:** [`.agents/agents/ENTERPRISE_AGENT_FLEET.md`](.agents/agents/ENTERPRISE_AGENT_FLEET.md) (7 specialized autonomous roles).
- **Automated Runner:** Inspect `platform/workspace/scripts/run-enterprise-saas-engine.mjs` before running it. Its score is diagnostic evidence, not task completion; see [.agents/governance/ENTERPRISE_SAAS_GOVERNANCE.md](.agents/governance/ENTERPRISE_SAAS_GOVERNANCE.md).

## Universal Agent Testing Account (Mandatory for E2E, Browser Subagents, and MCP)

All AI agents from all providers (interactive assistants, autonomous background workers, browser subagents, Playwright E2E suites, and Chrome DevTools MCP sessions) MUST use the following common testing account whenever authenticating or testing any UI or API surface across the UniERP ecosystem:

- **Email**: `test.agent@unierp.com`
- **Password**: `TestAgent123!`
- **Role**: `SUPER_ADMIN` (Universal bypass permissions `*` across all modules: Finance, Sales, CRM, HR, Inventory, Procurement, Settings)
- **Tenant Scope**: Default Enterprise Tenant (`Acme Corp`, slug: `acme`, tenantId: `00000000-0000-0000-0000-000000000001`)

Do NOT invent arbitrary test email addresses or credentials. This account is permanently seeded into `data/prisma/seed.ts` and configured across all test fixtures.

## Instruction precedence

Apply the first relevant authority in this order:

1. Law, safety constraints, and the human’s explicit current request.
2. Accepted UniERP ADRs (e.g. ADR-0012 14-Root Consolidation).
3. The owning platform specification under `platform/docs/platforms/<platform>/`.
4. Cross-platform standards under `platform/docs/standards/`, including the canonical agent protocol.
5. A repository-local `AGENTS.md` for implementation detail.
6. Repository configuration, tests, README, and contribution guidance.

Do not silently choose when authorities conflict. Preserve the safer behavior, identify the conflict, and request
an owner decision. Existing code is evidence of current behavior, not automatically the intended design.

---

# Mandatory Execution Protocols

Every coding agent operating in this workspace must strictly follow these four permanent engineering execution protocols:

## Protocol 1: DEPENDENCY-ORDERED MULTI-REPO EXECUTION

**Keyword:** `DEPENDENCY-ORDERED EXECUTION`

For any task affecting multiple repositories, agents MUST NOT modify repositories in arbitrary order. Changes must strictly flow downwards from upstream dependencies to downstream consumers.

### Required Workflow
```
TASK
  ↓
IMPACT ANALYSIS
  ↓
DEPENDENCY DISCOVERY
  ↓
DEPENDENCY GRAPH
  ↓
UPSTREAM CHANGES
  ↓
UPSTREAM VALIDATION
  ↓
DOWNSTREAM CONSUMER MIGRATION
  ↓
CONSUMER VALIDATION
  ↓
CROSS-REPOSITORY INTEGRATION VALIDATION
  ↓
FINAL VERIFIED COMPLETION
```

### Pre-Implementation Dependency Discovery
Before writing code or mutating files, determine:
- Repositories affected
- Direct dependencies
- Transitive dependencies
- Upstream providers
- Downstream consumers
- Contracts/interfaces affected
- Migration requirements
- Compatibility risks
- Required execution order

Never assume repository order. Derive it from actual package dependencies in the workspace:
- **Contract/API Changes:** `CONTRACT (L0)` $\rightarrow$ `PROVIDER (L3 api/idp)` $\rightarrow$ `CONSUMER (L4/L5)` $\rightarrow$ `INTEGRATION VALIDATION`.
- **Database/Persistence Changes:** `CONTRACTS (L0)` $\rightarrow$ `DATA (L2)` $\rightarrow$ `BACKEND / SERVICES (L3)` $\rightarrow$ `PRESENTATION (L4)` $\rightarrow$ `CLIENTS (L5)`.
- **Design System Changes:** `DESIGN SYSTEM (L1)` $\rightarrow$ `BUILD/TEST/VALIDATE DESIGN SYSTEM` $\rightarrow$ `PRESENTATION APPS (L4)` $\rightarrow$ `CROSS-REPO VERIFICATION`.

Do NOT start modifying consumers before the required upstream dependency is ready and verified, unless parallel execution has been explicitly proven safe.

### Multi-Repository Checkpoint State
For cross-repository tasks, maintain and update this state after every major repository transition:
```text
MULTI-REPO TASK STATE
Task: <task description>
Acceptance criteria: <count>
Repositories affected: <list>
Dependency order:
  1. <upstream-repo>
  2. <midstream-repo>
  3. <downstream-repo>
Completed repositories: <list>
Current repository: <repo>
Pending repositories: <list>
Validation state: <state>
Blockers: <list>
Overall status: <status>
```

---

## Protocol 2: EVIDENCE-GATED COMPLETION

**Keyword:** `EVIDENCE-GATED COMPLETION`

Agents are STRICTLY PROHIBITED from claiming completion (`Done`, `Complete`, `Fixed`, `Successfully implemented`, `Fully working`, `Production ready`, `Validation passed`) unless objective, verifiable evidence exists.

- Implementation is NOT completion.
- Code generation is NOT completion.
- Saving a file is NOT completion.
- A successful command unrelated to the acceptance criteria is NOT completion.

### Strict Status Categories
Every implementation iteration and handoff MUST end with EXACTLY ONE truthful status category:
1. `VERIFIED COMPLETE`: All in-scope acceptance criteria are satisfied, all required validation gates passed with clean output, diff has been reviewed, and zero required work remains. (Maps to protocol `DONE`).
2. `IMPLEMENTED — VERIFICATION PENDING`: Code changes have been made, but required automated tests or verification gates have not yet been executed. (Maps to protocol `NOT VERIFIED`).
3. `PARTIALLY COMPLETE`: Concrete in-scope work is complete, but one or more acceptance criteria, consumers, or gates remain unfinished. (Maps to protocol `PARTIAL`).
4. `BLOCKED`: Progress cannot continue due to an explicit external dependency, missing environment capability, or missing authority. Names the exact blocker. (Maps to protocol `BLOCKED`).
5. `FAILED VALIDATION`: An implementation or verification step was executed and failed tests, build, lint, or typecheck. (Maps to protocol `FAILED`).

If a command cannot be executed, explicitly state `VERIFICATION NOT EXECUTED` and provide the concrete technical reason. Never fabricate test results, never infer success from code appearance, and never hide failures.

### Iteration Evidence Report
At the end of EVERY implementation iteration, output:
```text
============================================================
ITERATION EVIDENCE REPORT
============================================================
STATUS:
<VERIFIED COMPLETE | IMPLEMENTED — VERIFICATION PENDING | PARTIALLY COMPLETE | BLOCKED | FAILED VALIDATION>

CHANGES:
- <file path> (<repository>)

VALIDATION EXECUTED:
- <exact command executed with cwd>

RESULTS:
- Passed: <count / details>
- Failed: <count / details>
- Warnings: <count / details>

ACCEPTANCE CRITERIA:
- [PASS] <criterion>
- [FAIL] <criterion>
- [NOT VERIFIED] <criterion>

REMAINING WORK:
- <concrete unfinished items or "None">

NEXT ACTION:
- <exact next executable step or "Handoff/Complete">
============================================================
```

Do not use vague statements such as "Everything should work", "It appears complete", "This should resolve the issue", or "Likely fixed". Replace assumptions with verification.

---

## Protocol 3: CONTEXT-BOUNDED EXECUTION

**Keyword:** `CONTEXT-BOUNDED EXECUTION`

Do NOT continuously load or reason over the entire multi-repository workspace unnecessarily. Maintain two disciplined context levels:

### Level 1 — Global Context
Keep a compact understanding of:
- Platform architecture & 14 canonical roots
- Repository map & layer hierarchy (L0 to L7)
- Published contracts & package identities
- Current task & global goal
- Completed repositories vs outstanding work

### Level 2 — Active Repository Context
Load detailed information only for:
- Current active repository
- Directly relevant upstream dependency contracts
- Directly affected downstream consumers
- Specific files required for the current task

### Structured Repository Handoff
When switching execution from one repository to another, generate a structured handoff:
```text
STRUCTURED HANDOFF
Completed: <work completed in current repo>
Dependencies changed: <dependencies mutated>
Contracts changed: <contracts or public interfaces modified>
Files changed: <list of files>
Validation performed: <commands run and results>
Known issues: <unresolved issues or warnings>
Downstream impact: <impact on downstream consumers>
Next repository: <target repository name>
Next task: <specific task in next repo>
Required context: <files or types needed in next repo>
```

Context-bounded execution MUST NOT cause dependency impacts to be ignored. Efficiency must never override correctness.

---

## Protocol 4: ACCEPTANCE-CRITERIA-DRIVEN EXECUTION

**Keyword:** `ACCEPTANCE-CRITERIA-DRIVEN EXECUTION`

Before implementation, convert the user's request into explicit, testable, and numbered acceptance criteria (`AC-01`, `AC-02`, ...).

### Criterion State Model
Each criterion must track one of four states:
- `PASS`: Objective evidence confirms the criterion is fully satisfied.
- `FAIL`: Verification ran and failed to satisfy the criterion.
- `BLOCKED`: Verification cannot proceed due to an identified external blocker.
- `NOT VERIFIED`: Code may be written, but verification has not yet been executed.

A task CANNOT become `VERIFIED COMPLETE` while mandatory acceptance criteria remain `FAIL`, `BLOCKED`, or `NOT VERIFIED`, unless those criteria were explicitly removed or deferred by the user.

---

## Protocol 5: MANDATORY ITERATION COMMIT & PUSH TO GITHUB

**Keyword:** `MANDATORY COMMIT AND PUSH`

At the end of EVERY implementation iteration, once all in-scope changes have been verified and the Iteration Evidence Report has been generated, the agent MUST:
1. Review `git status` and the complete diff across all modified repositories.
2. Stage all modified and newly created in-scope files (`git add .` or explicit paths).
3. Create a structured, descriptive commit message documenting the task, status, affected repositories, and verification evidence.
4. Push all commits to the remote GitHub repository (`git push origin <branch>`).
5. Verify that the push succeeded cleanly before declaring verified completion or concluding the iteration.

---

## Combined Execution Protocol Workflow

For every non-trivial task, follow this combined sequence:
```
REQUEST
   ↓
ACCEPTANCE CRITERIA
   ↓
IMPACT ANALYSIS
   ↓
DEPENDENCY GRAPH
   ↓
EXECUTION PLAN
   ↓
DEPENDENCY-ORDERED IMPLEMENTATION
   ↓
REPOSITORY VALIDATION
   ↓
STRUCTURED HANDOFF
   ↓
NEXT DEPENDENCY/CONSUMER
   ↓
CROSS-REPO VALIDATION
   ↓
EVIDENCE REVIEW
   ↓
GIT COMMIT & PUSH TO GITHUB
   ↓
VERIFIED COMPLETION
```

- **Dependency-Ordered Execution** determines WHERE and IN WHAT ORDER work occurs.
- **Acceptance-Criteria-Driven Execution** determines WHAT SUCCESS MEANS.
- **Context-Bounded Execution** determines WHAT CONTEXT SHOULD BE LOADED.
- **Evidence-Gated Completion** determines WHETHER THE AGENT IS ALLOWED TO CLAIM COMPLETION.
- **Mandatory Commit & Push** guarantees all verified changes are safely persisted to remote version control.

---

## Agent Behavioral Rules

### Agents MUST:
- Inspect before modifying
- Plan before large changes
- Understand dependency direction (downward only)
- Preserve architectural boundaries and package layering
- Use existing project conventions
- Make minimal necessary changes
- Validate each dependency boundary before progressing downstream
- Report failures truthfully
- Maintain structured handoffs between repositories
- Distinguish implementation from verification
- Distinguish local repository success from system-wide success
- Stage, commit, and push all verified changes across affected repositories to GitHub at the end of each iteration

### Agents MUST NOT:
- Claim completion based solely on generated code
- Fabricate command or test execution
- Silently skip validation
- Modify unrelated repositories
- Perform arbitrary cross-repository changes out of dependency order
- Ignore downstream consumers
- Assume compilation means functional correctness
- Mark TODOs as completed work
- Hide unresolved errors
- Weaken tests merely to obtain a passing result
- Delete failing tests without justification
- Bypass architectural boundaries for convenience

---

## Non-negotiable UniERP rules

- Ownership follows `platform/docs/PLATFORM_CATALOG.md`; a directory does not define a product boundary.
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

## Applying operational guidance

Paths in this workspace entrypoint are relative to the workspace root, including when reading its maintained
copy under platform/workspace/governance. Operational recipes and ledgers are subordinate to the canonical
protocol. Scope completion to the requested acceptance criteria; in accordance with the mandatory iteration commit and push rule, agents must stage, commit, and push all verified changes across affected repositories to GitHub at the conclusion of each iteration.
The shared privileged account is for approved smoke testing. Authorization-denial and RLS evidence require
approved limited-role fixtures and a NOBYPASSRLS database role; do not invent credentials or treat bypass success
as isolation proof. Report missing fixtures without weakening the check.
