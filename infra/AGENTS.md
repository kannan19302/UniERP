<!-- UniERP-Agent-Protocol: 1.1.0 -->
# UniERP Nested Unit Agent Entrypoint: Infrastructure (`platform/infra`)

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

- **Sub-Unit**: `platform/infra`
- **Platform Owner**: `PLT-OPS` (Cloud Infrastructure & Reliability Engineering)
- **Architectural Layer**: **Layer 7 (Platform Infrastructure & Operations)**
- **Scope**: Production, staging, and local development infrastructure definitions:
  - Terraform modules (`terraform/modules/*`)
  - Docker Compose topologies (`docker-compose*.yml`)
  - Kubernetes cluster manifests (`k8s/*`)
  - SRE monitoring and alerting policies

---

## 2. Mandatory Protocols Binding

1. **Protocol 1: DEPENDENCY-ORDERED MULTI-REPO EXECUTION** (`DEPENDENCY-ORDERED EXECUTION`): Infrastructure changes must strictly reflect validated architectural decisions from upstream application and database layers.
2. **Protocol 2: EVIDENCE-GATED COMPLETION** (`EVIDENCE-GATED COMPLETION`): No infrastructure change may be declared complete without running terraform validation, linting, or compose dry-runs. Use the 5 standard statuses and publish Iteration Evidence Reports.
3. **Protocol 3: CONTEXT-BOUNDED EXECUTION** (`CONTEXT-BOUNDED EXECUTION`): Maintain focus strictly on the affected cloud or compose manifests. Provide structured handoffs when moving to application deployment testing.
4. **Protocol 4: ACCEPTANCE-CRITERIA-DRIVEN EXECUTION** (`ACCEPTANCE-CRITERIA-DRIVEN EXECUTION`): Decompose infrastructure tasks into explicit numbered criteria (`AC-01`, `AC-02`, ...) verifying config validity, zero plain-text secrets, and least-privilege policies.

---

### Protocol 5: MANDATORY ITERATION COMMIT & PUSH TO GITHUB
At the conclusion of every implementation iteration, once local verification gates have executed cleanly, stage, commit, and push all changes in this repository to GitHub before concluding work or moving to downstream consumers.

## 3. Inviolable Security Rules

- **Zero committed secrets**: Credentials, KMS keys, database root passwords, and private certificates must never exist in git commits.
- **Human authorization required**: Production mutations, DNS rotations, and resource destruction require explicit human authorization.

---

## 4. Verification Gates & Mandatory Toolchain

Before declaring `VERIFIED COMPLETE`, execute:

```powershell
docker compose config
terraform fmt -check
```
