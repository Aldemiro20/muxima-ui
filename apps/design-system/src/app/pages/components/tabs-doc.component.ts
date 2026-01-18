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
    { id: 'home', label: 'Início', icon: '🏠', content: 'Conteúdo da aba Início. Bem-vindo ao sistema!' },
    { id: 'profile', label: 'Perfil', icon: '👤', content: 'Conteúdo da aba Perfil. Gerencie suas informações pessoais.' },
    { id: 'settings', label: 'Configurações', icon: '⚙️', content: 'Conteúdo da aba Configurações. Ajuste suas preferências.' },
    { id: 'notifications', label: 'Notificações', icon: '🔔', content: 'Conteúdo da aba Notificações. Veja suas notificações recentes.' }
  ];

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode(): string {
    return `import { TabsComponent } from '@agt-ui/tabs';

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
