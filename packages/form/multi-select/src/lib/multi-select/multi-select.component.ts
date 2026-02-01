import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface MultiSelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'muxima-multi-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor {
  @Input() options: (string | MultiSelectOption)[] = [];
  @Input() placeholder = 'Select items...';
  @Input() maxSelections?: number;
  @Input() disabled = false;
  @Input() searchable = true;
  @Input() clearable = true;
  
  @Output() selectionChange = new EventEmitter<any[]>();
  
  selectedValues: any[] = [];
  isOpen = false;
  searchTerm = '';
  filteredOptions: MultiSelectOption[] = [];
  
  private onChange: (value: any[]) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.updateFilteredOptions();
  }

  writeValue(value: any[]): void {
    this.selectedValues = value || [];
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

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.updateFilteredOptions();
      }
    }
  }

  toggleOption(option: MultiSelectOption): void {
    if (option.disabled) return;

    const index = this.selectedValues.findIndex(v => v === option.value);
    
    if (index >= 0) {
      this.selectedValues.splice(index, 1);
    } else {
      if (!this.maxSelections || this.selectedValues.length < this.maxSelections) {
        this.selectedValues.push(option.value);
      }
    }
    
    this.onChange(this.selectedValues);
    this.selectionChange.emit(this.selectedValues);
  }

  isSelected(option: MultiSelectOption): boolean {
    return this.selectedValues.includes(option.value);
  }

  removeTag(value: any, event: Event): void {
    event.stopPropagation();
    const index = this.selectedValues.findIndex(v => v === value);
    if (index >= 0) {
      this.selectedValues.splice(index, 1);
      this.onChange(this.selectedValues);
      this.selectionChange.emit(this.selectedValues);
    }
  }

  clearAll(event: Event): void {
    event.stopPropagation();
    this.selectedValues = [];
    this.onChange(this.selectedValues);
    this.selectionChange.emit(this.selectedValues);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.updateFilteredOptions();
  }

  updateFilteredOptions(): void {
    const allOptions = this.options.map(opt => 
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    );
    
    if (!this.searchTerm) {
      this.filteredOptions = allOptions;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredOptions = allOptions.filter(opt => 
        opt.label.toLowerCase().includes(term)
      );
    }
  }

  getOptionLabel(value: any): string {
    const allOptions = this.options.map(opt => 
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    );
    const option = allOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  onBlur(): void {
    setTimeout(() => {
      this.isOpen = false;
      this.onTouched();
    }, 200);
  }
}
