import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxError, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-textarea-page',
  imports: [DOC_UI, ReactiveFormsModule, MxFormField, MxLabel, MxHint, MxError, MxInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Textarea' }]"
        title="Textarea"
        lead="Texto longo: descrições, observações, mensagens. Usa a mesma directiva do Input sobre o textarea nativo e pode crescer com o texto."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de textarea">
          <mx-form-field class="w-320">
            <label mxLabel>Observações</label>
            <textarea mxInput autosize rows="3" placeholder="Indica o horário de entrega preferido"></textarea>
            <mx-hint>Cresce com o texto até 320 px.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxFormField, MxLabel, MxInput, MxHint, MxError } from '@muxima-ui/core/form-field';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Igual ao Input, com altura mínima de 88 px e redimensionamento vertical.</p>
        <doc-structure [labels]="{ topLeft: 'Label (for)', topRight: 'Foco de 2 px', bottomLeft: 'Borda de 1 px', bottomRight: 'Mínimo 88 px', bottom: 'autosize: a altura acompanha o texto' }">
          <textarea mxInput tabindex="-1" rows="2" aria-label="Exemplo" class="w-180">Texto longo</textarea>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Hover e foco aparecem aqui fixos para comparação.</p>
        <doc-states>
          <doc-state name="Vazio" note="Mostra o placeholder."><textarea mxInput rows="2" placeholder="Escreve aqui" aria-label="Vazio"></textarea></doc-state>
          <doc-state name="Normal"><textarea mxInput rows="2" aria-label="Normal">Entregar de manhã.</textarea></doc-state>
          <doc-state name="Hover"><textarea mxInput rows="2" aria-label="Hover" data-mx-state="hover">Entregar de manhã.</textarea></doc-state>
          <doc-state name="Foco"><textarea mxInput rows="2" aria-label="Foco" data-mx-state="focus">Entregar de manhã.</textarea></doc-state>
          <doc-state name="Desactivado"><textarea mxInput rows="2" aria-label="Desactivado" disabled>Entregar de manhã.</textarea></doc-state>
          <doc-state name="Erro"><textarea mxInput rows="2" aria-label="Erro" invalid>Ok</textarea></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Contador de caracteres" note="O contador é uma ajuda (mx-hint), por isso o leitor de ecrã lê-o com o campo.">
            <mx-form-field class="w-full">
              <label mxLabel>Descrição do projecto</label>
              <textarea mxInput rows="4" [formControl]="descricao" [attr.maxlength]="max"></textarea>
              <mx-hint>{{ restantes() }} caracteres restantes</mx-hint>
              <mx-error>Escreve pelo menos 20 caracteres.</mx-error>
            </mx-form-field>
          </doc-example>
          <doc-example title="Altura automática">
            <mx-form-field class="w-full">
              <label mxLabel>Mensagem</label>
              <textarea mxInput autosize rows="2" placeholder="Escreve várias linhas para ver o campo crescer"></textarea>
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Entra e sai do campo.' }, { key: 'Enter', action: 'Nova linha (não envia o formulário).' }]"
          [aria]="[
            'textarea nativo com label ligado por for/id.',
            'Ajuda e erro em aria-describedby; aria-invalid depois de tocado.',
            'Evita limites rígidos sem aviso: mostra o contador como ajuda.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>textarea[mxInput]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Input' }, { name: 'Select' }, { name: 'Button' }]" />
      </section>
    </article>
  `,
})
export class TextareaPage {
  protected readonly max = 280;
  protected readonly descricao = new FormControl('', [Validators.required, Validators.minLength(20)]);
  private readonly texto = signal('');
  protected readonly restantes = computed(() => this.max - this.texto().length);

  constructor() {
    this.descricao.valueChanges.subscribe((v) => this.texto.set(v ?? ''));
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Observações</label>
  <textarea mxInput autosize rows="3"></textarea>
  <mx-hint>Cresce com o texto até 320 px.</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'autosize', type: 'boolean', default: 'false', description: 'Altura acompanha o texto (field-sizing), até 320 px.' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Força o estado de erro.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'gerado', description: 'id do textarea.' },
    { kind: 'Token CSS', name: '--mx-radius', type: 'length', default: '6px' },
  ];
}
