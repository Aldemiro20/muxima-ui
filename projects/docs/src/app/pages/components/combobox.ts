import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxCombobox } from '@muxima-ui/core/combobox';
import { MxError, MxFormField, MxHint, MxLabel, mxNormalize } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

interface Cliente {
  id: number;
  nome: string;
  nif: string;
}

const PROVINCIAS = ['Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando', 'Cuanza Norte', 'Cuanza Sul', 'Cubango', 'Cunene', 'Huambo', 'Huíla', 'Icolo e Bengo', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 'Moxico Leste', 'Namibe', 'Uíge', 'Zaire'];

@Component({
  selector: 'doc-combobox-page',
  imports: [DOC_UI, MxCombobox, MxFormField, MxLabel, MxHint, MxError, MxButton, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Combobox' }]"
        title="Combobox"
        lead="Escrever para filtrar e escolher numa lista longa. Segue o padrão WAI-ARIA combobox com lista, e a pesquisa ignora acentos: huila encontra Huíla."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de combobox">
          <mx-form-field class="w-320">
            <label mxLabel>Província</label>
            <mx-combobox [options]="provincias" [(ngModel)]="provincia" placeholder="Escreve para pesquisar" />
            <mx-hint>21 províncias.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxCombobox } from '@muxima-ui/core/combobox';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Um input com role combobox e uma lista flutuante. O valor é a opção escolhida, não o texto escrito.</p>
        <doc-structure [labels]="{ topLeft: 'input role=combobox', topRight: 'Foco de 2 px', bottomLeft: 'Lista role=listbox', bottomRight: 'Altura de 36 px', bottom: 'aria-activedescendant aponta para a opção activa' }">
          <div class="mx-input w-180 fake-input">Hu|</div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><mx-combobox [options]="provincias" aria-label="Vazio" /></doc-state>
          <doc-state name="Com valor"><mx-combobox [options]="provincias" [value]="'Luanda'" aria-label="Com valor" /></doc-state>
          <doc-state name="Hover"><mx-combobox [options]="provincias" [value]="'Luanda'" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco"><mx-combobox [options]="provincias" [value]="'Luanda'" aria-label="Foco" data-mx-state="focus" /></doc-state>
          <doc-state name="A pesquisar" note="loading"><mx-combobox [options]="provincias" [value]="'Hu'" aria-label="A pesquisar" loading /></doc-state>
          <doc-state name="Desactivado"><mx-combobox [options]="provincias" [value]="'Luanda'" aria-label="Desactivado" disabled /></doc-state>
          <doc-state name="Erro"><mx-combobox [options]="provincias" aria-label="Erro" invalid /></doc-state>
          <doc-state name="Sem resultados" note="emptyText na lista."><div class="mx-select-panel static-panel"><div class="mx-select-empty">Sem resultados</div></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Objectos, com Reactive Forms" note="displayWith diz que texto mostrar; o valor é o objecto.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Cliente</label>
                <mx-combobox [options]="clientes" [displayWith]="nomeCliente" [formControl]="cliente" placeholder="Nome do cliente" />
                <mx-error>Escolhe um cliente da lista.</mx-error>
              </mx-form-field>
              <p class="small-label">Valor: {{ cliente.value ? 'NIF ' + cliente.value.nif : 'nenhum' }}</p>
              <div><button mxButton type="button" size="sm" (click)="cliente.markAsTouched()">Validar</button></div>
            </div>
          </doc-example>
          <doc-example title="Pesquisa no servidor" note="(search) emite o texto e loading mostra que os resultados estão a chegar.">
            <mx-form-field class="w-full">
              <label mxLabel>Produto</label>
              <mx-combobox [options]="remote()" placeholder="Escreve pelo menos 2 letras" [loading]="searching()" (search)="query($event)" [(ngModel)]="produto" />
              <mx-hint>{{ produto ? 'Escolhido: ' + produto : 'Os resultados chegam 400 ms depois.' }}</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example title="Tamanhos">
            <div class="stack w-full">
              <mx-combobox size="sm" [options]="provincias" aria-label="Pequeno" />
              <mx-combobox [options]="provincias" aria-label="Médio" />
              <mx-combobox size="lg" [options]="provincias" aria-label="Grande" />
            </div>
          </doc-example>
          <doc-example title="Desactivado e obrigatório">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Província de origem</label>
                <mx-combobox [options]="provincias" [value]="'Luanda'" disabled />
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Província de destino</label>
                <mx-combobox [options]="provincias" required [formControl]="destino" />
                <mx-error>Escolhe a província de destino.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" size="sm" (click)="destino.markAsTouched()">Validar</button></div>
            </div>
          </doc-example>
        </div>
        <doc-callout>Para listas curtas (até 10 opções) usa o Select. O Combobox compensa quando há muito por onde escolher.</doc-callout>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: '↓', action: 'Abre a lista ou desce uma opção.' },
            { key: '↑', action: 'Sobe uma opção.' },
            { key: 'Enter', action: 'Escolhe a opção activa.' },
            { key: 'Esc', action: 'Fecha a lista; outra vez limpa o campo.' },
            { key: 'Alt + ↓ / ↑', action: 'Abre ou fecha sem mover.' }
          ]"
          [aria]="[
            'input com role=combobox, aria-autocomplete=list, aria-expanded e aria-controls.',
            'O foco fica no input; aria-activedescendant indica a opção activa.',
            'O label, a ajuda e o erro ficam ligados como em qualquer campo.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>mx-combobox</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Select' }, { name: 'Multi-select' }, { name: 'Command Palette' }]" />
      </section>
    </article>
  `,
})
export class ComboboxPage {
  private readonly PRODUTOS = ['Arroz 25 kg', 'Açúcar 1 kg', 'Óleo vegetal 5 L', 'Farinha de milho 25 kg', 'Feijão 1 kg', 'Fuba de bombó', 'Massa esparguete', 'Leite em pó'];
  protected readonly remote = signal<string[]>([]);
  protected readonly searching = signal(false);
  protected produto: string | null = null;
  protected readonly destino = new FormControl<string | null>(null, Validators.required);
  private timer?: ReturnType<typeof setTimeout>;
  protected query(text: string): void {
    clearTimeout(this.timer);
    if (text.trim().length < 2) {
      this.remote.set([]);
      return;
    }
    this.searching.set(true);
    this.timer = setTimeout(() => {
      const q = mxNormalize(text);
      this.remote.set(this.PRODUTOS.filter((p) => mxNormalize(p).includes(q)));
      this.searching.set(false);
    }, 400);
  }

  protected readonly provincias = PROVINCIAS;
  protected provincia: string | null = null;
  protected readonly clientes: Cliente[] = [
    { id: 1, nome: 'Kianda Logística', nif: '5417039842' },
    { id: 2, nome: 'Banco Mutamba', nif: '5000123456' },
    { id: 3, nome: 'Huíla Agro', nif: '5480001123' },
    { id: 4, nome: 'Energia do Cuanza', nif: '5401298877' },
  ];
  protected readonly cliente = new FormControl<Cliente | null>(null, Validators.required);
  protected readonly nomeCliente = (c: Cliente) => c.nome;

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Província</label>
  <mx-combobox [options]="provincias" [(ngModel)]="provincia" />
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'options', type: 'T[]', description: 'Obrigatório. Lista de opções.' },
    { kind: 'Input', name: 'value', type: 'T | null (model)', description: 'Opção escolhida. Também com ngModel e Reactive Forms.' },
    { kind: 'Input', name: 'displayWith', type: '(o: T) => string', default: 'String(o)' },
    { kind: 'Input', name: 'compareWith', type: '(a, b) => boolean', default: 'Object.is' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: 'Pesquisar' },
    { kind: 'Input', name: 'emptyText', type: 'string', default: 'Sem resultados' },
    { kind: 'Input', name: 'loading', type: 'boolean', default: 'false', description: 'Indicador no campo e na lista, com aria-busy.' },
    { kind: 'Input', name: 'loadingText', type: 'string', default: 'A pesquisar...' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    { kind: 'Output', name: 'search', type: 'string', description: 'Texto escrito, para pesquisar no servidor.' },
  ];
}
