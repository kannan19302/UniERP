# PCC Canonical Application Mapping

Version 0.1.0 · Inspected 2026-09-14. This is a source-derived navigation snapshot of [the authoritative control-center catalog](../../unierp-contracts/src/control-centers.ts), not a second contract owner. Changes to actual names, resources, namespaces, dependencies or routes must originate at that owner. Runtime availability is NOT established by catalog presence. Manifest help topics, telemetry namespaces and channel availability are governed by [the manifest contract](../../unierp-contracts/src/control-center-manifest.ts).

The original PMS-APP-PCC-001–007 records were proposed authoring groupings. They are retained as historical identifiers, not canonical runtime applications. PMS-APP-PCC-008–029 map one-to-one to PCC-01–22. Existing module IDs remain stable; their application parents are reconciled below without changing their meaning.

Source SHA-256: `cb578c252a2f2f1e1ae3b479686d0eb4ce21813114158dc8a9d931749dddf830`. Extraction: local Python reads literal `defineApp` PCC records and requires exactly 22 unique IDs; no TypeScript is executed.

## Canonical application records

| PMS application ID | Canonical ID / name | Entry path | Permission namespace | State owners | Dependencies |
| --- | --- | --- | --- | --- | --- |
| PMS-APP-PCC-008 | PCC-01 — Platform Operations Center | `/operations` | `pcc.operations` | PLT-OPS | Shared platform prerequisites only |
| PMS-APP-PCC-009 | PCC-02 — Platform Security Center | `/security-center` | `pcc.security` | PLT-IAM, PLT-OPS | PCC-01, PCC-07, PCC-09, PCC-10 |
| PMS-APP-PCC-010 | PCC-03 — Organization Identity Governance | `/identity-governance` | `pcc.identity-governance` | PLT-IAM | PCC-18 |
| PMS-APP-PCC-011 | PCC-04 — Subscription Operations | `/subscription-operations` | `pcc.subscriptions` | PLT-BIZ | PCC-18 |
| PMS-APP-PCC-012 | PCC-05 — Entitlement & License Authority | `/entitlement-authority` | `pcc.entitlements` | PLT-BIZ | PCC-04 |
| PMS-APP-PCC-013 | PCC-06 — Revenue & Billing Operations | `/revenue-billing` | `pcc.billing` | PLT-BIZ | PCC-04, PCC-05 |
| PMS-APP-PCC-014 | PCC-07 — Key & Secrets Authority | `/keys-secrets` | `pcc.secrets` | PLT-IAM, PLT-OPS | PCC-01 |
| PMS-APP-PCC-015 | PCC-08 — API Traffic Control | `/api-traffic` | `pcc.api-traffic` | PLT-BIZ, PLT-OPS | PCC-05, PCC-07 |
| PMS-APP-PCC-016 | PCC-09 — Governance & Compliance Center | `/governance-compliance` | `pcc.compliance` | PLT-BIZ, PLT-OPS | PCC-02, PCC-07 |
| PMS-APP-PCC-017 | PCC-10 — Security Intelligence | `/security-intelligence` | `pcc.security-intelligence` | PLT-OPS | PCC-01, PCC-02, PCC-09 |
| PMS-APP-PCC-018 | PCC-11 — Mobile Platform Operations | `/mobile-operations` | `pcc.mobile` | PLT-MOB, PLT-OPS | PCC-01, PCC-07, PCC-08, PCC-13 |
| PMS-APP-PCC-019 | PCC-12 — Desktop Platform Operations | `/desktop-operations` | `pcc.desktop` | PLT-DESK, PLT-OPS | PCC-01, PCC-07, PCC-08, PCC-13 |
| PMS-APP-PCC-020 | PCC-13 — Global Platform Configuration | `/platform-configuration` | `pcc.configuration` | PLT-OPS | PCC-01, PCC-07 |
| PMS-APP-PCC-021 | PCC-14 — Developer Ecosystem Operations | `/developer-ecosystem` | `pcc.developer-ecosystem` | PLT-DEV | PCC-03, PCC-07, PCC-08, PCC-13 |
| PMS-APP-PCC-022 | PCC-15 — Knowledge & Adoption Operations | `/knowledge-adoption` | `pcc.knowledge-adoption` | PLT-BIZ, PLT-DS | PCC-13, PCC-14, PCC-22 |
| PMS-APP-PCC-023 | PCC-16 — Platform Intelligence | `/platform-intelligence` | `pcc.intelligence` | PLT-BIZ, PLT-OPS | PCC-01 |
| PMS-APP-PCC-024 | PCC-17 — Marketplace Operations | `/marketplace-operations` | `pcc.marketplace` | PLT-MKT, PLT-DEV | PCC-05, PCC-06, PCC-07, PCC-14 |
| PMS-APP-PCC-025 | PCC-18 — Tenant & Customer Lifecycle | `/organizations` | `pcc.organizations` | PLT-BIZ, PLT-OPS, PLT-IAM | PCC-01, PCC-19 |
| PMS-APP-PCC-026 | PCC-19 — Cloud Infrastructure & Reliability | `/cloud-infrastructure` | `pcc.infrastructure` | PLT-OPS | PCC-01, PCC-07, PCC-13 |
| PMS-APP-PCC-027 | PCC-20 — Integration & Connector Operations | `/connector-operations` | `pcc.connectors` | PLT-BIZ, PLT-OPS | PCC-07, PCC-08, PCC-13 |
| PMS-APP-PCC-028 | PCC-21 — AI Platform & Model Governance | `/ai-platform` | `pcc.ai-platform` | PLT-BIZ, PLT-OPS | PCC-02, PCC-07, PCC-08, PCC-13 |
| PMS-APP-PCC-029 | PCC-22 — Support & Service Operations | `/service-operations` | `pcc.support` | PLT-BIZ, PLT-IAM | PCC-01, PCC-03, PCC-15, PCC-18 |

