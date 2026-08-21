> **Repository evidence:** Relocated from `tenant-apps/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-web

This repository is **L4 — Presentation** in the UniERP layered architecture.
It may depend on **L0–L2, and the SDK**, and nothing else.

## The rule that matters most here

Depends on the **SDK**, never on the API's source. That is what makes the boundary a version number rather than a coupling.

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


