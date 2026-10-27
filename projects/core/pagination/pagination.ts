import { ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, computed, input, model } from '@angular/core';
import { mxUniqueId } from '@muxima-ui/core/form-field';

type Slot = { type: 'page'; page: number } | { type: 'gap'; key: string };

export type MxPaginationVariant = 'default' | 'simple' | 'compact';

/**
 * Navegação entre páginas de resultados.
 *
 * ```html
 * <mx-pagination [(page)]="pagina" [total]="236" [pageSize]="20" />
 * <mx-pagination variant="simple" [(page)]="pagina" [total]="236" />
 * <mx-pagination [(page)]="pagina" [(pageSize)]="linhas" [pageSizeOptions]="[10, 20, 50]" showRange [total]="236" />
 * ```
 *
 * - default: números das páginas, com reticências.
 * - simple: Anterior, "Página 3 de 12", Seguinte.
 * - compact: primeira, anterior, "3 / 12", seguinte e última, só com ícones (para barras estreitas).
 *
 * A página actual tem aria-current="page"; os botões nas pontas ficam desactivados.
 */
@Component({
  selector: 'mx-pagination',
  exportAs: 'mxPagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-pagination',
    '[attr.data-variant]': 'variant() === "default" ? null : variant()',
    '[attr.data-extras]': 'pageSizeOptions().length || showRange() ? "" : null',
    '[attr.aria-label]': 'null',
  },
  template: `
    @if (pageSizeOptions().length || showRange()) {
      <div class="mx-pagination-info">
        @if (pageSizeOptions().length) {
          <label class="mx-pagination-size" [for]="sizeId">
            <span>Linhas por página</span>
            <span class="mx-pagination-select-wrap">
              <select class="mx-pagination-select" [id]="sizeId" (change)="changeSize($event)">
                @for (o of pageSizeOptions(); track o) {
                  <option [value]="o" [selected]="o === pageSize()">{{ o }}</option>
                }
              </select>
            </span>
          </label>
        }
        @if (showRange()) {
          <span class="mx-pagination-range" aria-live="polite">{{ rangeText() }}</span>
        }
      </div>
    }
    <nav [attr.aria-label]="ariaLabel()">
      <ul class="mx-pagination-list">
        @if (variant() === 'compact') {
          <li>
            <button type="button" class="mx-pagination-button" [disabled]="current() <= 1" (click)="go(1)" aria-label="Primeira página">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M11 4L7 8l4 4M5 4v8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </button>
          </li>
        }
        <li>
          <button type="button" class="mx-pagination-button mx-pagination-edge" [disabled]="current() <= 1" (click)="go(current() - 1)" aria-label="Página anterior">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 4L6 8l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            @if (variant() !== 'compact') {
              <span class="mx-pagination-edge-label" aria-hidden="true">Anterior</span>
            }
          </button>
        </li>
        @if (variant() === 'default') {
          @for (s of slots(); track s.type === 'page' ? s.page : s.key) {
            <li>
              @if (s.type === 'page') {
                <button
                  type="button"
                  class="mx-pagination-button"
                  [attr.aria-current]="s.page === current() ? 'page' : null"
                  [attr.aria-label]="'Página ' + s.page"
                  (click)="go(s.page)"
                >
                  {{ s.page }}
                </button>
              } @else {
                <span class="mx-pagination-gap" aria-hidden="true">…</span>
              }
            </li>
          }
        } @else {
          <li class="mx-pagination-status" aria-current="page">
            @if (variant() === 'simple') {
              Página {{ current() }} de {{ pageCount() }}
            } @else {
              <span aria-hidden="true">{{ current() }} / {{ pageCount() }}</span>
              <span class="mx-visually-hidden">Página {{ current() }} de {{ pageCount() }}</span>
            }
          </li>
        }
        <li>
          <button type="button" class="mx-pagination-button mx-pagination-edge" [disabled]="current() >= pageCount()" (click)="go(current() + 1)" aria-label="Página seguinte">
            @if (variant() !== 'compact') {
              <span class="mx-pagination-edge-label" aria-hidden="true">Seguinte</span>
            }
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </li>
        @if (variant() === 'compact') {
          <li>
            <button type="button" class="mx-pagination-button" [disabled]="current() >= pageCount()" (click)="go(pageCount())" aria-label="Última página">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 4l4 4-4 4M11 4v8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </button>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class MxPagination {
  /** Página actual, a começar em 1. */
  readonly page = model(1);
  /** Número total de itens. */
  readonly total = input.required<number>();
  /** Itens por página. Aceita [(pageSize)] quando há pageSizeOptions. */
  readonly pageSize = model(10);
  /** Opções de "Linhas por página". Vazio = sem escolha. */
  readonly pageSizeOptions = input<number[]>([]);
  /** Mostra "21–40 de 236". */
  readonly showRange = input(false, { transform: booleanAttribute });
  readonly variant = input<MxPaginationVariant>('default');
  /** Páginas mostradas de cada lado da actual (variante default). */
  readonly siblings = input(1);
  readonly ariaLabel = input('Paginação', { alias: 'aria-label' });

  protected readonly sizeId = mxUniqueId('mx-pagination-size');
  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  protected readonly current = computed(() => Math.min(Math.max(this.page(), 1), this.pageCount()));

  protected readonly rangeText = computed(() => {
    const total = this.total();
    if (!total) return '0 resultados';
    const from = (this.current() - 1) * this.pageSize() + 1;
    const to = Math.min(this.current() * this.pageSize(), total);
    const fmt = new Intl.NumberFormat('pt-AO');
    return `${fmt.format(from)}–${fmt.format(to)} de ${fmt.format(total)}`;
  });

  protected readonly slots = computed<Slot[]>(() => {
    const count = this.pageCount();
    const current = this.current();
    const s = this.siblings();
    const pages = new Set<number>([1, count]);
    for (let p = current - s; p <= current + s; p++) if (p >= 1 && p <= count) pages.add(p);
    // evita um "…" que esconde só uma página
    const sorted = [...pages].sort((a, b) => a - b);
    const out: Slot[] = [];
    sorted.forEach((p, i) => {
      const prev = sorted[i - 1];
      if (prev !== undefined) {
        if (p - prev === 2) out.push({ type: 'page', page: p - 1 });
        else if (p - prev > 2) out.push({ type: 'gap', key: `gap-${prev}` });
      }
      out.push({ type: 'page', page: p });
    });
    return out;
  });

  go(p: number): void {
    const next = Math.min(Math.max(p, 1), this.pageCount());
    if (next !== this.page()) this.page.set(next);
  }

  protected changeSize(event: Event): void {
    const size = Number((event.target as HTMLSelectElement).value);
    // mantém o primeiro item visível na nova página
    const first = (this.current() - 1) * this.pageSize();
    this.pageSize.set(size);
    this.page.set(Math.floor(first / size) + 1);
  }
}
