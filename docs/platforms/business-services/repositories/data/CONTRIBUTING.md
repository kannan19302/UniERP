> **Repository evidence:** Relocated from `data/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-data

This repository is **L2 — Runtime** in the UniERP layered architecture.
It may depend on **L0**, and nothing else.

## The rule that matters most here

**This repository owns the only layer of tenant isolation that is proof rather than convention:** RLS `ENABLE` and `FORCE` on every tenant table, an application role that is `NOBYPASSRLS`, and a generated two-tenant test per table. Isolation tests must connect as the *application* role — a test run as the owner passes against a table with no policy at all.

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


