import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlertDocComponent } from './pages/components/alert-doc.component';
import { ProgressDocComponent } from './pages/components/progress-doc.component';
import { ToggleDocComponent } from './pages/components/toggle-doc.component';
import { ButtonDocComponent } from './pages/components/button-doc.component';
import { DocLayoutComponent } from './shared/doc-layout.component';

export const routes: Routes = [
  // Template Routes (Standalone - Sem DocLayout)
  {
    path: 'templates/dashboard',
    loadComponent: () => import('./pages/templates/dashboard-template.component').then(m => m.DashboardTemplateComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./pages/dashboard/dashboard-overview.component').then(m => m.DashboardOverviewComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./pages/dashboard/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'revenue',
        loadComponent: () => import('./pages/dashboard/revenue.component').then(m => m.RevenueComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/dashboard/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/dashboard/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/dashboard/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: 'payments',
        loadComponent: () => import('./pages/dashboard/payments.component').then(m => m.PaymentsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/dashboard/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'security',
        loadComponent: () => import('./pages/dashboard/security.component').then(m => m.SecurityComponent)
      }
    ]
  },
  {
    path: 'templates/signin',
    loadComponent: () => import('./pages/templates/signin-template.component').then(m => m.SignInTemplateComponent)
  },
  {
    path: 'templates/signup',
    loadComponent: () => import('./pages/templates/signup-template.component').then(m => m.SignUpTemplateComponent)
  },
  {
    path: 'templates/ecommerce',
    loadComponent: () => import('./pages/templates/ecommerce-landing.component').then(m => m.EcommerceLandingComponent)
  },
  {
    path: 'templates/saas',
    loadComponent: () => import('./pages/templates/saas-landing.component').then(m => m.SaasLandingComponent)
  },
  // Documentation Routes (Com DocLayout)
  {
    path: '',
    component: DocLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'getting-started',
        loadComponent: () => import('./pages/getting-started.component').then(m => m.GettingStartedComponent)
      },
      {
        path: 'theming',
        loadComponent: () => import('./pages/theming.component').then(m => m.ThemingComponent)
      },
      {
        path: 'templates',
        loadComponent: () => import('./pages/templates.component').then(m => m.TemplatesComponent)
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
    path: 'components/quill-editor',
    loadComponent: () => import('./pages/components/quill-editor-doc.component').then(m => m.QuillEditorDocComponent)
  },
  {
    path: 'components/kanban',
    loadComponent: () => import('./pages/components/kanban-doc.component').then(m => m.KanbanDocComponent)
  },
  {
    path: 'components/command-palette',
    loadComponent: () => import('./pages/components/command-palette-doc.component').then(m => m.CommandPaletteDocComponent)
  },
  {
    path: 'components/gantt-chart',
    loadComponent: () => import('./pages/components/gantt-chart-doc.component').then(m => m.GanttChartDocComponent)
  },
  {
    path: 'components/tour-guide',
    loadComponent: () => import('./pages/components/tour-guide-doc.component').then(m => m.TourGuideDocComponent)
  },
  {
    path: 'components/calendar',
    loadComponent: () => import('./pages/components/calendar-doc.component').then(m => m.CalendarDocComponent)
  },
  {
    path: 'components/file-manager',
    loadComponent: () => import('./pages/components/file-manager-doc.component').then(m => m.FileManagerDocComponent)
  },
  {
    path: 'components/otp-input',
    loadComponent: () => import('./pages/components/otp-input-doc.component').then(m => m.OtpInputDocComponent)
  },
  {
    path: 'components/star-rating',
    loadComponent: () => import('./pages/components/star-rating-doc.component').then(m => m.StarRatingDocComponent)
  },
  {
    path: 'components/credit-card',
    loadComponent: () => import('./pages/components/credit-card-doc.component').then(m => m.CreditCardDocComponent)
  },
  {
    path: 'components/color-picker',
    loadComponent: () => import('./pages/components/color-picker-doc.component').then(m => m.ColorPickerDocComponent)
  },
  {
    path: 'components/shopping-cart',
    loadComponent: () => import('./pages/components/shopping-cart-doc.component').then(m => m.ShoppingCartDocComponent)
  },
  {
    path: 'components/copy-to-clipboard',
    loadComponent: () => import('./pages/components/copy-to-clipboard-doc.component').then(m => m.CopyToClipboardDocComponent)
  },
  {
    path: 'components/comments',
    loadComponent: () => import('./pages/components/comments-doc.component').then(m => m.CommentsDocComponent)
  },
  {
    path: 'components/image-cropper',
    loadComponent: () => import('./pages/components/image-cropper-doc.component').then(m => m.ImageCropperDocComponent)
  },
  {
    path: 'components/video-player',
    loadComponent: () => import('./pages/components/video-player-doc.component').then(m => m.VideoPlayerDocComponent)
  },
  {
    path: 'components/notification-center',
    loadComponent: () => import('./pages/components/notification-center-doc.component').then(m => m.NotificationCenterDocComponent)
  },
  {
    path: 'components/autocomplete',
    loadComponent: () => import('./pages/autocomplete-doc.component').then(m => m.AutocompleteDocComponent)
  },
  {
    path: 'components/multi-select',
    loadComponent: () => import('./pages/multi-select-doc.component').then(m => m.MultiSelectDocComponent)
  },
  {
    path: 'components/drawer',
    loadComponent: () => import('./pages/drawer-doc.component').then(m => m.DrawerDocComponent)
  },
  {
    path: 'components/confirmation-dialog',
    loadComponent: () => import('./pages/confirmation-dialog-doc.component').then(m => m.ConfirmationDialogDocComponent)
  },
  {
    path: 'components/date-range-picker',
    loadComponent: () => import('./pages/date-range-picker-doc.component').then(m => m.DateRangePickerDocComponent)
  },
  {
    path: 'components/slider-range',
    loadComponent: () => import('./pages/slider-range-doc.component').then(m => m.SliderRangeDocComponent)
  },
  {
    path: 'components/smart-form-builder',
    loadComponent: () => import('./pages/smart-form-builder-doc.component').then(m => m.SmartFormBuilderDocComponent)
  },
  {
    path: 'components/signature-pad',
    loadComponent: () => import('./pages/signature-pad-doc.component').then(m => m.SignaturePadDocComponent)
  },
  {
    path: 'components/voice-command',
    loadComponent: () => import('./pages/voice-command-doc.component').then(m => m.VoiceCommandDocComponent)
  },
  {
    path: 'components/code-diff-viewer',
    loadComponent: () => import('./pages/code-diff-viewer-doc.component').then(m => m.CodeDiffViewerDocComponent)
  },
  {
    path: 'components/gesture-controller',
    loadComponent: () => import('./pages/gesture-controller-doc.component').then(m => m.GestureControllerDocComponent)
  },
  {
    path: 'components/virtual-keyboard',
    loadComponent: () => import('./pages/virtual-keyboard-doc.component').then(m => m.VirtualKeyboardDocComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
