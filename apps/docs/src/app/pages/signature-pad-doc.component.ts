import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignaturePadComponent } from '@muxima-ui/signature-pad';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'muxima-signature-pad-doc',
  standalone: true,
  imports: [CommonModule, SignaturePadComponent, FormsModule],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>✍️ Signature Pad</h1>
        <p class="doc-description">
          Componente de assinatura digital com canvas HTML5, suporte a mouse e touch.
          Desenvolvido por <strong>Aldemiro Valentim</strong>.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Contrato Digital - Aldemiro Valentim</h3>
          <div class="contract">
            <p><strong>CONTRATO DE DESENVOLVIMENTO DE SOFTWARE</strong></p>
            <p>Eu, Aldemiro Valentim, concordo com os termos e condições deste contrato.</p>
            <p>Ao assinar digitalmente, confirmo minha concordância com todas as cláusulas.</p>
          </div>
          <muxima-signature-pad
            [signerName]="'Aldemiro Valentim'"
            [(ngModel)]="contractSignature"
            (signatureSaved)="onContractSigned($event)">
          </muxima-signature-pad>
        </div>

        <div class="example-card">
          <h3>Assinatura Customizada</h3>
          <muxima-signature-pad
            [title]="'Assine Aqui'"
            [subtitle]="'Validação de Identidade'"
            [penColor]="'#667eea'"
            [lineWidth]="3"
            [signerName]="'Aldemiro Valentim'"
            [(ngModel)]="customSignature">
          </muxima-signature-pad>
        </div>

        <div class="example-card">
          <h3>Visualização Apenas (Disabled)</h3>
          <muxima-signature-pad
            [disabled]="true"
            [signerName]="'Aldemiro Valentim'"
            [(ngModel)]="preloadedSignature">
          </muxima-signature-pad>
        </div>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ Desenho com mouse e touch</li>
          <li>✅ Desfazer (Undo) múltiplos strokes</li>
          <li>✅ Exportar como PNG/JPEG</li>
          <li>✅ Carregar assinatura existente</li>
          <li>✅ ControlValueAccessor (ngModel/FormControl)</li>
          <li>✅ Timestamp automático</li>
          <li>✅ Nome do assinante</li>
          <li>✅ Responsivo e touch-friendly</li>
        </ul>
      </section>

      <div class="signature-preview" *ngIf="contractSignature">
        <h3>✅ Assinatura Capturada de Aldemiro Valentim</h3>
        <img [src]="contractSignature" alt="Assinatura">
      </div>
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

        strong {
          color: #667eea;
        }
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

    .contract {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;

      p {
        margin: 12px 0;
        color: #374151;
        line-height: 1.6;

        strong {
          color: #667eea;
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
        line-height: 1.6;
      }
    }

    .signature-preview {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
      border-left: 4px solid #10b981;
      border-radius: 12px;
      padding: 24px;
      margin-top: 32px;

      h3 {
        color: #065f46;
        margin-bottom: 16px;
      }

      img {
        max-width: 100%;
        border: 2px solid #10b981;
        border-radius: 8px;
        background: white;
      }
    }
  `]
})
export class SignaturePadDocComponent {
  contractSignature = '';
  customSignature = '';
  preloadedSignature = '';

  onContractSigned(signature: string) {
    console.log('Contract signed by Aldemiro Valentim');
    alert('Contrato assinado digitalmente por Aldemiro Valentim!');
  }
}
