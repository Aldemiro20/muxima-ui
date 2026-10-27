import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Injector,
  TemplateRef,
  ViewEncapsulation,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  contentChildren,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { mxNormalize, mxUniqueId } from '@muxima-ui/core/form-field';
import { MX_MENU } from '@muxima-ui/core/menu';

/** Coluna da grelha. */
export interface MxGridColumn<T = any> {
  key: string;
  header: string;
  /** Valor para ordenar e filtrar; por omissão row[key]. */
  value?: (row: T) => unknown;
  /** Texto mostrado; por omissão String(valor). */
  format?: (value: any, row: T) => string;
  /** Largura inicial em px. */
  width?: number;
  minWidth?: number;
  sortable?: boolean;
  /** Filtro no cabeçalho. `number` aceita 100, >100, <100 e 10-20. */
  filter?: 'text' | 'number' | 'select' | false;
  /** Opções do filtro `select`; por omissão, os valores que existem nos dados. */
  filterOptions?: string[];
  align?: 'start' | 'center' | 'end';
  /** Fixa a coluna à esquerda (`start`) ou à direita (`end`) durante o scroll horizontal. */
  pinned?: 'start' | 'end';
  resizable?: boolean;
  hidden?: boolean;
  /** false: não aparece no menu de colunas. */
  hideable?: boolean;
}

export interface MxGridSort {
  key: string | null;
  direction: 'asc' | 'desc';
}

/**
 * Modelo de uma célula: `<ng-template mxGridCell="estado" let-row let-value="value">`.
 */
@Directive({ selector: 'ng-template[mxGridCell]' })
export class MxGridCell {
  readonly key = input.required<string>({ alias: 'mxGridCell' });
  readonly template = inject(TemplateRef);
}

/** Conteúdo da barra por cima da grelha (pesquisa, botões). */
@Directive({ selector: '[mxGridToolbar]', host: { class: 'mx-grid-toolbar-slot' } })
export class MxGridToolbar {}

const HEADER_ROWS_BASE = 1;

/** Aplica o filtro de uma coluna numérica: 100, >100, >=100, <100, <=100, 10-20. */
function numberMatch(value: unknown, expr: string): boolean {
  const n =
    typeof value === 'number' ? value : Number(String(value).replace(/\s/g, '').replace(',', '.'));
  if (Number.isNaN(n)) return false;
  const e = expr.replace(/\s/g, '').replace(',', '.');
  let m: RegExpMatchArray | null;
  if ((m = e.match(/^(-?[\d.]+)-(-?[\d.]+)$/))) return n >= Number(m[1]) && n <= Number(m[2]);
  if ((m = e.match(/^(>=|<=|>|<|=)?(-?[\d.]+)$/))) {
    const v = Number(m[2]);
    switch (m[1]) {
      case '>':
        return n > v;
      case '>=':
        return n >= v;
      case '<':
        return n < v;
      case '<=':
        return n <= v;
      default:
        return n === v;
    }
  }
  return true;
}

/**
 * Grelha de dados (padrão WAI-ARIA Grid): ordenação, filtros por coluna, pesquisa,
 * selecção, colunas redimensionáveis, fixas e escondíveis, e scroll virtual para
 * milhares de linhas. Navega-se célula a célula com as setas.
 *
 * ```html
 * <mx-data-grid [data]="facturas" [columns]="colunas" rowKey="numero"
 *   selection="multiple" [(selected)]="escolhidas" height="480px" aria-label="Facturas">
 *   <ng-template mxGridCell="estado" let-row>
 *     <span mxBadge [variant]="cor(row.estado)">{{ row.estado }}</span>
 *   </ng-template>
 * </mx-data-grid>
 * ```
 *
 * Com `manual`, a grelha não ordena nem filtra: emite [(sort)] e [(filters)] para o
 * servidor e mostra `data` tal como chega (indica o total em `totalRows`).
 */
