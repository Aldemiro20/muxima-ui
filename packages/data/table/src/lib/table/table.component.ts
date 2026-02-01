import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TablePagination {
  currentPage: number;
  totalElements: number;
  itemsPerPage: number;
}

export interface PaginationEvent {
  page: number;
  size: number;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc' | null;
}

export type TableVariant = 'default' | 'glass' | 'shadow' | 'gradient-header' | 'colorful' | 'dark' | 'minimal' | 'rounded' | 'cards';

@Component({
  selector: 'muxima-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() striped = false;
  @Input() hoverable = true;
  @Input() bordered = false;
  @Input() compact = false;
  @Input() variant: TableVariant = 'default';
  
  @Input() pagination: TablePagination = {
    currentPage: 0,
    totalElements: 0,
    itemsPerPage: 10
  };
  
  @Input() showPagination = true;
  @Input() pageSizeOptions = [5, 10, 25, 50, 100];
  
  @Output() pageChange = new EventEmitter<PaginationEvent>();
  @Output() sortChange = new EventEmitter<SortEvent>();

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  
  visiblePages: number[] = [];
  maxVisiblePages = 5;
  totalPages = 0;
  firstItem = 0;
  lastItem = 0;

  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pagination']) {
      this.updatePagination();
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.pagination.totalElements / this.pagination.itemsPerPage);
    this.firstItem = (this.pagination.currentPage * this.pagination.itemsPerPage) + 1;
    this.lastItem = Math.min((this.pagination.currentPage + 1) * this.pagination.itemsPerPage, this.pagination.totalElements);
    this.updateVisiblePages();
  }

  handleSort(column: TableColumn) {
    if (!column.sortable) return;
    
    if (this.sortColumn === column.key) {
      // Toggle through: asc -> desc -> null
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = null;
        this.sortColumn = null;
      }
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.sortChange.emit({
      column: this.sortColumn || '',
      direction: this.sortDirection
    });
  }

  getSortIcon(column: TableColumn): string {
    if (!column.sortable) return '';
    if (this.sortColumn !== column.key) return '⇅';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.totalPages || page === this.pagination.currentPage) return;
    
    this.pagination.currentPage = page;
    this.updatePagination();
    this.pageChange.emit({
      page: this.pagination.currentPage,
      size: this.pagination.itemsPerPage
    });
  }

  goToFirstPage() {
    this.goToPage(0);
  }

  goToPreviousPage() {
    this.goToPage(this.pagination.currentPage - 1);
  }

  goToNextPage() {
    this.goToPage(this.pagination.currentPage + 1);
  }

  goToLastPage() {
    this.goToPage(this.totalPages - 1);
  }

  changePageSize(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newSize = parseInt(select.value);
    
    this.pagination.itemsPerPage = newSize;
    this.pagination.currentPage = Math.min(
      this.pagination.currentPage,
      Math.ceil(this.pagination.totalElements / newSize) - 1
    );
    
    this.updatePagination();
    this.pageChange.emit({
      page: this.pagination.currentPage,
      size: this.pagination.itemsPerPage
    });
  }

  updateVisiblePages() {
    const half = Math.floor(this.maxVisiblePages / 2);
    let start = Math.max(this.pagination.currentPage - half, 0);
    let end = Math.min(this.pagination.currentPage + half, this.totalPages - 1);

    if (end - start + 1 < this.maxVisiblePages) {
      if (start === 0) {
        end = Math.min(this.maxVisiblePages - 1, this.totalPages - 1);
      } else if (end === this.totalPages - 1) {
        start = Math.max(this.totalPages - this.maxVisiblePages, 0);
      }
    }

    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  getTableClasses(): string[] {
    const classes = ['muxima-table'];
    if (this.striped) classes.push('muxima-table-striped');
    if (this.hoverable) classes.push('muxima-table-hoverable');
    if (this.bordered) classes.push('muxima-table-bordered');
    if (this.compact) classes.push('muxima-table-compact');
    
    // Variantes modernas
    if (this.variant === 'glass') classes.push('muxima-table-glass');
    if (this.variant === 'shadow') classes.push('muxima-table-shadow');
    if (this.variant === 'gradient-header') classes.push('muxima-table-gradient-header');
    if (this.variant === 'colorful') classes.push('muxima-table-colorful');
    if (this.variant === 'dark') classes.push('muxima-table-dark');
    if (this.variant === 'minimal') classes.push('muxima-table-minimal');
    if (this.variant === 'rounded') classes.push('muxima-table-rounded');
    if (this.variant === 'cards') classes.push('muxima-table-cards');
    
    return classes;
  }

  getCellValue(row: any, column: TableColumn): any {
    return row[column.key];
  }
}
