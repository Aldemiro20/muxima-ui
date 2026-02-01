import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class CheckboxComponent {
    constructor() {
        this.checked = false;
        this.disabled = false;
        this.label = '';
        this.description = '';
        this.size = 'md';
        this.variant = 'primary';
        this.indeterminate = false;
        this.checkedChange = new EventEmitter();
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    getClasses() {
        return [
            'muxima--checkbox',
            `muxima--checkbox--${this.size}`,
            `muxima--checkbox--${this.variant}`,
            this.checked ? 'muxima--checkbox--checked' : '',
            this.disabled ? 'muxima--checkbox--disabled' : '',
            this.indeterminate ? 'muxima--checkbox--indeterminate' : '',
        ].filter(Boolean);
    }
    getWrapperClasses() {
        return [
            'muxima--checkbox-wrapper',
            this.disabled ? 'muxima--checkbox-wrapper--disabled' : '',
        ].filter(Boolean);
    }
    toggleCheck() {
        if (!this.disabled) {
            if (this.indeterminate) {
                this.indeterminate = false;
                this.checked = true;
            }
            else {
                this.checked = !this.checked;
            }
            this.checkedChange.emit(this.checked);
            this.onChange(this.checked);
            this.onTouched();
        }
    }
    // ControlValueAccessor methods
    writeValue(value) {
        this.checked = value;
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
CheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CheckboxComponent, isStandalone: true, selector: "muxima-checkbox", inputs: { checked: "checked", disabled: "disabled", label: "label", description: "description", size: "size", variant: "variant", indeterminate: "indeterminate" }, outputs: { checkedChange: "checkedChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ], ngImport: i0, template: "<label [ngClass]=\"getWrapperClasses()\">\r\n  <div \r\n    [ngClass]=\"getClasses()\" \r\n    (click)=\"toggleCheck()\"\r\n    role=\"checkbox\" \r\n    [attr.aria-checked]=\"checked\" \r\n    [attr.aria-disabled]=\"disabled\"\r\n    [attr.tabindex]=\"disabled ? -1 : 0\"\r\n    (keydown.space)=\"$event.preventDefault(); toggleCheck()\"\r\n    (keydown.enter)=\"$event.preventDefault(); toggleCheck()\">\r\n    \r\n    <!-- Checkmark icon -->\r\n    <svg *ngIf=\"checked && !indeterminate\" \r\n         class=\"muxima--checkbox-icon\" \r\n         viewBox=\"0 0 12 9\" \r\n         fill=\"none\" \r\n         xmlns=\"http://www.w3.org/2000/svg\">\r\n      <path d=\"M10.6673 1.5L4.25065 7.91667L1.33398 5\" \r\n            stroke=\"currentColor\" \r\n            stroke-width=\"2\" \r\n            stroke-linecap=\"round\" \r\n            stroke-linejoin=\"round\"/>\r\n    </svg>\r\n    \r\n    <!-- Indeterminate icon -->\r\n    <svg *ngIf=\"indeterminate\" \r\n         class=\"muxima--checkbox-icon muxima--checkbox-icon--indeterminate\" \r\n         viewBox=\"0 0 12 2\" \r\n         fill=\"none\" \r\n         xmlns=\"http://www.w3.org/2000/svg\">\r\n      <path d=\"M1 1H11\" \r\n            stroke=\"currentColor\" \r\n            stroke-width=\"2\" \r\n            stroke-linecap=\"round\"/>\r\n    </svg>\r\n  </div>\r\n  \r\n  <div class=\"muxima--checkbox-content\" *ngIf=\"label || description\">\r\n    <span class=\"muxima--checkbox-label\" *ngIf=\"label\">{{ label }}</span>\r\n    <span class=\"muxima--checkbox-description\" *ngIf=\"description\">{{ description }}</span>\r\n  </div>\r\n</label>\r\n", styles: [":host{--muxima-white: #FFFFFF;--muxima-gray-50: #F9FAFB;--muxima-gray-200: #E5E7EB;--muxima-gray-300: #D1D5DB;--muxima-gray-400: #9CA3AF;--muxima-gray-600: #4B5563;--muxima-gray-700: #374151;--muxima-gray-900: #111827;--muxima-primary: var(--muxima-primary, #3B82F6);--muxima-primary-hover: var(--muxima-primary-dark, #2563EB);--muxima-primary-dark: var(--muxima-primary-dark, #1D4ED8);--muxima-success: var(--muxima-success, #10B981);--muxima-success-hover: var(--muxima-success-dark, #059669);--muxima-success-dark: var(--muxima-success-dark, #047857);--muxima-danger: var(--muxima-danger, #EF4444);--muxima-danger-hover: var(--muxima-danger-dark, #DC2626);--muxima-danger-dark: var(--muxima-danger-dark, #B91C1C);--muxima-warning: var(--muxima-warning, #F59E0B);--muxima-warning-hover: var(--muxima-warning-dark, #D97706);--muxima-warning-dark: #B45309;--transition-fast: .15s cubic-bezier(.4, 0, .2, 1);--transition-normal: .2s cubic-bezier(.4, 0, .2, 1)}.muxima--checkbox-wrapper{display:inline-flex;align-items:flex-start;gap:.75rem;cursor:pointer;user-select:none;-webkit-user-select:none;position:relative}.muxima--checkbox-wrapper--disabled{cursor:not-allowed;opacity:.6}.muxima--checkbox{position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;border:2px solid var(--muxima-gray-300);border-radius:6px;background-color:var(--muxima-white);transition:all var(--transition-normal);cursor:pointer;outline:none}.muxima--checkbox:hover:not(.muxima--checkbox--disabled){border-color:var(--muxima-gray-400);box-shadow:0 0 0 4px #3b82f61a}.muxima--checkbox:focus-visible{box-shadow:0 0 0 4px #3b82f633}.muxima--checkbox--sm{width:16px;height:16px;border-radius:4px}.muxima--checkbox--md{width:20px;height:20px;border-radius:5px}.muxima--checkbox--lg{width:24px;height:24px;border-radius:6px}.muxima--checkbox--xl{width:28px;height:28px;border-radius:7px}.muxima--checkbox--checked,.muxima--checkbox--indeterminate{border-color:transparent}.muxima--checkbox--default.muxima--checkbox--checked,.muxima--checkbox--default.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#6B7280 0%,#4B5563 100%)}.muxima--checkbox--default.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--default.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#4B5563 0%,#374151 100%);box-shadow:0 0 0 4px #6b728026}.muxima--checkbox--primary.muxima--checkbox--checked,.muxima--checkbox--primary.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#3B82F6 0%,#2563EB 100%)}.muxima--checkbox--primary.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--primary.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%);box-shadow:0 0 0 4px #3b82f633}.muxima--checkbox--primary:hover:not(.muxima--checkbox--disabled):not(.muxima--checkbox--checked):not(.muxima--checkbox--indeterminate){border-color:var(--muxima-primary);box-shadow:0 0 0 4px #3b82f61a}.muxima--checkbox--success.muxima--checkbox--checked,.muxima--checkbox--success.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#10B981 0%,#059669 100%)}.muxima--checkbox--success.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--success.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#059669 0%,#047857 100%);box-shadow:0 0 0 4px #10b98133}.muxima--checkbox--success:hover:not(.muxima--checkbox--disabled):not(.muxima--checkbox--checked):not(.muxima--checkbox--indeterminate){border-color:var(--muxima-success);box-shadow:0 0 0 4px #10b9811a}.muxima--checkbox--danger.muxima--checkbox--checked,.muxima--checkbox--danger.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#EF4444 0%,#DC2626 100%)}.muxima--checkbox--danger.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--danger.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#DC2626 0%,#B91C1C 100%);box-shadow:0 0 0 4px #ef444433}.muxima--checkbox--danger:hover:not(.muxima--checkbox--disabled):not(.muxima--checkbox--checked):not(.muxima--checkbox--indeterminate){border-color:var(--muxima-danger);box-shadow:0 0 0 4px #ef44441a}.muxima--checkbox--warning.muxima--checkbox--checked,.muxima--checkbox--warning.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#F59E0B 0%,#D97706 100%)}.muxima--checkbox--warning.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--warning.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#D97706 0%,#B45309 100%);box-shadow:0 0 0 4px #f59e0b33}.muxima--checkbox--warning:hover:not(.muxima--checkbox--disabled):not(.muxima--checkbox--checked):not(.muxima--checkbox--indeterminate){border-color:var(--muxima-warning);box-shadow:0 0 0 4px #f59e0b1a}.muxima--checkbox--disabled{cursor:not-allowed;background-color:var(--muxima-gray-50);border-color:var(--muxima-gray-200)}.muxima--checkbox--disabled.muxima--checkbox--checked,.muxima--checkbox--disabled.muxima--checkbox--indeterminate{background:var(--muxima-gray-300)}.muxima--checkbox-icon{color:var(--muxima-white);width:70%;height:70%;display:flex;align-items:center;justify-content:center;animation:checkmarkAppear .2s cubic-bezier(.4,0,.2,1)}.muxima--checkbox--sm .muxima--checkbox-icon{width:65%;height:65%}.muxima--checkbox--xl .muxima--checkbox-icon{width:75%;height:75%}.muxima--checkbox-icon svg{width:100%;height:100%;display:block}.muxima--checkbox-content{display:flex;flex-direction:column;gap:.125rem;padding-top:2px}.muxima--checkbox-label{font-size:.875rem;font-weight:500;color:var(--muxima-gray-900);line-height:1.25rem}.muxima--checkbox-description{font-size:.8125rem;color:var(--muxima-gray-600);line-height:1.125rem}.muxima--checkbox-wrapper--disabled .muxima--checkbox-label,.muxima--checkbox-wrapper--disabled .muxima--checkbox-description{color:var(--muxima-gray-400)}@keyframes checkmarkAppear{0%{opacity:0;transform:scale(.5) rotate(-45deg)}50%{opacity:1;transform:scale(1.1) rotate(0)}to{opacity:1;transform:scale(1) rotate(0)}}@media (max-width: 640px){.muxima--checkbox-label{font-size:.8125rem}.muxima--checkbox-description{font-size:.75rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-checkbox', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => CheckboxComponent),
                            multi: true,
                        },
                    ], template: "<label [ngClass]=\"getWrapperClasses()\">\r\n  <div \r\n    [ngClass]=\"getClasses()\" \r\n    (click)=\"toggleCheck()\"\r\n    role=\"checkbox\" \r\n    [attr.aria-checked]=\"checked\" \r\n    [attr.aria-disabled]=\"disabled\"\r\n    [attr.tabindex]=\"disabled ? -1 : 0\"\r\n    (keydown.space)=\"$event.preventDefault(); toggleCheck()\"\r\n    (keydown.enter)=\"$event.preventDefault(); toggleCheck()\">\r\n    \r\n    <!-- Checkmark icon -->\r\n    <svg *ngIf=\"checked && !indeterminate\" \r\n         class=\"muxima--checkbox-icon\" \r\n         viewBox=\"0 0 12 9\" \r\n         fill=\"none\" \r\n         xmlns=\"http://www.w3.org/2000/svg\">\r\n      <path d=\"M10.6673 1.5L4.25065 7.91667L1.33398 5\" \r\n            stroke=\"currentColor\" \r\n            stroke-width=\"2\" \r\n            stroke-linecap=\"round\" \r\n            stroke-linejoin=\"round\"/>\r\n    </svg>\r\n    \r\n    <!-- Indeterminate icon -->\r\n    <svg *ngIf=\"indeterminate\" \r\n         class=\"muxima--checkbox-icon muxima--checkbox-icon--indeterminate\" \r\n         viewBox=\"0 0 12 2\" \r\n         fill=\"none\" \r\n         xmlns=\"http://www.w3.org/2000/svg\">\r\n      <path d=\"M1 1H11\" \r\n            stroke=\"currentColor\" \r\n            stroke-width=\"2\" \r\n            stroke-linecap=\"round\"/>\r\n    </svg>\r\n  </div>\r\n  \r\n  <div class=\"muxima--checkbox-content\" *ngIf=\"label || description\">\r\n    <span class=\"muxima--checkbox-label\" *ngIf=\"label\">{{ label }}</span>\r\n    <span class=\"muxima--checkbox-description\" *ngIf=\"description\">{{ description }}</span>\r\n  </div>\r\n</label>\r\n", styles: [":host{--muxima-white: #FFFFFF;--muxima-gray-50: #F9FAFB;--muxima-gray-200: #E5E7EB;--muxima-gray-300: #D1D5DB;--muxima-gray-400: #9CA3AF;--muxima-gray-600: #4B5563;--muxima-gray-700: #374151;--muxima-gray-900: #111827;--muxima-primary: var(--muxima-primary, #3B82F6);--muxima-primary-hover: var(--muxima-primary-dark, #2563EB);--muxima-primary-dark: var(--muxima-primary-dark, #1D4ED8);--muxima-success: var(--muxima-success, #10B981);--muxima-success-hover: var(--muxima-success-dark, #059669);--muxima-success-dark: var(--muxima-success-dark, #047857);--muxima-danger: var(--muxima-danger, #EF4444);--muxima-danger-hover: var(--muxima-danger-dark, #DC2626);--muxima-danger-dark: var(--muxima-danger-dark, #B91C1C);--muxima-warning: var(--muxima-warning, #F59E0B);--muxima-warning-hover: var(--muxima-warning-dark, #D97706);--muxima-warning-dark: #B45309;--transition-fast: .15s cubic-bezier(.4, 0, .2, 1);--transition-normal: .2s cubic-bezier(.4, 0, .2, 1)}.muxima--checkbox-wrapper{display:inline-flex;align-items:flex-start;gap:.75rem;cursor:pointer;user-select:none;-webkit-user-select:none;position:relative}.muxima--checkbox-wrapper--disabled{cursor:not-allowed;opacity:.6}.muxima--checkbox{position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;border:2px solid var(--muxima-gray-300);border-radius:6px;background-color:var(--muxima-white);transition:all var(--transition-normal);cursor:pointer;outline:none}.muxima--checkbox:hover:not(.muxima--checkbox--disabled){border-color:var(--muxima-gray-400);box-shadow:0 0 0 4px #3b82f61a}.muxima--checkbox:focus-visible{box-shadow:0 0 0 4px #3b82f633}.muxima--checkbox--sm{width:16px;height:16px;border-radius:4px}.muxima--checkbox--md{width:20px;height:20px;border-radius:5px}.muxima--checkbox--lg{width:24px;height:24px;border-radius:6px}.muxima--checkbox--xl{width:28px;height:28px;border-radius:7px}.muxima--checkbox--checked,.muxima--checkbox--indeterminate{border-color:transparent}.muxima--checkbox--default.muxima--checkbox--checked,.muxima--checkbox--default.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#6B7280 0%,#4B5563 100%)}.muxima--checkbox--default.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--default.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#4B5563 0%,#374151 100%);box-shadow:0 0 0 4px #6b728026}.muxima--checkbox--primary.muxima--checkbox--checked,.muxima--checkbox--primary.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#3B82F6 0%,#2563EB 100%)}.muxima--checkbox--primary.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--primary.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%);box-shadow:0 0 0 4px #3b82f633}.muxima--checkbox--primary:hover:not(.muxima--checkbox--disabled):not(.muxima--checkbox--checked):not(.muxima--checkbox--indeterminate){border-color:var(--muxima-primary);box-shadow:0 0 0 4px #3b82f61a}.muxima--checkbox--success.muxima--checkbox--checked,.muxima--checkbox--success.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#10B981 0%,#059669 100%)}.muxima--checkbox--success.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--success.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#059669 0%,#047857 100%);box-shadow:0 0 0 4px #10b98133}.muxima--checkbox--success:hover:not(.muxima--checkbox--disabled):not(.muxima--checkbox--checked):not(.muxima--checkbox--indeterminate){border-color:var(--muxima-success);box-shadow:0 0 0 4px #10b9811a}.muxima--checkbox--danger.muxima--checkbox--checked,.muxima--checkbox--danger.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#EF4444 0%,#DC2626 100%)}.muxima--checkbox--danger.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--danger.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#DC2626 0%,#B91C1C 100%);box-shadow:0 0 0 4px #ef444433}.muxima--checkbox--danger:hover:not(.muxima--checkbox--disabled):not(.muxima--checkbox--checked):not(.muxima--checkbox--indeterminate){border-color:var(--muxima-danger);box-shadow:0 0 0 4px #ef44441a}.muxima--checkbox--warning.muxima--checkbox--checked,.muxima--checkbox--warning.muxima--checkbox--indeterminate{background:linear-gradient(135deg,#F59E0B 0%,#D97706 100%)}.muxima--checkbox--warning.muxima--checkbox--checked:hover:not(.muxima--checkbox--disabled),.muxima--checkbox--warning.muxima--checkbox--indeterminate:hover:not(.muxima--checkbox--disabled){background:linear-gradient(135deg,#D97706 0%,#B45309 100%);box-shadow:0 0 0 4px #f59e0b33}.muxima--checkbox--warning:hover:not(.muxima--checkbox--disabled):not(.muxima--checkbox--checked):not(.muxima--checkbox--indeterminate){border-color:var(--muxima-warning);box-shadow:0 0 0 4px #f59e0b1a}.muxima--checkbox--disabled{cursor:not-allowed;background-color:var(--muxima-gray-50);border-color:var(--muxima-gray-200)}.muxima--checkbox--disabled.muxima--checkbox--checked,.muxima--checkbox--disabled.muxima--checkbox--indeterminate{background:var(--muxima-gray-300)}.muxima--checkbox-icon{color:var(--muxima-white);width:70%;height:70%;display:flex;align-items:center;justify-content:center;animation:checkmarkAppear .2s cubic-bezier(.4,0,.2,1)}.muxima--checkbox--sm .muxima--checkbox-icon{width:65%;height:65%}.muxima--checkbox--xl .muxima--checkbox-icon{width:75%;height:75%}.muxima--checkbox-icon svg{width:100%;height:100%;display:block}.muxima--checkbox-content{display:flex;flex-direction:column;gap:.125rem;padding-top:2px}.muxima--checkbox-label{font-size:.875rem;font-weight:500;color:var(--muxima-gray-900);line-height:1.25rem}.muxima--checkbox-description{font-size:.8125rem;color:var(--muxima-gray-600);line-height:1.125rem}.muxima--checkbox-wrapper--disabled .muxima--checkbox-label,.muxima--checkbox-wrapper--disabled .muxima--checkbox-description{color:var(--muxima-gray-400)}@keyframes checkmarkAppear{0%{opacity:0;transform:scale(.5) rotate(-45deg)}50%{opacity:1;transform:scale(1.1) rotate(0)}to{opacity:1;transform:scale(1) rotate(0)}}@media (max-width: 640px){.muxima--checkbox-label{font-size:.8125rem}.muxima--checkbox-description{font-size:.75rem}}\n"] }]
        }], propDecorators: { checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], label: [{
                type: Input
            }], description: [{
                type: Input
            }], size: [{
                type: Input
            }], variant: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], checkedChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CheckboxComponent };
//# sourceMappingURL=agt-ui-checkbox.mjs.map
