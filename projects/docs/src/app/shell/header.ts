import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { MxButton } from '@muxima-ui/core/button';
import { siteData } from '../data/site-data';
import { LangService } from './lang';
import { injectUiText } from './ui-text';
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
        <a [routerLink]="lang.prefix() || '/'" class="brand" [attr.aria-label]="t().home">
          <doc-logo [size]="30" />
          <span class="brand-name">Muxima UI</span>
        </a>

        <nav class="top-nav" [class.open]="menuOpen()" [attr.aria-label]="t().mainNav" id="top-nav">
          @for (item of nav(); track item.path) {
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
            <span>{{ t().search }}</span>
            <kbd>Ctrl K</kbd>
          </button>
          <button
            mxButton
            variant="ghost"
            icon
            type="button"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.mode() === 'dark' ? t().toLight : t().toDark"
          >
            <doc-icon [name]="theme.mode() === 'dark' ? 'moon' : 'sun'" />
          </button>
          <a
            class="lang-switch"
            [routerLink]="other().url"
            [attr.hreflang]="other().code"
            [attr.lang]="other().code"
            [attr.aria-label]="t().language + ': ' + other().name"
          >
            <doc-icon name="globe" [size]="16" />
            <span>{{ other().short }}</span>
          </a>
          <a mxButton [routerLink]="lang.lang() === 'pt' ? '/pt/docs/instalacao' : '/docs/installation'" class="start-button">
            {{ t().start }} <doc-icon name="arrowRight" />
          </a>
          <button
            mxButton
            variant="ghost"
            icon
            type="button"
            class="menu-button"
            aria-controls="top-nav"
            [attr.aria-expanded]="menuOpen()"
            [attr.aria-label]="menuOpen() ? t().closeMenu : t().openMenu"
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
  protected readonly lang = inject(LangService);
  protected readonly t = injectUiText();
  protected readonly nav = computed(() => siteData(this.lang.lang()).TOP_NAV);
  private readonly url = signal('');
  /** Ligação para a mesma página no outro idioma. */
  protected readonly other = computed(() => {
    this.url();
    const to = this.lang.lang() === 'pt' ? 'en' : 'pt';
    return {
      url: this.lang.switchUrl(to),
      code: to,
      name: this.t().langName[to],
      short: to === 'pt' ? 'PT' : 'EN',
    };
  });
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);
  readonly search = output<void>();

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => {
        this.menuOpen.set(false);
        this.url.set((e as NavigationEnd).urlAfterRedirects);
      });
  }
}
