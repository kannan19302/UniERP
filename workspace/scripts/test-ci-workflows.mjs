import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const applicationGate = readFileSync(resolve(root, ".github/workflows/application-gate.yml"), "utf8");
const reusableCi = readFileSync(resolve(root, ".github/workflows/reusable-ci.yml"), "utf8");

assert.doesNotMatch(applicationGate, /\|\|\s*echo\s+["']no (?:test|build) target/i, "application gate must not suppress missing test/build scripts");
assert.match(applicationGate, /Missing required package script: typecheck/);
assert.match(applicationGate, /Missing required package script: test/);
assert.match(applicationGate, /Missing required package script: build/);
assert.doesNotMatch(reusableCi, /cd unierp-data/i, "reusable CI must not enter a nonexistent sibling directory");
assert.match(reusableCi, /run-integration/);
assert.match(reusableCi, /\.unierp-data/);
assert.match(reusableCi, /pnpm --dir \.unierp-data db:deploy/);

console.log("CI workflow tests passed: required commands fail closed and integration setup uses an explicit data checkout.");
