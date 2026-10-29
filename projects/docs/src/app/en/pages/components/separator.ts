import { MxButton } from '@muxima-ui/core/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxSeparator } from '@muxima-ui/core/separator';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-separator-page',
  imports: [DOC_UI, MxSeparator, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Separator' }]"
        title="Separator"
        lead="A 1 px line to separate groups of content, horizontally or vertically. On hr it uses the native semantics."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Separator example" align="start">
          <div class="sep-demo">
            <p><strong>Muxima UI</strong></p>
            <p class="muted">Accessible Angular components.</p>
            <hr mxSeparator />
            <div class="row-inline">
              <span>Docs</span>
              <div mxSeparator orientation="vertical" decorative></div>
              <span>Components</span>
              <div mxSeparator orientation="vertical" decorative></div>
              <span>Changelog</span>
            </div>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxSeparator } from '@muxima-ui/core/separator';" />
      </section>

      <section>
        <h2>States</h2>
        <p>Not interactive. It varies in orientation and in being semantic or decorative.</p>
        <doc-states>
          <doc-state name="Horizontal" note="native hr"><hr mxSeparator /></doc-state>
          <doc-state name="Vertical" note="role=separator"><div class="row-inline"><span>A</span><div mxSeparator orientation="vertical"></div><span>B</span></div></doc-state>
          <doc-state name="Decorative" note="Hidden from screen readers."><div class="row-inline"><span>A</span><div mxSeparator orientation="vertical" decorative></div><span>B</span></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Between sections of a panel">
            <div class="sep-panel w-full">
              <div><strong>Subtotal</strong><span>$1,250.00</span></div>
              <div><strong>VAT (14%)</strong><span>$175.00</span></div>
              <hr mxSeparator />
              <div><strong>Total</strong><strong>$1,425.00</strong></div>
            </div>
          </doc-example>
          <doc-example title="Vertical in a toolbar" note="decorative between buttons: screen readers don't announce the line.">
            <div class="toolbar-demo" role="toolbar" aria-label="Editing">
              <button mxButton type="button" variant="ghost" size="sm">Undo</button>
              <button mxButton type="button" variant="ghost" size="sm">Redo</button>
              <div mxSeparator orientation="vertical" decorative></div>
              <button mxButton type="button" variant="ghost" size="sm">Copy</button>
              <button mxButton type="button" variant="ghost" size="sm">Paste</button>
            </div>
          </doc-example>
          <doc-example title="With text" note="Two decorative separators with text in the middle.">
            <div class="stack w-full">
              <button mxButton type="button" variant="outline" class="w-full">Sign in with your company account</button>
              <div class="sep-text"><div mxSeparator decorative></div><span>or</span><div mxSeparator decorative></div></div>
              <button mxButton type="button" class="w-full">Sign in with email</button>
            </div>
          </doc-example>
          <doc-example title="In a list">
            <ul class="sep-list w-full">
              <li>Kianda Logistics</li>
              <li><hr mxSeparator /></li>
              <li>Banco Mutamba</li>
              <li><hr mxSeparator /></li>
              <li>Huíla Agro</li>
            </ul>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Does not receive focus.' }]"
          [aria]="[
            'On hr, screen readers announce a separator with no extra attributes.',
            'On other elements it gets role=separator, and aria-orientation when vertical.',
            'Use decorative when the line is only visual, such as between menu links.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>[mxSeparator]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Card' }, { name: 'Dropdown menu' }, { name: 'Breadcrumb' }]" />
      </section>
    </article>
  `,
})
export class SeparatorPage {
  protected readonly previewCode = `<hr mxSeparator />
<div mxSeparator orientation="vertical" decorative></div>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal' },
    { kind: 'Input', name: 'decorative', type: 'boolean', default: 'false', description: 'Hides it from screen readers.' },
    { kind: 'Token CSS', name: '--mx-stone', type: 'color', description: 'Line color.' },
  ];
}
