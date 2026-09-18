import assert from "node:assert/strict";
import { evaluateLayerDependencies, loadLayerCatalog } from "./check-layer.mjs";

const catalog = loadLayerCatalog();

// 1. Estate and package discovery
assert.ok(catalog.byRepository.size >= 13, "layer catalog must cover at least the 13 canonical roots");
assert.equal(catalog.byPackage.get("@kannan19302/api")?.repository, "api");
assert.equal(catalog.byPackage.get("@kannan19302/api")?.layer, 3);
assert.equal(catalog.byPackage.get("@kannan19302/database")?.layer, 2);
assert.equal(catalog.byPackage.get("@kannan19302/contracts")?.layer, 0);

// Nested packages
assert.equal(catalog.byPackage.get("@kannan19302/framework")?.layer, 2);
assert.equal(catalog.byPackage.get("@kannan19302/marketplace")?.layer, 4);
assert.equal(catalog.byPackage.get("@kannan19302/config")?.layer, 1);

// 2. Positive test: lower layer passes
const valid = evaluateLayerDependencies({
  manifest: { name: "@kannan19302/api", dependencies: { "@kannan19302/database": "^1.0.0" } },
  catalog,
});
assert.equal(valid.violations.length, 0, "a lower-layer dependency must pass");

// 3. Adversarial test 1: same-layer fails
const sameLayer = evaluateLayerDependencies({
  manifest: { name: "@kannan19302/api", dependencies: { "@kannan19302/idp": "^1.0.0" } },
  catalog,
});
assert.equal(sameLayer.violations.length, 1, "a same-layer dependency must fail");
assert.match(sameLayer.violations[0].reason, /Forbidden edge: L3 depends on L3/);

// 4. Adversarial test 2: upward layer fails
const upwardLayer = evaluateLayerDependencies({
  manifest: { name: "@kannan19302/database", dependencies: { "@kannan19302/api": "^1.0.0" } },
  catalog,
});
assert.equal(upwardLayer.violations.length, 1, "an upward-layer dependency must fail");
assert.match(upwardLayer.violations[0].reason, /Forbidden edge: L2 depends on L3/);

// 5. Adversarial test 3: unmapped internal package fails closed
const unmappedInternal = evaluateLayerDependencies({
  manifest: { name: "@kannan19302/api", dependencies: { "@kannan19302/rogue-package": "^1.0.0" } },
  catalog,
});
assert.equal(unmappedInternal.violations.length, 1, "an unmapped internal package must fail closed");
assert.match(unmappedInternal.violations[0].reason, /Unknown internal package/);

// 6. Adversarial test 4: missing local file target fails
const missingLocal = evaluateLayerDependencies({
  manifest: { name: "@kannan19302/api", dependencies: { "@kannan19302/database": "file:../non-existent-dir-xyz" } },
  catalog,
  manifestDir: process.cwd(),
});
assert.equal(missingLocal.violations.length, 1, "a missing local file target must fail");
assert.match(missingLocal.violations[0].reason, /Missing local dependency target/);

// 7. Adversarial test 5: circular self-dependency fails
const circular = evaluateLayerDependencies({
  manifest: { name: "@kannan19302/api", dependencies: { "@kannan19302/api": "^1.0.0" } },
  catalog,
});
assert.equal(circular.violations.length, 1, "circular self-dependency must fail");
assert.match(circular.violations[0].reason, /Circular self-dependency/);

// 8. Adversarial test 6: unmapped manifest package fails closed
assert.throws(
  () => evaluateLayerDependencies({ manifest: { name: "@kannan19302/unknown" }, catalog }),
  /not mapped/,
  "an unmapped manifest package must fail closed",
);

console.log("✅ All Layer Gate tests passed: active 13-root mapping, nested package resolution, lower-layer allowance, same-layer rejection, upward-layer rejection, unmapped internal package failure, missing local target failure, circular dependency failure, and unmapped package failure verified.");
