import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlertDocComponent } from './pages/components/alert-doc.component';
import { ProgressDocComponent } from './pages/components/progress-doc.component';
import { ToggleDocComponent } from './pages/components/toggle-doc.component';
import { ButtonDocComponent } from './pages/components/button-doc.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'components/alert',
    component: AlertDocComponent
  },
  {
    path: 'components/avatar',
    loadComponent: () => import('./pages/components/avatar-doc.component').then(m => m.AvatarDocComponent)
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./pages/components/badge-doc.component').then(m => m.BadgeDocComponent)
  },
  {
    path: 'components/button',
    component: ButtonDocComponent
  },
  {
    path: 'components/card',
    loadComponent: () => import('./pages/components/card-doc.component').then(m => m.CardDocComponent)
  },
  {
    path: 'components/carousel',
    loadComponent: () => import('./pages/components/carousel-doc.component').then(m => m.CarouselDocComponent)
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./pages/components/checkbox-doc.component').then(m => m.CheckboxDocComponent)
  },
  {
    path: 'components/datepicker',
    loadComponent: () => import('./pages/components/datepicker-doc.component').then(m => m.DatepickerDocComponent)
  },
  {
    path: 'components/document-viewer',
    loadComponent: () => import('./pages/components/document-viewer-doc.component').then(m => m.DocumentViewerDocComponent)
  },
  {
    path: 'components/file-upload',
    loadComponent: () => import('./pages/components/file-upload-doc.component').then(m => m.FileUploadDocComponent)
  },
  {
    path: 'components/input',
    loadComponent: () => import('./pages/components/input-doc.component').then(m => m.InputDocComponent)
  },
  {
    path: 'components/loading',
    loadComponent: () => import('./pages/components/loading-doc.component').then(m => m.LoadingDocComponent)
  },
  {
    path: 'components/navbar',
    loadComponent: () => import('./pages/components/navbar-doc.component').then(m => m.NavbarDocComponent)
  },
  {
    path: 'components/progress',
    component: ProgressDocComponent
  },
  {
    path: 'components/radio',
    loadComponent: () => import('./pages/components/radio-button-doc.component').then(m => m.RadioButtonDocComponent)
  },
  {
    path: 'components/select',
    loadComponent: () => import('./pages/components/select-doc.component').then(m => m.SelectDocComponent)
  },
  {
    path: 'components/sidebar',
    loadComponent: () => import('./pages/components/sidebar-doc.component').then(m => m.SidebarDocComponent)
  },
  {
    path: 'components/stats-card',
    loadComponent: () => import('./pages/components/stats-card-doc.component').then(m => m.StatsCardDocComponent)
  },
  {
    path: 'components/search-bar',
    loadComponent: () => import('./pages/components/search-bar-doc.component').then(m => m.SearchBarDocComponent)
  },
  {
    path: 'components/user-profile-menu',
    loadComponent: () => import('./pages/components/user-profile-menu-doc.component').then(m => m.UserProfileMenuDocComponent)
  },
  {
    path: 'components/chart',
    loadComponent: () => import('./pages/components/chart-doc.component').then(m => m.ChartDocComponent)
  },
  {
    path: 'components/language-selector',
    loadComponent: () => import('./pages/components/language-selector-doc.component').then(m => m.LanguageSelectorDocComponent)
  },
  {
    path: 'components/stepper',
    loadComponent: () => import('./pages/components/stepper-doc.component').then(m => m.StepperDocComponent)
  },
  {
    path: 'components/table',
    loadComponent: () => import('./pages/components/table-doc.component').then(m => m.TableDocComponent)
  },
  {
    path: 'components/timeline',
    loadComponent: () => import('./pages/components/timeline-doc.component').then(m => m.TimelineDocComponent)
  },
  {
    path: 'components/toggle',
    component: ToggleDocComponent
  },
  {
    path: 'components/accordion',
    loadComponent: () => import('./pages/components/accordion-doc.component').then(m => m.AccordionDocComponent)
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () => import('./pages/components/breadcrumb-doc.component').then(m => m.BreadcrumbDocComponent)
  },
  {
    path: 'components/chip',
    loadComponent: () => import('./pages/components/chip-doc.component').then(m => m.ChipDocComponent)
  },
  {
    path: 'components/pagination',
    loadComponent: () => import('./pages/components/pagination-doc.component').then(m => m.PaginationDocComponent)
  },
  {
    path: 'components/tabs',
    loadComponent: () => import('./pages/components/tabs-doc.component').then(m => m.TabsDocComponent)
  },
  {
    path: 'components/toast',
    loadComponent: () => import('./pages/components/toast-doc.component').then(m => m.ToastDocComponent)
  },
  {
    path: 'components/tooltip',
    loadComponent: () => import('./pages/components/tooltip-doc.component').then(m => m.TooltipDocComponent)
  },
  {
    path: 'components/tree-view',
    loadComponent: () => import('./pages/components/tree-view-doc.component').then(m => m.TreeViewDocComponent)
  },
  {
    path: 'components/skeleton',
    loadComponent: () => import('./pages/components/skeleton-doc.component').then(m => m.SkeletonDocComponent)
  },
  {
    path: 'components/rich-text-editor',
    loadComponent: () => import('./pages/components/rich-text-editor-doc.component').then(m => m.RichTextEditorDocComponent)
  },
  {
    path: 'components/data-table',
    loadComponent: () => import('./pages/components/data-table-doc.component').then(m => m.DataTableDocComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
