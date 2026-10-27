import { Directive, ElementRef, booleanAttribute, inject, input } from '@angular/core';

/**
 * Linha de separação. Em `<hr>` usa a semântica nativa; noutro elemento recebe
 * role="separator". Com `decorative`, fica escondida dos leitores de ecrã.
 *
 * ```html
 * <hr mxSeparator />
 * <div mxSeparator orientation="vertical" decorative></div>
 * ```
 */
@Directive({
  selector: '[mxSeparator]',
  host: {
    class: 'mx-separator',
    '[attr.data-orientation]': 'orientation()',
    '[attr.role]': 'decorative() ? "none" : isHr ? null : "separator"',
    '[attr.aria-orientation]': '!decorative() && orientation() === "vertical" ? "vertical" : null',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
  },
})
export class MxSeparator {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly decorative = input(false, { transform: booleanAttribute });
  protected readonly isHr = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'HR';
}
