import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { renderPreviewPlan, renderRuntimePlan } from "./render-plan.mjs";

const port = Number.parseInt(process.env.PORT ?? "4018", 10);
const controlPlane = new URL(process.env.CONTROL_PLANE_URL ?? "http://host.docker.internal:3001");
const maxResponseBytes = 8 * 1024 * 1024;

const securityHeaders = {
  "cache-control": "no-store",
  "content-security-policy": "default-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'",
  "referrer-policy": "no-referrer",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
};

function send(response, status, body, contentType = "application/json; charset=utf-8") {
  response.writeHead(status, { ...securityHeaders, "content-type": contentType });
  response.end(typeof body === "string" ? body : JSON.stringify(body));
}

async function fetchPreviewPlan(request, response, token) {
  const authorization = request.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    send(response, 401, { error: "Bearer authorization is required" });
    return null;
  }

  const upstreamUrl = new URL(`/api/v1/dev/previews/${encodeURIComponent(token)}`, controlPlane);
  const upstream = await fetch(upstreamUrl, {
    headers: { authorization, accept: "application/json" },
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
  const contentLength = Number(upstream.headers.get("content-length") ?? "0");
  if (contentLength > maxResponseBytes) {
    send(response, 502, { error: "Preview plan exceeds the runtime limit" });
    return null;
  }
  const body = await upstream.text();
  if (Buffer.byteLength(body) > maxResponseBytes) {
    send(response, 502, { error: "Preview plan exceeds the runtime limit" });
    return;
  }
  if (!upstream.ok) {
    send(response, upstream.status, body, "application/json; charset=utf-8");
    return null;
  }
  return JSON.parse(body);
}

async function resolvePreview(request, response, token) {
  const plan = await fetchPreviewPlan(request, response, token);
  if (plan) send(response, 200, plan);
}

async function renderPreview(request, response, token) {
  const plan = await fetchPreviewPlan(request, response, token);
  if (plan) send(response, 200, renderPreviewPlan(plan, token), "text/html; charset=utf-8");
}

async function readForm(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 64 * 1024) throw new RangeError("Submission is too large");
    chunks.push(chunk);
  }
  return new URLSearchParams(Buffer.concat(chunks).toString("utf8"));
}

