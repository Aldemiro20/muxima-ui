import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SearchBoxComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mb3JtL3NlYXJjaC1ib3gvc3JjL2xpYi9zZWFyY2gtYm94L3NlYXJjaC1ib3guY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZm9ybS9zZWFyY2gtYm94L3NyYy9saWIvc2VhcmNoLWJveC9zZWFyY2gtYm94LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDOzs7QUFtQnRGLE1BQU0sT0FBTyxrQkFBa0I7SUFkL0I7UUFlVyxnQkFBVyxHQUFXLFdBQVcsQ0FBQztRQUNsQyxTQUFJLEdBQWtCLElBQUksQ0FBQztRQUMzQixZQUFPLEdBQXFCLFNBQVMsQ0FBQztRQUN0QyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNwQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNqQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNqQyxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUUxQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRW5CLGFBQVEsR0FBNEIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQzdDLGNB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SztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCB0eXBlIFNlYXJjaEJveFNpemUgPSAnc20nIHwgJ21kJyB8ICdsZyc7XG5leHBvcnQgdHlwZSBTZWFyY2hCb3hWYXJpYW50ID0gJ2RlZmF1bHQnIHwgJ291dGxpbmVkJyB8ICdmaWxsZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtdXhpbWEtc2VhcmNoLWJveCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1ib3guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtYm94LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VhcmNoQm94Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJveENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWFyY2guLi4nO1xuICBASW5wdXQoKSBzaXplOiBTZWFyY2hCb3hTaXplID0gJ21kJztcbiAgQElucHV0KCkgdmFyaWFudDogU2VhcmNoQm94VmFyaWFudCA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY2xlYXJhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBkZWJvdW5jZVRpbWU6IG51bWJlciA9IDMwMDtcblxuICBAT3V0cHV0KCkgc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBjbGVhciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBzZWFyY2hWYWx1ZTogc3RyaW5nID0gJyc7XG4gIGlzRm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGRlYm91bmNlVGltZXI6IGFueTtcbiAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBnZXQgc2l6ZUNsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBzZWFyY2gtYm94LSR7dGhpcy5zaXplfWA7XG4gIH1cblxuICBnZXQgdmFyaWFudENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBzZWFyY2gtYm94LSR7dGhpcy52YXJpYW50fWA7XG4gIH1cblxuICBnZXQgc2hvd0NsZWFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNsZWFyYWJsZSAmJiB0aGlzLnNlYXJjaFZhbHVlLmxlbmd0aCA+IDAgJiYgIXRoaXMuZGlzYWJsZWQ7XG4gIH1cblxuICBvbklucHV0KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICB0aGlzLnNlYXJjaFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG5cbiAgICAvLyBEZWJvdW5jZSBzZWFyY2ggZXZlbnRcbiAgICBpZiAodGhpcy5kZWJvdW5jZVRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5kZWJvdW5jZVRpbWVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlYm91bmNlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQodmFsdWUpO1xuICAgIH0sIHRoaXMuZGVib3VuY2VUaW1lKTtcbiAgfVxuXG4gIG9uQ2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgIHRoaXMub25DaGFuZ2UoJycpO1xuICAgIHRoaXMuc2VhcmNoLmVtaXQoJycpO1xuICAgIHRoaXMuY2xlYXIuZW1pdCgpO1xuICB9XG5cbiAgb25Gb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB0aGlzLmZvY3VzLmVtaXQoKTtcbiAgfVxuXG4gIG9uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuYmx1ci5lbWl0KCk7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBtZXRob2RzXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoVmFsdWUgPSB2YWx1ZSB8fCAnJztcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtdXhpbWEtc2VhcmNoLWJveFwiIFtuZ0NsYXNzXT1cIltzaXplQ2xhc3MsIHZhcmlhbnRDbGFzcywgaXNGb2N1c2VkID8gJ2ZvY3VzZWQnIDogJycsIGRpc2FibGVkID8gJ2Rpc2FibGVkJyA6ICcnXVwiPlxuICA8IS0tIFNlYXJjaCBJY29uIC0tPlxuICA8ZGl2IGNsYXNzPVwic2VhcmNoLWljb25cIj5cbiAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj5cbiAgICAgIDxjaXJjbGUgY3g9XCIxMVwiIGN5PVwiMTFcIiByPVwiOFwiPjwvY2lyY2xlPlxuICAgICAgPHBhdGggZD1cIm0yMSAyMS00LjM1LTQuMzVcIj48L3BhdGg+XG4gICAgPC9zdmc+XG4gIDwvZGl2PlxuXG4gIDwhLS0gSW5wdXQgLS0+XG4gIDxpbnB1dFxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICBjbGFzcz1cInNlYXJjaC1pbnB1dFwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICBbdmFsdWVdPVwic2VhcmNoVmFsdWVcIlxuICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiXG4gICAgKGZvY3VzKT1cIm9uRm9jdXMoKVwiXG4gICAgKGJsdXIpPVwib25CbHVyKClcIlxuICAvPlxuXG4gIDwhLS0gTG9hZGluZyBTcGlubmVyIC0tPlxuICA8ZGl2ICpuZ0lmPVwibG9hZGluZ1wiIGNsYXNzPVwic2VhcmNoLWxvYWRpbmdcIj5cbiAgICA8c3ZnIGNsYXNzPVwic3Bpbm5lclwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiPlxuICAgICAgPGNpcmNsZSBjbGFzcz1cInNwaW5uZXItY2lyY2xlXCIgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCI+PC9jaXJjbGU+XG4gICAgPC9zdmc+XG4gIDwvZGl2PlxuXG4gIDwhLS0gQ2xlYXIgQnV0dG9uIC0tPlxuICA8YnV0dG9uXG4gICAgKm5nSWY9XCJzaG93Q2xlYXIgJiYgIWxvYWRpbmdcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNsYXNzPVwiY2xlYXItYnV0dG9uXCJcbiAgICAoY2xpY2spPVwib25DbGVhcigpXCJcbiAgICB0YWJpbmRleD1cIi0xXCJcbiAgPlxuICAgIDxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPlxuICAgICAgPGxpbmUgeDE9XCIxOFwiIHkxPVwiNlwiIHgyPVwiNlwiIHkyPVwiMThcIj48L2xpbmU+XG4gICAgICA8bGluZSB4MT1cIjZcIiB5MT1cIjZcIiB4Mj1cIjE4XCIgeTI9XCIxOFwiPjwvbGluZT5cbiAgICA8L3N2Zz5cbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==