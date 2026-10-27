import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-time-picker-page',
  imports: [DOC_UI, MxFormField, MxLabel, MxHint, MxInput, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Time picker' }]"
        title="Time picker"
        lead="Horas e minutos com o input type=time nativo e a directiva mxInput. O navegador dá o teclado certo, o formato de 24 horas e a leitura por leitores de ecrã."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de time picker">
          <mx-form-field class="w-180">
            <label mxLabel>Hora da reunião</label>
            <input mxInput type="time" [(ngModel)]="hora" min="08:00" max="18:00" />
            <mx-hint>Entre as 8h e as 18h.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxInput } from '@muxima-ui/core/form-field';" />
        <doc-callout>Não há componente próprio: o campo nativo já cumpre o padrão de qualidade (teclado, formulários, leitores de ecrã), e a Muxima só lhe dá o visual e os estados.</doc-callout>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><input mxInput type="time" aria-label="Vazio" /></doc-state>
          <doc-state name="Com hora"><input mxInput type="time" value="09:30" aria-label="Com hora" /></doc-state>
          <doc-state name="Hover"><input mxInput type="time" value="09:30" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco"><input mxInput type="time" value="09:30" aria-label="Foco" data-mx-state="focus" /></doc-state>
          <doc-state name="Desactivado"><input mxInput type="time" value="09:30" aria-label="Desactivado" disabled /></doc-state>
          <doc-state name="Erro"><input mxInput type="time" value="21:00" aria-label="Erro" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Intervalos de 15 minutos" note="step em segundos: 900 = 15 min.">
            <mx-form-field class="w-full">
              <label mxLabel>Início do turno</label>
              <input mxInput type="time" step="900" value="07:45" />
            </mx-form-field>
          </doc-example>
          <doc-example title="Data e hora" note="type=datetime-local, também nativo.">
            <mx-form-field class="w-full">
              <label mxLabel>Envio agendado</label>
              <input mxInput type="datetime-local" value="2026-11-02T08:00" />
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: '← →', action: 'Mudam entre horas e minutos.' }, { key: '↑ ↓', action: 'Aumentam ou diminuem o valor.' }, { key: 'Algarismos', action: 'Escrevem a hora directamente.' }]"
          [aria]="[
            'Campo nativo: o leitor de ecrã anuncia horas e minutos em separado.',
            'min, max e step validam no próprio navegador.',
            'O ícone do relógio segue o modo claro ou escuro (color-scheme).'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Date picker' }, { name: 'Input' }, { name: 'Select' }]" />
      </section>
    </article>
  `,
})
export class TimePickerPage {
  protected hora = '10:00';
  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Hora da reunião</label>
  <input mxInput type="time" min="08:00" max="18:00" [(ngModel)]="hora" />
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: 'input[type=time][mxInput]', type: 'directiva', description: 'O mesmo Input, com o tipo nativo.' },
    { kind: 'Input', name: 'min, max', type: 'HH:MM', description: 'Atributos nativos.' },
    { kind: 'Input', name: 'step', type: 'segundos', default: '60' },
    { kind: 'Input', name: 'size, invalid', type: 'como no Input' },
  ];
}
