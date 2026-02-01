import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SearchSuggestion {
  id: string;
  text: string;
  icon?: string;
  category?: string;
  route?: string;
}

export type SearchSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'muxima-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @Input() placeholder: string = 'Search...';
  @Input() suggestions: SearchSuggestion[] = [];
  @Input() size: SearchSize = 'md';
  @Input() showIcon: boolean = true;
  @Input() clearable: boolean = true;
  @Input() loading: boolean = false;
  @Input() debounceTime: number = 300;
  @Input() keyboardShortcut: string = 'Ctrl+K';

  @Output() search = new EventEmitter<string>();
  @Output() suggestionSelected = new EventEmitter<SearchSuggestion>();
  @Output() clear = new EventEmitter<void>();

  searchValue: string = '';
  showSuggestions: boolean = false;
  selectedIndex: number = -1;
  private debounceTimer: any;

  ngOnInit() {
    this.setupKeyboardShortcut();
  }

  ngOnDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    document.removeEventListener('keydown', this.handleKeyboardShortcut);
  }

  private setupKeyboardShortcut() {
    document.addEventListener('keydown', this.handleKeyboardShortcut);
  }

  private handleKeyboardShortcut = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.focusSearch();
    }
    
    if (event.key === 'Escape' && this.showSuggestions) {
      this.hideSuggestions();
    }
  };

  onInputChange() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.search.emit(this.searchValue);
      this.showSuggestions = this.searchValue.length > 0 && this.suggestions.length > 0;
      this.selectedIndex = -1;
    }, this.debounceTime);
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.showSuggestions || this.suggestions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.suggestions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectSuggestion(this.suggestions[this.selectedIndex]);
        }
        break;
      case 'Escape':
        this.hideSuggestions();
        break;
    }
  }

  selectSuggestion(suggestion: SearchSuggestion) {
    this.searchValue = suggestion.text;
    this.suggestionSelected.emit(suggestion);
    this.hideSuggestions();
  }

  clearSearch() {
    this.searchValue = '';
    this.hideSuggestions();
    this.clear.emit();
    this.focusSearch();
  }

  focusSearch() {
    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    }, 0);
  }

  hideSuggestions() {
    this.showSuggestions = false;
    this.selectedIndex = -1;
  }

  onBlur() {
    // Delay to allow click on suggestion
    setTimeout(() => {
      this.hideSuggestions();
    }, 200);
  }

  get sizeClass(): string {
    return `search-${this.size}`;
  }
}
