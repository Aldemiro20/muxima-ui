import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxError, MxFormField, MxHint, MxLabel } from './form-field';
import { MxInput } from './input';
import { expectNoA11yViolations } from '../testing/axe';

@Component({
  imports: [ReactiveFormsModule, MxFormField, MxLabel, MxInput, MxHint, MxError],
  template: `
    <mx-form-field>
      <label mxLabel>Email</label>
      <input mxInput type="email" [formControl]="email" />
      <mx-hint>Enviamos o recibo para aqui.</mx-hint>
      <mx-error>Introduz um email válido.</mx-error>
    </mx-form-field>
  `,
})
class Host {
  email = new FormControl('', [Validators.required, Validators.email]);
}

describe('MxFormField + MxInput', () => {
  function setup() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      label: el.querySelector('label')!,
      input: el.querySelector('input')!,
      hint: el.querySelector('.mx-hint')!,
      error: el.querySelector('.mx-error')!,
    };
  }

  it('liga o label ao input e marca o campo como obrigatório', () => {
    const { label, input } = setup();
    expect(input.id).toBeTruthy();
    expect(label.getAttribute('for')).toBe(input.id);
    expect(label.hasAttribute('data-required')).toBe(true);
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('anuncia a ajuda, e só mostra o erro depois de o utilizador tocar no campo', () => {
    const { fixture, input, hint, error } = setup();
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
    expect(error.hasAttribute('hidden')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBeNull();

    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(error.hasAttribute('hidden')).toBe(false);
    expect(error.getAttribute('role')).toBe('alert');
    expect(input.getAttribute('aria-describedby')).toBe(`${hint.id} ${error.id}`);
  });

  it('remove o erro quando o valor fica válido', () => {
    const { fixture, input, error } = setup();
    input.value = 'ola@empresa.co.ao';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(input.getAttribute('aria-invalid')).toBeNull();
    expect(error.hasAttribute('hidden')).toBe(true);
  });
  it('não tem violações de acessibilidade', async () => {
    const { fixture } = setup();
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
