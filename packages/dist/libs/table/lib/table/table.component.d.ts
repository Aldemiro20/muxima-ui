import { EventEmitter, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
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
export declare class TableComponent {
    columns: TableColumn[];
    data: any[];
    loading: boolean;
    striped: boolean;
    hoverable: boolean;
    bordered: boolean;
    compact: boolean;
    variant: TableVariant;
    pagination: TablePagination;
    showPagination: boolean;
    pageSizeOptions: number[];
    pageChange: EventEmitter<PaginationEvent>;
    sortChange: EventEmitter<SortEvent>;
    sortColumn: string | null;
    sortDirection: 'asc' | 'desc' | null;
    visiblePages: number[];
    maxVisiblePages: number;
    totalPages: number;
    firstItem: number;
    lastItem: number;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updatePagination(): void;
    handleSort(column: TableColumn): void;
    getSortIcon(column: TableColumn): string;
    goToPage(page: number): void;
    goToFirstPage(): void;
    goToPreviousPage(): void;
    goToNextPage(): void;
    goToLastPage(): void;
    changePageSize(event: Event): void;
    updateVisiblePages(): void;
    getTableClasses(): string[];
    getCellValue(row: any, column: TableColumn): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableComponent, "muxima-table", never, { "columns": "columns"; "data": "data"; "loading": "loading"; "striped": "striped"; "hoverable": "hoverable"; "bordered": "bordered"; "compact": "compact"; "variant": "variant"; "pagination": "pagination"; "showPagination": "showPagination"; "pageSizeOptions": "pageSizeOptions"; }, { "pageChange": "pageChange"; "sortChange": "sortChange"; }, never, never, true, never>;
}
