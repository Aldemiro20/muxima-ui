/** Ligações externas usadas no site. Actualiza aqui quando o domínio e o contacto estiverem definidos. */
export const LINKS = {
  repo: 'https://github.com/Aldemiro20/muxima-ui',
  issues: 'https://github.com/Aldemiro20/muxima-ui/issues',
  npm: 'https://www.npmjs.com/package/@muxima-ui/core',
  /** Contacto comercial (consultoria, Enterprise). Substituir por um e-mail ou formulário próprio. */
  contact: 'https://github.com/Aldemiro20',
};

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  pro?: boolean;
  query?: Record<string, string>;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const TOP_NAV = [
  { label: 'Início', path: '/', exact: true },
  { label: 'Componentes', path: '/componentes', exact: false },
  { label: 'Documentação', path: '/docs', exact: false },
  { label: 'Templates', path: '/templates', exact: false },
  { label: 'Preços', path: '/precos', exact: false },
  { label: 'Consultoria', path: '/consultoria', exact: false },
  { label: 'Changelog', path: '/changelog', exact: false },
];

export type CatalogCategory = 'Formulários' | 'Dados' | 'Navegação' | 'Sobreposição' | 'Feedback';

export const CATEGORIES: CatalogCategory[] = ['Formulários', 'Dados', 'Navegação', 'Sobreposição', 'Feedback'];

export interface CatalogItem {
  name: string;
  description: string;
  icon: string;
  category: CatalogCategory;
  tier: 'Core' | 'Pro';
  /** Rota da documentação; sem rota = ainda em preparação. */
  path?: string;
  /** Versão em que chega, para os que estão em preparação. */
  soon?: string;
}

const soon = (name: string, description: string, icon: string, category: CatalogCategory, version: string): CatalogItem => ({
  name,
  description,
  icon,
  category,
  tier: 'Core',
  soon: version,
});

const c = (name: string, description: string, icon: string, category: CatalogCategory, slug?: string): CatalogItem => ({
  name,
  description,
  icon,
  category,
  tier: 'Core',
  path: slug ? `/componentes/${slug}` : undefined,
});

