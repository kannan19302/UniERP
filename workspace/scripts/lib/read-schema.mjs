/**
 * Single source for reading the Prisma schema, now that it is a multi-file
 * folder (R2 / ARCHITECTURE_REVIEW § F4).
 *
 * Five scripts previously opened `prisma/schema.prisma` directly. When the
 * schema was split into `prisma/schema/*.prisma` every one of them started
 * throwing ENOENT — including `check-schema-lints.mjs`, which is a CI gate.
 * A gate that crashes is worse than a gate that fails: it reports an error
 * that looks like tooling breakage, so it gets ignored rather than fixed.
 *
 * `readSchema()` concatenates every `.prisma` file in the folder, in a stable
 * order, and falls back to the legacy single file so the scripts keep working
 * on older branches and on `v1.0.0`.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

/** Absolute path to the schema folder, or null when the legacy layout is in use. */
export function schemaDir(root) {
  const dirs = [
    join(root, "..", "data", "prisma", "schema"),
    join(root, "..", "unierp-data", "prisma", "schema"),
    join(root, "prisma", "schema"),
    join(root, "packages", "database", "prisma", "schema"),
  ];
  return dirs.find((d) => existsSync(d) && statSync(d).isDirectory()) ?? null;
}

/** Every schema file path, newest layout first, legacy single file as fallback. */
export function schemaFiles(root) {
  const dir = schemaDir(root);
  if (dir) {
    return readdirSync(dir)
      .filter((f) => f.endsWith(".prisma"))
      .sort()
      .map((f) => join(dir, f));
  }
  const legacy = join(root, "packages", "database", "prisma", "schema.prisma");
  return existsSync(legacy) ? [legacy] : [];
}

/**
 * The IdP schema, which lives outside the main schema folder.
 *
 * The platform split moved User, UserProfile, UserIdentity, Role, UserRole,
 * UserSession and the token models into their own schema. Any control that
 * reasons about the data model as a whole — the PII registry above all, since
 * those are the most PII-dense models in the system — has to read it too, or it
 * silently stops covering identity.
 */
export function idpSchemaFile(root) {
  const candidates = [
    join(root, "..", "data", "prisma", "idp-schema.prisma"),
    join(root, "..", "data", "src", "idp-client", "schema.prisma"),
    join(root, "..", "unierp-data", "prisma", "idp-schema.prisma"),
    join(root, "..", "unierp-data", "src", "idp-client", "schema.prisma"),
    join(root, "packages", "database", "prisma", "idp-schema.prisma"),
    join(root, "packages", "database", "src", "idp-client", "schema.prisma"),
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}

/**
 * The whole schema as one string.
 *
 * `options.includeIdp` also folds in the IdP schema. Off by default because the
 * Float/money and migration checks are about the main datamodel; on for controls
 * that must see every model.
 *
 * Callers that report `file:line` should use `schemaFiles()` and read each file
 * themselves — concatenated line numbers would point at nothing.
 */
export function readSchema(root, options = {}) {
  const files = schemaFiles(root);
  if (options.includeIdp) {
    const idp = idpSchemaFile(root);
    if (idp) files.push(idp);
  }
  if (files.length === 0) {
    throw new Error(
      "No Prisma schema found. Looked for packages/database/prisma/schema/*.prisma " +
        "and packages/database/prisma/schema.prisma.",
    );
  }
  return files.map((f) => readFileSync(f, "utf8")).join("\n");
}
