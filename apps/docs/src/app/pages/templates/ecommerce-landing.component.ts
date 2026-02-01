import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '@muxima-ui/button';
import { VideoPlayerComponent } from '@muxima-ui/video-player';

@Component({
  selector: 'muxima-ecommerce-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, VideoPlayerComponent],
  template: `
    <div class="ecommerce-landing">
      <!-- Navigation -->
      <nav class="navbar">
        <div class="nav-container">
          <div class="logo">
            <span class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </span>
            <span class="logo-text">Muxima Shop</span>
          </div>
          <div class="nav-links">
            <a (click)="scrollToSection('hero')" class="nav-link">Início</a>
            <a (click)="scrollToSection('products')" class="nav-link">Produtos</a>
            <a (click)="scrollToSection('features')" class="nav-link">Recursos</a>
            <a (click)="scrollToSection('testimonials')" class="nav-link">Depoimentos</a>
            <a (click)="scrollToSection('pricing')" class="nav-link">Preços</a>
          </div>
          <div class="nav-actions">
            <button class="icon-btn" (click)="openCart()" title="Ver Carrinho">
              <span class="badge-count">{{ cartCount }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
            <muxima-button text="Entrar" variant="outline" size="sm"></muxima-button>
            <muxima-button text="Começar" variant="primary" size="sm"></muxima-button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero" id="hero">
        <div class="hero-container">
          <div class="hero-content">
            <span class="hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Novidade: Coleção Verão 2026
            </span>
            <h1 class="hero-title">
              Transforme Seu
              <span class="gradient-text">Estilo de Vida</span>
            </h1>
            <p class="hero-description">
              Descubra produtos exclusivos com até 50% de desconto. 
              Qualidade premium, entrega grátis e garantia de satisfação.
            </p>
            <div class="hero-actions">
              <muxima-button text="Ver Produtos" variant="primary" size="lg" [iconSvg]="true">
                <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </muxima-button>
              <muxima-button text="Assistir Vídeo" variant="outline" size="lg" [iconSvg]="true" (click)="openVideoModal()">
                <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </muxima-button>
            </div>
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
          </div>
          <div class="hero-image">
            <div class="product-card floating">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop" alt="Produto">
              <div class="product-info">
                <div class="product-name">Smart Watch Pro</div>
                <div class="product-price">$ 899.99</div>
              </div>
            </div>
            <div class="product-card floating delay-1">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop" alt="Produto">
              <div class="product-info">
                <div class="product-name">Fone Bluetooth</div>
                <div class="product-price">$ 299.99</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features" id="features">
        <div class="section-header">
          <span class="section-badge">Por Que Escolher a Gente?</span>
          <h2 class="section-title">Benefícios Exclusivos</h2>
          <p class="section-description">
            Experiência de compra incomparável com vantagens únicas
          </p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h3>Entrega Grátis</h3>
            <p>Frete grátis em compras over . Entrega rápida em todo USA.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3>Compra Segura</h3>
            <p>Pagamento 100% seguro com certificado SSL e proteção de dados.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <h3>Parcele em 12x</h3>
            <p>Parcelamento sem juros no cartão de crédito em todos os produtos.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 12 20 22 4 22 4 12"></polyline>
                <rect x="2" y="7" width="20" height="5"></rect>
                <line x1="12" y1="22" x2="12" y2="7"></line>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
              </svg>
            </div>
            <h3>Cashback 5%</h3>
            <p>Ganhe 5% de volta em todas as compras para usar nas próximas.</p>
          </div>
        </div>
      </section>

      <!-- Products Section -->
      <section class="products" id="products">
        <div class="section-header">
          <span class="section-badge">Destaques da Semana</span>
          <h2 class="section-title">Produtos em Alta</h2>
        </div>
        <div class="products-grid">
          <div class="product-item" *ngFor="let product of products">
            <div class="product-image-wrapper">
              <img [src]="product.image" [alt]="product.name">
              <span class="product-badge" [class]="product.badgeType">{{ product.badge }}</span>
              <div class="product-overlay">
                <button class="quick-action" (click)="addToFavorites(product)" title="Adicionar aos Favoritos">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <button class="quick-action" (click)="quickView(product)" title="Visualização Rápida">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button class="quick-action" (click)="addToCart(product)" title="Adicionar ao Carrinho">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="product-details">
              <div class="product-category">{{ product.category }}</div>
              <h4 class="product-name">{{ product.name }}</h4>
              <div class="product-rating">
                <span class="stars">{{ product.stars }}</span>
                <span class="reviews">({{ product.reviews }})</span>
              </div>
              <div class="product-pricing">
                <span class="price-current">{{ product.price }}</span>
                <span class="price-old" *ngIf="product.oldPrice">{{ product.oldPrice }}</span>
                <span class="discount" *ngIf="product.discount">-{{ product.discount }}%</span>
              </div>
              <muxima-button 
                text="Adicionar ao Carrinho" 
                variant="primary" 
                size="sm" 
                style="width: 100%; margin-top: 12px;"
                (click)="addToCart(product)">
              </muxima-button>
            </div>
          </div>
        </div>
        <div class="products-action">
          <muxima-button text="Ver Todos os Produtos →" variant="outline" size="lg"></muxima-button>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials" id="testimonials">
        <div class="section-header">
          <span class="section-badge">O Que Dizem Nossos Clientes</span>
          <h2 class="section-title">Depoimentos Reais</h2>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card" *ngFor="let testimonial of testimonials">
            <div class="testimonial-rating">{{ testimonial.rating }}</div>
            <p class="testimonial-text">"{{ testimonial.text }}"</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ testimonial.avatar }}</div>
              <div class="author-info">
                <div class="author-name">{{ testimonial.name }}</div>
                <div class="author-role">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="pricing" id="pricing">
        <div class="pricing-container">
          <div class="section-header">
            <span class="section-badge">Planos & Preços</span>
            <h2 class="section-title">Escolha Seu Plano</h2>
            <p class="section-description">
              Planos flexíveis para todas as necessidades
            </p>
          </div>
          <div class="pricing-grid">
            <div class="pricing-card" *ngFor="let plan of pricingPlans" [class.featured]="plan.featured">
              <div class="plan-badge" *ngIf="plan.featured">MAIS POPULAR</div>
              <div class="pricing-content">
                <span class="plan-icon" [innerHTML]="getPlanIcon(plan.name)"></span>
                <h3 class="plan-name">{{ plan.name }}</h3>
                <div class="plan-price">
                  <span class="price-currency">$</span>
                  <span class="price-value">{{ plan.price }}</span>
                  <span class="price-period">/mês</span>
                </div>
                <ul class="plan-features">
                  <li *ngFor="let feature of plan.features">
                    <span class="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    {{ feature }}
                  </li>
                </ul>
                <muxima-button 
                  [text]="plan.featured ? 'Começar Agora' : 'Escolher Plano'" 
                  [variant]="plan.featured ? 'primary' : 'outline'" 
                  size="md"
                  style="width: 100%;">
                </muxima-button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="cta-content">
          <h2 class="cta-title">Pronto para Começar?</h2>
          <p class="cta-description">
            Junte-se a milhares de clientes satisfeitos. Ganhe 10% de desconto na primeira compra!
          </p>
          <div class="cta-actions">
            <muxima-button text="Ganhar Desconto" variant="primary" size="lg" [iconSvg]="true">
              <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 12 20 22 4 22 4 12"></polyline>
                <rect x="2" y="7" width="20" height="5"></rect>
                <line x1="12" y1="22" x2="12" y2="7"></line>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
              </svg>
            </muxima-button>
            <muxima-button text="Falar com Vendas" variant="outline" size="lg" [iconSvg]="true">
              <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </muxima-button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <span class="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </span>
              <span class="logo-text">Muxima Shop</span>
            </div>
            <p class="footer-description">
              A melhor experiência de compra online. Qualidade, segurança e preço justo.
            </p>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-section">
            <h4>Produtos</h4>
            <ul class="footer-links">
              <li><a href="#">Eletrônicos</a></li>
              <li><a href="#">Moda</a></li>
              <li><a href="#">Casa & Decoração</a></li>
              <li><a href="#">Esportes</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Empresa</h4>
            <ul class="footer-links">
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Imprensa</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Suporte</h4>
            <ul class="footer-links">
              <li><a href="#">Central de Ajuda</a></li>
              <li><a href="#">Rastreamento</a></li>
              <li><a href="#">Devoluções</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Muxima Shop. Todos os direitos reservados.</p>
          <div class="footer-bottom-links">
            <a href="#">Termos de Uso</a>
            <a href="#">Privacidade</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>

      <!-- Floating Cart Button -->
      <button class="floating-cart" (click)="openCart()" title="Ver Carrinho">
        <span class="cart-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </span>
        <span class="cart-badge">{{ cartCount }}</span>
      </button>

      <!-- Back Button -->
      <div class="template-back">
        <muxima-button 
          text="← Voltar para Templates" 
          variant="outline" 
          size="md"
          (click)="goBack()">
        </muxima-button>
      </div>

      <!-- Cart Modal -->
      <div class="modal-overlay" *ngIf="showCartModal" (click)="closeCart()">
        <div class="modal-content cart-modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin-right: 8px;">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Meu Carrinho
            </h3>
            <button class="modal-close" (click)="closeCart()">✕</button>
          </div>
          <div class="modal-body">
            <div *ngIf="cartItems.length === 0" class="empty-cart">
              <div class="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <p>Seu carrinho está vazio</p>
              <muxima-button text="Continuar Comprando" variant="primary" (click)="closeCart()"></muxima-button>
            </div>
            <div *ngIf="cartItems.length > 0" class="cart-items">
              <div class="cart-item" *ngFor="let item of cartItems; let i = index">
                <img [src]="item.image" [alt]="item.name" class="cart-item-image">
                <div class="cart-item-details">
                  <h4>{{ item.name }}</h4>
                  <p class="cart-item-category">{{ item.category }}</p>
                  <div class="cart-item-quantity">
                    <button (click)="decreaseQuantity(i)">−</button>
                    <span>{{ item.quantity }}</span>
                    <button (click)="increaseQuantity(i)">+</button>
                  </div>
                </div>
                <div class="cart-item-price">
                  <div class="price">{{ item.price }}</div>
                  <button class="remove-btn" (click)="removeFromCart(i)">🗑️</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer" *ngIf="cartItems.length > 0">
            <div class="cart-total">
              <span>Total:</span>
              <span class="total-value">{{ getCartTotal() }}</span>
            </div>
            <muxima-button text="Finalizar Compra" variant="primary" size="lg" style="width: 100%;"></muxima-button>
          </div>
        </div>
      </div>

      <!-- Product Details Modal -->
      <div class="modal-overlay" *ngIf="showProductModal" (click)="closeProductModal()">
        <div class="modal-content product-modal" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeProductModal()">✕</button>
          <div class="product-modal-content" *ngIf="selectedProduct">
            <div class="product-modal-image">
              <img [src]="selectedProduct.image" [alt]="selectedProduct.name">
              <span class="product-badge" [class]="selectedProduct.badgeType">{{ selectedProduct.badge }}</span>
            </div>
            <div class="product-modal-info">
              <div class="product-category">{{ selectedProduct.category }}</div>
              <h2>{{ selectedProduct.name }}</h2>
              <div class="product-rating">
                <span class="stars">{{ selectedProduct.stars }}</span>
                <span class="reviews">({{ selectedProduct.reviews }} avaliações)</span>
              </div>
              <div class="product-description">
                <p>Produto de alta qualidade com design moderno e funcionalidades premium. 
                   Ideal para quem busca performance e estilo. Garantia de 12 meses e suporte técnico incluso.</p>
              </div>
              <div class="product-features-list">
                <h4>Características:</h4>
                <ul>
                  <li>✓ Garantia de 12 meses</li>
                  <li>✓ Frete grátis para todo USA</li>
                  <li>✓ Parcele em até 12x sem juros</li>
                  <li>✓ 30 dias para devolução</li>
                  <li>✓ Suporte técnico especializado</li>
                </ul>
              </div>
              <div class="product-pricing-modal">
                <div class="pricing-info">
                  <span class="price-current">{{ selectedProduct.price }}</span>
                  <span class="price-old" *ngIf="selectedProduct.oldPrice">{{ selectedProduct.oldPrice }}</span>
                </div>
                <span class="discount" *ngIf="selectedProduct.discount">{{ selectedProduct.discount }}% OFF</span>
              </div>
              <div class="product-actions">
                <muxima-button 
                  text="Favoritar" 
                  variant="outline" 
                  size="lg"
                  [iconSvg]="true"
                  (click)="addToFavorites(selectedProduct)">
                  <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </muxima-button>
                <muxima-button 
                  text="Adicionar ao Carrinho" 
                  variant="primary" 
                  size="lg"
                  [iconSvg]="true"
                  (click)="addToCart(selectedProduct)">
                  <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </muxima-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Video Modal -->
      <div class="modal-overlay" *ngIf="showVideoModal" (click)="closeVideoModal()">
        <div class="modal-content video-modal" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeVideoModal()">✕</button>
          <div class="video-container">
            <muxima-video-player
              [sources]="videoSources"
              [config]="videoConfig"
              width="100%"
              height="auto">
            </muxima-video-player>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ecommerce-landing {
      min-height: 100vh;
      background: #ffffff;
    }

    /* Navigation */
    .navbar {
      position: sticky;
      top: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #e5e7eb;
      padding: 16px 0;
      z-index: 100;
    }

    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 800;
    }

    .logo-icon {
      font-size: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon svg {
      width: 32px;
      height: 32px;
      stroke: var(--muxima-primary);
    }

    .logo-text {
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      gap: 32px;
      flex: 1;
    }

    .nav-link {
      color: #374151;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
      position: relative;
      cursor: pointer;
    }

    .nav-link:hover {
      color: var(--muxima-primary);
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--muxima-gradient);
      transition: width 0.3s;
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .icon-btn {
      position: relative;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      border: 2px solid #e5e7eb;
      background: white;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-btn svg {
      width: 20px;
      height: 20px;
      stroke: #374151;
    }

    .icon-btn:hover {
      border-color: var(--muxima-primary);
      transform: translateY(-2px);
    }

    .icon-btn:hover svg {
      stroke: var(--muxima-primary);
    }

    .badge-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--muxima-gradient);
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
    }

    /* Hero Section */
    .hero {
      padding: 80px 24px 120px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
      overflow: hidden;
    }

    .hero-container {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .hero-badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea15, #764ba215);
      color: var(--muxima-primary);
      padding: 8px 20px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 24px;
    }

    .hero-title {
      font-size: 64px;
      font-weight: 900;
      line-height: 1.1;
      color: #1f2937;
      margin-bottom: 24px;
    }

    .gradient-text {
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: block;
    }

    .hero-description {
      font-size: 18px;
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 48px;
    }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      padding-top: 32px;
      border-top: 1px solid #e5e7eb;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 800;
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }

    .hero-image {
      position: relative;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }

    .product-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      width: 240px;
    }

    .product-card img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .product-info {
      padding: 16px;
    }

    .product-name {
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
    }

    .product-price {
      font-size: 20px;
      font-weight: 800;
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(-2deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }

    .floating {
      animation: float 6s ease-in-out infinite;
    }

    .floating.delay-1 {
      animation-delay: -3s;
      transform: translateX(20px);
    }

    /* Sections */
    section {
      padding: 80px 24px;
      max-width: 1280px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea15, #764ba215);
      color: var(--muxima-primary);
      padding: 8px 20px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 48px;
      font-weight: 900;
      color: #1f2937;
      margin-bottom: 16px;
    }

    .section-description {
      font-size: 18px;
      color: #6b7280;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Features */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 32px;
    }

    .feature-card {
      background: white;
      padding: 32px;
      border-radius: 20px;
      border: 2px solid #f3f4f6;
      transition: all 0.3s;
      text-align: center;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      border-color: var(--muxima-primary);
      box-shadow: 0 20px 60px rgba(102, 126, 234, 0.15);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      margin: 0 auto 24px;
    }

    .feature-icon svg {
      width: 40px;
      height: 40px;
      stroke: white;
      stroke-width: 2;
    }

    .feature-icon.purple { background: linear-gradient(135deg, #667eea, #764ba2); }
    .feature-icon.blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
    .feature-icon.green { background: linear-gradient(135deg, #10b981, #059669); }
    .feature-icon.orange { background: linear-gradient(135deg, #f59e0b, #ef4444); }

    .feature-card h3 {
      font-size: 22px;
      font-weight: 800;
      color: #1f2937;
      margin-bottom: 12px;
    }

    .feature-card p {
      color: #6b7280;
      line-height: 1.6;
    }

    /* Products */
    .products {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%);
      border-radius: 32px;
      padding: 80px 40px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 32px;
      margin-bottom: 48px;
    }

    .product-item {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.3s;
      border: 2px solid transparent;
    }

    .product-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      border-color: var(--muxima-primary);
    }

    .product-image-wrapper {
      position: relative;
      overflow: hidden;
    }

    .product-image-wrapper img {
      width: 100%;
      height: 320px;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .product-item:hover .product-image-wrapper img {
      transform: scale(1.1);
    }

    .product-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      padding: 6px 16px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      color: white;
    }

    .product-badge.sale {
      background: linear-gradient(135deg, #ef4444, #dc2626);
    }

    .product-badge.new {
      background: linear-gradient(135deg, #10b981, #059669);
    }

    .product-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .product-item:hover .product-overlay {
      opacity: 1;
    }

    .quick-action {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: white;
      border: none;
      font-size: 18px;
      cursor: pointer;
      transform: scale(0);
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .quick-action svg {
      width: 20px;
      height: 20px;
      stroke: #374151;
      transition: stroke 0.3s;
    }

    .product-item:hover .quick-action {
      transform: scale(1);
    }

    .quick-action:nth-child(1) { transition-delay: 0.1s; }
    .quick-action:nth-child(2) { transition-delay: 0.15s; }
    .quick-action:nth-child(3) { transition-delay: 0.2s; }

    .quick-action:hover {
      background: var(--muxima-gradient);
      transform: scale(1.1);
    }

    .quick-action:hover svg {
      stroke: white;
    }

    .product-details {
      padding: 20px;
    }

    .product-category {
      font-size: 12px;
      color: var(--muxima-primary);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .product-details .product-name {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .stars {
      color: #fbbf24;
      font-size: 14px;
    }

    .reviews {
      font-size: 13px;
      color: #6b7280;
    }

    .product-pricing {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .price-current {
      font-size: 24px;
      font-weight: 800;
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .price-old {
      font-size: 16px;
      color: #9ca3af;
      text-decoration: line-through;
    }

    .discount {
      background: #fee2e2;
      color: #dc2626;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
    }

    .products-action {
      text-align: center;
    }

    /* Testimonials */
    .testimonials {
      background: white;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
    }

    .testimonial-card {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
      padding: 32px;
      border-radius: 20px;
      border: 2px solid #f3f4f6;
      transition: all 0.3s;
    }

    .testimonial-card:hover {
      transform: translateY(-4px);
      border-color: var(--muxima-primary);
    }

    .testimonial-rating {
      color: #fbbf24;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .testimonial-text {
      font-size: 16px;
      line-height: 1.6;
      color: #374151;
      margin-bottom: 24px;
      font-style: italic;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .author-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--muxima-gradient);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
    }

    .author-name {
      font-weight: 700;
      color: #1f2937;
    }

    .author-role {
      font-size: 14px;
      color: #6b7280;
    }

    /* Pricing */
    .pricing {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.03), rgba(118, 75, 162, 0.03));
      padding: 80px 40px;
    }

    .pricing-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 32px;
    }

    .pricing-card {
      background: white;
      border-radius: 20px;
      overflow: visible;
      border: 2px solid #e5e7eb;
      transition: all 0.3s;
      position: relative;
    }

    .pricing-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .pricing-card.featured {
      border-color: var(--muxima-primary);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.03), rgba(118, 75, 162, 0.03));
    }

    .pricing-content {
      padding: 40px;
    }

    .plan-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--muxima-gradient);
      color: white;
      padding: 6px 20px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      z-index: 10;
    }

    .plan-icon {
      font-size: 56px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .plan-icon svg {
      width: 56px;
      height: 56px;
      stroke: var(--muxima-primary);
      stroke-width: 1.5;
    }

    .pricing-card.featured .plan-icon svg {
      fill: var(--muxima-primary);
      opacity: 0.15;
    }

    .plan-name {
      font-size: 28px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 8px;
      text-align: center;
    }

    .plan-price {
      margin-bottom: 32px;
      display: flex;
      align-items: flex-start;
      gap: 4px;
      justify-content: center;
    }

    .price-currency {
      font-size: 24px;
      font-weight: 700;
      color: #6b7280;
      margin-top: 8px;
    }

    .price-value {
      font-size: 56px;
      font-weight: 900;
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }

    .price-period {
      font-size: 18px;
      color: #6b7280;
      align-self: flex-end;
      margin-bottom: 14px;
    }

    .plan-features {
      list-style: none;
      padding: 0;
      margin: 0 0 32px 0;
    }

    .plan-features li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      color: #374151;
      font-size: 15px;
    }

    .feature-icon {
      color: #10b981;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .feature-icon svg {
      width: 16px;
      height: 16px;
      stroke: #10b981;
      stroke-width: 3;
    }

    /* CTA */
    .cta {
      background: var(--muxima-gradient);
      border-radius: 32px;
      padding: 60px 40px;
      text-align: center;
      margin-top: 80px;
      margin-bottom: 80px;
    }

    .cta-title {
      font-size: 42px;
      font-weight: 900;
      color: white;
      margin-bottom: 16px;
    }

    .cta-description {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 32px;
    }

    .cta-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    /* Footer */
    .footer {
      background: #1f2937;
      color: white;
      padding: 60px 24px 24px;
    }

    .footer-content {
      max-width: 1280px;
      margin: 0 auto 40px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 16px;
    }

    .footer-description {
      color: #9ca3af;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .social-links {
      display: flex;
      gap: 12px;
    }

    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .social-link svg {
      width: 20px;
      height: 20px;
      fill: white;
    }

    .social-link:hover {
      background: var(--muxima-gradient);
      transform: translateY(-4px);
    }

    .footer-section h4 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 16px;
      color: white;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 12px;
    }

    .footer-links a {
      color: #9ca3af;
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-links a:hover {
      color: white;
    }

    .footer-bottom {
      max-width: 1280px;
      margin: 0 auto;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #9ca3af;
      font-size: 14px;
    }

    .footer-bottom-links {
      display: flex;
      gap: 24px;
    }

    .footer-bottom-links a {
      color: #9ca3af;
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-bottom-links a:hover {
      color: white;
    }

    /* Floating Cart */
    .floating-cart {
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--muxima-gradient);
      border: none;
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
      cursor: pointer;
      transition: all 0.3s;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .floating-cart:hover {
      transform: scale(1.1);
    }

    .cart-icon {
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cart-icon svg {
      width: 28px;
      height: 28px;
      stroke: white;
      stroke-width: 2;
    }

    .cart-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #ef4444;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
    }

    /* Template Back */
    .template-back {
      position: fixed;
      bottom: 32px;
      left: 32px;
      z-index: 99;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .hero-container {
        grid-template-columns: 1fr;
      }

      .hero-image {
        height: 400px;
      }

      .nav-links {
        display: none;
      }

      .footer-content {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 48px;
      }

      .section-title {
        font-size: 36px;
      }

      .cta-title {
        font-size: 36px;
      }

      .hero-actions,
      .cta-actions {
        flex-direction: column;
      }

      .footer-content {
        grid-template-columns: 1fr;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
      animation: fadeIn 0.2s;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: white;
      border-radius: 16px;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-header {
      padding: 24px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }

    .modal-close {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      background: #f3f4f6;
      cursor: pointer;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .modal-close:hover {
      background: #e5e7eb;
      transform: rotate(90deg);
    }

    .modal-body {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
    }

    .modal-footer {
      padding: 24px;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    /* Cart Modal */
    .cart-modal {
      max-width: 600px;
    }

    .empty-cart {
      text-align: center;
      padding: 48px 24px;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
      opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-icon svg {
      width: 64px;
      height: 64px;
      stroke: #6b7280;
      stroke-width: 2;
    }

    .empty-cart p {
      color: #6b7280;
      font-size: 18px;
      margin-bottom: 24px;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .cart-item {
      display: flex;
      gap: 16px;
      padding: 16px;
      background: #f9fafb;
      border-radius: 12px;
      align-items: center;
    }

    .cart-item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }

    .cart-item-details {
      flex: 1;
    }

    .cart-item-details h4 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .cart-item-category {
      color: #6b7280;
      font-size: 14px;
      margin: 0 0 12px 0;
    }

    .cart-item-quantity {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cart-item-quantity button {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      background: white;
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
      transition: all 0.2s;
    }

    .cart-item-quantity button:hover {
      background: #f3f4f6;
      border-color: var(--muxima-primary);
    }

    .cart-item-quantity span {
      min-width: 30px;
      text-align: center;
      font-weight: 600;
    }

    .cart-item-price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }

    .cart-item-price .price {
      font-size: 18px;
      font-weight: 700;
      color: var(--muxima-primary);
    }

    .remove-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
      opacity: 0.5;
      transition: opacity 0.2s;
    }

    .remove-btn:hover {
      opacity: 1;
    }

    .cart-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 700;
    }

    .total-value {
      color: var(--muxima-primary);
      font-size: 28px;
    }

    /* Product Modal */
    .product-modal {
      max-width: 900px;
    }

    /* Video Modal */
    .video-modal {
      max-width: 1000px;
      padding: 0;
      background: #000;
      border-radius: 12px;
      overflow: hidden;
    }

    .video-modal .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 10;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }

    .video-modal .modal-close:hover {
      background: rgba(0, 0, 0, 0.9);
      border-color: white;
    }

    .video-container {
      width: 100%;
      aspect-ratio: 16/9;
    }

    .product-modal .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 10;
    }

    .product-modal-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      padding: 24px;
    }

    .product-modal-image {
      position: relative;
    }

    .product-modal-image img {
      width: 100%;
      height: 500px;
      object-fit: cover;
      border-radius: 12px;
    }

    .product-modal-image .product-badge {
      position: absolute;
      top: 16px;
      left: 16px;
    }

    .product-modal-info {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .product-modal-info h2 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      line-height: 1.2;
    }

    .product-description {
      color: #6b7280;
      line-height: 1.6;
    }

    .product-features-list {
      background: #f9fafb;
      padding: 20px;
      border-radius: 12px;
    }

    .product-features-list h4 {
      margin: 0 0 12px 0;
      font-weight: 600;
    }

    .product-features-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .product-features-list li {
      padding: 8px 0;
      color: #374151;
    }

    .product-pricing-modal {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background: #f0f9ff;
      border-radius: 12px;
    }

    .pricing-info {
      display: flex;
      align-items: baseline;
      gap: 12px;
    }

    .product-actions {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 12px;
      margin-top: auto;
    }

    @media (max-width: 768px) {
      .product-modal-content {
        grid-template-columns: 1fr;
      }

      .product-modal-image img {
        height: 300px;
      }

      .product-actions {
        grid-template-columns: 1fr;
      }

      .cart-item {
        flex-wrap: wrap;
      }
    }
  `]
})
export class EcommerceLandingComponent {
  products = [
    {
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
      badge: '50% OFF',
      badgeType: 'sale',
      category: 'Eletrônicos',
      name: 'Smart Watch Pro Max',
      stars: '★★★★★',
      reviews: 234,
      price: '$ 899.99',
      oldPrice: '$ 1,799.99',
      discount: 50
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop',
      badge: 'NOVO',
      badgeType: 'new',
      category: 'Áudio',
      name: 'Fone Bluetooth Premium',
      stars: '★★★★★',
      reviews: 189,
      price: '$ 299.99',
      oldPrice: null,
      discount: null
    },
    {
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=500&fit=crop',
      badge: '30% OFF',
      badgeType: 'sale',
      category: 'Periféricos',
      name: 'Teclado Mecânico RGB',
      stars: '★★★★☆',
      reviews: 156,
      price: '$ 489.99',
      oldPrice: '$ 699.99',
      discount: 30
    },
    {
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=500&fit=crop',
      badge: 'NOVO',
      badgeType: 'new',
      category: 'Periféricos',
      name: 'Mouse Gamer Wireless',
      stars: '★★★★★',
      reviews: 298,
      price: '$ 249.99',
      oldPrice: null,
      discount: null
    }
  ];

