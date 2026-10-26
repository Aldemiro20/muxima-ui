import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewEncapsulation,
  computed,
  inject,
  input,
  model,
} from '@angular/core';

export type MxSortDirection = 'asc' | 'desc';

export interface MxSortState {
  /** Coluna ordenada, ou null sem ordenação. */
  active: string | null;
  direction: MxSortDirection;
}

/**
 * Estilo de tabela sobre o `<table>` nativo, com ordenação opcional.
 *
 * ```html
 * <div class="mx-table-container">
 *   <table mxTable [(sort)]="ordem">
 *     <thead><tr>
 *       <th mxSortHeader="nome">Nome</th>
 *       <th mxSortHeader="valor" data-align="end">Valor</th>
 *     </tr></thead>
 *     <tbody>...</tbody>
 *   </table>
 * </div>
 * ```
 *
 * A tabela continua a ser HTML: os leitores de ecrã anunciam linhas,
 * colunas e cabeçalhos sem configuração.
 */
@Directive({
  selector: 'table[mxTable]',
  exportAs: 'mxTable',
  host: {
    class: 'mx-table',
    '[attr.data-density]': 'density() === "comfortable" ? null : density()',
  },
})
export class MxTable {
  /** Estado da ordenação. Aceita two-way binding: `[(sort)]`. */
  readonly sort = model<MxSortState>({ active: null, direction: 'asc' });
  readonly density = input<'comfortable' | 'compact'>('comfortable');

  /** Alterna: ascendente, descendente, sem ordenação. */
  toggleSort(key: string): void {
    const s = this.sort();
    if (s.active !== key) this.sort.set({ active: key, direction: 'asc' });
    else if (s.direction === 'asc') this.sort.set({ active: key, direction: 'desc' });
    else this.sort.set({ active: null, direction: 'asc' });
  }
}

/**
 * Cabeçalho ordenável. Coloca um botão dentro do `<th>` e mantém `aria-sort` actualizado.
 */
@Component({
  selector: 'th[mxSortHeader]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.aria-sort]': 'ariaSort()',
  },
  template: `
    <button type="button" class="mx-sort-button" (click)="table.toggleSort(key())">
      <ng-content />
      <svg class="mx-sort-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        @switch (ariaSort()) {
          @case ('ascending') {
            <path d="M8 12V4M4.5 7.5L8 4l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          }
          @case ('descending') {
            <path d="M8 4v8M4.5 8.5L8 12l3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          }
          @default {
            <path d="M5 6.5L8 3.5l3 3M5 9.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          }
        }
      </svg>
    </button>
  `,
})
export class MxSortHeader {
  readonly key = input.required<string>({ alias: 'mxSortHeader' });
  protected readonly table = inject(MxTable);

  protected readonly ariaSort = computed(() => {
    const s = this.table.sort();
    if (s.active !== this.key()) return 'none';
    return s.direction === 'asc' ? 'ascending' : 'descending';
  });
}

/**
 * Ordena uma lista segundo o estado de `MxTable`. Texto é comparado em português
 * (acentos e maiúsculas), números numericamente.
 */
export function mxSortData<T>(rows: readonly T[], sort: MxSortState, accessor?: (row: T, key: string) => unknown): T[] {
  if (!sort.active) return [...rows];
  const key = sort.active;
  const get = accessor ?? ((row: T, k: string) => (row as Record<string, unknown>)[k]);
  const collator = new Intl.Collator('pt', { numeric: true, sensitivity: 'base' });
  const dir = sort.direction === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const x = get(a, key);
    const y = get(b, key);
    if (x == null && y == null) return 0;
    if (x == null) return 1;
    if (y == null) return -1;
    if (typeof x === 'number' && typeof y === 'number') return (x - y) * dir;
    return collator.compare(String(x), String(y)) * dir;
  });
}

export const MX_TABLE = [MxTable, MxSortHeader] as const;
