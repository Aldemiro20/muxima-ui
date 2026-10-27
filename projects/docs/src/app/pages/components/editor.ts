import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxEditor } from '@muxima-ui/core/editor';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-editor-page',
  imports: [DOC_UI, MxEditor, MxFormField, MxLabel, MxHint, MxError, MxButton, ReactiveFormsModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Rich text editor' }]"
        title="Rich text editor"
        lead="Texto com negrito, títulos, listas, citações e ligações, sobre o Tiptap (ProseMirror). A barra é um toolbar acessível, o campo liga-se a formulários e o valor é HTML."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de editor">
          <mx-form-field class="w-full">
            <label mxLabel>Notas da factura</label>
            <mx-editor
              [(value)]="notas"
              placeholder="Condições de pagamento, observações..."
              [maxLength]="500"
            />
            <mx-hint>Aparece no PDF por baixo das linhas.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code
          code="npm install @tiptap/core @tiptap/pm @tiptap/starter-kit @tiptap/extensions"
        />
        <doc-code code="import { MxEditor } from '@muxima-ui/core/editor';" />
        <doc-callout
          >O Tiptap é uma dependência opcional do pacote: só o instala quem usa o editor, e o resto
          da biblioteca não fica maior por causa dele.</doc-callout
        >
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          Barra de formatação (role=toolbar), o texto (role=textbox, multilinha) e, com maxLength, a
          contagem.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Barra: setas entre botões',
            topRight: 'aria-pressed no activo',
            bottomLeft: 'Texto editável',
            bottomRight: 'Contagem',
            bottom: 'O valor é HTML',
          }"
        >
          <mx-editor
            class="w-320"
            aria-label="Exemplo"
            [toolbar]="['bold', 'italic', '|', 'bulletList', 'link']"
            value="<p>Pagamento a <strong>30 dias</strong>.</p>"
            [maxLength]="200"
            minHeight="60px"
          />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"
            ><mx-editor
              class="w-full"
              aria-label="Vazio"
              placeholder="Escreve aqui"
              minHeight="60px"
              [toolbar]="['bold', 'italic']"
          /></doc-state>
          <doc-state name="Só leitura"
            ><mx-editor
              class="w-full"
              aria-label="Só leitura"
              readonly
              value="<p>Texto <em>formatado</em>.</p>"
              minHeight="40px"
          /></doc-state>
          <doc-state name="Desactivado"
            ><mx-editor
              class="w-full"
              aria-label="Desactivado"
              disabled
              value="<p>Sem edição.</p>"
              minHeight="60px"
              [toolbar]="['bold', 'italic']"
          /></doc-state>
          <doc-state name="Erro"
            ><mx-editor
              class="w-full"
              aria-label="Erro"
              invalid
              minHeight="60px"
              [toolbar]="['bold', 'italic']"
          /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example
            title="Barra reduzida"
            note="toolbar escolhe os botões e a ordem; | desenha um separador."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Comentário</label>
              <mx-editor
                [toolbar]="['bold', 'italic', '|', 'link']"
                placeholder="Escreve um comentário"
                minHeight="80px"
              />
            </mx-form-field>
          </doc-example>

          <doc-example
            title="Num formulário"
            note="Validators.required e maxLength: acima do limite, a contagem e o campo ficam em erro."
          >
            <form
              class="stack w-full"
              [formGroup]="proposta"
              (ngSubmit)="proposta.markAllAsTouched()"
            >
              <mx-form-field>
                <label mxLabel>Resumo da proposta</label>
                <mx-editor
                  formControlName="resumo"
                  [maxLength]="160"
                  minHeight="100px"
                  placeholder="Duas ou três frases"
                />
                <mx-error>Escreve o resumo, até 160 caracteres.</mx-error>
              </mx-form-field>
              <div><button mxButton size="sm" type="submit">Guardar proposta</button></div>
            </form>
          </doc-example>

          <doc-example
            title="HTML de saída"
            note="O valor é HTML (string vazia quando não há texto)."
          >
            <div class="stack w-full">
              <mx-editor
                aria-label="Texto com HTML"
                [(value)]="html"
                minHeight="100px"
                [toolbar]="[
                  'bold',
                  'italic',
                  'underline',
                  '|',
                  'heading2',
                  'bulletList',
                  'orderedList',
                  '|',
                  'link',
                ]"
              />
              <pre
                class="editor-html"
                tabindex="0"
                aria-label="HTML gerado"
              ><code>{{ html() || '(vazio)' }}</code></pre>
            </div>
          </doc-example>

          <doc-example
            title="Comandos próprios"
            note="editor() dá o Editor do Tiptap: editor()?.chain().focus().insertContent(...).run()."
          >
            <div class="stack w-full">
              <mx-editor
                #email
                aria-label="Corpo do email"
                [(value)]="corpo"
                minHeight="100px"
                [toolbar]="['bold', 'italic', '|', 'bulletList', '|', 'undo', 'redo']"
              />
              <div class="row-wrap">
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="email.editor()?.chain()?.focus()?.insertContent(assinatura)?.run()"
                >
                  Inserir assinatura
                </button>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="email.editor()?.chain()?.focus()?.insertContent(dadosPagamento)?.run()"
                >
                  Inserir dados de pagamento
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Só leitura"
            note="readonly mostra o texto formatado sem barra nem edição (por exemplo, para rever)."
          >
            <mx-editor
              class="w-full"
              aria-label="Termos aceites"
              readonly
              [value]="termos"
              minHeight="0"
            />
          </doc-example>

          <doc-example
            title="Títulos e citações"
            note="heading2, heading3, paragraph e blockquote para textos mais longos."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Artigo da base de conhecimento</label>
              <mx-editor
                [toolbar]="[
                  'heading2',
                  'heading3',
                  'paragraph',
                  '|',
                  'bold',
                  'italic',
                  'code',
                  '|',
                  'blockquote',
                  'bulletList',
                  'orderedList',
                  '|',
                  'undo',
                  'redo',
                ]"
                [value]="artigo"
                minHeight="160px"
              />
            </mx-form-field>
          </doc-example>

          <doc-example
            title="Com ngModel"
            note="Também funciona com formulários de template: [(ngModel)] e required."
          >
            <form class="stack w-full" #f="ngForm">
              <mx-form-field>
                <label mxLabel>Mensagem ao cliente</label>
                <mx-editor
                  name="mensagem"
                  [(ngModel)]="mensagem"
                  required
                  minHeight="80px"
                  [toolbar]="['bold', 'italic', '|', 'bulletList', 'link']"
                />
                <mx-error>Escreve a mensagem.</mx-error>
              </mx-form-field>
              <p class="muted small">Formulário {{ f.valid ? 'válido' : 'inválido' }}.</p>
            </form>
          </doc-example>

          <doc-example
            title="Palavras e tempo de leitura"
            [note]="palavras(textoLongo()) + ' palavras, cerca de ' + leitura(textoLongo()) + ' min de leitura.'"
          >
            <mx-form-field class="w-full">
              <label mxLabel>Publicação no blogue</label>
              <mx-editor
                [(value)]="textoLongo"
                minHeight="120px"
                [toolbar]="['heading2', 'bold', 'italic', '|', 'bulletList', 'blockquote']"
              />
            </mx-form-field>
          </doc-example>

          <doc-example
            title="Rascunho guardado sozinho"
            [note]="guardadoAs() ? 'Rascunho guardado às ' + guardadoAs() + '.' : 'Escreve: guarda 1 s depois de parares.'"
          >
            <mx-form-field class="w-full">
              <label mxLabel>Resposta ao pedido</label>
              <mx-editor
                [(value)]="rascunho"
                minHeight="100px"
                placeholder="A resposta é guardada enquanto escreves"
                [toolbar]="['bold', 'italic', '|', 'bulletList', '|', 'undo', 'redo']"
              />
            </mx-form-field>
          </doc-example>

          <doc-example
            title="Editar e ver o resultado"
            note="O HTML do editor mostrado com [innerHTML], que o Angular limpa de scripts."
          >
            <div class="editor-split w-full">
              <mx-editor
                aria-label="Texto do anúncio"
                [(value)]="anuncio"
                minHeight="120px"
                [toolbar]="['heading3', 'bold', 'italic', '|', 'bulletList', 'link']"
              />
              <div class="editor-output" role="region" aria-label="Resultado">
                <div [innerHTML]="anuncio()"></div>
              </div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Alt + F10', action: 'Do texto vai para a barra de formatação.' },
            { key: '← → Home End', action: 'Entre os botões da barra (só um entra no Tab).' },
            { key: 'Esc', action: 'Da barra volta ao texto.' },
            { key: 'Ctrl + B, I, U', action: 'Negrito, itálico, sublinhado.' },
            { key: 'Ctrl + K', action: 'Abre o campo da ligação.' },
            { key: 'Ctrl + Z / Shift + Z', action: 'Anular e refazer.' },
          ]"
          [aria]="[
            'O texto é role=textbox com aria-multiline e o rótulo do form field.',
            'A barra é role=toolbar com aria-controls apontado para o texto.',
            'Os botões de formato têm aria-pressed e o atalho em aria-keyshortcuts.',
            'A contagem é anunciada quando chega aos 90% do limite.',
            'Erros e ajuda do form field chegam por aria-describedby.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Textarea' }, { name: 'Input' }, { name: 'Chips' }]" />
      </section>
    </article>
  `,
})
export class EditorPage {
  protected readonly notas = signal(
    '<p>Pagamento a <strong>30 dias</strong> por transferência para o IBAN indicado.</p>',
  );
  protected readonly proposta = new FormGroup({ resumo: new FormControl('', Validators.required) });
  protected readonly html = signal('<p>Olá <strong>Kianda</strong>!</p>');
  protected readonly corpo = signal('<p>Bom dia,</p><p>Segue em anexo a factura deste mês.</p>');
  protected readonly assinatura =
    '<p>Com os melhores cumprimentos,<br>Ana Kiala<br>Kianda Gestão</p>';
  protected readonly dadosPagamento =
    '<ul><li>Entidade: 00123</li><li>Referência: 231 456 789</li><li>Montante: 250 000,00 Kz</li></ul>';
  protected readonly termos =
    '<h3>Condições</h3><p>O pagamento vence <strong>30 dias</strong> após a emissão.</p><ul><li>Juros de mora de 1% ao mês.</li><li>Reclamações em 8 dias.</li></ul>';
  protected readonly artigo =
    '<h2>Como emitir uma nota de crédito</h2><p>Abre a factura e escolhe <strong>Criar nota de crédito</strong>.</p><blockquote><p>A nota de crédito anula total ou parcialmente uma factura já emitida.</p></blockquote>';

  protected readonly mensagem = signal('');

  protected readonly textoLongo = signal(
    '<h2>Novidades de Outubro</h2><p>Este mês chegaram as <strong>notas de crédito</strong> e a exportação do SAF-T. Também melhorámos a pesquisa de clientes e os relatórios de IVA.</p>',
  );
  protected palavras(html: string): number {
    const texto = html.replace(/<[^>]+>/g, ' ').trim();
    return texto ? texto.split(/\s+/).length : 0;
  }
  protected leitura(html: string): number {
    return Math.max(1, Math.round(this.palavras(html) / 200));
  }

  protected readonly rascunho = signal('');
  protected readonly guardadoAs = signal('');

  protected readonly anuncio = signal(
    '<h3>Promoção de Novembro</h3><p>Planos anuais com <strong>20% de desconto</strong>:</p><ul><li>Facturação</li><li>Stock</li></ul>',
  );

  constructor() {
    // guarda o rascunho 1 s depois da última alteração
    effect((onCleanup) => {
      const texto = this.rascunho();
      if (!texto) return;
      const t = setTimeout(
        () => this.guardadoAs.set(new Date().toLocaleTimeString('pt-AO')),
        1000,
      );
      onCleanup(() => clearTimeout(t));
    });
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Notas da factura</label>
  <mx-editor formControlName="notas" placeholder="Condições de pagamento..." [maxLength]="500" />
  <mx-hint>Aparece no PDF por baixo das linhas.</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'value',
      type: 'string (model)',
      description: 'HTML. Também com ngModel e Reactive Forms.',
    },
    { kind: 'Input', name: 'placeholder', type: 'string' },
    {
      kind: 'Input',
      name: 'toolbar',
      type: 'MxEditorTool[]',
      description:
        "bold, italic, underline, strike, code, heading2, heading3, paragraph, bulletList, orderedList, blockquote, link, undo, redo e '|'.",
    },
    {
      kind: 'Input',
      name: 'maxLength',
      type: 'number | null',
      default: 'null',
      description: 'Mostra a contagem; acima dela o campo fica em erro.',
    },
    { kind: 'Input', name: 'minHeight, maxHeight', type: 'string', default: '140px, 420px' },
    {
      kind: 'Input',
      name: 'readonly, disabled, required, invalid',
      type: 'boolean',
      default: 'false',
    },
    {
      kind: 'Input',
      name: 'toolbarLabel, linkLabel',
      type: 'string',
      default: 'Formatação, Endereço da ligação',
    },
    {
      kind: 'Propriedade',
      name: 'editor()',
      type: 'Editor | null',
      description: 'O editor do Tiptap, para comandos próprios.',
    },
    { kind: 'Método', name: 'focus(), focusToolbar(), openLink()', type: 'void' },
    {
      kind: 'Função',
      name: 'MX_EDITOR_DEFAULT_TOOLS',
      type: 'MxEditorTool[]',
      description: 'A barra por omissão.',
    },
  ];
}
