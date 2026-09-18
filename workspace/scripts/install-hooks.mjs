#!/usr/bin/env node
/**
 * Install pre-commit and pre-push git hooks for secret scanning — Phase A10.
 */
import { writeFileSync, chmodSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const HOOKS_DIR = join(ROOT, '.git', 'hooks');

if (!existsSync(HOOKS_DIR)) {
  mkdirSync(HOOKS_DIR, { recursive: true });
}

const preCommitHook = `#!/bin/sh
node scripts/ci/check-secrets.mjs --staged
`;

const prePushHook = `#!/bin/sh
node scripts/ci/check-secrets.mjs
`;

const preCommitPath = join(HOOKS_DIR, 'pre-commit');
const prePushPath = join(HOOKS_DIR, 'pre-push');

writeFileSync(preCommitPath, preCommitHook, 'utf8');
writeFileSync(prePushPath, prePushHook, 'utf8');

try {
  chmodSync(preCommitPath, 0o755);
  chmodSync(prePushPath, 0o755);
} catch {}

console.log('Installed pre-commit and pre-push secret scanning hooks in .git/hooks/');
