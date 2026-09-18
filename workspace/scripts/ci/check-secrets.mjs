#!/usr/bin/env node
/**
 * Secret scan — docs/ai/TRD.md § 8.
 *
 * Scans the staged diff (pre-commit), the outgoing diff (pre-push), or the whole tree (CI)
 * for credential-shaped strings. A secret that reaches git must be rotated, so this gate is
 * about prevention rather than detection.
 *
 *   node scripts/ci/check-secrets.mjs            # diff vs origin (or full tree if no remote)
 *   node scripts/ci/check-secrets.mjs --staged   # staged changes only
 *   node scripts/ci/check-secrets.mjs --all      # entire working tree
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const args = process.argv.slice(2);

const PATTERNS = [
  { id: 'aws-access-key',    re: /\bAKIA[0-9A-Z]{16}\b/,                              desc: 'AWS access key id' },
  { id: 'aws-secret',        re: /aws_secret_access_key\s*[=:]\s*['"][A-Za-z0-9/+=]{40}['"]/i, desc: 'AWS secret access key' },
  { id: 'github-token',      re: /\bgh[pousr]_[A-Za-z0-9]{30,}\b/,                    desc: 'GitHub token' },
  { id: 'stripe-live',       re: /\b(sk|rk)_live_[A-Za-z0-9]{16,}\b/,                 desc: 'Stripe live secret key' },
  { id: 'private-key',       re: /-----BEGIN (RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/, desc: 'Private key block' },
  { id: 'jwt',               re: /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}/, desc: 'JWT (may be a real session token)' },
  { id: 'slack-token',       re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,                  desc: 'Slack token' },
  { id: 'google-api-key',    re: /\bAIza[0-9A-Za-z_-]{35}\b/,                         desc: 'Google API key' },
  { id: 'npm-token',         re: /\bnpm_[A-Za-z0-9]{36}\b/,                           desc: 'npm token' },
  // Only flags hosts that look genuinely external (an FQDN containing a dot). Docker-compose
  // service names and localhost are dev-only and not reachable from the internet, so a
  // password against them is not a leak.
  { id: 'postgres-url',      re: /postgres(ql)?:\/\/[^:\s'"]+:[^@\s'"]{8,}@(?![^\s'"\/]*(localhost|127\.0\.0\.1))[^\s'"\/@]*\.[a-z]{2,}/i, desc: 'Postgres URL with a password on an external host' },
  { id: 'generic-assignment', re: /\b(api[_-]?key|secret|password|passwd|token|credential)\s*[=:]\s*['"][A-Za-z0-9!@#$%^&*_+\/-]{20,}['"]/i, desc: 'Hardcoded credential assignment' },
];

/** Placeholders and fixtures that are safe by construction. */
const ALLOW = [
  /example|placeholder|dummy|sample|fake|test|mock|changeme|your[_-]?key|xxx+|\.\.\./i,
  /process\.env\./,
  /\$\{/,
  /<[A-Z_]+>/,
];

const SKIP_PATH = [
  // Untracked build output and package caches. These are not in git, so a match here is a
  // third-party package's own test fixture — not a secret this repository is leaking.
  /node_modules/, /\.pnpm-store\//, /\.git\//, /dist\//, /\.next\//, /\.turbo\//, /coverage\//,
  /\bvar\//, /storybook-static\//, /playwright-report\//, /test-results\//,
  /pnpm-lock\.yaml$/, /\.env\.example$/, /check-secrets\.mjs$/, /check-policy\.mjs$/,
  /\.(png|jpg|jpeg|gif|svg|ico|woff2?|ttf|pdf|lock)$/,
];

function changedFiles() {
  if (args.includes('--all')) return null;
  const range = args.includes('--staged')
    ? ['diff', '--cached', '--name-only', '--diff-filter=ACM']
    : ['diff', '--name-only', '--diff-filter=ACM', 'origin/HEAD...HEAD'];
  const r = spawnSync('git', range, { cwd: ROOT, encoding: 'utf8' });
  if (r.status !== 0) return null; // no remote / detached — fall back to full scan
  return r.stdout.split('\n').map((s) => s.trim()).filter(Boolean);
}

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    const rel = relative(ROOT, full).replace(/\\/g, '/');
    if (SKIP_PATH.some((p) => p.test(rel + (e.isDirectory() ? '/' : '')))) continue;
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const list = changedFiles();
const targets = (
  list ? list.map((f) => join(ROOT, f)) : walk(ROOT)
).filter((f) => {
  const rel = relative(ROOT, f).replace(/\\/g, '/');
  return existsSync(f) && !SKIP_PATH.some((p) => p.test(rel));
});

const findings = [];
for (const file of targets) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue; // binary or unreadable
  }
  if (text.indexOf(String.fromCharCode(0)) !== -1) continue; // binary

  text.split('\n').forEach((line, i) => {
    if (line.length > 500) return; // minified bundle
    if (ALLOW.some((a) => a.test(line))) return;
    for (const p of PATTERNS) {
      if (p.re.test(line)) {
        findings.push({
          file: relative(ROOT, file).replace(/\\/g, '/'),
          line: i + 1,
          desc: p.desc,
          id: p.id,
        });
        break;
      }
    }
  });
}

if (findings.length === 0) {
  console.log(`  ✅ Secret scan clean (${targets.length} files)`);
  process.exit(0);
}

console.error(`
────────────────────────────────────────────────────────────────────────
  ❌ POSSIBLE SECRET COMMITTED — ${findings.length} finding(s)
────────────────────────────────────────────────────────────────────────`);
for (const f of findings) {
  console.error(`   ${f.file}:${f.line}  —  ${f.desc}  [${f.id}]`);
}
console.error(`
  If any of these is real:
    1. ROTATE IT NOW. Assume it is compromised the moment it is written to
       disk in a git repository — removing the commit does not un-leak it.
    2. Move the value to an environment variable / OpenBao / SOPS.
    3. Purge it from history if it was already pushed.

  If it is a false positive, make it obviously non-real (use a placeholder
  such as <YOUR_KEY> or process.env.X) rather than weakening this gate.
────────────────────────────────────────────────────────────────────────
`);
process.exit(1);
