# Phase 1 Pilot Acceptance Contract

## App Studio pilot

Library Form → install pinned package version into an App → map a typed record interface to an App Data Object → grant least-privilege end-user access → preview with fixture identity/data → validate → create signed release → promote unchanged lockfile → submit data → upgrade with impact diff → roll back.

Evidence required:

- immutable source and package hashes;
- install mapping and capability grant audit;
- visual/source/visual round-trip fixture;
- negative tenant and field-policy tests;
- generated API contract test;
- identical Test/Production lockfile;
- post-deploy smoke result and verified rollback.

## Web Studio pilot

Library Page Section → install pinned package version into a Site → map a typed collection interface to Site CMS → preview responsive/localized states → validate accessibility/SEO → create signed release → publish → upgrade with overlay conflict preview → roll back.

Evidence required:

- immutable source and package hashes;
- CMS mapping and public-data policy audit;
- responsive/accessibility visual suite;
- anonymous/authenticated boundary tests;
- identical Test/Production lockfile;
- public route smoke result and verified rollback.

## Shared exit gate

Both pilots must use the same scope-aware artifact service, package/installation model, dependency solver, release manifest, preview/deployment state machine and conformance harness. A builder-specific shortcut does not satisfy the gate.
