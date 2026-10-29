import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxBadge, MxBadgeVariant } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxInput, mxNormalize } from '@muxima-ui/core/form-field';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxPagination } from '@muxima-ui/core/pagination';
import { MxOption, MxSelect } from '@muxima-ui/core/select';
import { MxSeparator } from '@muxima-ui/core/separator';
import { MxSkeleton } from '@muxima-ui/core/skeleton';
import { MX_TABLE, MxSortState, mxSortData } from '@muxima-ui/core/table';
import { MxToast } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';
import { Icon } from '../../../ui/icon';

interface Invoice {
  number: string;
  customer: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  amount: number;
}

const CUSTOMERS = ['Kianda Logistics', 'Banco Mutamba', 'Huíla Agro', 'Energia do Cuanza', 'Atlântico Seguros', 'Lobito Portos', 'Namibe Pescas', 'Uíge Café'];
const STATUSES: Invoice['status'][] = ['Paid', 'Pending', 'Overdue', 'Paid', 'Paid', 'Pending'];
const MANY: (Invoice & { date: string })[] = Array.from({ length: 23 }, (_, i) => ({
  number: `FT 2026/${String(120 + i).padStart(4, '0')}`,
  customer: CUSTOMERS[(i * 3) % CUSTOMERS.length],
  status: STATUSES[i % STATUSES.length],
  amount: 150000 + ((i * 7919) % 50) * 98500,
  date: `10/${String((i % 28) + 1).padStart(2, '0')}/2026`,
}));

const INVOICES: Invoice[] = [
  { number: 'FT 2026/0142', customer: 'Kianda Logistics', status: 'Paid', amount: 1250000 },
  { number: 'FT 2026/0143', customer: 'Banco Mutamba', status: 'Pending', amount: 4870500 },
  { number: 'FT 2026/0144', customer: 'Huíla Agro', status: 'Overdue', amount: 312000 },
  { number: 'FT 2026/0145', customer: 'Energia do Cuanza', status: 'Paid', amount: 9200000 },
  { number: 'FT 2026/0146', customer: 'Atlântico Seguros', status: 'Pending', amount: 675250 },
];

