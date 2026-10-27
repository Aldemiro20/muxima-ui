import { expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const axeSource = readFileSync(join(process.cwd(), 'node_modules/axe-core/axe.min.js'), 'utf8');

/**
 * Corre o axe na página. "region" fica de fora: as sobreposições do CDK
 * abrem fora das regiões da página, como em qualquer biblioteca baseada no CDK.
 */
export async function expectAccessible(page: Page): Promise<void> {
  await page.addScriptTag({ content: axeSource });
  const violations = await page.evaluate(async () => {
    const w = window as unknown as { axe: { run: (ctx: Document, opts: object) => Promise<{ violations: { id: string; nodes: { target: string[] }[] }[] }> } };
    const r = await w.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] });
    return r.violations.filter((v) => v.id !== 'region').map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' ; ')}`);
  });
  expect(violations).toEqual([]);
}

/** Texto do elemento com foco. */
export function focused(page: Page): Promise<string> {
  return page.evaluate(() => (document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent || '').trim());
}

/** Abre uma página de componente e espera que a aplicação esteja pronta. */
export async function openComponent(page: Page, slug: string): Promise<void> {
  await page.goto(`/componentes/${slug}`);
  await page.locator('doc-preview').first().waitFor();
}
