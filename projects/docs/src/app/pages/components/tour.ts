import { ChangeDetectionStrategy, Component, ElementRef, TemplateRef, inject, signal, viewChild } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxInput } from '@muxima-ui/core/form-field';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';
import { MxTour, MxTourAnchor, MxTourStepContext } from '@muxima-ui/core/tour';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-tour-page',
  imports: [DOC_UI, MxTourAnchor, MxButton, MxInput, MxBadge, MxTabs, MxTab],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Tour guide' }]"
        title="Tour guide"
        lead="Visita guiada para apresentar um ecrã: destaca um elemento de cada vez e explica-o num cartão com Anterior, Seguinte e Saltar. Funciona com teclado e leitor de ecrã, e no fim o foco volta para onde estava."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de tour guide">
          <div class="tour-demo w-full">
            <div class="tour-bar">
              <input
                mxInput
                size="sm"
                type="search"
                class="tour-search"
                placeholder="Pesquisar clientes e facturas"
                aria-label="Pesquisar"
                mxTourAnchor="demo-pesquisa"
              />
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="demo-filtros">
                Filtros
              </button>
              <button mxButton size="sm" type="button" mxTourAnchor="demo-nova">Nova factura</button>
            </div>
            <div class="tour-stats" mxTourAnchor="demo-resumo">
              <div><span class="muted small">Por receber</span><strong>4 820 000 Kz</strong></div>
              <div><span class="muted small">Em atraso</span><strong>3 facturas</strong></div>
            </div>
            <button mxButton variant="ghost" size="sm" type="button" (click)="visitaPrincipal()">
              Começar a visita
            </button>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxTour, MxTourAnchor } from '@muxima-ui/core/tour';" />
        <doc-callout
          >mxTourAnchor dá um nome a um elemento; MxTour.start() recebe os passos. Um passo sem
          target aparece ao centro do ecrã, bom para a boas-vindas.</doc-callout
        >
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          O elemento do passo fica em destaque com um contorno, o resto do ecrã escurece, e o
          cartão aparece ao lado, onde houver espaço.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Progresso (Passo 2 de 4)',
            topRight: 'Fechar',
            bottomLeft: 'Pontos de progresso',
            bottomRight: 'Saltar, Anterior, Seguinte',
            bottom: 'role=dialog, aria-modal=true',
          }"
        >
          <div class="mx-tour-card tour-static" aria-hidden="true">
            <div class="mx-tour-head">
              <p class="mx-tour-progress">Passo 2 de 4</p>
            </div>
            <p class="mx-tour-title">Filtros</p>
            <div class="mx-tour-body"><p>Mostra só as facturas que te interessam.</p></div>
            <div class="mx-tour-foot">
              <span class="mx-tour-dots"
                ><span class="mx-tour-dot"></span><span class="mx-tour-dot" data-active></span
                ><span class="mx-tour-dot"></span><span class="mx-tour-dot"></span
              ></span>
              <span class="mx-tour-actions">
                <span class="tour-fake-btn">Saltar</span>
                <span class="tour-fake-btn primary">Seguinte</span>
              </span>
            </div>
          </div>
        </doc-structure>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example
            title="Conteúdo rico"
            note="template em vez de content: listas, atalhos ou uma imagem dentro do passo."
          >
            <div class="row-wrap">
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="rico-atalhos">
                Atalhos
              </button>
              <button mxButton size="sm" type="button" (click)="visitaRica()">Ver a visita</button>
            </div>
            <ng-template #passoAtalhos>
              <p>Usa o teclado para ir mais depressa:</p>
              <ul class="tour-keys">
                <li><kbd>Ctrl</kbd> + <kbd>K</kbd> pesquisar</li>
                <li><kbd>N</kbd> nova factura</li>
                <li><kbd>?</kbd> esta ajuda</li>
              </ul>
            </ng-template>
          </doc-example>

          <doc-example
            title="Mudar de separador"
            note="beforeShow abre o separador certo antes de destacar o que está lá dentro."
          >
            <div class="stack w-full">
              <mx-tabs [(selectedIndex)]="separador" aria-label="Definições" class="w-full">
                <mx-tab label="Perfil">
                  <p class="tab-copy" mxTourAnchor="sep-perfil">Nome, fotografia e contactos.</p>
                </mx-tab>
                <mx-tab label="Segurança">
                  <p class="tab-copy" mxTourAnchor="sep-seguranca">
                    Palavra-passe e verificação em dois passos.
                  </p>
                </mx-tab>
                <mx-tab label="Facturação">
                  <p class="tab-copy" mxTourAnchor="sep-facturacao">Plano e método de pagamento.</p>
                </mx-tab>
              </mx-tabs>
              <div>
                <button mxButton size="sm" type="button" (click)="visitaSeparadores()">
                  Ver a visita
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Mostrar só uma vez"
            [note]="
              vista()
                ? 'Guardado: já viste a visita. Repor apaga a marca.'
                : 'afterClosed diz se chegou ao fim; aí guarda-se que já foi vista.'
            "
          >
            <div class="row-wrap">
              <span mxBadge [variant]="vista() ? 'success' : 'secondary'" mxTourAnchor="uma-estado">{{
                vista() ? 'Vista' : 'Por ver'
              }}</span>
              @if (vista()) {
                <button mxButton size="sm" variant="outline" type="button" (click)="repor()">
                  Repor
                </button>
              } @else {
                <button mxButton size="sm" type="button" (click)="visitaUmaVez()">
                  Ver a visita
                </button>
              }
            </div>
          </doc-example>

          <doc-example
            title="Retomar onde parou"
            [note]="
              parou() !== null
                ? 'Saltaste no passo ' + (parou()! + 1) + '. startAt continua daí.'
                : 'Salta a meio e depois continua.'
            "
          >
            <div class="row-wrap">
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="ret-a">
                Clientes
              </button>
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="ret-b">
                Facturas
              </button>
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="ret-c">
                Relatórios
              </button>
              <button mxButton size="sm" type="button" (click)="visitaRetomar()">
                {{ parou() !== null ? 'Continuar' : 'Ver a visita' }}
              </button>
            </div>
          </doc-example>

          <doc-example
            title="Posição do cartão"
            note="placement: top, bottom, start ou end; se não couber, escolhe outro lado."
          >
            <div class="row-wrap">
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="pos-a">
                Em cima
              </button>
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="pos-b">
                Ao lado
              </button>
              <button mxButton size="sm" type="button" (click)="visitaPosicoes()">Ver a visita</button>
            </div>
          </doc-example>

          <doc-example
            title="Sem saltar, e noutra língua"
            note="dismissible: false tira Saltar, Fechar e Escape; labels muda os textos."
          >
            <div class="row-wrap">
              <span class="muted small" mxTourAnchor="en-termos">Terms of use</span>
              <button mxButton size="sm" type="button" (click)="visitaIngles()">Start the tour</button>
            </div>
          </doc-example>

          <doc-example
            title="Alvo por referência"
            note="target aceita um nome, um selector CSS, um elemento ou um ElementRef."
          >
            <div class="row-wrap">
              <button #ajuda mxButton size="sm" variant="outline" type="button">Ajuda</button>
              <button mxButton size="sm" type="button" (click)="visitaReferencia()">Ver a visita</button>
            </div>
          </doc-example>

          <doc-example
            title="Resultado"
            [note]="resultado() || 'afterClosed devolve { completed, index }.'"
          >
            <div class="row-wrap">
              <span class="muted small" mxTourAnchor="res-a">Primeiro passo</span>
              <span class="muted small" mxTourAnchor="res-b">Segundo passo</span>
              <button mxButton size="sm" type="button" (click)="visitaResultado()">Ver a visita</button>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Percorre os botões do cartão; o foco não sai dele.' },
            { key: '→ ←', action: 'Passo seguinte e anterior.' },
            { key: 'Enter Espaço', action: 'Activam o botão com foco.' },
            { key: 'Esc', action: 'Fecha a visita (excepto com dismissible: false).' },
          ]"
          [aria]="[
            'O cartão é role=dialog com aria-modal=true, nome no título e descrição no progresso e no texto.',
            'Em cada passo o foco vai para o cartão: o leitor de ecrã lê o título, Passo 2 de 4 e o texto.',
            'Ao fechar, o foco volta ao elemento que tinha antes (o botão que começou a visita).',
            'O elemento fora do ecrã é trazido para a vista; com reduzir movimento, sem animação.',
            'Em alto contraste, o destaque é um contorno da cor do sistema.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Popover' }, { name: 'Dialog' }, { name: 'Stepper' }]" />
      </section>
    </article>
  `,
})
export class TourPage {
  private readonly tour = inject(MxTour);

  protected visitaPrincipal(): void {
    this.tour.start([
      {
        title: 'Bem-vindo às facturas',
        content: 'Em quatro passos mostramos o essencial deste ecrã.',
      },
      {
        target: 'demo-pesquisa',
        title: 'Pesquisa',
        content: 'Procura por cliente, número ou valor.',
      },
      {
        target: 'demo-filtros',
        title: 'Filtros',
        content: 'Mostra só as facturas que te interessam.',
      },
      {
        target: 'demo-nova',
        title: 'Nova factura',
        content: 'Começa aqui. Os dados do cliente são preenchidos sozinhos.',
      },
      {
        target: 'demo-resumo',
        title: 'Resumo',
        content: 'O que tens por receber e o que está em atraso.',
      },
    ]);
  }

  private readonly passoAtalhos = viewChild.required<TemplateRef<MxTourStepContext>>('passoAtalhos');
  protected visitaRica(): void {
    this.tour.start([
      { target: 'rico-atalhos', title: 'Atalhos de teclado', template: this.passoAtalhos() },
    ]);
  }

  protected readonly separador = signal(0);
  protected visitaSeparadores(): void {
    this.tour.start([
      {
        target: 'sep-perfil',
        title: 'Perfil',
        content: 'Como os outros te vêem.',
        beforeShow: () => this.separador.set(0),
      },
      {
        target: 'sep-seguranca',
        title: 'Segurança',
        content: 'Activa a verificação em dois passos.',
        beforeShow: () => this.separador.set(1),
      },
      {
        target: 'sep-facturacao',
        title: 'Facturação',
        content: 'Muda de plano quando quiseres.',
        beforeShow: () => this.separador.set(2),
      },
    ]);
  }

  protected readonly vista = signal(lerVista());
  protected visitaUmaVez(): void {
    this.tour
      .start([
        { title: 'Novidade', content: 'Agora podes enviar facturas por WhatsApp.' },
        { target: 'uma-estado', title: 'Estado', content: 'No fim, isto passa a Vista.' },
      ])
      .afterClosed.then((r) => {
        if (r.completed) {
          guardarVista(true);
          this.vista.set(true);
        }
      });
  }
  protected repor(): void {
    guardarVista(false);
    this.vista.set(false);
  }

  protected readonly parou = signal<number | null>(null);
  protected visitaRetomar(): void {
    this.tour
      .start(
        [
          { target: 'ret-a', title: 'Clientes', content: 'A lista de todos os clientes.' },
          { target: 'ret-b', title: 'Facturas', content: 'Emitidas, pagas e por pagar.' },
          { target: 'ret-c', title: 'Relatórios', content: 'IVA, vendas e cobranças.' },
        ],
        { startAt: this.parou() ?? 0 },
      )
      .afterClosed.then((r) => this.parou.set(r.completed ? null : r.index));
  }

  protected visitaPosicoes(): void {
    this.tour.start([
      { target: 'pos-a', title: 'Em cima', content: 'placement: top', placement: 'top' },
      { target: 'pos-b', title: 'Ao lado', content: 'placement: end', placement: 'end' },
    ]);
  }

  protected visitaIngles(): void {
    this.tour.start(
      [
        { title: 'Welcome', content: 'Two quick steps before you start.' },
        { target: 'en-termos', title: 'Terms', content: 'Read the terms of use.' },
      ],
      {
        dismissible: false,
        labels: {
          next: 'Next',
          previous: 'Back',
          done: 'Got it',
          progress: (atual, total) => `Step ${atual} of ${total}`,
        },
      },
    );
  }

  private readonly ajuda = viewChild.required('ajuda', { read: ElementRef });
  protected visitaReferencia(): void {
    this.tour.start([
      { target: this.ajuda(), title: 'Ajuda', content: 'Este alvo veio de um viewChild.' },
    ]);
  }

  protected readonly resultado = signal('');
  protected visitaResultado(): void {
    this.tour
      .start([
        { target: 'res-a', title: 'Um', content: 'Primeiro passo.' },
        { target: 'res-b', title: 'Dois', content: 'Segundo passo.' },
      ])
      .afterClosed.then((r) =>
        this.resultado.set(
          r.completed ? 'Concluída.' : `Fechada no passo ${r.index + 1}, sem concluir.`,
        ),
      );
  }

  protected readonly previewCode = `<input mxInput aria-label="Pesquisar" mxTourAnchor="pesquisa" />
