# Documentation Governance

## Purpose

Keep one authoritative statement for every product requirement, platform boundary and contract while retaining
repository-local instructions that developers need.

## Document classes

| Class | Location | Rule |
| --- | --- | --- |
| Product/platform authority | `docs/platforms/` | normative and version-controlled |
| Cross-platform standard | `docs/standards/` | written once and referenced |
| Architecture decision | `docs/adr/` or platform `adr/` | immutable after acceptance; supersede with another ADR |
| Implementation evidence | `docs/evidence/` | generated or dated; never used as intent by itself |
| Repository instructions | repository root | setup, commands and contribution only |
| Historical record | `docs/archive/` or repository history | non-normative; prominently marked |

## Requirement identifiers

`<platform>-<class>-<number>`, for example `PAO-FR-001`, `ERP-NFR-004`, `IAM-SEC-012`.
Classes are `BR` business rule, `FR` functional, `NFR` non-functional, `SEC` security, `DATA`, `API`,
`INT` integration, `UX`, and `OPS`.

Every normative requirement must use `shall`, name an accountable platform, and link to evidence in its
platform `TRACEABILITY.md`. Aspirational copy must not use `shall`.

## Change control

1. Change the owning requirement or ADR first.
2. Update affected architecture and contract documents.
3. Implement and test.
4. Add implementation and test evidence to traceability.
5. Mark status only from inspected evidence.

No phase IDs, agent claims, autonomous-development state, or implementation backlog belongs in the product
documentation source of truth.

## Existing Markdown disposition

Existing documents are not automatically authoritative. During migration each is classified as:

- `KEEP-LOCAL`: repository setup/contribution/security contact information.
- `MIGRATE`: unique product or technical content moved to its owning platform.
- `MERGE`: duplicated content consolidated into one standard.
- `ARCHIVE`: useful history with no normative force.
- `DELETE`: generated, obsolete, empty or contradicted content with no unique evidence.

Deletion requires confirming that no unique contract, operational instruction or compliance evidence would be
lost. Historical Git remains recovery evidence but is not a substitute for deliberate classification.
