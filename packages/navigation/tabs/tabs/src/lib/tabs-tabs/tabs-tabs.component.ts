import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  icon2?: string;
  disabled?: boolean;
}

export type TabVariant = 'default' | 'pills' | 'underline' | 'bordered';

@Component({
  selector: 'muxima-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs-tabs.component.html',
  styleUrls: ['./tabs-tabs.component.scss'],
})
export class TabsTabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab: string = '';
  @Input() variant: TabVariant = 'underline';
  @Output() activeTabChange = new EventEmitter<string>();
  @Output() tabChange = new EventEmitter<TabItem>();

  constructor(private sanitizer: DomSanitizer) {}

  selectTab(tab: TabItem): void {
    if (tab.disabled) return;
    this.activeTab = tab.id;
    this.activeTabChange.emit(tab.id);
    this.tabChange.emit(tab);
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
