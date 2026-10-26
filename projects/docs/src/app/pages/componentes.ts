import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxInput } from '@muxima-ui/core/form-field';
import { CATALOG, CatalogCategory } from '../data/site';
import { DOC_UI } from '../ui/doc-ui';
import { Icon } from '../ui/icon';

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

@Component({
  selector: 'doc-componentes',
  imports: [DOC_UI, RouterLink, MxInput, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Documentação', path: '/docs/introducao' }, { label: 'Componentes' }]"
        title="Componentes"
        lead="Primitivos simples e ferramentas avançadas para produtos Angular. Cada componente segue o mesmo padrão visual e de documentação."
      />

      <div class="catalog-filters">
        <div class="search-field">
          <doc-icon name="search" />
          <input
            mxInput
            type="search"
            placeholder="Pesquisar por nome, função ou categoria..."
            aria-label="Pesquisar componentes"
            [value]="query()"
            (input)="query.set($any($event.target).value)"
          />
        </div>
        <div class="chips" role="group" aria-label="Filtrar por categoria">
          @for (c of categories; track c) {
            <button type="button" class="chip" [attr.aria-pressed]="category() === c" (click)="category.set(c)">{{ c }}</button>
          }
        </div>
      </div>

      <p class="mx-visually-hidden" aria-live="polite">{{ items().length }} componentes</p>

      <h2 class="mx-visually-hidden">Lista de componentes</h2>
      <div class="grid-3">
        @for (item of items(); track item.name) {
          @if (item.path) {
            <a class="card card-link catalog-card" [routerLink]="item.path">
              <span class="icon-tile"><doc-icon [name]="item.icon" /></span>
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="card-foot"><span class="tag">{{ item.tier }}</span><span class="text-link">Ver documentação →</span></div>
            </a>
          } @else {
            <div class="card catalog-card soon">
              <span class="icon-tile"><doc-icon [name]="item.icon" /></span>
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="card-foot">
                <span class="tag" [class.pro]="item.tier === 'Pro'">{{ item.tier }}</span>
                <span class="muted small">Em preparação</span>
              </div>
            </div>
          }
        } @empty {
          <p class="muted">Nenhum componente encontrado para "{{ query() }}".</p>
        }
      </div>

      <doc-callout icon="shield">Cada componente disponibiliza exemplos de utilização, instruções de teclado, atributos ARIA, API e tokens CSS.</doc-callout>
    </article>
  `,
})
export class ComponentesPage {
  protected readonly categories: ('Todos' | CatalogCategory)[] = ['Todos', 'Formulários', 'Dados', 'Navegação', 'Sobreposição'];
  protected readonly category = signal<'Todos' | CatalogCategory>('Todos');
  protected readonly query = signal('');
  protected readonly items = computed(() => {
    const q = norm(this.query().trim());
    return CATALOG.filter(
      (i) =>
        (this.category() === 'Todos' || i.category === this.category()) &&
        (!q || norm(`${i.name} ${i.description} ${i.category}`).includes(q)),
    );
  });
}
