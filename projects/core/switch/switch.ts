import { Directive, input } from '@angular/core';
import { MX_FORM_FIELD_CONTROL, MxNativeControl } from '@muxima-ui/core/form-field';

/**
 * Interruptor ligado/desligado sobre o `<input type="checkbox">` nativo, com role="switch".
 * Usa-o para preferências que têm efeito imediato; para escolhas num formulário
 * que só contam ao enviar, prefere a caixa de verificação.
 *
 * ```html
 * <label mxChoice><input type="checkbox" mxSwitch [(ngModel)]="notificacoes" /> Notificações por email</label>
 * ```
 */
@Directive({
  selector: 'input[type=checkbox][mxSwitch]',
  exportAs: 'mxSwitch',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxSwitch }],
  host: {
    class: 'mx-switch',
    role: 'switch',
    '[attr.data-size]': 'size() === "md" ? null : size()',
  },
})
export class MxSwitch extends MxNativeControl {
  /** sm 28×16 px, md 36×20 px, lg 44×24 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
