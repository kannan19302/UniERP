# UniERP Code-to-Figma Design System Change Contract

- Status: Active, incremental delivery
- Date: 2026-09-05
- Risk class: R2 — coordinated shared design-system and cross-application UX work
- Accountable platform: Design Platform (`PLT-DS`)
- Primary implementation: `design-system`, `storybook`, `framework`
- Consumers: every UniERP web, mobile and desktop client
- Figma file: [UniERP / Design System — Strata Workbench](https://www.figma.com/design/GP7CXqUlrfHn04raf1Fa48)

## 1. Request and outcome

Create a production-oriented Figma architecture that mirrors the existing `@kannan19302/ui` contract, supports
the complete UniERP product hierarchy, and scales to application-wise registries, workflows, wireframes, states
and high-fidelity designs without creating a parallel component or token system.

The first bounded implementation slice is foundations plus Button, Form Control, Badge/Status,
Skeleton/Loading, Platform Shell and Command Palette. Later slices proceed application by application and module
by module after a source-derived Screen Registry exists.

Acceptance requires code-to-Figma traceability, semantic token bindings, reusable Auto Layout components,
documented responsive/accessibility behavior, validation screenshots, and an honest gap register.

## 2. Authority and ownership

- Product authority: `PRD.md`, `REQUIREMENTS.md`, `EXPERIENCE.md` and accepted Design Platform ADRs.
- Current design-language decision: ADR-0009 declares Strata Workbench authoritative.
- Compatibility authority: ADR-0008 and the current package require Meridian and legacy token compatibility.
- Component and token implementation evidence: `design-system/src`, package exports, stories and tests.
- Business screen meaning, routes and permissions remain owned by their application platforms; Figma does not
  become an authorization or API source of truth.

### Authority discrepancy

ADR-0009 names Strata Workbench as authoritative, but the Design Platform PRD, requirements and experience suite
still name Meridian Workbench as the authoritative/product language. Until the owning documents are reconciled,
Figma uses Strata as the flagship presentation layer while preserving Meridian compatibility mappings. This is a
documented governance gap, not an intentional third design language.

## 3. Current evidence

- 157 source component families were discovered across 17 implementation categories.
- 1,189 Next.js `page.tsx` routes were discovered across tenant apps, provider administration, tenant
  administration, developer platform, marketing, marketplace and tenant-site surfaces.
- Tenant Apps contains 793 discovered pages; its largest modules are CRM (199), Finance (83), Inventory (72),
  Supply Chain (31), HR (28), Projects (26), Procurement (26), Manufacturing (22), POS (21), Sales (20) and
  Analytics (19).
- No repository Code Connect files or authoritative Figma mappings were discovered.
- The new Figma file was empty except for its default page. Material 3 and Simple Design System libraries are
  subscribed, but searches found no UniERP/Strata assets.
- The connected Figma Starter plan permits one variable mode per collection. A Light/Dark/High Contrast
  collection creation was rejected atomically, leaving no partial variable collections.

Counts are dated discovery evidence, not conformance claims. They must be regenerated after topology changes.

## 4. Invariants

- Code tokens and public component APIs remain the implementation source of truth.
- Existing valid components are reused; Figma-only one-off alternatives are prohibited.
- Semantic values alias primitives where Figma plan capabilities permit.
- Every variable has a targeted scope and exact web code syntax using `var(--token)`.
- Components use Auto Layout and expose bounded variants, text/boolean properties and instance swaps where
  applicable.
- Screens are created only after their application Screen Registry is established.
- Provider and tenant authority remain visually and structurally distinct; Figma visibility never proves access.
- Loading, empty, error, forbidden, partial, offline, validation, success and responsive states are represented
  only where relevant.

## 5. Delivery and recovery

Figma work proceeds in validated batches: discovery, foundations, file structure, one component at a time,
integration/QA, then application registries and screen groups. Every created entity uses a deterministic name and
returned node ID. No destructive canvas cleanup is authorized by this contract.

Rollback removes only exact IDs recorded by the Figma state ledger. Repository documentation changes are
reversible independently. No package publication, deployment, release or production mutation is authorized.

## 6. Verification plan

| Claim | Evidence |
| --- | --- |
| Figma structure matches code authority | source path and public API recorded in each component description |
| Variables match code tokens | exact CSS syntax, scope and alias audit |
| Components are reusable | metadata validation plus screenshot review per component |
| Application coverage is systematic | generated route registry with stable IDs and non-empty discovery gates |
| Accessibility is designed | contrast, focus, target, keyboard, reflow and state annotations |
| No parallel system was created | gap/reuse decision recorded before each component |

## 7. Knowledge delta

`UPDATED`: this contract records the Figma delivery architecture, current file identity, discovered inventory,
the Strata/Meridian authority discrepancy and the external plan limitation. It does not redefine component APIs,
tokens, business workflows, permissions or platform ownership.

