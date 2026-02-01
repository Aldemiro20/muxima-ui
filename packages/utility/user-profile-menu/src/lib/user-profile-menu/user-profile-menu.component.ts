import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  badge?: string | number;
  divider?: boolean;
  danger?: boolean;
}

export type MenuPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

@Component({
  selector: 'muxima-user-profile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.scss']
})
export class UserProfileMenuComponent {
  @Input() user!: UserInfo;
  @Input() menuItems: MenuItem[] = [];
  @Input() position: MenuPosition = 'bottom-right';
  @Input() showOnlineStatus: boolean = true;
  @Input() isOnline: boolean = true;

  @Output() menuItemClick = new EventEmitter<MenuItem>();
  @Output() avatarClick = new EventEmitter<void>();

  isOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.avatarClick.emit();
    }
  }

  onItemClick(item: MenuItem) {
    if (!item.divider) {
      this.menuItemClick.emit(item);
      this.isOpen = false;
    }
  }

  getInitials(): string {
    if (!this.user?.name) return '';
    return this.user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  get positionClass(): string {
    return `menu-${this.position}`;
  }
}
