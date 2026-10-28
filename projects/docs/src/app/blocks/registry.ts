import { Type } from '@angular/core';

/** Uma variante de bloco: um componente standalone com .ts, .html e .css. */
export interface BlockVariant {
  id: string;
  title: string;
  description: string;
  /** Componentes da Muxima UI usados, pelo nome do catálogo. */
  uses: string[];
  load: () => Promise<Type<unknown>>;
}

export interface BlockCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
  variants: BlockVariant[];
}

export const BLOCKS: BlockCategory[] = [
  {
    slug: 'hero',
    name: 'Hero',
    description: 'Abertura de página: título, frase e chamada para acção.',
    icon: 'monitor',
    variants: [
      {
        id: 'hero-centrado',
        title: 'Centrado',
        description: 'Etiqueta de novidade, título, frase e dois botões, tudo ao centro.',
        uses: ['Button', 'Badge'],
        load: () => import('./hero/hero-centrado').then((m) => m.HeroCentrado),
      },
      {
        id: 'hero-imagem',
        title: 'Com imagem ao lado',
        description: 'Texto à esquerda e uma imagem do produto à direita; em ecrãs estreitos fica um por baixo do outro.',
        uses: ['Button'],
        load: () => import('./hero/hero-imagem').then((m) => m.HeroImagem),
      },
      {
        id: 'hero-inscricao',
        title: 'Com inscrição',
        description: 'Campo de e-mail com validação e confirmação anunciada ao leitor de ecrã.',
        uses: ['Input', 'Button'],
        load: () => import('./hero/hero-inscricao').then((m) => m.HeroInscricao),
      },
      {
        id: 'hero-pesquisa',
        title: 'Com pesquisa',
        description: 'Centro de ajuda: pesquisa, temas populares e resultados que aparecem por baixo.',
        uses: ['Input', 'Button', 'Chips'],
        load: () => import('./hero/hero-pesquisa').then((m) => m.HeroPesquisa),
      },
    ],
  },
  {
    slug: 'feature-card',
    name: 'Feature card',
    description: 'Funcionalidades do produto em cartões, destaques e passos.',
    icon: 'grid',
    variants: [
      {
        id: 'feature-grelha',
        title: 'Grelha de funcionalidades',
        description: 'Seis cartões com ícone, título e texto curto.',
        uses: ['Card'],
        load: () => import('./feature-card/feature-grelha').then((m) => m.FeatureGrelha),
      },
      {
        id: 'feature-destaque',
        title: 'Funcionalidade em destaque',
        description: 'Uma funcionalidade explicada com lista de vantagens e uma ilustração.',
        uses: ['Button', 'Badge'],
        load: () => import('./feature-card/feature-destaque').then((m) => m.FeatureDestaque),
      },
      {
        id: 'feature-passos',
        title: 'Como funciona',
        description: 'Três passos numerados, numa lista ordenada.',
        uses: ['Button'],
        load: () => import('./feature-card/feature-passos').then((m) => m.FeaturePassos),
      },
      {
        id: 'feature-separadores',
        title: 'Por separadores',
        description: 'Uma área do produto por separador, com lista de vantagens e pré-visualização ao lado.',
        uses: ['Tabs', 'Button'],
        load: () => import('./feature-card/feature-separadores').then((m) => m.FeatureSeparadores),
      },
    ],
  },
  {
    slug: 'pricing-card',
    name: 'Pricing card',
    description: 'Planos e preços, com pagamento mensal ou anual.',
    icon: 'tag',
    variants: [
      {
        id: 'pricing-planos',
        title: 'Três planos',
        description: 'Escolha mensal ou anual (radio), plano recomendado e lista do que inclui.',
        uses: ['Button', 'Badge'],
        load: () => import('./pricing-card/pricing-planos').then((m) => m.PricingPlanos),
      },
      {
        id: 'pricing-unico',
        title: 'Plano único',
        description: 'Um só preço com tudo o que inclui e a garantia.',
        uses: ['Button', 'Separator'],
        load: () => import('./pricing-card/pricing-unico').then((m) => m.PricingUnico),
      },
      {
        id: 'pricing-comparacao',
        title: 'Comparação de planos',
        description: 'Tabela que compara os planos linha a linha, com texto para o leitor de ecrã.',
        uses: ['Table', 'Button'],
        load: () => import('./pricing-card/pricing-comparacao').then((m) => m.PricingComparacao),
      },
    ],
  },
  {
    slug: 'product-card',
    name: 'Product card',
    description: 'Cartões de produto para lojas: grelha e detalhe.',
    icon: 'star',
    variants: [
      {
        id: 'product-grelha',
        title: 'Grelha de produtos',
        description: 'Imagem, nome, avaliação, preço, favorito e adicionar ao carrinho.',
        uses: ['Rating', 'Button', 'Badge'],
        load: () => import('./product-card/product-grelha').then((m) => m.ProductGrelha),
      },
      {
        id: 'product-detalhe',
        title: 'Produto em detalhe',
        description: 'Escolha de tamanho, quantidade e adicionar, com confirmação.',
        uses: ['Rating', 'Button'],
        load: () => import('./product-card/product-detalhe').then((m) => m.ProductDetalhe),
      },
      {
        id: 'product-carrossel',
        title: 'Carrossel de produtos',
        description: 'Mais vendidos numa fila que desliza; 1 a 4 por vista conforme a largura.',
        uses: ['Carousel', 'Button'],
        load: () => import('./product-card/product-carrossel').then((m) => m.ProductCarrossel),
      },
    ],
  },
  {
    slug: 'navbar',
    name: 'Navbar',
    description: 'Barras de navegação para sites e aplicações.',
    icon: 'menu',
    variants: [
      {
        id: 'navbar-site',
        title: 'Site',
        description: 'Logótipo, ligações e chamada para acção; em ecrãs estreitos, um botão Menu abre a lista.',
        uses: ['Button'],
        load: () => import('./navbar/navbar-site').then((m) => m.NavbarSite),
      },
      {
        id: 'navbar-app',
        title: 'Aplicação',
        description: 'Pesquisa, notificações e menu da conta.',
        uses: ['Input', 'Dropdown menu', 'Avatar', 'Separator'],
        load: () => import('./navbar/navbar-app').then((m) => m.NavbarApp),
      },
      {
        id: 'navbar-lateral',
        title: 'Com barra lateral',
        description: 'Estrutura de aplicação: barra lateral que recolhe, contagens e barra de topo com pesquisa.',
        uses: ['Sidebar', 'Avatar', 'Input', 'Button'],
        load: () => import('./navbar/navbar-lateral').then((m) => m.NavbarLateral),
      },
    ],
  },
  {
    slug: 'shopping-cart',
    name: 'Shopping cart',
    description: 'Carrinho de compras com quantidades, totais e IVA.',
    icon: 'box',
    variants: [
      {
        id: 'cart-pagina',
        title: 'Carrinho',
        description: 'Linhas com quantidade e remover, subtotal, IVA de 14% e total sempre certos.',
        uses: ['Button', 'Separator'],
        load: () => import('./shopping-cart/cart-pagina').then((m) => m.CartPagina),
      },
      {
        id: 'cart-resumo',
        title: 'Resumo do pedido',
        description: 'Resumo compacto com código de desconto e entrega.',
        uses: ['Input', 'Button', 'Radio'],
        load: () => import('./shopping-cart/cart-resumo').then((m) => m.CartResumo),
      },
      {
        id: 'cart-mini',
        title: 'Mini carrinho',
        description: 'Botão com a contagem no topo da loja, que abre um painel lateral com os artigos.',
        uses: ['Drawer', 'Badge', 'Button'],
        load: () => import('./shopping-cart/cart-mini').then((m) => m.CartMini),
      },
    ],
  },
  {
    slug: 'settings',
    name: 'Settings item',
    description: 'Linhas de definições: preferências, perfil e segurança.',
    icon: 'sliders',
    variants: [
      {
        id: 'settings-preferencias',
        title: 'Preferências',
        description: 'Interruptores e listas, cada linha com título e descrição.',
        uses: ['Switch', 'Select', 'Separator'],
        load: () => import('./settings/settings-preferencias').then((m) => m.SettingsPreferencias),
      },
      {
        id: 'settings-perfil',
        title: 'Perfil',
        description: 'Formulário de perfil com fotografia, validação e guardar.',
        uses: ['Avatar', 'Input', 'Textarea', 'Button'],
        load: () => import('./settings/settings-perfil').then((m) => m.SettingsPerfil),
      },
      {
        id: 'settings-seguranca',
        title: 'Segurança',
        description: 'Verificação em dois passos, sessões abertas e eliminar a conta com confirmação.',
        uses: ['Switch', 'Badge', 'Button', 'Dialog'],
        load: () => import('./settings/settings-seguranca').then((m) => m.SettingsSeguranca),
      },
      {
        id: 'settings-notificacoes',
        title: 'Notificações',
        description: 'Tabela de acontecimentos por canal, com coluna toda de uma vez, guardar e desfazer.',
        uses: ['Checkbox', 'Switch', 'Button'],
        load: () => import('./settings/settings-notificacoes').then((m) => m.SettingsNotificacoes),
      },
    ],
  },
  {
    slug: 'comments',
    name: 'Comments',
    description: 'Conversas e avaliações com resposta e gostos.',
    icon: 'message',
    variants: [
      {
        id: 'comments-conversa',
        title: 'Conversa',
        description: 'Comentários com respostas, gosto e novo comentário.',
        uses: ['Avatar', 'Textarea', 'Button'],
        load: () => import('./comments/comments-conversa').then((m) => m.CommentsConversa),
      },
      {
        id: 'comments-avaliacoes',
        title: 'Avaliações',
        description: 'Média, distribuição das estrelas e lista filtrável. Nomes e textos fictícios.',
        uses: ['Rating', 'Progress', 'Avatar', 'Chips'],
        load: () => import('./comments/comments-avaliacoes').then((m) => m.CommentsAvaliacoes),
      },
      {
        id: 'comments-perguntas',
        title: 'Perguntas e respostas',
        description: 'Perguntas sobre um produto, com resposta do vendedor, útil e nova pergunta. Exemplos fictícios.',
        uses: ['Input', 'Badge', 'Button'],
        load: () => import('./comments/comments-perguntas').then((m) => m.CommentsPerguntas),
      },
    ],
  },
  {
    slug: 'credit-card-form',
    name: 'Credit card form',
    description: 'Pagamento com cartão, escolha do método e finalizar compra em passos.',
    icon: 'lock',
    variants: [
      {
        id: 'payment-cartao',
        title: 'Cartão',
        description: 'Número com espaços e verificação (Luhn), validade, código e pré-visualização do cartão.',
        uses: ['Input', 'Button'],
        load: () => import('./credit-card-form/payment-cartao').then((m) => m.PaymentCartao),
      },
      {
        id: 'payment-metodo',
        title: 'Método de pagamento',
        description: 'Escolha entre telemóvel, referência e cartão, com os campos de cada um.',
        uses: ['Radio', 'Input', 'Button', 'Copy to clipboard'],
        load: () => import('./credit-card-form/payment-metodo').then((m) => m.PaymentMetodo),
      },
      {
        id: 'payment-checkout',
        title: 'Finalizar compra em passos',
        description: 'Dados, entrega e pagamento por telemóvel, com validação em cada passo e resumo ao lado.',
        uses: ['Stepper', 'Input', 'Radio', 'Button'],
        load: () => import('./credit-card-form/payment-checkout').then((m) => m.PaymentCheckout),
      },
    ],
  },
  {
    slug: 'onboarding',
    name: 'Onboarding',
    description: 'Boas-vindas a quem chega: visita guiada e lista de primeiros passos.',
    icon: 'tour',
    variants: [
      {
        id: 'onboarding-visita',
        title: 'Visita guiada',
        description: 'Convite para a visita e Tour guide pelas partes do ecrã; continua onde parou.',
        uses: ['Tour guide', 'Button', 'Badge', 'Input'],
        load: () => import('./onboarding/onboarding-visita').then((m) => m.OnboardingVisita),
      },
      {
        id: 'onboarding-passos',
        title: 'Primeiros passos',
        description: 'Lista com progresso, próximo passo em destaque e uma visita que explica a lista.',
        uses: ['Progress', 'Button', 'Tour guide'],
        load: () => import('./onboarding/onboarding-passos').then((m) => m.OnboardingPassos),
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
