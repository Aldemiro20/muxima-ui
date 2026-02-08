import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

export interface SidebarItem {
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  badge?: string | number;
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger';
  active?: boolean;
  count?: string | number;
  section?: string;
}

export interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

export interface SidebarUser {
  name: string;
  role?: string;
  avatar?: string;
  initials?: string;
}

export type SidebarVariant = 'default' | 'compact' | 'floating' | 'dashboard';

@Component({
  selector: 'muxima-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() items: SidebarItem[] = [];
  @Input() sections: SidebarSection[] = [];
  @Input() collapsed: boolean = false;
  @Input() variant: SidebarVariant = 'default';
  @Input() header: string = '';
  @Input() footer: string = '';
  @Input() logoText: string = '';
  @Input() logoIcon: string = '';
  @Input() user: SidebarUser | null = null;
  @Output() itemClick = new EventEmitter<SidebarItem>();
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() userClick = new EventEmitter<void>();

  expandedItems: Set<string> = new Set();
  currentRoute: string = '';

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    // Atualiza a rota atual quando a navegação muda
    this.currentRoute = this.router.url;
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  toggleExpand(item: SidebarItem): void {
    const key = item.label;
    if (this.expandedItems.has(key)) {
      this.expandedItems.delete(key);
    } else {
      this.expandedItems.add(key);
    }
  }

  isExpanded(item: SidebarItem): boolean {
    return this.expandedItems.has(item.label);
  }

  onItemClick(item: SidebarItem, event: Event): void {
    event.stopPropagation();
    if (item.children && item.children.length > 0) {
      this.toggleExpand(item);
    } else {
      this.itemClick.emit(item);
    }
  }

  get variantClass(): string {
    return `sidebar-${this.variant}`;
  }

  onUserClick(): void {
    this.userClick.emit();
  }

  get hasSections(): boolean {
    return this.sections && this.sections.length > 0;
  }

  isItemActive(item: SidebarItem): boolean {
    if (item.active !== undefined) {
      return item.active;
    }
    if (item.route) {
      return this.currentRoute === item.route || this.currentRoute.startsWith(item.route + '/');
    }
    return false;
  }

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
