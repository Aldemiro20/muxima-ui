import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { ThemeService } from '../../shell/theme.service';
import { DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-modo-escuro',
  imports: [DOC_UI, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Get started' }, { label: 'Dark mode' }]"
        title="Dark mode"
        lead="Dark mode swaps paper and ink and lightens the brand color to keep the contrast. The components need no changes."
      />

      <section>
        <h2>Try it</h2>
        <div class="card row-card">
          <span>Current mode: <strong>{{ theme.mode() === 'dark' ? 'Dark' : 'Light' }}</strong></span>
          <button mxButton type="button" variant="outline" (click)="theme.toggle()">Toggle mode</button>
        </div>
      </section>

      <section>
        <h2>How it works</h2>
        <p>By default, Muxima follows the operating system preference. To force a mode, set <code>data-theme</code> on the <code>html</code> element:</p>
        <doc-code [code]="html" />
        <p>You can also apply the mode to just part of the page, with the same attribute on a container:</p>
        <doc-code [code]="scoped" />
      </section>

      <section>
        <h2>Avoid the "flash" on load</h2>
        <p>If you save the user's choice, apply it before the first paint, in a short script in index.html:</p>
        <doc-code [code]="script" />
      </section>
    </article>
  `,
})
export class ModoEscuroPage {
  protected readonly theme = inject(ThemeService);
  protected readonly html = `<html data-theme="dark">   <!-- or "light" -->`;
  protected readonly scoped = `<section data-theme="dark">
  <button mxButton>Only this part is dark</button>
</section>`;
  protected readonly script = `<script>
  try {
    const t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  } catch {}
</script>`;
}
