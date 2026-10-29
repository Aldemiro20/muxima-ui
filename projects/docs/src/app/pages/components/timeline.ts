import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_TIMELINE } from '@muxima-ui/core/timeline';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-timeline-page',
  imports: [DOC_UI, MX_TIMELINE, MxBadge, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Timeline' }]"
        title="Timeline"
        lead="Acontecimentos por ordem: histórico de uma factura, passos de uma encomenda, registo de actividade. É uma lista ordenada nativa com marcadores, por isso o leitor de ecrã anuncia quantos são e a posição de cada um."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de timeline">
          <ol mxTimeline aria-label="Histórico da factura FT 2026/0196" class="w-320">
            <li mxTimelineItem variant="success">
              <time mxTimelineTime datetime="2026-10-27T08:12">27 out, 08:12</time>
              <p mxTimelineTitle>Paga</p>
              <p mxTimelineDescription>Huíla Agro pagou por transferência.</p>
            </li>
            <li mxTimelineItem variant="accent">
              <time mxTimelineTime datetime="2026-10-20T10:00">20 out, 10:00</time>
              <p mxTimelineTitle>Lembrete enviado</p>
            </li>
            <li mxTimelineItem>
              <time mxTimelineTime datetime="2026-10-15T09:30">15 out, 09:30</time>
              <p mxTimelineTitle>Emitida</p>
              <p mxTimelineDescription>Por Ana Kiala.</p>
            </li>
          </ol>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_TIMELINE } from '@muxima-ui/core/timeline';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          Cada item é um li com marcador e linha até ao seguinte; a data aparece por cima do título.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Marcador',
            topRight: 'Data (time)',
            bottomLeft: 'Linha',
            bottomRight: 'Título e descrição',
            bottom: 'ol mxTimeline > li mxTimelineItem',
          }"
        >
          <ol mxTimeline aria-label="Exemplo" class="w-180">
            <li mxTimelineItem variant="accent">
              <time mxTimelineTime>Hoje</time>
              <p mxTimelineTitle>Enviada</p>
            </li>
            <li mxTimelineItem>
              <time mxTimelineTime>Ontem</time>
              <p mxTimelineTitle>Criada</p>
            </li>
          </ol>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Default"
            ><ol mxTimeline aria-label="Default">
              <li mxTimelineItem><p mxTimelineTitle>Criada</p></li>
            </ol></doc-state
          >
          <doc-state name="Accent"
            ><ol mxTimeline aria-label="Accent">
              <li mxTimelineItem variant="accent"><p mxTimelineTitle>Enviada</p></li>
            </ol></doc-state
          >
          <doc-state name="Success"
            ><ol mxTimeline aria-label="Success">
              <li mxTimelineItem variant="success"><p mxTimelineTitle>Paga</p></li>
            </ol></doc-state
          >
          <doc-state name="Warning"
            ><ol mxTimeline aria-label="Warning">
              <li mxTimelineItem variant="warning"><p mxTimelineTitle>Vence hoje</p></li>
            </ol></doc-state
          >
          <doc-state name="Danger"
            ><ol mxTimeline aria-label="Danger">
              <li mxTimelineItem variant="danger"><p mxTimelineTitle>Em atraso</p></li>
            </ol></doc-state
          >
          <doc-state name="Pendente" note="Passo ainda por acontecer."
            ><ol mxTimeline aria-label="Pendente">
              <li mxTimelineItem pending><p mxTimelineTitle>Arquivar</p></li>
            </ol></doc-state
          >
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example
            title="Seguimento de encomenda"
            note="Passos feitos e por fazer; o texto diz o estado, não só o marcador."
          >
            <ol mxTimeline aria-label="Estado da encomenda 4821">
              @for (p of encomenda; track p.titulo) {
                <li mxTimelineItem [variant]="p.feito ? 'success' : 'default'" [pending]="!p.feito">
                  <time mxTimelineTime [attr.datetime]="p.iso">{{ p.quando }}</time>
                  <p mxTimelineTitle>
                    {{ p.titulo
                    }}<span class="mx-visually-hidden">{{
                      p.feito ? ', concluído' : ', por acontecer'
                    }}</span>
                  </p>
                </li>
              }
            </ol>
          </doc-example>
          <doc-example
            title="Com ícones"
            note="icon aumenta o marcador; o svg vai em mxTimelineIcon."
          >
            <ol mxTimeline aria-label="Actividade do cliente">
              <li mxTimelineItem icon variant="success">
                <svg mxTimelineIcon viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.5 8.5l3 3 6-7"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <time mxTimelineTime datetime="2026-10-27">Hoje</time>
                <p mxTimelineTitle>Pagamento recebido</p>
                <p mxTimelineDescription>250,00 US$ para FT 2026/0201.</p>
              </li>
              <li mxTimelineItem icon variant="accent">
                <svg mxTimelineIcon viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2.5 4.5h11v8h-11zM2.5 4.5l5.5 4 5.5-4"
                    stroke="currentColor"
                    stroke-width="1.3"
                    stroke-linejoin="round"
                  />
                </svg>
                <time mxTimelineTime datetime="2026-10-26">Ontem</time>
                <p mxTimelineTitle>Email aberto</p>
              </li>
              <li mxTimelineItem icon variant="warning">
                <svg mxTimelineIcon viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2.5l6 11H2z M8 7v3 M8 11.8h.01"
                    stroke="currentColor"
                    stroke-width="1.3"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  />
                </svg>
                <time mxTimelineTime datetime="2026-10-24">24 out</time>
                <p mxTimelineTitle>Limite de crédito perto do fim</p>
              </li>
            </ol>
          </doc-example>
          <doc-example
            title="Horizontal"
            note='orientation="horizontal"; desliza para os lados em ecrãs estreitos.'
          >
            <ol mxTimeline orientation="horizontal" aria-label="Fases do projecto" class="w-full">
              <li mxTimelineItem variant="success">
                <time mxTimelineTime>Jan</time>
                <p mxTimelineTitle>Levantamento</p>
              </li>
              <li mxTimelineItem variant="success">
                <time mxTimelineTime>Mar</time>
                <p mxTimelineTitle>Desenho</p>
              </li>
              <li mxTimelineItem variant="accent">
                <time mxTimelineTime>Jun</time>
                <p mxTimelineTitle>Desenvolvimento</p>
              </li>
              <li mxTimelineItem pending>
                <time mxTimelineTime>Set</time>
                <p mxTimelineTitle>Lançamento</p>
              </li>
            </ol>
          </doc-example>
          <doc-example
            title="Registo de actividade com conteúdo"
            note="Cada item aceita qualquer conteúdo: badges, botões, citações."
          >
            <ol mxTimeline size="sm" aria-label="Registo da factura">
              <li mxTimelineItem variant="danger">
                <time mxTimelineTime datetime="2026-10-26T23:00">26 out, 23:00</time>
                <p mxTimelineTitle>
                  Passou a <span mxBadge variant="danger" size="sm">Em atraso</span>
                </p>
                <div>
                  <button mxButton size="sm" variant="outline" type="button">
                    Enviar lembrete
                  </button>
                </div>
              </li>
              <li mxTimelineItem>
                <time mxTimelineTime datetime="2026-10-20T14:10">20 out, 14:10</time>
                <p mxTimelineTitle>Comentário de Pedro Neto</p>
                <blockquote class="timeline-quote">
                  O cliente pediu mais 10 dias para pagar.
                </blockquote>
              </li>
              <li mxTimelineItem>
                <time mxTimelineTime datetime="2026-09-26T09:00">26 set, 09:00</time>
                <p mxTimelineTitle>Emitida</p>
              </li>
            </ol>
          </doc-example>
          <doc-example
            title="Alternada"
            note='align="alternate" em ecrãs largos; em telemóvel volta a uma coluna.'
          >
            <ol mxTimeline align="alternate" aria-label="História da empresa" class="w-full">
              @for (m of historia; track m.ano) {
                <li mxTimelineItem variant="accent">
                  <time mxTimelineTime>{{ m.ano }}</time>
                  <p mxTimelineTitle>{{ m.titulo }}</p>
                  <p mxTimelineDescription>{{ m.texto }}</p>
                </li>
              }
            </ol>
          </doc-example>
          <doc-example
            title="Agrupada por dia"
            note="Um título por dia e uma lista por baixo de cada um."
          >
            <div class="stack w-full">
              @for (d of dias; track d.dia) {
                <section class="timeline-day" [attr.aria-labelledby]="'dia-' + $index">
                  <h3 class="timeline-day-title" [id]="'dia-' + $index">{{ d.dia }}</h3>
                  <ul mxTimeline size="sm" [attr.aria-labelledby]="'dia-' + $index">
                    @for (e of d.eventos; track e.hora) {
                      <li mxTimelineItem [variant]="e.tipo">
                        <time mxTimelineTime>{{ e.hora }}</time>
                        <p mxTimelineTitle>{{ e.texto }}</p>
                      </li>
                    }
                  </ul>
                </section>
              }
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Só entra no que o item tiver de interactivo (botões, links).' },
          ]"
          [aria]="[
            'ol nativo: o leitor de ecrã anuncia lista, 3 itens e a posição de cada um.',
            'Dá um nome à lista com aria-label ou aria-labelledby.',
            'A data vai num time com datetime; aparece por cima, mas é lida pela ordem do HTML.',
            'A cor do marcador não chega: diz o estado no texto (Paga, Em atraso, por acontecer).',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related
          [items]="[{ name: 'Stepper' }, { name: 'Notification center' }, { name: 'Badge' }]"
        />
      </section>
    </article>
  `,
})
export class TimelinePage {
  protected readonly encomenda = [
    { titulo: 'Encomenda recebida', quando: '24 out, 10:15', iso: '2026-10-24T10:15', feito: true },
    { titulo: 'Em preparação', quando: '25 out, 09:00', iso: '2026-10-25T09:00', feito: true },
    {
      titulo: 'A caminho de Benguela',
      quando: '27 out, 07:40',
      iso: '2026-10-27T07:40',
      feito: true,
    },
    { titulo: 'Entregue', quando: 'Previsto 29 out', iso: '2026-10-29', feito: false },
  ];
  protected readonly historia = [
    { ano: '2019', titulo: 'Fundação', texto: 'Primeiro escritório em Luanda.' },
    { ano: '2021', titulo: 'Benguela', texto: 'Abertura da segunda loja.' },
    { ano: '2024', titulo: '100 clientes', texto: 'Empresas em 6 províncias.' },
    { ano: '2026', titulo: 'Plataforma online', texto: 'Facturação electrónica para todos.' },
  ];
  protected readonly dias = [
    {
      dia: 'Hoje',
      eventos: [
        { hora: '09:40', texto: 'Ana Kiala emitiu FT 2026/0200', tipo: 'accent' as const },
        { hora: '08:12', texto: 'Huíla Agro pagou FT 2026/0196', tipo: 'success' as const },
      ],
    },
    {
      dia: 'Ontem',
      eventos: [
        { hora: '23:00', texto: '3 facturas passaram a estar em atraso', tipo: 'danger' as const },
        {
          hora: '16:25',
          texto: 'Pedro Neto adicionou o cliente Uíge Café',
          tipo: 'default' as const,
        },
      ],
    },
  ];

  protected readonly previewCode = `<ol mxTimeline aria-label="Histórico da factura">
  <li mxTimelineItem variant="success">
    <time mxTimelineTime datetime="2026-10-27T08:12">27 out, 08:12</time>
    <p mxTimelineTitle>Paga</p>
    <p mxTimelineDescription>Huíla Agro pagou por transferência.</p>
  </li>
  <li mxTimelineItem>
    <time mxTimelineTime datetime="2026-10-15T09:30">15 out, 09:30</time>
    <p mxTimelineTitle>Emitida</p>
  </li>
