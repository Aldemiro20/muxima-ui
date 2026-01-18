import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

type InputType =
  'text' |
  'number' |
  'email' |
  'password' |
  'tel' |
  'url' |
  'search' |
  'date' |
  'color' |
  'month' |
  'datetime' |
  'datetime-local' |
  'time'

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'outlined' | 'filled' | 'underlined' | 'gradient';

@Component({
  selector: 'muxima-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text'
  @Input() size: InputSize = 'md'
  @Input() variant: InputVariant = 'default'
  @Input() disabled = false
  @Input() readonly = false
  @Input() placeholder?: string = ''
  @Input() label?: string = ''
  @Input() helperText?: string = ''
  @Input() hasError = false
  @Input() errorMessage?: string = ''
  @Input() prefixIcon?: string = ''
  @Input() suffixIcon?: string = ''
  @Input() showPasswordToggle = false

  value = '';
  showPassword = false;

  onChange = (value: string) => {
    //
  };

  onTouched = () => {
    //
  };

  writeValue(value: string): void {
    this.value = value;
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

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getInputType(): InputType {
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
