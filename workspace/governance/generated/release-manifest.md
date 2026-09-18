# UniERP Polyrepo Release Manifest & Provenance

Release ID: `REL-2026-09-03T14-23-44-258Z`  
Generated At: `2026-09-03T14:23:44.258Z`  
Target Environment: `staging`  
Manifest SHA-256: `b595073c4e4db1422da95646cc6ea008ebb704d7d6e5bb1d3a31a5551db2d522`  
Production Eligible: `NO (FND remediation in progress)`  
CD Safety Status: `DISABLED_BY_POLICY (check-disabled-cd.mjs PASS)`

## 1. Active Estate Repository Revisions (31 Repositories)

| Repository | Version | Exact Commit SHA | Status |
| :--- | :--- | :--- | :--- |
| `unierp-contracts` | `1.0.4` | `15f1e2d488c1` | `COMMITTED` |
| `auth` | `1.0.5` | `7f01c8142013` | `COMMITTED` |
| `config` | `1.0.2` | `9602f9660614` | `COMMITTED` |
| `design-system` | `1.0.16` | `ef75e21ee8f3` | `COMMITTED` |
| `kernel` | `1.0.3` | `6461b0c1c81d` | `COMMITTED` |
| `sdk` | `1.0.3` | `6e7ed1c39931` | `COMMITTED` |
| `service-kit` | `0.2.3` | `e3969ac9f45f` | `COMMITTED` |
| `shared` | `1.0.6` | `ac8cd1e9c0b0` | `COMMITTED` |
| `storybook` | `0.1.0` | `1ad63883f96c` | `COMMITTED` |
| `blockchain` | `1.0.3` | `4aa35c765b4a` | `COMMITTED` |
| `data` | `1.0.14` | `e987469427cc` | `COMMITTED` |
| `extension-api` | `1.1.0` | `f88e69241191` | `COMMITTED` |
| `framework` | `0.1.4` | `a7322f52bdcc` | `COMMITTED` |
| `sandbox` | `1.1.0` | `b6542915fde4` | `COMMITTED` |
| `api` | `0.0.1` | `0aa22b64b4f5` | `COMMITTED` |
| `idp` | `0.0.1` | `5e2d93b19b6b` | `COMMITTED` |
| `developer-platform` | `0.0.1` | `fd1b756e1412` | `COMMITTED` |
| `marketing-site` | `1.0.0` | `1c15d2bfc9e6` | `COMMITTED` |
| `marketplace` | `0.1.0` | `94e78f004e73` | `COMMITTED` |
| `provider-admin-os` | `0.1.0` | `8301b6bf25ca` | `COMMITTED` |
| `tenant-admin` | `0.1.0` | `cf4d4083928f` | `COMMITTED` |
| `tenant-apps` | `0.0.1` | `c8133f56c418` | `COMMITTED` |
| `tenant-site-template` | `1.0.0` | `9708ce2f2ea8` | `COMMITTED` |
| `tenant-sites` | `0.1.0` | `776e91a36d4b` | `COMMITTED` |
| `web-studio` | `0.1.0` | `849e8389a1fc` | `COMMITTED` |
| `desktop-app` | `1.0.0` | `031bc02a72d3` | `COMMITTED` |
| `unierp-mobile` | `unknown` | `fe084d372029` | `COMMITTED` |
| `extensions` | `1.0.0` | `171d5790128e` | `COMMITTED` |
| `infra` | `unknown` | `8a595b636480` | `COMMITTED` |
| `unierp-workspace` | `unknown` | `0cc3003b3968` | `COMMITTED` |
| `unierp-platform` | `unknown` | `af371a97ab07` | `COMMITTED` |

## 2. Staging Reference Topology

- **Compute**: Kubernetes 1.30 / Isolated Pods
- **Ingress**: Envoy with strict mTLS & WAF
- **Database**: PostgreSQL 16 Multi-Tenant RLS (NOBYPASSRLS)
- **Cache**: Redis 7.2 Cluster with TLS
- **Events**: Kafka 3.7 with SCRAM-SHA-512

## 3. Rollback & Roll-Forward Drill

- Drill Time: `2026-09-03T14:23:44.258Z`
- Method: `SHA-based atomic rollback via rollout.sh`
- Target RTO: `< 300 seconds`
- Result: `PASS (zero production state modified)`
