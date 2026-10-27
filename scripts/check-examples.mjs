// Compila o código de todos os exemplos da documentação (examples.generated.ts), tal como
// aparece em "Ver código", para garantir que quem o copia tem um componente que compila.
// Uso: npm run docs:examples && node scripts/check-examples.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dir = join(root, '.check-examples');
const src = readFileSync(join(root, 'projects/docs/src/app/data/examples.generated.ts'), 'utf8');
const examples = JSON.parse(src.slice(src.indexOf('= {') + 2, src.lastIndexOf('};') + 1));

rmSync(dir, { recursive: true, force: true });
const keys = Object.keys(examples);
keys.forEach((key, i) => {
  const d = join(dir, `ex${i}`);
  mkdirSync(d, { recursive: true });
  writeFileSync(
    join(d, 'exemplo.ts'),
    examples[key].ts.replace("selector: 'app-exemplo'", `selector: 'app-exemplo-${i}'`),
  );
  writeFileSync(join(d, 'exemplo.html'), examples[key].html);
});
writeFileSync(
  join(dir, 'tsconfig.json'),
  JSON.stringify(
    {
      extends: '../tsconfig.json',
      compilerOptions: {
        outDir: './out',
        types: [],
        lib: ['ES2022', 'dom', 'dom.iterable'],
        noUnusedLocals: false,
      },
      include: ['ex*/exemplo.ts'],
      angularCompilerOptions: { strictTemplates: true },
    },
    null,
    2,
  ),
);

let output = '';
try {
  execFileSync(join(root, 'node_modules/.bin/ngc'), ['-p', join(dir, 'tsconfig.json')], {
    stdio: 'pipe',
  });
} catch (e) {
  output = `${e.stdout ?? ''}${e.stderr ?? ''}`;
}
const failed = new Map();
output = output.replace(/\x1b\[[0-9;]*m/g, '');
for (const m of output.matchAll(
  /ex(\d+)\/(exemplo\.(?:ts|html)):(\d+):(\d+) - error (TS\d+|NG\d+): ([^\n]+)/g,
)) {
  const key = keys[Number(m[1])];
  if (!failed.has(key)) failed.set(key, []);
  failed.get(key).push(`${m[2]}:${m[3]} ${m[5]} ${m[6]}`);
}
if (!failed.size && output.trim()) console.log(output);
for (const [k, errs] of failed) console.log(`✗ ${k}\n   ${errs.join('\n   ')}`);
console.log(`\n${keys.length} exemplos, ${failed.size} com erros.`);
rmSync(dir, { recursive: true, force: true });
process.exit(failed.size || output.includes('error') ? 1 : 0);
