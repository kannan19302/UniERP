# Contributing to UniERP

UniERP is a **layered polyrepo**. This repository is the landing page and the
map — it holds documentation and CI, and no application code. Where your change
goes depends on what you are changing, so start here.

## Which repository am I changing?

| You want to change | Go to |
| :----------------- | :---- |
| The repository map, architecture overview, or community files | **this repository** — see [Changing this repository](#changing-this-repository) |
| API, web, data, kernel, sandbox, SDK — any actual code | The repository that owns it, from the [repository map](README.md#repository-map) |
| Anything you can only build and test as a whole | [`ERPSys`](https://github.com/kannan19302/ERPSys), the development monorepo — see [Changing the platform](#changing-the-platform) |
| Deployment, Compose, Kubernetes, runbooks | [`unierp-infra`](https://github.com/kannan19302/unierp-infra) |

If you are not sure, open an issue here and it will be routed. Getting this
wrong costs you a re-open, not goodwill.

## Changing this repository

There is no build. Edit the Markdown, then:

```bash
bash scripts/sync-profile.sh
```

`profile/` holds published copies of `README.md` and `ARCHITECTURE.md`, and CI
requires them to be byte-identical. Running the script and committing the result
is the whole workflow. CI also link-checks every URL in the repository, so a
repository you rename or a document you move is caught before merge, not by a
reader hitting a 404.

Good first contributions here: a broken link, a repository description that no
longer matches what the repository does, a step in [Run it
locally](README.md#run-it-locally) that did not work on your machine. That last
one is genuinely valuable — the setup is only verified on the maintainer's
platforms.

## Changing the platform

UniERP runs real businesses. The rules below are not style preferences; each one
exists because its absence caused a specific, documented failure.

Read [`docs/ai/README.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/ai/README.md)
and [`docs/ai/CODE_STANDARDS.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/ai/CODE_STANDARDS.md)
in `ERPSys` first.

### The non-negotiables

| Rule | Why |
| :--- | :-- |
| Every table has `tenantId`, an RLS policy, and a passing two-tenant test | The database is the only layer that *proves* isolation. Application filters are a convention |
| Every endpoint declares `@Permissions(...)` **and** carries a guard that reads it | `@Permissions` alone only writes metadata. 449 routes once looked protected in Swagger and were open |
| Money is `Decimal(19,4)` — never `Float`, and never summed through `Number()` | Exact at rest is worthless if the arithmetic drifts |
| Never suppress a check to make it pass | No `@ts-nocheck`, `eslint-disable`, `continue-on-error`, `\|\| true`, `--no-verify`. A failing check means the code is wrong |
| A repository depends only on a **strictly lower** layer | Enforced by `scripts/check-layer.mjs` in each repo. Not a convention |
| Isolation tests connect as the **application role** | A two-tenant test run as the owner passes against a table with no policy at all — worse than no test |

### Workflow

```bash
git clone https://github.com/kannan19302/ERPSys
cd ERPSys
pnpm install
pnpm dev             # datastores in Docker, applications native
pnpm verify          # the same gates CI runs
```

`pnpm verify` must be green before you push. It is not advisory. Prerequisites
are Node 20+, pnpm 9+ and Docker; `pnpm dev` brings up PostgreSQL 16, Redis and
MinIO.

If `pnpm verify` fails for a reason you believe is unrelated to your change, say
so in the pull request rather than working around it. A gate that fails
spuriously is itself a bug worth reporting.

### Pull requests

- One unit of work per PR
- A line appended to [`docs/ai/CHANGELOG.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/ai/CHANGELOG.md) — no exceptions, including doc fixes
- A test that **fails without your change**. For a bug fix, demonstrate the gate
  or test would have caught it
- Conventional commit subject, lower case, under 100 characters

Expect a first response within a week. UniERP is currently maintained by one
person — see [`GOVERNANCE.md`](GOVERNANCE.md) for what that means for your
contribution and how that is intended to change.

### Reviewing

The standing checklist is `CODE_STANDARDS.md` § 9. The question that matters most:
**does this claim a guarantee it does not deliver?** A sandbox that does not
isolate, a gate that cannot fail, a test that skips its own assertion — those are
the defects this codebase has repeatedly produced, and they all passed review once.

## Licence and conduct

Contributions are accepted under [AGPL-3.0](LICENSE), the licence the project
ships under. By opening a pull request you agree your contribution may be
distributed under it. There is no separate CLA.

Participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).
