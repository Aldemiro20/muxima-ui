import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class RadioButtonComponent implements ControlValueAccessor {
    value: any;
    name: string;
    label: string;
    description: string;
    disabled: boolean;
    size: 'sm' | 'md' | 'lg';
    color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    required: boolean;
    valueChange: EventEmitter<any>;
    private selectedValue;
    private onChange;
    private onTouched;
    get isChecked(): boolean;
    selectRadio(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    getWrapperClasses(): string[];
    getRadioClasses(): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RadioButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RadioButtonComponent, "muxima-radio-button", never, { "value": "value"; "name": "name"; "label": "label"; "description": "description"; "disabled": "disabled"; "size": "size"; "color": "color"; "required": "required"; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
