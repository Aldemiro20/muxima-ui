import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type SearchBoxSize = 'sm' | 'md' | 'lg';
export type SearchBoxVariant = 'default' | 'outlined' | 'filled';

@Component({
  selector: 'muxima-search-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBoxComponent),
      multi: true
    }
  ]
})
export class SearchBoxComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Search...';
  @Input() size: SearchBoxSize = 'md';
  @Input() variant: SearchBoxVariant = 'default';
  @Input() disabled: boolean = false;
  @Input() clearable: boolean = true;
  @Input() loading: boolean = false;
  @Input() debounceTime: number = 300;

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  searchValue: string = '';
  isFocused: boolean = false;
  private debounceTimer: any;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get sizeClass(): string {
    return `search-box-${this.size}`;
  }

  get variantClass(): string {
    return `search-box-${this.variant}`;
  }

  get showClear(): boolean {
    return this.clearable && this.searchValue.length > 0 && !this.disabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value;
    this.onChange(value);

    // Debounce search event
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.search.emit(value);
    }, this.debounceTime);
  }

  onClear(): void {
    this.searchValue = '';
    this.onChange('');
    this.search.emit('');
    this.clear.emit();
  }

  onFocus(): void {
    this.isFocused = true;
    this.onTouched();
    this.focus.emit();
  }

  onBlur(): void {
    this.isFocused = false;
    this.blur.emit();
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.searchValue = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
