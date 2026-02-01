import { Component, Input, ErrorHandler, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: Date;
  recovered: boolean;
}

@Injectable()
export class ErrorBoundaryService extends ErrorHandler {
  errors: ErrorLog[] = [];

  override handleError(error: any): void {
    console.error('Error caught by Aldemiro Valentim Error Boundary:', error);
    
    this.errors.push({
      message: error.message || 'Unknown error',
      stack: error.stack,
      timestamp: new Date(),
      recovered: false
    });

    // Attempt recovery
    setTimeout(() => {
      const lastError = this.errors[this.errors.length - 1];
      lastError.recovered = true;
    }, 1000);
  }
}

@Component({
  selector: 'muxima-error-boundary',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: ErrorHandler, useClass: ErrorBoundaryService }],
  template: `
    <div class="error-boundary">
      <div class="error-alert" *ngIf="hasErrors">
        <h3>⚠️ Erro Capturado - Sistema Aldemiro Valentim</h3>
        <p>{{ lastError?.message }}</p>
        <button (click)="recover()">🔄 Recuperar</button>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .error-alert {
      background: #fee2e2;
      border: 2px solid #ef4444;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      
      h3 { color: #991b1b; margin-bottom: 8px; }
      p { color: #7f1d1d; }
      button {
        background: #ef4444;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 12px;
      }
    }
  `]
})
export class ErrorBoundaryComponent {
  @Input() fallbackMessage = 'Erro detectado. Tentando recuperar...';
  
  get hasErrors(): boolean {
    return this.errorService.errors.length > 0;
  }

  get lastError(): ErrorLog | undefined {
    return this.errorService.errors[this.errorService.errors.length - 1];
  }

  constructor(private errorService: ErrorBoundaryService) {}

  recover() {
    this.errorService.errors = [];
    window.location.reload();
  }
}
