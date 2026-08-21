> **Migration status:** Operational runbook migrated from the retired workspace. Commands/topology and RTO/RPO must be verified in the target environment before use.

# Runbook — Database Backup, Restore-Verification & Recovery (Track H.3)

> Owner: platform/devops. Created 2026-07-18 (Phase F cycle 8).
> Tooling: `scripts/backup-database.mjs`, `scripts/verify-backup.mjs`.
> Policy: **a backup that has never been restored is not a backup** — every
> backup cadence includes a verification cadence.

## 1. Take a backup

```bash
node scripts/backup-database.mjs --label pre-migration   # or scheduled/adhoc
```

- Runs `pg_dump -Fc` inside the `unerp-postgres` container (no host pg tools
  needed), writes `var/backups/<db>_<timestamp>_<label>.dump` + `.sha256`.
- Retention: newest 14 dumps kept (override `--keep <n>`).
- Flags: `--database`, `--user`, `--container` for non-default targets.

## 2. Verify it restores (the drill)

```bash
node scripts/verify-backup.mjs            # newest backup
node scripts/verify-backup.mjs --file var/backups/<name>.dump
```

Restores into a disposable `unerp_restore_verify` DB, then proves: pg_restore
success, table count equality, **exact per-table row counts**, and
`_prisma_migrations` equality vs the live source. Drops the disposable DB in
all paths. Exit 0 + `RESTORE VERIFIED` = pass.

**Cadence:** `.github/workflows/backup-restore.yml` runs `backup-database.mjs`
→ `verify-backup.mjs` **nightly at 03:10 UTC** and fails loudly if verification
fails (A22 / G-11). Manual rehearsal any time:

```bash
node scripts/rehearse-restore.mjs   # full timed rehearsal, logs RTO/RPO
```

Minimum quarterly drill per roadmap § 11c.

## 3. Real recovery (data loss on the primary)

1. STOP the API (`docker stop unerp-dev` or scale workers to 0) — no writes
   during recovery.
2. Choose the artifact: newest verified `.dump` (check `.sha256` first:
   `sha256sum -c <file>.sha256`).
3. Restore into a NEW database, verify, then switch:
   ```bash
   docker exec unerp-postgres psql -U unerp -d postgres -c 'CREATE DATABASE unerp_recovered'
   docker cp var/backups/<name>.dump unerp-postgres:/tmp/r.dump
   docker exec unerp-postgres pg_restore -U unerp -d unerp_recovered --no-owner --role unerp /tmp/r.dump
   node scripts/verify-backup.mjs --file var/backups/<name>.dump --database unerp_recovered
   ```
4. Repoint `DATABASE_URL` at the recovered DB (env change + restart), keep the
   damaged DB for forensics (rename, do not drop).
5. Record the incident + drill timings in `.ai/CHANGELOG.md`.

## 4. RPO / RTO (current single-node dev topology)

| Metric | Target                                                                             | Basis (2026-07-18 drill)                                                           |
| ------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| RPO    | ≤ 24h (scheduled daily backup) — tighten with WAL archiving at production topology | backup runtime 1.9s @ 1.6 MB                                                       |
| RTO    | ≤ 30 min manual                                                                    | restore+verify of full DB took 20.3s at seed scale; budget scales with data volume |

> **Measured 2026-08-08 (A22 rehearsal, full 1,845-table `unerp_dev`):**
> RTO **30.9 s** to restore+verify a 6.3 MB dump into a clean database; RPO at
> rehearsal start **0.0 h** (fresh backup). Both metrics far inside the targets.
> Full log in the Rehearsal log section below.

## 5. PITR (point-in-time recovery) — production requirement, not yet wired

Logical dumps give restore points, not PITR. Before production launch:
`wal_level=replica`, `archive_mode=on` + WAL shipping to object storage
(MinIO/S3), and `restore_command`-based recovery to a timestamp. Tracked as
the remaining H.3 sub-item; quarterly drill then includes a PITR exercise.

## 6. Scope notes

- These scripts protect the **database**. Uploaded files (MinIO) and Redis
  (transient queues) have separate stories: MinIO bucket replication is a
  Track F storage item; Redis is intentionally rebuildable (transport, not
  source of truth — roadmap B.5 doctrine).
- Backups live under gitignored `var/backups/` locally; production artifacts
  must ship off-host (object storage with lifecycle rules).

## Rehearsal log

Appended by `scripts/rehearse-restore.mjs` — a real backup restored into a clean database, timed (RTO) and aged (RPO), data proven equal. Latest rehearsal is the current row.

| When (UTC) | Backup | Restore | RTO | RPO | Tables | Rows | Migrations | Result |
| :--------- | :----- | :------ | :-- | :-- | -----: | ---: | ---------: | :----- |
| 2026-08-08 00:26:26 | unerp_dev_2026-08-08T00-26-26_a22-rehearsal.dump | unerp_dev → unerp_restore_test | 30.9 s | 0.0 h | 1845 | 287 | 180 | PASS |
