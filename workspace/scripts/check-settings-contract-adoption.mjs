#!/usr/bin/env node
// D19 (Track D — retrofit the settings contract across all 45 modules):
// "grep finds no module-local settings page. Every setting in the
// platform is discoverable in one search."
//
// This is the measurement half of that exit criterion: it enumerates
// every `settings/page.tsx`-shaped route in unierp-web and unierp-console
// and reports which ones import D14's SettingsPage renderer (adopted the
// contract) versus which still render bespoke, module-local settings UI.
// A module-local page that never imports SettingsPage fails the gate,
// named explicitly.
//
//   node scripts/check-settings-contract-adoption.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

function findSettingsPages(appDir) {
  const results = [];
  function walk(dir) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry === 'node_modules' || entry === '.next') continue;
      const full = path.join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (entry === 'page.tsx' && /settings/i.test(dir)) {
        results.push(full);
      }
    }
  }
  walk(appDir);
  return results;
}

const targets = [
  existsSync(path.join(root, 'tenant-apps', 'app')) ? path.join(root, 'tenant-apps', 'app') : path.join(root, 'unierp-web', 'app'),
  existsSync(path.join(root, 'provider-admin-os', 'app')) ? path.join(root, 'provider-admin-os', 'app') : path.join(root, 'unierp-console', 'app'),
];

let allPages = [];
for (const dir of targets) {
  try {
    statSync(dir);
    allPages = allPages.concat(findSettingsPages(dir));
  } catch {
    // repo/dir not present in this checkout — skip
  }
}

const adopted = [];
const bespoke = [];
for (const file of allPages) {
  const content = readFileSync(file, 'utf8');
  if (/SettingsPage/.test(content)) {
    adopted.push(file);
  } else {
    bespoke.push(file);
  }
}

const summary = {
  totalSettingsPages: allPages.length,
  adoptedCount: adopted.length,
  bespokeCount: bespoke.length,
};

console.log(JSON.stringify({ summary, bespoke: bespoke.map((f) => path.relative(root, f)) }, null, 2));

if (bespoke.length > 0) {
  console.error(
    `FAIL  ${bespoke.length} of ${allPages.length} module-local settings pages have not adopted D14's SettingsPage renderer.`,
  );
  process.exit(1);
}

console.log(`OK    all ${allPages.length} settings pages adopt the platform's single SettingsPage renderer.`);
