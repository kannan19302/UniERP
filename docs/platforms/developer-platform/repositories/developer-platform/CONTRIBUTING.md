> **Repository evidence:** Relocated from `developer-platform/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-developer

This repository is **L4 — Presentation** in the UniERP layered architecture.
It may depend on **L0, L1, L2, and L3 through the SDK only**, and nothing else.

## The rule that matters most here

**App Studio is a client of the public extension API, with no privileged path.** Anything the
builders can do, a third-party developer must be able to do through
[`unierp-extension-api`](https://github.com/kannan19302/unierp-extension-api). A private hook
added here to make a builder work is a hook that must be made public instead — that constraint
is the only thing keeping the extension API honest (§ 8.5).

## Before you push

```bash
npm install
npx tsc --noEmit
```

A dependency on a higher or sideways layer will fail CI. That is deliberate: the
whole reason this is a polyrepo rather than a monorepo is that the boundary
becomes impossible to cross rather than merely discouraged.

## Standards

See [`UniERP/CONTRIBUTING.md`](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md)
for the platform-wide non-negotiables — tenant isolation, route guards, money as
`Decimal(19,4)`, and never suppressing a check to make it pass.

