import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'muxima-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Input() description = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() variant: 'default' | 'primary' | 'success' | 'danger' | 'warning' = 'primary';
  @Input() indeterminate = false;
  
  @Output() checkedChange = new EventEmitter<boolean>();

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

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
      } else {
        this.checked = !this.checked;
      }
      this.checkedChange.emit(this.checked);
      this.onChange(this.checked);
      this.onTouched();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this.checked = value;
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
}