async function submitPreview(request, response, token) {
  const plan = await fetchPreviewPlan(request, response, token);
  if (!plan) return;
  const form = await readForm(request);
  const formArtifactId = form.get("_form_artifact_id");
  if (!formArtifactId) { send(response, 400, { error: "Form artifact identity is required" }); return; }
  form.delete("_form_artifact_id");
  const values = Object.fromEntries(form.entries());
  const requestBody = JSON.stringify({ formArtifactId, values });
  const idempotencyKey = `preview_${createHash("sha256").update(token).update("\0").update(requestBody).digest("hex")}`;
  const upstreamUrl = new URL(`/api/v1/dev/previews/${encodeURIComponent(token)}/submissions`, controlPlane);
  const upstream = await fetch(upstreamUrl, { method: "POST", headers: { authorization: request.headers.authorization, "content-type": "application/json", "idempotency-key": idempotencyKey }, body: requestBody, redirect: "error", signal: AbortSignal.timeout(10_000) });
  const result = await upstream.text();
  if (!upstream.ok) { send(response, upstream.status, result, "application/json; charset=utf-8"); return; }
  const submittedFields = Object.keys(values);
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Submitted</title></head><body><main><h1>Submission accepted</h1><p>Created a tenant-isolated preview record with ${submittedFields.length} field${submittedFields.length === 1 ? "" : "s"}.</p><a href="/preview/${encodeURIComponent(token)}">Return to preview</a></main></body></html>`;
  send(response, 200, html, "text/html; charset=utf-8");
}

async function fetchRuntimePlan(request, response, environmentId, projectId) {
  const authorization = request.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) { send(response, 401, { error: "Bearer authorization is required" }); return null; }
  const upstreamUrl = new URL(`/api/v1/dev/runtime/environments/${encodeURIComponent(environmentId)}/projects/${encodeURIComponent(projectId)}/manifest`, controlPlane);
  const upstream = await fetch(upstreamUrl, { headers: { authorization, accept: "application/json" }, redirect: "error", signal: AbortSignal.timeout(10_000) });
  const body = await upstream.text();
  if (!upstream.ok) { send(response, upstream.status, body, "application/json; charset=utf-8"); return null; }
  if (Buffer.byteLength(body) > maxResponseBytes) { send(response, 502, { error: "Runtime plan exceeds the runtime limit" }); return null; }
  return JSON.parse(body);
}

async function renderRuntime(request, response, environmentId, projectId) {
  const plan = await fetchRuntimePlan(request, response, environmentId, projectId);
  if (plan) send(response, 200, renderRuntimePlan(plan, environmentId, projectId), "text/html; charset=utf-8");
}

async function submitRuntime(request, response, environmentId, projectId) {
  const plan = await fetchRuntimePlan(request, response, environmentId, projectId);
  if (!plan) return;
  const form = await readForm(request);
  const formArtifactId = form.get("_form_artifact_id");
  if (!formArtifactId) { send(response, 400, { error: "Form artifact identity is required" }); return; }
  form.delete("_form_artifact_id");
  const values = Object.fromEntries(form.entries());
  const requestBody = JSON.stringify({ formArtifactId, values });
  const idempotencyKey = `runtime_${createHash("sha256").update(environmentId).update("\0").update(projectId).update("\0").update(requestBody).digest("hex")}`;
  const upstreamUrl = new URL(`/api/v1/dev/runtime/environments/${encodeURIComponent(environmentId)}/projects/${encodeURIComponent(projectId)}/submissions`, controlPlane);
  const upstream = await fetch(upstreamUrl, { method: "POST", headers: { authorization: request.headers.authorization, "content-type": "application/json", "idempotency-key": idempotencyKey }, body: requestBody, redirect: "error", signal: AbortSignal.timeout(10_000) });
  const result = await upstream.text();
  if (!upstream.ok) { send(response, upstream.status, result, "application/json; charset=utf-8"); return; }
  send(response, 200, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Submitted</title></head><body><main><h1>Submission accepted</h1><p>The active signed release created a tenant-isolated record.</p><a href="/runtime/${encodeURIComponent(environmentId)}/projects/${encodeURIComponent(projectId)}">Return to application</a></main></body></html>`, "text/html; charset=utf-8");
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    if (request.method === "GET" && url.pathname === "/healthz") {
      send(response, 200, { status: "ok", runtime: "unierp-local-preview", version: 1 });
      return;
    }
    const match = request.method === "GET" && url.pathname.match(/^\/api\/preview\/([^/]+)$/);
    if (match) {
      await resolvePreview(request, response, decodeURIComponent(match[1]));
      return;
    }
    const renderMatch = request.method === "GET" && url.pathname.match(/^\/preview\/([^/]+)$/);
    if (renderMatch) {
      await renderPreview(request, response, decodeURIComponent(renderMatch[1]));
      return;
    }
    const submitMatch = request.method === "POST" && url.pathname.match(/^\/preview\/([^/]+)\/submit$/);
    if (submitMatch) {
      await submitPreview(request, response, decodeURIComponent(submitMatch[1]));
      return;
    }
    const runtimeMatch = request.method === "GET" && url.pathname.match(/^\/runtime\/([^/]+)\/projects\/([^/]+)$/);
    if (runtimeMatch) { await renderRuntime(request, response, decodeURIComponent(runtimeMatch[1]), decodeURIComponent(runtimeMatch[2])); return; }
    const runtimeSubmitMatch = request.method === "POST" && url.pathname.match(/^\/runtime\/([^/]+)\/projects\/([^/]+)\/submit$/);
    if (runtimeSubmitMatch) { await submitRuntime(request, response, decodeURIComponent(runtimeSubmitMatch[1]), decodeURIComponent(runtimeSubmitMatch[2])); return; }
    if (request.method === "GET" && url.pathname === "/") {
      send(response, 200, "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width\"><title>UniERP Preview Runtime</title></head><body><main><h1>UniERP Preview Runtime</h1><p>The isolated local preview runtime is ready.</p></main></body></html>", "text/html; charset=utf-8");
      return;
    }
    send(response, 404, { error: "Not found" });
  } catch (error) {
    const message = error instanceof Error && error.name === "TimeoutError" ? "Control plane timed out" : "Preview runtime request failed";
    send(response, 502, { error: message });
  }
});

server.requestTimeout = 15_000;
server.headersTimeout = 10_000;
server.listen(port, "0.0.0.0");
