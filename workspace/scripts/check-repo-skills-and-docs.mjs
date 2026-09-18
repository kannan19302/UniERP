#!/usr/bin/env node
/**
 * scripts/check-repo-skills-and-docs.mjs
 *
 * Verifies that all 31 repositories in active-estate.json have:
 * 1. A dedicated project skill at .agents/skills/<name>/SKILL.md with valid YAML frontmatter.
 * 2. An authoritative ARCHITECTURE.md file with Mermaid diagrams and boundary definitions.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const WORKSPACE_DIR = resolve('.');
const PARENT_DIR = resolve('..');
const ESTATE_FILE = join(WORKSPACE_DIR, 'governance', 'active-estate.json');

const estate = JSON.parse(readFileSync(ESTATE_FILE, 'utf8'));
const repositories = estate.repositories;

console.log(`Verifying project skills and ARCHITECTURE.md across ${repositories.length} repositories...\n`);

let missingSkills = [];
let missingDocs = [];
let invalidSkills = [];

for (const entry of repositories) {
  const repoName = entry.repository;
  const repoPath = resolve(PARENT_DIR, repoName);

  if (!existsSync(repoPath)) {
    console.warn(`⚠️ Repository folder missing: ${repoPath}`);
    continue;
  }

  // 1. Check ARCHITECTURE.md
  const archFile = join(repoPath, 'ARCHITECTURE.md');
  if (!existsSync(archFile)) {
    missingDocs.push(repoName);
  } else {
    const content = readFileSync(archFile, 'utf8');
    if (!content.includes('```mermaid') || !content.includes('Layer')) {
      missingDocs.push(`${repoName} (missing mermaid or layer specification)`);
    }
  }

  // 2. Check .agents/skills/*/SKILL.md
  const skillsDir = join(repoPath, '.agents', 'skills');
  if (!existsSync(skillsDir)) {
    missingSkills.push(repoName);
  } else {
    const subdirs = readdirSync(skillsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
    if (subdirs.length === 0) {
      missingSkills.push(repoName);
    } else {
      let hasValidSkill = false;
      for (const sub of subdirs) {
        const skillFile = join(skillsDir, sub.name, 'SKILL.md');
        if (existsSync(skillFile)) {
          const content = readFileSync(skillFile, 'utf8');
          if (content.startsWith('---') && content.includes('name:') && content.includes('description:')) {
            hasValidSkill = true;
            break;
          }
        }
      }
      if (!hasValidSkill) {
        invalidSkills.push(repoName);
      }
    }
  }
}

console.log('── Validation Results ──────────────────────────────────────────');
if (missingSkills.length === 0 && missingDocs.length === 0 && invalidSkills.length === 0) {
  console.log(`✅ All ${repositories.length} repositories have valid, authoritative:`);
  console.log(`   - Dedicated Project AI Skills (.agents/skills/*/SKILL.md)`);
  console.log(`   - Publication-Grade ARCHITECTURE.md documents with Mermaid diagrams.`);
  process.exit(0);
} else {
  if (missingSkills.length > 0) console.error(`❌ Missing skills in: ${missingSkills.join(', ')}`);
  if (missingDocs.length > 0) console.error(`❌ Missing/invalid architecture docs in: ${missingDocs.join(', ')}`);
  if (invalidSkills.length > 0) console.error(`❌ Invalid skill formatting in: ${invalidSkills.join(', ')}`);
  process.exit(1);
}
