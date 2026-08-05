# Contributing to UniERP

## Before your first change

UniERP runs real businesses. The rules below are not style preferences; each one
exists because its absence caused a specific, documented failure.

Read `ERPSys/docs/ai/README.md` and `CODE_STANDARDS.md`.

## The non-negotiables

| Rule | Why |
| :--- | :-- |
| Every table has `tenantId`, an RLS policy, and a passing two-tenant test | The database is the only layer that *proves* isolation. Application filters are a convention |
| Every endpoint declares `@Permissions(...)` **and** carries a guard that reads it | `@Permissions` alone only writes metadata. 449 routes once looked protected in Swagger and were open |
| Money is `Decimal(19,4)` — never `Float`, and never summed through `Number()` | Exact at rest is worthless if the arithmetic drifts |
| Never suppress a check to make it pass | No `@ts-nocheck`, `eslint-disable`, `continue-on-error`, `|| true`, `--no-verify`. A failing check means the code is wrong |
| A repository depends only on a **strictly lower** layer | Enforced by `scripts/check-layer.mjs` in each repo. Not a convention |
| Isolation tests connect as the **application role** | A two-tenant test run as the owner passes against a table with no policy at all — worse than no test |

## Workflow

```bash
pnpm install
docker compose -f docker-compose.dev.yml up -d
pnpm verify          # the same gates CI runs
```

`pnpm verify` must be green before you push. It is not advisory.

## Pull requests

- One unit of work per PR
- A line appended to `docs/ai/CHANGELOG.md` — no exceptions, including doc fixes
- A test that **fails without your change**. For a bug fix, demonstrate the gate
  or test would have caught it
- Conventional commit subject, lower case, under 100 characters

## Reviewing

The standing checklist is `CODE_STANDARDS.md` § 9. The question that matters most:
**does this claim a guarantee it does not deliver?** A sandbox that does not
isolate, a gate that cannot fail, a test that skips its own assertion — those are
the defects this codebase has repeatedly produced, and they all passed review once.
