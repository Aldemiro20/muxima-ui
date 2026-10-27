import { expect, test } from '@playwright/test';
import { expectAccessible, openComponent } from './helpers';

test.describe('Componentes da 1.2', () => {
  test('Sidebar: recolhe, mantém o nome e mostra a dica com o foco', async ({ page }) => {
    await openComponent(page, 'sidebar');
    const preview = page.locator('doc-preview');
    const toggle = preview.getByRole('button', { name: 'Recolher menu' });
    await toggle.click();
    await expect(preview.getByRole('button', { name: 'Expandir menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    const item = preview
      .getByRole('navigation', { name: 'Navegação da aplicação' })
      .getByRole('button', { name: /^Clientes/ });
    await item.focus();
    await expect(page.locator('body > .mx-sidebar-tip')).toHaveText('Clientes');
    await item.blur();
    await expect(page.locator('body > .mx-sidebar-tip')).toHaveCount(0);
  });

  test('Sidebar: secção abre e fecha com aria-expanded', async ({ page }) => {
    await openComponent(page, 'sidebar');
    const section = page.locator('.mx-sidebar-section-trigger');
    await expect(section).toHaveAttribute('aria-expanded', 'true');
    await section.click();
    await expect(section).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('button', { name: 'Vendas por mês' })).toBeHidden();
  });

  test('Notification center: sino, marcar lida e marcar todas', async ({ page }) => {
    await openComponent(page, 'notification-center');
    const bell = page.locator('doc-preview [mxNotificationBell]');
    await expect(bell).toHaveAttribute('aria-label', 'Notificações, 2 por ler');
    await bell.click();
    const popover = page.locator('.cdk-overlay-container .mx-notification-center');
    await popover.getByRole('button', { name: 'Marcar como lida: FT 2026/0196 paga' }).click();
    await expect(bell).toHaveAttribute('aria-label', 'Notificações, 1 por ler');
    await popover.getByRole('button', { name: 'Marcar todas como lidas' }).click();
    await expect(bell).toHaveAttribute('aria-label', 'Notificações');
    await expectAccessible(page);
  });

  test('Carousel: seguinte, indicadores e inert', async ({ page }) => {
    await openComponent(page, 'carousel');
    const c = page.locator('doc-preview mx-carousel');
    await expect(c).toHaveAttribute('aria-roledescription', 'carrossel');
    const slides = c.locator('mx-carousel-slide');
    await expect(slides.nth(1)).toHaveAttribute('inert', '');
    await c.getByRole('button', { name: 'Diapositivo seguinte' }).click();
    await expect(slides.nth(1)).not.toHaveAttribute('inert', '');
    await expect(c.getByRole('button', { name: 'Diapositivo 2' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    await c.getByRole('button', { name: 'Diapositivo 3' }).click();
    await expect(c.getByRole('button', { name: 'Diapositivo seguinte' })).toBeDisabled();
  });

  test('Carousel: rotação pára com o botão', async ({ page }) => {
    await openComponent(page, 'carousel');
    const c = page.locator('mx-carousel[aria-label="Dicas"]');
    const play = c.getByRole('button', { name: 'Parar a rotação automática' });
    await play.click();
    await expect(c.getByRole('button', { name: 'Iniciar a rotação automática' })).toBeVisible();
  });

  test('Color picker: escrever, abrir painel e mudar com as setas', async ({ page }) => {
    await openComponent(page, 'color-picker');
    const field = page.locator('doc-preview mx-color-picker');
    const input = field.locator('input');
    await input.fill('rgb(180, 35, 24)');
    await input.press('Tab');
    await expect(input).toHaveValue('#B42318');
    const toggle = field.locator('.mx-color-picker-toggle');
    await expect(toggle).toHaveAttribute('aria-label', 'Mudar cor, vermelho, #B42318');
    await toggle.click();
    const area = page.locator('.mx-color-picker-panel [role="slider"]');
    await expect(area).toBeFocused();
    await page.keyboard.press('Shift+ArrowDown');
    await expect(input).not.toHaveValue('#B42318');
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
  });

  test('Timeline: lista ordenada com nome', async ({ page }) => {
    await openComponent(page, 'timeline');
    const list = page.getByRole('list', { name: 'Histórico da factura FT 2026/0196' });
    await expect(list.getByRole('listitem')).toHaveCount(3);
  });
});
