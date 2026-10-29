import { CatalogItem, NavGroup } from '../../data/site';
import { BLOCKS } from '../blocks/registry';

export { LINKS } from '../../data/site';
export type { CatalogCategory, CatalogItem, NavGroup, NavItem } from '../../data/site';

export const TOP_NAV = [
  { label: 'Home', path: '/', exact: true },
  { label: 'Components', path: '/components', exact: false },
  { label: 'Blocks', path: '/blocks', exact: false },
  { label: 'Docs', path: '/docs', exact: false },
  { label: 'Templates', path: '/templates', exact: false },
  { label: 'Pricing', path: '/pricing', exact: false },
  { label: 'Consulting', path: '/consulting', exact: false },
  { label: 'Changelog', path: '/changelog', exact: false },
];

export const CATEGORIES = ['Forms', 'Data', 'Navigation', 'Overlay', 'Feedback'];

const c = (name: string, description: string, icon: string, category: string, slug?: string): CatalogItem => ({
  name,
  description,
  icon,
  category,
  tier: 'Core',
  path: slug ? `/components/${slug}` : undefined,
});

export const CATALOG: CatalogItem[] = [
  // Forms
  c('Button', 'Consistent actions and states.', 'box', 'Forms', 'button'),
  c('Input', 'Label, help text, validation and states.', 'file', 'Forms', 'input'),
  c('Textarea', 'Long text, with automatic height.', 'textarea', 'Forms', 'textarea'),
  c('Select', 'Single choice with keyboard and type-ahead.', 'check', 'Forms', 'select'),
  c('Checkbox', 'Independent choices and an indeterminate state.', 'checkbox', 'Forms', 'checkbox'),
  c('Radio', 'One choice among a few visible options.', 'radio', 'Forms', 'radio'),
  c('Switch', 'On and off, with immediate effect.', 'toggle', 'Forms', 'switch'),
  c('Slider', 'A number within a range.', 'sliders', 'Forms', 'slider'),
  c('Combobox', 'Type to filter and choose.', 'combobox', 'Forms', 'combobox'),
  c('Multi-select', 'Several choices from a list.', 'checkbox', 'Forms', 'multi-select'),
  c('Date picker', 'Choose dates with the keyboard.', 'calendar', 'Forms', 'date-picker'),
  c('Date range picker', 'A period with start, end and shortcuts.', 'calendar', 'Forms', 'date-range-picker'),
  c('Time picker', 'Choose hours and minutes.', 'clock', 'Forms', 'time-picker'),
  c('OTP input', 'One-time codes (OTP).', 'key', 'Forms', 'otp-input'),
  c('Chips', 'Tags, filters and a tag input.', 'chips', 'Forms', 'chips'),
  c('File upload', 'Drag or choose files, with validation.', 'upload', 'Forms', 'file-upload'),
  c('Rating', 'Star rating.', 'star', 'Forms', 'rating'),
  c('Copy to clipboard', 'Copy a value with one click.', 'copy', 'Forms', 'copy-to-clipboard'),
  c('Color picker', 'Color with keyboard, formats and swatches.', 'palette', 'Forms', 'color-picker'),
  c('Image cropper', 'Crop and rotate images before uploading.', 'crop', 'Forms', 'image-cropper'),
  c('Rich text editor', 'Text with formatting, lists and links.', 'editor', 'Forms', 'rich-text-editor'),
  // Data
  c('Table', 'Tabular data with sorting.', 'table', 'Data', 'table'),
  c('Card', 'Surfaces that group content.', 'card', 'Data', 'card'),
  c('Badge', 'States and categories in short text.', 'tag', 'Data', 'badge'),
  c('Avatar', 'Photo or initials.', 'user', 'Data', 'avatar'),
  c('Separator', 'Dividing lines.', 'minus', 'Data', 'separator'),
  c('Timeline', 'Events in order.', 'timeline', 'Data', 'timeline'),
  c('Carousel', 'Content shown in slides.', 'carousel', 'Data', 'carousel'),
  c('Data grid', 'Resizable and pinned columns, filters and virtual scroll.', 'table', 'Data', 'data-grid'),
  c('Kanban', 'Cards in columns, with drag and drop.', 'kanban', 'Data', 'kanban'),
  // Navigation
  c('Tabs', 'Content split into sections.', 'tabs', 'Navigation', 'tabs'),
  c('Breadcrumb', 'Where you are in the hierarchy.', 'crumbs', 'Navigation', 'breadcrumb'),
  c('Pagination', 'Move between pages of results.', 'pages', 'Navigation', 'pagination'),
  c('Accordion', 'Sections that open and close.', 'accordion', 'Navigation', 'accordion'),
  c('Stepper', 'Progress through a multi-step flow.', 'steps', 'Navigation', 'stepper'),
  c('Command Palette', 'Search and navigate with the keyboard.', 'search', 'Navigation', 'command-palette'),
  c('Sidebar', 'Side navigation that collapses.', 'sidebar', 'Navigation', 'sidebar'),
  // Overlay
  c('Dialog', 'Confirmations and modal flows.', 'grid', 'Overlay', 'dialog'),
  c('Drawer', 'A dialog that slides in from the side.', 'drawer', 'Overlay', 'drawer'),
  c('Dropdown menu', 'A list of actions behind a button.', 'menu', 'Overlay', 'dropdown-menu'),
  c('Popover', 'Floating content next to an element.', 'popover', 'Overlay', 'popover'),
  c('Tooltip', 'Short text on hover or focus.', 'tooltip', 'Overlay', 'tooltip'),
  c('Tour guide', 'A guided tour that highlights parts of the screen.', 'tour', 'Overlay', 'tour-guide'),
  // Feedback
  c('Alert', 'Highlighted messages on the page.', 'alert', 'Feedback', 'alert'),
  c('Progress', 'Bars and a waiting indicator.', 'progress', 'Feedback', 'progress'),
  c('Skeleton', 'A placeholder while content loads.', 'skeleton', 'Feedback', 'skeleton'),
  c('Toast', 'Temporary notices (toast).', 'bell', 'Feedback', 'toast'),
  c('Notification center', 'A list of read and unread notifications.', 'bell', 'Feedback', 'notification-center'),
];

