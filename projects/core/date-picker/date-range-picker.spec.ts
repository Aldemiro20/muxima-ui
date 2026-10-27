import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxCalendar, MxDateRange } from './calendar';
import { MxDateRangePicker, mxDateRangeComplete, mxDefaultRangePresets } from './date-range-picker';

@Component({
  imports: [MxCalendar],
  template: `<mx-calendar mode="range" [(range)]="periodo" />`,
})
class CalendarHost {
  periodo = signal<MxDateRange | null>({ start: new Date(2026, 9, 10), end: null });
}

@Component({
  imports: [MxDateRangePicker, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Período</label>
      <mx-date-range-picker [formControl]="periodo" [presets]="atalhos" />
    </mx-form-field>
  `,
})
class PickerHost {
  periodo = new FormControl<MxDateRange | null>(null, mxDateRangeComplete);
  atalhos = mxDefaultRangePresets();
}

const flush = () => new Promise((r) => setTimeout(r, 0));
const type = (input: HTMLInputElement, text: string) => {
  input.value = text;
  input.dispatchEvent(new Event('input'));
};

describe('MxCalendar em intervalo', () => {
  it('o segundo clique fecha o intervalo e marca os dias entre os dois', async () => {
    const fixture = TestBed.createComponent(CalendarHost);
    fixture.detectChanges();
    await flush();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('p.mx-visually-hidden[aria-live]')!.textContent).toContain('Escolhe a data de fim');
    // escolher um dia anterior troca início e fim
    (el.querySelector('[data-date="2026-10-6"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.periodo()).toEqual({ start: new Date(2026, 9, 6), end: new Date(2026, 9, 10) });
    expect(el.querySelectorAll('td[data-in-range]').length).toBe(3);
    expect(el.querySelector('td[data-range-start] button')!.getAttribute('aria-label')).toContain('início do intervalo');
    expect(el.querySelector('td[data-range-end] button')!.getAttribute('aria-label')).toContain('fim do intervalo');
    await expectNoA11yViolations(el);
    // um terceiro clique começa um intervalo novo
    (el.querySelector('[data-date="2026-10-20"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.periodo()).toEqual({ start: new Date(2026, 9, 20), end: null });
  });
});

describe('MxDateRangePicker', () => {
  it('liga os dois campos ao rótulo e escreve o intervalo no formulário', async () => {
    const fixture = TestBed.createComponent(PickerHost);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const [start, end] = Array.from(el.querySelectorAll<HTMLInputElement>('.mx-date-range-input'));
    const names = (input: HTMLInputElement) =>
      input
        .getAttribute('aria-labelledby')!
        .split(' ')
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .join(' ');
    expect(names(start)).toBe('Período início');
    expect(names(end)).toBe('Período fim');

    type(start, '01/10/2026');
    fixture.detectChanges();
    expect(fixture.componentInstance.periodo.errors).toEqual({ rangeIncomplete: true });
    type(end, '15/10/2026');
    fixture.detectChanges();
    expect(fixture.componentInstance.periodo.value).toEqual({ start: new Date(2026, 9, 1), end: new Date(2026, 9, 15) });
    expect(fixture.componentInstance.periodo.valid).toBe(true);
    await expectNoA11yViolations(el);
  });

  it('marca erro quando o fim é anterior ao início', () => {
    const fixture = TestBed.createComponent(PickerHost);
    fixture.detectChanges();
    const [start, end] = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('.mx-date-range-input'));
    type(start, '20/10/2026');
    type(end, '10/10/2026');
    fixture.detectChanges();
    expect(start.getAttribute('aria-invalid')).toBe('true');
  });

  it('abre o calendário e escolhe um atalho', async () => {
    const fixture = TestBed.createComponent(PickerHost);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.mx-date-picker-toggle') as HTMLButtonElement).click();
    fixture.detectChanges();
    await flush();
    const panel = document.querySelector('.mx-date-range-panel') as HTMLElement;
    expect(panel.querySelector('mx-calendar')).toBeTruthy();
    expect(panel.querySelectorAll('.mx-date-range-preset').length).toBe(4);
    (panel.querySelector('.mx-date-range-preset') as HTMLButtonElement).click();
    fixture.detectChanges();
    const v = fixture.componentInstance.periodo.value!;
    expect(Math.round((v.end!.getTime() - v.start!.getTime()) / 864e5)).toBe(6);
    expect(document.querySelector('.mx-date-range-panel')).toBeNull();
  });
});
