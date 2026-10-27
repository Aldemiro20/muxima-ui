import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxCombobox } from './combobox';

@Component({
  imports: [MxCombobox, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Província</label>
      <mx-combobox [options]="provincias" [formControl]="provincia" />
    </mx-form-field>
  `,
})
class Host {
  provincias = ['Luanda', 'Huíla', 'Huambo', 'Benguela'];
  provincia = new FormControl<string | null>(null);
}

const key = (el: HTMLElement, k: string) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));

describe('MxCombobox', () => {
  it('filtra sem acentos, navega com setas e escolhe com Enter', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.htmlFor).toBe(input.id);
    expect(input.getAttribute('role')).toBe('combobox');
    input.value = 'hu';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const options = () => Array.from(document.querySelectorAll('[role="option"]')).map((o) => o.textContent!.trim());
    expect(options()).toEqual(['Huíla', 'Huambo']);
    expect(input.getAttribute('aria-expanded')).toBe('true');
    await expectNoA11yViolations(document.body);
    key(input, 'ArrowDown');
    fixture.detectChanges();
    const active = document.getElementById(input.getAttribute('aria-activedescendant')!);
    expect(active?.textContent?.trim()).toBe('Huambo');
    key(input, 'Enter');
    fixture.detectChanges();
    expect(fixture.componentInstance.provincia.value).toBe('Huambo');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('Escape fecha e um segundo Escape limpa', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.provincia.setValue('Luanda');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('Luanda');
    key(input, 'ArrowDown');
    fixture.detectChanges();
    key(input, 'Escape');
    fixture.detectChanges();
    expect(input.getAttribute('aria-expanded')).toBe('false');
    key(input, 'Escape');
    fixture.detectChanges();
    expect(fixture.componentInstance.provincia.value).toBeNull();
  });
});
