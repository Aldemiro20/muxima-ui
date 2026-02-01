import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderRangeComponent, SliderRangeValue } from '@muxima-ui/slider-range';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'muxima-slider-range-doc',
  standalone: true,
  imports: [CommonModule, SliderRangeComponent, FormsModule],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>🎚️ Slider Range</h1>
        <p class="doc-description">
          Controle deslizante de intervalo com dual handles, tooltips dinâmicos, ticks visuais e step configurável.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Básico (0-100)</h3>
          <div class="example-preview">
            <muxima-slider-range
              [(ngModel)]="basicValue"
              (rangeChange)="onBasicChange($event)">
            </muxima-slider-range>
            <p class="result">
              Intervalo: {{ basicValue.min }} - {{ basicValue.max }}
            </p>
          </div>
        </div>

        <div class="example-card">
          <h3>Faixa de Preço (R$ 0 - R$ 10.000)</h3>
          <div class="example-preview">
            <muxima-slider-range
              [min]="0"
              [max]="10000"
              [step]="100"
              [(ngModel)]="priceValue">
            </muxima-slider-range>
            <p class="result">
              💰 Preço: {{ formatCurrency(priceValue.min) }} - {{ formatCurrency(priceValue.max) }}
            </p>
          </div>
        </div>

        <div class="example-card">
          <h3>Com Ticks Visuais</h3>
          <div class="example-preview">
            <muxima-slider-range
              [showTicks]="true"
              [ticksCount]="11"
              [(ngModel)]="ticksValue">
            </muxima-slider-range>
            <p class="info-text">Ticks visuais para facilitar a visualização</p>
          </div>
        </div>

        <div class="example-card">
          <h3>Sem Tooltip</h3>
          <div class="example-preview">
            <muxima-slider-range
              [showTooltip]="false"
              [(ngModel)]="noTooltipValue">
            </muxima-slider-range>
            <p class="result">
              Valor: {{ noTooltipValue.min }} - {{ noTooltipValue.max }}
            </p>
          </div>
        </div>

        <div class="example-card">
          <h3>Idade (18-80 anos)</h3>
          <div class="example-preview">
            <muxima-slider-range
              [min]="18"
              [max]="80"
              [step]="1"
              [(ngModel)]="ageValue">
            </muxima-slider-range>
            <p class="result">
              👤 Idade: {{ ageValue.min }} - {{ ageValue.max }} anos
            </p>
          </div>
        </div>

        <div class="example-card">
          <h3>Desabilitado</h3>
          <div class="example-preview">
            <muxima-slider-range
              [disabled]="true"
              [(ngModel)]="disabledValue">
            </muxima-slider-range>
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
                <td><code>min</code></td>
                <td><code>number</code></td>
                <td><code>0</code></td>
                <td>Valor mínimo do slider</td>
              </tr>
              <tr>
                <td><code>max</code></td>
                <td><code>number</code></td>
                <td><code>100</code></td>
                <td>Valor máximo do slider</td>
              </tr>
              <tr>
                <td><code>step</code></td>
                <td><code>number</code></td>
                <td><code>1</code></td>
                <td>Incremento entre valores</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Desabilita o componente</td>
              </tr>
              <tr>
                <td><code>showTooltip</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Exibe tooltips com valores</td>
              </tr>
              <tr>
                <td><code>showTicks</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Exibe marcações visuais</td>
              </tr>
              <tr>
                <td><code>ticksCount</code></td>
                <td><code>number</code></td>
                <td><code>10</code></td>
                <td>Número de ticks a exibir</td>
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
                <td><code>rangeChange</code></td>
                <td><code>EventEmitter&lt;SliderRangeValue&gt;</code></td>
                <td>Emitido quando o intervalo muda</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="doc-section">
        <h2>Interface SliderRangeValue</h2>
        <pre><code>{{interfaceCode}}</code></pre>
      </section>

      <section class="doc-section">
        <h2>Casos de Uso</h2>
        <ul class="features-list">
          <li>💰 <strong>Filtros de Preço</strong> - E-commerce e marketplaces</li>
          <li>👤 <strong>Faixa Etária</strong> - Filtros demográficos</li>
          <li>📏 <strong>Dimensões</strong> - Tamanho, peso, altura</li>
          <li>📊 <strong>Dados Numéricos</strong> - Estatísticas e métricas</li>
          <li>⏱️ <strong>Intervalos de Tempo</strong> - Duração, períodos</li>
          <li>🎵 <strong>Volume/Intensidade</strong> - Controles de áudio</li>
        </ul>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ Dual handles independentes</li>
          <li>✅ Tooltips dinâmicos ao arrastar</li>
          <li>✅ Ticks visuais configuráveis</li>
          <li>✅ Step customizável</li>
          <li>✅ Animações suaves</li>
          <li>✅ Drag & drop intuitivo</li>
          <li>✅ Gradient visual no intervalo selecionado</li>
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
      margin-top: 20px;
      padding: 12px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-left: 4px solid #667eea;
      border-radius: 8px;
      color: #667eea;
      font-weight: 600;
      font-size: 16px;
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

        strong {
          color: #667eea;
        }
      }
    }
  `]
})
export class SliderRangeDocComponent {
  basicValue: SliderRangeValue = { min: 20, max: 80 };
  priceValue: SliderRangeValue = { min: 1000, max: 8000 };
  ticksValue: SliderRangeValue = { min: 30, max: 70 };
  noTooltipValue: SliderRangeValue = { min: 25, max: 75 };
  ageValue: SliderRangeValue = { min: 25, max: 65 };
  disabledValue: SliderRangeValue = { min: 40, max: 60 };

  interfaceCode = `interface SliderRangeValue {
  min: number;
  max: number;
}`;

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  onBasicChange(value: SliderRangeValue): void {
    console.log('Intervalo alterado:', value);
  }
}
