import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'muxima-getting-started',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="getting-started-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">🚀 Getting Started</h1>
          <p class="hero-subtitle">
            Bem-vindo ao <strong>Muxima UI</strong>! Uma biblioteca Angular moderna e completa 
            desenvolvida por <strong class="author">Aldemiro Valentim</strong>, mais conhecido por <strong class="author">JokerScript</strong>.
          </p>
          <div class="hero-badges">
            <span class="badge">🎨 80+ Componentes</span>
            <span class="badge">🚀 Standalone</span>
            <span class="badge">💪 TypeScript</span>
            <span class="badge">⚡ Performance</span>
          </div>
        </div>
      </section>

      <!-- Quick Info -->
      <section class="info-section">
        <div class="info-card purple-gradient">
          <div class="info-icon">💜</div>
          <h3>Muxima</h3>
          <p>"Coração" em Kimbundu - refletindo a paixão dedicada a cada componente</p>
        </div>
        <div class="info-card">
          <div class="info-icon">👨‍💻</div>
          <h3>Desenvolvedor</h3>
          <p>Aldemiro Valentim (JokerScript)</p>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/aldemiro-valentim" target="_blank" title="LinkedIn">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://www.instagram.com/jokerscript" target="_blank" title="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">�</div>
          <h3>Contactos</h3>
          <p style="font-size: 14px; line-height: 1.6;">
            <a href="https://www.linkedin.com/in/aldemiro-valentim" target="_blank" style="color: var(--muxima-primary);">LinkedIn</a><br>
            <a href="https://www.instagram.com/jokerscript" target="_blank" style="color: var(--muxima-primary);">Instagram</a>
          </p>
        </div>
      </section>

      <!-- Prerequisites -->
      <section class="content-section">
        <h2 class="section-title">📋 Pré-requisitos</h2>
        <p class="section-description">
          Certifique-se de ter o ambiente configurado antes de começar:
        </p>
        
        <div class="table-container">
          <table class="requirements-table">
            <thead>
              <tr>
                <th>Ferramenta</th>
                <th>Versão Mínima</th>
                <th>Verificar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Node.js</strong></td>
                <td>18.0.0</td>
                <td><code>node --version</code></td>
              </tr>
              <tr>
                <td><strong>npm</strong></td>
                <td>9.0.0</td>
                <td><code>npm --version</code></td>
              </tr>
              <tr>
                <td><strong>Angular CLI</strong></td>
                <td>15.0.0</td>
                <td><code>ng version</code></td>
              </tr>
              <tr>
                <td><strong>TypeScript</strong></td>
                <td>4.8.0</td>
                <td><code>tsc --version</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="code-block">
          <div class="code-header">
            <span class="code-label">Terminal</span>
            <button class="copy-btn" (click)="copyCode('check-versions')">📋 Copiar</button>
          </div>
          <pre id="check-versions"><code># Verifique suas versões
node --version    # ✅ v18.0.0+
npm --version     # ✅ v9.0.0+
ng version        # ✅ Angular CLI: 15.0.0+</code></pre>
        </div>
      </section>

      <!-- Installation -->
      <section class="content-section">
        <h2 class="section-title">📦 Instalação</h2>
        
        <div class="installation-options">
          <div class="install-option">
            <h3>📦 Via NPM (Recomendado)</h3>
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">bash</span>
                <button class="copy-btn" (click)="copyCode('install-npm')">📋 Copiar</button>
              </div>
              <pre id="install-npm"><code># Instalação completa
npm install @muxima-ui/core

# Ou componentes individuais
npm install @muxima-ui/button @muxima-ui/input</code></pre>
            </div>
          </div>

          <div class="install-option">
            <h3>🧶 Via Yarn</h3>
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">bash</span>
                <button class="copy-btn" (click)="copyCode('install-yarn')">📋 Copiar</button>
              </div>
              <pre id="install-yarn"><code>yarn add @muxima-ui/core</code></pre>
            </div>
          </div>

          <div class="install-option">
            <h3>💻 Desenvolvimento Local</h3>
            <div class="code-block">
              <div class="code-header">
                <span class="code-label">bash</span>
                <button class="copy-btn" (click)="copyCode('install-local')">📋 Copiar</button>
              </div>
              <pre id="install-local"><code># Clone o repositório de Aldemiro Valentim
