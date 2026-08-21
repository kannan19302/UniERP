# Traceability Standard

Each platform maintains a table with these columns:

| Requirement | Architecture/control | Implementation evidence | Test/operational evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |

Rules:

- A file or route proves presence, not correctness.
- `IMPLEMENTED` requires both mechanism and behavioral evidence.
- A unit test cannot prove cross-service or tenant-isolation behavior unless its boundary matches the claim.
- UI-only pages cannot prove API, authorization, persistence or lifecycle requirements.
- Generated inventories must record generation date and command.
- Missing evidence is `UNVERIFIED` or `GAP`, never inferred as complete.
- Business requirement → functional requirement → architecture/control → code → test must remain navigable in
  both directions.
