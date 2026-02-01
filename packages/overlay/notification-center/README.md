# Notification Center

Centro de notificações com painel, toasts e gerenciamento completo.

## Instalação

```bash
npm install @muxima-ui/notification-center
```

## Uso

```typescript
import { NotificationCenterComponent } from '@muxima-ui/notification-center';

@Component({
  standalone: true,
  imports: [NotificationCenterComponent],
  template: `
    <muxima-notification-center
      [notifications]="notifications"
      [position]="'top-right'"
      (notificationRead)="onRead($event)">
    </muxima-notification-center>
  `
})
export class MyComponent {
  notifications = [
    {
      id: '1',
      type: 'success',
      title: 'Sucesso!',
      message: 'Operação concluída',
      timestamp: new Date(),
      read: false
    }
  ];

  onRead(id: string) {
    console.log('Notification read:', id);
  }
}
```

## Licença

MIT
