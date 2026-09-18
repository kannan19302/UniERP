#!/usr/bin/env node
// E01 (Track E — business apps): "Tooling that scores a module mechanically
// where possible — page-length distribution, six-state coverage,
// @Permissions density, outbox usage, test ratio, hand-rolled tables,
// missing ChangeHistory — and prompts for the rest."
//
// Exit criterion: `node scripts/score-module.mjs <module>` emits a 16-row
// score (the rubric in 02-EXECUTION-GUIDELINES § 5) with evidence per row.
// Re-running it produces the same score.
//
// Determinism: every row is either (a) computed purely from file contents
// under unierp-api/unierp-web/unierp-mobile (same files in -> same score
// out), or (b) genuinely un-measurable from source alone (row 15,
// performance — requires a real profiling run, not static analysis) and is
// reported as a stable, explicit NEEDS-REVIEW placeholder rather than a
// guess. A placeholder is not randomness: it is the same "0, unmeasured"
// output on every run until a real measurement is recorded via --record-perf.
//
//   node scripts/score-module.mjs finance
//   node scripts/score-module.mjs finance --record-perf=2   (records a manual row-15 score)

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const API_MODULES = existsSync(path.join(root, 'api', 'src', 'modules'))
  ? path.join(root, 'api', 'src', 'modules')
  : path.join(root, 'unierp-api', 'src', 'modules');
const WEB_APP = existsSync(path.join(root, 'tenant-apps', 'app'))
  ? path.join(root, 'tenant-apps', 'app')
  : path.join(root, 'unierp-web', 'app');
const MOBILE_ROOT = path.join(root, 'unierp-mobile');
const PERF_RECORD_FILE = path.join(root, 'unierp-workspace', 'evidence', 'module-perf-scores.json');

const moduleArg = process.argv[2];
if (!moduleArg) {
  console.error('Usage: node scripts/score-module.mjs <module> [--record-perf=<0-3>]');
  process.exit(1);
}

