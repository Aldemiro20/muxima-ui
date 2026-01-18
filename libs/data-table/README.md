# Data Table Component

An advanced data table component with sorting, filtering, pagination, selection, and export capabilities.

## Features

- 📊 Advanced data management
- ⬆️⬇️ Multi-column sorting (asc/desc/none)
- 🔍 Column-level filtering
- 📄 Pagination with configurable page sizes
- ✅ Row selection (single/multi/all)
- 📏 Resizable columns
- 📤 Export to CSV
- 🎨 Custom cell templates
- 📱 Responsive design
- 🔄 Loading states
- ♿ Accessible

## Installation

```bash
npm install @muxima-ui/data-table
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { DataTableComponent, TableColumn } from '@muxima-ui/data-table';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [DataTableComponent],
  template: `
    <muxima-data-table
      [columns]="columns"
      [data]="data">
    </muxima-data-table>
  `
})
export class DemoComponent {
  columns: TableColumn[] = [
    { field: 'id', header: 'ID', sortable: true, width: '80px' },
    { field: 'name', header: 'Name', sortable: true, filterable: true },
    { field: 'email', header: 'Email', filterable: true },
    { field: 'role', header: 'Role', sortable: true }
  ];

  data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    // ... more data
  ];
}
```

### With Configuration

```typescript
import { TableConfig } from '@muxima-ui/data-table';

config: TableConfig = {
  pageable: true,
  pageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
  sortable: true,
  filterable: true,
  selectable: true,
  multiSelect: true,
  resizable: true,
  exportable: true
};
```

```html
<muxima-data-table
  [columns]="columns"
  [data]="data"
  [config]="config">
</muxima-data-table>
```

### With Custom Templates

```html
<muxima-data-table [columns]="columns" [data]="data">
  <ng-template #statusTemplate let-row>
    <span [class]="'status-badge status-' + row.status.toLowerCase()">
      {{ row.status }}
    </span>
  </ng-template>
  
  <ng-template #actionsTemplate let-row>
    <button (click)="edit(row)">Edit</button>
    <button (click)="delete(row)">Delete</button>
  </ng-template>
</muxima-data-table>
```

```typescript
columns: TableColumn[] = [
  { field: 'name', header: 'Name' },
  { field: 'status', header: 'Status', template: 'statusTemplate' },
  { field: 'actions', header: 'Actions', template: 'actionsTemplate' }
];
```

### With Events

```html
<muxima-data-table
  [columns]="columns"
  [data]="data"
  (sort)="onSort($event)"
  (filter)="onFilter($event)"
  (rowSelect)="onRowSelect($event)"
  (selectionChange)="onSelectionChange($event)"
  (pageChange)="onPageChange($event)">
</muxima-data-table>
```

```typescript
onSort(event: SortEvent) {
  console.log('Sort:', event.field, event.order);
}

onFilter(event: FilterEvent) {
  console.log('Filter:', event.field, event.value);
}

onRowSelect(row: any) {
  console.log('Selected row:', row);
}

onSelectionChange(rows: any[]) {
  console.log('Selected rows:', rows);
}

onPageChange(event: { page: number, pageSize: number }) {
  console.log('Page changed:', event);
}
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `TableColumn[]` | `[]` | Column definitions |
| `data` | `any[]` | `[]` | Data array |
| `config` | `TableConfig` | Default config | Table configuration |
| `loading` | `boolean` | `false` | Show loading overlay |
| `emptyMessage` | `string` | `'No data found'` | Message when no data |

### Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `sort` | `SortEvent` | Emitted when column is sorted |
| `filter` | `FilterEvent` | Emitted when filter changes |
| `pageChange` | `{page: number, pageSize: number}` | Emitted when page changes |
| `rowSelect` | `any` | Emitted when row is selected |
| `rowUnselect` | `any` | Emitted when row is unselected |
| `selectionChange` | `any[]` | Emitted when selection changes |
| `export` | `any[]` | Emitted when export is triggered |

### TableColumn Interface

```typescript
interface TableColumn {
  field: string;              // Field name in data object
  header: string;             // Column header text
  sortable?: boolean;         // Enable sorting
  filterable?: boolean;       // Enable filtering
  width?: string;            // Column width (e.g., '150px', '20%')
  align?: 'left' | 'center' | 'right';  // Text alignment
  template?: TemplateRef<any> | string;  // Custom cell template
  headerTemplate?: TemplateRef<any>;     // Custom header template
  type?: 'text' | 'number' | 'date' | 'boolean';  // Data type
}
```

### TableConfig Interface

```typescript
interface TableConfig {
  pageable?: boolean;         // Enable pagination
  pageSize?: number;          // Items per page
  pageSizeOptions?: number[]; // Available page sizes
  sortable?: boolean;         // Enable sorting
  filterable?: boolean;       // Enable filtering
  selectable?: boolean;       // Enable row selection
  multiSelect?: boolean;      // Allow multiple selection
  resizable?: boolean;        // Enable column resizing
  exportable?: boolean;       // Show export button
}
```

## Advanced Examples

### User Management Table

```typescript
columns: TableColumn[] = [
  { field: 'id', header: 'ID', width: '80px', sortable: true },
  { field: 'name', header: 'Name', sortable: true, filterable: true },
  { field: 'email', header: 'Email', filterable: true },
  { field: 'role', header: 'Role', sortable: true, filterable: true },
  { field: 'status', header: 'Status', template: 'statusTemplate' },
  { field: 'createdAt', header: 'Created', type: 'date', sortable: true },
  { field: 'actions', header: 'Actions', template: 'actionsTemplate' }
];

data = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: new Date('2024-01-15')
  },
  // ... more users
];
```

### Product Inventory

```typescript
columns: TableColumn[] = [
  { field: 'sku', header: 'SKU', width: '100px', sortable: true },
  { field: 'name', header: 'Product', sortable: true, filterable: true },
  { field: 'category', header: 'Category', filterable: true },
  { field: 'price', header: 'Price', type: 'number', align: 'right', sortable: true },
  { field: 'stock', header: 'Stock', type: 'number', align: 'right', sortable: true },
  { field: 'status', header: 'Status', template: 'statusTemplate' }
];
```

### Nested Data

```typescript
// Access nested properties with dot notation
columns: TableColumn[] = [
  { field: 'user.name', header: 'User Name', sortable: true },
  { field: 'user.profile.address.city', header: 'City', filterable: true },
  { field: 'order.total', header: 'Total', type: 'number', align: 'right' }
];

data = [
  {
    user: {
      name: 'John Doe',
      profile: {
        address: {
          city: 'New York'
        }
      }
    },
    order: {
      total: 299.99
    }
  }
];
```

### Server-Side Data

```typescript
@Component({
  // ...
})
export class ServerSideTableComponent {
  data: any[] = [];
  totalRecords = 0;
  loading = false;

  onSort(event: SortEvent) {
    this.loadData({ sortField: event.field, sortOrder: event.order });
  }

  onFilter(event: FilterEvent) {
    this.loadData({ filters: { [event.field]: event.value } });
  }

  onPageChange(event: { page: number, pageSize: number }) {
    this.loadData({ page: event.page, pageSize: event.pageSize });
  }

  loadData(params: any) {
    this.loading = true;
    this.apiService.getData(params).subscribe(response => {
      this.data = response.items;
      this.totalRecords = response.total;
      this.loading = false;
    });
  }
}
```

## Column Features

### Sorting

```typescript
// Enable sorting on specific columns
{ field: 'name', header: 'Name', sortable: true }

// Supports three states: asc, desc, null (unsorted)
```

### Filtering

```typescript
// Enable filtering with text input
{ field: 'email', header: 'Email', filterable: true }

// Filter is case-insensitive and uses includes()
```

### Alignment

```typescript
// Left (default)
{ field: 'name', header: 'Name', align: 'left' }

// Center
{ field: 'status', header: 'Status', align: 'center' }

// Right (for numbers)
{ field: 'price', header: 'Price', align: 'right' }
```

### Column Resizing

```typescript
config: TableConfig = {
  resizable: true  // Enable drag-to-resize columns
};
```

## Row Selection

### Single Selection

```typescript
config: TableConfig = {
  selectable: true,
  multiSelect: false
};
```

### Multiple Selection

```typescript
config: TableConfig = {
  selectable: true,
  multiSelect: true  // Ctrl+Click to select multiple
};
```

### Programmatic Selection

```typescript
// Get selected rows
@ViewChild(DataTableComponent) table!: DataTableComponent;

getSelectedRows() {
  return this.table.selectedRows;
}

// Clear selection
clearSelection() {
  this.table.selectedRows = [];
}
```

## Export

### CSV Export

```typescript
config: TableConfig = {
  exportable: true
};
```

```html
<!-- Export button appears in toolbar -->
<muxima-data-table
  [columns]="columns"
  [data]="data"
  [config]="config"
  (export)="onExport($event)">
</muxima-data-table>
```

```typescript
onExport(data: any[]) {
  console.log('Exporting', data.length, 'rows');
}
```

## Styling

Customize the table appearance:

```css
muxima-data-table {
  --table-border-color: #e2e8f0;
  --table-header-bg: #f8fafc;
  --table-header-text: #1e293b;
  --table-row-hover-bg: #f1f5f9;
  --table-selected-bg: rgba(102, 126, 234, 0.08);
  --table-border-radius: 8px;
}
```

## Performance Tips

1. **Virtual Scrolling**: For large datasets (1000+ rows), consider implementing virtual scrolling
2. **Server-Side Processing**: Load data from server for better performance
3. **Lazy Loading**: Load data on demand when scrolling
4. **Debounce Filters**: Add debounce to filter inputs to reduce API calls
5. **Memoization**: Cache processed data to avoid recalculations

## Accessibility

- ARIA labels for interactive elements
- Keyboard navigation (Tab, Arrow keys)
- Screen reader support
- Focus indicators
- Sortable column announcements

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT
