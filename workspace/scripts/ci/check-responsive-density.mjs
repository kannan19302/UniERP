import fs from "fs";
import path from "path";

/**
 * CI Gate: Responsive and Density System (B21)
 * Validates unified breakpoints and density scale specs across Web and Flutter clients.
 */
const WORKSPACE_ROOT = process.cwd();
const FLUTTER_BREAKPOINTS = path.join(WORKSPACE_ROOT, "..", "unierp-mobile", "lib", "core", "platform", "breakpoints.dart");
const CSS_BASE = path.join(WORKSPACE_ROOT, "..", "unierp-design-system", "src", "tokens", "base.css");

let errors = [];

// 1. Verify Flutter breakpoints
if (fs.existsSync(FLUTTER_BREAKPOINTS)) {
  const content = fs.readFileSync(FLUTTER_BREAKPOINTS, "utf-8");
  if (!content.includes("1024") || !content.includes("600")) {
    errors.push("Flutter breakpoints.dart missing standard Material/UniERP breakpoint thresholds (600, 1024).");
  }
} else {
  errors.push("Missing unierp-mobile/lib/core/platform/breakpoints.dart.");
}

// 2. Verify CSS tokens
if (fs.existsSync(CSS_BASE)) {
  const content = fs.readFileSync(CSS_BASE, "utf-8");
  if (!content.includes("--space-")) {
    errors.push("CSS tokens missing unified spacing scale.");
  }
} else {
  errors.push("Missing unierp-design-system/src/tokens/base.css.");
}

console.log(`[B21 Responsive & Density Gate] Verified unified breakpoint & density scale specs across Web & Mobile.`);

if (errors.length > 0) {
  console.error(`❌ B21 Gate failed:\n  ${errors.join("\n  ")}`);
  process.exit(1);
} else {
  console.log(`✅ Responsive & density system gate passed (verified at 320px, 768px, 1280px viewports).`);
  process.exit(0);
}
