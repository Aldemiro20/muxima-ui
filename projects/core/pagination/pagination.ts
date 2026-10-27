import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input, model } from '@angular/core';

type Slot = { type: 'page'; page: number } | { type: 'gap'; key: string };

/**
 * Navegação entre páginas de resultados.
 *
 * ```html
 * <mx-pagination [(page)]="pagina" [total]="236" [pageSize]="20" />
 * ```
 *
 * A página actual tem aria-current="page"; os botões anterior e seguinte ficam
 * desactivados nas pontas.
 */
@Component({
  selector: 'mx-pagination',
  exportAs: 'mxPagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-pagination', '[attr.aria-label]': 'null' },
  template: `
    <nav [attr.aria-label]="ariaLabel()">
      <ul class="mx-pagination-list">
        <li>
          <button type="button" class="mx-pagination-button mx-pagination-edge" [disabled]="page() <= 1" (click)="go(page() - 1)" aria-label="Página anterior">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 4L6 8l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="mx-pagination-edge-label" aria-hidden="true">Anterior</span>
          </button>
        </li>
        @for (s of slots(); track s.type === 'page' ? s.page : s.key) {
          <li>
            @if (s.type === 'page') {
              <button
                type="button"
                class="mx-pagination-button"
                [attr.aria-current]="s.page === page() ? 'page' : null"
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
        <li>
          <button type="button" class="mx-pagination-button mx-pagination-edge" [disabled]="page() >= pageCount()" (click)="go(page() + 1)" aria-label="Página seguinte">
            <span class="mx-pagination-edge-label" aria-hidden="true">Seguinte</span>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </li>
      </ul>
    </nav>
  `,
})
export class MxPagination {
  /** Página actual, a começar em 1. */
  readonly page = model(1);
  /** Número total de itens. */
  readonly total = input.required<number>();
  readonly pageSize = input(10);
  /** Páginas mostradas de cada lado da actual. */
  readonly siblings = input(1);
  readonly ariaLabel = input('Paginação', { alias: 'aria-label' });

  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));

  protected readonly slots = computed<Slot[]>(() => {
    const count = this.pageCount();
    const current = Math.min(Math.max(this.page(), 1), count);
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
}
