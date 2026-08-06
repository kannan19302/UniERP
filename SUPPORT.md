# Support

UniERP is maintained by one person and has no commercial support offering. There
is no SLA. What follows is where to ask, and what response to realistically
expect.

## Where to ask

| You have | Go to |
| :------- | :---- |
| A **security vulnerability** | [Private advisory](https://github.com/kannan19302/UniERP/security/advisories/new). Never a public issue — see [`SECURITY.md`](SECURITY.md) |
| A **bug in specific code** | An issue on the repository that owns it, from the [repository map](README.md#repository-map) |
| A **deployment or Compose problem** | [`unierp-infra`](https://github.com/kannan19302/unierp-infra) |
| A **question** — how something works, which repository owns what, whether an approach is sensible | [Discussions](https://github.com/kannan19302/UniERP/discussions) |
| Something **wrong or unclear in the documentation** | An issue [here](https://github.com/kannan19302/UniERP/issues) |
| A **feature idea** | Discussions first, after checking [`ROADMAP.md`](ROADMAP.md). It becomes an issue once it is concrete |

Reporting a bug in the repository that owns the code — rather than here — is the
single biggest thing you can do to get it fixed quickly.

## What to include

Most issues that go unanswered do so because nobody could reproduce them. A
report that lands well has:

- **What you ran**, verbatim, including the repository and the commit.
- **What happened**, verbatim — the full error, not a paraphrase.
- **What you expected instead.**
- **Your environment**: OS, Node version, pnpm version, Docker version, and
  whether you are running the `ERPSys` monorepo or an extracted repository.

That last one matters more than it looks. The extracted L3/L4 repositories
[cannot yet install standalone](ROADMAP.md#where-the-project-actually-is), so
`npm install` failing there with `EUNSUPPORTEDPROTOCOL: Unsupported URL Type
"workspace:"` is a known state of the migration, not a bug in your setup.

## What to expect

- **First response: within a week**, usually sooner.
- **Security reports: acknowledged within 3 working days.** These jump the
  queue ahead of everything else.
- Questions answered in an issue stay public, so the next person finds them.
- An issue nobody can reproduce may be closed. That is not a judgement about
  whether it is real — reopen it with more detail and it gets looked at again.

## Things worth reading first

| | |
| :-- | :-- |
| How the system is put together | [`ARCHITECTURE.md`](ARCHITECTURE.md) |
| The full specification, including what is currently broken | [`PLATFORM_ARCHITECTURE.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/PLATFORM_ARCHITECTURE.md) |
| Running it locally | [Run it locally](README.md#run-it-locally) |
| What is planned, and what is deliberately not | [`ROADMAP.md`](ROADMAP.md) |
| Who decides, and how to get commit rights | [`GOVERNANCE.md`](GOVERNANCE.md) |
