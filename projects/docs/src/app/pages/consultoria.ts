import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxButton } from '@muxima-ui/core/button';
import { LINKS } from '../data/site';
import { Icon } from '../ui/icon';
import { Logo } from '../ui/logo';

@Component({
  selector: 'doc-consultoria',
  imports: [RouterLink, MxButton, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="conteudo" class="page-wide">
      <section class="hero consult-hero">
        <div class="hero-copy">
          <p class="eyebrow">Consultoria / Desenvolvimento</p>
          <h1 class="display">Da ideia à aplicação.<br /><span class="accent">Com confiança.</span></h1>
          <p class="hero-lead">Ajudamos equipas a desenhar interfaces, adoptar a Muxima UI e desenvolver aplicações Angular modernas e acessíveis.</p>
          <div class="hero-actions">
            <a mxButton size="lg" [href]="links.contact" target="_blank" rel="noopener">Solicitar proposta <doc-icon name="arrowRight" /></a>
            <a mxButton size="lg" variant="outline" routerLink="/componentes">Explorar componentes</a>
          </div>
        </div>
        <div class="card consult-art">
          <doc-logo [size]="200" class="accent" />
          <div class="consult-badge"><doc-icon name="check" /><div><strong>Design + Engenharia</strong><span>Experiências empresariais</span></div></div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Em que podemos ajudar?</h2>
        <div class="grid-4">
          <div class="card"><span class="icon-tile"><doc-icon name="box" /></span><h3>Implementação</h3><p>Integração da Muxima UI em projectos existentes.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="sliders" /></span><h3>Design de sistemas</h3><p>Componentes e tokens adaptados à marca.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="users" /></span><h3>Formação Angular</h3><p>Capacitação das equipas de desenvolvimento.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="shield" /></span><h3>Suporte técnico</h3><p>Revisão de código, desempenho e acessibilidade.</p></div>
        </div>
      </section>

      <section class="card row-card big">
        <div>
          <h2 class="display-sm">Conta-nos sobre o teu projecto.</h2>
          <p class="muted small">Uma conversa prática para avaliar objectivos, requisitos e próximos passos.</p>
        </div>
        <a mxButton size="lg" [href]="links.contact" target="_blank" rel="noopener">Marcar conversa <doc-icon name="arrowRight" /></a>
      </section>
    </main>
  `,
})
export class ConsultoriaPage {
  protected readonly links = LINKS;
}
