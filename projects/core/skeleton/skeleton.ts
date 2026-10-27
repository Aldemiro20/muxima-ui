import { Directive, input } from '@angular/core';

/**
 * Bloco cinzento que ocupa o lugar do conteúdo enquanto carrega.
 * Fica escondido dos leitores de ecrã: marca o contentor com aria-busy="true"
 * e anuncia o carregamento por texto, por exemplo com uma região aria-live.
 *
 * ```html
 * <div aria-busy="true">
 *   <div mxSkeleton shape="circle" style="width:40px;height:40px"></div>
 *   <div mxSkeleton shape="text" style="width:60%"></div>
 * </div>
 * ```
 */
@Directive({
  selector: '[mxSkeleton]',
  host: { class: 'mx-skeleton', 'aria-hidden': 'true', '[attr.data-shape]': 'shape()' },
})
export class MxSkeleton {
  readonly shape = input<'block' | 'text' | 'circle'>('block');
}