  testimonials = [
    {
      rating: '★★★★★',
      text: 'Melhor experiência de compra online que já tive! Produtos de qualidade e entrega super rápida.',
      avatar: 'JV',
      name: 'João Valentim',
      role: 'Cliente Verificado'
    },
    {
      rating: '★★★★★',
      text: 'Atendimento excepcional e produtos exatamente como descritos. Recomendo 100%!',
      avatar: 'MS',
      name: 'Maria Silva',
      role: 'Cliente VIP'
    },
    {
      rating: '★★★★★',
      text: 'Preços justos, qualidade premium e suporte incrível. Virei cliente fiel!',
      avatar: 'PC',
      name: 'Pedro Costa',
      role: 'Cliente Recorrente'
    }
  ];

  pricingPlans = [
    {
      icon: '📦',
      name: 'Básico',
      price: '0',
      featured: false,
      features: [
        'Acesso a todos os produtos',
        'Frete grátis over ',
        'Parcelamento em 3x',
        'Suporte por email'
      ]
    },
    {
      icon: '⭐',
      name: 'Premium',
      price: '49',
      featured: true,
      features: [
        'Tudo do plano Básico',
        'Frete grátis ilimitado',
        'Parcelamento em 12x',
        'Cashback de 10%',
        'Suporte prioritário 24/7',
        'Acesso antecipado a lançamentos'
      ]
    },
    {
      icon: '👑',
      name: 'VIP',
      price: '99',
      featured: false,
      features: [
        'Tudo do plano Premium',
        'Cashback de 15%',
        'Personal Shopper',
        'Descontos exclusivos',
        'Eventos VIP',
        'Brindes mensais'
      ]
    }
  ];

