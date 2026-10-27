/**
 * Gera src/app/data/examples.generated.ts com o código de cada exemplo da documentação.
 *
 * Para cada <doc-example title="..."> e <doc-states> das páginas, guarda:
 *  - html: o template do exemplo, tal como está na página;
 *  - ts: os imports da Muxima usados, os membros da classe de que o exemplo precisa
 *        e os componentes auxiliares que abre (diálogos, drawers).
 *
 * Corre automaticamente antes de `npm start` e `npm run build:docs`.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(here, '../src/app');
const coreDir = resolve(here, '../../core');

// ---------- utilitários ----------

/** Índice do fecho do bloco que abre em `open` (que aponta para '{', '(' ou '['), ignorando strings. */
function matchClose(src, open) {
  const pairs = { '{': '}', '(': ')', '[': ']' };
  const stack = [pairs[src[open]]];
  for (let i = open + 1; i < src.length; i++) {
    const c = src[i];
    if (c === "'" || c === '"' || c === '`') {
      i = skipString(src, i);
      continue;
    }
    if (c === '/' && src[i + 1] === '/') {
      i = src.indexOf('\n', i);
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      i = src.indexOf('*/', i) + 1;
      continue;
    }
    if (pairs[c]) stack.push(pairs[c]);
    else if (c === stack[stack.length - 1]) {
      stack.pop();
      if (!stack.length) return i;
    }
  }
  return -1;
}
function skipString(src, i) {
  const q = src[i];
  for (let j = i + 1; j < src.length; j++) {
    if (src[j] === '\\') {
      j++;
      continue;
    }
    if (src[j] === q) return j;
  }
  return src.length;
}

function dedent(text) {
  const lines = text.replace(/^\n+|\s+$/g, '').split('\n');
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const min = Math.min(...indents);
  return lines.map((l) => l.slice(min)).join('\n');
}

const identifiers = (text) => new Set(text.match(/[A-Za-z_$][\w$]*/g) ?? []);

/** Só as expressões do template: interpolações, bindings, eventos e blocos @if/@for. */
function templateExpressions(html) {
  const parts = [];
  for (const m of html.matchAll(/\{\{([\s\S]*?)\}\}/g)) parts.push(m[1]);
  for (const m of html.matchAll(/\s[\[(][^\s=]*[\])]="([^"]*)"/g)) parts.push(m[1]);
  for (const m of html.matchAll(/@(?:if|for|switch|else if)\s*\(([^\n]*)\)\s*\{/g)) parts.push(m[1]);
  for (const m of html.matchAll(/\s#(\w+)/g)) parts.push(m[1]);
  return parts.join('\n');
}

// ---------- mapa selector -> classe da biblioteca ----------

const library = []; // { cls, entry, tags: [], attrs: [] }
for (const entry of readdirSync(coreDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || ['src', 'styles', 'testing'].includes(entry.name)) continue;
  for (const file of readdirSync(join(coreDir, entry.name))) {
    if (!file.endsWith('.ts') || file.endsWith('.spec.ts')) continue;
    const src = readFileSync(join(coreDir, entry.name, file), 'utf8');
    const re = /selector:\s*'([^']+)'[\s\S]*?export class (\w+)/g;
    let m;
    while ((m = re.exec(src))) {
      const sel = m[1];
      const tags = [...sel.matchAll(/(?:^|,\s*)([a-z][\w-]*-[\w-]+)(?=\[|,|$)/g)].map((x) => x[1]);
      const attrs = [...sel.matchAll(/\[(\w+)(?:=[^\]]*)?\]/g)].map((x) => x[1]).filter((a) => a.startsWith('mx'));
      library.push({ cls: m[2], entry: entry.name, tags, attrs });
    }
  }
}
// constantes exportadas (MX_TABLE, MX_DIALOG...) e serviços
const exported = []; // { name, entry }
for (const entry of readdirSync(coreDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = join(coreDir, entry.name);
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts') || file.endsWith('.spec.ts')) continue;
    const src = readFileSync(join(dir, file), 'utf8');
    for (const m of src.matchAll(/export (?:const|class|function|type|interface) (\w+)/g)) exported.push({ name: m[1], entry: entry.name });
    for (const m of src.matchAll(/export \{([^}]+)\}/g))
      for (const part of m[1].split(',')) {
        const name = part.trim().split(/\s+as\s+/).pop();
        if (name) exported.push({ name, entry: entry.name });
      }
  }
}
const entryOf = (name) => exported.find((e) => e.name === name)?.entry;

