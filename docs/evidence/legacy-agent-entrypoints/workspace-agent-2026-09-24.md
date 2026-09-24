> Historical, non-authoritative agent instruction. Current rules are in workspace AGENTS.md and platform/AGENTS.md.

<!-- UniERP-Agent-Protocol: 1.1.0 -->
# UniERP Nested Unit Agent Entrypoint: Workspace Toolchain (`platform/workspace`)

This operational sub-unit is part of the `platform` repository in the UniERP polyrepo. Before analysis, planning, review, or mutation, every AI agent from every provider MUST read and follow:

1. the workspace entrypoint at [`../../AGENTS.md`](../../AGENTS.md);
2. the parent repository entrypoint at [`../AGENTS.md`](../AGENTS.md);
3. the canonical standard at
   [`../docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](../docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md);
4. the owning platform documents selected through
   [`../docs/PLATFORM_CATALOG.md`](../docs/PLATFORM_CATALOG.md).

If the workspace entrypoint or canonical standard is unavailable, the protocol bundle is incomplete. The agent MUST stop before mutation and report the missing dependency.

---

## 1. Unit Identity, Architectural Layer & Mission

- **Sub-Unit**: `platform/workspace`
- **Platform Owner**: `PLT-OPS` (Workspace Governance & Architecture)
- **Architectural Layer**: **Layer 7 (Platform Governance & Operations)**
- **Scope**: Polyrepo architectural governance, layer verification, estate catalog validation, and agent protocol integrity:
  - Governance scripts (`scripts/*.mjs`)
  - Governance catalogs (`governance/active-estate.json`, `governance/AGENTS.md`)
  - CI verification workflows (`.github/workflows/*`)

---

## 2. Mandatory Protocols Binding

1. **Protocol 1: DEPENDENCY-ORDERED MULTI-REPO EXECUTION** (`DEPENDENCY-ORDERED EXECUTION`): Governance scripts evaluate dependency order across all 14 repositories. Modifying governance rules or estate catalogs must be executed in lockstep with canonical documents.
2. **Protocol 2: EVIDENCE-GATED COMPLETION** (`EVIDENCE-GATED COMPLETION`): No change to workspace governance scripts may be declared complete without executing the relevant test script. Use the 5 standard statuses and publish Iteration Evidence Reports.
3. **Protocol 3: CONTEXT-BOUNDED EXECUTION** (`CONTEXT-BOUNDED EXECUTION`): Focus strictly on the affected script or governance rule. Maintain structured handoffs.
4. **Protocol 4: ACCEPTANCE-CRITERIA-DRIVEN EXECUTION** (`ACCEPTANCE-CRITERIA-DRIVEN EXECUTION`): Define numbered criteria (`AC-01`, ...) ensuring fail-closed behavior, backward compatibility, and zero false positives.

---

### Protocol 5: MANDATORY ITERATION COMMIT & PUSH TO GITHUB
At the conclusion of every implementation iteration, once local verification gates have executed cleanly, stage, commit, and push all changes in this repository to GitHub before concluding work or moving to downstream consumers.

## 3. Verification Gates & Mandatory Toolchain

Before declaring `VERIFIED COMPLETE`, execute and record clean results for:

```powershell
node scripts/test-estate.mjs
node scripts/check-active-estate-catalog.mjs
node scripts/test-layer.mjs
node scripts/check-ai-agent-protocol.mjs
node scripts/test-ai-agent-protocol.mjs
```
