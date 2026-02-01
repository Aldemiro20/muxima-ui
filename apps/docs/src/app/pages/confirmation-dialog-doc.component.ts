import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent, ConfirmationDialogService } from '@muxima-ui/confirmation-dialog';

@Component({
  selector: 'muxima-confirmation-dialog-doc',
  standalone: true,
  imports: [CommonModule, ConfirmationDialogComponent],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>⚠️ Confirmation Dialog</h1>
        <p class="doc-description">
          Diálogo de confirmação com 4 variantes visuais, ícones customizáveis e API baseada em Promises para fácil integração.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Variantes</h3>
          <div class="example-preview">
            <div class="button-group">
              <button class="btn btn-info" (click)="showInfo()">
                ℹ️ Info
              </button>
              <button class="btn btn-success" (click)="showSuccess()">
                ✅ Success
              </button>
              <button class="btn btn-warning" (click)="showWarning()">
                ⚡ Warning
              </button>
              <button class="btn btn-danger" (click)="showDanger()">
                ⚠️ Danger
              </button>
            </div>
            <p *ngIf="lastResult !== null" class="result" [class.confirmed]="lastResult" [class.cancelled]="!lastResult">
              {{ lastResult ? '✓ Confirmado' : '✗ Cancelado' }}
            </p>
          </div>
        </div>

        <div class="example-card">
          <h3>Ação Destrutiva (Delete)</h3>
          <div class="example-preview">
            <button class="btn btn-danger" (click)="confirmDelete()">
              🗑️ Deletar Item
            </button>
            <p class="info-text">Exemplo de confirmação para ações irreversíveis</p>
          </div>
        </div>

        <div class="example-card">
          <h3>Textos Customizados</h3>
          <div class="example-preview">
            <button class="btn btn-info" (click)="showCustomText()">
              💾 Salvar Alterações
            </button>
          </div>
        </div>

        <div class="example-card">
          <h3>Ícone Customizado</h3>
          <div class="example-preview">
            <button class="btn btn-success" (click)="showCustomIcon()">
              🚀 Publicar
            </button>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2>Propriedades</h2>
        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th>Propriedade</th>
                <th>Tipo</th>
                <th>Padrão</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>title</code></td>
                <td><code>string</code></td>
                <td><code>'Confirmar Ação'</code></td>
                <td>Título do diálogo</td>
              </tr>
              <tr>
                <td><code>message</code></td>
                <td><code>string</code></td>
                <td><code>'Tem certeza...'</code></td>
                <td>Mensagem de confirmação</td>
              </tr>
              <tr>
                <td><code>variant</code></td>
                <td><code>'info' | 'success' | 'warning' | 'danger'</code></td>
                <td><code>'info'</code></td>
                <td>Variante visual do diálogo</td>
              </tr>
              <tr>
                <td><code>confirmText</code></td>
                <td><code>string</code></td>
                <td><code>'Confirmar'</code></td>
                <td>Texto do botão de confirmação</td>
              </tr>
              <tr>
                <td><code>cancelText</code></td>
                <td><code>string</code></td>
                <td><code>'Cancelar'</code></td>
                <td>Texto do botão de cancelamento</td>
              </tr>
              <tr>
                <td><code>icon</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>Ícone customizado (emoji ou texto)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="doc-section">
        <h2>Eventos</h2>
        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th>Evento</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>confirmed</code></td>
                <td><code>EventEmitter&lt;void&gt;</code></td>
                <td>Emitido quando usuário confirma</td>
              </tr>
              <tr>
                <td><code>cancelled</code></td>
                <td><code>EventEmitter&lt;void&gt;</code></td>
                <td>Emitido quando usuário cancela</td>
              </tr>
              <tr>
                <td><code>closed</code></td>
                <td><code>EventEmitter&lt;void&gt;</code></td>
                <td>Emitido quando diálogo fecha</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="doc-section">
        <h2>ConfirmationDialogService</h2>
        <pre><code>{{serviceCode}}</code></pre>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ 4 variantes com cores e estilos distintos</li>
          <li>✅ API baseada em Promise para async/await</li>
          <li>✅ Ícones automáticos por variante ou customizados</li>
          <li>✅ Animações suaves de entrada/saída</li>
          <li>✅ Fechar com tecla ESC</li>
          <li>✅ Backdrop com overlay escuro</li>
          <li>✅ Textos totalmente customizáveis</li>
          <li>✅ Responsivo para mobile</li>
          <li>✅ Ideal para ações destrutivas</li>
        </ul>
      </section>

      <!-- Componente de confirmação -->
      <muxima-confirmation-dialog></muxima-confirmation-dialog>
    </div>
  `,
  styles: [`
    .doc-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .doc-header {
      margin-bottom: 48px;

      h1 {
        font-size: 48px;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 16px;
      }

      .doc-description {
        font-size: 20px;
        color: #6b7280;
        line-height: 1.6;
      }
    }

    .doc-section {
      margin-bottom: 48px;

      h2 {
        font-size: 32px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 3px solid #667eea;
      }
    }

    .example-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

      h3 {
        font-size: 20px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 16px;
      }
    }

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;

      &:active {
        transform: scale(0.95);
      }
    }

    .btn-info {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
      }
    }

    .btn-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
      }
    }

    .btn-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
      }
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
      }
    }

    .result {
      margin-top: 16px;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      border-left: 4px solid;

      &.confirmed {
        background: rgba(16, 185, 129, 0.1);
        border-color: #10b981;
        color: #059669;
      }

      &.cancelled {
        background: rgba(239, 68, 68, 0.1);
        border-color: #ef4444;
        color: #dc2626;
      }
    }

    .info-text {
      margin-top: 12px;
      font-size: 14px;
      color: #6b7280;
      font-style: italic;
    }

    .props-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

        thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;

          th {
            padding: 16px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
        }

        tbody {
          tr {
            border-bottom: 1px solid #e5e7eb;

            &:last-child {
              border-bottom: none;
            }

            &:hover {
              background: #f9fafb;
            }
          }

          td {
            padding: 16px;
            color: #374151;
            font-size: 14px;

            code {
              background: #f3f4f6;
              padding: 4px 8px;
              border-radius: 6px;
              font-family: 'Monaco', 'Courier New', monospace;
              font-size: 13px;
              color: #667eea;
              font-weight: 600;
            }
          }
        }
      }
    }

    pre {
      background: #1f2937;
      color: #f3f4f6;
      padding: 24px;
      border-radius: 12px;
      overflow-x: auto;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
    }

    .features-list {
      list-style: none;
      padding: 0;

      li {
        padding: 12px 0;
        color: #374151;
        font-size: 16px;
        line-height: 1.6;
      }
    }
  `]
})
export class ConfirmationDialogDocComponent {
  lastResult: boolean | null = null;

  serviceCode = `// Injetar o service
