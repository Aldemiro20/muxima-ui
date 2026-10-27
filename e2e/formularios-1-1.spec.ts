import { expect, test } from '@playwright/test';
import { expectAccessible, focused, openComponent } from './helpers';

test.describe('Componentes da 1.1 com teclado', () => {
  test('Date range picker: atalho, depois escolha no calendário com teclado', async ({ page }) => {
    await openComponent(page, 'date-range-picker');
    const preview = page.locator('doc-preview mx-date-range-picker');
    await preview.getByRole('button', { name: 'Escolher intervalo' }).click();
    const dialog = page.getByRole('dialog', { name: 'Escolher intervalo' });
    await dialog.getByRole('button', { name: 'Últimos 7 dias' }).click();
    await expect(dialog).toBeHidden();
    const toggle = preview.locator('.mx-date-picker-toggle');
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-label', /^Mudar intervalo, /);

    // segundo intervalo: Enter num dia, setas, Enter noutro
    await page.keyboard.press('Enter');
    await expect(dialog).toBeVisible();
    await expect(page.locator('.mx-date-range-panel .mx-calendar-day:focus')).toHaveCount(1);
    await page.keyboard.press('Enter');
    await expect(dialog.locator('p.mx-visually-hidden[aria-live]')).toContainText('Escolhe a data de fim');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await expect(dialog).toBeHidden();
    const [start, end] = await preview.locator('.mx-date-range-input').evaluateAll((els) => els.map((e) => (e as HTMLInputElement).value));
    const parse = (s: string) => {
      const [d, m, y] = s.split('/').map(Number);
      return new Date(y, m - 1, d).getTime();
    };
    expect(Math.round((parse(end) - parse(start)) / 864e5)).toBe(2);
  });

  test('Time picker: escrever, lista com setas e Enter', async ({ page }) => {
    await openComponent(page, 'time-picker');
    const input = page.locator('doc-preview mx-time-picker input');
    await input.fill('9h');
    await input.press('Tab');
    await expect(input).toHaveValue('09:00');
    await input.focus();
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    const active = await input.getAttribute('aria-activedescendant');
    await expect(page.locator(`[id="${active}"]`)).toHaveText('09:00');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('09:15');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await expectAccessible(page);
  });

  test('Range slider: cada cursor com nome e setas', async ({ page }) => {
    await openComponent(page, 'slider');
    const low = page.getByRole('slider', { name: 'Preço mínimo' });
    await low.focus();
    await page.keyboard.press('ArrowRight');
    await expect(low).toHaveAttribute('aria-valuetext', /160\s000 Kz/);
    await page.keyboard.press('End');
    // não passa o máximo
    await expect(low).toHaveAttribute('aria-valuetext', /600\s000 Kz/);
  });

  test('Tag input: Enter acrescenta, Backspace vai para a etiqueta e remove', async ({ page }) => {
    await openComponent(page, 'chips');
    const field = page.locator('doc-preview .mx-tag-input-field');
    await field.fill('pedro@kianda.ao');
    await field.press('Enter');
    await expect(page.locator('doc-preview mx-chip')).toHaveCount(2);
    await field.press('Backspace');
    expect(await focused(page)).toBe('Remover pedro@kianda.ao');
    await page.keyboard.press('Backspace');
    await expect(page.locator('doc-preview mx-chip')).toHaveCount(1);
    await field.fill('não é email');
    await field.press('Enter');
    await expect(page.locator('doc-preview mx-chip')).toHaveCount(1);
  });

  test('File upload: escolhe ficheiros, rejeita o tamanho e remove', async ({ page }) => {
    await openComponent(page, 'file-upload');
    const upload = page.locator('doc-preview mx-file-upload');
    await upload.locator('input[type=file]').setInputFiles([
      { name: 'factura.pdf', mimeType: 'application/pdf', buffer: Buffer.alloc(2000) },
      { name: 'notas.txt', mimeType: 'text/plain', buffer: Buffer.alloc(10) },
    ]);
    await expect(upload.locator('.mx-file-upload-item')).toHaveCount(1);
    await expect(upload.locator('.mx-file-upload-rejections')).toContainText('notas.txt: tipo de ficheiro não aceite.');
    await upload.getByRole('button', { name: 'Remover factura.pdf' }).click();
    await expect(upload.locator('.mx-file-upload-item')).toHaveCount(0);
    await expect(upload.getByRole('button', { name: /escolhe no computador/ })).toBeFocused();
  });

  test('Rating: setas mudam a nota', async ({ page }) => {
    await openComponent(page, 'rating');
    const group = page.locator('doc-preview [role="radiogroup"]');
    await group.getByRole('radio', { name: '3 estrelas' }).check();
    await page.keyboard.press('ArrowRight');
    await expect(group.getByRole('radio', { name: '4 estrelas' })).toBeChecked();
    await expect(page.locator('doc-preview mx-hint')).toHaveText('Bom');
  });

  test('Copy to clipboard: copia e anuncia', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await openComponent(page, 'copy-to-clipboard');
    const button = page.locator('doc-preview').getByRole('button', { name: 'Copiar IBAN' });
    await button.click();
    await expect(page.locator('doc-preview .mx-copy-button')).toHaveAttribute('aria-label', 'Copiado');
    await expect(page.locator('.cdk-live-announcer-element')).toHaveText('Copiado');
  });
});
