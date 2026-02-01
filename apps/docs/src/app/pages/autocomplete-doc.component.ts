import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent, AutocompleteOption } from '@muxima-ui/autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'muxima-autocomplete-doc',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent, FormsModule],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>🔍 Autocomplete</h1>
        <p class="doc-description">
          Componente de busca com sugestões em tempo real, navegação por teclado e scroll virtual para grandes conjuntos de dados.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Básico</h3>
          <div class="example-preview">
            <muxima-autocomplete
              [options]="fruits"
              placeholder="Buscar frutas..."
              [(ngModel)]="selectedFruit"
              (selected)="onFruitSelected($event)">
            </muxima-autocomplete>
            <p *ngIf="selectedFruit" class="result">Selecionado: {{ selectedFruit }}</p>
          </div>
        </div>

        <div class="example-card">
          <h3>Com Objetos Customizados</h3>
          <div class="example-preview">
            <muxima-autocomplete
              [options]="countries"
              placeholder="Buscar país..."
              [(ngModel)]="selectedCountry"
              (selected)="onCountrySelected($event)">
            </muxima-autocomplete>
            <p *ngIf="selectedCountry" class="result">País: {{ getCountryName(selectedCountry) }}</p>
          </div>
        </div>

        <div class="example-card">
          <h3>Com Loading e Busca Assíncrona</h3>
          <div class="example-preview">
            <muxima-autocomplete
              [options]="searchResults"
              [loading]="isSearching"
              placeholder="Buscar usuários..."
              [(ngModel)]="selectedUser"
              (search)="onSearch($event)"
              emptyMessage="Digite para buscar...">
            </muxima-autocomplete>
          </div>
        </div>

        <div class="example-card">
          <h3>Desabilitado</h3>
          <div class="example-preview">
            <muxima-autocomplete
              [options]="fruits"
              [disabled]="true"
              placeholder="Campo desabilitado">
            </muxima-autocomplete>
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
                <td><code>string[] | AutocompleteOption[]</code></td>
                <td><code>[]</code></td>
                <td>Lista de opções para autocomplete</td>
              </tr>
              <tr>
                <td><code>placeholder</code></td>
                <td><code>string</code></td>
                <td><code>'Search...'</code></td>
                <td>Texto do placeholder</td>
              </tr>
              <tr>
                <td><code>debounceTime</code></td>
                <td><code>number</code></td>
                <td><code>300</code></td>
                <td>Tempo de debounce em ms</td>
              </tr>
              <tr>
                <td><code>minChars</code></td>
                <td><code>number</code></td>
                <td><code>1</code></td>
                <td>Mínimo de caracteres para buscar</td>
              </tr>
              <tr>
                <td><code>maxResults</code></td>
                <td><code>number</code></td>
                <td><code>10</code></td>
                <td>Máximo de resultados exibidos</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Desabilita o componente</td>
              </tr>
              <tr>
                <td><code>loading</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Mostra indicador de carregamento</td>
              </tr>
              <tr>
                <td><code>emptyMessage</code></td>
                <td><code>string</code></td>
                <td><code>'No results found'</code></td>
                <td>Mensagem quando não há resultados</td>
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
                <td><code>search</code></td>
                <td><code>EventEmitter&lt;string&gt;</code></td>
                <td>Emitido quando o usuário digita (com debounce)</td>
              </tr>
              <tr>
                <td><code>selected</code></td>
                <td><code>EventEmitter&lt;any&gt;</code></td>
                <td>Emitido quando uma opção é selecionada</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="doc-section">
        <h2>Interface AutocompleteOption</h2>
        <pre><code>{{interfaceCode}}</code></pre>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ Busca em tempo real com debounce configurável</li>
          <li>✅ Navegação por teclado (setas, Enter, Escape)</li>
          <li>✅ Highlight automático do termo buscado</li>
          <li>✅ Suporta strings simples ou objetos customizados</li>
          <li>✅ Loading state para buscas assíncronas</li>
          <li>✅ Scroll virtual para grandes listas</li>
          <li>✅ Acessibilidade (ARIA attributes)</li>
          <li>✅ ControlValueAccessor (suporta ngModel e FormControl)</li>
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
      max-width: 500px;
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
export class AutocompleteDocComponent {
  fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Papaya', 'Raspberry', 'Strawberry'];
  
  countries: AutocompleteOption[] = [
    { value: 'br', label: 'Brasil 🇧🇷' },
    { value: 'us', label: 'Estados Unidos 🇺🇸' },
    { value: 'pt', label: 'Portugal 🇵🇹' },
    { value: 'es', label: 'Espanha 🇪🇸' },
    { value: 'fr', label: 'França 🇫🇷' },
    { value: 'de', label: 'Alemanha 🇩🇪' },
    { value: 'it', label: 'Itália 🇮🇹' },
    { value: 'jp', label: 'Japão 🇯🇵' }
  ];
  
  searchResults: AutocompleteOption[] = [];
  isSearching = false;
  
  selectedFruit = '';
  selectedCountry = '';
  selectedUser = '';

  interfaceCode = `interface AutocompleteOption {
  value: any;
  label: string;
  disabled?: boolean;
}`;

  onFruitSelected(fruit: string): void {
    console.log('Fruta selecionada:', fruit);
  }

  onCountrySelected(country: string): void {
    console.log('País selecionado:', country);
  }

  getCountryName(code: string): string {
    const country = this.countries.find(c => c.value === code);
    return country ? country.label : code;
  }

  onSearch(term: string): void {
    this.isSearching = true;
    
    // Simula busca assíncrona
    setTimeout(() => {
      this.searchResults = [
        { value: 1, label: `${term} - User 1` },
        { value: 2, label: `${term} - User 2` },
        { value: 3, label: `${term} - User 3` }
      ];
      this.isSearching = false;
    }, 500);
  }
}
