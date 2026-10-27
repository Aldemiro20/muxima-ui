import { Directive, booleanAttribute, input } from '@angular/core';

export type MxAlertVariant = 'info' | 'success' | 'warning' | 'danger';

/**
 * Mensagem destacada dentro da página.
 *
 * ```html
 * <div mxAlert variant="warning">
 *   <p mxAlertTitle>A sessão expira em 5 minutos</p>
 *   <p>Guarda o trabalho para não perderes alterações.</p>
 * </div>
 * ```
 *
 * Por omissão não interrompe o leitor de ecrã. Com `announce`, a mensagem é lida
 * assim que aparece (role="alert"); usa-o só para mensagens que surgem após uma acção.
 */
@Directive({
  selector: '[mxAlert]',
  exportAs: 'mxAlert',
  host: {
    class: 'mx-alert',
    '[attr.data-variant]': 'variant()',
    '[attr.role]': 'announce() ? "alert" : null',
  },
})
export class MxAlert {
  readonly variant = input<MxAlertVariant>('info');
  readonly announce = input(false, { transform: booleanAttribute });
}

@Directive({ selector: '[mxAlertTitle]', host: { class: 'mx-alert-title' } })
export class MxAlertTitle {}

export const MX_ALERT = [MxAlert, MxAlertTitle] as const;
