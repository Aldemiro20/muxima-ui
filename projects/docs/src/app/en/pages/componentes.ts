import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxInput } from '@muxima-ui/core/form-field';
import { CATALOG, CATEGORIES, CatalogCategory } from '../data/site';
import { DOC_UI } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

@Component({
  selector: 'doc-componentes',
  imports: [DOC_UI, RouterLink, MxInput, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Docs', path: '/docs/introduction' }, { label: 'Components' }]"
        title="Components"
        lead="Simple primitives and advanced tools for Angular products. Every component follows the same visual and documentation pattern."
      />

      <div class="catalog-filters">
        <div class="search-field">
          <doc-icon name="search" />
          <input
            mxInput
            type="search"
            placeholder="Search by name, purpose or category..."
            aria-label="Search components"
            [value]="query()"
            (input)="query.set($any($event.target).value)"
          />
        </div>
        <div class="chips" role="group" aria-label="Filter by category">
          @for (c of categories; track c) {
            <button type="button" class="chip" [attr.aria-pressed]="category() === c" (click)="category.set(c)">{{ c }}</button>
          }
        </div>
      </div>

      <p class="mx-visually-hidden" aria-live="polite">{{ items().length }} components</p>

      <h2 class="mx-visually-hidden">Component list</h2>
      <div class="grid-3">
        @for (item of items(); track item.name) {
          @if (item.path) {
            <a class="card card-link catalog-card" [routerLink]="item.path">
              <span class="icon-tile"><doc-icon [name]="item.icon" /></span>
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="card-foot"><span class="tag">{{ item.tier }}</span><span class="text-link">See documentation →</span></div>
            </a>
          } @else {
            <div class="card catalog-card soon">
              <span class="icon-tile"><doc-icon [name]="item.icon" /></span>
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="card-foot">
                <span class="tag" [class.pro]="item.tier === 'Pro'">{{ item.tier }}</span>
                <span class="muted small">Coming in {{ item.soon }}</span>
              </div>
            </div>
          }
        } @empty {
          <p class="muted">No component found for "{{ query() }}".</p>
        }
      </div>

      <doc-callout icon="shield">Every component comes with usage examples, keyboard instructions, ARIA attributes, API and CSS tokens.</doc-callout>
    </article>
  `,
})
export class ComponentesPage {
  protected readonly categories: ('All' | CatalogCategory)[] = ['All', ...CATEGORIES];
  protected readonly category = signal<'All' | CatalogCategory>('All');
  protected readonly query = signal('');
  protected readonly items = computed(() => {
    const q = norm(this.query().trim());
    return CATALOG.filter(
      (i) =>
        (this.category() === 'All' || i.category === this.category()) &&
        (!q || norm(`${i.name} ${i.description} ${i.category}`).includes(q)),
    );
  });
}
