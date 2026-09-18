import assert from "node:assert/strict";
import { evaluateLayerDependencies, loadLayerCatalog } from "./check-layer.mjs";

const catalog = loadLayerCatalog();
assert.equal(catalog.byRepository.size, 31, "layer catalog must cover the active estate");
assert.equal(catalog.byPackage.get("@kannan19302/api")?.repository, "api");
assert.equal(catalog.byPackage.get("@kannan19302/database")?.layer, 2);

const valid = evaluateLayerDependencies({
  manifest: { name: "@kannan19302/api", dependencies: { "@kannan19302/database": "^1.0.0" } },
  catalog,
});
assert.equal(valid.violations.length, 0, "a lower-layer dependency must pass");

const invalid = evaluateLayerDependencies({
  manifest: { name: "@kannan19302/api", dependencies: { "@kannan19302/idp": "^1.0.0" } },
  catalog,
});
assert.equal(invalid.violations.length, 1, "a same-layer dependency must fail");
assert.throws(
  () => evaluateLayerDependencies({ manifest: { name: "@kannan19302/unknown" }, catalog }),
  /not mapped/,
  "an unmapped package must fail closed",
);

console.log("Layer-catalog tests passed: active mapping, lower-layer allowance, same-layer rejection, and unmapped-package failure verified.");
