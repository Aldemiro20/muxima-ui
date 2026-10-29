import { BlockCategory, BlockVariant } from '../../blocks/registry';

export type { BlockCategory, BlockVariant } from '../../blocks/registry';

export const BLOCKS: BlockCategory[] = [
  {
    slug: 'hero',
    name: 'Hero',
    description: 'Page opener: headline, tagline and call to action.',
    icon: 'monitor',
    variants: [
      {
        id: 'hero-centered',
        title: 'Centered',
        description: 'A news badge, headline, tagline and two buttons, all centered.',
        uses: ['Button', 'Badge'],
        load: () => import('./hero/hero-centered').then((m) => m.HeroCentered),
      },
      {
        id: 'hero-image',
        title: 'With side image',
        description: 'Text on the left and a product image on the right; on narrow screens they stack.',
        uses: ['Button'],
        load: () => import('./hero/hero-image').then((m) => m.HeroImage),
      },
      {
        id: 'hero-signup',
        title: 'With signup',
        description: 'Email field with validation and a confirmation announced to screen readers.',
        uses: ['Input', 'Button'],
        load: () => import('./hero/hero-signup').then((m) => m.HeroSignup),
      },
      {
        id: 'hero-search',
        title: 'With search',
        description: 'Help center: search, popular topics and results that appear below.',
        uses: ['Input', 'Button', 'Chips'],
        load: () => import('./hero/hero-search').then((m) => m.HeroSearch),
      },
    ],
  },
  {
    slug: 'feature-card',
    name: 'Feature card',
    description: 'Product features in cards, highlights and steps.',
    icon: 'grid',
    variants: [
      {
        id: 'feature-grid',
        title: 'Feature grid',
        description: 'Six cards with an icon, title and short text.',
        uses: ['Card'],
        load: () => import('./feature-card/feature-grid').then((m) => m.FeatureGrid),
      },
      {
        id: 'feature-highlight',
        title: 'Highlighted feature',
        description: 'One feature explained with a list of benefits and an illustration.',
        uses: ['Button', 'Badge'],
        load: () => import('./feature-card/feature-highlight').then((m) => m.FeatureHighlight),
      },
      {
        id: 'feature-steps',
        title: 'How it works',
        description: 'Three numbered steps, in an ordered list.',
        uses: ['Button'],
        load: () => import('./feature-card/feature-steps').then((m) => m.FeatureSteps),
      },
      {
        id: 'feature-tabs',
        title: 'By tabs',
        description: 'One product area per tab, with a list of benefits and a preview alongside.',
        uses: ['Tabs', 'Button'],
        load: () => import('./feature-card/feature-tabs').then((m) => m.FeatureTabs),
      },
    ],
  },
  {
    slug: 'pricing-card',
    name: 'Pricing card',
    description: 'Plans and prices, with monthly or yearly billing.',
    icon: 'tag',
    variants: [
      {
        id: 'pricing-plans',
        title: 'Three plans',
        description: 'Monthly or yearly choice (radio), a recommended plan and what each includes.',
        uses: ['Button', 'Badge'],
        load: () => import('./pricing-card/pricing-plans').then((m) => m.PricingPlans),
      },
      {
        id: 'pricing-single',
        title: 'Single plan',
        description: 'One price with everything it includes and the guarantee.',
        uses: ['Button', 'Separator'],
        load: () => import('./pricing-card/pricing-single').then((m) => m.PricingSingle),
      },
      {
        id: 'pricing-comparison',
        title: 'Plan comparison',
        description: 'A table comparing plans row by row, with text for screen readers.',
        uses: ['Table', 'Button'],
        load: () => import('./pricing-card/pricing-comparison').then((m) => m.PricingComparison),
      },
    ],
  },
  {
    slug: 'product-card',
    name: 'Product card',
    description: 'Product cards for stores: grid and detail.',
    icon: 'star',
    variants: [
      {
        id: 'product-grid',
        title: 'Product grid',
        description: 'Image, name, rating, price, favorite and add to cart.',
        uses: ['Rating', 'Button', 'Badge'],
        load: () => import('./product-card/product-grid').then((m) => m.ProductGrid),
      },
      {
        id: 'product-detail',
        title: 'Product detail',
        description: 'Size and quantity choice and add, with confirmation.',
        uses: ['Rating', 'Button'],
        load: () => import('./product-card/product-detail').then((m) => m.ProductDetail),
      },
      {
        id: 'product-carousel',
        title: 'Product carousel',
        description: 'Best sellers in a sliding row; 1 to 4 per view depending on width.',
        uses: ['Carousel', 'Button'],
        load: () => import('./product-card/product-carousel').then((m) => m.ProductCarousel),
      },
    ],
  },
  {
    slug: 'navbar',
    name: 'Navbar',
    description: 'Navigation bars for sites and apps.',
    icon: 'menu',
    variants: [
      {
        id: 'navbar-site',
        title: 'Site',
        description: 'Logo, links and call to action; on narrow screens, a Menu button opens the list.',
        uses: ['Button'],
        load: () => import('./navbar/navbar-site').then((m) => m.NavbarSite),
      },
      {
        id: 'navbar-app',
        title: 'App',
        description: 'Search, notifications and account menu.',
        uses: ['Input', 'Dropdown menu', 'Avatar', 'Separator'],
        load: () => import('./navbar/navbar-app').then((m) => m.NavbarApp),
      },
      {
        id: 'navbar-sidebar',
        title: 'With sidebar',
        description: 'App shell: a collapsible sidebar, counts and a top bar with search.',
        uses: ['Sidebar', 'Avatar', 'Input', 'Button'],
        load: () => import('./navbar/navbar-sidebar').then((m) => m.NavbarSidebar),
      },
    ],
  },
  {
    slug: 'shopping-cart',
    name: 'Shopping cart',
    description: 'Shopping cart with quantities, totals and VAT.',
    icon: 'box',
    variants: [
      {
        id: 'cart-page',
        title: 'Cart',
        description: 'Rows with quantity and remove, subtotal, 14% VAT and a total that is always right.',
        uses: ['Button', 'Separator'],
        load: () => import('./shopping-cart/cart-page').then((m) => m.CartPage),
      },
      {
        id: 'cart-summary',
        title: 'Order summary',
        description: 'Compact summary with a discount code and delivery.',
        uses: ['Input', 'Button', 'Radio'],
        load: () => import('./shopping-cart/cart-summary').then((m) => m.CartSummary),
      },
      {
        id: 'cart-mini',
        title: 'Mini cart',
        description: 'A button with the count at the top of the store, opening a side panel with the items.',
        uses: ['Drawer', 'Badge', 'Button'],
        load: () => import('./shopping-cart/cart-mini').then((m) => m.CartMini),
      },
    ],
  },
  {
    slug: 'settings',
    name: 'Settings item',
    description: 'Settings rows: preferences, profile and security.',
    icon: 'sliders',
    variants: [
      {
        id: 'settings-preferences',
        title: 'Preferences',
        description: 'Switches and lists, each row with a title and description.',
        uses: ['Switch', 'Select', 'Separator'],
        load: () => import('./settings/settings-preferences').then((m) => m.SettingsPreferences),
      },
      {
        id: 'settings-profile',
        title: 'Profile',
        description: 'Profile form with photo, validation and save.',
        uses: ['Avatar', 'Input', 'Textarea', 'Button'],
        load: () => import('./settings/settings-profile').then((m) => m.SettingsProfile),
      },
      {
        id: 'settings-security',
        title: 'Security',
        description: 'Two-step verification, open sessions and account deletion with confirmation.',
        uses: ['Switch', 'Badge', 'Button', 'Dialog'],
        load: () => import('./settings/settings-security').then((m) => m.SettingsSecurity),
      },
      {
        id: 'settings-notifications',
        title: 'Notifications',
        description: 'A table of events by channel, with whole-column toggles, save and undo.',
        uses: ['Checkbox', 'Switch', 'Button'],
        load: () => import('./settings/settings-notifications').then((m) => m.SettingsNotifications),
      },
    ],
  },
  {
    slug: 'comments',
    name: 'Comments',
    description: 'Threads and reviews with replies and likes.',
    icon: 'message',
    variants: [
      {
        id: 'comments-thread',
        title: 'Thread',
        description: 'Comments with replies, likes and a new comment.',
        uses: ['Avatar', 'Textarea', 'Button'],
        load: () => import('./comments/comments-thread').then((m) => m.CommentsThread),
      },
      {
        id: 'comments-reviews',
        title: 'Reviews',
        description: 'Average, star distribution and a filterable list. Fictional names and texts.',
        uses: ['Rating', 'Progress', 'Avatar', 'Chips'],
        load: () => import('./comments/comments-reviews').then((m) => m.CommentsReviews),
      },
      {
        id: 'comments-questions',
        title: 'Questions and answers',
        description: 'Questions about a product, with seller answers, helpful votes and a new question. Fictional examples.',
        uses: ['Input', 'Badge', 'Button'],
        load: () => import('./comments/comments-questions').then((m) => m.CommentsQuestions),
      },
    ],
  },
  {
    slug: 'credit-card-form',
    name: 'Credit card form',
    description: 'Card payment, payment method choice and a step-by-step checkout.',
    icon: 'lock',
    variants: [
      {
        id: 'payment-card',
        title: 'Card',
        description: 'Spaced number with a Luhn check, expiry, security code and a card preview.',
        uses: ['Input', 'Button'],
        load: () => import('./credit-card-form/payment-card').then((m) => m.PaymentCard),
      },
      {
        id: 'payment-method',
        title: 'Payment method',
        description: 'Choose between mobile, reference and card, with the fields for each.',
        uses: ['Radio', 'Input', 'Button', 'Copy to clipboard'],
        load: () => import('./credit-card-form/payment-method').then((m) => m.PaymentMethod),
      },
      {
        id: 'payment-checkout',
        title: 'Step-by-step checkout',
        description: 'Details, delivery and mobile payment, with validation at each step and a summary alongside.',
        uses: ['Stepper', 'Input', 'Radio', 'Button'],
        load: () => import('./credit-card-form/payment-checkout').then((m) => m.PaymentCheckout),
      },
    ],
  },
  {
    slug: 'onboarding',
    name: 'Onboarding',
    description: 'Welcome for newcomers: a guided tour and a getting-started list.',
    icon: 'tour',
    variants: [
      {
        id: 'onboarding-tour',
        title: 'Guided tour',
        description: 'An invitation to the tour and a Tour guide through the parts of the screen; resumes where it stopped.',
        uses: ['Tour guide', 'Button', 'Badge', 'Input'],
        load: () => import('./onboarding/onboarding-tour').then((m) => m.OnboardingTour),
      },
      {
        id: 'onboarding-steps',
        title: 'Getting started',
        description: 'A checklist with progress, the next step highlighted and a tour that explains the list.',
        uses: ['Progress', 'Button', 'Tour guide'],
        load: () => import('./onboarding/onboarding-steps').then((m) => m.OnboardingSteps),
      },
    ],
  },
];

export function findBlock(id: string): { category: BlockCategory; variant: BlockVariant } | undefined {
  for (const category of BLOCKS) {
    const variant = category.variants.find((v) => v.id === id);
    if (variant) return { category, variant };
  }
  return undefined;
}
