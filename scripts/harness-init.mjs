#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function fail(message) {
  console.error(`harness:init FAIL — ${message}`);
  process.exit(1);
}

function runNpm(args, label) {
  const result = spawnSync(npmCommand, args, { cwd: root, stdio: 'inherit' });
  if (result.error) fail(`${label}: ${result.error.message}`);
  if (result.status !== 0) fail(`${label} exited with status ${result.status ?? 'unknown'}.`);
}

function versionParts(value) {
  return value.replace(/^v/, '').split('.').map((part) => Number.parseInt(part, 10));
}

function versionAtLeast(actual, minimum) {
  const actualParts = versionParts(actual);
  const minimumParts = versionParts(minimum);
  for (let index = 0; index < Math.max(actualParts.length, minimumParts.length); index += 1) {
    const actualPart = actualParts[index] ?? 0;
    const minimumPart = minimumParts[index] ?? 0;
    if (actualPart > minimumPart) return true;
    if (actualPart < minimumPart) return false;
  }
  return true;
}

function dependencyDrift() {
  const lock = JSON.parse(readFileSync(resolve(root, 'package-lock.json'), 'utf8'));
  const drift = [];
  for (const [packagePath, metadata] of Object.entries(lock.packages ?? {})) {
    if (!packagePath.startsWith('node_modules/') || metadata.optional || metadata.link) continue;
    const manifestPath = resolve(root, packagePath, 'package.json');
    if (!existsSync(manifestPath)) {
      drift.push(`${packagePath} is missing`);
      continue;
    }
    const installed = JSON.parse(readFileSync(manifestPath, 'utf8')).version;
    if (installed !== metadata.version) {
      drift.push(`${packagePath} is ${installed ?? 'unknown'}, lockfile requires ${metadata.version}`);
    }
  }
  return drift;
}

const requiredNodeMajor = Number(readFileSync(resolve(root, '.nvmrc'), 'utf8').trim());
const actualNodeMajor = Number(process.versions.node.split('.')[0]);
if (!Number.isInteger(requiredNodeMajor)) fail('.nvmrc must contain a Node.js major version.');
if (actualNodeMajor < requiredNodeMajor) {
  fail(`Node.js ${requiredNodeMajor}+ is required; found ${process.versions.node}.`);
}

const npmVersion = spawnSync(npmCommand, ['--version'], { cwd: root, encoding: 'utf8' });
if (npmVersion.status !== 0) fail('npm is unavailable; install the npm version required by package.json.');
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const minimumNpm = packageJson.engines?.npm?.match(/\d+(?:\.\d+){0,2}/)?.[0];
if (!minimumNpm || !versionAtLeast(npmVersion.stdout.trim(), minimumNpm)) {
  fail(`npm ${packageJson.engines?.npm ?? 'version requirement missing'} is required; found ${npmVersion.stdout.trim()}.`);
}

const nodeModules = resolve(root, 'node_modules');
let drift = existsSync(nodeModules) ? dependencyDrift() : ['node_modules is absent'];
if (drift.length) {
  if (checkOnly) {
    fail(`dependencies do not match package-lock.json (${drift.slice(0, 3).join('; ')}). Run \`npm run harness:init\`.`);
  }
  console.log('Dependencies are absent or stale; running the reproducible install: npm ci');
  runNpm(['ci'], 'npm ci');
  drift = dependencyDrift();
  if (drift.length) fail(`npm ci completed but dependency drift remains: ${drift.slice(0, 3).join('; ')}`);
}

runNpm(['run', 'harness:check'], 'harness verification');
console.log(`harness:init PASS — Node ${process.versions.node}, npm ${npmVersion.stdout.trim()}, dependencies ready.`);
