import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

export type MxButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type MxButtonSize = 'sm' | 'md' | 'lg' | 'icon';

/**
 * Botão da Muxima UI, aplicado sobre o elemento nativo.
 *
 * ```html
 * <button mxButton type="button">Guardar</button>
 * <button mxButton variant="outline" size="sm">Cancelar</button>
 * <a mxButton variant="link" routerLink="/precos">Ver preços</a>
 * ```
 *
 * Como o elemento é o próprio `<button>` ou `<a>`, atributos como `type`,
 * `form`, `routerLink` e `aria-*` funcionam sem configuração extra.
 */
@Component({
  selector: 'button[mxButton], a[mxButton]',
  exportAs: 'mxButton',
  template: `@if (loading()) {
      <span class="mx-spinner" aria-hidden="true"></span>
    }
    <ng-content />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mx-button',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.aria-busy]': 'loading() ? "true" : null',
    '[attr.disabled]': 'isNativeButton && isDisabled() ? "" : null',
    '[attr.aria-disabled]': '!isNativeButton && isDisabled() ? "true" : null',
    '[attr.tabindex]': '!isNativeButton && isDisabled() ? -1 : null',
    '(click)': 'onClick($event)',
  },
})
export class MxButton {
  /** Aparência do botão. */
  readonly variant = input<MxButtonVariant>('default');
  /** Altura: sm 32 px, md 36 px, lg 40 px; `icon` é quadrado. */
  readonly size = input<MxButtonSize>('md');
  /** Mostra um indicador e bloqueia novos cliques enquanto uma acção decorre. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Desactiva o botão. Em `<a>`, usa aria-disabled e retira-o da ordem de tabulação. */
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly isNativeButton =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'BUTTON';

  protected readonly isDisabled = computed(() => this.disabled() || this.loading());

  protected onClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
