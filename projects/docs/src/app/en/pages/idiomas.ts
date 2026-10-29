import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxChipToggle, MxTagInput } from '@muxima-ui/core/chips';
import { MxDatePicker } from '@muxima-ui/core/date-picker';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { MxI18n } from '@muxima-ui/core/i18n';
import { MxPagination } from '@muxima-ui/core/pagination';
import { MxRating } from '@muxima-ui/core/rating';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

/**
 * Demo with its own MxI18n: changing the language here doesn't change the rest of the site.
 * In an app you use the root MxI18n, and the change reaches every component.
 */
@Component({
  selector: 'doc-idiomas-demo',
  imports: [MxChipToggle, MxTagInput, MxDatePicker, MxFormField, MxLabel, MxPagination, MxRating],
  providers: [MxI18n],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="idiomas-demo">
      <div class="idiomas-escolha" role="group" aria-label="Component language">
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
        [crumbs]="[{ label: 'Get started' }, { label: 'Languages' }]"
        title="Languages"
        lead="Component texts (buttons, screen reader announcements, date names) come from a dictionary. The library ships English and Portuguese, and you can add others."
      />

      <section>
        <h2>Try it</h2>
        <p>Switch the language and look at the pagination buttons, the calendar and the names a screen reader hears.</p>
        <doc-preview [code]="demoCode" align="start" label="Languages">
          <doc-idiomas-demo />
        </doc-preview>
      </section>

      <section>
        <h2>Choose the language</h2>
        <p>Set the language when the app starts:</p>
        <doc-code [code]="provide" />
        <doc-callout>
          In version 1.x Portuguese is still the default language, so nothing changes for existing users. From 2.0 on the default is English. If your app is in English, set
          <code>locale: 'en'</code> now, and the version change won't affect you.
        </doc-callout>
      </section>

      <section>
        <h2>Change it at runtime</h2>
        <p>
          O <code>MxI18n</code> keeps the language in a signal. When you call <code>setLocale</code>, every
          component on screen updates right away, without a reload. Also update the <code>lang</code> attribute,
          so screen readers pronounce the text correctly.
        </p>
        <doc-code [code]="runtime" />
      </section>

      <section>
        <h2>Change a text</h2>
        <p>To change a text across the whole app, give only what changes:</p>
        <doc-code [code]="override" />
        <p>
          To change it in a single place, use the component's input, which always wins over the dictionary. For example,
          <code>&lt;mx-chip removable removeLabel="Delete"&gt;</code>.
        </p>
      </section>

      <section>
        <h2>Another language</h2>
        <p>
          A language the library doesn't ship starts from English and replaces what you give. The
          <code>MxMessages</code> type lists every text, by component, and your editor completes the keys.
          Variants such as <code>pt-BR</code> or <code>en-GB</code> use the base dictionary plus the corrections you
          register for them.
        </p>
        <doc-code [code]="french" />
      </section>

      <section>
        <h2>Dates and numbers</h2>
        <p>Besides the texts, each language defines how dates and numbers are written:</p>
        <div class="mx-table-container">
          <table class="idiomas-tabela">
            <thead>
              <tr>
                <th scope="col">Key</th>
                <th scope="col">Português</th>
                <th scope="col">English</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>intlLocale</code></td><td>pt-AO (1 234,5)</td><td>en-US (1,234.5)</td></tr>
              <tr><td><code>dateOrder</code></td><td>dmy (28/10/2026)</td><td>mdy (10/28/2026)</td></tr>
              <tr><td><code>firstDayOfWeek</code></td><td>1 (Monday)</td><td>0 (Sunday)</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The <code>locale</code> input of the date components, the rating and the notifications still
          exists, for one-off cases.
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
  providers: [provideMuximaI18n({ locale: 'en' })],
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
  locale: 'en',
  messages: {
    en: {
      select: { placeholder: 'Choose' },
      pagination: { rowsPerPage: 'Per page' },
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

  protected readonly demoCode = `<!-- the language comes from MxI18n; no text is passed to the components -->
<mx-form-field>
  <label mxLabel>Due date</label>
  <mx-date-picker />
</mx-form-field>
<mx-tag-input [(value)]="tags" />
<mx-pagination [(page)]="page" [total]="236" [pageSize]="20" [showRange]="true" />`;

  protected readonly api: ApiRow[] = [
    { kind: 'Função', name: 'provideMuximaI18n(config)', type: 'MxI18nConfig', description: 'Initial language and texts per language.' },
    { kind: 'Propriedade', name: 'MxI18nConfig.locale', type: 'string', default: "'pt'", description: "'pt', 'en' or another registered one." },
    { kind: 'Propriedade', name: 'MxI18nConfig.messages', type: 'Record<string, MxDeepPartial<MxMessages>>', description: 'Corrections or new languages.' },
    { kind: 'Serviço', name: 'MxI18n', type: 'providedIn root', description: 'Active language and texts.' },
    { kind: 'Propriedade', name: 'MxI18n.locale', type: 'Signal<string>' },
    { kind: 'Propriedade', name: 'MxI18n.messages', type: 'Signal<MxMessages>' },
    { kind: 'Propriedade', name: 'MxI18n.intlLocale', type: 'Signal<string>', description: 'For Intl.NumberFormat and Intl.DateTimeFormat.' },
    { kind: 'Método', name: 'MxI18n.setLocale(locale)', type: '(string) => void' },
    { kind: 'Método', name: 'MxI18n.register(locale, messages)', type: '(string, MxDeepPartial<MxMessages>) => void', description: 'Adds texts without losing the existing ones.' },
    { kind: 'Função', name: 'injectMxMessages()', type: 'Signal<MxMessages>', description: 'The active language\'s texts, for your own components.' },
    { kind: 'Propriedade', name: 'MX_MESSAGES_PT, MX_MESSAGES_EN', type: 'MxMessages', description: 'The bundled dictionaries.' },
  ];
}
