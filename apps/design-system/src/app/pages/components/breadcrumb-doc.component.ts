import { Component, OnInit } from '@angular/core';
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
export class BreadcrumbDocComponent implements OnInit {
  // Basic breadcrumbs
  basicBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/', icon: '🏠' },
    { label: 'Produtos', url: '/produtos', icon: '📦' },
    { label: 'Eletrônicos', url: '/produtos/eletronicos', icon: '💻' },
    { label: 'Notebook' }
  ];

  // Dashboard breadcrumbs
  dashboardBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard', icon: '📊' },
    { label: 'Relatórios', url: '/dashboard/relatorios', icon: '📈' },
    { label: 'Vendas' }
  ];

  // Admin breadcrumbs
  adminBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Admin', url: '/admin', icon: '⚙️' },
    { label: 'Usuários', url: '/admin/usuarios', icon: '👥' },
    { label: 'Perfil', url: '/admin/usuarios/perfil', icon: '👤' },
    { label: 'Editar' }
  ];

  // E-commerce breadcrumbs
  ecommerceBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Loja', url: '/', icon: '🛍️' },
    { label: 'Moda', url: '/moda', icon: '👔' },
    { label: 'Masculino', url: '/moda/masculino', icon: '👨' },
    { label: 'Camisetas', url: '/moda/masculino/camisetas', icon: '👕' },
    { label: 'Camiseta Premium' }
  ];

  // Documentation breadcrumbs
  docsBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Docs', url: '/docs', icon: '📚' },
    { label: 'Componentes', url: '/docs/components', icon: '🧩' },
    { label: 'Navegação', url: '/docs/components/navigation', icon: '🧭' },
    { label: 'Breadcrumb' }
  ];

  // File system breadcrumbs
  fileSystemBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Root', url: '/', icon: '💾' },
    { label: 'Documentos', url: '/documentos', icon: '📁' },
    { label: 'Projetos', url: '/documentos/projetos', icon: '📂' },
    { label: 'Angular', url: '/documentos/projetos/angular', icon: '🅰️' },
    { label: 'src', url: '/documentos/projetos/angular/src', icon: '📄' },
    { label: 'app' }
  ];

  // Settings breadcrumbs
  settingsBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Configurações', url: '/settings', icon: '⚙️' },
    { label: 'Conta', url: '/settings/account', icon: '👤' },
    { label: 'Segurança' }
  ];

  // Blog breadcrumbs
  blogBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog', icon: '✍️' },
    { label: 'Tecnologia', url: '/blog/tecnologia', icon: '💻' },
    { label: 'Angular 17: Novidades' }
  ];

  codeExamples = {
    basic: { code: '', copied: false },
    withIcons: { code: '', copied: false },
    separators: { code: '', copied: false },
    responsive: { code: '', copied: false },
    collapsed: { code: '', copied: false }
  };

  ngOnInit() {
    this.initializeCodeExamples();
  }

  initializeCodeExamples() {
    this.codeExamples.basic.code = `<nav class="breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item" *ngFor="let item of breadcrumbs; let last = last">
      <a *ngIf="!last && item.url" [href]="item.url" class="breadcrumb-link">
        {{ item.label }}
      </a>
      <span *ngIf="last" class="breadcrumb-current">
        {{ item.label }}
      </span>
      <span *ngIf="!last" class="breadcrumb-separator">/</span>
    </li>
  </ol>
</nav>`;

    this.codeExamples.withIcons.code = `<nav class="breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item" *ngFor="let item of breadcrumbs; let last = last">
      <a *ngIf="!last && item.url" [href]="item.url" class="breadcrumb-link">
        <span *ngIf="item.icon" class="breadcrumb-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </a>
      <span *ngIf="last" class="breadcrumb-current">
        <span *ngIf="item.icon" class="breadcrumb-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </span>
      <span *ngIf="!last" class="breadcrumb-separator">/</span>
    </li>
  </ol>
</nav>`;

    this.codeExamples.separators.code = `<!-- Separador "/" -->
<span class="breadcrumb-separator">/</span>

<!-- Separador "›" -->
<span class="breadcrumb-separator">›</span>

<!-- Separador "→" -->
<span class="breadcrumb-separator">→</span>

<!-- Separador "•" -->
<span class="breadcrumb-separator">•</span>`;

    this.codeExamples.responsive.code = `// SCSS - Breadcrumb Responsivo
.breadcrumb {
  @media (max-width: 768px) {
    .breadcrumb-item {
      &:not(:last-child):not(:first-child) {
        display: none; // Oculta itens intermediários
      }
    }
    
    .breadcrumb-separator {
      &:nth-last-child(2) {
        content: '...'; // Mostra reticências
      }
    }
  }
}`;

    this.codeExamples.collapsed.code = `<!-- TypeScript -->
collapseBreadcrumb(items: BreadcrumbItem[]) {
  if (items.length <= 3) return items;
  
  return [
    items[0],
    { label: '...', collapsed: true },
    ...items.slice(-2)
  ];
}`;
  }

  copyCode(example: keyof typeof this.codeExamples) {
    const codeExample = this.codeExamples[example];
    navigator.clipboard.writeText(codeExample.code);
    codeExample.copied = true;
    setTimeout(() => codeExample.copied = false, 2000);
  }

  get importCode(): string {
    return `import { BreadcrumbComponent } from '@muxima-ui/breadcrumb';

@Component({
  standalone: true,
  imports: [BreadcrumbComponent],
  // ...
})`;
  }
}
