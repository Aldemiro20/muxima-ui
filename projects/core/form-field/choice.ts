import { Directive, booleanAttribute, input } from '@angular/core';

/**
 * Label que envolve uma caixa de verificação, um botão de opção ou um interruptor
 * com o seu texto. Clicar no texto activa o controlo, sem ids.
 *
 * ```html
 * <label mxChoice><input type="checkbox" mxCheckbox /> Aceito os termos</label>
 * ```
 */
@Directive({
  selector: 'label[mxChoice]',
  host: { class: 'mx-choice', '[attr.data-card]': 'card() ? "" : null' },
})
export class MxChoice {
  /** Mostra a opção como um cartão clicável, com borda Kwanza quando escolhida. */
  readonly card = input(false, { transform: booleanAttribute });
}

/** Texto secundário de uma opção, por baixo do título. */
@Directive({ selector: '[mxChoiceDescription]', host: { class: 'mx-choice-description' } })
export class MxChoiceDescription {}

/**
 * Grupo de controlos com título, sobre o `<fieldset>` e `<legend>` nativos.
 * O leitor de ecrã anuncia o título ao entrar no grupo.
 *
 * ```html
 * <fieldset mxFieldset>
 *   <legend>Forma de pagamento</legend>
 *   <label mxChoice><input type="radio" mxRadio name="pag" value="ref" /> Referência</label>
 * </fieldset>
 * ```
 */
@Directive({
  selector: 'fieldset[mxFieldset]',
  host: { class: 'mx-fieldset', '[attr.data-orientation]': 'orientation()' },
})
export class MxFieldset {
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
}
