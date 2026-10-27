import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxChip, MxChipToggle, MxTagInput } from './chips';

@Component({
  imports: [MxChip, MxChipToggle],
  template: `
    <ul aria-label="Províncias">
      @for (p of provincias(); track p) {
        <li><mx-chip removable (removed)="tirar(p)">{{ p }}</mx-chip></li>
      }
    </ul>
    <div role="group" aria-label="Estado"><button mxChipToggle [(selected)]="pagas">Pagas</button></div>
  `,
})
class ChipsHost {
  provincias = signal(['Luanda', 'Huíla']);
  pagas = signal(false);
  tirar(p: string) {
    this.provincias.update((l) => l.filter((x) => x !== p));
  }
}

@Component({
  imports: [MxTagInput, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Destinatários</label>
      <mx-tag-input [formControl]="emails" [validate]="email" [maxTags]="3" />
    </mx-form-field>
  `,
})
class TagHost {
  emails = new FormControl<string[]>(['ana@kianda.ao']);
  email = (t: string) => (/^\S+@\S+\.\S+$/.test(t) ? null : 'Email inválido.');
}

const flush = () => new Promise((r) => setTimeout(r, 0));
const key = (el: Element, k: string) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));

describe('MxChip', () => {
  it('nomeia o botão de remover com o texto e alterna o filtro', async () => {
    const fixture = TestBed.createComponent(ChipsHost);
    fixture.detectChanges();
    await flush();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const remove = el.querySelector('.mx-chip-remove') as HTMLButtonElement;
    expect(remove.getAttribute('aria-label')).toBe('Remover Luanda');
    remove.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.provincias()).toEqual(['Huíla']);
    const toggle = el.querySelector('[mxChipToggle]') as HTMLButtonElement;
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.componentInstance.pagas()).toBe(true);
    await expectNoA11yViolations(el);
  });
});

describe('MxTagInput', () => {
  it('acrescenta com Enter, valida, rejeita duplicados e remove com Backspace', async () => {
    const fixture = TestBed.createComponent(TagHost);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('.mx-tag-input-field') as HTMLInputElement;
    const typeAndEnter = (text: string) => {
      input.value = text;
      input.dispatchEvent(new Event('input'));
      key(input, 'Enter');
      fixture.detectChanges();
    };
    typeAndEnter('pedro@kianda.ao');
    expect(fixture.componentInstance.emails.value).toEqual(['ana@kianda.ao', 'pedro@kianda.ao']);
    expect(input.value).toBe('');
    typeAndEnter('nao-e-email');
    expect(fixture.componentInstance.emails.value!.length).toBe(2);
    expect(input.value).toBe('nao-e-email');
    typeAndEnter('ANA@kianda.ao');
    expect(fixture.componentInstance.emails.value!.length).toBe(2);

    input.value = '';
    input.dispatchEvent(new Event('input'));
    key(input, 'Backspace');
    const removes = el.querySelectorAll('.mx-chip-remove');
    expect(document.activeElement).toBe(removes[1]);
    key(removes[1], 'Backspace');
    fixture.detectChanges();
    expect(fixture.componentInstance.emails.value).toEqual(['ana@kianda.ao']);
    await expectNoA11yViolations(el);
  });
});
