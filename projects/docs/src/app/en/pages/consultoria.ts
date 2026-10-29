import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxButton } from '@muxima-ui/core/button';
import { LINKS } from '../data/site';
import { Icon } from '../../ui/icon';
import { Logo } from '../../ui/logo';

@Component({
  selector: 'doc-consultoria',
  imports: [RouterLink, MxButton, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="conteudo" class="page-wide">
      <section class="hero consult-hero">
        <div class="hero-copy">
          <p class="eyebrow">Consulting / Development</p>
          <h1 class="display">From idea to application.<br /><span class="accent">With confidence.</span></h1>
          <p class="hero-lead">We help teams design interfaces, adopt Muxima UI and build modern, accessible Angular applications.</p>
          <div class="hero-actions">
            <a mxButton size="lg" [href]="links.contact" target="_blank" rel="noopener">Request a proposal <doc-icon name="arrowRight" /></a>
            <a mxButton size="lg" variant="outline" routerLink="/components">Explore components</a>
          </div>
        </div>
        <div class="card consult-art">
          <doc-logo [size]="200" class="accent" />
          <div class="consult-badge"><doc-icon name="check" /><div><strong>Design + Engineering</strong><span>Business experiences</span></div></div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">How can we help?</h2>
        <div class="grid-4">
          <div class="card"><span class="icon-tile"><doc-icon name="box" /></span><h3>Implementation</h3><p>Integrating Muxima UI into existing projects.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="sliders" /></span><h3>Design systems</h3><p>Components and tokens adapted to your brand.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="users" /></span><h3>Angular training</h3><p>Upskilling development teams.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="shield" /></span><h3>Technical support</h3><p>Code, performance and accessibility reviews.</p></div>
        </div>
      </section>

      <section class="card row-card big">
        <div>
          <h2 class="display-sm">Tell us about your project.</h2>
          <p class="muted small">A practical conversation to assess goals, requirements and next steps.</p>
        </div>
        <a mxButton size="lg" [href]="links.contact" target="_blank" rel="noopener">Book a call <doc-icon name="arrowRight" /></a>
      </section>
    </main>
  `,
})
export class ConsultoriaPage {
  protected readonly links = LINKS;
}
