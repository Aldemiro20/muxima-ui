import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePickerComponent, DateRange } from '@muxima-ui/date-range-picker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'muxima-date-range-picker-doc',
  standalone: true,
  imports: [CommonModule, DateRangePickerComponent, FormsModule],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>📅 Date Range Picker</h1>
        <p class="doc-description">
          Seletor de intervalo de datas com presets rápidos, calendário intuitivo e validação de limites min/max.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Básico com Presets</h3>
          <div class="example-preview">
            <muxima-date-range-picker
              [(ngModel)]="basicRange"
              (rangeSelected)="onRangeSelected($event)">
            </muxima-date-range-picker>
            <p *ngIf="basicRange.start && basicRange.end" class="result">
              📅 Período: {{ formatDate(basicRange.start) }} até {{ formatDate(basicRange.end) }}
              <br>
              <small>{{ getDaysDifference(basicRange) }} dia(s)</small>
            </p>
          </div>
        </div>

        <div class="example-card">
          <h3>Sem Presets</h3>
          <div class="example-preview">
            <muxima-date-range-picker
              [showPresets]="false"
              [(ngModel)]="noPresetsRange">
            </muxima-date-range-picker>
          </div>
        </div>

        <div class="example-card">
          <h3>Com Limites Min/Max</h3>
          <div class="example-preview">
            <muxima-date-range-picker
              [minDate]="minDate"
              [maxDate]="maxDate"
              [(ngModel)]="limitedRange">
            </muxima-date-range-picker>
            <p class="info-text">
              Permitido apenas entre {{ formatDate(minDate) }} e {{ formatDate(maxDate) }}
            </p>
          </div>
        </div>

        <div class="example-card">
          <h3>Desabilitado</h3>
          <div class="example-preview">
            <muxima-date-range-picker
              [disabled]="true">
            </muxima-date-range-picker>
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
                <td><code>minDate</code></td>
                <td><code>Date</code></td>
                <td><code>undefined</code></td>
                <td>Data mínima selecionável</td>
              </tr>
              <tr>
                <td><code>maxDate</code></td>
                <td><code>Date</code></td>
                <td><code>undefined</code></td>
                <td>Data máxima selecionável</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Desabilita o componente</td>
              </tr>
              <tr>
                <td><code>showPresets</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Exibe painel de presets</td>
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
                <td><code>rangeSelected</code></td>
                <td><code>EventEmitter&lt;DateRange&gt;</code></td>
                <td>Emitido quando intervalo é selecionado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="doc-section">
        <h2>Interface DateRange</h2>
        <pre><code>{{interfaceCode}}</code></pre>
      </section>

      <section class="doc-section">
        <h2>Presets Disponíveis</h2>
        <ul class="features-list">
          <li>📆 <strong>Hoje</strong> - Data atual</li>
          <li>📆 <strong>Ontem</strong> - Dia anterior</li>
          <li>📆 <strong>Últimos 7 dias</strong> - Semana atual</li>
          <li>📆 <strong>Últimos 30 dias</strong> - Mês atual</li>
          <li>📆 <strong>Este mês</strong> - Do dia 1 até hoje</li>
          <li>📆 <strong>Mês passado</strong> - Mês anterior completo</li>
        </ul>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ Seleção intuitiva de intervalos de datas</li>
          <li>✅ 6 presets rápidos pré-configurados</li>
          <li>✅ Navegação entre meses</li>
          <li>✅ Validação de min/max dates</li>
          <li>✅ Highlight visual do período selecionado</li>
          <li>✅ Formatação pt-BR automática</li>
          <li>✅ ControlValueAccessor (ngModel/FormControl)</li>
          <li>✅ Responsivo e mobile-friendly</li>
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
      max-width: 700px;
    }

    .result {
      margin-top: 16px;
      padding: 16px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-left: 4px solid #667eea;
      border-radius: 8px;
      color: #667eea;
      font-weight: 600;

      small {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.8;
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

        strong {
          color: #667eea;
        }
      }
    }
  `]
})
export class DateRangePickerDocComponent {
  basicRange: DateRange = { start: null, end: null };
  noPresetsRange: DateRange = { start: null, end: null };
  limitedRange: DateRange = { start: null, end: null };

  minDate = new Date(2024, 0, 1); // 01/01/2024
  maxDate = new Date(2026, 11, 31); // 31/12/2026

  interfaceCode = `interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DateRangePreset {
  label: string;
  range: DateRange;
}`;

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  getDaysDifference(range: DateRange): number {
    if (!range.start || !range.end) return 0;
    const diff = range.end.getTime() - range.start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  }

  onRangeSelected(range: DateRange): void {
    console.log('Período selecionado:', range);
  }
}
