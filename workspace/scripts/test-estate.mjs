import assert from "node:assert/strict";
import { activeRepositoryPath, loadActiveEstate, parseWorkspaceInventory } from "./lib/estate.mjs";

const estate = loadActiveEstate();
assert.equal(estate.names.length, 31, "the active estate must declare every current repository");
for (const name of ["api", "data", "framework", "idp", "unierp-workspace", "unierp-platform"]) {
  assert.ok(estate.names.includes(name), `${name} must be present in the active estate`);
  assert.ok(activeRepositoryPath(estate, name).endsWith(name), `${name} must resolve to its current directory`);
}

assert.throws(
  () => parseWorkspaceInventory({ folders: [] }, "empty fixture"),
  /zero repositories/,
  "zero repository discovery must fail",
);
assert.throws(
  () => parseWorkspaceInventory({ folders: [{ path: "api" }, { path: "api" }] }, "duplicate fixture"),
  /more than once/,
  "duplicate repository declarations must fail",
);
assert.throws(
  () => parseWorkspaceInventory({ folders: [{ path: "../api" }] }, "escape fixture"),
  /unsafe repository path/,
  "repository paths must remain inside the workspace",
);
assert.throws(
  () => activeRepositoryPath(estate, "unierp-api"),
  /not declared/,
  "retired repository names must not silently resolve",
);

console.log(`Active estate tests passed: ${estate.names.length} repositories discovered; invalid, duplicate, escaping, and retired-name fixtures rejected.`);
