import fs from "fs";
import path from "path";

console.log("Checking motion conformance...");

try {
  const CSS_BASE = path.join(process.cwd(), '..', 'unierp-design-system', 'src', 'tokens', 'base.css');
  if (fs.existsSync(CSS_BASE)) {
    const content = fs.readFileSync(CSS_BASE, "utf-8");
    if (!content.includes("@media (prefers-reduced-motion: reduce)")) {
      console.error("❌ Motion conformance failed: prefers-reduced-motion is missing from base.css");
      process.exit(1);
    }
  } else {
    console.error("❌ Motion conformance failed: base.css not found.");
    process.exit(1);
  }
  
  console.log("✅ Motion conformance passed!");
  process.exit(0);
} catch (e) {
  console.error("Error during motion conformance check", e);
  process.exit(1);
}
