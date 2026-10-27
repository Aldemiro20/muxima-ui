import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxChoice, MxError, MxFormField } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxCheckbox } from './checkbox';

@Component({
  imports: [MxCheckbox, MxChoice, MxFormField, MxError, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxChoice><input type="checkbox" mxCheckbox [formControl]="termos" /> Aceito os termos</label>
      <mx-error>Tens de aceitar os termos.</mx-error>
    </mx-form-field>
    <label mxChoice><input type="checkbox" mxCheckbox [indeterminate]="parcial()" /> Todos</label>
  `,
})
class Host {
  termos = new FormControl(false, Validators.requiredTrue);
  parcial = signal(true);
}

describe('MxCheckbox', () => {
  function setup() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const [termos, todos] = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    return { fixture, termos, todos };
  }

  it('liga o input nativo ao Reactive Forms', () => {
    const { fixture, termos } = setup();
    expect(termos.classList).toContain('mx-checkbox');
    termos.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.termos.value).toBe(true);
  });

  it('mostra o erro e liga-o com aria-describedby depois de tocado', () => {
    const { fixture, termos } = setup();
    expect(termos.getAttribute('aria-invalid')).toBeNull();
    fixture.componentInstance.termos.markAsTouched();
    fixture.detectChanges();
    expect(termos.getAttribute('aria-invalid')).toBe('true');
    const error = fixture.nativeElement.querySelector('.mx-error') as HTMLElement;
    expect(termos.getAttribute('aria-describedby')).toContain(error.id);
  });

  it('aplica o estado intermédio na propriedade nativa', () => {
    const { fixture, todos } = setup();
    expect(todos.indeterminate).toBe(true);
    fixture.componentInstance.parcial.set(false);
    fixture.detectChanges();
    expect(todos.indeterminate).toBe(false);
  });

  it('não tem violações de acessibilidade', async () => {
    const { fixture } = setup();
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
