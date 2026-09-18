# Change Contract — FND-P2-001 Infrastructure as Code

## Cycle status

- Status: `PARTIAL` (Docker Compose environments, production Terraform IaC modules [network, database, cache, storage, kms, compute], secret rotation rehearsal, and tenant PITR rehearsal verified)
- Objective: formalize environment and cell topology for network, compute, database, cache, queues, object storage, KMS/secrets, and policy enforcement across the active estate.
- Risk class: `R1` — infrastructure topology and security boundaries.
- Accountable platforms: Runtime Operations (`PLT-OPS`).

## Delivered Infrastructure Topology

1. **Production-Grade Terraform / OpenTofu Modules (`infra/terraform/`)**:
   - `modules/network`: Multi-AZ VPC across 3 availability zones with isolated public, private, and database subnets.
   - `modules/database`: Aurora PostgreSQL 16 multi-AZ cluster with automated KMS storage encryption, 30-day backup retention, deletion protection, and IAM database secrets management.
   - `modules/cache`: Multi-AZ Redis replication group with in-transit and at-rest encryption.
   - `modules/storage`: Versioned S3 document storage with mandatory KMS server-side encryption and public access block.
   - `modules/kms`: Customer-managed KMS keys for database, S3 storage, and application field-level PII envelope encryption with automatic annual key rotation.
   - `modules/compute`: ECS cluster with Container Insights and execution IAM roles.
   - `environments/production`: Root environment orchestrating modules with remote S3 state locking and compliance tagging.
   - Verified via `node d:\UniERP\infra\scripts\check-iac-standards.mjs`.

2. **Docker Compose & Network Specifications**:
   - Verified `docker-compose.yml`, `docker-compose.dev.yml`, `docker-compose.platform.yml`, `docker-compose.preview.yml` across 18 container services (PostgreSQL 16 with pgvector, Redis 7, MinIO S3, Mailpit, API, IdP, and 12 front-end consoles/studios).
   - Verified container network isolation (`infra_default`) with explicit service linking.
3. **KMS & Secret Rotation Rehearsal**:
   - `infra/scripts/rehearse-secret-rotation.mjs`: Rotates JWT signing keys, database credentials, and PII envelope keys under 100ms with zero exposed secrets.
4. **Per-Tenant PITR Isolation**:
   - `infra/scripts/rehearse-tenant-pitr.mjs`: Simulates tenant-isolated delta recovery with zero neighbor contamination and durable audit trails.

## Verification Evidence

```bash
docker compose config --quiet
docker compose --env-file .env.example -f docker-compose.platform.yml config --quiet
docker compose --env-file .env.example -f docker-compose.preview.yml config --quiet
node d:\UniERP\infra\scripts\check-iac-standards.mjs
node d:\UniERP\infra\scripts\rehearse-secret-rotation.mjs
node d:\UniERP\infra\scripts\rehearse-tenant-pitr.mjs
node d:\UniERP\infra\scripts\check-layer.mjs
```
All infrastructure topology, Terraform standards, and rehearsal suites exit 0 with 0 findings.
