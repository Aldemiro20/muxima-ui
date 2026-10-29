import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MX_CARD } from '@muxima-ui/core/card';
import { MxSkeleton } from '@muxima-ui/core/skeleton';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-skeleton-page',
  imports: [DOC_UI, MxSkeleton, MX_CARD, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Skeleton' }]"
        title="Skeleton"
        lead="Takes the place of content while it loads, with the same shape, so the page doesn't jump when the data arrives."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Skeleton example">
          <div class="person w-320" aria-busy="true">
            <div mxSkeleton shape="circle" class="sq-40"></div>
            <div class="stack-sm grow">
              <div mxSkeleton shape="text" class="w-60"></div>
              <div mxSkeleton shape="text" class="w-90"></div>
            </div>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxSkeleton } from '@muxima-ui/core/skeleton';" />
      </section>

      <section>
        <h2>States</h2>
        <p>Three shapes. Width and height come from your CSS, to match the content they replace.</p>
        <doc-states>
          <doc-state name="Text" note="shape=text, 0.8 em tall."><div mxSkeleton shape="text" class="w-90"></div></doc-state>
          <doc-state name="Circle" note="shape=circle"><div mxSkeleton shape="circle" class="sq-40"></div></doc-state>
          <doc-state name="Block" note="shape=block"><div mxSkeleton class="w-90 h-48"></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Loading a card">
            <div class="stack">
              <div><button mxButton type="button" variant="outline" size="sm" (click)="reload()">Reload</button></div>
              <span class="mx-visually-hidden" aria-live="polite">{{ loading() ? 'Loading summary' : 'Summary loaded' }}</span>
              <article mxCard [attr.aria-busy]="loading() || null">
                @if (loading()) {
                  <div mxCardHeader class="stack-sm">
                    <div mxSkeleton shape="text" class="w-60"></div>
                    <div mxSkeleton shape="text" class="w-90"></div>
                  </div>
                  <div mxCardContent><div mxSkeleton class="w-90 h-48"></div></div>
                } @else {
                  <header mxCardHeader>
                    <h3 mxCardTitle>Month summary</h3>
                    <p mxCardDescription>142 invoices, 9 pending.</p>
                  </header>
                  <div mxCardContent><strong class="big-number">18,4 M Kz</strong></div>
                }
              </article>
            </div>
          </doc-example>
          <doc-example title="List" note="Rows with avatar and text, shaped like the real list.">
            <ul class="member-list w-full" aria-busy="true" aria-label="Loading members">
              @for (i of [1, 2, 3]; track i) {
                <li>
                  <div mxSkeleton shape="circle" class="sq-32"></div>
                  <div class="stack-sm grow"><div mxSkeleton shape="text" class="w-60"></div><div mxSkeleton shape="text" class="w-40"></div></div>
                </li>
              }
            </ul>
          </doc-example>
          <doc-example title="Article">
            <div class="stack-sm w-full" aria-busy="true">
              <div mxSkeleton class="w-full h-120"></div>
              <div mxSkeleton shape="text" class="w-70 h-20"></div>
              <div mxSkeleton shape="text" class="w-full"></div>
              <div mxSkeleton shape="text" class="w-full"></div>
              <div mxSkeleton shape="text" class="w-60"></div>
            </div>
          </doc-example>
          <doc-example title="Indicators">
            <div class="grid-3 w-full" aria-busy="true">
              @for (i of [1, 2, 3]; track i) {
                <div class="mx-card"><div class="mx-card-content stack-sm"><div mxSkeleton shape="text" class="w-60"></div><div mxSkeleton class="w-40 h-28"></div></div></div>
              }
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Does not receive focus.' }]"
          [aria]="[
            'Each block has aria-hidden: screen readers do not read empty shapes.',
            'Mark the container with aria-busy=true while it loads.',
            'Announce the start and end of loading in an aria-live region.',
            'With reduced motion, the pulse stops.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>[mxSkeleton]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Progress' }, { name: 'Card' }, { name: 'Table' }]" />
      </section>
    </article>
  `,
})
export class SkeletonPage {
  protected readonly loading = signal(true);
  constructor() {
    setTimeout(() => this.loading.set(false), 1800);
  }
  protected reload(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1800);
  }

  protected readonly previewCode = `<div aria-busy="true">
  <div mxSkeleton shape="circle" style="width:40px;height:40px"></div>
  <div mxSkeleton shape="text" style="width:60%"></div>
  <div mxSkeleton shape="text" style="width:90%"></div>
</div>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'shape', type: "'block' | 'text' | 'circle'", default: 'block' },
    { kind: 'Token CSS', name: '--mx-subtle, --mx-stone', type: 'color', description: 'Pulse colors.' },
  ];
}
