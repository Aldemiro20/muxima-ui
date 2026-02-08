import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'muxima-templates',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="templates-page">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">📐 Templates</h1>
          <p class="hero-subtitle">
            Templates prontos para uso com componentes Muxima UI
          </p>
          <p class="hero-description">
            Exemplos completos e funcionais que você pode copiar e adaptar para o seu projeto.
            Todos os templates são responsivos e seguem as melhores práticas de UX/UI.
          </p>
        </div>
      </section>

      <!-- Templates Grid -->
      <section class="templates-grid">
        <!-- Template 1: Dashboard -->
        <div class="template-card">
          <div class="template-preview">
            <img src="https://via.placeholder.com/600x400/667eea/ffffff?text=Dashboard+Admin" alt="Dashboard Template">
            <div class="template-overlay">
              <button class="btn-preview" (click)="navigateTo('/templates/dashboard')">
                👁️ Ver Preview
              </button>
            </div>
          </div>
          <div class="template-info">
            <div class="template-header">
              <h3>📊 Dashboard Admin</h3>
              <span class="template-badge popular">Popular</span>
            </div>
            <p class="template-description">
              Painel administrativo completo com cards de estatísticas, gráficos, tabelas e notificações.
              Ideal para sistemas de gestão e análise de dados.
            </p>
            <div class="template-components">
              <span class="component-tag">Stats Card</span>
              <span class="component-tag">Chart</span>
              <span class="component-tag">Table</span>
              <span class="component-tag">Badge</span>
              <span class="component-tag">Alert</span>
              <span class="component-tag">Progress</span>
            </div>
            <div class="template-actions">
              <button class="btn-secondary" (click)="navigateTo('/templates/dashboard')">
                Ver Template
              </button>
              <button class="btn-ghost" (click)="copyCode('dashboard')">
                📋 Copiar Código
              </button>
            </div>
          </div>
        </div>

        <!-- Template 2: Sign In -->
        <div class="template-card">
          <div class="template-preview">
            <img src="https://via.placeholder.com/600x400/667eea/ffffff?text=Sign+In" alt="Sign In Template">
            <div class="template-overlay">
              <button class="btn-preview" (click)="navigateTo('/templates/signin')">
                👁️ Ver Preview
              </button>
            </div>
          </div>
          <div class="template-info">
            <div class="template-header">
              <h3>� Sign In (Login)</h3>
              <span class="template-badge new">Novo</span>
            </div>
            <p class="template-description">
              Página de login moderna com autenticação social (Google, GitHub), campos de email e senha, 
              opção "Lembrar de mim" e link para recuperação de senha.
            </p>
            <div class="template-components">
              <span class="component-tag">Input</span>
              <span class="component-tag">Checkbox</span>
              <span class="component-tag">Button</span>
            </div>
            <div class="template-actions">
              <button class="btn-secondary" (click)="navigateTo('/templates/signin')">
                Ver Template
              </button>
              <button class="btn-ghost" (click)="copyCode('signin')">
                📋 Copiar Código
              </button>
            </div>
          </div>
        </div>

        <!-- Template 3: Sign Up -->
        <div class="template-card">
          <div class="template-preview">
            <img src="https://via.placeholder.com/600x400/764ba2/ffffff?text=Sign+Up" alt="Sign Up Template">
            <div class="template-overlay">
              <button class="btn-preview" (click)="navigateTo('/templates/signup')">
                👁️ Ver Preview
              </button>
            </div>
          </div>
          <div class="template-info">
            <div class="template-header">
              <h3>📝 Sign Up (Registro)</h3>
              <span class="template-badge new">Novo</span>
            </div>
            <p class="template-description">
              Formulário de registro completo com validações, autenticação social (Google, GitHub),
              confirmação de senha e aceite de termos. Design atrativo e conversivo.
            </p>
            <div class="template-components">
              <span class="component-tag">Input</span>
              <span class="component-tag">Checkbox</span>
              <span class="component-tag">Button</span>
            </div>
            <div class="template-actions">
              <button class="btn-secondary" (click)="navigateTo('/templates/signup')">
                Ver Template
              </button>
              <button class="btn-ghost" (click)="copyCode('signup')">
                📋 Copiar Código
              </button>
            </div>
          </div>
        </div>

        <!-- Template 4: E-commerce Landing -->
        <div class="template-card">
          <div class="template-preview">
            <img src="https://via.placeholder.com/600x400/10b981/ffffff?text=E-commerce+Landing" alt="E-commerce Template">
            <div class="template-overlay">
              <button class="btn-preview" (click)="navigateTo('/templates/ecommerce')">
                👁️ Ver Preview
              </button>
            </div>
          </div>
          <div class="template-info">
            <div class="template-header">
              <h3>🛍️ E-commerce Landing Page</h3>
              <span class="template-badge premium">Premium</span>
            </div>
            <p class="template-description">
              Landing page completa para e-commerce com hero section, produtos, depoimentos, preços e mais.
              Design premium tipo Envato com animações e responsividade total.
            </p>
            <div class="template-components">
              <span class="component-tag">Navbar</span>
              <span class="component-tag">Hero</span>
              <span class="component-tag">Cards</span>
              <span class="component-tag">Grid</span>
              <span class="component-tag">Footer</span>
              <span class="component-tag">Animations</span>
            </div>
            <div class="template-actions">
              <button class="btn-secondary" (click)="navigateTo('/templates/ecommerce')">
                Ver Template
              </button>
              <button class="btn-ghost" (click)="copyCode('ecommerce')">
                📋 Copiar Código
              </button>
            </div>
          </div>
        </div>

        <!-- Template 4: SaaS Landing -->
        <div class="template-card">
          <div class="template-preview">
            <img src="https://via.placeholder.com/600x400/3b82f6/ffffff?text=SaaS+Landing" alt="SaaS Template">
            <div class="template-overlay">
              <button class="btn-preview" (click)="navigateTo('/templates/saas')">
                👁️ Ver Preview
              </button>
            </div>
          </div>
          <div class="template-info">
            <div class="template-header">
              <h3>⚡ SaaS Landing Page</h3>
              <span class="template-badge premium">Premium</span>
            </div>
            <p class="template-description">
              Landing page moderna para SaaS com hero section animado, features, soluções, depoimentos, pricing e mais.
              Design profissional tipo ThemeForest com componentes reutilizáveis.
            </p>
            <div class="template-components">
              <span class="component-tag">Fixed Navbar</span>
              <span class="component-tag">Hero</span>
              <span class="component-tag">Features</span>
              <span class="component-tag">Solutions</span>
              <span class="component-tag">Pricing</span>
              <span class="component-tag">Testimonials</span>
            </div>
            <div class="template-actions">
              <button class="btn-secondary" (click)="navigateTo('/templates/saas')">
                Ver Template
              </button>
              <button class="btn-ghost" (click)="copyCode('saas')">
                📋 Copiar Código
              </button>
            </div>
          </div>
        </div>

        <!-- Template 5: Glass Landing -->
        <div class="template-card">
          <div class="template-preview">
            <img src="https://via.placeholder.com/600x400/764ba2/ffffff?text=Glass+Landing" alt="Glass Template">
            <div class="template-overlay">
              <button class="btn-preview" (click)="navigateTo('/templates/glass-landing')">
                👁️ Ver Preview
              </button>
            </div>
          </div>
          <div class="template-info">
            <div class="template-header">
              <h3>✨ Glass Landing (Glassmorphism)</h3>
              <span class="template-badge new">Novo</span>
            </div>
            <p class="template-description">
              Landing page profissional com design glassmorphism moderno. Cards com efeito de vidro fosco,
              backdrop blur, gradientes animados e transparências elegantes. Perfeito para projetos premium.
            </p>
            <div class="template-components">
              <span class="component-tag">Glass Nav</span>
              <span class="component-tag">Hero</span>
              <span class="component-tag">Features</span>
              <span class="component-tag">Services</span>
              <span class="component-tag">Portfolio</span>
              <span class="component-tag">Testimonials</span>
            </div>
            <div class="template-actions">
              <button class="btn-secondary" (click)="navigateTo('/templates/glass-landing')">
                Ver Template
              </button>
              <button class="btn-ghost" (click)="copyCode('glass-landing')">
                📋 Copiar Código
              </button>
            </div>
          </div>
        </div>

        <!-- Template 6: Neon Landing -->
        <div class="template-card">
          <div class="template-preview">
            <img src="https://via.placeholder.com/600x400/0a0e27/00ffff?text=Neon+Landing" alt="Neon Template">
            <div class="template-overlay">
              <button class="btn-preview" (click)="navigateTo('/templates/neon-landing')">
                👁️ Ver Preview
              </button>
            </div>
          </div>
          <div class="template-info">
            <div class="template-header">
              <h3>⚡ Neon Landing (Cyberpunk)</h3>
              <span class="template-badge new">Novo</span>
            </div>
            <p class="template-description">
              Landing page futurista com design neon cyberpunk. Grid animado, efeitos de brilho neon vibrantes,
              círculos flutuantes e estética anos 80/90. Perfeito para projetos tech e gaming.
            </p>
            <div class="template-components">
              <span class="component-tag">Neon Nav</span>
              <span class="component-tag">Hero</span>
              <span class="component-tag">Features</span>
              <span class="component-tag">Services</span>
              <span class="component-tag">Portfolio</span>
              <span class="component-tag">Pricing</span>
            </div>
            <div class="template-actions">
              <button class="btn-secondary" (click)="navigateTo('/templates/neon-landing')">
                Ver Template
              </button>
              <button class="btn-ghost" (click)="copyCode('neon-landing')">
                📋 Copiar Código
              </button>
            </div>
          </div>
        </div>

        <!-- Template 7: Workspace Pro -->
        <div class="template-card">
          <div class="template-preview">
            <img src="https://via.placeholder.com/600x400/3B82F6/ffffff?text=Workspace+Pro" alt="Workspace Template">
            <div class="template-overlay">
              <button class="btn-preview" (click)="navigateTo('/templates/workspace')">
                👁️ Ver Preview
              </button>
            </div>
          </div>
          <div class="template-info">
            <div class="template-header">
              <h3>💼 Workspace Pro</h3>
              <span class="template-badge popular">Popular</span>
            </div>
            <p class="template-description">
              Sistema profissional de gerenciamento de workspace com file manager, document viewer e calendário integrados.
              Interface completa tipo Dropbox/Google Drive com navegação avançada, preview de documentos e gestão de tarefas.
            </p>
            <div class="template-components">
              <span class="component-tag">File Manager</span>
              <span class="component-tag">Document Viewer</span>
              <span class="component-tag">Calendar</span>
              <span class="component-tag">Badge</span>
              <span class="component-tag">Notifications</span>
              <span class="component-tag">Tasks</span>
            </div>
            <div class="template-actions">
              <button class="btn-secondary" (click)="navigateTo('/templates/workspace')">
                Ver Template
              </button>
              <button class="btn-ghost" (click)="copyCode('workspace')">
                📋 Copiar Código
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits -->
      <section class="benefits">
        <h2 class="section-title">✨ Por que usar Templates?</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">⚡</div>
            <h3>Desenvolvimento Rápido</h3>
            <p>Economize horas de desenvolvimento com layouts prontos e testados.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🎨</div>
            <h3>Design Profissional</h3>
            <p>Interfaces modernas e elegantes seguindo as melhores práticas de UI/UX.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📱</div>
            <h3>Totalmente Responsivo</h3>
            <p>Funciona perfeitamente em desktop, tablet e mobile.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔧</div>
            <h3>Fácil Customização</h3>
            <p>Código limpo e bem documentado para fácil adaptação.</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <p>
          💜 Criado com <strong>Muxima UI</strong> por 
          <a href="https://www.linkedin.com/in/aldemiro-valentim" target="_blank">
            Aldemiro Valentim, mais conhecido por JokerScript
          </a>
        </p>
      </footer>
    </div>
  `,
  styles: [`
    .templates-page {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Hero */
    .hero {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
      border-radius: 24px;
      margin-bottom: 60px;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 56px;
      font-weight: 800;
      background: var(--muxima-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 24px;
    }

    .hero-subtitle {
      font-size: 24px;
      color: #1f2937;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .hero-description {
      font-size: 18px;
      color: #6b7280;
      line-height: 1.8;
      max-width: 700px;
      margin: 0 auto;
    }

    /* Templates Grid */
    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 40px;
      margin-bottom: 80px;
    }

    .template-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .template-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .template-preview {
      position: relative;
      overflow: hidden;
      aspect-ratio: 3/2;
      background: #f3f4f6;
    }

    .template-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .template-card:hover .template-preview img {
      transform: scale(1.05);
    }

    .template-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .template-card:hover .template-overlay {
      opacity: 1;
    }

    .btn-preview {
      padding: 12px 32px;
      background: white;
      color: #1f2937;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-preview:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
    }

    .template-info {
      padding: 32px;
    }

    .template-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .template-header h3 {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .template-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .template-badge.popular {
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: white;
    }

    .template-badge.new {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
    }

    .template-badge.premium {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }

    .template-description {
      font-size: 16px;
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .template-components {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 24px;
    }

    .component-tag {
      padding: 6px 12px;
      background: #f3f4f6;
      color: var(--muxima-primary);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
    }

    .template-actions {
      display: flex;
      gap: 12px;
    }

    .btn-secondary,
    .btn-ghost {
      flex: 1;
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-secondary {
      background: var(--muxima-gradient);
      color: white;
    }

    .btn-secondary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    }

    .btn-ghost {
      background: transparent;
      color: var(--muxima-primary);
      border: 2px solid var(--muxima-primary);
    }

    .btn-ghost:hover {
      background: rgba(102, 126, 234, 0.1);
    }

    /* Benefits */
    .benefits {
      margin-bottom: 80px;
    }

    .section-title {
      font-size: 36px;
      font-weight: 700;
      text-align: center;
      color: #1f2937;
      margin-bottom: 48px;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }

    .benefit-card {
      text-align: center;
      padding: 32px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
    }

    .benefit-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .benefit-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .benefit-card h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 12px;
    }

    .benefit-card p {
      font-size: 15px;
      color: #6b7280;
      line-height: 1.6;
    }

    /* Footer */
    .footer {
      text-align: center;
      padding: 40px 20px;
      border-top: 1px solid #e5e7eb;
    }

    .footer p {
      font-size: 16px;
      color: #6b7280;
    }

    .footer a {
      color: var(--muxima-primary);
      text-decoration: none;
      font-weight: 600;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .templates-grid {
        grid-template-columns: 1fr;
      }

      .hero-title {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 18px;
      }

      .template-actions {
        flex-direction: column;
      }
    }
  `]
})
export class TemplatesComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  copyCode(templateId: string) {
    alert(`📋 Código do template "${templateId}" copiado! (Funcionalidade em desenvolvimento)`);
  }
}
