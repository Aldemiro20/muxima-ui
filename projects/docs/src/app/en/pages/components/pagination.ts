import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxPagination } from '@muxima-ui/core/pagination';
import { MX_TABLE } from '@muxima-ui/core/table';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

const CUSTOMERS = Array.from({ length: 47 }, (_, i) => ({ id: i + 1, name: `Customer ${String(i + 1).padStart(2, '0')}` }));

@Component({
  selector: 'doc-pagination-page',
  imports: [DOC_UI, MxPagination, MX_TABLE],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Pagination' }]"
        title="Pagination"
        lead="Navigation between pages of results, with the current page marked and ellipses when there are many pages."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Pagination example">
          <mx-pagination [(page)]="page" [total]="236" [pageSize]="20" />
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxPagination } from '@muxima-ui/core/pagination';" />
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Default"><span class="mx-pagination-button">4</span></doc-state>
          <doc-state name="Hover"><span class="mx-pagination-button" data-mx-state="hover">4</span></doc-state>
          <doc-state name="Focus"><span class="mx-pagination-button" data-mx-state="focus">4</span></doc-state>
          <doc-state name="Current" note="aria-current=page"><span class="mx-pagination-button" aria-current="page">4</span></doc-state>
          <doc-state name="Disabled" note="Previous on the first page."><button type="button" class="mx-pagination-button" disabled>Previous</button></doc-state>
          <doc-state name="Single page" note="Previous and next disabled."><mx-pagination [total]="8" [pageSize]="10" aria-label="One page" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="With a table" note="Announces the page change in an aria-live region.">
            <div class="stack w-full">
              <div class="mx-table-container">
                <table mxTable density="compact">
                  <caption>Customers {{ from() }} to {{ to() }} of 47</caption>
                  <thead><tr><th scope="col">N.º</th><th scope="col">Name</th></tr></thead>
                  <tbody>
                    @for (c of rows(); track c.id) {
                      <tr><td>{{ c.id }}</td><td>{{ c.name }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
              <span class="mx-visually-hidden" aria-live="polite">Page {{ tablePage() }}, customers {{ from() }} to {{ to() }}</span>
              <mx-pagination [(page)]="tablePage" [total]="47" [pageSize]="5" aria-label="Customer pages" />
            </div>
          </doc-example>
          <doc-example title="Simple" note="variant=&quot;simple&quot;: Previous, Page X of Y, Next.">
            <mx-pagination variant="simple" [(page)]="page3" [total]="120" [pageSize]="10" aria-label="Simple example" />
          </doc-example>
          <doc-example title="Compact" note="variant=&quot;compact&quot;: first, previous, next and last, icons only.">
            <mx-pagination variant="compact" [(page)]="page3" [total]="120" [pageSize]="10" aria-label="Compact example" />
          </doc-example>
          <doc-example title="Rows per page and range" note="pageSizeOptions and showRange; [(pageSize)] returns the choice.">
            <mx-pagination class="w-full" [(page)]="page4" [(pageSize)]="size4" [pageSizeOptions]="[10, 25, 50]" showRange [total]="236" aria-label="Example with rows per page" />
          </doc-example>
          <doc-example title="More pages around" note="siblings=2">
            <mx-pagination [(page)]="page2" [total]="500" [pageSize]="10" [siblings]="2" aria-label="Example with more pages" />
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Moves through previous, pages and next.' }, { key: 'Enter Space', action: 'Goes to the page.' }]"
          [aria]="[
            'nav named Pagination; change it with aria-label when there are several.',
            'Each button says Page N; the current one has aria-current=page.',
            'The ellipses are not read.',
            'After changing page, move the focus or announce the new content.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>mx-pagination</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Table' }, { name: 'Breadcrumb' }, { name: 'Select' }]" />
      </section>
    </article>
  `,
})
export class PaginationPage {
  protected readonly page = signal(3);
  protected readonly page2 = signal(25);
  protected readonly page3 = signal(4);
  protected readonly page4 = signal(2);
  protected readonly size4 = signal(25);
  protected readonly tablePage = signal(1);
  protected readonly from = computed(() => (this.tablePage() - 1) * 5 + 1);
  protected readonly to = computed(() => Math.min(this.tablePage() * 5, 47));
  protected readonly rows = computed(() => CUSTOMERS.slice(this.from() - 1, this.to()));

  protected readonly previewCode = `<mx-pagination [(page)]="page" [total]="236" [pageSize]="20" />`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'page', type: 'number (model)', default: '1', description: 'Current page, starting at 1.' },
    { kind: 'Input', name: 'total', type: 'number', description: 'Required. Number of items.' },
    { kind: 'Input', name: 'pageSize', type: 'number (model)', default: '10', description: 'Accepts [(pageSize)].' },
    { kind: 'Input', name: 'variant', type: "'default' | 'simple' | 'compact'", default: 'default', description: 'Numbers; Page X of Y; icons only.' },
    { kind: 'Input', name: 'pageSizeOptions', type: 'number[]', default: '[]', description: 'Shows the Rows per page choice.' },
    { kind: 'Input', name: 'showRange', type: 'boolean', default: 'false', description: 'Shows 21–40 of 236.' },
    { kind: 'Input', name: 'siblings', type: 'number', default: '1', description: 'Pages on each side of the current one.' },
    { kind: 'Input', name: 'aria-label', type: 'string', default: 'Pagination' },
  ];
}
