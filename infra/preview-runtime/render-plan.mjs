const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const text = (value, fallback = "") => typeof value === "string" && value.trim() ? value : fallback;
const array = (value) => Array.isArray(value) ? value : [];

function fieldControl(field) {
  const id = escapeHtml(text(field?.id, text(field?.name, "field")));
  const label = escapeHtml(text(field?.label, text(field?.name, "Field")));
  const required = field?.required ? " required" : "";
  const type = text(field?.type, "text").toLowerCase();
  if (["select", "dropdown", "choice"].includes(type)) {
    const options = array(field?.options).map((option) => {
      const value = typeof option === "object" ? option.value : option;
      const optionLabel = typeof option === "object" ? option.label : option;
      return `<option value="${escapeHtml(value)}">${escapeHtml(optionLabel)}</option>`;
    }).join("");
    return `<label>${label}<select name="${id}"${required}>${options}</select></label>`;
  }
  if (["textarea", "longtext", "richtext"].includes(type)) return `<label>${label}<textarea name="${id}"${required}></textarea></label>`;
  const htmlType = ({ email: "email", number: "number", date: "date", password: "password", checkbox: "checkbox" })[type] ?? "text";
  return `<label>${label}<input name="${id}" type="${htmlType}"${required}></label>`;
}

function renderForm(artifact, submissionAction) {
  const spec = artifact.source?.spec ?? {};
  const pages = array(spec.pages);
  const fields = pages.flatMap((page) => array(page?.fields));
  return `<article data-artifact-kind="FORM"><h1>${escapeHtml(text(spec.title, artifact.source?.metadata?.name ?? "Form"))}</h1><form method="post" action="${escapeHtml(submissionAction)}"><input type="hidden" name="_form_artifact_id" value="${escapeHtml(artifact.artifactId)}">${fields.map(fieldControl).join("")}<button type="submit">Submit</button></form></article>`;
}

function renderSection(section, index) {
  const type = text(section?.type, text(section?.kind, "section")).toLowerCase();
  const props = section?.props ?? section?.content ?? section ?? {};
  const heading = text(props.heading, text(props.title, ""));
  const body = text(props.body, text(props.text, text(props.description, "")));
  if (type.includes("hero")) return `<section class="hero" data-section="${index}"><h1>${escapeHtml(heading || "Welcome")}</h1>${body ? `<p>${escapeHtml(body)}</p>` : ""}</section>`;
  return `<section data-section="${index}">${heading ? `<h2>${escapeHtml(heading)}</h2>` : ""}${body ? `<p>${escapeHtml(body)}</p>` : ""}</section>`;
}

function renderPage(artifact) {
  const spec = artifact.source?.spec ?? {};
  return `<article data-artifact-kind="PAGE"><header><h1>${escapeHtml(text(spec.title, artifact.source?.metadata?.name ?? "Page"))}</h1></header>${array(spec.sections).map(renderSection).join("")}</article>`;
}

export function renderPlan(plan, submissionAction) {
  if (!["unierp.preview-plan/v1", "unierp.runtime-plan/v1"].includes(plan?.apiVersion) || !Array.isArray(plan?.artifacts)) throw new TypeError("Unsupported runtime plan");
  const renderable = plan.artifacts.filter((artifact) => artifact?.kind === "FORM" || artifact?.kind === "PAGE");
  const content = renderable.map((artifact) => artifact.kind === "FORM" ? renderForm(artifact, submissionAction) : renderPage(artifact)).join("");
  const title = renderable[0]?.source?.spec?.title ?? "UniERP Preview";
  return `<!doctype html><html lang="${escapeHtml(plan.context?.locale ?? "en")}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title><style>:root{font-family:Inter,system-ui,sans-serif;color:#172033;background:#f6f8fc}body{margin:0}main{max-width:70rem;margin:auto;padding:clamp(1rem,4vw,4rem)}article{background:white;border:1px solid #dfe5ef;border-radius:1rem;padding:clamp(1rem,3vw,2.5rem);box-shadow:0 1rem 3rem #17203312}form{display:grid;gap:1rem;max-width:42rem}label{display:grid;gap:.4rem;font-weight:600}input,textarea,select{font:inherit;padding:.75rem;border:1px solid #aeb9ca;border-radius:.5rem}button{font:inherit;font-weight:700;color:white;background:#3157d5;border:0;border-radius:.5rem;padding:.8rem 1.25rem;width:max-content}.hero{padding:4rem 1rem;text-align:center;background:#edf2ff;border-radius:.75rem}section+section{margin-top:2rem}.empty{color:#58657a}</style></head><body><main data-project-id="${escapeHtml(plan.projectId)}" data-source-fingerprint="${escapeHtml(plan.sourceFingerprint)}">${content || '<p class="empty">This composition has no renderable Form or Page artifact.</p>'}</main></body></html>`;
}

export const renderPreviewPlan = (plan, token) => renderPlan(plan, `/preview/${encodeURIComponent(token)}/submit`);
export const renderRuntimePlan = (plan, environmentId, projectId) => renderPlan(plan, `/runtime/${encodeURIComponent(environmentId)}/projects/${encodeURIComponent(projectId)}/submit`);
