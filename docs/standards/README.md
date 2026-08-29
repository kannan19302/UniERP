# Cross-platform Standards

These documents define requirements shared by multiple platforms. Platform documents reference them and add
only platform-specific constraints.

- [Documentation governance](DOCUMENTATION_GOVERNANCE.md)
- [Traceability](TRACEABILITY.md)
- [Cross-platform standard traceability matrix](TRACEABILITY_MATRIX.md)
- [API and event compatibility](API_COMPATIBILITY.md)
- [Security and IAM baseline](SECURITY_BASELINE.md)
- [Data lifecycle](DATA_LIFECYCLE.md)
- [Testing and quality evidence](QUALITY_AND_TESTING.md)
- [Reliability and operations](RELIABILITY_AND_OPERATIONS.md)
- [Repository, package and toolchain standard](REPOSITORY_AND_TOOLCHAIN_STANDARD.md)
- [Accessibility](ACCESSIBILITY.md)
- [AI agent development protocol](AI_AGENT_DEVELOPMENT_PROTOCOL.md)
- [AI knowledge lifecycle](AI_KNOWLEDGE_LIFECYCLE.md)
- [AI change contract and evidence template](AI_CHANGE_CONTRACT_TEMPLATE.md)
- [AI development cycle status template](AI_CYCLE_STATUS_TEMPLATE.md)
- [AI development playbooks](AI_AGENT_PLAYBOOKS.md)
- [AI-assisted pull-request attestation](AI_PR_ATTESTATION_TEMPLATE.md)
- [AI agent protocol changelog](AI_AGENT_PROTOCOL_CHANGELOG.md)
- [AI agent conformance ledger](AI_AGENT_CONFORMANCE_LEDGER.md)

The machine-readable conformance profile for development agents is
[`AI_AGENT_PROTOCOL.json`](AI_AGENT_PROTOCOL.json). The workspace discovery entry point remains the root
`AGENTS.md`; vendor adapters may point to it but must not redefine this standard.

The project-level `unierp-workspace/governance/skills/unierp-enterprise-brain/` skill provides a provider-neutral operational
navigation layer over these authorities. It is not a competing product or architecture source of truth.

The manifest is defined by [`AI_AGENT_PROTOCOL.schema.json`](AI_AGENT_PROTOCOL.schema.json), and every repository
listed by the workspace is assigned through [`AI_REPOSITORY_PLATFORM_MAP.json`](AI_REPOSITORY_PLATFORM_MAP.json).
