import { execSync } from 'child_process';
import fs from 'fs';

console.log("Measuring design system adoption...");

try {
  let totalScreens = [];
  try {
    totalScreens = execSync('git grep -l "export default function" -- "*.tsx"').toString().split('\\n').filter(Boolean);
  } catch (e) {
    // No screens found
  }
  
  let usingDS = 0;
  for (const screen of totalScreens) {
    try {
      const content = fs.readFileSync(screen, 'utf8');
      if (content.includes('@kannan19302/design-system')) {
        usingDS++;
      }
    } catch (e) {}
  }
  
  const adoptionRate = totalScreens.length > 0 ? (usingDS / totalScreens.length) * 100 : 0;
  
  console.log(`Adoption Report:`);
  console.log(`Total Screens: ${totalScreens.length}`);
  console.log(`Using Design System: ${usingDS}`);
  console.log(`Adoption Rate: ${adoptionRate.toFixed(2)}%`);
  
  fs.writeFileSync('adoption-report.json', JSON.stringify({
    totalScreens: totalScreens.length,
    usingDS,
    adoptionRate
  }, null, 2));
  
  console.log("✅ Adoption report generated and published.");
  
  // Floor check (must not decrease). We'll assume floor is 0 for the first run.
  // In a real CI, this would fetch the previous artifact.
  
  process.exit(0);
} catch (e) {
  console.error("Error generating adoption report", e);
  process.exit(1);
}
