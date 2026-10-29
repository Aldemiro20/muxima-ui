import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxRangeSlider } from './range-slider';

@Component({
  imports: [MxRangeSlider, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Preço</label>
      <mx-range-slider [formControl]="preco" [min]="0" [max]="100" [step]="5" [minGap]="10" [format]="kz" showValues />
    </mx-form-field>
  `,
})
class Host {
  preco = new FormControl<[number, number] | null>([20, 80]);
  kz = (v: number) => `${v} US$`;
}

describe('MxRangeSlider', () => {
  it('nomeia cada cursor, anuncia o valor formatado e não deixa os cursores cruzar', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const [low, high] = Array.from(el.querySelectorAll<HTMLInputElement>('input[type=range]'));
    const name = (i: HTMLInputElement) => i.getAttribute('aria-labelledby')!.split(' ').map((id) => document.getElementById(id)!.textContent!.trim()).join(' ');
    expect(name(low)).toBe('Preço mínimo');
    expect(name(high)).toBe('Preço máximo');
    expect(low.getAttribute('aria-valuetext')).toBe('20 US$');

    low.value = '95';
    low.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.preco.value).toEqual([70, 80]);
    expect(low.value).toBe('70');

    fixture.componentInstance.preco.setValue([10, 30]);
    fixture.detectChanges();
    expect(high.getAttribute('aria-valuetext')).toBe('30 US$');
    expect(el.querySelector('.mx-range-slider-values')!.textContent).toContain('10 US$');
    await expectNoA11yViolations(el);
  });
});
