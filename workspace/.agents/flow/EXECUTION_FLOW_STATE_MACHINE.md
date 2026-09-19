<!-- UniERP-Enterprise-SAAS-Flow: 1.0.0 -->
# Agent execution state machine

This is an operational adapter to the [canonical protocol](../../../docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md).

~~~mermaid
stateDiagram-v2
    [*] --> Discover
    Discover --> DefineScope
    DefineScope --> Implement: prerequisites and authority available
    DefineScope --> ReportBlocked: external prerequisite missing
    Implement --> Verify
    Verify --> Review: required gates pass
    Verify --> Diagnose: failure or missing evidence
    Diagnose --> Implement: in-scope repair identified
    Diagnose --> ReportBlocked: external prerequisite missing
    Diagnose --> ReportPartial: remaining work identified
    Review --> Implement: actionable defect found
    Review --> ReportComplete: all acceptance criteria proven
    ReportBlocked --> [*]
    ReportPartial --> [*]
    ReportComplete --> [*]
~~~

Report the exact failed-validation state when checks fail; do not turn it into completion. Continue useful,
authorized remediation without widening the request to the global backlog. Retry after a concrete correction
or environment change, not indefinitely on identical evidence.

Source-control actions are separate, explicitly authorized operations under
[LAW-11](../rules/ENTERPRISE_SAAS_RULES.md#law-11-authorized-source-control). A local verified patch may be handed
off without a commit or push when those actions were not requested. Scores never substitute for acceptance evidence.
