# Implementation backlog

The [JSON backlog](STORY_BACKLOG.json) and [CSV import](STORY_BACKLOG.csv) contain 120 initial work packets: FND-01–12 and DEV-001–108. Every selected design has one explicit primary action and negative acceptance condition. All implementation statuses are Not started; no runtime completion is inferred from existing routes or images.

Foundation packets have ordered dependencies. Screen stories depend on FND-12 qualification; individual implementation acceptance still requires the underlying contract/service and relevant owning platform. During refinement, split large stories into contract, service, editor and proof tasks while preserving the vertical acceptance. Do not import these as 108 independent UI-only tickets.

Priority is a proposed sequencing aid. P0 is foundation readiness, P1 prioritizes lifecycle/security/control surfaces and P2 broadens authoring families. Security and accessibility requirements apply to every priority. Estimates remain explicitly uncommitted until named teams review complexity, existing evidence and capacity.

Each story requires actual evidence paths before completion. The CSV is a neutral local import file; it has not been sent to a project-management service. Product and Scrum Master should add accountable people, release scope, estimates and dependency refinements after the current governance entry decision.