/** Sidebar: Get started, components by category, blocks and Pro templates. */
export const SIDEBAR: NavGroup[] = [
  {
    title: 'Get started',
    items: [
      { label: 'Introduction', path: '/docs/introduction', icon: 'message' },
      { label: 'Installation', path: '/docs/installation', icon: 'terminal' },
      { label: 'Theming', path: '/docs/theming', icon: 'sliders' },
      { label: 'Dark mode', path: '/docs/dark-mode', icon: 'moon' },
      { label: 'Languages', path: '/docs/languages', icon: 'globe' },
      { label: 'Quality standard', path: '/docs/quality-standard', icon: 'quality' },
    ],
  },
  ...CATEGORIES.map((category) => ({
    title: category,
    items: CATALOG.filter((i) => i.tier === 'Core' && i.category === category && i.path).map((i) => ({
      label: i.name,
      path: i.path!,
      icon: i.icon,
    })),
  })).filter((g) => g.items.length > 0),
  {
    title: 'Blocks',
    items: [
      { label: 'All blocks', path: '/blocks', icon: 'layers' },
      ...BLOCKS.map((b) => ({ label: b.name, path: `/blocks/${b.slug}`, icon: b.icon })),
    ],
  },
  {
    title: 'Templates',
    items: [
      { label: 'Dashboards', path: '/templates', icon: 'grid', pro: true, query: { category: 'Dashboards' } },
      { label: 'Authentication', path: '/templates', icon: 'shield', pro: true, query: { category: 'Authentication' } },
      { label: 'Customer management', path: '/templates', icon: 'users', pro: true, query: { category: 'Management' } },
    ],
  },
];
