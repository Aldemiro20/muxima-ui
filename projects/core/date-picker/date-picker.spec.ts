import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxCalendar } from './calendar';
import { MxDatePicker, mxFormatDate, mxParseDate } from './date-picker';

@Component({
  imports: [MxCalendar],
  template: `<mx-calendar [(value)]="data" />`,
})
class CalendarHost {
  data = signal<Date | null>(new Date(2026, 9, 15));
}

@Component({
  imports: [MxDatePicker, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Vencimento</label>
      <mx-date-picker [formControl]="data" />
    </mx-form-field>
  `,
})
class PickerHost {
  data = new FormControl<Date | null>(null);
}

const flush = () => new Promise((r) => setTimeout(r, 0));
const key = (el: Element, k: string, extra: KeyboardEventInit = {}) =>
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...extra }));

describe('MxCalendar', () => {
  it('mostra o mês do valor, marca o dia e move o foco com o teclado', async () => {
    const fixture = TestBed.createComponent(CalendarHost);
    fixture.detectChanges();
    await flush();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.mx-calendar-title')!.textContent).toContain('2026');
    const selected = el.querySelector('td[aria-selected="true"] button') as HTMLButtonElement;
    expect(selected.textContent!.trim()).toBe('15');
    expect(selected.tabIndex).toBe(0);
    const grid = el.querySelector('[role="grid"]')!;
    key(grid, 'ArrowRight');
    fixture.detectChanges();
    expect((el.querySelector('button[tabindex="0"]') as HTMLElement).textContent!.trim()).toBe('16');
    key(grid, 'ArrowDown');
    fixture.detectChanges();
    expect((el.querySelector('button[tabindex="0"]') as HTMLElement).textContent!.trim()).toBe('23');
    key(grid, 'PageDown');
    fixture.detectChanges();
    expect(el.querySelector('.mx-calendar-title')!.textContent!.toLowerCase()).toContain('novembro');
    (el.querySelector('button[tabindex="0"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.data()).toEqual(new Date(2026, 10, 23));
    await expectNoA11yViolations(el);
  });
});

describe('MxDatePicker', () => {
  it('converte texto dd/mm/aaaa e rejeita datas impossíveis', () => {
    expect(mxParseDate('05/11/2026', 'dmy')).toEqual(new Date(2026, 10, 5));
    expect(mxParseDate('31/02/2026', 'dmy')).toBeNull();
    expect(mxFormatDate(new Date(2026, 0, 7), 'dmy')).toBe('07/01/2026');
    // por omissão, mm/dd/aaaa
    expect(mxParseDate('11/05/2026')).toEqual(new Date(2026, 10, 5));
    expect(mxFormatDate(new Date(2026, 0, 7))).toBe('01/07/2026');
  });

  it('escreve a data no formulário e marca erro de formato', () => {
    const fixture = TestBed.createComponent(PickerHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '12/12/2026';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.data.value).toEqual(new Date(2026, 11, 12));
    input.value = '12/13';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.data.value).toBeNull();
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('abre o calendário num diálogo e escolhe um dia', async () => {
    const fixture = TestBed.createComponent(PickerHost);
    fixture.componentInstance.data.setValue(new Date(2026, 9, 1));
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector('.mx-date-picker-toggle') as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();
    await flush();
    fixture.detectChanges();
    const panel = document.querySelector('.mx-date-picker-panel') as HTMLElement;
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    await expectNoA11yViolations(document.body);
    const day10 = Array.from(panel.querySelectorAll('.mx-calendar-day')).find(
      (b) => b.textContent!.trim() === '10' && !b.hasAttribute('data-outside'),
    ) as HTMLButtonElement;
    day10.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.data.value).toEqual(new Date(2026, 9, 10));
    expect((fixture.nativeElement.querySelector('input') as HTMLInputElement).value).toBe('10/10/2026');
  });
});
