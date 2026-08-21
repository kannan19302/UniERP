# Security Vulnerability Reporting

Do not report suspected vulnerabilities in public issues. Use the repository host's private vulnerability
reporting channel or email `security@unierp.dev`. The declared acknowledgement target is three working days;
operational ownership and monitored-channel evidence must be verified before representing that target as an SLO.

## Critical classes

- cross-tenant read, write or enumeration;
- provider control-plane escalation from a tenant or public principal;
- authentication, token, session or delegation bypass;
- extension sandbox escape or capability/budget bypass;
- financial posting or stored-money integrity failure;
- signing key, secret, build or release supply-chain compromise;
- audit suppression or security evidence tampering.

Include affected platform/version, reproducible steps, impact, prerequisites and safe contact details. Do not
include real customer data or production secrets. Coordinated disclosure timing is agreed privately based on
blast radius, patch availability and operator notification needs.

Automated scanner output without validation is triaged but is not automatically a confirmed vulnerability.
Self-hosted operational misconfiguration remains actionable documentation feedback even where the deployment is
outside the managed SaaS boundary.
