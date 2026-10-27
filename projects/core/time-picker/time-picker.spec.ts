import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxTimePicker, mxParseTime } from './time-picker';

@Component({
  imports: [MxTimePicker, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Hora</label>
      <mx-time-picker [formControl]="hora" [step]="15" min="08:00" max="18:00" />
    </mx-form-field>
  `,
})
class Host {
  hora = new FormControl<string | null>('09:00');
}

const key = (el: Element, k: string) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));

describe('MxTimePicker', () => {
  it('aceita várias formas de escrever horas', () => {
    expect(mxParseTime('9')).toBe('09:00');
    expect(mxParseTime('930')).toBe('09:30');
    expect(mxParseTime('9h30')).toBe('09:30');
    expect(mxParseTime('21h')).toBe('21:00');
    expect(mxParseTime('9:3')).toBe('09:30');
    expect(mxParseTime('24:00')).toBeNull();
    expect(mxParseTime('abc')).toBeNull();
  });

  it('abre a lista na hora escolhida e escolhe com o teclado', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    key(input, 'ArrowDown');
    fixture.detectChanges();
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBe(41); // 08:00 a 18:00 de 15 em 15
    expect(input.getAttribute('aria-activedescendant')).toBe(options[4].id); // 09:00
    key(input, 'ArrowDown');
    key(input, 'Enter');
    fixture.detectChanges();
    expect(fixture.componentInstance.hora.value).toBe('09:15');
    expect(input.getAttribute('aria-expanded')).toBe('false');
    await expectNoA11yViolations(fixture.nativeElement);
  });

  it('marca erro fora do intervalo', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '20h';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.hora.value).toBe('20:00');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });
});
