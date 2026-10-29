import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxOption, MxSelect } from '@muxima-ui/core/select';
import { RouterLink } from '@angular/router';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-multi-select-page',
  imports: [DOC_UI, RouterLink, MxSelect, MxOption, MxFormField, MxLabel, MxHint, MxError, MxButton, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Multi-select' }]"
        title="Multi-select"
        lead="Várias escolhas numa lista. É o mesmo Select com o atributo multiple: o valor passa a ser uma lista e o painel fica aberto enquanto se escolhe."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de multi-select">
          <mx-form-field class="w-320">
            <label mxLabel>Províncias de entrega</label>
            <mx-select multiple placeholder="Escolhe uma ou mais" [(ngModel)]="provincias">
              @for (p of lista; track p) {
                <mx-option [value]="p">{{ p }}</mx-option>
              }
            </mx-select>
            <mx-hint>{{ provincias.length }} escolhidas.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxSelect, MxOption } from '@muxima-ui/core/select';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Cada opção tem uma caixa de verificação. O botão mostra até dois nomes; a partir de três, a contagem.</p>
        <doc-structure [labels]="{ topLeft: 'Resumo da escolha', topRight: 'Foco de 2 px', bottomLeft: 'Caixa de 12 px', bottomRight: 'Painel aberto', bottom: 'listbox com aria-multiselectable=true' }">
          <mx-select multiple class="w-180" aria-label="Exemplo" [value]="['a', 'b']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Benguela</mx-option></mx-select>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><mx-select multiple placeholder="Escolhe" aria-label="Vazio"><mx-option value="a">Luanda</mx-option></mx-select></doc-state>
          <doc-state name="Duas escolhas"><mx-select multiple aria-label="Duas" [value]="['a', 'b']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Huíla</mx-option></mx-select></doc-state>
          <doc-state name="Três ou mais"><mx-select multiple aria-label="Três" [value]="['a', 'b', 'c']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Huíla</mx-option><mx-option value="c">Namibe</mx-option></mx-select></doc-state>
          <doc-state name="Foco"><mx-select multiple aria-label="Foco" data-mx-state="focus" [value]="['a']"><mx-option value="a">Luanda</mx-option></mx-select></doc-state>
          <doc-state name="Desactivado"><mx-select multiple aria-label="Desactivado" disabled [value]="['a']"><mx-option value="a">Luanda</mx-option></mx-select></doc-state>
          <doc-state name="Erro"><mx-select multiple aria-label="Erro" invalid placeholder="Escolhe pelo menos uma" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Obrigatório, com Reactive Forms" note="Validators.required falha com a lista vazia.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Permissões</label>
                <mx-select multiple placeholder="Escolhe as permissões" [formControl]="permissoes">
                  <mx-option value="ler">Ler facturas</mx-option>
                  <mx-option value="emitir">Emitir facturas</mx-option>
                  <mx-option value="anular">Anular facturas</mx-option>
                  <mx-option value="admin" disabled>Administrar (só o dono)</mx-option>
                </mx-select>
                <mx-error>Escolhe pelo menos uma permissão.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" size="sm" (click)="permissoes.markAsTouched()">Validar</button></div>
            </div>
          </doc-example>
          <doc-example title="Pré-seleccionado, com ngModel" [note]="'Valor: ' + idiomas.join(', ')">
            <mx-form-field class="w-full">
              <label mxLabel>Idiomas da factura</label>
              <mx-select multiple [(ngModel)]="idiomas">
                <mx-option value="pt">Português</mx-option>
                <mx-option value="en">Inglês</mx-option>
                <mx-option value="fr">Francês</mx-option>
                <mx-option value="umb">Umbundu</mx-option>
                <mx-option value="kmb">Kimbundu</mx-option>
              </mx-select>
            </mx-form-field>
          </doc-example>
          <doc-example title="Com botões de seleccionar todas" note="Acções ao lado, para listas onde se escolhe quase tudo.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Armazéns</label>
                <mx-select multiple [(ngModel)]="armazens">
                  @for (a of todosArmazens; track a) {
                    <mx-option [value]="a">{{ a }}</mx-option>
                  }
                </mx-select>
              </mx-form-field>
              <div class="row-inline">
                <button mxButton type="button" variant="link" size="sm" (click)="armazens = [...todosArmazens]">Seleccionar todos</button>
                <button mxButton type="button" variant="link" size="sm" (click)="armazens = []">Limpar</button>
              </div>
            </div>
          </doc-example>
          <doc-example title="Tamanhos e desactivado">
            <div class="stack w-full">
              <mx-select multiple size="sm" aria-label="Pequeno" [value]="['a']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Huíla</mx-option></mx-select>
              <mx-select multiple size="lg" aria-label="Grande" [value]="['a', 'b']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Huíla</mx-option></mx-select>
              <mx-select multiple disabled aria-label="Desactivado" [value]="['a']"><mx-option value="a">Luanda</mx-option></mx-select>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Enter Espaço', action: 'Abrem o painel; dentro dele, marcam ou desmarcam a opção.' },
            { key: '↑ ↓ Home End', action: 'Movem entre opções.' },
            { key: 'Letra', action: 'Salta para a opção que começa por ela.' },
            { key: 'Esc Tab', action: 'Fecham o painel.' }
          ]"
          [aria]="[
            'listbox com aria-multiselectable=true; cada opção tem aria-selected.',
            'O painel não fecha ao escolher, para marcar várias seguidas.',
            'O botão anuncia o resumo da escolha.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>As mesmas entradas do <a class="text-link" routerLink="/pt/componentes/select">Select</a>, mais:</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Select' }, { name: 'Checkbox' }, { name: 'Combobox' }]" />
      </section>
    </article>
  `,
})
export class MultiSelectPage {
  protected idiomas: string[] = ['pt', 'en'];
  protected readonly todosArmazens = ['Talatona', 'Viana', 'Lobito', 'Lubango', 'Namibe'];
  protected armazens: string[] = ['Talatona'];

  protected readonly lista = ['Luanda', 'Benguela', 'Huambo', 'Huíla', 'Namibe', 'Cabinda'];
  protected provincias: string[] = ['Luanda'];
  protected readonly permissoes = new FormControl<string[]>([], Validators.required);

  protected readonly previewCode = `<mx-select multiple placeholder="Escolhe uma ou mais" [(ngModel)]="provincias">
  <mx-option value="Luanda">Luanda</mx-option>
  <mx-option value="Benguela">Benguela</mx-option>
</mx-select>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'multiple', type: 'boolean', default: 'false', description: 'Escolha múltipla.' },
    { kind: 'Input', name: 'value', type: 'T[] (model)', default: '[]', description: 'Lista dos valores escolhidos.' },
  ];
}
