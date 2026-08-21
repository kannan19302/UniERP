# Accessibility Standard

## Target

All user-facing platforms shall meet WCAG 2.2 Level AA for supported workflows. Conformance is scoped and
evidence-based; it is not inferred from using the shared design system.

## Requirements

- `STD-A11Y-001`: Components and pages shall expose correct semantics, names, roles, states and relationships.
- `STD-A11Y-002`: All workflows shall be keyboard operable with visible focus and logical order.
- `STD-A11Y-003`: Text, controls, status and charts shall meet contrast and non-color communication requirements.
- `STD-A11Y-004`: Motion shall respect user preference and avoid seizure/vestibular hazards.
- `STD-A11Y-005`: Forms shall associate labels, instructions, errors and recovery guidance.
- `STD-A11Y-006`: Responsive/reflow, zoom, localization and density/themes shall not remove information or action.
- `STD-A11Y-007`: Evidence shall combine automated checks, keyboard review and representative screen-reader tests.

## Current evidence status

The legacy Design System statement claims zero axe violations across all components/routes and manual NVDA,
VoiceOver and TalkBack testing, but does not include dated reports or current route coverage. Features such as
focus traps, reduced motion and chart fallbacks are implementation leads. Overall conformance remains
`UNVERIFIED`; the statement is migrated as a target and evidence backlog, not retained as certification.
