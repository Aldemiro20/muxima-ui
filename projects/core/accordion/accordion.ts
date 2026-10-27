import { Directive, booleanAttribute, inject, input } from '@angular/core';
import { mxUniqueId } from '@muxima-ui/core/form-field';

/**
 * Acordeão sobre `<details>` e `<summary>` nativos: Enter e Espaço abrem e fecham,
 * o estado é anunciado pelo leitor de ecrã e a pesquisa do navegador encontra
 * texto dentro das secções fechadas.
 *
 * ```html
 * <div mxAccordion>
 *   <details mxAccordionItem open>
 *     <summary mxAccordionTrigger>Como pago a factura?</summary>
 *     <div mxAccordionContent>Por referência, transferência ou Multicaixa Express.</div>
 *   </details>
 * </div>
 * ```
 *
 * Por omissão só uma secção fica aberta (atributo name nativo). Com `multiple`, várias.
 */
@Directive({
  selector: '[mxAccordion]',
  exportAs: 'mxAccordion',
  host: { class: 'mx-accordion' },
})
export class MxAccordion {
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly groupName = mxUniqueId('mx-accordion');
}

@Directive({
  selector: 'details[mxAccordionItem]',
  host: {
    class: 'mx-accordion-item',
    '[attr.name]': 'accordion && !accordion.multiple() ? accordion.groupName : null',
  },
})
export class MxAccordionItem {
  protected readonly accordion = inject(MxAccordion, { optional: true });
}

@Directive({ selector: 'summary[mxAccordionTrigger]', host: { class: 'mx-accordion-trigger' } })
export class MxAccordionTrigger {}

@Directive({ selector: '[mxAccordionContent]', host: { class: 'mx-accordion-content' } })
export class MxAccordionContent {}

export const MX_ACCORDION = [MxAccordion, MxAccordionItem, MxAccordionTrigger, MxAccordionContent] as const;
