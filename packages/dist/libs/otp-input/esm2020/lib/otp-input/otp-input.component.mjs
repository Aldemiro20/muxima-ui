import { Component, Input, Output, EventEmitter, forwardRef, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class OtpInputComponent {
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
        event.preventDefault();
        const pastedData = event.clipboardData?.getData('text') || '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2Zvcm0vb3RwLWlucHV0L3NyYy9saWIvb3RwLWlucHV0L290cC1pbnB1dC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mb3JtL290cC1pbnB1dC9zcmMvbGliL290cC1pbnB1dC9vdHAtaW5wdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUF3QyxNQUFNLGVBQWUsQ0FBQztBQUN2SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFnQnpFLE1BQU0sT0FBTyxpQkFBaUI7SUFkOUI7UUFlVyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFNBQUksR0FBc0IsUUFBUSxDQUFDO1FBQ25DLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLFNBQUksR0FBaUMsUUFBUSxDQUFDO1FBRTdDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN6QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUlqRCxjQUFTLEdBQWEsRUFBRSxDQUFDO1FBQ2pCLGFBQVEsR0FBNEIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQzdDLGNBQVMsR0FBZSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7S0F5SjFDO0lBdkpDLGVBQWU7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFD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Q2YsQ0FBQzs7K0dBeEtVLGlCQUFpQjttR0FBakIsaUJBQWlCLHNSQVJqQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQ2hELEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixpSENoQkgsMm9CQWtCQSxrbUREWFksWUFBWTs0RkFXWCxpQkFBaUI7a0JBZDdCLFNBQVM7K0JBQ0Usa0JBQWtCLGNBQ2hCLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxhQUdaO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDOzRCQUNoRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjs4QkFHUSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUksV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNO2dCQUVtQixNQUFNO3NCQUEvQixZQUFZO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgVmlld0NoaWxkcmVuLCBRdWVyeUxpc3QsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdXhpbWEtb3RwLWlucHV0JyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vdHAtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL290cC1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT3RwSW5wdXRDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE90cElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIGxlbmd0aDogbnVtYmVyID0gNjtcclxuICBASW5wdXQoKSB0eXBlOiAnbnVtYmVyJyB8ICd0ZXh0JyA9ICdudW1iZXInO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHNlY3VyZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGF1dG9Gb2N1czogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgc2l6ZTogJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJyA9ICdtZWRpdW0nO1xyXG4gIFxyXG4gIEBPdXRwdXQoKSBvdHBDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIEBPdXRwdXQoKSBvdHBDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBcclxuICBAVmlld0NoaWxkcmVuKCdvdHBJbnB1dCcpIGlucHV0cyE6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+PjtcclxuICBcclxuICBvdHBWYWx1ZXM6IHN0cmluZ1tdID0gW107XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7fTtcclxuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLm90cFZhbHVlcyA9IEFycmF5KHRoaXMubGVuZ3RoKS5maWxsKCcnKTtcclxuICAgIGlmICh0aGlzLmF1dG9Gb2N1cyAmJiB0aGlzLmlucHV0cy5maXJzdCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaW5wdXRzLmZpcnN0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSwgMTAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMub3RwVmFsdWVzID0gdmFsdWUuc3BsaXQoJycpLnNsaWNlKDAsIHRoaXMubGVuZ3RoKTtcclxuICAgICAgd2hpbGUgKHRoaXMub3RwVmFsdWVzLmxlbmd0aCA8IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5vdHBWYWx1ZXMucHVzaCgnJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3RwVmFsdWVzID0gQXJyYXkodGhpcy5sZW5ndGgpLmZpbGwoJycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIG9uSW5wdXQoZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgbGV0IHZhbHVlID0gaW5wdXQudmFsdWU7XHJcblxyXG4gICAgLy8gQWxsb3cgb25seSBudW1iZXJzIG9yIHRleHQgYmFzZWQgb24gdHlwZVxyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRha2Ugb25seSB0aGUgbGFzdCBjaGFyYWN0ZXIgaWYgbXVsdGlwbGUgYXJlIGVudGVyZWRcclxuICAgIGlmICh2YWx1ZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub3RwVmFsdWVzW2luZGV4XSA9IHZhbHVlO1xyXG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICAvLyBNb3ZlIHRvIG5leHQgaW5wdXQgaWYgdmFsdWUgaXMgZW50ZXJlZFxyXG4gICAgaWYgKHZhbHVlICYmIGluZGV4IDwgdGhpcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIGNvbnN0IG5leHRJbnB1dCA9IHRoaXMuaW5wdXRzLnRvQXJyYXkoKVtpbmRleCArIDFdO1xyXG4gICAgICBpZiAobmV4dElucHV0KSB7XHJcbiAgICAgICAgbmV4dElucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZW1pdFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgLy8gSGFuZGxlIGJhY2tzcGFjZVxyXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0JhY2tzcGFjZScpIHtcclxuICAgICAgaWYgKCF0aGlzLm90cFZhbHVlc1tpbmRleF0gJiYgaW5kZXggPiAwKSB7XHJcbiAgICAgICAgLy8gTW92ZSB0byBwcmV2aW91cyBpbnB1dCBpZiBjdXJyZW50IGlzIGVtcHR5XHJcbiAgICAgICAgY29uc3QgcHJldklucHV0ID0gdGhpcy5pbnB1dHMudG9BcnJheSgpW2luZGV4IC0gMV07XHJcbiAgICAgICAgaWYgKHByZXZJbnB1dCkge1xyXG4gICAgICAgICAgcHJldklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgIHRoaXMub3RwVmFsdWVzW2luZGV4IC0gMV0gPSAnJztcclxuICAgICAgICAgIHRoaXMuZW1pdFZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3RwVmFsdWVzW2luZGV4XSkge1xyXG4gICAgICAgIC8vIENsZWFyIGN1cnJlbnQgaW5wdXRcclxuICAgICAgICB0aGlzLm90cFZhbHVlc1tpbmRleF0gPSAnJztcclxuICAgICAgICB0aGlzLmVtaXRWYWx1ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIGFycm93IGtleXNcclxuICAgIGlmIChldmVudC5rZXkgPT09ICdBcnJvd0xlZnQnICYmIGluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLmlucHV0cy50b0FycmF5KClbaW5kZXggLSAxXS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dSaWdodCcgJiYgaW5kZXggPCB0aGlzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5pbnB1dHMudG9BcnJheSgpW2luZGV4ICsgMV0ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25QYXN0ZShldmVudDogQ2xpcGJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBwYXN0ZWREYXRhID0gZXZlbnQuY2xpcGJvYXJkRGF0YT8uZ2V0RGF0YSgndGV4dCcpIHx8ICcnO1xyXG4gICAgbGV0IHZhbHVlcyA9IHBhc3RlZERhdGEuc3BsaXQoJycpLnNsaWNlKDAsIHRoaXMubGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGhpcy50eXBlID09PSAnbnVtYmVyJykge1xyXG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMuZmlsdGVyKGNoYXIgPT4gL1swLTldLy50ZXN0KGNoYXIpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChpbmRleCA8IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5vdHBWYWx1ZXNbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0cy50b0FycmF5KClbaW5kZXhdO1xyXG4gICAgICAgIGlmIChpbnB1dCkge1xyXG4gICAgICAgICAgaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRm9jdXMgb24gdGhlIG5leHQgZW1wdHkgaW5wdXQgb3IgbGFzdCBpbnB1dFxyXG4gICAgY29uc3QgbmV4dEVtcHR5SW5kZXggPSB0aGlzLm90cFZhbHVlcy5maW5kSW5kZXgodiA9PiAhdik7XHJcbiAgICBjb25zdCBmb2N1c0luZGV4ID0gbmV4dEVtcHR5SW5kZXggIT09IC0xID8gbmV4dEVtcHR5SW5kZXggOiB0aGlzLmxlbmd0aCAtIDE7XHJcbiAgICBjb25zdCBpbnB1dFRvRm9jdXMgPSB0aGlzLmlucHV0cy50b0FycmF5KClbZm9jdXNJbmRleF07XHJcbiAgICBpZiAoaW5wdXRUb0ZvY3VzKSB7XHJcbiAgICAgIGlucHV0VG9Gb2N1cy5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbWl0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIG9uRm9jdXMoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0cy50b0FycmF5KClbaW5kZXhdO1xyXG4gICAgaWYgKGlucHV0KSB7XHJcbiAgICAgIGlucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbWl0VmFsdWUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBvdHBWYWx1ZSA9IHRoaXMub3RwVmFsdWVzLmpvaW4oJycpO1xyXG4gICAgdGhpcy5vbkNoYW5nZShvdHBWYWx1ZSk7XHJcbiAgICB0aGlzLm90cENoYW5nZS5lbWl0KG90cFZhbHVlKTtcclxuXHJcbiAgICAvLyBFbWl0IGNvbXBsZXRlIGV2ZW50IGlmIGFsbCBmaWVsZHMgYXJlIGZpbGxlZFxyXG4gICAgaWYgKG90cFZhbHVlLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5vdHBDb21wbGV0ZS5lbWl0KG90cFZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vdHBWYWx1ZXMgPSBBcnJheSh0aGlzLmxlbmd0aCkuZmlsbCgnJyk7XHJcbiAgICB0aGlzLmlucHV0cy50b0FycmF5KCkuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICAgIGlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuaW5wdXRzLmZpcnN0KSB7XHJcbiAgICAgIHRoaXMuaW5wdXRzLmZpcnN0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZW1pdFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5SW5kZXgoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJvdHAtY29udGFpbmVyXCIgW2NsYXNzLm90cC1kaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLmRhdGEtc2l6ZV09XCJzaXplXCI+XHJcbiAgPGlucHV0XHJcbiAgICAjb3RwSW5wdXRcclxuICAgICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiBvdHBWYWx1ZXM7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IHRyYWNrQnlJbmRleFwiXHJcbiAgICBjbGFzcz1cIm90cC1pbnB1dFwiXHJcbiAgICBbdHlwZV09XCJzZWN1cmUgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcclxuICAgIFthdHRyLmlucHV0bW9kZV09XCJ0eXBlID09PSAnbnVtYmVyJyA/ICdudW1lcmljJyA6ICd0ZXh0J1wiXHJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXHJcbiAgICBtYXhsZW5ndGg9XCIxXCJcclxuICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgaSlcIlxyXG4gICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudCwgaSlcIlxyXG4gICAgKHBhc3RlKT1cIm9uUGFzdGUoJGV2ZW50KVwiXHJcbiAgICAoZm9jdXMpPVwib25Gb2N1cyhpKVwiXHJcbiAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxyXG4gIC8+XHJcbjwvZGl2PlxyXG4iXX0=