import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Injector,
  TemplateRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { mxUniqueId } from '@muxima-ui/core/form-field';

export interface MxKanbanColumn<T = any> {
  id: string;
  title: string;
  items: T[];
  /** Máximo de cartões na coluna (WIP). Acima disso não se larga lá. */
  limit?: number;
}

export interface MxKanbanMove<T = any> {
  item: T;
  from: string;
  to: string;
  fromIndex: number;
  toIndex: number;
}

/** Conteúdo do cartão: `<ng-template mxKanbanCard let-item let-column="column">`. */
@Directive({ selector: 'ng-template[mxKanbanCard]' })
export class MxKanbanCard {
  readonly template = inject(TemplateRef);
}

/** Rodapé de cada coluna (ex.: botão "Adicionar"): `<ng-template mxKanbanColumnFooter let-column>`. */
@Directive({ selector: 'ng-template[mxKanbanColumnFooter]' })
export class MxKanbanColumnFooter {
  readonly template = inject(TemplateRef);
}

/**
 * Quadro Kanban: cartões em colunas, com arrastar e largar (rato e toque) e mover com
 * o teclado. Num cartão: Espaço agarra, setas movem (cima e baixo na coluna, esquerda e
 * direita entre colunas), Espaço larga e Esc cancela. Cada passo é anunciado.
 *
 * ```html
 * <mx-kanban [(columns)]="quadro" [itemLabel]="titulo" (moved)="guardar($event)">
 *   <ng-template mxKanbanCard let-tarefa>{{ tarefa.titulo }}</ng-template>
 * </mx-kanban>
 * ```
 */
