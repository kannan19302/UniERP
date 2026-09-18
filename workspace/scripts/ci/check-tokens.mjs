import { execSync } from 'child_process';
import fs from 'fs';

try {
  // Check for literal hex colors (#fff, #000000, etc.) or rgb()/rgba() or literal px in CSS files in consuming repos
  // Exclude unierp-design-system and unierp-config
  const result = execSync('git grep -nE "#[0-9a-fA-F]{3,6}|rgb\\(|px" -- "*.css" "*.ts" "*.tsx" ":!unierp-design-system" ":!unierp-config"').toString();
  
  if (result.trim()) {
    console.error("❌ Token violation found! Literal hex, rgb, or px values are forbidden in consuming repositories. Use design system tokens instead.");
    console.error(result);
    process.exit(1);
  }
} catch (e) {
  // grep exits with 1 if no matches found, which means SUCCESS for this check!
  console.log("✅ Token enforcement passed! No literal hex, rgb, or px values found.");
  process.exit(0);
}
