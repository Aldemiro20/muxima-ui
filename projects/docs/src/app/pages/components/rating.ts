import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFieldset, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxRating } from '@muxima-ui/core/rating';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';
import { MxProgress } from '@muxima-ui/core/progress';

@Component({
  selector: 'doc-rating-page',
  imports: [
    DOC_UI,
    MxRating,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    MxButton,
    ReactiveFormsModule,
    MxFieldset,
    MxProgress,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Rating' }]"
        title="Rating"
        lead="Avaliação com estrelas. Para escolher são botões de rádio nativos (as setas mudam a nota); só de leitura é uma imagem com o texto 4,5 de 5 estrelas, com meias estrelas."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de rating">
          <mx-form-field>
            <label mxLabel>Como correu o atendimento?</label>
            <mx-rating [(value)]="nota" showValue />
            <mx-hint>{{ nota() ? textos[nota()! - 1] : 'Escolhe de 1 a 5.' }}</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxRating } from '@muxima-ui/core/rating';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          Um grupo de rádios escondidos por baixo de estrelas desenhadas; cada rádio tem um nome
          escrito, só para o leitor de ecrã.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'role=radiogroup',
            topRight: 'Valor (opcional)',
            bottomLeft: 'Estrela de 24 px',
            bottomRight: 'Nome: 3 estrelas',
            bottom: 'O valor é um número ou null',
          }"
        >
          <mx-rating aria-label="Exemplo" [value]="3" showValue />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><mx-rating aria-label="Vazio" /></doc-state>
          <doc-state name="Com nota"><mx-rating aria-label="Com nota" [value]="4" /></doc-state>
          <doc-state name="Só leitura" note="Aceita meias estrelas."
            ><mx-rating [value]="3.5" readonly showValue
          /></doc-state>
          <doc-state name="Desactivado"
            ><mx-rating aria-label="Desactivado" [value]="2" disabled
          /></doc-state>
          <doc-state name="Erro"><mx-rating aria-label="Erro" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example
            title="Média num cartão de produto"
            note="readonly: imagem com o texto completo, sem foco."
          >
            <div class="rating-summary">
              <strong>Kianda Logística</strong>
              <div class="row-wrap">
                <mx-rating [value]="4.3" readonly showValue size="sm" /><span class="muted"
                  >128 avaliações</span
                >
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Obrigatória num formulário"
            note="Validators.required; clearable deixa limpar ao carregar outra vez na mesma nota."
          >
            <form
              class="stack w-full"
              [formGroup]="avaliacao"
              (ngSubmit)="avaliacao.markAllAsTouched()"
            >
              <mx-form-field>
                <label mxLabel>Avalia a entrega</label>
                <mx-rating formControlName="entrega" clearable />
                <mx-error>Escolhe uma nota de 1 a 5.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit" size="sm">Enviar avaliação</button></div>
            </form>
          </doc-example>
          <doc-example
            title="Escala de 10"
            [note]="'Nota: ' + (dez() ?? 'nenhuma') + '. max muda o número de estrelas.'"
          >
            <mx-form-field class="w-full">
              <label mxLabel>Recomendarias a um colega?</label>
              <mx-rating [(value)]="dez" [max]="10" size="sm" [starLabel]="pontos" />
            </mx-form-field>
          </doc-example>
          <doc-example title="Tamanhos">
            <div class="stack">
              <mx-rating size="sm" [value]="4" readonly />
              <mx-rating [value]="4" readonly />
              <mx-rating size="lg" [value]="4" readonly />
            </div>
          </doc-example>
          <doc-example
            title="Distribuição das avaliações"
            note="Média só de leitura e uma barra por nota, com o número escrito."
          >
            <div class="rating-dist">
              <div class="rating-dist-head">
                <strong class="rating-big">{{ media() }}</strong>
                <div>
                  <mx-rating [value]="mediaNum()" readonly size="sm" /><span class="muted"
                    >{{ totalAvaliacoes() }} avaliações</span
                  >
                </div>
              </div>
              <ul class="rating-bars" aria-label="Avaliações por nota">
                @for (b of distribuicao; track b.estrelas) {
                  <li>
                    <span>{{ b.estrelas }} ★</span>
                    <progress
                      mxProgress
                      [value]="b.total"
                      [max]="totalAvaliacoes()"
                      [attr.aria-label]="b.estrelas + ' estrelas'"
                    >
                      {{ b.total }}
                    </progress>
                    <span class="muted">{{ b.total }}</span>
                  </li>
                }
              </ul>
            </div>
          </doc-example>
          <doc-example
            title="Várias categorias"
            note="Um rating por categoria, cada um com o seu rótulo; a média é calculada."
          >
            <fieldset mxFieldset class="w-full">
              <legend>Avalia a tua experiência</legend>
              @for (c of categorias; track c.nome) {
                <mx-form-field class="rating-row">
                  <label mxLabel>{{ c.nome }}</label>
                  <mx-rating [(value)]="c.nota" size="sm" />
                </mx-form-field>
              }
              <p class="muted">Média: {{ mediaCategorias() }}</p>
            </fieldset>
          </doc-example>
          <doc-example
            title="Lista de comentários"
            note="Exemplos fictícios; cada nota é uma imagem com texto, por isso não entra na ordem de tabulação."
          >
            <ul class="review-list">
              @for (r of comentarios; track r.autor) {
                <li>
                  <div class="review-head">
                    <strong>{{ r.autor }}</strong
                    ><mx-rating [value]="r.nota" readonly size="sm" />
                  </div>
                  <p>{{ r.texto }}</p>
                  <span class="muted">{{ r.data }}</span>
                </li>
              }
            </ul>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            {
              key: 'Tab',
              action: 'Entra no grupo na nota escolhida (ou na primeira) e sai com outro Tab.',
            },
            { key: '← → ↑ ↓', action: 'Mudam a nota, como em qualquer grupo de rádios.' },
            { key: 'Espaço', action: 'Com clearable, na nota escolhida, limpa a avaliação.' },
          ]"
          [aria]="[
            'Rádios nativos: o leitor de ecrã diz 3 estrelas, 3 de 5, seleccionado.',
            'O grupo tem o rótulo do form field (aria-labelledby).',
            'Só de leitura é role=img com o texto 4,5 de 5 estrelas; as estrelas ficam escondidas.',
            'A cor das estrelas é --mx-warning, com contraste nos dois temas.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Radio' }, { name: 'Slider' }, { name: 'Badge' }]" />
      </section>
    </article>
  `,
})
export class RatingPage {
  protected readonly nota = signal<number | null>(null);
  protected readonly textos = ['Muito mau', 'Mau', 'Razoável', 'Bom', 'Excelente'];
  protected readonly dez = signal<number | null>(8);
  protected readonly pontos = (n: number) => `${n} de 10`;
  protected readonly avaliacao = new FormGroup({
    entrega: new FormControl<number | null>(null, Validators.required),
  });

  protected readonly distribuicao = [
    { estrelas: 5, total: 72 },
    { estrelas: 4, total: 31 },
    { estrelas: 3, total: 14 },
    { estrelas: 2, total: 6 },
    { estrelas: 1, total: 5 },
  ];
  protected readonly totalAvaliacoes = computed(() =>
    this.distribuicao.reduce((a, b) => a + b.total, 0),
  );
  protected readonly mediaNum = computed(
    () =>
      Math.round(
        (this.distribuicao.reduce((a, b) => a + b.estrelas * b.total, 0) / this.totalAvaliacoes()) *
          10,
      ) / 10,
  );
  protected readonly media = computed(() => this.mediaNum().toLocaleString('pt-AO'));
  protected readonly categorias = [
    { nome: 'Rapidez', nota: signal<number | null>(4) },
    { nome: 'Simpatia', nota: signal<number | null>(5) },
    { nome: 'Preço', nota: signal<number | null>(null) },
  ];
  protected readonly mediaCategorias = computed(() => {
    const notas = this.categorias.map((c) => c.nota()).filter((n): n is number => n !== null);
    return notas.length
      ? (notas.reduce((a, b) => a + b, 0) / notas.length).toLocaleString('pt-AO', {
          maximumFractionDigits: 1,
        })
      : 'sem notas';
  });
  protected readonly comentarios = [
    {
      autor: 'Cliente A',
      nota: 5,
      texto: 'Entrega no dia combinado e tudo em ordem.',
      data: '20/10/2026',
    },
    {
      autor: 'Cliente B',
      nota: 3.5,
      texto: 'Bom serviço, mas o contacto demorou a responder.',
      data: '12/10/2026',
    },
    {
      autor: 'Cliente C',
      nota: 4,
      texto: 'Facturas claras e fáceis de pagar.',
      data: '02/10/2026',
    },
  ];

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Como correu o atendimento?</label>
  <mx-rating formControlName="nota" showValue />
</mx-form-field>

<mx-rating [value]="4.5" readonly showValue />`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'value',
      type: 'number | null (model)',
      description: 'Também com ngModel e Reactive Forms.',
    },
    { kind: 'Input', name: 'max', type: 'number', default: '5' },
    {
      kind: 'Input',
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Só mostra; aceita meias estrelas.',
    },
    {
      kind: 'Input',
      name: 'clearable',
      type: 'boolean',
      default: 'false',
      description: 'Carregar na nota escolhida limpa.',
    },
    {
      kind: 'Input',
      name: 'showValue',
      type: 'boolean',
      default: 'false',
      description: 'Número ao lado das estrelas.',
    },
    {
      kind: 'Input',
      name: 'starLabel',
      type: '(n) => string',
      default: 'n estrelas',
      description: 'Nome de cada opção.',
    },
    {
      kind: 'Input',
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Estrelas de 18, 24 ou 32 px.',
    },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
  ];
}
