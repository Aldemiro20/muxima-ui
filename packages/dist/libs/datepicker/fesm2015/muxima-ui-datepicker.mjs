import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, HostListener } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class DatepickerDatepickerComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.mode = 'single';
        this.placeholder = 'Selecione uma data';
        this.format = 'dd/MM/yyyy';
        this.valueChange = new EventEmitter();
        this.dateSelect = new EventEmitter();
        this.isOpen = false;
        this.currentMonth = new Date();
        this.selectedDate = null;
        this.rangeStart = null;
        this.rangeEnd = null;
        this.hoverDate = null;
        this.weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        this.calendarDays = [];
    }
    onDocumentClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }
    ngOnInit() {
        this.currentMonth = new Date();
        this.currentMonth.setDate(1);
        if (this.value) {
            if (this.mode === 'single' && this.value instanceof Date) {
                this.selectedDate = this.value;
                this.currentMonth = new Date(this.value);
                this.currentMonth.setDate(1);
            }
            else if (this.mode === 'range' && 'start' in this.value) {
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
    generateCalendar() {
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
    previousMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
        this.generateCalendar();
    }
    nextMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
        this.generateCalendar();
    }
    selectDate(date) {
        if (this.isDateDisabled(date))
            return;
        if (this.mode === 'single') {
            this.selectedDate = date;
            this.valueChange.emit(date);
            this.dateSelect.emit(date);
            this.isOpen = false;
        }
        else {
            if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
                this.rangeStart = date;
                this.rangeEnd = null;
            }
            else if (date < this.rangeStart) {
                this.rangeEnd = this.rangeStart;
                this.rangeStart = date;
            }
            else {
                this.rangeEnd = date;
                const range = { start: this.rangeStart, end: this.rangeEnd };
                this.valueChange.emit(range);
                this.isOpen = false;
            }
            this.dateSelect.emit(date);
        }
    }
    isDateSelected(date) {
        if (this.mode === 'single' && this.selectedDate) {
            return this.isSameDay(date, this.selectedDate);
        }
        return false;
    }
    isDateInRange(date) {
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
    isRangeStart(date) {
        return this.mode === 'range' && this.rangeStart !== null && this.isSameDay(date, this.rangeStart);
    }
    isRangeEnd(date) {
        return this.mode === 'range' && this.rangeEnd !== null && this.isSameDay(date, this.rangeEnd);
    }
    isDateDisabled(date) {
        if (this.minDate && date < this.minDate)
            return true;
        if (this.maxDate && date > this.maxDate)
            return true;
        return false;
    }
    isToday(date) {
        const today = new Date();
        return this.isSameDay(date, today);
    }
    isSameDay(date1, date2) {
        return (date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear());
    }
    onDateHover(date) {
        if (this.mode === 'range' && this.rangeStart && !this.rangeEnd) {
            this.hoverDate = date;
        }
    }
    toggleCalendar() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.generateCalendar();
        }
    }
    closeCalendar() {
        this.isOpen = false;
    }
    getFormattedDate() {
        if (this.mode === 'single' && this.selectedDate) {
            return this.formatDate(this.selectedDate);
        }
        else if (this.mode === 'range') {
            if (this.rangeStart && this.rangeEnd) {
                return `${this.formatDate(this.rangeStart)} - ${this.formatDate(this.rangeEnd)}`;
            }
            else if (this.rangeStart) {
                return this.formatDate(this.rangeStart);
            }
        }
        return '';
    }
    formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    getMonthYearLabel() {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return `${months[this.currentMonth.getMonth()]} ${this.currentMonth.getFullYear()}`;
    }
    selectToday() {
        this.selectDate(new Date());
    }
    clearSelection() {
        this.selectedDate = null;
        this.rangeStart = null;
        this.rangeEnd = null;
        this.hoverDate = null;
        this.valueChange.emit(this.mode === 'single' ? null : { start: null, end: null });
        this.isOpen = false;
    }
}
DatepickerDatepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DatepickerDatepickerComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
DatepickerDatepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: DatepickerDatepickerComponent, isStandalone: true, selector: "muxima-datepicker", inputs: { mode: "mode", placeholder: "placeholder", minDate: "minDate", maxDate: "maxDate", format: "format", value: "value" }, outputs: { valueChange: "valueChange", dateSelect: "dateSelect" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, ngImport: i0, template: "<div class=\"muxima-datepicker\">\n  <div class=\"datepicker-input\" (click)=\"toggleCalendar()\">\n    <svg class=\"calendar-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n      <line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line>\n      <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line>\n      <line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>\n    </svg>\n    <input \n      type=\"text\" \n      [placeholder]=\"placeholder\"\n      [value]=\"getFormattedDate()\"\n      readonly>\n    <svg class=\"chevron-icon\" [class.open]=\"isOpen\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <polyline points=\"6 9 12 15 18 9\"></polyline>\n    </svg>\n  </div>\n\n  <div class=\"datepicker-dropdown\" *ngIf=\"isOpen\">\n    <div class=\"calendar-header\">\n      <button type=\"button\" class=\"nav-button\" (click)=\"previousMonth()\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"15 18 9 12 15 6\"></polyline>\n        </svg>\n      </button>\n      <div class=\"month-year-label\">{{ getMonthYearLabel() }}</div>\n      <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"9 18 15 12 9 6\"></polyline>\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"calendar-grid\">\n      <div class=\"week-days\">\n        <div class=\"week-day\" *ngFor=\"let day of weekDays\">{{ day }}</div>\n      </div>\n      <div class=\"calendar-days\">\n        <button\n          *ngFor=\"let date of calendarDays\"\n          type=\"button\"\n          class=\"calendar-day\"\n          [class.empty]=\"!date\"\n          [class.selected]=\"date && isDateSelected(date)\"\n          [class.in-range]=\"date && isDateInRange(date)\"\n          [class.range-start]=\"date && isRangeStart(date)\"\n          [class.range-end]=\"date && isRangeEnd(date)\"\n          [class.today]=\"date && isToday(date)\"\n          [class.disabled]=\"date && isDateDisabled(date)\"\n          [disabled]=\"!date || (date && isDateDisabled(date))\"\n          (click)=\"date && selectDate(date)\"\n          (mouseenter)=\"onDateHover(date)\"\n          (mouseleave)=\"onDateHover(null)\">\n          <span *ngIf=\"date\">{{ date.getDate() }}</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"calendar-footer\">\n      <button type=\"button\" class=\"footer-button secondary\" (click)=\"clearSelection()\">\n        Limpar\n      </button>\n      <button type=\"button\" class=\"footer-button primary\" (click)=\"selectToday()\">\n        Hoje\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".muxima-datepicker{position:relative;width:100%;max-width:320px}.datepicker-input{position:relative;display:flex;align-items:center;gap:.75rem;padding:.875rem 1rem;background:white;border:2px solid #e5e7eb;border-radius:12px;cursor:pointer;transition:all .3s ease}.datepicker-input:hover{border-color:#667eea;box-shadow:0 4px 12px #667eea1a}.datepicker-input:focus-within{border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.datepicker-input input{flex:1;border:none;outline:none;font-size:.95rem;color:#1f2937;background:transparent;cursor:pointer}.datepicker-input input::placeholder{color:#9ca3af}.datepicker-input .calendar-icon{width:20px;height:20px;color:#667eea;flex-shrink:0}.datepicker-input .chevron-icon{width:20px;height:20px;color:#9ca3af;transition:transform .3s ease;flex-shrink:0}.datepicker-input .chevron-icon.open{transform:rotate(180deg)}.datepicker-dropdown{position:absolute;top:calc(100% + .5rem);left:0;background:white;border-radius:16px;box-shadow:0 20px 60px #00000026;padding:1.5rem;z-index:9999;min-width:320px;animation:slideDown .3s ease-out;border:1px solid #e5e7eb}.calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:2px solid #f3f4f6}.month-year-label{font-size:1.125rem;font-weight:700;color:#1f2937;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.nav-button{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:none;background:rgba(102,126,234,.1);border-radius:10px;color:#667eea;cursor:pointer;transition:all .3s ease}.nav-button svg{width:20px;height:20px}.nav-button:hover{background:rgba(102,126,234,.2);transform:scale(1.1)}.nav-button:active{transform:scale(.95)}.calendar-grid{margin-bottom:1rem}.week-days{display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem;margin-bottom:.5rem}.week-day{text-align:center;font-size:.75rem;font-weight:700;color:#9ca3af;text-transform:uppercase;padding:.5rem 0}.calendar-days{display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border:none;background:transparent;border-radius:10px;font-size:.95rem;font-weight:600;color:#1f2937;cursor:pointer;transition:all .2s ease;position:relative}.calendar-day:not(.empty):hover:not(.disabled){background:rgba(102,126,234,.1);transform:scale(1.1)}.calendar-day.empty{cursor:default}.calendar-day.today:not(.selected){color:#667eea;font-weight:800}.calendar-day.today:not(.selected):after{content:\"\";position:absolute;bottom:4px;left:50%;transform:translate(-50%);width:4px;height:4px;background:#667eea;border-radius:50%}.calendar-day.selected{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;box-shadow:0 4px 12px #667eea66;transform:scale(1.05)}.calendar-day.in-range:not(.range-start):not(.range-end){background:rgba(102,126,234,.15);border-radius:0}.calendar-day.range-start{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-radius:10px 0 0 10px;box-shadow:0 4px 12px #667eea66}.calendar-day.range-end{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-radius:0 10px 10px 0;box-shadow:0 4px 12px #667eea66}.calendar-day.range-start.range-end{border-radius:10px}.calendar-day.disabled{color:#d1d5db;cursor:not-allowed}.calendar-day.disabled:hover{background:transparent;transform:none}.calendar-footer{display:flex;gap:.75rem;padding-top:1rem;border-top:2px solid #f3f4f6}.footer-button{flex:1;padding:.75rem 1rem;border:none;border-radius:10px;font-size:.95rem;font-weight:600;cursor:pointer;transition:all .3s ease}.footer-button.secondary{background:#f3f4f6;color:#6b7280}.footer-button.secondary:hover{background:#e5e7eb;transform:translateY(-2px)}.footer-button.primary{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;box-shadow:0 4px 12px #667eea4d}.footer-button.primary:hover{transform:translateY(-2px);box-shadow:0 6px 16px #667eea66}.footer-button:active{transform:translateY(0)}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@media (max-width: 480px){.datepicker-dropdown{min-width:280px;padding:1rem}.calendar-day{font-size:.875rem}.month-year-label{font-size:1rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DatepickerDatepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-datepicker', standalone: true, imports: [CommonModule], template: "<div class=\"muxima-datepicker\">\n  <div class=\"datepicker-input\" (click)=\"toggleCalendar()\">\n    <svg class=\"calendar-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n      <line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line>\n      <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line>\n      <line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>\n    </svg>\n    <input \n      type=\"text\" \n      [placeholder]=\"placeholder\"\n      [value]=\"getFormattedDate()\"\n      readonly>\n    <svg class=\"chevron-icon\" [class.open]=\"isOpen\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <polyline points=\"6 9 12 15 18 9\"></polyline>\n    </svg>\n  </div>\n\n  <div class=\"datepicker-dropdown\" *ngIf=\"isOpen\">\n    <div class=\"calendar-header\">\n      <button type=\"button\" class=\"nav-button\" (click)=\"previousMonth()\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"15 18 9 12 15 6\"></polyline>\n        </svg>\n      </button>\n      <div class=\"month-year-label\">{{ getMonthYearLabel() }}</div>\n      <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"9 18 15 12 9 6\"></polyline>\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"calendar-grid\">\n      <div class=\"week-days\">\n        <div class=\"week-day\" *ngFor=\"let day of weekDays\">{{ day }}</div>\n      </div>\n      <div class=\"calendar-days\">\n        <button\n          *ngFor=\"let date of calendarDays\"\n          type=\"button\"\n          class=\"calendar-day\"\n          [class.empty]=\"!date\"\n          [class.selected]=\"date && isDateSelected(date)\"\n          [class.in-range]=\"date && isDateInRange(date)\"\n          [class.range-start]=\"date && isRangeStart(date)\"\n          [class.range-end]=\"date && isRangeEnd(date)\"\n          [class.today]=\"date && isToday(date)\"\n          [class.disabled]=\"date && isDateDisabled(date)\"\n          [disabled]=\"!date || (date && isDateDisabled(date))\"\n          (click)=\"date && selectDate(date)\"\n          (mouseenter)=\"onDateHover(date)\"\n          (mouseleave)=\"onDateHover(null)\">\n          <span *ngIf=\"date\">{{ date.getDate() }}</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"calendar-footer\">\n      <button type=\"button\" class=\"footer-button secondary\" (click)=\"clearSelection()\">\n        Limpar\n      </button>\n      <button type=\"button\" class=\"footer-button primary\" (click)=\"selectToday()\">\n        Hoje\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".muxima-datepicker{position:relative;width:100%;max-width:320px}.datepicker-input{position:relative;display:flex;align-items:center;gap:.75rem;padding:.875rem 1rem;background:white;border:2px solid #e5e7eb;border-radius:12px;cursor:pointer;transition:all .3s ease}.datepicker-input:hover{border-color:#667eea;box-shadow:0 4px 12px #667eea1a}.datepicker-input:focus-within{border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.datepicker-input input{flex:1;border:none;outline:none;font-size:.95rem;color:#1f2937;background:transparent;cursor:pointer}.datepicker-input input::placeholder{color:#9ca3af}.datepicker-input .calendar-icon{width:20px;height:20px;color:#667eea;flex-shrink:0}.datepicker-input .chevron-icon{width:20px;height:20px;color:#9ca3af;transition:transform .3s ease;flex-shrink:0}.datepicker-input .chevron-icon.open{transform:rotate(180deg)}.datepicker-dropdown{position:absolute;top:calc(100% + .5rem);left:0;background:white;border-radius:16px;box-shadow:0 20px 60px #00000026;padding:1.5rem;z-index:9999;min-width:320px;animation:slideDown .3s ease-out;border:1px solid #e5e7eb}.calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:2px solid #f3f4f6}.month-year-label{font-size:1.125rem;font-weight:700;color:#1f2937;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.nav-button{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:none;background:rgba(102,126,234,.1);border-radius:10px;color:#667eea;cursor:pointer;transition:all .3s ease}.nav-button svg{width:20px;height:20px}.nav-button:hover{background:rgba(102,126,234,.2);transform:scale(1.1)}.nav-button:active{transform:scale(.95)}.calendar-grid{margin-bottom:1rem}.week-days{display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem;margin-bottom:.5rem}.week-day{text-align:center;font-size:.75rem;font-weight:700;color:#9ca3af;text-transform:uppercase;padding:.5rem 0}.calendar-days{display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem}.calendar-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border:none;background:transparent;border-radius:10px;font-size:.95rem;font-weight:600;color:#1f2937;cursor:pointer;transition:all .2s ease;position:relative}.calendar-day:not(.empty):hover:not(.disabled){background:rgba(102,126,234,.1);transform:scale(1.1)}.calendar-day.empty{cursor:default}.calendar-day.today:not(.selected){color:#667eea;font-weight:800}.calendar-day.today:not(.selected):after{content:\"\";position:absolute;bottom:4px;left:50%;transform:translate(-50%);width:4px;height:4px;background:#667eea;border-radius:50%}.calendar-day.selected{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;box-shadow:0 4px 12px #667eea66;transform:scale(1.05)}.calendar-day.in-range:not(.range-start):not(.range-end){background:rgba(102,126,234,.15);border-radius:0}.calendar-day.range-start{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-radius:10px 0 0 10px;box-shadow:0 4px 12px #667eea66}.calendar-day.range-end{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-radius:0 10px 10px 0;box-shadow:0 4px 12px #667eea66}.calendar-day.range-start.range-end{border-radius:10px}.calendar-day.disabled{color:#d1d5db;cursor:not-allowed}.calendar-day.disabled:hover{background:transparent;transform:none}.calendar-footer{display:flex;gap:.75rem;padding-top:1rem;border-top:2px solid #f3f4f6}.footer-button{flex:1;padding:.75rem 1rem;border:none;border-radius:10px;font-size:.95rem;font-weight:600;cursor:pointer;transition:all .3s ease}.footer-button.secondary{background:#f3f4f6;color:#6b7280}.footer-button.secondary:hover{background:#e5e7eb;transform:translateY(-2px)}.footer-button.primary{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;box-shadow:0 4px 12px #667eea4d}.footer-button.primary:hover{transform:translateY(-2px);box-shadow:0 6px 16px #667eea66}.footer-button:active{transform:translateY(0)}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@media (max-width: 480px){.datepicker-dropdown{min-width:280px;padding:1rem}.calendar-day{font-size:.875rem}.month-year-label{font-size:1rem}}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { mode: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], format: [{
                type: Input
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], dateSelect: [{
                type: Output
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { DatepickerDatepickerComponent };
//# sourceMappingURL=muxima-ui-datepicker.mjs.map
