# Repository, package and dependency inventory

Generated artifact — do not edit by hand.  
Sources: `UniERP.code-workspace`, `unierp-workspace/governance/active-estate.json`, active `package.json` manifests and repository Git heads.  
Command: `node scripts/generate-repository-inventory.mjs` from `unierp-workspace`.  
Freshness check: `node scripts/generate-repository-inventory.mjs --check`.

Summary: 14 active repositories, 12 package identities and 16 internal dependency declarations. Upward edges: 0. Cycles: 0.

## Active repositories and toolchains

| Repository | Layer | Package identity | Git head | Package manager | Node engine | Lock |
| --- | ---: | --- | --- | --- | --- | --- |
| contracts | L0 | @kannan19302/contracts | 3ebbaa5baddc | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| design-system | L1 | @kannan19302/ui | c6ef1da96103 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| shared | L1 | @kannan19302/shared | 27bd476e91d6 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| data | L2 | @kannan19302/database | b106013107a8 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| api | L3 | @kannan19302/api | b252c5ec3d58 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| idp | L3 | @kannan19302/idp | 620be8b805a1 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| business-suite | L4 | @kannan19302/web | 0324cfe4e2fe | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| tenant-admin | L4 | @kannan19302/tenant-admin | dceec322e8f8 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| provider-admin | L4 | @kannan19302/console | b212fbce82d2 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| developer-platform | L4 | @kannan19302/developer | c80d9e18961a | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| marketing-site | L4 | corporate-website | 3afee74a0baa | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| mobile | L5 | — | 003ed33766ec | — | — | — |
| desktop-app | L5 | @kannan19302/desktop | f5f783b74b78 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| platform | L7 | — | 818a376d0d74 | — | — | — |

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

