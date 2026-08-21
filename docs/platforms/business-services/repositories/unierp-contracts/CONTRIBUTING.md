> **Repository evidence:** Relocated from `unierp-contracts/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-contracts

This repository is **L0 — Contract** in the UniERP layered architecture.
It may depend on **nothing**, and nothing else.

## The rule that matters most here

**Zero dependencies, by construction.** It can never be made to depend on an implementation — that single property is what keeps the whole dependency graph acyclic. CI asserts the dependency count is 0.

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


