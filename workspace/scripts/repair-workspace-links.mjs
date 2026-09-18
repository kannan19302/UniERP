#!/usr/bin/env node
// Track I.1 (FOUNDATION_HARDENING_ROADMAP § 11d): repair pnpm workspace links.
//
// On this repo's OneDrive-synced checkout, `pnpm install` repeatedly aborts with
// EACCES and leaves dangling/corrupt junctions under
// {apps,packages}/*/node_modules/@kannan19302/. Node's resolver then fails on the
// production build (`next build` → "Can't resolve '@kannan19302/ui-components'")
// while dev mode masks it via the `development` exports condition.
//
// This script never runs pnpm. It re-points every @kannan19302 workspace link at the
// real package directory as a junction, and creates links that are declared in
// package.json but missing entirely. Junctions are disposable state: a future
// successful `pnpm install` may replace them.
//
// Usage: node scripts/repair-workspace-links.mjs [--check]
//   --check  report broken/missing links and exit 1 without repairing (CI use)

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, symlinkSync, lstatSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

const workspaceDirs = ['apps', 'packages'].flatMap((group) => {
  const groupDir = path.join(root, group);
  if (!existsSync(groupDir)) return [];
  return readdirSync(groupDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(groupDir, entry.name))
    .filter((dir) => existsSync(path.join(dir, 'package.json')));
});

const packagesByName = new Map();
for (const dir of workspaceDirs) {
  try {
    const manifest = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'));
    if (manifest.name) packagesByName.set(manifest.name, dir);
  } catch {
    // unreadable manifest — not a linkable workspace package
  }
}

const readableThroughLink = (linkPath) => {
  try {
    JSON.parse(readFileSync(path.join(linkPath, 'package.json'), 'utf8'));
    return true;
  } catch {
    return false;
  }
};

let broken = 0;
let missing = 0;
let repaired = 0;

for (const dir of workspaceDirs) {
  const manifest = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'));
  const declared = Object.entries({ ...manifest.dependencies, ...manifest.devDependencies })
    .filter(([name, spec]) => name.startsWith('@kannan19302/') && String(spec).startsWith('workspace:'))
    .map(([name]) => name);

  const scopeDir = path.join(dir, 'node_modules', '@kannan19302');
  const existing = existsSync(scopeDir)
    ? readdirSync(scopeDir).map((entry) => `@kannan19302/${entry}`)
    : [];

  for (const name of new Set([...declared, ...existing])) {
    const target = packagesByName.get(name);
    if (!target) continue; // stale link to a package that no longer exists — leave for pnpm
    const linkPath = path.join(scopeDir, name.split('/')[1]);

    let state = 'ok';
    if (!existsSync(linkPath) && !safeLstat(linkPath)) state = declared.includes(name) ? 'missing' : 'ok';
    else if (!readableThroughLink(linkPath)) state = 'broken';
    if (state === 'ok') continue;

    if (state === 'broken') broken += 1;
    else missing += 1;
    console.log(`${state.toUpperCase()} ${path.relative(root, linkPath)} -> ${path.relative(root, target)}`);

    if (check) continue;
    // OneDrive-corrupt junctions can be invisible to lstat yet still occupy
    // the directory entry — always clear the path before recreating.
    try {
      rmSync(linkPath, { recursive: true, force: true });
    } catch {
      // fall through to rmdir
    }
    if (dirEntryExists(scopeDir, name.split('/')[1])) {
      execSync(`rmdir "${linkPath}"`, { shell: 'cmd.exe' });
    }
    mkdirSync(scopeDir, { recursive: true });
    symlinkSync(target, linkPath, 'junction');
    if (!readableThroughLink(linkPath)) {
      console.error(`FAILED to repair ${path.relative(root, linkPath)}`);
      process.exit(1);
    }
    repaired += 1;
  }
}

function dirEntryExists(parent, entryName) {
  try {
    return readdirSync(parent).includes(entryName);
  } catch {
    return false;
  }
}

function safeLstat(p) {
  try {
    return lstatSync(p);
  } catch {
    return null;
  }
}

console.log(`Workspace @kannan19302 links — broken: ${broken}, missing: ${missing}${check ? '' : `, repaired: ${repaired}`}`);
if (check && broken + missing > 0) {
  console.error('Run `node scripts/repair-workspace-links.mjs` to repair.');
  process.exit(1);
}
