import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsTabsComponent, TabItem } from '@muxima-ui/tabs';

@Component({
  selector: 'app-tabs-component-doc',
  standalone: true,
  imports: [CommonModule, TabsTabsComponent],
  templateUrl: './tabs-component-doc.component.html',
  styleUrls: ['./tabs-component-doc.component.scss']
})
export class TabsComponentDocComponent {
  activeTabBasic = 'home';
  activeTabUnderline = 'profile';
  activeTabPills = 'settings';
  activeTabBordered = 'about';
  activeTabIcons = 'general';

  basicTabs: TabItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
    { id: 'about', label: 'About' }
  ];

  underlineTabs: TabItem[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' }
  ];

  pillsTabs: TabItem[] = [
    { id: 'settings', label: 'Settings' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'billing', label: 'Billing' }
  ];

  borderedTabs: TabItem[] = [
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' }
  ];

  iconTabs: TabItem[] = [
    { 
      id: 'general', 
      label: 'General', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      icon2: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
    }
  ];

  disabledTabs: TabItem[] = [
    { id: 'active1', label: 'Active' },
    { id: 'disabled1', label: 'Disabled', disabled: true },
    { id: 'active2', label: 'Active' }
  ];

  activeTabDisabled = 'active1';

  onTabChange(tab: TabItem): void {
    console.log('Tab changed:', tab);
  }

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
      import: `import { TabsTabsComponent, TabItem } from '@muxima-ui/tabs';

@Component({
  standalone: true,
  imports: [TabsTabsComponent]
})`,
      basic: `<muxima-tabs
  [tabs]="tabs"
  [(activeTab)]="activeTab"
  variant="default"
  (tabChange)="onTabChange($event)">
  
  <div *ngIf="activeTab === 'home'">
    Home content here
  </div>
  <div *ngIf="activeTab === 'profile'">
    Profile content here
  </div>
</muxima-tabs>`,
      basicTabs: `tabs: TabItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' }
];

activeTab = 'home';

onTabChange(tab: TabItem) {
  console.log('Tab changed:', tab);
}`,
      underline: `<muxima-tabs
  [tabs]="tabs"
  [(activeTab)]="activeTab"
  variant="underline">
  <!-- Content -->
</muxima-tabs>`,
      pills: `<muxima-tabs
  [tabs]="tabs"
  [(activeTab)]="activeTab"
  variant="pills">
  <!-- Content -->
</muxima-tabs>`,
      bordered: `<muxima-tabs
  [tabs]="tabs"
  [(activeTab)]="activeTab"
  variant="bordered">
  <!-- Content -->
</muxima-tabs>`,
      icons: `<muxima-tabs
  [tabs]="iconTabs"
  [(activeTab)]="activeTab"
  variant="underline">
  <!-- Content -->
</muxima-tabs>

iconTabs: TabItem[] = [
  { 
    id: 'general', 
    label: 'General',
    icon: 'M10.325 4.317c.426-1.756...', // SVG path
    icon2: 'M15 12a3 3 0 11-6 0...' // Optional second path
  },
  { 
    id: 'notifications', 
    label: 'Notifications',
    icon: 'M15 17h5l-1.405...'
  }
];`,
      disabled: `tabs: TabItem[] = [
  { id: 'active', label: 'Active' },
  { id: 'disabled', label: 'Disabled', disabled: true },
  { id: 'active2', label: 'Active' }
];`
    };
    return examples[type] || '';
  }
}
