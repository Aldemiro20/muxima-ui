import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../services/theme.service';

@Component({
  selector: 'muxima-theming',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theming-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">🎨 Sistema de Temas</h1>
          <p class="hero-subtitle">
            Personalize a aparência do <strong>Muxima UI</strong> de acordo com a identidade visual do seu projeto.
            Sistema baseado em CSS Variables para máxima flexibilidade.
          </p>
          <div class="hero-badges">
            <span class="badge">🎨 CSS Variables</span>
            <span class="badge">🌙 Dark Mode</span>
            <span class="badge">🎯 Type-Safe</span>
            <span class="badge">⚡ Performance</span>
          </div>
        </div>
      </section>

      <!-- Theme Switcher -->
      <section class="theme-switcher-section">
        <h2 class="section-title">🎨 Experimente os Temas</h2>
        <p class="section-description">
          Clique em um tema abaixo para visualizar as mudanças em tempo real:
        </p>

        <div class="theme-buttons">
          <button 
            *ngFor="let theme of themes" 
            class="theme-btn"
            [class.active]="currentTheme === theme.id"
            (click)="applyTheme(theme)"
          >
            <div class="theme-preview">
              <div class="color-dot" [style.background]="theme.primary"></div>
              <div class="color-dot" [style.background]="theme.secondary"></div>
              <div class="color-dot" [style.background]="theme.accent"></div>
            </div>
            <span class="theme-name">{{ theme.name }}</span>
            <span class="theme-icon">{{ theme.icon }}</span>
          </button>
        </div>

        <!-- Live Preview -->
        <div class="live-preview">
          <h3>Preview em Tempo Real</h3>
          <div class="preview-content">
            <button class="demo-btn primary">Botão Primário</button>
            <button class="demo-btn secondary">Botão Secundário</button>
            <div class="demo-card">
              <h4>Card de Exemplo</h4>
              <p>Este card demonstra o tema atual aplicado.</p>
              <div class="demo-badge">Badge</div>
            </div>
            <div class="demo-alert">
              ✨ Alerta com o tema atual
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Preview -->
      <section class="preview-section">
        <h2 class="section-title">🎨 Paleta de Cores Muxima UI</h2>
        <p class="section-description">
          O tema padrão utiliza um gradiente purple que evoca elegância e modernidade.
        </p>
        
        <div class="color-palette">
          <div class="color-card primary">
            <div class="color-swatch"></div>
            <div class="color-info">
              <h4>Primary</h4>
              <code>#667eea</code>
              <span class="color-usage">Botões, links, highlights</span>
            </div>
          </div>
          <div class="color-card secondary">
            <div class="color-swatch"></div>
            <div class="color-info">
              <h4>Secondary</h4>
              <code>#764ba2</code>
              <span class="color-usage">Gradientes, acentos</span>
            </div>
          </div>
          <div class="color-card success">
            <div class="color-swatch"></div>
            <div class="color-info">
              <h4>Success</h4>
              <code>#10b981</code>
              <span class="color-usage">Confirmações, sucesso</span>
            </div>
          </div>
          <div class="color-card warning">
            <div class="color-swatch"></div>
            <div class="color-info">
              <h4>Warning</h4>
              <code>#f59e0b</code>
              <span class="color-usage">Alertas, avisos</span>
            </div>
          </div>
          <div class="color-card danger">
            <div class="color-swatch"></div>
            <div class="color-info">
              <h4>Danger</h4>
              <code>#ef4444</code>
              <span class="color-usage">Erros, ações críticas</span>
            </div>
          </div>
          <div class="color-card info">
            <div class="color-swatch"></div>
            <div class="color-info">
              <h4>Info</h4>
              <code>#3b82f6</code>
              <span class="color-usage">Informações, dicas</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="content-section">
        <h2 class="section-title">📦 Instalação do Tema</h2>
        <p class="section-description">
          Importe o tema padrão no seu arquivo de estilos globais:
        </p>

        <div class="code-block">
          <div class="code-header">
            <span class="code-language">SCSS</span>
            <button class="copy-btn" (click)="copyCode('install')">📋 Copiar</button>
          </div>
          <pre id="install"><code>{{ installCode }}</code></pre>
        </div>
      </section>

      <!-- CSS Variables -->
      <section class="content-section">
        <h2 class="section-title">🎯 Variáveis CSS Disponíveis</h2>
        <p class="section-description">
          Todas as variáveis CSS que você pode customizar:
        </p>

        <div class="variables-grid">
          <div class="variable-card">
            <h3>🎨 Cores Primárias</h3>
            <ul class="variable-list">
              <li><code>--muxima-primary</code> <span>#667eea</span></li>
              <li><code>--muxima-primary-light</code> <span>#8b9df8</span></li>
              <li><code>--muxima-primary-dark</code> <span>#4f5fd9</span></li>
              <li><code>--muxima-secondary</code> <span>#764ba2</span></li>
              <li><code>--muxima-secondary-light</code> <span>#9370c4</span></li>
              <li><code>--muxima-secondary-dark</code> <span>#5a3780</span></li>
            </ul>
          </div>

          <div class="variable-card">
            <h3>✅ Cores de Status</h3>
            <ul class="variable-list">
              <li><code>--muxima-success</code> <span>#10b981</span></li>
              <li><code>--muxima-warning</code> <span>#f59e0b</span></li>
              <li><code>--muxima-danger</code> <span>#ef4444</span></li>
              <li><code>--muxima-info</code> <span>#3b82f6</span></li>
            </ul>
          </div>

          <div class="variable-card">
            <h3>🌑 Cores Neutras</h3>
            <ul class="variable-list">
              <li><code>--muxima-background</code> <span>#ffffff</span></li>
              <li><code>--muxima-surface</code> <span>#f9fafb</span></li>
              <li><code>--muxima-text</code> <span>#1f2937</span></li>
              <li><code>--muxima-text-secondary</code> <span>#6b7280</span></li>
              <li><code>--muxima-border</code> <span>#e5e7eb</span></li>
              <li><code>--muxima-shadow</code> <span>rgba(0,0,0,0.1)</span></li>
            </ul>
          </div>

          <div class="variable-card">
            <h3>📐 Espaçamento & Tipografia</h3>
            <ul class="variable-list">
              <li><code>--muxima-border-radius</code> <span>8px</span></li>
              <li><code>--muxima-border-radius-lg</code> <span>12px</span></li>
              <li><code>--muxima-font-family</code> <span>Plus Jakarta Sans</span></li>
              <li><code>--muxima-font-size-base</code> <span>16px</span></li>
              <li><code>--muxima-transition</code> <span>0.2s ease</span></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Customization Examples -->
      <section class="content-section">
        <h2 class="section-title">🎨 Exemplos de Customização</h2>
        
        <!-- Example 1: Custom Primary Color -->
        <div class="example-block">
          <h3>1️⃣ Alterando a Cor Primária</h3>
          <p>Customize a cor principal do tema para combinar com sua marca:</p>
          
          <div class="code-block">
            <div class="code-header">
              <span class="code-language">CSS</span>
              <button class="copy-btn" (click)="copyCode('custom-primary')">📋 Copiar</button>
            </div>
            <pre id="custom-primary"><code>{{ customPrimaryCode }}</code></pre>
          </div>

          <div class="preview-box">
            <div class="demo-button primary">Botão Primário</div>
            <div class="demo-alert primary">
              ✨ Alerta com cor primária customizada
            </div>
          </div>
        </div>

        <!-- Example 2: Dark Mode -->
        <div class="example-block">
          <h3>2️⃣ Modo Escuro (Dark Mode)</h3>
          <p>Implemente dark mode automaticamente usando <code>prefers-color-scheme</code>:</p>
          
          <div class="code-block">
            <div class="code-header">
              <span class="code-language">CSS</span>
              <button class="copy-btn" (click)="copyCode('dark-mode')">📋 Copiar</button>
            </div>
            <pre id="dark-mode"><code>{{ darkModeCode }}</code></pre>
          </div>
        </div>

        <!-- Example 3: Custom Theme -->
        <div class="example-block">
          <h3>3️⃣ Tema Customizado Completo</h3>
          <p>Crie um tema totalmente personalizado para seu projeto:</p>
          
          <div class="code-block">
            <div class="code-header">
              <span class="code-language">SCSS</span>
              <button class="copy-btn" (click)="copyCode('custom-theme')">📋 Copiar</button>
            </div>
            <pre id="custom-theme"><code>{{ customThemeCode }}</code></pre>
          </div>
        </div>

        <!-- Example 4: Component Override -->
        <div class="example-block">
          <h3>4️⃣ Override de Componentes Específicos</h3>
          <p>Customize estilos de componentes individualmente:</p>
          
          <div class="code-block">
            <div class="code-header">
              <span class="code-language">CSS</span>
              <button class="copy-btn" (click)="copyCode('component-override')">📋 Copiar</button>
            </div>
            <pre id="component-override"><code>{{ componentOverrideCode }}</code></pre>
          </div>
        </div>
      </section>

      <!-- Best Practices -->
      <section class="content-section">
        <h2 class="section-title">✨ Melhores Práticas</h2>
        
        <div class="tips-grid">
          <div class="tip-card">
            <div class="tip-icon">🎨</div>
            <h3>Consistência Visual</h3>
            <p>Mantenha uma paleta de cores coesa. Use no máximo 3-4 cores principais + cores de status.</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">♿</div>
            <h3>Contraste WCAG</h3>
            <p>Garanta contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande (WCAG AA).</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">🌙</div>
            <h3>Dark Mode First</h3>
            <p>Projete pensando em dark mode desde o início. Use CSS variables para facilitar a alternância.</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">⚡</div>
            <h3>Performance</h3>
            <p>CSS Variables são rápidas! Use-as sem medo - o browser otimiza automaticamente.</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Defina variáveis de espaçamento responsivas para diferentes breakpoints.</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">🎯</div>
            <h3>Naming Convention</h3>
            <p>Use prefixo <code>--muxima-</code> para evitar conflitos com outras bibliotecas CSS.</p>
          </div>
        </div>
      </section>

      <!-- Theme Presets -->
      <section class="content-section">
        <h2 class="section-title">🎨 Temas Pré-definidos</h2>
        <p class="section-description">
          Experimente alguns temas prontos para usar:
        </p>

        <div class="presets-grid">
          <div class="preset-card purple">
            <div class="preset-preview">
              <div class="preset-color primary"></div>
              <div class="preset-color secondary"></div>
              <div class="preset-color accent"></div>
            </div>
            <h3>Purple Gradient</h3>
            <p>Tema padrão Muxima UI</p>
            <code>#667eea → #764ba2</code>
          </div>

          <div class="preset-card ocean">
            <div class="preset-preview">
              <div class="preset-color primary"></div>
              <div class="preset-color secondary"></div>
              <div class="preset-color accent"></div>
            </div>
            <h3>Ocean Blue</h3>
            <p>Profissional e confiável</p>
            <code>#0ea5e9 → #06b6d4</code>
          </div>

          <div class="preset-card forest">
            <div class="preset-preview">
              <div class="preset-color primary"></div>
              <div class="preset-color secondary"></div>
              <div class="preset-color accent"></div>
            </div>
            <h3>Forest Green</h3>
            <p>Natural e sustentável</p>
            <code>#10b981 → #059669</code>
          </div>

          <div class="preset-card sunset">
            <div class="preset-preview">
              <div class="preset-color primary"></div>
              <div class="preset-color secondary"></div>
              <div class="preset-color accent"></div>
            </div>
            <h3>Sunset Orange</h3>
            <p>Energético e vibrante</p>
            <code>#f59e0b → #ef4444</code>
          </div>

          <div class="preset-card night">
            <div class="preset-preview">
              <div class="preset-color primary"></div>
              <div class="preset-color secondary"></div>
              <div class="preset-color accent"></div>
            </div>
            <h3>Midnight</h3>
            <p>Elegante e sofisticado</p>
            <code>#6366f1 → #8b5cf6</code>
          </div>

          <div class="preset-card rose">
            <div class="preset-preview">
              <div class="preset-color primary"></div>
              <div class="preset-color secondary"></div>
              <div class="preset-color accent"></div>
            </div>
            <h3>Rose Pink</h3>
            <p>Moderno e criativo</p>
            <code>#ec4899 → #f43f5e</code>
          </div>
        </div>
      </section>

      <!-- Resources -->
      <section class="content-section">
        <h2 class="section-title">📚 Recursos Úteis</h2>
        
        <div class="resources-list">
          <a href="https://coolors.co" target="_blank" class="resource-link">
            <span class="resource-icon">🎨</span>
            <div class="resource-info">
              <h4>Coolors</h4>
              <p>Gerador de paletas de cores</p>
            </div>
          </a>
          
          <a href="https://contrast-ratio.com" target="_blank" class="resource-link">
            <span class="resource-icon">♿</span>
            <div class="resource-info">
              <h4>Contrast Checker</h4>
              <p>Verificador de contraste WCAG</p>
            </div>
          </a>
          
          <a href="https://cssgradient.io" target="_blank" class="resource-link">
            <span class="resource-icon">🌈</span>
            <div class="resource-info">
              <h4>CSS Gradient</h4>
              <p>Gerador de gradientes CSS</p>
            </div>
          </a>
          
          <a href="https://tailwindcss.com/docs/customizing-colors" target="_blank" class="resource-link">
            <span class="resource-icon">🎯</span>
            <div class="resource-info">
              <h4>Tailwind Colors</h4>
              <p>Paleta de cores profissional</p>
            </div>
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="theming-footer">
        <p>
          <strong>💜 Dica:</strong> Comece customizando apenas as cores primárias e secundárias. 
          A maioria das aplicações não precisa customizar todas as variáveis.
        </p>
        <p class="footer-signature">
          Desenvolvido com 💜 por 
          <a href="https://github.com/Aldemiro20" target="_blank">Aldemiro Valentim</a>, 
          mais conhecido por <strong>JokerScript</strong>
        </p>
      </footer>
    </div>
  `,
  styles: [`
    .theming-container {
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 16px;
    }

    .hero-subtitle {
      font-size: 20px;
      color: #6b7280;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto 32px;
    }

    .hero-badges {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .badge {
      display: inline-block;
      padding: 8px 16px;
      background: white;
      border: 2px solid #667eea;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      color: #667eea;
    }

    /* Preview Section */
    .preview-section {
      margin-bottom: 80px;
    }

    .color-palette {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;
      margin-top: 32px;
    }

    .color-card {
      background: white;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .color-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .color-swatch {
      width: 100%;
      height: 80px;
      border-radius: 12px;
      margin-bottom: 16px;
    }

    .color-card.primary .color-swatch { background: #667eea; }
    .color-card.secondary .color-swatch { background: #764ba2; }
    .color-card.success .color-swatch { background: #10b981; }
    .color-card.warning .color-swatch { background: #f59e0b; }
    .color-card.danger .color-swatch { background: #ef4444; }
    .color-card.info .color-swatch { background: #3b82f6; }

    .color-info h4 {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .color-info code {
      display: block;
      font-size: 14px;
      color: #667eea;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .color-usage {
      font-size: 12px;
      color: #6b7280;
    }

    /* Theme Switcher Section */
    .theme-switcher-section {
      margin-bottom: 80px;
    }

    .theme-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 40px;
    }

    .theme-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 20px;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .theme-btn:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-color: var(--muxima-primary, #667eea);
    }

    .theme-btn.active {
      border-color: var(--muxima-primary, #667eea);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
      box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
    }

    .theme-btn.active::after {
      content: '✓';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      background: var(--muxima-primary, #667eea);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
    }

    .theme-preview {
      display: flex;
      gap: 8px;
    }

    .color-dot {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .theme-name {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }

    .theme-icon {
      font-size: 24px;
    }

    /* Live Preview */
    .live-preview {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .live-preview h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 24px;
    }

    .preview-content {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
    }

    .demo-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .demo-btn.primary {
      background: var(--muxima-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
      color: white;
    }

    .demo-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }

    .demo-btn.secondary {
      background: var(--muxima-secondary, #764ba2);
      color: white;
    }

    .demo-btn.secondary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(118, 75, 162, 0.3);
    }

    .demo-card {
      flex: 1;
      min-width: 200px;
      padding: 20px;
      background: white;
      border: 2px solid var(--muxima-primary, #667eea);
      border-radius: 12px;
    }

    .demo-card h4 {
      font-size: 16px;
      font-weight: 700;
      color: var(--muxima-primary, #667eea);
      margin-bottom: 8px;
    }

    .demo-card p {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 12px;
    }

    .demo-badge {
      display: inline-block;
      padding: 4px 12px;
      background: var(--muxima-primary, #667eea);
      color: white;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .demo-alert {
      width: 100%;
      padding: 16px;
      background: rgba(102, 126, 234, 0.1);
      border: 1px solid var(--muxima-primary, #667eea);
      border-left: 4px solid var(--muxima-primary, #667eea);
      border-radius: 8px;
      color: var(--muxima-primary, #667eea);
      font-size: 14px;
      font-weight: 500;
    }

    /* Section Styles */
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

    /* Code Block */
    .code-block {
      background: #1e293b;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 32px;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      background: #0f172a;
      border-bottom: 1px solid #334155;
    }

    .code-language {
      font-size: 12px;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .copy-btn {
      background: transparent;
      border: 1px solid #475569;
      color: #cbd5e1;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .copy-btn:hover {
      background: #334155;
      border-color: #667eea;
      color: white;
    }

    .code-block pre {
      margin: 0;
      padding: 24px;
      overflow-x: auto;
    }

    .code-block code {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 14px;
      line-height: 1.6;
      color: #e2e8f0;
    }

    /* Variables Grid */
    .variables-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 32px;
    }

    .variable-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .variable-card h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 16px;
    }

    .variable-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .variable-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;
      font-size: 14px;
    }

    .variable-list li:last-child {
      border-bottom: none;
    }

    .variable-list code {
      color: #667eea;
      font-weight: 600;
    }

    .variable-list span {
      color: #6b7280;
      font-size: 12px;
    }

    /* Example Block */
    .example-block {
      margin-bottom: 48px;
    }

    .example-block h3 {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 12px;
    }

    .example-block p {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .preview-box {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 32px;
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
    }

    .demo-button {
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .demo-button.primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .demo-button.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }

    .demo-alert {
      flex: 1;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
    }

    .demo-alert.primary {
      background: rgba(102, 126, 234, 0.1);
      border: 1px solid #667eea;
      color: #667eea;
    }

    /* Tips Grid */
    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 32px;
    }

    .tip-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      text-align: center;
    }

    .tip-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .tip-card h3 {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 12px;
    }

    .tip-card p {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.6;
    }

    .tip-card code {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
    }

    /* Presets Grid */
    .presets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 32px;
    }

    .preset-card {
      background: white;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    .preset-card:hover {
      transform: translateY(-4px);
    }

    .preset-preview {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .preset-color {
      flex: 1;
      height: 60px;
      border-radius: 8px;
    }

    .preset-card.purple .preset-color.primary { background: #667eea; }
    .preset-card.purple .preset-color.secondary { background: #764ba2; }
    .preset-card.purple .preset-color.accent { background: #8b9df8; }

    .preset-card.ocean .preset-color.primary { background: #0ea5e9; }
    .preset-card.ocean .preset-color.secondary { background: #06b6d4; }
    .preset-card.ocean .preset-color.accent { background: #38bdf8; }

    .preset-card.forest .preset-color.primary { background: #10b981; }
    .preset-card.forest .preset-color.secondary { background: #059669; }
    .preset-card.forest .preset-color.accent { background: #34d399; }

    .preset-card.sunset .preset-color.primary { background: #f59e0b; }
    .preset-card.sunset .preset-color.secondary { background: #ef4444; }
    .preset-card.sunset .preset-color.accent { background: #fbbf24; }

    .preset-card.night .preset-color.primary { background: #6366f1; }
    .preset-card.night .preset-color.secondary { background: #8b5cf6; }
    .preset-card.night .preset-color.accent { background: #a78bfa; }

    .preset-card.rose .preset-color.primary { background: #ec4899; }
    .preset-card.rose .preset-color.secondary { background: #f43f5e; }
    .preset-card.rose .preset-color.accent { background: #fb7185; }

    .preset-card h3 {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .preset-card p {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .preset-card code {
      font-size: 12px;
      color: #667eea;
    }

    /* Resources */
    .resources-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 32px;
    }

    .resource-link {
      display: flex;
      gap: 16px;
      align-items: center;
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .resource-link:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .resource-icon {
      font-size: 32px;
    }

    .resource-info h4 {
      font-size: 16px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .resource-info p {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }

    /* Footer */
    .theming-footer {
      margin-top: 80px;
      padding: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      text-align: center;
      color: white;
    }

    .theming-footer p {
      font-size: 16px;
      margin-bottom: 16px;
      line-height: 1.6;
    }

    .theming-footer p:last-child {
      margin-bottom: 0;
    }

    .footer-signature {
      font-size: 14px;
      opacity: 0.9;
    }

    .footer-signature a {
      color: white;
      text-decoration: underline;
      font-weight: 700;
    }

    .footer-signature a:hover {
      opacity: 0.8;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 16px;
      }

      .section-title {
        font-size: 28px;
      }

      .color-palette,
      .variables-grid,
      .tips-grid,
      .presets-grid,
      .resources-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ThemingComponent {
  currentTheme = 'purple';
  themes: any[] = [];

  constructor(public themeService: ThemeService) {
    this.themes = themeService.themes;
    this.currentTheme = themeService.getCurrentTheme();
  }

  applyTheme(theme: any): void {
    this.currentTheme = theme.id;
    this.themeService.applyTheme(theme);
  }

  installCode = `// styles.scss ou styles.css
@import '@muxima-ui/styles/theme.css';

// Ou importe o tema SCSS para customização
@use '@muxima-ui/styles' as muxima;

body {
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  background-color: var(--muxima-background);
  color: var(--muxima-text);
}`;

  customPrimaryCode = `:root {
  --muxima-primary: #2563eb; /* Azul */
  --muxima-primary-light: #60a5fa;
  --muxima-primary-dark: #1e40af;
  
  /* Ou use sua cor corporativa */
  --muxima-primary: #0ea5e9; /* Cyan */
  --muxima-primary: #8b5cf6; /* Violet */
  --muxima-primary: #ec4899; /* Pink */
}`;

  darkModeCode = `/* Tema claro (padrão) */
:root {
  --muxima-background: #ffffff;
  --muxima-surface: #f9fafb;
  --muxima-text: #1f2937;
  --muxima-text-secondary: #6b7280;
  --muxima-border: #e5e7eb;
}

/* Tema escuro (automático) */
@media (prefers-color-scheme: dark) {
  :root {
    --muxima-background: #0f172a;
    --muxima-surface: #1e293b;
    --muxima-text: #f1f5f9;
    --muxima-text-secondary: #cbd5e1;
    --muxima-border: #334155;
    --muxima-shadow: rgba(0, 0, 0, 0.3);
  }
}

/* Ou use classes */
.dark {
  --muxima-background: #0f172a;
  --muxima-surface: #1e293b;
  /* ... */
}`;

  customThemeCode = `// custom-theme.scss
@use '@muxima-ui/styles' as muxima with (
  $primary: #0ea5e9,
  $secondary: #06b6d4,
  $success: #22c55e,
  $warning: #eab308,
  $danger: #dc2626,
  $info: #3b82f6,
  $border-radius: 12px,
  $font-family: 'Inter, sans-serif'
);

// Ou defina manualmente
:root {
  /* Cores da marca */
  --muxima-primary: #0ea5e9;
  --muxima-primary-light: #38bdf8;
  --muxima-primary-dark: #0284c7;
  
  /* Gradientes personalizados */
  --muxima-gradient: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  
  /* Espaçamento customizado */
  --muxima-spacing-xs: 4px;
  --muxima-spacing-sm: 8px;
  --muxima-spacing-md: 16px;
  --muxima-spacing-lg: 24px;
  --muxima-spacing-xl: 32px;
}`;

  componentOverrideCode = `/* Customizar apenas botões */
muxima-button {
  --button-border-radius: 20px;
  --button-padding: 12px 24px;
  --button-font-weight: 600;
  --button-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Customizar alerts */
muxima-alert {
  --alert-border-radius: 8px;
  --alert-padding: 16px;
  --alert-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Customizar inputs */
muxima-input {
  --input-border-color: #e5e7eb;
  --input-focus-border-color: var(--muxima-primary);
  --input-border-radius: 8px;
  --input-padding: 12px 16px;
}`;

  copyCode(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      const text = element.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        alert('✅ Código copiado para a área de transferência!');
      });
    }
  }
}
