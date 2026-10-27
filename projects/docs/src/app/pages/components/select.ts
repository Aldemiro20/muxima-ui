import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxOption, MxSelect } from '@muxima-ui/core/select';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

interface Plano {
  id: string;
  nome: string;
}

@Component({
  selector: 'doc-select-page',
  imports: [DOC_UI, FormsModule, ReactiveFormsModule, MxFormField, MxLabel, MxHint, MxError, MxSelect, MxOption, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Select' }]"
        title="Select"
        lead="Escolha de uma opção numa lista. Abre com o teclado, pesquisa pela primeira letra e funciona com ngModel e Reactive Forms."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de selecção">
          <mx-form-field class="w-280">
            <label mxLabel>Província</label>
            <mx-select placeholder="Escolhe uma província" [(ngModel)]="provincia">
              @for (p of provincias; track p) {
                <mx-option [value]="p">{{ p }}</mx-option>
              }
            </mx-select>
            <mx-hint>Seleccionado: {{ provincia ?? 'nenhuma' }}</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxSelect, MxOption } from '@muxima-ui/core/select';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Um botão com papel de combobox abre a lista numa camada flutuante, sem sair do campo.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Valor actual',
            topRight: 'Foco de 2 px',
            bottomLeft: 'Raio de 6 px',
            bottomRight: 'Indicador de lista',
            bottom: 'A lista abre por baixo e sobe se não houver espaço'
          }"
        >
          <mx-select class="w-180" placeholder="Luanda" aria-label="Exemplo de selecção" />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Sem opções, o painel mostra o texto de emptyText.</p>
        <doc-states>
          <doc-state name="Vazio" note="Mostra o placeholder."><mx-select placeholder="Escolhe o sector" aria-label="Vazio" /></doc-state>
          <doc-state name="Normal"><mx-select aria-label="Normal" [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select></doc-state>
          <doc-state name="Hover"><mx-select aria-label="Hover" data-mx-state="hover" [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select></doc-state>
          <doc-state name="Foco"><mx-select aria-label="Foco" data-mx-state="focus" [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select></doc-state>
          <doc-state name="Desactivado" note="disabled"><mx-select aria-label="Desactivado" disabled [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select></doc-state>
          <doc-state name="Erro" note="invalid ou controlo inválido."><mx-form-field><label mxLabel>Sector</label><mx-select invalid placeholder="Escolhe o sector" /><mx-error>Escolhe um sector.</mx-error></mx-form-field></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Obrigatório, com Reactive Forms">
            <div class="stack">
              <mx-form-field>
                <label mxLabel>Sector</label>
                <mx-select placeholder="Escolhe o sector" [formControl]="sector">
                  <mx-option value="banca">Banca e seguros</mx-option>
                  <mx-option value="energia">Energia e petróleo</mx-option>
                  <mx-option value="telecom">Telecomunicações</mx-option>
                  <mx-option value="estado">Administração pública</mx-option>
                </mx-select>
                <mx-error>Escolhe um sector para continuar.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" (click)="sector.markAsTouched()">Validar</button></div>
            </div>
          </doc-example>
          <doc-example title="Opção desactivada">
            <mx-form-field class="w-full">
              <label mxLabel>Moeda</label>
              <mx-select [(ngModel)]="moeda">
                <mx-option value="AOA">Kwanza (AOA)</mx-option>
                <mx-option value="USD">Dólar (USD)</mx-option>
                <mx-option value="EUR" disabled>Euro (EUR), indisponível</mx-option>
              </mx-select>
            </mx-form-field>
          </doc-example>
          <doc-example title="Valores que são objectos" note="compareWith compara pelo id.">
            <mx-form-field class="w-full">
              <label mxLabel>Plano</label>
              <mx-select [(ngModel)]="plano" [compareWith]="porId">
                @for (p of planos; track p.id) {
                  <mx-option [value]="p">{{ p.nome }}</mx-option>
                }
              </mx-select>
            </mx-form-field>
          </doc-example>
          <doc-example title="Desactivado">
            <mx-form-field class="w-full">
              <label mxLabel>Região</label>
              <mx-select placeholder="Indisponível neste plano" disabled />
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: '↓ ↑ Enter Espaço', action: 'Abrem a lista com a opção actual activa.' },
            { key: '↓ ↑', action: 'Movem entre opções, saltando as desactivadas.' },
            { key: 'Home End', action: 'Primeira e última opção.' },
            { key: 'Letra', action: 'Salta para a opção que começa por essa letra.' },
            { key: 'Enter Espaço', action: 'Escolhem a opção activa e fecham a lista.' },
            { key: 'Esc', action: 'Fecha sem alterar o valor.' }
          ]"
          [aria]="[
            'Padrão WAI-ARIA select-only combobox: o foco fica no botão e a opção activa é indicada por aria-activedescendant.',
            'aria-expanded e aria-controls mostram o estado da lista.',
            'A lista tem role=&quot;listbox&quot; e o nome do label; cada opção tem role=&quot;option&quot; e aria-selected.',
            'Opções desactivadas têm aria-disabled e não podem ser escolhidas.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Input', path: '/componentes/input' }, { name: 'Combobox' }, { name: 'Multi-select' }]" />
      </section>
    </article>
  `,
})
export class SelectPage {
  protected readonly provincias = ['Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuanza Norte', 'Cuanza Sul', 'Huambo', 'Huíla', 'Luanda', 'Malanje', 'Namibe', 'Uíge', 'Zaire'];
  protected provincia: string | null = 'Luanda';
  protected moeda = 'AOA';
  protected readonly planos: Plano[] = [
    { id: 'free', nome: 'Open Source' },
    { id: 'pro', nome: 'Pro' },
    { id: 'ent', nome: 'Enterprise' },
  ];
  protected plano: Plano = { id: 'pro', nome: 'Pro' };
  protected readonly sector = new FormControl<string | null>(null, Validators.required);
  protected readonly porId = (a: Plano | null, b: Plano | null) => a?.id === b?.id;

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Província</label>
  <mx-select placeholder="Escolhe uma província" [(ngModel)]="provincia">
    @for (p of provincias; track p) {
      <mx-option [value]="p">{{ p }}</mx-option>
    }
  </mx-select>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'value', type: 'T | null', default: 'null', description: 'Aceita [(value)], ngModel e formControl.' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: "'Seleccionar'" },
    { kind: 'Input', name: 'disabled', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'required', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'compareWith', type: '(a, b) => boolean', default: 'Object.is' },
    { kind: 'Output', name: 'opened, closed', type: 'void' },
    { kind: 'Directiva', name: 'mx-option', type: 'MxOption', description: 'Inputs value (obrigatório) e disabled.' },
  ];
}
