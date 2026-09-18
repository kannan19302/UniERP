import { ContractRegistry } from "../../unierp-contracts/dist/contract-registry.js";
import assert from "node:assert";

console.log("Checking contract registry query capabilities...");

ContractRegistry.clear();

ContractRegistry.registerContract({
  contractId: "finance.invoice.api",
  version: "1",
  state: "ACTIVE",
  consumers: [
    { consumerId: "mobile-app", version: "1.0", contactEmail: "mobile@unierp.test" }
  ]
});

ContractRegistry.registerContract({
  contractId: "legacy.auth.api",
  version: "1",
  state: "DEPRECATED",
  consumers: [
    { consumerId: "old-portal", version: "1.0", contactEmail: "portal@unierp.test" }
  ],
  deprecation: {
    deprecated: true,
    deprecatedSince: "2025-01-01",
    sunsetDate: "2026-12-31"
  }
});

try {
  // Test query
  const legacyContract = ContractRegistry.getContract("legacy.auth.api", "1");
  assert.strictEqual(legacyContract.state, "DEPRECATED");
  assert.strictEqual(legacyContract.consumers[0].consumerId, "old-portal");

  const activeContracts = ContractRegistry.queryContracts({ state: "ACTIVE" });
  assert.strictEqual(activeContracts.length, 1);
  assert.strictEqual(activeContracts[0].contractId, "finance.invoice.api");

  const portalConsumers = ContractRegistry.queryContracts({ consumerId: "old-portal" });
  assert.strictEqual(portalConsumers.length, 1);
  assert.strictEqual(portalConsumers[0].contractId, "legacy.auth.api");

  console.log("Contract registry correctly answers queries about contract state and consumers.");
} catch (err) {
  console.error("Failed to query contract registry:", err.message);
  process.exit(1);
}
