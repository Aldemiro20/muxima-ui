import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationCenterComponent, Notification, NotificationType } from '@muxima-ui/notification-center';

@Component({
  selector: 'app-notification-center-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationCenterComponent],
  templateUrl: './notification-center-doc.component.html',
  styleUrls: ['./notification-center-doc.component.scss']
})
export class NotificationCenterDocComponent {
  // Example 1: Basic notifications
  basicNotifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Operação concluída',
      message: 'Seu arquivo foi salvo com sucesso',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Nova atualização disponível',
      message: 'Versão 2.0 já está disponível para download',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Atenção',
      message: 'Você tem tarefas pendentes para hoje',
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: true
    }
  ];

  // Example 2: With actions
  actionNotifications: Notification[] = [
    {
      id: '4',
      type: 'info',
      title: 'Convite recebido',
      message: 'João te convidou para participar do projeto',
      timestamp: new Date(Date.now() - 10 * 60000),
      read: false,
      actionLabel: 'Aceitar',
      actionCallback: () => alert('Convite aceito!')
    },
    {
      id: '5',
      type: 'success',
      title: 'Upload concluído',
      message: 'Seu vídeo foi processado com sucesso',
      timestamp: new Date(Date.now() - 45 * 60000),
      read: false,
      actionLabel: 'Ver vídeo',
      actionCallback: () => alert('Abrindo vídeo...')
    }
  ];

  // Example 3: Categorized
  categorizedNotifications: Notification[] = [
    {
      id: '6',
      type: 'success',
      title: 'Pagamento recebido',
      message: 'R$ 150,00 foi creditado na sua conta',
      timestamp: new Date(Date.now() - 1 * 3600000),
      read: false,
      category: 'Financeiro'
    },
    {
      id: '7',
      type: 'info',
      title: 'Nova mensagem',
      message: 'Maria enviou uma mensagem',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      category: 'Social'
    },
    {
      id: '8',
      type: 'warning',
      title: 'Backup pendente',
      message: 'Seu último backup foi há 7 dias',
      timestamp: new Date(Date.now() - 5 * 3600000),
      read: false,
      category: 'Sistema'
    },
    {
      id: '9',
      type: 'error',
      title: 'Erro ao sincronizar',
      message: 'Não foi possível sincronizar seus dados',
      timestamp: new Date(Date.now() - 20 * 60000),
      read: false,
      category: 'Sistema'
    }
  ];

  // Toast notifications
  toastNotifications: Notification[] = [];
  toastCounter = 1;

  // Code examples
  basicCode = `<muxima-notification-center
  [notifications]="notifications"
  [position]="'top-right'"
  (notificationRead)="onRead($event)">
</muxima-notification-center>`;

  actionCode = `{
  id: '1',
  type: 'info',
  title: 'Convite recebido',
  message: 'João te convidou para o projeto',
  timestamp: new Date(),
  read: false,
  actionLabel: 'Aceitar',
  actionCallback: () => this.acceptInvite()
}`;

  categorizedCode = `{
  id: '1',
  type: 'success',
  title: 'Pagamento recebido',
  message: 'R$ 150,00 creditado',
  timestamp: new Date(),
  read: false,
  category: 'Financeiro'
}`;

  componentCode = `import { Component } from '@angular/core';
import { NotificationCenterComponent, Notification } from '@muxima-ui/notification-center';

@Component({
  standalone: true,
  imports: [NotificationCenterComponent],
  template: \`
    <muxima-notification-center
      [notifications]="notifications"
      [position]="'top-right'"
      [maxToasts]="3"
      [groupByCategory]="true"
      (notificationRead)="onRead($event)"
      (notificationDismissed)="onDismiss($event)">
    </muxima-notification-center>
  \`
})
export class MyComponent {
  notifications: Notification[] = [];

  addNotification() {
    this.notifications.push({
      id: Date.now().toString(),
      type: 'info',
      title: 'Nova notificação',
      message: 'Você tem uma nova mensagem',
      timestamp: new Date(),
      read: false
    });
  }

  onRead(id: string) {
    console.log('Read:', id);
  }

  onDismiss(id: string) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
}`;

  addToast(type: NotificationType) {
    const messages = {
      success: { title: 'Sucesso!', message: 'Operação concluída com sucesso' },
      info: { title: 'Informação', message: 'Aqui está uma informação importante' },
      warning: { title: 'Atenção', message: 'Verifique os dados antes de continuar' },
      error: { title: 'Erro', message: 'Algo deu errado, tente novamente' }
    };

    const notification: Notification = {
      id: `toast-${this.toastCounter++}`,
      type,
      ...messages[type],
      timestamp: new Date(),
      read: false,
      autoClose: true,
      duration: 5000
    };

    this.toastNotifications.push(notification);
  }

  onNotificationRead(id: string) {
    console.log('Notification read:', id);
  }

  onNotificationDismissed(id: string) {
    console.log('Notification dismissed:', id);
  }

  onAction(notification: Notification) {
    console.log('Action executed:', notification);
  }
}
