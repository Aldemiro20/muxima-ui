import { expect, Page, test } from '@playwright/test';
import { expectAccessible, openComponent } from './helpers';

const cartao = (page: Page) => page.locator('.mx-tour-card[role="dialog"]');

async function openBlock(page: Page, id: string): Promise<void> {
  await page.goto(`/blocos/ver/${id}`);
  await page.locator('doc-bloco-ver main > :not(h1)').first().waitFor();
}

test.describe('Tour guide', () => {
  test('visita com teclado: foco no cartão, setas, Escape e foco devolvido', async ({ page }) => {
    await openComponent(page, 'tour-guide');
    const iniciar = page.getByRole('button', { name: 'Começar a visita' });
    await iniciar.click();
    const dialogo = page.getByRole('dialog', { name: 'Bem-vindo às facturas' });
    await expect(dialogo).toBeFocused();
    await expect(dialogo).toHaveAttribute('aria-modal', 'true');
    await expect(dialogo).toContainText('Passo 1 de 5');
    await expectAccessible(page);

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('dialog', { name: 'Pesquisa' })).toBeFocused();
    await expect(page.locator('.mx-tour-spotlight')).toBeVisible();
    // o destaque fica à volta do campo
    const campo = await page.getByRole('searchbox', { name: 'Pesquisar' }).boundingBox();
    const luz = await page.locator('.mx-tour-spotlight').boundingBox();
    expect(luz!.x).toBeLessThan(campo!.x);
    expect(luz!.x + luz!.width).toBeGreaterThan(campo!.x + campo!.width);
    await expectAccessible(page);

    // Tab fica dentro do cartão
    for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('.mx-tour-card'))).toBe(true);

    await page.keyboard.press('Escape');
    await expect(cartao(page)).toHaveCount(0);
    await expect(iniciar).toBeFocused();
  });

  test('beforeShow muda de separador e retomar continua no passo certo', async ({ page }) => {
    await openComponent(page, 'tour-guide');
    const sep = page.locator('doc-example', { hasText: 'Mudar de separador' });
    await sep.getByRole('button', { name: 'Ver a visita' }).click();
    await expect(cartao(page)).toContainText('Perfil');
    await expect(cartao(page)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(cartao(page)).toContainText('Segurança');
    await expect(sep.getByRole('tab', { name: 'Segurança' })).toHaveAttribute('aria-selected', 'true');
    await cartao(page).getByRole('button', { name: 'Saltar' }).click();

    const ret = page.locator('doc-example', { hasText: 'Retomar onde parou' });
    await ret.getByRole('button', { name: 'Ver a visita' }).click();
    await expect(cartao(page)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(cartao(page)).toContainText('Facturas');
    await page.keyboard.press('Escape');
    await expect(ret).toContainText('Saltaste no passo 2');
    await ret.getByRole('button', { name: 'Continuar' }).click();
    await expect(cartao(page)).toContainText('Passo 2 de 3');
    await cartao(page).getByRole('button', { name: 'Seguinte' }).click();
    await cartao(page).getByRole('button', { name: 'Concluir' }).click();
    await expect(cartao(page)).toHaveCount(0);
    await expect(ret.getByRole('button', { name: 'Ver a visita' })).toBeVisible();
  });

  test('sem dismissible, Escape não fecha', async ({ page }) => {
    await openComponent(page, 'tour-guide');
    await page.getByRole('button', { name: 'Start the tour' }).click();
    await expect(cartao(page)).toContainText('Step 1 of 2');
    await page.keyboard.press('Escape');
    await expect(cartao(page)).toHaveCount(1);
    await expect(cartao(page).getByRole('button', { name: /Fechar|Saltar/ })).toHaveCount(0);
    await cartao(page).getByRole('button', { name: 'Next' }).click();
    await cartao(page).getByRole('button', { name: 'Got it' }).click();
    await expect(cartao(page)).toHaveCount(0);
  });
});

