import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxChipToggle, MxTagInput } from '@muxima-ui/core/chips';
import { MxDatePicker } from '@muxima-ui/core/date-picker';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { MxI18n } from '@muxima-ui/core/i18n';
import { MxPagination } from '@muxima-ui/core/pagination';
import { MxRating } from '@muxima-ui/core/rating';
import { ApiRow, DOC_UI } from '../ui/doc-ui';

/**
 * Demonstração com o seu próprio MxI18n: mudar o idioma aqui não muda o resto do site.
 * Numa aplicação usa-se o MxI18n da raiz, e a mudança chega a todos os componentes.
 */
@Component({
  selector: 'doc-idiomas-demo',
  imports: [MxChipToggle, MxTagInput, MxDatePicker, MxFormField, MxLabel, MxPagination, MxRating],
  providers: [MxI18n],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="idiomas-demo">
      <div class="idiomas-escolha" role="group" aria-label="Idioma dos componentes">
        <button mxChipToggle [selected]="i18n.locale() === 'pt'" (click)="i18n.setLocale('pt')" lang="pt">Português</button>
        <button mxChipToggle [selected]="i18n.locale() === 'en'" (click)="i18n.setLocale('en')" lang="en">English</button>
      </div>
      <div class="idiomas-amostra" [attr.lang]="i18n.locale()">
        <mx-form-field>
          <label mxLabel>{{ i18n.locale() === 'en' ? 'Due date' : 'Data de vencimento' }}</label>
          <mx-date-picker />
        </mx-form-field>
        <mx-form-field>
          <label mxLabel>{{ i18n.locale() === 'en' ? 'Recipients' : 'Destinatários' }}</label>
          <mx-tag-input [(value)]="tags" />
        </mx-form-field>
        <mx-rating [(value)]="nota" [showValue]="true" [aria-label]="i18n.locale() === 'en' ? 'Rating' : 'Avaliação'" />
        <mx-pagination [(page)]="pagina" [total]="236" [pageSize]="20" [showRange]="true" />
      </div>
    </div>
  `,
  styles: `
    .idiomas-demo { display: grid; gap: 20px; width: 100%; }
    .idiomas-escolha { display: flex; gap: 8px; }
    .idiomas-amostra { display: grid; gap: 16px; max-width: 420px; }
  `,
})
export class IdiomasDemo {
  protected readonly i18n = inject(MxI18n);

  constructor() {
    // a demonstração começa em português, como a página
    this.i18n.setLocale('pt');
  }

  protected readonly tags = signal(['Luanda', 'Huambo']);
  protected readonly nota = signal<number | null>(4);
  protected readonly pagina = signal(2);
}

@Component({
  selector: 'doc-idiomas',
  imports: [DOC_UI, IdiomasDemo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Começar' }, { label: 'Idiomas' }]"
        title="Idiomas"
        lead="Os textos dos componentes (botões, avisos ao leitor de ecrã, nomes das datas) vêm de um dicionário. A biblioteca traz português e inglês, e podes acrescentar outros."
      />

      <section>
        <h2>Experimenta</h2>
        <p>Muda o idioma e repara nos botões da paginação, no calendário e nos nomes que o leitor de ecrã ouve.</p>
        <doc-preview [code]="demoCode" align="start" label="Idiomas">
          <doc-idiomas-demo />
        </doc-preview>
      </section>

      <section>
        <h2>Escolher o idioma</h2>
        <p>Indica o idioma ao arrancar a aplicação:</p>
        <doc-code [code]="provide" />
        <doc-callout>
          Desde a 2.0 o idioma por omissão é o inglês (na 1.x era o português). Se a tua aplicação é em
          português, indica <code>locale: 'pt'</code>, como acima.
        </doc-callout>
      </section>

      <section>
        <h2>Mudar durante a utilização</h2>
        <p>
          O <code>MxI18n</code> guarda o idioma num signal. Ao chamar <code>setLocale</code>, todos os
          componentes no ecrã mudam logo, sem recarregar. Actualiza também o atributo <code>lang</code>,
          para o leitor de ecrã pronunciar bem.
        </p>
        <doc-code [code]="runtime" />
      </section>

      <section>
        <h2>Corrigir um texto</h2>
        <p>Para mudar um texto em toda a aplicação, indica só o que muda:</p>
        <doc-code [code]="override" />
        <p>
          Para mudar só num sítio, usa o input do componente, que ganha sempre ao dicionário. Por exemplo,
          <code>&lt;mx-chip removable removeLabel="Tirar"&gt;</code>.
        </p>
      </section>

      <section>
        <h2>Outro idioma</h2>
        <p>
          Um idioma que não vem na biblioteca parte do inglês e substitui o que indicares. O tipo
          <code>MxMessages</code> lista todos os textos, por componente, e o editor completa as chaves.
          Variantes como <code>pt-BR</code> ou <code>en-GB</code> usam o dicionário base e as correcções que
          registares para elas.
        </p>
        <doc-code [code]="french" />
      </section>

      <section>
        <h2>Datas e números</h2>
        <p>Além dos textos, cada idioma define como se escrevem as datas e os números:</p>
        <div class="mx-table-container">
          <table class="idiomas-tabela">
            <thead>
              <tr>
                <th scope="col">Chave</th>
                <th scope="col">Português</th>
                <th scope="col">English</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>intlLocale</code></td><td>pt-AO (1 234,5)</td><td>en-US (1,234.5)</td></tr>
              <tr><td><code>dateOrder</code></td><td>dmy (28/10/2026)</td><td>mdy (10/28/2026)</td></tr>
              <tr><td><code>firstDayOfWeek</code></td><td>1 (segunda-feira)</td><td>0 (domingo)</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          O input <code>locale</code> dos componentes de data, do rating e das notificações continua a
          existir, para um caso pontual.
        </p>
      </section>

      <section>
        <h2>API</h2>
        <doc-api-table [rows]="api" />
      </section>
    </article>
  `,
  styles: `
    .idiomas-tabela { width: 100%; border-collapse: collapse; }
    .idiomas-tabela th,
    .idiomas-tabela td { text-align: start; padding: 8px 12px; border-bottom: 1px solid var(--mx-border); }
  `,
})
export class IdiomasPage {
  protected readonly provide = `// app.config.ts
import { provideMuximaI18n } from '@muxima-ui/core/i18n';

export const appConfig: ApplicationConfig = {
  providers: [provideMuximaI18n({ locale: 'pt' })],
};`;

