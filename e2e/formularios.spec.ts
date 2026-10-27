import { expect, test } from '@playwright/test';
import { expectAccessible, focused, openComponent } from './helpers';

test.describe('Formulários com teclado', () => {
  test('Select: abre com seta, navega, escolhe com Enter e devolve o foco', async ({ page }) => {
    await openComponent(page, 'select');
    const trigger = page.locator('doc-preview .mx-select-trigger').first();
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const listbox = page.getByRole('listbox');
    await expect(listbox).toBeVisible();
    await page.keyboard.press('ArrowDown');
    const activeId = await trigger.getAttribute('aria-activedescendant');
    const activeText = await page.locator(`[id="${activeId}"]`).textContent();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toContainText(activeText!.trim());
    await expect(trigger).toBeFocused();
  });

  test('Select: Escape fecha sem mudar o valor', async ({ page }) => {
    await openComponent(page, 'select');
    const trigger = page.locator('doc-preview .mx-select-trigger').first();
    const before = await trigger.textContent();
    await trigger.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveText(before!);
  });

  test('Multi-select: marca várias opções sem fechar', async ({ page }) => {
    await openComponent(page, 'multi-select');
    const trigger = page.locator('doc-preview .mx-select-trigger').first();
    await trigger.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press(' ');
    await expect(page.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
    await expect(page.locator('[role="option"][aria-selected="true"]')).toHaveCount(3);
    await page.keyboard.press('Escape');
    await expect(trigger).toContainText('3 seleccionados');
  });

  test('Combobox: filtra sem acentos e escolhe com setas e Enter', async ({ page }) => {
    await openComponent(page, 'combobox');
    const input = page.locator('doc-preview mx-combobox input');
    await input.click();
    await input.pressSequentially('huila');
    await expect(page.getByRole('option')).toHaveText(['Huíla']);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('Huíla');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  test('Date picker: calendário com setas, Page Down e Enter', async ({ page }) => {
    await openComponent(page, 'date-picker');
    const toggle = page.locator('doc-preview .mx-date-picker-toggle');
    await toggle.click();
    const grid = page.locator('.mx-date-picker-panel').getByRole('grid');
    await expect(grid).toBeVisible();
    await expect.poll(() => focused(page)).toMatch(/\d{4}$/);
    const first = await focused(page);
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => focused(page)).not.toBe(first);
    await page.keyboard.press('PageDown');
    await page.keyboard.press('Enter');
    await expect(grid).toBeHidden();
    await expect(page.locator('doc-preview mx-date-picker input')).toHaveValue(/^\d{2}\/\d{2}\/\d{4}$/);
    await expect(toggle).toBeFocused();
  });

  test('Date picker: Escape fecha e devolve o foco ao botão', async ({ page }) => {
    await openComponent(page, 'date-picker');
    const toggle = page.locator('doc-preview .mx-date-picker-toggle');
    await toggle.click();
    await page.keyboard.press('Escape');
    await expect(page.locator('.mx-date-picker-panel')).toHaveCount(0);
    await expect(toggle).toBeFocused();
  });

  test('Checkbox e Switch: Espaço muda o estado', async ({ page }) => {
    await openComponent(page, 'checkbox');
    const box = page.locator('doc-preview input[type=checkbox]').nth(1);
    await box.focus();
    await page.keyboard.press(' ');
    await expect(box).toBeChecked();
    await openComponent(page, 'switch');
    const sw = page.getByRole('switch').first();
    const was = await sw.isChecked();
    await sw.focus();
    await page.keyboard.press(' ');
    expect(await sw.isChecked()).toBe(!was);
  });

  test('Radio: setas mudam a opção do grupo', async ({ page }) => {
    await openComponent(page, 'radio');
    const radios = page.locator('doc-preview input[type=radio]');
    await radios.first().focus();
    await page.keyboard.press('ArrowDown');
    await expect(radios.nth(1)).toBeChecked();
    await expect(radios.nth(1)).toBeFocused();
  });

  test('Slider: setas mudam o valor e o texto anunciado', async ({ page }) => {
    await openComponent(page, 'slider');
    const slider = page.locator('doc-preview input[type=range]');
    const before = Number(await slider.inputValue());
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    expect(Number(await slider.inputValue())).toBeGreaterThan(before);
    await expect(slider).toHaveAttribute('aria-valuetext', /mil kwanzas/);
  });

  test('OTP: escrever e colar preenche as caixas', async ({ page }) => {
    await openComponent(page, 'otp-input');
    const input = page.locator('doc-preview mx-otp input');
    await input.click();
    await page.keyboard.type('12ab34');
    await expect(input).toHaveValue('1234');
    await expect(page.locator('doc-preview .mx-otp-slot').nth(3)).toHaveText('4');
  });
});

test.describe('Formulários abertos sem violações @visual', () => {
  test('Select, Combobox e Date picker abertos', async ({ page }) => {
    await openComponent(page, 'select');
    await page.locator('doc-preview .mx-select-trigger').first().click();
    await expectAccessible(page);
    await openComponent(page, 'combobox');
    await page.locator('doc-preview mx-combobox input').click();
    await expectAccessible(page);
    await openComponent(page, 'date-picker');
    await page.locator('doc-preview .mx-date-picker-toggle').click();
    await expectAccessible(page);
  });
});
