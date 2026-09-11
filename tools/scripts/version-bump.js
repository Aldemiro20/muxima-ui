#!/usr/bin/env node

/**
 * Bumps the version of every publishable @muxima-ui package in lockstep.
 *
 * Usage:
 *   node tools/scripts/version-bump.js --version patch|minor|major|<explicit x.y.z>
 *   node tools/scripts/version-bump.js --version patch --dry-run
 *
 * Run this BEFORE `npm run build:all`, so the built output in
 * packages/dist/libs picks up the new version.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PACKAGES_DIR = path.join(ROOT, 'packages');

function parseArgs() {
  const args = process.argv.slice(2);
  const versionIdx = args.indexOf('--version');
  const bump = versionIdx !== -1 && args[versionIdx + 1] ? args[versionIdx + 1] : 'patch';
  const dryRun = args.includes('--dry-run');
  return { bump, dryRun };
}

function bumpSemver(version, bump) {
  if (/^\d+\.\d+\.\d+$/.test(bump)) return bump;

  const match = /^(\d+)\.(\d+)\.(\d+)/.exec(version);
  if (!match) throw new Error(`Cannot parse current version "${version}" as semver.`);
  const M = Number(match[1]), m = Number(match[2]), p = Number(match[3]);

  switch (bump) {
    case 'major':
      return `${M + 1}.0.0`;
    case 'minor':
      return `${M}.${m + 1}.0`;
    case 'patch':
      return `${M}.${m}.${p + 1}`;
    default:
      throw new Error(`Unknown bump type "${bump}". Use patch, minor, major, or an explicit x.y.z version.`);
  }
}

function findPackageJsonFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findPackageJsonFiles(full, results);
    } else if (entry.name === 'package.json') {
      results.push(full);
    }
  }
  return results;
}

function compareSemver(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i];
  }
  return 0;
}

function main() {
  const { bump, dryRun } = parseArgs();
  const files = findPackageJsonFiles(PACKAGES_DIR);

  if (files.length === 0) {
    console.error(`No package.json files found under ${PACKAGES_DIR}.`);
    process.exit(1);
  }

  const entries = files
    .map((file) => {
      const raw = fs.readFileSync(file, 'utf8');
      const pkg = JSON.parse(raw);
      return { file, pkg, raw };
    })
    .filter(({ pkg }) => pkg.name && pkg.name.startsWith('@muxima-ui/'));

  if (entries.length === 0) {
    console.error('No @muxima-ui packages found to bump.');
    process.exit(1);
  }

  // Some packages have drifted out of sync (manual partial bumps in the
  // past). Use the highest version found across all of them as the
  // baseline, so every package converges on the same new version and
  // none of them regress below what's already on the registry.
  const highestVersion = entries.reduce(
    (max, { pkg }) => (compareSemver(pkg.version, max) > 0 ? pkg.version : max),
    entries[0].pkg.version,
  );
  const newVersion = bumpSemver(highestVersion, bump);

  const updated = [];
  for (const { file, pkg, raw } of entries) {
    if (pkg.version === newVersion) continue;

    if (!dryRun) {
      pkg.version = newVersion;
      fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
    }
    updated.push({ name: pkg.name, from: raw.match(/"version":\s*"([^"]+)"/)?.[1], file });
  }

  console.log(`\n${dryRun ? '[dry run] Would bump' : 'Bumped'} ${updated.length} packages to version ${newVersion}:\n`);
  updated
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(({ name, from }) => console.log(`  - ${name}: ${from} -> ${newVersion}`));

  console.log('\nNext steps:');
  console.log('  1. npm run build:all');
  console.log('  2. npm run publish:all\n');
}

main();
