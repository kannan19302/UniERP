# Authority and navigation

Read this reference at the start of every material UniERP task.

## Authority order

Apply the first relevant authority in this order:

1. Law, safety constraints, and the human's explicit current request.
2. Accepted ADRs under `unierp-platform/docs/adr/` or an owning platform's `adr/` directory.
3. The owning suite under `unierp-platform/docs/platforms/<platform>/`.
4. Cross-platform standards under `unierp-platform/docs/standards/`.
5. Repository-local `AGENTS.md` instructions.
6. Repository configuration, tests, README, contribution guidance, and current code.

Do not silently resolve a conflict. Preserve the safer and backward-compatible state, document both authorities,
and obtain the accountable owner's decision when precedence does not settle it.

## Mandatory navigation

| Need | Authoritative source |
| --- | --- |
| Product promise, scope and top-level requirements | `unierp-platform/docs/product/` |
| Platform/repository ownership | `unierp-platform/docs/PLATFORM_CATALOG.md` |
| Platform intent and evidence | `unierp-platform/docs/platforms/<platform>/` |
| Cross-platform engineering rules | `unierp-platform/docs/standards/` |
| Accepted architectural decisions | `unierp-platform/docs/adr/` and platform `adr/` directories |
| Agent risk, lifecycle, proof and reporting | `unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md` |
| Knowledge evolution | `unierp-platform/docs/standards/AI_KNOWLEDGE_LIFECYCLE.md` |
| Current repository inventory | `UniERP.code-workspace` |
| Implementation signals | `unierp-platform/docs/evidence/` and platform `evidence/` directories |
| Foundation remediation sequence | `unierp-workspace/governance/UNIERP_FOUNDATION_REMEDIATION_PLAN.md` |

## Find the owner before designing

Map the outcome to the user-facing platform, then identify separately:

- product/requirement owner;
- authoritative data and master-data owner;
- HTTP, event, webhook, SDK, or extension contract owner;
- runtime/service owner;
- UI/client consumers;
- operations, security, privacy, and compliance owners.

A repository may implement several platforms. A platform may span several repositories. A directory name,
controller name, schema filename, or current import does not establish ownership.

## Search before creation

Search authoritative docs, contracts, schemas, route inventories, permission catalogs, events, jobs, components,
configuration and current implementations across all affected repositories. Check semantic matches, not only exact
names. Common duplicate-risk concepts include organization, customer, supplier/vendor, product/item, currency,
unit, document/file, workflow, approval, notification, report, configuration, subscription, entitlement and usage.

If a matching owner exists, extend it additively. If implementations conflict, record the desired owner and a
migration/convergence path; do not add a third source of truth.

## Evidence discipline

- Normative documents state intended behavior.
- Published schemas/contracts define integration boundaries.
- Code and tests show observed implementation.
- Generated inventories show discoverable structure, not correctness.
- Dated runtime evidence proves only the tested build/environment and expires according to its policy.
- A zero-target scan, skipped assertion, mocked-only path, stale baseline, or agent claim is not proof.

When evidence is absent, use `UNVERIFIED` or `GAP`; never infer `IMPLEMENTED` from file presence or volume.