@Component({
  selector: 'mx-data-grid',
  exportAs: 'mxDataGrid',
  imports: [NgTemplateOutlet, MxCheckbox, MX_MENU],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-grid',
    '[attr.data-density]': 'density() === "comfortable" ? null : density()',
    '[attr.aria-label]': 'null',
  },
  template: `
    @if (showToolbar()) {
      <div class="mx-grid-toolbar">
        <ng-content select="[mxGridToolbar]" />
        @if (columnMenu()) {
          <button type="button" class="mx-grid-columns-button" [mxMenuTriggerFor]="colunas">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2.5 3.5h11v9h-11zM6.5 3.5v9M10 3.5v9"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linejoin="round"
              />
            </svg>
            {{ columnsText() }}
          </button>
          <ng-template #colunas>
            <div mxMenu>
              @for (c of hideableColumns(); track c.key) {
                <button
                  mxMenuItemCheckbox
                  type="button"
                  [checked]="!isHidden(c)"
                  (mxMenuItemTriggered)="toggleColumn(c.key)"
                >
                  {{ c.header }}
                </button>
              }
            </div>
          </ng-template>
        }
      </div>
    }

    <div
      class="mx-grid-scroller"
      #scroller
      [style.height]="height()"
      [style.max-height]="maxHeight()"
      (scroll)="onScroll()"
    >
      <table
        class="mx-grid-table"
        role="grid"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-rowcount]="rowCount()"
        [attr.aria-colcount]="colCount()"
        [attr.aria-multiselectable]="selection() === 'multiple' ? 'true' : null"
        [attr.aria-busy]="loading() ? 'true' : null"
        [style.width.px]="tableWidth()"
        (keydown)="onKeydown($event)"
        (focusin)="onFocusIn($event)"
      >
        <colgroup>
          @if (selection() !== 'none') {
            <col [style.width.px]="checkWidth" />
          }
          @for (c of visibleColumns(); track c.key) {
            <col [style.width.px]="widthOf(c)" />
          }
        </colgroup>
        <thead>
          <tr aria-rowindex="1" class="mx-grid-header-row">
            @if (selection() !== 'none') {
              <th
                class="mx-grid-check mx-grid-pinned-start"
                scope="col"
                aria-colindex="1"
                [style.left.px]="0"
                [attr.data-cell]="'0:0'"
              >
                @if (selection() === 'multiple') {
                  <input
                    type="checkbox"
                    mxCheckbox
                    [checked]="allSelected()"
                    [indeterminate]="someSelected()"
                    [attr.aria-label]="selectAllText()"
                    (change)="toggleAll()"
                    tabindex="-1"
                  />
                } @else {
                  <span class="mx-visually-hidden">{{ selectText() }}</span>
                }
              </th>
            }
            @for (c of visibleColumns(); track c.key; let i = $index) {
              <th
                scope="col"
                [attr.aria-colindex]="i + 1 + offset()"
                [attr.aria-sort]="ariaSort(c)"
                [attr.aria-describedby]="c.resizable !== false ? resizeHintId : null"
                [attr.data-align]="c.align ?? null"
                [attr.data-cell]="'0:' + (i + offset())"
                [class.mx-grid-pinned-start]="c.pinned === 'start'"
                [class.mx-grid-pinned-end]="c.pinned === 'end'"
                [style.left.px]="c.pinned === 'start' ? pinOffset(c) : null"
                [style.right.px]="c.pinned === 'end' ? pinOffsetEnd(c) : null"
              >
                @if (c.sortable !== false) {
                  <button type="button" class="mx-grid-sort" tabindex="-1" (click)="toggleSort(c)">
                    {{ c.header }}
                    <svg class="mx-sort-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      @switch (ariaSort(c)) {
                        @case ('ascending') {
                          <path
                            d="M8 12V4M4.5 7.5L8 4l3.5 3.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        }
                        @case ('descending') {
                          <path
                            d="M8 4v8M4.5 8.5L8 12l3.5-3.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        }
                        @default {
                          <path
                            d="M5 6.5L8 3.5l3 3M5 9.5l3 3 3-3"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        }
                      }
                    </svg>
                  </button>
                } @else {
                  <span class="mx-grid-header-text">{{ c.header }}</span>
                }
                @if (c.resizable !== false) {
                  <span
                    class="mx-grid-resize"
                    aria-hidden="true"
                    (pointerdown)="startResize($event, c)"
                    (dblclick)="resetWidth(c)"
                  ></span>
                }
              </th>
            }
          </tr>
          @if (hasFilters()) {
            <tr aria-rowindex="2" class="mx-grid-filter-row">
              @if (selection() !== 'none') {
                <td
                  class="mx-grid-check mx-grid-pinned-start"
                  aria-colindex="1"
                  [style.left.px]="0"
                  [attr.data-cell]="'1:0'"
                ></td>
              }
              @for (c of visibleColumns(); track c.key; let i = $index) {
                <td
                  [attr.aria-colindex]="i + 1 + offset()"
                  [attr.data-cell]="'1:' + (i + offset())"
                  [class.mx-grid-pinned-start]="c.pinned === 'start'"
                  [class.mx-grid-pinned-end]="c.pinned === 'end'"
                  [style.left.px]="c.pinned === 'start' ? pinOffset(c) : null"
                  [style.right.px]="c.pinned === 'end' ? pinOffsetEnd(c) : null"
                >
                  @switch (c.filter) {
                    @case ('select') {
                      <select
                        class="mx-grid-filter"
                        tabindex="-1"
                        [attr.aria-label]="filterText() + ' ' + c.header"
                        [value]="filters()[c.key] || ''"
                        (change)="setFilter(c.key, $any($event.target).value)"
                      >
                        <option value="">{{ allText() }}</option>
                        @for (o of optionsOf(c); track o) {
                          <option [value]="o" [selected]="filters()[c.key] === o">{{ o }}</option>
                        }
                      </select>
                    }
                    @case ('text') {
                      <input
                        class="mx-grid-filter"
                        tabindex="-1"
                        type="search"
                        [attr.aria-label]="filterText() + ' ' + c.header"
                        [value]="filters()[c.key] || ''"
                        (input)="setFilter(c.key, $any($event.target).value)"
                      />
                    }
                    @case ('number') {
                      <input
                        class="mx-grid-filter"
                        tabindex="-1"
                        type="text"
                        inputmode="decimal"
                        placeholder=">, <, 10-20"
                        [attr.aria-label]="
                          filterText() +
                          ' ' +
                          c.header +
                          ', aceita maior que, menor que e intervalos'
                        "
                        [value]="filters()[c.key] || ''"
                        (input)="setFilter(c.key, $any($event.target).value)"
                      />
                    }
                  }
                </td>
              }
            </tr>
          }
        </thead>
        <tbody>
          @if (range().start > 0) {
            <tr class="mx-grid-spacer" aria-hidden="true">
              <td [attr.colspan]="colCount()" [style.height.px]="range().start * rowHeight()"></td>
            </tr>
          }
          @for (row of rendered(); track keyOf(row); let r = $index) {
            @let ri = range().start + r;
            <tr
              [attr.aria-rowindex]="ri + headerRows() + 1"
              [attr.aria-selected]="selection() === 'none' ? null : isSelected(row)"
              [style.height.px]="rowHeight()"
              (dblclick)="rowActivate.emit(row)"
            >
              @if (selection() !== 'none') {
                <td
                  class="mx-grid-check mx-grid-pinned-start"
                  aria-colindex="1"
                  [style.left.px]="0"
                  [attr.data-cell]="ri + headerRows() + ':0'"
                >
                  @if (selection() === 'multiple') {
                    <input
                      type="checkbox"
                      mxCheckbox
                      tabindex="-1"
                      [checked]="isSelected(row)"
                      [attr.aria-label]="selectRowText() + ' ' + rowLabel(row)"
                      (change)="toggleRow(row)"
                    />
                  } @else {
                    <input
                      type="radio"
                      class="mx-radio"
                      tabindex="-1"
                      [name]="radioName"
                      [checked]="isSelected(row)"
                      [attr.aria-label]="selectRowText() + ' ' + rowLabel(row)"
                      (change)="toggleRow(row)"
                    />
                  }
                </td>
              }
              @for (c of visibleColumns(); track c.key; let i = $index) {
                <td
                  [attr.aria-colindex]="i + 1 + offset()"
                  [attr.data-cell]="ri + headerRows() + ':' + (i + offset())"
                  [attr.data-align]="c.align ?? null"
                  [class.mx-grid-pinned-start]="c.pinned === 'start'"
                  [class.mx-grid-pinned-end]="c.pinned === 'end'"
                  [style.left.px]="c.pinned === 'start' ? pinOffset(c) : null"
                  [style.right.px]="c.pinned === 'end' ? pinOffsetEnd(c) : null"
                >
                  @if (cellTemplate(c.key); as tpl) {
                    <ng-container
                      *ngTemplateOutlet="
                        tpl;
                        context: { $implicit: row, value: valueOf(c, row), column: c }
                      "
                    />
                  } @else {
                    {{ text(c, row) }}
                  }
                </td>
              }
            </tr>
          } @empty {
            <tr>
              <td
                class="mx-grid-empty"
                [attr.colspan]="colCount()"
                [attr.data-cell]="headerRows() + ':0'"
              >
                {{ loading() ? loadingText() : emptyText() }}
              </td>
            </tr>
          }
          @if (range().end < rows().length) {
            <tr class="mx-grid-spacer" aria-hidden="true">
              <td
                [attr.colspan]="colCount()"
                [style.height.px]="(rows().length - range().end) * rowHeight()"
              ></td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    <div class="mx-grid-footer">
      <span class="mx-grid-status" aria-live="polite">{{ statusText() }}</span>
      <ng-content select="[mxGridFooter]" />
    </div>
    <span class="mx-visually-hidden" [id]="resizeHintId">{{ resizeHint() }}</span>
  `,
})
export class MxDataGrid<T = any> {
  readonly data = input<readonly T[]>([]);
  readonly columns = input<readonly MxGridColumn<T>[]>([]);
  /** Chave única de cada linha: nome do campo ou função. */
  readonly rowKey = input<string | ((row: T) => unknown)>('id');
  readonly selection = input<'none' | 'single' | 'multiple'>('none');
  /** Chaves das linhas seleccionadas. */
  readonly selected = model<readonly unknown[]>([]);
  readonly sort = model<MxGridSort>({ key: null, direction: 'asc' });
  /** Texto de cada filtro, por chave de coluna. */
  readonly filters = model<Record<string, string>>({});
  /** Pesquisa em todas as colunas visíveis. */
  readonly query = input('');
  /** Não ordena nem filtra: só emite sort e filters (dados do servidor). */
  readonly manual = input(false, { transform: booleanAttribute });
  /** Total de linhas no servidor (modo manual), para aria-rowcount e o estado. */
  readonly totalRows = input<number | null>(null);
  readonly height = input<string | null>(null);
  readonly maxHeight = input<string | null>(null);
  readonly rowHeight = input(40, { transform: numberAttribute });
  /** Scroll virtual: `auto` liga a partir de 100 linhas (precisa de height). */
  readonly virtual = input<boolean | 'auto'>('auto');
  readonly density = input<'comfortable' | 'compact'>('comfortable');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly columnMenu = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input('Tabela de dados', { alias: 'aria-label' });
  /** Coluna cujo texto identifica a linha nos nomes ("Seleccionar FT 2026/0201"). */
  readonly labelKey = input<string | null>(null);

