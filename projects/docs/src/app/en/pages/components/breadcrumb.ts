import { Icon } from '../../../ui/icon';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxButton } from '@muxima-ui/core/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxBreadcrumb } from '@muxima-ui/core/breadcrumb';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-breadcrumb-page',
  imports: [DOC_UI, MxBreadcrumb, RouterLink, MxButton, MX_MENU, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Breadcrumb' }]"
        title="Breadcrumb"
        lead="Shows where the page sits in the hierarchy and lets you go up a level. It's a nav with an ordered list; the separators are drawn in CSS."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Breadcrumb example">
          <nav mxBreadcrumb aria-label="Breadcrumb example">
            <ol>
              <li><a routerLink="/components">Customers</a></li>
              <li><a routerLink="/components">Kianda Logistics</a></li>
              <li><span aria-current="page">Invoices</span></li>
            </ol>
          </nav>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxBreadcrumb } from '@muxima-ui/core/breadcrumb';" />
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Link"><nav mxBreadcrumb aria-label="Link"><ol><li><a href="#">Customers</a></li></ol></nav></doc-state>
          <doc-state name="Hover"><nav mxBreadcrumb aria-label="Hover"><ol><li><a href="#" data-mx-state="hover">Customers</a></li></ol></nav></doc-state>
          <doc-state name="Focus"><nav mxBreadcrumb aria-label="Focus"><ol><li><a href="#" data-mx-state="focus">Customers</a></li></ol></nav></doc-state>
          <doc-state name="Current page" note="aria-current=page"><nav mxBreadcrumb aria-label="Current"><ol><li><span aria-current="page">Invoices</span></li></ol></nav></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="With a home icon" note="The icon has hidden text: Home.">
            <nav mxBreadcrumb aria-label="Breadcrumb with icon">
              <ol>
                <li><a routerLink="/"><doc-icon name="grid" [size]="14" /><span class="mx-visually-hidden">Home</span></a></li>
                <li><a routerLink="/components">Customers</a></li>
                <li><span aria-current="page">Kianda Logistics</span></li>
              </ol>
            </nav>
          </doc-example>
          <doc-example title="Long path, collapsed" note="The middle levels go into a menu, to fit on narrow screens.">
            <nav mxBreadcrumb aria-label="Collapsed breadcrumb">
              <ol>
                <li><a routerLink="/">Home</a></li>
                <li>
                  <button type="button" class="crumb-more" aria-label="Show hidden levels" [mxMenuTriggerFor]="levels">…</button>
                  <ng-template #levels>
                    <div mxMenu>
                      <a mxMenuItem routerLink="/components">Customers</a>
                      <a mxMenuItem routerLink="/components">Companies</a>
                      <a mxMenuItem routerLink="/components">Kianda Logistics</a>
                    </div>
                  </ng-template>
                </li>
                <li><a routerLink="/components">Invoices</a></li>
                <li><span aria-current="page">FT 2026/0142</span></li>
              </ol>
            </nav>
          </doc-example>
          <doc-example title="In a page header">
            <div class="page-head-demo w-full">
              <nav mxBreadcrumb aria-label="Page breadcrumb">
                <ol>
                  <li><a routerLink="/">Home</a></li>
                  <li><a routerLink="/components">Invoices</a></li>
                  <li><span aria-current="page">New invoice</span></li>
                </ol>
              </nav>
              <div class="row-between"><h3>New invoice</h3><button mxButton type="button" size="sm">Issue</button></div>
            </div>
          </doc-example>
          <doc-example title="Back only, on phones" note="On narrow screens it shows only the level above.">
            <nav mxBreadcrumb aria-label="Back">
              <ol>
                <li><a routerLink="/components" class="crumb-back"><doc-icon name="chevronRight" [size]="14" class="flip" /> Invoices</a></li>
              </ol>
            </nav>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Moves through the links; the current page is not a link.' }]"
          [aria]="[
            'nav named Breadcrumb (change it with aria-label if there are several on the page).',
            'Ordered list: screen readers say how many levels there are.',
            'The last level has aria-current=page.',
            'The separators are CSS and are not read.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>nav[mxBreadcrumb]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Tabs' }, { name: 'Pagination' }, { name: 'Separator' }]" />
      </section>
    </article>
  `,
})
export class BreadcrumbPage {
  protected readonly previewCode = `<nav mxBreadcrumb>
  <ol>
    <li><a routerLink="/customers">Customers</a></li>
    <li><a routerLink="/customers/42">Kianda Logistics</a></li>
    <li><span aria-current="page">Invoices</span></li>
  </ol>
</nav>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'aria-label', type: 'string', default: 'Breadcrumb', description: 'Navigation name.' },
    { kind: 'Token CSS', name: '--mx-muted', type: 'color', description: 'Link color.' },
    { kind: 'Token CSS', name: '--mx-stone-strong', type: 'color', description: 'Separator color.' },
  ];
}
