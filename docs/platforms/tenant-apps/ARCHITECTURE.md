# Tenant Apps ERP Architecture and TRD

The system uses a tenant web client, shared identity platform, modular backend, centralized data/schema package,
and published contracts. The 45 observed API module directories represent bounded-context candidates, not proof
of clean boundaries. Business invariants belong in backend services and database constraints/transactions.

Cross-module effects shall use transactional state change plus outbox/event processing. Direct client-side
composition cannot guarantee accounting, stock or authorization invariants. Read models may denormalize but
must retain tenant ownership, freshness and source lineage.

Required architecture views: domain/context map, synchronous API graph, event graph, data ownership, trust zones,
critical journey sequences, failure/retry behavior and deployment topology. These remain to be generated from
controllers, services, Prisma schemas and imports.
