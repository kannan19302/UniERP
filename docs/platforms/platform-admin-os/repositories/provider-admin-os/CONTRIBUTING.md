> **Repository evidence:** Relocated from `provider-admin-os/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-console

This repository is **L4 — Presentation** in the UniERP layered architecture.
It may depend on **L0–L2, and the SDK**, and nothing else.

## The rule that matters most here

**A separate repository reinforces the trust boundary.** Console code cannot accidentally import a tenant component, and tenant-plane code cannot link against control-plane handlers at all. It runs on its own origin, its own IdP realm, with mandatory MFA and restricted ingress — because the only thing that once separated a customer from platform-global control was a permission string, and that failed twice.

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


