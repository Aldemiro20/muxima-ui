import { Routes } from '@angular/router';

// Páginas em inglês (na raiz do site). Gerado a partir de routes-pt.ts: as páginas que
// ainda não têm versão em en/pages usam a portuguesa.

/** Pré-visualização de um bloco, sem cabeçalho nem rodapé. */
export const EN_BARE: Routes = [
  { path: 'blocks/view/:id', title: 'Block · Muxima UI', loadComponent: () => import('./en/pages/bloco-ver').then((m) => m.BlocoVerPage) },
];

/** Páginas sem barra lateral. */
export const EN_PLAIN: Routes = [
  { path: '', pathMatch: 'full', title: 'Muxima UI — Accessible Angular components', loadComponent: () => import('./en/pages/home').then((m) => m.HomePage) },
  { path: 'pricing', title: 'Pricing · Muxima UI', loadComponent: () => import('./en/pages/precos').then((m) => m.PrecosPage) },
  { path: 'consulting', title: 'Consulting · Muxima UI', loadComponent: () => import('./en/pages/consultoria').then((m) => m.ConsultoriaPage) },
  { path: 'changelog', title: 'Changelog · Muxima UI', loadComponent: () => import('./en/pages/changelog').then((m) => m.ChangelogPage) },
];

/** Páginas com a barra lateral da documentação. */
export const EN_LAYOUT: Routes = [
  { path: 'docs', pathMatch: 'full', redirectTo: 'docs/introduction' },
  { path: 'docs/introduction', title: 'Introduction · Muxima UI', loadComponent: () => import('./en/pages/introducao').then((m) => m.IntroducaoPage) },
  { path: 'docs/installation', title: 'Installation · Muxima UI', loadComponent: () => import('./en/pages/instalacao').then((m) => m.InstalacaoPage) },
  { path: 'docs/theming', title: 'Theming · Muxima UI', loadComponent: () => import('./en/pages/temas').then((m) => m.TemasPage) },
  { path: 'docs/dark-mode', title: 'Dark mode · Muxima UI', loadComponent: () => import('./en/pages/modo-escuro').then((m) => m.ModoEscuroPage) },
  { path: 'docs/languages', title: 'Languages · Muxima UI', loadComponent: () => import('./en/pages/idiomas').then((m) => m.IdiomasPage) },
  { path: 'docs/quality-standard', title: 'Quality standard · Muxima UI', loadComponent: () => import('./en/pages/padrao').then((m) => m.PadraoPage) },
  { path: 'components', title: 'Components · Muxima UI', loadComponent: () => import('./en/pages/componentes').then((m) => m.ComponentesPage) },
  { path: 'components/button', title: 'Button · Muxima UI', loadComponent: () => import('./en/pages/components/button').then((m) => m.ButtonPage) },
  { path: 'components/input', title: 'Input · Muxima UI', loadComponent: () => import('./en/pages/components/input').then((m) => m.InputPage) },
  { path: 'components/select', title: 'Select · Muxima UI', loadComponent: () => import('./en/pages/components/select').then((m) => m.SelectPage) },
  { path: 'components/dialog', title: 'Dialog · Muxima UI', loadComponent: () => import('./en/pages/components/dialog').then((m) => m.DialogPage) },
  { path: 'components/tabs', title: 'Tabs · Muxima UI', loadComponent: () => import('./en/pages/components/tabs').then((m) => m.TabsPage) },
  { path: 'components/table', title: 'Table · Muxima UI', loadComponent: () => import('./en/pages/components/table').then((m) => m.TablePage) },
  { path: 'components/textarea', title: 'Textarea · Muxima UI', loadComponent: () => import('./en/pages/components/textarea').then((m) => m.TextareaPage) },
  { path: 'components/checkbox', title: 'Checkbox · Muxima UI', loadComponent: () => import('./en/pages/components/checkbox').then((m) => m.CheckboxPage) },
  { path: 'components/radio', title: 'Radio · Muxima UI', loadComponent: () => import('./en/pages/components/radio').then((m) => m.RadioPage) },
  { path: 'components/switch', title: 'Switch · Muxima UI', loadComponent: () => import('./en/pages/components/switch').then((m) => m.SwitchPage) },
  { path: 'components/slider', title: 'Slider · Muxima UI', loadComponent: () => import('./en/pages/components/slider').then((m) => m.SliderPage) },
  { path: 'components/badge', title: 'Badge · Muxima UI', loadComponent: () => import('./en/pages/components/badge').then((m) => m.BadgePage) },
  { path: 'components/card', title: 'Card · Muxima UI', loadComponent: () => import('./en/pages/components/card').then((m) => m.CardPage) },
  { path: 'components/alert', title: 'Alert · Muxima UI', loadComponent: () => import('./en/pages/components/alert').then((m) => m.AlertPage) },
  { path: 'components/separator', title: 'Separator · Muxima UI', loadComponent: () => import('./en/pages/components/separator').then((m) => m.SeparatorPage) },
  { path: 'components/avatar', title: 'Avatar · Muxima UI', loadComponent: () => import('./en/pages/components/avatar').then((m) => m.AvatarPage) },
  { path: 'components/skeleton', title: 'Skeleton · Muxima UI', loadComponent: () => import('./en/pages/components/skeleton').then((m) => m.SkeletonPage) },
  { path: 'components/progress', title: 'Progress · Muxima UI', loadComponent: () => import('./en/pages/components/progress').then((m) => m.ProgressPage) },
  { path: 'components/tooltip', title: 'Tooltip · Muxima UI', loadComponent: () => import('./en/pages/components/tooltip').then((m) => m.TooltipPage) },
  { path: 'components/tour-guide', title: 'Tour guide · Muxima UI', loadComponent: () => import('./en/pages/components/tour').then((m) => m.TourPage) },
  { path: 'components/popover', title: 'Popover · Muxima UI', loadComponent: () => import('./en/pages/components/popover').then((m) => m.PopoverPage) },
  { path: 'components/dropdown-menu', title: 'Dropdown menu · Muxima UI', loadComponent: () => import('./en/pages/components/dropdown-menu').then((m) => m.DropdownMenuPage) },
  { path: 'components/drawer', title: 'Drawer · Muxima UI', loadComponent: () => import('./en/pages/components/drawer').then((m) => m.DrawerPage) },
  { path: 'components/toast', title: 'Toast · Muxima UI', loadComponent: () => import('./en/pages/components/toast').then((m) => m.ToastPage) },
  { path: 'components/accordion', title: 'Accordion · Muxima UI', loadComponent: () => import('./en/pages/components/accordion').then((m) => m.AccordionPage) },
  { path: 'components/breadcrumb', title: 'Breadcrumb · Muxima UI', loadComponent: () => import('./en/pages/components/breadcrumb').then((m) => m.BreadcrumbPage) },
  { path: 'components/pagination', title: 'Pagination · Muxima UI', loadComponent: () => import('./en/pages/components/pagination').then((m) => m.PaginationPage) },
  { path: 'components/combobox', title: 'Combobox · Muxima UI', loadComponent: () => import('./en/pages/components/combobox').then((m) => m.ComboboxPage) },
  { path: 'components/multi-select', title: 'Multi-select · Muxima UI', loadComponent: () => import('./en/pages/components/multi-select').then((m) => m.MultiSelectPage) },
  { path: 'components/date-picker', title: 'Date picker · Muxima UI', loadComponent: () => import('./en/pages/components/date-picker').then((m) => m.DatePickerPage) },
  { path: 'components/time-picker', title: 'Time picker · Muxima UI', loadComponent: () => import('./en/pages/components/time-picker').then((m) => m.TimePickerPage) },
  { path: 'components/otp-input', title: 'OTP input · Muxima UI', loadComponent: () => import('./en/pages/components/otp-input').then((m) => m.OtpPage) },
  { path: 'components/stepper', title: 'Stepper · Muxima UI', loadComponent: () => import('./en/pages/components/stepper').then((m) => m.StepperPage) },
  { path: 'components/date-range-picker', title: 'Date range picker · Muxima UI', loadComponent: () => import('./en/pages/components/date-range-picker').then((m) => m.DateRangePickerPage) },
  { path: 'components/chips', title: 'Chips · Muxima UI', loadComponent: () => import('./en/pages/components/chips').then((m) => m.ChipsPage) },
  { path: 'components/file-upload', title: 'File upload · Muxima UI', loadComponent: () => import('./en/pages/components/file-upload').then((m) => m.FileUploadPage) },
  { path: 'components/rating', title: 'Rating · Muxima UI', loadComponent: () => import('./en/pages/components/rating').then((m) => m.RatingPage) },
  { path: 'components/copy-to-clipboard', title: 'Copy to clipboard · Muxima UI', loadComponent: () => import('./en/pages/components/clipboard').then((m) => m.ClipboardPage) },
  { path: 'components/sidebar', title: 'Sidebar · Muxima UI', loadComponent: () => import('./en/pages/components/sidebar').then((m) => m.SidebarPage) },
  { path: 'components/timeline', title: 'Timeline · Muxima UI', loadComponent: () => import('./en/pages/components/timeline').then((m) => m.TimelinePage) },
  { path: 'components/notification-center', title: 'Notification center · Muxima UI', loadComponent: () => import('./en/pages/components/notification-center').then((m) => m.NotificationCenterPage) },
  { path: 'components/carousel', title: 'Carousel · Muxima UI', loadComponent: () => import('./en/pages/components/carousel').then((m) => m.CarouselPage) },
  { path: 'components/color-picker', title: 'Color picker · Muxima UI', loadComponent: () => import('./en/pages/components/color-picker').then((m) => m.ColorPickerPage) },
  { path: 'components/data-grid', title: 'Data grid · Muxima UI', loadComponent: () => import('./en/pages/components/data-grid').then((m) => m.DataGridPage) },
  { path: 'components/kanban', title: 'Kanban · Muxima UI', loadComponent: () => import('./en/pages/components/kanban').then((m) => m.KanbanPage) },
  { path: 'components/image-cropper', title: 'Image cropper · Muxima UI', loadComponent: () => import('./en/pages/components/image-cropper').then((m) => m.ImageCropperPage) },
  { path: 'components/rich-text-editor', title: 'Rich text editor · Muxima UI', loadComponent: () => import('./en/pages/components/editor').then((m) => m.EditorPage) },
  { path: 'components/command-palette', title: 'Command Palette · Muxima UI', loadComponent: () => import('./en/pages/components/command-palette').then((m) => m.CommandPalettePage) },
  { path: 'blocks', title: 'Blocks · Muxima UI', loadComponent: () => import('./en/pages/blocos').then((m) => m.BlocosPage) },
  { path: 'blocks/:category', title: 'Blocks · Muxima UI', loadComponent: () => import('./en/pages/bloco-categoria').then((m) => m.BlocoCategoriaPage) },
  { path: 'templates', title: 'Templates · Muxima UI', loadComponent: () => import('./en/pages/templates').then((m) => m.TemplatesPage) },
];
