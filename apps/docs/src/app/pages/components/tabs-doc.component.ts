import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  id: string;
  label: string;
  icon: string;
  content: string;
}

@Component({
  selector: 'muxima-tabs-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs-doc.component.html',
  styleUrls: ['./tabs-doc.component.scss']
})
export class TabsDocComponent {
  activeTab = 'home';

  tabs: Tab[] = [
    { id: 'home', label: 'InÃ­cio', icon: 'ðŸ ', content: 'ConteÃºdo da aba InÃ­cio. Bem-vindo ao sistema!' },
    { id: 'profile', label: 'Perfil', icon: 'ðŸ‘¤', content: 'ConteÃºdo da aba Perfil. Gerencie suas informaÃ§Ãµes pessoais.' },
    { id: 'settings', label: 'ConfiguraÃ§Ãµes', icon: 'âš™ï¸', content: 'ConteÃºdo da aba ConfiguraÃ§Ãµes. Ajuste suas preferÃªncias.' },
    { id: 'notifications', label: 'NotificaÃ§Ãµes', icon: 'ðŸ””', content: 'ConteÃºdo da aba NotificaÃ§Ãµes. Veja suas notificaÃ§Ãµes recentes.' }
  ];

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode(): string {
    return `import { TabsComponent } from '@muxima-ui/tabs';

@Component({
  standalone: true,
  imports: [TabsComponent],
  // ...
})`;
  }

  get basicCode(): string {
    return `<div class="tabs">
  <div class="tabs-nav">
    <button *ngFor="let tab of tabs"
            class="tab-btn"
            [class.active]="tab.id === activeTab"
            (click)="selectTab(tab.id)">
      <span class="tab-icon">{{ tab.icon }}</span>
      <span>{{ tab.label }}</span>
    </button>
  </div>
  
  <div class="tabs-content">
    <div *ngFor="let tab of tabs"
         class="tab-panel"
         [class.active]="tab.id === activeTab">
      {{ tab.content }}
    </div>
  </div>
</div>`;
  }
}

