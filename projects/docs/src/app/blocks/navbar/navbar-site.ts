import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';

/**
 * Barra de navegação de um site. Em ecrãs estreitos as ligações passam para um
 * menu que abre com o botão Menu (Escape fecha e devolve o foco ao botão).
 */
@Component({
  selector: 'app-navbar-site',
  imports: [MxButton],
  templateUrl: './navbar-site.html',
  styleUrl: './navbar-site.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(keydown.escape)': 'fechar(true)' },
})
export class NavbarSite {
  protected readonly ligacoes = [
    { texto: 'Produto', href: '#produto' },
    { texto: 'Preços', href: '#precos', actual: true },
    { texto: 'Clientes', href: '#clientes' },
    { texto: 'Ajuda', href: '#ajuda' },
  ];
  protected readonly aberto = signal(false);
  private readonly botao = viewChild.required<ElementRef<HTMLButtonElement>>('botaoMenu');

  protected fechar(devolverFoco = false): void {
    if (!this.aberto()) return;
    this.aberto.set(false);
    if (devolverFoco) this.botao().nativeElement.focus();
  }
}
