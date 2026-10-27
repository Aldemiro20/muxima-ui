import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxCopy, MxCopyButton } from '@muxima-ui/core/clipboard';
import { MxFormField, MxHint, MxInput, MxInputGroup, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-clipboard-page',
  imports: [DOC_UI, MxCopy, MxCopyButton, MxButton, MxFormField, MxLabel, MxHint, MxInput, MxInputGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Copy to clipboard' }]"
        title="Copy to clipboard"
        lead="Copiar um valor com um clique: IBAN, referência de pagamento, chave da API. A directiva mxCopy serve em qualquer botão; mxCopyButton é o botão de ícone pronto."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de copiar">
          <mx-form-field class="w-320">
            <label mxLabel>IBAN</label>
            <div mxInputGroup>
              <input mxInput readonly [value]="iban" />
              <button mxCopyButton [value]="iban" label="Copiar IBAN"></button>
            </div>
            <mx-hint>Banco Mutamba, conta à ordem.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxCopy, MxCopyButton } from '@muxima-ui/core/clipboard';" />
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Normal"><button mxCopyButton value="x" label="Copiar"></button></doc-state>
          <doc-state name="Hover"><button mxCopyButton value="x" label="Copiar" data-mx-state="hover"></button></doc-state>
          <doc-state name="Foco"><button mxCopyButton value="x" label="Copiar" data-mx-state="focus"></button></doc-state>
          <doc-state name="Copiado" note="Durante 2 s depois do clique: experimenta."><button mxCopyButton value="x" label="Copiar">Copiar</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Em qualquer botão" note="mxCopy dá data-copied ao botão durante 2 s; #c=mxCopy lê o estado.">
            <button mxButton variant="outline" [mxCopy]="referencia" #c="mxCopy">{{ c.copied() ? 'Copiada' : 'Copiar referência' }}</button>
          </doc-example>
          <doc-example title="Chave da API" note="Botão com ícone e texto.">
            <div class="copy-row">
              <code class="copy-code">{{ chave }}</code>
              <button mxCopyButton [value]="chave" label="Copiar chave da API" size="sm">Copiar</button>
            </div>
          </doc-example>
          <doc-example title="Dados de pagamento" note="Uma linha por valor; o nome de cada botão diz o que copia.">
            <dl class="copy-list">
              @for (d of pagamento; track d.nome) {
                <div>
                  <dt>{{ d.nome }}</dt>
                  <dd><span>{{ d.valor }}</span><button mxCopyButton size="sm" [value]="d.valor" [label]="'Copiar ' + d.nome"></button></dd>
                </div>
              }
            </dl>
          </doc-example>
          <doc-example title="Partilhar ligação" note="Num grupo de input com o botão no fim.">
            <mx-form-field class="w-full">
              <label mxLabel>Ligação da factura</label>
              <div mxInputGroup>
                <input mxInput readonly [value]="link" />
                <button mxCopyButton [value]="link" label="Copiar ligação"></button>
              </div>
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Enter Espaço', action: 'Copiam (são botões).' }]"
          [aria]="[
            'Copiado é anunciado ao leitor de ecrã, sem mexer no foco.',
            'O botão de ícone tem nome (label) e muda para Copiado durante 2 s.',
            'Se o navegador recusar, é anunciado Não foi possível copiar; o valor continua visível para seleccionar.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Button' }, { name: 'Input' }, { name: 'Toast' }]" />
      </section>
    </article>
  `,
})
export class ClipboardPage {
  protected readonly iban = 'AO06 0040 0000 1234 5678 9012 3';
  protected readonly referencia = '231 456 789';
  protected readonly chave = 'mx_test_4f9a2c7e1b';
  protected readonly link = 'https://kianda.ao/f/FT-2026-0142';
  protected readonly pagamento = [
    { nome: 'Entidade', valor: '00123' },
    { nome: 'Referência', valor: '231 456 789' },
    { nome: 'Montante', valor: '120 000,00 Kz' },
  ];

  protected readonly previewCode = `<div mxInputGroup>
  <input mxInput readonly [value]="iban" />
  <button mxCopyButton [value]="iban" label="Copiar IBAN"></button>
</div>

<button mxButton variant="outline" [mxCopy]="referencia">Copiar referência</button>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxCopy]', type: 'string', description: 'Texto a copiar quando o elemento é clicado.' },
    { kind: 'Input', name: 'mxCopyMessage', type: 'string', default: 'Copiado', description: 'Mensagem anunciada.' },
    { kind: 'Output', name: 'mxCopied', type: 'boolean', description: 'true se copiou, false se o navegador recusou.' },
    { kind: 'Propriedade', name: 'copied()', type: 'signal<boolean>', description: 'true durante 2 s (exportAs mxCopy).' },
    { kind: 'Componente', name: 'button[mxCopyButton]', type: 'value, label, copiedLabel, size', description: 'Botão de ícone pronto.' },
  ];
}
