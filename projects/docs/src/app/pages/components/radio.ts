import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxChoice, MxChoiceDescription, MxError, MxFieldset, MxFormField } from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-radio-page',
  imports: [DOC_UI, FormsModule, ReactiveFormsModule, MxRadio, MxChoice, MxFieldset, MxFormField, MxError, MxButton, MxChoiceDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Radio' }]"
        title="Radio"
        lead="Uma escolha entre poucas opções, todas visíveis. Assenta no input radio nativo, por isso as setas mudam a opção como em qualquer formulário do navegador."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de radio">
          <fieldset mxFieldset>
            <legend>Periodicidade da factura</legend>
            <label mxChoice><input type="radio" mxRadio name="prev" value="mensal" [(ngModel)]="periodo" /> Mensal</label>
            <label mxChoice><input type="radio" mxRadio name="prev" value="trimestral" [(ngModel)]="periodo" /> Trimestral</label>
            <label mxChoice><input type="radio" mxRadio name="prev" value="anual" [(ngModel)]="periodo" /> Anual, com 2 meses grátis</label>
          </fieldset>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxRadio } from '@muxima-ui/core/radio';
import { MxChoice, MxFieldset } from '@muxima-ui/core/form-field';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Os botões do mesmo grupo partilham o atributo name e ficam dentro de um fieldset com legend.</p>
        <doc-structure [labels]="{ topLeft: 'Círculo de 16 px', topRight: 'Foco de 2 px', bottomLeft: 'Ponto de 6 px', bottomRight: 'Espaço de 8 px', bottom: 'Mesmo name em todas as opções do grupo' }">
          <label mxChoice><input type="radio" mxRadio checked tabindex="-1" name="struct" /> Mensal</label>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Hover e foco aparecem aqui fixos para comparação.</p>
        <doc-states>
          <doc-state name="Normal"><input type="radio" mxRadio name="s1" aria-label="Normal" /></doc-state>
          <doc-state name="Hover"><input type="radio" mxRadio name="s2" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco"><input type="radio" mxRadio name="s3" aria-label="Foco" data-mx-state="focus" /></doc-state>
          <doc-state name="Seleccionado" note="checked"><input type="radio" mxRadio name="s4" aria-label="Seleccionado" checked /></doc-state>
          <doc-state name="Desactivado" note="disabled"><input type="radio" mxRadio name="s5" aria-label="Desactivado" disabled /><input type="radio" mxRadio name="s6" aria-label="Desactivado e seleccionado" disabled checked /></doc-state>
          <doc-state name="Erro" note="Nenhuma opção escolhida."><input type="radio" mxRadio name="s7" aria-label="Erro" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Obrigatório, com Reactive Forms">
            <div class="stack">
              <mx-form-field>
                <fieldset mxFieldset>
                  <legend>Forma de pagamento</legend>
                  <label mxChoice><input type="radio" mxRadio name="pag" value="referencia" [formControl]="pagamento" /> Pagamento por referência</label>
                  <label mxChoice><input type="radio" mxRadio name="pag" value="transferencia" [formControl]="pagamento" /> Transferência bancária</label>
                  <label mxChoice><input type="radio" mxRadio name="pag" value="multicaixa" [formControl]="pagamento" /> Multicaixa Express</label>
                </fieldset>
                <mx-error>Escolhe uma forma de pagamento.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" (click)="pagamento.markAsTouched()">Continuar</button></div>
            </div>
          </doc-example>
          <doc-example title="Em linha e tamanhos" note="Em linha só para 2 ou 3 opções curtas.">
            <div class="stack">
              <fieldset mxFieldset orientation="horizontal">
                <legend>Tipo de cliente</legend>
                <label mxChoice><input type="radio" mxRadio name="tipo" checked /> Particular</label>
                <label mxChoice><input type="radio" mxRadio name="tipo" /> Empresa</label>
              </fieldset>
              <fieldset mxFieldset orientation="horizontal">
                <legend>Tamanhos</legend>
                <label mxChoice><input type="radio" mxRadio name="tam" size="sm" checked /> Pequeno</label>
                <label mxChoice><input type="radio" mxRadio name="tam" /> Médio</label>
                <label mxChoice><input type="radio" mxRadio name="tam" size="lg" /> Grande</label>
              </fieldset>
            </div>
          </doc-example>
          <doc-example title="Com descrição">
            <fieldset mxFieldset>
              <legend>Envio</legend>
              <label mxChoice><input type="radio" mxRadio name="envio" checked /><span>Normal<span mxChoiceDescription>3 a 5 dias úteis · grátis</span></span></label>
              <label mxChoice><input type="radio" mxRadio name="envio" /><span>Expresso<span mxChoiceDescription>24 horas em Luanda · 5 000 Kz</span></span></label>
              <label mxChoice><input type="radio" mxRadio name="envio" /><span>Levantar na loja<span mxChoiceDescription>Talatona, a partir de amanhã</span></span></label>
            </fieldset>
          </doc-example>
          <doc-example title="Em cartões" [note]="'Escolhido: ' + plano">
            <fieldset mxFieldset class="w-full">
              <legend>Plano</legend>
              @for (p of planos; track p.id) {
                <label mxChoice card>
                  <input type="radio" mxRadio name="plano-card" [value]="p.id" [(ngModel)]="plano" />
                  <span>{{ p.nome }}<span mxChoiceDescription>{{ p.desc }}</span></span>
                </label>
              }
            </fieldset>
          </doc-example>
          <doc-example title="Opção desactivada" note="Explica porquê, no próprio texto.">
            <fieldset mxFieldset>
              <legend>Moeda da factura</legend>
              <label mxChoice><input type="radio" mxRadio name="moeda" checked /> Kwanza (AOA)</label>
              <label mxChoice><input type="radio" mxRadio name="moeda" /> Dólar (USD)</label>
              <label mxChoice><input type="radio" mxRadio name="moeda" disabled /> Euro (EUR), disponível em Dezembro</label>
            </fieldset>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Entra no grupo, na opção seleccionada.' },
            { key: 'Setas', action: 'Mudam e seleccionam a opção.' },
            { key: 'Espaço', action: 'Selecciona a opção com foco.' }
          ]"
          [aria]="[
            'Inputs radio nativos com o mesmo name formam um grupo: só um entra na ordem de tabulação.',
            'O fieldset e a legend dão o nome ao grupo.',
            'O erro do grupo entra em aria-describedby de cada opção.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>input[type=radio][mxRadio]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Checkbox' }, { name: 'Select' }, { name: 'Switch' }]" />
      </section>
    </article>
  `,
})
export class RadioPage {
  protected plano = 'equipa';
  protected readonly planos = [
    { id: 'basico', nome: 'Básico', desc: 'Grátis, 1 utilizador' },
    { id: 'equipa', nome: 'Equipa', desc: '25 000 Kz/mês, até 10 utilizadores' },
    { id: 'empresa', nome: 'Empresa', desc: 'Sob consulta, utilizadores ilimitados' },
  ];

  protected periodo = 'mensal';
  protected readonly pagamento = new FormControl<string | null>(null, Validators.required);

  protected readonly previewCode = `<fieldset mxFieldset>
  <legend>Periodicidade da factura</legend>
  <label mxChoice><input type="radio" mxRadio name="periodo" value="mensal" [(ngModel)]="periodo" /> Mensal</label>
  <label mxChoice><input type="radio" mxRadio name="periodo" value="trimestral" [(ngModel)]="periodo" /> Trimestral</label>
  <label mxChoice><input type="radio" mxRadio name="periodo" value="anual" [(ngModel)]="periodo" /> Anual</label>
</fieldset>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '14, 16 ou 20 px.' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Força o estado de erro.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'gerado', description: 'id do input.' },
    { kind: 'Directiva', name: 'fieldset[mxFieldset]', type: "orientation: 'vertical' | 'horizontal'", default: 'vertical', description: 'Grupo com legend.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Cor da opção seleccionada.' },
  ];
}