@Component({
  selector: 'mx-kanban',
  exportAs: 'mxKanban',
  imports: [NgTemplateOutlet, CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-kanban', '[attr.aria-label]': 'null' },
  template: `
    <p class="mx-visually-hidden" [id]="helpId">{{ helpText() }}</p>
    <div class="mx-kanban-board" cdkDropListGroup role="group" [attr.aria-label]="ariaLabel()">
      @for (col of columns(); track col.id; let ci = $index) {
        <div
          class="mx-kanban-column"
          role="group"
          [attr.aria-labelledby]="titleId(ci)"
          [attr.data-full]="isFull(col) ? '' : null"
        >
          <div class="mx-kanban-column-head">
            <p
              class="mx-kanban-column-title"
              role="heading"
              [attr.aria-level]="headingLevel()"
              [id]="titleId(ci)"
            >
              {{ col.title }}
            </p>
            <span class="mx-kanban-count">
              {{ col.items.length }}{{ col.limit ? ' / ' + col.limit : '' }}
              <span class="mx-visually-hidden">{{
                (col.items.length === 1 ? 'cartão' : 'cartões') + (col.limit ? ', máximo ' + col.limit : '')
              }}</span>
            </span>
          </div>
          <ul
            class="mx-kanban-list"
            cdkDropList
            [id]="listId(ci)"
            [cdkDropListData]="ci"
            [cdkDropListEnterPredicate]="canEnter(ci)"
            [attr.aria-labelledby]="titleId(ci)"
            (cdkDropListDropped)="onDrop($event)"
          >
            @for (item of col.items; track keyOf(item); let ii = $index) {
              <li
                class="mx-kanban-card"
                cdkDrag
                [cdkDragData]="item"
                tabindex="0"
                [attr.data-kanban]="ci + ':' + ii"
                [attr.data-grabbed]="isGrabbed(ci, ii) ? '' : null"
                [attr.aria-describedby]="helpId"
                [attr.aria-label]="isGrabbed(ci, ii) ? labelOf(item) + ', agarrado' : null"
                (keydown)="onKeydown($event, ci, ii)"
                (blur)="onBlur(ci, ii)"
              >
                @if (cardTpl(); as tpl) {
                  <ng-container
                    *ngTemplateOutlet="tpl.template; context: { $implicit: item, column: col }"
                  />
                } @else {
                  {{ labelOf(item) }}
                }
                <div class="mx-kanban-placeholder" *cdkDragPlaceholder></div>
              </li>
            } @empty {
              <li class="mx-kanban-empty">{{ emptyText() }}</li>
            }
          </ul>
          @if (footerTpl(); as f) {
            <div class="mx-kanban-column-foot">
              <ng-container *ngTemplateOutlet="f.template; context: { $implicit: col }" />
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class MxKanban<T = any> {
  readonly columns = model.required<MxKanbanColumn<T>[]>();
  /** Chave única de cada cartão: nome do campo ou função. */
  readonly itemKey = input<string | ((item: T) => unknown)>('id');
  /** Nome do cartão nos anúncios. Por omissão o campo `title` ou `titulo`. */
  readonly itemLabel = input<(item: T) => string>((i) =>
    String((i as any)?.title ?? (i as any)?.titulo ?? (i as any)?.id ?? ''),
  );
  readonly ariaLabel = input('Quadro', { alias: 'aria-label' });
  readonly headingLevel = input(3);
  readonly emptyText = input('Sem cartões');
  readonly helpText = input(
    'Espaço para agarrar. Setas para mover. Espaço para largar, Esc para cancelar.',
  );
  readonly moved = output<MxKanbanMove<T>>();

  protected readonly cardTpl = contentChild(MxKanbanCard);
  protected readonly footerTpl = contentChild(MxKanbanColumnFooter);
  private readonly announcer = inject(LiveAnnouncer);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);
  private readonly uid = mxUniqueId('mx-kanban');
  protected readonly helpId = `${this.uid}-help`;

  /** Cartão agarrado com o teclado: posição actual e de onde saiu. */
  private readonly grabbed = signal<{
    col: number;
    index: number;
    fromCol: number;
    fromIndex: number;
    snapshot: MxKanbanColumn<T>[];
  } | null>(null);

  protected titleId(i: number): string {
    return `${this.uid}-t${i}`;
  }
  protected listId(i: number): string {
    return `${this.uid}-l${i}`;
  }
  keyOf(item: T): unknown {
    const k = this.itemKey();
    return typeof k === 'function' ? k(item) : (item as Record<string, unknown>)[k];
  }
  protected labelOf(item: T): string {
    return this.itemLabel()(item);
  }
  protected isGrabbed(c: number, i: number): boolean {
    const g = this.grabbed();
    return !!g && g.col === c && g.index === i;
  }
  protected isFull(col: MxKanbanColumn<T>): boolean {
    return !!col.limit && col.items.length >= col.limit;
  }
  protected canEnter(ci: number) {
    return (drag: CdkDrag, drop: CdkDropList) => {
      const col = this.columns()[ci];
      return !col.limit || col.items.length < col.limit || drag.dropContainer === drop;
    };
  }

  /** Move um cartão e devolve as colunas novas (sem mudar as antigas). */
  private move(
    cols: MxKanbanColumn<T>[],
    from: number,
    fromIndex: number,
    to: number,
    toIndex: number,
  ): MxKanbanColumn<T>[] {
    const next = cols.map((c) => ({ ...c, items: [...c.items] }));
    const [item] = next[from].items.splice(fromIndex, 1);
    next[to].items.splice(Math.min(toIndex, next[to].items.length), 0, item);
    return next;
  }

  protected onDrop(e: CdkDragDrop<number>): void {
    const from = e.previousContainer.data;
    const to = e.container.data;
    if (from === to && e.previousIndex === e.currentIndex) return;
    const item = this.columns()[from].items[e.previousIndex];
    this.columns.set(this.move(this.columns(), from, e.previousIndex, to, e.currentIndex));
    this.emitMove(item, from, e.previousIndex, to, e.currentIndex);
  }

  private emitMove(item: T, from: number, fromIndex: number, to: number, toIndex: number): void {
    const cols = this.columns();
    this.moved.emit({ item, from: cols[from].id, to: cols[to].id, fromIndex, toIndex });
  }

  private focusCard(col: number, index: number): void {
    afterNextRender(
      () => this.host.querySelector<HTMLElement>(`[data-kanban="${col}:${index}"]`)?.focus(),
      { injector: this.injector },
    );
  }

  private where(col: number, index: number): string {
    const c = this.columns()[col];
    return `${c.title}, posição ${index + 1} de ${c.items.length}`;
  }

  protected onKeydown(event: KeyboardEvent, ci: number, ii: number): void {
    if (event.target !== event.currentTarget) return; // teclas dentro de botões do cartão
    const g = this.grabbed();
    const cols = this.columns();
    const key = event.key;

    if (!g) {
      if (key === ' ' || key === 'Enter') {
        event.preventDefault();
        this.grabbed.set({ col: ci, index: ii, fromCol: ci, fromIndex: ii, snapshot: cols });
        this.announcer.announce(
          `${this.labelOf(cols[ci].items[ii])} agarrado. ${this.where(ci, ii)}.`,
          'assertive',
        );
        return;
      }
      // navegar entre cartões
      let target: [number, number] | null = null;
      if (key === 'ArrowDown') target = [ci, ii + 1];
      else if (key === 'ArrowUp') target = [ci, ii - 1];
      else if (key === 'ArrowRight' || key === 'ArrowLeft') {
        const step = key === 'ArrowRight' ? 1 : -1;
        for (let c = ci + step; c >= 0 && c < cols.length; c += step) {
          if (cols[c].items.length) {
            target = [c, Math.min(ii, cols[c].items.length - 1)];
            break;
          }
        }
      } else if (key === 'Home') target = [ci, 0];
      else if (key === 'End') target = [ci, cols[ci].items.length - 1];
      if (target && target[1] >= 0 && target[1] < cols[target[0]].items.length) {
        event.preventDefault();
        this.focusCard(target[0], target[1]);
      }
      return;
    }

    // a mover
    const item = cols[g.col].items[g.index];
    if (key === ' ' || key === 'Enter') {
      event.preventDefault();
      this.grabbed.set(null);
      if (g.col !== g.fromCol || g.index !== g.fromIndex)
        this.emitMove(item, g.fromCol, g.fromIndex, g.col, g.index);
      this.announcer.announce(
        `${this.labelOf(item)} largado. ${this.where(g.col, g.index)}.`,
        'assertive',
      );
      this.focusCard(g.col, g.index);
      return;
    }
    if (key === 'Escape') {
      event.preventDefault();
      this.columns.set(g.snapshot);
      this.grabbed.set(null);
      this.announcer.announce(
        `Movimento cancelado. ${this.labelOf(item)} voltou a ${this.where(g.fromCol, g.fromIndex)}.`,
        'assertive',
      );
      this.focusCard(g.fromCol, g.fromIndex);
      return;
    }
    let to: [number, number] | null = null;
    if (key === 'ArrowDown' && g.index < cols[g.col].items.length - 1) to = [g.col, g.index + 1];
    else if (key === 'ArrowUp' && g.index > 0) to = [g.col, g.index - 1];
    else if (key === 'ArrowRight' || key === 'ArrowLeft') {
      const c = g.col + (key === 'ArrowRight' ? 1 : -1);
      if (c >= 0 && c < cols.length) {
        const target = cols[c];
        if (target.limit && target.items.length >= target.limit) {
          event.preventDefault();
          this.announcer.announce(
            `${target.title} está cheia, máximo ${target.limit}.`,
            'assertive',
          );
          return;
        }
        to = [c, Math.min(g.index, target.items.length)];
      }
    }
    if (!to) return;
    event.preventDefault();
    this.columns.set(this.move(cols, g.col, g.index, to[0], to[1]));
    this.grabbed.set({ ...g, col: to[0], index: to[1] });
    this.announcer.announce(this.where(to[0], to[1]), 'assertive');
    this.focusCard(to[0], to[1]);
  }

  protected onBlur(ci: number, ii: number): void {
    // o foco saiu do cartão agarrado (ex.: clique fora): larga onde está
    queueMicrotask(() => {
      const g = this.grabbed();
      if (!g || g.col !== ci || g.index !== ii) return;
      const active = document.activeElement as HTMLElement | null;
      if (active?.dataset['kanban'] === `${g.col}:${g.index}`) return;
      this.grabbed.set(null);
      const item = this.columns()[g.col].items[g.index];
      if (g.col !== g.fromCol || g.index !== g.fromIndex)
        this.emitMove(item, g.fromCol, g.fromIndex, g.col, g.index);
    });
  }
}

export const MX_KANBAN = [MxKanban, MxKanbanCard, MxKanbanColumnFooter] as const;
