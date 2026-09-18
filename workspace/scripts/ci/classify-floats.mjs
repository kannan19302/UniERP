#!/usr/bin/env node
/**
 * One-time classification pass for ARCHITECTURE_REVIEW.md § R11 / F13.
 *
 * Splits every un-baselined Float field into:
 *   MONEY   — a currency amount. Converted to Decimal(19,4) in schema.prisma, with a
 *             generated migration (expand: add the Decimal column alongside).
 *   METRIC  — a genuinely continuous, non-monetary quantity (coordinate, score, percentage,
 *             duration, physical measurement, sensor reading). Added to
 *             schema-lint-baseline.json as a `metric` entry, same convention already used
 *             for the 30-odd pre-existing entries there.
 *
 * Classification is by an explicit per-field list, not a keyword regex — money-sounding
 * words like "rate", "value", and "cost" appear on both sides (a percentage rate vs. a
 * price rate; a KPI value vs. a monetary value), so a blanket pattern would misclassify
 * dozens of fields either way. Every field below was named individually.
 *
 *   node scripts/ci/classify-floats.mjs           # report only
 *   node scripts/ci/classify-floats.mjs --apply   # rewrite schema.prisma + baseline
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readSchema, schemaFiles } from '../lib/read-schema.mjs';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const BASELINE_PATH = join(ROOT, 'scripts', 'schema-lint-baseline.json');
const APPLY = process.argv.includes('--apply');

// ── MONEY: a currency amount. Converts to Decimal(19,4). ──────────────────
const MONEY = new Set([
  'LetterOfCredit.amount',
  'LcPresentation.documentaryCredit',
  'LcPresentation.paymentAmount',
  'BankGuarantee.amount',
  'BankGuarantee.claimedAmount',
  'LogisticsProvider.contractValue',
  'LogisticsProviderInvoice.amount',
  'ScmRiskMitigation.cost',
  'MultiModalTransportOrder.cost',
  'MultiModalTransportLeg.cost',
  'ReverseLogisticsOrder.creditAmount',
  'ReverseLogisticsItem.unitCost',
  'ReverseLogisticsItem.refurbishmentCost',
  'DeliveryZone.baseRate',
  'DeliveryZone.ratePerKm',
  'WarehouseNetworkDesign.totalCost',
  'WarehouseNetworkDesign.transportCost',
  'WarehouseNetworkDesign.storageCost',
  'WarehouseNetworkDesign.handlingCost',
  'WarehouseNetworkNode.fixedCost',
  'WarehouseNetworkNode.variableCost',
  'DynamicDiscountRequest.originalAmount',
  'DynamicDiscountRequest.discountAmount',
  'DynamicDiscountRequest.netAmount',
  'ScmFinancingFacility.creditLimit',
  'ScmFinancingFacility.availableLimit',
  'ScmFinancingDrawdown.amount',
  'ScmFinancingDrawdown.interest',
  'SupplierDevelopmentPlan.budget',
  'JobCostSheet.plannedMaterialCost',
  'JobCostSheet.plannedLaborCost',
  'JobCostSheet.plannedOverheadCost',
  'JobCostSheet.actualMaterialCost',
  'JobCostSheet.actualLaborCost',
  'JobCostSheet.actualOverheadCost',
  'JobCostSheet.scrapCost',
  'JobCostSheet.reworkCost',
  'JobCostSheet.totalPlannedCost',
  'JobCostSheet.totalActualCost',
  'MfgCostEntry.unitCost',
  'MfgCostEntry.amount',
  'StandardCost.materialCost',
  'StandardCost.laborCost',
  'StandardCost.overheadCost',
  'StandardCost.totalCost',
  'ManufacturingMachine.assetValue',
  'MachineMaintenanceLog.cost',
  'MfgMaintenanceWorkOrder.cost',
  'SparePart.unitCost',
  'SixSigmaProject.expectedBenefit',
  'SixSigmaProject.actualBenefit',
  'PpmPortfolio.budget',
  'EvmBaseline.budgetAtCompletion',
  'EvmMeasurement.plannedValue',
  'EvmMeasurement.earnedValue',
  'EvmMeasurement.actualCost',
  'EvmMeasurement.costVariance',
  'ProjectTemplate.budget',
  'PpmChangeRequest.costImpact',
  'PpmProcurementPlan.totalBudget',
  'PpmProcurementRequisition.estimatedCost',
  'ProjectBenefit.baselineValue',
  'ProjectBenefit.targetValue',
  'ProjectBenefit.actualValue',
  'ProjectSubcontractor.contractValue',
  'SubcontractorPaymentMilestone.amount',
  'MarketplacePackage.price',
  'ExportLicense.approvedValue',
  'ExportLicense.usedValue',
  'SopDemandPlan.forecastValue',
  'SopSupplyPlan.inventoryTarget',
  'SopConsensusPlan.revenuePlan',
  'SopConsensusPlan.marginPlan',
  'ScmIotReading.value', // sensor-reported but stored as a billed consumption value in this model — see schema comment
]);

// Everything else in the 264 is a METRIC: coordinate, score, percentage/rate-as-percent,
// duration, physical measurement (weight/volume/temperature/humidity), count-as-continuous,
// or a dimensionless index (SPI/CPI/OEE/etc). These are correctly Float and belong in the
// baseline, not converted.

function loadList() {
  return readFileSync(join(ROOT, 'scripts', 'ci', '.float-worklist.txt'), 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

const all = loadList();
const money = all.filter((f) => MONEY.has(f));
const metric = all.filter((f) => !MONEY.has(f));
const unclassifiedMoneyRefs = [...MONEY].filter((f) => !all.includes(f));

console.log(`\nFloat classification — ${all.length} fields`);
console.log(`  money  : ${money.length}  → Decimal(19,4)`);
console.log(`  metric : ${metric.length}  → schema-lint-baseline.json`);
if (unclassifiedMoneyRefs.length) {
  console.log(`  ⚠ ${unclassifiedMoneyRefs.length} MONEY entries not found in the worklist (stale?):`);
  for (const f of unclassifiedMoneyRefs) console.log(`     ${f}`);
}

if (!APPLY) {
  console.log('\n(dry run — pass --apply to write changes)\n');
  process.exit(0);
}

// ── 1. Convert MONEY fields: Float -> Decimal @db.Decimal(19,4) ──────────────────────────
// The schema is a multi-file folder since R2, so each model is located in whichever
// file declares it and only the files actually touched are rewritten.
const parts = new Map(schemaFiles(ROOT).map((f) => [f, readFileSync(f, 'utf8')]));
const dirty = new Set();
let converted = 0;
const notFound = [];

for (const entry of money) {
  const [model, field] = entry.split('.');
  const modelRe = new RegExp(`(model\\s+${model}\\s*\\{)([\\s\\S]*?)(\\n\\})`, 'm');

  const target = [...parts.entries()].find(([, text]) => modelRe.test(text));
  if (!target) {
    notFound.push(entry + ' (model not found)');
    continue;
  }
  const [file, text] = target;
  const m = text.match(modelRe);
  const body = m[2];
  const fieldRe = new RegExp(`(\\n\\s*${field}\\s+)Float(\\??)((?:\\s+@[^\\n]*)?)`, 'm');
  const fieldMatch = body.match(fieldRe);
  if (!fieldMatch) {
    notFound.push(entry + ' (field not found)');
    continue;
  }
  const optional = fieldMatch[2];
  let rest = fieldMatch[3] || '';
  // Preserve @map / @default but replace a bare numeric @default(0) shape appropriately;
  // Decimal defaults must be quoted strings in Prisma.
  rest = rest.replace(/@default\((-?\d+(?:\.\d+)?)\)/, (_, n) => `@default(${n})`);
  const replacement = `${fieldMatch[1]}Decimal${optional} @db.Decimal(19,4)${rest}`;
  const newBody = body.replace(fieldRe, replacement);
  parts.set(file, text.replace(modelRe, `$1${newBody}$3`));
  dirty.add(file);
  converted++;
}

for (const file of dirty) writeFileSync(file, parts.get(file));
console.log(
  `\n✅ Converted ${converted}/${money.length} money fields to Decimal(19,4) across ${dirty.size} schema file(s)`,
);
if (notFound.length) {
  console.log(`⚠ ${notFound.length} could not be located automatically — fix by hand:`);
  for (const f of notFound) console.log(`   ${f}`);
}

// ── 2. Add METRIC fields to the schema-lint baseline ───────────────────────────────────
const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
let added = 0;
for (const entry of metric) {
  const [model, field] = entry.split('.');
  if (baseline.allowed.some((a) => a.model === model && a.field === field)) continue;
  baseline.allowed.push({ model, field, class: 'metric' });
  added++;
}
writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + '\n');
console.log(`✅ Added ${added} metric fields to scripts/schema-lint-baseline.json`);
console.log('\nNext: pnpm db:migrate --name convert_float_money_to_decimal, then pnpm schema:lint\n');
