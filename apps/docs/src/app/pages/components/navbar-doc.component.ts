import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarNavbarComponent, NavItem } from '@muxima-ui/navbar';

@Component({
  selector: 'app-navbar-doc',
  standalone: true,
  imports: [CommonModule, NavbarNavbarComponent],
  templateUrl: './navbar-doc.component.html',
  styleUrls: ['./navbar-doc.component.scss']
})
export class NavbarDocComponent {
  // Basic Navigation
  basicMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'About', route: '/about', icon: 'users' },
    { label: 'Services', route: '/services', icon: 'settings' },
    { label: 'Contact', route: '/contact', icon: 'mail' }
  ];

  // Dropdown Navigation
  dropdownMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: 'home' },
    { 
      label: 'Products', 
      icon: 'box',
      children: [
        { label: 'All Products', route: '/products' },
        { label: 'Electronics', route: '/products/electronics', icon: 'laptop' },
        { label: 'Clothing', route: '/products/clothing', icon: 'shirt' },
        { label: 'Books', route: '/products/books', icon: 'book' }
      ]
    },
    { 
      label: 'Resources', 
      icon: 'folder',
      children: [
        { label: 'Documentation', route: '/docs', icon: 'book' },
        { label: 'Blog', route: '/blog', icon: 'edit' },
        { label: 'FAQ', route: '/faq', icon: 'help' }
      ]
    },
    { label: 'Contact', route: '/contact', icon: 'mail' }
  ];

  // E-commerce Navigation
  ecommerceMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: 'home' },
    { 
      label: 'Shop', 
      icon: 'shopping',
      children: [
        { label: 'New Arrivals', route: '/shop/new', icon: 'star' },
        { label: 'Best Sellers', route: '/shop/bestsellers', icon: 'chart' },
        { label: 'On Sale', route: '/shop/sale', badge: '50%' },
        { label: 'Collections', route: '/shop/collections', icon: 'box' }
      ]
    },
    { 
      label: 'Categories', 
      icon: 'folder',
      children: [
        { label: 'Men', route: '/category/men', icon: 'user' },
        { label: 'Women', route: '/category/women', icon: 'user' },
        { label: 'Kids', route: '/category/kids', icon: 'user' },
        { label: 'Accessories', route: '/category/accessories', icon: 'shopping' }
      ]
    },
    { label: 'About', route: '/about', icon: 'briefcase' },
    { label: 'Cart', route: '/cart', icon: 'cart', badge: 3 }
  ];

  // Dashboard Navigation
  dashboardMenuItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'chart' },
    { label: 'Analytics', route: '/analytics', icon: 'chart' },
    { 
      label: 'Users', 
      icon: 'users',
      children: [
        { label: 'All Users', route: '/users', icon: 'users' },
        { label: 'Add User', route: '/users/add', icon: 'plus' },
        { label: 'Roles', route: '/users/roles', icon: 'lock' },
        { label: 'Permissions', route: '/users/permissions', icon: 'key' }
      ]
    },
    { 
      label: 'Settings', 
      icon: 'settings',
      children: [
        { label: 'Profile', route: '/settings/profile', icon: 'user' },
        { label: 'Preferences', route: '/settings/preferences', icon: 'palette' },
        { label: 'Security', route: '/settings/security', icon: 'lock' },
        { label: 'Notifications', route: '/settings/notifications', icon: 'bell' }
      ]
    }
  ];

  // Minimal/Compact Navigation
  minimalMenuItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Portfolio', route: '/portfolio' },
    { label: 'Contact', route: '/contact' }
  ];

  compactMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Products', route: '/products', icon: 'shopping' },
    { label: 'About', route: '/about', icon: 'info' }
  ];

  // Centered Navigation
  centeredMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Features', route: '/features', icon: 'star' },
    { label: 'Pricing', route: '/pricing' },
    { label: 'About', route: '/about', icon: 'info' }
  ];

  // Landing Page Navigation
  landingMenuItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Features', route: '/features' },
    { label: 'Pricing', route: '/pricing' },
    { label: 'Testimonials', route: '/testimonials' },
    { label: 'Contact', route: '/contact' }
  ];

  // Neon Style Navigation
  neonMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Games', route: '/games', icon: 'code' },
    { label: 'Leaderboard', route: '/leaderboard', icon: 'chart' },
    { label: 'Profile', route: '/profile', icon: 'user', badge: 'VIP' }
  ];

  // Glassmorphism Style Navigation
  glassmorphismMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Features', route: '/features', icon: 'star' },
    { label: 'Gallery', route: '/gallery', icon: 'folder' },
    { label: 'Contact', route: '/contact', icon: 'mail' }
  ];

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
      install: `npm install @muxima-ui/navbar`,
      
      import: `import { NavbarNavbarComponent, NavItem } from '@muxima-ui/navbar';

@Component({
  standalone: true,
  imports: [NavbarNavbarComponent]
})`,

      basic: `<muxima-navbar
  logo="Muxima"
  logoRoute="/"
  [menuItems]="menuItems"
></muxima-navbar>`,

      basicItems: `menuItems: NavItem[] = [
  { label: 'Home', route: '/', icon: 'home' },
  { label: 'About', route: '/about', icon: 'users' },
  { label: 'Services', route: '/services', icon: 'settings' },
  { label: 'Contact', route: '/contact', icon: 'mail' }
];`,

      dropdown: `<muxima-navbar
  logo="My Brand"
  [menuItems]="dropdownMenuItems"
  [fixed]="true"
></muxima-navbar>`,

      dropdownItems: `menuItems: NavItem[] = [
  { label: 'Home', route: '/', icon: 'home' },
  { 
    label: 'Products', 
    icon: 'box',
    children: [
      { label: 'All Products', route: '/products' },
      { label: 'Electronics', route: '/products/electronics', icon: 'laptop' },
      { label: 'Clothing', route: '/products/clothing', icon: 'shirt' }
    ]
  },
  { label: 'Contact', route: '/contact', icon: 'mail' }
];`,

      minimal: `<muxima-navbar
  logo="Brand"
  [menuItems]="minimalMenuItems"
  variant="minimal"
></muxima-navbar>`,

      centered: `<muxima-navbar
  logo="My Brand"
  [menuItems]="centeredMenuItems"
  variant="centered"
></muxima-navbar>`,

      dashboard: `<muxima-navbar
  logo="Admin Panel"
  [menuItems]="dashboardMenuItems"
  variant="dashboard"
  [fixed]="true"
></muxima-navbar>`,

      landing: `<muxima-navbar
  logo="Product"
  [menuItems]="landingMenuItems"
  variant="landing"
  [transparent]="true"
  [fixed]="true"
></muxima-navbar>`,

      ecommerce: `<muxima-navbar
  logo="Shop"
  [menuItems]="ecommerceMenuItems"
  variant="ecommerce"
  [showSearch]="true"
  [showNotifications]="true"
  [showProfile]="true"
  [notificationCount]="5"
></muxima-navbar>`,

      neon: `<muxima-navbar
  logo="CYBER"
  [menuItems]="neonMenuItems"
  variant="neon"
  [fixed]="true"
></muxima-navbar>`,

      glassmorphism: `<muxima-navbar
  logo="Glass UI"
  [menuItems]="glassmorphismMenuItems"
  variant="glassmorphism"
  [transparent]="true"
  [fixed]="true"
></muxima-navbar>`,

      scrollEffect: `// O navbar automaticamente adiciona efeito de scroll
// quando a página rola mais de 20px
// Muda de transparente para fundo sólido com sombra`,

      variants: `// Variantes disponíveis:
type NavbarVariant = 
  | 'default'        // Navbar padrão com design clean
  | 'minimal'        // Design minimalista sem sombras
  | 'centered'       // Logo e menu centralizados
  | 'dashboard'      // Estilo para painéis admin
  | 'landing'        // Otimizado para landing pages
  | 'ecommerce'      // Com busca, notificações e perfil
  | 'neon'          // Estilo cyberpunk com brilho neon
  | 'glassmorphism'; // Efeito de vidro com blur`,

      icons: `// Ícones SVG disponíveis (24 ícones):
const iconNames = [
  'home', 'user', 'users', 'settings', 'mail', 'box',
  'book', 'shopping', 'star', 'folder', 'chart', 'plus',
  'lock', 'key', 'bell', 'palette', 'code', 'laptop',
  'shirt', 'briefcase', 'cart', 'help', 'edit', 'info'
];

// Uso:
{ label: 'Home', route: '/', icon: 'home' }`,

      events: `<muxima-navbar
  [menuItems]="menuItems"
  (logoClicked)="onLogoClick()"
  (searchClicked)="onSearch()"
  (notificationClicked)="onNotification()"
  (profileClicked)="onProfile()"
></muxima-navbar>`,

      api: `// Propriedades do NavItem
interface NavItem {
  label: string;           // Texto do item
  route?: string;          // Rota Angular
  href?: string;           // Link externo
  icon?: string;           // Nome do ícone SVG
  badge?: string | number; // Badge com número/texto
  disabled?: boolean;      // Desabilitar item
  children?: NavItem[];    // Submenu (dropdown)
}`
    };
    return examples[type] || '';
  }
}