  readonly emptyText = input('Sem resultados.');
  readonly loadingText = input('A carregar...');
  readonly columnsText = input('Colunas');
  readonly filterText = input('Filtrar');
  readonly allText = input('Todos');
  readonly selectAllText = input('Seleccionar todas as linhas');
  readonly selectRowText = input('Seleccionar');
  readonly selectText = input('Selecção');
  readonly resizeHint = input('Alt e setas esquerda e direita mudam a largura da coluna.');

  /** Enter ou duplo clique numa linha. */
  readonly rowActivate = output<T>();

  private readonly cells = contentChildren(MxGridCell);
  private readonly toolbarSlot = contentChildren(MxGridToolbar);
  private readonly scroller = viewChild.required<ElementRef<HTMLElement>>('scroller');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);
  private readonly announcer = inject(LiveAnnouncer);

  protected readonly checkWidth = 44;
  protected readonly resizeHintId = mxUniqueId('mx-grid-resize');
  protected readonly radioName = mxUniqueId('mx-grid-row');
  private readonly widths = signal<Record<string, number>>({});
  private readonly hiddenKeys = signal<Set<string> | null>(null);
  private readonly scrollTop = signal(0);
  private readonly viewport = signal(400);
  /** Célula activa: linha e coluna na grelha (0 = cabeçalho). */
  private readonly active = signal<[number, number]>([0, 0]);

  protected readonly showToolbar = computed(
    () => this.columnMenu() || this.toolbarSlot().length > 0,
  );
  protected readonly offset = computed(() => (this.selection() === 'none' ? 0 : 1));
  protected readonly hasFilters = computed(() => this.columns().some((c) => c.filter));
  protected readonly headerRows = computed(() => HEADER_ROWS_BASE + (this.hasFilters() ? 1 : 0));
  protected readonly hideableColumns = computed(() =>
    this.columns().filter((c) => c.hideable !== false),
  );

  protected readonly visibleColumns = computed(() => {
    const hidden = this.hiddenKeys();
    const cols = this.columns().filter((c) => !(hidden ? hidden.has(c.key) : c.hidden));
    return [
      ...cols.filter((c) => c.pinned === 'start'),
      ...cols.filter((c) => !c.pinned),
      ...cols.filter((c) => c.pinned === 'end'),
    ];
  });
  protected readonly colCount = computed(() => this.visibleColumns().length + this.offset());
  protected readonly tableWidth = computed(
    () =>
      this.visibleColumns().reduce((a, c) => a + this.widthOf(c), 0) +
      (this.offset() ? this.checkWidth : 0),
  );

  /** Linhas depois de filtros, pesquisa e ordenação. */
  readonly rows = computed<readonly T[]>(() => {
    const data = this.data();
    if (this.manual()) return data;
    const filters = Object.entries(this.filters()).filter(([, v]) => v?.trim());
    const cols = this.columns();
    const q = mxNormalize(this.query().trim());
    let out = data.filter((row) =>
      filters.every(([key, v]) => {
        const c = cols.find((x) => x.key === key);
        if (!c) return true;
        const value = this.valueOf(c, row);
        if (c.filter === 'number') return numberMatch(value, v);
        if (c.filter === 'select') return String(value ?? '') === v;
        return mxNormalize(this.text(c, row)).includes(mxNormalize(v.trim()));
      }),
    );
    if (q) {
      const vis = this.visibleColumns();
      out = out.filter((row) => vis.some((c) => mxNormalize(this.text(c, row)).includes(q)));
    }
    const s = this.sort();
    const sc = s.key ? cols.find((c) => c.key === s.key) : null;
    if (sc) {
      const collator = new Intl.Collator('pt', { numeric: true, sensitivity: 'base' });
      const dir = s.direction === 'asc' ? 1 : -1;
      out = [...out].sort((a, b) => {
        const x = this.valueOf(sc, a);
        const y = this.valueOf(sc, b);
        if (x == null && y == null) return 0;
        if (x == null) return 1;
        if (y == null) return -1;
        if (x instanceof Date && y instanceof Date) return (x.getTime() - y.getTime()) * dir;
        if (typeof x === 'number' && typeof y === 'number') return (x - y) * dir;
        return collator.compare(String(x), String(y)) * dir;
      });
    }
    return out;
  });

  protected readonly isVirtual = computed(() => {
    const v = this.virtual();
    return (v === 'auto' ? this.rows().length > 100 : v) && !!(this.height() || this.maxHeight());
  });
  protected readonly range = computed(() => {
    const n = this.rows().length;
    if (!this.isVirtual()) return { start: 0, end: n };
    const h = this.rowHeight();
    const buffer = 8;
    const start = Math.max(0, Math.floor(this.scrollTop() / h) - buffer);
    const end = Math.min(n, start + Math.ceil(this.viewport() / h) + buffer * 2);
    return { start, end };
  });
  protected readonly rendered = computed(() => {
    const { start, end } = this.range();
    return this.rows().slice(start, end);
  });
  protected readonly rowCount = computed(
    () => (this.totalRows() ?? this.rows().length) + this.headerRows(),
  );

  private readonly selectedSet = computed(() => new Set(this.selected()));
  protected readonly allSelected = computed(
    () => this.rows().length > 0 && this.rows().every((r) => this.selectedSet().has(this.keyOf(r))),
  );
  protected readonly someSelected = computed(
    () => !this.allSelected() && this.rows().some((r) => this.selectedSet().has(this.keyOf(r))),
  );

  protected readonly statusText = computed(() => {
    const fmt = new Intl.NumberFormat('pt-AO');
    const total = this.totalRows() ?? this.rows().length;
    const parts = [`${fmt.format(total)} ${total === 1 ? 'linha' : 'linhas'}`];
    if (!this.manual() && this.rows().length !== this.data().length)
      parts[0] += ` de ${fmt.format(this.data().length)}`;
    const sel = this.selected().length;
    if (this.selection() !== 'none' && sel)
      parts.push(`${fmt.format(sel)} ${sel === 1 ? 'seleccionada' : 'seleccionadas'}`);
    return parts.join(', ');
  });

  constructor() {
    // tabindex itinerante: só a célula activa (ou o controlo dentro dela) entra no Tab
    afterRenderEffect({
      write: () => {
        const [r, c] = this.active();
        this.rendered();
        this.visibleColumns();
        const table = this.host.querySelector<HTMLElement>('.mx-grid-table');
        if (!table) return;
        let activeEl = table.querySelector<HTMLElement>(`[data-cell="${r}:${c}"]`);
        if (!activeEl) activeEl = table.querySelector<HTMLElement>('[data-cell]');
        table.querySelectorAll<HTMLElement>('[data-cell]').forEach((cell) => {
          const isActive = cell === activeEl;
          const widget = this.widgetIn(cell);
          cell.tabIndex = isActive && !widget ? 0 : -1;
          cell
            .querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]')
            .forEach((w) => {
              if (w === cell) return;
              w.tabIndex = isActive && w === widget ? 0 : -1;
            });
        });
      },
    });
    afterNextRender(() => this.measure());
  }

  // ---- utilitários ----
  keyOf(row: T): unknown {
    const k = this.rowKey();
    return typeof k === 'function' ? k(row) : (row as Record<string, unknown>)[k];
  }
  valueOf(c: MxGridColumn<T>, row: T): unknown {
    return c.value ? c.value(row) : (row as Record<string, unknown>)[c.key];
  }
  protected text(c: MxGridColumn<T>, row: T): string {
    const v = this.valueOf(c, row);
    if (c.format) return c.format(v, row);
    if (v instanceof Date) return v.toLocaleDateString('pt-AO');
    if (typeof v === 'number') return v.toLocaleString('pt-AO');
    return v == null ? '' : String(v);
  }
  protected rowLabel(row: T): string {
    const key = this.labelKey() ?? this.visibleColumns()[0]?.key;
    const c = this.columns().find((x) => x.key === key);
    return c ? this.text(c, row) : String(this.keyOf(row));
  }
  protected cellTemplate(key: string): TemplateRef<unknown> | null {
    return this.cells().find((t) => t.key() === key)?.template ?? null;
  }
  protected widthOf(c: MxGridColumn<T>): number {
    return this.widths()[c.key] ?? c.width ?? 160;
  }
  protected pinOffset(c: MxGridColumn<T>): number {
    let left = this.offset() ? this.checkWidth : 0;
    for (const x of this.visibleColumns()) {
      if (x === c) break;
      if (x.pinned === 'start') left += this.widthOf(x);
    }
    return left;
  }
  protected pinOffsetEnd(c: MxGridColumn<T>): number {
    let right = 0;
    const cols = [...this.visibleColumns()].reverse();
    for (const x of cols) {
      if (x === c) break;
      if (x.pinned === 'end') right += this.widthOf(x);
    }
    return right;
  }
  protected optionsOf(c: MxGridColumn<T>): string[] {
    if (c.filterOptions) return c.filterOptions;
    return [...new Set(this.data().map((r) => String(this.valueOf(c, r) ?? '')))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'pt'));
  }
  protected isHidden(c: MxGridColumn<T>): boolean {
    const hidden = this.hiddenKeys();
    return hidden ? hidden.has(c.key) : !!c.hidden;
  }
  protected ariaSort(c: MxGridColumn<T>): string | null {
    if (c.sortable === false) return null;
    const s = this.sort();
    return s.key === c.key ? (s.direction === 'asc' ? 'ascending' : 'descending') : 'none';
  }
  isSelected(row: T): boolean {
    return this.selectedSet().has(this.keyOf(row));
  }

  // ---- acções ----
  toggleSort(c: MxGridColumn<T>): void {
    if (c.sortable === false) return;
    const s = this.sort();
    const next: MxGridSort =
      s.key !== c.key
        ? { key: c.key, direction: 'asc' }
        : s.direction === 'asc'
          ? { key: c.key, direction: 'desc' }
          : { key: null, direction: 'asc' };
    this.sort.set(next);
    this.announcer.announce(
      next.key
        ? `Ordenado por ${c.header}, ${next.direction === 'asc' ? 'ascendente' : 'descendente'}`
        : 'Sem ordenação',
    );
  }
  setFilter(key: string, value: string): void {
    this.filters.update((f) => ({ ...f, [key]: value }));
    this.scrollTo(0);
  }
  toggleColumn(key: string): void {
    const current = new Set(
      this.hiddenKeys() ??
        this.columns()
          .filter((c) => c.hidden)
          .map((c) => c.key),
    );
    if (current.has(key)) current.delete(key);
    else if (this.visibleColumns().length > 1) current.add(key);
    this.hiddenKeys.set(current);
  }
  toggleRow(row: T): void {
    const key = this.keyOf(row);
    if (this.selection() === 'single') {
      this.selected.set(this.isSelected(row) ? [] : [key]);
      return;
    }
    const set = new Set(this.selected());
    if (set.has(key)) set.delete(key);
    else set.add(key);
    this.selected.set([...set]);
  }
  toggleAll(): void {
    const keys = this.rows().map((r) => this.keyOf(r));
    if (this.allSelected()) {
      const drop = new Set(keys);
      this.selected.set(this.selected().filter((k) => !drop.has(k)));
    } else {
      this.selected.set([...new Set([...this.selected(), ...keys])]);
    }
  }
  setWidth(key: string, width: number): void {
    const c = this.columns().find((x) => x.key === key);
    const min = c?.minWidth ?? 64;
    this.widths.update((w) => ({ ...w, [key]: Math.max(min, Math.round(width)) }));
  }
  protected resetWidth(c: MxGridColumn<T>): void {
    this.widths.update((w) => {
      const { [c.key]: _, ...rest } = w;
      return rest;
    });
  }
  protected startResize(event: PointerEvent, c: MxGridColumn<T>): void {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const start = this.widthOf(c);
    const move = (e: PointerEvent) => this.setWidth(c.key, start + (e.clientX - startX));
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  // ---- scroll ----
  private measure(): void {
    const el = this.scroller().nativeElement;
    this.viewport.set(el.clientHeight || 400);
  }
  protected onScroll(): void {
    const el = this.scroller().nativeElement;
    this.scrollTop.set(el.scrollTop);
    if (el.clientHeight) this.viewport.set(el.clientHeight);
  }
  private scrollTo(top: number): void {
    const el = this.scroller().nativeElement;
    el.scrollTop = top;
    this.scrollTop.set(top);
  }

  // ---- teclado (padrão Grid) ----
  private widgetIn(cell: HTMLElement): HTMLElement | null {
    return cell.querySelector<HTMLElement>(
      'input, select, textarea, button:not(.mx-grid-resize), a[href]',
    );
  }
  private parseCell(el: Element | null): [number, number] | null {
    const cell = el?.closest<HTMLElement>('[data-cell]');
    if (!cell) return null;
    const [r, c] = cell.dataset['cell']!.split(':').map(Number);
    return [r, c];
  }
  protected onFocusIn(event: FocusEvent): void {
    const pos = this.parseCell(event.target as Element);
    if (pos && (pos[0] !== this.active()[0] || pos[1] !== this.active()[1])) this.active.set(pos);
  }

  private lastRow(): number {
    return Math.max(this.headerRows() - 1, this.headerRows() + this.rows().length - 1);
  }

  /** Move a célula activa e põe-lhe o foco (fazendo scroll se for preciso). */
  focusCell(row: number, col: number): void {
    const r = Math.min(Math.max(row, 0), this.lastRow());
    const c = Math.min(Math.max(col, 0), this.colCount() - 1);
    this.active.set([r, c]);
    const dataIndex = r - this.headerRows();
    if (this.isVirtual() && dataIndex >= 0) {
      const el = this.scroller().nativeElement;
      const h = this.rowHeight();
      const headerH = el.querySelector('thead')?.getBoundingClientRect().height ?? 0;
      const top = dataIndex * h;
      if (top < el.scrollTop) this.scrollTo(top);
      else if (top + h > el.scrollTop + el.clientHeight - headerH)
        this.scrollTo(top + h - el.clientHeight + headerH);
    }
    afterNextRender(
      () => {
        const cell = this.host.querySelector<HTMLElement>(`[data-cell="${r}:${c}"]`);
        if (!cell) return;
        (this.widgetIn(cell) ?? cell).focus();
        cell.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
      },
      { injector: this.injector },
    );
  }

  protected onKeydown(event: KeyboardEvent): void {
    const pos = this.parseCell(event.target as Element);
    if (!pos) return;
    const [r, c] = pos;
    const target = event.target as HTMLElement;
    const inText = target.matches('input:not([type=checkbox]):not([type=radio]), textarea');
    const inSelect = target.matches('select');
    const page = Math.max(
      1,
      Math.floor(this.scroller().nativeElement.clientHeight / this.rowHeight()) - 1,
    );
    const col = this.visibleColumns()[c - this.offset()];
    const dataIndex = r - this.headerRows();
    const row = dataIndex >= 0 ? this.rows()[dataIndex] : undefined;

    // redimensionar com Alt + setas no cabeçalho
    if (
      event.altKey &&
      r === 0 &&
      col &&
      col.resizable !== false &&
      (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
    ) {
      event.preventDefault();
      this.setWidth(col.key, this.widthOf(col) + (event.key === 'ArrowRight' ? 16 : -16));
      this.announcer.announce(`${col.header}, ${this.widthOf(col)} píxeis`);
      return;
    }
    if (inSelect) return;
    if (inText && !['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(event.key)) return;

    const ctrl = event.ctrlKey || event.metaKey;
    let next: [number, number] | null = null;
    switch (event.key) {
      case 'ArrowRight':
        next = [r, c + 1];
        break;
      case 'ArrowLeft':
        next = [r, c - 1];
        break;
      case 'ArrowDown':
        next = [r + 1, c];
        break;
      case 'ArrowUp':
        next = [r - 1, c];
        break;
      case 'Home':
        next = ctrl ? [0, 0] : [r, 0];
        break;
      case 'End':
        next = ctrl ? [this.lastRow(), this.colCount() - 1] : [r, this.colCount() - 1];
        break;
      case 'PageDown':
        next = [Math.max(r, this.headerRows()) + page, c];
        break;
      case 'PageUp':
        next = [Math.max(this.headerRows(), r - page), c];
        break;
      case ' ':
        if (row && this.selection() !== 'none' && !target.matches('button, a, input')) {
          event.preventDefault();
          this.toggleRow(row);
        }
        return;
      case 'Enter':
        if (r === 0 && col) {
          event.preventDefault();
          this.toggleSort(col);
        } else if (row && !target.matches('button, a, input, select')) {
          event.preventDefault();
          this.rowActivate.emit(row);
        }
        return;
      case 'a':
        if (ctrl && this.selection() === 'multiple') {
          event.preventDefault();
          this.toggleAll();
        }
        return;
      default:
        return;
    }
    event.preventDefault();
    this.focusCell(next[0], next[1]);
  }
}

export const MX_DATA_GRID = [MxDataGrid, MxGridCell, MxGridToolbar] as const;
