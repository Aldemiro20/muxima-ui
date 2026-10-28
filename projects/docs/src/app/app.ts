import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { MxDialog } from '@muxima-ui/core/dialog';
import { CommandPalette } from './shell/command-palette';
import { Footer } from './shell/footer';
import { Header } from './shell/header';

@Component({
  selector: 'doc-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKeydown($event)' },
  template: `
    @if (bare()) {
      <!-- pré-visualização de um bloco: só o bloco -->
      <router-outlet />
    } @else {
      <a class="skip-link" href="#conteudo">Saltar para o conteúdo</a>
      <doc-header (search)="openSearch()" />
      <div class="site-body">
        <router-outlet />
      </div>
      <doc-footer />
    }
  `,
})
export class App {
  private readonly dialog = inject(MxDialog);
  private searchOpen = false;
  /** Páginas de pré-visualização de blocos (/blocos/ver/...) não têm cabeçalho nem rodapé. */
  protected readonly bare = toSignal(
    inject(Router).events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => isBare(e.urlAfterRedirects)),
    ),
    { initialValue: isBare(location.pathname) },
  );

  protected onKeydown(event: KeyboardEvent): void {
    if (this.bare()) return;
    // um componente (ex.: o editor) pode usar Ctrl + K para si
    if (event.defaultPrevented) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }

  protected openSearch(): void {
    if (this.searchOpen) return;
    this.searchOpen = true;
    const ref = this.dialog.open(CommandPalette, { size: 'md', ariaLabel: 'Pesquisa' });
    ref.addPanelClass('mx-command-panel');
    ref.closed.subscribe(() => (this.searchOpen = false));
  }
}

function isBare(url: string): boolean {
  return url.startsWith('/blocos/ver/');
}
