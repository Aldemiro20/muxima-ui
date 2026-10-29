/**
 * Lê os blocos em src/app/blocks/<categoria>/<id>.{ts,html,css} (português) e
 * src/app/en/blocks/<categoria>/<id>.{ts,html,css} (inglês) e gera
 * src/app/data/blocks.generated.ts com o código de cada um, para mostrar e copiar.
 *
 *   node projects/docs/scripts/extract-blocks.mjs
 *
 * Os blocos são componentes reais (compilados com o site), por isso o código
 * mostrado é exactamente o que corre na pré-visualização.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// A chave é `<idioma>/<id>`: alguns ids (navbar-site, cart-mini…) são iguais nos dois idiomas.
const roots = [
  ['pt', fileURLToPath(new URL('../src/app/blocks', import.meta.url))],
  ['en', fileURLToPath(new URL('../src/app/en/blocks', import.meta.url))],
];
const out = fileURLToPath(new URL('../src/app/data/blocks.generated.ts', import.meta.url));

const code = {};
for (const [lang, root] of roots)
  for (const dir of (await readdir(root, { withFileTypes: true })).filter((d) => d.isDirectory())) {
    const files = await readdir(join(root, dir.name));
    for (const ts of files.filter((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts'))) {
      const id = ts.slice(0, -3);
      const read = async (ext) => {
        try {
          return (await readFile(join(root, dir.name, id + ext), 'utf8')).trimEnd() + '\n';
        } catch {
          return '';
        }
      };
      code[`${lang}/${id}`] = { ts: await read('.ts'), html: await read('.html'), css: await read('.css') };
    }
  }

const body =
  '// Gerado por projects/docs/scripts/extract-blocks.mjs. Não editar à mão.\n' +
  'export interface BlockCode {\n  ts: string;\n  html: string;\n  css: string;\n}\n\n' +
  `export const BLOCK_CODE: Record<string, BlockCode> = ${JSON.stringify(code, null, 2)};\n`;
await writeFile(out, body);
console.log(`blocks.generated.ts: ${Object.keys(code).length} blocos`);