## Canonical resource and event boundaries

### PCC-01 Platform Operations Center

Owned resource kinds: `platform-service`, `provider-incident`, `platform-change`, `platform-release`, `maintenance-window`, `runbook-execution`, `platform-job`, `platform-queue`. Event family: pcc.operations. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-02 Platform Security Center

Owned resource kinds: `provider-security-policy`, `platform-vulnerability`, `security-exception`, `privileged-access-review`, `break-glass-activation`, `encryption-posture`. Event family: pcc.security. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-03 Organization Identity Governance

Owned resource kinds: `provider-workforce-member`, `provider-role`, `provider-access-package`, `provider-access-review`, `provider-service-principal`, `support-access-delegation`. Event family: pcc.identity-governance. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-04 Subscription Operations

Owned resource kinds: `commercial-plan`, `commercial-offer`, `customer-subscription`, `subscription-amendment`, `subscription-renewal`, `subscription-migration`, `commercial-contract`. Event family: pcc.subscriptions. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-05 Entitlement & License Authority

Owned resource kinds: `entitlement-definition`, `organization-entitlement-grant`, `license-pool`, `license-policy`, `offline-license`, `entitlement-reconciliation`. Event family: pcc.entitlements. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-06 Revenue & Billing Operations

Owned resource kinds: `provider-billing-account`, `price-book`, `rated-charge`, `provider-invoice`, `provider-payment`, `credit-note`, `revenue-schedule`, `marketplace-payout`, `financial-reconciliation`. Event family: pcc.billing. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-07 Key & Secrets Authority

Owned resource kinds: `provider-secret-reference`, `cryptographic-key`, `signing-key`, `platform-certificate`, `secret-lease`, `key-ceremony`. Event family: pcc.secrets. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-08 API Traffic Control

Owned resource kinds: `api-product`, `gateway-route`, `gateway-policy`, `traffic-rule`, `meter-definition`, `abuse-case`, `api-deprecation`. Event family: pcc.api-traffic. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-09 Governance & Compliance Center

Owned resource kinds: `regulatory-framework`, `provider-control`, `provider-evidence`, `provider-audit-engagement`, `provider-risk`, `provider-attestation`, `privacy-impact-assessment`. Event family: pcc.compliance. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-10 Security Intelligence

