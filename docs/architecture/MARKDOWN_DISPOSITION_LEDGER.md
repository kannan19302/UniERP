# UniERP Markdown Disposition Ledger

Authoritative inventory and reviewed disposition for all **1072** first-party Markdown documents across the 13 canonical roots.

## 1. Scope & Exclusion Policy

### Included
- All first-party authored Markdown files across the 13 canonical roots (`contracts`, `design-system`, `shared`, `data`, `api`, `idp`, `tenant-apps`, `provider-admin-os`, `developer-platform`, `marketing-site`, `mobile`, `desktop-app`, `platform`).
- Root entrypoints, AI agent rules, skills, reference manuals, and PR attestation templates.
- Product suites, platform suites, standards, ADRs, change contracts, module orientation guides, and governance plans.

### Excluded
- Third-party packages and vendor dependencies in `node_modules`.
- Version control metadata in `.git`.
- Compilation, bundle, and transpilation outputs in `dist`, `build`, and `.next`.
- Test execution outputs and coverage reports in `coverage`, `playwright-report`, and `test-results`.
- Mutation testing caches in `.stryker-tmp`.

---

## 2. Classification Summary

| Document Class | Count | Description |
|---|---|---|
| `ENTERPRISE_AGENT_FLEET_STANDARD` | 13 | Classified documentation |
| `ROOT_AGENT_PROTOCOL_ENTRYPOINT` | 2 | Classified documentation |
| `REPOSITORY_DOCUMENTATION` | 141 | Classified documentation |
| `AGENT_SKILL_AND_REFERENCE` | 36 | Classified documentation |
| `AI_PR_ATTESTATION_TEMPLATE` | 16 | Classified documentation |
| `REPOSITORY_AGENT_INSTRUCTIONS` | 17 | Classified documentation |
| `REPOSITORY_ARCHITECTURE_SPEC` | 30 | Classified documentation |
| `REPOSITORY_ROOT_README` | 1 | Classified documentation |
| `ARCHITECTURE_DECISION_RECORD` | 13 | Classified documentation |
| `HISTORICAL_AUDIT_EVIDENCE` | 12 | Classified documentation |
| `PLATFORM_SUITE_DOCUMENT` | 684 | Classified documentation |
| `PRODUCT_SUITE_REQUIREMENT` | 22 | Classified documentation |
| `CROSS_PLATFORM_STANDARD` | 22 | Classified documentation |
| `MODULE_ORIENTATION_GUIDE` | 33 | Classified documentation |
| `GOVERNANCE_CHANGE_CONTRACT` | 30 | Classified documentation |

### Disposition Breakdown

| Disposition | Count | Meaning |
|---|---|---|
| `KEEP-LOCAL` | 1030 | Verified active instruction / architecture spec maintained in place |
| `ARCHIVE` | 42 | Retained non-normative history / change contracts / dated audits |
| `MIGRATE` | 0 | Unique content relocated during prior consolidation steps |
| `MERGE` | 0 | Duplicate active guidance merged into canonical docs |
| `DELETE` | 0 | Proposed deletions executed in previous cleanup phase |

---

## 3. Complete Ledger Sample (Top 50 Representative Entries)

