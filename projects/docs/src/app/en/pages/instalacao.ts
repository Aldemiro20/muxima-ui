import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-instalacao',
  imports: [DOC_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Get started' }, { label: 'Installation' }]"
        title="Installation"
        lead="Three steps: install the package, import the styles and use your first component. Requires Angular 21 or later."
      />

      <section>
        <h2>1. Install</h2>
        <doc-code code="npm install @muxima-ui/core @angular/cdk" />
        <p class="muted">&#64;angular/cdk handles the floating layers and the focus in dialogs and lists.</p>
      </section>

      <section>
        <h2>2. Import the styles</h2>
        <p>Add the stylesheet to <code>angular.json</code>, in <code>styles</code>:</p>
        <doc-code [code]="stylesJson" />
        <p>Or import it in your <code>styles.css</code>:</p>
        <doc-code code="@import '@muxima-ui/core/styles.css';" />
        <p class="muted">The library uses the Instrument Sans and IBM Plex Mono fonts when they are available, and falls back to the system fonts. To include them: <code>npm install &#64;fontsource/instrument-sans &#64;fontsource/ibm-plex-mono</code>.</p>
      </section>

      <section>
        <h2>3. Use a component</h2>
        <doc-code [code]="usage" />
      </section>

      <section>
        <h2>Requirements</h2>
        <ul class="plain-list">
          <li>Angular 21 or 22 (standalone, signals).</li>
          <li>&#64;angular/cdk at the same version as Angular.</li>
          <li>Current browsers: the last two versions of Chrome, Edge, Firefox and Safari.</li>
        </ul>
      </section>
    </article>
  `,
})
export class InstalacaoPage {
  protected readonly stylesJson = `"styles": [
  "node_modules/@muxima-ui/core/styles/muxima.css",
  "src/styles.css"
]`;
  protected readonly usage = `import { Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';

@Component({
  selector: 'app-root',
  imports: [MxButton],
  template: \`<button mxButton type="button">Hello, Muxima</button>\`,
})
export class App {}`;
}
