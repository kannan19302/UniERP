> **Repository evidence:** Relocated from `shared/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-shared

This repository is **L1 — Foundation** in the UniERP layered architecture.
It may depend on **L0**, and nothing else.

## The rule that matters most here

`hasPermission` lives here. It refuses to let a tenant-scoped grant — including a bare `*` — satisfy a control-plane permission. That refusal closed a confirmed escalation.

## Before you push

```bash
npm install
node scripts/check-layer.mjs   # if present: asserts the layer rule
npx tsc --noEmit
```

A dependency on a higher or sideways layer will fail CI. That is deliberate: the
whole reason this is a polyrepo rather than a monorepo is that the boundary
becomes impossible to cross rather than merely discouraged.

## Standards

See `unierp-platform/CONTRIBUTING.md` (legacy reference: `../unierp-platform/CONTRIBUTING.md`) for
the platform-wide non-negotiables — tenant isolation, route guards, money as
Decimal, and never suppressing a check to make it pass.


