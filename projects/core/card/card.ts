import { Directive, input } from '@angular/core';

export type MxCardVariant = 'default' | 'subtle' | 'elevated' | 'accent';

/**
 * Superfície para agrupar conteúdo relacionado. Aplica-se ao elemento que fizer
 * sentido: `article`, `section`, `div` ou `a` (cartão clicável).
 *
 * ```html
 * <article mxCard>
 *   <header mxCardHeader>
 *     <h3 mxCardTitle>Facturação</h3>
 *     <p mxCardDescription>Resumo do mês corrente.</p>
 *   </header>
 *   <div mxCardContent>...</div>
 *   <footer mxCardFooter><button mxButton>Ver detalhe</button></footer>
 * </article>
 * ```
 */
@Directive({
  selector: '[mxCard]',
  host: {
    class: 'mx-card',
    '[attr.data-variant]': 'variant() === "default" ? null : variant()',
    '[attr.data-orientation]': 'orientation() === "vertical" ? null : orientation()',
  },
})
export class MxCard {
  /** default: borda; subtle: fundo suave sem borda; elevated: sombra; accent: destaque com a cor de marca. */
  readonly variant = input<MxCardVariant>('default');
  /** horizontal: imagem à esquerda e conteúdo à direita (volta a vertical em ecrãs estreitos). */
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
}

/** Imagem ou área visual que encosta às margens do cartão. Usa-se em `img`, `picture` ou `div`. */
@Directive({ selector: '[mxCardMedia]', host: { class: 'mx-card-media' } })
export class MxCardMedia {}

@Directive({ selector: '[mxCardHeader]', host: { class: 'mx-card-header' } })
export class MxCardHeader {}

/** Título do cartão. Usa o nível de cabeçalho certo para a página (h2, h3...). */
@Directive({ selector: '[mxCardTitle]', host: { class: 'mx-card-title' } })
export class MxCardTitle {}

@Directive({ selector: '[mxCardDescription]', host: { class: 'mx-card-description' } })
export class MxCardDescription {}

@Directive({ selector: '[mxCardContent]', host: { class: 'mx-card-content' } })
export class MxCardContent {}

@Directive({ selector: '[mxCardFooter]', host: { class: 'mx-card-footer' } })
export class MxCardFooter {}

export const MX_CARD = [MxCard, MxCardMedia, MxCardHeader, MxCardTitle, MxCardDescription, MxCardContent, MxCardFooter] as const;
