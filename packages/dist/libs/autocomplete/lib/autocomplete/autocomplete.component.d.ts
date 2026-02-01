import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export interface AutocompleteOption {
    value: any;
    label: string;
    disabled?: boolean;
}
export declare class AutocompleteComponent implements ControlValueAccessor {
    options: (string | AutocompleteOption)[];
    placeholder: string;
    debounceTime: number;
    minChars: number;
    maxResults: number;
    disabled: boolean;
    loading: boolean;
    emptyMessage: string;
    search: EventEmitter<string>;
    selected: EventEmitter<any>;
    searchTerm: string;
    isOpen: boolean;
    filteredOptions: AutocompleteOption[];
    highlightedIndex: number;
    private debounceTimer;
    private onChange;
    private onTouched;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    onInput(event: Event): void;
    filterOptions(): void;
    selectOption(option: AutocompleteOption): void;
    onKeyDown(event: KeyboardEvent): void;
    onFocus(): void;
    onBlur(): void;
    private findOption;
    highlightMatch(text: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteComponent, "muxima-autocomplete", never, { "options": "options"; "placeholder": "placeholder"; "debounceTime": "debounceTime"; "minChars": "minChars"; "maxResults": "maxResults"; "disabled": "disabled"; "loading": "loading"; "emptyMessage": "emptyMessage"; }, { "search": "search"; "selected": "selected"; }, never, never, true, never>;
}
