import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOCKS } from '../blocks/registry';
import { BlockViewer } from '../ui/block-viewer';
import { DOC_UI } from '../ui/doc-ui';

@Component({
  selector: 'doc-bloco-categoria',
  imports: [DOC_UI, BlockViewer, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (block(); as b) {
      <article class="doc-page">
        <doc-page-header
          [crumbs]="[{ label: 'Blocos', path: '/blocos' }, { label: b.name }]"
          [title]="b.name"
          [lead]="b.description + ' Cada variante é um componente standalone: copia o .ts, o .html e o .css.'"
        />

        <div class="stack-xl">
          @for (v of b.variants; track v.id) {
            <doc-block-viewer [category]="b" [variant]="v" />
          }
        </div>

        <section>
          <h2>Outros blocos</h2>
          <ul class="block-others">
            @for (o of others(); track o.slug) {
              <li><a class="text-link" [routerLink]="'/blocos/' + o.slug">{{ o.name }}</a></li>
            }
          </ul>
        </section>
      </article>
    } @else {
      <article class="doc-page">
        <doc-page-header [crumbs]="[{ label: 'Blocos', path: '/blocos' }]" title="Bloco não encontrado" />
        <p><a class="text-link" routerLink="/blocos">Ver todos os blocos</a></p>
      </article>
    }
  `,
})
export class BlocoCategoriaPage {
  readonly categoria = input.required<string>();
  protected readonly block = computed(() => BLOCKS.find((b) => b.slug === this.categoria()));
  protected readonly others = computed(() => BLOCKS.filter((b) => b.slug !== this.categoria()));
}
