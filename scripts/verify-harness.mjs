#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
let passes = 0;

function pass(label) {
  passes += 1;
  console.log(`PASS  ${label}`);
}

function fail(label, detail) {
  failures.push(`${label}: ${detail}`);
  console.error(`FAIL  ${label} — ${detail}`);
}

function text(path) {
  const absolute = resolve(root, path);
  if (!existsSync(absolute)) {
    fail(`required file ${path}`, 'missing');
    return '';
  }
  return readFileSync(absolute, 'utf8');
}

function requireMarkers(path, markers) {
  const source = text(path);
  if (!source) return;
  const missing = markers.filter((marker) => !source.includes(marker));
  if (missing.length) fail(`${path} markers`, `missing ${missing.join(', ')}`);
  else pass(`${path} markers`);
}

const requiredFiles = [
  'AGENTS.md',
  'CLAUDE.md',
  '.github/copilot-instructions.md',
  'PROGRESS.md',
  'docs/ARCHITECTURE.md',
  'docs/HARNESS.md',
  '.nvmrc',
  'package.json',
  'package-lock.json',
  'scripts/harness-init.mjs',
  'scripts/verify-harness.mjs',
];
const missingFiles = requiredFiles.filter((path) => !existsSync(resolve(root, path)));
if (missingFiles.length) fail('required harness files', `missing ${missingFiles.join(', ')}`);
else pass('required harness files');

requireMarkers('AGENTS.md', [
  '## Mission',
  '## Startup gate',
  '## Environment and tools',
  '## Repository map and task router',
  '## Non-negotiable constraints',
  '## Goal loop',
  '## Feedback ladder',
  '## State and definition of done',
]);
requireMarkers('docs/HARNESS.md', [
  '## Five subsystems',
  '## Knowledge authority and routing',
  '## Startup readiness',
  '## State contract',
  '## Feedback and recovery',
  '## Explorer, implementer, verifier, coordinator',
]);

const claude = text('CLAUDE.md');
if (claude.includes('@AGENTS.md')) pass('Claude adapter delegates to AGENTS.md');
else fail('Claude adapter delegation', 'expected @AGENTS.md');

const copilot = text('.github/copilot-instructions.md');
if (copilot.includes('AGENTS.md') && copilot.length < 800) pass('Copilot adapter is thin and delegates');
else fail('Copilot adapter delegation', 'must point to AGENTS.md and remain under 800 characters');

const packageJson = JSON.parse(text('package.json') || '{}');
const requiredScripts = ['dev', 'check', 'build', 'verify', 'harness:init', 'harness:check'];
const missingScripts = requiredScripts.filter((name) => !packageJson.scripts?.[name]);
if (missingScripts.length) fail('required npm scripts', `missing ${missingScripts.join(', ')}`);
else if (!packageJson.scripts.verify.includes('harness:check') || !packageJson.scripts.verify.includes('build')) {
  fail('full verification gate', 'verify must run harness:check and build');
} else pass('required npm scripts and full gate');

const pinnedNode = Number(text('.nvmrc').trim());
const actualNode = Number(process.versions.node.split('.')[0]);
const declaredNode = packageJson.engines?.node ?? '';
if (!Number.isInteger(pinnedNode) || !declaredNode.includes(String(pinnedNode))) {
  fail('runtime contract', '.nvmrc must be reflected in package.json engines.node');
} else if (actualNode < pinnedNode) {
  fail('runtime compatibility', `requires Node ${pinnedNode}+; found ${process.versions.node}`);
} else pass(`runtime compatibility (Node ${process.versions.node})`);

const progress = text('PROGRESS.md');
const status = progress.match(/^- Status: (idle|active|blocked)$/m)?.[1];
const currentState = progress.split('## Recently completed')[0];
const stateMarkers = [
  '- Branch:', '- HEAD:', '- Updated:', '- Worktree:', '### Objective', '### Acceptance criteria',
  '### Decisions', '### Progress', '### Blockers', '### Verification', '### Next action',
];
if (!status) fail('state status', 'expected Status: idle, active, or blocked');
else if (status !== 'idle' && stateMarkers.some((marker) => !currentState.includes(marker))) {
  fail('active/blocked state schema', 'one or more required operational fields are missing');
} else if ((currentState.match(/^### Next action$/gm) ?? []).length !== 1) {
  fail('next action', 'expected exactly one Next action section in current state');
} else pass(`state schema (${status})`);

const generated = requiredFiles.map((path) => text(path)).join('\n');
const forbidden = [
  [/\/Users\/[A-Za-z0-9._-]+\//, 'absolute macOS user path'],
  [/[A-Za-z]:\\Users\\/, 'absolute Windows user path'],
  [/NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*0/, 'disabled Node TLS verification'],
  [/strict-ssl\s*=\s*false/, 'disabled npm TLS verification'],
  [/(api[_-]?key|token|password)\s*[:=]\s*["'][^"']+["']/i, 'possible embedded secret'],
];
const violations = forbidden.filter(([pattern]) => pattern.test(generated)).map(([, label]) => label);
if (violations.length) fail('portability and secret scan', violations.join(', '));
else pass('portability and secret scan');

if (failures.length) {
  console.error(`\nharness:check FAIL — ${failures.length} failure(s), ${passes} check(s) passed.`);
  process.exit(1);
}
console.log(`\nharness:check PASS — ${passes} checks passed.`);
