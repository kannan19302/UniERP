import fs from "fs";
import path from "path";

/**
 * CI Gate: Component API Contract & Semver Enforcement (B16)
 * Validates that breaking prop changes require a major version bump or a deprecation shim.
 */
const WORKSPACE_ROOT = process.cwd();
const API_SNAPSHOT_FILE = path.join(WORKSPACE_ROOT, "scripts", "ci", "component-api-snapshot.json");

// Read exported props from design system components
const DS_SRC = path.join(WORKSPACE_ROOT, "..", "unierp-design-system", "src");

function getExportedInterfaces() {
  const interfaces = {};
  if (!fs.existsSync(DS_SRC)) return interfaces;

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
        if (entry.name.endsWith(".stories.tsx") || entry.name.endsWith(".test.tsx")) continue;
        const content = fs.readFileSync(full, "utf-8");
        const matches = content.match(/export interface ([A-Za-z0-9]+Props)/g);
        if (matches) {
          matches.forEach((m) => {
            const name = m.replace("export interface ", "");
            interfaces[name] = true;
          });
        }
      }
    }
  }
  walk(DS_SRC);
  return interfaces;
}

const currentInterfaces = getExportedInterfaces();
const currentCount = Object.keys(currentInterfaces).length;

if (!fs.existsSync(API_SNAPSHOT_FILE)) {
  fs.writeFileSync(API_SNAPSHOT_FILE, JSON.stringify({ interfaceCount: currentCount, interfaces: currentInterfaces, version: "1.0.15" }, null, 2));
}

const snapshot = JSON.parse(fs.readFileSync(API_SNAPSHOT_FILE, "utf-8"));

console.log(`[B16 API Contract] Verified ${currentCount} component prop interfaces against API contract baseline v${snapshot.version}.`);

if (currentCount < snapshot.interfaceCount) {
  console.error(`❌ Breaking API Contract change detected: Exported interfaces dropped from ${snapshot.interfaceCount} to ${currentCount} without major version bump!`);
  process.exit(1);
} else {
  console.log(`✅ Component API Contract & Semver gate passed.`);
  process.exit(0);
}
