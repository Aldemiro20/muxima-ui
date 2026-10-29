import { expect, test } from '@playwright/test';

/** Site em inglês na raiz, português em /pt, e o botão de idioma entre os dois. */
test.describe('Site em dois idiomas', () => {
  test('a raiz está em inglês, com lang="en"', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('link', { name: 'Components', exact: true }).first()).toBeVisible();
  });

  test('/pt está em português, com lang="pt"', async ({ page }) => {
    await page.goto('/pt');
    await expect(page.locator('html')).toHaveAttribute('lang', /^pt/);
    await expect(page.getByRole('link', { name: 'Componentes', exact: true }).first()).toBeVisible();
  });

  test('o botão de idioma leva à mesma página no outro idioma', async ({ page }) => {
    await page.goto('/components/button');
    await page.getByRole('link', { name: /^Language: / }).click();
    await expect(page).toHaveURL(/\/pt\/componentes\/button$/);
    await expect(page.locator('html')).toHaveAttribute('lang', /^pt/);
    await page.getByRole('link', { name: /^Idioma: / }).click();
    await expect(page).toHaveURL(/\/components\/button$/);
  });

  test('o botão de idioma traduz o id do bloco', async ({ page }) => {
    await page.goto('/blocks/hero');
    await page.getByRole('link', { name: /^Language: / }).click();
    await expect(page).toHaveURL(/\/pt\/blocos\/hero$/);
  });

  test('os endereços antigos em português redireccionam para /pt', async ({ page }) => {
    await page.goto('/componentes/accordion');
    await expect(page).toHaveURL(/\/pt\/componentes\/accordion$/);
    await page.goto('/docs/introducao');
    await expect(page).toHaveURL(/\/pt\/docs\/introducao$/);
  });

  test('bloco em inglês abre com o código em inglês', async ({ page }) => {
    await page.goto('/blocks/view/hero-centered');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('body')).not.toContainText('Começar');
  });

  test('Command Palette em inglês navega para as páginas em inglês', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+k');
    const input = page.getByRole('combobox', { name: 'Search the documentation' });
    await expect(input).toBeFocused();
    await input.pressSequentially('accor');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/components\/accordion$/);
  });

  test('os componentes usam os textos do idioma do site', async ({ page }) => {
    await page.goto('/components/pagination');
    await expect(page.locator('doc-preview').getByRole('navigation').first()).toHaveAttribute('aria-label', /Pagination/i);
    await page.goto('/pt/componentes/pagination');
    await expect(page.locator('doc-preview').getByRole('navigation').first()).toHaveAttribute('aria-label', /Pagina/i);
  });
});
