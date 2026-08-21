> **Repository evidence:** Relocated from `config/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-config

This repository is **L1 — Foundation** in the UniERP layered architecture.
It may depend on **nothing**, and nothing else.

## The rule that matters most here

Every repo extends this rather than copying it. A hand-copied config is how the Dockerfile bug of § 1.1 propagated to four repositories and was fixed three separate times.

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


