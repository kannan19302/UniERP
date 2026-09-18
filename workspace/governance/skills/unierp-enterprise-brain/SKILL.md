---
name: unierp-enterprise-brain
description: Apply UniERP's evolving product, platform, architecture, security, data, delivery, and operational knowledge to any planning, implementation, review, audit, migration, or documentation work across the UniERP polyrepo.
metadata:
  short-description: Govern enterprise-grade UniERP development
---

# UniERP Enterprise Brain

Use this skill for every material UniERP task. It is a navigation and decision layer over the authoritative
UniERP documents; it does not replace them or change their precedence.

## Start here

1. Read the workspace `AGENTS.md` and every applicable repository-local `AGENTS.md`.
2. Read [authority and navigation](references/authority-and-navigation.md) to locate the owning product,
   platform, standard, ADR, contract, and evidence.
3. Classify the work under the canonical AI agent protocol before mutation. Create a written change contract for
   R2/R3 work.
4. Read only the additional references required by the task:
   - Cross-domain design, audits, foundation work, or architecture decisions: read
     [enterprise foundation](references/enterprise-foundation.md).
   - Any change that adds or changes product behavior, concepts, ownership, schemas, contracts, permissions,
     infrastructure, operating procedures, or evidence: read
     [knowledge lifecycle](references/knowledge-lifecycle.md).
   - Foundation sequencing or remediation work: read the
     [foundation remediation plan](../../UNIERP_FOUNDATION_REMEDIATION_PLAN.md).
   - Before starting or resuming P0–P3 remediation, read and complete the
     [SaaS prerequisite and readiness audit checklist](../../SAAS_PREREQUISITE_READINESS_AUDIT_CHECKLIST.md).
     Read the current classified
     [SaaS readiness audit report](../../UNIERP_SAAS_READINESS_AUDIT_2026-08-28.md); its development and production
     The audit's broad-development and production `NO-GO` decisions remain binding. Ordered P0 remediation may
     proceed only while the digest-bound [FND-PA-001 owner review](../../FND-PA-001_OWNER_REVIEW.md) is accepted and
     its fail-closed acceptance gate passes.

## Operating contract

- Resolve ownership from `unierp-platform/docs/PLATFORM_CATALOG.md`; never infer it from a directory or import.
- Search before creating any model, aggregate, endpoint, event, webhook, permission, job, configuration key,
  component, metric, notification, or runbook.
- Change intent in the owning requirement/ADR and published contract before changing implementation when behavior
  or a boundary changes.
- Treat existing code, tests, generated inventories, and prior agent reports as evidence, not as authority.
- Extend an existing source of truth when semantics match. Create a new one only with distinct ownership,
  lifecycle, contract, and an accepted decision when required.
- Preserve tenant isolation, provider/tenant authority separation, atomic outbox behavior, additive compatibility,
  immutable migrations, decimal money, durable audit, privacy, accessibility, and recovery invariants.
- Fail closed when a required authority, owner, tenant context, permission, contract, migration, test environment,
  or proof is absent. A check that discovers zero expected targets is a failure, not a pass.
- Keep the enterprise brain current through the knowledge-delta workflow. Do not duplicate implementation facts
  into this skill when they belong in a platform spec, contract, generated catalog, or dated evidence record.
- End every cycle using the strict UniERP status vocabulary and separate designed, implemented, tested,
  integrated, deployed, and released claims.

## Expected output from an agent

For material work, name:

- the human outcome, risk class, accountable platform, data/contract owners, repositories, and consumers;
- inspected authorities and any conflict or assumption;
- security, tenancy, data, contract, UX, operability, compatibility, rollout, rollback, and evidence impact;
- exact verification performed and every required check that was not run;
- the knowledge artifacts updated because the codebase or intended behavior changed.

Run `node unierp-workspace/governance/skills/unierp-enterprise-brain/scripts/validate-brain.mjs` from the workspace
root after changing this skill, its
references, the workspace repository inventory, agent entrypoints, the knowledge lifecycle standard, or the
foundation plan.
