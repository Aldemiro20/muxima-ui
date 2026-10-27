import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DOC_UI } from '../ui/doc-ui';

interface Rule {
  title: string;
  text: string;
  checks: string[];
}

@Component({
  selector: 'doc-padrao',
  imports: [DOC_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Começar' }, { label: 'Padrão de qualidade' }]"
        title="Padrão de qualidade"
        lead="Um componente só entra na Muxima UI quando cumpre esta lista. É ela que transforma muitos componentes em componentes em que se confia."
      />

      <section>
        <h2>As oito regras</h2>
        <ol class="rules">
          @for (r of rules; track r.title; let i = $index) {
            <li class="card rule">
              <span class="rule-number" aria-hidden="true">{{ i + 1 }}</span>
              <div>
                <h3>{{ r.title }}</h3>
                <p>{{ r.text }}</p>
                <ul class="plain-list">
                  @for (c of r.checks; track c) {
                    <li>{{ c }}</li>
                  }
                </ul>
              </div>
            </li>
          }
        </ol>
      </section>

      <section>
        <h2>Como é verificado</h2>
        <p>Cada componente tem testes de comportamento e de teclado, e um teste axe no próprio componente. O site inteiro passa no axe, página a página, nos modos claro e escuro:</p>
        <doc-code code="npm test            # comportamento, teclado e axe por componente
npm run build:docs
npm run test:a11y   # axe em todas as páginas de exemplo, claro e escuro" />
      </section>
    </article>
  `,
})
export class PadraoPage {
  protected readonly rules: Rule[] = [
    {
      title: 'Angular actual',
      text: 'Angular 21 e 22. Nada de APIs antigas.',
      checks: ['Inputs com input(), model() e output()', 'Controlo de fluxo @if e @for', 'ChangeDetectionStrategy.OnPush e compatível com zoneless'],
    },
    {
      title: 'HTML nativo primeiro',
      text: 'Directivas sobre elementos reais (button[mxButton], input[mxInput]) em vez de embrulhar o elemento num componente.',
      checks: ['type, disabled, routerLink, aria-* e formulários funcionam sem código extra', 'Componente só quando o HTML não tem equivalente (Select, Tabs, Avatar)'],
    },
    {
      title: 'Acessibilidade',
      text: 'Padrões WAI-ARIA e navegação completa por teclado, com o @angular/cdk (a11y, overlay, dialog).',
      checks: ['dialog, tabs, menu, listbox e combobox segundo o WAI-ARIA', 'Foco preso nos modais e devolvido ao fechar', 'Contraste AA nos modos claro e escuro'],
    },
    {
      title: 'Formulários',
      text: 'Todos os campos funcionam com ngModel e Reactive Forms.',
      checks: ['ControlValueAccessor (ou o acessor nativo do Angular nos inputs)', 'Estado de erro ligado ao controlo, depois de tocado', 'aria-describedby para a ajuda e a mensagem de erro'],
    },
    {
      title: 'Estados completos',
      text: 'Normal, hover, foco, activo, desactivado, a carregar, erro e vazio, quando se aplicam.',
      checks: ['Cada página tem a secção Estados com um exemplo de cada', 'data-mx-state mostra hover, foco e activo sem interacção'],
    },
    {
      title: 'Só tokens',
      text: 'Nenhuma cor escrita à mão no CSS dos componentes: tudo vem de --mx-*.',
      checks: ['Modo escuro automático', 'A marca muda com --mx-accent e --mx-radius'],
    },
    {
      title: 'API pequena e previsível',
      text: 'Os mesmos nomes em todos os componentes.',
      checks: ['variant, size e disabled com o mesmo significado em todo o lado', 'No máximo 6 variantes e 3 tamanhos (sm, md, lg)', 'Nomes de componentes em inglês, como em qualquer biblioteca: Button, Select, Dialog'],
    },
    {
      title: 'Testes',
      text: 'Comportamento e teclado em cada componente, mais acessibilidade automática.',
      checks: ['Teste axe em cada componente (npm test)', 'Teste axe em cada página de exemplo (npm run test:a11y)'],
    },
  ];
}
