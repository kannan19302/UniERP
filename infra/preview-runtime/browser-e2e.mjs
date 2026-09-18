import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const upstreamPort = 4119;
const runtimePort = 4118;
const bearer = "Bearer browser-e2e";
let persistedSubmission;
let activeRelease = "v2";
const plans = {
  form: { apiVersion: "unierp.preview-plan/v1", projectId: "app-project", sourceFingerprint: "app-fingerprint", context: { locale: "en", device: "desktop" }, artifacts: [{ artifactId: "form-artifact", kind: "FORM", source: { metadata: { name: "Customer form" }, spec: { title: "Create customer", pages: [{ fields: [{ id: "email", label: "Email", type: "email", required: true }] }] } } }] },
  page: { apiVersion: "unierp.preview-plan/v1", projectId: "site-project", sourceFingerprint: "site-fingerprint", context: { locale: "en", device: "mobile" }, artifacts: [{ artifactId: "page-artifact", kind: "PAGE", source: { metadata: { name: "Home" }, spec: { title: "Home", slug: "/", sections: [{ type: "hero", props: { heading: "Build your business", body: "Powered by UniERP" } }] } } }] },
};
const runtimePlans = {
  "app-project": (version) => ({ apiVersion: "unierp.runtime-plan/v1", projectId: "app-project", environmentId: "staging", releaseId: `app-${version}`, sourceFingerprint: `app-${version}`, artifacts: [{ artifactId: "form-artifact", kind: "FORM", source: { metadata: { name: "Customer form" }, spec: { title: `Customer ${version}`, pages: [{ fields: [{ id: "email", label: "Email", type: "email", required: true }] }] } } }] }),
  "site-project": (version) => ({ apiVersion: "unierp.runtime-plan/v1", projectId: "site-project", environmentId: "staging", releaseId: `site-${version}`, sourceFingerprint: `site-${version}`, artifacts: [{ artifactId: "page-artifact", kind: "PAGE", source: { metadata: { name: "Home" }, spec: { title: `Home ${version}`, sections: [{ type: "hero", props: { heading: `Site ${version}`, body: "Immutable release" } }] } } }] }),
};

const upstream = createServer((request, response) => {
  if (request.headers.authorization !== bearer) {
    response.writeHead(401, { "content-type": "application/json" }).end('{"error":"unauthorized"}');
    return;
  }
  if (request.method === "POST" && request.url?.endsWith("/submissions")) {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      persistedSubmission = { body: JSON.parse(Buffer.concat(chunks).toString("utf8")), idempotencyKey: request.headers["idempotency-key"] };
      response.writeHead(201, { "content-type": "application/json" }).end('{"id":"record-1"}');
    });
    return;
  }
  if (request.method === "GET" && request.url?.endsWith("/manifest")) {
    const projectId = request.url.split("/projects/")[1]?.split("/")[0];
    const runtimePlan = runtimePlans[projectId]?.(activeRelease);
    if (!runtimePlan) response.writeHead(404, { "content-type": "application/json" }).end('{"error":"missing"}');
    else response.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(runtimePlan));
    return;
  }
  const token = request.url?.split("/").at(-1);
  const plan = plans[token];
  if (!plan) response.writeHead(404, { "content-type": "application/json" }).end('{"error":"missing"}');
  else response.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(plan));
});
await new Promise((resolve) => upstream.listen(upstreamPort, "127.0.0.1", resolve));

const runtime = spawn(process.execPath, [fileURLToPath(new URL("./server.mjs", import.meta.url))], {
  env: { ...process.env, PORT: String(runtimePort), CONTROL_PLANE_URL: `http://127.0.0.1:${upstreamPort}` },
  stdio: ["ignore", "pipe", "pipe"],
});

async function waitUntilReady() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(`http://127.0.0.1:${runtimePort}/healthz`)).ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Preview runtime did not become ready");
}

let browser;
try {
  await waitUntilReady();
  assert.equal((await fetch(`http://127.0.0.1:${runtimePort}/preview/form`)).status, 401);
  browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ authorization: bearer });

  await page.goto(`http://127.0.0.1:${runtimePort}/preview/form`, { waitUntil: "networkidle0" });
  assert.equal(await page.$eval("h1", (node) => node.textContent), "Create customer");
  await page.type('input[name="email"]', "pilot@example.test");
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click('button[type="submit"]')]);
  assert.equal(await page.$eval("h1", (node) => node.textContent), "Submission accepted");
  assert.deepEqual(persistedSubmission.body, { formArtifactId: "form-artifact", values: { email: "pilot@example.test" } });
  assert.match(persistedSubmission.idempotencyKey, /^preview_[a-f0-9]{64}$/);

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${runtimePort}/preview/page`, { waitUntil: "networkidle0" });
  assert.equal(await page.$eval(".hero h1", (node) => node.textContent), "Build your business");
  assert.equal(await page.$eval("main", (node) => node.dataset.projectId), "site-project");

  await page.goto(`http://127.0.0.1:${runtimePort}/runtime/staging/projects/app-project`, { waitUntil: "networkidle0" });
  assert.equal(await page.$eval("h1", (node) => node.textContent), "Customer v2");
  await page.type('input[name="email"]', "release@example.test");
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click('button[type="submit"]')]);
  assert.match(persistedSubmission.idempotencyKey, /^runtime_[a-f0-9]{64}$/);
  await page.goto(`http://127.0.0.1:${runtimePort}/runtime/staging/projects/site-project`, { waitUntil: "networkidle0" });
  assert.equal(await page.$eval(".hero h1", (node) => node.textContent), "Site v2");
  activeRelease = "v1";
  await page.goto(`http://127.0.0.1:${runtimePort}/runtime/staging/projects/app-project`, { waitUntil: "networkidle0" });
  assert.equal(await page.$eval("h1", (node) => node.textContent), "Customer v1");
  await page.goto(`http://127.0.0.1:${runtimePort}/runtime/staging/projects/site-project`, { waitUntil: "networkidle0" });
  assert.equal(await page.$eval(".hero h1", (node) => node.textContent), "Site v1");
  console.log("Browser E2E passed: preview, persistent runtime submission, and immutable App/Site rollback v2→v1");
} finally {
  await browser?.close();
  runtime.kill();
  await new Promise((resolve) => upstream.close(resolve));
}
