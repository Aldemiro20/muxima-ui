import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent, MultiSelectOption } from '@muxima-ui/multi-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'muxima-multi-select-doc',
  standalone: true,
  imports: [CommonModule, MultiSelectComponent, FormsModule],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>🏷️ Multi-Select / Tag Input</h1>
        <p class="doc-description">
          Componente de seleção múltipla com tags removíveis, busca integrada e limite de seleções configurável.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Básico - Strings Simples</h3>
          <div class="example-preview">
            <muxima-multi-select
              [options]="fruits"
              placeholder="Selecione frutas..."
              [(ngModel)]="selectedFruits">
            </muxima-multi-select>
            <p *ngIf="selectedFruits.length > 0" class="result">
              Selecionados ({{ selectedFruits.length }}): {{ selectedFruits.join(', ') }}
            </p>
          </div>
        </div>

        <div class="example-card">
          <h3>Com Objetos Customizados</h3>
          <div class="example-preview">
            <muxima-multi-select
              [options]="technologies"
              placeholder="Selecione tecnologias..."
              [(ngModel)]="selectedTech"
              (selectionChange)="onTechChange($event)">
            </muxima-multi-select>
          </div>
        </div>

        <div class="example-card">
          <h3>Com Limite de Seleções</h3>
          <div class="example-preview">
            <muxima-multi-select
              [options]="colors"
              [maxSelections]="3"
              placeholder="Selecione até 3 cores..."
              [(ngModel)]="selectedColors">
            </muxima-multi-select>
            <p class="info-text">Máximo: 3 seleções</p>
          </div>
        </div>

        <div class="example-card">
          <h3>Sem Busca e Sem Limpar</h3>
          <div class="example-preview">
            <muxima-multi-select
              [options]="categories"
              [searchable]="false"
              [clearable]="false"
              placeholder="Selecione categorias..."
              [(ngModel)]="selectedCategories">
            </muxima-multi-select>
          </div>
        </div>

        <div class="example-card">
          <h3>Desabilitado</h3>
          <div class="example-preview">
            <muxima-multi-select
              [options]="fruits"
              [disabled]="true"
              placeholder="Campo desabilitado">
            </muxima-multi-select>
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
                <td><code>options</code></td>
                <td><code>string[] | MultiSelectOption[]</code></td>
                <td><code>[]</code></td>
                <td>Lista de opções disponíveis</td>
              </tr>
              <tr>
                <td><code>placeholder</code></td>
                <td><code>string</code></td>
                <td><code>'Select items...'</code></td>
                <td>Texto do placeholder</td>
              </tr>
              <tr>
                <td><code>maxSelections</code></td>
                <td><code>number</code></td>
                <td><code>undefined</code></td>
                <td>Número máximo de seleções permitidas</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Desabilita o componente</td>
              </tr>
              <tr>
                <td><code>searchable</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Habilita campo de busca</td>
              </tr>
              <tr>
                <td><code>clearable</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Mostra botão para limpar seleções</td>
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
                <td><code>selectionChange</code></td>
                <td><code>EventEmitter&lt;any[]&gt;</code></td>
                <td>Emitido quando as seleções mudam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="doc-section">
        <h2>Interface MultiSelectOption</h2>
        <pre><code>{{interfaceCode}}</code></pre>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ Tags removíveis com animação</li>
          <li>✅ Busca integrada em tempo real</li>
          <li>✅ Limite de seleções configurável</li>
          <li>✅ Checkboxes para seleção visual</li>
          <li>✅ Opções desabilitáveis individualmente</li>
          <li>✅ Botão para limpar todas as seleções</li>
          <li>✅ ControlValueAccessor (ngModel/FormControl)</li>
          <li>✅ Responsivo e acessível</li>
        </ul>
      </section>
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

    .example-preview {
      max-width: 600px;
    }

    .result {
      margin-top: 16px;
      padding: 12px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-left: 4px solid #667eea;
      border-radius: 8px;
      color: #667eea;
      font-weight: 600;
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
export class MultiSelectDocComponent {
  fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];
  
  technologies: MultiSelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' }
  ];

  colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown'];
  categories = ['Technology', 'Sports', 'Music', 'Movies', 'Books', 'Travel'];
  
  selectedFruits: any[] = [];
  selectedTech: any[] = [];
  selectedColors: any[] = [];
  selectedCategories: any[] = [];

  interfaceCode = `interface MultiSelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}`;

  onTechChange(values: any[]): void {
    console.log('Tecnologias selecionadas:', values);
  }
}
