# Roadmap

**No dates.** UniERP is maintained by one person (see [`GOVERNANCE.md`](GOVERNANCE.md)),
and a dated roadmap from a single maintainer is a wish list. What follows is
ordered by what blocks what.

Everything here is drawn from the project's own architecture review,
[`PLATFORM_ARCHITECTURE.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/PLATFORM_ARCHITECTURE.md)
§ 14, which is worth reading if you want the unabridged version including the
things that are currently broken.

## Where the project actually is

Honest summary, because the repository map can read as more finished than it is:

- The **architecture** is the layered polyrepo described in the [repository
  map](README.md#repository-map). Those repositories exist and carry real code.
- The **build** is still [`ERPSys`](https://github.com/kannan19302/ERPSys), the
  development monorepo the polyrepo was extracted from. `pnpm dev` and
  `pnpm smoke` work there.
- The extracted L3/L4 repositories are faithful copies, **not yet standalone
  projects**. They still declare `@kannan19302/*` as `workspace:*`, so `npm install`
  in a clean clone fails with `EUNSUPPORTEDPROTOCOL`.
- There are **no tagged releases and no published container images** yet.
- Every active repository in the family is **AGPL-3.0**, including the `ERPSys`
  monorepo. It was previously All Rights Reserved, which quietly contradicted
  this project's claim to be self-hostable in full.

Extraction is finished when a consumer can install the artifact and compile
against it — not when a directory exists and a tag is written.

## Now — the one thing that blocks the rest

**Publish `@kannan19302/*` to a registry CI can reach.**

The self-hosted Verdaccio answers on `localhost` only. That is why the first
cutover was reverted: every `pnpm install --frozen-lockfile` on a runner
resolved `@kannan19302` against the runner's own localhost.

**Decided: the public npm registry.** This paragraph previously said GitHub
Packages was "the obvious candidate, since the OIDC-federated publish tokens
already exist there." That was wrong, and not marginally — **GitHub Packages
cannot host this scope at all.** It requires the npm scope to equal the account
or organisation that owns the repository; these repositories are owned by the
user `kannan19302` while the packages are scoped `@kannan19302`. No `unerp`
organisation exists, and the `unierp` one that does still would not match.

The public registry is also the better answer on its merits, not merely the
available one: a self-hoster can `npm install @kannan19302/kernel` with no
authentication, which is what a claim to be self-hostable in full under
AGPL-3.0 actually requires. Publishing uses npm trusted publishing, so there is
no long-lived token to leak — which matters here, because fourteen were
committed once.

This was one decision, not one commit, and almost everything below depended on
it. Mechanism: `unierp-workspace/.github/workflows/publish-library.yml`, called
by each of the 13 publishable libraries. Remaining: the `unerp` npm
organisation, and a first publish.

## Next — what falls out once packages resolve

- **Standalone installs for the extracted repositories.** Replace `workspace:*`
  with published versions; remove the `../../scripts/*` paths that reach outside
  a repository root.
- **Per-repository container images.** The `unierp-api`, `unierp-web` and
  `unierp-idp` Dockerfiles were removed rather than repaired, because each one
  `COPY`d monorepo paths and failed on its first instruction. A Dockerfile at a
  repository root asserts that `docker build .` works; these could not. They
  come back when they can.
- **Close the `verify` / CI divergence.** CI runs gates `pnpm verify` does not,
  so a contributor can run the documented pre-push command, be told the change
  is clean, and still fail CI on something they had no local way to check.
- **A first tagged release**, once a released artifact means something more than
  a snapshot of the monorepo.

## Later

- Reduce the outstanding dependency advisories. The last count was 39 total,
  21 high and 1 critical, down from 78 / 39 / 2.
- Work through the open CodeQL alerts, which pre-date the current work on `main`.
- Per-repository published documentation, rather than the map in this README.

## Out of scope, deliberately

- **Splitting the API into microservices.** Finance, inventory and sales write
  to each other constantly; splitting them means a distributed transaction on
  the most correctness-critical paths in the system.
- **A hosted SaaS offering.** UniERP is self-hosted. That is the product.
- **An open-core edition.** Tenant isolation, the sandbox and the audit trail
  are the parts most worth paying for, and holding them back would make the
  AGPL claim hollow.

## Influencing this

Open an issue. If you want something moved up, the most persuasive argument is a
concrete use case you are blocked on — and the most persuasive of all is a pull
request. The **Now** item above is the highest-leverage place to help.