constructor(private confirmationService: ConfirmationDialogService) {}

// Uso básico com async/await
async deleteItem() {
  const confirmed = await this.confirmationService.confirm({
    title: 'Deletar Item',
    message: 'Esta ação não pode ser desfeita!',
    variant: 'danger',
    confirmText: 'Sim, deletar',
    cancelText: 'Cancelar'
  });

  if (confirmed) {
    // Executar ação
  }
}

// Uso com .then()
this.confirmationService.confirm({
  title: 'Confirmar',
  message: 'Deseja continuar?',
  variant: 'info'
}).then(confirmed => {
  console.log('Resultado:', confirmed);
});`;

  constructor(private confirmationService: ConfirmationDialogService) {}

  async showInfo(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Informação',
      message: 'Este é um diálogo informativo. Deseja prosseguir?',
      variant: 'info'
    });
    this.lastResult = result;
  }

  async showSuccess(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Sucesso',
      message: 'Operação realizada com sucesso! Deseja visualizar?',
      variant: 'success',
      confirmText: 'Visualizar',
      cancelText: 'Fechar'
    });
    this.lastResult = result;
  }

  async showWarning(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Atenção',
      message: 'Esta ação pode ter consequências. Tem certeza?',
      variant: 'warning'
    });
    this.lastResult = result;
  }

  async showDanger(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Perigo',
      message: 'Esta é uma ação perigosa e irreversível!',
      variant: 'danger',
      confirmText: 'Sim, tenho certeza'
    });
    this.lastResult = result;
  }

  async confirmDelete(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Deletar Item',
      message: 'Esta ação não pode ser desfeita. O item será permanentemente removido.',
      variant: 'danger',
      confirmText: 'Sim, deletar',
      cancelText: 'Não, manter'
    });
    
    if (result) {
      console.log('Item deletado!');
    }
    this.lastResult = result;
  }

  async showCustomText(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Salvar Alterações',
      message: 'Você tem alterações não salvas. Deseja salvá-las antes de sair?',
      variant: 'info',
      confirmText: 'Salvar',
      cancelText: 'Descartar'
    });
    this.lastResult = result;
  }

  async showCustomIcon(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Publicar Conteúdo',
      message: 'Seu conteúdo será publicado e ficará visível para todos. Continuar?',
      variant: 'success',
      confirmText: 'Publicar Agora',
      cancelText: 'Revisar',
      icon: '🚀'
    });
    this.lastResult = result;
  }
}
