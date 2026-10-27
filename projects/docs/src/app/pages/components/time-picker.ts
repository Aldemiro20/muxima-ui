import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFieldset, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { MxTimePicker } from '@muxima-ui/core/time-picker';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-time-picker-page',
  imports: [DOC_UI, MxTimePicker, MxFormField, MxLabel, MxHint, MxError, MxInput, MxButton, FormsModule, ReactiveFormsModule, MxFieldset],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Time picker' }]"
        title="Time picker"
        lead="Campo de hora em que se escreve como se fala (9, 930, 9h30) ou se escolhe numa lista com o intervalo que definires. O valor é sempre HH:mm, em 24 horas."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de time picker">
          <mx-form-field class="w-280">
            <label mxLabel>Hora da reunião</label>
            <mx-time-picker [(value)]="hora" [step]="15" min="08:00" max="18:00" />
            <mx-hint>Entre as 8h e as 18h.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxTimePicker } from '@muxima-ui/core/time-picker';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Um campo de texto com o papel de combobox e uma lista de horas que abre por baixo.</p>
        <doc-structure [labels]="{ topLeft: 'Texto livre: 9, 930, 9h30', topRight: 'Ícone do relógio', bottomLeft: 'Lista role=listbox', bottomRight: 'Horas de step em step', bottom: 'O valor é uma string HH:mm' }">
          <mx-time-picker class="w-180" aria-label="Exemplo" value="09:30" />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><mx-time-picker aria-label="Vazio" /></doc-state>
          <doc-state name="Com hora"><mx-time-picker aria-label="Com hora" value="09:30" /></doc-state>
          <doc-state name="Hover"><mx-time-picker aria-label="Hover" value="09:30" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco"><mx-time-picker aria-label="Foco" value="09:30" data-mx-state="focus" /></doc-state>
          <doc-state name="Desactivado"><mx-time-picker aria-label="Desactivado" value="09:30" disabled /></doc-state>
          <doc-state name="Erro" note="Hora inválida ou fora de min e max."><mx-time-picker aria-label="Erro" value="21:00" max="18:00" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Escrever à vontade" [note]="'Valor: ' + (livre() ?? 'nenhum') + '. Experimenta 9, 1430 ou 9h15.'">
            <mx-form-field class="w-full">
              <label mxLabel>Hora de chegada</label>
              <mx-time-picker [(value)]="livre" [step]="30" />
            </mx-form-field>
          </doc-example>
          <doc-example title="Início e fim" note="O mínimo do segundo campo é a hora do primeiro.">
            <fieldset mxFieldset orientation="horizontal" class="w-full">
              <legend>Horário de atendimento</legend>
              <mx-form-field class="grow">
                <label mxLabel>Abre</label>
                <mx-time-picker [(value)]="abre" [step]="30" [max]="fecha()" />
              </mx-form-field>
              <mx-form-field class="grow">
                <label mxLabel>Fecha</label>
                <mx-time-picker [(value)]="fecha" [step]="30" [min]="abre()" />
              </mx-form-field>
            </fieldset>
          </doc-example>
          <doc-example title="Com validação" note="Validators.required e min/max mostram o erro depois de tocar no campo.">
            <form class="stack w-full" [formGroup]="marcacao" (ngSubmit)="marcacao.markAllAsTouched()">
              <mx-form-field>
                <label mxLabel>Hora da consulta</label>
                <mx-time-picker formControlName="hora" [step]="20" min="08:00" max="16:40" />
                <mx-hint>De 20 em 20 minutos, das 8h às 16h40.</mx-hint>
                <mx-error>Escolhe uma hora entre as 8h e as 16h40.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit" size="sm">Marcar</button></div>
            </form>
          </doc-example>
          <doc-example title="Tamanhos">
            <div class="stack w-full">
              <mx-time-picker size="sm" aria-label="Pequeno" value="09:00" />
              <mx-time-picker aria-label="Médio" value="09:00" />
              <mx-time-picker size="lg" aria-label="Grande" value="09:00" />
            </div>
          </doc-example>
          <doc-example title="Alternativa nativa" note="input type=time com mxInput: sem lista, com o seletor do navegador.">
            <mx-form-field class="w-full">
              <label mxLabel>Início do turno</label>
              <input mxInput type="time" step="900" [(ngModel)]="turno" />
            </mx-form-field>
          </doc-example>
          <doc-example title="Data e hora" note="Junta um Date picker e um Time picker no mesmo fieldset.">
            <fieldset mxFieldset orientation="horizontal" class="w-full">
              <legend>Envio agendado</legend>
              <mx-form-field class="grow">
                <label mxLabel>Hora</label>
                <mx-time-picker [(value)]="envio" [step]="60" />
              </mx-form-field>
              <mx-form-field class="grow">
                <label mxLabel>Data e hora (nativo)</label>
                <input mxInput type="datetime-local" value="2026-11-02T08:00" />
              </mx-form-field>
            </fieldset>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: '↓ / Alt + ↓', action: 'Abre a lista na hora escolhida, ou na mais próxima da hora actual.' },
            { key: '↑ ↓', action: 'Hora anterior e seguinte na lista.' },
            { key: 'Page Up / Down', action: 'Salta 8 horas da lista.' },
            { key: 'Enter', action: 'Escolhe e fecha.' },
            { key: 'Esc', action: 'Fecha sem mudar.' },
            { key: 'Algarismos', action: 'Escrevem a hora directamente; a lista acompanha.' }
          ]"
          [aria]="[
            'Padrão WAI-ARIA combobox com lista: role=combobox, aria-expanded e aria-activedescendant.',
            'A hora escolhida tem aria-selected na lista.',
            'Uma hora fora de min e max deixa o campo com aria-invalid e mostra o erro do form field.',
            'Pode-se sempre escrever, sem abrir a lista.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Date picker' }, { name: 'Date range picker' }, { name: 'Combobox' }]" />
      </section>
    </article>
  `,
})
export class TimePickerPage {
  protected readonly hora = signal<string | null>('10:00');
  protected readonly livre = signal<string | null>(null);
  protected readonly abre = signal<string | null>('08:00');
  protected readonly fecha = signal<string | null>('17:00');
  protected readonly envio = signal<string | null>('08:00');
  protected turno = '07:45';
  protected readonly marcacao = new FormGroup({ hora: new FormControl<string | null>(null, Validators.required) });

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Hora da reunião</label>
  <mx-time-picker formControlName="hora" [step]="15" min="08:00" max="18:00" />
  <mx-hint>Entre as 8h e as 18h.</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'value', type: 'string | null (model)', description: 'HH:mm. Também com ngModel e Reactive Forms.' },
    { kind: 'Input', name: 'step', type: 'number', default: '30', description: 'Minutos entre as horas da lista.' },
    { kind: 'Input', name: 'min, max', type: 'string | null', description: 'Primeira e última hora, HH:mm.' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: 'hh:mm' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    { kind: 'Método', name: 'mxParseTime(texto)', type: 'string | null', description: 'Converte 9, 930, 9h30 em HH:mm.' },
    { kind: 'Método', name: 'mxTimeToMinutes(hora)', type: 'number', description: 'Minutos desde a meia-noite.' },
  ];
}
