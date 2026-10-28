import { expect, test } from '@playwright/test';
import { expectAccessible, openComponent } from './helpers';

test.describe('Componentes da 1.3', () => {
  test('Data grid: setas entre células, Enter ordena, filtro numérico', async ({ page }) => {
    await openComponent(page, 'data-grid');
    const grid = page.locator('doc-preview [role="grid"]');
    const cell = grid.locator('[data-cell="2:1"]');
    await cell.click();
    await page.keyboard.press('ArrowRight');
    await expect(grid.locator('[data-cell="2:2"]')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(grid.locator('[data-cell="3:2"]')).toBeFocused();
    // sobe ao cabeçalho e ordena por cliente
    // cada tecla espera que o foco tenha mudado de célula (fica no controlo dentro dela)
    const celula = () =>
      page.evaluate(() => document.activeElement?.closest('[data-cell]')?.getAttribute('data-cell'));
    await page.keyboard.press('Control+Home');
    await expect.poll(celula).toBe('0:0');
    await page.keyboard.press('ArrowRight');
    await expect.poll(celula).toBe('0:1');
    await page.keyboard.press('ArrowRight');
    await expect.poll(celula).toBe('0:2');
    await page.keyboard.press('Enter');
    await expect(grid.locator('th[aria-sort="ascending"]')).toContainText('Cliente');
    await grid.getByRole('textbox', { name: /Filtrar Valor/ }).fill('>4000000');
    await expect(page.locator('doc-preview .mx-grid-status')).toContainText('de 240');
    await expectAccessible(page);
  });

  test('Data grid: scroll virtual chega à última linha com Ctrl+End', async ({ page }) => {
    await openComponent(page, 'data-grid');
    const grid = page.locator('[role="grid"][aria-label="Facturas do ano"]');
    await expect(grid).toHaveAttribute('aria-rowcount', '10001');
    expect(await grid.locator('tbody tr:not(.mx-grid-spacer)').count()).toBeLessThan(60);
    await grid.locator('[data-cell="1:0"]').click();
    await page.keyboard.press('Control+End');
    await expect(grid.locator('tbody tr[aria-rowindex="10001"]')).toContainText('FT 2026/00001');
  });

  test('Kanban: agarrar, mover para a coluna ao lado e largar', async ({ page }) => {
    await openComponent(page, 'kanban');
    const board = page.locator('doc-preview mx-kanban');
    const card = board.locator('.mx-kanban-card', { hasText: 'Actualizar dados do Banco Mutamba' });
    await card.focus();
    await page.keyboard.press('Space');
    await expect(card).toHaveAttribute('data-grabbed', '');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Space');
    const revisao = board.locator('.mx-kanban-column', { hasText: 'Em revisão' });
    await expect(revisao.locator('.mx-kanban-card')).toHaveCount(2);
    await expect(page.locator('doc-preview')).toContainText(
      'Actualizar dados do Banco Mutamba: Por fazer → Em revisão',
    );
  });

  test('Kanban: arrastar com o rato', async ({ page }) => {
    await openComponent(page, 'kanban');
    const ex = page.locator('doc-example', { hasText: 'Simples, com o nome do cartão' });
    await ex.scrollIntoViewIfNeeded();
    const card = ex.locator('.mx-kanban-card', { hasText: 'Enviar proposta' });
    const target = ex
      .locator('.mx-kanban-column', { hasText: 'Mais tarde' })
      .locator('.mx-kanban-list');
    const a = (await card.boundingBox())!;
    const b = (await target.boundingBox())!;
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    await page.mouse.move(a.x + a.width / 2 + 10, a.y + a.height / 2, { steps: 4 });
    await page.mouse.move(b.x + b.width / 2, b.y + 24, { steps: 20 });
    await page.waitForTimeout(150);
    await page.mouse.up();
    await expect(
      ex.locator('.mx-kanban-column', { hasText: 'Mais tarde' }).locator('.mx-kanban-card'),
    ).toHaveCount(1);
  });

  test('Image cropper: setas movem a área e exporta JPEG', async ({ page }) => {
    await openComponent(page, 'image-cropper');
    const ex = page.locator('doc-example', { hasText: 'Área em píxeis' });
    const box = ex.locator('.mx-cropper-box');
    await box.waitFor();
    const before = await ex.locator('.mono').textContent();
    await box.focus();
    await page.keyboard.press('Shift+ArrowRight');
    await expect(ex.locator('.mono')).not.toHaveText(before!);
    await ex.getByRole('button', { name: 'Rodar para a direita' }).click();
    await expect(ex.locator('.mono')).toContainText('rotação 90°');
    const jpeg = page.locator('doc-example', { hasText: 'Guardar em JPEG' });
    await jpeg.getByRole('button', { name: 'Gerar capa em JPEG' }).click();
    await expect(jpeg).toContainText(/JPEG de \d+ kB/);
  });

  test('Editor: escrever, negrito, barra com Alt+F10 e ligação', async ({ page }) => {
    await openComponent(page, 'rich-text-editor');
    const ex = page.locator('doc-example', { hasText: 'HTML de saída' });
    const text = ex.getByRole('textbox', { name: 'Texto com HTML' });
    await text.click();
    await page.keyboard.press('Control+End');
    await page.keyboard.type(' Bom dia');
    await page.keyboard.press('Shift+Home');
    // o ProseMirror lê a selecção no evento selectionchange, que chega depois da tecla
    await expect.poll(() => page.evaluate(() => getSelection()?.toString() ?? '')).toContain('Bom dia');
    await page.waitForTimeout(50);
    await page.keyboard.press('Control+i');
    await expect(ex.locator('pre')).toContainText('<em>');
    await page.keyboard.press('Alt+F10');
    await expect(ex.getByRole('toolbar').getByRole('button', { name: 'Negrito' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(text).toBeFocused();
    await page.keyboard.press('Control+k');
    await ex.getByRole('textbox', { name: 'Endereço da ligação' }).fill('kianda.ao');
    await page.keyboard.press('Enter');
    await expect(ex.locator('pre')).toContainText('href="https://kianda.ao"');
  });
});
