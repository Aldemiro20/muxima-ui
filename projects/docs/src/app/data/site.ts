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
}

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
  c('Combobox', 'Escrever para filtrar e escolher.', 'combobox', 'Formulários'),
  c('Multi-select', 'Várias escolhas numa lista.', 'checkbox', 'Formulários'),
  c('Date picker', 'Escolha de datas com teclado.', 'calendar', 'Formulários'),
  c('Time picker', 'Escolha de horas e minutos.', 'clock', 'Formulários'),
  c('OTP input', 'Códigos de uso único (OTP).', 'key', 'Formulários'),
  // Dados
  c('Table', 'Dados tabulares com ordenação.', 'table', 'Dados', 'table'),
  c('Card', 'Superfícies para agrupar conteúdo.', 'card', 'Dados', 'card'),
  c('Badge', 'Estados e categorias em texto curto.', 'tag', 'Dados', 'badge'),
  c('Avatar', 'Fotografia ou iniciais.', 'user', 'Dados', 'avatar'),
  c('Separator', 'Linhas de separação.', 'minus', 'Dados', 'separator'),
  // Navegação
  c('Tabs', 'Conteúdo dividido em secções.', 'tabs', 'Navegação', 'tabs'),
  c('Breadcrumb', 'Onde estou na hierarquia.', 'crumbs', 'Navegação', 'breadcrumb'),
  c('Pagination', 'Navegar entre páginas de resultados.', 'pages', 'Navegação', 'pagination'),
  c('Accordion', 'Secções que abrem e fecham.', 'accordion', 'Navegação', 'accordion'),
  c('Stepper', 'Progresso num fluxo com passos.', 'steps', 'Navegação'),
  c('Command Palette', 'Pesquisa e navegação por teclado.', 'search', 'Navegação'),
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
  // Pro
  { name: 'Data Table', description: 'Filtros, agrupamento, selecção e exportação.', icon: 'table', category: 'Dados', tier: 'Pro' },
  { name: 'Calendar Scheduler', description: 'Agendamento e calendário.', icon: 'calendar', category: 'Dados', tier: 'Pro' },
  { name: 'Gantt Chart', description: 'Planeamento de tarefas e prazos.', icon: 'chart', category: 'Dados', tier: 'Pro' },
  { name: 'File Manager', description: 'Gestão de pastas e ficheiros.', icon: 'folder', category: 'Dados', tier: 'Pro' },
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
