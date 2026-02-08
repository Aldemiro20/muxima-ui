import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  route?: string;
  href?: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  children?: NavItem[];
}

export type NavbarVariant = 'default' | 'minimal' | 'centered' | 'dashboard' | 'landing' | 'ecommerce';

@Component({
  selector: 'muxima-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-navbar.component.html',
  styleUrls: ['./navbar-navbar.component.scss'],
})
export class NavbarNavbarComponent {
  @Input() logo = 'Muxima';
  @Input() logoImage?: string;
  @Input() logoRoute = '/';
  @Input() menuItems: NavItem[] = [];
  @Input() rightItems: NavItem[] = [];
  @Input() transparent = false;
  @Input() fixed = true;
  @Input() sticky = false;
  @Input() variant: NavbarVariant = 'default';
  @Input() showSearch = false;
  @Input() showNotifications = false;
  @Input() showProfile = false;
  @Input() profileImage?: string;
  @Input() userName?: string;
  @Input() notificationCount = 0;
  
  @Output() searchClicked = new EventEmitter<void>();
  @Output() notificationClicked = new EventEmitter<void>();
  @Output() profileClicked = new EventEmitter<void>();
  @Output() logoClicked = new EventEmitter<void>();

  mobileMenuOpen = false;
  scrolled = false;
  activeDropdown: number | null = null;
  searchOpen = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar')) {
      this.closeDropdown();
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDropdown(index: number): void {
    this.activeDropdown = this.activeDropdown === index ? null : index;
  }

  closeDropdown(): void {
    this.activeDropdown = null;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.activeDropdown = null;
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
  }

  onLogoClick(): void {
    this.logoClicked.emit();
  }

  onSearchClick(): void {
    this.searchClicked.emit();
  }

  onNotificationClick(): void {
    this.notificationClicked.emit();
  }

  onProfileClick(): void {
    this.profileClicked.emit();
  }
}

