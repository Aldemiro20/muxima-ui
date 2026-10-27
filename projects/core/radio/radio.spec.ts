import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxChoice, MxFieldset } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxRadio } from './radio';

@Component({
  imports: [MxRadio, MxChoice, MxFieldset, ReactiveFormsModule],
  template: `
    <fieldset mxFieldset>
      <legend>Periodicidade</legend>
      <label mxChoice><input type="radio" mxRadio name="p" value="mensal" [formControl]="periodo" /> Mensal</label>
      <label mxChoice><input type="radio" mxRadio name="p" value="anual" [formControl]="periodo" /> Anual</label>
    </fieldset>
  `,
})
class Host {
  periodo = new FormControl('mensal');
}

describe('MxRadio', () => {
  it('reflecte e altera o valor do grupo', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const [mensal, anual] = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    expect(mensal.checked).toBe(true);
    expect(mensal.classList).toContain('mx-radio');
    anual.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.periodo.value).toBe('anual');
  });

  it('agrupa com fieldset e legend', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const fs = fixture.nativeElement.querySelector('fieldset') as HTMLElement;
    expect(fs.classList).toContain('mx-fieldset');
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
