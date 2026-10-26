import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LINKS } from '../data/site';
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
          <span>· Componentes Angular com coração angolano.</span>
        </div>
        <nav class="footer-links" aria-label="Rodapé">
          <a routerLink="/changelog">Changelog</a>
          <a [href]="links.repo" target="_blank" rel="noopener">GitHub</a>
          <span>Documentação em português · Inglês em preparação</span>
        </nav>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly links = LINKS;
}
