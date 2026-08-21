> **Repository evidence:** Relocated from `sandbox/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-sandbox

This repository is **L2 — Runtime** in the UniERP layered architecture.
It may depend on **L0, L2**, and nothing else.

## The rule that matters most here

**No ambient authority.** No `process`, no `require`, no `fetch`, no filesystem — the identifiers do not exist. Every host capability re-checks its scope on the host side, because a capability handed in is not a capability trusted. Its own repository so the isolation contract is reviewable independently of what runs inside it.

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


