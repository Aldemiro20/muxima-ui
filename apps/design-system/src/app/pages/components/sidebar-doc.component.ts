import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent, SidebarItem, SidebarVariant } from '@muxima-ui/sidebar';

@Component({
  selector: 'app-sidebar-doc',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './sidebar-doc.component.html',
  styleUrls: ['./sidebar-doc.component.scss']
})
export class SidebarDocComponent {
  collapsed = false;
  selectedVariant: SidebarVariant = 'default';

  basicItems: SidebarItem[] = [
    { label: 'Dashboard', icon: '📊', active: true },
    { label: 'Usuários', icon: '👥' },
    { label: 'Configurações', icon: '⚙️' },
    { label: 'Relatórios', icon: '📈' },
    { label: 'Ajuda', icon: '❓' }
  ];

  withChildrenItems: SidebarItem[] = [
    { label: 'Dashboard', icon: '📊', active: true },
    { 
      label: 'Produtos', 
      icon: '📦',
      children: [
        { label: 'Todos Produtos', icon: '📋' },
        { label: 'Adicionar Produto', icon: '➕' },
        { label: 'Categorias', icon: '🏷️' },
        { label: 'Estoque', icon: '📊' }
      ]
    },
    {
      label: 'Vendas',
      icon: '💰',
      children: [
        { label: 'Todas Vendas', icon: '💳' },
        { label: 'Nova Venda', icon: '🆕' },
        { label: 'Relatórios', icon: '📊' }
      ]
    },
    { label: 'Clientes', icon: '👥', badge: '12' },
    { label: 'Configurações', icon: '⚙️' }
  ];

  adminItems: SidebarItem[] = [
    { label: 'Painel', icon: '🏠', active: true },
    {
      label: 'Usuários',
      icon: '👥',
      badge: '8',
      children: [
        { label: 'Todos Usuários', icon: '👤' },
        { label: 'Adicionar Usuário', icon: '➕' },
        { label: 'Perfis', icon: '🔐' },
        { label: 'Permissões', icon: '🔑' }
      ]
    },
    {
      label: 'Conteúdo',
      icon: '📝',
      children: [
        { label: 'Artigos', icon: '📄' },
        { label: 'Páginas', icon: '📃' },
        { label: 'Mídia', icon: '🖼️' }
      ]
    },
    { label: 'Analytics', icon: '📈' },
    { label: 'Notificações', icon: '🔔', badge: '3' },
    { label: 'Segurança', icon: '🔒' },
    { label: 'Configurações', icon: '⚙️' }
  ];

  appItems: SidebarItem[] = [
    { label: 'Início', icon: '🏠', active: true },
    { label: 'Explorar', icon: '🔍' },
    { label: 'Mensagens', icon: '💬', badge: '5' },
    { label: 'Notificações', icon: '🔔', badge: '12' },
    { label: 'Favoritos', icon: '⭐' },
    { label: 'Perfil', icon: '👤' },
    { label: 'Configurações', icon: '⚙️' }
  ];

  onItemClick(item: SidebarItem): void {
    console.log('Item clicked:', item);
  }

  onCollapsedChange(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
      import: `import { SidebarComponent, SidebarItem } from '@muxima-ui/sidebar';

@Component({{ '{' }}
  standalone: true,
  imports: [SidebarComponent]
{{ '}' }})`,
      basic: `<!-- Basic Sidebar -->
<muxima-sidebar
  [items]="menuItems"
  header="Minha App"
  footer="© 2024"
  (itemClick)="onItemClick($event)">
</muxima-sidebar>

<!-- Component Logic -->
export class MyComponent {{ '{' }}
  menuItems: SidebarItem[] = [
    {{ '{' }} label: 'Dashboard', icon: '📊', active: true {{ '}' }},
    {{ '{' }} label: 'Usuários', icon: '👥' {{ '}' }},
    {{ '{' }} label: 'Configurações', icon: '⚙️' {{ '}' }}
  ];

  onItemClick(item: SidebarItem) {{ '{' }}
    console.log('Clicked:', item);
  {{ '}' }}
{{ '}' }}`,
      children: `<!-- Sidebar with Children -->
<muxima-sidebar
  [items]="menuWithChildren"
  header="Admin Panel">
</muxima-sidebar>

<!-- Component Logic -->
menuWithChildren: SidebarItem[] = [
  {{ '{' }}
    label: 'Produtos',
    icon: '📦',
    children: [
      {{ '{' }} label: 'Todos Produtos', icon: '📋' {{ '}' }},
      {{ '{' }} label: 'Adicionar', icon: '➕' {{ '}' }},
      {{ '{' }} label: 'Categorias', icon: '🏷️' {{ '}' }}
    ]
  {{ '}' }},
  {{ '{' }} label: 'Clientes', icon: '👥', badge: '12' {{ '}' }}
];`,
      collapsed: `<!-- Collapsible Sidebar -->
<muxima-sidebar
  [items]="menuItems"
  [collapsed]="isCollapsed"
  (collapsedChange)="onCollapsedChange($event)">
</muxima-sidebar>

<!-- Component Logic -->
export class MyComponent {{ '{' }}
  isCollapsed = false;

  onCollapsedChange(collapsed: boolean) {{ '{' }}
    this.isCollapsed = collapsed;
  {{ '}' }}
{{ '}' }}`,
      compact: `<!-- Compact Variant -->
<muxima-sidebar
  [items]="menuItems"
  variant="compact"
  header="App">
</muxima-sidebar>`,
      floating: `<!-- Floating Variant -->
<muxima-sidebar
  [items]="menuItems"
  variant="floating"
  header="Menu">
</muxima-sidebar>`,
      badges: `<!-- Items with Badges -->
menuItems: SidebarItem[] = [
  {{ '{' }}
    label: 'Mensagens',
    icon: '💬',
    badge: '5'  // String or number
  {{ '}' }},
  {{ '{' }}
    label: 'Notificações',
    icon: '🔔',
    badge: 12
  {{ '}' }}
];`,
      interface: `export interface SidebarItem {{ '{' }}
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  badge?: string | number;
  active?: boolean;
{{ '}' }}

export type SidebarVariant = 'default' | 'compact' | 'floating';`
    };
    return examples[type] || '';
  }
}
