import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent, SearchSuggestion } from '@muxima-ui/search-bar';

@Component({
  selector: 'app-search-bar-doc',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './search-bar-doc.component.html',
  styleUrls: ['./search-bar-doc.component.scss']
})
export class SearchBarDocComponent {
  searchResults: string[] = [];
  isLoading: boolean = false;

  // Sample suggestions
  suggestions: SearchSuggestion[] = [
    { id: '1', text: 'Dashboard', icon: '📊', category: 'Pages', route: '/dashboard' },
    { id: '2', text: 'Users', icon: '👥', category: 'Pages', route: '/users' },
    { id: '3', text: 'Settings', icon: '⚙️', category: 'Pages', route: '/settings' },
    { id: '4', text: 'Profile', icon: '👤', category: 'Pages', route: '/profile' },
    { id: '5', text: 'Analytics', icon: '📈', category: 'Pages', route: '/analytics' }
  ];

  productSuggestions: SearchSuggestion[] = [
    { id: 'p1', text: 'MacBook Pro 16"', icon: '💻', category: 'Laptops' },
    { id: 'p2', text: 'iPhone 15 Pro', icon: '📱', category: 'Smartphones' },
    { id: 'p3', text: 'AirPods Pro', icon: '🎧', category: 'Audio' },
    { id: 'p4', text: 'iPad Air', icon: '📱', category: 'Tablets' },
    { id: 'p5', text: 'Apple Watch Series 9', icon: '⌚', category: 'Wearables' }
  ];

  documentSuggestions: SearchSuggestion[] = [
    { id: 'd1', text: 'Annual Report 2025.pdf', icon: '📄', category: 'Documents' },
    { id: 'd2', text: 'Q4 Financial Results', icon: '📊', category: 'Reports' },
    { id: 'd3', text: 'Team Meeting Notes', icon: '📝', category: 'Notes' },
    { id: 'd4', text: 'Product Roadmap', icon: '🗺️', category: 'Planning' }
  ];

  codeExamples: { [key: string]: string } = {
    import: `import { SearchBarComponent, SearchSuggestion } from '@muxima-ui/search-bar';

@Component({
  standalone: true,
  imports: [SearchBarComponent],
  // ...
})`,
    basic: `<muxima-search-bar
  placeholder="Search..."
  (search)="onSearch($event)">
</muxima-search-bar>`,
    suggestions: `// Component
suggestions: SearchSuggestion[] = [
  { id: '1', text: 'Dashboard', icon: '📊', category: 'Pages', route: '/dashboard' },
  { id: '2', text: 'Users', icon: '👥', category: 'Pages', route: '/users' },
  { id: '3', text: 'Settings', icon: '⚙️', category: 'Pages', route: '/settings' }
];

// Template
<muxima-search-bar
  placeholder="Search pages..."
  [suggestions]="suggestions"
  (search)="onSearch($event)"
  (suggestionSelected)="onSuggestionSelected($event)">
</muxima-search-bar>

// Handlers
onSearch(query: string) {
  console.log('Searching:', query);
  // Fetch suggestions from API
}

onSuggestionSelected(suggestion: SearchSuggestion) {
  console.log('Selected:', suggestion);
  // Navigate to suggestion.route or perform action
}`,
    keyboard: `<muxima-search-bar
  placeholder="Press Ctrl+K to search"
  keyboardShortcut="Ctrl+K"
  [suggestions]="suggestions">
</muxima-search-bar>`,
    loading: `<muxima-search-bar
  placeholder="Searching..."
  [loading]="isLoading"
  [suggestions]="suggestions"
  (search)="onSearch($event)">
</muxima-search-bar>

// Component
onSearch(query: string) {
  this.isLoading = true;
  this.apiService.search(query).subscribe({
    next: (results) => {
      this.suggestions = results;
      this.isLoading = false;
    }
  });
}`,
    sizes: `<!-- Small -->
<muxima-search-bar size="sm" placeholder="Small search"></muxima-search-bar>

<!-- Medium (Default) -->
<muxima-search-bar size="md" placeholder="Medium search"></muxima-search-bar>

<!-- Large -->
<muxima-search-bar size="lg" placeholder="Large search"></muxima-search-bar>`,
    interface: `export interface SearchSuggestion {
  id: string;           // Unique identifier
  text: string;         // Display text
  icon?: string;        // Emoji or icon
  category?: string;    // Optional category label
  route?: string;       // Optional navigation route
}`
  };

  onSearch(query: string) {
    console.log('Search query:', query);
    this.searchResults.push(query);
  }

  onSuggestionSelected(suggestion: SearchSuggestion) {
    console.log('Suggestion selected:', suggestion);
    alert(`Selected: ${suggestion.text}`);
  }

  onClear() {
    console.log('Search cleared');
    this.searchResults = [];
  }

  simulateLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getCodeExample(key: string): string {
    return this.codeExamples[key] || '';
  }
}
