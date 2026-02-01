import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

class NotificationCenterComponent {
    constructor() {
        this.notifications = [];
        this.position = 'top-right';
        this.maxToasts = 3;
        this.defaultDuration = 5000;
        this.showBadge = true;
        this.groupByCategory = false;
        this.notificationRead = new EventEmitter();
        this.notificationDismissed = new EventEmitter();
        this.notificationAction = new EventEmitter();
        this.allRead = new EventEmitter();
        this.allCleared = new EventEmitter();
        this.isOpen = false;
        this.activeToasts = [];
        this.autoCloseTimers = new Map();
    }
    ngOnDestroy() {
        this.autoCloseTimers.forEach(timer => clearTimeout(timer));
    }
    togglePanel() {
        this.isOpen = !this.isOpen;
    }
    closePanel() {
        this.isOpen = false;
    }
    get unreadCount() {
        return this.notifications.filter(n => !n.read).length;
    }
    get groupedNotifications() {
        if (!this.groupByCategory) {
            return [{ category: 'all', notifications: this.notifications }];
        }
        const groups = new Map();
        this.notifications.forEach(notification => {
            const category = notification.category || 'Outros';
            if (!groups.has(category)) {
                groups.set(category, []);
            }
            groups.get(category).push(notification);
        });
        return Array.from(groups.entries()).map(([category, notifications]) => ({
            category,
            notifications
        }));
    }
    showToast(notification) {
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
    dismissToast(id) {
        const index = this.activeToasts.findIndex(t => t.id === id);
        if (index !== -1) {
            this.activeToasts.splice(index, 1);
        }
        if (this.autoCloseTimers.has(id)) {
            clearTimeout(this.autoCloseTimers.get(id));
            this.autoCloseTimers.delete(id);
        }
    }
    markAsRead(notification) {
        if (!notification.read) {
            notification.read = true;
            this.notificationRead.emit(notification.id);
        }
    }
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.allRead.emit();
    }
    dismissNotification(notification, event) {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
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
    executeAction(notification, event) {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        if (notification.actionCallback) {
            notification.actionCallback();
        }
        this.notificationAction.emit(notification);
        this.markAsRead(notification);
    }
    getIcon(type) {
        const icons = {
            success: '✅',
            info: 'ℹ️',
            warning: '⚠️',
            error: '❌'
        };
        return icons[type];
    }
    formatTimestamp(date) {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 1)
            return 'Agora';
        if (minutes < 60)
            return `${minutes}m atrás`;
        if (hours < 24)
            return `${hours}h atrás`;
        if (days < 7)
            return `${days}d atrás`;
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    }
    get positionClass() {
        return `position-${this.position}`;
    }
}
NotificationCenterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NotificationCenterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NotificationCenterComponent, isStandalone: true, selector: "muxima-notification-center", inputs: { notifications: "notifications", position: "position", maxToasts: "maxToasts", defaultDuration: "defaultDuration", showBadge: "showBadge", groupByCategory: "groupByCategory" }, outputs: { notificationRead: "notificationRead", notificationDismissed: "notificationDismissed", notificationAction: "notificationAction", allRead: "allRead", allCleared: "allCleared" }, ngImport: i0, template: "<!-- Notification Bell Icon -->\r\n<div class=\"notification-bell\" (click)=\"togglePanel()\">\r\n  <span class=\"bell-icon\">\uD83D\uDD14</span>\r\n  <span class=\"badge\" *ngIf=\"showBadge && unreadCount > 0\">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>\r\n</div>\r\n\r\n<!-- Notification Panel -->\r\n<div class=\"notification-panel\" [class.open]=\"isOpen\" [@slideDown]>\r\n  <div class=\"panel-header\">\r\n    <h3>Notifica\u00E7\u00F5es</h3>\r\n    <div class=\"header-actions\">\r\n      <button class=\"action-btn\" (click)=\"markAllAsRead()\" *ngIf=\"unreadCount > 0\" title=\"Marcar todas como lidas\">\r\n        <span>\u2713</span>\r\n      </button>\r\n      <button class=\"action-btn\" (click)=\"clearAll()\" *ngIf=\"notifications.length > 0\" title=\"Limpar todas\">\r\n        <span>\uD83D\uDDD1\uFE0F</span>\r\n      </button>\r\n      <button class=\"action-btn close-btn\" (click)=\"closePanel()\" title=\"Fechar\">\r\n        <span>\u2715</span>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"panel-body\">\r\n    <div *ngIf=\"notifications.length === 0\" class=\"empty-state\">\r\n      <div class=\"empty-icon\">\uD83D\uDD15</div>\r\n      <p>Nenhuma notifica\u00E7\u00E3o</p>\r\n    </div>\r\n\r\n    <div *ngIf=\"notifications.length > 0\">\r\n      <div *ngFor=\"let group of groupedNotifications\" class=\"notification-group\">\r\n        <h4 class=\"group-title\" *ngIf=\"groupByCategory\">{{ group.category }}</h4>\r\n        \r\n        <div *ngFor=\"let notification of group.notifications\" \r\n             class=\"notification-item\"\r\n             [class.unread]=\"!notification.read\"\r\n             [class.type-success]=\"notification.type === 'success'\"\r\n             [class.type-info]=\"notification.type === 'info'\"\r\n             [class.type-warning]=\"notification.type === 'warning'\"\r\n             [class.type-error]=\"notification.type === 'error'\"\r\n             (click)=\"markAsRead(notification)\">\r\n          \r\n          <div class=\"notification-icon\">\r\n            <span>{{ getIcon(notification.type) }}</span>\r\n          </div>\r\n\r\n          <div class=\"notification-content\">\r\n            <div class=\"notification-header\">\r\n              <h5 class=\"notification-title\">{{ notification.title }}</h5>\r\n              <span class=\"notification-time\">{{ formatTimestamp(notification.timestamp) }}</span>\r\n            </div>\r\n            <p class=\"notification-message\">{{ notification.message }}</p>\r\n            \r\n            <button *ngIf=\"notification.actionLabel\" \r\n                    class=\"notification-action\"\r\n                    (click)=\"executeAction(notification, $event)\">\r\n              {{ notification.actionLabel }}\r\n            </button>\r\n          </div>\r\n\r\n          <button class=\"dismiss-btn\" (click)=\"dismissNotification(notification, $event)\" title=\"Dispensar\">\r\n            <span>\u2715</span>\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Toast Notifications -->\r\n<div class=\"toast-container\" [class]=\"positionClass\">\r\n  <div *ngFor=\"let toast of activeToasts\" \r\n       class=\"toast-notification\"\r\n       [class.type-success]=\"toast.type === 'success'\"\r\n       [class.type-info]=\"toast.type === 'info'\"\r\n       [class.type-warning]=\"toast.type === 'warning'\"\r\n       [class.type-error]=\"toast.type === 'error'\"\r\n       [@slideIn]>\r\n    \r\n    <div class=\"toast-icon\">\r\n      <span>{{ getIcon(toast.type) }}</span>\r\n    </div>\r\n\r\n    <div class=\"toast-content\">\r\n      <h5 class=\"toast-title\">{{ toast.title }}</h5>\r\n      <p class=\"toast-message\">{{ toast.message }}</p>\r\n      \r\n      <button *ngIf=\"toast.actionLabel\" \r\n              class=\"toast-action\"\r\n              (click)=\"executeAction(toast, $event)\">\r\n        {{ toast.actionLabel }}\r\n      </button>\r\n    </div>\r\n\r\n    <button class=\"toast-close\" (click)=\"dismissToast(toast.id)\" title=\"Fechar\">\r\n      <span>\u2715</span>\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n<!-- Overlay -->\r\n<div class=\"overlay\" *ngIf=\"isOpen\" (click)=\"closePanel()\"></div>\r\n", styles: [".notification-bell{position:relative;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 8px #667eea4d}.notification-bell:hover{transform:scale(1.1);box-shadow:0 6px 12px #667eea66}.notification-bell:active{transform:scale(.95)}.notification-bell .bell-icon{font-size:1.5rem;animation:ring 2s ease-in-out infinite}.notification-bell .badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 4px;background:#ef4444;color:#fff;font-size:.75rem;font-weight:700;border-radius:10px;display:flex;align-items:center;justify-content:center;border:2px solid white;animation:pulse 2s ease-in-out infinite}@keyframes ring{0%,to{transform:rotate(0)}10%,30%{transform:rotate(-10deg)}20%,40%{transform:rotate(10deg)}}@keyframes pulse{0%,to{transform:scale(1)}50%{transform:scale(1.1)}}.notification-panel{position:fixed;top:60px;right:20px;width:400px;max-height:600px;background:white;border-radius:12px;box-shadow:0 10px 25px #0003;transform:translateY(-20px);opacity:0;pointer-events:none;transition:all .3s ease;z-index:1000;display:flex;flex-direction:column}.notification-panel.open{transform:translateY(0);opacity:1;pointer-events:all}.panel-header{padding:1.25rem;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between}.panel-header h3{font-size:1.25rem;font-weight:700;color:#111827;margin:0}.panel-header .header-actions{display:flex;gap:.5rem}.panel-header .action-btn{padding:.5rem;background:transparent;border:none;color:#6b7280;font-size:1rem;cursor:pointer;border-radius:6px;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.panel-header .action-btn:hover{background:#f3f4f6;color:#667eea}.panel-header .action-btn.close-btn:hover{color:#ef4444}.panel-body{flex:1;overflow-y:auto;max-height:500px}.panel-body::-webkit-scrollbar{width:6px}.panel-body::-webkit-scrollbar-track{background:#f3f4f6}.panel-body::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:3px}.empty-state{padding:3rem 1.5rem;text-align:center}.empty-state .empty-icon{font-size:3rem;margin-bottom:1rem;opacity:.5}.empty-state p{color:#9ca3af;font-size:1rem}.notification-group .group-title{padding:.75rem 1.25rem;font-size:.875rem;font-weight:600;color:#667eea;text-transform:uppercase;letter-spacing:.05em;background:#f9fafb;border-bottom:1px solid #e5e7eb;margin:0}.notification-item{display:flex;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid #e5e7eb;cursor:pointer;transition:all .2s ease;position:relative}.notification-item:last-child{border-bottom:none}.notification-item:hover{background:#f9fafb}.notification-item.unread{background:rgba(102,126,234,.05)}.notification-item.unread:before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.notification-item.type-success .notification-icon{color:#10b981}.notification-item.type-info .notification-icon{color:#3b82f6}.notification-item.type-warning .notification-icon{color:#f59e0b}.notification-item.type-error .notification-icon{color:#ef4444}.notification-item .notification-icon{font-size:1.5rem;flex-shrink:0}.notification-item .notification-content{flex:1;min-width:0}.notification-item .notification-header{display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;margin-bottom:.5rem}.notification-item .notification-title{font-size:.875rem;font-weight:600;color:#111827;margin:0}.notification-item .notification-time{font-size:.75rem;color:#9ca3af;white-space:nowrap}.notification-item .notification-message{font-size:.875rem;color:#6b7280;margin:0 0 .75rem;line-height:1.5}.notification-item .notification-action{padding:.375rem .75rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:6px;font-size:.75rem;font-weight:600;cursor:pointer;transition:all .2s ease}.notification-item .notification-action:hover{transform:translateY(-1px);box-shadow:0 4px 8px #667eea4d}.notification-item .dismiss-btn{padding:.25rem;background:transparent;border:none;color:#9ca3af;font-size:1rem;cursor:pointer;border-radius:4px;transition:all .2s ease;flex-shrink:0}.notification-item .dismiss-btn:hover{background:#f3f4f6;color:#ef4444}.toast-container{position:fixed;z-index:9999;display:flex;flex-direction:column;gap:1rem;pointer-events:none}.toast-container.position-top-right{top:20px;right:20px}.toast-container.position-top-left{top:20px;left:20px}.toast-container.position-bottom-right{bottom:20px;right:20px}.toast-container.position-bottom-left{bottom:20px;left:20px}.toast-container.position-top-center{top:20px;left:50%;transform:translate(-50%)}.toast-container.position-bottom-center{bottom:20px;left:50%;transform:translate(-50%)}.toast-notification{display:flex;align-items:flex-start;gap:1rem;min-width:350px;max-width:450px;padding:1rem 1.25rem;background:white;border-radius:12px;box-shadow:0 10px 25px #00000026;pointer-events:all;border-left:4px solid}.toast-notification.type-success{border-left-color:#10b981}.toast-notification.type-success .toast-icon{color:#10b981}.toast-notification.type-info{border-left-color:#3b82f6}.toast-notification.type-info .toast-icon{color:#3b82f6}.toast-notification.type-warning{border-left-color:#f59e0b}.toast-notification.type-warning .toast-icon{color:#f59e0b}.toast-notification.type-error{border-left-color:#ef4444}.toast-notification.type-error .toast-icon{color:#ef4444}.toast-notification .toast-icon{font-size:1.5rem;flex-shrink:0}.toast-notification .toast-content{flex:1;min-width:0}.toast-notification .toast-title{font-size:.875rem;font-weight:600;color:#111827;margin:0 0 .25rem}.toast-notification .toast-message{font-size:.875rem;color:#6b7280;margin:0 0 .75rem;line-height:1.5}.toast-notification .toast-action{padding:.375rem .75rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:6px;font-size:.75rem;font-weight:600;cursor:pointer;transition:all .2s ease}.toast-notification .toast-action:hover{transform:translateY(-1px);box-shadow:0 4px 8px #667eea4d}.toast-notification .toast-close{padding:.25rem;background:transparent;border:none;color:#9ca3af;font-size:1rem;cursor:pointer;border-radius:4px;transition:all .2s ease;flex-shrink:0}.toast-notification .toast-close:hover{background:#f3f4f6;color:#ef4444}.overlay{position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:999;animation:fadeIn .3s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@media (max-width: 768px){.notification-panel{right:10px;left:10px;width:auto}.toast-notification{min-width:300px;max-width:350px}.toast-container.position-top-right,.toast-container.position-top-left,.toast-container.position-top-center{top:10px;left:10px;right:10px;transform:none}.toast-container.position-bottom-right,.toast-container.position-bottom-left,.toast-container.position-bottom-center{bottom:10px;left:10px;right:10px;transform:none}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
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
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationCenterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-notification-center', standalone: true, imports: [CommonModule], animations: [
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
                    ], template: "<!-- Notification Bell Icon -->\r\n<div class=\"notification-bell\" (click)=\"togglePanel()\">\r\n  <span class=\"bell-icon\">\uD83D\uDD14</span>\r\n  <span class=\"badge\" *ngIf=\"showBadge && unreadCount > 0\">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>\r\n</div>\r\n\r\n<!-- Notification Panel -->\r\n<div class=\"notification-panel\" [class.open]=\"isOpen\" [@slideDown]>\r\n  <div class=\"panel-header\">\r\n    <h3>Notifica\u00E7\u00F5es</h3>\r\n    <div class=\"header-actions\">\r\n      <button class=\"action-btn\" (click)=\"markAllAsRead()\" *ngIf=\"unreadCount > 0\" title=\"Marcar todas como lidas\">\r\n        <span>\u2713</span>\r\n      </button>\r\n      <button class=\"action-btn\" (click)=\"clearAll()\" *ngIf=\"notifications.length > 0\" title=\"Limpar todas\">\r\n        <span>\uD83D\uDDD1\uFE0F</span>\r\n      </button>\r\n      <button class=\"action-btn close-btn\" (click)=\"closePanel()\" title=\"Fechar\">\r\n        <span>\u2715</span>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"panel-body\">\r\n    <div *ngIf=\"notifications.length === 0\" class=\"empty-state\">\r\n      <div class=\"empty-icon\">\uD83D\uDD15</div>\r\n      <p>Nenhuma notifica\u00E7\u00E3o</p>\r\n    </div>\r\n\r\n    <div *ngIf=\"notifications.length > 0\">\r\n      <div *ngFor=\"let group of groupedNotifications\" class=\"notification-group\">\r\n        <h4 class=\"group-title\" *ngIf=\"groupByCategory\">{{ group.category }}</h4>\r\n        \r\n        <div *ngFor=\"let notification of group.notifications\" \r\n             class=\"notification-item\"\r\n             [class.unread]=\"!notification.read\"\r\n             [class.type-success]=\"notification.type === 'success'\"\r\n             [class.type-info]=\"notification.type === 'info'\"\r\n             [class.type-warning]=\"notification.type === 'warning'\"\r\n             [class.type-error]=\"notification.type === 'error'\"\r\n             (click)=\"markAsRead(notification)\">\r\n          \r\n          <div class=\"notification-icon\">\r\n            <span>{{ getIcon(notification.type) }}</span>\r\n          </div>\r\n\r\n          <div class=\"notification-content\">\r\n            <div class=\"notification-header\">\r\n              <h5 class=\"notification-title\">{{ notification.title }}</h5>\r\n              <span class=\"notification-time\">{{ formatTimestamp(notification.timestamp) }}</span>\r\n            </div>\r\n            <p class=\"notification-message\">{{ notification.message }}</p>\r\n            \r\n            <button *ngIf=\"notification.actionLabel\" \r\n                    class=\"notification-action\"\r\n                    (click)=\"executeAction(notification, $event)\">\r\n              {{ notification.actionLabel }}\r\n            </button>\r\n          </div>\r\n\r\n          <button class=\"dismiss-btn\" (click)=\"dismissNotification(notification, $event)\" title=\"Dispensar\">\r\n            <span>\u2715</span>\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Toast Notifications -->\r\n<div class=\"toast-container\" [class]=\"positionClass\">\r\n  <div *ngFor=\"let toast of activeToasts\" \r\n       class=\"toast-notification\"\r\n       [class.type-success]=\"toast.type === 'success'\"\r\n       [class.type-info]=\"toast.type === 'info'\"\r\n       [class.type-warning]=\"toast.type === 'warning'\"\r\n       [class.type-error]=\"toast.type === 'error'\"\r\n       [@slideIn]>\r\n    \r\n    <div class=\"toast-icon\">\r\n      <span>{{ getIcon(toast.type) }}</span>\r\n    </div>\r\n\r\n    <div class=\"toast-content\">\r\n      <h5 class=\"toast-title\">{{ toast.title }}</h5>\r\n      <p class=\"toast-message\">{{ toast.message }}</p>\r\n      \r\n      <button *ngIf=\"toast.actionLabel\" \r\n              class=\"toast-action\"\r\n              (click)=\"executeAction(toast, $event)\">\r\n        {{ toast.actionLabel }}\r\n      </button>\r\n    </div>\r\n\r\n    <button class=\"toast-close\" (click)=\"dismissToast(toast.id)\" title=\"Fechar\">\r\n      <span>\u2715</span>\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n<!-- Overlay -->\r\n<div class=\"overlay\" *ngIf=\"isOpen\" (click)=\"closePanel()\"></div>\r\n", styles: [".notification-bell{position:relative;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 8px #667eea4d}.notification-bell:hover{transform:scale(1.1);box-shadow:0 6px 12px #667eea66}.notification-bell:active{transform:scale(.95)}.notification-bell .bell-icon{font-size:1.5rem;animation:ring 2s ease-in-out infinite}.notification-bell .badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 4px;background:#ef4444;color:#fff;font-size:.75rem;font-weight:700;border-radius:10px;display:flex;align-items:center;justify-content:center;border:2px solid white;animation:pulse 2s ease-in-out infinite}@keyframes ring{0%,to{transform:rotate(0)}10%,30%{transform:rotate(-10deg)}20%,40%{transform:rotate(10deg)}}@keyframes pulse{0%,to{transform:scale(1)}50%{transform:scale(1.1)}}.notification-panel{position:fixed;top:60px;right:20px;width:400px;max-height:600px;background:white;border-radius:12px;box-shadow:0 10px 25px #0003;transform:translateY(-20px);opacity:0;pointer-events:none;transition:all .3s ease;z-index:1000;display:flex;flex-direction:column}.notification-panel.open{transform:translateY(0);opacity:1;pointer-events:all}.panel-header{padding:1.25rem;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between}.panel-header h3{font-size:1.25rem;font-weight:700;color:#111827;margin:0}.panel-header .header-actions{display:flex;gap:.5rem}.panel-header .action-btn{padding:.5rem;background:transparent;border:none;color:#6b7280;font-size:1rem;cursor:pointer;border-radius:6px;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.panel-header .action-btn:hover{background:#f3f4f6;color:#667eea}.panel-header .action-btn.close-btn:hover{color:#ef4444}.panel-body{flex:1;overflow-y:auto;max-height:500px}.panel-body::-webkit-scrollbar{width:6px}.panel-body::-webkit-scrollbar-track{background:#f3f4f6}.panel-body::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:3px}.empty-state{padding:3rem 1.5rem;text-align:center}.empty-state .empty-icon{font-size:3rem;margin-bottom:1rem;opacity:.5}.empty-state p{color:#9ca3af;font-size:1rem}.notification-group .group-title{padding:.75rem 1.25rem;font-size:.875rem;font-weight:600;color:#667eea;text-transform:uppercase;letter-spacing:.05em;background:#f9fafb;border-bottom:1px solid #e5e7eb;margin:0}.notification-item{display:flex;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid #e5e7eb;cursor:pointer;transition:all .2s ease;position:relative}.notification-item:last-child{border-bottom:none}.notification-item:hover{background:#f9fafb}.notification-item.unread{background:rgba(102,126,234,.05)}.notification-item.unread:before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.notification-item.type-success .notification-icon{color:#10b981}.notification-item.type-info .notification-icon{color:#3b82f6}.notification-item.type-warning .notification-icon{color:#f59e0b}.notification-item.type-error .notification-icon{color:#ef4444}.notification-item .notification-icon{font-size:1.5rem;flex-shrink:0}.notification-item .notification-content{flex:1;min-width:0}.notification-item .notification-header{display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;margin-bottom:.5rem}.notification-item .notification-title{font-size:.875rem;font-weight:600;color:#111827;margin:0}.notification-item .notification-time{font-size:.75rem;color:#9ca3af;white-space:nowrap}.notification-item .notification-message{font-size:.875rem;color:#6b7280;margin:0 0 .75rem;line-height:1.5}.notification-item .notification-action{padding:.375rem .75rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:6px;font-size:.75rem;font-weight:600;cursor:pointer;transition:all .2s ease}.notification-item .notification-action:hover{transform:translateY(-1px);box-shadow:0 4px 8px #667eea4d}.notification-item .dismiss-btn{padding:.25rem;background:transparent;border:none;color:#9ca3af;font-size:1rem;cursor:pointer;border-radius:4px;transition:all .2s ease;flex-shrink:0}.notification-item .dismiss-btn:hover{background:#f3f4f6;color:#ef4444}.toast-container{position:fixed;z-index:9999;display:flex;flex-direction:column;gap:1rem;pointer-events:none}.toast-container.position-top-right{top:20px;right:20px}.toast-container.position-top-left{top:20px;left:20px}.toast-container.position-bottom-right{bottom:20px;right:20px}.toast-container.position-bottom-left{bottom:20px;left:20px}.toast-container.position-top-center{top:20px;left:50%;transform:translate(-50%)}.toast-container.position-bottom-center{bottom:20px;left:50%;transform:translate(-50%)}.toast-notification{display:flex;align-items:flex-start;gap:1rem;min-width:350px;max-width:450px;padding:1rem 1.25rem;background:white;border-radius:12px;box-shadow:0 10px 25px #00000026;pointer-events:all;border-left:4px solid}.toast-notification.type-success{border-left-color:#10b981}.toast-notification.type-success .toast-icon{color:#10b981}.toast-notification.type-info{border-left-color:#3b82f6}.toast-notification.type-info .toast-icon{color:#3b82f6}.toast-notification.type-warning{border-left-color:#f59e0b}.toast-notification.type-warning .toast-icon{color:#f59e0b}.toast-notification.type-error{border-left-color:#ef4444}.toast-notification.type-error .toast-icon{color:#ef4444}.toast-notification .toast-icon{font-size:1.5rem;flex-shrink:0}.toast-notification .toast-content{flex:1;min-width:0}.toast-notification .toast-title{font-size:.875rem;font-weight:600;color:#111827;margin:0 0 .25rem}.toast-notification .toast-message{font-size:.875rem;color:#6b7280;margin:0 0 .75rem;line-height:1.5}.toast-notification .toast-action{padding:.375rem .75rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:6px;font-size:.75rem;font-weight:600;cursor:pointer;transition:all .2s ease}.toast-notification .toast-action:hover{transform:translateY(-1px);box-shadow:0 4px 8px #667eea4d}.toast-notification .toast-close{padding:.25rem;background:transparent;border:none;color:#9ca3af;font-size:1rem;cursor:pointer;border-radius:4px;transition:all .2s ease;flex-shrink:0}.toast-notification .toast-close:hover{background:#f3f4f6;color:#ef4444}.overlay{position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:999;animation:fadeIn .3s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@media (max-width: 768px){.notification-panel{right:10px;left:10px;width:auto}.toast-notification{min-width:300px;max-width:350px}.toast-container.position-top-right,.toast-container.position-top-left,.toast-container.position-top-center{top:10px;left:10px;right:10px;transform:none}.toast-container.position-bottom-right,.toast-container.position-bottom-left,.toast-container.position-bottom-center{bottom:10px;left:10px;right:10px;transform:none}}\n"] }]
        }], propDecorators: { notifications: [{
                type: Input
            }], position: [{
                type: Input
            }], maxToasts: [{
                type: Input
            }], defaultDuration: [{
                type: Input
            }], showBadge: [{
                type: Input
            }], groupByCategory: [{
                type: Input
            }], notificationRead: [{
                type: Output
            }], notificationDismissed: [{
                type: Output
            }], notificationAction: [{
                type: Output
            }], allRead: [{
                type: Output
            }], allCleared: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { NotificationCenterComponent };
//# sourceMappingURL=muxima-ui-notification-center.mjs.map
