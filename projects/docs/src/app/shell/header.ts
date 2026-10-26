import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { MxButton } from '@muxima-ui/core/button';
import { TOP_NAV } from '../data/site';
import { Icon } from '../ui/icon';
import { Logo } from '../ui/logo';
import { ThemeService } from './theme.service';

@Component({
  selector: 'doc-header',
  imports: [RouterLink, RouterLinkActive, MxButton, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header">
      <div class="site-header-inner">
        <a routerLink="/" class="brand" aria-label="Muxima UI, página inicial">
          <doc-logo [size]="30" />
          <span class="brand-name">Muxima UI</span>
        </a>

        <nav class="top-nav" [class.open]="menuOpen()" aria-label="Principal" id="top-nav">
          @for (item of nav; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="active"
              ariaCurrentWhenActive="page"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              >{{ item.label }}</a
            >
          }
        </nav>

        <div class="header-actions">
          <button type="button" class="search-trigger" (click)="search.emit()" aria-keyshortcuts="Control+K">
            <doc-icon name="search" />
            <span>Pesquisar...</span>
            <kbd>Ctrl K</kbd>
          </button>
          <button
            mxButton
            variant="ghost"
            size="icon"
            type="button"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.mode() === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'"
          >
            <doc-icon [name]="theme.mode() === 'dark' ? 'moon' : 'sun'" />
          </button>
          <a mxButton routerLink="/docs/instalacao" class="start-button">
            Começar agora <doc-icon name="arrowRight" />
          </a>
          <button
            mxButton
            variant="ghost"
            size="icon"
            type="button"
            class="menu-button"
            aria-controls="top-nav"
            [attr.aria-expanded]="menuOpen()"
            [attr.aria-label]="menuOpen() ? 'Fechar menu' : 'Abrir menu'"
            (click)="menuOpen.set(!menuOpen())"
          >
            <doc-icon [name]="menuOpen() ? 'x' : 'menu'" />
          </button>
        </div>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly nav = TOP_NAV;
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);
  readonly search = output<void>();

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));
  }
}
