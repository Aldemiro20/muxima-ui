import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MX_COMMAND, MxCommandItem, MxCommandPalette } from '@muxima-ui/core/command';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';

const COMANDOS: MxCommandItem<string>[] = [
  { label: 'Nova factura', group: 'Acções', hint: 'N F', keywords: ['emitir', 'criar'], data: 'file' },
  { label: 'Novo cliente', group: 'Acções', hint: 'N C', data: 'users' },
  { label: 'Exportar relatório', group: 'Acções', keywords: ['csv', 'excel'], data: 'external' },
  { label: 'Clientes', group: 'Páginas', data: 'users' },
  { label: 'Facturas', group: 'Páginas', data: 'table' },
  { label: 'Definições', group: 'Páginas', keywords: ['configuração', 'preferências'], data: 'sliders' },
];

@Component({
  selector: 'doc-command-palette-page',
  imports: [DOC_UI, MX_COMMAND, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Command Palette' }]"
        title="Command Palette"
        lead="Pesquisa de acções e páginas por teclado, como o Ctrl+K deste site. Usa-se dentro de um diálogo com MxCommandPalette ou directamente na página com mx-command."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de command palette">
          <button mxButton type="button" variant="outline" (click)="abrir()">Abrir comandos <kbd class="kbd-inline">Ctrl K</kbd></button>
          @if (ultimo()) {
            <p class="small-label">Escolhido: {{ ultimo() }}</p>
          }
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_COMMAND, MxCommandPalette } from '@muxima-ui/core/command';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Um campo de pesquisa e uma lista agrupada. O foco fica no campo; as setas mudam a opção activa.</p>
        <doc-structure [labels]="{ topLeft: 'input role=combobox', topRight: 'Atalho opcional', bottomLeft: 'Grupos com título', bottomRight: 'Opção activa com linha', bottom: 'Num diálogo modal com MxCommandPalette' }">
          <div class="mini-dialog"><strong>Pesquisar...</strong><span>Acções</span><span>Páginas</span></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Opção"><div class="mx-command mini-command"><div class="mx-command-item">Nova factura</div></div></doc-state>
          <doc-state name="Activa" note="Setas ou rato."><div class="mx-command mini-command"><div class="mx-command-item" data-active>Nova factura</div></div></doc-state>
          <doc-state name="Desactivada"><div class="mx-command mini-command"><div class="mx-command-item" data-disabled>Anular (sem permissão)</div></div></doc-state>
          <doc-state name="Sem resultados"><div class="mx-command mini-command"><div class="mx-command-empty">Nada encontrado para "xyz"</div></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Na página, com ícones" [note]="ultimo() ? 'Escolhido: ' + ultimo() : 'Escreve emitir ou csv: as palavras-chave também contam.'">
            <div class="mx-card w-full">
              <mx-command [items]="comandos" (selected)="ultimo.set($event.label)" aria-label="Pesquisar comandos" placeholder="Pesquisar acções e páginas">
                <ng-template mxCommandItem let-item>
                  <doc-icon [name]="item.data" />
                  <span>{{ item.label }}</span>
                </ng-template>
              </mx-command>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: '↑ ↓', action: 'Mudam a opção activa (dão a volta).' },
            { key: 'Enter', action: 'Executa a opção activa.' },
            { key: 'Esc', action: 'Fecha o diálogo e devolve o foco.' },
            { key: 'Ctrl + K', action: 'Atalho comum para abrir; define-o na tua aplicação.' }
          ]"
          [aria]="[
            'Campo com role=combobox; a lista é um listbox com grupos (role=group).',
            'aria-activedescendant indica a opção activa sem tirar o foco do campo.',
            'O número de resultados é anunciado ao escrever.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Combobox' }, { name: 'Dialog' }, { name: 'Dropdown menu' }]" />
      </section>
    </article>
  `,
})
export class CommandPalettePage {
  private readonly palette = inject(MxCommandPalette);
  protected readonly comandos = COMANDOS;
  protected readonly ultimo = signal('');

  protected abrir(): void {
    this.palette.open(COMANDOS, { placeholder: 'Pesquisar acções e páginas', label: 'Comandos' }).closed.subscribe((item) => {
      if (item) this.ultimo.set(item.label);
    });
  }

  protected readonly previewCode = `const palette = inject(MxCommandPalette);

palette.open([
  { label: 'Nova factura', group: 'Acções', keywords: ['emitir'] },
  { label: 'Clientes', group: 'Páginas', data: '/clientes' },
]).closed.subscribe((item) => item && executar(item));`;

  protected readonly api: ApiRow[] = [
    { kind: 'Serviço', name: 'MxCommandPalette.open(itens, opções)', type: 'DialogRef<MxCommandItem>', description: 'Abre num diálogo; fecha com o item escolhido.' },
    { kind: 'Input', name: 'items', type: 'MxCommandItem[]', description: 'label, group, keywords, hint, disabled, data.' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: 'Pesquisar...' },
    { kind: 'Input', name: 'aria-label', type: 'string', default: 'Pesquisar' },
    { kind: 'Output', name: 'selected', type: 'MxCommandItem' },
    { kind: 'Directiva', name: 'ng-template[mxCommandItem]', type: 'let-item', description: 'Desenho próprio de cada item (ex.: com ícone).' },
  ];
}
