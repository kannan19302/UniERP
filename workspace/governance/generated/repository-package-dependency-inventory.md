# Repository, package and dependency inventory

Generated artifact — do not edit by hand.  
Sources: `UniERP.code-workspace`, `unierp-workspace/governance/active-estate.json`, active `package.json` manifests and repository Git heads.  
Command: `node scripts/generate-repository-inventory.mjs` from `unierp-workspace`.  
Freshness check: `node scripts/generate-repository-inventory.mjs --check`.

Summary: 31 active repositories, 28 package identities and 61 internal dependency declarations. Upward edges: 0. Cycles: 0.

## Active repositories and toolchains

| Repository | Layer | Package identity | Git head | Package manager | Node engine | Lock |
| --- | ---: | --- | --- | --- | --- | --- |
| unierp-contracts | L0 | @kannan19302/contracts | 15f1e2d488c1 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| auth | L1 | @kannan19302/auth | 7f01c8142013 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| config | L1 | @kannan19302/config | 9602f9660614 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| design-system | L1 | @kannan19302/ui | ef75e21ee8f3 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| kernel | L1 | @kannan19302/kernel | 6461b0c1c81d | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| sdk | L1 | @kannan19302/sdk | 6e7ed1c39931 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| service-kit | L1 | @kannan19302/service-kit | e3969ac9f45f | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| shared | L1 | @kannan19302/shared | ac8cd1e9c0b0 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| storybook | L1 | @kannan19302/storybook | 1ad63883f96c | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| blockchain | L2 | @kannan19302/blockchain | 4aa35c765b4a | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| data | L2 | @kannan19302/database | e987469427cc | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| extension-api | L2 | @kannan19302/extension-api | f88e69241191 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| framework | L2 | @kannan19302/framework | a7322f52bdcc | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| sandbox | L2 | @kannan19302/sandbox | b6542915fde4 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| api | L3 | @kannan19302/api | 0aa22b64b4f5 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| idp | L3 | @kannan19302/idp | 5e2d93b19b6b | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| developer-platform | L4 | @kannan19302/developer | fd1b756e1412 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| marketing-site | L4 | unierp-corporate-website | 1c15d2bfc9e6 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| marketplace | L4 | @kannan19302/marketplace | 94e78f004e73 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| provider-admin-os | L4 | @kannan19302/console | 8301b6bf25ca | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| tenant-admin | L4 | @kannan19302/tenant-admin | cf4d4083928f | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| tenant-apps | L4 | @kannan19302/web | c8133f56c418 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| tenant-site-template | L4 | @kannan19302/corporate-site-template | 9708ce2f2ea8 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| tenant-sites | L4 | @kannan19302/tenant-sites | 776e91a36d4b | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| web-studio | L4 | @kannan19302/web-studio | 849e8389a1fc | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| desktop-app | L5 | @kannan19302/desktop | 031bc02a72d3 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| unierp-mobile | L5 | — | fe084d372029 | — | — | — |
| extensions | L6 | unierp-extensions | 171d5790128e | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| infra | L7 | — | 8a595b636480 | — | — | — |
| unierp-workspace | L7 | unierp-programme | 0cc3003b3968 | pnpm@9.15.4 | >=22 <23 | pnpm-lock.yaml |
| unierp-platform | — | — | af371a97ab07 | — | — | — |

## Internal package dependencies

