> **Repository evidence:** Relocated from `api/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-api

This repository is **L3 — Service** in the UniERP layered architecture.
It may depend on **L0, L1, L2**, and nothing else.

## The rule that matters most here

**The 45 business modules stay here deliberately.** Finance, inventory and commerce write to each other constantly — a stock movement posts a GL entry, an invoice reserves inventory. Splitting them would mean a distributed transaction on the most correctness-critical paths in the system. Extraction is *earned*, one module at a time, when it proves an independent scaling profile.

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


