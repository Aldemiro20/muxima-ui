import { expect, test } from '@playwright/test';
import { expectAccessible } from './helpers';

test.describe('Idiomas', () => {
  test('muda os componentes de português para inglês sem recarregar', async ({ page }) => {
    await page.goto('/docs/idiomas');
    const demo = page.locator('doc-idiomas-demo');
    await demo.waitFor();
    await expect(demo.getByRole('navigation', { name: 'Paginação' })).toBeVisible();
    await expect(demo.locator('.mx-pagination-range')).toHaveText('21–40 de 236');

    await demo.getByRole('button', { name: 'English' }).click();
    await expect(demo.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
    await expect(demo.getByRole('navigation', { name: 'Pagination' })).toBeVisible();
    await expect(demo.locator('.mx-pagination-range')).toHaveText('21–40 of 236');
    await expect(demo.getByRole('button', { name: 'Next page' })).toBeVisible();
    await expect(demo.getByRole('button', { name: 'Remove Luanda' })).toBeVisible();
    await expect(demo.getByRole('textbox', { name: 'Due date' })).toHaveAttribute('placeholder', 'mm/dd/yyyy');
    await expectAccessible(page);

    // calendário em inglês: começa ao domingo e escreve-se mês/dia/ano
    await demo.getByRole('button', { name: 'Choose date' }).click();
    const calendario = page.getByRole('dialog', { name: 'Choose date' });
    await expect(calendario).toBeVisible();
    await expect(calendario.locator('thead th').first()).toHaveAttribute('abbr', /Sunday/);
    await expect(calendario.getByRole('button', { name: /^Previous month/ })).toBeVisible();
    await expectAccessible(page);
    await page.keyboard.press('Escape');

    const data = demo.locator('mx-date-picker input');
    await data.fill('10/28/2026');
    await data.blur();
    await expect(data).toHaveValue('10/28/2026');

    // o resto do site continua em português
    await expect(page.getByRole('navigation', { name: 'Localização' }).first()).toBeVisible();

    await demo.getByRole('button', { name: 'Português' }).click();
    await expect(demo.getByRole('button', { name: 'Página seguinte' })).toBeVisible();
    await expect(data).toHaveValue('28/10/2026');
  });
});
