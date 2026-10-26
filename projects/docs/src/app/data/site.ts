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

export const SIDEBAR: NavGroup[] = [
  {
    title: 'Começar',
    items: [
      { label: 'Introdução', path: '/docs/introducao', icon: 'message' },
      { label: 'Instalação', path: '/docs/instalacao', icon: 'terminal' },
      { label: 'Temas', path: '/docs/temas', icon: 'sliders' },
      { label: 'Modo escuro', path: '/docs/modo-escuro', icon: 'moon' },
    ],
  },
  {
    title: 'Componentes',
    items: [
      { label: 'Botões', path: '/componentes/botoes', icon: 'box' },
      { label: 'Campos de entrada', path: '/componentes/campos-de-entrada', icon: 'file' },
      { label: 'Selecção', path: '/componentes/seleccao', icon: 'check' },
      { label: 'Diálogos', path: '/componentes/dialogos', icon: 'grid' },
      { label: 'Separadores', path: '/componentes/separadores', icon: 'tabs' },
      { label: 'Tabelas', path: '/componentes/tabelas', icon: 'table' },
    ],
  },
  {
    title: 'Blocos e Templates',
    items: [
      { label: 'Dashboards', path: '/templates', icon: 'grid', pro: true, query: { categoria: 'Dashboards' } },
      { label: 'Autenticação', path: '/templates', icon: 'shield', pro: true, query: { categoria: 'Autenticação' } },
      { label: 'Gestão de clientes', path: '/templates', icon: 'users', pro: true, query: { categoria: 'Gestão' } },
    ],
  },
];

export type CatalogCategory = 'Formulários' | 'Dados' | 'Navegação' | 'Sobreposição';

export interface CatalogItem {
  name: string;
  description: string;
  icon: string;
  category: CatalogCategory;
  tier: 'Core' | 'Pro';
  /** Rota da documentação; sem rota = ainda em preparação. */
  path?: string;
}

export const CATALOG: CatalogItem[] = [
  { name: 'Botões', description: 'Acções e estados consistentes.', icon: 'box', category: 'Formulários', tier: 'Core', path: '/componentes/botoes' },
  { name: 'Campos de entrada', description: 'Label, ajuda, validação e estados.', icon: 'file', category: 'Formulários', tier: 'Core', path: '/componentes/campos-de-entrada' },
  { name: 'Selecção', description: 'Escolha única com teclado e pesquisa por letra.', icon: 'check', category: 'Formulários', tier: 'Core', path: '/componentes/seleccao' },
  { name: 'Diálogos', description: 'Confirmações e fluxos modais.', icon: 'grid', category: 'Sobreposição', tier: 'Core', path: '/componentes/dialogos' },
  { name: 'Separadores', description: 'Conteúdo dividido em secções.', icon: 'tabs', category: 'Navegação', tier: 'Core', path: '/componentes/separadores' },
  { name: 'Tabelas', description: 'Dados tabulares com ordenação.', icon: 'table', category: 'Dados', tier: 'Core', path: '/componentes/tabelas' },
  { name: 'Command Palette', description: 'Pesquisa e navegação por teclado.', icon: 'search', category: 'Navegação', tier: 'Core' },
  { name: 'Notificações', description: 'Feedback não intrusivo.', icon: 'info', category: 'Sobreposição', tier: 'Core' },
  { name: 'Cards e Layouts', description: 'Superfícies de conteúdo.', icon: 'layers', category: 'Dados', tier: 'Core' },
  { name: 'Data Table', description: 'Filtros, agrupamento, selecção e exportação.', icon: 'table', category: 'Dados', tier: 'Pro' },
  { name: 'Calendar Scheduler', description: 'Agendamento e calendário.', icon: 'calendar', category: 'Dados', tier: 'Pro' },
  { name: 'Gantt Chart', description: 'Planeamento de tarefas e prazos.', icon: 'chart', category: 'Dados', tier: 'Pro' },
  { name: 'File Manager', description: 'Gestão de pastas e ficheiros.', icon: 'folder', category: 'Dados', tier: 'Pro' },
];
