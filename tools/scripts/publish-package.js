#!/usr/bin/env node

/**
 * Publishes a single @muxima-ui package to npm.
 *
 * Usage:
 *   node tools/scripts/publish-package.js <package-name> [--dry-run]
 *   e.g. node tools/scripts/publish-package.js button
 *
 * Requires the package to already be built at
 * packages/dist/libs/<package-name>/ (run `npx nx build <package-name>
 * --configuration=production` first if needed).
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const DIST_DIR = path.join(ROOT, 'packages', 'dist', 'libs');

function main() {
  const dryRun = process.argv.includes('--dry-run');
  const name = process.argv.slice(2).find((a) => !a.startsWith('--'));

  if (!name) {
    console.error('Usage: node tools/scripts/publish-package.js <package-name> [--dry-run]');
    process.exit(1);
  }

  const dir = path.join(DIST_DIR, name);
  const pkgJsonPath = path.join(dir, 'package.json');

  if (!fs.existsSync(pkgJsonPath)) {
    console.error(`Built package not found: ${pkgJsonPath}`);
    console.error(`Run \`npx nx build ${name} --configuration=production\` first.`);
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  console.log(`Publishing ${pkg.name}@${pkg.version}...`);

  if (dryRun) {
    console.log('(dry run, not published)');
    return;
  }

  // On Windows, `npm` resolves to the `npm.cmd` shim, which execFileSync
  // cannot exec directly without going through a shell.
  execFileSync('npm', ['publish', '--access', 'public'], { cwd: dir, stdio: 'inherit', shell: true });
  console.log(`Published ${pkg.name}@${pkg.version}`);
}

main();
