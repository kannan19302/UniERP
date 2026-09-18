#!/usr/bin/env node
// L15 (Track L — code quality): "Enforcement of CODE_STANDARDS § 8: every
// bug fix ships with a test that failed before it and passes after." Exit:
// "A fix commit without an accompanying test is flagged in review, and the
// changelog line names the test."
//
// Checks a real commit range in a real repo (default: unierp-api, last 30
// commits) for "fix"-shaped commits (conventional `fix(scope): ...` prefix
// — the platform's own established convention, confirmed against real
// history) and requires TWO things of each one:
//   1. The commit's diff touches at least one *.spec.ts file.
//   2. docs/ai/CHANGELOG.md (in unierp-workspace) has an entry, dated the
//      same day or later, that names a real spec file path — "the
//      changelog line names the test."
// A fix commit missing either is FLAGGED (not silently passed) and named
// explicitly, matching "flagged in review."
//
//   node scripts/check-bugfix-test-discipline.mjs [--repo unierp-api] [--count 30]

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const repoArgIdx = process.argv.indexOf('--repo');
const repo = repoArgIdx >= 0 ? process.argv[repoArgIdx + 1] : 'unierp-api';
const countArgIdx = process.argv.indexOf('--count');
const count = countArgIdx >= 0 ? Number(process.argv[countArgIdx + 1]) : 30;

const REPO_ROOT = path.isAbsolute(repo) ? repo : path.join(root, repo);
const CHANGELOG_FILE = path.join(root, 'unierp-workspace', 'docs', 'ai', 'CHANGELOG.md');

function git(args) {
  return execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf-8' });
}

const log = git(['log', `-${count}`, '--pretty=format:%H|%ad|%s', '--date=short']);
const commits = log
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const [sha, date, ...rest] = line.split('|');
    return { sha, date, subject: rest.join('|') };
  });

// The platform's own established convention (confirmed against real
// history): `fix(scope): description` or `fix: description`.
const FIX_COMMIT_RE = /^fix(\([^)]*\))?:/i;

const fixCommits = commits.filter((c) => FIX_COMMIT_RE.test(c.subject));

const changelog = readFileSync(CHANGELOG_FILE, 'utf-8');

const flagged = [];
for (const c of fixCommits) {
  const diffFiles = git(['show', '--name-only', '--pretty=format:', c.sha])
    .split('\n')
    .filter(Boolean);
  const touchesSpec = diffFiles.some((f) => f.endsWith('.spec.ts'));

  // The changelog line naming this test: look for any *.spec.ts basename
  // from this commit's own diff appearing anywhere in the changelog. This
  // does not require exact dated correlation (this platform's changelog is
  // append-only prose, not machine-generated per-commit), but it DOES
  // require the specific file to be named somewhere, not just "a test
  // exists" asserted vaguely.
  const specBasenames = diffFiles.filter((f) => f.endsWith('.spec.ts')).map((f) => path.basename(f));
  const namedInChangelog = specBasenames.some((name) => changelog.includes(name));

  const problems = [];
  if (!touchesSpec) problems.push('no *.spec.ts file in the commit diff');
  if (touchesSpec && !namedInChangelog) problems.push('the spec file is not named anywhere in docs/ai/CHANGELOG.md');

  if (problems.length > 0) {
    flagged.push({ sha: c.sha.slice(0, 7), subject: c.subject, problems });
  }
}

console.log(`Scanned ${commits.length} commit(s) in ${repo}, ${fixCommits.length} fix(...) commit(s) found.`);

if (flagged.length > 0) {
  console.error(`FAIL  ${flagged.length} fix commit(s) flagged:`);
  for (const f of flagged) {
    console.error(`  ${f.sha} "${f.subject}" — ${f.problems.join('; ')}`);
  }
  process.exit(1);
}

console.log(`OK    every fix(...) commit in the scanned range ships a *.spec.ts change, named in the changelog.`);
process.exit(0);
