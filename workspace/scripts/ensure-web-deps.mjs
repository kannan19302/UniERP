#!/usr/bin/env node
// Ensures the dist-only workspace packages @kannan19302/web needs at runtime are
// built before `next dev` starts. The @kannan19302/ui-* packages resolve to src in
// dev via their exports "development" condition (+ transpilePackages), so they
// need no build here — but shared/auth/database only ship dist, and a clean
// checkout has none, which 500s any page importing them.
//
// Lazy by design: a package is only built when its dist entry is missing, so
// warm dev starts pay nothing. Delete a package's dist/ to force a rebuild.
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const deps = [
  { name: '@kannan19302/shared', dir: 'packages/shared' },
  { name: '@kannan19302/auth', dir: 'packages/auth' },
  { name: '@kannan19302/database', dir: 'packages/database', prisma: true },
];

const run = (cmd) => execSync(cmd, { cwd: rootDir, stdio: 'inherit' });

for (const dep of deps) {
  if (existsSync(path.join(rootDir, dep.dir, 'dist', 'index.js'))) continue;
  console.log(`[ensure-web-deps] ${dep.name} has no dist — building...`);
  // Prisma client must exist before the database package can compile. Skip if
  // already generated so we never regenerate while a dev API holds the engine
  // (Windows EPERM).
  if (dep.prisma && !existsSync(path.join(rootDir, 'node_modules', '.prisma', 'client'))) {
    run(`pnpm --filter ${dep.name} db:generate`);
  }
  run(`pnpm --filter ${dep.name} build`);
}
