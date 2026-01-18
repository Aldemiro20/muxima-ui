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
  basicMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: '🏠' },
    { label: 'About', route: '/about', icon: '👥' },
    { label: 'Services', route: '/services', icon: '⚙️' },
    { label: 'Contact', route: '/contact', icon: '📧' }
  ];

  dropdownMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: '🏠' },
    { 
      label: 'Products', 
      icon: '📦',
      children: [
        { label: 'All Products', route: '/products' },
        { label: 'Electronics', route: '/products/electronics', icon: '💻' },
        { label: 'Clothing', route: '/products/clothing', icon: '👕' },
        { label: 'Books', route: '/products/books', icon: '📚' }
      ]
    },
    { 
      label: 'Resources', 
      icon: '📚',
      children: [
        { label: 'Documentation', route: '/docs', icon: '📖' },
        { label: 'Blog', route: '/blog', icon: '✍️' },
        { label: 'FAQ', route: '/faq', icon: '❓' }
      ]
    },
    { label: 'Contact', route: '/contact', icon: '📧' }
  ];

  ecommerceMenuItems: NavItem[] = [
    { label: 'Home', route: '/', icon: '🏠' },
    { 
      label: 'Shop', 
      icon: '🛍️',
      children: [
        { label: 'New Arrivals', route: '/shop/new', icon: '✨' },
        { label: 'Best Sellers', route: '/shop/bestsellers', icon: '🔥' },
        { label: 'On Sale', route: '/shop/sale', icon: '💰' },
        { label: 'Collections', route: '/shop/collections', icon: '📦' }
      ]
    },
    { 
      label: 'Categories', 
      icon: '📂',
      children: [
        { label: 'Men', route: '/category/men', icon: '👔' },
        { label: 'Women', route: '/category/women', icon: '👗' },
        { label: 'Kids', route: '/category/kids', icon: '🧸' },
        { label: 'Accessories', route: '/category/accessories', icon: '👜' }
      ]
    },
    { label: 'About', route: '/about', icon: '💼' },
    { label: 'Cart', route: '/cart', icon: '🛒' }
  ];

  dashboardMenuItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '📊' },
    { label: 'Analytics', route: '/analytics', icon: '📈' },
    { 
      label: 'Users', 
      icon: '👥',
      children: [
        { label: 'All Users', route: '/users', icon: '👤' },
        { label: 'Add User', route: '/users/add', icon: '➕' },
        { label: 'Roles', route: '/users/roles', icon: '🔐' },
        { label: 'Permissions', route: '/users/permissions', icon: '🔑' }
      ]
    },
    { 
      label: 'Settings', 
      icon: '⚙️',
      children: [
        { label: 'Profile', route: '/settings/profile', icon: '👤' },
        { label: 'Preferences', route: '/settings/preferences', icon: '🎨' },
        { label: 'Security', route: '/settings/security', icon: '🔒' },
        { label: 'Notifications', route: '/settings/notifications', icon: '🔔' }
      ]
    }
  ];

  compactMenuItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Portfolio', route: '/portfolio' },
    { label: 'Contact', route: '/contact' }
  ];

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
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
  { label: 'Home', route: '/', icon: '🏠' },
  { label: 'About', route: '/about', icon: '👥' },
  { label: 'Services', route: '/services', icon: '⚙️' },
  { label: 'Contact', route: '/contact', icon: '📧' }
];`,
      dropdown: `<muxima-navbar
  logo="My Brand"
  [menuItems]="dropdownMenuItems"
  [fixed]="true"
></muxima-navbar>`,
      dropdownItems: `menuItems: NavItem[] = [
  { label: 'Home', route: '/', icon: '🏠' },
  { 
    label: 'Products', 
    icon: '📦',
    children: [
      { label: 'All Products', route: '/products' },
      { label: 'Electronics', route: '/products/electronics', icon: '💻' },
      { label: 'Clothing', route: '/products/clothing', icon: '👕' }
    ]
  },
  { label: 'Contact', route: '/contact', icon: '📧' }
];`,
      transparent: `<muxima-navbar
  logo="Brand"
  [menuItems]="menuItems"
  [transparent]="true"
  [fixed]="true"
></muxima-navbar>`,
      scrollEffect: `// O navbar automaticamente adiciona efeito de scroll
// quando a página rola mais de 20px.
// Muda de transparente para fundo sólido com sombra.`,
      ecommerce: `<muxima-navbar
  logo="Shop"
  [menuItems]="ecommerceMenuItems"
></muxima-navbar>`,
      dashboard: `<muxima-navbar
  logo="Admin Panel"
  [menuItems]="dashboardMenuItems"
  [fixed]="true"
></muxima-navbar>`,
      compact: `<muxima-navbar
  logo="Brand"
  [menuItems]="compactMenuItems"
></muxima-navbar>

// Menu sem ícones para um visual mais clean
menuItems: NavItem[] = [
  { label: 'Home', route: '/' },
  { label: 'About', route: '/about' },
  { label: 'Services', route: '/services' }
];`
    };
    return examples[type] || '';
  }
}
