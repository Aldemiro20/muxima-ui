import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  input,
  model,
  viewChild,
  viewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { mxUniqueId } from '@muxima-ui/core/form-field';

/**
 * Um separador. O conteúdo só é criado quando o separador é aberto.
 *
 * ```html
 * <mx-tab label="Pré-visualização">...</mx-tab>
 * ```
 */
@Component({
  selector: 'mx-tab',
  template: `<ng-template #content><ng-content /></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MxTab {
  readonly label = input.required<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly content = viewChild.required<TemplateRef<unknown>>('content');
  readonly tabId = mxUniqueId('mx-tab');
  readonly panelId = mxUniqueId('mx-tab-panel');
}

/**
 * Separadores acessíveis (padrão WAI-ARIA Tabs): setas esquerda/direita,
 * Home e End movem e activam; só o separador activo está na ordem de tabulação.
 *
 * ```html
 * <mx-tabs [(selectedIndex)]="indice" aria-label="Exemplo">
 *   <mx-tab label="Pré-visualização">...</mx-tab>
 *   <mx-tab label="Código">...</mx-tab>
 * </mx-tabs>
 * ```
 */
@Component({
  selector: 'mx-tabs',
  exportAs: 'mxTabs',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-tabs', '[attr.aria-label]': 'null' },
  template: `
    <div class="mx-tab-list" role="tablist" [attr.aria-label]="ariaLabel() ?? null" (keydown)="onKeydown($event)">
      @for (tab of tabs(); track tab.tabId; let i = $index) {
        <button
          #tabButton
          type="button"
          class="mx-tab"
          role="tab"
          [id]="tab.tabId"
          [attr.aria-selected]="i === current()"
          [attr.aria-controls]="tab.panelId"
          [tabIndex]="i === current() ? 0 : -1"
          [disabled]="tab.disabled()"
          (click)="select(i)"
        >
          {{ tab.label() }}
        </button>
      }
    </div>
    @for (tab of tabs(); track tab.panelId; let i = $index) {
      <div
        class="mx-tab-panel"
        role="tabpanel"
        [id]="tab.panelId"
        [attr.aria-labelledby]="tab.tabId"
        [hidden]="i !== current()"
        tabindex="0"
      >
        @if (i === current()) {
          <ng-container [ngTemplateOutlet]="tab.content()" />
        }
      </div>
    }
  `,
})
export class MxTabs {
  /** Índice do separador activo. Aceita two-way binding. */
  readonly selectedIndex = model(0);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly tabs = contentChildren(MxTab);
  private readonly buttons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  protected readonly current = computed(() => {
    const n = this.tabs().length;
    return n === 0 ? -1 : Math.min(Math.max(this.selectedIndex(), 0), n - 1);
  });

  constructor() {
    // Se o separador escolhido estiver desactivado, salta para o primeiro disponível.
    effect(() => {
      const tabs = this.tabs();
      const i = this.current();
      if (i >= 0 && tabs[i]?.disabled()) {
        const first = tabs.findIndex((t) => !t.disabled());
        if (first >= 0) this.selectedIndex.set(first);
      }
    });
  }

  select(index: number): void {
    if (this.tabs()[index]?.disabled()) return;
    this.selectedIndex.set(index);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const tabs = this.tabs();
    const n = tabs.length;
    if (!n) return;
    const step = (from: number, dir: 1 | -1) => {
      let i = from;
      for (let k = 0; k < n; k++) {
        i = (i + dir + n) % n;
        if (!tabs[i].disabled()) return i;
      }
      return from;
    };
    let next: number | null = null;
    switch (event.key) {
      case 'ArrowRight':
        next = step(this.current(), 1);
        break;
      case 'ArrowLeft':
        next = step(this.current(), -1);
        break;
      case 'Home':
        next = step(-1, 1);
        break;
      case 'End':
        next = step(n, -1);
        break;
    }
    if (next === null) return;
    event.preventDefault();
    this.select(next);
    this.buttons()[next]?.nativeElement.focus();
  }
}
