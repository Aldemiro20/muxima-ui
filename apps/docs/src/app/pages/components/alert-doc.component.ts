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

  // Notification examples
  notificationExamples = [
    { type: 'info' as const, title: 'Atualização Disponível', message: 'Nova versão 2.0 disponível para download' },
    { type: 'success' as const, title: 'Upload Completo', message: '5 arquivos enviados com sucesso' },
    { type: 'warning' as const, title: 'Espaço Limitado', message: 'Você está usando 90% do armazenamento' },
    { type: 'error' as const, title: 'Falha na Conexão', message: 'Não foi possível conectar ao servidor' }
  ];

  // Form validation examples
  formAlerts = [
    { type: 'error' as const, message: 'Email inválido. Use o formato: exemplo@email.com' },
    { type: 'error' as const, message: 'Senha deve ter no mínimo 8 caracteres' },
    { type: 'warning' as const, message: 'Alguns campos opcionais estão vazios' }
  ];

  // System status examples
  systemAlerts = [
    { type: 'success' as const, title: 'Sistema Online', message: 'Todos os serviços operando normalmente', icon: '✅' },
    { type: 'warning' as const, title: 'Manutenção Programada', message: 'Sistema ficará offline amanhã às 02:00', icon: '🔧' },
    { type: 'error' as const, title: 'Serviço Indisponível', message: 'API de pagamentos temporariamente offline', icon: '🚫' }
  ];

  // Code examples
  basicCode = `<muxima-alert type="info" appearance="fill">
  Esta é uma mensagem informativa
</muxima-alert>`;

  typesCode = `<!-- Info -->
<muxima-alert type="info">Informação importante</muxima-alert>

<!-- Success -->
<muxima-alert type="success">Operação realizada!</muxima-alert>

<!-- Warning -->
<muxima-alert type="warning">Atenção: revise os dados</muxima-alert>

<!-- Error -->
<muxima-alert type="error">Erro ao processar</muxima-alert>`;

  appearancesCode = `<!-- Fill: Fundo sólido -->
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

  withTitleCode = `<muxima-alert type="warning" appearance="fill">
  <span muximaAlertTitle>Atenção Importante</span>
  Por favor, revise os campos obrigatórios antes de continuar.
</muxima-alert>`;

  dismissibleCode = `<muxima-alert 
  type="success" 
  [dismissible]="true"
  (dismissedChanged)="onAlertDismiss()">
  Perfil atualizado com sucesso!
</muxima-alert>`;

  customIconCode = `<muxima-alert type="info" appearance="soft">
  <span muximaAlertIcon>🔔</span>
  Você tem 3 novas notificações
</muxima-alert>`;

  spinnerCode = `<!-- Alert com spinner animado -->
<div class="alert-with-spinner info">
  <div class="spinner-container">
    <div class="spinner"></div>
    <div class="spinner-pulse"></div>
  </div>
  <div class="alert-content">
    <strong>Processando...</strong>
    <p>Aguarde enquanto carregamos seus dados</p>
  </div>
</div>

<!-- Variantes disponíveis: info, success, warning, error -->
<div class="alert-with-spinner success">
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
  <div class="alert-content">
    <strong>Salvando...</strong>
    <p>Seus dados estão sendo salvos</p>
  </div>
</div>`;

  actionsCode = `<!-- Alert com botões de ação -->
<div class="alert-with-action info">
  <div class="alert-icon">💡</div>
  <div class="alert-body">
    <strong>Nova versão disponível</strong>
    <p>Atualize agora para acessar novas funcionalidades</p>
  </div>
  <div class="alert-actions">
    <button class="action-btn primary">Atualizar</button>
    <button class="action-btn secondary">Depois</button>
  </div>
</div>

<!-- Variantes disponíveis: info, success, warning, error -->
<div class="alert-with-action success">
  <div class="alert-icon">✅</div>
  <div class="alert-body">
    <strong>Backup concluído</strong>
    <p>Seus dados foram salvos com sucesso</p>
  </div>
  <div class="alert-actions">
    <button class="action-btn primary">Ver Detalhes</button>
    <button class="action-btn secondary">OK</button>
  </div>
</div>`;

  multipleAlertsCode = `<div *ngFor="let alert of alerts">
  <muxima-alert 
    [type]="alert.type"
    [dismissible]="alert.dismissible"
    (dismissedChanged)="removeAlert(alert.id)">
    <span *ngIf="alert.title" muximaAlertTitle>{{ alert.title }}</span>
    {{ alert.message }}
  </muxima-alert>
</div>

// TypeScript
alerts: Alert[] = [
  { id: 1, type: 'info', title: 'Nova Versão', message: '...', dismissible: true },
  { id: 2, type: 'warning', title: 'Sessão Expirando', message: '...', dismissible: true }
];

removeAlert(id: number) {
  this.alerts = this.alerts.filter(a => a.id !== id);
}`;

  typescriptCode = `import { MuximaAlertComponent } from '@muxima-ui/alert';

@Component({
  standalone: true,
  imports: [MuximaAlertComponent],
  // ...
})
export class MyComponent {
  showAlert = true;
  
  onAlertDismiss() {
    this.showAlert = false;
  }
}`;

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

  copiedStates: { [key: string]: boolean } = {};

  copyCode(code: string, key: string = 'default') {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedStates[key] = true;
      setTimeout(() => {
        this.copiedStates[key] = false;
      }, 2000);
    });
  }

  isCopied(key: string = 'default'): boolean {
    return this.copiedStates[key] || false;
  }
}
