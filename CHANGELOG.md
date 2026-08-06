# Changelog

All notable changes to **this repository** — the UniERP landing page, repository
map and community documentation.

This is not the platform changelog. Changes to the code live in
[`ERPSys/docs/ai/CHANGELOG.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/ai/CHANGELOG.md)
and in each repository from the [map](README.md#repository-map).

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
UniERP has **no tagged releases yet** — see [`ROADMAP.md`](ROADMAP.md) for what a
first release is waiting on. Until then everything lands under Unreleased, and
there is deliberately no version number pretending otherwise.

## [Unreleased]

### Added

- `GOVERNANCE.md` — that the project has a single maintainer, what that means
  for your contribution, and the path to commit rights.
- `ROADMAP.md` — what is planned, what blocks it, and what is deliberately out
  of scope. No dates.
- `SUPPORT.md` — where to ask, what to include, and what response to expect.
- `CHANGELOG.md`, this file.
- `CITATION.cff`, so the project can be cited.
- A pull request template.
- `scripts/sync-profile.sh`, which regenerates the published `profile/` copies.
- `.gitattributes` pinning LF, so the byte-identical profile comparison does not
  depend on the contributor's platform.
- Dependabot updates for the GitHub Actions this repository uses.
- CI now link-checks every URL in the repository. As a map of roughly thirty
  repositories, its most common failure mode is a link that no longer resolves.

### Changed

- `LICENSE` now contains the AGPL-3.0 text rather than a URL pointing at it.
  GitHub reads the file, so the repository previously reported `License: Other`
  while the README badge claimed AGPL-3.0.
- `CODE_OF_CONDUCT.md` now contains the Contributor Covenant v2.1 it claimed to
  follow, including the enforcement ladder.
- `CONTRIBUTING.md` split into changing this repository versus changing the
  platform. It previously opened with `pnpm install` in a repository that has no
  pnpm project.
- The CI profile-sync check covers `ARCHITECTURE.md` as well as `README.md`, and
  names the fix in its failure message.

### Fixed

- `profile/README.md` had drifted 43 lines behind `README.md`, leaving CI red on
  `main`.
- Issue-template contact links pointed at `github.com/unierp/*`, an organisation
  that does not exist. The security reporting link 404'd.
- `CODEOWNERS` named `@unierp/platform-team`. Teams exist only inside GitHub
  organisations, so under a personal account it matched nobody and silently
  requested no reviews.
- "Understanding the design" linked to `unierp-workspace` for
  `PLATFORM_ARCHITECTURE.md`, which lives in `ERPSys/docs`.

## 2026-08-05

Repository created, with the initial repository map, architecture overview and
community files.

[Unreleased]: https://github.com/kannan19302/UniERP/commits/main