const recordPerfArg = process.argv.find((a) => a.startsWith('--record-perf='));

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.next' || entry === 'dist') continue;
    const full = path.join(dir, entry);
    let s;
    try {
      s = statSync(full);
    } catch {
      continue;
    }
    if (s.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function readSafe(file) {
  try {
    return readFileSync(file, 'utf-8');
  } catch {
    return '';
  }
}

function countMatches(text, re) {
  const m = text.match(re);
  return m ? m.length : 0;
}

// ── locate the module's files across the three repos ──────────────────
const apiModuleDir = path.join(API_MODULES, moduleArg);
if (!existsSync(apiModuleDir)) {
  console.error(`No such module: unierp-api/src/modules/${moduleArg} does not exist.`);
  console.error('Available modules: ' + readdirSync(API_MODULES).sort().join(', '));
  process.exit(1);
}

const apiFiles = walk(apiModuleDir).filter((f) => f.endsWith('.ts'));
const controllerFiles = apiFiles.filter((f) => f.endsWith('.controller.ts'));
const serviceFiles = apiFiles.filter((f) => f.endsWith('.service.ts'));
const testFiles = apiFiles.filter((f) => f.endsWith('.spec.ts'));
const nonTestSourceFiles = apiFiles.filter((f) => !f.endsWith('.spec.ts'));

const webModuleDirCandidates = [
  path.join(WEB_APP, '(dashboard)', moduleArg),
  path.join(WEB_APP, moduleArg),
];
const webModuleDir = webModuleDirCandidates.find((d) => existsSync(d));
const webFiles = webModuleDir ? walk(webModuleDir) : [];
const webPages = webFiles.filter((f) => f.endsWith('page.tsx'));

const apiCorpus = apiFiles.map(readSafe).join('\n');
const webCorpus = webPages.map(readSafe).join('\n');

// ── row helpers ─────────────────────────────────────────────────────────
function row(n, dimension, score, evidence) {
  return { n, dimension, score, evidence };
}

const rows = [];

// 1. Data model — presence of a ChangeHistory-shaped model reference,
//    soft-delete field, and the module's own entities in the Prisma corpus.
{
  const prismaRef = countMatches(apiCorpus, /prisma\.\w+/g);
  const hasChangeHistory = /ChangeHistory/.test(apiCorpus);
  const hasSoftDelete = /deletedAt|isDeleted/.test(apiCorpus);
  let score = 0;
  const ev = [];
  if (prismaRef > 0) {
    score = 1;
    ev.push(`${prismaRef} prisma.<model> references found in module source`);
  } else {
    ev.push('no prisma.<model> references found in module source — no entities detected');
  }
  if (score >= 1 && prismaRef >= 5) {
    score = 2;
    ev.push(`>=5 distinct-looking model references suggests a graph, not a single entity`);
  }
  if (score >= 2 && hasChangeHistory && hasSoftDelete) {
    score = 3;
    ev.push('ChangeHistory reference AND soft-delete field (deletedAt/isDeleted) both present');
  } else if (score >= 2) {
    ev.push(`missing for row-3: ChangeHistory=${hasChangeHistory}, soft-delete field=${hasSoftDelete}`);
  }
  rows.push(row(1, 'Data model', score, ev.join('; ')));
}

// 2. Lifecycle — status field, explicit state-machine guard, reversal/correction path.
{
  const hasStatusField = /status\s*[:=]/.test(apiCorpus) || /Status\s*[:=]/.test(apiCorpus);
  const hasGuardedTransition = /(canTransition|assertStatus|InvalidStateError|guard\w*Status)/i.test(apiCorpus);
  const hasReversal = /(reverse|reversal|correction|void\w*\(|creditNote|reverseJournal)/i.test(apiCorpus);
  let score = 0;
  const ev = [];
  if (hasStatusField) { score = 1; ev.push('status-shaped field found'); } else ev.push('no status field found');
  if (score >= 1 && hasGuardedTransition) { score = 2; ev.push('guarded transition helper found (canTransition/assertStatus/InvalidStateError-shaped)'); }
  if (score >= 2 && hasReversal) { score = 3; ev.push('reversal/correction path found (reverse/void/creditNote-shaped)'); }
  else if (score >= 2) ev.push('no reversal/correction path found — row capped at 2');
  rows.push(row(2, 'Lifecycle', score, ev.join('; ')));
}

// 3. Authorisation — @Permissions density across controller handlers.
{
  const permDecorators = countMatches(apiCorpus, /@Permissions\(/g);
  const httpHandlers = countMatches(apiCorpus, /@(Get|Post|Put|Patch|Delete)\(/g);
  const hasRecordLevel = /(tenantId\s*:\s*\w|WHERE.*tenantId|where:\s*\{[^}]*tenantId)/i.test(apiCorpus);
  const hasFieldMasking = /(mask\w*Field|redact|ProtectedComponent|@Sensitive)/i.test(apiCorpus);
  let score = 0;
  const ev = [`${permDecorators} @Permissions(...) decorators across ${httpHandlers} HTTP handlers`];
  if (httpHandlers > 0 && permDecorators > 0) score = 1;
  if (httpHandlers > 0 && permDecorators >= httpHandlers) { score = 2; ev.push('every handler decorated'); }
  else if (httpHandlers > 0) ev.push(`${httpHandlers - permDecorators} handler(s) with no visible @Permissions decorator`);
  if (score >= 2 && hasRecordLevel) { ev.push('record-level tenantId scoping referenced'); }
  else if (score >= 2) { score = 2; ev.push('no record-level scoping evidence found — capped at 2'); }
  if (score >= 2 && hasRecordLevel && hasFieldMasking) { score = 3; ev.push('field-level masking/ProtectedComponent reference found'); }
  rows.push(row(3, 'Authorisation', score, ev.join('; ')));
}

// 4. Approvals
{
  const hasApproval = /approv/i.test(apiCorpus);
  const hasChain = /(approvalChain|ApprovalStep|multi.?level approval)/i.test(apiCorpus);
  const hasDelegationEscalationSla = /(delegat|escalat|\bSLA\b)/i.test(apiCorpus);
  let score = 0;
  const ev = [];
  if (hasApproval) { score = 1; ev.push('"approv*" keyword found'); } else { ev.push('no approval-shaped code found'); }
  if (score >= 1 && hasChain) { score = 2; ev.push('configurable chain shape found (ApprovalStep/approvalChain)'); }
  if (score >= 2 && hasDelegationEscalationSla) { score = 3; ev.push('delegation/escalation/SLA keyword(s) found'); }
  else if (score >= 2) ev.push('no delegation/escalation/SLA evidence — capped at 2');
  rows.push(row(4, 'Approvals', score, ev.join('; ')));
}

// 5. CRUD depth
{
  const hasList = /@Get\(/.test(apiCorpus);
  const hasCreate = /@Post\(/.test(apiCorpus);
  const hasEditDetailDelete = /@Put\(|@Patch\(/.test(apiCorpus) && /@Delete\(/.test(apiCorpus);
  const hasBulkEtc = /(bulk[A-Z]|duplicate\(|merge\(|import[A-Z]|export[A-Z])/.test(apiCorpus);
  let score = 0;
  const ev = [];
  if (hasList) { score = 1; ev.push('@Get handler(s) found'); } else ev.push('no @Get handler found');
  if (score >= 1 && hasCreate) { score = 2; ev.push('@Post handler(s) found'); }
  if (score >= 2 && hasEditDetailDelete) { score = 2; ev.push('@Put/@Patch and @Delete handlers found'); }
  if (score >= 2 && hasBulkEtc) { score = 3; ev.push('bulk/duplicate/merge/import/export handler(s) found'); }
  else if (score >= 2) ev.push('no bulk/duplicate/merge/import/export handler found — capped at 2');
  rows.push(row(5, 'CRUD depth', score, ev.join('; ')));
}

// 6. Validation
{
  const hasServerZod = /z\.(object|string|number)\(/.test(apiCorpus);
  const hasSharedZod = /from ['"]@kannan19302\/(contracts|shared)/.test(apiCorpus);
  const hasCrossEntityDryRun = /(dryRun|crossEntity|businessRule)/i.test(apiCorpus);
  let score = 0;
  const ev = [];
  if (hasServerZod) { score = 1; ev.push('server-side z.object/z.string/z.number found'); } else ev.push('no server-side Zod schema found');
  if (score >= 1 && hasSharedZod) { score = 2; ev.push('shared @kannan19302/contracts or /shared import found (both-sides schema)'); }
  if (score >= 2 && hasCrossEntityDryRun) { score = 3; ev.push('dryRun/crossEntity/businessRule keyword found'); }
  else if (score >= 2) ev.push('no dry-run/cross-entity rule evidence — capped at 2');
  rows.push(row(6, 'Validation', score, ev.join('; ')));
}

// 7. Events — outbox usage.
{
  const emitsCount = countMatches(apiCorpus, /\.emit\(|eventBus\.|publish\(/g);
  const hasOutbox = /outbox/i.test(apiCorpus);
  const hasTransactional = /(prisma\.\$transaction[\s\S]{0,300}outbox|outbox[\s\S]{0,300}\$transaction)/i.test(apiCorpus);
  const hasConsumerReplayDlq = /(@OnEvent|consumer|replay\(|dead.?letter|deadLetter)/i.test(apiCorpus);
  let score = 0;
  const ev = [`${emitsCount} emit/publish call(s)`];
  if (emitsCount > 0) score = 1;
  if (score >= 1 && hasOutbox) { score = 2; ev.push('outbox reference found'); if (hasTransactional) ev.push('appears inside a $transaction with outbox'); }
  else if (score >= 1) ev.push('no outbox reference — events are not transactional, capped at 1');
  if (score >= 2 && hasConsumerReplayDlq) { score = 3; ev.push('consumer/replay/dead-letter handling found'); }
  else if (score >= 2) ev.push('no consumer/replay/dead-letter evidence — capped at 2');
  rows.push(row(7, 'Events', score, ev.join('; ')));
}

// 8. Reporting
{
  const hasExport = /export(Csv|Pdf|Report)|@Get\(['"][^'"]*export/i.test(apiCorpus + webCorpus);
  const hasStandardSet = /(getStandardReports|reportSet|standardReport)/i.test(apiCorpus);
  const hasAdHocScheduled = /(reportBuilder|scheduledReport|drillThrough|drill-through)/i.test(apiCorpus + webCorpus);
  let score = 0;
  const ev = [];
  if (hasExport) { score = 1; ev.push('one export/report endpoint found'); } else ev.push('no export/report endpoint found');
  if (score >= 1 && hasStandardSet) { score = 2; ev.push('standard report set keyword found'); }
  if (score >= 2 && hasAdHocScheduled) { score = 3; ev.push('ad-hoc builder/scheduled/drill-through keyword found'); }
  else if (score >= 2) ev.push('no ad-hoc/scheduled/drill-through evidence — capped at 2');
  rows.push(row(8, 'Reporting', score, ev.join('; ')));
}

// 9. Documents
{
  const hasHtmlPrint = /(print\(|window\.print|@Get\(['"][^'"]*print)/i.test(apiCorpus + webCorpus);
  const hasTemplatedPdf = /(pdfkit|puppeteer|renderPdf|templatePdf|generatePdf)/i.test(apiCorpus);
  const hasBrandedLocalisedEsignAttachment = /(e-?sign|docusign|attachment.?lifecycle|localiz\w*Template)/i.test(apiCorpus);
  let score = 0;
  const ev = [];
  if (hasHtmlPrint) { score = 1; ev.push('HTML print path found'); } else ev.push('no print path found');
  if (score >= 1 && hasTemplatedPdf) { score = 2; ev.push('templated PDF generation found'); }
  if (score >= 2 && hasBrandedLocalisedEsignAttachment) { score = 3; ev.push('e-sign/localised-template/attachment-lifecycle evidence found'); }
  else if (score >= 2) ev.push('no e-sign/localisation/attachment-lifecycle evidence — capped at 2');
  rows.push(row(9, 'Documents', score, ev.join('; ')));
}

// 10. Integrations
{
  const hasManualCsv = /csv|Csv|CSV/.test(apiCorpus);
  const hasDocumentedApi = /@ApiTags\(|@ApiOperation\(/.test(apiCorpus);
  const hasConnectorWebhookIdempotent = /(connector|webhook|idempotencyKey|idempotent)/i.test(apiCorpus);
  let score = 0;
  const ev = [];
  if (hasManualCsv) { score = 1; ev.push('CSV reference found (manual import/export)'); } else ev.push('no CSV reference found');
  if (score >= 1 && hasDocumentedApi) { score = 2; ev.push('@ApiTags/@ApiOperation documented API found'); }
  if (score >= 2 && hasConnectorWebhookIdempotent) { score = 3; ev.push('connector/webhook/idempotent-replay evidence found'); }
  else if (score >= 2) ev.push('no connector/webhook/idempotent-replay evidence — capped at 2');
  rows.push(row(10, 'Integrations', score, ev.join('; ')));
}

// 11. Settings — the D13–D22 contract.
{
  const hasAnyConfig = /(settings|config)/i.test(apiCorpus);
  const hasSettingsContract = /from ['"]@kannan19302\/contracts\/settings|settings-resolution|SettingsPage/.test(apiCorpus + webCorpus);
  const hasScopedVersionedAudited = /(scope:\s*['"](tenant|app|user|device)|versionedSetting|settingsAudit)/i.test(apiCorpus);
  let score = 0;
  const ev = [];
  if (hasAnyConfig) { score = 1; ev.push('settings/config-shaped code found'); } else ev.push('no settings/config code found');
  if (score >= 1 && hasSettingsContract) { score = 2; ev.push('D13-D22 settings contract import found (settings-resolution/SettingsPage)'); }
  else if (score >= 1) ev.push('no settings-contract import found — likely hardcoded/bespoke, capped at 1');
  if (score >= 2 && hasScopedVersionedAudited) { score = 3; ev.push('scoped tenant/app/user/device + versioned/audited evidence found'); }
  else if (score >= 2) ev.push('no scoped/versioned/audited evidence — capped at 2');
  rows.push(row(11, 'Settings', score, ev.join('; ')));
}

// 12. UI states — six-state component coverage across the module's pages.
{
  const sixStateNames = ['LoadingState', 'FilteredEmptyState', 'EmptyState', 'ErrorState', 'ForbiddenState', 'PartialState'];
  const presentPerPage = webPages.map((f) => {
    const c = readSafe(f);
    return sixStateNames.filter((n) => c.includes(n));
  });
  const totalPages = webPages.length;
  const pagesWithAny = presentPerPage.filter((p) => p.length > 0).length;
  const pagesWithAll = presentPerPage.filter((p) => new Set(p).size >= 5).length;
  const hasOptimisticOfflineConflict = /(optimisticUpdate|offlineQueue|conflictResolution)/i.test(webCorpus);
  let score = 0;
  const ev = [`${totalPages} page.tsx file(s) found under unierp-web for this module`];
  if (totalPages === 0) {
    ev.push('no web pages found — cannot score UI states');
  } else {
    ev.push(`${pagesWithAny}/${totalPages} pages reference at least one six-state component`);
    ev.push(`${pagesWithAll}/${totalPages} pages reference >=5 of the 6 named state components`);
    if (pagesWithAny > 0) score = 1;
    if (pagesWithAny === totalPages) score = 2;
    if (pagesWithAll === totalPages && totalPages > 0) {
      score = 3;
      if (hasOptimisticOfflineConflict) ev.push('optimistic/offline/conflict-resolution evidence also found');
    }
  }
  rows.push(row(12, 'UI states', score, ev.join('; ')));
}

// 13. Accessibility
{
  const webTestDir = webModuleDir ? path.join(webModuleDir) : null;
  const hasAnyAxeTest = webTestDir ? walk(webTestDir).some((f) => /\.test\.tsx?$/.test(f) && /vitest-axe|jest-axe/.test(readSafe(f))) : false;
  const hasKeyboardHandlers = /onKeyDown|role=["']button["']/.test(webCorpus);
  let score = 0;
  const ev = [];
  if (webPages.length === 0) {
    ev.push('no web pages found — cannot score accessibility');
  } else if (hasKeyboardHandlers) {
    score = 1;
    ev.push('keyboard event handler(s) found in module pages (mostly-keyboard)');
  } else {
    ev.push('no keyboard event handling evidence found in module pages');
  }
  if (score >= 1 && hasAnyAxeTest) { score = 2; ev.push('a vitest-axe/jest-axe test exists under this module\'s route tree'); }
  else if (score >= 1) ev.push('no axe test found for this module\'s routes — capped at 1 (D063: the platform-wide axe gate is itself fabricated, see 90-DEFECT-LOG.md)');
  rows.push(row(13, 'Accessibility', score, ev.join('; ')));
}

// 14. Tests — ratio of spec files to source files, plus integration/E2E signal.
{
  const ratio = nonTestSourceFiles.length > 0 ? testFiles.length / nonTestSourceFiles.length : 0;
  const hasIntegration = testFiles.some((f) => /integration|e2e/i.test(readSafe(f)) || /integration|e2e/i.test(f));
  const hasPropertyMutation = testFiles.some((f) => /fast-check|fc\.\w+|mutation/i.test(readSafe(f)));
  let score = 0;
  const ev = [`${testFiles.length} spec file(s) / ${nonTestSourceFiles.length} non-test source file(s) = ratio ${ratio.toFixed(2)}`];
  if (testFiles.length > 0) score = 1;
  if (score >= 1 && ratio >= 0.3) { score = 2; ev.push('ratio >= 0.30 treated as "units + isolation"'); }
  else if (score >= 1) ev.push('ratio < 0.30 — capped at 1 (some units only)');
  if (score >= 2 && hasIntegration) { ev.push('integration/e2e-labeled spec found'); } else if (score >= 2) { score = 2; ev.push('no integration/e2e-labeled spec found — capped at 2'); }
  if (score >= 2 && hasIntegration && hasPropertyMutation) { score = 3; ev.push('property/mutation-testing evidence found (fast-check or mutation keyword)'); }
  rows.push(row(14, 'Tests', score, ev.join('; ')));
}

// 15. Performance — NOT mechanically measurable from source; requires a real
//     profiling run. Reported as a stable placeholder unless a real score
//     was previously recorded via --record-perf.
{
  let recorded = {};
  if (existsSync(PERF_RECORD_FILE)) {
    try { recorded = JSON.parse(readFileSync(PERF_RECORD_FILE, 'utf-8')); } catch { recorded = {}; }
  }
  if (recordPerfArg) {
    const val = Number(recordPerfArg.split('=')[1]);
    if (![0, 1, 2, 3].includes(val)) {
      console.error('--record-perf must be 0, 1, 2, or 3');
      process.exit(1);
    }
    recorded[moduleArg] = { score: val, recordedAt: new Date().toISOString() };
    writeFileSync(PERF_RECORD_FILE, JSON.stringify(recorded, null, 2) + '\n', 'utf-8');
  }
  const hasIndexHints = /@@index\(|@@unique\(/.test(apiCorpus);
  if (recorded[moduleArg]) {
    rows.push(row(15, 'Performance', recorded[moduleArg].score,
      `manually recorded score=${recorded[moduleArg].score} at ${recorded[moduleArg].recordedAt} via --record-perf (this row cannot be computed from static source — it requires a real p95 measurement)`));
  } else {
    rows.push(row(15, 'Performance', 0,
      `UNMEASURED — no p95 profiling data on file. Indexed-query hint: @@index/@@unique present = ${hasIndexHints}. ` +
      `Run a real load/profiling pass and record with: node scripts/score-module.mjs ${moduleArg} --record-perf=<0-3>. ` +
      `Stable placeholder (always reports 0 until recorded) — reruns are deterministic.`));
  }
}

// 16. Client parity
{
  const mobileFiles = existsSync(MOBILE_ROOT) ? walk(MOBILE_ROOT).filter((f) => new RegExp(moduleArg, 'i').test(f)) : [];
  const mobileHasWrite = mobileFiles.some((f) => /post\(|put\(|create\w*\(|useMutation/i.test(readSafe(f)));
  const hasOfflineCapable = mobileFiles.some((f) => /offline|syncQueue/i.test(readSafe(f)));
  let score = 0;
  const ev = [`${webPages.length} web page(s); ${mobileFiles.length} mobile file(s) matching /${moduleArg}/i under unierp-mobile`];
  if (webPages.length > 0) score = 1;
  if (score >= 1 && mobileFiles.length > 0) { score = 2; ev.push('mobile file(s) reference this module (at least read-only mobile)'); }
  if (score >= 2 && mobileHasWrite) { score = 2; ev.push('mobile write path found — still capped at 2 without desktop evidence (desktop client not checked by this tool)'); }
  if (score >= 2 && mobileHasWrite && hasOfflineCapable) { score = 3; ev.push('offline/syncQueue evidence found in mobile files'); }
  rows.push(row(16, 'Client parity', score, ev.join('; ')));
}

// ── output ──────────────────────────────────────────────────────────────
console.log(`Module completeness rubric — ${moduleArg}`);
console.log(`(unierp-api/src/modules/${moduleArg}: ${apiFiles.length} files, ${controllerFiles.length} controllers, ${serviceFiles.length} services, ${testFiles.length} specs)`);
console.log(`(unierp-web: ${webModuleDir ? path.relative(root, webModuleDir) : 'NOT FOUND'}, ${webPages.length} pages)`);
console.log('');
for (const r of rows) {
  console.log(`${String(r.n).padStart(2)}. ${r.dimension.padEnd(16)} [${r.score}]  ${r.evidence}`);
}
console.log('');

const nextLevelRequired = [1, 2, 3, 7, 14];
const failsNextLevel = rows.filter((r) => (nextLevelRequired.includes(r.n) && r.score < 3) || (!nextLevelRequired.includes(r.n) && r.score < 2));
const isNextLevel = failsNextLevel.length === 0;
console.log(`"Next level" (>=2 every row, >=3 on rows 1,2,3,7,14): ${isNextLevel ? 'YES' : 'NO'}`);
if (!isNextLevel) {
  console.log('Rows below threshold: ' + failsNextLevel.map((r) => `#${r.n} ${r.dimension} (${r.score})`).join(', '));
}
