import { Directive, input } from '@angular/core';
import { MX_FORM_FIELD_CONTROL, MxNativeControl } from '@muxima-ui/core/form-field';

/**
 * Botão de opção sobre o `<input type="radio">` nativo. Agrupa com o mesmo `name`
 * dentro de um `<fieldset mxFieldset>`; as setas mudam a opção, como no navegador.
 *
 * ```html
 * <fieldset mxFieldset>
 *   <legend>Periodicidade</legend>
 *   <label mxChoice><input type="radio" mxRadio formControlName="periodo" value="mensal" /> Mensal</label>
 *   <label mxChoice><input type="radio" mxRadio formControlName="periodo" value="anual" /> Anual</label>
 * </fieldset>
 * ```
 */
@Directive({
  selector: 'input[type=radio][mxRadio]',
  exportAs: 'mxRadio',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxRadio }],
  host: {
    class: 'mx-radio',
    '[attr.data-size]': 'size() === "md" ? null : size()',
  },
})
export class MxRadio extends MxNativeControl {
  /** sm 14 px, md 16 px, lg 20 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
