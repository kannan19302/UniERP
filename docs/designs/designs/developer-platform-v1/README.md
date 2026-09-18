# UniERP Developer Platform v1

Consolidated design and development handoff: **108 ordered screens**, comprising the original76 selected designs and32 enterprise additions. Previous design folders are preserved.

- [Open the screen gallery](design/index.html)
- [Start development planning here](prerequisites/00_START_HERE.md)
- [Comprehensive prerequisites document](prerequisites/PREREQUISITES_MASTER.md)
- [Architecture](prerequisites/04_ARCHITECTURE.md) and [security](prerequisites/06_SECURITY_THREAT_MODEL.md)
- [120-item story backlog](prerequisites/STORY_BACKLOG.json) / [CSV](prerequisites/STORY_BACKLOG.csv)
- [Enterprise additions](prerequisites/16_ENTERPRISE_GAP_REVIEW.md)
- [Decisions and readiness gates](prerequisites/15_DECISIONS_AND_READINESS.md)
- [Verification evidence](evidence/VERIFICATION.md)

## Folder structure

```
developer-platform-v1/
  design/          108 selected PNGs, ordered manifest and gallery
  prerequisites/   Product, architecture, security, engineering and delivery documents
  evidence/        Source inventories, preservation hashes, review and verification
```

The design sequence follows Start and navigate → Compose and reuse → Build websites → Build applications → Integrate and extend → Validate and deliver → Secure and operate. Original IDs remain in the manifest and gallery for traceability. Refined new-image drafts are retained under evidence/original-additions rather than mixed into the selected screen sequence.

**Readiness:** this is a design/planning package. The accepted repository audit still gates broad development; start with the authorized foundation/P0 remediation and current continuation decision. No application implementation, runtime qualification, integration, deployment or release is claimed by these artifacts.
