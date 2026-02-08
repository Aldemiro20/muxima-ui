import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class ToggleToggleComponent implements ControlValueAccessor {
    checked: boolean;
    disabled: boolean;
    size: 'sm' | 'md' | 'lg';
    color: 'primary' | 'success' | 'warning' | 'error';
    label?: string;
    checkedChange: EventEmitter<boolean>;
    onChange: any;
    onTouched: any;
    toggle(): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggleToggleComponent, "muxima-toggle", never, { "checked": "checked"; "disabled": "disabled"; "size": "size"; "color": "color"; "label": "label"; }, { "checkedChange": "checkedChange"; }, never, never, true, never>;
}
