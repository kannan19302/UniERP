# Decision register and development entry gates

This package is a complete scoped design/planning deliverable. It is not owner approval, an accepted ADR change or runtime qualification. The inspected readiness audit records broad development and production NO-GO; accepted FND-PA-001 permits ordered P0 remediation only. Revalidate current evidence before starting any implementation packet.

| ID | Decision / recommendation | Accountable role | Evidence to close | Blocks |
| --- | --- | --- | --- | --- |
| D-01 | Reconcile current readiness and authorized remediation sequence with accepted audit | Architecture + governance owner | Dated continuation decision and linked P0 evidence | Broad feature start |
| D-02 | Preserve one APP or SITE per DevProject; treat multi-project grouping as presentation. Any solution aggregate needs a separate ADR | Product + Architecture | Approved project semantics and route contract | Multi-app/site aggregate persistence |
| D-03 | Accepted portability matrix overrides restrictive frontend registry; align supported owner scopes and conditional dependency rules | Developer owner | Matrix-to-contract-to-registry conformance tests | Library portability expansion |
| D-04 | Publish exact API/event/SDK/extension contracts and permission vocabulary; inventories are observed only | Developer + contract owners | Additive reviewed contract and consumer tests | New API/SDK integration |
| D-05 | Keep Tenant Sites publication/runtime, Identity sign-in, OCC policy and Marketplace commerce with their owners | Owning platform leads | Handoff contracts and failure/authorization proof | Cross-platform journeys |
| D-06 | Resolve template/report subtype mapping without speculative enum additions | Product + metadata architect | Accepted schema/subtype and portability decision | DP-058/059 persistence |
| D-07 | Select approved runtime trust classes, capability budgets, signing/revocation and AI tool policy | Security + runtime owner | Threat closure, sandbox/conformance tests | Third-party/AI execution |
| D-08 | Approve data retention, export redaction, audit custody and recovery policy | Data + Security + SRE | Policy references and restore/reconciliation evidence | Operational release |
| D-09 | Approve measured SLO/workload/capacity and entitlement behavior | SRE + Product + OCC owner | Load report and operational acceptance | SLA/capacity claims |
| D-10 | Name delivery owners, refine estimates, resolve lint/test discovery gaps and qualify both pilots | Engineering + QA + Scrum Master | Runnable gates, pilot evidence, release review | Sprint commitment beyond foundations |

All decision closures are **pending** in this package. Recommendations reuse accepted constraints; a pending implementation alignment decision does not suspend the accepted constraint.

## Gate checklist

G0 authority: approved work scope and current continuation decision. G1 contract: accepted semantics, published additive contract and consumer mapping. G2 environment: disposable fixtures, least-privilege DB role and safe bindings. G3 implementation: focused and affected checks pass. G4 experience: token, keyboard, screen-reader, responsive and failure-state proof. G5 runtime: signed immutable bundle, isolation, compatibility and recovery. G6 operations: approved SLO, runbooks, alert ownership and release-specific authorization.

Begin authorized P0 prerequisite remediation at G0. Broad screen implementation requires the applicable gates and D-01 closure. Production release requires all release gates and exact authorization. This document deliberately does not manufacture a readiness percentage from screen count.
