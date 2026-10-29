import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOCKS } from '../blocks/registry';
import { BlockViewer } from '../../ui/block-viewer';
import { DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-bloco-categoria',
  imports: [DOC_UI, BlockViewer, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (block(); as b) {
      <article class="doc-page">
        <doc-page-header
          [crumbs]="[{ label: 'Blocks', path: '/blocks' }, { label: b.name }]"
          [title]="b.name"
          [lead]="b.description + ' Each variant is a standalone component: copy the .ts, the .html and the .css.'"
        />

        <div class="stack-xl">
          @for (v of b.variants; track v.id) {
            <doc-block-viewer [category]="b" [variant]="v" />
          }
        </div>

        <section>
          <h2>Other blocks</h2>
          <ul class="block-others">
            @for (o of others(); track o.slug) {
              <li><a class="text-link" [routerLink]="'/blocks/' + o.slug">{{ o.name }}</a></li>
            }
          </ul>
        </section>
      </article>
    } @else {
      <article class="doc-page">
        <doc-page-header [crumbs]="[{ label: 'Blocks', path: '/blocks' }]" title="Block not found" />
        <p><a class="text-link" routerLink="/blocks">See all blocks</a></p>
      </article>
    }
  `,
})
export class BlocoCategoriaPage {
  readonly category = input.required<string>();
  protected readonly block = computed(() => BLOCKS.find((b) => b.slug === this.category()));
  protected readonly others = computed(() => BLOCKS.filter((b) => b.slug !== this.category()));
}
