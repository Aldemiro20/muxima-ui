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
        this.icon = ''; // Icon or emoji
        this.badge = ''; // Badge text (e.g., "New", "Popular")
        this.price = ''; // For pricing cards
        this.subtitle = ''; // Additional subtitle
        this.disabled = false;
        this.size = 'md';
        this.color = 'primary';
        this.variant = 'default';
        this.required = false;
        this.error = false;
        this.helperText = '';
        this.showCheckIcon = false; // Show checkmark when selected
        this.glow = false; // Glow effect when selected
        this.bordered = true; // Show border
        this.rounded = true; // Rounded corners
        this.valueChange = new EventEmitter();
        this.radioChange = new EventEmitter();
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    get isChecked() {
        return this.selectedValue === this.value;
    }
    selectRadio(event) {
        if (this.disabled) {
            event?.preventDefault();
            return;
        }
        this.selectedValue = this.value;
        this.valueChange.emit(this.value);
        this.radioChange.emit({
            value: this.value,
            label: this.label
        });
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
        if (this.variant)
            classes.push(`muxima-radio-wrapper--${this.variant}`);
        if (this.isChecked)
            classes.push('muxima-radio-wrapper--checked');
        if (this.error)
            classes.push('muxima-radio-wrapper--error');
        if (this.glow && this.isChecked)
            classes.push('muxima-radio-wrapper--glow');
        if (!this.bordered)
            classes.push('muxima-radio-wrapper--no-border');
        if (!this.rounded)
            classes.push('muxima-radio-wrapper--square');
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
        if (this.error)
            classes.push('muxima-radio--error');
        return classes;
    }
    getLabelClasses() {
        const classes = ['muxima-radio-label'];
        if (this.disabled)
            classes.push('muxima-radio-label--disabled');
        if (this.size)
            classes.push(`muxima-radio-label--${this.size}`);
        return classes;
    }
}
RadioButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: RadioButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RadioButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: RadioButtonComponent, isStandalone: true, selector: "muxima-radio-button", inputs: { value: "value", name: "name", label: "label", description: "description", icon: "icon", badge: "badge", price: "price", subtitle: "subtitle", disabled: "disabled", size: "size", color: "color", variant: "variant", required: "required", error: "error", helperText: "helperText", showCheckIcon: "showCheckIcon", glow: "glow", bordered: "bordered", rounded: "rounded" }, outputs: { valueChange: "valueChange", radioChange: "radioChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        }
    ], ngImport: i0, template: "<label [ngClass]=\"getWrapperClasses()\" (click)=\"selectRadio($event)\">\n  <!-- Badge (New, Popular, etc) -->\n  <div class=\"muxima-radio-badge\" *ngIf=\"badge && !disabled\">\n    {{ badge }}\n  </div>\n\n  <!-- Icon (for card/tile variants) -->\n  <div class=\"muxima-radio-icon\" *ngIf=\"icon\">\n    <span class=\"muxima-radio-icon-content\">{{ icon }}</span>\n  </div>\n\n  <!-- Radio Circle -->\n  <div \n    [ngClass]=\"getRadioClasses()\"\n    [attr.aria-checked]=\"isChecked\"\n    [attr.aria-disabled]=\"disabled\"\n    [attr.tabindex]=\"disabled ? -1 : 0\"\n    role=\"radio\"\n    (keydown.space)=\"$event.preventDefault(); selectRadio($event)\"\n    (keydown.enter)=\"$event.preventDefault(); selectRadio($event)\">\n    <div class=\"muxima-radio-outer\">\n      <div class=\"muxima-radio-inner\" *ngIf=\"isChecked\"></div>\n    </div>\n    \n    <!-- Check Icon (alternative to dot) -->\n    <svg *ngIf=\"showCheckIcon && isChecked\" \n         class=\"muxima-radio-check-icon\" \n         viewBox=\"0 0 24 24\" \n         fill=\"none\" \n         stroke=\"currentColor\" \n         stroke-width=\"3\">\n      <polyline points=\"20 6 9 17 4 12\"></polyline>\n    </svg>\n  </div>\n  \n  <!-- Content -->\n  <div class=\"muxima-radio-content\" *ngIf=\"label || description || subtitle || price\">\n    <!-- Price (for pricing cards) -->\n    <div class=\"muxima-radio-price\" *ngIf=\"price\">\n      {{ price }}\n    </div>\n    \n    <!-- Label -->\n    <span [ngClass]=\"getLabelClasses()\" *ngIf=\"label\">\n      {{ label }}\n      <span class=\"muxima-radio-required\" *ngIf=\"required\">*</span>\n    </span>\n    \n    <!-- Subtitle -->\n    <span class=\"muxima-radio-subtitle\" *ngIf=\"subtitle\">{{ subtitle }}</span>\n    \n    <!-- Description -->\n    <span class=\"muxima-radio-description\" *ngIf=\"description\">{{ description }}</span>\n  </div>\n  \n  <!-- Selected Indicator (for button/tile variants) -->\n  <div class=\"muxima-radio-selected-indicator\" *ngIf=\"isChecked && (variant === 'card' || variant === 'tile')\">\n    <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\n      <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/>\n    </svg>\n  </div>\n</label>\n\n<!-- Helper Text / Error Message -->\n<div class=\"muxima-radio-helper\" *ngIf=\"helperText && !variant\">\n  <span [class.muxima-radio-error-text]=\"error\">{{ helperText }}</span>\n</div>\n", styles: [":host{--muxima-white: #FFFFFF;--muxima-primary: var(--muxima-primary, #3B82F6);--muxima-primary-dark: var(--muxima-primary-dark, #2563EB);--muxima-primary-light: var(--muxima-primary-light, #DBEAFE);--muxima-success: var(--muxima-success, #10B981);--muxima-success-dark: var(--muxima-success-dark, #059669);--muxima-success-light: var(--muxima-success-light, #D1FAE5);--muxima-warning: var(--muxima-warning, #F59E0B);--muxima-warning-dark: var(--muxima-warning-dark, #D97706);--muxima-warning-light: var(--muxima-warning-light, #FEF3C7);--muxima-danger: var(--muxima-danger, #EF4444);--muxima-danger-dark: var(--muxima-danger-dark, #DC2626);--muxima-danger-light: var(--muxima-danger-light, #FEE2E2);--muxima-info: var(--muxima-info, #06B6D4);--muxima-info-dark: var(--muxima-info-dark, #0891B2);--muxima-info-light: var(--muxima-info-light, #CFFAFE);--muxima-purple: #8B5CF6;--muxima-purple-dark: #7C3AED;--muxima-purple-light: #EDE9FE;--muxima-pink: #EC4899;--muxima-pink-dark: #DB2777;--muxima-pink-light: #FCE7F3;--muxima-gray-100: #F3F4F6;--muxima-gray-200: #E5E7EB;--muxima-gray-300: #D1D5DB;--muxima-gray-400: #9CA3AF;--muxima-gray-500: #6B7280;--muxima-gray-600: #4B5563;--muxima-gray-700: #374151;--muxima-gray-900: #111827;display:inline-block}.muxima-radio-wrapper{position:relative;display:inline-flex;align-items:flex-start;gap:.75rem;cursor:pointer;-webkit-user-select:none;user-select:none;transition:all .2s ease}.muxima-radio-wrapper--disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.muxima-radio-wrapper--card{flex-direction:column;padding:1.5rem;border:2px solid var(--muxima-gray-200);border-radius:12px;background:var(--muxima-white);transition:all .3s cubic-bezier(.4,0,.2,1);min-width:200px}.muxima-radio-wrapper--card:hover:not(.muxima-radio-wrapper--disabled){border-color:var(--muxima-primary);box-shadow:0 4px 12px #3b82f626;transform:translateY(-2px)}.muxima-radio-wrapper--card.muxima-radio-wrapper--checked{border-color:var(--muxima-primary);background:var(--muxima-primary-light);box-shadow:0 4px 16px #3b82f633}.muxima-radio-wrapper--button{padding:.75rem 1.5rem;border:2px solid var(--muxima-gray-300);border-radius:8px;background:var(--muxima-white);transition:all .2s ease;justify-content:center;min-width:120px}.muxima-radio-wrapper--button:hover:not(.muxima-radio-wrapper--disabled){border-color:var(--muxima-primary);background:var(--muxima-gray-100)}.muxima-radio-wrapper--button.muxima-radio-wrapper--checked{border-color:var(--muxima-primary);background:var(--muxima-primary);color:var(--muxima-white)}.muxima-radio-wrapper--button.muxima-radio-wrapper--checked .muxima-radio-label{color:var(--muxima-white);font-weight:600}.muxima-radio-wrapper--button .muxima-radio{display:none}.muxima-radio-wrapper--tile{flex-direction:column;align-items:center;padding:2rem 1.5rem;border:2px solid var(--muxima-gray-200);border-radius:16px;background:var(--muxima-white);transition:all .3s ease;min-width:150px;text-align:center}.muxima-radio-wrapper--tile:hover:not(.muxima-radio-wrapper--disabled){border-color:var(--muxima-primary);box-shadow:0 8px 24px #3b82f61f;transform:scale(1.02)}.muxima-radio-wrapper--tile.muxima-radio-wrapper--checked{border-color:var(--muxima-primary);background:linear-gradient(135deg,var(--muxima-primary-light) 0%,var(--muxima-white) 100%);box-shadow:0 8px 24px #3b82f633}.muxima-radio-wrapper--tile .muxima-radio{order:-1;margin-bottom:1rem}.muxima-radio-wrapper--minimal{gap:.5rem}.muxima-radio-wrapper--minimal .muxima-radio-outer{border-width:1px}.muxima-radio-wrapper--glow.muxima-radio-wrapper--checked{filter:drop-shadow(0 0 12px rgba(59,130,246,.6))}.muxima-radio-wrapper--no-border{border:none!important}.muxima-radio-wrapper--square{border-radius:0!important}.muxima-radio-wrapper--error .muxima-radio-outer,.muxima-radio-wrapper--error.muxima-radio-wrapper--card,.muxima-radio-wrapper--error.muxima-radio-wrapper--tile{border-color:var(--muxima-danger)!important}.muxima-radio-badge{position:absolute;top:-8px;right:-8px;padding:.25rem .5rem;background:linear-gradient(135deg,var(--muxima-primary) 0%,var(--muxima-primary-dark) 100%);color:var(--muxima-white);font-size:.625rem;font-weight:700;border-radius:6px;text-transform:uppercase;letter-spacing:.05em;box-shadow:0 2px 8px #3b82f666;z-index:10}.muxima-radio-icon{display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:var(--muxima-gray-100);border-radius:12px;margin-bottom:.75rem}.muxima-radio-icon-content{font-size:1.5rem}.muxima-radio-wrapper--checked .muxima-radio-icon{background:var(--muxima-primary-light)}.muxima-radio{position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;outline:none;transition:all .2s cubic-bezier(.4,0,.2,1)}.muxima-radio:focus-visible{box-shadow:0 0 0 3px #3b82f64d;border-radius:50%}.muxima-radio-outer{width:20px;height:20px;border:2px solid var(--muxima-gray-400);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .2s ease;background:var(--muxima-white);box-shadow:inset 0 1px 2px #0000000d}.muxima-radio:hover:not(.muxima-radio--disabled) .muxima-radio-outer{border-color:var(--muxima-primary);box-shadow:0 0 0 4px #3b82f61a}.muxima-radio-inner{width:10px;height:10px;border-radius:50%;animation:radioAppear .2s ease;box-shadow:0 2px 4px #0003}@keyframes radioAppear{0%{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}.muxima-radio-check-icon{position:absolute;width:16px;height:16px;color:var(--muxima-white);animation:checkAppear .2s ease}@keyframes checkAppear{0%{transform:scale(0) rotate(-45deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}.muxima-radio--primary.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-primary);background:var(--muxima-white)}.muxima-radio--primary.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-primary) 0%,var(--muxima-primary-dark) 100%)}.muxima-radio--success.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-success)}.muxima-radio--success.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-success) 0%,var(--muxima-success-dark) 100%)}.muxima-radio--warning.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-warning)}.muxima-radio--warning.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-warning) 0%,var(--muxima-warning-dark) 100%)}.muxima-radio--danger.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-danger)}.muxima-radio--danger.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-danger) 0%,var(--muxima-danger-dark) 100%)}.muxima-radio--info.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-info)}.muxima-radio--info.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-info) 0%,var(--muxima-info-dark) 100%)}.muxima-radio--purple.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-purple)}.muxima-radio--purple.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-purple) 0%,var(--muxima-purple-dark) 100%)}.muxima-radio--pink.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-pink)}.muxima-radio--pink.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-pink) 0%,var(--muxima-pink-dark) 100%)}.muxima-radio--xs .muxima-radio-outer{width:14px;height:14px}.muxima-radio--xs .muxima-radio-inner{width:6px;height:6px}.muxima-radio--sm .muxima-radio-outer{width:16px;height:16px}.muxima-radio--sm .muxima-radio-inner{width:8px;height:8px}.muxima-radio--md .muxima-radio-outer{width:20px;height:20px}.muxima-radio--md .muxima-radio-inner{width:10px;height:10px}.muxima-radio--lg .muxima-radio-outer{width:24px;height:24px}.muxima-radio--lg .muxima-radio-inner{width:12px;height:12px}.muxima-radio--xl .muxima-radio-outer{width:28px;height:28px}.muxima-radio--xl .muxima-radio-inner{width:14px;height:14px}.muxima-radio-wrapper--xs{gap:.375rem}.muxima-radio-wrapper--sm{gap:.5rem}.muxima-radio-wrapper--md{gap:.75rem}.muxima-radio-wrapper--lg{gap:1rem}.muxima-radio-wrapper--xl{gap:1.25rem}.muxima-radio-content{display:flex;flex-direction:column;gap:.25rem;flex:1}.muxima-radio-label{font-size:.9375rem;font-weight:500;color:var(--muxima-gray-900);line-height:1.5}.muxima-radio-label--disabled{color:var(--muxima-gray-400)}.muxima-radio-subtitle{font-size:.8125rem;font-weight:500;color:var(--muxima-gray-600);line-height:1.4}.muxima-radio-description{font-size:.875rem;color:var(--muxima-gray-500);line-height:1.4}.muxima-radio-required{color:var(--muxima-danger);margin-left:.25rem}.muxima-radio-price{font-size:1.875rem;font-weight:700;color:var(--muxima-primary);margin-bottom:.5rem;background:linear-gradient(135deg,var(--muxima-primary) 0%,var(--muxima-primary-dark) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.muxima-radio-selected-indicator{position:absolute;top:8px;right:8px;width:24px;height:24px;background:var(--muxima-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px #3b82f666;animation:indicatorAppear .3s ease}.muxima-radio-selected-indicator svg{width:14px;height:14px;color:var(--muxima-white)}@keyframes indicatorAppear{0%{transform:scale(0) rotate(-180deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}.muxima-radio-helper{margin-top:.375rem;font-size:.8125rem;color:var(--muxima-gray-500);line-height:1.4}.muxima-radio-error-text{color:var(--muxima-danger);font-weight:500}.muxima-radio-label--xs{font-size:.8125rem}.muxima-radio-label--sm{font-size:.875rem}.muxima-radio-label--md{font-size:.9375rem}.muxima-radio-label--lg{font-size:1rem}.muxima-radio-label--xl{font-size:1.125rem}@media (max-width: 640px){.muxima-radio-wrapper--card,.muxima-radio-wrapper--tile{min-width:100%}.muxima-radio-wrapper--button{min-width:100px;padding:.625rem 1rem}.muxima-radio-price{font-size:1.5rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: RadioButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-radio-button', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => RadioButtonComponent),
                            multi: true
                        }
                    ], template: "<label [ngClass]=\"getWrapperClasses()\" (click)=\"selectRadio($event)\">\n  <!-- Badge (New, Popular, etc) -->\n  <div class=\"muxima-radio-badge\" *ngIf=\"badge && !disabled\">\n    {{ badge }}\n  </div>\n\n  <!-- Icon (for card/tile variants) -->\n  <div class=\"muxima-radio-icon\" *ngIf=\"icon\">\n    <span class=\"muxima-radio-icon-content\">{{ icon }}</span>\n  </div>\n\n  <!-- Radio Circle -->\n  <div \n    [ngClass]=\"getRadioClasses()\"\n    [attr.aria-checked]=\"isChecked\"\n    [attr.aria-disabled]=\"disabled\"\n    [attr.tabindex]=\"disabled ? -1 : 0\"\n    role=\"radio\"\n    (keydown.space)=\"$event.preventDefault(); selectRadio($event)\"\n    (keydown.enter)=\"$event.preventDefault(); selectRadio($event)\">\n    <div class=\"muxima-radio-outer\">\n      <div class=\"muxima-radio-inner\" *ngIf=\"isChecked\"></div>\n    </div>\n    \n    <!-- Check Icon (alternative to dot) -->\n    <svg *ngIf=\"showCheckIcon && isChecked\" \n         class=\"muxima-radio-check-icon\" \n         viewBox=\"0 0 24 24\" \n         fill=\"none\" \n         stroke=\"currentColor\" \n         stroke-width=\"3\">\n      <polyline points=\"20 6 9 17 4 12\"></polyline>\n    </svg>\n  </div>\n  \n  <!-- Content -->\n  <div class=\"muxima-radio-content\" *ngIf=\"label || description || subtitle || price\">\n    <!-- Price (for pricing cards) -->\n    <div class=\"muxima-radio-price\" *ngIf=\"price\">\n      {{ price }}\n    </div>\n    \n    <!-- Label -->\n    <span [ngClass]=\"getLabelClasses()\" *ngIf=\"label\">\n      {{ label }}\n      <span class=\"muxima-radio-required\" *ngIf=\"required\">*</span>\n    </span>\n    \n    <!-- Subtitle -->\n    <span class=\"muxima-radio-subtitle\" *ngIf=\"subtitle\">{{ subtitle }}</span>\n    \n    <!-- Description -->\n    <span class=\"muxima-radio-description\" *ngIf=\"description\">{{ description }}</span>\n  </div>\n  \n  <!-- Selected Indicator (for button/tile variants) -->\n  <div class=\"muxima-radio-selected-indicator\" *ngIf=\"isChecked && (variant === 'card' || variant === 'tile')\">\n    <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\n      <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/>\n    </svg>\n  </div>\n</label>\n\n<!-- Helper Text / Error Message -->\n<div class=\"muxima-radio-helper\" *ngIf=\"helperText && !variant\">\n  <span [class.muxima-radio-error-text]=\"error\">{{ helperText }}</span>\n</div>\n", styles: [":host{--muxima-white: #FFFFFF;--muxima-primary: var(--muxima-primary, #3B82F6);--muxima-primary-dark: var(--muxima-primary-dark, #2563EB);--muxima-primary-light: var(--muxima-primary-light, #DBEAFE);--muxima-success: var(--muxima-success, #10B981);--muxima-success-dark: var(--muxima-success-dark, #059669);--muxima-success-light: var(--muxima-success-light, #D1FAE5);--muxima-warning: var(--muxima-warning, #F59E0B);--muxima-warning-dark: var(--muxima-warning-dark, #D97706);--muxima-warning-light: var(--muxima-warning-light, #FEF3C7);--muxima-danger: var(--muxima-danger, #EF4444);--muxima-danger-dark: var(--muxima-danger-dark, #DC2626);--muxima-danger-light: var(--muxima-danger-light, #FEE2E2);--muxima-info: var(--muxima-info, #06B6D4);--muxima-info-dark: var(--muxima-info-dark, #0891B2);--muxima-info-light: var(--muxima-info-light, #CFFAFE);--muxima-purple: #8B5CF6;--muxima-purple-dark: #7C3AED;--muxima-purple-light: #EDE9FE;--muxima-pink: #EC4899;--muxima-pink-dark: #DB2777;--muxima-pink-light: #FCE7F3;--muxima-gray-100: #F3F4F6;--muxima-gray-200: #E5E7EB;--muxima-gray-300: #D1D5DB;--muxima-gray-400: #9CA3AF;--muxima-gray-500: #6B7280;--muxima-gray-600: #4B5563;--muxima-gray-700: #374151;--muxima-gray-900: #111827;display:inline-block}.muxima-radio-wrapper{position:relative;display:inline-flex;align-items:flex-start;gap:.75rem;cursor:pointer;-webkit-user-select:none;user-select:none;transition:all .2s ease}.muxima-radio-wrapper--disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.muxima-radio-wrapper--card{flex-direction:column;padding:1.5rem;border:2px solid var(--muxima-gray-200);border-radius:12px;background:var(--muxima-white);transition:all .3s cubic-bezier(.4,0,.2,1);min-width:200px}.muxima-radio-wrapper--card:hover:not(.muxima-radio-wrapper--disabled){border-color:var(--muxima-primary);box-shadow:0 4px 12px #3b82f626;transform:translateY(-2px)}.muxima-radio-wrapper--card.muxima-radio-wrapper--checked{border-color:var(--muxima-primary);background:var(--muxima-primary-light);box-shadow:0 4px 16px #3b82f633}.muxima-radio-wrapper--button{padding:.75rem 1.5rem;border:2px solid var(--muxima-gray-300);border-radius:8px;background:var(--muxima-white);transition:all .2s ease;justify-content:center;min-width:120px}.muxima-radio-wrapper--button:hover:not(.muxima-radio-wrapper--disabled){border-color:var(--muxima-primary);background:var(--muxima-gray-100)}.muxima-radio-wrapper--button.muxima-radio-wrapper--checked{border-color:var(--muxima-primary);background:var(--muxima-primary);color:var(--muxima-white)}.muxima-radio-wrapper--button.muxima-radio-wrapper--checked .muxima-radio-label{color:var(--muxima-white);font-weight:600}.muxima-radio-wrapper--button .muxima-radio{display:none}.muxima-radio-wrapper--tile{flex-direction:column;align-items:center;padding:2rem 1.5rem;border:2px solid var(--muxima-gray-200);border-radius:16px;background:var(--muxima-white);transition:all .3s ease;min-width:150px;text-align:center}.muxima-radio-wrapper--tile:hover:not(.muxima-radio-wrapper--disabled){border-color:var(--muxima-primary);box-shadow:0 8px 24px #3b82f61f;transform:scale(1.02)}.muxima-radio-wrapper--tile.muxima-radio-wrapper--checked{border-color:var(--muxima-primary);background:linear-gradient(135deg,var(--muxima-primary-light) 0%,var(--muxima-white) 100%);box-shadow:0 8px 24px #3b82f633}.muxima-radio-wrapper--tile .muxima-radio{order:-1;margin-bottom:1rem}.muxima-radio-wrapper--minimal{gap:.5rem}.muxima-radio-wrapper--minimal .muxima-radio-outer{border-width:1px}.muxima-radio-wrapper--glow.muxima-radio-wrapper--checked{filter:drop-shadow(0 0 12px rgba(59,130,246,.6))}.muxima-radio-wrapper--no-border{border:none!important}.muxima-radio-wrapper--square{border-radius:0!important}.muxima-radio-wrapper--error .muxima-radio-outer,.muxima-radio-wrapper--error.muxima-radio-wrapper--card,.muxima-radio-wrapper--error.muxima-radio-wrapper--tile{border-color:var(--muxima-danger)!important}.muxima-radio-badge{position:absolute;top:-8px;right:-8px;padding:.25rem .5rem;background:linear-gradient(135deg,var(--muxima-primary) 0%,var(--muxima-primary-dark) 100%);color:var(--muxima-white);font-size:.625rem;font-weight:700;border-radius:6px;text-transform:uppercase;letter-spacing:.05em;box-shadow:0 2px 8px #3b82f666;z-index:10}.muxima-radio-icon{display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:var(--muxima-gray-100);border-radius:12px;margin-bottom:.75rem}.muxima-radio-icon-content{font-size:1.5rem}.muxima-radio-wrapper--checked .muxima-radio-icon{background:var(--muxima-primary-light)}.muxima-radio{position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;outline:none;transition:all .2s cubic-bezier(.4,0,.2,1)}.muxima-radio:focus-visible{box-shadow:0 0 0 3px #3b82f64d;border-radius:50%}.muxima-radio-outer{width:20px;height:20px;border:2px solid var(--muxima-gray-400);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .2s ease;background:var(--muxima-white);box-shadow:inset 0 1px 2px #0000000d}.muxima-radio:hover:not(.muxima-radio--disabled) .muxima-radio-outer{border-color:var(--muxima-primary);box-shadow:0 0 0 4px #3b82f61a}.muxima-radio-inner{width:10px;height:10px;border-radius:50%;animation:radioAppear .2s ease;box-shadow:0 2px 4px #0003}@keyframes radioAppear{0%{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}.muxima-radio-check-icon{position:absolute;width:16px;height:16px;color:var(--muxima-white);animation:checkAppear .2s ease}@keyframes checkAppear{0%{transform:scale(0) rotate(-45deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}.muxima-radio--primary.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-primary);background:var(--muxima-white)}.muxima-radio--primary.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-primary) 0%,var(--muxima-primary-dark) 100%)}.muxima-radio--success.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-success)}.muxima-radio--success.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-success) 0%,var(--muxima-success-dark) 100%)}.muxima-radio--warning.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-warning)}.muxima-radio--warning.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-warning) 0%,var(--muxima-warning-dark) 100%)}.muxima-radio--danger.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-danger)}.muxima-radio--danger.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-danger) 0%,var(--muxima-danger-dark) 100%)}.muxima-radio--info.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-info)}.muxima-radio--info.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-info) 0%,var(--muxima-info-dark) 100%)}.muxima-radio--purple.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-purple)}.muxima-radio--purple.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-purple) 0%,var(--muxima-purple-dark) 100%)}.muxima-radio--pink.muxima-radio--checked .muxima-radio-outer{border-color:var(--muxima-pink)}.muxima-radio--pink.muxima-radio--checked .muxima-radio-inner{background:linear-gradient(135deg,var(--muxima-pink) 0%,var(--muxima-pink-dark) 100%)}.muxima-radio--xs .muxima-radio-outer{width:14px;height:14px}.muxima-radio--xs .muxima-radio-inner{width:6px;height:6px}.muxima-radio--sm .muxima-radio-outer{width:16px;height:16px}.muxima-radio--sm .muxima-radio-inner{width:8px;height:8px}.muxima-radio--md .muxima-radio-outer{width:20px;height:20px}.muxima-radio--md .muxima-radio-inner{width:10px;height:10px}.muxima-radio--lg .muxima-radio-outer{width:24px;height:24px}.muxima-radio--lg .muxima-radio-inner{width:12px;height:12px}.muxima-radio--xl .muxima-radio-outer{width:28px;height:28px}.muxima-radio--xl .muxima-radio-inner{width:14px;height:14px}.muxima-radio-wrapper--xs{gap:.375rem}.muxima-radio-wrapper--sm{gap:.5rem}.muxima-radio-wrapper--md{gap:.75rem}.muxima-radio-wrapper--lg{gap:1rem}.muxima-radio-wrapper--xl{gap:1.25rem}.muxima-radio-content{display:flex;flex-direction:column;gap:.25rem;flex:1}.muxima-radio-label{font-size:.9375rem;font-weight:500;color:var(--muxima-gray-900);line-height:1.5}.muxima-radio-label--disabled{color:var(--muxima-gray-400)}.muxima-radio-subtitle{font-size:.8125rem;font-weight:500;color:var(--muxima-gray-600);line-height:1.4}.muxima-radio-description{font-size:.875rem;color:var(--muxima-gray-500);line-height:1.4}.muxima-radio-required{color:var(--muxima-danger);margin-left:.25rem}.muxima-radio-price{font-size:1.875rem;font-weight:700;color:var(--muxima-primary);margin-bottom:.5rem;background:linear-gradient(135deg,var(--muxima-primary) 0%,var(--muxima-primary-dark) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.muxima-radio-selected-indicator{position:absolute;top:8px;right:8px;width:24px;height:24px;background:var(--muxima-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px #3b82f666;animation:indicatorAppear .3s ease}.muxima-radio-selected-indicator svg{width:14px;height:14px;color:var(--muxima-white)}@keyframes indicatorAppear{0%{transform:scale(0) rotate(-180deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}.muxima-radio-helper{margin-top:.375rem;font-size:.8125rem;color:var(--muxima-gray-500);line-height:1.4}.muxima-radio-error-text{color:var(--muxima-danger);font-weight:500}.muxima-radio-label--xs{font-size:.8125rem}.muxima-radio-label--sm{font-size:.875rem}.muxima-radio-label--md{font-size:.9375rem}.muxima-radio-label--lg{font-size:1rem}.muxima-radio-label--xl{font-size:1.125rem}@media (max-width: 640px){.muxima-radio-wrapper--card,.muxima-radio-wrapper--tile{min-width:100%}.muxima-radio-wrapper--button{min-width:100px;padding:.625rem 1rem}.muxima-radio-price{font-size:1.5rem}}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], name: [{
                type: Input
            }], label: [{
                type: Input
            }], description: [{
                type: Input
            }], icon: [{
                type: Input
            }], badge: [{
                type: Input
            }], price: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }], variant: [{
                type: Input
            }], required: [{
                type: Input
            }], error: [{
                type: Input
            }], helperText: [{
                type: Input
            }], showCheckIcon: [{
                type: Input
            }], glow: [{
                type: Input
            }], bordered: [{
                type: Input
            }], rounded: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], radioChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { RadioButtonComponent };
//# sourceMappingURL=muxima-ui-radio-button.mjs.map
