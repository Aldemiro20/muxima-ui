import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

class MultiSelectComponent {
    constructor() {
        this.options = [];
        this.placeholder = 'Select items...';
        this.disabled = false;
        this.searchable = true;
        this.clearable = true;
        this.selectionChange = new EventEmitter();
        this.selectedValues = [];
        this.isOpen = false;
        this.searchTerm = '';
        this.filteredOptions = [];
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    ngOnInit() {
        this.updateFilteredOptions();
    }
    writeValue(value) {
        this.selectedValues = value || [];
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
    toggleDropdown() {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.updateFilteredOptions();
            }
        }
    }
    toggleOption(option) {
        if (option.disabled)
            return;
        const index = this.selectedValues.findIndex(v => v === option.value);
        if (index >= 0) {
            this.selectedValues.splice(index, 1);
        }
        else {
            if (!this.maxSelections || this.selectedValues.length < this.maxSelections) {
                this.selectedValues.push(option.value);
            }
        }
        this.onChange(this.selectedValues);
        this.selectionChange.emit(this.selectedValues);
    }
    isSelected(option) {
        return this.selectedValues.includes(option.value);
    }
    removeTag(value, event) {
        event.stopPropagation();
        const index = this.selectedValues.findIndex(v => v === value);
        if (index >= 0) {
            this.selectedValues.splice(index, 1);
            this.onChange(this.selectedValues);
            this.selectionChange.emit(this.selectedValues);
        }
    }
    clearAll(event) {
        event.stopPropagation();
        this.selectedValues = [];
        this.onChange(this.selectedValues);
        this.selectionChange.emit(this.selectedValues);
    }
    onSearch(event) {
        const input = event.target;
        this.searchTerm = input.value;
        this.updateFilteredOptions();
    }
    updateFilteredOptions() {
        const allOptions = this.options.map(opt => typeof opt === 'string' ? { value: opt, label: opt } : opt);
        if (!this.searchTerm) {
            this.filteredOptions = allOptions;
        }
        else {
            const term = this.searchTerm.toLowerCase();
            this.filteredOptions = allOptions.filter(opt => opt.label.toLowerCase().includes(term));
        }
    }
    getOptionLabel(value) {
        const allOptions = this.options.map(opt => typeof opt === 'string' ? { value: opt, label: opt } : opt);
        const option = allOptions.find(opt => opt.value === value);
        return option ? option.label : value;
    }
    onBlur() {
        setTimeout(() => {
            this.isOpen = false;
            this.onTouched();
        }, 200);
    }
}
MultiSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MultiSelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MultiSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MultiSelectComponent, isStandalone: true, selector: "muxima-multi-select", inputs: { options: "options", placeholder: "placeholder", maxSelections: "maxSelections", disabled: "disabled", searchable: "searchable", clearable: "clearable" }, outputs: { selectionChange: "selectionChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"multi-select-wrapper\" (blur)=\"onBlur()\">\r\n  <div class=\"multi-select-container\" (click)=\"toggleDropdown()\" [class.disabled]=\"disabled\" [class.open]=\"isOpen\">\r\n    <div class=\"multi-select-content\">\r\n      <div class=\"selected-tags\" *ngIf=\"selectedValues.length > 0\">\r\n        <span *ngFor=\"let value of selectedValues\" class=\"tag\">\r\n          {{ getOptionLabel(value) }}\r\n          <svg class=\"tag-remove\" (click)=\"removeTag(value, $event)\" viewBox=\"0 0 24 24\">\r\n            <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n          </svg>\r\n        </span>\r\n      </div>\r\n      \r\n      <span *ngIf=\"selectedValues.length === 0\" class=\"placeholder\">\r\n        {{ placeholder }}\r\n      </span>\r\n    </div>\r\n\r\n    <div class=\"multi-select-icons\">\r\n      <svg *ngIf=\"clearable && selectedValues.length > 0\" class=\"clear-icon\" (click)=\"clearAll($event)\" viewBox=\"0 0 24 24\">\r\n        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n      </svg>\r\n      \r\n      <svg class=\"arrow-icon\" [class.open]=\"isOpen\" viewBox=\"0 0 24 24\">\r\n        <path d=\"M7 10l5 5 5-5z\"/>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"multi-select-dropdown\" *ngIf=\"isOpen\">\r\n    <div *ngIf=\"searchable\" class=\"search-container\">\r\n      <input\r\n        type=\"text\"\r\n        class=\"search-input\"\r\n        placeholder=\"Search...\"\r\n        [(ngModel)]=\"searchTerm\"\r\n        (input)=\"onSearch($event)\"\r\n        (click)=\"$event.stopPropagation()\"\r\n      />\r\n    </div>\r\n\r\n    <div class=\"options-container\">\r\n      <div\r\n        *ngFor=\"let option of filteredOptions\"\r\n        class=\"option\"\r\n        [class.selected]=\"isSelected(option)\"\r\n        [class.disabled]=\"option.disabled\"\r\n        (click)=\"toggleOption(option)\"\r\n      >\r\n        <div class=\"option-checkbox\">\r\n          <svg *ngIf=\"isSelected(option)\" viewBox=\"0 0 24 24\">\r\n            <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/>\r\n          </svg>\r\n        </div>\r\n        <span class=\"option-label\">{{ option.label }}</span>\r\n      </div>\r\n\r\n      <div *ngIf=\"filteredOptions.length === 0\" class=\"empty-message\">\r\n        No options found\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".multi-select-wrapper{position:relative;width:100%}.multi-select-container{min-height:48px;padding:8px 48px 8px 12px;background:white;border:2px solid #e5e7eb;border-radius:12px;cursor:pointer;transition:all .3s ease;position:relative;display:flex;align-items:center}.multi-select-container:hover:not(.disabled){border-color:#667eea}.multi-select-container.open{border-color:#667eea;box-shadow:0 0 0 4px #667eea1a}.multi-select-container.disabled{background:#f3f4f6;cursor:not-allowed;opacity:.6}.multi-select-content{flex:1;min-height:32px;display:flex;align-items:center;flex-wrap:wrap;gap:6px}.selected-tags{display:flex;flex-wrap:wrap;gap:6px}.tag{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-radius:8px;font-size:14px;font-weight:500;animation:tagIn .2s ease}@keyframes tagIn{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}.tag-remove{width:16px;height:16px;fill:#fff;cursor:pointer;transition:transform .2s ease}.tag-remove:hover{transform:scale(1.2)}.placeholder{color:#9ca3af;font-size:16px}.multi-select-icons{position:absolute;right:12px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:8px}.multi-select-icons svg{width:20px;height:20px;fill:#6b7280;transition:all .2s ease}.clear-icon{cursor:pointer}.clear-icon:hover{fill:#ef4444;transform:scale(1.1)}.arrow-icon{transition:transform .3s ease}.arrow-icon.open{transform:rotate(180deg)}.multi-select-dropdown{position:absolute;top:calc(100% + 8px);left:0;right:0;max-height:320px;background:white;border:2px solid #e5e7eb;border-radius:12px;box-shadow:0 10px 25px -5px #0000001a;z-index:1000;animation:slideDown .2s ease;overflow:hidden}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.search-container{padding:12px;border-bottom:1px solid #e5e7eb}.search-input{width:100%;padding:8px 12px;border:1px solid #e5e7eb;border-radius:8px;font-size:14px;outline:none}.search-input:focus{border-color:#667eea}.options-container{max-height:240px;overflow-y:auto}.options-container::-webkit-scrollbar{width:8px}.options-container::-webkit-scrollbar-track{background:#f3f4f6}.options-container::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px}.option{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;transition:all .2s ease}.option:hover:not(.disabled){background:linear-gradient(135deg,rgba(102,126,234,.1) 0%,rgba(118,75,162,.1) 100%)}.option.selected{background:linear-gradient(135deg,rgba(102,126,234,.15) 0%,rgba(118,75,162,.15) 100%);color:#667eea;font-weight:600}.option.disabled{opacity:.5;cursor:not-allowed}.option-checkbox{width:20px;height:20px;border:2px solid #667eea;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:all .2s ease}.option.selected .option-checkbox{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.option-checkbox svg{width:16px;height:16px;fill:#fff}.option-label{flex:1;font-size:15px}.empty-message{padding:24px;text-align:center;color:#9ca3af;font-size:14px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MultiSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-multi-select', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MultiSelectComponent),
                            multi: true
                        }
                    ], template: "<div class=\"multi-select-wrapper\" (blur)=\"onBlur()\">\r\n  <div class=\"multi-select-container\" (click)=\"toggleDropdown()\" [class.disabled]=\"disabled\" [class.open]=\"isOpen\">\r\n    <div class=\"multi-select-content\">\r\n      <div class=\"selected-tags\" *ngIf=\"selectedValues.length > 0\">\r\n        <span *ngFor=\"let value of selectedValues\" class=\"tag\">\r\n          {{ getOptionLabel(value) }}\r\n          <svg class=\"tag-remove\" (click)=\"removeTag(value, $event)\" viewBox=\"0 0 24 24\">\r\n            <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n          </svg>\r\n        </span>\r\n      </div>\r\n      \r\n      <span *ngIf=\"selectedValues.length === 0\" class=\"placeholder\">\r\n        {{ placeholder }}\r\n      </span>\r\n    </div>\r\n\r\n    <div class=\"multi-select-icons\">\r\n      <svg *ngIf=\"clearable && selectedValues.length > 0\" class=\"clear-icon\" (click)=\"clearAll($event)\" viewBox=\"0 0 24 24\">\r\n        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n      </svg>\r\n      \r\n      <svg class=\"arrow-icon\" [class.open]=\"isOpen\" viewBox=\"0 0 24 24\">\r\n        <path d=\"M7 10l5 5 5-5z\"/>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"multi-select-dropdown\" *ngIf=\"isOpen\">\r\n    <div *ngIf=\"searchable\" class=\"search-container\">\r\n      <input\r\n        type=\"text\"\r\n        class=\"search-input\"\r\n        placeholder=\"Search...\"\r\n        [(ngModel)]=\"searchTerm\"\r\n        (input)=\"onSearch($event)\"\r\n        (click)=\"$event.stopPropagation()\"\r\n      />\r\n    </div>\r\n\r\n    <div class=\"options-container\">\r\n      <div\r\n        *ngFor=\"let option of filteredOptions\"\r\n        class=\"option\"\r\n        [class.selected]=\"isSelected(option)\"\r\n        [class.disabled]=\"option.disabled\"\r\n        (click)=\"toggleOption(option)\"\r\n      >\r\n        <div class=\"option-checkbox\">\r\n          <svg *ngIf=\"isSelected(option)\" viewBox=\"0 0 24 24\">\r\n            <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/>\r\n          </svg>\r\n        </div>\r\n        <span class=\"option-label\">{{ option.label }}</span>\r\n      </div>\r\n\r\n      <div *ngIf=\"filteredOptions.length === 0\" class=\"empty-message\">\r\n        No options found\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".multi-select-wrapper{position:relative;width:100%}.multi-select-container{min-height:48px;padding:8px 48px 8px 12px;background:white;border:2px solid #e5e7eb;border-radius:12px;cursor:pointer;transition:all .3s ease;position:relative;display:flex;align-items:center}.multi-select-container:hover:not(.disabled){border-color:#667eea}.multi-select-container.open{border-color:#667eea;box-shadow:0 0 0 4px #667eea1a}.multi-select-container.disabled{background:#f3f4f6;cursor:not-allowed;opacity:.6}.multi-select-content{flex:1;min-height:32px;display:flex;align-items:center;flex-wrap:wrap;gap:6px}.selected-tags{display:flex;flex-wrap:wrap;gap:6px}.tag{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-radius:8px;font-size:14px;font-weight:500;animation:tagIn .2s ease}@keyframes tagIn{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}.tag-remove{width:16px;height:16px;fill:#fff;cursor:pointer;transition:transform .2s ease}.tag-remove:hover{transform:scale(1.2)}.placeholder{color:#9ca3af;font-size:16px}.multi-select-icons{position:absolute;right:12px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:8px}.multi-select-icons svg{width:20px;height:20px;fill:#6b7280;transition:all .2s ease}.clear-icon{cursor:pointer}.clear-icon:hover{fill:#ef4444;transform:scale(1.1)}.arrow-icon{transition:transform .3s ease}.arrow-icon.open{transform:rotate(180deg)}.multi-select-dropdown{position:absolute;top:calc(100% + 8px);left:0;right:0;max-height:320px;background:white;border:2px solid #e5e7eb;border-radius:12px;box-shadow:0 10px 25px -5px #0000001a;z-index:1000;animation:slideDown .2s ease;overflow:hidden}@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.search-container{padding:12px;border-bottom:1px solid #e5e7eb}.search-input{width:100%;padding:8px 12px;border:1px solid #e5e7eb;border-radius:8px;font-size:14px;outline:none}.search-input:focus{border-color:#667eea}.options-container{max-height:240px;overflow-y:auto}.options-container::-webkit-scrollbar{width:8px}.options-container::-webkit-scrollbar-track{background:#f3f4f6}.options-container::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px}.option{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;transition:all .2s ease}.option:hover:not(.disabled){background:linear-gradient(135deg,rgba(102,126,234,.1) 0%,rgba(118,75,162,.1) 100%)}.option.selected{background:linear-gradient(135deg,rgba(102,126,234,.15) 0%,rgba(118,75,162,.15) 100%);color:#667eea;font-weight:600}.option.disabled{opacity:.5;cursor:not-allowed}.option-checkbox{width:20px;height:20px;border:2px solid #667eea;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:all .2s ease}.option.selected .option-checkbox{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.option-checkbox svg{width:16px;height:16px;fill:#fff}.option-label{flex:1;font-size:15px}.empty-message{padding:24px;text-align:center;color:#9ca3af;font-size:14px}\n"] }]
        }], propDecorators: { options: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], maxSelections: [{
                type: Input
            }], disabled: [{
                type: Input
            }], searchable: [{
                type: Input
            }], clearable: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { MultiSelectComponent };
//# sourceMappingURL=muxima-ui-multi-select.mjs.map
