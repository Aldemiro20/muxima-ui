import { Directive, booleanAttribute, input } from '@angular/core';
import { MX_FORM_FIELD_CONTROL } from './form-control';
import { MxNativeControl } from './native-control';

/**
 * Campo de texto sobre o `<input>` ou `<textarea>` nativo.
 * Funciona com `ngModel`, `formControl` e `formControlName` sem configuração.
 *
 * ```html
 * <input mxInput type="email" formControlName="email" />
 * <textarea mxInput autosize rows="3"></textarea>
 * ```
 */
@Directive({
  selector: 'input[mxInput], textarea[mxInput]',
  exportAs: 'mxInput',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxInput }],
  host: {
    class: 'mx-input',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.data-autosize]': 'autosize() ? "" : null',
  },
})
export class MxInput extends MxNativeControl {
  /** Altura: sm 32 px, md 36 px, lg 40 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  /** Só em textarea: a altura acompanha o texto (até max-height). */
  readonly autosize = input(false, { transform: booleanAttribute });
}
