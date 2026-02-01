import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class CheckboxComponent implements ControlValueAccessor {
    checked: boolean;
    disabled: boolean;
    label: string;
    description: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    variant: 'default' | 'primary' | 'success' | 'danger' | 'warning';
    indeterminate: boolean;
    checkedChange: EventEmitter<boolean>;
    private onChange;
    private onTouched;
    getClasses(): string[];
    getWrapperClasses(): string[];
    toggleCheck(): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxComponent, "muxima-checkbox", never, { "checked": "checked"; "disabled": "disabled"; "label": "label"; "description": "description"; "size": "size"; "variant": "variant"; "indeterminate": "indeterminate"; }, { "checkedChange": "checkedChange"; }, never, never, true, never>;
}
