import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@muxima-ui/hero';
import { ButtonComponent } from '@muxima-ui/button';

@Component({
  selector: 'muxima-hero-doc',
  standalone: true,
  imports: [CommonModule, HeroComponent, ButtonComponent],
  templateUrl: './hero-doc.component.html',
  styleUrls: ['./hero-doc.component.scss']
})
export class HeroDocComponent {
  // Code examples for each variant
  getCodeExample(example: string): string {
    const examples: { [key: string]: string } = {
      basic: `<muxima-hero
  variant="default"
  announcement="Novo: Integração com IA lançada"
  announcementBadge="Novo"
  highlightText="Incríveis"
  subtitle="A plataforma completa para desenvolvimento, deploy e escala de aplicações modernas."
  [features]="['Grátis por 14 dias', 'Sem cartão de crédito', 'Cancele quando quiser']">
  
  <span title>Construa Produtos</span>
  
  <div cta>
    <muxima-button text="Começar Grátis" variant="primary" size="lg"></muxima-button>
    <muxima-button text="Agendar Demo" variant="outline" size="lg"></muxima-button>
  </div>
  
  <div visual>
    <!-- Your dashboard mockup or illustration -->
  </div>
</muxima-hero>`,

      centered: `<muxima-hero
  variant="centered"
  size="xl"
  announcement="🎉 Lançamento oficial - Junte-se a 10.000+ empresas"
  highlightText="em Minutos"
  subtitle="Sem configuração complexa. Sem DevOps. Apenas código e deploy."
  [features]="['Deploy automático', 'SSL gratuito', 'CDN global']">
  
  <span title>Lance Seu Produto</span>
  
  <div cta>
    <muxima-button text="Começar Agora" variant="primary" size="lg"></muxima-button>
    <muxima-button text="Ver Demo" variant="ghost" size="lg"></muxima-button>
  </div>
</muxima-hero>`,

      split: `<muxima-hero
  variant="split"
  size="lg"
  alignment="left"
  subtitle="Transforme ideias em realidade com nossa plataforma de desenvolvimento moderna"
  [features]="['100% Open Source', 'API First', 'Cloud Native']"
  highlightText="Deploy Mais Fácil">
  
  <span title>Desenvolva Mais Rápido,</span>
  
  <div cta>
    <muxima-button text="Começar Gratuitamente" variant="primary" size="lg"></muxima-button>
  </div>
  
  <div visual>
    <img src="assets/dashboard-preview.png" alt="Dashboard Preview" />
  </div>
</muxima-hero>`,

      minimal: `<muxima-hero
  variant="minimal"
  size="md"
  highlightText="Simples e Poderoso"
  subtitle="Tudo que você precisa, nada que você não precisa.">
  
  <span title>Design</span>
  
  <div cta>
    <muxima-button text="Explorar" variant="primary" size="md"></muxima-button>
    <muxima-button text="Documentação" variant="outline" size="md"></muxima-button>
  </div>
</muxima-hero>`,

      gradient: `<muxima-hero
  variant="gradient"
  size="lg"
  announcement="Black Friday - 50% OFF em todos os planos"
  announcementBadge="Oferta"
  highlightText="Preços Especiais"
  subtitle="Aproveite nossa oferta limitada e economize muito no seu próximo projeto"
  [features]="['Desconto vitalício', 'Suporte premium', 'Todas as features']">
  
  <span title>Economia de até</span>
  
  <div cta>
    <muxima-button text="Ver Planos" variant="primary" size="lg"></muxima-button>
  </div>
</muxima-hero>`,

      imageBg: `<muxima-hero
  variant="image-bg"
  size="xl"
  backgroundImage="assets/hero-bg.jpg"
  announcement="Novo produto disponível"
  announcementBadge="Lançamento"
  highlightText="do Futuro"
  subtitle="Revolucione a forma como você trabalha com tecnologia de ponta"
  [features]="['IA Integrada', 'Automação Total', 'Resultados Reais']">
  
  <span title>A Plataforma</span>
  
  <div cta>
    <muxima-button text="Começar Teste Grátis" variant="primary" size="lg"></muxima-button>
    <muxima-button text="Assistir Vídeo" variant="outline" size="lg"></muxima-button>
  </div>
</muxima-hero>`,

      ecommerce: `<muxima-hero
  variant="split"
  size="lg"
  announcement="⭐ Novidade: Coleção Verão 2026"
  highlightText="Estilo de Vida"
  subtitle="Descubra produtos exclusivos com até 50% de desconto. Qualidade premium, entrega grátis e garantia de satisfação.">
  
  <span title>Transforme Seu</span>
  
  <div cta>
    <muxima-button text="Ver Produtos" variant="primary" size="lg"></muxima-button>
    <muxima-button text="Assistir Vídeo" variant="outline" size="lg"></muxima-button>
  </div>
  
  <div visual>
    <!-- Stats Inline -->
    <div class="hero-stats">
      <div class="stat">
        <div class="stat-value">50k+</div>
        <div class="stat-label">Clientes Felizes</div>
      </div>
      <div class="stat">
        <div class="stat-value">4.9★</div>
        <div class="stat-label">Avaliação Média</div>
      </div>
      <div class="stat">
        <div class="stat-value">10k+</div>
        <div class="stat-label">Produtos</div>
      </div>
    </div>
    
    <!-- Floating Product Cards -->
    <div class="product-cards">
      <div class="product-card">
        <img src="product1.jpg" alt="Smart Watch">
        <div class="product-info">
          <div class="product-name">Smart Watch Pro</div>
          <div class="product-price">$899.99</div>
        </div>
      </div>
      <div class="product-card">
        <img src="product2.jpg" alt="Headphones">
        <div class="product-info">
          <div class="product-name">Fone Bluetooth</div>
          <div class="product-price">$299.99</div>
        </div>
      </div>
    </div>
  </div>
</muxima-hero>

<!-- Styles for E-commerce Hero -->
<style>
  .hero-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .stat {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    border: 2px solid #e5e7eb;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .stat-label {
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: uppercase;
  }
  
  .product-cards {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }
  
  .product-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    width: 200px;
    animation: floating 3s ease-in-out infinite;
  }
  
  .product-card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  
  .product-info {
    padding: 1rem;
  }
  
  .product-name {
    font-weight: 700;
    color: #111827;
  }
  
  .product-price {
    font-size: 1.125rem;
    font-weight: 900;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @keyframes floating {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
</style>`
    };

    return examples[example] || '';
  }
}
