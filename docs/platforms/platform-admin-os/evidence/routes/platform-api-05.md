# Provider Platform API routes — batch 5

Generated lexical route evidence.

| Controller | Prefix | Verb | Route | Permissions in file | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `v1/privilege-elevation.controller.ts` | `"platform/v1/privilege-elevation"` | POST | `` | 2 | 0 | 1 | no |
| `v1/privilege-elevation.controller.ts` | `"platform/v1/privilege-elevation"` | GET | `` | 2 | 0 | 1 | no |
| `v1/quota-admin.controller.ts` | `'platform/v1/quotas'` | GET | `'rules'` | 4 | 0 | 1 | no |
| `v1/quota-admin.controller.ts` | `'platform/v1/quotas'` | POST | `'rules'` | 4 | 0 | 1 | no |
| `v1/quota-admin.controller.ts` | `'platform/v1/quotas'` | GET | `':tenantId/usage'` | 4 | 0 | 1 | no |
| `v1/quota-admin.controller.ts` | `'platform/v1/quotas'` | POST | `':tenantId/alert'` | 4 | 0 | 1 | no |
| `v1/release-control.controller.ts` | `'platform/v1/releases'` | GET | `'manifest'` | 3 | 0 | 1 | no |
| `v1/release-control.controller.ts` | `'platform/v1/releases'` | POST | `'rollback'` | 3 | 0 | 1 | no |
| `v1/release-control.controller.ts` | `'platform/v1/releases'` | POST | `'promote'` | 3 | 0 | 1 | no |
| `v1/reseller-channel.controller.ts` | `"platform/v1/reseller-channel-deep"` | GET | `"resellers"` | 4 | 0 | 1 | no |
| `v1/reseller-channel.controller.ts` | `"platform/v1/reseller-channel-deep"` | POST | `"resellers"` | 4 | 0 | 1 | no |
| `v1/reseller-channel.controller.ts` | `"platform/v1/reseller-channel-deep"` | GET | `"commissions"` | 4 | 0 | 1 | no |
| `v1/reseller-channel.controller.ts` | `"platform/v1/reseller-channel-deep"` | POST | `"commissions"` | 4 | 0 | 1 | no |
| `v1/retention-schedule.controller.ts` | `"platform/v1/retention-schedule"` | GET | `"classes"` | 2 | 0 | 1 | no |
| `v1/retention-schedule.controller.ts` | `"platform/v1/retention-schedule"` | POST | `"execute"` | 2 | 0 | 1 | no |
| `v1/runbook.controller.ts` | `"platform/v1/runbooks"` | POST | `` | 4 | 0 | 1 | no |
| `v1/runbook.controller.ts` | `"platform/v1/runbooks"` | GET | `":id/dry-run"` | 4 | 0 | 1 | no |
| `v1/runbook.controller.ts` | `"platform/v1/runbooks"` | POST | `":id/publish"` | 4 | 0 | 1 | no |
| `v1/runbook.controller.ts` | `"platform/v1/runbooks"` | POST | `":id/execute"` | 4 | 0 | 1 | no |
| `v1/security-operations.controller.ts` | `'platform/v1/soc'` | POST | `':tenantId/revoke-sessions'` | 3 | 0 | 1 | no |
| `v1/security-operations.controller.ts` | `'platform/v1/soc'` | POST | `':tenantId/quarantine'` | 3 | 0 | 1 | no |
| `v1/security-operations.controller.ts` | `'platform/v1/soc'` | POST | `'breach-response'` | 3 | 0 | 1 | no |
| `v1/staff-idp.controller.ts` | `"platform/v1/staff-idp"` | POST | `"authenticate"` | 1 | 0 | 1 | no |

