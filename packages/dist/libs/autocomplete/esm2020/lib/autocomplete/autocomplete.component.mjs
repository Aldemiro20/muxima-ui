import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
export class AutocompleteComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2Zvcm0vYXV0b2NvbXBsZXRlL3NyYy9saWIvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mb3JtL2F1dG9jb21wbGV0ZS9zcmMvbGliL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBd0IsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFzQnRGLE1BQU0sT0FBTyxxQkFBcUI7SUFkbEM7UUFlVyxZQUFPLEdBQW9DLEVBQUUsQ0FBQztRQUM5QyxnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixpQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUNuQixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsaUJBQVksR0FBRyxrQkFBa0IsQ0FBQztRQUVqQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNwQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU3QyxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixvQkFBZSxHQUF5QixFQUFFLENBQUM7UUFDM0MscUJBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFHZCxhQUFRLEdBQXlCLEdBQUcs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VUFSckI7UUFDVDtZQUNFLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwRCxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsMEJDdEJILDJtRUFtREEscTVFRHRDWSxZQUFZLCtQQUFFLFdBQVc7NEZBV3hCLHFCQUFxQjtrQkFkakMsU0FBUzsrQkFDRSxxQkFBcUIsY0FDbkIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxhQUd6Qjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQzs0QkFDcEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7OEJBR1EsT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3Jtc01vZHVsZSwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9jb21wbGV0ZU9wdGlvbiB7XHJcbiAgdmFsdWU6IGFueTtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdXhpbWEtYXV0b2NvbXBsZXRlJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdXRvY29tcGxldGUuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF1dG9jb21wbGV0ZUNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IChzdHJpbmcgfCBBdXRvY29tcGxldGVPcHRpb24pW10gPSBbXTtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdTZWFyY2guLi4nO1xyXG4gIEBJbnB1dCgpIGRlYm91bmNlVGltZSA9IDMwMDtcclxuICBASW5wdXQoKSBtaW5DaGFycyA9IDE7XHJcbiAgQElucHV0KCkgbWF4UmVzdWx0cyA9IDEwO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbG9hZGluZyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGVtcHR5TWVzc2FnZSA9ICdObyByZXN1bHRzIGZvdW5kJztcclxuICBcclxuICBAT3V0cHV0KCkgc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgXHJcbiAgc2VhcmNoVGVybSA9ICcnO1xyXG4gIGlzT3BlbiA9IGZhbHNlO1xyXG4gIGZpbHRlcmVkT3B0aW9uczogQXV0b2NvbXBsZXRlT3B0aW9uW10gPSBbXTtcclxuICBoaWdobGlnaHRlZEluZGV4ID0gLTE7XHJcbiAgXHJcbiAgcHJpdmF0ZSBkZWJvdW5jZVRpbWVyOiBhbnk7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcclxuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuZmluZE9wdGlvbih2YWx1ZSk7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybSA9IG9wdGlvbiA/IG9wdGlvbi5sYWJlbCA6IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIG9uSW5wdXQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtID0gaW5wdXQudmFsdWU7XHJcbiAgICBcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmRlYm91bmNlVGltZXIpO1xyXG4gICAgXHJcbiAgICBpZiAodGhpcy5zZWFyY2hUZXJtLmxlbmd0aCA+PSB0aGlzLm1pbkNoYXJzKSB7XHJcbiAgICAgIHRoaXMuZGVib3VuY2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoLmVtaXQodGhpcy5zZWFyY2hUZXJtKTtcclxuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgIH0sIHRoaXMuZGVib3VuY2VUaW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJPcHRpb25zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGVybSA9IHRoaXMuc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgYWxsT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5tYXAob3B0ID0+IFxyXG4gICAgICB0eXBlb2Ygb3B0ID09PSAnc3RyaW5nJyA/IHsgdmFsdWU6IG9wdCwgbGFiZWw6IG9wdCB9IDogb3B0XHJcbiAgICApO1xyXG4gICAgXHJcbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IGFsbE9wdGlvbnNcclxuICAgICAgLmZpbHRlcihvcHQgPT4gb3B0LmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGVybSkpXHJcbiAgICAgIC5zbGljZSgwLCB0aGlzLm1heFJlc3VsdHMpO1xyXG4gICAgXHJcbiAgICB0aGlzLmhpZ2hsaWdodGVkSW5kZXggPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGggPiAwID8gMCA6IC0xO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0T3B0aW9uKG9wdGlvbjogQXV0b2NvbXBsZXRlT3B0aW9uKTogdm9pZCB7XHJcbiAgICBpZiAob3B0aW9uLmRpc2FibGVkKSByZXR1cm47XHJcbiAgICBcclxuICAgIHRoaXMuc2VhcmNoVGVybSA9IG9wdGlvbi5sYWJlbDtcclxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKG9wdGlvbi52YWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQob3B0aW9uLnZhbHVlKTtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93RG93bicpIHtcclxuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zKCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgY2FzZSAnQXJyb3dEb3duJzpcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkSW5kZXggPSBNYXRoLm1pbihcclxuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRJbmRleCArIDEsXHJcbiAgICAgICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGggLSAxXHJcbiAgICAgICAgKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBcclxuICAgICAgY2FzZSAnQXJyb3dVcCc6XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZEluZGV4ID0gTWF0aC5tYXgodGhpcy5oaWdobGlnaHRlZEluZGV4IC0gMSwgMCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgXHJcbiAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRlZEluZGV4ID49IDApIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKHRoaXMuZmlsdGVyZWRPcHRpb25zW3RoaXMuaGlnaGxpZ2h0ZWRJbmRleF0pO1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIFxyXG4gICAgICBjYXNlICdFc2NhcGUnOlxyXG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRm9jdXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zZWFyY2hUZXJtLmxlbmd0aCA+PSB0aGlzLm1pbkNoYXJzKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucygpO1xyXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkJsdXIoKTogdm9pZCB7XHJcbiAgICAvLyBEZWxheSB0byBhbGxvdyBjbGljayBvbiBvcHRpb25cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgfSwgMjAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZE9wdGlvbih2YWx1ZTogYW55KTogQXV0b2NvbXBsZXRlT3B0aW9uIHwgdW5kZWZpbmVkIHtcclxuICAgIGNvbnN0IGFsbE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKG9wdCA9PiBcclxuICAgICAgdHlwZW9mIG9wdCA9PT0gJ3N0cmluZycgPyB7IHZhbHVlOiBvcHQsIGxhYmVsOiBvcHQgfSA6IG9wdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBhbGxPcHRpb25zLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgaGlnaGxpZ2h0TWF0Y2godGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICghdGhpcy5zZWFyY2hUZXJtKSByZXR1cm4gdGV4dDtcclxuICAgIFxyXG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGAoJHt0aGlzLnNlYXJjaFRlcm19KWAsICdnaScpO1xyXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShyZWdleCwgJzxtYXJrPiQxPC9tYXJrPicpO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiYXV0b2NvbXBsZXRlLXdyYXBwZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwiYXV0b2NvbXBsZXRlLWlucHV0LWNvbnRhaW5lclwiPlxyXG4gICAgPGlucHV0XHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgY2xhc3M9XCJhdXRvY29tcGxldGUtaW5wdXRcIlxyXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICBbKG5nTW9kZWwpXT1cInNlYXJjaFRlcm1cIlxyXG4gICAgICAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQpXCJcclxuICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxyXG4gICAgICAoZm9jdXMpPVwib25Gb2N1cygpXCJcclxuICAgICAgKGJsdXIpPVwib25CbHVyKClcIlxyXG4gICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxyXG4gICAgICByb2xlPVwiY29tYm9ib3hcIlxyXG4gICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImlzT3BlblwiXHJcbiAgICAgIFthdHRyLmFyaWEtYXV0b2NvbXBsZXRlXT1cIidsaXN0J1wiXHJcbiAgICAvPlxyXG4gICAgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYXV0b2NvbXBsZXRlLWljb25zXCI+XHJcbiAgICAgIDxzdmcgKm5nSWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjNcIiBmaWxsPVwibm9uZVwiIC8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICBcclxuICAgICAgPHN2ZyAqbmdJZj1cIiFsb2FkaW5nICYmIHNlYXJjaFRlcm1cIiBjbGFzcz1cImNsZWFyLWljb25cIiAoY2xpY2spPVwic2VhcmNoVGVybSA9ICcnOyBpc09wZW4gPSBmYWxzZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICA8cGF0aCBkPVwiTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnpcIi8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICBcclxuICAgICAgPHN2ZyBjbGFzcz1cInNlYXJjaC1pY29uXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNMTUuNSAxNGgtLjc5bC0uMjgtLjI3QzE1LjQxIDEyLjU5IDE2IDExLjExIDE2IDkuNSAxNiA1LjkxIDEzLjA5IDMgOS41IDNTMyA1LjkxIDMgOS41IDUuOTEgMTYgOS41IDE2YzEuNjEgMCAzLjA5LS41OSA0LjIzLTEuNTdsLjI3LjI4di43OWw1IDQuOTlMMjAuNDkgMTlsLTQuOTktNXptLTYgMEM3LjAxIDE0IDUgMTEuOTkgNSA5LjVTNy4wMSA1IDkuNSA1IDE0IDcuMDEgMTQgOS41IDExLjk5IDE0IDkuNSAxNHpcIi8+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJhdXRvY29tcGxldGUtZHJvcGRvd25cIiAqbmdJZj1cImlzT3BlblwiIHJvbGU9XCJsaXN0Ym94XCI+XHJcbiAgICA8ZGl2XHJcbiAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyZWRPcHRpb25zOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgY2xhc3M9XCJhdXRvY29tcGxldGUtb3B0aW9uXCJcclxuICAgICAgW2NsYXNzLmhpZ2hsaWdodGVkXT1cImkgPT09IGhpZ2hsaWdodGVkSW5kZXhcIlxyXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCJcclxuICAgICAgKGNsaWNrKT1cInNlbGVjdE9wdGlvbihvcHRpb24pXCJcclxuICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaSA9PT0gaGlnaGxpZ2h0ZWRJbmRleFwiXHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiaGlnaGxpZ2h0TWF0Y2gob3B0aW9uLmxhYmVsKVwiPjwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXJlZE9wdGlvbnMubGVuZ3RoID09PSAwICYmICFsb2FkaW5nXCIgY2xhc3M9XCJhdXRvY29tcGxldGUtZW1wdHlcIj5cclxuICAgICAge3sgZW1wdHlNZXNzYWdlIH19XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==