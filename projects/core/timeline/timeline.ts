import { Directive, booleanAttribute, input } from '@angular/core';

export type MxTimelineVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger';

/**
 * Acontecimentos por ordem, sobre uma lista ordenada nativa: o leitor de ecrã anuncia
 * "lista, 4 itens" e a posição de cada um.
 *
 * ```html
 * <ol mxTimeline>
 *   <li mxTimelineItem variant="success">
 *     <time mxTimelineTime datetime="2026-10-27T09:40">27 out, 09:40</time>
 *     <p mxTimelineTitle>Factura paga</p>
 *     <p mxTimelineDescription>Banco Mutamba pagou FT 2026/0196.</p>
 *   </li>
 * </ol>
 * ```
 */
@Directive({
  selector: 'ol[mxTimeline], ul[mxTimeline]',
  exportAs: 'mxTimeline',
  host: {
    class: 'mx-timeline',
    '[attr.data-orientation]': 'orientation() === "vertical" ? null : orientation()',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.data-align]': 'align() === "start" ? null : align()',
    // na horizontal pode haver scroll: o teclado tem de lá chegar
    '[attr.tabindex]': 'orientation() === "horizontal" ? 0 : null',
  },
})
export class MxTimeline {
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly size = input<'sm' | 'md'>('md');
  /** `alternate` põe os itens alternadamente dos dois lados da linha (só vertical, ecrãs largos). */
  readonly align = input<'start' | 'alternate'>('start');
}

/**
 * Um acontecimento. O marcador fica na linha; com `pending` aparece tracejado
 * (passo ainda por acontecer). Diz isso também no texto, para o leitor de ecrã.
 */
@Directive({
  selector: 'li[mxTimelineItem]',
  exportAs: 'mxTimelineItem',
  host: {
    class: 'mx-timeline-item',
    '[attr.data-variant]': 'variant() === "default" ? null : variant()',
    '[attr.data-pending]': 'pending() ? "" : null',
    '[attr.data-has-icon]': 'icon() ? "" : null',
  },
})
export class MxTimelineItem {
  readonly variant = input<MxTimelineVariant>('default');
  readonly pending = input(false, { transform: booleanAttribute });
  /** Marcador maior, com espaço para um ícone (mxTimelineIcon). */
  readonly icon = input(false, { transform: booleanAttribute });
}

/** Ícone dentro do marcador (svg decorativo). Usa com `icon` no item. */
@Directive({
  selector: '[mxTimelineIcon]',
  host: { class: 'mx-timeline-icon', 'aria-hidden': 'true' },
})
export class MxTimelineIcon {}

/** Data ou hora do acontecimento. Usa um `<time datetime>`. */
@Directive({ selector: '[mxTimelineTime]', host: { class: 'mx-timeline-time' } })
export class MxTimelineTime {}

@Directive({ selector: '[mxTimelineTitle]', host: { class: 'mx-timeline-title' } })
export class MxTimelineTitle {}

@Directive({ selector: '[mxTimelineDescription]', host: { class: 'mx-timeline-description' } })
export class MxTimelineDescription {}

export const MX_TIMELINE = [
  MxTimeline,
  MxTimelineItem,
  MxTimelineIcon,
  MxTimelineTime,
  MxTimelineTitle,
  MxTimelineDescription,
] as const;
