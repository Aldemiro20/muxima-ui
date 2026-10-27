import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MxButton } from '@muxima-ui/core/button';
import { MxInput } from '@muxima-ui/core/form-field';
import { DOC_UI, ApiRow } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';

@Component({
  selector: 'doc-button-page',
  imports: [DOC_UI, MxButton, MxInput, FormsModule, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Button' }]"
        title="Button"
        lead="Permitem executar acções, confirmar decisões e navegar. Estão disponíveis em três tamanhos e seis variantes, sempre com o mesmo anel de foco."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de botões">
          <button mxButton type="button">Botão principal <doc-icon name="arrowRight" /></button>
          <button mxButton type="button" variant="outline">Botão secundário</button>
          <button mxButton type="button" variant="link">Botão de texto</button>
          <button mxButton type="button" disabled>Desactivado</button>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <p>Instala o pacote e importa o botão no componente Angular onde o vais usar.</p>
        <doc-code code="npm install @muxima-ui/core @angular/cdk" />
        <doc-code code="import { MxButton } from '@muxima-ui/core/button';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Todos os botões partilham um sistema visual previsível: raio, altura, contorno e espaçamento.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Borda de 1 px',
            topRight: 'Foco de 2 px',
            bottomLeft: 'Raio de 6 px',
            bottomRight: 'Altura de 36 px',
            bottom: 'Espaçamento horizontal: 16 px'
          }"
        >
          <button mxButton type="button" tabindex="-1">Guardar alterações</button>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Hover, foco e activo aparecem aqui fixos para comparação. Na aplicação surgem com o rato e o teclado.</p>
        <doc-states>
          <doc-state name="Normal"><button mxButton type="button">Guardar</button></doc-state>
          <doc-state name="Hover" note="Fundo mais escuro."><button mxButton type="button" data-mx-state="hover">Guardar</button></doc-state>
          <doc-state name="Foco" note="Anel de 2 px, só com teclado."><button mxButton type="button" data-mx-state="focus">Guardar</button></doc-state>
          <doc-state name="Activo" note="Enquanto é premido."><button mxButton type="button" data-mx-state="active">Guardar</button></doc-state>
          <doc-state name="Desactivado" note="disabled"><button mxButton type="button" disabled>Guardar</button></doc-state>
          <doc-state name="A carregar" note="loading: aria-busy e cliques bloqueados."><button mxButton type="button" loading>A guardar</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <p>Um exemplo por situação de uso. O comportamento e o visual mantêm-se consistentes.</p>
        <div class="grid-2">
          <doc-example title="Variantes">
            <button mxButton type="button">Principal</button>
            <button mxButton type="button" variant="secondary">Secundário</button>
            <button mxButton type="button" variant="outline">Contorno</button>
            <button mxButton type="button" variant="ghost">Discreto</button>
            <button mxButton type="button" variant="destructive">Eliminar</button>
            <button mxButton type="button" variant="link">Ligação</button>
          </doc-example>
          <doc-example title="Tamanhos" note="32, 36 e 40 px de altura">
            <button mxButton type="button" size="sm">Pequeno</button>
            <button mxButton type="button">Médio</button>
            <button mxButton type="button" size="lg">Grande</button>
          </doc-example>
          <doc-example title="Com ícone">
            <button mxButton type="button"><doc-icon name="check" /> Confirmar</button>
            <button mxButton type="button" variant="outline"><doc-icon name="arrowRight" /> Continuar</button>
            <button mxButton type="button" variant="outline" icon aria-label="Copiar"><doc-icon name="copy" /></button>
          </doc-example>
          <doc-example title="A carregar e desactivado" note="Clica em Guardar para ver o estado de carregamento.">
            <button mxButton type="button" [loading]="saving()" (click)="save()">
              {{ saving() ? 'A guardar...' : 'Guardar' }}
            </button>
            <button mxButton type="button" disabled>Indisponível</button>
          </doc-example>
          <doc-example title="Num formulário" [note]="sent() ? 'Formulário enviado: ' + name : ''">
            <form class="inline-form" (ngSubmit)="sent.set(true)">
              <input mxInput name="nome" [(ngModel)]="name" placeholder="Nome completo" aria-label="Nome completo" />
              <button mxButton type="submit">Enviar</button>
            </form>
          </doc-example>
          <doc-example title="Como ligação" note="Usa a mesma directiva num a com routerLink.">
            <a mxButton variant="outline" routerLink="/componentes">Ver catálogo</a>
            <a mxButton variant="link" routerLink="/precos">Ver preços</a>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Move o foco para o botão.' },
            { key: 'Enter', action: 'Activa o botão.' },
            { key: 'Espaço', action: 'Activa o botão.' }
          ]"
          [aria]="[
            'Usa o elemento button ou a nativo: o leitor de ecrã anuncia-o como botão ou ligação.',
            'Desactivado: disabled em button; aria-disabled e fora da tabulação em a.',
            'A carregar: aria-busy=&quot;true&quot; e novos cliques bloqueados.',
            'Botões só com ícone precisam de aria-label.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>button[mxButton]</code>, <code>a[mxButton]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Dialog', path: '/componentes/dialog' }, { name: 'Input', path: '/componentes/input' }, { name: 'Dropdown menu' }]" />
      </section>
    </article>
  `,
})
export class ButtonPage {
  protected readonly saving = signal(false);
  protected readonly sent = signal(false);
  protected name = '';

  protected save(): void {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 1500);
  }

  protected readonly previewCode = `<button mxButton type="button">
  Botão principal <svg>...</svg>
</button>
<button mxButton type="button" variant="outline">Botão secundário</button>
<button mxButton type="button" variant="link">Botão de texto</button>
<button mxButton type="button" disabled>Desactivado</button>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'variant', type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'", default: 'default', description: 'Aparência do botão.' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '32, 36 ou 40 px de altura.' },
    { kind: 'Input', name: 'icon', type: 'boolean', default: 'false', description: 'Botão quadrado só com ícone; exige aria-label.' },
    { kind: 'Input', name: 'loading', type: 'boolean', default: 'false', description: 'Mostra o indicador e bloqueia cliques.' },
    { kind: 'Input', name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva o botão ou a ligação.' },
    { kind: 'Token CSS', name: '--mx-radius', type: 'length', default: '6px' },
    { kind: 'Token CSS', name: '--mx-control-height', type: 'length', default: '36px' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Cor do anel de foco e da variante link.' },
  ];
}
