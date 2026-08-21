# Provider Platform API routes — batch 1

Generated lexical route evidence.

| Controller | Prefix | Verb | Route | Permissions in file | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"completions"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"providers"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"providers/:providerId/models"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"providers/:providerId/models"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"providers"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"guardrails"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"guardrails"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"guardrails/:id"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"guardrails/events"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"eval-suites"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"eval-suites"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"eval-suites/:id/run"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"eval-runs"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"agents"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"agents"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"mcp-servers"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"mcp-servers"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"rag-indexes"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"rag-indexes"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"prompts"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | GET | `"prompts"` | 22 | 0 | 1 | no |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | POST | `"prompts/:id/activate"` | 22 | 0 | 1 | no |
| `v1/broadcast-maintenance.controller.ts` | `'platform/v1/broadcasts'` | GET | `'windows'` | 4 | 0 | 1 | no |
| `v1/broadcast-maintenance.controller.ts` | `'platform/v1/broadcasts'` | POST | `'windows'` | 4 | 0 | 1 | no |
| `v1/broadcast-maintenance.controller.ts` | `'platform/v1/broadcasts'` | PUT | `'windows/:id/cancel'` | 4 | 0 | 1 | no |
| `v1/broadcast-maintenance.controller.ts` | `'platform/v1/broadcasts'` | POST | `'message'` | 4 | 0 | 1 | no |
| `v1/budget.controller.ts` | `"platform/v1/budgets"` | POST | `` | 2 | 0 | 1 | no |
| `v1/budget.controller.ts` | `"platform/v1/budgets"` | POST | `"check"` | 2 | 0 | 1 | no |
| `v1/capacity-forecast.controller.ts` | `"platform/v1/capacity"` | GET | `":resourceId/:metric"` | 4 | 0 | 1 | no |
| `v1/capacity-forecast.controller.ts` | `"platform/v1/capacity"` | POST | `":resourceId/:metric/observations"` | 4 | 0 | 1 | no |
| `v1/capacity-forecast.controller.ts` | `"platform/v1/capacity"` | GET | `":resourceId/:metric/check"` | 4 | 0 | 1 | no |
| `v1/capacity-forecast.controller.ts` | `"platform/v1/capacity"` | POST | `":resourceId/scale"` | 4 | 0 | 1 | no |
| `v1/certificate-lifecycle.controller.ts` | `"platform/v1/certificates"` | GET | `":id"` | 4 | 0 | 1 | no |
| `v1/certificate-lifecycle.controller.ts` | `"platform/v1/certificates"` | GET | `` | 4 | 0 | 1 | no |
| `v1/certificate-lifecycle.controller.ts` | `"platform/v1/certificates"` | POST | `":id/rotate"` | 4 | 0 | 1 | no |
| `v1/certificate-lifecycle.controller.ts` | `"platform/v1/certificates"` | POST | `` | 4 | 0 | 1 | no |
| `v1/cloud-accounts.controller.ts` | `"platform/v1/cloud-accounts"` | GET | `` | 2 | 0 | 1 | no |
| `v1/cloud-accounts.controller.ts` | `"platform/v1/cloud-accounts"` | POST | `` | 2 | 0 | 1 | no |
| `v1/cluster-routing.controller.ts` | `"platform/v1/cluster-routing-deep"` | GET | `"clusters"` | 4 | 0 | 1 | no |
| `v1/cluster-routing.controller.ts` | `"platform/v1/cluster-routing-deep"` | POST | `"clusters"` | 4 | 0 | 1 | no |
| `v1/cluster-routing.controller.ts` | `"platform/v1/cluster-routing-deep"` | GET | `"routing"` | 4 | 0 | 1 | no |
| `v1/cluster-routing.controller.ts` | `"platform/v1/cluster-routing-deep"` | POST | `"routing"` | 4 | 0 | 1 | no |
| `v1/compliance-control.controller.ts` | `"platform/v1/compliance-controls"` | GET | `` | 5 | 0 | 1 | no |
| `v1/compliance-control.controller.ts` | `"platform/v1/compliance-controls"` | POST | `"monitor"` | 5 | 0 | 1 | no |
| `v1/compliance-control.controller.ts` | `"platform/v1/compliance-controls"` | POST | `":code/evaluate"` | 5 | 0 | 1 | no |
| `v1/compliance-control.controller.ts` | `"platform/v1/compliance-controls"` | POST | `":code/evidence"` | 5 | 0 | 1 | no |
| `v1/compliance-control.controller.ts` | `"platform/v1/compliance-controls"` | GET | `":code/evidence"` | 5 | 0 | 1 | no |

