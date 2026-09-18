import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log("Checking flutter parity...");

try {
  // Check if unierp-mobile has corresponding widgets for B01-B09
  const requiredWidgets = [
    'data_table', 'tooltip', 'toast', 'tabs', 'checkbox'
  ];
  
  const flutterDir = path.join(process.cwd(), '..', 'unierp-mobile', 'lib', 'widgets');
  
  if (!fs.existsSync(flutterDir)) {
    console.error("❌ Flutter widgets directory not found. unierp-mobile is missing components.");
    process.exit(1);
  }
  
  for (const widget of requiredWidgets) {
    // just check if a file with the widget name exists anywhere in unierp-mobile
    try {
      const className = widget.replace(/_([a-z])/g, (g) => g[1].toUpperCase()).replace(/^[a-z]/, (g) => g.toUpperCase());
      execSync(`git grep -l "class ${className}" -- "*.dart"`, { cwd: path.join(process.cwd(), '..', 'unierp-mobile') });
    } catch (e) {
      console.error(`❌ Flutter parity failed: Widget for ${widget} is missing in unierp-mobile!`);
      process.exit(1);
    }
  }
  
  console.log("✅ Flutter parity passed!");
  process.exit(0);
} catch (e) {
  console.error("Error during flutter parity check", e);
  process.exit(1);
}
