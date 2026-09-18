import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, isAbsolute, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
export const DEFAULT_WORKSPACE_ROOT = resolve(scriptDirectory, "..", "..", "..");

function estateError(message) {
  return new Error(`UniERP active-estate error: ${message}`);
}

function isSafeRepositoryPath(value) {
  return typeof value === "string"
    && value.length > 0
    && !isAbsolute(value)
    && !value.split(/[\\/]/).includes("..")
    && !value.includes("\0");
}

/** Parse the single authoritative workspace inventory without touching the filesystem. */
export function parseWorkspaceInventory(value, source = "UniERP.code-workspace") {
  if (!value || typeof value !== "object" || !Array.isArray(value.folders)) {
    throw estateError(`${source} must contain a non-empty folders array`);
  }
  if (value.folders.length === 0) throw estateError(`${source} discovered zero repositories`);

  const repositories = new Map();
  for (const folder of value.folders) {
    const repository = folder?.path;
    if (!isSafeRepositoryPath(repository)) {
      throw estateError(`${source} has an unsafe repository path: ${String(repository)}`);
    }
    if (repositories.has(repository)) {
      throw estateError(`${source} declares repository '${repository}' more than once`);
    }
    repositories.set(repository, Object.freeze({
      name: typeof folder?.name === "string" ? folder.name : repository,
      path: repository,
    }));
  }
  return repositories;
}

/** Load and validate the active estate declared by the root workspace inventory. */
export function loadActiveEstate({ workspaceRoot = DEFAULT_WORKSPACE_ROOT, requireDirectories = true } = {}) {
  const root = resolve(workspaceRoot);
  const inventoryFile = resolve(root, "UniERP.code-workspace");
  if (!existsSync(inventoryFile)) throw estateError(`workspace inventory is missing at ${inventoryFile}`);

  let inventory;
  try {
    inventory = JSON.parse(readFileSync(inventoryFile, "utf8"));
  } catch (error) {
    throw estateError(`workspace inventory is invalid JSON at ${inventoryFile}: ${error.message}`);
  }

  const repositories = parseWorkspaceInventory(inventory, inventoryFile);
  if (requireDirectories) {
    for (const repository of repositories.values()) {
      const absolutePath = resolve(root, repository.path);
      if (!absolutePath.startsWith(`${root}${sep}`) && absolutePath !== root) {
        throw estateError(`repository '${repository.path}' escapes workspace root`);
      }
      if (!existsSync(absolutePath) || !statSync(absolutePath).isDirectory()) {
        throw estateError(`declared repository '${repository.path}' is missing at ${absolutePath}`);
      }
    }
  }

  return Object.freeze({
    root,
    inventoryFile,
    repositories,
    names: Object.freeze([...repositories.keys()]),
  });
}

export function activeRepositoryPath(estate, repository) {
  if (!estate?.repositories?.has(repository)) {
    throw estateError(`'${repository}' is not declared in ${estate?.inventoryFile ?? "the active workspace inventory"}`);
  }
  const path = resolve(estate.root, estate.repositories.get(repository).path);
  if (!existsSync(path) || !statSync(path).isDirectory()) {
    throw estateError(`declared repository '${repository}' is unavailable at ${path}`);
  }
  return path;
}

export function requiredSourceDirectory(estate, repository, ...segments) {
  const directory = resolve(activeRepositoryPath(estate, repository), ...segments);
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    throw estateError(`required source directory '${repository}/${segments.join("/")}' is missing at ${directory}`);
  }
  return directory;
}

export function assertNonEmptyDiscovery(label, items) {
  const count = Array.isArray(items) ? items.length : Number(items);
  if (!Number.isInteger(count) || count <= 0) {
    throw estateError(`${label} discovered zero expected targets`);
  }
  return count;
}
