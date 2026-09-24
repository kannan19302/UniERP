#!/usr/bin/env node
/**
 * Retired repository-document scaffolder.
 *
 * ADR-0012 and ADR-0001 place product and platform architecture in
 * platform/docs. This entrypoint remains for old callers but is read-only:
 * it validates the current one-AGENTS-per-root arrangement and cannot
 * regenerate stale repository ARCHITECTURE.md files or duplicate skills.
 */
import "./check-repo-skills-and-docs.mjs";
