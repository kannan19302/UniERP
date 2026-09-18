import { Project } from "ts-morph";
import fs from "fs";
import path from "path";

const project = new Project({
  tsConfigFilePath: "../unierp-web/tsconfig.json",
});

const sourceFiles = project.getSourceFiles();

for (const sf of sourceFiles) {
  let changed = false;
  const imports = sf.getImportDeclarations();
  for (const imp of imports) {
    if (imp.getModuleSpecifierValue() === "@kannan19302/ui") {
      const namedImports = imp.getNamedImports();
      for (const ni of namedImports) {
        if (ni.getName() === "Table") {
          ni.remove();
          changed = true;
          console.log(`Removed Table import from ${sf.getFilePath()}`);
        }
      }
      // If no imports left in this declaration, remove it
      if (imp.getNamedImports().length === 0 && !imp.getDefaultImport()) {
        imp.remove();
      }
    }
  }
  if (changed) {
    sf.saveSync();
  }
}
