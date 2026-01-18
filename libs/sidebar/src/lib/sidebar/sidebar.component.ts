import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SidebarItem {
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  badge?: string | number;
  active?: boolean;
}

export type SidebarVariant = 'default' | 'compact' | 'floating';

@Component({
  selector: 'muxima-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() items: SidebarItem[] = [];
  @Input() collapsed: boolean = false;
  @Input() variant: SidebarVariant = 'default';
  @Input() header: string = '';
  @Input() footer: string = '';
  @Output() itemClick = new EventEmitter<SidebarItem>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  expandedItems: Set<string> = new Set();

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
}