</ol>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Directiva',
      name: 'ol[mxTimeline], ul[mxTimeline]',
      type: 'orientation, size, align',
      description: 'A lista.',
    },
    { kind: 'Input', name: 'orientation', type: "'vertical' | 'horizontal'", default: 'vertical' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md'", default: 'md' },
    {
      kind: 'Input',
      name: 'align',
      type: "'start' | 'alternate'",
      default: 'start',
      description: 'Alternada só em ecrãs a partir de 720 px.',
    },
    {
      kind: 'Directiva',
      name: 'li[mxTimelineItem]',
      type: 'variant, pending, icon',
      description: 'Um acontecimento.',
    },
    {
      kind: 'Input',
      name: 'variant',
      type: "'default' | 'accent' | 'success' | 'warning' | 'danger'",
      default: 'default',
    },
    {
      kind: 'Input',
      name: 'pending',
      type: 'boolean',
      default: 'false',
      description: 'Marcador tracejado e título apagado.',
    },
    {
      kind: 'Input',
      name: 'icon',
      type: 'boolean',
      default: 'false',
      description: 'Marcador de 28 px para um mxTimelineIcon.',
    },
    {
      kind: 'Directiva',
      name: 'mxTimelineTime, mxTimelineTitle, mxTimelineDescription, mxTimelineIcon',
      type: 'estilo',
      description: 'Partes do item.',
    },
  ];
}
