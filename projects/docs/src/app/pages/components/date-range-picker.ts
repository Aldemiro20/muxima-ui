import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import {
  MxCalendar,
  MxDateRange,
  mxDateRangeComplete,
  MxDateRangePicker,
  mxDefaultRangePresets,
} from '@muxima-ui/core/date-picker';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

/** Validador: o período não pode ter mais de `max` dias. */
function maxDias(max: number) {
  return (c: AbstractControl<MxDateRange | null>): ValidationErrors | null => {
    const v = c.value;
    if (!v?.start || !v.end) return null;
    const dias = Math.round((v.end.getTime() - v.start.getTime()) / 864e5) + 1;
    return dias > max ? { longo: { dias } } : null;
  };
}

@Component({
  selector: 'doc-date-range-picker-page',
  imports: [
    DOC_UI,
    MxDateRangePicker,
    MxCalendar,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    MxButton,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Date range picker' }]"
        title="Date range picker"
        lead="Um período com data de início e de fim, num só campo. Escreve-se dd/mm/aaaa em cada parte ou escolhe-se no calendário com dois cliques, com atalhos opcionais como Últimos 7 dias."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de date range picker">
          <mx-form-field class="w-320">
            <label mxLabel>Período do relatório</label>
            <mx-date-range-picker [(value)]="periodo" [presets]="atalhos" />
            <mx-hint>Escreve as datas ou escolhe no calendário.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code
          code="import { MxDateRangePicker, mxDefaultRangePresets } from '@muxima-ui/core/date-picker';"
        />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          Dois campos de texto dentro da mesma moldura, o botão do calendário e o painel com atalhos
          e calendário.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Campo início',
            topRight: 'Campo fim e botão',
            bottomLeft: 'Atalhos (opcional)',
            bottomRight: 'Calendário em intervalo',
            bottom: 'O valor é { start, end }',
          }"
        >
          <mx-date-range-picker class="w-280" aria-label="Exemplo" [value]="exemplo" />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><mx-date-range-picker aria-label="Vazio" /></doc-state>
          <doc-state name="Com período"
            ><mx-date-range-picker aria-label="Com período" [value]="exemplo"
          /></doc-state>
          <doc-state name="Desactivado"
            ><mx-date-range-picker aria-label="Desactivado" [value]="exemplo" disabled
          /></doc-state>
          <doc-state name="Erro" note="Fim antes do início, texto inválido ou invalid."
            ><mx-date-range-picker aria-label="Erro" [value]="invertido"
          /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Calendário em intervalo" [note]="resumo(intervalo())">
            <mx-calendar mode="range" [(range)]="intervalo" />
          </doc-example>
          <doc-example
            title="Com validação"
            note="mxDateRangeComplete exige início e fim; Validators.required exige um período."
          >
            <form class="stack w-full" [formGroup]="ferias" (ngSubmit)="ferias.markAllAsTouched()">
              <mx-form-field>
                <label mxLabel>Férias</label>
                <mx-date-range-picker formControlName="periodo" [min]="hoje" />
                <mx-hint>A partir de hoje.</mx-hint>
                <mx-error>Indica o primeiro e o último dia de férias.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit" size="sm">Pedir férias</button></div>
            </form>
          </doc-example>
          <doc-example
            title="Atalhos próprios"
            note="presets recebe rótulo e uma função, para que hoje seja calculado no clique."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Trimestre</label>
              <mx-date-range-picker [(value)]="trimestre" [presets]="trimestres" />
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Dias úteis e tamanhos"
            note="dateDisabled tira os fins-de-semana do calendário."
          >
            <div class="stack w-full">
              <mx-date-range-picker
                size="sm"
                aria-label="Período em dias úteis"
                [dateDisabled]="fimDeSemana"
              />
              <mx-date-range-picker size="lg" aria-label="Período grande" [value]="exemplo" />
            </div>
          </doc-example>
          <doc-example
            title="Filtrar uma tabela"
            [note]="facturasFiltradas().length + ' de ' + facturas.length + ' facturas no período.'"
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Emitidas entre</label>
                <mx-date-range-picker [(value)]="filtroPeriodo" [presets]="atalhos" size="sm" />
              </mx-form-field>
              <div class="mx-table-container">
                <table class="mx-table" data-density="compact">
                  <caption class="mx-visually-hidden">
                    Facturas no período escolhido
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Factura</th>
                      <th scope="col">Emitida</th>
                      <th scope="col" data-align="end">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (f of facturasFiltradas(); track f.numero) {
                      <tr>
                        <td>{{ f.numero }}</td>
                        <td>{{ f.emitida.toLocaleDateString('pt-AO') }}</td>
                        <td data-align="end">{{ f.valor }}</td>
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="3" class="mx-table-empty">Nenhuma factura neste período.</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Reserva com noites"
            note="startLabel e endLabel mudam o nome de cada campo: Estadia, entrada e Estadia, saída."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Estadia</label>
              <mx-date-range-picker
                [(value)]="estadia"
                [min]="hoje"
                startLabel="entrada"
                endLabel="saída"
              />
              <mx-hint>{{
                noites()
                  ? noites() + (noites() === 1 ? ' noite' : ' noites')
                  : 'Escolhe a entrada e a saída.'
              }}</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Dias já ocupados"
            note="dateDisabled impede que as datas reservadas sejam o início ou o fim."
          >
            <mx-calendar mode="range" [(range)]="sala" [dateDisabled]="ocupado" />
          </doc-example>
          <doc-example
            title="Período máximo de 31 dias"
            note="Um validador próprio junta-se ao mxDateRangeComplete."
          >
            <form class="stack w-full" [formGroup]="extracto">
              <mx-form-field>
                <label mxLabel>Extracto bancário</label>
                <mx-date-range-picker formControlName="datas" [max]="hoje" />
                <mx-hint>Até 31 dias de cada vez.</mx-hint>
                @if (extracto.controls.datas.hasError('longo')) {
                  <mx-error
                    >O período tem {{ extracto.controls.datas.getError('longo').dias }} dias; o
                    máximo é 31.</mx-error
                  >
                } @else {
                  <mx-error>Indica o início e o fim.</mx-error>
                }
              </mx-form-field>
            </form>
          </doc-example>
        </div>
        <doc-callout
          >Para dois campos independentes, por exemplo quando o fim é opcional, usa dois Date picker
          com min e max ligados um ao outro.</doc-callout
        >
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Passa do início para o fim e para o botão do calendário.' },
            { key: 'Alt + ↓', action: 'Abre o calendário a partir de qualquer campo.' },
            {
              key: 'Setas, Page Up / Down',
              action: 'Movem no calendário; o intervalo é pré-visualizado.',
            },
            { key: 'Enter Espaço', action: 'Primeiro marca o início, depois o fim e fecha.' },
            { key: 'Esc', action: 'Fecha e devolve o foco ao botão.' },
          ]"
          [aria]="[
            'Cada campo é anunciado com o rótulo e a parte: Período do relatório, início.',
            'Os dias do intervalo têm aria-selected; o início e o fim dizem-no no nome.',
            'Depois do primeiro clique é anunciado: Escolhe a data de fim.',
            'O botão diz o período escolhido: Mudar intervalo, 1 de outubro de 2026 a 15 de outubro de 2026.',
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
          [items]="[{ name: 'Date picker' }, { name: 'Time picker' }, { name: 'Popover' }]"
        />
      </section>
    </article>
  `,
})
export class DateRangePickerPage {
  protected readonly hoje = new Date();
  protected readonly atalhos = mxDefaultRangePresets();
  protected readonly periodo = signal<MxDateRange | null>(null);
  protected readonly exemplo: MxDateRange = {
    start: new Date(2026, 9, 1),
    end: new Date(2026, 9, 15),
  };
  protected readonly invertido: MxDateRange = {
    start: new Date(2026, 9, 15),
    end: new Date(2026, 9, 1),
  };
  protected readonly intervalo = signal<MxDateRange | null>({
    start: new Date(2026, 9, 6),
    end: new Date(2026, 9, 10),
  });
  protected readonly trimestre = signal<MxDateRange | null>(null);
  protected readonly ferias = new FormGroup({
    periodo: new FormControl<MxDateRange | null>(null, [Validators.required, mxDateRangeComplete]),
  });
  protected readonly fimDeSemana = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
  protected readonly trimestres = [1, 2, 3, 4].map((t) => ({
    label: `${t}.º trimestre`,
    range: () => {
      const ano = new Date().getFullYear();
      return { start: new Date(ano, (t - 1) * 3, 1), end: new Date(ano, t * 3, 0) };
    },
  }));

  protected resumo(r: MxDateRange | null): string {
    const f = (d: Date | null) => (d ? d.toLocaleDateString('pt-AO') : '...');
    return r?.start ? `De ${f(r.start)} a ${f(r.end)}.` : 'Escolhe o primeiro dia.';
  }

  protected readonly facturas = [
    { numero: 'FT 2026/0201', emitida: new Date(2026, 9, 26), valor: '250 000,00 Kz' },
    { numero: 'FT 2026/0198', emitida: new Date(2026, 9, 21), valor: '5 079 000,00 Kz' },
    { numero: 'FT 2026/0193', emitida: new Date(2026, 9, 6), valor: '4 651 500,00 Kz' },
    { numero: 'FT 2026/0187', emitida: new Date(2026, 8, 24), valor: '1 230 000,00 Kz' },
    { numero: 'FT 2026/0180', emitida: new Date(2026, 8, 9), valor: '845 000,00 Kz' },
  ];
  protected readonly filtroPeriodo = signal<MxDateRange | null>({
    start: new Date(2026, 9, 1),
    end: new Date(2026, 9, 31),
  });
  protected readonly facturasFiltradas = computed(() => {
    const p = this.filtroPeriodo();
    if (!p?.start || !p.end) return this.facturas;
    return this.facturas.filter((f) => f.emitida >= p.start! && f.emitida <= p.end!);
  });
  protected readonly estadia = signal<MxDateRange | null>(null);
  protected readonly noites = computed(() => {
    const e = this.estadia();
    return e?.start && e.end ? Math.round((e.end.getTime() - e.start.getTime()) / 864e5) : 0;
  });
  protected readonly sala = signal<MxDateRange | null>(null);
  private readonly reservas = [8, 9, 14, 15, 16, 22];
  protected readonly ocupado = (d: Date) =>
    d.getMonth() === 9 && this.reservas.includes(d.getDate());
  protected readonly extracto = new FormGroup({
    datas: new FormControl<MxDateRange | null>(null, [mxDateRangeComplete, maxDias(31)]),
  });

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Período do relatório</label>
  <mx-date-range-picker formControlName="periodo" [presets]="atalhos" />
</mx-form-field>

// atalhos = mxDefaultRangePresets();`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'value',
      type: 'MxDateRange | null (model)',
      description: '{ start, end }, datas sem horas. Também com Reactive Forms.',
    },
    {
      kind: 'Input',
      name: 'presets',
      type: 'MxDateRangePreset[]',
      default: '[]',
      description: 'Atalhos: { label, range: () => ({ start, end }) }.',
    },
    { kind: 'Input', name: 'min, max', type: 'Date | null', description: 'Limites do calendário.' },
    {
      kind: 'Input',
      name: 'dateDisabled',
      type: '(d: Date) => boolean',
      description: 'Dias que não se podem escolher.',
    },
    {
      kind: 'Input',
      name: 'startLabel, endLabel',
      type: 'string',
      default: 'início, fim',
      description: 'Nome de cada campo, junto ao rótulo.',
    },
    { kind: 'Input', name: 'locale, placeholder, size', type: 'como no Date picker' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    {
      kind: 'Função',
      name: 'mxDefaultRangePresets()',
      type: 'MxDateRangePreset[]',
      description: 'Últimos 7 e 30 dias, este mês e o mês passado.',
    },
    {
      kind: 'Função',
      name: 'mxDateRangeComplete',
      type: 'ValidatorFn',
      description: 'Erro rangeIncomplete se faltar o início ou o fim.',
    },
    {
      kind: 'Directiva',
      name: 'mx-calendar mode="range"',
      type: '[(range)], (rangeSelected)',
      description: 'O calendário em intervalo, para usar sozinho.',
    },
  ];
}
