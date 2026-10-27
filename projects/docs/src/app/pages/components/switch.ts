import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxChoice, MxChoiceDescription, MxFieldset } from '@muxima-ui/core/form-field';
import { MxSwitch } from '@muxima-ui/core/switch';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-switch-page',
  imports: [DOC_UI, FormsModule, MxSwitch, MxChoice, MxFieldset, MxChoiceDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Switch' }]"
        title="Switch"
        lead="Liga e desliga uma preferência com efeito imediato. É um checkbox nativo com role switch, por isso funciona com formulários e é anunciado como interruptor."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de switch">
          <fieldset mxFieldset>
            <legend>Preferências</legend>
            <label mxChoice><input type="checkbox" mxSwitch [(ngModel)]="email" /> Notificações por email</label>
            <label mxChoice><input type="checkbox" mxSwitch [(ngModel)]="sms" /> Alertas por SMS</label>
          </fieldset>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxSwitch } from '@muxima-ui/core/switch';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Calha arredondada e um botão que desliza. A cor Kwanza indica ligado.</p>
        <doc-structure [labels]="{ topLeft: 'Calha de 36 × 20 px', topRight: 'Foco de 2 px', bottomLeft: 'Botão de 16 px', bottomRight: 'Espaço de 8 px', bottom: 'input type=checkbox com role=switch' }">
          <label mxChoice><input type="checkbox" mxSwitch checked tabindex="-1" /> Modo escuro</label>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Hover e foco aparecem aqui fixos para comparação.</p>
        <doc-states>
          <doc-state name="Desligado"><input type="checkbox" mxSwitch aria-label="Desligado" /></doc-state>
          <doc-state name="Hover"><input type="checkbox" mxSwitch aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco"><input type="checkbox" mxSwitch aria-label="Foco" data-mx-state="focus" /></doc-state>
          <doc-state name="Ligado" note="checked"><input type="checkbox" mxSwitch aria-label="Ligado" checked /></doc-state>
          <doc-state name="Desactivado" note="disabled"><input type="checkbox" mxSwitch aria-label="Desactivado" disabled /><input type="checkbox" mxSwitch aria-label="Desactivado e ligado" disabled checked /></doc-state>
          <doc-state name="A guardar" note="Desactiva enquanto grava no servidor."><input type="checkbox" mxSwitch aria-label="A guardar" checked disabled aria-busy="true" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Gravação imediata" [note]="saving() ? 'A guardar...' : 'Guardado: ' + (twoFactor ? 'ligado' : 'desligado')">
            <label mxChoice>
              <input type="checkbox" mxSwitch [(ngModel)]="twoFactor" [disabled]="saving()" [attr.aria-busy]="saving() || null" (change)="save()" />
              Verificação em dois passos
            </label>
          </doc-example>
          <doc-example title="Tamanhos" note="28, 36 e 44 px de largura.">
            <label mxChoice><input type="checkbox" mxSwitch size="sm" checked /> Pequeno</label>
            <label mxChoice><input type="checkbox" mxSwitch checked /> Médio</label>
            <label mxChoice><input type="checkbox" mxSwitch size="lg" checked /> Grande</label>
          </doc-example>
          <doc-example title="Lista de preferências" note="Texto à esquerda, interruptor à direita; o label envolve tudo.">
            <div class="pref-list w-full">
              @for (p of prefs; track p.id) {
                <label mxChoice class="pref-row">
                  <span>{{ p.title }}<span mxChoiceDescription>{{ p.desc }}</span></span>
                  <input type="checkbox" mxSwitch [checked]="p.on" />
                </label>
              }
            </div>
          </doc-example>
          <doc-example title="Desactivado com motivo">
            <label mxChoice>
              <input type="checkbox" mxSwitch disabled aria-describedby="sw-motivo" />
              <span>Facturação automática<span mxChoiceDescription id="sw-motivo">Disponível depois de configurar a série de facturas.</span></span>
            </label>
          </doc-example>
        </div>
        <doc-callout>Usa o switch quando a mudança tem efeito logo. Num formulário que só conta ao enviar, usa um Checkbox.</doc-callout>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Move o foco para o interruptor.' }, { key: 'Espaço', action: 'Liga ou desliga.' }]"
          [aria]="[
            'role=switch: o leitor de ecrã anuncia ligado ou desligado em vez de marcado.',
            'O label envolvente dá o nome acessível.',
            'Enquanto grava, usa disabled e aria-busy para não aceitar cliques repetidos.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>input[type=checkbox][mxSwitch]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Checkbox' }, { name: 'Radio' }, { name: 'Toast' }]" />
      </section>
    </article>
  `,
})
export class SwitchPage {
  protected readonly prefs = [
    { id: 'email', title: 'Resumo diário por email', desc: 'Às 8h, com as facturas do dia anterior.', on: true },
    { id: 'sms', title: 'Alertas de pagamento por SMS', desc: 'Quando um cliente paga.', on: false },
    { id: 'dark', title: 'Modo escuro', desc: 'Segue o sistema quando desligado.', on: false },
  ];

  protected email = true;
  protected sms = false;
  protected twoFactor = false;
  protected readonly saving = signal(false);

  protected save(): void {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 900);
  }

  protected readonly previewCode = `<label mxChoice>
  <input type="checkbox" mxSwitch [(ngModel)]="email" /> Notificações por email
</label>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '28×16, 36×20 ou 44×24 px.' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Força o estado de erro.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'gerado', description: 'id do input.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Cor quando ligado.' },
  ];
}