git clone https://github.com/Aldemiro20/muxima-ui.git
cd muxima-ui

# Instale as dependências
npm install

# Inicie o servidor
npm start

# 🌐 http://localhost:4200</code></pre>
            </div>
          </div>
        </div>

        <div class="alert-info">
          <div class="alert-icon">💡</div>
          <div class="alert-content">
            <strong>Dica do Aldemiro Valentim:</strong>
            <p>Use Node.js LTS (Long Term Support) para melhor estabilidade em produção.</p>
          </div>
        </div>
      </section>

      <!-- Quick Start -->
      <section class="content-section">
        <h2 class="section-title">🎯 Quick Start - Seu Primeiro Componente</h2>
        
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Importe o Componente</h3>
              <p>Os componentes Muxima UI são <strong>standalone</strong> - sem necessidade de NgModules!</p>
              
              <div class="code-block">
                <div class="code-header">
                  <span class="code-label">app.component.ts</span>
                  <button class="copy-btn" (click)="copyCode('step1')">📋 Copiar</button>
                </div>
                <pre id="step1"><code>import {{ '{' }} Component {{ '}' }} from '@angular/core';
import {{ '{' }} MuximaAlertComponent {{ '}' }} from '@muxima-ui/alert';

@Component({{ '{' }}
  selector: 'app-root',
  standalone: true,
  imports: [MuximaAlertComponent],
  template: \`
    &lt;div class="container"&gt;
      &lt;muxima-alert type="success" appearance="fill"&gt;
        🎉 Bem-vindo ao Muxima UI by JokerScript!
        &lt;br&gt;
        &lt;small&gt;Desenvolvido por Aldemiro Valentim&lt;/small&gt;
      &lt;/muxima-alert&gt;
    &lt;/div&gt;
  \`
{{ '}' }})
export class AppComponent {{ '{' }}{{ '}' }}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Configure o Tema (Opcional)</h3>
              <p>Importe o tema purple gradient desenvolvido por <strong>Aldemiro Valentim</strong>:</p>
              
              <div class="code-block">
                <div class="code-header">
                  <span class="code-label">styles.scss</span>
                  <button class="copy-btn" (click)="copyCode('step2')">📋 Copiar</button>
                </div>
                <pre id="step2"><code>// Tema Muxima UI by JokerScript
@import '@muxima-ui/styles/theme';

// Customize as variáveis (opcional)
:root {{ '{' }}
  --muxima-primary: #667eea;
  --muxima-secondary: #764ba2;
  --muxima-accent: #f093fb;
{{ '}' }}

body {{ '{' }}
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  background: #f9fafb;
{{ '}' }}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Execute sua Aplicação</h3>
              <p>Inicie o servidor de desenvolvimento:</p>
              
              <div class="code-block">
                <div class="code-header">
                  <span class="code-label">Terminal</span>
                  <button class="copy-btn" (click)="copyCode('step3')">📋 Copiar</button>
                </div>
                <pre id="step3"><code>npm start
# ou
ng serve

# 🎉 Acesse: http://localhost:4200</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="success-box">
          <div class="success-icon">🎉</div>
          <h3>Pronto!</h3>
          <p>Seu primeiro componente Muxima UI está funcionando!</p>
        </div>
      </section>

      <!-- Features -->
      <section class="content-section">
        <h2 class="section-title">✨ Características do Muxima UI</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>80+ Componentes</h3>
            <p>Da básica à super avançados, todos desenvolvidos por Aldemiro Valentim</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🚀</div>
            <h3>Standalone</h3>
            <p>Zero configuração de módulos, pronto para usar</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💪</div>
            <h3>TypeScript First</h3>
            <p>100% type-safe com IntelliSense completo</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>Tree-shakeable</h3>
            <p>Bundle otimizado, importe apenas o que usar</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">♿</div>
            <h3>Acessível</h3>
            <p>WCAG 2.1 AA compliant em todos os componentes</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🌈</div>
            <h3>Personalizável</h3>
            <p>Tema purple gradient com variáveis CSS customizáveis</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Responsive</h3>
            <p>Design mobile-first, perfeito em qualquer dispositivo</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Performance</h3>
            <p>OnPush change detection para máxima eficiência</p>
          </div>
        </div>
      </section>

      <!-- Next Steps -->
      <section class="content-section">
        <h2 class="section-title">📚 Próximos Passos</h2>
        
        <div class="next-steps-grid">
          <a routerLink="/components/alert" class="next-step-card">
            <div class="next-step-icon">📖</div>
            <h3>Componentes</h3>
            <p>Explore os 80+ componentes disponíveis</p>
            <span class="next-step-arrow">→</span>
          </a>
          
          <a routerLink="/theming" class="next-step-card">
            <div class="next-step-icon">🎨</div>
            <h3>Temas</h3>
            <p>Personalize cores e estilos</p>
            <span class="next-step-arrow">→</span>
          </a>
          
          <a href="https://github.com/Aldemiro20/muxima-ui" target="_blank" class="next-step-card">
            <div class="next-step-icon">🐛</div>
            <h3>GitHub</h3>
            <p>Repositório de Aldemiro Valentim</p>
            <span class="next-step-arrow">→</span>
          </a>
          
          <div class="next-step-card disabled">
            <div class="next-step-icon">💡</div>
            <h3>Exemplos</h3>
            <p>Apps completos e casos de uso</p>
            <span class="next-step-arrow">→</span>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="getting-started-footer">
        <div class="footer-content">
          <p class="footer-text">
            <strong>Desenvolvido com 💜 Muxima (coração)</strong>
          </p>
          <p class="footer-author">
            por <a href="https://github.com/Aldemiro20" target="_blank">Aldemiro Valentim</a>, mais conhecido por <strong>JokerScript</strong>
          </p>
          <div class="footer-social">
            <a href="https://www.linkedin.com/in/aldemiro-valentim" target="_blank" class="social-btn">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <a href="https://www.instagram.com/jokerscript" target="_blank" class="social-btn">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Instagram
            </a>
          </div>
          <p class="footer-quote">
            "Código limpo, componentes elegantes, experiências incríveis" ✨
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .getting-started-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    /* Hero Section */
    .hero-section {
      text-align: center;
      margin-bottom: 60px;
      padding: 60px 20px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-radius: 24px;
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
      font-size: 22px;
      color: #6b7280;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto 32px;
    }

    .author {
      color: var(--muxima-primary);
      font-weight: 700;
    }

    .hero-badges {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .badge {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border: 2px solid #667eea;
      color: #667eea;
      padding: 10px 20px;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 600;
    }

    /* Info Section */
    .info-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 60px;
    }

    .info-card {
      background: white;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .info-card:hover {
      transform: translateY(-4px);
      border-color: #667eea;
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
    }

    .info-card.purple-gradient {
      background: var(--muxima-gradient);
      color: white;
    }

    .info-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .info-card h3 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .info-card p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      line-height: 1.5;
    }

    .info-card:not(.purple-gradient) p {
      color: #6b7280;
    }

    .social-links {
      display: flex;
      gap: 12px;
      margin-top: 12px;
      justify-content: center;
    }

    .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 8px;
      color: #667eea;
      transition: all 0.3s ease;
    }

    .social-links a:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }

    /* Content Section */
    .content-section {
      margin-bottom: 80px;
    }

    .section-title {
      font-size: 36px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 3px solid #667eea;
    }

    .section-description {
      font-size: 18px;
      color: #6b7280;
      margin-bottom: 32px;
      line-height: 1.6;
    }

    /* Table */
    .table-container {
      overflow-x: auto;
      margin-bottom: 32px;
    }

    .requirements-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .requirements-table thead {
      background: var(--muxima-gradient);
      color: white;
    }

    .requirements-table th,
    .requirements-table td {
      padding: 16px;
      text-align: left;
    }

    .requirements-table tbody tr {
      border-bottom: 1px solid #e5e7eb;
    }

    .requirements-table tbody tr:hover {
      background: rgba(102, 126, 234, 0.05);
    }

    /* Code Block */
    .code-block {
      background: #1f2937;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 24px;
    }

    .code-header {
      background: #111827;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #374151;
    }

    .code-label {
      color: #9ca3af;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .copy-btn {
      background: transparent;
      border: 1px solid #4b5563;
      color: #9ca3af;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .copy-btn:hover {
      background: #374151;
      border-color: #667eea;
      color: #667eea;
    }

    pre {
      margin: 0;
      padding: 24px;
      overflow-x: auto;
    }

    code {
      color: #f3f4f6;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
    }

    /* Installation Options */
    .installation-options {
      display: grid;
      gap: 32px;
      margin-bottom: 32px;
    }

    .install-option h3 {
      font-size: 22px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 16px;
    }

    /* Alert */
    .alert-info {
      display: flex;
      gap: 16px;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%);
      border-left: 4px solid #3b82f6;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 32px;
    }

    .alert-icon {
      font-size: 32px;
    }

    .alert-content strong {
      color: #1e40af;
      display: block;
      margin-bottom: 8px;
      font-size: 16px;
    }

    .alert-content p {
      color: #1f2937;
      margin: 0;
      line-height: 1.5;
    }

    /* Steps */
    .steps {
      display: flex;
      flex-direction: column;
      gap: 40px;
      margin-bottom: 40px;
    }

    .step {
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }

    .step-number {
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--muxima-gradient);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .step-content {
      flex: 1;
    }

    .step-content h3 {
      font-size: 24px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 12px;
    }

    .step-content p {
      color: #6b7280;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    /* Success Box */
    .success-box {
      text-align: center;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
      border: 2px solid #10b981;
      border-radius: 16px;
      padding: 40px;
    }

    .success-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .success-box h3 {
      font-size: 28px;
      font-weight: 700;
      color: #065f46;
      margin-bottom: 8px;
    }

    .success-box p {
      font-size: 18px;
      color: #047857;
      margin: 0;
    }

    /* Features Grid */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 32px;
    }

    .feature-card {
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .feature-card:hover {
      transform: translateY(-4px);
      border-color: #667eea;
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
    }

    .feature-icon {
      font-size: 40px;
      margin-bottom: 16px;
    }

    .feature-card h3 {
      font-size: 20px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 12px;
    }

    .feature-card p {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
    }

    /* Next Steps */
    .next-steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 24px;
      margin-top: 32px;
    }

    .next-step-card {
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      position: relative;
      display: block;
    }

    .next-step-card:not(.disabled):hover {
      transform: translateY(-4px);
      border-color: #667eea;
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
    }

    .next-step-card.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .next-step-icon {
      font-size: 36px;
      margin-bottom: 16px;
    }

    .next-step-card h3 {
      font-size: 20px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 8px;
    }

    .next-step-card p {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
      margin: 0 0 16px;
    }

    .next-step-arrow {
      position: absolute;
      bottom: 24px;
      right: 24px;
      font-size: 24px;
      color: #667eea;
      font-weight: 700;
    }

    /* Footer */
    .getting-started-footer {
      margin-top: 80px;
      padding: 40px;
      background: var(--muxima-gradient);
      border-radius: 16px;
      text-align: center;
      color: white;
    }

    .footer-text {
      font-size: 24px;
      margin-bottom: 16px;
    }

    .footer-author {
      font-size: 18px;
      margin-bottom: 16px;
    }

    .footer-author a {
      color: white;
      text-decoration: underline;
      font-weight: 700;
    }

    .footer-social {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 24px;
    }

    .social-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      color: white;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    .social-btn svg {
      width: 20px;
      height: 20px;
    }

    .footer-quote {
      font-size: 16px;
      font-style: italic;
      opacity: 0.9;
      margin: 0;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 18px;
      }

      .section-title {
        font-size: 28px;
      }

      .step {
        flex-direction: column;
      }

      .step-number {
        width: 50px;
        height: 50px;
        font-size: 24px;
      }
    }
  `]
})
export class GettingStartedComponent {
  copyCode(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const text = element.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        alert('✅ Código copiado para a área de transferência!');
      });
    }
  }
}

