import { Component, Input, Output, EventEmitter, forwardRef, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'muxima-otp-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true
    }
  ]
})
export class OtpInputComponent implements ControlValueAccessor, AfterViewInit {
  @Input() length: number = 6;
  @Input() type: 'number' | 'text' = 'number';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() secure: boolean = false;
  @Input() autoFocus: boolean = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  @Output() otpComplete = new EventEmitter<string>();
  @Output() otpChange = new EventEmitter<string>();
  
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;
  
  otpValues: string[] = [];
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit() {
    this.otpValues = Array(this.length).fill('');
    if (this.autoFocus && this.inputs.first) {
      setTimeout(() => this.inputs.first.nativeElement.focus(), 100);
    }
  }

  writeValue(value: string): void {
    if (value) {
      this.otpValues = value.split('').slice(0, this.length);
      while (this.otpValues.length < this.length) {
        this.otpValues.push('');
      }
    } else {
      this.otpValues = Array(this.length).fill('');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
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

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

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
      } else if (this.otpValues[index]) {
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

  onPaste(event: ClipboardEvent): void {
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

  onFocus(index: number): void {
    const input = this.inputs.toArray()[index];
    if (input) {
      input.nativeElement.select();
    }
    this.onTouched();
  }

  private emitValue(): void {
    const otpValue = this.otpValues.join('');
    this.onChange(otpValue);
    this.otpChange.emit(otpValue);

    // Emit complete event if all fields are filled
    if (otpValue.length === this.length) {
      this.otpComplete.emit(otpValue);
    }
  }

  clear(): void {
    this.otpValues = Array(this.length).fill('');
    this.inputs.toArray().forEach(input => {
      input.nativeElement.value = '';
    });
    if (this.inputs.first) {
      this.inputs.first.nativeElement.focus();
    }
    this.emitValue();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
