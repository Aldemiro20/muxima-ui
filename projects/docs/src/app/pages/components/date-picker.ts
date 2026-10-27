import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxCalendar, MxDatePicker } from '@muxima-ui/core/date-picker';
import { MxError, MxFieldset, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-date-picker-page',
  imports: [DOC_UI, MxDatePicker, MxCalendar, MxFormField, MxLabel, MxHint, MxError, MxButton, ReactiveFormsModule, MxFieldset],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Date picker' }]"
        title="Date picker"
        lead="Campo de data em que se pode escrever dd/mm/aaaa ou escolher num calendário. O calendário é uma grelha acessível, com semanas a começar à segunda-feira."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de date picker">
          <mx-form-field class="w-320">
            <label mxLabel>Data de vencimento</label>
            <mx-date-picker [formControl]="vencimento" [min]="hoje" />
            <mx-hint>dd/mm/aaaa. Não pode ser antes de hoje.</mx-hint>
            <mx-error>Escreve uma data válida, a partir de hoje.</mx-error>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxDatePicker, MxCalendar } from '@muxima-ui/core/date-picker';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Um input de texto, um botão que abre o calendário e o calendário num painel não modal.</p>
        <doc-structure [labels]="{ topLeft: 'Texto dd/mm/aaaa', topRight: 'Botão do calendário', bottomLeft: 'Grelha role=grid', bottomRight: 'Dia de 34 px', bottom: 'O valor é um Date sem horas' }">
          <mx-date-picker class="w-180" aria-label="Exemplo" [value]="exemplo" />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><mx-date-picker aria-label="Vazio" /></doc-state>
          <doc-state name="Com data"><mx-date-picker aria-label="Com data" [value]="exemplo" /></doc-state>
          <doc-state name="Hover"><mx-date-picker aria-label="Hover" [value]="exemplo" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco"><mx-date-picker aria-label="Foco" [value]="exemplo" data-mx-state="focus" /></doc-state>
          <doc-state name="Desactivado"><mx-date-picker aria-label="Desactivado" [value]="exemplo" disabled /></doc-state>
          <doc-state name="Erro" note="Formato inválido ou fora do intervalo."><mx-date-picker aria-label="Erro" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Calendário sozinho" [note]="'Escolhido: ' + (dia() ? dia()!.toLocaleDateString('pt-AO') : 'nenhum') + '. Fins-de-semana indisponíveis.'">
            <mx-calendar [(value)]="dia" [dateDisabled]="fimDeSemana" />
          </doc-example>
          <doc-example title="Intervalo permitido" note="min e max limitam a escrita e o calendário.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Data da reunião</label>
                <mx-date-picker [formControl]="reuniao" [min]="hoje" [max]="daquiA30" />
                <mx-hint>Nos próximos 30 dias.</mx-hint>
                <mx-error>Escolhe uma data nos próximos 30 dias.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" size="sm" (click)="reuniao.markAsTouched()">Validar</button></div>
            </div>
          </doc-example>
          <doc-example title="Período de / até" note="Dois campos; o mínimo do segundo é a data do primeiro.">
            <fieldset mxFieldset orientation="horizontal" class="w-full">
              <legend>Período do relatório</legend>
              <mx-form-field class="grow">
                <label mxLabel>De</label>
                <mx-date-picker [(value)]="de" [max]="ate()" />
              </mx-form-field>
              <mx-form-field class="grow">
                <label mxLabel>Até</label>
                <mx-date-picker [(value)]="ate" [min]="de()" />
              </mx-form-field>
            </fieldset>
          </doc-example>
          <doc-example title="Pré-preenchido e só leitura" note="disabled mostra a data mas não deixa mudar.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Data de emissão</label>
                <mx-date-picker [value]="exemplo" />
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Data de registo</label>
                <mx-date-picker [value]="registo" disabled />
              </mx-form-field>
            </div>
          </doc-example>
          <doc-example title="Tamanhos">
            <div class="stack w-full">
              <mx-date-picker size="sm" aria-label="Pequeno" [value]="exemplo" />
              <mx-date-picker aria-label="Médio" [value]="exemplo" />
              <mx-date-picker size="lg" aria-label="Grande" [value]="exemplo" />
            </div>
          </doc-example>
        </div>
        <doc-callout>Para uma data que a pessoa sabe de cor, como a data de nascimento, três campos ou o input type=date nativo são mais rápidos do que um calendário.</doc-callout>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Alt + ↓', action: 'Abre o calendário a partir do campo.' },
            { key: '← → ↑ ↓', action: 'Dia anterior, seguinte, semana anterior e seguinte.' },
            { key: 'Home End', action: 'Início e fim da semana.' },
            { key: 'Page Up / Down', action: 'Mês anterior e seguinte.' },
            { key: 'Shift + Page Up / Down', action: 'Ano anterior e seguinte.' },
            { key: 'Enter Espaço', action: 'Escolhe o dia e fecha.' },
            { key: 'Esc', action: 'Fecha e devolve o foco ao botão.' }
          ]"
          [aria]="[
            'O botão diz a data escolhida: Mudar data, sexta-feira, 13 de novembro de 2026.',
            'O calendário é um diálogo com uma grelha (role=grid); o mês é anunciado ao mudar.',
            'Cada dia tem o nome completo; hoje tem aria-current=date e o escolhido aria-selected.',
            'Pode-se sempre escrever a data, sem usar o calendário.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Date range picker' }, { name: 'Time picker' }, { name: 'Popover' }]" />
      </section>
    </article>
  `,
})
export class DatePickerPage {
  protected readonly de = signal<Date | null>(new Date(2026, 9, 1));
  protected readonly ate = signal<Date | null>(new Date(2026, 9, 31));
  protected readonly registo = new Date(2021, 2, 15);

  protected readonly hoje = new Date();
  protected readonly daquiA30 = new Date(Date.now() + 30 * 86400000);
  protected readonly exemplo = new Date(2026, 10, 13);
  protected readonly vencimento = new FormControl<Date | null>(null);
  protected readonly reuniao = new FormControl<Date | null>(null, Validators.required);
  protected readonly dia = signal<Date | null>(null);
  protected readonly fimDeSemana = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Data de vencimento</label>
  <mx-date-picker formControlName="vencimento" [min]="hoje" />
  <mx-hint>dd/mm/aaaa</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'value', type: 'Date | null (model)', description: 'Também com ngModel e Reactive Forms.' },
    { kind: 'Input', name: 'min, max', type: 'Date | null', description: 'Limites do intervalo.' },
    { kind: 'Input', name: 'dateDisabled', type: '(d: Date) => boolean', description: 'Dias que não se podem escolher.' },
    { kind: 'Input', name: 'locale', type: 'string', default: 'pt-AO', description: 'Nomes de meses e dias.' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: 'dd/mm/aaaa' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    { kind: 'Directiva', name: 'mx-calendar', type: 'value, min, max, dateDisabled, locale, firstDayOfWeek', description: 'O calendário, para usar sozinho.' },
    { kind: 'Método', name: 'mxParseDate(texto), mxFormatDate(data)', type: 'funções', description: 'Conversão dd/mm/aaaa.' },
  ];
}
