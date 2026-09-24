    <!-- UniERP-Agent-Protocol: 1.1.0 -->
    # platform agent rules

    This is the only repository agent instruction file. Read [the workspace entrypoint](../AGENTS.md),
    the [canonical protocol](../platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md),
    the enterprise brain, applicable accepted ADRs and the owning platform requirements before
    material work. Follow authority precedence; this file narrows implementation behavior only.
    If a required authority is missing, stop before mutation.

    **Layer:** L7. **Accountable platform:** PLT-OPS. **Scope:** Product documentation, governance, infrastructure and release operations.
    Resolve actual dependencies, packages and scripts from current manifests and the platform catalog.
    Preserve unrelated changes. Define numbered acceptance criteria and a knowledge delta before editing.
    For coordinated changes, publish the change contract, validate upstream first, and hand off
    to downstream consumers with exact evidence.

    ## Repository rules

    - Keep product intent, accepted ADRs, platform requirements, contracts, standards, operations and dated evidence in their owning sources; do not duplicate authority in generated inventories.
- Governance checks fail on zero discovery, stale paths or missing prerequisites. Infrastructure uses reviewed IaC and no embedded secrets; validate affected compose files with `docker compose config` and Terraform with `terraform fmt -check` and `terraform validate`.
- Build once, retain exact-commit provenance, rehearse migration and restore, and require explicit production release authorization.

    ## Verification

    Run applicable commands from this repository, plus risk-specific contract, security, data,
    accessibility, integration, migration or release gates required by the canonical protocol:
    node workspace/scripts/test-estate.mjs; node workspace/scripts/check-active-estate-catalog.mjs; node workspace/scripts/test-layer.mjs; node workspace/scripts/check-ai-agent-protocol.mjs; node workspace/scripts/test-ai-agent-protocol.mjs

    A command's presence here is not proof that it ran. Report exact results, failures and NOT RUN
    reasons; review the diff; then follow the canonical status and source-control procedure.
