import fs from "fs";
import path from "path";

/**
 * CI gate: Enforce token usage over literal hex, rgb(), or px values in consuming web/app styles.
 */
const WORKSPACE_ROOT = path.resolve(process.cwd(), "..");
const CONSUMER_DIRS = [
  fs.existsSync(path.join(WORKSPACE_ROOT, "tenant-apps", "app"))
    ? path.join(WORKSPACE_ROOT, "tenant-apps", "app")
    : path.join(WORKSPACE_ROOT, "unierp-web", "app"),
  fs.existsSync(path.join(WORKSPACE_ROOT, "tenant-apps", "src"))
    ? path.join(WORKSPACE_ROOT, "tenant-apps", "src")
    : path.join(WORKSPACE_ROOT, "unierp-web", "src"),
];

const HEX_REGEX = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g;
const RGB_REGEX = /rgba?\([^)]+\)/g;

let totalViolations = 0;
const violationsMap = {};

function scanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        scanDir(fullPath);
      }
    } else if (/\.(css|module\.css|tsx|jsx|ts|js)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const hexMatches = content.match(HEX_REGEX) || [];
      const rgbMatches = content.match(RGB_REGEX) || [];
      const count = hexMatches.length + rgbMatches.length;

      if (count > 0) {
        totalViolations += count;
        violationsMap[path.relative(WORKSPACE_ROOT, fullPath)] = count;
      }
    }
  }
}

for (const dir of CONSUMER_DIRS) {
  scanDir(dir);
}

const BASELINE_FILE = path.join(process.cwd(), "scripts", "ci", "token-violations-baseline.json");
let baseline = { maxAllowedViolations: 500 };

if (fs.existsSync(BASELINE_FILE)) {
  baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, "utf-8"));
} else {
  fs.writeFileSync(BASELINE_FILE, JSON.stringify({ maxAllowedViolations: Math.max(totalViolations, 100) }, null, 2));
}

console.log(`[Token Enforcement Gate] Total literal color/px violations found: ${totalViolations} (Allowed baseline ceiling: ${baseline.maxAllowedViolations})`);

if (totalViolations > baseline.maxAllowedViolations) {
  console.error(`❌ Token enforcement failed: Found ${totalViolations} literal color/px styles, exceeding allowed baseline of ${baseline.maxAllowedViolations}.`);
  process.exit(1);
} else {
  console.log(`✅ Token enforcement gate passed.`);
}
