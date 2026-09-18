# Database Backup and Recovery Runbook — UniERP Platform

Authoritative operational guide for automated database backups, Point-In-Time Recovery (PITR), and disaster recovery validation.

---

## 1. Objectives and SLAs

- **RPO (Recovery Point Objective)**: <= 1 hour for automated snapshots; continuous via WAL archiving.
- **RTO (Recovery Time Objective)**: <= 15 minutes for automated clean database restoration.
- **Verification Rule**: A backup that has never been restored is not a backup. Nightly restoration rehearsals must prove byte-equivalence and zero schema drift.

---

## 2. Backup Execution

Backups are executed via:
```bash
node scripts/backup-database.mjs --label scheduled --keep 14
```
Artifacts are stored in `var/backups/` with cryptographic SHA-256 integrity digests.

---

## 3. Restoration Rehearsal Procedure

To rehearse restoring a backup into a clean disposable database and verify data equivalence:
```bash
node scripts/rehearse-restore.mjs --container postgres --user unerp --database unerp_dev
```

---

## Rehearsal log

Appended by `scripts/rehearse-restore.mjs` — a real backup restored into a clean database, timed (RTO) and aged (RPO), data proven equal. Latest rehearsal is the current row.

| When (UTC) | Backup | Restore | RTO | RPO | Tables | Rows | Migrations | Result |
| :--------- | :----- | :------ | :-- | :-- | -----: | ---: | ---------: | :----- |
| 2026-09-03 03:43:04 | unerp_dev_2026-09-03T03-43-04_a22-rehearsal.dump | unerp_dev → unerp_restore_test | 30.8 s | 0.0 h | 1983 | 2708 | 221 | PASS |