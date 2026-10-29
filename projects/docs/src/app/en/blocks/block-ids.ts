/** Identificador de cada bloco em português e em inglês (para mudar de idioma na mesma página). */
export const BLOCK_IDS: { pt: string; en: string; ptClass: string; enClass: string }[] = [
  ['hero-centrado', 'hero-centered'],
  ['hero-imagem', 'hero-image'],
  ['hero-inscricao', 'hero-signup'],
  ['hero-pesquisa', 'hero-search'],
  ['feature-grelha', 'feature-grid'],
  ['feature-destaque', 'feature-highlight'],
  ['feature-passos', 'feature-steps'],
  ['feature-separadores', 'feature-tabs'],
  ['pricing-planos', 'pricing-plans'],
  ['pricing-unico', 'pricing-single'],
  ['pricing-comparacao', 'pricing-comparison'],
  ['product-grelha', 'product-grid'],
  ['product-detalhe', 'product-detail'],
  ['product-carrossel', 'product-carousel'],
  ['navbar-site', 'navbar-site'],
  ['navbar-app', 'navbar-app'],
  ['navbar-lateral', 'navbar-sidebar'],
  ['cart-pagina', 'cart-page'],
  ['cart-resumo', 'cart-summary'],
  ['cart-mini', 'cart-mini'],
  ['settings-preferencias', 'settings-preferences'],
  ['settings-perfil', 'settings-profile'],
  ['settings-seguranca', 'settings-security'],
  ['settings-notificacoes', 'settings-notifications'],
  ['comments-conversa', 'comments-thread'],
  ['comments-avaliacoes', 'comments-reviews'],
  ['comments-perguntas', 'comments-questions'],
  ['payment-cartao', 'payment-card'],
  ['payment-metodo', 'payment-method'],
  ['payment-checkout', 'payment-checkout'],
  ['onboarding-visita', 'onboarding-tour'],
  ['onboarding-passos', 'onboarding-steps'],
].map(([pt, en]) => ({ pt, en, ptClass: pascal(pt), enClass: pascal(en) }));

function pascal(id: string): string {
  return id.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
}
