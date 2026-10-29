import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DOC_UI } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';
import { Logo } from '../../ui/logo';

@Component({
  selector: 'doc-introducao',
  imports: [DOC_UI, RouterLink, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Get started' }, { label: 'Introduction' }]"
        eyebrow="Docs / Introduction"
        title="Build with confidence."
        lead="Muxima UI is an Angular component library made for clear, accessible interfaces, ready for business applications."
      />

      <h2 class="mx-visually-hidden">Guides</h2>
      <div class="grid-3">
        @for (c of cards; track c.title) {
          <a class="card card-link" [routerLink]="c.path">
            <span class="icon-tile"><doc-icon [name]="c.icon" /></span>
            <h3>{{ c.title }}</h3>
            <p>{{ c.text }}</p>
            <span class="text-link">Open guide →</span>
          </a>
        }
      </div>

      <section>
        <h2>Quick install</h2>
        <p>Start with the main package and import the stylesheet once.</p>
        <doc-code code="npm install @muxima-ui/core @angular/cdk" />
      </section>

      <section>
        <h2>Library principles</h2>
        <div class="grid-3">
          <div class="card"><span class="icon-tile"><doc-icon name="layers" /></span><h3>Simplicity</h3><p>Ink, paper and a single brand color.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="sliders" /></span><h3>Consistency</h3><p>Predictable heights, radii and focus states.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="shield" /></span><h3>Identity</h3><p>Angolan inspiration without excess decoration.</p></div>
        </div>
      </section>

      <div class="card note-card">
        <doc-logo [size]="44" class="accent" />
        <div>
          <strong>Documentation in English and Portuguese</strong>
          <p class="muted">Every page has a Portuguese version. Use the language switch at the top.</p>
        </div>
      </div>
    </article>
  `,
})
export class IntroducaoPage {
  protected readonly cards = [
    { title: 'Installation', text: 'Install the library and import your first component.', icon: 'terminal', path: '/docs/installation' },
    { title: 'Theming', text: 'Customize the brand color and the control radius.', icon: 'sliders', path: '/docs/theming' },
    { title: 'Components', text: 'Previews, examples and API reference.', icon: 'grid', path: '/components' },
    { title: 'Dark mode', text: 'Swaps paper and ink, keeping the tokens.', icon: 'moon', path: '/docs/dark-mode' },
    { title: 'Accessibility', text: 'Keyboard, focus and ARIA in every component.', icon: 'shield', path: '/components/button' },
    { title: 'Blocks', text: 'Ready-to-copy sections: hero, pricing, cart, checkout.', icon: 'layers', path: '/blocks' },
  ];
}
