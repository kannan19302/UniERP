<!-- UniERP-Enterprise-SAAS-Workflow: 1.0.0 -->
# Enterprise SaaS delivery workflow

Apply the [canonical protocol](../../../docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md) and
[operational rules](../rules/ENTERPRISE_SAAS_RULES.md). Select the phases touched by the requested outcome.
Documentation-only work does not require inventing database, API or UI changes.

1. Discover: read applicable AGENTS.md files and the enterprise brain; inspect working diffs, owners, package
   manifests, published interfaces and matching tests. Use the workspace inventory rather than copied repo counts.
2. Define: number acceptance criteria, classify risk and knowledge delta, and record the R2/R3 change contract.
   List affected providers and consumers and derive a dependency graph from actual contracts and manifests.
3. Update authority: adjust the owning intent or propose an ADR when required. Accepted ADRs are immutable.
   Update public contracts before their implementations; preserve compatibility and record migration needs.
4. Implement upstream: follow the graph, validate each upstream boundary before consumer migration, and keep
   independent documentation propagation separate from runtime import direction. Preserve user-owned changes.
5. Migrate consumers: use published packages/interfaces. Record a structured handoff at each repository transition,
   including files, contracts, proof, unresolved issues and required downstream work.
6. Verify: run focused tests plus every applicable repository gate. Prove integration at the real boundary;
   record command, working directory, result and environment. A missing environment is NOT RUN, not success.
7. Review and report: inspect the full task diff, update traceability, and report exactly one canonical status
   with acceptance-criterion evidence and remaining work. Commit or push only when explicitly authorized.

## Transaction procedure for state and events

Use the existing transaction helper and outbox API from the owning service. Establish trusted tenant context
inside the transaction; pass the same transaction handle to the business write and outbox insertion. Commit once.
Test rollback when either insertion fails and test consumer deduplication/retry. Publishing after repo.create
returns from its own transaction is not an atomic outbox implementation.

## Required evidence boundaries

- Auth: privileged smoke plus approved limited-role/unauthenticated denial cases; never treat bypass grants as
  evidence that restrictions hold. Do not invent credentials; use approved fixtures or report missing fixtures.
- Data: service scoping and NOBYPASSRLS database tests, including two tenants and no context.
- UI: relevant loading/empty/error/forbidden/offline states, token checks, keyboard and accessibility evidence,
  and the actual end-to-end journey when behavior crosses services.
- Documentation: verify links, scope, authority, executable command locations and discovery counts. Do not
  rewrite historical evidence as current truth or run unrelated business mutations to validate prose.

Global market scores are diagnostics under the [governance guidance](../governance/ENTERPRISE_SAAS_GOVERNANCE.md),
not release proof. Genuine blockers, failed validation and partial completion have explicit reporting paths.