  protected readonly runtime = `import { DOCUMENT, inject } from '@angular/core';
import { MxI18n } from '@muxima-ui/core/i18n';

export class LanguageMenu {
  private readonly i18n = inject(MxI18n);
  private readonly document = inject(DOCUMENT);

  protected choose(locale: 'pt' | 'en'): void {
    this.i18n.setLocale(locale);
    this.document.documentElement.lang = locale;
  }
}`;

  protected readonly override = `provideMuximaI18n({
  locale: 'pt',
  messages: {
    pt: {
      select: { placeholder: 'Escolher' },
      pagination: { rowsPerPage: 'Por página' },
    },
  },
});`;

  protected readonly french = `provideMuximaI18n({
  locale: 'fr',
  messages: {
    fr: {
      intlLocale: 'fr-FR',
      dateOrder: 'dmy',
      firstDayOfWeek: 1,
      pagination: { previousShort: 'Précédent', nextShort: 'Suivant' },
      tour: { next: 'Suivant', progress: (c, t) => \`Étape \${c} sur \${t}\` },
    },
  },
});`;

  protected readonly demoCode = `<!-- o idioma vem do MxI18n; nenhum texto é passado aos componentes -->
<mx-form-field>
  <label mxLabel>Due date</label>
  <mx-date-picker />
</mx-form-field>
<mx-tag-input [(value)]="tags" />
<mx-pagination [(page)]="page" [total]="236" [pageSize]="20" [showRange]="true" />`;

  protected readonly api: ApiRow[] = [
    { kind: 'Função', name: 'provideMuximaI18n(config)', type: 'MxI18nConfig', description: 'Idioma inicial e textos por idioma.' },
    { kind: 'Propriedade', name: 'MxI18nConfig.locale', type: 'string', default: "'pt'", description: "'pt', 'en' ou outro registado." },
    { kind: 'Propriedade', name: 'MxI18nConfig.messages', type: 'Record<string, MxDeepPartial<MxMessages>>', description: 'Correcções ou idiomas novos.' },
    { kind: 'Serviço', name: 'MxI18n', type: 'providedIn root', description: 'Idioma activo e textos.' },
    { kind: 'Propriedade', name: 'MxI18n.locale', type: 'Signal<string>' },
    { kind: 'Propriedade', name: 'MxI18n.messages', type: 'Signal<MxMessages>' },
    { kind: 'Propriedade', name: 'MxI18n.intlLocale', type: 'Signal<string>', description: 'Para Intl.NumberFormat e Intl.DateTimeFormat.' },
    { kind: 'Método', name: 'MxI18n.setLocale(locale)', type: '(string) => void' },
    { kind: 'Método', name: 'MxI18n.register(locale, messages)', type: '(string, MxDeepPartial<MxMessages>) => void', description: 'Acrescenta textos sem perder os que já existem.' },
    { kind: 'Função', name: 'injectMxMessages()', type: 'Signal<MxMessages>', description: 'Os textos do idioma activo, para os teus componentes.' },
    { kind: 'Propriedade', name: 'MX_MESSAGES_PT, MX_MESSAGES_EN', type: 'MxMessages', description: 'Os dicionários incluídos.' },
  ];
}
