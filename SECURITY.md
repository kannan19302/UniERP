# Security policy

## Reporting

**Do not open a public issue.** Use GitHub's private vulnerability reporting on
this repository, or email `security@unierp.dev`.

A public issue describing a cross-tenant read tells every operator running
UniERP and every attacker looking at it, simultaneously. Operators cannot patch
faster than an attacker can exploit.

We acknowledge within 3 working days.

## What we consider critical

UniERP is multi-tenant, so the severity ceiling is set by blast radius rather
than by cleverness:

| Class | Why it is critical |
| :---- | :----------------- |
| **Cross-tenant data access** | One tenant reading, writing or enumerating another's data — through the API, raw SQL, an extension, or a report |
| **Control-plane escalation** | Any path by which a customer administrator reaches provider-global operations. This has been real here twice; see `PLATFORM_ARCHITECTURE.md` § 1.2 |
| **Sandbox escape** | Extension code reaching ambient authority — `process`, the filesystem, an unscoped database handle |
| **Authentication bypass** | Reaching an authenticated route without a session, or a route that documents a permission it does not enforce |
| **Money correctness** | Anything that makes a stored monetary value disagree with the sum of its postings |

## What we have already hardened, and how

Stated so you know where to look, and so a report can say "this defence is
bypassed" rather than starting from scratch:

- Tenant isolation is enforced at **four** layers, of which the database is the
  only one that constitutes proof: RLS `ENABLE` + `FORCE` on every tenant table,
  application role `NOBYPASSRLS`, and a generated two-tenant test per table.
- Control-plane permissions live in reserved namespaces that a tenant grant —
  including a wildcard — cannot satisfy, plus a guard that asserts the boundary
  structurally and requires MFA on the session.
- Extension code runs in a V8 isolate with capability-scoped host functions,
  metered CPU/memory/query/egress budgets, and a kill switch. Every capability
  re-checks its scope on the host side.
- Extension bundles are Ed25519-signed with the **manifest inside the digest**,
  so requested scopes cannot be escalated in transit.

## Out of scope

- Findings from automated scanners with no demonstrated exploit path
- Denial of service by resource exhaustion on a self-hosted instance you control
- Missing hardening headers on the marketing site
