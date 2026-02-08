import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

class SearchBoxComponent {
    constructor() {
        this.placeholder = 'Search...';
        this.size = 'md';
        this.variant = 'default';
        this.disabled = false;
        this.clearable = true;
        this.loading = false;
        this.debounceTime = 300;
        this.search = new EventEmitter();
        this.clear = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.searchValue = '';
        this.isFocused = false;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    get sizeClass() {
        return `search-box-${this.size}`;
    }
    get variantClass() {
        return `search-box-${this.variant}`;
    }
    get showClear() {
        return this.clearable && this.searchValue.length > 0 && !this.disabled;
    }
    onInput(event) {
        const value = event.target.value;
        this.searchValue = value;
        this.onChange(value);
        // Debounce search event
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
            this.search.emit(value);
        }, this.debounceTime);
    }
    onClear() {
        this.searchValue = '';
        this.onChange('');
        this.search.emit('');
        this.clear.emit();
    }
    onFocus() {
        this.isFocused = true;
        this.onTouched();
        this.focus.emit();
    }
    onBlur() {
        this.isFocused = false;
        this.blur.emit();
    }
    // ControlValueAccessor methods
    writeValue(value) {
        this.searchValue = value || '';
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
}
SearchBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SearchBoxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SearchBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SearchBoxComponent, isStandalone: true, selector: "muxima-search-box", inputs: { placeholder: "placeholder", size: "size", variant: "variant", disabled: "disabled", clearable: "clearable", loading: "loading", debounceTime: "debounceTime" }, outputs: { search: "search", clear: "clear", focus: "focus", blur: "blur" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchBoxComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"muxima-search-box\" [ngClass]=\"[sizeClass, variantClass, isFocused ? 'focused' : '', disabled ? 'disabled' : '']\">\n  <!-- Search Icon -->\n  <div class=\"search-icon\">\n    <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n      <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n      <path d=\"m21 21-4.35-4.35\"></path>\n    </svg>\n  </div>\n\n  <!-- Input -->\n  <input\n    type=\"text\"\n    class=\"search-input\"\n    [placeholder]=\"placeholder\"\n    [value]=\"searchValue\"\n    [disabled]=\"disabled\"\n    (input)=\"onInput($event)\"\n    (focus)=\"onFocus()\"\n    (blur)=\"onBlur()\"\n  />\n\n  <!-- Loading Spinner -->\n  <div *ngIf=\"loading\" class=\"search-loading\">\n    <svg class=\"spinner\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\">\n      <circle class=\"spinner-circle\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\"></circle>\n    </svg>\n  </div>\n\n  <!-- Clear Button -->\n  <button\n    *ngIf=\"showClear && !loading\"\n    type=\"button\"\n    class=\"clear-button\"\n    (click)=\"onClear()\"\n    tabindex=\"-1\"\n  >\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n      <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n      <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n    </svg>\n  </button>\n</div>\n", styles: [".muxima-search-box{position:relative;display:flex;align-items:center;gap:.5rem;background:white;border:1px solid #e5e7eb;border-radius:8px;padding:0 1rem;transition:all .3s ease;width:100%}.muxima-search-box:hover:not(.disabled){border-color:#667eea}.muxima-search-box.focused{border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.muxima-search-box.disabled{background:#f9fafb;cursor:not-allowed;opacity:.6}.search-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#9ca3af;transition:color .3s ease}.search-icon svg{width:20px;height:20px}.focused .search-icon{color:#667eea}.search-input{flex:1;border:none;outline:none;background:transparent;font-size:.875rem;color:#1f2937;padding:0;width:100%}.search-input::placeholder{color:#9ca3af}.search-input:disabled{cursor:not-allowed}.search-loading{display:flex;align-items:center;justify-content:center;flex-shrink:0}.search-loading .spinner{animation:spin 1s linear infinite}.search-loading .spinner-circle{stroke-dasharray:60;stroke-dashoffset:0;animation:dash 1.5s ease-in-out infinite;stroke:#667eea}.clear-button{display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:.25rem;border:none;background:transparent;border-radius:4px;color:#9ca3af;cursor:pointer;transition:all .2s ease}.clear-button:hover{background:#f3f4f6;color:#1f2937}.clear-button:active{transform:scale(.95)}.clear-button svg{width:16px;height:16px}.search-box-sm{padding:0 .75rem;height:36px}.search-box-sm .search-input{font-size:.8125rem}.search-box-sm .search-icon svg{width:16px;height:16px}.search-box-md{padding:0 1rem;height:42px}.search-box-md .search-input{font-size:.875rem}.search-box-md .search-icon svg{width:20px;height:20px}.search-box-lg{padding:0 1.25rem;height:48px}.search-box-lg .search-input{font-size:1rem}.search-box-lg .search-icon svg{width:22px;height:22px}.search-box-outlined{border:2px solid #e5e7eb}.search-box-outlined:hover:not(.disabled){border-color:#667eea}.search-box-outlined.focused{border-color:#667eea}.search-box-filled{background:#f9fafb;border:1px solid transparent}.search-box-filled:hover:not(.disabled){background:#f3f4f6;border-color:transparent}.search-box-filled.focused{background:white;border-color:#667eea}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dashoffset:60}50%{stroke-dashoffset:15}to{stroke-dashoffset:60}}@media (max-width: 768px){.search-box-lg{height:44px;padding:0 1rem}.search-box-lg .search-input{font-size:.9375rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SearchBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-search-box', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SearchBoxComponent),
                            multi: true
                        }
                    ], template: "<div class=\"muxima-search-box\" [ngClass]=\"[sizeClass, variantClass, isFocused ? 'focused' : '', disabled ? 'disabled' : '']\">\n  <!-- Search Icon -->\n  <div class=\"search-icon\">\n    <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n      <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n      <path d=\"m21 21-4.35-4.35\"></path>\n    </svg>\n  </div>\n\n  <!-- Input -->\n  <input\n    type=\"text\"\n    class=\"search-input\"\n    [placeholder]=\"placeholder\"\n    [value]=\"searchValue\"\n    [disabled]=\"disabled\"\n    (input)=\"onInput($event)\"\n    (focus)=\"onFocus()\"\n    (blur)=\"onBlur()\"\n  />\n\n  <!-- Loading Spinner -->\n  <div *ngIf=\"loading\" class=\"search-loading\">\n    <svg class=\"spinner\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\">\n      <circle class=\"spinner-circle\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\"></circle>\n    </svg>\n  </div>\n\n  <!-- Clear Button -->\n  <button\n    *ngIf=\"showClear && !loading\"\n    type=\"button\"\n    class=\"clear-button\"\n    (click)=\"onClear()\"\n    tabindex=\"-1\"\n  >\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n      <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n      <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n    </svg>\n  </button>\n</div>\n", styles: [".muxima-search-box{position:relative;display:flex;align-items:center;gap:.5rem;background:white;border:1px solid #e5e7eb;border-radius:8px;padding:0 1rem;transition:all .3s ease;width:100%}.muxima-search-box:hover:not(.disabled){border-color:#667eea}.muxima-search-box.focused{border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.muxima-search-box.disabled{background:#f9fafb;cursor:not-allowed;opacity:.6}.search-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#9ca3af;transition:color .3s ease}.search-icon svg{width:20px;height:20px}.focused .search-icon{color:#667eea}.search-input{flex:1;border:none;outline:none;background:transparent;font-size:.875rem;color:#1f2937;padding:0;width:100%}.search-input::placeholder{color:#9ca3af}.search-input:disabled{cursor:not-allowed}.search-loading{display:flex;align-items:center;justify-content:center;flex-shrink:0}.search-loading .spinner{animation:spin 1s linear infinite}.search-loading .spinner-circle{stroke-dasharray:60;stroke-dashoffset:0;animation:dash 1.5s ease-in-out infinite;stroke:#667eea}.clear-button{display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:.25rem;border:none;background:transparent;border-radius:4px;color:#9ca3af;cursor:pointer;transition:all .2s ease}.clear-button:hover{background:#f3f4f6;color:#1f2937}.clear-button:active{transform:scale(.95)}.clear-button svg{width:16px;height:16px}.search-box-sm{padding:0 .75rem;height:36px}.search-box-sm .search-input{font-size:.8125rem}.search-box-sm .search-icon svg{width:16px;height:16px}.search-box-md{padding:0 1rem;height:42px}.search-box-md .search-input{font-size:.875rem}.search-box-md .search-icon svg{width:20px;height:20px}.search-box-lg{padding:0 1.25rem;height:48px}.search-box-lg .search-input{font-size:1rem}.search-box-lg .search-icon svg{width:22px;height:22px}.search-box-outlined{border:2px solid #e5e7eb}.search-box-outlined:hover:not(.disabled){border-color:#667eea}.search-box-outlined.focused{border-color:#667eea}.search-box-filled{background:#f9fafb;border:1px solid transparent}.search-box-filled:hover:not(.disabled){background:#f3f4f6;border-color:transparent}.search-box-filled.focused{background:white;border-color:#667eea}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dashoffset:60}50%{stroke-dashoffset:15}to{stroke-dashoffset:60}}@media (max-width: 768px){.search-box-lg{height:44px;padding:0 1rem}.search-box-lg .search-input{font-size:.9375rem}}\n"] }]
        }], propDecorators: { placeholder: [{
                type: Input
            }], size: [{
                type: Input
            }], variant: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clearable: [{
                type: Input
            }], loading: [{
                type: Input
            }], debounceTime: [{
                type: Input
            }], search: [{
                type: Output
            }], clear: [{
                type: Output
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { SearchBoxComponent };
//# sourceMappingURL=muxima-ui-search-box.mjs.map
