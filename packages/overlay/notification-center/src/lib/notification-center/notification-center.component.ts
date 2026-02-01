import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  category?: string;
  actionLabel?: string;
  actionCallback?: () => void;
  autoClose?: boolean;
  duration?: number;
}

@Component({
  selector: 'muxima-notification-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]),
    trigger('slideDown', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationCenterComponent implements OnDestroy {
  @Input() notifications: Notification[] = [];
  @Input() position: NotificationPosition = 'top-right';
  @Input() maxToasts: number = 3;
  @Input() defaultDuration: number = 5000;
  @Input() showBadge: boolean = true;
  @Input() groupByCategory: boolean = false;

  @Output() notificationRead = new EventEmitter<string>();
  @Output() notificationDismissed = new EventEmitter<string>();
  @Output() notificationAction = new EventEmitter<Notification>();
  @Output() allRead = new EventEmitter<void>();
  @Output() allCleared = new EventEmitter<void>();

  isOpen = false;
  activeToasts: Notification[] = [];
  private autoCloseTimers = new Map<string, any>();

  ngOnDestroy() {
    this.autoCloseTimers.forEach(timer => clearTimeout(timer));
  }

  togglePanel() {
    this.isOpen = !this.isOpen;
  }

  closePanel() {
    this.isOpen = false;
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  get groupedNotifications(): { category: string; notifications: Notification[] }[] {
    if (!this.groupByCategory) {
      return [{ category: 'all', notifications: this.notifications }];
    }

    const groups = new Map<string, Notification[]>();
    
    this.notifications.forEach(notification => {
      const category = notification.category || 'Outros';
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)!.push(notification);
    });

    return Array.from(groups.entries()).map(([category, notifications]) => ({
      category,
      notifications
    }));
  }

  showToast(notification: Notification) {
    // Add to active toasts
    if (this.activeToasts.length >= this.maxToasts) {
      this.activeToasts.shift();
    }
    
    this.activeToasts.push(notification);

    // Auto close if enabled
    if (notification.autoClose !== false) {
      const duration = notification.duration || this.defaultDuration;
      const timer = setTimeout(() => {
        this.dismissToast(notification.id);
      }, duration);
      
      this.autoCloseTimers.set(notification.id, timer);
    }
  }

  dismissToast(id: string) {
    const index = this.activeToasts.findIndex(t => t.id === id);
    if (index !== -1) {
      this.activeToasts.splice(index, 1);
    }
    
    if (this.autoCloseTimers.has(id)) {
      clearTimeout(this.autoCloseTimers.get(id));
      this.autoCloseTimers.delete(id);
    }
  }

  markAsRead(notification: Notification) {
    if (!notification.read) {
      notification.read = true;
      this.notificationRead.emit(notification.id);
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.allRead.emit();
  }

  dismissNotification(notification: Notification, event?: Event) {
    event?.stopPropagation();
    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
      this.notifications.splice(index, 1);
      this.notificationDismissed.emit(notification.id);
    }
  }

  clearAll() {
    this.notifications.length = 0;
    this.allCleared.emit();
  }

  executeAction(notification: Notification, event?: Event) {
    event?.stopPropagation();
    
    if (notification.actionCallback) {
      notification.actionCallback();
    }
    
    this.notificationAction.emit(notification);
    this.markAsRead(notification);
  }

  getIcon(type: NotificationType): string {
    const icons = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌'
    };
    return icons[type];
  }

  formatTimestamp(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  get positionClass(): string {
    return `position-${this.position}`;
  }
}
