import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface AutocompleteOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'muxima-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements ControlValueAccessor {
  @Input() options: (string | AutocompleteOption)[] = [];
  @Input() placeholder = 'Search...';
  @Input() debounceTime = 300;
  @Input() minChars = 1;
  @Input() maxResults = 10;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() emptyMessage = 'No results found';
  
  @Output() search = new EventEmitter<string>();
  @Output() selected = new EventEmitter<any>();
  
  searchTerm = '';
  isOpen = false;
  filteredOptions: AutocompleteOption[] = [];
  highlightedIndex = -1;
  
  private debounceTimer: any;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      const option = this.findOption(value);
      this.searchTerm = option ? option.label : value;
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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    
    clearTimeout(this.debounceTimer);
    
    if (this.searchTerm.length >= this.minChars) {
      this.debounceTimer = setTimeout(() => {
        this.filterOptions();
        this.search.emit(this.searchTerm);
        this.isOpen = true;
      }, this.debounceTime);
    } else {
      this.isOpen = false;
      this.filteredOptions = [];
    }
  }

  filterOptions(): void {
    const term = this.searchTerm.toLowerCase();
    const allOptions = this.options.map(opt => 
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    );
    
    this.filteredOptions = allOptions
      .filter(opt => opt.label.toLowerCase().includes(term))
      .slice(0, this.maxResults);
    
    this.highlightedIndex = this.filteredOptions.length > 0 ? 0 : -1;
  }

  selectOption(option: AutocompleteOption): void {
    if (option.disabled) return;
    
    this.searchTerm = option.label;
    this.isOpen = false;
    this.onChange(option.value);
    this.selected.emit(option.value);
    this.onTouched();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) {
      if (event.key === 'ArrowDown') {
        this.isOpen = true;
        this.filterOptions();
        event.preventDefault();
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        this.highlightedIndex = Math.min(
          this.highlightedIndex + 1,
          this.filteredOptions.length - 1
        );
        event.preventDefault();
        break;
      
      case 'ArrowUp':
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
        event.preventDefault();
        break;
      
      case 'Enter':
        if (this.highlightedIndex >= 0) {
          this.selectOption(this.filteredOptions[this.highlightedIndex]);
          event.preventDefault();
        }
        break;
      
      case 'Escape':
        this.isOpen = false;
        event.preventDefault();
        break;
    }
  }

  onFocus(): void {
    if (this.searchTerm.length >= this.minChars) {
      this.filterOptions();
      this.isOpen = true;
    }
  }

  onBlur(): void {
    // Delay to allow click on option
    setTimeout(() => {
      this.isOpen = false;
      this.onTouched();
    }, 200);
  }

  private findOption(value: any): AutocompleteOption | undefined {
    const allOptions = this.options.map(opt => 
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    );
    return allOptions.find(opt => opt.value === value);
  }

  highlightMatch(text: string): string {
    if (!this.searchTerm) return text;
    
    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
