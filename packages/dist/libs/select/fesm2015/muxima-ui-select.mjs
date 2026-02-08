import * as i0 from '@angular/core';
import { forwardRef, Component, ViewChild, Input, HostListener } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

class SelectComponent {
    constructor() {
        this.uniqueId = Math.random().toString(36).substring(2);
        this.dropdownPosition = { top: '0px', left: '0px', width: '0px', };
        this.dropdownOpen = false;
        this.openUpward = false;
        this.dropdownTop = 0;
        this.dropdownLeft = 0;
        this.useFixed = false;
        this.placeholder = 'Selecione uma opção';
        this.size = 'md';
        this.variant = 'default';
        this.disabled = false;
        this.readonly = false;
        this.options = [];
        this.multiple = false;
        this.searchable = false;
        this.clearable = false;
        this.hasError = false;
        this.selectedValues = [];
        this.searchText = '';
        this.filteredOptions = [];
        this.focusedIndex = -1;
        this.onChange = (value) => {
            //
        };
        this.onTouched = () => {
            //
        };
        this.onOtherSelectOpened = (event) => {
            var _a;
            const openedId = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.id;
            if (openedId !== this.uniqueId && this.dropdownOpen) {
                this.dropdownOpen = false;
            }
        };
    }
    toggleDropdown() {
        if (this.disabled || this.readonly)
            return;
        this.dropdownOpen = !this.dropdownOpen;
        if (this.dropdownOpen) {
            this.filteredOptions = [...this.options];
            this.searchText = '';
            this.focusedIndex = -1;
            this.checkDropdownDirection();
            const btn = this.dropdownButton.nativeElement;
            this.dropdownPosition = {
                top: `${btn.offsetTop + btn.offsetHeight}px`,
                left: `${btn.offsetLeft}px`,
                width: `${btn.offsetWidth}px`
            };
            const event = new CustomEvent('selectOpened', { detail: { id: this.uniqueId } });
            window.dispatchEvent(event);
        }
    }
    ngOnInit() {
        window.addEventListener('selectOpened', this.onOtherSelectOpened);
    }
    ngOnDestroy() {
        window.removeEventListener('selectOpened', this.onOtherSelectOpened);
    }
    checkDropdownDirection() {
        const buttonRect = this.dropdownButton.nativeElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = 380; // altura estimada do dropdown
        const spaceBelow = viewportHeight - buttonRect.bottom;
        this.openUpward = spaceBelow < dropdownHeight;
    }
    writeValue(value) {
        this.value = value;
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
    onWindowChange() {
        if (this.dropdownOpen) {
            this.checkDropdownDirection();
        }
    }
    selectOption(option) {
        if (option.disabled)
            return;
        if (this.multiple) {
            const index = this.selectedValues.indexOf(option.value);
            if (index > -1) {
                this.selectedValues.splice(index, 1);
            }
            else {
                this.selectedValues.push(option.value);
            }
            this.value = [...this.selectedValues];
            this.onChange(this.value);
        }
        else {
            this.value = option.value;
            this.onChange(this.value);
            this.dropdownOpen = false;
        }
        this.searchText = '';
        this.onTouched();
    }
    onSearch() {
        const search = this.searchText.toLowerCase();
        this.filteredOptions = this.options.filter(option => option.label.toLowerCase().includes(search));
        this.focusedIndex = -1;
    }
    clearSelection(event) {
        if (event) {
            event.stopPropagation();
        }
        this.value = this.multiple ? [] : null;
        this.selectedValues = [];
        this.onChange(this.value);
        this.onTouched();
    }
    getSelectedLabel() {
        var _a;
        if (this.multiple) {
            const selected = this.options.filter(opt => this.selectedValues.includes(opt.value));
            return selected.length > 0
                ? selected.map(opt => opt.label).join(', ')
                : '';
        }
        return ((_a = this.options.find(option => option.value === this.value)) === null || _a === void 0 ? void 0 : _a.label) || '';
    }
    isSelected(option) {
        if (this.multiple) {
            return this.selectedValues.includes(option.value);
        }
        return option.value === this.value;
    }
    getClasses() {
        const classes = [
            `muxima-select-${this.variant}`,
            `muxima-select-${this.size}`
        ];
        if (this.hasError)
            classes.push('muxima-select-error');
        if (this.disabled)
            classes.push('muxima-select-disabled');
        if (this.readonly)
            classes.push('muxima-select-readonly');
        if (this.dropdownOpen)
            classes.push('muxima-select-open');
        return classes;
    }
    onClickOutside(event) {
        const target = event.target;
        if (!target.closest('.muxima-select-container')) {
            this.dropdownOpen = false;
        }
    }
    onKeyDown(event) {
        if (!this.dropdownOpen) {
            if (event.key === 'Enter' || event.key === ' ') {
                this.toggleDropdown();
                event.preventDefault();
            }
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                this.focusedIndex = Math.min(this.focusedIndex + 1, this.filteredOptions.length - 1);
                event.preventDefault();
                break;
            case 'ArrowUp':
                this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
                event.preventDefault();
                break;
            case 'Enter':
                if (this.focusedIndex >= 0 && this.focusedIndex < this.filteredOptions.length) {
                    this.selectOption(this.filteredOptions[this.focusedIndex]);
                }
                event.preventDefault();
                break;
            case 'Escape':
                this.dropdownOpen = false;
                event.preventDefault();
                break;
        }
    }
}
SelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SelectComponent, isStandalone: true, selector: "muxima-select", inputs: { placeholder: "placeholder", label: "label", helperText: "helperText", size: "size", variant: "variant", disabled: "disabled", readonly: "readonly", options: "options", multiple: "multiple", searchable: "searchable", clearable: "clearable", hasError: "hasError", errorMessage: "errorMessage", prefixIcon: "prefixIcon" }, host: { listeners: { "window:resize": "onWindowChange()", "window:scroll": "onWindowChange()", "document:click": "onClickOutside($event)", "document:keydown": "onKeyDown($event)" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true }], ngImport: i0, template: "<div class=\"muxima-select-container\">\r\n  <!-- Label -->\r\n  <label *ngIf=\"label\" class=\"muxima-select-label\">\r\n    {{ label }}\r\n  </label>\r\n\r\n  <!-- Select Wrapper -->\r\n  <div \r\n    #dropdownButton\r\n    class=\"muxima-select-wrapper\"\r\n    [ngClass]=\"getClasses()\"\r\n    (click)=\"toggleDropdown()\"\r\n    tabindex=\"0\"\r\n  >\r\n    <!-- Prefix Icon -->\r\n    <span *ngIf=\"prefixIcon\" class=\"muxima-select-prefix-icon\">\r\n      {{ prefixIcon }}\r\n    </span>\r\n\r\n    <!-- Selected Value / Placeholder -->\r\n    <div class=\"muxima-select-value\">\r\n      <span *ngIf=\"!getSelectedLabel()\" class=\"muxima-select-placeholder\">\r\n        {{ placeholder }}\r\n      </span>\r\n      <span *ngIf=\"getSelectedLabel()\" class=\"muxima-select-selected\">\r\n        {{ getSelectedLabel() }}\r\n      </span>\r\n    </div>\r\n\r\n    <!-- Clear Button -->\r\n    <button \r\n      *ngIf=\"clearable && getSelectedLabel()\" \r\n      type=\"button\"\r\n      class=\"muxima-select-clear\"\r\n      (click)=\"clearSelection($event)\"\r\n      tabindex=\"-1\"\r\n    >\r\n      \u2715\r\n    </button>\r\n\r\n    <!-- Arrow Icon -->\r\n    <span class=\"muxima-select-arrow\" [class.muxima-select-arrow-open]=\"dropdownOpen\">\r\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\r\n        <path d=\"M5 7.5L10 12.5L15 7.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n      </svg>\r\n    </span>\r\n  </div>\r\n\r\n  <!-- Dropdown Options -->\r\n  <div \r\n    *ngIf=\"dropdownOpen\"\r\n    class=\"muxima-select-dropdown\"\r\n    [class.muxima-select-dropdown-open]=\"dropdownOpen\"\r\n    [class.muxima-select-dropdown-upward]=\"openUpward\"\r\n    [ngStyle]=\"dropdownPosition\"\r\n  >\r\n    <!-- Search Input -->\r\n    <div *ngIf=\"searchable\" class=\"muxima-select-search\" (click)=\"$event.stopPropagation()\">\r\n      <span class=\"muxima-select-search-icon\">\uD83D\uDD0D</span>\r\n      <input \r\n        type=\"text\" \r\n        [(ngModel)]=\"searchText\"\r\n        (input)=\"onSearch()\"\r\n        placeholder=\"Buscar...\"\r\n        class=\"muxima-select-search-input\"\r\n      />\r\n    </div>\r\n\r\n    <!-- Options List -->\r\n    <ul class=\"muxima-select-options\">\r\n      <li\r\n        *ngFor=\"let option of filteredOptions; let i = index\"\r\n        class=\"muxima-select-option\"\r\n        [class.muxima-select-option-selected]=\"isSelected(option)\"\r\n        [class.muxima-select-option-disabled]=\"option.disabled\"\r\n        [class.muxima-select-option-focused]=\"i === focusedIndex\"\r\n        (click)=\"selectOption(option)\"\r\n      >\r\n        <span *ngIf=\"option.icon\" class=\"muxima-select-option-icon\">{{ option.icon }}</span>\r\n        <span class=\"muxima-select-option-label\">{{ option.label }}</span>\r\n        <span *ngIf=\"isSelected(option)\" class=\"muxima-select-option-check\">\u2713</span>\r\n      </li>\r\n      \r\n      <li *ngIf=\"filteredOptions.length === 0\" class=\"muxima-select-option muxima-select-option-empty\">\r\n        Nenhuma op\u00E7\u00E3o encontrada\r\n      </li>\r\n    </ul>\r\n  </div>\r\n\r\n  <!-- Helper Text -->\r\n  <div *ngIf=\"helperText && !hasError\" class=\"muxima-select-helper-text\">\r\n    {{ helperText }}\r\n  </div>\r\n\r\n  <!-- Error Message -->\r\n  <div *ngIf=\"errorMessage && hasError\" class=\"muxima-select-error-message\">\r\n    <span class=\"muxima-select-error-icon\">\u26A0</span>\r\n    <span>{{ errorMessage }}</span>\r\n  </div>\r\n</div>\r\n\r\n\r\n", styles: [":root{--muxima-primary: #667eea;--muxima-primary-light: #8b9df8;--muxima-primary-dark: #4c63d2;--muxima-secondary: #764ba2;--muxima-secondary-light: #9d6cc9;--muxima-secondary-dark: #5a3a7d;--muxima-accent: #8b9df8;--muxima-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);--muxima-success: #10b981;--muxima-success-light: #34d399;--muxima-success-dark: #059669;--muxima-warning: #f59e0b;--muxima-warning-light: #fbbf24;--muxima-warning-dark: #d97706;--muxima-danger: #ef4444;--muxima-danger-light: #f87171;--muxima-danger-dark: #dc2626;--muxima-info: #3b82f6;--muxima-info-light: #60a5fa;--muxima-info-dark: #2563eb}.muxima-select-container{position:relative;width:100%}.muxima-select-label{display:block;margin-bottom:.5rem;font-size:.875rem;font-weight:500;color:#1e293b;transition:color .2s ease}.muxima-select-wrapper{position:relative;display:flex;align-items:center;gap:.75rem;width:100%;padding:.75rem 1rem;font-size:1rem;color:#1e293b;background:white;border:2px solid #E2E8F0;border-radius:8px;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);outline:none}.muxima-select-wrapper:hover:not(.muxima-select-disabled):not(.muxima-select-readonly){border-color:#cbd5e1;box-shadow:0 2px 8px #0000000f}.muxima-select-wrapper:focus{border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}.muxima-select-prefix-icon{font-size:1.25rem;color:#64748b;flex-shrink:0}.muxima-select-value{flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.muxima-select-placeholder{color:#94a3b8}.muxima-select-selected{color:#1e293b;font-weight:500}.muxima-select-clear{display:flex;align-items:center;justify-content:center;width:20px;height:20px;padding:0;background:#E2E8F0;border:none;border-radius:50%;color:#64748b;font-size:.75rem;cursor:pointer;transition:all .2s ease;flex-shrink:0}.muxima-select-clear:hover{background:#CBD5E1;color:#475569;transform:scale(1.1)}.muxima-select-arrow{display:flex;align-items:center;color:#64748b;transition:transform .3s cubic-bezier(.4,0,.2,1);flex-shrink:0}.muxima-select-arrow svg{width:20px;height:20px}.muxima-select-arrow-open{transform:rotate(180deg)}.muxima-select-dropdown{position:absolute;z-index:1000;width:100%;margin-top:.5rem;background:white;border:1px solid #E2E8F0;border-radius:12px;box-shadow:0 10px 25px #0000001a,0 4px 10px #0000000d;max-height:300px;overflow:hidden;animation:dropdownSlideDown .25s cubic-bezier(.4,0,.2,1)}.muxima-select-dropdown.muxima-select-dropdown-upward{margin-top:0;margin-bottom:.5rem;animation:dropdownSlideUp .25s cubic-bezier(.4,0,.2,1)}@keyframes dropdownSlideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@keyframes dropdownSlideUp{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.muxima-select-search{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-bottom:1px solid #E2E8F0;background:#F8FAFC}.muxima-select-search-icon{font-size:1rem;color:#64748b;flex-shrink:0}.muxima-select-search-input{flex:1;padding:0;border:none;background:transparent;font-size:.875rem;color:#1e293b;outline:none}.muxima-select-search-input::placeholder{color:#94a3b8}.muxima-select-options{list-style:none;margin:0;padding:.5rem;max-height:250px;overflow-y:auto}.muxima-select-options::-webkit-scrollbar{width:6px}.muxima-select-options::-webkit-scrollbar-track{background:#F1F5F9;border-radius:3px}.muxima-select-options::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px}.muxima-select-options::-webkit-scrollbar-thumb:hover{background:#94A3B8}.muxima-select-option{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;font-size:.9375rem;color:#475569;border-radius:6px;cursor:pointer;transition:all .2s ease}.muxima-select-option:hover:not(.muxima-select-option-disabled){background:linear-gradient(135deg,rgba(59,130,246,.08),rgba(139,92,246,.08));color:#1e293b}.muxima-select-option.muxima-select-option-selected{background:linear-gradient(135deg,rgba(59,130,246,.12),rgba(139,92,246,.12));color:#3b82f6;font-weight:500}.muxima-select-option.muxima-select-option-focused{background:rgba(59,130,246,.05);outline:2px solid rgba(59,130,246,.2);outline-offset:-2px}.muxima-select-option.muxima-select-option-disabled{opacity:.5;cursor:not-allowed}.muxima-select-option.muxima-select-option-empty{justify-content:center;color:#94a3b8;cursor:default}.muxima-select-option.muxima-select-option-empty:hover{background:transparent}.muxima-select-option-icon{font-size:1.25rem;flex-shrink:0}.muxima-select-option-label{flex:1}.muxima-select-option-check{font-size:1rem;color:#3b82f6;font-weight:700;flex-shrink:0}.muxima-select-helper-text{margin-top:.375rem;font-size:.8125rem;color:#64748b}.muxima-select-error-message{display:flex;align-items:center;gap:.375rem;margin-top:.375rem;font-size:.8125rem;color:#ef4444}.muxima-select-error-icon{font-size:.875rem}.muxima-select-outlined{border-width:2px;border-color:#cbd5e1}.muxima-select-outlined:hover:not(.muxima-select-disabled):not(.muxima-select-readonly){border-color:#94a3b8}.muxima-select-outlined:focus{border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f626}.muxima-select-filled{background:#F1F5F9;border:2px solid transparent}.muxima-select-filled:hover:not(.muxima-select-disabled):not(.muxima-select-readonly){background:#E2E8F0}.muxima-select-filled:focus{background:white;border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}.muxima-select-gradient{position:relative;background:white;border:none}.muxima-select-gradient:before{content:\"\";position:absolute;inset:0;border-radius:8px;padding:2px;background:linear-gradient(135deg,#3B82F6,#8B5CF6);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;opacity:.5;transition:opacity .3s ease}.muxima-select-gradient:hover:not(.muxima-select-disabled):not(.muxima-select-readonly):before{opacity:.8}.muxima-select-gradient:focus:before{opacity:1;box-shadow:0 0 0 3px #3b82f61a}.muxima-select-glass{background:rgba(255,255,255,.1);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2);box-shadow:0 8px 32px #0000001a,inset 0 1px #ffffff4d}.muxima-select-glass .muxima-select-placeholder,.muxima-select-glass .muxima-select-selected{color:#1e293b;text-shadow:0 1px 2px rgba(255,255,255,.5)}.muxima-select-glass:hover:not(.muxima-select-disabled):not(.muxima-select-readonly){background:rgba(255,255,255,.15);border-color:#ffffff4d;box-shadow:0 12px 40px #00000026,inset 0 1px #fff6}.muxima-select-glass:focus{background:rgba(255,255,255,.2);border-color:#3b82f666;box-shadow:0 0 0 3px #3b82f61a,0 12px 40px #00000026,inset 0 1px #fff6}.muxima-select-sm{padding:.5rem .75rem;font-size:.875rem}.muxima-select-sm .muxima-select-prefix-icon{font-size:1rem}.muxima-select-sm .muxima-select-arrow svg{width:16px;height:16px}.muxima-select-lg{padding:1rem 1.25rem;font-size:1.125rem}.muxima-select-lg .muxima-select-prefix-icon{font-size:1.5rem}.muxima-select-lg .muxima-select-arrow svg{width:24px;height:24px}.muxima-select-error{border-color:#ef4444!important}.muxima-select-error:focus{box-shadow:0 0 0 3px #ef44441a!important}.muxima-select-error .muxima-select-label{color:#ef4444}.muxima-select-disabled{background:#F1F5F9!important;border-color:#e2e8f0!important;color:#94a3b8!important;cursor:not-allowed!important;opacity:.6}.muxima-select-disabled .muxima-select-arrow{color:#94a3b8}.muxima-select-readonly{background:#F8FAFC;cursor:default}.muxima-select-readonly .muxima-select-arrow{display:none}.muxima-select-open{border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}@media (max-width: 640px){.muxima-select-wrapper{font-size:.9375rem;padding:.625rem .875rem}.muxima-select-dropdown{max-height:250px}.muxima-select-option{padding:.625rem .875rem;font-size:.875rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-select', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SelectComponent),
                            multi: true
                        }
                    ], template: "<div class=\"muxima-select-container\">\r\n  <!-- Label -->\r\n  <label *ngIf=\"label\" class=\"muxima-select-label\">\r\n    {{ label }}\r\n  </label>\r\n\r\n  <!-- Select Wrapper -->\r\n  <div \r\n    #dropdownButton\r\n    class=\"muxima-select-wrapper\"\r\n    [ngClass]=\"getClasses()\"\r\n    (click)=\"toggleDropdown()\"\r\n    tabindex=\"0\"\r\n  >\r\n    <!-- Prefix Icon -->\r\n    <span *ngIf=\"prefixIcon\" class=\"muxima-select-prefix-icon\">\r\n      {{ prefixIcon }}\r\n    </span>\r\n\r\n    <!-- Selected Value / Placeholder -->\r\n    <div class=\"muxima-select-value\">\r\n      <span *ngIf=\"!getSelectedLabel()\" class=\"muxima-select-placeholder\">\r\n        {{ placeholder }}\r\n      </span>\r\n      <span *ngIf=\"getSelectedLabel()\" class=\"muxima-select-selected\">\r\n        {{ getSelectedLabel() }}\r\n      </span>\r\n    </div>\r\n\r\n    <!-- Clear Button -->\r\n    <button \r\n      *ngIf=\"clearable && getSelectedLabel()\" \r\n      type=\"button\"\r\n      class=\"muxima-select-clear\"\r\n      (click)=\"clearSelection($event)\"\r\n      tabindex=\"-1\"\r\n    >\r\n      \u2715\r\n    </button>\r\n\r\n    <!-- Arrow Icon -->\r\n    <span class=\"muxima-select-arrow\" [class.muxima-select-arrow-open]=\"dropdownOpen\">\r\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\r\n        <path d=\"M5 7.5L10 12.5L15 7.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n      </svg>\r\n    </span>\r\n  </div>\r\n\r\n  <!-- Dropdown Options -->\r\n  <div \r\n    *ngIf=\"dropdownOpen\"\r\n    class=\"muxima-select-dropdown\"\r\n    [class.muxima-select-dropdown-open]=\"dropdownOpen\"\r\n    [class.muxima-select-dropdown-upward]=\"openUpward\"\r\n    [ngStyle]=\"dropdownPosition\"\r\n  >\r\n    <!-- Search Input -->\r\n    <div *ngIf=\"searchable\" class=\"muxima-select-search\" (click)=\"$event.stopPropagation()\">\r\n      <span class=\"muxima-select-search-icon\">\uD83D\uDD0D</span>\r\n      <input \r\n        type=\"text\" \r\n        [(ngModel)]=\"searchText\"\r\n        (input)=\"onSearch()\"\r\n        placeholder=\"Buscar...\"\r\n        class=\"muxima-select-search-input\"\r\n      />\r\n    </div>\r\n\r\n    <!-- Options List -->\r\n    <ul class=\"muxima-select-options\">\r\n      <li\r\n        *ngFor=\"let option of filteredOptions; let i = index\"\r\n        class=\"muxima-select-option\"\r\n        [class.muxima-select-option-selected]=\"isSelected(option)\"\r\n        [class.muxima-select-option-disabled]=\"option.disabled\"\r\n        [class.muxima-select-option-focused]=\"i === focusedIndex\"\r\n        (click)=\"selectOption(option)\"\r\n      >\r\n        <span *ngIf=\"option.icon\" class=\"muxima-select-option-icon\">{{ option.icon }}</span>\r\n        <span class=\"muxima-select-option-label\">{{ option.label }}</span>\r\n        <span *ngIf=\"isSelected(option)\" class=\"muxima-select-option-check\">\u2713</span>\r\n      </li>\r\n      \r\n      <li *ngIf=\"filteredOptions.length === 0\" class=\"muxima-select-option muxima-select-option-empty\">\r\n        Nenhuma op\u00E7\u00E3o encontrada\r\n      </li>\r\n    </ul>\r\n  </div>\r\n\r\n  <!-- Helper Text -->\r\n  <div *ngIf=\"helperText && !hasError\" class=\"muxima-select-helper-text\">\r\n    {{ helperText }}\r\n  </div>\r\n\r\n  <!-- Error Message -->\r\n  <div *ngIf=\"errorMessage && hasError\" class=\"muxima-select-error-message\">\r\n    <span class=\"muxima-select-error-icon\">\u26A0</span>\r\n    <span>{{ errorMessage }}</span>\r\n  </div>\r\n</div>\r\n\r\n\r\n", styles: [":root{--muxima-primary: #667eea;--muxima-primary-light: #8b9df8;--muxima-primary-dark: #4c63d2;--muxima-secondary: #764ba2;--muxima-secondary-light: #9d6cc9;--muxima-secondary-dark: #5a3a7d;--muxima-accent: #8b9df8;--muxima-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);--muxima-success: #10b981;--muxima-success-light: #34d399;--muxima-success-dark: #059669;--muxima-warning: #f59e0b;--muxima-warning-light: #fbbf24;--muxima-warning-dark: #d97706;--muxima-danger: #ef4444;--muxima-danger-light: #f87171;--muxima-danger-dark: #dc2626;--muxima-info: #3b82f6;--muxima-info-light: #60a5fa;--muxima-info-dark: #2563eb}.muxima-select-container{position:relative;width:100%}.muxima-select-label{display:block;margin-bottom:.5rem;font-size:.875rem;font-weight:500;color:#1e293b;transition:color .2s ease}.muxima-select-wrapper{position:relative;display:flex;align-items:center;gap:.75rem;width:100%;padding:.75rem 1rem;font-size:1rem;color:#1e293b;background:white;border:2px solid #E2E8F0;border-radius:8px;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);outline:none}.muxima-select-wrapper:hover:not(.muxima-select-disabled):not(.muxima-select-readonly){border-color:#cbd5e1;box-shadow:0 2px 8px #0000000f}.muxima-select-wrapper:focus{border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}.muxima-select-prefix-icon{font-size:1.25rem;color:#64748b;flex-shrink:0}.muxima-select-value{flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.muxima-select-placeholder{color:#94a3b8}.muxima-select-selected{color:#1e293b;font-weight:500}.muxima-select-clear{display:flex;align-items:center;justify-content:center;width:20px;height:20px;padding:0;background:#E2E8F0;border:none;border-radius:50%;color:#64748b;font-size:.75rem;cursor:pointer;transition:all .2s ease;flex-shrink:0}.muxima-select-clear:hover{background:#CBD5E1;color:#475569;transform:scale(1.1)}.muxima-select-arrow{display:flex;align-items:center;color:#64748b;transition:transform .3s cubic-bezier(.4,0,.2,1);flex-shrink:0}.muxima-select-arrow svg{width:20px;height:20px}.muxima-select-arrow-open{transform:rotate(180deg)}.muxima-select-dropdown{position:absolute;z-index:1000;width:100%;margin-top:.5rem;background:white;border:1px solid #E2E8F0;border-radius:12px;box-shadow:0 10px 25px #0000001a,0 4px 10px #0000000d;max-height:300px;overflow:hidden;animation:dropdownSlideDown .25s cubic-bezier(.4,0,.2,1)}.muxima-select-dropdown.muxima-select-dropdown-upward{margin-top:0;margin-bottom:.5rem;animation:dropdownSlideUp .25s cubic-bezier(.4,0,.2,1)}@keyframes dropdownSlideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@keyframes dropdownSlideUp{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.muxima-select-search{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-bottom:1px solid #E2E8F0;background:#F8FAFC}.muxima-select-search-icon{font-size:1rem;color:#64748b;flex-shrink:0}.muxima-select-search-input{flex:1;padding:0;border:none;background:transparent;font-size:.875rem;color:#1e293b;outline:none}.muxima-select-search-input::placeholder{color:#94a3b8}.muxima-select-options{list-style:none;margin:0;padding:.5rem;max-height:250px;overflow-y:auto}.muxima-select-options::-webkit-scrollbar{width:6px}.muxima-select-options::-webkit-scrollbar-track{background:#F1F5F9;border-radius:3px}.muxima-select-options::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px}.muxima-select-options::-webkit-scrollbar-thumb:hover{background:#94A3B8}.muxima-select-option{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;font-size:.9375rem;color:#475569;border-radius:6px;cursor:pointer;transition:all .2s ease}.muxima-select-option:hover:not(.muxima-select-option-disabled){background:linear-gradient(135deg,rgba(59,130,246,.08),rgba(139,92,246,.08));color:#1e293b}.muxima-select-option.muxima-select-option-selected{background:linear-gradient(135deg,rgba(59,130,246,.12),rgba(139,92,246,.12));color:#3b82f6;font-weight:500}.muxima-select-option.muxima-select-option-focused{background:rgba(59,130,246,.05);outline:2px solid rgba(59,130,246,.2);outline-offset:-2px}.muxima-select-option.muxima-select-option-disabled{opacity:.5;cursor:not-allowed}.muxima-select-option.muxima-select-option-empty{justify-content:center;color:#94a3b8;cursor:default}.muxima-select-option.muxima-select-option-empty:hover{background:transparent}.muxima-select-option-icon{font-size:1.25rem;flex-shrink:0}.muxima-select-option-label{flex:1}.muxima-select-option-check{font-size:1rem;color:#3b82f6;font-weight:700;flex-shrink:0}.muxima-select-helper-text{margin-top:.375rem;font-size:.8125rem;color:#64748b}.muxima-select-error-message{display:flex;align-items:center;gap:.375rem;margin-top:.375rem;font-size:.8125rem;color:#ef4444}.muxima-select-error-icon{font-size:.875rem}.muxima-select-outlined{border-width:2px;border-color:#cbd5e1}.muxima-select-outlined:hover:not(.muxima-select-disabled):not(.muxima-select-readonly){border-color:#94a3b8}.muxima-select-outlined:focus{border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f626}.muxima-select-filled{background:#F1F5F9;border:2px solid transparent}.muxima-select-filled:hover:not(.muxima-select-disabled):not(.muxima-select-readonly){background:#E2E8F0}.muxima-select-filled:focus{background:white;border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}.muxima-select-gradient{position:relative;background:white;border:none}.muxima-select-gradient:before{content:\"\";position:absolute;inset:0;border-radius:8px;padding:2px;background:linear-gradient(135deg,#3B82F6,#8B5CF6);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;opacity:.5;transition:opacity .3s ease}.muxima-select-gradient:hover:not(.muxima-select-disabled):not(.muxima-select-readonly):before{opacity:.8}.muxima-select-gradient:focus:before{opacity:1;box-shadow:0 0 0 3px #3b82f61a}.muxima-select-glass{background:rgba(255,255,255,.1);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2);box-shadow:0 8px 32px #0000001a,inset 0 1px #ffffff4d}.muxima-select-glass .muxima-select-placeholder,.muxima-select-glass .muxima-select-selected{color:#1e293b;text-shadow:0 1px 2px rgba(255,255,255,.5)}.muxima-select-glass:hover:not(.muxima-select-disabled):not(.muxima-select-readonly){background:rgba(255,255,255,.15);border-color:#ffffff4d;box-shadow:0 12px 40px #00000026,inset 0 1px #fff6}.muxima-select-glass:focus{background:rgba(255,255,255,.2);border-color:#3b82f666;box-shadow:0 0 0 3px #3b82f61a,0 12px 40px #00000026,inset 0 1px #fff6}.muxima-select-sm{padding:.5rem .75rem;font-size:.875rem}.muxima-select-sm .muxima-select-prefix-icon{font-size:1rem}.muxima-select-sm .muxima-select-arrow svg{width:16px;height:16px}.muxima-select-lg{padding:1rem 1.25rem;font-size:1.125rem}.muxima-select-lg .muxima-select-prefix-icon{font-size:1.5rem}.muxima-select-lg .muxima-select-arrow svg{width:24px;height:24px}.muxima-select-error{border-color:#ef4444!important}.muxima-select-error:focus{box-shadow:0 0 0 3px #ef44441a!important}.muxima-select-error .muxima-select-label{color:#ef4444}.muxima-select-disabled{background:#F1F5F9!important;border-color:#e2e8f0!important;color:#94a3b8!important;cursor:not-allowed!important;opacity:.6}.muxima-select-disabled .muxima-select-arrow{color:#94a3b8}.muxima-select-readonly{background:#F8FAFC;cursor:default}.muxima-select-readonly .muxima-select-arrow{display:none}.muxima-select-open{border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}@media (max-width: 640px){.muxima-select-wrapper{font-size:.9375rem;padding:.625rem .875rem}.muxima-select-dropdown{max-height:250px}.muxima-select-option{padding:.625rem .875rem;font-size:.875rem}}\n"] }]
        }], propDecorators: { dropdownButton: [{
                type: ViewChild,
                args: ['dropdownButton', { static: false }]
            }], placeholder: [{
                type: Input
            }], label: [{
                type: Input
            }], helperText: [{
                type: Input
            }], size: [{
                type: Input
            }], variant: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], options: [{
                type: Input
            }], multiple: [{
                type: Input
            }], searchable: [{
                type: Input
            }], clearable: [{
                type: Input
            }], hasError: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], prefixIcon: [{
                type: Input
            }], onWindowChange: [{
                type: HostListener,
                args: ['window:resize']
            }, {
                type: HostListener,
                args: ['window:scroll']
            }], onClickOutside: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], onKeyDown: [{
                type: HostListener,
                args: ['document:keydown', ['$event']]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { SelectComponent };
//# sourceMappingURL=muxima-ui-select.mjs.map
