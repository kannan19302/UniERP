# Repository, package and dependency inventory

Generated artifact — do not edit by hand.  
Sources: `UniERP.code-workspace`, `unierp-workspace/governance/active-estate.json`, active `package.json` manifests and repository Git heads.  
Command: `node scripts/generate-repository-inventory.mjs` from `unierp-workspace`.  
Freshness check: `node scripts/generate-repository-inventory.mjs --check`.

Summary: 14 active repositories, 12 package identities and 16 internal dependency declarations. Upward edges: 0. Cycles: 0.

## Active repositories and toolchains

| Repository | Layer | Package identity | Git head | Package manager | Node engine | Lock |
| --- | ---: | --- | --- | --- | --- | --- |
| contracts | L0 | @kannan19302/contracts | 38ce0558aaa2 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| design-system | L1 | @kannan19302/ui | e09913443135 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| shared | L1 | @kannan19302/shared | 29cb86b7068c | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| data | L2 | @kannan19302/database | 299a9d372141 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| api | L3 | @kannan19302/api | ffab40b5a3cb | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| idp | L3 | @kannan19302/idp | 470de54f0b92 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| business-suite | L4 | @kannan19302/web | 5eefdc5653a2 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| tenant-admin | L4 | @kannan19302/tenant-admin | 5c8eaea31b43 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| provider-admin | L4 | @kannan19302/console | d741cf4bb417 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| developer-platform | L4 | @kannan19302/developer | 3d88ad48f534 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| marketing-site | L4 | corporate-website | e83e6f466a8d | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| mobile | L5 | — | 6079d569d8d6 | — | — | — |
| desktop-app | L5 | @kannan19302/desktop | 0cc694fe2360 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| platform | L7 | — | — | — | — | — |

## Internal package dependencies

| From | Layer | To | Layer | Package | Section | Declared range |
| --- | ---: | --- | ---: | --- | --- | --- |
| api | L3 | contracts | L0 | @kannan19302/contracts | dependencies | file:../contracts |
| api | L3 | data | L2 | @kannan19302/database | dependencies | file:../data |
| api | L3 | shared | L1 | @kannan19302/shared | dependencies | file:../shared |
| business-suite | L4 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| business-suite | L4 | shared | L1 | @kannan19302/shared | dependencies | ^1.0.5 |
| data | L2 | shared | L1 | @kannan19302/shared | devDependencies | file:../shared |
| developer-platform | L4 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| developer-platform | L4 | shared | L1 | @kannan19302/shared | dependencies | ^1.0.5 |
| idp | L3 | data | L2 | @kannan19302/database | dependencies | file:../data |
| idp | L3 | shared | L1 | @kannan19302/shared | dependencies | file:../shared |
| marketing-site | L4 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| provider-admin | L4 | design-system | L1 | @kannan19302/ui | dependencies | file:../design-system |
| provider-admin | L4 | shared | L1 | @kannan19302/shared | dependencies | file:../shared |
| shared | L1 | contracts | L0 | @kannan19302/contracts | dependencies | file:../contracts |
| tenant-admin | L4 | design-system | L1 | @kannan19302/ui | dependencies | file:../design-system |
| tenant-admin | L4 | shared | L1 | @kannan19302/shared | dependencies | file:../shared |

## Interpretation

This inventory proves only declared repository/package topology at the recorded Git heads. It does not prove runtime integration, contract compatibility, release publication or production deployment.