| From | Layer | To | Layer | Package | Section | Declared range |
| --- | ---: | --- | ---: | --- | --- | --- |
| api | L3 | auth | L1 | @kannan19302/auth | dependencies | file:../auth |
| api | L3 | blockchain | L2 | @kannan19302/blockchain | dependencies | ^1.0.3 |
| api | L3 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| api | L3 | data | L2 | @kannan19302/database | dependencies | file:../data |
| api | L3 | extension-api | L2 | @kannan19302/extension-api | dependencies | ^1.0.6 |
| api | L3 | sandbox | L2 | @kannan19302/sandbox | dependencies | ^1.0.4 |
| api | L3 | service-kit | L1 | @kannan19302/service-kit | dependencies | ^0.2.3 |
| api | L3 | shared | L1 | @kannan19302/shared | dependencies | file:../shared |
| api | L3 | unierp-contracts | L0 | @kannan19302/contracts | dependencies | file:..\unierp-contracts |
| auth | L1 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| auth | L1 | shared | L1 | @kannan19302/shared | dependencies | file:../shared |
| blockchain | L2 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| blockchain | L2 | shared | L1 | @kannan19302/shared | peerDependencies | ^1.0.5 |
| data | L2 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| data | L2 | shared | L1 | @kannan19302/shared | devDependencies | file:../shared |
| design-system | L1 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| developer-platform | L4 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| developer-platform | L4 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| developer-platform | L4 | framework | L2 | @kannan19302/framework | dependencies | ^0.1.4 |
| developer-platform | L4 | sdk | L1 | @kannan19302/sdk | dependencies | ^1.0.3 |
| developer-platform | L4 | shared | L1 | @kannan19302/shared | dependencies | ^1.0.5 |
| framework | L2 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| framework | L2 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| idp | L3 | auth | L1 | @kannan19302/auth | dependencies | file:../auth |
| idp | L3 | blockchain | L2 | @kannan19302/blockchain | dependencies | ^1.0.3 |
| idp | L3 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| idp | L3 | data | L2 | @kannan19302/database | dependencies | file:../data |
| idp | L3 | service-kit | L1 | @kannan19302/service-kit | dependencies | ^0.2.3 |
| idp | L3 | shared | L1 | @kannan19302/shared | dependencies | file:../shared |
| kernel | L1 | unierp-contracts | L0 | @kannan19302/contracts | dependencies | ^1.0.4 |
| marketing-site | L4 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| marketplace | L4 | auth | L1 | @kannan19302/auth | dependencies | ^1.0.4 |
| marketplace | L4 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| marketplace | L4 | framework | L2 | @kannan19302/framework | dependencies | ^0.1.4 |
| marketplace | L4 | sdk | L1 | @kannan19302/sdk | dependencies | ^1.0.3 |
| provider-admin-os | L4 | auth | L1 | @kannan19302/auth | dependencies | ^1.0.4 |
| provider-admin-os | L4 | design-system | L1 | @kannan19302/ui | dependencies | file:../design-system |
| provider-admin-os | L4 | framework | L2 | @kannan19302/framework | dependencies | ^0.1.4 |
| provider-admin-os | L4 | sdk | L1 | @kannan19302/sdk | dependencies | ^1.0.3 |
| provider-admin-os | L4 | shared | L1 | @kannan19302/shared | dependencies | file:../shared |
| sandbox | L2 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| sandbox | L2 | extension-api | L2 | @kannan19302/extension-api | dependencies | ^1.0.6 |
| sdk | L1 | unierp-contracts | L0 | @kannan19302/contracts | dependencies | ^1.0.4 |
| shared | L1 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| shared | L1 | unierp-contracts | L0 | @kannan19302/contracts | dependencies | file:../unierp-contracts |
| storybook | L1 | config | L1 | @kannan19302/config | devDependencies | 1.0.2 |
| storybook | L1 | design-system | L1 | @kannan19302/ui | dependencies | 1.0.15 |
| tenant-admin | L4 | auth | L1 | @kannan19302/auth | dependencies | ^1.0.4 |
| tenant-admin | L4 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| tenant-admin | L4 | framework | L2 | @kannan19302/framework | dependencies | ^0.1.4 |
| tenant-admin | L4 | sdk | L1 | @kannan19302/sdk | dependencies | ^1.0.3 |
| tenant-apps | L4 | auth | L1 | @kannan19302/auth | dependencies | ^1.0.3 |
| tenant-apps | L4 | config | L1 | @kannan19302/config | devDependencies | ^1.0.2 |
| tenant-apps | L4 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| tenant-apps | L4 | framework | L2 | @kannan19302/framework | dependencies | ^0.1.4 |
| tenant-apps | L4 | sdk | L1 | @kannan19302/sdk | dependencies | ^1.0.3 |
| tenant-apps | L4 | shared | L1 | @kannan19302/shared | dependencies | ^1.0.5 |
| tenant-sites | L4 | auth | L1 | @kannan19302/auth | dependencies | ^1.0.4 |
| tenant-sites | L4 | design-system | L1 | @kannan19302/ui | dependencies | ^1.0.15 |
| tenant-sites | L4 | framework | L2 | @kannan19302/framework | dependencies | ^0.1.4 |
| tenant-sites | L4 | sdk | L1 | @kannan19302/sdk | dependencies | ^1.0.3 |

## Interpretation

This inventory proves only declared repository/package topology at the recorded Git heads. It does not prove runtime integration, contract compatibility, release publication or production deployment.

