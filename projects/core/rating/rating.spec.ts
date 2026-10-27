import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxRating } from './rating';

@Component({
  imports: [MxRating, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Atendimento</label>
      <mx-rating [formControl]="nota" clearable />
    </mx-form-field>
    <mx-rating [value]="4.5" readonly showValue />
  `,
})
class Host {
  nota = new FormControl<number | null>(null);
}

describe('MxRating', () => {
  it('usa rádios nativos com nome de cada nota, limpa e mostra a nota só de leitura', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const group = el.querySelector('[role="radiogroup"]')!;
    expect(document.getElementById(group.getAttribute('aria-labelledby')!)!.textContent).toContain('Atendimento');
    const radios = el.querySelectorAll<HTMLInputElement>('input[type=radio]');
    expect(radios.length).toBe(5);
    expect(radios[2].closest('label')!.textContent!.trim()).toBe('3 estrelas');
    radios[3].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.nota.value).toBe(4);
    expect(el.querySelectorAll('label[data-on]').length).toBe(4);
    radios[3].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.nota.value).toBeNull();
    expect(el.querySelector('[role="img"]')!.getAttribute('aria-label')).toBe('4,5 de 5 estrelas');
    await expectNoA11yViolations(el);
  });
});
