import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DATA_GRID, MxGridColumn, MxGridSort } from '@muxima-ui/core/data-grid';
import { MxInput } from '@muxima-ui/core/form-field';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxPagination } from '@muxima-ui/core/pagination';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

interface Invoice {
  number: string;
  customer: string;
  province: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  issued: Date;
  amount: number;
}

/** Sample invoices, always the same for the same n. */
function makeInvoices(n: number): Invoice[] {
  const customers = [
    'Kianda Logistics',
    'Banco Mutamba',
    'Huíla Agro',
    'Energia do Cuanza',
    'Atlântico Seguros',
    'Lobito Portos',
    'Namibe Pescas',
    'Uíge Café',
  ];
  const provinces = [
    'Luanda',
    'Luanda',
    'Huíla',
    'Cuanza Sul',
    'Benguela',
    'Benguela',
    'Namibe',
    'Uíge',
  ];
  const statuses: Invoice['status'][] = ['Paid', 'Paid', 'Pending', 'Overdue'];
  return Array.from({ length: n }, (_, i) => ({
    number: `FT 2026/${String(n - i).padStart(5, '0')}`,
    customer: customers[(i * 7) % 8],
    province: provinces[(i * 7) % 8],
    status: statuses[(i * 3 + Math.floor(i / 5)) % 4],
    issued: new Date(2026, 9, 27 - (i % 300)),
    amount: 50000 + ((i * 7919) % 400) * 12500,
  }));
}

const kz = (v: number) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v) +
  ' Kz';
const statusColor = (e: string) =>
  e === 'Paid' ? 'success' : e === 'Pending' ? 'warning' : 'danger';

