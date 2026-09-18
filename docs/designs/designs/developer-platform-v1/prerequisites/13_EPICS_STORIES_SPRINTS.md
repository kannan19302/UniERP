# Delivery plan, epics and scrum operating model

This is a proposed sequence, not a committed calendar. Assign named people and size stories during refinement. The machine-readable backlog has 12 foundation packets and 108 screen-linked stories. Large screen stories are vertical feature slices to split before sprint commitment, not estimates of one-day UI work.

| Wave | Epic | Deliverable | Entry dependency | Exit evidence |
| --- | --- | --- | --- | --- |
| 0 | FND | Accepted readiness remediation and contract alignment | Current governance continuation | FND-01–12 evidence; approved scope |
| 1 | EP-01 Workspace/context | Hosted entry, project/library scope, persistent document tabs | Identity and ownership decisions | Scope-switch, forbidden and unsaved-change proof |
| 2 | EP-02 Compose/reuse | Artifact revision, package, installation and portable lifecycle | FND contract/data/security proof | App and Site pilots through shared services |
| 3 | EP-03 Websites | Page/CMS/content/domain/consent/localization authoring | Site pilot and Tenant Sites contract | Anonymous/private boundary and publish evidence |
| 3 | EP-04 Applications | Forms, data, rules, workflows, dashboards and mobile | App pilot and adapter conformance | Author-save-preview-runtime parity |
| 4 | EP-05 Integrations | API/query/connector/extension/event/job tooling | Sandbox and contract gates | Consumer compatibility, isolation and replay proof |
| 5 | EP-06 Delivery | Test/impact/review/migration/environment/release tools | Immutable candidate lifecycle | Same-bundle promotion and recovery rehearsal |
| 6 | EP-07 Operations | Policy, audit, secrets, supply chain, SLOs and budgets | Security and operations decisions | Runbooks exercised; threat-to-test evidence |

Security, accessibility, telemetry and recovery are acceptance criteria from Wave 0 onward, not work postponed until Wave 6. The final operations wave exposes advanced control surfaces after the underlying controls already work.

## Suggested sprint goals after authorization

Sprint A: complete a constrained App lifecycle from project creation to isolated preview with a tenant denial test. Sprint B: complete Site lifecycle and anonymous field allowlist. Sprint C: install one library package into both permitted consumers, upgrade/rebase with a conflict, then export/import into a clean tenant. Sprint D: prove signed promotion, a failed health probe keeping the serving version, and isolated restore. Replan remaining adapter families using actual throughput and risks; no fixed finish date is implied.

Each sprint starts with an approved goal, refined stories, capacity and dependencies. Daily coordination focuses on blockers and evidence. Mid-sprint review checks integration, not only screenshots. Review demonstrates positive and negative journeys against real services. Retrospective updates process and forecasts; it cannot waive security or quality gates.

## Accountability

Product owns outcomes, scope and acceptance. Architecture owns boundaries, ADR alignment and contract decisions. Frontend and backend owners jointly deliver each vertical story. Data owns migration/RLS proof. Security owns threat acceptance and adversarial evidence. QA owns independent scenario coverage and accessibility coordination. SRE owns operational readiness. Scrum Master tracks dependencies, WIP and impediments; this role cannot approve architecture or production changes by proxy.

Definition of Ready: named owner/reviewer, accepted requirement and boundary, testable action, known data/permissions, dependencies cleared, design/state behavior and recovery identified. Definition of Done: implemented plus all applicable tests/gates, reviewed diff, updated authority/traceability and no required Not run. Designed, coded, integrated, deployed and released are separate states.
