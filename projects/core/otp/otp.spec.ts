import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { MX_STEPPER } from '@muxima-ui/core/stepper';
import { expectNoA11yViolations } from '../testing/axe';
import { MxOtp } from './otp';

@Component({
  imports: [MxOtp, MxFormField, MxLabel, ReactiveFormsModule, MX_STEPPER],
  template: `
    <mx-form-field>
      <label mxLabel>Código</label>
      <mx-otp [length]="4" [formControl]="codigo" (completed)="done = $event" />
    </mx-form-field>
    <ol mxStepper aria-label="Progresso">
      <li mxStep state="complete">Dados</li>
      <li mxStep state="current">Pagamento</li>
      <li mxStep>Confirmação</li>
    </ol>
  `,
})
class Host {
  codigo = new FormControl('');
  done = '';
}

describe('MxOtp e MxStepper', () => {
  it('OTP: um input real, só algarismos, emite quando completo', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('mx-otp input');
    expect(inputs.length).toBe(1);
    const input = inputs[0] as HTMLInputElement;
    expect(input.getAttribute('autocomplete')).toBe('one-time-code');
    input.value = '1a2b34';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.codigo.value).toBe('1234');
    expect(fixture.componentInstance.done).toBe('1234');
    const slots = Array.from(fixture.nativeElement.querySelectorAll('.mx-otp-slot')).map((s) => (s as HTMLElement).textContent);
    expect(slots).toEqual(['1', '2', '3', '4']);
    await expectNoA11yViolations(fixture.nativeElement);
  });

  it('Stepper: marca a etapa actual e anuncia as concluídas', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const steps = fixture.nativeElement.querySelectorAll('.mx-step') as NodeListOf<HTMLElement>;
    expect(steps[1].getAttribute('aria-current')).toBe('step');
    expect(steps[0].textContent).toContain('(concluído)');
    expect(steps[2].getAttribute('aria-current')).toBeNull();
  });
});
