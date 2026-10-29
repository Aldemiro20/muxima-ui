import { expect, test } from '@playwright/test';
import { expectAccessible, focused, openComponent } from './helpers';

test.describe('Sobreposições com teclado', () => {
  test('Dialog: foco preso dentro e devolvido ao fechar', async ({ page }) => {
    await openComponent(page, 'dialog');
    const opener = page.locator('doc-preview button').filter({ hasText: /eliminar/i }).first();
    await opener.click();
    const dialog = page.getByRole('alertdialog');
    await expect(dialog).toBeVisible();
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(() => !!document.activeElement?.closest('[role="alertdialog"], [role="dialog"]'));
      expect(inside).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
  });

  test('Drawer: Escape com alterações pede confirmação', async ({ page }) => {
    await openComponent(page, 'drawer');
    await page.getByRole('button', { name: 'Editar cliente' }).click();
    const drawer = page.getByRole('dialog', { name: 'Editar cliente' });
    await expect(drawer).toBeVisible();
    await drawer.getByLabel('Nome da empresa').fill('Kianda Logística, S.A.');
    await page.keyboard.press('Escape');
    const confirm = page.getByRole('alertdialog', { name: 'Descartar alterações?' });
    await expect(confirm).toBeVisible();
    await confirm.getByRole('button', { name: 'Descartar' }).click();
    await expect(drawer).toBeHidden();
    await expect(page.getByRole('button', { name: 'Editar cliente' })).toBeFocused();
  });

  test('Dropdown menu: setas, submenu e Escape', async ({ page }) => {
    await openComponent(page, 'dropdown-menu');
    const trigger = page.getByRole('button', { name: 'Ficheiro' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menu')).toBeVisible();
    await expect.poll(() => focused(page)).toContain('Novo');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => focused(page)).toBe('PDF');
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => focused(page)).toBe('Exportar como');
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu')).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('Popover: foco no primeiro elemento e devolvido com Escape', async ({ page }) => {
    await openComponent(page, 'popover');
    const trigger = page.locator('doc-preview').getByRole('button', { name: 'Filtros' });
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const inside = await page.evaluate(() => !!document.activeElement?.closest('.mx-popover'));
    expect(inside).toBe(true);
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });

  test('Tooltip: aparece no foco, liga-se por aria-describedby e fecha com Escape', async ({ page }) => {
    await openComponent(page, 'tooltip');
    const button = page.locator('doc-preview').getByRole('button', { name: 'Copiar' });
    await button.focus();
    const tip = page.getByRole('tooltip');
    await expect(tip).toBeVisible();
    await expect(button).toHaveAttribute('aria-describedby', (await tip.getAttribute('id'))!);
    await page.keyboard.press('Escape');
    await expect(tip).toBeHidden();
    await expect(button).toBeFocused();
  });

  test('Command Palette: Ctrl+K, pesquisa e Enter navegam', async ({ page }) => {
    await page.goto('/pt');
    await page.keyboard.press('Control+k');
    const input = page.getByRole('combobox', { name: 'Pesquisar na documentação' });
    await expect(input).toBeFocused();
    await input.pressSequentially('accor');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/componentes\/accordion/);
  });

  test('Toast: anúncio imediato no erro e botão fechar', async ({ page }) => {
    await openComponent(page, 'toast');
    await page.locator('doc-preview').getByRole('button', { name: 'Erro' }).click();
    const toast = page.locator('.mx-toaster .mx-toast[data-variant="danger"]');
    await expect(toast).toBeVisible();
    await expect(page.locator('.cdk-live-announcer-element')).toContainText('Falha no envio');
    await toast.getByRole('button', { name: 'Fechar notificação' }).click();
    await expect(toast).toBeHidden();
  });
});

test.describe('Navegação com teclado', () => {
  test('Tabs: setas mudam de separador e Home/End vão às pontas', async ({ page }) => {
    await openComponent(page, 'tabs');
    const tabs = page.locator('doc-preview').getByRole('tab');
    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(1)).toBeFocused();
    await page.keyboard.press('End');
    await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
  });

  test('Accordion: Enter abre e fecha a secção', async ({ page }) => {
    await openComponent(page, 'accordion');
    const summary = page.locator('doc-preview summary').nth(1);
    const details = page.locator('doc-preview details').nth(1);
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(details).toHaveAttribute('open', '');
  });

  test('Pagination: a página actual tem aria-current', async ({ page }) => {
    await openComponent(page, 'pagination');
    const pag = page.locator('doc-preview mx-pagination');
    await pag.getByRole('button', { name: 'Página seguinte' }).click();
    await expect(pag.locator('[aria-current="page"]')).toHaveText('4');
  });
});

test.describe('Sobreposições abertas sem violações @visual', () => {
  test('Dialog, Drawer, Menu, Popover e Tooltip abertos', async ({ page }) => {
    await openComponent(page, 'dialog');
    await page.locator('doc-preview button').filter({ hasText: /eliminar/i }).first().click();
    await expectAccessible(page);
    await page.keyboard.press('Escape');

    await openComponent(page, 'drawer');
    await page.getByRole('button', { name: 'Ver Banco Mutamba' }).click();
    await expectAccessible(page);
    await page.keyboard.press('Escape');

    await openComponent(page, 'dropdown-menu');
    await page.locator('doc-preview button').first().click();
    await expectAccessible(page);
    await page.keyboard.press('Escape');

    await openComponent(page, 'popover');
    await page.locator('doc-preview').getByRole('button', { name: 'Filtros' }).click();
    await expectAccessible(page);
    await page.keyboard.press('Escape');

    await openComponent(page, 'tooltip');
    await page.locator('doc-preview').getByRole('button', { name: 'Copiar' }).focus();
    await expectAccessible(page);
  });

  test('Todos os códigos dos exemplos abertos', async ({ page }) => {
    for (const slug of ['button', 'table', 'drawer']) {
      await openComponent(page, slug);
      await page.evaluate(() => document.querySelectorAll<HTMLButtonElement>('.code-toggle-button').forEach((b) => b.click()));
      await expect(page.locator('.example-code').first()).toBeVisible();
      await expectAccessible(page);
    }
  });
});