Owned resource kinds: `security-telemetry-source`, `detection-rule`, `security-alert`, `soc-case`, `threat-indicator`, `threat-hunt`, `containment-action`. Event family: pcc.security-intelligence. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-11 Mobile Platform Operations

Owned resource kinds: `mobile-build`, `mobile-release-channel`, `mobile-version-policy`, `mobile-signing-profile`, `mobile-store-release`, `push-provider-binding`. Event family: pcc.mobile. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-12 Desktop Platform Operations

Owned resource kinds: `desktop-build`, `desktop-release-channel`, `desktop-version-policy`, `desktop-signing-profile`, `desktop-installer`, `desktop-update-policy`. Event family: pcc.desktop. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-13 Global Platform Configuration

Owned resource kinds: `configuration-schema`, `platform-configuration-value`, `configuration-template`, `feature-rollout`, `configuration-promotion`, `configuration-drift`. Event family: pcc.configuration. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-14 Developer Ecosystem Operations

Owned resource kinds: `publisher-organization`, `developer-program`, `sdk-release`, `developer-app-registration`, `sandbox-allocation`, `certification-run`. Event family: pcc.developer-ecosystem. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-15 Knowledge & Adoption Operations

Owned resource kinds: `provider-knowledge-article`, `learning-path`, `product-certification`, `onboarding-program`, `adoption-campaign`, `product-feedback`. Event family: pcc.knowledge-adoption. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-16 Platform Intelligence

Owned resource kinds: `provider-semantic-metric`, `provider-dataset`, `provider-dashboard`, `provider-report`, `provider-forecast`, `provider-anomaly`. Event family: pcc.intelligence. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-17 Marketplace Operations

Owned resource kinds: `marketplace-listing`, `marketplace-submission`, `marketplace-certification`, `marketplace-version`, `marketplace-review`, `marketplace-recall`. Event family: pcc.marketplace. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-18 Tenant & Customer Lifecycle

Owned resource kinds: `organization-account`, `customer-account`, `organization-provisioning-operation`, `organization-placement`, `organization-migration`, `organization-offboarding`. Event family: pcc.organizations. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-19 Cloud Infrastructure & Reliability

Owned resource kinds: `cloud-account`, `platform-region`, `platform-cell`, `compute-resource`, `network-resource`, `storage-resource`, `database-resource`, `backup-set`, `recovery-plan`. Event family: pcc.infrastructure. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-20 Integration & Connector Operations

Owned resource kinds: `connector-definition`, `connector-adapter-version`, `provider-connection-account`, `connector-certification`, `connector-health-policy`, `connector-deprecation`. Event family: pcc.connectors. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-21 AI Platform & Model Governance

Owned resource kinds: `ai-provider`, `ai-model`, `ai-model-version`, `platform-ai-policy`, `ai-evaluation-standard`, `ai-routing-policy`, `platform-ai-incident`. Event family: pcc.ai-platform. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

### PCC-22 Support & Service Operations

Owned resource kinds: `provider-support-case`, `service-request-definition`, `support-sla`, `support-queue`, `support-diagnostic-consent`, `support-quality-review`. Event family: pcc.support. PLT-PAO owns the experience; the state owners above own the actual mechanisms.

## Module-parent migration map

