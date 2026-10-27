import { Directive, input } from '@angular/core';

export type MxBadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';

/**
 * Etiqueta curta para estados e categorias.
 *
 * ```html
 * <span mxBadge variant="success">Paga</span>
 * ```
 *
 * Não dependas só da cor: o texto deve dizer o estado.
 */
@Directive({
  selector: '[mxBadge]',
  exportAs: 'mxBadge',
  host: {
    class: 'mx-badge',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size() === "md" ? null : size()',
  },
})
export class MxBadge {
  readonly variant = input<MxBadgeVariant>('default');
  /** sm 18 px, md 20 px, lg 24 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
