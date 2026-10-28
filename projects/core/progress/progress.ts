import { Directive, input } from '@angular/core';
import { injectMxMessages } from '@muxima-ui/core/i18n';

/**
 * Barra de progresso sobre o `<progress>` nativo. Sem `value` fica indeterminada.
 * Dá-lhe um nome com `<label for>` ou aria-label.
 *
 * ```html
 * <label for="envio">A enviar facturas</label>
 * <progress id="envio" mxProgress [value]="42" max="100">42%</progress>
 * ```
 */
@Directive({
  selector: 'progress[mxProgress]',
  host: { class: 'mx-progress', '[attr.data-size]': 'size() === "md" ? null : size()' },
})
export class MxProgress {
  /** Espessura: sm 4 px, md 8 px, lg 12 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}

/**
 * Indicador circular para esperas curtas. Tem role="status" e um nome acessível
 * ("A carregar" por omissão); dentro de um botão, usa antes `loading` no botão.
 */
@Directive({
  selector: '[mxSpinner]',
  host: {
    class: 'mx-spinner',
    role: 'status',
    '[attr.aria-label]': 'label() ?? i18n().progress.label',
    '[attr.data-size]': 'size() === "md" ? null : size()',
  },
})
export class MxSpinner {
  readonly label = input<string>();
  protected readonly i18n = injectMxMessages();
  /** sm 14 px, md 20 px, lg 28 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
