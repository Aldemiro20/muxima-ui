import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardComponent } from '@muxima-ui/virtual-keyboard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'muxima-virtual-keyboard-doc',
  standalone: true,
  imports: [CommonModule, VirtualKeyboardComponent, FormsModule],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>⌨️ Virtual Keyboard</h1>
        <p class="doc-description">
          Teclado virtual on-screen com 3 layouts: QWERTY, Numérico e Símbolos.
          Desenvolvido por <strong>Aldemiro Valentim</strong>.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Login Form - Aldemiro Valentim</h3>
          <div class="form-demo">
            <div class="form-group">
              <label>Email:</label>
              <input type="text" [(ngModel)]="email" placeholder="aldemiro.valentim@exemplo.com" readonly>
            </div>
            <muxima-virtual-keyboard
              [(ngModel)]="email"
              [placeholder]="'Digite seu email...'"
              (valueChange)="onEmailChange($event)">
            </muxima-virtual-keyboard>
          </div>
        </div>

        <div class="example-card">
          <h3>PIN Code - Modo Numérico</h3>
          <div class="form-demo">
            <div class="pin-display">
              <span *ngFor="let digit of pinDigits">{{ digit || '•' }}</span>
            </div>
            <muxima-virtual-keyboard
              [compact]="true"
              [initialLayout]="'numeric'"
              [showDisplay]="false"
              [(ngModel)]="pin"
              (valueChange)="onPinChange($event)">
            </muxima-virtual-keyboard>
          </div>
        </div>

        <div class="example-card">
          <h3>Comentários</h3>
          <muxima-virtual-keyboard
            [(ngModel)]="comment"
            [placeholder]="'Escreva seu comentário...'">
          </muxima-virtual-keyboard>
          <div class="output-preview" *ngIf="comment">
            <h4>Preview:</h4>
            <p>{{ comment }}</p>
            <small>Digitado por Aldemiro Valentim</small>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2>Layouts Disponíveis</h2>
        <div class="layouts-grid">
          <div class="layout-card">
            <h4>🔤 QWERTY</h4>
            <p>Layout completo com letras, números e símbolos básicos</p>
            <ul>
              <li>Shift e CapsLock</li>
              <li>Caracteres especiais</li>
              <li>Espaço e Enter</li>
            </ul>
          </div>
          <div class="layout-card">
            <h4>🔢 Numérico</h4>
            <p>Teclado numérico 3x4 ideal para PIN e telefones</p>
            <ul>
              <li>Dígitos 0-9</li>
              <li>Símbolos #+=</li>
              <li>Layout compacto</li>
            </ul>
          </div>
          <div class="layout-card">
            <h4>🔣 Símbolos</h4>
            <p>Caracteres especiais e pontuação</p>
            <ul>
              <li>!, @, #, $, %, etc</li>
              <li>Parênteses e colchetes</li>
              <li>Operadores matemáticos</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ 3 layouts (QWERTY, Numérico, Símbolos)</li>
          <li>✅ Shift e CapsLock</li>
          <li>✅ Backspace com feedback</li>
          <li>✅ Teclas de ação (Enter, Space)</li>
          <li>✅ Modo compacto</li>
          <li>✅ ControlValueAccessor (ngModel)</li>
          <li>✅ Touch-friendly</li>
          <li>✅ Animações suaves</li>
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
        strong { color: #667eea; }
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
      padding: 32px;
      margin-bottom: 32px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

      h3 {
        font-size: 20px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 24px;
      }
    }

    .form-demo {
      max-width: 600px;
      margin: 0 auto;
    }

    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        font-weight: 600;
        color: #374151;
        margin-bottom: 8px;
      }

      input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        font-family: monospace;
        background: #f9fafb;
      }
    }

    .pin-display {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;

      span {
        width: 50px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: 700;
        color: #667eea;
        background: white;
        border: 3px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }

    .output-preview {
      margin-top: 24px;
      padding: 20px;
      background: #f9fafb;
      border-left: 4px solid #667eea;
      border-radius: 8px;

      h4 {
        color: #667eea;
        margin-bottom: 12px;
      }

      p {
        color: #374151;
        line-height: 1.6;
        white-space: pre-wrap;
      }

      small {
        color: #6b7280;
        font-style: italic;
      }
    }

    .layouts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .layout-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      h4 {
        color: #667eea;
        margin-bottom: 12px;
        font-size: 20px;
      }

      p {
        color: #6b7280;
        font-size: 14px;
        margin-bottom: 12px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 6px 0;
          color: #374151;
          font-size: 14px;

          &:before {
            content: '✓ ';
            color: #10b981;
            font-weight: 700;
          }
        }
      }
    }

    .features-list {
      list-style: none;
      padding: 0;

      li {
        padding: 12px 0;
        color: #374151;
        font-size: 16px;
      }
    }
  `]
})
export class VirtualKeyboardDocComponent {
  email = '';
  pin = '';
  comment = '';

  get pinDigits(): string[] {
    const digits = this.pin.split('').slice(0, 4);
    while (digits.length < 4) {
      digits.push('');
    }
    return digits;
  }

  onEmailChange(value: string) {
    console.log('Email typed by Aldemiro Valentim:', value);
  }

  onPinChange(value: string) {
    console.log('PIN entered:', value.length, 'digits');
    if (value.length === 4) {
      alert(`PIN completo: ${value}\nSistema seguro por Aldemiro Valentim`);
    }
  }
}