| Path | Document Class | Owner | Status | Disposition | SHA-256 | Validation |
|---|---|---|---|---|---|---|
| `.agents/agents/ENTERPRISE_AGENT_FLEET.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `8087c9cf56a7` | **PASS** |
| `.agents/CONTROL_CENTER_EXECUTION_LEDGER.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `7c682d14d42e` | **PASS** |
| `.agents/flow/EXECUTION_FLOW_STATE_MACHINE.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `ccb15dfce64c` | **PASS** |
| `.agents/governance/ENTERPRISE_SAAS_GOVERNANCE.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `1cba55e5a0e1` | **PASS** |
| `.agents/HOSTED_AUTH_COMPACT_UI_CHANGE_CONTRACT.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `1c1cbd5bbc71` | **PASS** |
| `.agents/knowledge/REVENUE_FIRST_SAAS_ROADMAP.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `da0aabbb3138` | **PASS** |
| `.agents/knowledge/SALESFORCE_OVERTAKE_KNOWLEDGE_BASE.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `495b9f93543d` | **PASS** |
| `.agents/memory/ENTERPRISE_SAAS_MEMORY_SYSTEM.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `d194a1b87757` | **PASS** |
| `.agents/reference/ENTERPRISE_SAAS_REFERENCE_MANUAL.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `01b906bf4337` | **PASS** |
| `.agents/rules/ENTERPRISE_SAAS_RULES.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `4da0c85e1f85` | **PASS** |
| `.agents/skills/salesforce-overtake-engine/SKILL.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `ed82a80554a0` | **PASS** |
| `.agents/standards/ENTERPRISE_SAAS_STANDARDS.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `298282763131` | **PASS** |
| `.agents/workflow/ENTERPRISE_SAAS_WORKFLOW.md` | `ENTERPRISE_AGENT_FLEET_STANDARD` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `c57c4f18b07a` | **PASS** |
| `AGENTS.md` | `ROOT_AGENT_PROTOCOL_ENTRYPOINT` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `67c13566597a` | **PASS** |
| `AI_AGENT_PROTOCOL.md` | `ROOT_AGENT_PROTOCOL_ENTRYPOINT` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `8c41126852f1` | **PASS** |
| `api/.agents/rules/API_ARCHITECTURE_STANDARDS.md` | `REPOSITORY_DOCUMENTATION` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `89204e21b974` | **PASS** |
| `api/.agents/rules/API_CONTRACT_STANDARDS.md` | `REPOSITORY_DOCUMENTATION` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `62eca91626ed` | **PASS** |
| `api/.agents/rules/API_MODULE_EXTRACTION_GUIDE.md` | `REPOSITORY_DOCUMENTATION` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `bb296fa49bdd` | **PASS** |
| `api/.agents/rules/API_OBSERVABILITY_STANDARDS.md` | `REPOSITORY_DOCUMENTATION` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `6aff6bbdd843` | **PASS** |
| `api/.agents/rules/API_SECURITY_STANDARDS.md` | `REPOSITORY_DOCUMENTATION` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `d4e01064d567` | **PASS** |
| `api/.agents/rules/API_TESTING_STANDARDS.md` | `REPOSITORY_DOCUMENTATION` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `6b83fd501b85` | **PASS** |
| `api/.agents/skills/api-architecture-standards/SKILL.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `8f238045d3d2` | **PASS** |
| `api/.github/pull_request_template.md` | `AI_PR_ATTESTATION_TEMPLATE` | `PLT-BIZ` | `ACTIVE` | `KEEP-LOCAL` | `ab7cd58aba93` | **PASS** |
| `api/AGENTS.md` | `REPOSITORY_AGENT_INSTRUCTIONS` | `PLT-BIZ` | `ACTIVE` | `KEEP-LOCAL` | `9d5ec79509e6` | **PASS** |
| `api/ARCHITECTURE.md` | `REPOSITORY_ARCHITECTURE_SPEC` | `PLT-BIZ` | `ACTIVE` | `KEEP-LOCAL` | `d6afd9b6fc14` | **PASS** |
| `business-suite/.agents/rules/TENANT_APPS_GOVERNANCE_STANDARDS.md` | `REPOSITORY_DOCUMENTATION` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `c094cf517816` | **PASS** |
| `business-suite/.agents/skills/references/01-STRATA-TOKEN-CATALOGUE.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `6e433874a659` | **PASS** |
| `business-suite/.agents/skills/references/02-FLOORPLAN-SELECTION-MATRIX.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `0ee13faeb06a` | **PASS** |
| `business-suite/.agents/skills/references/03-HIGH-DENSITY-DATAGRID-GUIDE.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `a85201bfe0da` | **PASS** |
| `business-suite/.agents/skills/references/04-FIVE-FILE-COMPONENT-ANATOMY.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `1c3012cbdabb` | **PASS** |
| `business-suite/.agents/skills/SKILL.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `5f9275b70920` | **PASS** |
| `business-suite/.agents/skills/tenant-apps-standards/SKILL.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `16e144805592` | **PASS** |
| `business-suite/.github/pull_request_template.md` | `AI_PR_ATTESTATION_TEMPLATE` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `ab7cd58aba93` | **PASS** |
| `business-suite/AGENTS.md` | `REPOSITORY_AGENT_INSTRUCTIONS` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `6954928df4f5` | **PASS** |
| `business-suite/ARCHITECTURE.md` | `REPOSITORY_ARCHITECTURE_SPEC` | `PLT-OPS` | `ACTIVE` | `KEEP-LOCAL` | `6975a5d4b84c` | **PASS** |
| `contracts/.agents/skills/contracts-standards/SKILL.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `8562be3ea94c` | **PASS** |
| `contracts/.github/pull_request_template.md` | `AI_PR_ATTESTATION_TEMPLATE` | `PLT-BIZ` | `ACTIVE` | `KEEP-LOCAL` | `ab7cd58aba93` | **PASS** |
| `contracts/AGENTS.md` | `REPOSITORY_AGENT_INSTRUCTIONS` | `PLT-BIZ` | `ACTIVE` | `KEEP-LOCAL` | `7bc562f9b856` | **PASS** |
| `contracts/ARCHITECTURE.md` | `REPOSITORY_ARCHITECTURE_SPEC` | `PLT-BIZ` | `ACTIVE` | `KEEP-LOCAL` | `e76acb108b53` | **PASS** |
| `data/.agents/skills/data-persistence-standards/SKILL.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `d1fd55134f1b` | **PASS** |
| `data/.github/pull_request_template.md` | `AI_PR_ATTESTATION_TEMPLATE` | `PLT-BIZ` | `ACTIVE` | `KEEP-LOCAL` | `ab7cd58aba93` | **PASS** |
| `data/AGENTS.md` | `REPOSITORY_AGENT_INSTRUCTIONS` | `PLT-BIZ` | `ACTIVE` | `KEEP-LOCAL` | `2d5d198af37f` | **PASS** |
| `data/ARCHITECTURE.md` | `REPOSITORY_ARCHITECTURE_SPEC` | `PLT-BIZ` | `ACTIVE` | `KEEP-LOCAL` | `2c70aab97d9a` | **PASS** |
| `design-system/.agents/skills/design-system-standards/SKILL.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `54c5d685c7f1` | **PASS** |
| `design-system/.agents/skills/references/01-STRATA-TOKEN-CATALOGUE.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `6e476e2217de` | **PASS** |
| `design-system/.agents/skills/references/02-FLOORPLAN-SELECTION-MATRIX.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `899ca2ee516f` | **PASS** |
| `design-system/.agents/skills/references/03-HIGH-DENSITY-DATAGRID-GUIDE.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `5f0bc3f4b4e3` | **PASS** |
| `design-system/.agents/skills/references/04-FIVE-FILE-COMPONENT-ANATOMY.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `c2323485ce76` | **PASS** |
| `design-system/.agents/skills/SKILL.md` | `AGENT_SKILL_AND_REFERENCE` | `CROSS-PLATFORM` | `ACTIVE` | `KEEP-LOCAL` | `d95304aae2c5` | **PASS** |
| `design-system/.github/pull_request_template.md` | `AI_PR_ATTESTATION_TEMPLATE` | `PLT-DS` | `ACTIVE` | `KEEP-LOCAL` | `9308e0bac017` | **PASS** |

*(Complete data for all 1072 entries is recorded in `platform/workspace/governance/markdown-disposition-ledger.json`)*
