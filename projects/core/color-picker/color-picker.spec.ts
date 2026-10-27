import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { mxColorName, mxContrast, mxHexToHsva, mxHsvaToHex, mxParseColor } from './color';
import { MxColorPanel } from './color-panel';
import { MxColorPicker } from './color-picker';

@Component({
  imports: [MxColorPanel],
  template: `<mx-color-panel
    [(value)]="cor"
    alpha
    [swatches]="['#1F6F78', { color: '#B42318', label: 'Erro' }]"
  />`,
})
class PanelHost {
  cor = signal<string | null>('#1F6F78');
}

@Component({
  imports: [MxColorPicker, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Cor da marca</label>
      <mx-color-picker [formControl]="cor" />
    </mx-form-field>
  `,
})
class PickerHost {
  cor = new FormControl<string | null>('#1F6F78');
}

const key = (el: Element, k: string, shiftKey = false) =>
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, shiftKey, bubbles: true }));

describe('cores', () => {
  it('lê formatos, converte e dá nome', () => {
    expect(mxParseColor('#1f6')).toBe('#11FF66');
    expect(mxParseColor('1F6F78')).toBe('#1F6F78');
    expect(mxParseColor('rgb(31, 111, 120)')).toBe('#1F6F78');
    expect(mxParseColor('rgba(0,0,0,0.5)')).toBe('#00000080');
    expect(mxParseColor('#1F6F78FF')).toBe('#1F6F78');
    expect(mxParseColor('azul')).toBeNull();
    expect(mxHsvaToHex(mxHexToHsva('#B42318'))).toBe('#B42318');
    expect(mxColorName('#1F3A93')).toBe('azul escuro');
    expect(mxColorName('#F5F5F5')).toBe('branco');
    expect(mxColorName('#B42318')).toBe('vermelho');
    expect(Math.round(mxContrast('#000000', '#FFFFFF'))).toBe(21);
  });
});

describe('MxColorPanel', () => {
  it('muda saturação e brilho com as setas, matiz e opacidade, e escolhe amostras', async () => {
    const fixture = TestBed.createComponent(PanelHost);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const thumb = el.querySelector('[role="slider"]')!;
    expect(thumb.getAttribute('aria-valuetext')).toContain('azul-petróleo');
    const before = mxHexToHsva(fixture.componentInstance.cor()!);
    key(thumb, 'ArrowUp', true);
    fixture.detectChanges();
    expect(mxHexToHsva(fixture.componentInstance.cor()!).v).toBeCloseTo(before.v + 0.1, 1);

    const alpha = el.querySelector('.mx-color-alpha') as HTMLInputElement;
    alpha.value = '50';
    alpha.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.cor()!.length).toBe(9);

    const swatches = el.querySelectorAll('.mx-color-swatch');
    expect(swatches[1].getAttribute('aria-label')).toBe('Erro, #B42318');
    (swatches[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.cor()).toBe('#B42318');
    expect(swatches[1].getAttribute('aria-pressed')).toBe('true');

    const hex = el.querySelector('.mx-color-hex') as HTMLInputElement;
    hex.value = '#123';
    hex.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.cor()).toBe('#112233');
    await expectNoA11yViolations(el);
  });
});

describe('MxColorPicker', () => {
  it('escreve no formulário, marca erro de formato e nomeia o botão', async () => {
    const fixture = TestBed.createComponent(PickerHost);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const toggle = el.querySelector('.mx-color-picker-toggle')!;
    expect(toggle.getAttribute('aria-label')).toBe('Mudar cor, azul-petróleo escuro, #1F6F78');
    const input = el.querySelector('input')!;
    input.value = 'rgb(180, 35, 24)';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.cor.value).toBe('#B42318');
    input.value = '#12';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    await expectNoA11yViolations(el);
    (toggle as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(document.querySelector('.mx-color-picker-panel mx-color-panel')).toBeTruthy();
  });
});
