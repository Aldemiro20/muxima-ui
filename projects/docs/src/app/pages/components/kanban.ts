import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_KANBAN, MxKanbanColumn, MxKanbanMove } from '@muxima-ui/core/kanban';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

interface Tarefa {
  id: number;
  titulo: string;
  pessoa?: string;
  prioridade?: 'Alta' | 'Média' | 'Baixa';
  prazo?: string;
}

function quadroInicial(): MxKanbanColumn<Tarefa>[] {
  return [
    {
      id: 'fazer',
      title: 'Por fazer',
      items: [
        {
          id: 1,
          titulo: 'Emitir facturas de Novembro',
          pessoa: 'Ana Kiala',
          prioridade: 'Alta',
          prazo: '30 out',
        },
        {
          id: 2,
          titulo: 'Rever contrato com Lobito Portos',
          pessoa: 'Aldemiro Valentim',
          prioridade: 'Média',
          prazo: '4 nov',
        },
        {
          id: 3,
          titulo: 'Actualizar dados do Banco Mutamba',
          pessoa: 'Joana Mbala',
          prioridade: 'Baixa',
        },
      ],
    },
    {
      id: 'curso',
      title: 'Em curso',
      limit: 3,
      items: [
        {
          id: 4,
          titulo: 'Relatório de IVA de Outubro',
          pessoa: 'Ana Kiala',
          prioridade: 'Alta',
          prazo: '31 out',
        },
        { id: 5, titulo: 'Cobrar 3 facturas em atraso', pessoa: 'Aldemiro Valentim', prioridade: 'Alta' },
      ],
    },
    {
      id: 'revisao',
      title: 'Em revisão',
      items: [
        { id: 6, titulo: 'Proposta para Uíge Café', pessoa: 'Joana Mbala', prioridade: 'Média' },
      ],
    },
    {
      id: 'feito',
      title: 'Feito',
      items: [{ id: 7, titulo: 'Importar clientes do CSV', pessoa: 'Aldemiro Valentim' }],
    },
  ];
}

