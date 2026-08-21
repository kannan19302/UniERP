# UniERP System Requirements (FRS, SRS and NFR)

## Cross-platform functional requirements

- `UNI-FR-001`: The product shall authenticate principals and establish authorized provider/tenant context.
- `UNI-FR-002`: Provider operators shall manage the SaaS estate without using tenant business authority.
- `UNI-FR-003`: Tenant administrators shall govern their tenant without provider-wide access.
- `UNI-FR-004`: Tenant users shall execute supported ERP lifecycles through authoritative business services.
- `UNI-FR-005`: Developers shall use versioned APIs, SDKs and sandboxed extension capabilities.
- `UNI-FR-006`: Tenants shall discover and control marketplace installation lifecycles.
- `UNI-FR-007`: Clients shall present consistent, accessible workflows through the shared design platform.
- `UNI-FR-008`: Operators shall deploy, observe, recover and audit every production platform.

## Non-functional requirements

- `UNI-NFR-001`: Tenant isolation shall be enforced independently at service and persistence boundaries.
- `UNI-NFR-002`: Critical commands shall be idempotent, concurrency-safe and auditable.
- `UNI-NFR-003`: Critical business effects and their outbox events shall commit atomically.
- `UNI-NFR-004`: Each critical journey shall publish availability, latency, recovery and data-loss objectives.
- `UNI-NFR-005`: Public contracts shall be versioned, compatible and deprecated with measured consumers.
- `UNI-NFR-006`: User-facing critical workflows shall meet WCAG 2.2 AA with automated and manual evidence.
- `UNI-NFR-007`: Personal, financial and regulated data shall follow explicit classification and lifecycle policy.
- `UNI-NFR-008`: Releases shall be reproducible, signed, gated, observable and reversible.
- `UNI-NFR-009`: Localization shall preserve currency, decimal, unit, date, time-zone and language semantics.
- `UNI-NFR-010`: Evidence shall distinguish IMPLEMENTED, PARTIAL, DECLARED, UNVERIFIED and GAP.
