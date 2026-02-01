import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output, ViewChildren } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class OtpInputComponent {
    constructor() {
        this.length = 6;
        this.type = 'number';
        this.placeholder = '';
        this.disabled = false;
        this.secure = false;
        this.autoFocus = true;
        this.size = 'medium';
        this.otpComplete = new EventEmitter();
        this.otpChange = new EventEmitter();
        this.otpValues = [];
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    ngAfterViewInit() {
        this.otpValues = Array(this.length).fill('');
        if (this.autoFocus && this.inputs.first) {
            setTimeout(() => this.inputs.first.nativeElement.focus(), 100);
        }
    }
    writeValue(value) {
        if (value) {
            this.otpValues = value.split('').slice(0, this.length);
            while (this.otpValues.length < this.length) {
                this.otpValues.push('');
            }
        }
        else {
            this.otpValues = Array(this.length).fill('');
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
    onInput(event, index) {
        const input = event.target;
        let value = input.value;
        // Allow only numbers or text based on type
        if (this.type === 'number') {
            value = value.replace(/[^0-9]/g, '');
        }
        // Take only the last character if multiple are entered
        if (value.length > 1) {
            value = value.slice(-1);
        }
        this.otpValues[index] = value;
        input.value = value;
        // Move to next input if value is entered
        if (value && index < this.length - 1) {
            const nextInput = this.inputs.toArray()[index + 1];
            if (nextInput) {
                nextInput.nativeElement.focus();
            }
        }
        this.emitValue();
    }
    onKeyDown(event, index) {
        const input = event.target;
        // Handle backspace
        if (event.key === 'Backspace') {
            if (!this.otpValues[index] && index > 0) {
                // Move to previous input if current is empty
                const prevInput = this.inputs.toArray()[index - 1];
                if (prevInput) {
                    prevInput.nativeElement.focus();
                    this.otpValues[index - 1] = '';
                    this.emitValue();
                }
            }
            else if (this.otpValues[index]) {
                // Clear current input
                this.otpValues[index] = '';
                this.emitValue();
            }
            event.preventDefault();
        }
        // Handle arrow keys
        if (event.key === 'ArrowLeft' && index > 0) {
            this.inputs.toArray()[index - 1].nativeElement.focus();
        }
        if (event.key === 'ArrowRight' && index < this.length - 1) {
            this.inputs.toArray()[index + 1].nativeElement.focus();
        }
    }
    onPaste(event) {
        var _a;
        event.preventDefault();
        const pastedData = ((_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('text')) || '';
        let values = pastedData.split('').slice(0, this.length);
        if (this.type === 'number') {
            values = values.filter(char => /[0-9]/.test(char));
        }
        values.forEach((value, index) => {
            if (index < this.length) {
                this.otpValues[index] = value;
                const input = this.inputs.toArray()[index];
                if (input) {
                    input.nativeElement.value = value;
                }
            }
        });
        // Focus on the next empty input or last input
        const nextEmptyIndex = this.otpValues.findIndex(v => !v);
        const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : this.length - 1;
        const inputToFocus = this.inputs.toArray()[focusIndex];
        if (inputToFocus) {
            inputToFocus.nativeElement.focus();
        }
        this.emitValue();
    }
    onFocus(index) {
        const input = this.inputs.toArray()[index];
        if (input) {
            input.nativeElement.select();
        }
        this.onTouched();
    }
    emitValue() {
        const otpValue = this.otpValues.join('');
        this.onChange(otpValue);
        this.otpChange.emit(otpValue);
        // Emit complete event if all fields are filled
        if (otpValue.length === this.length) {
            this.otpComplete.emit(otpValue);
        }
    }
    clear() {
        this.otpValues = Array(this.length).fill('');
        this.inputs.toArray().forEach(input => {
            input.nativeElement.value = '';
        });
        if (this.inputs.first) {
            this.inputs.first.nativeElement.focus();
        }
        this.emitValue();
    }
    trackByIndex(index) {
        return index;
    }
}
OtpInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: OtpInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
OtpInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: OtpInputComponent, isStandalone: true, selector: "muxima-otp-input", inputs: { length: "length", type: "type", placeholder: "placeholder", disabled: "disabled", secure: "secure", autoFocus: "autoFocus", size: "size" }, outputs: { otpComplete: "otpComplete", otpChange: "otpChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OtpInputComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "inputs", predicate: ["otpInput"], descendants: true }], ngImport: i0, template: "<div class=\"otp-container\" [class.otp-disabled]=\"disabled\" [attr.data-size]=\"size\">\r\n  <input\r\n    #otpInput\r\n    *ngFor=\"let value of otpValues; let i = index; trackBy: trackByIndex\"\r\n    class=\"otp-input\"\r\n    [type]=\"secure ? 'password' : 'text'\"\r\n    [attr.inputmode]=\"type === 'number' ? 'numeric' : 'text'\"\r\n    [placeholder]=\"placeholder\"\r\n    [disabled]=\"disabled\"\r\n    [value]=\"value\"\r\n    maxlength=\"1\"\r\n    (input)=\"onInput($event, i)\"\r\n    (keydown)=\"onKeyDown($event, i)\"\r\n    (paste)=\"onPaste($event)\"\r\n    (focus)=\"onFocus(i)\"\r\n    autocomplete=\"off\"\r\n  />\r\n</div>\r\n", styles: [".otp-container{display:flex;gap:.75rem;justify-content:center;align-items:center}.otp-container[data-size=small]{gap:.5rem}.otp-container[data-size=small] .otp-input{width:2.5rem;height:2.5rem;font-size:1rem}.otp-container[data-size=medium]{gap:.75rem}.otp-container[data-size=medium] .otp-input{width:3rem;height:3rem;font-size:1.25rem}.otp-container[data-size=large]{gap:1rem}.otp-container[data-size=large] .otp-input{width:3.5rem;height:3.5rem;font-size:1.5rem}.otp-container.otp-disabled{opacity:.6;pointer-events:none}.otp-input{width:3rem;height:3rem;text-align:center;font-size:1.25rem;font-weight:600;color:#1f2937;background:white;border:2px solid #d1d5db;border-radius:8px;outline:none;transition:all .3s ease;font-family:Courier New,Courier,monospace}.otp-input:focus{border-color:#667eea;box-shadow:0 0 0 3px #667eea1a;transform:scale(1.05)}.otp-input:disabled{background:#f3f4f6;cursor:not-allowed}.otp-input::placeholder{color:#9ca3af}.otp-input[type=number]::-webkit-inner-spin-button,.otp-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.otp-input[type=number]{-moz-appearance:textfield}.otp-input:not(:placeholder-shown){background:linear-gradient(135deg,#f0f4ff 0%,#e9f0ff 100%);border-color:#667eea}@media (prefers-color-scheme: dark){.otp-input{background:#1f2937;color:#f3f4f6;border-color:#4b5563}.otp-input:focus{border-color:#818cf8;box-shadow:0 0 0 3px #818cf81a}.otp-input:disabled{background:#111827}.otp-input:not(:placeholder-shown){background:linear-gradient(135deg,#312e81 0%,#3730a3 100%);border-color:#818cf8}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: OtpInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-otp-input', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => OtpInputComponent),
                            multi: true
                        }
                    ], template: "<div class=\"otp-container\" [class.otp-disabled]=\"disabled\" [attr.data-size]=\"size\">\r\n  <input\r\n    #otpInput\r\n    *ngFor=\"let value of otpValues; let i = index; trackBy: trackByIndex\"\r\n    class=\"otp-input\"\r\n    [type]=\"secure ? 'password' : 'text'\"\r\n    [attr.inputmode]=\"type === 'number' ? 'numeric' : 'text'\"\r\n    [placeholder]=\"placeholder\"\r\n    [disabled]=\"disabled\"\r\n    [value]=\"value\"\r\n    maxlength=\"1\"\r\n    (input)=\"onInput($event, i)\"\r\n    (keydown)=\"onKeyDown($event, i)\"\r\n    (paste)=\"onPaste($event)\"\r\n    (focus)=\"onFocus(i)\"\r\n    autocomplete=\"off\"\r\n  />\r\n</div>\r\n", styles: [".otp-container{display:flex;gap:.75rem;justify-content:center;align-items:center}.otp-container[data-size=small]{gap:.5rem}.otp-container[data-size=small] .otp-input{width:2.5rem;height:2.5rem;font-size:1rem}.otp-container[data-size=medium]{gap:.75rem}.otp-container[data-size=medium] .otp-input{width:3rem;height:3rem;font-size:1.25rem}.otp-container[data-size=large]{gap:1rem}.otp-container[data-size=large] .otp-input{width:3.5rem;height:3.5rem;font-size:1.5rem}.otp-container.otp-disabled{opacity:.6;pointer-events:none}.otp-input{width:3rem;height:3rem;text-align:center;font-size:1.25rem;font-weight:600;color:#1f2937;background:white;border:2px solid #d1d5db;border-radius:8px;outline:none;transition:all .3s ease;font-family:Courier New,Courier,monospace}.otp-input:focus{border-color:#667eea;box-shadow:0 0 0 3px #667eea1a;transform:scale(1.05)}.otp-input:disabled{background:#f3f4f6;cursor:not-allowed}.otp-input::placeholder{color:#9ca3af}.otp-input[type=number]::-webkit-inner-spin-button,.otp-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.otp-input[type=number]{-moz-appearance:textfield}.otp-input:not(:placeholder-shown){background:linear-gradient(135deg,#f0f4ff 0%,#e9f0ff 100%);border-color:#667eea}@media (prefers-color-scheme: dark){.otp-input{background:#1f2937;color:#f3f4f6;border-color:#4b5563}.otp-input:focus{border-color:#818cf8;box-shadow:0 0 0 3px #818cf81a}.otp-input:disabled{background:#111827}.otp-input:not(:placeholder-shown){background:linear-gradient(135deg,#312e81 0%,#3730a3 100%);border-color:#818cf8}}\n"] }]
        }], propDecorators: { length: [{
                type: Input
            }], type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], secure: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], size: [{
                type: Input
            }], otpComplete: [{
                type: Output
            }], otpChange: [{
                type: Output
            }], inputs: [{
                type: ViewChildren,
                args: ['otpInput']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { OtpInputComponent };
//# sourceMappingURL=muxima-ui-otp-input.mjs.map
