# Developer API routes — batch 3

Generated lexical route evidence.

| Controller | Prefix | Verb | Route | Permissions in file | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `platform/dev-home.controller.ts` | `"dev"` | GET | `"home"` | 6 | 0 | 0 | no |
| `platform/dev-home.controller.ts` | `"dev"` | GET | `"projects/:id"` | 6 | 0 | 0 | no |
| `platform/dev-home.controller.ts` | `"dev"` | GET | `"recents"` | 6 | 0 | 0 | no |
| `platform/dev-home.controller.ts` | `"dev"` | POST | `"recents/:projectId"` | 6 | 0 | 0 | no |
| `platform/dev-home.controller.ts` | `"dev"` | POST | `"apps"` | 6 | 0 | 0 | no |
| `platform/dev-home.controller.ts` | `"dev"` | POST | `"sites"` | 6 | 0 | 0 | no |
| `platform/library.controller.ts` | `"library"` | GET | `` | 4 | 0 | 0 | no |
| `platform/library.controller.ts` | `"library"` | GET | `":artifactId/attachments"` | 4 | 0 | 0 | no |
| `platform/library.controller.ts` | `"library"` | POST | `":artifactId/publish-to"` | 4 | 0 | 0 | no |
| `platform/library.controller.ts` | `"library"` | DELETE | `":artifactId/publish-to/:projectId"` | 4 | 0 | 0 | no |
| `platform/project-artifacts.controller.ts` | `"dev"` | GET | `"artifacts/reconcile"` | 3 | 0 | 0 | no |
| `platform/project-artifacts.controller.ts` | `"dev"` | GET | `"deprecations/usage"` | 3 | 0 | 0 | no |
| `platform/project-artifacts.controller.ts` | `"dev"` | GET | `"projects/:projectId/artifacts"` | 3 | 0 | 0 | no |
| `platform/project-releases.controller.ts` | `"dev/projects"` | GET | `":projectId/releases"` | 4 | 0 | 0 | no |
| `platform/project-releases.controller.ts` | `"dev/projects"` | POST | `":projectId/releases"` | 4 | 0 | 0 | no |
| `platform/project-releases.controller.ts` | `"dev/projects"` | POST | `":projectId/releases/rollback"` | 4 | 0 | 0 | no |
| `platform/project-releases.controller.ts` | `"dev/projects"` | POST | `":projectId/artifacts/pin"` | 4 | 0 | 0 | no |

