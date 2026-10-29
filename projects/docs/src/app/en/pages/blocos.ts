import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOCKS } from '../blocks/registry';
import { DOC_UI } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';

@Component({
  selector: 'doc-blocos',
  imports: [DOC_UI, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Docs', path: '/docs/introduction' }, { label: 'Blocks' }]"
        title="Blocks"
        lead="Page sections built with Muxima UI components: hero, pricing, product cards, cart, settings, comments, checkout and onboarding. See each one at full screen, tablet and phone widths, and copy the code into your project."
      />

      <h2 class="mx-visually-hidden">Block list</h2>
      <div class="grid-3">
        @for (b of blocks; track b.slug) {
          <a class="card card-link catalog-card" [routerLink]="'/blocks/' + b.slug">
            <span class="icon-tile"><doc-icon [name]="b.icon" /></span>
            <h3>{{ b.name }}</h3>
            <p>{{ b.description }}</p>
            <div class="card-foot">
              <span class="tag">{{ b.variants.length }} {{ b.variants.length === 1 ? 'variant' : 'variants' }}</span>
              <span class="text-link">See blocks →</span>
            </div>
          </a>
        }
      </div>

      <section class="stack">
        <h2>How to use</h2>
        <ol class="steps-list">
          <li>Install the library and import the <code>muxima.css</code>, as shown in <a class="text-link" routerLink="/docs/installation">Installation</a>.</li>
          <li>In each block, open <strong>Code</strong> and copy the three files (.ts, .html and .css) into a folder in your project.</li>
          <li>Use the component wherever you want (<code>&lt;app-hero-centered /&gt;</code>) and replace the texts, prices and data with your own.</li>
        </ol>
      </section>

      <doc-callout icon="shield"
        >Blocks are not part of the npm package: the code becomes yours and you change whatever you like. They use only
        library components and the <code>--mx-*</code> variables, so they follow your theme and
        dark mode, and meet the same accessibility standard.</doc-callout
      >
    </article>
  `,
})
export class BlocosPage {
  protected readonly blocks = BLOCKS;
}
