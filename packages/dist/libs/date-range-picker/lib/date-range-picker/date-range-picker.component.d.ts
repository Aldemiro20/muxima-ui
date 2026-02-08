import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export interface DateRange {
    start: Date | null;
    end: Date | null;
}
export interface DateRangePreset {
    label: string;
    range: DateRange;
}
export declare class DateRangePickerComponent implements ControlValueAccessor {
    minDate?: Date;
    maxDate?: Date;
    disabled: boolean;
    showPresets: boolean;
    rangeSelected: EventEmitter<DateRange>;
    selectedRange: DateRange;
    isOpen: boolean;
    currentMonth: Date;
    selectingStart: boolean;
    presets: DateRangePreset[];
    private onChange;
    private onTouched;
    writeValue(value: DateRange): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    togglePicker(): void;
    selectDate(date: Date): void;
    selectPreset(preset: DateRangePreset): void;
    getDaysInMonth(): Date[];
    previousMonth(): void;
    nextMonth(): void;
    isInRange(date: Date): boolean;
    isStartDate(date: Date): boolean;
    isEndDate(date: Date): boolean;
    formatRange(): string;
    private formatDate;
    private emitValue;
    private getTodayRange;
    private getYesterdayRange;
    private getLast7DaysRange;
    private getLast30DaysRange;
    private getThisMonthRange;
    private getLastMonthRange;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateRangePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateRangePickerComponent, "muxima-date-range-picker", never, { "minDate": "minDate"; "maxDate": "maxDate"; "disabled": "disabled"; "showPresets": "showPresets"; }, { "rangeSelected": "rangeSelected"; }, never, never, true, never>;
}
