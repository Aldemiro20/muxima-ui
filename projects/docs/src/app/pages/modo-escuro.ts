import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { ThemeService } from '../shell/theme.service';
import { DOC_UI } from '../ui/doc-ui';

@Component({
  selector: 'doc-modo-escuro',
  imports: [DOC_UI, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Começar' }, { label: 'Modo escuro' }]"
        title="Modo escuro"
        lead="O modo escuro inverte papel e tinta e clareia a cor de marca para manter o contraste. Os componentes não precisam de nenhuma alteração."
      />

      <section>
        <h2>Experimenta</h2>
        <div class="card row-card">
          <span>Modo actual: <strong>{{ theme.mode() === 'dark' ? 'Escuro' : 'Claro' }}</strong></span>
          <button mxButton type="button" variant="outline" (click)="theme.toggle()">Alternar modo</button>
        </div>
      </section>

      <section>
        <h2>Como funciona</h2>
        <p>Por omissão, a Muxima segue a preferência do sistema operativo. Para forçar um modo, define <code>data-theme</code> no elemento <code>html</code>:</p>
        <doc-code [code]="html" />
        <p>Também podes aplicar o modo só a uma parte da página, com o mesmo atributo num contentor:</p>
        <doc-code [code]="scoped" />
      </section>

      <section>
        <h2>Evitar o "flash" ao carregar</h2>
        <p>Se guardas a escolha do utilizador, aplica-a antes da primeira pintura, num script curto no index.html:</p>
        <doc-code [code]="script" />
      </section>
    </article>
  `,
})
export class ModoEscuroPage {
  protected readonly theme = inject(ThemeService);
  protected readonly html = `<html data-theme="dark">   <!-- ou "light" -->`;
  protected readonly scoped = `<section data-theme="dark">
  <button mxButton>Fica escuro só aqui</button>
</section>`;
  protected readonly script = `<script>
  try {
    const t = localStorage.getItem('tema');
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  } catch {}
</script>`;
}
