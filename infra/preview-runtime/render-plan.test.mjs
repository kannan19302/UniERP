import assert from "node:assert/strict";
import test from "node:test";
import { renderPreviewPlan, renderRuntimePlan } from "./render-plan.mjs";

const plan = (kind, spec) => ({ apiVersion: "unierp.preview-plan/v1", projectId: "project-1", sourceFingerprint: "fingerprint-1", context: { locale: "en" }, artifacts: [{ artifactId: kind === "FORM" ? "form-artifact" : "page-artifact", kind, source: { metadata: { name: kind }, spec } }] });

test("renders a working canonical form without allowing source HTML injection", () => {
  const html = renderPreviewPlan(plan("FORM", { title: "Customer <script>", pages: [{ fields: [{ id: "email", label: "Email", type: "email", required: true }] }] }), "opaque-token");
  assert.match(html, /data-artifact-kind="FORM"/);
  assert.match(html, /type="email" required/);
  assert.match(html, /name="_form_artifact_id" value="form-artifact"/);
  assert.match(html, /Customer &lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
});

test("renders canonical site page sections and responsive metadata", () => {
  const html = renderPreviewPlan(plan("PAGE", { title: "Home", sections: [{ type: "hero", props: { heading: "Build faster", body: "One platform" } }] }), "opaque-token");
  assert.match(html, /data-artifact-kind="PAGE"/);
  assert.match(html, /class="hero"/);
  assert.match(html, /name="viewport"/);
});

test("fails closed for an unknown plan contract", () => assert.throws(() => renderPreviewPlan({ apiVersion: "unknown", artifacts: [] }, "token"), /Unsupported runtime plan/));

test("renders an immutable runtime plan with an environment-scoped submission route", () => {
  const runtime = { ...plan("FORM", { title: "Released Form", pages: [] }), apiVersion: "unierp.runtime-plan/v1", releaseId: "release-1", environmentId: "env-1" };
  const html = renderRuntimePlan(runtime, "env-1", "project-1");
  assert.match(html, /action="\/runtime\/env-1\/projects\/project-1\/submit"/);
});