test.describe('Blocos novos', () => {
  test('Onboarding: visita guiada a partir do convite', async ({ page }) => {
    await openBlock(page, 'onboarding-visita');
    await page.getByRole('button', { name: 'Começar a visita' }).click();
    await expect(cartao(page)).toContainText('Bem-vindo à Kianda');
    await expect(cartao(page)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(cartao(page)).toContainText('Menu');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('status')).toContainText('interrompida no passo 2');
    await page.getByRole('button', { name: 'Ajuda' }).click();
    await expect(cartao(page)).toContainText('Passo 2 de 6');
    await page.keyboard.press('Escape');
  });

  test('Onboarding: primeiros passos avançam o progresso', async ({ page }) => {
    await openBlock(page, 'onboarding-passos');
    await expect(page.getByText('1 de 5 feitos')).toBeVisible();
    await page.getByRole('button', { name: 'Adicionar cliente' }).click();
    await expect(page.getByText('2 de 5 feitos')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Criar factura' })).toBeVisible();
    await page.getByRole('button', { name: 'Como funciona' }).click();
    await expect(cartao(page)).toContainText('O teu progresso');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Esconder' }).click();
    await page.getByRole('button', { name: 'Mostrar outra vez' }).click();
    await expect(page.getByText('1 de 5 feitos')).toBeVisible();
  });

  test('Mini carrinho: adicionar, abrir o painel e mudar quantidades', async ({ page }) => {
    await openBlock(page, 'cart-mini');
    await page.getByRole('button', { name: 'Adicionar Caneca de barro' }).click();
    await expect(page.getByRole('button', { name: /Carrinho 3 artigos/ })).toBeVisible();
    await page.getByRole('button', { name: /Carrinho 3 artigos/ }).click();
    const painel = page.getByRole('dialog', { name: 'Carrinho (3)' });
    await expect(painel).toBeVisible();
    await expect(painel).toContainText(/12,20\sUS\$/);
    await painel.getByRole('button', { name: 'Mais um Caneca de barro' }).click();
    await expect(page.getByRole('dialog', { name: 'Carrinho (4)' })).toContainText(/15,40\sUS\$/);
    await expectAccessible(page);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: /Carrinho 4 artigos/ })).toBeFocused();
  });

  test('Finalizar compra: validação e passos com foco no título', async ({ page }) => {
    await openBlock(page, 'payment-checkout');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByText('Escreve o teu nome.')).toBeVisible();
    await page.getByLabel('Nome').fill('Ana Kiala');
    await page.getByLabel('E-mail').fill('ana@kianda.ao');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByRole('heading', { name: 'Entrega' })).toBeFocused();
    await expect(page.locator('[aria-current="step"]')).toContainText('Entrega');
    await page.getByText('Levantar na loja').click();
    await expect(page.locator('.resumo')).toContainText(/30,70\sUS\$/);
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByLabel('Número de telemóvel').fill('923456789');
    await page.getByRole('button', { name: /^Pagar 30,70\sUS\$$/ }).click();
    await expect(page.getByRole('heading', { name: 'Encomenda confirmada' })).toBeFocused();
    await expectAccessible(page);
  });

  test('Notificações: coluna inteira, guardar e desfazer', async ({ page }) => {
    await openBlock(page, 'settings-notificacoes');
    const guardar = page.getByRole('button', { name: 'Guardar' });
    await expect(guardar).toBeDisabled();
    await page.getByRole('checkbox', { name: 'Todas por SMS' }).click();
    for (const e of ['Factura paga', 'Factura em atraso', 'Novo cliente', 'Resumo semanal']) {
      await expect(page.getByRole('checkbox', { name: `${e} por SMS` })).toBeChecked();
    }
    await guardar.click();
    await expect(page.getByRole('status')).toHaveText('Preferências de notificação guardadas.');
    await page.getByRole('checkbox', { name: 'Novo cliente por E-mail' }).check();
    await page.getByRole('button', { name: 'Desfazer' }).click();
    await expect(page.getByRole('checkbox', { name: 'Novo cliente por E-mail' })).not.toBeChecked();
  });

  test('Hero com pesquisa e perguntas e respostas', async ({ page }) => {
    await openBlock(page, 'hero-pesquisa');
    await page.getByRole('button', { name: 'IVA' }).click();
    await expect(page.getByRole('heading', { name: /2 artigos sobre "IVA"/ })).toBeVisible();
    await page.getByRole('searchbox', { name: 'Pesquisar na ajuda' }).fill('credito');
    await page.getByRole('button', { name: 'Pesquisar' }).click();
    await expect(page.getByRole('link', { name: 'Anular uma factura com nota de crédito' })).toBeVisible();

    await openBlock(page, 'comments-perguntas');
    await page.getByRole('button', { name: /Enviar pergunta/ }).click();
    await expect(page.getByText(/pelo menos 10 caracteres/)).toBeVisible();
    await page.getByLabel('Fazer uma pergunta').fill('Têm em embalagem de 1 kg?');
    await page.getByRole('button', { name: /Enviar pergunta/ }).click();
    await expect(page.locator('.pergunta-texto', { hasText: 'Têm em embalagem de 1 kg?' })).toBeVisible();
    const util = page.getByRole('button', { name: /Útil \(9\)/ });
    await util.click();
    await expect(page.getByRole('button', { name: /Útil \(10\)/ })).toHaveAttribute('aria-pressed', 'true');
  });
});
