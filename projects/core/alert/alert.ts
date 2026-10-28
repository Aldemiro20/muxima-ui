import { Directive, booleanAttribute, input } from '@angular/core';
import { injectMxMessages } from '@muxima-ui/core/i18n';

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

/** Botão de fechar do alerta. Esconder o alerta fica a cargo da aplicação (ex.: com @if). */
@Directive({
  selector: 'button[mxAlertClose]',
  host: { class: 'mx-alert-close', type: 'button', '[attr.aria-label]': 'label() ?? i18n().alert.close' },
})
export class MxAlertClose {
  readonly label = input<string | undefined>(undefined, { alias: 'aria-label' });
  protected readonly i18n = injectMxMessages();
}

export const MX_ALERT = [MxAlert, MxAlertTitle, MxAlertClose] as const;