@Component({
  selector: 'doc-data-grid-page',
  imports: [DOC_UI, MX_DATA_GRID, MxBadge, MxButton, MxInput, MX_MENU, MxPagination, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Data grid' }]"
        title="Data grid"
        lead="A data table for serious work: sorting, per-column filters, search, selection, resizable, pinned and hideable columns, and virtual scroll for thousands of rows. You move cell by cell with the arrows, like a spreadsheet."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Data grid example">
          <mx-data-grid
            class="w-full"
            [data]="invoices"
            [columns]="columns"
            rowKey="number"
            selection="multiple"
            [(selected)]="chosen"
            height="420px"
            aria-label="Invoices"
          >
            <ng-template mxGridCell="status" let-row>
              <span mxBadge size="sm" [variant]="color(row.status)">{{ row.status }}</span>
            </ng-template>
          </mx-data-grid>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_DATA_GRID, MxGridColumn } from '@muxima-ui/core/data-grid';" />
        <doc-callout
          >If the user only reads the data, the <a routerLink="/components/table">Table</a> is enough and
          lighter: it's plain styled HTML. Use the Data grid when they work with the data:
          filtering, selecting, adjusting columns or going through thousands of rows.</doc-callout
        >
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          Toolbar (search and column menu), a sticky header with sorting and filters, rows, and the
          footer with the count.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Sort (aria-sort)',
            topRight: 'Drag to resize',
            bottomLeft: 'Pinned column',
            bottomRight: 'Announced count',
            bottom: 'table role=grid with aria-rowcount',
          }"
        >
          <mx-data-grid
            class="w-full"
            [data]="few"
            [columns]="shortColumns"
            rowKey="number"
            [columnMenu]="false"
            aria-label="Example"
          >
            <ng-template mxGridCell="status" let-row
              ><span mxBadge size="sm" [variant]="color(row.status)">{{
                row.status
              }}</span></ng-template
            >
          </mx-data-grid>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"
            ><mx-data-grid
              class="w-full"
              [data]="[]"
              [columns]="shortColumns"
              rowKey="number"
              [columnMenu]="false"
              aria-label="Empty"
          /></doc-state>
          <doc-state name="Loading"
            ><mx-data-grid
              class="w-full"
              [data]="[]"
              [columns]="shortColumns"
              rowKey="number"
              [columnMenu]="false"
              loading
              aria-label="Loading"
          /></doc-state>
          <doc-state name="Compact"
            ><mx-data-grid
              class="w-full"
              [data]="few"
              [columns]="shortColumns"
              rowKey="number"
              [columnMenu]="false"
              density="compact"
              aria-label="Compact"
          /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="stack-lg">
          <doc-example
            title="10,000 rows with virtual scroll"
            note="Only the visible rows are drawn; aria-rowcount tells screen readers the total."
          >
            <mx-data-grid
              class="w-full"
              [data]="many"
              [columns]="shortColumns"
              rowKey="number"
              height="360px"
              density="compact"
              aria-label="This year's invoices"
            >
              <ng-template mxGridCell="status" let-row
                ><span mxBadge size="sm" [variant]="color(row.status)">{{
                  row.status
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Search and export in the toolbar"
            [note]="
              'Export uses grid.rows(): the filtered and sorted rows (' +
              grid.rows().length +
              ').'
            "
          >
            <mx-data-grid
              #grid
              class="w-full"
              [data]="invoices"
              [columns]="shortColumns"
              rowKey="number"
              [query]="search()"
              height="320px"
              aria-label="Invoices with search"
            >
              <div mxGridToolbar>
                <input
                  mxInput
                  type="search"
                  size="sm"
                  class="grid-search"
                  placeholder="Search all columns"
                  aria-label="Search invoices"
                  [value]="search()"
                  (input)="search.set($any($event.target).value)"
                />
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="exportCsv(grid.rows())"
                >
                  Export CSV
                </button>
              </div>
              <ng-template mxGridCell="status" let-row
                ><span mxBadge size="sm" [variant]="color(row.status)">{{
                  row.status
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Pinned columns and row actions"
            note="pinned keeps the number on the left and the actions on the right; scrolls sideways."
          >
            <mx-data-grid
              class="w-full"
              [data]="few"
              [columns]="wideColumns"
              rowKey="number"
              labelKey="number"
              aria-label="Invoices with many columns"
            >
              <ng-template mxGridCell="status" let-row
                ><span mxBadge size="sm" [variant]="color(row.status)">{{
                  row.status
                }}</span></ng-template
              >
              <ng-template mxGridCell="accoes" let-row>
                <button
                  mxButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  [mxMenuTriggerFor]="rowMenu"
                  [attr.aria-label]="'Actions for ' + row.number"
                >
                  ⋯
                </button>
                <ng-template #rowMenu>
                  <div mxMenu>
                    <button
                      mxMenuItem
                      type="button"
                      (mxMenuItemTriggered)="lastAction.set('Open ' + row.number)"
                    >
                      Open
                    </button>
                    <button
                      mxMenuItem
                      type="button"
                      (mxMenuItemTriggered)="lastAction.set('Reminder for ' + row.customer)"
                    >
                      Send reminder
                    </button>
                  </div>
                </ng-template>
              </ng-template>
            </mx-data-grid>
            <p class="muted small">{{ lastAction() || 'No action yet.' }}</p>
          </doc-example>

          <doc-example
            title="Single selection and open with Enter"
            [note]="
              opened()
                ? 'Opened: ' + opened()
                : 'Enter or double-click on a row emits rowActivate.'
            "
          >
            <mx-data-grid
              class="w-full"
              [data]="few"
              [columns]="shortColumns"
              rowKey="number"
              selection="single"
              [(selected)]="single"
              [columnMenu]="false"
              aria-label="Choose an invoice"
              (rowActivate)="opened.set($event.number)"
            >
              <ng-template mxGridCell="status" let-row
                ><span mxBadge size="sm" [variant]="color(row.status)">{{
                  row.status
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Server data"
            note="manual: the grid doesn't sort or filter; [(sort)] and [(filters)] change the request. Pagination goes in the footer (mxGridFooter)."
          >
            <mx-data-grid
              class="w-full"
              [data]="serverPage()"
              [columns]="serverColumns"
              rowKey="number"
              manual
              [totalRows]="serverTotal()"
              [loading]="isLoading()"
              [(sort)]="serverSort"
              [(filters)]="serverFilters"
              [columnMenu]="false"
              aria-label="Invoices from the server"
            >
              <ng-template mxGridCell="status" let-row
                ><span mxBadge size="sm" [variant]="color(row.status)">{{
                  row.status
                }}</span></ng-template
              >
              <mx-pagination
                mxGridFooter
                variant="compact"
                [(page)]="currentPage"
                [pageSize]="10"
                [total]="serverTotal()"
                aria-label="Invoice pages"
              />
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Filters already applied"
            [note]="'filters = ' + json(initialFilters())"
          >
            <div class="stack w-full">
              <mx-data-grid
                class="w-full"
                [data]="invoices"
                [columns]="filterColumns"
                rowKey="number"
                [(filters)]="initialFilters"
                height="300px"
                [columnMenu]="false"
                aria-label="Large overdue invoices"
              >
                <ng-template mxGridCell="status" let-row
                  ><span mxBadge size="sm" [variant]="color(row.status)">{{
                    row.status
                  }}</span></ng-template
                >
              </mx-data-grid>
              <p class="muted small">
                In the number filter: 100, &gt;100, &gt;=100, &lt;100, &lt;=100 or a range
                10-20.
              </p>
              <div>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="initialFilters.set({})"
                >
                  Clear filters
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Bulk actions"
            [note]="
              bulk().length
                ? bulk().length + ' selectedRows'
                : 'Select rows to see the actions.'
            "
          >
            <mx-data-grid
              class="w-full"
              [data]="batch()"
              [columns]="shortColumns"
              rowKey="number"
              selection="multiple"
              [(selected)]="bulk"
              [columnMenu]="false"
              aria-label="Invoices to collect"
            >
              <div mxGridToolbar class="row-wrap">
                @if (bulk().length) {
                  <button mxButton size="sm" type="button" (click)="markPaid()">
                    Mark as paid ({{ bulk().length }})
                  </button>
                  <button
                    mxButton
                    size="sm"
                    variant="ghost"
                    type="button"
                    (click)="bulk.set([])"
                  >
                    Clear selection
                  </button>
                } @else {
                  <span class="muted small">{{ unpaid() }} unpaid invoices</span>
                }
              </div>
              <ng-template mxGridCell="status" let-row
                ><span mxBadge size="sm" [variant]="color(row.status)">{{
                  row.status
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Totals in the footer"
            note="The total reads grid.rows(), so it follows the filters: try filtering the Status."
          >
            <mx-data-grid
              #totals
              class="w-full"
              [data]="invoices"
              [columns]="totalColumns"
              rowKey="number"
              height="300px"
              [columnMenu]="false"
              aria-label="Invoices with totals"
            >
              <ng-template mxGridCell="status" let-row
                ><span mxBadge size="sm" [variant]="color(row.status)">{{
                  row.status
                }}</span></ng-template
              >
              <span mxGridFooter class="grid-total"
                >Total <strong>{{ kz(sum(totals.rows())) }}</strong></span
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Initial sort and hidden columns"
            [note]="
              'sort = ' +
              (sortState().key ?? 'none') +
              ' ' +
              sortState().direction +
              '. Province and VAT are hidden: open Columns.'
            "
          >
            <mx-data-grid
              class="w-full"
              [data]="invoices"
              [columns]="hiddenColumns"
              rowKey="number"
              [(sort)]="sortState"
              height="300px"
              aria-label="Largest invoices first"
            >
              <ng-template mxGridCell="status" let-row
                ><span mxBadge size="sm" [variant]="color(row.status)">{{
                  row.status
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            {
              key: 'Tab',
              action: 'Enters the grid (one cell) and leaves it; does not go through every cell.',
            },
            { key: '← → ↑ ↓', action: 'Cell by cell, including header and filters.' },
            {
              key: 'Home End',
              action: 'Start and end of the row; with Ctrl, first and last cell.',
            },
            { key: 'Page Up / Down', action: 'One page of rows (with virtual scroll too).' },
            { key: 'Enter', action: 'On the header it sorts; on a row it emits rowActivate.' },
            { key: 'Space', action: 'Selects the row; Ctrl + A selects all.' },
            { key: 'Alt + ← →', action: 'On the header, changes the column width.' },
          ]"
          [aria]="[
            'table with role=grid, aria-rowcount and aria-colcount with the real total, even with virtual scroll.',
            'Each row has aria-rowindex and, with selection, aria-selected.',
            'The sortable header has aria-sort; the change is announced.',
            'The filters have names (Filter Customer); in text fields, the left and right arrows edit the text.',
            'The row and selection count is in an aria-live region.',
            'The checkboxes say the row: Select FT 2026/00200.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related
          [items]="[{ name: 'Table' }, { name: 'Pagination' }, { name: 'Dropdown menu' }]"
        />
      </section>
    </article>
  `,
})
export class DataGridPage {
  protected readonly invoices = makeInvoices(240);
  protected readonly few = makeInvoices(6);
  protected readonly many = makeInvoices(10000);
  protected readonly chosen = signal<readonly unknown[]>([]);
  protected readonly search = signal('');
  protected readonly lastAction = signal('');
  protected readonly single = signal<readonly unknown[]>([]);
  protected readonly opened = signal('');
  protected color(e: string): 'success' | 'warning' | 'danger' {
    return statusColor(e);
  }

  protected readonly columns: MxGridColumn<Invoice>[] = [
    {
      key: 'number',
      header: 'Number',
      width: 150,
      filter: 'text',
      pinned: 'start',
      hideable: false,
    },
    { key: 'customer', header: 'Customer', width: 200, filter: 'text' },
    { key: 'province', header: 'Province', width: 140, filter: 'select' },
    { key: 'status', header: 'Status', width: 130, filter: 'select' },
    { key: 'issued', header: 'Issued', width: 120 },
    {
      key: 'amount',
      header: 'Amount',
      width: 170,
      align: 'end',
      filter: 'number',
      format: (v: number) => kz(v),
    },
  ];
  protected readonly shortColumns: MxGridColumn<Invoice>[] = [
    { key: 'number', header: 'Number', width: 150 },
    { key: 'customer', header: 'Customer', width: 200 },
    { key: 'status', header: 'Status', width: 130 },
    { key: 'amount', header: 'Amount', width: 170, align: 'end', format: (v: number) => kz(v) },
  ];
  protected readonly wideColumns: MxGridColumn<Invoice>[] = [
    { key: 'number', header: 'Number', width: 150, pinned: 'start' },
    { key: 'customer', header: 'Customer', width: 220 },
    { key: 'province', header: 'Province', width: 160 },
    { key: 'status', header: 'Status', width: 140 },
    { key: 'issued', header: 'Issued', width: 140 },
    {
      key: 'due',
      header: 'Due date',
      width: 140,
      value: (f) => new Date(f.issued.getTime() + 30 * 864e5),
    },
    { key: 'amount', header: 'Amount', width: 180, align: 'end', format: (v: number) => kz(v) },
    {
      key: 'iva',
      header: 'IVA (14%)',
      width: 160,
      align: 'end',
      value: (f) => f.amount * 0.14,
      format: (v: number) => kz(v),
    },
    {
      key: 'accoes',
      header: 'Actions',
      width: 90,
      pinned: 'end',
      sortable: false,
      resizable: false,
      hideable: false,
      align: 'center',
    },
  ];

  protected readonly kz = kz;
  protected json(v: unknown): string {
    return JSON.stringify(v);
  }

  protected readonly filterColumns: MxGridColumn<Invoice>[] = [
    { key: 'number', header: 'Number', width: 150 },
    { key: 'customer', header: 'Customer', width: 200, filter: 'text' },
    { key: 'status', header: 'Status', width: 140, filter: 'select' },
    {
      key: 'amount',
      header: 'Amount',
      width: 170,
      align: 'end',
      filter: 'number',
      format: (v: number) => kz(v),
    },
  ];
  protected readonly initialFilters = signal<Record<string, string>>({
    status: 'Overdue',
    amount: '>3000000',
  });

  protected readonly batch = signal(makeInvoices(12));
  protected readonly bulk = signal<readonly unknown[]>([]);
  protected unpaid(): number {
    return this.batch().filter((f) => f.status !== 'Paid').length;
  }
  protected markPaid(): void {
    const chosen = new Set(this.bulk());
    this.batch.update((l) =>
      l.map((f) => (chosen.has(f.number) ? { ...f, status: 'Paid' as const } : f)),
    );
    this.bulk.set([]);
  }

  protected readonly totalColumns: MxGridColumn<Invoice>[] = [
    { key: 'number', header: 'Number', width: 150 },
    { key: 'customer', header: 'Customer', width: 200, filter: 'text' },
    { key: 'status', header: 'Status', width: 140, filter: 'select' },
    { key: 'amount', header: 'Amount', width: 170, align: 'end', format: (v: number) => kz(v) },
  ];
  protected sum(rows: readonly Invoice[]): number {
    return rows.reduce((t, f) => t + f.amount, 0);
  }

  protected readonly sortState = signal<MxGridSort>({ key: 'amount', direction: 'desc' });
  protected readonly hiddenColumns: MxGridColumn<Invoice>[] = [
    { key: 'number', header: 'Number', width: 150, hideable: false },
    { key: 'customer', header: 'Customer', width: 200 },
    { key: 'province', header: 'Province', width: 140, hidden: true },
    { key: 'status', header: 'Status', width: 140 },
    { key: 'amount', header: 'Amount', width: 170, align: 'end', format: (v: number) => kz(v) },
    {
      key: 'iva',
      header: 'IVA (14%)',
      width: 160,
      align: 'end',
      hidden: true,
      value: (f) => f.amount * 0.14,
      format: (v: number) => kz(v),
    },
  ];

  protected exportCsv(rows: readonly Invoice[]): void {
    const csv = [
      'Number;Customer;Status;Amount',
      ...rows.map((f) => [f.number, f.customer, f.status, f.amount.toFixed(2)].join(';')),
    ].join('\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    Object.assign(document.createElement('a'), { href: url, download: 'invoices.csv' }).click();
    URL.revokeObjectURL(url);
  }

  // ---- server simulated ----
  private readonly allServer = makeInvoices(87);
  protected readonly serverColumns: MxGridColumn<Invoice>[] = [
    { key: 'number', header: 'Number', width: 150 },
    { key: 'customer', header: 'Customer', width: 200, filter: 'text' },
    {
      key: 'status',
      header: 'Status',
      width: 130,
      filter: 'select',
      filterOptions: ['Paid', 'Pending', 'Overdue'],
    },
    { key: 'amount', header: 'Amount', width: 170, align: 'end', format: (v: number) => kz(v) },
  ];
  protected readonly serverSort = signal<MxGridSort>({ key: null, direction: 'asc' });
  protected readonly serverFilters = signal<Record<string, string>>({});
  protected readonly currentPage = signal(1);
  protected readonly serverPage = signal<Invoice[]>([]);
  protected readonly serverTotal = signal(0);
  protected readonly isLoading = signal(false);

  constructor() {
    // each change of sort, filter or page "asks" the server
    effect((onCleanup) => {
      const request = {
        sortState: this.serverSort(),
        filters: this.serverFilters(),
        page: this.currentPage(),
      };
      this.isLoading.set(true);
      const t = setTimeout(() => {
        const r = this.respond(request.sortState, request.filters, request.page);
        this.serverPage.set(r.rows);
        this.serverTotal.set(r.total);
        this.isLoading.set(false);
      }, 350);
      onCleanup(() => clearTimeout(t));
    });
  }

  /** What the server would do: filter, sort and return a page. */
  private respond(
    sortState: MxGridSort,
    filters: Record<string, string>,
    page: number,
  ): { rows: Invoice[]; total: number } {
    let l = this.allServer.filter(
      (f) =>
        (!filters['customer'] ||
          f.customer.toLowerCase().includes(filters['customer'].toLowerCase())) &&
        (!filters['status'] || f.status === filters['status']),
    );
    if (sortState.key) {
      const k = sortState.key as keyof Invoice;
      l = [...l].sort(
        (a, b) => (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0) * (sortState.direction === 'asc' ? 1 : -1),
      );
    }
    return { rows: l.slice((page - 1) * 10, page * 10), total: l.length };
  }

  protected readonly previewCode = `<mx-data-grid [data]="invoices" [columns]="columns" rowKey="number"
  selection="multiple" [(selected)]="chosen" height="420px" aria-label="Invoices">
  <ng-template mxGridCell="status" let-row>
    <span mxBadge [variant]="color(row.status)">{{ row.status }}</span>
  </ng-template>
</mx-data-grid>

columns: MxGridColumn<Invoice>[] = [
  { key: 'number', header: 'Number', filter: 'text', pinned: 'start' },
  { key: 'customer', header: 'Customer', filter: 'text' },
  { key: 'status', header: 'Status', filter: 'select' },
  { key: 'amount', header: 'Amount', align: 'end', filter: 'number', format: kz },
];`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'data, columns',
      type: 'T[], MxGridColumn<T>[]',
      description: 'The rows and columns.',
    },
    { kind: 'Input', name: 'rowKey', type: 'string | (row) => unknown', default: 'id' },
    { kind: 'Input', name: 'selection', type: "'none' | 'single' | 'multiple'", default: 'none' },
    {
      kind: 'Input',
      name: 'selected',
      type: 'unknown[] (model)',
      description: 'Keys of the selected rows.',
    },
    { kind: 'Input', name: 'sort, filters', type: 'MxGridSort, Record<string, string> (model)' },
    {
      kind: 'Input',
      name: 'query',
      type: 'string',
      description: 'Searches all visible columns.',
    },
    {
      kind: 'Input',
      name: 'manual, totalRows',
      type: 'boolean, number',
      description: 'Server data.',
    },
    {
      kind: 'Input',
      name: 'height, maxHeight',
      type: 'string',
      description: 'Required for virtual scroll.',
    },
    {
      kind: 'Input',
      name: 'virtual',
      type: "boolean | 'auto'",
      default: 'auto',
      description: 'auto: from 100 rows.',
    },
    { kind: 'Input', name: 'rowHeight', type: 'number', default: '40' },
    { kind: 'Input', name: 'density', type: "'comfortable' | 'compact'", default: 'comfortable' },
    { kind: 'Input', name: 'loading, columnMenu, labelKey', type: 'boolean, boolean, string' },
    {
      kind: 'Output',
      name: 'rowActivate',
      type: 'T',
      description: 'Enter or double-click on a row.',
    },
    {
      kind: 'Propriedade',
      name: 'rows()',
      type: 'T[]',
      description: 'Filtered and sorted rows (to export).',
    },
    {
      kind: 'Directiva',
      name: 'ng-template[mxGridCell]',
      type: 'let-row, let-value',
      description: 'Custom content for a column.',
    },
    {
      kind: 'Directiva',
      name: '[mxGridToolbar], [mxGridFooter]',
      type: 'projection',
      description: 'Toolbar above and footer.',
    },
    {
      kind: 'Input',
      name: 'MxGridColumn',
      type: 'key, header, value, format, width, minWidth, sortable, filter, filterOptions, align, pinned, resizable, hidden, hideable',
    },
  ];
}
