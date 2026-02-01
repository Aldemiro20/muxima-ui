import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

class AutocompleteComponent {
    constructor() {
        this.options = [];
        this.placeholder = 'Search...';
        this.debounceTime = 300;
        this.minChars = 1;
        this.maxResults = 10;
        this.disabled = false;
        this.loading = false;
        this.emptyMessage = 'No results found';
        this.search = new EventEmitter();
        this.selected = new EventEmitter();
        this.searchTerm = '';
        this.isOpen = false;
        this.filteredOptions = [];
        this.highlightedIndex = -1;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        if (value !== undefined) {
            const option = this.findOption(value);
            this.searchTerm = option ? option.label : value;
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
    onInput(event) {
        const input = event.target;
        this.searchTerm = input.value;
        clearTimeout(this.debounceTimer);
        if (this.searchTerm.length >= this.minChars) {
            this.debounceTimer = setTimeout(() => {
                this.filterOptions();
                this.search.emit(this.searchTerm);
                this.isOpen = true;
            }, this.debounceTime);
        }
        else {
            this.isOpen = false;
            this.filteredOptions = [];
        }
    }
    filterOptions() {
        const term = this.searchTerm.toLowerCase();
        const allOptions = this.options.map(opt => typeof opt === 'string' ? { value: opt, label: opt } : opt);
        this.filteredOptions = allOptions
            .filter(opt => opt.label.toLowerCase().includes(term))
            .slice(0, this.maxResults);
        this.highlightedIndex = this.filteredOptions.length > 0 ? 0 : -1;
    }
    selectOption(option) {
        if (option.disabled)
            return;
        this.searchTerm = option.label;
        this.isOpen = false;
        this.onChange(option.value);
        this.selected.emit(option.value);
        this.onTouched();
    }
    onKeyDown(event) {
        if (!this.isOpen) {
            if (event.key === 'ArrowDown') {
                this.isOpen = true;
                this.filterOptions();
                event.preventDefault();
            }
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredOptions.length - 1);
                event.preventDefault();
                break;
            case 'ArrowUp':
                this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
                event.preventDefault();
                break;
            case 'Enter':
                if (this.highlightedIndex >= 0) {
                    this.selectOption(this.filteredOptions[this.highlightedIndex]);
                    event.preventDefault();
                }
                break;
            case 'Escape':
                this.isOpen = false;
                event.preventDefault();
                break;
        }
    }
    onFocus() {
        if (this.searchTerm.length >= this.minChars) {
            this.filterOptions();
            this.isOpen = true;
        }
    }
    onBlur() {
        // Delay to allow click on option
        setTimeout(() => {
            this.isOpen = false;
            this.onTouched();
        }, 200);
    }
    findOption(value) {
        const allOptions = this.options.map(opt => typeof opt === 'string' ? { value: opt, label: opt } : opt);
        return allOptions.find(opt => opt.value === value);
    }
    highlightMatch(text) {
        if (!this.searchTerm)
            return text;
        const regex = new RegExp(`(${this.searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
}
AutocompleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AutocompleteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AutocompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: AutocompleteComponent, isStandalone: true, selector: "muxima-autocomplete", inputs: { options: "options", placeholder: "placeholder", debounceTime: "debounceTime", minChars: "minChars", maxResults: "maxResults", disabled: "disabled", loading: "loading", emptyMessage: "emptyMessage" }, outputs: { search: "search", selected: "selected" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutocompleteComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"autocomplete-wrapper\">\r\n  <div class=\"autocomplete-input-container\">\r\n    <input\r\n      type=\"text\"\r\n      class=\"autocomplete-input\"\r\n      [placeholder]=\"placeholder\"\r\n      [disabled]=\"disabled\"\r\n      [(ngModel)]=\"searchTerm\"\r\n      (input)=\"onInput($event)\"\r\n      (keydown)=\"onKeyDown($event)\"\r\n      (focus)=\"onFocus()\"\r\n      (blur)=\"onBlur()\"\r\n      autocomplete=\"off\"\r\n      role=\"combobox\"\r\n      [attr.aria-expanded]=\"isOpen\"\r\n      [attr.aria-autocomplete]=\"'list'\"\r\n    />\r\n    \r\n    <div class=\"autocomplete-icons\">\r\n      <svg *ngIf=\"loading\" class=\"loading-spinner\" viewBox=\"0 0 24 24\">\r\n        <circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"3\" fill=\"none\" />\r\n      </svg>\r\n      \r\n      <svg *ngIf=\"!loading && searchTerm\" class=\"clear-icon\" (click)=\"searchTerm = ''; isOpen = false\" viewBox=\"0 0 24 24\">\r\n        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n      </svg>\r\n      \r\n      <svg class=\"search-icon\" viewBox=\"0 0 24 24\">\r\n        <path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"autocomplete-dropdown\" *ngIf=\"isOpen\" role=\"listbox\">\r\n    <div\r\n      *ngFor=\"let option of filteredOptions; let i = index\"\r\n      class=\"autocomplete-option\"\r\n      [class.highlighted]=\"i === highlightedIndex\"\r\n      [class.disabled]=\"option.disabled\"\r\n      (click)=\"selectOption(option)\"\r\n      role=\"option\"\r\n      [attr.aria-selected]=\"i === highlightedIndex\"\r\n    >\r\n      <span [innerHTML]=\"highlightMatch(option.label)\"></span>\r\n    </div>\r\n\r\n    <div *ngIf=\"filteredOptions.length === 0 && !loading\" class=\"autocomplete-empty\">\r\n      {{ emptyMessage }}\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".autocomplete-wrapper{position:relative;width:100%}.autocomplete-input-container{position:relative;display:flex;align-items:center}.autocomplete-input{width:100%;padding:12px 48px 12px 16px;font-size:16px;line-height:1.5;color:#1f2937;background:white;border:2px solid #e5e7eb;border-radius:12px;outline:none;transition:all .3s cubic-bezier(.4,0,.2,1)}.autocomplete-input:hover:not(:disabled){border-color:#667eea}.autocomplete-input:focus{border-color:#667eea;box-shadow:0 0 0 4px #667eea1a}.autocomplete-input:disabled{background:#f3f4f6;color:#9ca3af;cursor:not-allowed}.autocomplete-input::placeholder{color:#9ca3af}.autocomplete-icons{position:absolute;right:12px;display:flex;align-items:center;gap:8px}.autocomplete-icons svg{width:20px;height:20px;fill:#6b7280;transition:all .2s ease}.search-icon{pointer-events:none}.clear-icon{cursor:pointer}.clear-icon:hover{fill:#ef4444}.loading-spinner{animation:spin 1s linear infinite;stroke:#667eea}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.autocomplete-dropdown{position:absolute;top:calc(100% + 8px);left:0;right:0;max-height:320px;overflow-y:auto;background:white;border:2px solid #e5e7eb;border-radius:12px;box-shadow:0 10px 25px -5px #0000001a,0 8px 10px -6px #0000001a;z-index:1000;animation:slideDown .2s cubic-bezier(.4,0,.2,1)}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.autocomplete-dropdown::-webkit-scrollbar{width:8px}.autocomplete-dropdown::-webkit-scrollbar-track{background:#f3f4f6;border-radius:12px}.autocomplete-dropdown::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px}.autocomplete-option{padding:12px 16px;cursor:pointer;transition:all .2s ease;color:#1f2937;font-size:15px}.autocomplete-option:first-child{border-radius:10px 10px 0 0}.autocomplete-option:last-child{border-radius:0 0 10px 10px}.autocomplete-option.highlighted,.autocomplete-option:hover:not(.disabled){background:linear-gradient(135deg,rgba(102,126,234,.1) 0%,rgba(118,75,162,.1) 100%);color:#667eea}.autocomplete-option.disabled{color:#9ca3af;cursor:not-allowed;opacity:.5}.autocomplete-option ::ng-deep mark{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:2px 4px;border-radius:4px;font-weight:600}.autocomplete-empty{padding:24px 16px;text-align:center;color:#9ca3af;font-size:15px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-autocomplete', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AutocompleteComponent),
                            multi: true
                        }
                    ], template: "<div class=\"autocomplete-wrapper\">\r\n  <div class=\"autocomplete-input-container\">\r\n    <input\r\n      type=\"text\"\r\n      class=\"autocomplete-input\"\r\n      [placeholder]=\"placeholder\"\r\n      [disabled]=\"disabled\"\r\n      [(ngModel)]=\"searchTerm\"\r\n      (input)=\"onInput($event)\"\r\n      (keydown)=\"onKeyDown($event)\"\r\n      (focus)=\"onFocus()\"\r\n      (blur)=\"onBlur()\"\r\n      autocomplete=\"off\"\r\n      role=\"combobox\"\r\n      [attr.aria-expanded]=\"isOpen\"\r\n      [attr.aria-autocomplete]=\"'list'\"\r\n    />\r\n    \r\n    <div class=\"autocomplete-icons\">\r\n      <svg *ngIf=\"loading\" class=\"loading-spinner\" viewBox=\"0 0 24 24\">\r\n        <circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"3\" fill=\"none\" />\r\n      </svg>\r\n      \r\n      <svg *ngIf=\"!loading && searchTerm\" class=\"clear-icon\" (click)=\"searchTerm = ''; isOpen = false\" viewBox=\"0 0 24 24\">\r\n        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n      </svg>\r\n      \r\n      <svg class=\"search-icon\" viewBox=\"0 0 24 24\">\r\n        <path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"autocomplete-dropdown\" *ngIf=\"isOpen\" role=\"listbox\">\r\n    <div\r\n      *ngFor=\"let option of filteredOptions; let i = index\"\r\n      class=\"autocomplete-option\"\r\n      [class.highlighted]=\"i === highlightedIndex\"\r\n      [class.disabled]=\"option.disabled\"\r\n      (click)=\"selectOption(option)\"\r\n      role=\"option\"\r\n      [attr.aria-selected]=\"i === highlightedIndex\"\r\n    >\r\n      <span [innerHTML]=\"highlightMatch(option.label)\"></span>\r\n    </div>\r\n\r\n    <div *ngIf=\"filteredOptions.length === 0 && !loading\" class=\"autocomplete-empty\">\r\n      {{ emptyMessage }}\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".autocomplete-wrapper{position:relative;width:100%}.autocomplete-input-container{position:relative;display:flex;align-items:center}.autocomplete-input{width:100%;padding:12px 48px 12px 16px;font-size:16px;line-height:1.5;color:#1f2937;background:white;border:2px solid #e5e7eb;border-radius:12px;outline:none;transition:all .3s cubic-bezier(.4,0,.2,1)}.autocomplete-input:hover:not(:disabled){border-color:#667eea}.autocomplete-input:focus{border-color:#667eea;box-shadow:0 0 0 4px #667eea1a}.autocomplete-input:disabled{background:#f3f4f6;color:#9ca3af;cursor:not-allowed}.autocomplete-input::placeholder{color:#9ca3af}.autocomplete-icons{position:absolute;right:12px;display:flex;align-items:center;gap:8px}.autocomplete-icons svg{width:20px;height:20px;fill:#6b7280;transition:all .2s ease}.search-icon{pointer-events:none}.clear-icon{cursor:pointer}.clear-icon:hover{fill:#ef4444}.loading-spinner{animation:spin 1s linear infinite;stroke:#667eea}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.autocomplete-dropdown{position:absolute;top:calc(100% + 8px);left:0;right:0;max-height:320px;overflow-y:auto;background:white;border:2px solid #e5e7eb;border-radius:12px;box-shadow:0 10px 25px -5px #0000001a,0 8px 10px -6px #0000001a;z-index:1000;animation:slideDown .2s cubic-bezier(.4,0,.2,1)}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.autocomplete-dropdown::-webkit-scrollbar{width:8px}.autocomplete-dropdown::-webkit-scrollbar-track{background:#f3f4f6;border-radius:12px}.autocomplete-dropdown::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px}.autocomplete-option{padding:12px 16px;cursor:pointer;transition:all .2s ease;color:#1f2937;font-size:15px}.autocomplete-option:first-child{border-radius:10px 10px 0 0}.autocomplete-option:last-child{border-radius:0 0 10px 10px}.autocomplete-option.highlighted,.autocomplete-option:hover:not(.disabled){background:linear-gradient(135deg,rgba(102,126,234,.1) 0%,rgba(118,75,162,.1) 100%);color:#667eea}.autocomplete-option.disabled{color:#9ca3af;cursor:not-allowed;opacity:.5}.autocomplete-option ::ng-deep mark{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:2px 4px;border-radius:4px;font-weight:600}.autocomplete-empty{padding:24px 16px;text-align:center;color:#9ca3af;font-size:15px}\n"] }]
        }], propDecorators: { options: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], debounceTime: [{
                type: Input
            }], minChars: [{
                type: Input
            }], maxResults: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loading: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], search: [{
                type: Output
            }], selected: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { AutocompleteComponent };
//# sourceMappingURL=muxima-ui-autocomplete.mjs.map
