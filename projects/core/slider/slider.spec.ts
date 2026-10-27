import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxSlider } from './slider';

@Component({
  imports: [MxSlider, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Orçamento</label>
      <input type="range" mxSlider min="0" max="200" [formControl]="valor" />
    </mx-form-field>
  `,
})
class Host {
  valor = new FormControl(50);
}

describe('MxSlider', () => {
  it('pinta o preenchimento conforme o valor, também quando muda pelo formulário', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.style.getPropertyValue('--mx-slider-fill')).toBe('25%');
    fixture.componentInstance.valor.setValue(100);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.style.getPropertyValue('--mx-slider-fill')).toBe('50%');
  });

  it('fica ligado ao label do campo', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.htmlFor).toBe(input.id);
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
