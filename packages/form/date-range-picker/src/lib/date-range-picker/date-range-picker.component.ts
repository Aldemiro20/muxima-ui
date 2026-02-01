import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePreset {
  label: string;
  range: DateRange;
}

@Component({
  selector: 'muxima-date-range-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true
    }
  ]
})
export class DateRangePickerComponent implements ControlValueAccessor {
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabled = false;
  @Input() showPresets = true;
  
  @Output() rangeSelected = new EventEmitter<DateRange>();
  
  selectedRange: DateRange = { start: null, end: null };
  isOpen = false;
  currentMonth = new Date();
  selectingStart = true;
  
  presets: DateRangePreset[] = [
    { label: 'Hoje', range: this.getTodayRange() },
    { label: 'Ontem', range: this.getYesterdayRange() },
    { label: 'Últimos 7 dias', range: this.getLast7DaysRange() },
    { label: 'Últimos 30 dias', range: this.getLast30DaysRange() },
    { label: 'Este mês', range: this.getThisMonthRange() },
    { label: 'Mês passado', range: this.getLastMonthRange() }
  ];
  
  private onChange: (value: DateRange) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: DateRange): void {
    if (value) {
      this.selectedRange = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  togglePicker(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectDate(date: Date): void {
    if (this.selectingStart) {
      this.selectedRange.start = date;
      this.selectedRange.end = null;
      this.selectingStart = false;
    } else {
      if (date < this.selectedRange.start!) {
        this.selectedRange.end = this.selectedRange.start;
        this.selectedRange.start = date;
      } else {
        this.selectedRange.end = date;
      }
      this.selectingStart = true;
      this.emitValue();
    }
  }

  selectPreset(preset: DateRangePreset): void {
    this.selectedRange = { ...preset.range };
    this.emitValue();
    this.isOpen = false;
  }

  getDaysInMonth(): Date[] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
  }

  isInRange(date: Date): boolean {
    if (!this.selectedRange.start || !this.selectedRange.end) return false;
    return date >= this.selectedRange.start && date <= this.selectedRange.end;
  }

  isStartDate(date: Date): boolean {
    return this.selectedRange.start?.toDateString() === date.toDateString();
  }

  isEndDate(date: Date): boolean {
    return this.selectedRange.end?.toDateString() === date.toDateString();
  }

  formatRange(): string {
    const start = this.selectedRange.start;
    const end = this.selectedRange.end;
    
    if (!start && !end) return 'Selecione um período';
    if (start && !end) return this.formatDate(start) + ' - ...';
    if (start && end) return this.formatDate(start) + ' - ' + this.formatDate(end);
    
    return 'Selecione um período';
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  private emitValue(): void {
    this.onChange(this.selectedRange);
    this.rangeSelected.emit(this.selectedRange);
    this.onTouched();
  }

  private getTodayRange(): DateRange {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return { start: today, end: today };
  }

  private getYesterdayRange(): DateRange {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return { start: yesterday, end: yesterday };
  }

  private getLast7DaysRange(): DateRange {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);
    return { start, end };
  }

  private getLast30DaysRange(): DateRange {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { start, end };
  }

  private getThisMonthRange(): DateRange {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start, end };
  }

  private getLastMonthRange(): DateRange {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    return { start, end };
  }
}
