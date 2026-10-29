import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxButton } from '@muxima-ui/core/button';
import { MX_CARD } from '@muxima-ui/core/card';
import {
  MxNotification,
  MxNotificationBell,
  MxNotificationCenter,
  MxNotificationContent,
  mxRelativeTime,
} from '@muxima-ui/core/notification-center';
import { MX_POPOVER } from '@muxima-ui/core/popover';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

const minutos = (m: number) => new Date(Date.now() - m * 60_000);

function exemplo(): MxNotification[] {
  return [
    {
      id: 1,
      title: 'FT 2026/0196 paga',
      description: 'Huíla Agro pagou 1 230 000,00 Kz.',
      time: minutos(4),
      category: 'Facturas',
      variant: 'success',
    },
    {
      id: 2,
      title: '3 facturas em atraso',
      description: 'Total de 20,1 M Kz.',
      time: minutos(55),
      category: 'Facturas',
      variant: 'danger',
    },
    {
      id: 3,
      title: 'Novo cliente: Uíge Café',
      time: minutos(60 * 5),
      category: 'Clientes',
      read: true,
    },
    {
      id: 4,
      title: 'Relatório de Setembro pronto',
      time: minutos(60 * 26),
      category: 'Relatórios',
      read: true,
    },
  ];
}

@Component({
  selector: 'doc-notification-center-page',
  imports: [
    DOC_UI,
    MxNotificationCenter,
    MxNotificationBell,
    MxNotificationContent,
    MX_POPOVER,
    MX_CARD,
    MxButton,
    MxAvatar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[
          { label: 'Componentes', path: '/pt/componentes' },
          { label: 'Notification center' },
        ]"
        title="Notification center"
        lead="Lista de notificações com por ler e lidas, filtros, marcar como lida e remover. Junta-se a um botão de sino com a contagem. O componente não guarda estado: recebe a lista e diz-te o que a pessoa fez."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de notification center">
          <button mxNotificationBell [count]="porLer()" [mxPopoverTrigger]="painel"></button>
          <mx-popover #painel aria-label="Notificações" align="end" width="380px">
            <mx-notification-center
              [items]="itens()"
              (markRead)="ler($event)"
              (markAllRead)="lerTodas()"
            />
          </mx-popover>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code
          code="import { MxNotificationBell, MxNotificationCenter, mxRelativeTime } from '@muxima-ui/core/notification-center';"
        />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          Título com contagem e Marcar todas, filtros, e uma lista em que cada notificação é um
          botão com ponto de por ler e acções à direita.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Título e contagem',
            topRight: 'Marcar todas',
            bottomLeft: 'Ponto: por ler',
            bottomRight: 'Marcar lida, remover',
            bottom: 'Lista ordenada pela mais recente',
          }"
        >
          <div class="w-320">
            <mx-notification-center [items]="estrutura" [showFilter]="false" dismissible />
          </div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Sino sem notificações"
            ><button mxNotificationBell [count]="0"></button
          ></doc-state>
          <doc-state name="Sino com 3"><button mxNotificationBell [count]="3"></button></doc-state>
          <doc-state name="Sino com 120" note="Acima de max mostra 99+."
            ><button mxNotificationBell [count]="120"></button
          ></doc-state>
          <doc-state name="Lista vazia"
            ><div class="w-full"><mx-notification-center [items]="[]" [showFilter]="false" /></div
          ></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example
            title="Página de notificações"
            note="dismissible mostra Remover; os filtros incluem as categorias."
          >
            <div class="w-full">
              <mx-notification-center
                [items]="pagina()"
                dismissible
                (markRead)="lerPagina($event)"
                (markAllRead)="lerTodasPagina()"
                (dismiss)="removerPagina($event)"
              />
            </div>
          </doc-example>
          <doc-example
            title="Chegada em tempo real"
            note="Quando chega uma por ler, é anunciada ao leitor de ecrã."
          >
            <div class="stack w-full">
              <div class="row-wrap">
                <button mxButton size="sm" type="button" (click)="chegar()">
                  Simular nova notificação
                </button>
                <button mxNotificationBell [count]="vivoPorLer()"></button>
              </div>
              <mx-notification-center
                [items]="vivo()"
                [showFilter]="false"
                (markRead)="lerVivo($event)"
                (markAllRead)="lerTodasVivo()"
              />
            </div>
          </doc-example>
          <doc-example
            title="Conteúdo próprio"
            note="ng-template mxNotificationContent recebe a notificação; data leva o que precisares."
          >
            <div class="w-full">
              <mx-notification-center
                [items]="pessoas()"
                [showFilter]="false"
                title="Menções"
                (markRead)="lerPessoa($event)"
                (markAllRead)="lerTodasPessoas()"
              >
                <ng-template mxNotificationContent let-n>
                  <span class="notif-person">
                    <mx-avatar [name]="n.data.autor" size="sm" decorative />
                    <span
                      ><strong>{{ n.data.autor }}</strong> {{ n.title }}</span
                    >
                  </span>
                </ng-template>
              </mx-notification-center>
            </div>
          </doc-example>
          <doc-example
            title="Num cartão do painel"
            note="Sem filtros, com o rodapé projectado em mxNotificationFooter."
          >
            <article mxCard class="w-full">
              <div mxCardContent>
                <mx-notification-center
                  [items]="cartao()"
                  [showFilter]="false"
                  [headingLevel]="3"
                  title="Alertas"
                  (markRead)="lerCartao($event)"
                  (markAllRead)="lerTodasCartao()"
                >
                  <div mxNotificationFooter>
                    <button mxButton variant="link" size="sm" type="button">
                      Ver todos os alertas
                    </button>
                  </div>
                </mx-notification-center>
              </div>
            </article>
          </doc-example>
          <doc-example
            title="Sem ser marcada ao abrir"
            [note]="
              'markReadOnOpen=false: abrir só emite opened. Aberta: ' + (aberta() || 'nenhuma')
            "
          >
            <div class="w-full">
              <mx-notification-center
                [items]="manual()"
                [markReadOnOpen]="false"
                [showFilter]="false"
                (opened)="aberta.set($event.title)"
                (markRead)="lerManual($event)"
                (markAllRead)="lerTodasManual()"
              />
            </div>
          </doc-example>
          <doc-example
            title="Tempo relativo"
            note="mxRelativeTime(data) devolve agora, há 5 minutos, ontem ou a data."
          >
            <ul class="product-list">
              @for (t of tempos; track t.rotulo) {
                <li>
                  <span>{{ t.rotulo }}</span
                  ><span class="muted">{{ relativo(t.data) }}</span>
                </li>
              }
            </ul>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            {
              key: 'Tab',
              action: 'Passa por Marcar todas, filtros, cada notificação e as suas acções.',
            },
            { key: 'Enter Espaço', action: 'Abrem a notificação (e marcam-na como lida).' },
          ]"
          [aria]="[
            'O sino diz a contagem no nome: Notificações, 3 por ler.',
            'As por ler começam com Por ler: (texto escondido); o ponto e o negrito são só visuais.',
            'O título é um cabeçalho (nível 2 por omissão, headingLevel muda) e dá nome à lista.',
            'Notificações novas por ler são anunciadas com LiveAnnouncer.',
            'Os botões de marcar e remover dizem a que notificação se referem.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Toast' }, { name: 'Popover' }, { name: 'Timeline' }]" />
      </section>
    </article>
  `,
})
export class NotificationCenterPage {
  protected readonly itens = signal(exemplo());
  protected readonly porLer = computed(() => this.itens().filter((n) => !n.read).length);
  protected ler(n: MxNotification): void {
    this.itens.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected lerTodas(): void {
    this.itens.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly estrutura = exemplo().slice(0, 2);

  protected readonly pagina = signal(exemplo());
  protected lerPagina(n: MxNotification): void {
    this.pagina.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected lerTodasPagina(): void {
    this.pagina.update((l) => l.map((x) => ({ ...x, read: true })));
  }
  protected removerPagina(n: MxNotification): void {
    this.pagina.update((l) => l.filter((x) => x.id !== n.id));
  }

  protected readonly vivo = signal<MxNotification[]>([
    { id: 1, title: 'Sessão iniciada noutro computador', time: minutos(30), read: true },
  ]);
  protected readonly vivoPorLer = computed(() => this.vivo().filter((n) => !n.read).length);
  private contador = 1;
  private readonly chegadas = [
    'Pagamento recebido de Banco Mutamba',
    'Lobito Portos abriu a factura',
    'Nova encomenda de Namibe Pescas',
  ];
  protected chegar(): void {
    const title = this.chegadas[this.contador % this.chegadas.length];
    this.vivo.update((l) => [
      { id: ++this.contador, title, time: new Date(), variant: 'info' },
      ...l,
    ]);
  }
  protected lerVivo(n: MxNotification): void {
    this.vivo.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected lerTodasVivo(): void {
    this.vivo.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly pessoas = signal<MxNotification<{ autor: string }>[]>([
    {
      id: 1,
      title: 'mencionou-te em FT 2026/0201',
      time: minutos(12),
      data: { autor: 'Pedro Neto' },
    },
    {
      id: 2,
      title: 'pediu aprovação para um desconto',
      time: minutos(90),
      data: { autor: 'Joana Mbala' },
    },
    {
      id: 3,
      title: 'respondeu ao teu comentário',
      time: minutos(60 * 30),
      read: true,
      data: { autor: 'Miguel Tchissola' },
    },
  ]);
  protected lerPessoa(n: MxNotification<{ autor: string }>): void {
    this.pessoas.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected lerTodasPessoas(): void {
    this.pessoas.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly cartao = signal<MxNotification[]>([
    { id: 1, title: 'Limite de facturas do plano a 90%', time: minutos(20), variant: 'warning' },
    {
      id: 2,
      title: 'Certificado de assinatura expira em 7 dias',
      time: minutos(60 * 3),
      variant: 'danger',
    },
  ]);
  protected lerCartao(n: MxNotification): void {
    this.cartao.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected lerTodasCartao(): void {
    this.cartao.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly manual = signal(exemplo().slice(0, 2));
  protected readonly aberta = signal('');
  protected lerManual(n: MxNotification): void {
    this.manual.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected lerTodasManual(): void {
    this.manual.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly tempos = [
    { rotulo: 'Há 20 segundos', data: new Date(Date.now() - 20_000) },
    { rotulo: 'Há 5 minutos', data: minutos(5) },
    { rotulo: 'Há 3 horas', data: minutos(180) },
    { rotulo: 'Há 1 dia', data: minutos(60 * 24) },
    { rotulo: 'Há 10 dias', data: minutos(60 * 24 * 10) },
  ];
  protected relativo(d: Date): string {
    return mxRelativeTime(d);
  }

  protected readonly previewCode = `<button mxNotificationBell [count]="porLer()" [mxPopoverTrigger]="painel"></button>
