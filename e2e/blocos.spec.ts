import { expect, Page, test } from '@playwright/test';
import { expectAccessible } from './helpers';

/** Abre um bloco sozinho (a página que o iframe mostra). */
async function openBlock(page: Page, id: string): Promise<void> {
  await page.goto(`/blocos/ver/${id}`);
  await page.locator('doc-bloco-ver main > :not(h1)').first().waitFor();
}

test.describe('Blocos', () => {
  test('Lista dos blocos e página de uma categoria', async ({ page }) => {
    await page.goto('/blocos');
    await expect(page.locator('.catalog-card')).toHaveCount(9);
    await page.getByRole('link', { name: /Pricing card/ }).first().click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pricing card');
    await expect(page.locator('doc-block-viewer')).toHaveCount(3);
    await expectAccessible(page);
  });

  test('Visualizador: altura do conteúdo, larguras, código e modo escuro @visual', async ({ page }) => {
    await page.goto('/blocos/pricing-card');
    const viewer = page.locator('doc-block-viewer').first();
    const frame = viewer.locator('iframe');
    // a página do bloco envia a altura: o iframe deixa de ter os 420 px iniciais
    await expect.poll(async () => Math.round((await frame.boundingBox())!.height)).toBeGreaterThan(600);
    await expect(viewer.frameLocator('iframe').getByRole('heading', { name: 'Planos simples, sem surpresas' })).toBeVisible();

    await viewer.getByRole('button', { name: 'Telemóvel' }).click();
    await expect(viewer.getByRole('button', { name: 'Telemóvel' })).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(async () => Math.round((await frame.boundingBox())!.width)).toBe(375);

    await viewer.getByRole('tab', { name: 'Código' }).click();
    await expect(viewer.locator('pre').first()).toContainText("selector: 'app-pricing-planos'");
    await viewer.getByRole('tab', { name: 'pricing-planos.css' }).click();
    await expect(viewer.locator('pre:visible')).toContainText('container-type: inline-size');

    // o iframe segue o modo do site
    await viewer.getByRole('tab', { name: 'Pré-visualização' }).click();
    const antes = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    await page.locator('doc-header button[aria-label*="modo" i], doc-header .theme-toggle').first().click();
    const depois = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(depois).not.toBe(antes);
    await expect(viewer.frameLocator('iframe').locator('html')).toHaveAttribute('data-theme', depois!);
  });

  test('Pricing: mensal e anual mudam o preço', async ({ page }) => {
    await openBlock(page, 'pricing-planos');
    const basico = page.locator('.plano').first();
    await expect(basico.locator('.plano-valor')).toHaveText('8 300 Kz');
    await page.getByText('Mensal').click();
    await expect(basico.locator('.plano-valor')).toHaveText('9 900 Kz');
    await expectAccessible(page);
  });

  test('Carrinho: quantidades, totais e remover com o foco no título', async ({ page }) => {
    await openBlock(page, 'cart-pagina');
    const total = page.locator('.resumo-total dd');
    await expect(total).toHaveText('33 200,00 Kz');
    await page.getByRole('group', { name: 'Quantidade de Caneca de barro' }).getByRole('button', { name: 'Mais um' }).click();
    await expect(total).toHaveText('36 400,00 Kz');
    await page.getByRole('button', { name: 'Remover Camisa de pano' }).click();
    await expect(page.getByRole('heading', { level: 2, name: /Carrinho/ })).toBeFocused();
    await expect(page.locator('.linha')).toHaveCount(2);
    await expectAccessible(page);
  });

  test('Navbar: o botão Menu abre a lista e Escape devolve o foco', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await openBlock(page, 'navbar-site');
    const menu = page.getByRole('button', { name: 'Menu' });
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Principal (menu)' }).getByRole('link', { name: 'Preços' })).toBeVisible();
    await page.getByRole('navigation', { name: 'Principal (menu)' }).getByRole('link', { name: 'Produto' }).focus();
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeFocused();
    await expectAccessible(page);
  });

  test('Segurança: eliminar a conta pede confirmação num alertdialog', async ({ page }) => {
    await openBlock(page, 'settings-seguranca');
    const eliminar = page.getByRole('button', { name: 'Eliminar conta' });
    await eliminar.click();
    const dialog = page.getByRole('alertdialog', { name: 'Eliminar a conta?' });
    await expect(dialog).toBeVisible();
    await expectAccessible(page);
    await dialog.getByRole('button', { name: 'Cancelar' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(eliminar).toBeFocused();
  });

  test('Cartão: Luhn, rede e validade', async ({ page }) => {
    await openBlock(page, 'payment-cartao');
    const numero = page.getByRole('textbox', { name: 'Número do cartão' });
    await numero.fill('4111111111111112');
    await numero.blur();
    await page.getByRole('button', { name: /Pagar/ }).click();
    await expect(page.getByText('O número não está certo')).toBeVisible();
    await numero.fill('4111111111111111');
    await expect(numero).toHaveValue('4111 1111 1111 1111');
    await expect(page.getByText('Cartão Visa')).toBeVisible();
    await page.getByRole('textbox', { name: 'Validade' }).fill('0120');
    await expect(page.getByRole('textbox', { name: 'Validade' })).toHaveValue('01/20');
    await expect(page.getByText('Este cartão já expirou.')).toBeVisible();
    await expectAccessible(page);
  });

  test('Comentários: responder e publicar', async ({ page }) => {
    await openBlock(page, 'comments-conversa');
    await page.getByRole('button', { name: 'Responder a Ana Kiala' }).click();
    await page.getByRole('textbox', { name: 'Resposta a Ana Kiala' }).fill('Combinado.');
    await page.getByRole('button', { name: 'Responder', exact: true }).click();
    await expect(page.getByRole('list', { name: 'Respostas a Ana Kiala' })).toContainText('Combinado.');
    await page.getByRole('textbox', { name: 'Escreve um comentário' }).fill('Proposta enviada.');
    await page.getByRole('button', { name: 'Publicar' }).click();
    await expect(page.getByRole('heading', { name: /Comentários/ })).toContainText('(3)');
    await expectAccessible(page);
  });
});
