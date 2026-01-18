import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  template?: TemplateRef<any>;
  headerTemplate?: TemplateRef<any>;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
}

export interface TableConfig {
  pageable?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  exportable?: boolean;
  virtualScroll?: boolean;
  rowHeight?: number;
  emptyMessage?: string;
}

export interface SortEvent {
  field: string;
  order: 'asc' | 'desc' | null;
}

export interface FilterEvent {
  field: string;
  value: any;
}

@Component({
  selector: 'muxima-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() config: TableConfig = {};
  @Input() loading: boolean = false;
  @Input() totalRecords: number = 0;

  @Output() sort = new EventEmitter<SortEvent>();
  @Output() filter = new EventEmitter<FilterEvent>();
  @Output() pageChange = new EventEmitter<{ page: number; pageSize: number }>();
  @Output() rowSelect = new EventEmitter<any>();
  @Output() rowUnselect = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() export = new EventEmitter<'csv' | 'excel' | 'pdf'>();

  // Table state
  currentPage: number = 1;
  pageSize: number = 10;
  sortField: string | null = null;
  sortOrder: 'asc' | 'desc' | null = null;
  filters: Map<string, any> = new Map();
  selectedRows: any[] = [];
  processedData: any[] = [];

  // UI state
  columnWidths: Map<string, number> = new Map();
  resizingColumn: string | null = null;
  resizeStartX: number = 0;
  resizeStartWidth: number = 0;

  ngOnInit() {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['config']) {
      this.processData();
    }
  }

  private initializeTable() {
    this.pageSize = this.config.pageSize || 10;
    this.totalRecords = this.totalRecords || this.data.length;
    this.processData();
  }

  private processData() {
    let result = [...this.data];

    // Apply filters
    if (this.filters.size > 0) {
      result = this.applyFilters(result);
    }

    // Apply sorting
    if (this.sortField && this.sortOrder) {
      result = this.applySorting(result);
    }

    // Store total before pagination
    this.totalRecords = result.length;

    // Apply pagination
    if (this.config.pageable !== false) {
      result = this.applyPagination(result);
    }

    this.processedData = result;
  }

  private applyFilters(data: any[]): any[] {
    return data.filter(row => {
      for (const [field, filterValue] of this.filters.entries()) {
        if (!filterValue) continue;

        const cellValue = this.getFieldValue(row, field);
        const cellStr = String(cellValue).toLowerCase();
        const filterStr = String(filterValue).toLowerCase();

        if (!cellStr.includes(filterStr)) {
          return false;
        }
      }
      return true;
    });
  }

  private applySorting(data: any[]): any[] {
    if (!this.sortField || !this.sortOrder) return data;

    return [...data].sort((a, b) => {
      const aVal = this.getFieldValue(a, this.sortField!);
      const bVal = this.getFieldValue(b, this.sortField!);

      let comparison = 0;
      if (aVal > bVal) comparison = 1;
      if (aVal < bVal) comparison = -1;

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  private applyPagination(data: any[]): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return data.slice(start, end);
  }

  // Sorting
  onSort(column: TableColumn) {
    if (!column.sortable && this.config.sortable !== false) return;

    if (this.sortField === column.field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : this.sortOrder === 'desc' ? null : 'asc';
    } else {
      this.sortField = column.field;
      this.sortOrder = 'asc';
    }

    if (this.sortOrder === null) {
      this.sortField = null;
    }

    this.sort.emit({
      field: column.field,
      order: this.sortOrder
    });

    this.processData();
  }

  getSortIcon(column: TableColumn): string {
    if (this.sortField !== column.field) return '⇅';
    return this.sortOrder === 'asc' ? '↑' : '↓';
  }

  // Filtering
  onFilter(column: TableColumn, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    
    if (value) {
      this.filters.set(column.field, value);
    } else {
      this.filters.delete(column.field);
    }

    this.filter.emit({
      field: column.field,
      value: value
    });

    this.currentPage = 1;
    this.processData();
  }

  // Pagination
  onPageChange(page: number) {
    this.currentPage = page;
    this.pageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize
    });
    this.processData();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.pageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize
    });
    this.processData();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  get paginationPages(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let end = Math.min(this.totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Selection
  toggleRowSelection(row: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    const index = this.selectedRows.findIndex(r => r === row);
    
    if (index > -1) {
      this.selectedRows.splice(index, 1);
      this.rowUnselect.emit(row);
    } else {
      if (!this.config.multiSelect) {
        this.selectedRows = [row];
      } else {
        this.selectedRows.push(row);
      }
      this.rowSelect.emit(row);
    }

    this.selectionChange.emit(this.selectedRows);
  }

  isRowSelected(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  toggleAllSelection(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    
    if (checked) {
      this.selectedRows = [...this.processedData];
    } else {
      this.selectedRows = [];
    }

    this.selectionChange.emit(this.selectedRows);
  }

  get allSelected(): boolean {
    return this.processedData.length > 0 && 
           this.selectedRows.length === this.processedData.length;
  }

  get someSelected(): boolean {
    return this.selectedRows.length > 0 && 
           this.selectedRows.length < this.processedData.length;
  }

  // Column resizing
  onResizeStart(column: TableColumn, event: MouseEvent) {
    if (!this.config.resizable) return;

    event.preventDefault();
    this.resizingColumn = column.field;
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = this.columnWidths.get(column.field) || 150;

    document.addEventListener('mousemove', this.onResizeMove);
    document.addEventListener('mouseup', this.onResizeEnd);
  }

  private onResizeMove = (event: MouseEvent) => {
    if (!this.resizingColumn) return;

    const diff = event.clientX - this.resizeStartX;
    const newWidth = Math.max(50, this.resizeStartWidth + diff);
    this.columnWidths.set(this.resizingColumn, newWidth);
  };

  private onResizeEnd = () => {
    this.resizingColumn = null;
    document.removeEventListener('mousemove', this.onResizeMove);
    document.removeEventListener('mouseup', this.onResizeEnd);
  };

  getColumnWidth(column: TableColumn): string {
    if (this.columnWidths.has(column.field)) {
      return `${this.columnWidths.get(column.field)}px`;
    }
    return column.width || 'auto';
  }

  // Export
  onExport(format: 'csv' | 'excel' | 'pdf') {
    this.export.emit(format);
  }

  exportToCSV() {
    const csv = this.convertToCSV(this.data);
    this.downloadFile(csv, 'data.csv', 'text/csv');
  }

  private convertToCSV(data: any[]): string {
    const headers = this.columns.map(col => col.header).join(',');
    const rows = data.map(row => 
      this.columns.map(col => {
        const value = this.getFieldValue(row, col.field);
        return `"${value}"`;
      }).join(',')
    );
    return [headers, ...rows].join('\n');
  }

  private downloadFile(content: string, fileName: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // Utilities
  getFieldValue(row: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], row);
  }

  trackByIndex(index: number): number {
    return index;
  }

  get emptyMessage(): string {
    return this.config.emptyMessage || 'No data available';
  }
}