<mx-popover #painel aria-label="Notificações" align="end" width="380px">
  <mx-notification-center [items]="notificacoes()"
    (markRead)="marcarLida($event)" (markAllRead)="marcarTodas()" />
</mx-popover>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'items',
      type: 'MxNotification[]',
      description: '{ id, title, description?, time, read?, variant?, category?, data? }.',
    },
    { kind: 'Input', name: 'title', type: 'string', default: 'Notificações' },
    { kind: 'Input', name: 'headingLevel', type: 'number', default: '2' },
    {
      kind: 'Input',
      name: 'showFilter',
      type: 'boolean',
      default: 'true',
      description: 'Todas, Por ler e uma por categoria.',
    },
    {
      kind: 'Input',
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      description: 'Botão Remover em cada uma.',
    },
    { kind: 'Input', name: 'markReadOnOpen', type: 'boolean', default: 'true' },
    {
      kind: 'Input',
      name: 'announce',
      type: 'boolean',
      default: 'true',
      description: 'Anuncia as que chegam por ler.',
    },
    { kind: 'Input', name: 'markAllText, emptyText, emptyUnreadText', type: 'string' },
    { kind: 'Output', name: 'opened, markRead, dismiss', type: 'MxNotification' },
    { kind: 'Output', name: 'markAllRead', type: 'void' },
    {
      kind: 'Directiva',
      name: 'ng-template[mxNotificationContent]',
      type: 'let-n',
      description: 'Conteúdo próprio de cada notificação.',
    },
    {
      kind: 'Componente',
      name: 'button[mxNotificationBell]',
      type: 'count, max, label',
      description: 'Sino com a contagem no nome.',
    },
    { kind: 'Função', name: 'mxRelativeTime(data, agora?, locale?)', type: 'string' },
  ];
}