export const CATALOG: CatalogItem[] = [
  // Formulários
  c('Button', 'Acções e estados consistentes.', 'box', 'Formulários', 'button'),
  c('Input', 'Label, ajuda, validação e estados.', 'file', 'Formulários', 'input'),
  c('Textarea', 'Texto longo, com altura automática.', 'textarea', 'Formulários', 'textarea'),
  c('Select', 'Escolha única com teclado e pesquisa por letra.', 'check', 'Formulários', 'select'),
  c('Checkbox', 'Escolhas independentes e estado intermédio.', 'checkbox', 'Formulários', 'checkbox'),
  c('Radio', 'Uma escolha entre poucas opções visíveis.', 'radio', 'Formulários', 'radio'),
  c('Switch', 'Ligar e desligar com efeito imediato.', 'toggle', 'Formulários', 'switch'),
  c('Slider', 'Valor numérico num intervalo.', 'sliders', 'Formulários', 'slider'),
  c('Combobox', 'Escrever para filtrar e escolher.', 'combobox', 'Formulários', 'combobox'),
  c('Multi-select', 'Várias escolhas numa lista.', 'checkbox', 'Formulários', 'multi-select'),
  c('Date picker', 'Escolha de datas com teclado.', 'calendar', 'Formulários', 'date-picker'),
  c('Date range picker', 'Período com início e fim, e atalhos.', 'calendar', 'Formulários', 'date-range-picker'),
  c('Time picker', 'Escolha de horas e minutos.', 'clock', 'Formulários', 'time-picker'),
  c('OTP input', 'Códigos de uso único (OTP).', 'key', 'Formulários', 'otp-input'),
  c('Chips', 'Etiquetas, filtros e campo de etiquetas.', 'chips', 'Formulários', 'chips'),
  c('File upload', 'Arrastar ou escolher ficheiros, com validação.', 'upload', 'Formulários', 'file-upload'),
  c('Rating', 'Avaliação com estrelas.', 'star', 'Formulários', 'rating'),
  c('Copy to clipboard', 'Copiar um valor com um clique.', 'copy', 'Formulários', 'copy-to-clipboard'),
  soon('Color picker', 'Cor com teclado, formatos e amostras.', 'palette', 'Formulários', '1.2'),
  soon('Image cropper', 'Recortar e rodar imagens antes de enviar.', 'crop', 'Formulários', '1.3'),
  soon('Rich text editor', 'Texto com formatação, listas e ligações.', 'editor', 'Formulários', '1.3'),
  // Dados
  c('Table', 'Dados tabulares com ordenação.', 'table', 'Dados', 'table'),
  c('Card', 'Superfícies para agrupar conteúdo.', 'card', 'Dados', 'card'),
  c('Badge', 'Estados e categorias em texto curto.', 'tag', 'Dados', 'badge'),
  c('Avatar', 'Fotografia ou iniciais.', 'user', 'Dados', 'avatar'),
  c('Separator', 'Linhas de separação.', 'minus', 'Dados', 'separator'),
  soon('Timeline', 'Acontecimentos por ordem.', 'timeline', 'Dados', '1.2'),
  soon('Carousel', 'Conteúdo que passa em diapositivos.', 'carousel', 'Dados', '1.2'),
  soon('Data grid', 'Colunas redimensionáveis e fixas, filtros e scroll virtual.', 'table', 'Dados', '1.3'),
  soon('Kanban', 'Cartões em colunas, com arrastar e largar.', 'kanban', 'Dados', '1.3'),
  // Navegação
  c('Tabs', 'Conteúdo dividido em secções.', 'tabs', 'Navegação', 'tabs'),
  c('Breadcrumb', 'Onde estou na hierarquia.', 'crumbs', 'Navegação', 'breadcrumb'),
  c('Pagination', 'Navegar entre páginas de resultados.', 'pages', 'Navegação', 'pagination'),
  c('Accordion', 'Secções que abrem e fecham.', 'accordion', 'Navegação', 'accordion'),
  c('Stepper', 'Progresso num fluxo com passos.', 'steps', 'Navegação', 'stepper'),
  c('Command Palette', 'Pesquisa e navegação por teclado.', 'search', 'Navegação', 'command-palette'),
  soon('Sidebar', 'Navegação lateral que recolhe.', 'sidebar', 'Navegação', '1.2'),
  // Sobreposição
  c('Dialog', 'Confirmações e fluxos modais.', 'grid', 'Sobreposição', 'dialog'),
  c('Drawer', 'Diálogo que entra pelo lado.', 'drawer', 'Sobreposição', 'drawer'),
  c('Dropdown menu', 'Lista de acções num botão.', 'menu', 'Sobreposição', 'dropdown-menu'),
  c('Popover', 'Conteúdo flutuante junto a um elemento.', 'popover', 'Sobreposição', 'popover'),
  c('Tooltip', 'Texto curto ao passar ou focar.', 'tooltip', 'Sobreposição', 'tooltip'),
  // Feedback
  c('Alert', 'Mensagens destacadas na página.', 'alert', 'Feedback', 'alert'),
  c('Progress', 'Barras e indicador de espera.', 'progress', 'Feedback', 'progress'),
  c('Skeleton', 'Lugar do conteúdo enquanto carrega.', 'skeleton', 'Feedback', 'skeleton'),
  c('Toast', 'Avisos temporários (toast).', 'bell', 'Feedback', 'toast'),
  soon('Notification center', 'Lista de notificações lidas e por ler.', 'bell', 'Feedback', '1.2'),
];

/** Barra lateral: Começar, os componentes documentados por categoria, e os blocos Pro. */
export const SIDEBAR: NavGroup[] = [
  {
    title: 'Começar',
    items: [
      { label: 'Introdução', path: '/docs/introducao', icon: 'message' },
      { label: 'Instalação', path: '/docs/instalacao', icon: 'terminal' },
      { label: 'Temas', path: '/docs/temas', icon: 'sliders' },
      { label: 'Modo escuro', path: '/docs/modo-escuro', icon: 'moon' },
      { label: 'Padrão de qualidade', path: '/docs/padrao-de-qualidade', icon: 'quality' },
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
    title: 'Blocos e Templates',
    items: [
      { label: 'Dashboards', path: '/templates', icon: 'grid', pro: true, query: { categoria: 'Dashboards' } },
      { label: 'Autenticação', path: '/templates', icon: 'shield', pro: true, query: { categoria: 'Autenticação' } },
      { label: 'Gestão de clientes', path: '/templates', icon: 'users', pro: true, query: { categoria: 'Gestão' } },
    ],
  },
];
