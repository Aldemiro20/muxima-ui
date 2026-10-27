/**
 * Teste de acessibilidade do site de documentação, página a página, com axe.
 *
 *   npm run build:docs
 *   npm run test:a11y
 *
 * Percorre todas as ligações internas a partir da página inicial, em modo claro e
 * escuro, e falha se o axe encontrar violações WCAG 2.1 AA ou de boas práticas.
 * Na primeira vez, instala o navegador com: npx playwright install chromium
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL('../dist/docs/browser', import.meta.url));
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json' };

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, path);
  let body;
  try {
    body = await readFile(file);
  } catch {
    file = join(root, 'index.html');
    body = await readFile(file);
  }
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  res.end(body);
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const browser = await chromium.launch();
let failures = 0;
let visited = 0;
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  const queue = ['/'];
  const seen = new Set(queue);
  while (queue.length) {
    const route = queue.shift();
    await page.goto(base + route, { waitUntil: 'networkidle' });
    for (const href of await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')))) {
      const clean = href.split('#')[0].split('?')[0];
      if (!seen.has(clean)) {
        seen.add(clean);
        queue.push(clean);
      }
    }
    await page.addScriptTag({ content: axeSource });
    const violations = await page.evaluate(async () => {
      const r = await window.axe.run({ exclude: [['.cdk-overlay-container']] }, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] });
      return r.violations.map((v) => `${v.impact} ${v.id}: ${v.help} -> ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' ; ')}`);
    });
    visited++;
    if (violations.length) {
      failures += violations.length;
      console.log(`\n[${scheme}] ${route}\n  ${violations.join('\n  ')}`);
    }
  }
  await ctx.close();
}
await browser.close();
server.close();
console.log(`\n${visited} páginas verificadas, ${failures} violações.`);
process.exit(failures ? 1 : 0);
