import { Component, Input, Output, EventEmitter, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DatepickerMode = 'single' | 'range';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

@Component({
  selector: 'muxima-datepicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datepicker-datepicker.component.html',
  styleUrls: ['./datepicker-datepicker.component.scss'],
})
export class DatepickerDatepickerComponent implements OnInit {
  @Input() mode: DatepickerMode = 'single';
  @Input() placeholder = 'Selecione uma data';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() format = 'dd/MM/yyyy';
  @Input() value?: Date | DateRange;
  
  @Output() valueChange = new EventEmitter<Date | DateRange>();
  @Output() dateSelect = new EventEmitter<Date>();

  isOpen = false;
  currentMonth: Date = new Date();
  selectedDate: Date | null = null;
  rangeStart: Date | null = null;
  rangeEnd: Date | null = null;
  hoverDate: Date | null = null;
  
  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  calendarDays: (Date | null)[] = [];

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  ngOnInit(): void {
    this.currentMonth = new Date();
    this.currentMonth.setDate(1);
    
    if (this.value) {
      if (this.mode === 'single' && this.value instanceof Date) {
        this.selectedDate = this.value;
        this.currentMonth = new Date(this.value);
        this.currentMonth.setDate(1);
      } else if (this.mode === 'range' && 'start' in this.value) {
        this.rangeStart = this.value.start;
        this.rangeEnd = this.value.end;
        if (this.value.start) {
          this.currentMonth = new Date(this.value.start);
          this.currentMonth.setDate(1);
        }
      }
    }
    
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      this.calendarDays.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      this.calendarDays.push(new Date(year, month, day));
    }
  }

  previousMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  selectDate(date: Date): void {
    if (this.isDateDisabled(date)) return;

    if (this.mode === 'single') {
      this.selectedDate = date;
      this.valueChange.emit(date);
      this.dateSelect.emit(date);
      this.isOpen = false;
    } else {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        this.rangeStart = date;
        this.rangeEnd = null;
      } else if (date < this.rangeStart) {
        this.rangeEnd = this.rangeStart;
        this.rangeStart = date;
      } else {
        this.rangeEnd = date;
        const range: DateRange = { start: this.rangeStart, end: this.rangeEnd };
        this.valueChange.emit(range);
        this.isOpen = false;
      }
      this.dateSelect.emit(date);
    }
  }

  isDateSelected(date: Date): boolean {
    if (this.mode === 'single' && this.selectedDate) {
      return this.isSameDay(date, this.selectedDate);
    }
    return false;
  }

  isDateInRange(date: Date): boolean {
    if (this.mode === 'range' && this.rangeStart) {
      if (this.rangeEnd) {
        return date >= this.rangeStart && date <= this.rangeEnd;
      }
      if (this.hoverDate && this.hoverDate > this.rangeStart) {
        return date >= this.rangeStart && date <= this.hoverDate;
      }
    }
    return false;
  }

  isRangeStart(date: Date): boolean {
    return this.mode === 'range' && this.rangeStart !== null && this.isSameDay(date, this.rangeStart);
  }

  isRangeEnd(date: Date): boolean {
    return this.mode === 'range' && this.rangeEnd !== null && this.isSameDay(date, this.rangeEnd);
  }

  isDateDisabled(date: Date): boolean {
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  onDateHover(date: Date | null): void {
    if (this.mode === 'range' && this.rangeStart && !this.rangeEnd) {
      this.hoverDate = date;
    }
  }

  toggleCalendar(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.generateCalendar();
    }
  }

  closeCalendar(): void {
    this.isOpen = false;
  }

  getFormattedDate(): string {
    if (this.mode === 'single' && this.selectedDate) {
      return this.formatDate(this.selectedDate);
    } else if (this.mode === 'range') {
      if (this.rangeStart && this.rangeEnd) {
        return `${this.formatDate(this.rangeStart)} - ${this.formatDate(this.rangeEnd)}`;
      } else if (this.rangeStart) {
        return this.formatDate(this.rangeStart);
      }
    }
    return '';
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getMonthYearLabel(): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${months[this.currentMonth.getMonth()]} ${this.currentMonth.getFullYear()}`;
  }

  selectToday(): void {
    this.selectDate(new Date());
  }

  clearSelection(): void {
    this.selectedDate = null;
    this.rangeStart = null;
    this.rangeEnd = null;
    this.hoverDate = null;
    this.valueChange.emit(this.mode === 'single' ? null as any : { start: null, end: null });
    this.isOpen = false;
  }
}
