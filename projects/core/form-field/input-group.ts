import { Directive } from '@angular/core';

/**
 * Junta um campo com texto ou botões antes e depois (prefixo e sufixo).
 *
 * ```html
 * <div mxInputGroup>
 *   <span mxInputAddon>US$</span>
 *   <input mxInput inputmode="decimal" aria-label="Valor" />
 *   <span mxInputAddon>,00</span>
 * </div>
 * ```
 *
 * O prefixo e o sufixo são só visuais: inclui a unidade no label (ex.: "Valor em US$").
 */
@Directive({ selector: '[mxInputGroup]', host: { class: 'mx-input-group' } })
export class MxInputGroup {}

/** Texto, ícone ou botão colado ao campo dentro de um `[mxInputGroup]`. */
@Directive({ selector: '[mxInputAddon]', host: { class: 'mx-input-addon' } })
export class MxInputAddon {}
