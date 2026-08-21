# Quality and Testing Evidence Standard

## Test taxonomy

Unit, controller, guard/policy, integration, tenant-isolation, property/invariant, migration, contract,
end-to-end journey, mobile/widget, accessibility, visual, performance, security, resilience/chaos and recovery.
Classification follows what a test can prove, not its filename.

## Requirements

- `STD-QA-001`: Every requirement shall link to evidence whose boundary matches the claim.
- `STD-QA-002`: Every gate shall be observed failing on a representative defect before it is trusted.
- `STD-QA-003`: Tenant resources shall have two-tenant negative tests at service and persistence boundaries.
- `STD-QA-004`: Money, stock, lifecycle and authorization invariants shall have property or adversarial tests.
- `STD-QA-005`: Provider/consumer contracts shall run against published schemas and supported versions.
- `STD-QA-006`: Critical user journeys shall exercise real UI, API, IAM and persistence boundaries.
- `STD-QA-007`: Migrations shall test production-shaped data, lock/duration, forward and rollback/roll-forward behavior.
- `STD-QA-008`: Accessibility requires automated and manual evidence; automated axe results alone cannot prove full conformance.
- `STD-QA-009`: Coverage percentage is supporting evidence only; assertions must fail when behavior breaks.

The legacy taxonomy reported counts for 620 tests and explicitly identified absent mutation, manual, visual,
security, chaos/recovery and load disciplines. Counts have changed in the live polyrepo and must be regenerated;
the historical numbers are not current evidence.
