import { Directive, booleanAttribute, effect, input } from '@angular/core';
import { MX_FORM_FIELD_CONTROL, MxNativeControl } from '@muxima-ui/core/form-field';

/**
 * Caixa de verificação sobre o `<input type="checkbox">` nativo.
 * Funciona com `ngModel` e Reactive Forms sem configuração.
 *
 * ```html
 * <label mxChoice><input type="checkbox" mxCheckbox formControlName="termos" /> Aceito os termos</label>
 * ```
 */
@Directive({
  selector: 'input[type=checkbox][mxCheckbox]',
  exportAs: 'mxCheckbox',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxCheckbox }],
  host: {
    class: 'mx-checkbox',
    '[attr.data-size]': 'size() === "md" ? null : size()',
  },
})
export class MxCheckbox extends MxNativeControl {
  /** sm 14 px, md 16 px, lg 20 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  /** Estado intermédio, para "seleccionar todos" quando só parte está seleccionada. */
  readonly indeterminate = input(false, { transform: booleanAttribute });

  constructor() {
    super();
    effect(() => {
      (this.element as HTMLInputElement).indeterminate = this.indeterminate();
    });
  }
}
