import { Directive, input } from '@angular/core';
import { injectMxMessages } from '@muxima-ui/core/i18n';

/**
 * Migalhas: mostram onde a página está na hierarquia.
 *
 * ```html
 * <nav mxBreadcrumb>
 *   <ol>
 *     <li><a routerLink="/clientes">Clientes</a></li>
 *     <li><a routerLink="/clientes/42">Kianda Logística</a></li>
 *     <li><span aria-current="page">Facturas</span></li>
 *   </ol>
 * </nav>
 * ```
 *
 * Os separadores são desenhados em CSS, por isso o leitor de ecrã não os lê.
 */
@Directive({
  selector: 'nav[mxBreadcrumb]',
  host: { class: 'mx-breadcrumb', '[attr.aria-label]': 'ariaLabel() ?? i18n().breadcrumb.label' },
})
export class MxBreadcrumb {
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  protected readonly i18n = injectMxMessages();
}
