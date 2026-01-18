import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'muxima-doc-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doc-layout.component.html',
  styleUrls: ['./doc-layout.component.scss']
})
export class DocLayoutComponent {
  isSidebarOpen = true;
  
  navigation = [
    {
      section: 'Início',
      items: [
        { label: 'Bem-vindo', route: '/', icon: '🏠' },
        { label: 'Instalação', route: '/getting-started', icon: '📦' },
        { label: 'Temas', route: '/theming', icon: '🎨' }
      ]
    },
    {
      section: 'Componentes',
      items: [
        { label: 'Accordion', route: '/components/accordion', icon: '🎵' },
        { label: 'Alert', route: '/components/alert', icon: '🚨' },
        { label: 'Avatar', route: '/components/avatar', icon: '👤' },
        { label: 'Badge', route: '/components/badge', icon: '🏷️' },
        { label: 'Breadcrumb', route: '/components/breadcrumb', icon: '🍞' },
        { label: 'Button', route: '/components/button', icon: '🔘' },
        { label: 'Card', route: '/components/card', icon: '🎴' },
        { label: 'Carousel', route: '/components/carousel', icon: '🎠' },
        { label: 'Chart', route: '/components/chart', icon: '📈' },
        { label: 'Checkbox', route: '/components/checkbox', icon: '☑️' },
        { label: 'Chip', route: '/components/chip', icon: '🏷️' },
        { label: 'Data Table', route: '/components/data-table', icon: '📊' },
        { label: 'Datepicker', route: '/components/datepicker', icon: '📅' },
        { label: 'Document Viewer', route: '/components/document-viewer', icon: '📄' },
        { label: 'File Upload', route: '/components/file-upload', icon: '📤' },
        { label: 'Input', route: '/components/input', icon: '📝' },
        { label: 'Language Selector', route: '/components/language-selector', icon: '🌍' },
        { label: 'Loading', route: '/components/loading', icon: '⏳' },
        { label: 'Navbar', route: '/components/navbar', icon: '🧭' },
        { label: 'Pagination', route: '/components/pagination', icon: '📄' },
        { label: 'Progress', route: '/components/progress', icon: '📊' },
        { label: 'Quill Editor', route: '/components/quill-editor', icon: '✍️' },
        { label: 'Radio Button', route: '/components/radio', icon: '🔘' },
        { label: 'Rich Text Editor', route: '/components/rich-text-editor', icon: '✍️' },
        { label: 'Search Bar', route: '/components/search-bar', icon: '🔍' },
        { label: 'Select', route: '/components/select', icon: '📋' },
        { label: 'Sidebar', route: '/components/sidebar', icon: '🗂️' },
        { label: 'Skeleton', route: '/components/skeleton', icon: '💀' },
        { label: 'Stats Card', route: '/components/stats-card', icon: '📊' },
        { label: 'Stepper', route: '/components/stepper', icon: '📝' },
        { label: 'Table', route: '/components/table', icon: '📊' },
        { label: 'Tabs', route: '/components/tabs', icon: '📑' },
        { label: 'Timeline', route: '/components/timeline', icon: '⏱️' },
        { label: 'Toast', route: '/components/toast', icon: '🍞' },
        { label: 'Toggle', route: '/components/toggle', icon: '🎯' },
        { label: 'Tooltip', route: '/components/tooltip', icon: '💬' },
        { label: 'Tree View', route: '/components/tree-view', icon: '🌳' },
        { label: 'User Profile Menu', route: '/components/user-profile-menu', icon: '👤' },
        { label: 'Kanban Board', route: '/components/kanban', icon: '📋' },
        { label: 'Command Palette', route: '/components/command-palette', icon: '⌨️' }
      ]
    }
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
