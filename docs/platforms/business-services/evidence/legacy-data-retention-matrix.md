> **Migration status:** Legacy retention evidence. Normative requirements are in `docs/standards/DATA_LIFECYCLE.md`; clocks and enforcement must be verified against current schemas/jobs.

# Data Retention Matrix (Track H.4)

> Owner: platform/compliance. Created 2026-07-18 (Phase F cycle 11).
> Machine source: `scripts/retention-matrix.json` (this doc explains it; the
> JSON drives enforcement — change the JSON, then this doc, in one commit).
> Enforcement: `node scripts/enforce-retention.mjs` (dry-run default,
> `--apply` to delete). Schedule explicitly (cron / CI nightly); never runs
> implicitly.

| Data class               | Model                | Clock         | Retention        | Conditions                                            | Basis                                                                                |
| ------------------------ | -------------------- | ------------- | ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Read notifications       | `Notification`       | createdAt     | 180 d            | status READ/ARCHIVED only — unread never auto-deleted | operational convenience                                                              |
| Audit log                | `AuditLog`           | createdAt     | 730 d            | all                                                   | 2-year default; lengthen per-tenant for SOX/ISO — never shorten without legal review |
| Change history           | `ChangeHistory`      | createdAt     | 730 d            | all                                                   | same clock as audit                                                                  |
| Webhook delivery logs    | `WebhookDeliveryLog` | createdAt     | 90 d             | all                                                   | transport diagnostics                                                                |
| Expired sessions         | `UserSession`        | **expiresAt** | 30 d past expiry | live sessions never matched                           | security hygiene                                                                     |
| Terminal background jobs | `BackgroundJob`      | createdAt     | 90 d             | COMPLETED/FAILED/CANCELLED only                       | job bookkeeping                                                                      |

## Out of scope here (governed elsewhere)

- **Business documents** (invoices, orders, journals…): G.4 soft-delete +
  audit; statutory retention (often 7–10 y) — never in this matrix.
- **PII erasure**: registry-driven H.1 workflow, not age-based deletion.
- **Files/MinIO**: Track F storage lifecycle rules.
- **Outbox events** (Track B, future): will join this matrix with their own
  class after B lands.
- **Redis**: transient by doctrine (B.5) — TTLs, not retention.

## Interplay & future

- A tenant-level GDPR retention record (`gdpr.service.ts`) that is SHORTER
  than the platform default wins for that tenant's data (enforcement TODO
  when tenant-level enforcement lands with H.1/H.2).
- Track F partitioning uses THIS matrix to pick partition/archival windows
  for the high-volume tables.
- Every run prints a JSON summary; keep `--apply` runs in ops logs. Dry-run
  proof (2026-07-18, dev DB): all 6 classes execute, 0 candidates (seed-only
  data).

