import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxChip, MxChipToggle, MxTagInput } from '@muxima-ui/core/chips';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';
import { MxButton } from '@muxima-ui/core/button';

@Component({
  selector: 'doc-chips-page',
  imports: [
    DOC_UI,
    MxChip,
    MxChipToggle,
    MxTagInput,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    ReactiveFormsModule,
    MxButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Chips' }]"
        title="Chips"
        lead="Etiquetas curtas para mostrar escolhas, filtrar listas ou escrever várias entradas num campo. Três peças: mx-chip, o botão mxChipToggle para filtros e o campo mx-tag-input."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de tag input">
          <mx-form-field class="w-320">
            <label mxLabel>Destinatários</label>
            <mx-tag-input
              [(value)]="destinatarios"
              [validate]="email"
              placeholder="Escreve um email e carrega Enter"
            />
            <mx-hint>Enter ou vírgula acrescentam.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code
          code="import { MxChip, MxChipToggle, MxTagInput } from '@muxima-ui/core/chips';"
        />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Um texto curto numa forma arredondada, com botão de remover opcional.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Texto',
            topRight: 'Remover (opcional)',
            bottomLeft: 'Altura 28 px',
            bottomRight: 'Botão de 20 px',
            bottom: 'O botão chama-se Remover + texto',
          }"
        >
          <mx-chip removable>Luanda</mx-chip>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Normal"><mx-chip>Luanda</mx-chip></doc-state>
          <doc-state name="Removível"><mx-chip removable>Luanda</mx-chip></doc-state>
          <doc-state name="Filtro desligado"><button mxChipToggle>Pagas</button></doc-state>
          <doc-state name="Filtro hover"
            ><button mxChipToggle data-mx-state="hover">Pagas</button></doc-state
          >
          <doc-state name="Filtro ligado"
            ><button mxChipToggle [selected]="true">Pagas</button></doc-state
          >
          <doc-state name="Foco"
            ><button mxChipToggle data-mx-state="focus">Pagas</button></doc-state
          >
          <doc-state name="Desactivado"><button mxChipToggle disabled>Pagas</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Variantes e tamanhos">
            <div class="row-wrap">
              <mx-chip>Default</mx-chip>
              <mx-chip variant="outline">Outline</mx-chip>
              <mx-chip variant="accent">Accent</mx-chip>
              <mx-chip size="sm">Pequeno</mx-chip>
              <mx-chip size="sm" variant="accent">Pequeno accent</mx-chip>
            </div>
          </doc-example>
          <doc-example
            title="Lista removível"
            [note]="
              provincias().length
                ? provincias().length + ' províncias escolhidas.'
                : 'Nenhuma província. Recarrega a página para repor.'
            "
          >
            <ul class="chip-list" aria-label="Províncias escolhidas">
              @for (p of provincias(); track p) {
                <li>
                  <mx-chip removable (removed)="tirar(p)">{{ p }}</mx-chip>
                </li>
              }
            </ul>
          </doc-example>
          <doc-example title="Filtros" [note]="'A mostrar: ' + filtrosActivos()">
            <div class="row-wrap" role="group" aria-label="Estado da factura">
              @for (f of filtros; track f.nome) {
                <button mxChipToggle [(selected)]="f.on">{{ f.nome }}</button>
              }
            </div>
          </doc-example>
          <doc-example
            title="Etiquetas num formulário"
            note="maxTags, duplicados ignorados e erro do form field."
          >
            <form class="stack w-full" [formGroup]="artigo">
              <mx-form-field>
                <label mxLabel>Etiquetas do artigo</label>
                <mx-tag-input
                  formControlName="etiquetas"
                  [maxTags]="5"
                  listLabel="Etiquetas do artigo"
                  placeholder="Ex.: facturação"
                />
                <mx-hint>Até 5. Podes colar várias separadas por vírgulas.</mx-hint>
                <mx-error>Junta pelo menos uma etiqueta.</mx-error>
              </mx-form-field>
            </form>
          </doc-example>
          <doc-example
            title="Filtros activos"
            [note]="
              activos().length ? 'Remove um filtro ou limpa todos.' : 'Sem filtros: a mostrar tudo.'
            "
          >
            <div class="stack w-full">
              @if (activos().length) {
                <div class="row-wrap">
                  <ul class="chip-list" aria-label="Filtros activos">
                    @for (f of activos(); track f.campo) {
                      <li>
                        <mx-chip
                          variant="accent"
                          removable
                          [removeLabel]="'Remover filtro'"
                          (removed)="tirarFiltro(f.campo)"
                          >{{ f.campo }}: {{ f.valor }}</mx-chip
                        >
                      </li>
                    }
                  </ul>
                  <button mxButton variant="link" size="sm" type="button" (click)="limparFiltros()">
                    Limpar tudo
                  </button>
                </div>
              } @else {
                <button mxButton variant="outline" size="sm" type="button" (click)="reporFiltros()">
                  Repor filtros de exemplo
                </button>
              }
            </div>
          </doc-example>
          <doc-example
            title="Uma escolha de cada vez"
            [note]="
              'Período: ' +
              periodo() +
              '. As classes do chip num botão simples, com aria-pressed gerido pela página.'
            "
          >
            <div class="row-wrap" role="group" aria-label="Período do gráfico">
              @for (p of periodos; track p) {
                <button
                  type="button"
                  class="mx-chip mx-chip-toggle"
                  [attr.aria-pressed]="periodo() === p"
                  (click)="periodo.set(p)"
                >
                  {{ p }}
                </button>
              }
            </div>
          </doc-example>
          <doc-example
            title="Sugestões"
            note="Botões que chamam add() no campo; as já usadas desaparecem."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Competências</label>
                <mx-tag-input #competencias [(value)]="skills" listLabel="Competências" />
              </mx-form-field>
              <div class="row-wrap" role="group" aria-label="Sugestões de competências">
                @for (s of sugestoesLivres(); track s) {
                  <button
                    type="button"
                    class="mx-chip mx-chip-toggle"
                    data-size="sm"
                    (click)="competencias.add(s)"
                  >
                    + {{ s }}
                  </button>
                }
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Limite e motivo da recusa"
            [note]="recusa() || emailsCc().length + ' de 3 endereços.'"
          >
            <mx-form-field class="w-full">
              <label mxLabel>Cópia para</label>
              <mx-tag-input
                [(value)]="emailsCc"
                [maxTags]="3"
                [validate]="email"
                (rejected)="recusa.set($event.reason)"
                (valueChange)="recusa.set('')"
              />
              <mx-hint>Até 3 emails.</mx-hint>
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Enter , ;', action: 'Acrescentam a etiqueta escrita.' },
            { key: 'Backspace', action: 'No campo vazio, vai para a última etiqueta.' },
            { key: '← →', action: 'Movem entre etiquetas; à direita da última volta ao campo.' },
            {
              key: 'Backspace Delete',
              action: 'Numa etiqueta, remove-a e o foco passa para a seguinte.',
            },
            { key: 'Espaço Enter', action: 'No filtro, liga e desliga.' },
          ]"
          [aria]="[
            'O botão de remover chama-se Remover Luanda, com o texto do chip.',
            'O filtro é um botão com aria-pressed; agrupa-os com role=group e um nome.',
            'As etiquetas ficam numa lista, e cada uma acrescentada, removida ou rejeitada é anunciada.',
            'O campo explica as teclas numa descrição (aria-describedby).',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related
          [items]="[{ name: 'Badge' }, { name: 'Multi-select' }, { name: 'Combobox' }]"
        />
      </section>
    </article>
  `,
})
export class ChipsPage {
  protected readonly destinatarios = signal<string[]>(['ana@kianda.ao']);
  protected readonly email = (t: string) =>
    /^\S+@\S+\.\S+$/.test(t) ? null : `${t} não é um email válido.`;
  protected readonly provincias = signal(['Luanda', 'Benguela', 'Huíla', 'Cabinda']);
  protected readonly filtros = [
    { nome: 'Pagas', on: signal(true) },
    { nome: 'Pendentes', on: signal(true) },
    { nome: 'Em atraso', on: signal(false) },
    { nome: 'Rascunhos', on: signal(false) },
  ];
  protected readonly filtrosActivos = computed(
    () =>
      this.filtros
        .filter((f) => f.on())
        .map((f) => f.nome)
        .join(', ') || 'nada',
  );
  protected readonly artigo = new FormGroup({
    etiquetas: new FormControl<string[]>(['facturação', 'IVA'], Validators.required),
  });

  protected tirar(p: string): void {
    this.provincias.update((l) => l.filter((x) => x !== p));
  }

  private readonly filtrosIniciais = [
    { campo: 'Estado', valor: 'Pendente' },
    { campo: 'Província', valor: 'Luanda' },
    { campo: 'Valor', valor: 'acima de 100 000 Kz' },
  ];
  protected readonly activos = signal(this.filtrosIniciais);
  protected tirarFiltro(campo: string): void {
    this.activos.update((l) => l.filter((f) => f.campo !== campo));
  }
  protected limparFiltros(): void {
    this.activos.set([]);
  }
  protected reporFiltros(): void {
    this.activos.set(this.filtrosIniciais);
  }
  protected readonly periodos = ['7 dias', '30 dias', '3 meses', '12 meses'];
  protected readonly periodo = signal('30 dias');
  protected readonly skills = signal<string[]>(['Angular']);
  private readonly sugestoes = ['TypeScript', 'Acessibilidade', 'RxJS', 'Testes', 'Design systems'];
  protected readonly sugestoesLivres = computed(() =>
    this.sugestoes.filter((s) => !this.skills().includes(s)),
  );
  protected readonly emailsCc = signal<string[]>([]);
  protected readonly recusa = signal('');

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Destinatários</label>
  <mx-tag-input formControlName="emails" [validate]="email" />
</mx-form-field>

// email = (t: string) => /^\\S+@\\S+\\.\\S+$/.test(t) ? null : t + ' não é um email válido.';`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Componente',
      name: 'mx-chip',
      type: 'removable, variant, size, disabled, removeLabel',
      description: '(removed) quando se carrega no botão.',
    },
    {
      kind: 'Input',
      name: 'variant',
      type: "'default' | 'outline' | 'accent'",
      default: 'default',
    },
    {
      kind: 'Directiva',
      name: 'button[mxChipToggle]',
      type: '[(selected)]: boolean',
      description: 'Filtro com aria-pressed.',
    },
    {
      kind: 'Componente',
      name: 'mx-tag-input',
      type: 'value: string[] (model)',
      description: 'Também com ngModel e Reactive Forms.',
    },
    {
      kind: 'Input',
      name: 'separators',
      type: 'string[]',
      default: "[',', ';']",
      description: 'Teclas que acrescentam, além de Enter.',
    },
    { kind: 'Input', name: 'maxTags', type: 'number', default: 'sem limite' },
    {
      kind: 'Input',
      name: 'allowDuplicates',
      type: 'boolean',
      default: 'false',
      description: 'Compara sem maiúsculas.',
    },
    {
      kind: 'Input',
      name: 'validate',
      type: '(tag) => string | null',
      description: 'Devolve a mensagem de erro, anunciada ao leitor de ecrã.',
    },
    {
      kind: 'Input',
      name: 'listLabel, helpText',
      type: 'string',
      description: 'Nome da lista e instrução de teclado.',
    },
    {
      kind: 'Output',
      name: 'rejected',
      type: '{ tag, reason }',
      description: 'Etiqueta inválida, duplicada ou acima do máximo.',
    },
    {
      kind: 'Método',
      name: 'add(texto), remove(índice)',
      type: 'MxTagInput',
      description: 'Para acrescentar a partir de código.',
    },
  ];
}
