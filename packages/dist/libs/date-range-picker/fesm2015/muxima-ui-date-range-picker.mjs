import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class DateRangePickerComponent {
    constructor() {
        this.disabled = false;
        this.showPresets = true;
        this.rangeSelected = new EventEmitter();
        this.selectedRange = { start: null, end: null };
        this.isOpen = false;
        this.currentMonth = new Date();
        this.selectingStart = true;
        this.presets = [
            { label: 'Hoje', range: this.getTodayRange() },
            { label: 'Ontem', range: this.getYesterdayRange() },
            { label: 'Últimos 7 dias', range: this.getLast7DaysRange() },
            { label: 'Últimos 30 dias', range: this.getLast30DaysRange() },
            { label: 'Este mês', range: this.getThisMonthRange() },
            { label: 'Mês passado', range: this.getLastMonthRange() }
        ];
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        if (value) {
            this.selectedRange = value;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    togglePicker() {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
        }
    }
    selectDate(date) {
        if (this.selectingStart) {
            this.selectedRange.start = date;
            this.selectedRange.end = null;
            this.selectingStart = false;
        }
        else {
            if (date < this.selectedRange.start) {
                this.selectedRange.end = this.selectedRange.start;
                this.selectedRange.start = date;
            }
            else {
                this.selectedRange.end = date;
            }
            this.selectingStart = true;
            this.emitValue();
        }
    }
    selectPreset(preset) {
        this.selectedRange = Object.assign({}, preset.range);
        this.emitValue();
        this.isOpen = false;
    }
    getDaysInMonth() {
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    }
    previousMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
    }
    nextMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
    }
    isInRange(date) {
        if (!this.selectedRange.start || !this.selectedRange.end)
            return false;
        return date >= this.selectedRange.start && date <= this.selectedRange.end;
    }
    isStartDate(date) {
        var _a;
        return ((_a = this.selectedRange.start) === null || _a === void 0 ? void 0 : _a.toDateString()) === date.toDateString();
    }
    isEndDate(date) {
        var _a;
        return ((_a = this.selectedRange.end) === null || _a === void 0 ? void 0 : _a.toDateString()) === date.toDateString();
    }
    formatRange() {
        const start = this.selectedRange.start;
        const end = this.selectedRange.end;
        if (!start && !end)
            return 'Selecione um período';
        if (start && !end)
            return this.formatDate(start) + ' - ...';
        if (start && end)
            return this.formatDate(start) + ' - ' + this.formatDate(end);
        return 'Selecione um período';
    }
    formatDate(date) {
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    emitValue() {
        this.onChange(this.selectedRange);
        this.rangeSelected.emit(this.selectedRange);
        this.onTouched();
    }
    getTodayRange() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return { start: today, end: today };
    }
    getYesterdayRange() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        return { start: yesterday, end: yesterday };
    }
    getLast7DaysRange() {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 7);
        return { start, end };
    }
    getLast30DaysRange() {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        return { start, end };
    }
    getThisMonthRange() {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { start, end };
    }
    getLastMonthRange() {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return { start, end };
    }
}
DateRangePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DateRangePickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DateRangePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: DateRangePickerComponent, isStandalone: true, selector: "muxima-date-range-picker", inputs: { minDate: "minDate", maxDate: "maxDate", disabled: "disabled", showPresets: "showPresets" }, outputs: { rangeSelected: "rangeSelected" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateRangePickerComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"date-range-picker-wrapper\">\r\n  <div class=\"picker-input\" (click)=\"togglePicker()\" [class.disabled]=\"disabled\">\r\n    <svg class=\"calendar-icon\" viewBox=\"0 0 24 24\">\r\n      <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\r\n    </svg>\r\n    <span class=\"selected-range\">{{ formatRange() }}</span>\r\n    <svg class=\"arrow-icon\" [class.open]=\"isOpen\" viewBox=\"0 0 24 24\">\r\n      <path d=\"M7 10l5 5 5-5z\"/>\r\n    </svg>\r\n  </div>\r\n\r\n  <div class=\"picker-dropdown\" *ngIf=\"isOpen\">\r\n    <div class=\"picker-layout\">\r\n      <div *ngIf=\"showPresets\" class=\"presets-panel\">\r\n        <h3 class=\"presets-title\">Per\u00EDodos</h3>\r\n        <button\r\n          *ngFor=\"let preset of presets\"\r\n          class=\"preset-btn\"\r\n          (click)=\"selectPreset(preset)\"\r\n        >\r\n          {{ preset.label }}\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"calendar-panel\">\r\n        <div class=\"calendar-header\">\r\n          <button class=\"nav-btn\" (click)=\"previousMonth()\">\r\n            <svg viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/></svg>\r\n          </button>\r\n          <span class=\"month-year\">\r\n            {{ currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) }}\r\n          </span>\r\n          <button class=\"nav-btn\" (click)=\"nextMonth()\">\r\n            <svg viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg>\r\n          </button>\r\n        </div>\r\n\r\n        <div class=\"calendar-grid\">\r\n          <div class=\"weekday\" *ngFor=\"let day of ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S\u00E1b']\">\r\n            {{ day }}\r\n          </div>\r\n          \r\n          <button\r\n            *ngFor=\"let date of getDaysInMonth()\"\r\n            class=\"day-cell\"\r\n            [class.in-range]=\"isInRange(date)\"\r\n            [class.start-date]=\"isStartDate(date)\"\r\n            [class.end-date]=\"isEndDate(date)\"\r\n            (click)=\"selectDate(date)\"\r\n          >\r\n            {{ date.getDate() }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".date-range-picker-wrapper{position:relative;width:100%}.picker-input{display:flex;align-items:center;gap:12px;padding:12px 16px;background:white;border:2px solid #e5e7eb;border-radius:12px;cursor:pointer;transition:all .3s ease}.picker-input:hover:not(.disabled){border-color:#667eea}.picker-input.disabled{background:#f3f4f6;cursor:not-allowed;opacity:.6}.calendar-icon,.arrow-icon{width:20px;height:20px;fill:#6b7280}.arrow-icon{margin-left:auto;transition:transform .3s ease}.arrow-icon.open{transform:rotate(180deg)}.selected-range{flex:1;color:#1f2937;font-size:15px}.picker-dropdown{position:absolute;top:calc(100% + 8px);left:0;background:white;border:2px solid #e5e7eb;border-radius:16px;box-shadow:0 20px 25px -5px #0000001a;z-index:1000;animation:slideDown .2s ease}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.picker-layout{display:flex}.presets-panel{width:180px;padding:16px;border-right:2px solid #e5e7eb}.presets-title{font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;margin:0 0 12px;letter-spacing:.5px}.preset-btn{display:block;width:100%;padding:10px 12px;margin-bottom:6px;background:transparent;border:none;border-radius:8px;text-align:left;font-size:14px;color:#374151;cursor:pointer;transition:all .2s ease}.preset-btn:hover{background:linear-gradient(135deg,rgba(102,126,234,.1) 0%,rgba(118,75,162,.1) 100%);color:#667eea;font-weight:600}.calendar-panel{padding:20px;width:320px}.calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}.nav-btn{width:32px;height:32px;border:none;background:transparent;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease}.nav-btn:hover{background:#f3f4f6}.nav-btn svg{width:20px;height:20px;fill:#6b7280}.month-year{font-size:16px;font-weight:700;color:#1f2937;text-transform:capitalize}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.weekday{text-align:center;padding:8px 0;font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase}.day-cell{aspect-ratio:1;border:none;background:transparent;border-radius:8px;cursor:pointer;font-size:14px;color:#374151;transition:all .2s ease;position:relative}.day-cell:hover{background:#f3f4f6}.day-cell.in-range{background:linear-gradient(135deg,rgba(102,126,234,.15) 0%,rgba(118,75,162,.15) 100%);color:#667eea}.day-cell.start-date,.day-cell.end-date{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;font-weight:700}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DateRangePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-date-range-picker', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DateRangePickerComponent),
                            multi: true
                        }
                    ], template: "<div class=\"date-range-picker-wrapper\">\r\n  <div class=\"picker-input\" (click)=\"togglePicker()\" [class.disabled]=\"disabled\">\r\n    <svg class=\"calendar-icon\" viewBox=\"0 0 24 24\">\r\n      <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\r\n    </svg>\r\n    <span class=\"selected-range\">{{ formatRange() }}</span>\r\n    <svg class=\"arrow-icon\" [class.open]=\"isOpen\" viewBox=\"0 0 24 24\">\r\n      <path d=\"M7 10l5 5 5-5z\"/>\r\n    </svg>\r\n  </div>\r\n\r\n  <div class=\"picker-dropdown\" *ngIf=\"isOpen\">\r\n    <div class=\"picker-layout\">\r\n      <div *ngIf=\"showPresets\" class=\"presets-panel\">\r\n        <h3 class=\"presets-title\">Per\u00EDodos</h3>\r\n        <button\r\n          *ngFor=\"let preset of presets\"\r\n          class=\"preset-btn\"\r\n          (click)=\"selectPreset(preset)\"\r\n        >\r\n          {{ preset.label }}\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"calendar-panel\">\r\n        <div class=\"calendar-header\">\r\n          <button class=\"nav-btn\" (click)=\"previousMonth()\">\r\n            <svg viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/></svg>\r\n          </button>\r\n          <span class=\"month-year\">\r\n            {{ currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) }}\r\n          </span>\r\n          <button class=\"nav-btn\" (click)=\"nextMonth()\">\r\n            <svg viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg>\r\n          </button>\r\n        </div>\r\n\r\n        <div class=\"calendar-grid\">\r\n          <div class=\"weekday\" *ngFor=\"let day of ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S\u00E1b']\">\r\n            {{ day }}\r\n          </div>\r\n          \r\n          <button\r\n            *ngFor=\"let date of getDaysInMonth()\"\r\n            class=\"day-cell\"\r\n            [class.in-range]=\"isInRange(date)\"\r\n            [class.start-date]=\"isStartDate(date)\"\r\n            [class.end-date]=\"isEndDate(date)\"\r\n            (click)=\"selectDate(date)\"\r\n          >\r\n            {{ date.getDate() }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".date-range-picker-wrapper{position:relative;width:100%}.picker-input{display:flex;align-items:center;gap:12px;padding:12px 16px;background:white;border:2px solid #e5e7eb;border-radius:12px;cursor:pointer;transition:all .3s ease}.picker-input:hover:not(.disabled){border-color:#667eea}.picker-input.disabled{background:#f3f4f6;cursor:not-allowed;opacity:.6}.calendar-icon,.arrow-icon{width:20px;height:20px;fill:#6b7280}.arrow-icon{margin-left:auto;transition:transform .3s ease}.arrow-icon.open{transform:rotate(180deg)}.selected-range{flex:1;color:#1f2937;font-size:15px}.picker-dropdown{position:absolute;top:calc(100% + 8px);left:0;background:white;border:2px solid #e5e7eb;border-radius:16px;box-shadow:0 20px 25px -5px #0000001a;z-index:1000;animation:slideDown .2s ease}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.picker-layout{display:flex}.presets-panel{width:180px;padding:16px;border-right:2px solid #e5e7eb}.presets-title{font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;margin:0 0 12px;letter-spacing:.5px}.preset-btn{display:block;width:100%;padding:10px 12px;margin-bottom:6px;background:transparent;border:none;border-radius:8px;text-align:left;font-size:14px;color:#374151;cursor:pointer;transition:all .2s ease}.preset-btn:hover{background:linear-gradient(135deg,rgba(102,126,234,.1) 0%,rgba(118,75,162,.1) 100%);color:#667eea;font-weight:600}.calendar-panel{padding:20px;width:320px}.calendar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}.nav-btn{width:32px;height:32px;border:none;background:transparent;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease}.nav-btn:hover{background:#f3f4f6}.nav-btn svg{width:20px;height:20px;fill:#6b7280}.month-year{font-size:16px;font-weight:700;color:#1f2937;text-transform:capitalize}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.weekday{text-align:center;padding:8px 0;font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase}.day-cell{aspect-ratio:1;border:none;background:transparent;border-radius:8px;cursor:pointer;font-size:14px;color:#374151;transition:all .2s ease;position:relative}.day-cell:hover{background:#f3f4f6}.day-cell.in-range{background:linear-gradient(135deg,rgba(102,126,234,.15) 0%,rgba(118,75,162,.15) 100%);color:#667eea}.day-cell.start-date,.day-cell.end-date{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;font-weight:700}\n"] }]
        }], propDecorators: { minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showPresets: [{
                type: Input
            }], rangeSelected: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { DateRangePickerComponent };
//# sourceMappingURL=muxima-ui-date-range-picker.mjs.map
