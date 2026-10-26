import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DOC_UI } from '../ui/doc-ui';

@Component({
  selector: 'doc-instalacao',
  imports: [DOC_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Começar' }, { label: 'Instalação' }]"
        title="Instalação"
        lead="Três passos: instalar o pacote, importar os estilos e usar o primeiro componente. Requer Angular 21 ou superior."
      />

      <section>
        <h2>1. Instalar</h2>
        <doc-code code="npm install @muxima-ui/core @angular/cdk" />
        <p class="muted">O &#64;angular/cdk trata das camadas flutuantes e do foco nos diálogos e listas.</p>
      </section>

      <section>
        <h2>2. Importar os estilos</h2>
        <p>Acrescenta a folha de estilos em <code>angular.json</code>, em <code>styles</code>:</p>
        <doc-code [code]="stylesJson" />
        <p>Ou importa-a no teu <code>styles.css</code>:</p>
        <doc-code code="@import '@muxima-ui/core/styles.css';" />
        <p class="muted">A biblioteca usa as fontes Instrument Sans e IBM Plex Mono, se estiverem disponíveis, e cai para as fontes do sistema. Para as incluir: <code>npm install &#64;fontsource/instrument-sans &#64;fontsource/ibm-plex-mono</code>.</p>
      </section>

      <section>
        <h2>3. Usar um componente</h2>
        <doc-code [code]="usage" />
      </section>

      <section>
        <h2>Requisitos</h2>
        <ul class="plain-list">
          <li>Angular 21 ou 22 (standalone, signals).</li>
          <li>&#64;angular/cdk na mesma versão do Angular.</li>
          <li>Browsers actuais: Chrome, Edge, Firefox e Safari das duas últimas versões.</li>
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
  template: \`<button mxButton type="button">Olá, Muxima</button>\`,
})
export class App {}`;
}
