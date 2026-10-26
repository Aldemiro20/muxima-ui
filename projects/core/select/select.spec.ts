import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { MxOption, MxSelect } from './select';

@Component({
  imports: [ReactiveFormsModule, MxFormField, MxLabel, MxSelect, MxOption],
  template: `
    <mx-form-field>
      <label mxLabel>Província</label>
      <mx-select placeholder="Escolhe uma" [formControl]="provincia">
        <mx-option value="luanda">Luanda</mx-option>
        <mx-option value="benguela" disabled>Benguela</mx-option>
        <mx-option value="huila">Huíla</mx-option>
      </mx-select>
    </mx-form-field>
  `,
})
class Host {
  provincia = new FormControl<string | null>('luanda');
}

const flush = () => new Promise((r) => setTimeout(r));

describe('MxSelect', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const trigger = el.querySelector('.mx-select-trigger') as HTMLButtonElement;
    const key = async (k: string) => {
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
      fixture.detectChanges();
      await flush();
      fixture.detectChanges();
    };
    return { fixture, el, trigger, key };
  }

  it('é um combobox ligado ao label e mostra o valor actual', async () => {
    const { el, trigger } = await setup();
    expect(trigger.getAttribute('role')).toBe('combobox');
    expect(el.querySelector('label')!.getAttribute('for')).toBe(trigger.id);
    expect(trigger.textContent).toContain('Luanda');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('abre com seta para baixo e activa a opção seleccionada', async () => {
    const { trigger, key } = await setup();
    await key('ArrowDown');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const listbox = document.querySelector('[role="listbox"]')!;
    expect(listbox).not.toBeNull();
    const active = document.getElementById(trigger.getAttribute('aria-activedescendant')!);
    expect(active?.textContent?.trim()).toBe('Luanda');
  });

  it('salta opções desactivadas, escolhe com Enter e actualiza o formulário', async () => {
    const { fixture, trigger, key } = await setup();
    await key('ArrowDown');
    await key('ArrowDown');
    const active = document.getElementById(trigger.getAttribute('aria-activedescendant')!);
    expect(active?.textContent?.trim()).toBe('Huíla');
    await key('Enter');
    expect(fixture.componentInstance.provincia.value).toBe('huila');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.textContent).toContain('Huíla');
  });

  it('fecha com Escape sem alterar o valor', async () => {
    const { fixture, trigger, key } = await setup();
    await key('ArrowDown');
    await key('ArrowDown');
    await key('Escape');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.componentInstance.provincia.value).toBe('luanda');
  });

  it('respeita o estado desactivado do formulário', async () => {
    const { fixture, trigger } = await setup();
    fixture.componentInstance.provincia.disable();
    fixture.detectChanges();
    expect(trigger.disabled).toBe(true);
  });
});
