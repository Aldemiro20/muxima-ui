# @muxima-ui/autocomplete

Autocomplete component with real-time search suggestions, keyboard navigation, and virtual scrolling.

## Installation

```bash
npm install @muxima-ui/autocomplete
```

## Usage

```typescript
import { AutocompleteComponent } from '@muxima-ui/autocomplete';

@Component({
  standalone: true,
  imports: [AutocompleteComponent],
  template: `
    <muxima-autocomplete
      [options]="options"
      placeholder="Search..."
      [(ngModel)]="selectedValue"
      (search)="onSearch($event)">
    </muxima-autocomplete>
  `
})
export class MyComponent {
  options = ['Apple', 'Banana', 'Cherry'];
  selectedValue = '';

  onSearch(term: string) {
    // Filter options based on search term
  }
}
```

## Features

- Real-time search with debounce
- Keyboard navigation (arrow keys, enter, escape)
- Virtual scrolling for large datasets
- Customizable templates
- Accessibility support
