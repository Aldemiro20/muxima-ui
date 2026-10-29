import { chromium } from 'playwright';
import { serveDocs } from './serve-docs.mjs';
const server = await serveDocs(0);
const base = `http://localhost:${server.address().port}`;
const b = await chromium.launch();
const out = process.argv[2];
const shots = JSON.parse(process.argv[3]);
for (const [url, w, name, full] of shots) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(base + url);
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${out}/${name}.png`, fullPage: !!full });
  console.log(name, p.url().replace(base, ''), await p.evaluate(() => document.documentElement.lang));
  await p.close();
}
await b.close(); server.close();