function libraryImports(html, ts) {
  const used = new Set();
  const tags = new Set([...html.matchAll(/<([a-z][\w-]*)/g)].map((m) => m[1]));
  const attrs = new Set([...html.matchAll(/[\s[(]((?:mx|MX)[\w]*)/g)].map((m) => m[1]));
  for (const lib of library) {
    if (lib.tags.some((t) => tags.has(t)) || lib.attrs.some((a) => attrs.has(a))) used.add(lib.cls);
  }
  // grupos exportados em vez de directivas soltas
  const groups = { MX_DIALOG: 'dialog', MX_TABLE: 'table', MX_CARD: 'card', MX_MENU: 'menu', MX_ALERT: 'alert', MX_ACCORDION: 'accordion', MX_POPOVER: 'popover', MX_STEPPER: 'stepper', MX_COMMAND: 'command' };
  const byEntry = new Map();
  for (const cls of used) {
    const entry = library.find((l) => l.cls === cls).entry;
    const group = Object.entries(groups).find(([, e]) => e === entry && entry !== 'form-field');
    const name = group ? group[0] : cls;
    if (!byEntry.has(entry)) byEntry.set(entry, new Set());
    byEntry.get(entry).add(name);
  }
  // serviços e tipos usados no TypeScript
  for (const id of identifiers(ts)) {
    if (!/^(Mx|MX_|mx)/.test(id)) continue;
    const entry = entryOf(id);
    if (!entry) continue;
    if (!byEntry.has(entry)) byEntry.set(entry, new Set());
    byEntry.get(entry).add(id);
  }
  const lines = [...byEntry.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([entry, names]) => `import { ${[...names].sort().join(', ')} } from '@muxima-ui/core/${entry}';`);
  const ng = [];
  if (/\bngModel\b/.test(html)) ng.push('FormsModule');
  if (/formControl|formGroup|formControlName/.test(html)) ng.push('ReactiveFormsModule');
  const ngTs = [...new Set(['FormControl', 'FormGroup', 'Validators'].filter((x) => new RegExp(`\\b${x}\\b`).test(ts)))];
  const angular = [];
  if (ng.length || ngTs.length) angular.push(`import { ${[...ng, ...ngTs].join(', ')} } from '@angular/forms';`);
  if (/routerLink/.test(html)) angular.push(`import { RouterLink } from '@angular/router';`);
  const core = ['Component', ...['signal', 'computed', 'inject', 'effect'].filter((x) => new RegExp(`\\b${x}\\(`).test(ts))];
  const importsArray = [
    ...[...byEntry.values()].flatMap((s) => [...s]).filter((n) => !/^(MxDialog|MxDrawer|MxToast|MxCommandPalette|MxSortState|MxBadgeVariant|MxCardVariant|MxToastPosition|MxDrawerSide|MxStepState|MxCommandItem|MX_DIALOG_DATA|MxDialogRef|mx[A-Z]\w*)$/.test(n) || n === 'MX_DIALOG'),
    ...ng,
    ...(/routerLink/.test(html) ? ['RouterLink'] : []),
  ];
  return { lines: [`import { ${core.join(', ')} } from '@angular/core';`, ...angular, ...lines], importsArray };
}

// ---------- classes e membros ----------

function findClasses(src) {
  const out = new Map();
  for (const m of src.matchAll(/(?:export )?class (\w+)[^{]*\{/g)) {
    const start = m.index;
    const open = m.index + m[0].length - 1;
    const close = matchClose(src, open);
    // decorador imediatamente antes
    const before = src.slice(0, start);
    const deco = before.lastIndexOf('@Component(');
    let declStart = start;
    if (deco >= 0) {
      const decoClose = matchClose(src, deco + '@Component'.length);
      if (decoClose > 0 && src.slice(decoClose + 1, start).trim() === '') declStart = deco;
    }
    // comentário JSDoc antes
    const doc = src.slice(0, declStart).match(/\/\*\*(?:(?!\*\/)[\s\S])*\*\/\s*$/);
    out.set(m[1], { name: m[1], start: doc ? declStart - doc[0].length : declStart, end: close + 1, body: src.slice(open + 1, close) });
  }
  return out;
}

function splitMembers(body) {
  const members = [];
  let i = 0;
  let depth = 0;
  let current = '';
  const flush = () => {
    if (current.trim()) members.push(current.replace(/^\n+/, '').replace(/\s+$/, ''));
    current = '';
  };
  while (i < body.length) {
    const c = body[i];
    if (c === "'" || c === '"' || c === '`') {
      const j = skipString(body, i);
      current += body.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    if ('{(['.includes(c)) depth++;
    if ('})]'.includes(c)) depth--;
    current += c;
    if (depth === 0 && (c === ';' || c === '}')) {
      // fim de membro se a linha seguinte começa um novo membro ou o fim
      const rest = body.slice(i + 1);
      if (/^\s*\n/.test(rest) || rest.trim() === '') flush();
    }
    i++;
  }
  flush();
  return members
    .map((text) => {
      const clean = text.replace(/^\s*(\/\/[^\n]*\n|\/\*\*[\s\S]*?\*\/\s*)+/, '');
      const m = clean.match(/^\s*(?:(?:protected|private|public|readonly|async|static)\s+)*([A-Za-z_$][\w$]*)/);
      return { name: m ? m[1] : '', text };
    })
    .filter((m) => m.name);
}

function moduleDecls(src) {
  const out = new Map();
  for (const m of src.matchAll(/^(?:export )?(const|interface|type) (\w+)[^\n]*/gm)) {
    let end;
    const lineEnd = src.indexOf('\n', m.index);
    const brace = src.slice(m.index, lineEnd).search(/[{[(]\s*$/);
    if (brace >= 0) {
      const close = matchClose(src, m.index + brace);
      end = src.indexOf('\n', close);
      if (end < 0) end = src.length;
    } else end = lineEnd;
    out.set(m[2], src.slice(m.index, end).replace(/^export /, ''));
  }
  return out;
}

// ---------- rotas -> ficheiros ----------

const routes = readFileSync(join(appDir, 'app.routes.ts'), 'utf8');
const pages = [...routes.matchAll(/path: '([^']+)'[^}]*?import\('\.\/(pages\/[^']+)'\)\.then\(\(m\) => m\.(\w+)\)/g)].map((m) => ({
  route: m[1],
  file: join(appDir, m[2] + '.ts'),
  cls: m[3],
}));

const result = {};
for (const page of pages) {
  const src = readFileSync(page.file, 'utf8');
  const classes = findClasses(src);
  const pageClass = classes.get(page.cls);
  if (!pageClass) continue;
  const members = splitMembers(pageClass.body).filter((m) => !['previewCode', 'api'].includes(m.name));
  const decls = moduleDecls(src);
  // componentes auxiliares noutros ficheiros locais (ex.: drawer-examples.ts)
  const localFiles = [...src.matchAll(/from '\.\/([\w-]+)'/g)].map((m) => join(dirname(page.file), m[1] + '.ts')).filter(existsSync);
  const extraClasses = new Map();
  const extraDecls = new Map();
  for (const f of localFiles) {
    const s = readFileSync(f, 'utf8');
    for (const [k, v] of findClasses(s)) extraClasses.set(k, s.slice(v.start, v.end));
    for (const [k, v] of moduleDecls(s)) extraDecls.set(k, v);
  }
  for (const [k, v] of classes) if (k !== page.cls) extraClasses.set(k, src.slice(v.start, v.end));

  const blocks = [];
  for (const m of src.matchAll(/<doc-example\b([^>]*)>([\s\S]*?)<\/doc-example>/g)) {
    const title = m[1].match(/\btitle="([^"]*)"/)?.[1];
    if (title) blocks.push({ title: title.replace(/&quot;/g, '"'), html: m[2] });
  }
  const states = src.match(/<doc-states>([\s\S]*?)<\/doc-states>/);
  if (states) blocks.push({ title: 'Estados', html: states[1] });

  for (const block of blocks) {
    let html = dedent(block.html)
      .replace(/<doc-state name="([^"]*)"(?: note="([^"]*)")?>/g, (_, n, note) => `<!-- ${n}${note ? ': ' + note.replace(/&quot;/g, '"') : ''} -->\n`)
      .replace(/<\/doc-state>/g, '\n')
      .replace(/<doc-icon [^>]*\/>/g, '<svg aria-hidden="true">…</svg>')
      .replace(/&#64;/g, '@')
      .replace(/ class="([^"]*)"/g, (all, cls) => {
        // retira classes só da documentação (layout dos exemplos)
        const keep = cls.split(/\s+/).filter((c) => c.startsWith('mx-'));
        return keep.length ? ` class="${keep.join(' ')}"` : '';
      })
      .replace(/ inert/g, '')
      .replace(/^\s*<span><\/span>\n/gm, '');
    html = html.replace(/\n{3,}/g, '\n\n').trim();

    // membros necessários: os referidos no template e, depois, os referidos por esses
    const needed = new Set();
    let frontier = identifiers(templateExpressions(html));
    for (let pass = 0; pass < 4; pass++) {
      const next = new Set();
      for (const mem of members) {
        if (frontier.has(mem.name) && !needed.has(mem.name)) {
          needed.add(mem.name);
          // a partir do código, só segue referências this.membro
          for (const m of mem.text.matchAll(/this\.(\w+)/g)) next.add(m[1]);
        }
      }
      if (!next.size) break;
      frontier = next;
    }
    const used = members.filter((m) => needed.has(m.name));
    // construtor só se mexer nos membros incluídos
    const ctor = members.find((m) => m.name === 'constructor');
    if (ctor && [...identifiers(ctor.text)].some((id) => needed.has(id)) && !used.includes(ctor)) used.push(ctor);
    const tsBody = used.map((m) => '  ' + dedent(m.text).split('\n').join('\n  ')).join('\n\n');
    const allIds = identifiers(tsBody + '\n' + html);

    // declarações de módulo e componentes auxiliares referidos
    const pre = []; // { kind, text }
    const seen = new Set();
    const addDecl = (name, text) => {
      if (seen.has(name)) return;
      seen.add(name);
      const lines = text.split('\n');
      const kind = /^(interface|type)/.test(text) ? 0 : 1;
      pre.push({ kind, text: lines.length > 14 ? `${lines[0].replace(/\s*=.*$/, '')} = /* dados de exemplo */ [];` : text });
    };
    let auxIds = allIds;
    for (let pass = 0; pass < 3; pass++) {
      const next = new Set();
      for (const id of auxIds) {
        const cls = extraClasses.get(id);
        if (cls && !seen.has(id)) {
          seen.add(id);
          pre.push({ kind: 2, text: cls.replace(/^export /, '') });
          for (const x of identifiers(cls)) next.add(x);
        }
        const d = decls.get(id) ?? extraDecls.get(id);
        if (d && !seen.has(id)) {
          addDecl(id, d);
          for (const x of identifiers(d)) next.add(x);
        }
      }
      auxIds = next;
    }

    pre.sort((a, b) => a.kind - b.kind);
    const preText = pre.map((p) => p.text);
    const allText = [html, tsBody, ...preText].join('\n');
    const { lines } = libraryImports(html + '\n' + preText.join('\n'), allText);
    const { importsArray } = libraryImports(html, tsBody);
    if (/ChangeDetectionStrategy/.test(preText.join('\n'))) lines[0] = lines[0].replace('{ Component', '{ ChangeDetectionStrategy, Component');
    const ts = [
      ...lines,
      '',
      ...(preText.length ? [preText.join('\n\n'), ''] : []),
      '@Component({',
      "  selector: 'app-exemplo',",
      `  imports: [${importsArray.join(', ')}],`,
      "  templateUrl: './exemplo.html',",
      '})',
      `export class Exemplo {${tsBody ? '\n' + tsBody + '\n' : ''}}`,
    ].join('\n');
    result[`${page.route}|${block.title}`] = { html, ts };
  }
}

const out = `// Gerado por projects/docs/scripts/extract-examples.mjs. Não editar à mão.
export interface ExampleCode {
  html: string;
  ts: string;
}

export const EXAMPLE_CODE: Record<string, ExampleCode> = ${JSON.stringify(result, null, 2)};
`;
writeFileSync(join(appDir, 'data/examples.generated.ts'), out);
console.log(`examples.generated.ts: ${Object.keys(result).length} exemplos`);
