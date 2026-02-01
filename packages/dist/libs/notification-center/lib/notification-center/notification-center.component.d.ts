import { EventEmitter, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
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
export declare class NotificationCenterComponent implements OnDestroy {
    notifications: Notification[];
    position: NotificationPosition;
    maxToasts: number;
    defaultDuration: number;
    showBadge: boolean;
    groupByCategory: boolean;
    notificationRead: EventEmitter<string>;
    notificationDismissed: EventEmitter<string>;
    notificationAction: EventEmitter<Notification>;
    allRead: EventEmitter<void>;
    allCleared: EventEmitter<void>;
    isOpen: boolean;
    activeToasts: Notification[];
    private autoCloseTimers;
    ngOnDestroy(): void;
    togglePanel(): void;
    closePanel(): void;
    get unreadCount(): number;
    get groupedNotifications(): {
        category: string;
        notifications: Notification[];
    }[];
    showToast(notification: Notification): void;
    dismissToast(id: string): void;
    markAsRead(notification: Notification): void;
    markAllAsRead(): void;
    dismissNotification(notification: Notification, event?: Event): void;
    clearAll(): void;
    executeAction(notification: Notification, event?: Event): void;
    getIcon(type: NotificationType): string;
    formatTimestamp(date: Date): string;
    get positionClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationCenterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationCenterComponent, "muxima-notification-center", never, { "notifications": "notifications"; "position": "position"; "maxToasts": "maxToasts"; "defaultDuration": "defaultDuration"; "showBadge": "showBadge"; "groupByCategory": "groupByCategory"; }, { "notificationRead": "notificationRead"; "notificationDismissed": "notificationDismissed"; "notificationAction": "notificationAction"; "allRead": "allRead"; "allCleared": "allCleared"; }, never, never, true, never>;
}
