import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    <a class="skip-link" href="#conteudo">Saltar para o conteúdo</a>
    <doc-header (search)="openSearch()" />
    <div class="site-body">
      <router-outlet />
    </div>
    <doc-footer />
  `,
})
export class App {
  private readonly dialog = inject(MxDialog);
  private searchOpen = false;

  protected onKeydown(event: KeyboardEvent): void {
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
