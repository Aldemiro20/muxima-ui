import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuximaAlertComponent } from '@muxima-ui/alert';

interface Alert {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible: boolean;
}

@Component({
  selector: 'muxima-alert-doc',
  standalone: true,
  imports: [CommonModule, MuximaAlertComponent],
  templateUrl: './alert-doc.component.html',
  styleUrls: ['./alert-doc.component.scss']
})
export class AlertDocComponent {
  showDismissibleAlert = true;
  showDynamicAlert = false;
  dynamicAlertType: 'info' | 'success' | 'warning' | 'error' = 'success';
  
  // Multiple alerts example
  alerts: Alert[] = [
    { id: 1, type: 'info', title: 'Nova Versão', message: 'Uma nova versão está disponível para download.', dismissible: true },
    { id: 2, type: 'warning', title: 'Sessão Expirando', message: 'Sua sessão expira em 5 minutos.', dismissible: true },
    { id: 3, type: 'success', title: 'Backup Completo', message: 'Backup realizado com sucesso às 14:30.', dismissible: true }
  ];

  // Code examples with copy states
  codeExamples = {
    basic: { code: '', copied: false },
    types: { code: '', copied: false },
    appearances: { code: '', copied: false },
    dismissible: { code: '', copied: false },
    withTitle: { code: '', copied: false },
    customIcon: { code: '', copied: false },
    multiple: { code: '', copied: false },
    spinner: { code: '', copied: false }
  };

  constructor() {
    this.initializeCodeExamples();
  }

  initializeCodeExamples() {
    this.codeExamples.basic.code = `<muxima-alert type="info" appearance="fill">
  Esta é uma mensagem informativa
</muxima-alert>`;

    this.codeExamples.types.code = `<!-- Info -->
<muxima-alert type="info">Informação importante</muxima-alert>

<!-- Success -->
<muxima-alert type="success">Operação realizada!</muxima-alert>

<!-- Warning -->
<muxima-alert type="warning">Atenção: revise os dados</muxima-alert>

<!-- Error -->
<muxima-alert type="error">Erro ao processar</muxima-alert>`;

    this.codeExamples.appearances.code = `<!-- Fill: Fundo sólido -->
<muxima-alert type="success" appearance="fill">
  Salvo com sucesso
</muxima-alert>

<!-- Border: Apenas borda colorida -->
<muxima-alert type="info" appearance="border">
  Novidade disponível
</muxima-alert>

<!-- Outline: Borda grossa -->
<muxima-alert type="warning" appearance="outline">
  Cuidado com esta ação
</muxima-alert>

<!-- Soft: Fundo suave -->
<muxima-alert type="error" appearance="soft">
  Falha na validação
</muxima-alert>`;

    this.codeExamples.dismissible.code = `<muxima-alert 
  type="success" 
  [dismissible]="true"
  (dismissedChanged)="onAlertDismiss()">
  Perfil atualizado com sucesso!
</muxima-alert>`;

    this.codeExamples.withTitle.code = `<muxima-alert 
  type="warning" 
  appearance="fill">
  <span muximaAlertTitle>Atenção Importante</span>
  Por favor, revise os campos obrigatórios antes de continuar.
</muxima-alert>`;

    this.codeExamples.customIcon.code = `<muxima-alert 
  type="info" 
  appearance="soft">
  <span muximaAlertIcon>🔔</span>
  Você tem 3 novas notificações
</muxima-alert>`;

    this.codeExamples.multiple.code = `<div *ngFor="let alert of alerts">
  <muxima-alert 
    [type]="alert.type"
    [dismissible]="alert.dismissible"
    (dismissedChanged)="removeAlert(alert.id)">
    <span *ngIf="alert.title" muximaAlertTitle>{{ alert.title }}</span>
    {{ alert.message }}
  </muxima-alert>
</div>`;

    this.codeExamples.spinner.code = `<!-- HTML - Alert com Spinner -->
<div class="alert-with-spinner info">
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
  <div class="alert-content">
    <strong>Processando...</strong>
    <p>Aguarde enquanto carregamos seus dados</p>
  </div>
</div>

<!-- SCSS - Animação do Spinner -->
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.alert-with-spinner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 12px;
  
  .spinner {
    width: 32px;
    height: 32px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: currentColor;
    animation: spin 1s linear infinite;
  }
}`;
  }

  triggerAlert(type: 'info' | 'success' | 'warning' | 'error') {
    this.dynamicAlertType = type;
    this.showDynamicAlert = true;
    setTimeout(() => this.showDynamicAlert = false, 3000);
  }

  removeAlert(id: number) {
    this.alerts = this.alerts.filter(a => a.id !== id);
  }

  addAlert(type: 'info' | 'success' | 'warning' | 'error') {
    const messages = {
      info: 'Nova informação adicionada',
      success: 'Operação concluída com sucesso',
      warning: 'Atenção necessária',
      error: 'Erro detectado no sistema'
    };

    const newAlert: Alert = {
      id: Date.now(),
      type,
      message: messages[type],
      dismissible: true
    };

    this.alerts.unshift(newAlert);
  }

  copyCode(example: keyof typeof this.codeExamples) {
    const codeExample = this.codeExamples[example];
    navigator.clipboard.writeText(codeExample.code);
    codeExample.copied = true;
    setTimeout(() => codeExample.copied = false, 2000);
  }

  get importCode(): string {
    return `import { MuximaAlertComponent } from '@muxima-ui/alert';

@Component({
  standalone: true,
  imports: [MuximaAlertComponent],
  // ...
})`;
  }
}