@Component({
  selector: 'doc-kanban-page',
  imports: [DOC_UI, MX_KANBAN, MxAvatar, MxBadge, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Kanban' }]"
        title="Kanban"
        lead="Cartões em colunas para acompanhar trabalho: arrasta-se com o rato ou o dedo e move-se com o teclado. Cada passo é anunciado ao leitor de ecrã, e as colunas podem ter limite de cartões."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de kanban">
          <mx-kanban
            class="w-full"
            [(columns)]="quadro"
            aria-label="Tarefas da equipa"
            (moved)="registar($event)"
          >
            <ng-template mxKanbanCard let-t>
              <div class="kanban-card">
                <p class="kanban-card-title">{{ t.titulo }}</p>
                <div class="kanban-card-meta">
                  @if (t.prioridade) {
                    <span
                      mxBadge
                      size="sm"
                      [variant]="
                        t.prioridade === 'Alta'
                          ? 'danger'
                          : t.prioridade === 'Média'
                            ? 'warning'
                            : 'secondary'
                      "
                      >{{ t.prioridade }}</span
                    >
                  }
                  @if (t.prazo) {
                    <span class="muted small">até {{ t.prazo }}</span>
                  }
                  @if (t.pessoa) {
                    <mx-avatar class="kanban-avatar" [name]="t.pessoa" size="sm" />
                  }
                </div>
              </div>
            </ng-template>
          </mx-kanban>
          <p class="muted small">
            {{ ultimo() || 'Arrasta um cartão, ou foca-o e carrega Espaço.' }}
          </p>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code
          code="import { MX_KANBAN, MxKanbanColumn, MxKanbanMove } from '@muxima-ui/core/kanban';"
        />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          Cada coluna é uma secção com título e contagem e uma lista de cartões. O cartão agarrado
          com o teclado fica inclinado e com contorno.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Título e contagem',
            topRight: 'Limite (3 / 3)',
            bottomLeft: 'Cartão (li)',
            bottomRight: 'Coluna vazia',
            bottom: 'Listas ligadas com cdk drag-drop',
          }"
        >
          <mx-kanban class="w-full" [columns]="estrutura" aria-label="Exemplo" />
        </doc-structure>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="stack-lg">
          <doc-example
            title="Simples, com o nome do cartão"
            note="Sem modelo, mostra itemLabel(item). itemKey diz qual o campo único."
          >
            <mx-kanban
              class="w-full"
              [(columns)]="simples"
              itemKey="id"
              [itemLabel]="nomeTarefa"
              aria-label="Tarefas simples"
            />
          </doc-example>

          <doc-example
            title="Adicionar cartões"
            note="mxKanbanColumnFooter põe um botão no fim de cada coluna."
          >
            <mx-kanban class="w-full" [(columns)]="comAdicionar" aria-label="Ideias">
              <ng-template mxKanbanColumnFooter let-col>
                <button
                  mxButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  (click)="adicionar(col.id)"
                >
                  + Adicionar<span class="mx-visually-hidden"> em {{ col.title }}</span>
                </button>
              </ng-template>
            </mx-kanban>
          </doc-example>

          <doc-example
            title="Pipeline de vendas"
            [note]="'Total em negociação: ' + totalPipeline()"
          >
            <mx-kanban
              class="w-full"
              [(columns)]="pipeline"
              [itemLabel]="nomeNegocio"
              aria-label="Pipeline de vendas"
            >
              <ng-template mxKanbanCard let-n>
                <div class="kanban-card">
                  <p class="kanban-card-title">{{ n.cliente }}</p>
                  <p class="kanban-card-value">{{ usd(n.valor) }}</p>
                </div>
              </ng-template>
            </mx-kanban>
          </doc-example>

          <doc-example
            title="Registo dos movimentos"
            note="(moved) dá o cartão, as colunas e as posições: é aqui que guardas no servidor."
          >
            <div class="stack w-full">
              <mx-kanban
                class="w-full"
                [(columns)]="registo"
                [itemLabel]="nomeTarefa"
                aria-label="Tarefas com registo"
                (moved)="historico.set([descrever($event), ...historico()].slice(0, 4))"
              />
              <ul class="product-list w-full">
                @for (h of historico(); track $index) {
                  <li>{{ h }}</li>
                } @empty {
                  <li class="muted">Ainda sem movimentos.</li>
                }
              </ul>
            </div>
          </doc-example>

          <doc-example
            title="Desfazer o último movimento"
            [note]="
              anteriores().length
                ? anteriores().length + ' movimento(s) para desfazer.'
                : 'Cada (moved) guarda o movimento; desfazer faz o inverso.'
            "
          >
            <div class="stack w-full">
              <mx-kanban
                class="w-full"
                [(columns)]="desfazer"
                (moved)="anteriores.set([...anteriores().slice(-9), $event])"
                [itemLabel]="nomeTarefa"
                aria-label="Tarefas com desfazer"
              />
              <div>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  [disabled]="!anteriores().length"
                  (click)="desfazerUltimo()"
                >
                  Desfazer
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Acções dentro do cartão"
            note="Os botões do cartão entram no Tab; Espaço num botão não agarra o cartão."
          >
            <mx-kanban
              class="w-full"
              [(columns)]="comAccoes"
              [itemLabel]="nomeTarefa"
              aria-label="Pedidos de suporte"
            >
              <ng-template mxKanbanCard let-t let-col="column">
                <div class="kanban-card">
                  <p class="kanban-card-title">{{ t.titulo }}</p>
                  <div class="kanban-card-meta">
                    @if (col.id !== 'resolvido') {
                      <button
                        mxButton
                        size="sm"
                        variant="outline"
                        type="button"
                        (click)="resolver(t)"
                      >
                        Resolver<span class="mx-visually-hidden"> {{ t.titulo }}</span>
                      </button>
                    }
                    <button
                      mxButton
                      size="sm"
                      variant="ghost"
                      type="button"
                      (click)="arquivar(t)"
                    >
                      Arquivar<span class="mx-visually-hidden"> {{ t.titulo }}</span>
                    </button>
                  </div>
                </div>
              </ng-template>
            </mx-kanban>
          </doc-example>

          <doc-example
            title="Limite por coluna"
            note="limit: 2 em Em produção. Cheia, a coluna não aceita mais e isso é anunciado."
          >
            <mx-kanban
              class="w-full"
              [(columns)]="producao"
              [itemLabel]="nomeTarefa"
              aria-label="Encomendas"
              emptyText="Nenhuma encomenda"
            />
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Vai de cartão em cartão (e aos botões dentro deles).' },
            {
              key: '↑ ↓ ← →',
              action: 'Sem agarrar: muda de cartão, na coluna ou para a coluna ao lado.',
            },
            { key: 'Espaço Enter', action: 'Agarra o cartão; outra vez, larga-o.' },
            { key: '↑ ↓', action: 'Agarrado: sobe ou desce na coluna.' },
            { key: '← →', action: 'Agarrado: passa para a coluna ao lado.' },
            { key: 'Esc', action: 'Cancela e devolve o cartão ao sítio de onde saiu.' },
          ]"
          [aria]="[
            'Cada coluna é um grupo com título (cabeçalho) e uma lista com esse nome.',
            'A contagem diz o que significa: 2 cartões, máximo 3.',
            'Cada cartão tem a instrução de teclado em aria-describedby.',
            'Agarrar, mover, largar, cancelar e coluna cheia são anunciados: Em curso, posição 2 de 3.',
            'Arrastar com o rato ou o dedo não é a única forma: o teclado faz tudo.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Card' }, { name: 'Data grid' }, { name: 'Badge' }]" />
      </section>
    </article>
  `,
})
export class KanbanPage {
  protected readonly quadro = signal(quadroInicial());
  protected readonly ultimo = signal('');
  protected registar(m: MxKanbanMove<Tarefa>): void {
    const cols = this.quadro();
    this.ultimo.set(
      `${m.item.titulo}: ${cols.find((c) => c.id === m.from)!.title} → ${cols.find((c) => c.id === m.to)!.title}.`,
    );
  }

  protected readonly estrutura: MxKanbanColumn<Tarefa>[] = [
    { id: 'a', title: 'Por fazer', items: [{ id: 1, titulo: 'Emitir facturas' }] },
    {
      id: 'b',
      title: 'Em curso',
      limit: 3,
      items: [
        { id: 2, titulo: 'Relatório' },
        { id: 3, titulo: 'Cobranças' },
        { id: 4, titulo: 'Proposta' },
      ],
    },
    { id: 'c', title: 'Feito', items: [] },
  ];

  protected readonly nomeTarefa = (t: Tarefa) => t.titulo;
  protected readonly simples = signal<MxKanbanColumn<Tarefa>[]>([
    {
      id: 'a',
      title: 'Hoje',
      items: [
        { id: 1, titulo: 'Ligar à Huíla Agro' },
        { id: 2, titulo: 'Enviar proposta' },
      ],
    },
    { id: 'b', title: 'Esta semana', items: [{ id: 3, titulo: 'Fechar mês' }] },
    { id: 'c', title: 'Mais tarde', items: [] },
  ]);

  private proximo = 100;
  protected readonly comAdicionar = signal<MxKanbanColumn<Tarefa>[]>([
    { id: 'novas', title: 'Novas', items: [{ id: 50, titulo: 'Facturas recorrentes' }] },
    { id: 'analise', title: 'Em análise', items: [] },
  ]);
  protected adicionar(colId: string): void {
    const id = ++this.proximo;
    this.comAdicionar.update((cols) =>
      cols.map((c) =>
        c.id === colId ? { ...c, items: [...c.items, { id, titulo: `Ideia ${id - 100}` }] } : c,
      ),
    );
  }

  protected readonly usd = (v: number) => new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
  protected readonly nomeNegocio = (n: { cliente: string }) => n.cliente;
  protected readonly pipeline = signal<
    MxKanbanColumn<{ id: number; cliente: string; valor: number }>[]
  >([
    {
      id: 'contacto',
      title: 'Contacto',
      items: [
        { id: 1, cliente: 'Namibe Pescas', valor: 1200 },
        { id: 2, cliente: 'Uíge Café', valor: 450 },
      ],
    },
    {
      id: 'proposta',
      title: 'Proposta',
      items: [{ id: 3, cliente: 'Lobito Portos', valor: 8900 }],
    },
    {
      id: 'negociacao',
      title: 'Negociação',
      items: [{ id: 4, cliente: 'Energia do Cuanza', valor: 15400 }],
    },
    { id: 'ganho', title: 'Ganho', items: [] },
  ]);
  protected readonly totalPipeline = computed(() =>
    this.usd(
      this.pipeline()
        .filter((c) => c.id !== 'ganho')
        .flatMap((c) => c.items)
        .reduce((a, n) => a + n.valor, 0),
    ),
  );

  protected readonly registo = signal<MxKanbanColumn<Tarefa>[]>([
    {
      id: 'a',
      title: 'A fazer',
      items: [
        { id: 1, titulo: 'Rever preços' },
        { id: 2, titulo: 'Novo logótipo' },
      ],
    },
    { id: 'b', title: 'Feito', items: [] },
  ]);
  protected readonly historico = signal<string[]>([]);
  protected descrever(m: MxKanbanMove<Tarefa>): string {
    return `${m.item.titulo}: ${m.from} (${m.fromIndex + 1}) → ${m.to} (${m.toIndex + 1})`;
  }

  protected readonly desfazer = signal<MxKanbanColumn<Tarefa>[]>([
    {
      id: 'a',
      title: 'Por fazer',
      items: [
        { id: 1, titulo: 'Pedir orçamento' },
        { id: 2, titulo: 'Marcar reunião' },
      ],
    },
    { id: 'b', title: 'Em curso', items: [{ id: 3, titulo: 'Rever stock' }] },
    { id: 'c', title: 'Feito', items: [] },
  ]);
  protected readonly anteriores = signal<MxKanbanMove<Tarefa>[]>([]);
  protected desfazerUltimo(): void {
    const m = this.anteriores()[this.anteriores().length - 1];
    if (!m) return;
    this.desfazer.update((cols) => {
      // tira o cartão de onde ficou e devolve-o ao sítio de onde saiu
      const semCartao = cols.map((c) =>
        c.id === m.to ? { ...c, items: c.items.filter((i) => i.id !== m.item.id) } : c,
      );
      return semCartao.map((c) =>
        c.id === m.from
          ? {
              ...c,
              items: [...c.items.slice(0, m.fromIndex), m.item, ...c.items.slice(m.fromIndex)],
            }
          : c,
      );
    });
    this.anteriores.update((h) => h.slice(0, -1));
  }

  protected readonly comAccoes = signal<MxKanbanColumn<Tarefa>[]>([
    {
      id: 'aberto',
      title: 'Abertos',
      items: [
        { id: 1, titulo: 'Factura sem NIF' },
        { id: 2, titulo: 'Erro ao exportar SAF-T' },
      ],
    },
    { id: 'resolvido', title: 'Resolvidos', items: [{ id: 3, titulo: 'Mudar palavra-passe' }] },
  ]);
  protected resolver(t: Tarefa): void {
    this.comAccoes.update((cols) =>
      cols.map((c) =>
        c.id === 'resolvido'
          ? { ...c, items: [t, ...c.items] }
          : { ...c, items: c.items.filter((i) => i.id !== t.id) },
      ),
    );
  }
  protected arquivar(t: Tarefa): void {
    this.comAccoes.update((cols) =>
      cols.map((c) => ({ ...c, items: c.items.filter((i) => i.id !== t.id) })),
    );
  }

  protected readonly producao = signal<MxKanbanColumn<Tarefa>[]>([
    {
      id: 'fila',
      title: 'Na fila',
      items: [
        { id: 1, titulo: 'Encomenda 1041' },
        { id: 2, titulo: 'Encomenda 1042' },
      ],
    },
    {
      id: 'producao',
      title: 'Em produção',
      limit: 2,
      items: [
        { id: 3, titulo: 'Encomenda 1038' },
        { id: 4, titulo: 'Encomenda 1039' },
      ],
    },
    { id: 'entregue', title: 'Entregue', items: [] },
  ]);

  protected readonly previewCode = `<mx-kanban [(columns)]="quadro" aria-label="Tarefas da equipa" (moved)="guardar($event)">
  <ng-template mxKanbanCard let-tarefa>
    <p>{{ tarefa.titulo }}</p>
    <span mxBadge size="sm">{{ tarefa.prioridade }}</span>
  </ng-template>
</mx-kanban>

quadro = signal<MxKanbanColumn<Tarefa>[]>([
  { id: 'fazer', title: 'Por fazer', items: [...] },
  { id: 'curso', title: 'Em curso', limit: 3, items: [...] },
]);`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'columns',
      type: 'MxKanbanColumn<T>[] (model)',
      description: '{ id, title, items, limit? }. Muda ao mover.',
    },
    { kind: 'Input', name: 'itemKey', type: 'string | (item) => unknown', default: 'id' },
    {
      kind: 'Input',
      name: 'itemLabel',
      type: '(item) => string',
      description: 'Nome do cartão nos anúncios (e sem modelo).',
    },
    { kind: 'Input', name: 'aria-label', type: 'string', default: 'Quadro' },
    {
      kind: 'Input',
      name: 'headingLevel',
      type: 'number',
      default: '3',
      description: 'Nível dos títulos das colunas.',
    },
    { kind: 'Input', name: 'emptyText, helpText', type: 'string' },
    {
      kind: 'Output',
      name: 'moved',
      type: 'MxKanbanMove<T>',
      description: '{ item, from, to, fromIndex, toIndex }.',
    },
    {
      kind: 'Directiva',
      name: 'ng-template[mxKanbanCard]',
      type: 'let-item, let-column',
      description: 'Conteúdo do cartão.',
    },
    {
      kind: 'Directiva',
      name: 'ng-template[mxKanbanColumnFooter]',
      type: 'let-column',
      description: 'Fim de cada coluna.',
    },
  ];
}
