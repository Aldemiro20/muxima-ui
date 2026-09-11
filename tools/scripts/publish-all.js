#!/usr/bin/env node

/**
 * Publishes every built @muxima-ui package to npm.
 *
 * Assumes `npm run build:all` has already produced fresh output in
 * packages/dist/libs/<package-name>/package.json (the current Nx/ng-packagr
 * output location) — NOT dist/packages/... which older tooling used to
 * expect.
 *
 * Usage:
 *   node tools/scripts/publish-all.js
 *   node tools/scripts/publish-all.js --dry-run
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const DIST_DIR = path.join(ROOT, 'packages', 'dist', 'libs');
const dryRun = process.argv.includes('--dry-run');

function whoami() {
  try {
    return execFileSync('npm', ['whoami'], { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function main() {
  const user = whoami();
  if (!user) {
    console.error('Not logged in to npm. Run `npm login` first.');
    process.exit(1);
  }
  console.log(`Logged in to npm as: ${user}\n`);

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`Build output not found at ${DIST_DIR}.`);
    console.error('Run `npm run build:all` first.');
    process.exit(1);
  }

  const pkgDirs = fs
    .readdirSync(DIST_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(DIST_DIR, e.name))
    .filter((dir) => fs.existsSync(path.join(dir, 'package.json')))
    .sort();

  if (pkgDirs.length === 0) {
    console.error(`No built packages found in ${DIST_DIR}.`);
    process.exit(1);
  }

  console.log(`Found ${pkgDirs.length} built packages.\n`);

  let published = 0;
  let failed = 0;
  let skipped = 0;
  const failures = [];

  for (const dir of pkgDirs) {
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    process.stdout.write(`Publishing ${pkg.name}@${pkg.version}... `);

    if (dryRun) {
      console.log('(dry run, not published)');
      skipped++;
      continue;
    }

    try {
      execFileSync('npm', ['publish', '--access', 'public'], { cwd: dir, stdio: 'pipe' });
      console.log('done');
      published++;
    } catch (err) {
      const message = (err.stderr ? err.stderr.toString() : err.message) || '';
      if (/cannot publish over/i.test(message) || /you cannot publish over/i.test(message)) {
        console.log('skipped (version already published)');
        skipped++;
      } else {
        console.log('FAILED');
        failed++;
        failures.push({ name: pkg.name, message: message.trim() });
      }
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Published: ${published}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Failed:    ${failed}`);

  if (failures.length) {
    console.log('\nFailures:');
    failures.forEach((f) => console.log(`  ${f.name}: ${f.message.split('\n')[0]}`));
    process.exit(1);
  }
}

main();
