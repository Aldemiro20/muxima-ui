import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RadioColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink';
type RadioVariant = 'default' | 'card' | 'button' | 'tile' | 'minimal';

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
  @Input() icon: string = ''; // Icon or emoji
  @Input() badge: string = ''; // Badge text (e.g., "New", "Popular")
  @Input() price: string = ''; // For pricing cards
  @Input() subtitle: string = ''; // Additional subtitle
  @Input() disabled: boolean = false;
  @Input() size: RadioSize = 'md';
  @Input() color: RadioColor = 'primary';
  @Input() variant: RadioVariant = 'default';
  @Input() required: boolean = false;
  @Input() error: boolean = false;
  @Input() helperText: string = '';
  @Input() showCheckIcon: boolean = false; // Show checkmark when selected
  @Input() glow: boolean = false; // Glow effect when selected
  @Input() bordered: boolean = true; // Show border
  @Input() rounded: boolean = true; // Rounded corners
  
  @Output() valueChange = new EventEmitter<any>();
  @Output() radioChange = new EventEmitter<any>();

  private selectedValue: any;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  get isChecked(): boolean {
    return this.selectedValue === this.value;
  }

  selectRadio(event?: Event): void {
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
    if (this.variant) classes.push(`muxima-radio-wrapper--${this.variant}`);
    if (this.isChecked) classes.push('muxima-radio-wrapper--checked');
    if (this.error) classes.push('muxima-radio-wrapper--error');
    if (this.glow && this.isChecked) classes.push('muxima-radio-wrapper--glow');
    if (!this.bordered) classes.push('muxima-radio-wrapper--no-border');
    if (!this.rounded) classes.push('muxima-radio-wrapper--square');
    
    return classes;
  }

  getRadioClasses(): string[] {
    const classes = ['muxima-radio'];
    
    if (this.isChecked) classes.push('muxima-radio--checked');
    if (this.disabled) classes.push('muxima-radio--disabled');
    if (this.size) classes.push(`muxima-radio--${this.size}`);
    if (this.color) classes.push(`muxima-radio--${this.color}`);
    if (this.error) classes.push('muxima-radio--error');
    
    return classes;
  }

  getLabelClasses(): string[] {
    const classes = ['muxima-radio-label'];
    
    if (this.disabled) classes.push('muxima-radio-label--disabled');
    if (this.size) classes.push(`muxima-radio-label--${this.size}`);
    
    return classes;
  }
}

