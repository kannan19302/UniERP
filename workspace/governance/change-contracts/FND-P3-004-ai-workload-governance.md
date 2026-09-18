# Change Contract — FND-P3-004 AI Workload Governance

## Cycle status

- Status: `PARTIAL` (AI governance Prisma schema models and context budget gates verified; semantic lineage, prompt evaluations, safety red-teaming, cost controls, and fallback in progress)
- Objective: implement AI model registry, prompt versioning, MCP server routing, audit logging, and working context budget enforcement.
- Risk class: `R2` — AI safety, prompt immutability, and context budgets.
- Accountable platforms: Developer Platform and Platform Governance (`PLT-DEV`, `PLT-GOV`).

## Delivered Invariants

1. **AI Governance Schema (`data/prisma/schema/ai-governance.prisma`)**:
   - `AiProviderModel`: Tracks provider models and declared capabilities (`llm.complete`, `chat`, `tools`, `json`).
   - `AiPromptVersion`: Append-only, monotonic versioning of prompt templates with variable replacement.
   - `AiMcpServer`: Secure registry for Model Context Protocol server endpoints and secret references.
   - `AiAuditLog`: Audits token consumption, latency, cost attribution, and prompt hashes.
2. **Context Budget Enforcement**:
   - `check-context-budget.mjs`: Measures non-test code lines and test lines across all 33 modules, ensuring no module regresses past its recorded baseline context budget.

## Verification Evidence

```bash
node scripts/check-context-budget.mjs
```
Context budget gate verified with 0 regressions.
