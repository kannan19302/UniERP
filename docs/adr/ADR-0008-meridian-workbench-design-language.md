# ADR-0008: Meridian Workbench is the UniERP design language

- Status: Accepted
- Date: 2026-09-01
- Decision owner: Design Platform, with Tenant Apps as the primary consuming platform
- Human approval: the project owner approved the audited Meridian Workbench direction and instructed implementation to start and complete on 2026-09-01

## Context

UniERP has a broad shared component package and an emerging Meridian theme, but the durable design intent is split
between legacy evidence, Design Language 1.0 comments, Design Language 2.0 tokens and application-local font and
theme defaults. Tenant applications widely import `@kannan19302/ui`, yet page composition remains inconsistent and
often uses generic card surfaces instead of task-specific enterprise workspaces.

The requested outcome is a modern, scalable and data-dense enterprise experience informed by established design
systems without copying their visual themes. The decision is compatibility-sensitive because the Design Platform
is consumed across the UniERP polyrepo.

## Decision

UniERP adopts **Meridian Workbench** as its authoritative design language.

1. Meridian's signature is operational context: tenant, legal entity, business unit, relevant period, current
   object, lifecycle state and one primary next action are made explicit at the workspace boundary.
2. Product surfaces use a warm-neutral ground, deep desaturated teal interaction accent, restrained semantic
   status colours and low-elevation, separator-led information surfaces. Cards are reserved for genuinely
   independent summaries or choices; they are not the default page container.
3. Typography has three explicit roles: Instrument Sans for restrained display hierarchy, Inter for body and data,
   and Martian Mono for identifiers, versions, addresses and aligned operational metadata. Import order must not
   redefine those roles.
4. Comfortable, standard and compact density are semantic workspace modes. Compact is appropriate for expert
   finance, inventory, procurement, manufacturing and operational work, but never reduces rendered text below
   11 CSS pixels or bypasses accessible pointer/touch behavior.
5. Reusable composition uses seven owned floorplans: Data, Record, Transaction, Operational, Planning, Settings and
   Studio workspaces. Applications configure these patterns; they do not fork their accessibility or layout logic.
6. The package architecture is layered: generated tokens, headless behavior, styled components, enterprise
   controls, floorplans, application adapters and conformance tooling. Consumers use explicit subpath exports.
7. Adoption is additive within the current package major. Legacy exports and token aliases remain until every
   registered consumer is migrated and removal is approved through a new major with deprecation evidence.
8. Runtime rollout is staged at shared application shells and must preserve an immediate compatibility rollback.
   Production release or publication still requires separate human authorization.

## Consequences

- The Design Platform PRD, requirements, architecture, experience, contracts and traceability are the normative
  sources for Meridian Workbench. Legacy UI briefs remain historical evidence only.
- Tenant applications classify each route by floorplan and density instead of solving density page by page.
- Theme, density and platform identity become explicit shell inputs. User preference may override a floorplan
  default where accessibility and device constraints permit.
- Storybook and visual evidence cover Meridian light, dark and high contrast across supported density, direction,
  state and responsive combinations.
- Existing component and token debt is migrated through ratchets; new debt is rejected.
- Implementation remains sequenced by the accepted foundation remediation plan. This ADR does not waive unmet P0
  or P1 dependencies and does not authorize a breaking release.

## Alternatives considered

- **Adopt Carbon or another external theme:** rejected because it would weaken UniERP identity and couple product
  semantics to another system's visual decisions.
- **Replace the shared package:** rejected because the current package already supplies useful tokens, components,
  data controls, floorplans, stories and tests. Convergence is lower risk than a rewrite.
- **Make every tenant route compact:** rejected because density follows task, device and input mode; onboarding,
  public and touch-first experiences require more generous interaction space.
- **Keep page-local composition:** rejected because hundreds of routes cannot maintain coherent accessibility,
  responsive and state behavior independently.

## Verification and review

Conformance is proven only by the requirements and evidence matrix in the Design Platform suite. An ADR, theme
file, component count or passing unit suite alone is not adoption evidence.

