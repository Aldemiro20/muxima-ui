import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '@muxima-ui/button';

@Component({
  selector: 'muxima-saas-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="saas-landing">
      <!-- Navigation -->
      <nav class="navbar">
        <div class="nav-container">
          <div class="logo">
            <span class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </span>
            <span class="logo-text">Muxima</span>
            <span class="logo-badge">SaaS</span>
          </div>
          <div class="nav-menu">
            <a (click)="scrollToSection('features')" class="nav-link">Recursos</a>
            <a (click)="scrollToSection('solutions')" class="nav-link">Soluções</a>
            <a (click)="scrollToSection('pricing')" class="nav-link">Preços</a>
            <a (click)="scrollToSection('testimonials')" class="nav-link">Clientes</a>
            <a (click)="scrollToSection('hero')" class="nav-link">Documentação</a>
          </div>
          <div class="nav-actions">
            <a href="#" class="nav-cta-link">Entrar</a>
            <muxima-button text="Começar Grátis" variant="primary" size="sm"></muxima-button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero" id="hero">
        <div class="hero-container">
          <div class="hero-content">
            <div class="announcement">
              <span class="announcement-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
                Novo
              </span>
              <span class="announcement-text">Lançamos integração com IA - <a href="#">Conheça →</a></span>
            </div>
            <h1 class="hero-title">
              Construa Produtos
              <span class="gradient-text">Incríveis</span>
              Mais Rápido
            </h1>
            <p class="hero-subtitle">
              A plataforma completa para desenvolvimento, deploy e escala de aplicações modernas.
              Integração perfeita, monitoramento em tempo real e automação inteligente.
            </p>
            <div class="hero-cta">
              <muxima-button text="Começar Gratuitamente" variant="primary" size="lg" [iconSvg]="true">
                <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </muxima-button>
              <muxima-button text="Agendar Demo" variant="outline" size="lg" [iconSvg]="true">
                <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </muxima-button>
            </div>
            <div class="hero-features">
              <div class="feature-item">
                <span class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Grátis por 14 dias</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Sem cartão de crédito</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="dashboard-mockup">
              <div class="mockup-header">
                <div class="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div class="mockup-title">Dashboard</div>
              </div>
              <div class="mockup-content">
                <div class="mockup-stats">
                  <div class="stat-card">
                    <div class="stat-label">Total de Usuários</div>
                    <div class="stat-value">45,289</div>
                    <div class="stat-trend positive">+12.5% ↗</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-label">Receita Mensal</div>
                    <div class="stat-value">R$ 98.5K</div>
                    <div class="stat-trend positive">+8.2% ↗</div>
                  </div>
                </div>
                <div class="mockup-chart">
                  <div class="chart-bars">
                    <div class="bar" style="height: 60%;"></div>
                    <div class="bar" style="height: 80%;"></div>
                    <div class="bar" style="height: 45%;"></div>
                    <div class="bar" style="height: 90%;"></div>
                    <div class="bar" style="height: 70%;"></div>
                    <div class="bar" style="height: 95%;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trusted By -->
      <section class="trusted-by">
        <div class="trusted-container">
          <p class="trusted-text">Confiado por mais de 10.000 empresas ao redor do mundo</p>
          <div class="company-logos">
            <div class="company-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              TechCorp
            </div>
            <div class="company-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              StartupX
            </div>
            <div class="company-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              BizSoft
            </div>
            <div class="company-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              FastDev
            </div>
            <div class="company-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
              TargetSys
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features" id="features">
        <div class="features-container">
          <div class="section-header">
            <span class="section-tag">RECURSOS</span>
            <h2 class="section-title">Tudo que você precisa em um só lugar</h2>
            <p class="section-description">
              Ferramentas poderosas para acelerar seu desenvolvimento e escalar seu negócio
            </p>
          </div>
          <div class="features-grid">
            <div class="feature-card" *ngFor="let feature of features">
              <div class="feature-icon" [style.background]="feature.gradient" [innerHTML]="getFeatureIcon(feature.title)">
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Solutions -->
      <section class="solutions" id="solutions">
        <div class="solutions-container">
          <div class="section-header">
            <span class="section-tag">SOLUÇÕES</span>
            <h2 class="section-title">Para cada tipo de negócio</h2>
          </div>
          <div class="solutions-grid">
            <div class="solution-card" *ngFor="let solution of solutions" [class.featured]="solution.featured">
              <div class="solution-content">
                <span class="solution-icon" [innerHTML]="getSolutionIcon(solution.title)"></span>
                <h3>{{ solution.title }}</h3>
                <p>{{ solution.description }}</p>
                <ul class="solution-features">
                  <li *ngFor="let feature of solution.features">
                    <span class="check-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    {{ feature }}
                  </li>
                </ul>
                <muxima-button 
                  text="Saiba Mais →" 
                  [variant]="solution.featured ? 'primary' : 'outline'" 
                  size="md"
                  style="width: 100%;">
                </muxima-button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="stats">
        <div class="stats-container">
          <div class="stat-item" *ngFor="let stat of stats">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-description">{{ stat.description }}</div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="testimonials" id="customers">
        <div class="testimonials-container">
          <div class="section-header">
            <span class="section-tag">DEPOIMENTOS</span>
            <h2 class="section-title">O que nossos clientes dizem</h2>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial-card" *ngFor="let testimonial of testimonials">
              <div class="testimonial-header">
                <div class="testimonial-avatar">{{ testimonial.avatar }}</div>
                <div class="testimonial-author">
                  <div class="author-name">{{ testimonial.name }}</div>
                  <div class="author-position">{{ testimonial.position }}</div>
                </div>
                <div class="testimonial-rating">{{ testimonial.rating }}</div>
              </div>
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section class="pricing" id="pricing">
        <div class="pricing-container">
          <div class="section-header">
            <span class="section-tag">PREÇOS</span>
            <h2 class="section-title">Planos para todos os tamanhos</h2>
            <p class="section-description">
              Comece grátis e escale conforme cresce. Sem surpresas, sem taxas ocultas.
            </p>
          </div>
          <div class="pricing-grid">
            <div class="pricing-card" *ngFor="let plan of pricingPlans" [class.popular]="plan.popular">
              <div class="popular-badge" *ngIf="plan.popular">Mais Popular</div>
              <div class="plan-name">{{ plan.name }}</div>
              <div class="plan-description">{{ plan.description }}</div>
              <div class="plan-pricing">
                <span class="currency">R$</span>
                <span class="price">{{ plan.price }}</span>
                <span class="period">/{{ plan.period }}</span>
              </div>
              <ul class="plan-features">
                <li *ngFor="let feature of plan.features">
                  <span class="feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  {{ feature }}
                </li>
              </ul>
              <muxima-button 
                [text]="plan.cta" 
                [variant]="plan.popular ? 'primary' : 'outline'" 
                size="lg"
                style="width: 100%;">
              </muxima-button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta">
        <div class="cta-container">
          <div class="cta-content">
            <h2>Pronto para transformar seu negócio?</h2>
            <p>Junte-se a milhares de empresas que já estão usando Muxima SaaS</p>
            <div class="cta-actions">
              <muxima-button text="Começar Agora - Grátis" variant="primary" size="lg"></muxima-button>
              <muxima-button text="Falar com Vendas" variant="outline" size="lg"></muxima-button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-top">
            <div class="footer-brand">
              <div class="footer-logo">
                <span class="logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </span>
                <span class="logo-text">Muxima SaaS</span>
              </div>
              <p>A plataforma completa para desenvolvimento e deploy de aplicações modernas.</p>
              <div class="social-links">
                <a href="#" class="social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
                <a href="#" class="social-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4>Produto</h4>
                <a href="#">Recursos</a>
                <a href="#">Integrações</a>
                <a href="#">Preços</a>
                <a href="#">Changelog</a>
              </div>
              <div class="footer-column">
                <h4>Empresa</h4>
                <a href="#">Sobre</a>
                <a href="#">Blog</a>
                <a href="#">Carreiras</a>
                <a href="#">Imprensa</a>
              </div>
              <div class="footer-column">
                <h4>Recursos</h4>
                <a href="#">Documentação</a>
                <a href="#">Guias</a>
                <a href="#">API</a>
                <a href="#">Status</a>
              </div>
              <div class="footer-column">
                <h4>Suporte</h4>
                <a href="#">Central de Ajuda</a>
                <a href="#">Comunidade</a>
                <a href="#">Contato</a>
                <a href="#">Chat</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2026 Muxima SaaS. Todos os direitos reservados.</p>
            <div class="footer-legal">
              <a href="#">Termos</a>
              <a href="#">Privacidade</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <!-- Back Button -->
      <div class="template-back">
        <muxima-button 
          text="← Voltar para Templates" 
          variant="outline" 
          size="md"
          (click)="goBack()">
        </muxima-button>
      </div>
    </div>
  `,
  styles: [`
    .saas-landing {
      min-height: 100vh;
      background: #ffffff;
    }

    /* Navigation */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid #e5e7eb;
      padding: 16px 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-icon {
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon svg {
      width: 28px;
      height: 28px;
      stroke: var(--muxima-primary);
    }

    .logo-text {
      font-size: 24px;
      font-weight: 800;
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .logo-badge {
      background: var(--muxima-gradient);
      color: white;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .nav-menu {
      display: flex;
      gap: 32px;
    }

    .nav-link {
      color: #374151;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: color 0.2s;
      cursor: pointer;
    }

    .nav-link:hover {
      color: var(--muxima-primary);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .nav-cta-link {
      color: #374151;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: color 0.2s;
    }

    .nav-cta-link:hover {
      color: var(--muxima-primary);
    }

    /* Hero */
    .hero {
      padding: 140px 32px 100px;
      background: radial-gradient(ellipse at top, rgba(102, 126, 234, 0.05) 0%, transparent 60%);
    }

    .hero-container {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .announcement {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      padding: 8px 16px;
      border-radius: 100px;
      margin-bottom: 24px;
      border: 1px solid rgba(102, 126, 234, 0.2);
    }

    .announcement-badge {
      background: var(--muxima-gradient);
      color: white;
      padding: 2px 10px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
    }

    .announcement-text {
      font-size: 14px;
      color: #374151;
    }

    .announcement-text a {
      color: var(--muxima-primary);
      text-decoration: none;
      font-weight: 600;
    }

    .hero-title {
      font-size: 72px;
      font-weight: 900;
      line-height: 1.1;
      color: #111827;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }

    .gradient-text {
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: block;
    }

    .hero-subtitle {
      font-size: 20px;
      color: #6b7280;
      line-height: 1.7;
      margin-bottom: 40px;
      max-width: 540px;
    }

    .hero-cta {
      display: flex;
      gap: 16px;
      margin-bottom: 40px;
    }

    .hero-features {
      display: flex;
      gap: 32px;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #6b7280;
      font-size: 14px;
    }

    .feature-icon {
      color: #10b981;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .feature-icon svg {
      width: 14px;
      height: 14px;
      stroke: #10b981;
      stroke-width: 2.5;
    }

    /* Dashboard Mockup */
    .hero-visual {
      position: relative;
    }

    .dashboard-mockup {
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      border: 1px solid #e5e7eb;
      overflow: hidden;
    }

    .mockup-header {
      background: #f9fafb;
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mockup-dots {
      display: flex;
      gap: 8px;
    }

    .mockup-dots span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .mockup-dots span:nth-child(1) { background: #ef4444; }
    .mockup-dots span:nth-child(2) { background: #fbbf24; }
    .mockup-dots span:nth-child(3) { background: #10b981; }

    .mockup-title {
      font-size: 13px;
      font-weight: 600;
      color: #6b7280;
    }

    .mockup-content {
      padding: 24px;
    }

    .mockup-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(102, 126, 234, 0.1);
    }

    .stat-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 800;
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 4px;
    }

    .stat-trend {
      font-size: 13px;
      font-weight: 600;
    }

    .stat-trend.positive {
      color: #10b981;
    }

    .mockup-chart {
      background: #f9fafb;
      padding: 24px;
      border-radius: 12px;
      height: 180px;
    }

    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 100%;
      gap: 8px;
    }

    .bar {
      flex: 1;
      background: var(--muxima-gradient);
      border-radius: 6px 6px 0 0;
      transition: all 0.3s;
      animation: grow 1s ease-out;
    }

    @keyframes grow {
      from { height: 0; }
    }

    .bar:hover {
      opacity: 0.8;
    }

    /* Trusted By */
    .trusted-by {
      padding: 60px 32px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }

    .trusted-container {
      max-width: 1280px;
      margin: 0 auto;
      text-align: center;
    }

    .trusted-text {
      font-size: 14px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 32px;
      font-weight: 600;
    }

    .company-logos {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 48px;
      flex-wrap: wrap;
    }

    .company-logo {
      font-size: 16px;
      font-weight: 700;
      color: #9ca3af;
      opacity: 0.6;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .company-logo svg {
      width: 20px;
      height: 20px;
      stroke: currentColor;
    }

    .company-logo:hover {
      opacity: 1;
      color: #374151;
    }

    /* Sections */
    section {
      padding: 100px 32px;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-tag {
      display: inline-block;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      color: var(--muxima-primary);
      padding: 6px 16px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 48px;
      font-weight: 900;
      color: #111827;
      margin-bottom: 16px;
      letter-spacing: -0.01em;
    }

    .section-description {
      font-size: 18px;
      color: #6b7280;
      max-width: 640px;
      margin: 0 auto;
    }

    /* Features */
    .features-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
    }

    .feature-card {
      padding: 32px;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      background: white;
      transition: all 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border-color: var(--muxima-primary);
    }

    .features-grid .feature-icon {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin-bottom: 20px;
    }

    .features-grid .feature-icon svg {
      width: 32px;
      height: 32px;
    }

    .feature-card h3 {
      font-size: 20px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 12px;
    }

    .feature-card p {
      color: #6b7280;
      line-height: 1.6;
    }

    /* Solutions */
    .solutions {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.03), rgba(118, 75, 162, 0.03));
    }

    .solutions-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .solutions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 32px;
    }

    .solution-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      border: 2px solid #e5e7eb;
      transition: all 0.3s;
    }

    .solution-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .solution-card.featured {
      border-color: var(--muxima-primary);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.03), rgba(118, 75, 162, 0.03));
    }

    .solution-content {
      padding: 40px;
    }

    .solution-icon {
      font-size: 48px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .solution-icon svg {
      width: 48px;
      height: 48px;
      stroke: var(--muxima-primary);
      stroke-width: 1.5;
    }

    .solution-card h3 {
      font-size: 24px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 12px;
    }

    .solution-card p {
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .solution-features {
      list-style: none;
      padding: 0;
      margin: 0 0 32px 0;
    }

    .solution-features li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      color: #374151;
      font-size: 15px;
    }

    .check-icon {
      color: #10b981;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .check-icon svg {
      width: 16px;
      height: 16px;
      stroke: #10b981;
      stroke-width: 3;
    }

    /* Stats */
    .stats {
      background: var(--muxima-gradient);
      padding: 80px 32px;
    }

    .stats-container {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 48px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 56px;
      font-weight: 900;
      color: white;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 600;
      margin-bottom: 8px;
    }

    .stat-description {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
    }

    /* Testimonials */
    .testimonials-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 32px;
    }

    .testimonial-card {
      background: white;
      padding: 32px;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      transition: all 0.3s;
    }

    .testimonial-card:hover {
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      border-color: var(--muxima-primary);
    }

    .testimonial-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }

    .testimonial-avatar {
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

    .testimonial-author {
      flex: 1;
    }

    .author-name {
      font-weight: 700;
      color: #111827;
      margin-bottom: 2px;
    }

    .author-position {
      font-size: 13px;
      color: #6b7280;
    }

    .testimonial-rating {
      color: #fbbf24;
      font-size: 16px;
    }

    .testimonial-text {
      font-size: 15px;
      line-height: 1.7;
      color: #374151;
      font-style: italic;
    }

    /* Pricing */
    .pricing {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.02), rgba(118, 75, 162, 0.02));
    }

    .pricing-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
    }

    .pricing-card {
      background: white;
      padding: 48px;
      border-radius: 20px;
      border: 2px solid #e5e7eb;
      position: relative;
      transition: all 0.3s;
    }

    .pricing-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .pricing-card.popular {
      border-color: var(--muxima-primary);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.03), rgba(118, 75, 162, 0.03));
    }

    .popular-badge {
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--muxima-gradient);
      color: white;
      padding: 6px 20px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
    }

    .plan-name {
      font-size: 28px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 8px;
    }

    .plan-description {
      color: #6b7280;
      margin-bottom: 24px;
    }

    .plan-pricing {
      margin-bottom: 32px;
      display: flex;
      align-items: flex-start;
      gap: 4px;
    }

    .currency {
      font-size: 24px;
      font-weight: 700;
      color: #6b7280;
      margin-top: 12px;
    }

    .price {
      font-size: 64px;
      font-weight: 900;
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }

    .period {
      font-size: 18px;
      color: #6b7280;
      align-self: flex-end;
      margin-bottom: 16px;
    }

    .plan-features {
      list-style: none;
      padding: 0;
      margin: 0 0 32px 0;
    }

    .plan-features li {
      padding: 12px 0;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
    }

    .feature-check {
      color: #10b981;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .feature-check svg {
      width: 16px;
      height: 16px;
      stroke: #10b981;
      stroke-width: 3;
    }

    /* CTA */
    .cta {
      background: radial-gradient(ellipse at center, rgba(102, 126, 234, 0.08) 0%, transparent 70%);
      text-align: center;
    }

    .cta-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .cta-content h2 {
      font-size: 48px;
      font-weight: 900;
      color: #111827;
      margin-bottom: 16px;
      letter-spacing: -0.01em;
    }

    .cta-content p {
      font-size: 20px;
      color: #6b7280;
      margin-bottom: 40px;
    }

    .cta-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    /* Footer */
    .footer {
      background: #111827;
      color: white;
      padding: 80px 32px 32px;
    }

    .footer-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 80px;
      margin-bottom: 48px;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }

    .footer-brand p {
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
      text-decoration: none;
      font-size: 20px;
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

    .footer-links {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
    }

    .footer-column h4 {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .footer-column a {
      display: block;
      color: #9ca3af;
      text-decoration: none;
      margin-bottom: 12px;
      transition: color 0.2s;
    }

    .footer-column a:hover {
      color: white;
    }

    .footer-bottom {
      padding-top: 32px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-bottom p {
      color: #9ca3af;
      font-size: 14px;
      margin: 0;
    }

    .footer-legal {
      display: flex;
      gap: 24px;
    }

    .footer-legal a {
      color: #9ca3af;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.2s;
    }

    .footer-legal a:hover {
      color: white;
    }

    /* Template Back */
    .template-back {
      position: fixed;
      bottom: 32px;
      left: 32px;
      z-index: 999;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .hero-container {
        grid-template-columns: 1fr;
        gap: 48px;
      }

      .nav-menu {
        display: none;
      }

      .footer-top {
        grid-template-columns: 1fr;
        gap: 48px;
      }

      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 48px;
      }

      .section-title {
        font-size: 36px;
      }

      .hero-cta,
      .cta-actions {
        flex-direction: column;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }
  `]
})
export class SaasLandingComponent {
  features = [
    {
      icon: '🚀',
      title: 'Deploy Instantâneo',
      description: 'Faça deploy da sua aplicação em segundos com nossa infraestrutura global.',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    {
      icon: '📊',
      title: 'Analytics em Tempo Real',
      description: 'Monitore performance, usuários e métricas com dashboards interativos.',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    },
    {
      icon: '🔒',
      title: 'Segurança Avançada',
      description: 'Proteção enterprise com SSL, backups automáticos e compliance.',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: '⚡',
      title: 'Performance Otimizada',
      description: 'CDN global, cache inteligente e otimização automática.',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    },
    {
      icon: '🔗',
      title: 'Integrações',
      description: 'Conecte com +100 ferramentas e serviços que você já usa.',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    {
      icon: '📱',
      title: 'API Completa',
      description: 'Documentação completa e SDKs para todas as linguagens.',
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)'
    }
  ];

  solutions = [
    {
      icon: '💼',
      title: 'Para Startups',
      description: 'Comece rápido e escale conforme cresce',
      features: [
        'Infraestrutura escalável',
        'Suporte técnico dedicado',
        'Créditos de $500',
        'Consultoria gratuita'
      ],
      featured: false
    },
    {
      icon: '🏢',
      title: 'Para Empresas',
      description: 'Soluções enterprise para grandes times',
      features: [
        'SLA 99.99% uptime',
        'Suporte 24/7 prioritário',
        'Compliance e segurança',
        'Onboarding personalizado',
        'Gerente de conta dedicado'
      ],
      featured: true
    },
    {
      icon: '👨‍💻',
      title: 'Para Desenvolvedores',
      description: 'Ferramentas poderosas para devs',
      features: [
        'CLI e APIs completas',
        'Ambientes ilimitados',
        'Git integrado',
        'Testes automatizados'
      ],
      featured: false
    }
  ];

  stats = [
    {
      value: '99.99%',
      label: 'Uptime',
      description: 'Garantido em SLA'
    },
    {
      value: '<50ms',
      label: 'Latência',
      description: 'Média global'
    },
    {
      value: '10K+',
      label: 'Empresas',
      description: 'Confiam na gente'
    },
    {
      value: '1M+',
      label: 'Deploys',
      description: 'Por mês'
    }
  ];

  testimonials = [
    {
      avatar: 'JV',
      name: 'João Valentim',
      position: 'CTO na TechCorp',
      rating: '★★★★★',
      text: 'Aumentamos nossa velocidade de deploy em 10x. A plataforma é incrivelmente fácil de usar e o suporte é excepcional.'
    },
    {
      avatar: 'MS',
      name: 'Maria Silva',
      position: 'Founder na StartupX',
      rating: '★★★★★',
      text: 'Essencial para nossa startup. Conseguimos escalar de 100 para 10.000 usuários sem mudar nada na infraestrutura.'
    },
    {
      avatar: 'PC',
      name: 'Pedro Costa',
      position: 'DevOps Lead na BizSoft',
      rating: '★★★★★',
      text: 'A melhor decisão que tomamos. Economia de tempo e custos, além de performance incrível.'
    }
  ];

  pricingPlans = [
    {
      name: 'Starter',
      description: 'Para projetos pessoais',
      price: '0',
      period: 'mês',
      popular: false,
      cta: 'Começar Grátis',
      features: [
        '3 projetos',
        '100GB transferência',
        'SSL gratuito',
        'Suporte comunidade',
        'Deploy automático'
      ]
    },
    {
      name: 'Pro',
      description: 'Para times pequenos',
      price: '99',
      period: 'mês',
      popular: true,
      cta: 'Começar Teste Grátis',
      features: [
        'Projetos ilimitados',
        '1TB transferência',
        'SSL gratuito',
        'Suporte prioritário 24/7',
        'Deploy automático',
        'Analytics avançado',
        'Ambientes preview',
        'Rollback instantâneo'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Para grandes empresas',
      price: '499',
      period: 'mês',
      popular: false,
      cta: 'Falar com Vendas',
      features: [
        'Tudo do Pro',
        'Transferência ilimitada',
        'SLA 99.99%',
        'Gerente dedicado',
        'Compliance avançado',
        'On-premise disponível',
        'Treinamento incluído',
        'Suporte white-glove'
      ]
    }
  ];

  constructor(private router: Router) {}

  getFeatureIcon(title: string): string {
    const icons: {[key: string]: string} = {
      'Deploy Instantâneo': '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
      'Analytics em Tempo Real': '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
      'Segurança Avançada': '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
      'Performance Otimizada': '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
      'Integrações': '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
      'API Completa': '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
    };
    return icons[title] || '';
  }

  getSolutionIcon(title: string): string {
    const icons: {[key: string]: string} = {
      'Startups': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
      'Agências': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      'Enterprise': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
    };
    return icons[title] || '';
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goBack() {
    this.router.navigate(['/templates']);
  }
}
