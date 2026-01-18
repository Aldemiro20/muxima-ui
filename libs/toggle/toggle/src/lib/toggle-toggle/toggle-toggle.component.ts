import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'muxima-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-toggle.component.html',
  styleUrls: ['./toggle-toggle.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleToggleComponent),
    multi: true
  }]
})
export class ToggleToggleComponent implements ControlValueAccessor {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'success' | 'warning' | 'error' = 'primary';
  @Input() label?: string;
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange: any = () => {};
  onTouched: any = () => {};

  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }

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
