import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MX_MESSAGES_PT } from '@muxima-ui/core/i18n';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxColorPanel, MxColorPicker, mxColorName, mxContrast } from '@muxima-ui/core/color-picker';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxChoice, MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxProgress } from '@muxima-ui/core/progress';
import { MxSwitch } from '@muxima-ui/core/switch';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-color-picker-page',
  imports: [
    DOC_UI,
    MxChoice,
    MxSwitch,
    MxCheckbox,
    MxProgress,
    MxColorPicker,
    MxColorPanel,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    MxButton,
    MxBadge,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Color picker' }]"
        title="Color picker"
        lead="Escolher uma cor escrevendo o hex (ou rgb()) ou num painel com área de saturação e brilho, matiz, opacidade, amostras e conta-gotas. Tudo com teclado, e cada cor tem um nome para o leitor de ecrã."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de color picker">
          <mx-form-field class="w-280">
            <label mxLabel>Cor da marca</label>
            <mx-color-picker [(value)]="marca" [swatches]="sugestoes" />
            <mx-hint>{{ marca() ? nome(marca()!) : 'Sem cor' }}</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code
          code="import { MxColorPicker, MxColorPanel, mxColorName, mxContrast } from '@muxima-ui/core/color-picker';"
        />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          O campo tem a amostra (botão que abre o painel) e o texto. O painel junta área, matiz,
          opacidade, hex e amostras.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Área: saturação e brilho',
            topRight: 'Matiz (input range)',
            bottomLeft: 'Campo hex',
            bottomRight: 'Amostras',
            bottom: 'O valor é um hex',
          }"
        >
          <mx-color-panel [value]="'#1F6F78'" [swatches]="sugestoes" />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><mx-color-picker aria-label="Vazio" /></doc-state>
          <doc-state name="Com cor"
            ><mx-color-picker aria-label="Com cor" [value]="'#1F6F78'"
          /></doc-state>
          <doc-state name="Com opacidade"
            ><mx-color-picker aria-label="Com opacidade" [value]="'#1F6F7880'" alpha
          /></doc-state>
          <doc-state name="Desactivado"
            ><mx-color-picker aria-label="Desactivado" [value]="'#1F6F78'" disabled
          /></doc-state>
          <doc-state name="Erro"><mx-color-picker aria-label="Erro" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example
            title="Painel sozinho"
            [note]="'Valor: ' + painel() + ' (' + nome(painel()!) + ')'"
          >
            <div class="row-wrap">
              <mx-color-panel [(value)]="painel" />
              <button
                mxButton
                type="button"
                [style.background]="painel()"
                [style.color]="textoSobre(painel()!)"
              >
                Botão de exemplo
              </button>
            </div>
          </doc-example>
          <doc-example
            title="Com opacidade"
            [note]="'alpha devolve 8 dígitos abaixo de 100%: ' + sombra()"
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Cor da sombra</label>
                <mx-color-picker [(value)]="sombra" alpha />
              </mx-form-field>
              <div class="color-shadow-demo" [style.box-shadow]="'0 12px 28px ' + sombra()">
                Cartão com sombra
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Paleta fechada"
            note="swatchesOnly mostra só as amostras; cada uma diz o nome e o hex."
          >
            <div class="stack">
              <mx-color-panel [(value)]="etiqueta" [swatches]="paleta" swatchesOnly />
              <p>
                Etiqueta:
                <span
                  mxBadge
                  [style.background]="etiqueta()"
                  [style.color]="textoSobre(etiqueta()!)"
                  >Urgente</span
                >
              </p>
            </div>
          </doc-example>
          <doc-example
            title="Verificar contraste"
            [note]="
              'Contraste ' +
              contraste() +
              ':1 — ' +
              (contrasteOk() ? 'passa AA para texto normal.' : 'não chega a 4,5:1 (AA).')
            "
          >
            <div class="stack w-full">
              <div class="row-wrap">
                <mx-form-field class="grow">
                  <label mxLabel>Texto</label>
                  <mx-color-picker [(value)]="texto" size="sm" />
                </mx-form-field>
                <mx-form-field class="grow">
                  <label mxLabel>Fundo</label>
                  <mx-color-picker [(value)]="fundo" size="sm" />
                </mx-form-field>
              </div>
              <p class="color-contrast-demo" [style.color]="texto()" [style.background]="fundo()">
                Factura FT 2026/0201 · 250,00 US$
              </p>
            </div>
          </doc-example>
          <doc-example
            title="Num formulário"
            note="Validators.required e erro de formato quando o texto não é uma cor."
          >
            <form
              class="stack w-full"
              [formGroup]="categoria"
              (ngSubmit)="categoria.markAllAsTouched()"
            >
              <mx-form-field>
                <label mxLabel>Cor da categoria</label>
                <mx-color-picker formControlName="cor" />
                <mx-hint>Hex (#1F6F78) ou rgb(31, 111, 120).</mx-hint>
                <mx-error>Escolhe ou escreve uma cor válida.</mx-error>
              </mx-form-field>
              <div><button mxButton size="sm" type="submit">Guardar</button></div>
            </form>
          </doc-example>
          <doc-example
            title="Tema ao vivo"
            note="A cor escolhida passa a --mx-accent só dentro do cartão: switch, checkbox e progresso acompanham."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Cor de destaque</label>
                <mx-color-picker [(value)]="acento" [swatches]="sugestoes" />
              </mx-form-field>
              <div
                class="color-theme-demo"
                [style.--mx-accent]="acento()"
                [style.--mx-on-accent]="textoSobre(acento()!)"
                [style.--mx-accent-soft]="
                  'color-mix(in oklab, ' + acento() + ' 12%, var(--mx-surface))'
                "
              >
                <label mxChoice
                  ><input type="checkbox" mxSwitch checked /> Lembretes automáticos</label
                >
                <label mxChoice><input type="checkbox" mxCheckbox checked /> Enviar cópia</label>
                <progress mxProgress value="64" max="100" aria-label="Facturas do plano usadas">
                  64%
                </progress>
              </div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Alt + ↓', action: 'No campo, abre o painel.' },
            { key: '← →', action: 'Na área, saturação; com Shift, passos de 10%.' },
            { key: '↑ ↓', action: 'Na área, brilho; Page Up e Page Down, passos de 10%.' },
            { key: 'Home End', action: 'Na área, saturação mínima e máxima.' },
            { key: 'Setas', action: 'Na matiz e na opacidade (input range nativo).' },
            { key: 'Esc', action: 'Fecha o painel e volta ao botão da amostra.' },
          ]"
          [aria]="[
            'A área é um slider com aria-valuetext: Saturação 75%, brilho 47%, azul-petróleo escuro.',
            'A matiz diz os graus e o nome da cor: 186 graus, azul-petróleo.',
            'Cada amostra é um botão com o nome e o hex, e aria-pressed na escolhida.',
            'O botão do campo diz a cor actual: Mudar cor, vermelho, #B42318.',
            'Pode-se sempre escrever a cor, sem usar o painel.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Input' }, { name: 'Slider' }, { name: 'Popover' }]" />
      </section>
    </article>
  `,
})
export class ColorPickerPage {
  protected readonly marca = signal<string | null>('#1F6F78');
  protected readonly sugestoes = [
    '#1F6F78',
    '#0F5257',
    '#17663F',
    '#93460A',
    '#B42318',
    '#4A2C6F',
    '#1F3A93',
    '#3A3631',
  ];
  protected readonly painel = signal<string | null>('#4A2C6F');
  protected readonly sombra = signal<string | null>('#0F525740');
  protected readonly etiqueta = signal<string | null>('#B42318');
  protected readonly paleta = [
    { color: '#B42318', label: 'Urgente' },
    { color: '#93460A', label: 'Atenção' },
    { color: '#17663F', label: 'Concluído' },
    { color: '#1F3A93', label: 'Informação' },
    { color: '#4A2C6F', label: 'Interno' },
    { color: '#3A3631', label: 'Arquivo' },
  ];
  protected readonly texto = signal<string | null>('#FFFFFF');
  protected readonly fundo = signal<string | null>('#1F6F78');
  protected readonly contraste = computed(() =>
    mxContrast(this.texto() ?? '#000000', this.fundo() ?? '#FFFFFF').toLocaleString('pt-AO', {
      maximumFractionDigits: 1,
    }),
  );
  protected readonly contrasteOk = computed(
    () => mxContrast(this.texto() ?? '#000000', this.fundo() ?? '#FFFFFF') >= 4.5,
  );
  protected readonly categoria = new FormGroup({
    cor: new FormControl<string | null>(null, Validators.required),
  });
  protected readonly acento = signal<string | null>('#93460A');

  protected nome(hex: string): string {
    return mxColorName(hex, MX_MESSAGES_PT.colorPicker.names);
  }
  /** Preto ou branco, o que tiver mais contraste com a cor. */
  protected textoSobre(hex: string): string {
    return mxContrast(hex, '#FFFFFF') >= mxContrast(hex, '#1A1816') ? '#FFFFFF' : '#1A1816';
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Cor da marca</label>
  <mx-color-picker formControlName="cor" [swatches]="sugestoes" />
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Componente',
      name: 'mx-color-picker',
      type: 'value: string | null (model)',
      description: 'Campo com painel. Também com ngModel e Reactive Forms.',
    },
    {
      kind: 'Input',
      name: 'alpha',
      type: 'boolean',
      default: 'false',
      description: 'Opacidade; hex de 8 dígitos abaixo de 100%.',
    },
    { kind: 'Input', name: 'swatches', type: '(string | { color, label })[]', default: '[]' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: '#RRGGBB' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    {
      kind: 'Componente',
      name: 'mx-color-panel',
      type: 'value, alpha, swatches, showInput, swatchesOnly, disabled',
      description: 'O painel, para usar sozinho.',
    },
    {
      kind: 'Output',
      name: 'committed',
      type: 'string',
      description: 'No painel: ao largar, escolher amostra ou terminar de escrever.',
    },
    {
      kind: 'Função',
      name: 'mxParseColor(texto)',
      type: 'string | null',
      description: 'Hex de 3, 4, 6 ou 8 dígitos, rgb() e rgba().',
    },
    {
      kind: 'Função',
      name: 'mxColorName(hex, nomes?)',
      type: 'string',
      description: 'Nome aproximado da cor; em inglês por omissão, em português com MX_MESSAGES_PT.colorPicker.names.',
    },
    {
      kind: 'Função',
      name: 'mxContrast(a, b)',
      type: 'number',
      description: 'Contraste WCAG de 1 a 21.',
    },
    { kind: 'Função', name: 'mxHexToHsva, mxHsvaToHex, mxHexToRgba', type: 'conversões' },
  ];
}
