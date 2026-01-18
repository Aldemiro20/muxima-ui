import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  route?: string;
  href?: string;
  icon?: string;
  children?: NavItem[];
}

@Component({
  selector: 'muxima-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-navbar.component.html',
  styleUrls: ['./navbar-navbar.component.scss'],
})
export class NavbarNavbarComponent {
  @Input() logo = 'Muxima';
  @Input() logoRoute = '/';
  @Input() menuItems: NavItem[] = [];
  @Input() transparent = false;
  @Input() fixed = true;

  mobileMenuOpen = false;
  scrolled = false;
  activeDropdown: number | null = null;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
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
}

