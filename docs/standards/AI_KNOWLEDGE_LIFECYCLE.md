# AI Knowledge Lifecycle

Status: Active  
Owner: UniERP architecture and engineering governance  
Applies to: the complete UniERP polyrepo, every development agent and every durable development artifact

## Purpose

UniERP's shared product and engineering knowledge shall evolve with the platform. Agents must be able to discover
current intent, ownership, contracts, constraints, operating procedures and evidence without treating a prompt,
repository layout or stale implementation as a source of truth.

The project-level operational adapter is
`unierp-workspace/governance/skills/unierp-enterprise-brain/SKILL.md`. It routes agents
through this policy and the canonical sources; it does not override the authority order in the AI agent
development protocol.

## Normative requirements

- `STD-AIK-001`: Every material change shall classify whether it changes durable product or engineering knowledge.
- `STD-AIK-002`: A knowledge-changing implementation shall update its owning requirement, architecture decision,
  contract, lifecycle/operations document and traceability as applicable. The change is incomplete while a required
  knowledge update remains.
- `STD-AIK-003`: Each durable fact shall have one authoritative owner. Other documents shall link to it rather than
  restate it. Conflicting sources shall be resolved through authority precedence or an owner decision.
- `STD-AIK-004`: Repository location, implementation precedent, generated output, test existence, agent memory and
  prior agent reports shall not redefine product intent or platform ownership.
- `STD-AIK-005`: Repository, model, route, permission, event, contract, dependency, test and operational inventories
  should be generated from their sources. Generated evidence shall record source scope, generation command,
  timestamp or revision, and shall never silently become normative intent.
- `STD-AIK-006`: A validation or evidence gate shall fail if it discovers zero expected targets, uses a stale or
  missing root, skips a required assertion, or cannot establish its prerequisite environment.
- `STD-AIK-007`: Renaming or moving a repository, package, module, contract, command or authority shall update all
  entrypoints, manifests, workflows, scripts, consumers, documentation and evidence in the same coordinated change,
  or provide a versioned compatibility bridge with an owner and expiry.
- `STD-AIK-008`: Deprecation knowledge shall name the owner, replacement, affected consumers, compatibility window,
  migration path, removal criteria and evidence. Historical material shall be explicitly non-normative.
- `STD-AIK-009`: Every R2/R3 change contract shall include a knowledge-delta assessment and identify the exact
  authoritative and evidence artifacts that must change.
- `STD-AIK-010`: Every implementation/review handoff shall report the knowledge delta as `NONE`, `UPDATED`, or
  `REQUIRED-BUT-INCOMPLETE`, including validation results.
- `STD-AIK-011`: The enterprise-brain skill shall contain reusable navigation and decision guidance only. Detailed
  product facts belong to product/platform authorities; implementation inventories belong to generated evidence;
  time-bound work belongs to operational plans.
- `STD-AIK-012`: Architecture governance shall review the enterprise brain at every cross-platform boundary change
  and at least once per release train. Review evidence shall identify the revision and any stale or missing source.

## Knowledge ownership map

| Knowledge type | Owner/location |
| --- | --- |
| Product promise and top-level outcomes | `docs/product/` |
| Platform scope, users and requirements | `docs/platforms/<platform>/` |
| Cross-platform standards | `docs/standards/` |
| Durable architecture decisions | accepted ADRs |
| HTTP, event, webhook, SDK and extension behavior | owning published contract package/specification |
| Domain and master-data semantics | owning platform architecture/data contract |
| Repository and package topology | root workspace inventory and generated dependency/release manifests |
| Implementation observations | dated/generated `docs/evidence/` or platform evidence |
| Operating procedure | owning platform operations document and runbook |
| Time-bound sequencing and backlog | operational governance plans, not product authority |
| Reusable agent navigation/decision procedure | `unierp-workspace/governance/skills/unierp-enterprise-brain/` |

## Required change sequence

1. Discover the current authorities, consumers, implementation, evidence and working diffs.
2. Identify the accountable platform and every data/contract/operations owner.
3. Record the knowledge delta in the change contract.
4. Update intended behavior and accepted decisions before implementation where behavior or a boundary changes.
5. Update contracts before their producers and consumers.
6. Implement and prove the behavior at its risk boundary.
7. Refresh traceability and generated inventories from inspected evidence.
8. Validate links, discovery scope and entrypoints; zero-target success is prohibited.
9. Report exact completion state and any required-but-incomplete knowledge.

## Freshness and retirement

- Normative documents are reviewed when their behavior, owner or boundary changes.
- Generated inventories are regenerated when their source changes and may carry an explicit expiry.
- Runtime, accessibility, performance, recovery and compliance evidence is bound to a build and environment.
- Superseded normative documents link to their replacement; accepted ADRs are superseded, not rewritten.
- Archives and experiments are excluded from active inventories and visibly marked non-normative.
- A stale path, package identity or repository name is a defect because it can create false-green governance.

## Verification

The project skill validator is:

```powershell
node unierp-workspace/governance/skills/unierp-enterprise-brain/scripts/validate-brain.mjs
```

It verifies the project-level skill bundle, mandatory authorities, plan, repository inventory and repository agent
entrypoints. It complements, rather than replaces, the canonical protocol and repository-specific gates.
