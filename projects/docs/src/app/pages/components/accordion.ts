import { MxSwitch } from '@muxima-ui/core/switch';
import { MxChoice } from '@muxima-ui/core/form-field';
import { MxButton } from '@muxima-ui/core/button';
import { MxBadge } from '@muxima-ui/core/badge';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MX_ACCORDION } from '@muxima-ui/core/accordion';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-accordion-page',
  imports: [DOC_UI, MX_ACCORDION, MxBadge, MxButton, MxChoice, MxSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Accordion' }]"
        title="Accordion"
        lead="Secções que abrem e fecham, sobre details e summary nativos. O teclado, o estado anunciado e a pesquisa do navegador funcionam sem JavaScript."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de accordion" align="start">
          <div mxAccordion class="w-full">
            @for (q of faq; track q.q; let first = $first) {
              <details mxAccordionItem [open]="first">
                <summary mxAccordionTrigger>{{ q.q }}</summary>
                <div mxAccordionContent>{{ q.a }}</div>
              </details>
            }
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_ACCORDION } from '@muxima-ui/core/accordion';" />
      </section>

      <section>
        <h2>Estados</h2>
        <p>Hover e foco aparecem aqui fixos para comparação.</p>
        <doc-states>
          <doc-state name="Fechado"><div mxAccordion class="w-full"><details mxAccordionItem><summary mxAccordionTrigger>Pagamentos</summary><div mxAccordionContent>...</div></details></div></doc-state>
          <doc-state name="Hover"><div mxAccordion class="w-full"><details mxAccordionItem><summary mxAccordionTrigger data-mx-state="hover">Pagamentos</summary><div mxAccordionContent>...</div></details></div></doc-state>
          <doc-state name="Foco"><div mxAccordion class="w-full"><details mxAccordionItem><summary mxAccordionTrigger data-mx-state="focus">Pagamentos</summary><div mxAccordionContent>...</div></details></div></doc-state>
          <doc-state name="Aberto" note="open"><div mxAccordion class="w-full"><details mxAccordionItem open><summary mxAccordionTrigger>Pagamentos</summary><div mxAccordionContent>Por referência.</div></details></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Várias abertas" note="multiple: cada secção abre e fecha sozinha.">
            <div mxAccordion multiple class="w-full">
              <details mxAccordionItem open><summary mxAccordionTrigger>Dados da empresa</summary><div mxAccordionContent>NIF, morada e contactos.</div></details>
              <details mxAccordionItem open><summary mxAccordionTrigger>Facturação</summary><div mxAccordionContent>Série, moeda e prazo de pagamento.</div></details>
              <details mxAccordionItem><summary mxAccordionTrigger>Utilizadores</summary><div mxAccordionContent>Convites e permissões.</div></details>
            </div>
          </doc-example>
          <doc-example title="Definições num cartão">
            <section class="mx-card w-full" aria-labelledby="acc-def">
              <header class="mx-card-header"><h3 class="mx-card-title" id="acc-def">Definições da conta</h3></header>
              <div class="mx-card-content">
                <div mxAccordion multiple>
                  <details mxAccordionItem>
                    <summary mxAccordionTrigger>Notificações</summary>
                    <div mxAccordionContent class="stack-sm">
                      <label mxChoice><input type="checkbox" mxSwitch checked /> Resumo diário</label>
                      <label mxChoice><input type="checkbox" mxSwitch /> Alertas por SMS</label>
                    </div>
                  </details>
                  <details mxAccordionItem>
                    <summary mxAccordionTrigger>Facturação</summary>
                    <div mxAccordionContent>Série FT 2026, moeda AOA, prazo de 30 dias.</div>
                  </details>
                </div>
              </div>
            </section>
          </doc-example>
          <doc-example title="Com contagem no título">
            <div mxAccordion class="w-full">
              @for (g of grupos; track g.nome) {
                <details mxAccordionItem>
                  <summary mxAccordionTrigger>{{ g.nome }} <span mxBadge size="sm" variant="secondary">{{ g.itens.length }}</span></summary>
                  <ul mxAccordionContent class="acc-list">
                    @for (i of g.itens; track i) {
                      <li>{{ i }}</li>
                    }
                  </ul>
                </details>
              }
            </div>
          </doc-example>
          <doc-example title="Aberto e controlado" [note]="aberto() ? 'A secção está aberta.' : 'A secção está fechada.'">
            <div class="stack w-full">
              <div><button mxButton type="button" variant="outline" size="sm" (click)="aberto.set(!aberto())">{{ aberto() ? 'Fechar' : 'Abrir' }} pela aplicação</button></div>
              <div mxAccordion>
                <details mxAccordionItem [open]="aberto()" (toggle)="aberto.set($any($event.target).open)">
                  <summary mxAccordionTrigger>Detalhes do envio</summary>
                  <div mxAccordionContent>Transportadora Kianda, entrega prevista a 30 de Outubro.</div>
                </details>
              </div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Passa pelos títulos das secções.' }, { key: 'Enter Espaço', action: 'Abrem ou fecham a secção.' }]"
          [aria]="[
            'summary é anunciado como botão com o estado expandido ou recolhido.',
            'Por omissão só uma secção abre de cada vez, com o atributo name nativo.',
            'Ctrl+F encontra texto nas secções fechadas e abre-as.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Tabs' }, { name: 'Card' }, { name: 'Stepper' }]" />
      </section>
    </article>
  `,
})
export class AccordionPage {
  protected readonly aberto = signal(false);
  protected readonly grupos = [
    { nome: 'Pendentes', itens: ['FT 2026/0143', 'FT 2026/0146'] },
    { nome: 'Em atraso', itens: ['FT 2026/0144'] },
    { nome: 'Pagas', itens: ['FT 2026/0142', 'FT 2026/0145', 'FT 2026/0141'] },
  ];

  protected readonly faq = [
    { q: 'Como pago a subscrição?', a: 'Por referência, transferência bancária ou Multicaixa Express. A factura chega por email.' },
    { q: 'Posso usar a Muxima UI em projectos comerciais?', a: 'Sim. O núcleo é MIT; os templates Pro têm licença própria.' },
    { q: 'Que versões do Angular são suportadas?', a: 'Angular 21 e 22.' },
  ];

  protected readonly previewCode = `<div mxAccordion>
  <details mxAccordionItem open>
    <summary mxAccordionTrigger>Como pago a subscrição?</summary>
    <div mxAccordionContent>Por referência, transferência ou Multicaixa Express.</div>
  </details>
</div>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxAccordion]', type: 'multiple: boolean', default: 'false', description: 'Com multiple, várias secções abertas.' },
    { kind: 'Directiva', name: 'details[mxAccordionItem]', type: 'open', description: 'Atributo nativo open para começar aberta.' },
    { kind: 'Directiva', name: 'summary[mxAccordionTrigger]', type: 'directiva', description: 'Título clicável.' },
    { kind: 'Directiva', name: '[mxAccordionContent]', type: 'directiva' },
  ];
}
