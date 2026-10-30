import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxButton } from '@muxima-ui/core/button';
import { LINKS } from '../data/site';
import { Icon } from '../../ui/icon';

@Component({
  selector: 'doc-precos',
  imports: [RouterLink, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="conteudo" class="page-wide narrow-center">
      <header class="center-head">
        <p class="eyebrow">Pricing / Licenses</p>
        <h1 class="display">Start for free.<br /><span class="accent">Grow without limits.</span></h1>
        <p class="page-lead">The Core library is free. Optional templates and services help speed up projects and teams.</p>
      </header>

      <div class="plans">
        <section class="card plan" aria-labelledby="p-free">
          <h2 id="p-free" class="plan-name">Open Source</h2>
          <p class="plan-price">Free</p>
          <p class="muted small">For those who want to build without barriers.</p>
          <ul class="checks">
            <li><doc-icon name="check" /> Every Core component</li>
            <li><doc-icon name="check" /> MIT license</li>
            <li><doc-icon name="check" /> Docs in English and Portuguese</li>
            <li><doc-icon name="check" /> Commercial use</li>
            <li><doc-icon name="check" /> Open community</li>
          </ul>
          <a mxButton routerLink="/components" class="plan-cta">Explore components <doc-icon name="arrowRight" /></a>
        </section>

        <section class="card plan featured" aria-labelledby="p-pro">
          <div class="plan-head"><h2 id="p-pro" class="plan-name">Pro</h2><span class="tag accent">Most flexible</span></div>
          <p class="plan-price accent">$49–$199</p>
          <p class="muted small">Templates and tools to ship faster.</p>
          <ul class="checks">
            <li><doc-icon name="check" /> Everything in Core</li>
            <li><doc-icon name="check" /> Business templates</li>
            <li><doc-icon name="check" /> Advanced components</li>
            <li><doc-icon name="check" /> Template source code</li>
            <li><doc-icon name="check" /> One year of updates</li>
          </ul>
          <a mxButton routerLink="/templates" class="plan-cta accent-button">Explore templates <doc-icon name="arrowRight" /></a>
        </section>

        <section class="card plan" aria-labelledby="p-ent">
          <h2 id="p-ent" class="plan-name">Enterprise</h2>
          <p class="plan-price">By proposal</p>
          <p class="muted small">Tailored support for teams and organizations.</p>
          <ul class="checks">
            <li><doc-icon name="check" /> Everything in Pro</li>
            <li><doc-icon name="check" /> Integration into existing projects</li>
            <li><doc-icon name="check" /> Visual customization</li>
            <li><doc-icon name="check" /> Training</li>
            <li><doc-icon name="check" /> Contracted support</li>
          </ul>
          <a mxButton variant="outline" [href]="links.contact + '?subject=Muxima%20UI%3A%20Enterprise'" class="plan-cta">Request a proposal <doc-icon name="arrowRight" /></a>
        </section>
      </div>

      <section class="card row-card">
        <div>
          <h2 class="card-title">Need a custom plan?</h2>
          <p class="muted small">Talk to the team about integration, consulting or licensing.</p>
        </div>
        <a mxButton variant="outline" routerLink="/consulting">Contact the team <doc-icon name="arrowRight" /></a>
      </section>

      <p class="fineprint">Illustrative values for commercial validation. Final terms will be published before sales start.</p>
    </main>
  `,
})
export class PrecosPage {
  protected readonly links = LINKS;
}
