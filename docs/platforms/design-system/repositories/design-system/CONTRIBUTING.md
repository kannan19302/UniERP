> **Repository evidence:** Relocated from `design-system/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-design-system

This repository is **L1 — Foundation** in the UniERP layered architecture.
It may depend on **nothing in the workspace**, and nothing else.

## The rule that matters most here

**No dependency on the API or the database.** That is what makes "a UI component cannot import a service" structural rather than a lint rule. It is one package with subpath exports, not fourteen — publishing fourteen would create 42 version-coherence problems per release.

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


