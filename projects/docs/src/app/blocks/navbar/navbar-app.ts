import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxInput } from '@muxima-ui/core/form-field';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxSeparator } from '@muxima-ui/core/separator';

/** Barra de uma aplicação: pesquisa, notificações e menu da conta. */
@Component({
  selector: 'app-navbar-app',
  imports: [MxAvatar, MxInput, MX_MENU, MxSeparator],
  templateUrl: './navbar-app.html',
  styleUrl: './navbar-app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarApp {
  protected readonly utilizador = { nome: 'Ana Kiala', email: 'ana@kianda.ao' };
  protected readonly porLer = signal(3);
  protected readonly pesquisa = signal('');
  protected readonly ultimaAccao = signal('');

  protected pesquisar(event: Event): void {
    event.preventDefault();
    this.ultimaAccao.set(this.pesquisa() ? `Pesquisa: ${this.pesquisa()}` : '');
  }
}