<button mxButton mxTourAnchor="nova">Nova factura</button>
<button mxButton variant="ghost" (click)="visita()">Começar a visita</button>

private readonly tour = inject(MxTour);
visita() {
  this.tour.start([
    { title: 'Bem-vindo às facturas', content: 'Em dois passos mostramos o essencial.' },
    { target: 'pesquisa', title: 'Pesquisa', content: 'Procura por cliente, número ou valor.' },
    { target: 'nova', title: 'Nova factura', content: 'Começa aqui.' },
  ]);
}`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Método',
      name: 'MxTour.start(steps, options?)',
      type: 'MxTourRef',
      description: 'Começa a visita; fecha a que estiver aberta.',
    },
    {
      kind: 'Propriedade',
      name: 'MxTour.active()',
      type: 'MxTourRef | null',
      description: 'A visita em curso.',
    },
    {
      kind: 'Directiva',
      name: '[mxTourAnchor]',
      type: 'string',
      description: 'Dá um nome a um elemento para usar em target.',
    },
    {
      kind: 'Input',
      name: 'MxTourStep',
      type: 'target, title, content, template, placement, padding, beforeShow',
      description: 'Sem target, o cartão fica ao centro.',
    },
    {
      kind: 'Input',
      name: 'MxTourOptions',
      type: 'startAt, labels, dismissible, showDots',
    },
    {
      kind: 'Método',
      name: 'MxTourRef: next(), previous(), goTo(i), close(completed?)',
      type: 'void',
    },
    {
      kind: 'Propriedade',
      name: 'MxTourRef.index, afterClosed',
      type: 'Signal<number>, Promise<MxTourResult>',
      description: 'MxTourResult = { completed, index }.',
    },
    {
      kind: 'Função',
      name: 'MX_TOUR_LABELS',
      type: 'MxTourLabels',
      description: 'Textos por omissão, em português.',
    },
  ];
}

const CHAVE = 'muxima-docs-tour-vista';
function lerVista(): boolean {
  try {
    return localStorage.getItem(CHAVE) === '1';
  } catch {
    return false;
  }
}
function guardarVista(v: boolean): void {
  try {
    if (v) localStorage.setItem(CHAVE, '1');
    else localStorage.removeItem(CHAVE);
  } catch {
    // sem armazenamento: a visita volta a aparecer, o que não faz mal
  }
}
