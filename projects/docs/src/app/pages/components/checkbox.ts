import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxChoice, MxChoiceDescription, MxError, MxFieldset, MxFormField } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-checkbox-page',
  imports: [DOC_UI, ReactiveFormsModule, MxCheckbox, MxChoice, MxFieldset, MxFormField, MxError, MxButton, MxChoiceDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Checkbox' }]"
        title="Checkbox"
        lead="Caixa de verificação sobre o input nativo, para escolhas independentes. Suporta o estado intermédio e funciona com ngModel e Reactive Forms sem configuração."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de checkbox">
          <fieldset mxFieldset>
            <legend>Notificações</legend>
            <label mxChoice><input type="checkbox" mxCheckbox checked /> Facturas emitidas</label>
            <label mxChoice><input type="checkbox" mxCheckbox /> Pagamentos recebidos</label>
            <label mxChoice><input type="checkbox" mxCheckbox disabled /> Relatório semanal (Pro)</label>
          </fieldset>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxChoice, MxFieldset } from '@muxima-ui/core/form-field';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>O label envolve a caixa e o texto: clicar no texto também marca. O fieldset dá um título ao grupo.</p>
        <doc-structure [labels]="{ topLeft: 'Caixa de 16 px', topRight: 'Foco de 2 px', bottomLeft: 'Raio de 4 px', bottomRight: 'Espaço de 8 px', bottom: 'label[mxChoice] envolve o input e o texto' }">
          <label mxChoice><input type="checkbox" mxCheckbox checked tabindex="-1" /> Aceito os termos</label>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Hover e foco aparecem aqui fixos para comparação.</p>
        <doc-states>
          <doc-state name="Normal"><input type="checkbox" mxCheckbox aria-label="Normal" /></doc-state>
          <doc-state name="Hover"><input type="checkbox" mxCheckbox aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco"><input type="checkbox" mxCheckbox aria-label="Foco" data-mx-state="focus" /></doc-state>
          <doc-state name="Marcado" note="checked"><input type="checkbox" mxCheckbox aria-label="Marcado" checked /></doc-state>
          <doc-state name="Intermédio" note="indeterminate"><input type="checkbox" mxCheckbox aria-label="Intermédio" indeterminate /></doc-state>
          <doc-state name="Desactivado" note="disabled"><input type="checkbox" mxCheckbox aria-label="Desactivado" disabled /><input type="checkbox" mxCheckbox aria-label="Desactivado e marcado" disabled checked /></doc-state>
          <doc-state name="Erro" note="invalid ou controlo inválido."><input type="checkbox" mxCheckbox aria-label="Erro" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Obrigatório, com Reactive Forms" note="O erro aparece depois de tentar continuar.">
            <div class="stack">
              <mx-form-field>
                <label mxChoice><input type="checkbox" mxCheckbox [formControl]="termos" /> Li e aceito os termos de serviço</label>
                <mx-error>Tens de aceitar os termos para continuar.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" (click)="termos.markAsTouched()">Continuar</button></div>
            </div>
          </doc-example>
          <doc-example title="Seleccionar todos" note="O estado intermédio indica que só parte está seleccionada.">
            <fieldset mxFieldset>
              <legend class="mx-visually-hidden">Províncias</legend>
              <label mxChoice>
                <input type="checkbox" mxCheckbox [checked]="allChecked()" [indeterminate]="someChecked()" (change)="toggleAll()" />
                Todas as províncias
              </label>
              @for (p of provincias; track p; let i = $index) {
                <label mxChoice class="indent">
                  <input type="checkbox" mxCheckbox [checked]="marcadas()[i]" (change)="toggle(i)" /> {{ p }}
                </label>
              }
            </fieldset>
          </doc-example>
          <doc-example title="Tamanhos" note="14, 16 e 20 px.">
            <label mxChoice><input type="checkbox" mxCheckbox size="sm" checked /> Pequeno</label>
            <label mxChoice><input type="checkbox" mxCheckbox checked /> Médio</label>
            <label mxChoice><input type="checkbox" mxCheckbox size="lg" checked /> Grande</label>
          </doc-example>
          <doc-example title="Em linha">
            <fieldset mxFieldset orientation="horizontal">
              <legend>Dias de atendimento</legend>
              <label mxChoice><input type="checkbox" mxCheckbox checked /> Seg</label>
              <label mxChoice><input type="checkbox" mxCheckbox checked /> Ter</label>
              <label mxChoice><input type="checkbox" mxCheckbox checked /> Qua</label>
              <label mxChoice><input type="checkbox" mxCheckbox /> Sáb</label>
            </fieldset>
          </doc-example>
          <doc-example title="Com descrição" note="mxChoiceDescription por baixo do título.">
            <fieldset mxFieldset>
              <legend>Permissões</legend>
              <label mxChoice><input type="checkbox" mxCheckbox checked /><span>Emitir facturas<span mxChoiceDescription>Criar e enviar facturas aos clientes.</span></span></label>
              <label mxChoice><input type="checkbox" mxCheckbox /><span>Anular facturas<span mxChoiceDescription>Exige justificação; fica no histórico.</span></span></label>
              <label mxChoice><input type="checkbox" mxCheckbox disabled /><span>Gerir utilizadores<span mxChoiceDescription>Só o administrador da conta.</span></span></label>
            </fieldset>
          </doc-example>
          <doc-example title="Em cartões" note="card: a área toda é clicável e a escolhida fica com borda Kwanza.">
            <fieldset mxFieldset class="w-full">
              <legend>Módulos a activar</legend>
              <label mxChoice card><input type="checkbox" mxCheckbox checked /><span>Facturação<span mxChoiceDescription>Facturas, recibos e notas de crédito.</span></span></label>
              <label mxChoice card><input type="checkbox" mxCheckbox /><span>Stock<span mxChoiceDescription>Armazéns, entradas e saídas.</span></span></label>
              <label mxChoice card><input type="checkbox" mxCheckbox /><span>Recursos humanos<span mxChoiceDescription>Processamento de salários.</span></span></label>
            </fieldset>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Move o foco para a caixa.' }, { key: 'Espaço', action: 'Marca ou desmarca.' }]"
          [aria]="[
            'É um input type=checkbox nativo: o leitor de ecrã anuncia o estado marcado, desmarcado ou misto.',
            'O label envolvente dá o nome acessível sem ids.',
            'Agrupa com fieldset e legend para anunciar o título do grupo.',
            'O erro entra em aria-describedby e aria-invalid quando o campo foi tocado.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>input[type=checkbox][mxCheckbox]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Radio' }, { name: 'Switch' }, { name: 'Multi-select' }]" />
      </section>
    </article>
  `,
})
export class CheckboxPage {
  protected readonly termos = new FormControl(false, Validators.requiredTrue);
  protected readonly provincias = ['Luanda', 'Benguela', 'Huíla'];
  protected readonly marcadas = signal([true, false, false]);
  protected readonly allChecked = computed(() => this.marcadas().every(Boolean));
  protected readonly someChecked = computed(() => this.marcadas().some(Boolean) && !this.allChecked());

  protected toggle(i: number): void {
    this.marcadas.update((m) => m.map((v, j) => (j === i ? !v : v)));
  }
  protected toggleAll(): void {
    const next = !this.allChecked();
    this.marcadas.update((m) => m.map(() => next));
  }

  protected readonly previewCode = `<fieldset mxFieldset>
  <legend>Notificações</legend>
  <label mxChoice><input type="checkbox" mxCheckbox checked /> Facturas emitidas</label>
  <label mxChoice><input type="checkbox" mxCheckbox /> Pagamentos recebidos</label>
  <label mxChoice><input type="checkbox" mxCheckbox disabled /> Relatório semanal (Pro)</label>
</fieldset>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '14, 16 ou 20 px.' },
    { kind: 'Input', name: 'indeterminate', type: 'boolean', default: 'false', description: 'Estado intermédio (misto).' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Força o estado de erro.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'gerado', description: 'id do input.' },
    { kind: 'Directiva', name: 'label[mxChoice]', type: 'directiva', description: 'Label que envolve o controlo e o texto.' },
    { kind: 'Directiva', name: 'fieldset[mxFieldset]', type: "orientation: 'vertical' | 'horizontal'", default: 'vertical', description: 'Grupo com legend.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Cor quando marcado.' },
  ];
}
