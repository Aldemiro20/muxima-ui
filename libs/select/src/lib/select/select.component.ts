import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'outlined' | 'filled' | 'gradient' | 'glass';

export interface SelectOption {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
  group?: string;
}

@Component({
  selector: 'muxima-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @ViewChild('dropdownButton', { static: false }) dropdownButton!: ElementRef;
    private uniqueId = Math.random().toString(36).substring(2);

    dropdownPosition = { top: '0px', left: '0px', width: '0px', };


    dropdownOpen = false;
    openUpward = false;

    dropdownTop = 0;
    dropdownLeft = 0;
    useFixed = false;

    @Input() placeholder = 'Selecione uma opção';
    @Input() label?: string;
    @Input() helperText?: string;
    @Input() size: SelectSize = 'md';
    @Input() variant: SelectVariant = 'default';
    @Input() disabled = false;
    @Input() readonly = false;
    @Input() options: SelectOption[] = [];
    @Input() multiple = false;
    @Input() searchable = false;
    @Input() clearable = false;
    @Input() hasError = false;
    @Input() errorMessage?: string;
    @Input() prefixIcon?: string;

    value: any;
    selectedValues: any[] = [];
    searchText = '';
    filteredOptions: SelectOption[] = [];
    focusedIndex = -1;

    onChange = (value: any) => {
      //
    };
    onTouched = () => {
      //
    };

    toggleDropdown(): void {
      if (this.disabled || this.readonly) return;
      
      this.dropdownOpen = !this.dropdownOpen;
      if (this.dropdownOpen) {
        this.filteredOptions = [...this.options];
        this.searchText = '';
        this.focusedIndex = -1;
        this.checkDropdownDirection();
        
        const btn = this.dropdownButton.nativeElement;
        this.dropdownPosition = {
          top: `${btn.offsetTop + btn.offsetHeight}px`,
          left: `${btn.offsetLeft}px`,
          width: `${btn.offsetWidth}px`
        };

        const event = new CustomEvent('selectOpened', { detail: { id: this.uniqueId } });
        window.dispatchEvent(event);
      }
    }

    ngOnInit() {
      window.addEventListener('selectOpened', this.onOtherSelectOpened);
    }

    ngOnDestroy() {
      window.removeEventListener('selectOpened', this.onOtherSelectOpened);
    }

    onOtherSelectOpened = (event: any) => {
      const openedId = event.detail?.id;
      if (openedId !== this.uniqueId && this.dropdownOpen) {
        this.dropdownOpen = false;
      }
    };
  
    checkDropdownDirection() {
      const buttonRect = this.dropdownButton.nativeElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 380; // altura estimada do dropdown

      const spaceBelow = viewportHeight - buttonRect.bottom;
      this.openUpward = spaceBelow < dropdownHeight;
    }

    writeValue(value: any): void {
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

    @HostListener('window:resize')
    @HostListener('window:scroll')
    onWindowChange() {
      if (this.dropdownOpen) {
        this.checkDropdownDirection();
      }
    }


    selectOption(option: SelectOption): void {
      if (option.disabled) return;
      
      if (this.multiple) {
        const index = this.selectedValues.indexOf(option.value);
        if (index > -1) {
          this.selectedValues.splice(index, 1);
        } else {
          this.selectedValues.push(option.value);
        }
        this.value = [...this.selectedValues];
        this.onChange(this.value);
      } else {
        this.value = option.value;
        this.onChange(this.value);
        this.dropdownOpen = false;
      }
      
      this.searchText = '';
      this.onTouched();
    }

    onSearch(): void {
      const search = this.searchText.toLowerCase();
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(search)
      );
      this.focusedIndex = -1;
    }

    clearSelection(event?: Event): void {
      if (event) {
        event.stopPropagation();
      }
      this.value = this.multiple ? [] : null;
      this.selectedValues = [];
      this.onChange(this.value);
      this.onTouched();
    }

    getSelectedLabel(): string {
      if (this.multiple) {
        const selected = this.options.filter(opt => this.selectedValues.includes(opt.value));
        return selected.length > 0 
          ? selected.map(opt => opt.label).join(', ')
          : '';
      }
      return this.options.find(option => option.value === this.value)?.label || '';
    }

    isSelected(option: SelectOption): boolean {
      if (this.multiple) {
        return this.selectedValues.includes(option.value);
      }
      return option.value === this.value;
    }

    getClasses(): string[] {
      const classes = [
        `muxima-select-${this.variant}`,
        `muxima-select-${this.size}`
      ];
      
      if (this.hasError) classes.push('muxima-select-error');
      if (this.disabled) classes.push('muxima-select-disabled');
      if (this.readonly) classes.push('muxima-select-readonly');
      if (this.dropdownOpen) classes.push('muxima-select-open');
      
      return classes;
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event): void {
      const target = event.target as HTMLElement;
      if (!target.closest('.muxima-select-container')) {
        this.dropdownOpen = false;
      }
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
      if (!this.dropdownOpen) {
        if (event.key === 'Enter' || event.key === ' ') {
          this.toggleDropdown();
          event.preventDefault();
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          this.focusedIndex = Math.min(this.focusedIndex + 1, this.filteredOptions.length - 1);
          event.preventDefault();
          break;
        case 'ArrowUp':
          this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
          event.preventDefault();
          break;
        case 'Enter':
          if (this.focusedIndex >= 0 && this.focusedIndex < this.filteredOptions.length) {
            this.selectOption(this.filteredOptions[this.focusedIndex]);
          }
          event.preventDefault();
          break;
        case 'Escape':
          this.dropdownOpen = false;
          event.preventDefault();
          break;
      }
    }

  }