| Stable module ID | Original authoring parent | Canonical PMS parent | External app ID | Module |
| --- | --- | --- | --- | --- |
| PMS-MOD-PCC-001-001 | PMS-APP-PCC-001 | PMS-APP-PCC-008 | PCC-01 | Overview |
| PMS-MOD-PCC-001-002 | PMS-APP-PCC-001 | PMS-APP-PCC-008 | PCC-01 | Global operations |
| PMS-MOD-PCC-001-003 | PMS-APP-PCC-001 | PMS-APP-PCC-008 | PCC-01 | Service health |
| PMS-MOD-PCC-001-004 | PMS-APP-PCC-001 | PMS-APP-PCC-008 | PCC-01 | Observability |
| PMS-MOD-PCC-001-005 | PMS-APP-PCC-001 | PMS-APP-PCC-008 | PCC-01 | Incident management |
| PMS-MOD-PCC-001-006 | PMS-APP-PCC-001 | PMS-APP-PCC-023 | PCC-16 | Telemetry |
| PMS-MOD-PCC-001-007 | PMS-APP-PCC-001 | PMS-APP-PCC-008 | PCC-01 | Status communication |
| PMS-MOD-PCC-002-001 | PMS-APP-PCC-002 | PMS-APP-PCC-025 | PCC-18 | Organizations |
| PMS-MOD-PCC-002-002 | PMS-APP-PCC-002 | PMS-APP-PCC-025 | PCC-18 | Tenant provisioning |
| PMS-MOD-PCC-002-003 | PMS-APP-PCC-002 | PMS-APP-PCC-025 | PCC-18 | Suspension |
| PMS-MOD-PCC-002-004 | PMS-APP-PCC-002 | PMS-APP-PCC-025 | PCC-18 | Reactivation |
| PMS-MOD-PCC-002-005 | PMS-APP-PCC-002 | PMS-APP-PCC-025 | PCC-18 | Cancellation |
| PMS-MOD-PCC-002-006 | PMS-APP-PCC-002 | PMS-APP-PCC-025 | PCC-18 | Tenant migration |
| PMS-MOD-PCC-002-007 | PMS-APP-PCC-002 | PMS-APP-PCC-025 | PCC-18 | Tenant deletion |
| PMS-MOD-PCC-003-001 | PMS-APP-PCC-003 | PMS-APP-PCC-011 | PCC-04 | Plans |
| PMS-MOD-PCC-003-002 | PMS-APP-PCC-003 | PMS-APP-PCC-011 | PCC-04 | Subscriptions |
| PMS-MOD-PCC-003-003 | PMS-APP-PCC-003 | PMS-APP-PCC-012 | PCC-05 | Entitlements |
| PMS-MOD-PCC-003-004 | PMS-APP-PCC-003 | PMS-APP-PCC-012 | PCC-05 | Licensing |
| PMS-MOD-PCC-003-005 | PMS-APP-PCC-003 | PMS-APP-PCC-013 | PCC-06 | Billing |
| PMS-MOD-PCC-003-006 | PMS-APP-PCC-003 | PMS-APP-PCC-013 | PCC-06 | Invoicing |
| PMS-MOD-PCC-003-007 | PMS-APP-PCC-003 | PMS-APP-PCC-013 | PCC-06 | Payments |
| PMS-MOD-PCC-003-008 | PMS-APP-PCC-003 | PMS-APP-PCC-015 | PCC-08 | Usage metering |
| PMS-MOD-PCC-003-009 | PMS-APP-PCC-003 | PMS-APP-PCC-013 | PCC-06 | Rating |
| PMS-MOD-PCC-003-010 | PMS-APP-PCC-003 | PMS-APP-PCC-012 | PCC-05 | Quotas |
| PMS-MOD-PCC-003-011 | PMS-APP-PCC-003 | PMS-APP-PCC-013 | PCC-06 | Credits |
| PMS-MOD-PCC-003-012 | PMS-APP-PCC-003 | PMS-APP-PCC-013 | PCC-06 | Refunds |
| PMS-MOD-PCC-003-013 | PMS-APP-PCC-003 | PMS-APP-PCC-013 | PCC-06 | Dunning |
| PMS-MOD-PCC-003-014 | PMS-APP-PCC-003 | PMS-APP-PCC-013 | PCC-06 | Reconciliation |
| PMS-MOD-PCC-004-001 | PMS-APP-PCC-004 | PMS-APP-PCC-026 | PCC-19 | Resource allocation |
| PMS-MOD-PCC-004-002 | PMS-APP-PCC-004 | PMS-APP-PCC-026 | PCC-19 | Infrastructure |
| PMS-MOD-PCC-004-003 | PMS-APP-PCC-004 | PMS-APP-PCC-026 | PCC-19 | Cloud providers |
| PMS-MOD-PCC-004-004 | PMS-APP-PCC-004 | PMS-APP-PCC-008 | PCC-01 | Deployments |
| PMS-MOD-PCC-004-005 | PMS-APP-PCC-004 | PMS-APP-PCC-014 | PCC-07 | Secrets and KMS |
| PMS-MOD-PCC-004-006 | PMS-APP-PCC-004 | PMS-APP-PCC-014 | PCC-07 | Certificates |
| PMS-MOD-PCC-004-007 | PMS-APP-PCC-004 | PMS-APP-PCC-015 | PCC-08 | API gateway |
| PMS-MOD-PCC-004-008 | PMS-APP-PCC-004 | PMS-APP-PCC-015 | PCC-08 | Rate limits |
| PMS-MOD-PCC-004-009 | PMS-APP-PCC-004 | PMS-APP-PCC-026 | PCC-19 | Backup |
| PMS-MOD-PCC-004-010 | PMS-APP-PCC-004 | PMS-APP-PCC-026 | PCC-19 | Disaster recovery |
| PMS-MOD-PCC-005-001 | PMS-APP-PCC-005 | PMS-APP-PCC-010 | PCC-03 | Provider IAM |
| PMS-MOD-PCC-005-002 | PMS-APP-PCC-005 | PMS-APP-PCC-009 | PCC-02 | Security operations |
| PMS-MOD-PCC-005-003 | PMS-APP-PCC-005 | PMS-APP-PCC-017 | PCC-10 | Security analytics |
| PMS-MOD-PCC-005-004 | PMS-APP-PCC-005 | PMS-APP-PCC-016 | PCC-09 | Audit |
| PMS-MOD-PCC-005-005 | PMS-APP-PCC-005 | PMS-APP-PCC-016 | PCC-09 | Compliance |
| PMS-MOD-PCC-005-006 | PMS-APP-PCC-005 | PMS-APP-PCC-016 | PCC-09 | Risk |
| PMS-MOD-PCC-005-007 | PMS-APP-PCC-005 | PMS-APP-PCC-016 | PCC-09 | Data governance |
| PMS-MOD-PCC-006-001 | PMS-APP-PCC-006 | PMS-APP-PCC-024 | PCC-17 | Marketplace administration |
| PMS-MOD-PCC-006-002 | PMS-APP-PCC-006 | PMS-APP-PCC-021 | PCC-14 | Application governance |
| PMS-MOD-PCC-006-003 | PMS-APP-PCC-006 | PMS-APP-PCC-021 | PCC-14 | Developer administration |
| PMS-MOD-PCC-006-004 | PMS-APP-PCC-006 | PMS-APP-PCC-018 | PCC-11 | Mobile administration |
| PMS-MOD-PCC-006-005 | PMS-APP-PCC-006 | PMS-APP-PCC-019 | PCC-12 | Desktop administration |
| PMS-MOD-PCC-007-001 | PMS-APP-PCC-007 | PMS-APP-PCC-020 | PCC-13 | Global configuration |
| PMS-MOD-PCC-007-002 | PMS-APP-PCC-007 | PMS-APP-PCC-020 | PCC-13 | Feature flags |
| PMS-MOD-PCC-007-003 | PMS-APP-PCC-007 | PMS-APP-PCC-022 | PCC-15 | Notifications |
| PMS-MOD-PCC-007-004 | PMS-APP-PCC-007 | PMS-APP-PCC-029 | PCC-22 | Communications |
| PMS-MOD-PCC-007-005 | PMS-APP-PCC-007 | PMS-APP-PCC-029 | PCC-22 | Support operations |
| PMS-MOD-PCC-007-006 | PMS-APP-PCC-007 | PMS-APP-PCC-023 | PCC-16 | Analytics |
| PMS-MOD-PCC-007-007 | PMS-APP-PCC-007 | PMS-APP-PCC-026 | PCC-19 | Cost management |
| PMS-MOD-PCC-007-008 | PMS-APP-PCC-007 | PMS-APP-PCC-026 | PCC-19 | FinOps |
| PMS-MOD-PCC-007-009 | PMS-APP-PCC-007 | PMS-APP-PCC-008 | PCC-01 | Release management |

## Additional required coverage

PCC-15 Knowledge & Adoption, PCC-20 Integration & Connector Operations and PCC-21 AI Platform & Model Governance were not explicitly represented as applications in the seven initial buckets. Volume 4 must specify them under their canonical owner, rather than hide them in an unrelated administration module. Exact module allocations will be additive, not renumber existing modules.
