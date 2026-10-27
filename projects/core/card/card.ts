import { Directive } from '@angular/core';

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
@Directive({ selector: '[mxCard]', host: { class: 'mx-card' } })
export class MxCard {}

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

export const MX_CARD = [MxCard, MxCardHeader, MxCardTitle, MxCardDescription, MxCardContent, MxCardFooter] as const;
