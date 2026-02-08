import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'muxima-breadcrumb-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb-doc.component.html',
  styleUrls: ['./breadcrumb-doc.component.scss']
})
export class BreadcrumbDocComponent {
  // Basic breadcrumbs
  basicBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Produtos', url: '/produtos' },
    { label: 'Eletrônicos', url: '/produtos/eletronicos' },
    { label: 'Notebook' }
  ];

  // Dashboard breadcrumbs
  dashboardBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Relatórios', url: '/dashboard/relatorios' },
    { label: 'Vendas Mensais' }
  ];

  // Admin breadcrumbs
  adminBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Admin', url: '/admin' },
    { label: 'Usuários', url: '/admin/usuarios' },
    { label: 'Perfil', url: '/admin/usuarios/perfil' },
    { label: 'Editar Permissões' }
  ];

  // E-commerce breadcrumbs
  ecommerceBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Loja', url: '/' },
    { label: 'Moda', url: '/moda' },
    { label: 'Masculino', url: '/moda/masculino' },
    { label: 'Camisetas', url: '/moda/masculino/camisetas' },
    { label: 'Camiseta Premium Azul' }
  ];

  // Documentation breadcrumbs
  docsBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Docs', url: '/docs' },
    { label: 'Componentes', url: '/docs/components' },
    { label: 'Navegação', url: '/docs/components/navigation' },
    { label: 'Breadcrumb' }
  ];

  // Settings breadcrumbs
  settingsBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Configurações', url: '/settings' },
    { label: 'Conta', url: '/settings/account' },
    { label: 'Segurança e Privacidade' }
  ];

  // Code examples
  installCode = `npm install @muxima-ui/breadcrumb`;

  importCode = `import { BreadcrumbComponent } from '@muxima-ui/breadcrumb';

@Component({
  standalone: true,
  imports: [BreadcrumbComponent]
})`;

  basicCode = `<nav class="breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item" *ngFor="let item of breadcrumbs; let last = last">
      <a *ngIf="!last" [href]="item.url" class="breadcrumb-link">
        {{ item.label }}
      </a>
      <span *ngIf="last" class="breadcrumb-current">
        {{ item.label }}
      </span>
      <span *ngIf="!last" class="breadcrumb-separator">/</span>
    </li>
  </ol>
</nav>

// TypeScript
breadcrumbs = [
  { label: 'Home', url: '/' },
  { label: 'Produtos', url: '/produtos' },
  { label: 'Notebook' }
];`;

  separatorsCode = `<!-- Separador Slash (/) -->
<span class="breadcrumb-separator">/</span>

<!-- Separador Chevron (›) -->
<span class="breadcrumb-separator">›</span>

<!-- Separador Arrow (→) -->
<span class="breadcrumb-separator">→</span>

<!-- Separador Dot (•) -->
<span class="breadcrumb-separator">•</span>`;

  stylesCode = `<!-- Dashboard Style -->
<nav class="breadcrumb breadcrumb-dashboard">
  <!-- conteúdo -->
</nav>

<!-- Admin Style -->
<nav class="breadcrumb breadcrumb-admin">
  <!-- conteúdo -->
</nav>

<!-- Minimal Style -->
<nav class="breadcrumb breadcrumb-minimal">
  <!-- conteúdo -->
</nav>`;

  responsiveCode = `// SCSS - Breadcrumb Responsivo
.breadcrumb {
  @media (max-width: 768px) {
    .breadcrumb-item {
      // Oculta itens intermediários
      &:not(:last-child):not(:first-child) {
        display: none;
      }
    }
  }
}`;

  collapsedCode = `// TypeScript - Breadcrumb Colapsado
collapseBreadcrumb(items: BreadcrumbItem[]) {
  if (items.length <= 3) return items;
  
  return [
    items[0],
    { label: '...', collapsed: true },
    ...items.slice(-2)
  ];
}`;

  copiedStates: { [key: string]: boolean } = {};

  copyCode(code: string, key: string = 'default'): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedStates[key] = true;
      setTimeout(() => {
        this.copiedStates[key] = false;
      }, 2000);
    });
  }

  isCopied(key: string = 'default'): boolean {
    return this.copiedStates[key] || false;
  }
}
