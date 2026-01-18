import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'muxima-radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() value: any;
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'primary';
  @Input() required: boolean = false;
  
  @Output() valueChange = new EventEmitter<any>();

  private selectedValue: any;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  get isChecked(): boolean {
    return this.selectedValue === this.value;
  }

  selectRadio(): void {
    if (this.disabled) return;
    
    this.selectedValue = this.value;
    this.valueChange.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.selectedValue = value;
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

  getWrapperClasses(): string[] {
    const classes = ['muxima-radio-wrapper'];
    
    if (this.disabled) classes.push('muxima-radio-wrapper--disabled');
    if (this.size) classes.push(`muxima-radio-wrapper--${this.size}`);
    
    return classes;
  }

  getRadioClasses(): string[] {
    const classes = ['muxima-radio'];
    
    if (this.isChecked) classes.push('muxima-radio--checked');
    if (this.disabled) classes.push('muxima-radio--disabled');
    if (this.size) classes.push(`muxima-radio--${this.size}`);
    if (this.color) classes.push(`muxima-radio--${this.color}`);
    
    return classes;
  }
}

