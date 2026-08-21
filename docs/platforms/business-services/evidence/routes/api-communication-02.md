# Route decorators: api/modules/communication — batch 2

Generated lexical route evidence. Route arguments are source expressions; class/composed guards and DTO contracts require AST/runtime verification.

| Controller | Prefix | Verb | Route argument | Permission decorators | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `search.controller.ts` | `"communication/enterprise-search"` | GET | `"search"` | 9 | 0 | 0 | no |
| `search.controller.ts` | `"communication/enterprise-search"` | POST | `"saved"` | 9 | 0 | 0 | no |
| `search.controller.ts` | `"communication/enterprise-search"` | GET | `"saved"` | 9 | 0 | 0 | no |
| `search.controller.ts` | `"communication/enterprise-search"` | DELETE | `"saved/:id"` | 9 | 0 | 0 | no |
| `search.controller.ts` | `"communication/enterprise-search"` | GET | `"history"` | 9 | 0 | 0 | no |
| `search.controller.ts` | `"communication/enterprise-search"` | GET | `"analytics"` | 9 | 0 | 0 | no |
| `search.controller.ts` | `"communication/enterprise-search"` | POST | `"reindex/:entityType/:entityId"` | 9 | 0 | 0 | no |
| `search.controller.ts` | `"communication/enterprise-search"` | GET | `"synonyms"` | 9 | 0 | 0 | no |
| `search.controller.ts` | `"communication/enterprise-search"` | POST | `"synonyms"` | 9 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | GET | `` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | GET | `":id"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | POST | `` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | PATCH | `":id"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | POST | `":id/publish"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | DELETE | `":id"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | POST | `":id/questions"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | PATCH | `"questions/:questionId"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | DELETE | `"questions/:questionId"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | POST | `":id/responses"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | GET | `":id/analysis"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | GET | `"dashboard"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | GET | `"templates"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | POST | `"templates"` | 15 | 0 | 0 | no |
| `survey.controller.ts` | `"communication/surveys"` | DELETE | `"templates/:id"` | 15 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | GET | `"meetings"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | GET | `"meetings/:id"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | POST | `"meetings"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | POST | `"meetings/:id/end"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | GET | `"meetings/:id/recordings"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | GET | `"recordings/:id"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | POST | `"meetings/:id/breakout-rooms"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | GET | `"meetings/:id/breakout-rooms"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | POST | `"breakout-rooms/:id/end"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | GET | `"meetings/:id/analytics"` | 11 | 0 | 0 | no |
| `video-deep.controller.ts` | `"communication/video"` | GET | `"dashboard"` | 11 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | GET | `"calls"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | GET | `"calls/:id"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | POST | `"calls"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | PATCH | `"calls/:id/status"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | POST | `"incoming"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | GET | `"voicemail"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | POST | `"voicemail/:id/read"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | GET | `"ivr-menus"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | POST | `"ivr-menus"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | POST | `"ivr-menus/:id/options"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | GET | `"analytics"` | 12 | 0 | 0 | no |
| `voip.controller.ts` | `"communication/voip"` | GET | `"dashboard"` | 12 | 0 | 0 | no |

