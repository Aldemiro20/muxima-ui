import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export interface MultiSelectOption {
    value: any;
    label: string;
    disabled?: boolean;
}
export declare class MultiSelectComponent implements ControlValueAccessor {
    options: (string | MultiSelectOption)[];
    placeholder: string;
    maxSelections?: number;
    disabled: boolean;
    searchable: boolean;
    clearable: boolean;
    selectionChange: EventEmitter<any[]>;
    selectedValues: any[];
    isOpen: boolean;
    searchTerm: string;
    filteredOptions: MultiSelectOption[];
    private onChange;
    private onTouched;
    ngOnInit(): void;
    writeValue(value: any[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    toggleDropdown(): void;
    toggleOption(option: MultiSelectOption): void;
    isSelected(option: MultiSelectOption): boolean;
    removeTag(value: any, event: Event): void;
    clearAll(event: Event): void;
    onSearch(event: Event): void;
    updateFilteredOptions(): void;
    getOptionLabel(value: any): string;
    onBlur(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiSelectComponent, "muxima-multi-select", never, { "options": "options"; "placeholder": "placeholder"; "maxSelections": "maxSelections"; "disabled": "disabled"; "searchable": "searchable"; "clearable": "clearable"; }, { "selectionChange": "selectionChange"; }, never, never, true, never>;
}
