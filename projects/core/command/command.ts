import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Injectable,
  TemplateRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MxDialog, MX_DIALOG_DATA } from '@muxima-ui/core/dialog';
import { mxNormalize, mxUniqueId } from '@muxima-ui/core/form-field';

export interface MxCommandItem<D = unknown> {
  /** Texto mostrado e pesquisado. */
  label: string;
  /** Grupo onde aparece (ex.: "Páginas", "Acções"). */
  group?: string;
  /** Palavras extra para a pesquisa, não mostradas. */
  keywords?: string[];
  /** Texto à direita, por exemplo um atalho. */
  hint?: string;
  disabled?: boolean;
  /** Dados livres (rota, id...). */
  data?: D;
}

/** Modelo opcional para desenhar cada item (ex.: com ícone). */
@Directive({ selector: 'ng-template[mxCommandItem]' })
export class MxCommandItemTemplate {
  readonly template = inject<TemplateRef<{ $implicit: MxCommandItem }>>(TemplateRef);
}

/**
 * Pesquisa de comandos: campo + lista filtrada, por grupos (padrão combobox com lista).
 * Use-se dentro de um diálogo (MxCommandPalette) ou directamente na página.
 *
 * ```html
 * <mx-command [items]="comandos" (selected)="executar($event)" aria-label="Pesquisar comandos" />
 * ```
 */
@Component({
  selector: 'mx-command',
  exportAs: 'mxCommand',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-command', '[attr.aria-label]': 'null' },
  template: `
    <div class="mx-command-search">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.4" />
        <path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
      </svg>
      <input
        #search
        class="mx-command-input"
        type="text"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-expanded="true"
        [attr.aria-controls]="listId"
        [attr.aria-activedescendant]="flat().length ? optionId(active()) : null"
        [attr.aria-label]="ariaLabel()"
        [placeholder]="placeholder()"
        [value]="query()"
        (input)="onInput($event)"
        (keydown)="onKeydown($event)"
      />
    </div>
    <div class="mx-command-list" role="listbox" [id]="listId" [attr.aria-label]="ariaLabel()">
      @for (g of groups(); track g.name) {
        <div role="group" class="mx-command-group" [attr.aria-labelledby]="g.name ? groupId(g.name) : null">
          @if (g.name) {
            <div class="mx-command-group-label" [id]="groupId(g.name)" aria-hidden="true">{{ g.name }}</div>
          }
          @for (e of g.items; track e.index) {
            <div
              class="mx-command-item"
              role="option"
              [id]="optionId(e.index)"
              [attr.aria-selected]="e.index === active()"
              [attr.aria-disabled]="e.item.disabled ? 'true' : null"
              [attr.data-active]="e.index === active() ? '' : null"
              (mousemove)="active.set(e.index)"
              (click)="choose(e.item)"
            >
              @if (itemTemplate(); as t) {
                <ng-container *ngTemplateOutlet="t.template; context: { $implicit: e.item }" />
              } @else {
                <span>{{ e.item.label }}</span>
              }
              @if (e.item.hint) {
                <span class="mx-command-hint">{{ e.item.hint }}</span>
              }
            </div>
          }
        </div>
      } @empty {
        <div class="mx-command-empty" role="option" aria-disabled="true" aria-selected="false">{{ emptyText() }} "{{ query() }}"</div>
      }
    </div>
    <span class="mx-visually-hidden" aria-live="polite">{{ flat().length }} resultados</span>
  `,
})
export class MxCommand<D = unknown> {
  readonly items = input.required<readonly MxCommandItem<D>[]>();
  readonly placeholder = input('Pesquisar...');
  readonly emptyText = input('Nada encontrado para');
  readonly ariaLabel = input('Pesquisar', { alias: 'aria-label' });
  readonly selected = output<MxCommandItem<D>>();

  protected readonly itemTemplate = contentChild(MxCommandItemTemplate);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly listId = mxUniqueId('mx-command-list');
  protected readonly query = signal('');
  protected readonly active = signal(0);

  protected readonly flat = computed(() => {
    const q = mxNormalize(this.query().trim());
    const all = this.items();
    if (!q) return [...all];
    return all.filter((i) => mxNormalize([i.label, i.group ?? '', ...(i.keywords ?? [])].join(' ')).includes(q));
  });

  protected readonly groups = computed(() => {
    const out: { name: string; items: { item: MxCommandItem<D>; index: number }[] }[] = [];
    this.flat().forEach((item, index) => {
      const name = item.group ?? '';
      let g = out.find((x) => x.name === name);
      if (!g) out.push((g = { name, items: [] }));
      g.items.push({ item, index });
    });
    // a ordem do teclado segue a ordem visual
    let i = 0;
    out.forEach((g) => g.items.forEach((e) => (e.index = i++)));
    return out;
  });

  private readonly ordered = computed(() => this.groups().flatMap((g) => g.items.map((e) => e.item)));

  constructor() {
    afterNextRender(() => this.focus());
  }

  focus(): void {
    this.host.querySelector<HTMLInputElement>('.mx-command-input')?.focus();
  }

  protected optionId(i: number): string {
    return `${this.listId}-${i}`;
  }
  protected groupId(name: string): string {
    return `${this.listId}-g-${mxNormalize(name).replace(/\W+/g, '-')}`;
  }

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.active.set(0);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const n = this.ordered().length;
    if (!n) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.active.update((i) => (i + 1) % n);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.active.update((i) => (i - 1 + n) % n);
    } else if (event.key === 'Home' && event.ctrlKey) {
      event.preventDefault();
      this.active.set(0);
    } else if (event.key === 'End' && event.ctrlKey) {
      event.preventDefault();
      this.active.set(n - 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.choose(this.ordered()[this.active()]);
      return;
    } else {
      return;
    }
    queueMicrotask(() => document.getElementById(this.optionId(this.active()))?.scrollIntoView?.({ block: 'nearest' }));
  }

  protected choose(item: MxCommandItem<D> | undefined): void {
    if (item && !item.disabled) this.selected.emit(item);
  }
}

/** Conteúdo do diálogo aberto por MxCommandPalette. */
@Component({
  selector: 'mx-command-palette',
  imports: [MxCommand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<mx-command [items]="data.items" [placeholder]="data.placeholder" [aria-label]="data.label" (selected)="ref.close($event)" />`,
})
export class MxCommandPaletteDialog {
  protected readonly data = inject<{ items: MxCommandItem[]; placeholder: string; label: string }>(MX_DIALOG_DATA);
  protected readonly ref = inject<DialogRef<MxCommandItem>>(DialogRef);
}

/**
 * Abre a pesquisa de comandos num diálogo modal. O resultado é o item escolhido.
 *
 * ```ts
 * inject(MxCommandPalette).open(comandos).closed.subscribe((item) => item && executar(item));
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MxCommandPalette {
  private readonly dialog = inject(MxDialog);

  open<D>(items: MxCommandItem<D>[], options: { placeholder?: string; label?: string } = {}): DialogRef<MxCommandItem<D>> {
    const ref = this.dialog.open<MxCommandItem<D>>(MxCommandPaletteDialog, {
      data: { items, placeholder: options.placeholder ?? 'Pesquisar...', label: options.label ?? 'Pesquisar' },
      size: 'md',
      ariaLabel: options.label ?? 'Pesquisar',
    });
    ref.addPanelClass('mx-command-panel');
    return ref as unknown as DialogRef<MxCommandItem<D>>;
  }
}

export const MX_COMMAND = [MxCommand, MxCommandItemTemplate] as const;
