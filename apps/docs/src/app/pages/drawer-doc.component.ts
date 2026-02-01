import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent, DrawerService } from '@muxima-ui/drawer';

@Component({
  selector: 'muxima-drawer-doc',
  standalone: true,
  imports: [CommonModule, DrawerComponent],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>📱 Drawer / Side Panel</h1>
        <p class="doc-description">
          Painel lateral deslizante com múltiplas posições, backdrop customizável e controle programático via service.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Posições Diferentes</h3>
          <div class="example-preview">
            <div class="button-group">
              <button class="demo-btn" (click)="openDrawer('left')">
                ⬅️ Esquerda
              </button>
              <button class="demo-btn" (click)="openDrawer('right')">
                Direita ➡️
              </button>
              <button class="demo-btn" (click)="openDrawer('top')">
                ⬆️ Topo
              </button>
              <button class="demo-btn" (click)="openDrawer('bottom')">
                Baixo ⬇️
              </button>
            </div>
          </div>
        </div>

        <div class="example-card">
          <h3>Tamanhos Customizados</h3>
          <div class="example-preview">
            <div class="button-group">
              <button class="demo-btn" (click)="openDrawerWithSize('300px')">
                Pequeno (300px)
              </button>
              <button class="demo-btn" (click)="openDrawerWithSize('500px')">
                Médio (500px)
              </button>
              <button class="demo-btn" (click)="openDrawerWithSize('70%')">
                Grande (70%)
              </button>
            </div>
          </div>
        </div>

        <div class="example-card">
          <h3>Uso Declarativo</h3>
          <div class="example-preview">
            <button class="demo-btn" (click)="declarativeDrawerOpen = true">
              Abrir Drawer Declarativo
            </button>

            <muxima-drawer
              [isOpen]="declarativeDrawerOpen"
              (closed)="declarativeDrawerOpen = false"
              position="right"
              size="450px"
            >
              <div drawer-header>
                <h2 style="margin: 0; color: #667eea;">📋 Meu Drawer</h2>
              </div>

              <div style="padding: 20px 0;">
                <h3>Conteúdo do Drawer</h3>
                <p>Este é um drawer declarativo com conteúdo customizado.</p>
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                </ul>
              </div>

              <div drawer-footer>
                <button class="demo-btn" (click)="declarativeDrawerOpen = false">
                  Fechar
                </button>
              </div>
            </muxima-drawer>
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
                <td><code>position</code></td>
                <td><code>'left' | 'right' | 'top' | 'bottom'</code></td>
                <td><code>'right'</code></td>
                <td>Posição do drawer na tela</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>string</code></td>
                <td><code>'400px'</code></td>
                <td>Tamanho do drawer (px, %, vh, vw)</td>
              </tr>
              <tr>
                <td><code>hasBackdrop</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Exibe overlay escuro atrás do drawer</td>
              </tr>
              <tr>
                <td><code>closeOnBackdropClick</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Fecha ao clicar no backdrop</td>
              </tr>
              <tr>
                <td><code>closeOnEscape</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Fecha ao pressionar ESC</td>
              </tr>
              <tr>
                <td><code>isOpen</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Controla estado aberto/fechado</td>
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
                <td><code>opened</code></td>
                <td><code>EventEmitter&lt;void&gt;</code></td>
                <td>Emitido quando o drawer é aberto</td>
              </tr>
              <tr>
                <td><code>closed</code></td>
                <td><code>EventEmitter&lt;void&gt;</code></td>
                <td>Emitido quando o drawer é fechado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="doc-section">
        <h2>DrawerService</h2>
        <pre><code>{{serviceCode}}</code></pre>
      </section>

      <section class="doc-section">
        <h2>Slots de Conteúdo</h2>
        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th>Slot</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>[drawer-header]</code></td>
                <td>Conteúdo do cabeçalho do drawer</td>
              </tr>
              <tr>
                <td><code>(default)</code></td>
                <td>Conteúdo principal do drawer</td>
              </tr>
              <tr>
                <td><code>[drawer-footer]</code></td>
                <td>Conteúdo do rodapé do drawer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ 4 posições: left, right, top, bottom</li>
          <li>✅ Tamanhos customizáveis (px, %, vh, vw)</li>
          <li>✅ Backdrop com opacidade</li>
          <li>✅ Fechar com ESC ou clique no backdrop</li>
          <li>✅ Animações suaves de entrada/saída</li>
          <li>✅ Service para controle programático</li>
          <li>✅ Slots para header, content e footer</li>
          <li>✅ Responsivo para mobile</li>
          <li>✅ Previne scroll da página quando aberto</li>
        </ul>
      </section>

      <!-- Drawer usado nos exemplos -->
      <muxima-drawer></muxima-drawer>
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

    .demo-btn {
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
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

      code {
        color: #f3f4f6;
      }
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
export class DrawerDocComponent {
  declarativeDrawerOpen = false;

  serviceCode = `// Injetar o service
constructor(private drawerService: DrawerService) {}

// Abrir drawer
const drawerRef = this.drawerService.open({
  position: 'right',
  size: '500px',
  hasBackdrop: true,
  closeOnBackdropClick: true,
  closeOnEscape: true
});

// Fechar programaticamente
drawerRef.close();

// Observar quando fechar
drawerRef.afterClosed.subscribe(() => {
  console.log('Drawer fechado');
});`;

  constructor(private drawerService: DrawerService) {}

  openDrawer(position: 'left' | 'right' | 'top' | 'bottom'): void {
    this.drawerService.open({
      position,
      size: position === 'left' || position === 'right' ? '400px' : '300px'
    });
  }

  openDrawerWithSize(size: string): void {
    this.drawerService.open({
      position: 'right',
      size
    });
  }
}
