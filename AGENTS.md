<!-- UniERP-Agent-Protocol: 1.1.0 -->
# UniERP Repository Agent Entrypoint: Platform Operations (`platform`)

This repository is one delivery unit in the UniERP polyrepo. Before analysis, planning, review, or mutation, every
AI agent from every provider MUST read and follow:

1. the workspace entrypoint at [`../AGENTS.md`](../AGENTS.md);
2. the canonical standard at
   [`../platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](../platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md);
3. the owning platform documents selected through
   [`../platform/docs/PLATFORM_CATALOG.md`](../platform/docs/PLATFORM_CATALOG.md).

If the workspace entrypoint or canonical standard is unavailable, the protocol bundle is incomplete. The agent
MUST stop before mutation and report the missing dependency. This bootstrap adds no weaker or conflicting rules.
Repository-specific additions may be appended below only when they narrow implementation behavior without
redefining platform ownership, security, contracts, or cross-platform standards.

---

## 1. Repository Identity & Mission

- **Repository**: `platform`
- **Platform Owner**: `PLT-OPS` (Cloud Infrastructure & Reliability Engineering)
- **Architectural Layer**: **Layer 7 (Platform Infrastructure & Operations)**
- **Mission**: Home of the UniERP cloud infrastructure as code (Terraform, Docker Compose, Kubernetes manifests), SRE alerting policies, observability stacks, and enterprise architecture governance tooling (`workspace/`).

---

## 2. Infrastructure Security & Safety Rules

1. **Zero Production Mutation Without Human Authorization**:
   - Automated scripts must NEVER perform irreversible production deletions, database resets, or DNS mutations.
2. **Infrastructure as Code (IaC) Standards**:
   - Terraform modules in `infra/terraform/modules/*` must be strictly parameterized, versioned, and immutable.
   - Zero hardcoded passwords, tokens, or encryption keys in compose files or terraform definitions.
3. **Sensitive Workspace Hygiene**:
   - `.env` files with secret-bearing names must remain strictly quarantined (`.quarantine/`) or excluded from source control.

---

## 3. Governance Toolchain & Verification

The `workspace/scripts/` directory hosts the 24 canonical architectural and governance gates that enforce fail-closed verification across the entire 14-repository estate.

---

## 4. Verification Gates & Mandatory Toolchain

Before declaring any cycle `DONE`, run and verify:

```powershell
node workspace/scripts/check-active-estate-catalog.mjs
node workspace/scripts/check-repository-toolchain-policy.mjs
node workspace/scripts/check-sensitive-workspace-hygiene.mjs
node workspace/scripts/check-control-center-route-ownership.mjs --verify-boundaries
node workspace/scripts/check-control-center-shell-manifests.mjs
node workspace/scripts/test-layer.mjs
```