  cartCount = 0;
  cartItems: any[] = [];
  showCartModal = false;
  showProductModal = false;
  showVideoModal = false;
  selectedProduct: any = null;

  videoSources = [
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4',
      quality: '1080p'
    }
  ];

  videoConfig = {
    autoplay: false,
    loop: false,
    muted: false,
    controls: true,
    poster: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=450&fit=crop'
  };

  constructor(private router: Router) {}

  getPlanIcon(planName: string): string {
    const icons: {[key: string]: string} = {
      'Básico': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
      'Premium': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
      'VIP': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
    };
    return icons[planName] || icons['Básico'];
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartCount++;
    console.log('Produto adicionado ao carrinho:', product.name);
  }

  removeFromCart(index: number) {
    const item = this.cartItems[index];
    this.cartCount -= item.quantity;
    this.cartItems.splice(index, 1);
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.cartCount++;
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.cartCount--;
    }
  }

  getCartTotal(): string {
    const total = this.cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', '').replace(',', ''));
      return sum + (price * item.quantity);
    }, 0);
    return `$${total.toFixed(2)}`;
  }

  addToFavorites(product: any) {
    console.log('Produto adicionado aos favoritos:', product.name);
    alert(`❤️ ${product.name} adicionado aos favoritos!`);
  }

  quickView(product: any) {
    this.selectedProduct = product;
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
    this.selectedProduct = null;
  }

  openVideoModal() {
    this.showVideoModal = true;
  }

  closeVideoModal() {
    this.showVideoModal = false;
  }

  openCart() {
    this.showCartModal = true;
  }

  closeCart() {
    this.showCartModal = false;
  }

  goBack() {
    this.router.navigate(['/templates']);
  }
}

