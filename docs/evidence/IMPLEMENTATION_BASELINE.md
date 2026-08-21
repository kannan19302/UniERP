# Implementation Baseline

Generated from the live checkout on 2026-08-21 using file/type/path inspection. Counts prove repository shape only; they do not prove behavior, correctness or production readiness.

| Platform | Repository | Implementation files | Test-like files | Next pages | Controllers | Prisma models | Migration files |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| business-services | `api` | 2192 | 577 | 0 | 579 | 0 | 0 |
| identity | `auth` | 5 | 2 | 0 | 0 | 0 | 0 |
| business-services | `blockchain` | 20 | 2 | 0 | 0 | 0 | 0 |
| runtime-operations | `config` | 2 | 0 | 0 | 0 | 0 | 0 |
| business-services | `data` | 313 | 9 | 0 | 0 | 1961 | 214 |
| design-system | `design-system` | 200 | 30 | 0 | 0 | 0 | 0 |
| desktop | `desktop-app` | 5 | 1 | 0 | 0 | 0 | 0 |
| developer-platform | `developer-platform` | 164 | 2 | 72 | 0 | 0 | 0 |
| developer-platform | `extension-api` | 8 | 1 | 0 | 0 | 0 | 0 |
| marketplace | `extensions` | 36 | 5 | 0 | 0 | 0 | 0 |
| design-system | `framework` | 22 | 3 | 0 | 0 | 0 | 0 |
| identity | `idp` | 135 | 26 | 0 | 20 | 0 | 0 |
| runtime-operations | `infra` | 38 | 13 | 2 | 0 | 0 | 0 |
| runtime-operations | `kernel` | 10 | 5 | 0 | 0 | 0 | 0 |
| marketing-site | `marketing-site` | 222 | 4 | 45 | 0 | 25 | 7 |
| marketplace | `marketplace` | 34 | 1 | 18 | 0 | 0 | 0 |
| platform-admin-os | `provider-admin-os` | 174 | 7 | 140 | 0 | 0 | 0 |
| developer-platform | `sandbox` | 8 | 5 | 0 | 0 | 0 | 0 |
| developer-platform | `sdk` | 5 | 1 | 0 | 0 | 0 | 0 |
| runtime-operations | `service-kit` | 5 | 2 | 0 | 0 | 0 | 0 |
| runtime-operations | `shared` | 56 | 13 | 0 | 0 | 0 | 0 |
| design-system | `storybook` | 8 | 3 | 0 | 0 | 0 | 0 |
| tenant-admin | `tenant-admin` | 163 | 3 | 110 | 0 | 0 | 1 |
| tenant-apps | `tenant-apps` | 1025 | 43 | 794 | 0 | 0 | 0 |
| tenant-sites | `tenant-site-template` | 1 | 0 | 0 | 0 | 0 | 0 |
| tenant-sites | `tenant-sites` | 18 | 1 | 3 | 0 | 0 | 0 |
| business-services | `unierp-contracts` | 90 | 43 | 0 | 0 | 0 | 0 |
| mobile | `unierp-mobile` | 818 | 29 | 0 | 0 | 0 | 0 |
| runtime-operations | `unierp-platform` | 1 | 0 | 0 | 0 | 0 | 0 |
| runtime-operations | `unierp-workspace` | 173 | 10 | 0 | 0 | 0 | 0 |
| tenant-sites | `web-studio` | 8 | 1 | 1 | 0 | 0 | 0 |

## Interpretation rules

- Test-like count is filename/path classification and must be inspected before supporting a requirement.
- Page/controller/model presence is DECLARED or implementation-presence evidence, not lifecycle completion.
- Repositories with no test-like files have an explicit evidence gap.
- Generated counts should be refreshed after structural changes; the command/query definition belongs in the documentation verifier planned by the traceability standard.

