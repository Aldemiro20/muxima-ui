import * as i0 from '@angular/core';
import { forwardRef, Component, Input } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class InputComponent {
    constructor() {
        this.type = 'text';
        this.size = 'md';
        this.variant = 'default';
        this.disabled = false;
        this.readonly = false;
        this.placeholder = '';
        this.label = '';
        this.helperText = '';
        this.hasError = false;
        this.errorMessage = '';
        this.prefixIcon = '';
        this.suffixIcon = '';
        this.showPasswordToggle = false;
        this.value = '';
        this.showPassword = false;
        this.onChange = (value) => {
            //
        };
        this.onTouched = () => {
            //
        };
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
    onInput(event) {
        const inputValue = event.target.value;
        this.value = inputValue;
        this.onChange(inputValue);
    }
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    getInputType() {
        if (this.type === 'password' && this.showPassword) {
            return 'text';
        }
        return this.type;
    }
    getClasses() {
        return [
            `muxima-input-wrapper-${this.variant}`,
            `muxima-input-wrapper-${this.size}`,
            this.hasError ? 'muxima-input-wrapper-error' : '',
            this.disabled ? 'muxima-input-wrapper-disabled' : ''
        ];
    }
}
InputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: InputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: InputComponent, isStandalone: true, selector: "muxima-input", inputs: { type: "type", size: "size", variant: "variant", disabled: "disabled", readonly: "readonly", placeholder: "placeholder", label: "label", helperText: "helperText", hasError: "hasError", errorMessage: "errorMessage", prefixIcon: "prefixIcon", suffixIcon: "suffixIcon", showPasswordToggle: "showPasswordToggle" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        }
    ], ngImport: i0, template: "<div class=\"muxima-input-container\">\r\n  <label *ngIf=\"label\" class=\"muxima-input-label\">\r\n    {{ label }}\r\n  </label>\r\n  \r\n  <div [ngClass]=\"getClasses()\" class=\"muxima-input-wrapper\">\r\n    <span *ngIf=\"prefixIcon\" class=\"muxima-input-prefix\">\r\n      {{ prefixIcon }}\r\n    </span>\r\n    \r\n    <input\r\n      class=\"muxima-input\"\r\n      [placeholder]=\"placeholder\"\r\n      [disabled]=\"disabled\"\r\n      [readonly]=\"readonly\"\r\n      [type]=\"getInputType()\"\r\n      [value]=\"value\"\r\n      (input)=\"onInput($event)\"\r\n      (blur)=\"onTouched()\"\r\n    />\r\n    \r\n    <button \r\n      *ngIf=\"type === 'password' && showPasswordToggle\"\r\n      type=\"button\"\r\n      class=\"muxima-input-suffix muxima-input-password-toggle\"\r\n      (click)=\"togglePasswordVisibility()\"\r\n      [disabled]=\"disabled\">\r\n      {{ showPassword ? '\uD83D\uDC41\uFE0F' : '\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8\uFE0F' }}\r\n    </button>\r\n    \r\n    <span *ngIf=\"suffixIcon && !(type === 'password' && showPasswordToggle)\" class=\"muxima-input-suffix\">\r\n      {{ suffixIcon }}\r\n    </span>\r\n  </div>\r\n  \r\n  <div *ngIf=\"helperText && !hasError\" class=\"muxima-input-helper\">\r\n    {{ helperText }}\r\n  </div>\r\n  \r\n  <div *ngIf=\"errorMessage && hasError\" class=\"muxima-input-error\">\r\n    <span>{{ errorMessage }}</span>\r\n  </div>\r\n</div>", styles: ["@charset \"UTF-8\";:root{--muxima-primary: #667eea;--muxima-primary-light: #8b9df8;--muxima-primary-dark: #4c63d2;--muxima-secondary: #764ba2;--muxima-secondary-light: #9d6cc9;--muxima-secondary-dark: #5a3a7d;--muxima-accent: #8b9df8;--muxima-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);--muxima-success: #10b981;--muxima-success-light: #34d399;--muxima-success-dark: #059669;--muxima-warning: #f59e0b;--muxima-warning-light: #fbbf24;--muxima-warning-dark: #d97706;--muxima-danger: #ef4444;--muxima-danger-light: #f87171;--muxima-danger-dark: #dc2626;--muxima-info: #3b82f6;--muxima-info-light: #60a5fa;--muxima-info-dark: #2563eb}.muxima-input-container{display:flex;flex-direction:column;gap:.5rem;width:100%}.muxima-input-label{font-size:.875rem;font-weight:600;color:#1e293b;margin-bottom:.25rem}.muxima-input-wrapper{position:relative;display:flex;align-items:center;gap:.75rem;background:white;border-radius:8px;transition:all .3s ease}.muxima-input{flex:1;border:none;outline:none;background:transparent;font-size:1rem;color:#1e293b;font-family:inherit}.muxima-input::placeholder{color:#94a3b8}.muxima-input:disabled{cursor:not-allowed;opacity:.6}.muxima-input:readonly{cursor:default}.muxima-input-prefix,.muxima-input-suffix{font-size:1.25rem;color:#64748b;display:flex;align-items:center;flex-shrink:0}.muxima-input-password-toggle{background:transparent;border:none;cursor:pointer;padding:0;transition:transform .2s ease}.muxima-input-password-toggle:hover{transform:scale(1.1)}.muxima-input-password-toggle:disabled{cursor:not-allowed;opacity:.5}.muxima-input-helper{font-size:.75rem;color:#64748b}.muxima-input-error{font-size:.75rem;color:#ef4444;display:flex;align-items:center;gap:.375rem}.muxima-input-error:before{content:\"\\e2\\161\\a0\\ef\\b8\\8f\";font-size:.875rem}.muxima-input-wrapper-default{border:2px solid #E2E8F0;padding:0 1rem}.muxima-input-wrapper-default:hover{border-color:#cbd5e1}.muxima-input-wrapper-default:focus-within{border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}.muxima-input-wrapper-outlined{border:2px solid #CBD5E1;padding:0 1rem}.muxima-input-wrapper-outlined:hover{border-color:#94a3b8}.muxima-input-wrapper-outlined:focus-within{border-color:#8b5cf6;box-shadow:0 0 0 3px #8b5cf61a}.muxima-input-wrapper-filled{background:#F1F5F9;border:2px solid transparent;padding:0 1rem}.muxima-input-wrapper-filled:hover{background:#E2E8F0}.muxima-input-wrapper-filled:focus-within{background:white;border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}.muxima-input-wrapper-underlined{border:none;border-bottom:2px solid #E2E8F0;border-radius:0;padding:0 0 .5rem}.muxima-input-wrapper-underlined:hover{border-bottom-color:#cbd5e1}.muxima-input-wrapper-underlined:focus-within{border-bottom-color:#3b82f6}.muxima-input-wrapper-gradient{position:relative;padding:2px;background:linear-gradient(135deg,#3B82F6,#8B5CF6,#D946EF)}.muxima-input-wrapper-gradient:before{content:\"\";position:absolute;inset:2px;background:white;border-radius:6px;z-index:0}.muxima-input-wrapper-gradient .muxima-input,.muxima-input-wrapper-gradient .muxima-input-prefix,.muxima-input-wrapper-gradient .muxima-input-suffix{position:relative;z-index:1}.muxima-input-wrapper-gradient .muxima-input-prefix{margin-left:.75rem}.muxima-input-wrapper-gradient .muxima-input-suffix{margin-right:.75rem}.muxima-input-wrapper-gradient:focus-within{box-shadow:0 0 0 3px #8b5cf633}.muxima-input-wrapper-sm .muxima-input{font-size:.875rem;padding:.5rem 0}.muxima-input-wrapper-sm .muxima-input-prefix,.muxima-input-wrapper-sm .muxima-input-suffix{font-size:1rem}.muxima-input-wrapper-md .muxima-input{font-size:1rem;padding:.75rem 0}.muxima-input-wrapper-md .muxima-input-prefix,.muxima-input-wrapper-md .muxima-input-suffix{font-size:1.25rem}.muxima-input-wrapper-lg .muxima-input{font-size:1.125rem;padding:1rem 0}.muxima-input-wrapper-lg .muxima-input-prefix,.muxima-input-wrapper-lg .muxima-input-suffix{font-size:1.5rem}.muxima-input-wrapper-error{border-color:#ef4444!important}.muxima-input-wrapper-error:focus-within{box-shadow:0 0 0 3px #ef44441a!important}.muxima-input-wrapper-error.muxima-input-wrapper-gradient{background:linear-gradient(135deg,#EF4444,#DC2626)}.muxima-input-wrapper-disabled{background:#F1F5F9;cursor:not-allowed}.muxima-input-wrapper-disabled:hover{border-color:#e2e8f0}.muxima-input-wrapper-disabled .muxima-input{color:#94a3b8}@keyframes input-focus-pulse{0%{box-shadow:0 0 #3b82f666}70%{box-shadow:0 0 0 6px #3b82f600}to{box-shadow:0 0 #3b82f600}}.muxima-input-wrapper:focus-within{animation:input-focus-pulse .6s ease-out}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-input', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => InputComponent),
                            multi: true,
                        }
                    ], template: "<div class=\"muxima-input-container\">\r\n  <label *ngIf=\"label\" class=\"muxima-input-label\">\r\n    {{ label }}\r\n  </label>\r\n  \r\n  <div [ngClass]=\"getClasses()\" class=\"muxima-input-wrapper\">\r\n    <span *ngIf=\"prefixIcon\" class=\"muxima-input-prefix\">\r\n      {{ prefixIcon }}\r\n    </span>\r\n    \r\n    <input\r\n      class=\"muxima-input\"\r\n      [placeholder]=\"placeholder\"\r\n      [disabled]=\"disabled\"\r\n      [readonly]=\"readonly\"\r\n      [type]=\"getInputType()\"\r\n      [value]=\"value\"\r\n      (input)=\"onInput($event)\"\r\n      (blur)=\"onTouched()\"\r\n    />\r\n    \r\n    <button \r\n      *ngIf=\"type === 'password' && showPasswordToggle\"\r\n      type=\"button\"\r\n      class=\"muxima-input-suffix muxima-input-password-toggle\"\r\n      (click)=\"togglePasswordVisibility()\"\r\n      [disabled]=\"disabled\">\r\n      {{ showPassword ? '\uD83D\uDC41\uFE0F' : '\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8\uFE0F' }}\r\n    </button>\r\n    \r\n    <span *ngIf=\"suffixIcon && !(type === 'password' && showPasswordToggle)\" class=\"muxima-input-suffix\">\r\n      {{ suffixIcon }}\r\n    </span>\r\n  </div>\r\n  \r\n  <div *ngIf=\"helperText && !hasError\" class=\"muxima-input-helper\">\r\n    {{ helperText }}\r\n  </div>\r\n  \r\n  <div *ngIf=\"errorMessage && hasError\" class=\"muxima-input-error\">\r\n    <span>{{ errorMessage }}</span>\r\n  </div>\r\n</div>", styles: ["@charset \"UTF-8\";:root{--muxima-primary: #667eea;--muxima-primary-light: #8b9df8;--muxima-primary-dark: #4c63d2;--muxima-secondary: #764ba2;--muxima-secondary-light: #9d6cc9;--muxima-secondary-dark: #5a3a7d;--muxima-accent: #8b9df8;--muxima-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);--muxima-success: #10b981;--muxima-success-light: #34d399;--muxima-success-dark: #059669;--muxima-warning: #f59e0b;--muxima-warning-light: #fbbf24;--muxima-warning-dark: #d97706;--muxima-danger: #ef4444;--muxima-danger-light: #f87171;--muxima-danger-dark: #dc2626;--muxima-info: #3b82f6;--muxima-info-light: #60a5fa;--muxima-info-dark: #2563eb}.muxima-input-container{display:flex;flex-direction:column;gap:.5rem;width:100%}.muxima-input-label{font-size:.875rem;font-weight:600;color:#1e293b;margin-bottom:.25rem}.muxima-input-wrapper{position:relative;display:flex;align-items:center;gap:.75rem;background:white;border-radius:8px;transition:all .3s ease}.muxima-input{flex:1;border:none;outline:none;background:transparent;font-size:1rem;color:#1e293b;font-family:inherit}.muxima-input::placeholder{color:#94a3b8}.muxima-input:disabled{cursor:not-allowed;opacity:.6}.muxima-input:readonly{cursor:default}.muxima-input-prefix,.muxima-input-suffix{font-size:1.25rem;color:#64748b;display:flex;align-items:center;flex-shrink:0}.muxima-input-password-toggle{background:transparent;border:none;cursor:pointer;padding:0;transition:transform .2s ease}.muxima-input-password-toggle:hover{transform:scale(1.1)}.muxima-input-password-toggle:disabled{cursor:not-allowed;opacity:.5}.muxima-input-helper{font-size:.75rem;color:#64748b}.muxima-input-error{font-size:.75rem;color:#ef4444;display:flex;align-items:center;gap:.375rem}.muxima-input-error:before{content:\"\\e2\\161\\a0\\ef\\b8\\8f\";font-size:.875rem}.muxima-input-wrapper-default{border:2px solid #E2E8F0;padding:0 1rem}.muxima-input-wrapper-default:hover{border-color:#cbd5e1}.muxima-input-wrapper-default:focus-within{border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}.muxima-input-wrapper-outlined{border:2px solid #CBD5E1;padding:0 1rem}.muxima-input-wrapper-outlined:hover{border-color:#94a3b8}.muxima-input-wrapper-outlined:focus-within{border-color:#8b5cf6;box-shadow:0 0 0 3px #8b5cf61a}.muxima-input-wrapper-filled{background:#F1F5F9;border:2px solid transparent;padding:0 1rem}.muxima-input-wrapper-filled:hover{background:#E2E8F0}.muxima-input-wrapper-filled:focus-within{background:white;border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}.muxima-input-wrapper-underlined{border:none;border-bottom:2px solid #E2E8F0;border-radius:0;padding:0 0 .5rem}.muxima-input-wrapper-underlined:hover{border-bottom-color:#cbd5e1}.muxima-input-wrapper-underlined:focus-within{border-bottom-color:#3b82f6}.muxima-input-wrapper-gradient{position:relative;padding:2px;background:linear-gradient(135deg,#3B82F6,#8B5CF6,#D946EF)}.muxima-input-wrapper-gradient:before{content:\"\";position:absolute;inset:2px;background:white;border-radius:6px;z-index:0}.muxima-input-wrapper-gradient .muxima-input,.muxima-input-wrapper-gradient .muxima-input-prefix,.muxima-input-wrapper-gradient .muxima-input-suffix{position:relative;z-index:1}.muxima-input-wrapper-gradient .muxima-input-prefix{margin-left:.75rem}.muxima-input-wrapper-gradient .muxima-input-suffix{margin-right:.75rem}.muxima-input-wrapper-gradient:focus-within{box-shadow:0 0 0 3px #8b5cf633}.muxima-input-wrapper-sm .muxima-input{font-size:.875rem;padding:.5rem 0}.muxima-input-wrapper-sm .muxima-input-prefix,.muxima-input-wrapper-sm .muxima-input-suffix{font-size:1rem}.muxima-input-wrapper-md .muxima-input{font-size:1rem;padding:.75rem 0}.muxima-input-wrapper-md .muxima-input-prefix,.muxima-input-wrapper-md .muxima-input-suffix{font-size:1.25rem}.muxima-input-wrapper-lg .muxima-input{font-size:1.125rem;padding:1rem 0}.muxima-input-wrapper-lg .muxima-input-prefix,.muxima-input-wrapper-lg .muxima-input-suffix{font-size:1.5rem}.muxima-input-wrapper-error{border-color:#ef4444!important}.muxima-input-wrapper-error:focus-within{box-shadow:0 0 0 3px #ef44441a!important}.muxima-input-wrapper-error.muxima-input-wrapper-gradient{background:linear-gradient(135deg,#EF4444,#DC2626)}.muxima-input-wrapper-disabled{background:#F1F5F9;cursor:not-allowed}.muxima-input-wrapper-disabled:hover{border-color:#e2e8f0}.muxima-input-wrapper-disabled .muxima-input{color:#94a3b8}@keyframes input-focus-pulse{0%{box-shadow:0 0 #3b82f666}70%{box-shadow:0 0 0 6px #3b82f600}to{box-shadow:0 0 #3b82f600}}.muxima-input-wrapper:focus-within{animation:input-focus-pulse .6s ease-out}\n"] }]
        }], propDecorators: { type: [{
                type: Input
            }], size: [{
                type: Input
            }], variant: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], label: [{
                type: Input
            }], helperText: [{
                type: Input
            }], hasError: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], prefixIcon: [{
                type: Input
            }], suffixIcon: [{
                type: Input
            }], showPasswordToggle: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { InputComponent };
//# sourceMappingURL=muxima-ui-input.mjs.map
