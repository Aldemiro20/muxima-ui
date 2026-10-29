import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LINKS } from '../data/site';
import { LangService } from './lang';
import { injectUiText } from './ui-text';
import { Logo } from '../ui/logo';

@Component({
  selector: 'doc-footer',
  imports: [RouterLink, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <div class="footer-brand">
          <doc-logo [size]="22" />
          <strong>Muxima UI</strong>
          <span>{{ t().footerTagline }}</span>
          <span class="footer-author">{{ t().footerAuthor }} <a [href]="links.author" target="_blank" rel="noopener author">Aldemiro Valentim</a></span>
        </div>
        <nav class="footer-links" [attr.aria-label]="t().footerNav">
          <a [routerLink]="lang.prefix() + '/changelog'">Changelog</a>
          <a [href]="links.demos" target="_blank" rel="noopener">{{ t().templateDemos }}</a>
          <a [href]="links.repo" target="_blank" rel="noopener">GitHub</a>
          <a routerLink="/" hreflang="en" lang="en">English</a>
          <a routerLink="/pt" hreflang="pt" lang="pt">Português</a>
        </nav>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly links = LINKS;
  protected readonly lang = inject(LangService);
  protected readonly t = injectUiText();
}
