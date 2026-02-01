import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class RadioButtonComponent {
    constructor() {
        this.name = '';
        this.label = '';
        this.description = '';
        this.disabled = false;
        this.size = 'md';
        this.color = 'primary';
        this.required = false;
        this.valueChange = new EventEmitter();
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    get isChecked() {
        return this.selectedValue === this.value;
    }
    selectRadio() {
        if (this.disabled)
            return;
        this.selectedValue = this.value;
        this.valueChange.emit(this.value);
        this.onChange(this.value);
        this.onTouched();
    }
    // ControlValueAccessor methods
    writeValue(value) {
        this.selectedValue = value;
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
    getWrapperClasses() {
        const classes = ['muxima-radio-wrapper'];
        if (this.disabled)
            classes.push('muxima-radio-wrapper--disabled');
        if (this.size)
            classes.push(`muxima-radio-wrapper--${this.size}`);
        return classes;
    }
    getRadioClasses() {
        const classes = ['muxima-radio'];
        if (this.isChecked)
            classes.push('muxima-radio--checked');
        if (this.disabled)
            classes.push('muxima-radio--disabled');
        if (this.size)
            classes.push(`muxima-radio--${this.size}`);
        if (this.color)
            classes.push(`muxima-radio--${this.color}`);
        return classes;
    }
}
RadioButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: RadioButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RadioButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: RadioButtonComponent, isStandalone: true, selector: "muxima-radio-button", inputs: { value: "value", name: "name", label: "label", description: "description", disabled: "disabled", size: "size", color: "color", required: "required" }, outputs: { valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        }
    ], ngImport: i0, template: "<label [ngClass]=\"getWrapperClasses()\">\n  <div \n    [ngClass]=\"getRadioClasses()\"\n    [attr.aria-checked]=\"isChecked\"\n    [attr.aria-disabled]=\"disabled\"\n    [attr.tabindex]=\"disabled ? -1 : 0\"\n    role=\"radio\"\n    (click)=\"selectRadio()\"\n    (keydown.space)=\"$event.preventDefault(); selectRadio()\"\n    (keydown.enter)=\"$event.preventDefault(); selectRadio()\">\n    <div class=\"muxima-radio-outer\">\n      <div class=\"muxima-radio-inner\" *ngIf=\"isChecked\"></div>\n    </div>\n  </div>\n  \n  <div class=\"muxima-radio-content\" *ngIf=\"label || description\">\n    <span class=\"muxima-radio-label\" *ngIf=\"label\">\n      {{ label }}\n      <span class=\"muxima-radio-required\" *ngIf=\"required\">*</span>\n    </span>\n    <span class=\"muxima-radio-description\" *ngIf=\"description\">{{ description }}</span>\n  </div>\n</label>\r\n", styles: [":host{--muxima-white: #FFFFFF;--muxima-primary: var(--muxima-primary, #3B82F6);--muxima-primary-dark: var(--muxima-primary-dark, #2563EB);--muxima-success: var(--muxima-success, #10B981);--muxima-success-dark: var(--muxima-success-dark, #059669);--muxima-warning: var(--muxima-warning, #F59E0B);--muxima-warning-dark: var(--muxima-warning-dark, #D97706);--muxima-danger: var(--muxima-danger, #EF4444);--muxima-danger-dark: var(--muxima-danger-dark, #DC2626);--muxima-info: var(--muxima-info, #06B6D4);--muxima-info-dark: var(--muxima-info-dark, #0891B2);--muxima-gray-300: #D1D5DB;--muxima-gray-400: #9CA3AF;--muxima-gray-700: #374151;display:inline-block}.muxima-radio-wrapper{display:inline-flex;align-items:flex-start;gap:.75rem;cursor:pointer;-webkit-user-select:none;user-select:none}.muxima-radio-wrapper--disabled{opacity:.5;cursor:not-allowed}.muxima-radio{display:flex;align-items:center;justify-content:center;flex-shrink:0;outline:none;transition:all .2s cubic-bezier(.4,0,.2,1)}.muxima-radio:focus-visible{box-shadow:0 0 0 3px #3b82f64d;border-radius:50%}.muxima-radio-outer{width:20px;height:20px;border:2px solid var(--muxima-gray-400);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .2s ease;background:var(--muxima-white)}.muxima-radio:hover:not(.muxima-radio--disabled) .muxima-radio-outer{border-color:var(--muxima-primary);box-shadow:0 0 0 4px #3b82f61a}.muxima-radio-inner{width:10px;height:10px;border-radius:50%;animation:radioAppear .2s ease}.muxima-radio--checked .muxima-radio-outer{border-width:2px}.muxima-radio--primary.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-primary)}.muxima-radio--primary.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-primary) 0%,var(--muxima-primary-dark) 100%)}.muxima-radio--success.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-success)}.muxima-radio--success.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-success) 0%,var(--muxima-success-dark) 100%)}.muxima-radio--warning.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-warning)}.muxima-radio--warning.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-warning) 0%,var(--muxima-warning-dark) 100%)}.muxima-radio--danger.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-danger)}.muxima-radio--danger.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-danger) 0%,var(--muxima-danger-dark) 100%)}.muxima-radio--info.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-info)}.muxima-radio--info.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-info) 0%,var(--muxima-info-dark) 100%)}.muxima-radio--sm .muxima-radio-outer{width:16px;height:16px}.muxima-radio--sm .muxima-radio-inner{width:8px;height:8px}.muxima-radio--md .muxima-radio-outer{width:20px;height:20px}.muxima-radio--md .muxima-radio-inner{width:10px;height:10px}.muxima-radio--lg .muxima-radio-outer{width:24px;height:24px}.muxima-radio--lg .muxima-radio-inner{width:12px;height:12px}.muxima-radio-wrapper--sm{gap:.5rem}.muxima-radio-wrapper--md{gap:.75rem}.muxima-radio-wrapper--lg{gap:1rem}.muxima-radio-content{display:flex;flex-direction:column;gap:.25rem}.muxima-radio-label{font-size:.9375rem;font-weight:500;color:var(--muxima-gray-700);line-height:1.5}.muxima-radio-required{color:var(--muxima-danger);margin-left:.25rem}.muxima-radio-description{font-size:.875rem;color:var(--muxima-gray-400);line-height:1.4}.muxima-radio-wrapper--sm .muxima-radio-label{font-size:.875rem}.muxima-radio-wrapper--sm .muxima-radio-description{font-size:.8125rem}.muxima-radio-wrapper--lg .muxima-radio-label{font-size:1rem}.muxima-radio-wrapper--lg .muxima-radio-description{font-size:.9375rem}.muxima-radio--disabled{cursor:not-allowed}.muxima-radio--disabled .muxima-radio-outer{background:#F3F4F6}@keyframes radioAppear{0%{transform:scale(0);opacity:0}50%{transform:scale(1.2)}to{transform:scale(1);opacity:1}}@media (max-width: 640px){.muxima-radio-label{font-size:.875rem}.muxima-radio-description{font-size:.8125rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: RadioButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-radio-button', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => RadioButtonComponent),
                            multi: true
                        }
                    ], template: "<label [ngClass]=\"getWrapperClasses()\">\n  <div \n    [ngClass]=\"getRadioClasses()\"\n    [attr.aria-checked]=\"isChecked\"\n    [attr.aria-disabled]=\"disabled\"\n    [attr.tabindex]=\"disabled ? -1 : 0\"\n    role=\"radio\"\n    (click)=\"selectRadio()\"\n    (keydown.space)=\"$event.preventDefault(); selectRadio()\"\n    (keydown.enter)=\"$event.preventDefault(); selectRadio()\">\n    <div class=\"muxima-radio-outer\">\n      <div class=\"muxima-radio-inner\" *ngIf=\"isChecked\"></div>\n    </div>\n  </div>\n  \n  <div class=\"muxima-radio-content\" *ngIf=\"label || description\">\n    <span class=\"muxima-radio-label\" *ngIf=\"label\">\n      {{ label }}\n      <span class=\"muxima-radio-required\" *ngIf=\"required\">*</span>\n    </span>\n    <span class=\"muxima-radio-description\" *ngIf=\"description\">{{ description }}</span>\n  </div>\n</label>\r\n", styles: [":host{--muxima-white: #FFFFFF;--muxima-primary: var(--muxima-primary, #3B82F6);--muxima-primary-dark: var(--muxima-primary-dark, #2563EB);--muxima-success: var(--muxima-success, #10B981);--muxima-success-dark: var(--muxima-success-dark, #059669);--muxima-warning: var(--muxima-warning, #F59E0B);--muxima-warning-dark: var(--muxima-warning-dark, #D97706);--muxima-danger: var(--muxima-danger, #EF4444);--muxima-danger-dark: var(--muxima-danger-dark, #DC2626);--muxima-info: var(--muxima-info, #06B6D4);--muxima-info-dark: var(--muxima-info-dark, #0891B2);--muxima-gray-300: #D1D5DB;--muxima-gray-400: #9CA3AF;--muxima-gray-700: #374151;display:inline-block}.muxima-radio-wrapper{display:inline-flex;align-items:flex-start;gap:.75rem;cursor:pointer;-webkit-user-select:none;user-select:none}.muxima-radio-wrapper--disabled{opacity:.5;cursor:not-allowed}.muxima-radio{display:flex;align-items:center;justify-content:center;flex-shrink:0;outline:none;transition:all .2s cubic-bezier(.4,0,.2,1)}.muxima-radio:focus-visible{box-shadow:0 0 0 3px #3b82f64d;border-radius:50%}.muxima-radio-outer{width:20px;height:20px;border:2px solid var(--muxima-gray-400);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .2s ease;background:var(--muxima-white)}.muxima-radio:hover:not(.muxima-radio--disabled) .muxima-radio-outer{border-color:var(--muxima-primary);box-shadow:0 0 0 4px #3b82f61a}.muxima-radio-inner{width:10px;height:10px;border-radius:50%;animation:radioAppear .2s ease}.muxima-radio--checked .muxima-radio-outer{border-width:2px}.muxima-radio--primary.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-primary)}.muxima-radio--primary.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-primary) 0%,var(--muxima-primary-dark) 100%)}.muxima-radio--success.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-success)}.muxima-radio--success.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-success) 0%,var(--muxima-success-dark) 100%)}.muxima-radio--warning.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-warning)}.muxima-radio--warning.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-warning) 0%,var(--muxima-warning-dark) 100%)}.muxima-radio--danger.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-danger)}.muxima-radio--danger.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-danger) 0%,var(--muxima-danger-dark) 100%)}.muxima-radio--info.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-info)}.muxima-radio--info.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-info) 0%,var(--muxima-info-dark) 100%)}.muxima-radio--sm .muxima-radio-outer{width:16px;height:16px}.muxima-radio--sm .muxima-radio-inner{width:8px;height:8px}.muxima-radio--md .muxima-radio-outer{width:20px;height:20px}.muxima-radio--md .muxima-radio-inner{width:10px;height:10px}.muxima-radio--lg .muxima-radio-outer{width:24px;height:24px}.muxima-radio--lg .muxima-radio-inner{width:12px;height:12px}.muxima-radio-wrapper--sm{gap:.5rem}.muxima-radio-wrapper--md{gap:.75rem}.muxima-radio-wrapper--lg{gap:1rem}.muxima-radio-content{display:flex;flex-direction:column;gap:.25rem}.muxima-radio-label{font-size:.9375rem;font-weight:500;color:var(--muxima-gray-700);line-height:1.5}.muxima-radio-required{color:var(--muxima-danger);margin-left:.25rem}.muxima-radio-description{font-size:.875rem;color:var(--muxima-gray-400);line-height:1.4}.muxima-radio-wrapper--sm .muxima-radio-label{font-size:.875rem}.muxima-radio-wrapper--sm .muxima-radio-description{font-size:.8125rem}.muxima-radio-wrapper--lg .muxima-radio-label{font-size:1rem}.muxima-radio-wrapper--lg .muxima-radio-description{font-size:.9375rem}.muxima-radio--disabled{cursor:not-allowed}.muxima-radio--disabled .muxima-radio-outer{background:#F3F4F6}@keyframes radioAppear{0%{transform:scale(0);opacity:0}50%{transform:scale(1.2)}to{transform:scale(1);opacity:1}}@media (max-width: 640px){.muxima-radio-label{font-size:.875rem}.muxima-radio-description{font-size:.8125rem}}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], name: [{
                type: Input
            }], label: [{
                type: Input
            }], description: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }], required: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { RadioButtonComponent };
//# sourceMappingURL=agt-ui-radio-button.mjs.map
