import { execSync } from 'child_process';
import path from 'path';

const WORKSPACE_ROOT = process.cwd();
const STORYBOOK_DIR = path.join(WORKSPACE_ROOT, '../storybook');

try {
  console.log(`[J08] Running visual regression tests...`);
  // Note: For CI, we would typically run the tests against a build, but this runs the playwright config which spins up the dev server.
  execSync('pnpm exec playwright test --config playwright.visual.config.ts', {
    cwd: STORYBOOK_DIR,
    stdio: 'inherit',
  });
  console.log(`[J08] Visual regression gate ACTIVE: tests passed successfully.`);
  process.exit(0);
} catch (error) {
  console.error(`[J08] Visual regression tests failed.`);
  process.exit(1);
}