@Component({
  selector: 'doc-table-page',
  imports: [DOC_UI, MX_TABLE, MxBadge, MxButton, MxCheckbox, MxInput, MxSelect, MxOption, MxPagination, MX_MENU, MxSeparator, MxSkeleton, MxAvatar, Icon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Table' }]"
        title="Table"
        lead="Tabular date on the native table, with aligned numbers, accessible sorting and two densities."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Table example" align="start">
          <div class="mx-table-container w-full">
            <table mxTable [(sort)]="sort">
              <caption>Invoices issued in October 2026 (sample date).</caption>
              <thead>
                <tr>
                  <th mxSortHeader="number" scope="col">Invoice</th>
                  <th mxSortHeader="customer" scope="col">Customer</th>
                  <th mxSortHeader="status" scope="col">Status</th>
                  <th mxSortHeader="amount" scope="col" data-align="end">Amount (Kz)</th>
                </tr>
              </thead>
              <tbody>
                @for (f of rows(); track f.number) {
                  <tr>
                    <td>{{ f.number }}</td>
                    <td>{{ f.customer }}</td>
                    <td><span mxBadge [variant]="badge(f.status)">{{ f.status }}</span></td>
                    <td data-align="end">{{ fmt(f.amount) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_TABLE, mxSortData } from '@muxima-ui/core/table';" />
        <doc-callout
          >Table is plain styled HTML: you write the rows and cells. It's right when the
          user only reads the date. If they need to work with it (filter, select, adjust
          columns, go through thousands of rows), use the
          <a routerLink="/components/data-grid">Data grid</a>.</doc-callout
        >
      </section>

      <section>
        <h2>Structure</h2>
        <p>A header on a subtle background, 44 px rows and tabular numbers aligned right.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Sortable header',
            topRight: 'aria-sort',
            bottomLeft: '44 px rows',
            bottomRight: 'Numbers on the right',
            bottom: 'Container with a 1 px border and 10 px radius'
          }"
        >
          <div class="mini-table" aria-hidden="true"><span></span><span></span><span></span></div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>The table's states live in the rows and header. Use the mx-table-empty cell when there's no date.</p>
        <doc-states>
          <doc-state name="Default"><div class="mx-table-container"><table mxTable density="compact"><thead><tr><th scope="col">Customer</th></tr></thead><tbody><tr><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="Hover" note="Soft row background."><div class="mx-table-container"><table mxTable density="compact"><thead><tr><th scope="col">Customer</th></tr></thead><tbody><tr data-mx-state="hover"><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="Selected" note="aria-selected=&quot;true&quot;"><div class="mx-table-container"><table mxTable density="compact"><thead><tr><th scope="col">Customer</th></tr></thead><tbody><tr aria-selected="true"><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="Sorted" note="aria-sort and a Kwanza icon."><div class="mx-table-container"><table mxTable density="compact"><thead><tr> <th scope="col" aria-sort="ascending"><span class="mx-sort-button">Customer <svg class="mx-sort-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 12V4M5 7l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span></th></tr></thead><tbody><tr><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="Loading" note="aria-busy=&quot;true&quot; on the table."><div class="mx-table-container"><table mxTable density="compact" aria-busy="true"><thead><tr><th scope="col">Customer</th></tr></thead><tbody><tr><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="Empty" note="mx-table-empty cell."><div class="mx-table-container"><table mxTable density="compact"><thead><tr><th scope="col">Customer</th></tr></thead><tbody><tr><td class="mx-table-empty">No results</td></tr></tbody></table></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Pagination</h2>
        <p>The table doesn't paginate by itself: slice the rows with <code>slice</code> and add the Pagination component in the footer. Pick the variant by the space and the kind of navigation.</p>
        <div class="stack-lg">
          <doc-example title="Numbered, with range" note="variant default + showRange. The usual choice for business lists.">
            <div class="mx-table-container w-full">
              <table mxTable density="compact">
                  <thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col">Status</th><th scope="col" data-align="end">Amount (Kz)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p1(), 5); track f.number) {
                      <tr><td>{{ f.number }}</td><td>{{ f.customer }}</td><td><span mxBadge [variant]="badge(f.status)">{{ f.status }}</span></td><td data-align="end">{{ fmt(f.amount) }}</td></tr>
                    }
                  </tbody>
                </table>
              <div class="mx-table-footer">
                <mx-pagination [(page)]="p1" [total]="list.length" [pageSize]="5" showRange aria-label="Pages, numbered" />
              </div>
            </div>
          </doc-example>

          <doc-example title="Rows per page" note="pageSizeOptions lets you choose how many rows to see; when it changes, the first visible item stays.">
            <div class="mx-table-container w-full">
              <table mxTable density="compact">
                  <thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col">Status</th><th scope="col" data-align="end">Amount (Kz)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p2(), size2()); track f.number) {
                      <tr><td>{{ f.number }}</td><td>{{ f.customer }}</td><td><span mxBadge [variant]="badge(f.status)">{{ f.status }}</span></td><td data-align="end">{{ fmt(f.amount) }}</td></tr>
                    }
                  </tbody>
                </table>
              <div class="mx-table-footer">
                <mx-pagination [(page)]="p2" [(pageSize)]="size2" [pageSizeOptions]="[5, 10, 20]" showRange [total]="list.length" aria-label="Pages, with rows per page" />
              </div>
            </div>
          </doc-example>

          <div class="grid-2">
            <doc-example title="Simple" note="variant simple: Previous, Page X of Y, Next. Good for phones.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col">Status</th><th scope="col" data-align="end">Amount (Kz)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p3(), 4); track f.number) {
                      <tr><td>{{ f.number }}</td><td>{{ f.customer }}</td><td><span mxBadge [variant]="badge(f.status)">{{ f.status }}</span></td><td data-align="end">{{ fmt(f.amount) }}</td></tr>
                    }
                  </tbody>
                </table>
                <div class="mx-table-footer footer-center">
                  <mx-pagination variant="simple" [(page)]="p3" [total]="list.length" [pageSize]="4" aria-label="Pages, simple" />
                </div>
              </div>
            </doc-example>

            <doc-example title="Compact, in the toolbar" note="variant compact: icons only, next to the search or the title.">
              <div class="mx-table-container w-full">
                <div class="mx-table-toolbar">
                  <strong>Invoices</strong>
                  <span class="grow"></span>
                  <mx-pagination variant="compact" [(page)]="p4" [total]="list.length" [pageSize]="4" aria-label="Pages, compact" />
                </div>
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col">Status</th><th scope="col" data-align="end">Amount (Kz)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p4(), 4); track f.number) {
                      <tr><td>{{ f.number }}</td><td>{{ f.customer }}</td><td><span mxBadge [variant]="badge(f.status)">{{ f.status }}</span></td><td data-align="end">{{ fmt(f.amount) }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Show more" note="No pages: adds rows at the end. Focus stays on the button and the count is announced.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col">Status</th><th scope="col" data-align="end">Amount (Kz)</th></tr></thead>
                  <tbody>
                    @for (f of list.slice(0, shown()); track f.number) {
                      <tr><td>{{ f.number }}</td><td>{{ f.customer }}</td><td><span mxBadge [variant]="badge(f.status)">{{ f.status }}</span></td><td data-align="end">{{ fmt(f.amount) }}</td></tr>
                    }
                  </tbody>
                </table>
                <div class="mx-table-footer">
                  <span aria-live="polite">{{ shown() }} of {{ list.length }} invoices</span>
                  @if (shown() < list.length) {
                    <button mxButton type="button" size="sm" variant="outline" (click)="showMore()">Show more {{ nextBatch() }}</button>
                  }
                </div>
              </div>
            </doc-example>

            <doc-example title="Sticky header with pagination" note="stickyHeader + 10 rows per page: the header stays visible within the page.">
              <div class="mx-table-container w-full" style="max-height: 260px" tabindex="0" role="region" aria-label="Invoices with a sticky header">
                <table mxTable density="compact" stickyHeader>
                  <thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col" data-align="end">Amount (Kz)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p6(), 10); track f.number) {
                      <tr><td>{{ f.number }}</td><td>{{ f.customer }}</td><td data-align="end">{{ fmt(f.amount) }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
              <div class="footer-plain">
                <mx-pagination [(page)]="p6" [total]="list.length" [pageSize]="10" showRange aria-label="Pages, sticky header" />
              </div>
            </doc-example>
          </div>
        </div>
      </section>

      <section>
        <h2>Examples</h2>
        <p>Real cases from business apps. They all use the native table with mxTable and other Muxima components.</p>
        <div class="stack-lg">
          <doc-example title="Row selection and bulk actions" note="The header checkbox goes indeterminate when only part is selected; the toolbar shows the bulk actions.">
            <div class="mx-table-container w-full">
              @if (selectedCount() > 0) {
                <div class="mx-table-toolbar" data-selection>
                  <strong>{{ selectedCount() }} {{ selectedCount() === 1 ? 'selectedRow' : 'selectedRows' }}</strong>
                  <span class="grow"></span>
                  <button mxButton type="button" size="sm" variant="outline" (click)="toast.success(selectedCount() + ' invoices exported')">Export</button>
                  <button mxButton type="button" size="sm" variant="destructive" (click)="removeSelected()">Delete</button>
                </div>
              } @else {
                <div class="mx-table-toolbar"><span class="muted">Select invoices to act in bulk.</span></div>
              }
              <table mxTable>
                <caption class="mx-visually-hidden">Invoices, with selection</caption>
                <thead>
                  <tr>
                    <th scope="col" class="mx-table-check">
                      <input type="checkbox" mxCheckbox aria-label="Select all" [checked]="allSelected()" [indeterminate]="someSelected()" (change)="toggleAll()" />
                    </th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Status</th>
                    <th scope="col" data-align="end">Amount (Kz)</th>
                  </tr>
                </thead>
                <tbody>
                  @for (f of selectable(); track f.number) {
                    <tr [attr.aria-selected]="selected().has(f.number)">
                      <td class="mx-table-check">
                        <input type="checkbox" mxCheckbox [attr.aria-label]="'Select ' + f.number" [checked]="selected().has(f.number)" (change)="toggle(f.number)" />
                      </td>
                      <td>{{ f.number }}</td>
                      <td>{{ f.customer }}</td>
                      <td><span mxBadge [variant]="badge(f.status)">{{ f.status }}</span></td>
                      <td data-align="end">{{ fmt(f.amount) }}</td>
                    </tr>
                  } @empty {
                    <tr><td class="mx-table-empty" colspan="5">No invoices. <button mxButton type="button" variant="link" size="sm" (click)="restore()">Reset example</button></td></tr>
                  }
                </tbody>
              </table>
            </div>
          </doc-example>

          <doc-example title="Search, filter and pagination" note="The search ignores accents. With no results, the table shows the empty state with a way out.">
            <div class="mx-table-container w-full">
              <div class="mx-table-toolbar">
                <input mxInput size="sm" type="search" class="w-240" placeholder="Search customer or invoice" aria-label="Search invoices" [value]="query()" (input)="onQuery($event)" />
                <mx-select size="sm" class="w-180" aria-label="Filter by status" [value]="status()" (valueChange)="onStatus($event)">
                  <mx-option value="">All statuses</mx-option>
                  <mx-option value="Paid">Paid</mx-option>
                  <mx-option value="Pending">Pending</mx-option>
                  <mx-option value="Overdue">Overdue</mx-option>
                </mx-select>
              </div>
              <table mxTable [(sort)]="sort2">
                <caption class="mx-visually-hidden">Filtered invoices</caption>
                <thead>
                  <tr>
                    <th mxSortHeader="number" scope="col">Invoice</th>
                    <th mxSortHeader="customer" scope="col">Customer</th>
                    <th mxSortHeader="date" scope="col">Issued</th>
                    <th scope="col">Status</th>
                    <th mxSortHeader="amount" scope="col" data-align="end">Amount (Kz)</th>
                  </tr>
                </thead>
                <tbody>
                  @for (f of pageRows(); track f.number) {
                    <tr>
                      <td>{{ f.number }}</td>
                      <td>{{ f.customer }}</td>
                      <td>{{ f.date }}</td>
                      <td><span mxBadge [variant]="badge(f.status)">{{ f.status }}</span></td>
                      <td data-align="end">{{ fmt(f.amount) }}</td>
                    </tr>
                  } @empty {
                    <tr>
                      <td class="mx-table-empty" colspan="5">
                        No invoice matches "{{ query() }}".
                        <button mxButton type="button" variant="link" size="sm" (click)="resetFilters()">Clear filters</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
              <div class="mx-table-footer">
                <span aria-live="polite">{{ filtered().length }} invoices</span>
                @if (filtered().length > pageSize) {
                  <mx-pagination [(page)]="page" [total]="filtered().length" [pageSize]="pageSize" aria-label="Invoice pages" />
                }
              </div>
            </div>
          </doc-example>

          <div class="grid-2">
            <doc-example title="Row actions" note="One menu per row; the button says which row it belongs to.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">User</th><th scope="col">Role</th><th scope="col" class="mx-table-actions"><span class="mx-visually-hidden">Actions</span></th></tr></thead>
                  <tbody>
                    @for (u of users; track u.name) {
                      <tr>
                        <td>
                          <div class="person person-sm"><mx-avatar [name]="u.name" size="sm" decorative /><span>{{ u.name }}</span></div>
                        </td>
                        <td><span mxBadge variant="secondary">{{ u.funcao }}</span></td>
                        <td class="mx-table-actions">
                          <button mxButton type="button" variant="ghost" size="sm" icon [attr.aria-label]="'Actions for ' + u.name" [mxMenuTriggerFor]="rowMenu" [mxMenuTriggerData]="{ $implicit: u.name }">
                            <doc-icon name="menu" />
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
              <ng-template #rowMenu let-name>
                <div mxMenu>
                  <button mxMenuItem (mxMenuItemTriggered)="toast.show('Edit ' + name)">Edit</button>
                  <button mxMenuItem (mxMenuItemTriggered)="toast.show('Invitation resent to ' + name)">Resend invitation</button>
                  <hr mxSeparator />
                  <button mxMenuItem variant="destructive" (mxMenuItemTriggered)="toast.error(name + ' removed from the team')">Remove</button>
                </div>
              </ng-template>
            </doc-example>

            <doc-example title="Totals" note="tfoot for the sum; tabular numbers aligned right.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Province</th><th scope="col" data-align="end">Customers</th><th scope="col" data-align="end">Revenue (Kz)</th></tr></thead>
                  <tbody>
                    @for (r of provinces; track r.name) {
                      <tr><td>{{ r.name }}</td><td data-align="end">{{ r.customers }}</td><td data-align="end">{{ fmt(r.revenue) }}</td></tr>
                    }
                  </tbody>
                  <tfoot>
                    <tr><th scope="row">Total</th><td data-align="end">{{ totalCustomers }}</td><td data-align="end">{{ fmt(totalRevenue) }}</td></tr>
                  </tfoot>
                </table>
              </div>
            </doc-example>

            <doc-example title="Loading" note="aria-busy on the table and Skeleton rows shaped like the columns.">
              <div class="stack w-full">
                <div><button mxButton type="button" variant="outline" size="sm" (click)="reload()" [loading]="loading()">Reload</button></div>
                <div class="mx-table-container">
                  <table mxTable density="compact" [attr.aria-busy]="loading() || null">
                    <thead><tr><th scope="col">Customer</th><th scope="col" data-align="end">Balance (Kz)</th></tr></thead>
                    <tbody>
                      @if (loading()) {
                        @for (i of [1, 2, 3]; track i) {
                          <tr><td><div mxSkeleton shape="text" class="w-60"></div></td><td data-align="end"><div mxSkeleton shape="text" class="w-60 ml-auto"></div></td></tr>
                        }
                      } @else {
                        <tr><td>Kianda Logistics</td><td data-align="end">{{ fmt(250000) }}</td></tr>
                        <tr><td>Banco Mutamba</td><td data-align="end">{{ fmt(1870500) }}</td></tr>
                        <tr><td>Huíla Agro</td><td data-align="end">{{ fmt(0) }}</td></tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </doc-example>

            <doc-example title="Sticky header" note="stickyHeader and a max height on the container: the header stays visible while scrolling.">
              <div class="mx-table-container w-full" style="max-height: 236px" tabindex="0" role="region" aria-label="Transactions, with scroll">
                <table mxTable density="compact" stickyHeader>
                  <thead><tr><th scope="col">Date</th><th scope="col">Transaction</th><th scope="col" data-align="end">Amount (Kz)</th></tr></thead>
                  <tbody>
                    @for (m of transactions; track m.id) {
                      <tr><td>{{ m.date }}</td><td>{{ m.desc }}</td><td data-align="end">{{ fmt(m.amount) }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Striped variant" note="Alternating rows, for wide tables.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact" variant="striped">
                  <thead><tr><th scope="col">Product</th><th scope="col" data-align="end">Stock</th></tr></thead>
                  <tbody>
                    @for (p of products; track p.name) {
                      <tr><td>{{ p.name }}</td><td data-align="end">{{ p.stock }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Bordered variant" note="Lines between columns, for grids of numbers.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact" variant="bordered">
                  <thead><tr><th scope="col">Quarter</th><th scope="col" data-align="end">2025</th><th scope="col" data-align="end">2026</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">T1</th><td data-align="end">12,4 M</td><td data-align="end">15,1 M</td></tr>
                    <tr><th scope="row">T2</th><td data-align="end">13,0 M</td><td data-align="end">16,8 M</td></tr>
                    <tr><th scope="row">T3</th><td data-align="end">14,2 M</td><td data-align="end">18,4 M</td></tr>
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Compact density" note="36 px per row, for screens with lots of date.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Province</th><th scope="col" data-align="end">Customers</th></tr></thead>
                  <tbody>
                    <tr><td>Luanda</td><td data-align="end">1 284</td></tr>
                    <tr><td>Benguela</td><td data-align="end">312</td></tr>
                    <tr><td>Huíla</td><td data-align="end">198</td></tr>
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Many columns" note="The container scrolls horizontally on narrow screens; the table doesn't distort.">
              <div class="mx-table-container w-full" tabindex="0" role="region" aria-label="Contacts, with horizontal scroll">
                <table mxTable density="compact" class="min-w-640 nowrap">
                  <thead><tr><th scope="col">Name</th><th scope="col">Company</th><th scope="col">Email</th><th scope="col">Phone</th><th scope="col">Province</th></tr></thead>
                  <tbody>
                    <tr><td>Ana Kiala</td><td>Kianda Logistics</td><td>ana&#64;kianda.co.ao</td><td>+244 923 000 111</td><td>Luanda</td></tr>
                    <tr><td>Pedro Neto</td><td>Huíla Agro</td><td>pedro&#64;huila-agro.ao</td><td>+244 924 000 222</td><td>Huíla</td></tr>
                  </tbody>
                </table>
              </div>
            </doc-example>
          </div>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Moves through the sort buttons in the header.' },
            { key: 'Enter Space', action: 'Cycle: ascending, descending, unsorted.' }
          ]"
          [aria]="[
            'It is an HTML table: rows, columns and headers are announced with no setup.',
            'Use scope=&quot;col&quot; on the headers and a caption to describe the table.',
            'aria-sort indicates the sorted column and the direction.',
            'Text sorting follows the locale (accents included).'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Data grid' }, { name: 'Pagination' }, { name: 'Select', path: '/components/select' }]" />
      </section>
    </article>
  `,
})
export class TablePage {
  protected readonly toast = inject(MxToast);

  protected badge(status: Invoice['status']): MxBadgeVariant {
    return status === 'Paid' ? 'success' : status === 'Pending' ? 'warning' : 'danger';
  }

  // Selection
  protected readonly selectable = signal<Invoice[]>([...INVOICES]);
  protected readonly selected = signal(new Set<string>(['FT 2026/0143']));
  protected readonly selectedCount = computed(() => this.selected().size);
  protected readonly allSelected = computed(() => this.selectable().length > 0 && this.selected().size === this.selectable().length);
  protected readonly someSelected = computed(() => this.selected().size > 0 && !this.allSelected());
  protected toggle(number: string): void {
    const next = new Set(this.selected());
    if (next.has(number)) next.delete(number);
    else next.add(number);
    this.selected.set(next);
  }
  protected toggleAll(): void {
    this.selected.set(this.allSelected() ? new Set() : new Set(this.selectable().map((f) => f.number)));
  }
  protected removeSelected(): void {
    const n = this.selected().size;
    this.selectable.update((rows) => rows.filter((r) => !this.selected().has(r.number)));
    this.selected.set(new Set());
    this.toast.error(`${n} ${n === 1 ? 'invoice deleted' : 'invoices deleted'}`, { action: { label: 'Undo', run: () => this.restore() } });
  }
  protected restore(): void {
    this.selectable.set([...INVOICES]);
  }

  // Search, filter and pagination
  protected readonly pageSize = 6;
  protected readonly query = signal('');
  protected readonly status = signal<string>('');
  protected readonly page = signal(1);
  protected readonly sort2 = signal<MxSortState>({ active: 'number', direction: 'desc' });
  protected readonly filtered = computed(() => {
    const q = mxNormalize(this.query().trim());
    const e = this.status();
    const rows = MANY.filter((f) => (!q || mxNormalize(`${f.customer} ${f.number}`).includes(q)) && (!e || f.status === e));
    return mxSortData(rows, this.sort2(), (row, key) => (key === 'date' ? (([m, d, y]) => y + m + d)(row.date.split('/')) : (row as unknown as Record<string, unknown>)[key]));
  });
  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });
  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.page.set(1);
  }
  protected onStatus(value: unknown): void {
    this.status.set((value as string) ?? '');
    this.page.set(1);
  }
  protected resetFilters(): void {
    this.query.set('');
    this.status.set('');
    this.page.set(1);
  }

  // Pagination variants
  protected readonly list = MANY;
  protected readonly p1 = signal(1);
  protected readonly p2 = signal(1);
  protected readonly size2 = signal(5);
  protected readonly p3 = signal(1);
  protected readonly p4 = signal(1);
  protected readonly p6 = signal(1);
  protected readonly shown = signal(5);
  protected readonly nextBatch = computed(() => Math.min(5, MANY.length - this.shown()));
  protected pageOf(page: number, size: number) {
    return MANY.slice((page - 1) * size, page * size);
  }
  protected showMore(): void {
    this.shown.update((n) => Math.min(n + 5, MANY.length));
  }

  // Other examples
  protected readonly users = [
    { name: 'Ana Kiala', funcao: 'Administrator' },
    { name: 'João Mbala', funcao: 'Editor' },
    { name: 'Rita Sousa', funcao: 'Read-only' },
  ];
  protected readonly provinces = [
    { name: 'Luanda', customers: 1284, revenue: 48700000 },
    { name: 'Benguela', customers: 312, revenue: 9800000 },
    { name: 'Huíla', customers: 198, revenue: 6100000 },
  ];
  protected readonly totalCustomers = this.provinces.reduce((a, r) => a + r.customers, 0);
  protected readonly totalRevenue = this.provinces.reduce((a, r) => a + r.revenue, 0);
  protected readonly products = [
    { name: 'A4 paper (box)', stock: 120 },
    { name: 'Black toner', stock: 14 },
    { name: 'Office chair', stock: 8 },
    { name: '24" monitor', stock: 22 },
    { name: 'Keyboard', stock: 41 },
  ];
  protected readonly transactions = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    date: `10/${String(27 - i).padStart(2, '0')}/2026`,
    desc: ['Payment received', 'Transfer', 'Bank fee', 'Invoice settled'][i % 4],
    amount: [250000, -120000, -1500, 980000][i % 4],
  }));
  protected readonly loading = signal(false);
  protected reload(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1500);
  }
  protected readonly sort = signal<MxSortState>({ active: 'number', direction: 'asc' });
  protected readonly rows = computed(() => mxSortData(INVOICES, this.sort()));
  private readonly nf = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  protected fmt(v: number): string {
    return this.nf.format(v);
  }

  protected readonly previewCode = `<div class="mx-table-container">
  <table mxTable [(sort)]="sort">
    <thead>
      <tr>
        <th mxSortHeader="number" scope="col">Invoice</th>
        <th mxSortHeader="customer" scope="col">Customer</th>
        <th mxSortHeader="amount" scope="col" data-align="end">Amount (Kz)</th>
      </tr>
    </thead>
    <tbody>
      @for (f of rows(); track f.number) {
        <tr><td>{{ f.number }}</td><td>{{ f.customer }}</td><td data-align="end">{{ f.amount }}</td></tr>
      }
    </tbody>
  </table>
</div>

// in the component
sort = signal<MxSortState>({ active: 'number', direction: 'asc' });
rows = computed(() => mxSortData(invoices, this.sort()));`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: 'table[mxTable]', type: 'MxTable' },
    { kind: 'Input', name: 'sort', type: 'MxSortState', default: '{ active: null }', description: 'Accepts [(sort)].' },
    { kind: 'Input', name: 'density', type: "'comfortable' | 'compact'", default: 'comfortable', description: '44 or 36 px per row.' },
    { kind: 'Input', name: 'variant', type: "'default' | 'striped' | 'bordered'", default: 'default', description: 'Alternating rows or lines between columns.' },
    { kind: 'Input', name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Sticky header; give the container a max-height.' },
    { kind: 'Directiva', name: 'th[mxSortHeader]', type: 'string', description: 'Column key; adds the button and aria-sort.' },
    { kind: 'Token CSS', name: '.mx-table-toolbar, .mx-table-footer', type: 'classes', description: 'A search or bulk-actions bar, and a footer with count and pagination.' },
    { kind: 'Token CSS', name: '.mx-table-check, .mx-table-actions, .mx-table-empty', type: 'classes', description: 'Selection column, actions column and empty-state cell.' },
    { kind: 'Método', name: 'mxSortData(rows, sort, accessor?, locale?)', type: 'T[]', description: 'Sorts text (Portuguese collation by default; pass a locale) and numbers.' },
  ];
}
