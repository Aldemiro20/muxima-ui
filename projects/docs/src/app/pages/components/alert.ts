import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MX_ALERT } from '@muxima-ui/core/alert';
import { MxButton } from '@muxima-ui/core/button';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-alert-page',
  imports: [DOC_UI, MX_ALERT, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Alert' }]"
        title="Alert"
        lead="Mensagem destacada dentro da página: informação, sucesso, aviso ou erro. Por omissão não interrompe o leitor de ecrã; só anuncia quando lhe pedes."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de alerta" align="start">
          <div mxAlert variant="warning" class="w-full">
            <p mxAlertTitle>A sessão expira em 5 minutos</p>
            <p>Guarda o trabalho para não perderes alterações.</p>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_ALERT } from '@muxima-ui/core/alert';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Ícone à esquerda, título e texto à direita. A cor vem do token do estado.</p>
        <doc-structure [labels]="{ topLeft: 'Ícone de 16 px', topRight: 'Borda a 30%', bottomLeft: 'Fundo a 6%', bottomRight: 'Raio de 10 px', bottom: 'Título opcional com mxAlertTitle' }">
          <div mxAlert variant="success" class="w-180"><p>Guardado.</p></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Quatro variantes de significado. O ícone muda com a variante, para não depender só da cor.</p>
        <doc-states>
          <doc-state name="Info"><div mxAlert class="w-full"><p>Nova versão disponível.</p></div></doc-state>
          <doc-state name="Success"><div mxAlert variant="success" class="w-full"><p>Pagamento confirmado.</p></div></doc-state>
          <doc-state name="Warning"><div mxAlert variant="warning" class="w-full"><p>Faltam 3 dias.</p></div></doc-state>
          <doc-state name="Danger"><div mxAlert variant="danger" class="w-full"><p>Falha no envio.</p></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Depois de uma acção" note="Com announce, o leitor de ecrã lê a mensagem quando aparece.">
            <div class="stack">
              <div><button mxButton type="button" variant="outline" (click)="send()">Enviar facturas</button></div>
              @if (result() === 'erro') {
                <div mxAlert variant="danger" announce>
                  <p mxAlertTitle>Não foi possível enviar</p>
                  <p>Verifica a ligação e tenta de novo.</p>
                </div>
              }
            </div>
          </doc-example>
          <doc-example title="Com acção">
            <div mxAlert class="w-full">
              <p mxAlertTitle>Activa a verificação em dois passos</p>
              <p>Protege a conta mesmo que a palavra-passe seja descoberta.</p>
              <div class="alert-actions"><button mxButton type="button" size="sm" variant="outline">Activar</button></div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Só os botões ou ligações lá dentro recebem foco.' }]"
          [aria]="[
            'Sem announce: é conteúdo normal, lido na ordem da página.',
            'Com announce: role=alert, lido assim que é inserido. Usa só para respostas a uma acção.',
            'Cada variante tem ícone próprio, para não depender da cor.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>[mxAlert]</code>, <code>[mxAlertTitle]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Toast' }, { name: 'Dialog' }, { name: 'Badge' }]" />
      </section>
    </article>
  `,
})
export class AlertPage {
  protected readonly result = signal<'erro' | null>(null);
  protected send(): void {
    this.result.set(null);
    setTimeout(() => this.result.set('erro'), 300);
  }

  protected readonly previewCode = `<div mxAlert variant="warning">
  <p mxAlertTitle>A sessão expira em 5 minutos</p>
  <p>Guarda o trabalho para não perderes alterações.</p>
</div>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: 'info' },
    { kind: 'Input', name: 'announce', type: 'boolean', default: 'false', description: 'role=alert: lido quando aparece.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', description: 'Cor da variante info.' },
    { kind: 'Token CSS', name: '--mx-success, --mx-warning, --mx-danger', type: 'color' },
  ];
}
