# UniERP documentation

[Product goal and first-release scope](product/PRD.md) is the starting point.
[ADR-0012](adr/ADR-0012-polyrepo-consolidation-to-14-core-roots.md) defines the
14 active Git roots; the [platform catalog](PLATFORM_CATALOG.md) assigns product
ownership. The [active estate](../workspace/governance/active-estate.json) and
`UniERP.code-workspace` identify current repositories. Do not use historical
repository names or file counts as current readiness evidence.

## One owner for each kind of knowledge

| Question | Owning source |
| --- | --- |
| Product promise, customers, release scope and success | [Product PRD](product/PRD.md) and product requirements |
| Durable architecture choice | [Accepted ADRs](adr/README.md) |
| A platform's actors, behavior and non-functional requirements | `platforms/<owner>/PRD.md` and `REQUIREMENTS.md` |
| Runtime design, data flow and trust boundary | Owning platform `ARCHITECTURE.md` |
| Published HTTP, event, SDK and extension behavior | Owning versioned contract and platform `CONTRACTS.md` |
| Cross-platform engineering or security rule | [Standards](standards/README.md) |
| Agent workflow and repository coding rule | Workspace `AGENTS.md` and the one `AGENTS.md` at each active Git root |
| Implementation observation and test result | Dated `evidence/` record tied to a revision |
| Deployment, recovery and support | Owning `OPERATIONS.md` and runbook |

The accepted [documentation authority decision](adr/ADR-0001-platform-documentation-authority.md)
keeps these distinct sources. Minimal documentation means one authoritative owner
per fact and short navigation, not deletion of contracts, ADRs or release proof.
Before archiving a duplicate, classify its owner, backlinks and unique content.
Historical and generated material is non-authoritative and must say so clearly.

The [knowledge lifecycle](standards/AI_KNOWLEDGE_LIFECYCLE.md) governs updates.
Agent instructions are in the [canonical protocol](standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md)
and routed by the [unierp-enterprise-brain](../workspace/governance/skills/unierp-enterprise-brain/SKILL.md).
The product/platform files remain authoritative when code or agent guidance differs;
record that difference as a gap. A route, module, document or score does not prove
a customer journey or production readiness.
