import { MxSwitch } from '@muxima-ui/core/switch';
import { MxChoice, MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-tabs-page',
  imports: [DOC_UI, MxTabs, MxTab, MxFormField, MxLabel, MxInput, MxChoice, MxSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Tabs' }]"
        title="Tabs"
        lead="Dividem conteúdo relacionado em secções ao mesmo nível. O separador activo é marcado pela linha Kwanza."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de separadores" align="start">
          <mx-tabs aria-label="Definições da conta" class="w-full">
            <mx-tab label="Perfil"><p class="tab-copy">Nome, fotografia e contactos visíveis para a equipa.</p></mx-tab>
            <mx-tab label="Segurança"><p class="tab-copy">Palavra-passe, sessões activas e autenticação em dois passos.</p></mx-tab>
            <mx-tab label="Facturação"><p class="tab-copy">Plano actual, método de pagamento e facturas.</p></mx-tab>
          </mx-tabs>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxTabs, MxTab } from '@muxima-ui/core/tabs';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Uma lista de separadores e um painel por separador, ligados entre si.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Separador (role=tab)',
            topRight: 'Linha de estado 2 px',
            bottomLeft: 'Borda inferior 1 px',
            bottomRight: 'Painel (role=tabpanel)',
            bottom: 'O conteúdo só é criado quando o separador abre'
          }"
        >
          <div class="mini-tabs" aria-hidden="true"><span class="on">Perfil</span><span>Segurança</span></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Cada separador tem estes estados. O seleccionado ganha a linha Kwanza de 2 px.</p>
        <doc-states>
          <doc-state name="Normal"><div class="mx-tab-list"><span class="mx-tab">Resumo</span></div></doc-state>
          <doc-state name="Hover"><div class="mx-tab-list"><span class="mx-tab" data-mx-state="hover">Resumo</span></div></doc-state>
          <doc-state name="Foco" note="Anel dentro do separador."><div class="mx-tab-list"><span class="mx-tab" data-mx-state="focus">Resumo</span></div></doc-state>
          <doc-state name="Seleccionado" note="aria-selected"><div class="mx-tab-list"><span class="mx-tab" data-selected>Resumo</span></div></doc-state>
          <doc-state name="Desactivado" note="Saltado pelas setas."><div class="mx-tab-list"><span class="mx-tab" data-disabled>Resumo</span></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Separador desactivado">
            <mx-tabs aria-label="Relatórios" class="w-full">
              <mx-tab label="Mensal"><p class="tab-copy">Resumo do mês.</p></mx-tab>
              <mx-tab label="Trimestral" disabled><p class="tab-copy">Indisponível.</p></mx-tab>
              <mx-tab label="Anual"><p class="tab-copy">Resumo do ano.</p></mx-tab>
            </mx-tabs>
          </doc-example>
          <doc-example title="Controlado" [note]="'Índice activo: ' + index()">
            <mx-tabs [(selectedIndex)]="index" aria-label="Passos" class="w-full">
              <mx-tab label="Dados"><p class="tab-copy">Passo 1 de 3.</p></mx-tab>
              <mx-tab label="Pagamento"><p class="tab-copy">Passo 2 de 3.</p></mx-tab>
              <mx-tab label="Confirmação"><p class="tab-copy">Passo 3 de 3.</p></mx-tab>
            </mx-tabs>
          </doc-example>
          <doc-example title="Dentro de um cartão">
            <section class="mx-card w-full" aria-labelledby="tabs-card-t">
              <header class="mx-card-header"><h3 class="mx-card-title" id="tabs-card-t">Cliente: Banco Mutamba</h3></header>
              <div class="mx-card-content">
                <mx-tabs aria-label="Detalhe do cliente">
                  <mx-tab label="Resumo"><p class="tab-copy">Saldo de 4 870 500,00 Kz, 2 facturas pendentes.</p></mx-tab>
                  <mx-tab label="Contactos"><p class="tab-copy">Dra. Luísa Gomes · luisa&#64;mutamba.ao</p></mx-tab>
                  <mx-tab label="Notas"><p class="tab-copy">Paga por transferência no fim do mês.</p></mx-tab>
                </mx-tabs>
              </div>
            </section>
          </doc-example>
          <doc-example title="Com formulários" note="O conteúdo de cada separador só é criado quando é aberto.">
            <mx-tabs aria-label="Definições" class="w-full">
              <mx-tab label="Perfil">
                <div class="stack tab-form">
                  <mx-form-field><label mxLabel>Nome</label><input mxInput value="Ana Kiala" /></mx-form-field>
                  <mx-form-field><label mxLabel>Email</label><input mxInput type="email" value="ana&#64;kianda.co.ao" /></mx-form-field>
                </div>
              </mx-tab>
              <mx-tab label="Segurança">
                <div class="stack tab-form">
                  <label mxChoice><input type="checkbox" mxSwitch checked /> Verificação em dois passos</label>
                  <label mxChoice><input type="checkbox" mxSwitch /> Alertas de novo início de sessão</label>
                </div>
              </mx-tab>
            </mx-tabs>
          </doc-example>
          <doc-example title="Muitos separadores" note="A lista faz scroll horizontal quando não cabe; as setas continuam a funcionar.">
            <mx-tabs aria-label="Meses" class="w-full narrow-tabs">
              @for (m of meses; track m) {
                <mx-tab [label]="m"><p class="tab-copy">Facturação de {{ m }}.</p></mx-tab>
              }
            </mx-tabs>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Entra no separador activo e depois no painel.' },
            { key: '← →', action: 'Mudam de separador, saltando os desactivados.' },
            { key: 'Home End', action: 'Primeiro e último separador.' }
          ]"
          [aria]="[
            'Padrão WAI-ARIA Tabs com activação automática.',
            'role=&quot;tablist&quot;, &quot;tab&quot; e &quot;tabpanel&quot;, com aria-selected, aria-controls e aria-labelledby.',
            'Tabindex itinerante: só o separador activo está na ordem de tabulação.',
            'Dá um nome à lista com aria-label quando não há título visível.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Stepper' }, { name: 'Accordion' }, { name: 'Dialog', path: '/componentes/dialog' }]" />
      </section>
    </article>
  `,
})
export class TabsPage {
  protected readonly meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  protected readonly index = signal(0);

  protected readonly previewCode = `<mx-tabs aria-label="Definições da conta">
  <mx-tab label="Perfil">...</mx-tab>
  <mx-tab label="Segurança">...</mx-tab>
  <mx-tab label="Facturação">...</mx-tab>
</mx-tabs>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'selectedIndex', type: 'number', default: '0', description: 'Aceita [(selectedIndex)].' },
    { kind: 'Input', name: 'aria-label', type: 'string', description: 'Nome da lista de separadores.' },
    { kind: 'Directiva', name: 'mx-tab', type: 'MxTab', description: 'Inputs label (obrigatório) e disabled.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Linha do separador activo.' },
  ];
}
