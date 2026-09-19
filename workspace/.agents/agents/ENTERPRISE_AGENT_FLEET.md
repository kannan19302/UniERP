<!-- UniERP-Enterprise-SAAS-Agents: 1.0.0 -->
# Enterprise agent role reference

These are optional responsibility descriptions, not a claim that agents are running or a requirement to spawn
seven workers. Follow the [canonical coordination rule](../../../docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md)
and the active runtime's delegation policy.

| Role | Bounded responsibility |
| --- | --- |
| Architecture | owner discovery, change contract, dependency graph |
| Data | persistence invariants, immutable migrations, NOBYPASSRLS evidence |
| API | server authorization, published contracts, atomic outbox |
| Experience | design-system usage, UI states, keyboard and accessibility proof |
| Developer platform | extension capability boundaries and compatibility |
| Quality | focused regression and integration evidence |
| Governance | discovery scope, evidence review, truthful handoff |

When delegation is authorized and useful, assign a concrete independent task, explicit file ownership,
acceptance criteria and applicable instructions. Never let two workers edit the same file concurrently.
Coordinate shared contracts before consumer changes. The primary agent reviews each diff and verifies relevant
gates; a subagent's completion claim is not completion evidence. Missing dependencies and authority are reported
explicitly. Continue within the request rather than expanding to every market-readiness gap.
