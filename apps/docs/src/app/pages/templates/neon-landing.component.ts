import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '@muxima-ui/button';

@Component({
  selector: 'muxima-neon-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="neon-landing">
      <!-- Animated Grid Background -->
      <div class="grid-background">
        <div class="grid-lines"></div>
        <div class="grid-glow"></div>
      </div>

      <!-- Navigation -->
      <nav class="neon-nav">
        <div class="nav-container">
          <div class="logo">
            <div class="logo-icon neon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span class="logo-text neon-text">NEON<span class="highlight">TECH</span></span>
          </div>
          <div class="nav-links">
            <a href="#features" class="nav-link">Features</a>
            <a href="#services" class="nav-link">Services</a>
            <a href="#portfolio" class="nav-link">Portfolio</a>
            <a href="#pricing" class="nav-link">Pricing</a>
          </div>
          <div class="nav-actions">
            <button class="btn-neon">Get Started</button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-badge neon-border">
            <span class="pulse-dot"></span>
            <span>NEXT GEN TECHNOLOGY</span>
          </div>
          <h1 class="hero-title">
            <span class="line">WELCOME TO THE</span>
            <span class="line neon-glow-text">FUTURE OF WEB</span>
            <span class="line gradient-neon">DEVELOPMENT</span>
          </h1>
          <p class="hero-description">
            Experience cutting-edge technology with stunning neon aesthetics.
            Build revolutionary digital products that stand out from the crowd.
          </p>
          <div class="hero-actions">
            <button class="btn-neon-primary">
              <span>START PROJECT</span>
              <span class="btn-arrow">→</span>
            </button>
            <button class="btn-neon-secondary">
              <span>WATCH DEMO</span>
            </button>
          </div>
          
          <!-- Animated Stats -->
          <div class="hero-stats">
            <div class="stat-box neon-border" *ngFor="let stat of stats">
              <div class="stat-icon">{{ stat.icon }}</div>
              <div class="stat-value neon-text">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Floating Elements -->
        <div class="floating-elements">
          <div class="neon-circle circle-1"></div>
          <div class="neon-circle circle-2"></div>
          <div class="neon-circle circle-3"></div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section" id="features">
        <div class="section-container">
          <div class="section-header">
            <span class="section-tag neon-border">FEATURES</span>
            <h2 class="section-title">
              <span class="neon-glow-text">Powerful</span> Technology Stack
            </h2>
            <p class="section-description">
              Advanced features designed for the modern web
            </p>
          </div>
          
          <div class="features-grid">
            <div class="feature-card neon-card" *ngFor="let feature of features">
              <div class="card-glow"></div>
              <div class="feature-icon neon-box">
                <div [innerHTML]="feature.icon"></div>
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
              <div class="feature-link">
                <span>Learn More</span>
                <span class="arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="services-section" id="services">
        <div class="section-container">
          <div class="section-header">
            <span class="section-tag neon-border">SERVICES</span>
            <h2 class="section-title">
              What We <span class="neon-glow-text">Offer</span>
            </h2>
          </div>
          
          <div class="services-grid">
            <div class="service-card neon-card" *ngFor="let service of services">
              <div class="card-glow"></div>
              <div class="service-header">
                <div class="service-number neon-text">{{ service.number }}</div>
                <div class="service-icon">{{ service.icon }}</div>
              </div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <ul class="service-features">
                <li *ngFor="let item of service.items">
                  <span class="check-icon">✓</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Portfolio Section -->
      <section class="portfolio-section" id="portfolio">
        <div class="section-container">
          <div class="section-header">
            <span class="section-tag neon-border">PORTFOLIO</span>
            <h2 class="section-title">
              Recent <span class="neon-glow-text">Projects</span>
            </h2>
          </div>
          
          <div class="portfolio-grid">
            <div class="portfolio-card neon-card" *ngFor="let project of portfolio">
              <div class="card-glow"></div>
              <div class="portfolio-image">
                <img [src]="project.image" [alt]="project.title">
                <div class="image-overlay">
                  <button class="btn-view">VIEW PROJECT</button>
                </div>
              </div>
              <div class="portfolio-content">
                <div class="portfolio-tags">
                  <span class="tag neon-border" *ngFor="let tag of project.tags">{{ tag }}</span>
                </div>
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="pricing-section" id="pricing">
        <div class="section-container">
          <div class="section-header">
            <span class="section-tag neon-border">PRICING</span>
            <h2 class="section-title">
              Choose Your <span class="neon-glow-text">Plan</span>
            </h2>
          </div>
          
          <div class="pricing-grid">
            <div class="pricing-card neon-card" *ngFor="let plan of pricing" [class.featured]="plan.featured">
              <div class="card-glow"></div>
              <div class="pricing-badge" *ngIf="plan.badge">{{ plan.badge }}</div>
              <h3>{{ plan.name }}</h3>
              <div class="price">
                <span class="currency">$</span>
                <span class="amount neon-text">{{ plan.price }}</span>
                <span class="period">/month</span>
              </div>
              <p class="plan-description">{{ plan.description }}</p>
              <ul class="plan-features">
                <li *ngFor="let feature of plan.features">
                  <span class="check-icon">✓</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
              <button class="btn-plan" [class.btn-featured]="plan.featured">
                {{ plan.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-container neon-card">
          <div class="card-glow"></div>
          <h2>Ready to Start Your <span class="neon-glow-text">Project</span>?</h2>
          <p>Join thousands of developers building the future</p>
          <div class="cta-actions">
            <button class="btn-neon-primary">
              <span>GET STARTED NOW</span>
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="neon-footer">
        <div class="footer-container">
          <div class="footer-content">
            <div class="footer-brand">
              <div class="logo">
                <div class="logo-icon neon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <span class="logo-text neon-text">NEON<span class="highlight">TECH</span></span>
              </div>
              <p>Building the future of web technology</p>
            </div>
            
            <div class="footer-links">
              <div class="footer-column">
                <h4>Product</h4>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">Security</a>
                <a href="#">Updates</a>
              </div>
              <div class="footer-column">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
              </div>
              <div class="footer-column">
                <h4>Resources</h4>
                <a href="#">Documentation</a>
                <a href="#">API</a>
                <a href="#">Support</a>
                <a href="#">Community</a>
              </div>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; 2026 NeonTech. All rights reserved.</p>
            <div class="social-links">
              <a href="#" class="social-link neon-border">TW</a>
              <a href="#" class="social-link neon-border">GH</a>
              <a href="#" class="social-link neon-border">LI</a>
            </div>
          </div>
        </div>
      </footer>

      <!-- Back Button -->
      <div class="template-back">
        <button class="btn-back neon-border" (click)="goBack()">
          <span>← BACK TO TEMPLATES</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: #0a0e27;
      min-height: 100vh;
    }

    .neon-landing {
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
      background: #0a0e27;
      color: #fff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    /* Animated Grid Background */
    .grid-background {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      overflow: hidden;
    }

    .grid-lines {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: gridMove 20s linear infinite;
    }

    .grid-glow {
      position: absolute;
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
      background: radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05), transparent 50%);
      animation: gridPulse 4s ease-in-out infinite;
    }

    @keyframes gridMove {
      0% { transform: translateY(0); }
      100% { transform: translateY(50px); }
    }

    @keyframes gridPulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }

    /* Neon Effects */
    .neon-text {
      color: #00ffff;
      text-shadow: 
        0 0 10px rgba(0, 255, 255, 0.8),
        0 0 20px rgba(0, 255, 255, 0.6),
        0 0 30px rgba(0, 255, 255, 0.4);
    }

    .neon-glow-text {
      color: #ff00ff;
      text-shadow: 
        0 0 10px rgba(255, 0, 255, 0.8),
        0 0 20px rgba(255, 0, 255, 0.6),
        0 0 30px rgba(255, 0, 255, 0.4),
        0 0 40px rgba(255, 0, 255, 0.2);
      animation: neonPulse 2s ease-in-out infinite;
    }

    @keyframes neonPulse {
      0%, 100% { 
        text-shadow: 
          0 0 10px rgba(255, 0, 255, 0.8),
          0 0 20px rgba(255, 0, 255, 0.6),
          0 0 30px rgba(255, 0, 255, 0.4);
      }
      50% { 
        text-shadow: 
          0 0 15px rgba(255, 0, 255, 1),
          0 0 30px rgba(255, 0, 255, 0.8),
          0 0 45px rgba(255, 0, 255, 0.6),
          0 0 60px rgba(255, 0, 255, 0.4);
      }
    }

    .gradient-neon {
      background: linear-gradient(135deg, #00ffff, #ff00ff, #ffff00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.5));
    }

    .neon-border {
      border: 2px solid #00ffff;
      box-shadow: 
        0 0 10px rgba(0, 255, 255, 0.5),
        inset 0 0 10px rgba(0, 255, 255, 0.2);
    }

    .neon-box {
      background: rgba(0, 255, 255, 0.05);
      border: 2px solid #00ffff;
      box-shadow: 
        0 0 20px rgba(0, 255, 255, 0.4),
        inset 0 0 20px rgba(0, 255, 255, 0.1);
    }

    .neon-card {
      position: relative;
      background: rgba(10, 14, 39, 0.8);
      border: 2px solid rgba(0, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .neon-card:hover {
      border-color: #00ffff;
      box-shadow: 
        0 0 30px rgba(0, 255, 255, 0.3),
        inset 0 0 20px rgba(0, 255, 255, 0.05);
      transform: translateY(-5px);
    }

    .card-glow {
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, #00ffff, #ff00ff);
      opacity: 0;
      border-radius: inherit;
      z-index: -1;
      transition: opacity 0.3s ease;
    }

    .neon-card:hover .card-glow {
      opacity: 0.1;
    }

    /* Navigation */
    .neon-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(10, 14, 39, 0.9);
      backdrop-filter: blur(20px);
      border-bottom: 2px solid rgba(0, 255, 255, 0.2);
      padding: 16px 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }

    .logo-icon svg {
      width: 24px;
      height: 24px;
      stroke: #00ffff;
      filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.8));
    }

    .logo-text {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 2px;
    }

    .logo-text .highlight {
      color: #ff00ff;
      text-shadow: 
        0 0 10px rgba(255, 0, 255, 0.8),
        0 0 20px rgba(255, 0, 255, 0.4);
    }

    .nav-links {
      display: flex;
      gap: 40px;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: all 0.3s;
      position: relative;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: #00ffff;
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
      transition: width 0.3s;
    }

    .nav-link:hover {
      color: #00ffff;
    }

    .nav-link:hover::after {
      width: 100%;
    }

    /* Buttons */
    .btn-neon {
      background: transparent;
      border: 2px solid #00ffff;
      color: #00ffff;
      padding: 10px 24px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }

    .btn-neon::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: rgba(0, 255, 255, 0.2);
      transition: left 0.3s;
    }

    .btn-neon:hover {
      box-shadow: 
        0 0 20px rgba(0, 255, 255, 0.5),
        inset 0 0 20px rgba(0, 255, 255, 0.2);
    }

    .btn-neon:hover::before {
      left: 100%;
    }

    .btn-neon-primary {
      background: #00ffff;
      border: 2px solid #00ffff;
      color: #0a0e27;
      padding: 16px 40px;
      font-weight: 900;
      font-size: 16px;
      letter-spacing: 2px;
      text-transform: uppercase;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      transition: all 0.3s;
      box-shadow: 
        0 0 30px rgba(0, 255, 255, 0.5),
        inset 0 0 20px rgba(255, 255, 255, 0.2);
    }

    .btn-neon-primary:hover {
      background: #00dddd;
      box-shadow: 
        0 0 40px rgba(0, 255, 255, 0.8),
        inset 0 0 30px rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
    }

    .btn-neon-secondary {
      background: transparent;
      border: 2px solid #ff00ff;
      color: #ff00ff;
      padding: 16px 40px;
      font-weight: 900;
      font-size: 16px;
      letter-spacing: 2px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-neon-secondary:hover {
      background: rgba(255, 0, 255, 0.1);
      box-shadow: 
        0 0 30px rgba(255, 0, 255, 0.5),
        inset 0 0 20px rgba(255, 0, 255, 0.2);
      transform: translateY(-3px);
    }

    .btn-arrow {
      font-size: 20px;
      transition: transform 0.3s;
    }

    .btn-neon-primary:hover .btn-arrow {
      transform: translateX(5px);
    }

    /* Hero Section */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 32px 80px;
      position: relative;
      z-index: 1;
    }

    .hero-container {
      max-width: 1000px;
      text-align: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 24px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      margin-bottom: 32px;
      background: rgba(0, 255, 255, 0.05);
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background: #00ffff;
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.3);
        opacity: 0.7;
      }
    }

    .hero-title {
      font-size: 80px;
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 32px;
      letter-spacing: -2px;
    }

    .hero-title .line {
      display: block;
      margin-bottom: 8px;
    }

    .hero-description {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.7;
      margin-bottom: 40px;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-actions {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-bottom: 80px;
    }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      max-width: 800px;
      margin: 0 auto;
    }

    .stat-box {
      padding: 32px;
      border-radius: 16px;
      text-align: center;
      background: rgba(0, 255, 255, 0.03);
      transition: all 0.3s;
    }

    .stat-box:hover {
      transform: translateY(-5px);
      background: rgba(0, 255, 255, 0.05);
    }

    .stat-icon {
      font-size: 40px;
      margin-bottom: 16px;
      filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.5));
    }

    .stat-value {
      font-size: 48px;
      font-weight: 900;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }

    /* Floating Elements */
    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
    }

    .neon-circle {
      position: absolute;
      border-radius: 50%;
      border: 3px solid;
      animation: float 20s infinite ease-in-out;
    }

    .circle-1 {
      width: 300px;
      height: 300px;
      border-color: rgba(0, 255, 255, 0.2);
      top: 10%;
      right: 10%;
      box-shadow: 0 0 60px rgba(0, 255, 255, 0.2);
      animation-delay: 0s;
    }

    .circle-2 {
      width: 200px;
      height: 200px;
      border-color: rgba(255, 0, 255, 0.2);
      bottom: 20%;
      left: 5%;
      box-shadow: 0 0 60px rgba(255, 0, 255, 0.2);
      animation-delay: 7s;
    }

    .circle-3 {
      width: 150px;
      height: 150px;
      border-color: rgba(255, 255, 0, 0.2);
      top: 50%;
      left: 50%;
      box-shadow: 0 0 60px rgba(255, 255, 0, 0.2);
      animation-delay: 14s;
    }

    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
      }
      33% {
        transform: translate(50px, -50px) rotate(120deg);
      }
      66% {
        transform: translate(-50px, 50px) rotate(240deg);
      }
    }

    /* Sections */
    section {
      padding: 100px 32px;
      position: relative;
      z-index: 1;
    }

    .section-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 80px;
    }

    .section-tag {
      display: inline-block;
      padding: 8px 20px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      margin-bottom: 24px;
      background: rgba(0, 255, 255, 0.03);
    }

    .section-title {
      font-size: 56px;
      font-weight: 900;
      margin-bottom: 20px;
      letter-spacing: -1px;
    }

    .section-description {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.7);
      max-width: 600px;
      margin: 0 auto;
    }

    /* Features Grid */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
    }

    .feature-card {
      padding: 40px;
      border-radius: 20px;
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .feature-icon svg {
      width: 40px;
      height: 40px;
      stroke: #00ffff;
      filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
    }

    .feature-card h3 {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 16px;
      color: #fff;
    }

    .feature-card p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .feature-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #00ffff;
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .feature-link:hover {
      gap: 12px;
    }

    .feature-link .arrow {
      transition: transform 0.3s;
    }

    .feature-link:hover .arrow {
      transform: translateX(5px);
    }

    /* Services Grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 32px;
    }

    .service-card {
      padding: 40px;
      border-radius: 20px;
    }

    .service-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .service-number {
      font-size: 72px;
      font-weight: 900;
      line-height: 1;
    }

    .service-icon {
      font-size: 48px;
      filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.5));
    }

    .service-card h3 {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 16px;
    }

    .service-card p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .service-features {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .service-features li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      color: rgba(255, 255, 255, 0.8);
      border-bottom: 1px solid rgba(0, 255, 255, 0.1);
    }

    .service-features li:last-child {
      border-bottom: none;
    }

    .check-icon {
      color: #00ffff;
      font-weight: 900;
      font-size: 18px;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
    }

    /* Portfolio Grid */
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 32px;
    }

    .portfolio-card {
      border-radius: 20px;
      overflow: hidden;
    }

    .portfolio-image {
      position: relative;
      height: 280px;
      overflow: hidden;
    }

    .portfolio-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .portfolio-card:hover .portfolio-image img {
      transform: scale(1.1);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .portfolio-card:hover .image-overlay {
      opacity: 1;
    }

    .btn-view {
      background: transparent;
      border: 2px solid #00ffff;
      color: #00ffff;
      padding: 12px 32px;
      font-weight: 700;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-view:hover {
      background: #00ffff;
      color: #0a0e27;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
    }

    .portfolio-content {
      padding: 32px;
    }

    .portfolio-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .tag {
      padding: 6px 16px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      background: rgba(0, 255, 255, 0.05);
      color: #00ffff;
    }

    .portfolio-card h3 {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 12px;
    }

    .portfolio-card p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
    }

    /* Pricing Grid */
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
      max-width: 1100px;
      margin: 0 auto;
    }

    .pricing-card {
      padding: 48px;
      border-radius: 20px;
      text-align: center;
      position: relative;
    }

    .pricing-card.featured {
      border-color: #ff00ff;
      transform: scale(1.05);
    }

    .pricing-card.featured .card-glow {
      background: linear-gradient(135deg, #ff00ff, #00ffff);
    }

    .pricing-badge {
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff00ff;
      color: #0a0e27;
      padding: 8px 24px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 2px;
      box-shadow: 0 0 30px rgba(255, 0, 255, 0.6);
    }

    .pricing-card h3 {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 24px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .price {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .currency {
      font-size: 24px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.7);
    }

    .amount {
      font-size: 64px;
      font-weight: 900;
      line-height: 1;
    }

    .period {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.6);
    }

    .plan-description {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 32px;
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
      color: rgba(255, 255, 255, 0.8);
      text-align: left;
    }

    .btn-plan {
      width: 100%;
      background: transparent;
      border: 2px solid #00ffff;
      color: #00ffff;
      padding: 16px;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-plan:hover {
      background: rgba(0, 255, 255, 0.1);
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
    }

    .btn-featured {
      background: #ff00ff;
      border-color: #ff00ff;
      color: #0a0e27;
      box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
    }

    .btn-featured:hover {
      background: #dd00dd;
      box-shadow: 0 0 40px rgba(255, 0, 255, 0.7);
    }

    /* CTA Section */
    .cta-section {
      padding: 60px 32px;
    }

    .cta-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 80px 60px;
      text-align: center;
      border-radius: 32px;
    }

    .cta-container h2 {
      font-size: 56px;
      font-weight: 900;
      margin-bottom: 20px;
    }

    .cta-container p {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 40px;
    }

    .cta-actions {
      display: flex;
      justify-content: center;
    }

    /* Footer */
    .neon-footer {
      background: rgba(0, 0, 0, 0.4);
      border-top: 2px solid rgba(0, 255, 255, 0.2);
      padding: 80px 32px 32px;
      position: relative;
      z-index: 1;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 80px;
      margin-bottom: 60px;
    }

    .footer-brand p {
      color: rgba(255, 255, 255, 0.6);
      margin-top: 16px;
      line-height: 1.6;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }

    .footer-column h4 {
      color: #00ffff;
      font-weight: 700;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 14px;
    }

    .footer-column a {
      display: block;
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      margin-bottom: 12px;
      transition: all 0.3s;
    }

    .footer-column a:hover {
      color: #00ffff;
      transform: translateX(5px);
    }

    .footer-bottom {
      padding-top: 32px;
      border-top: 1px solid rgba(0, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer-bottom p {
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
    }

    .social-links {
      display: flex;
      gap: 16px;
    }

    .social-link {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: rgba(0, 255, 255, 0.05);
      color: #00ffff;
      text-decoration: none;
      font-weight: 700;
      font-size: 12px;
      transition: all 0.3s;
    }

    .social-link:hover {
      background: rgba(0, 255, 255, 0.1);
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
      transform: translateY(-3px);
    }

    /* Back Button */
    .template-back {
      position: fixed;
      bottom: 32px;
      left: 32px;
      z-index: 999;
    }

    .btn-back {
      background: rgba(10, 14, 39, 0.9);
      backdrop-filter: blur(10px);
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s;
      color: #00ffff;
    }

    .btn-back:hover {
      background: rgba(0, 255, 255, 0.1);
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
      transform: translateY(-3px);
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .nav-links {
        display: none;
      }

      .hero-title {
        font-size: 56px;
      }

      .section-title {
        font-size: 40px;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 40px;
      }

      .hero-stats {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .hero-actions,
      .cta-actions {
        flex-direction: column;
      }

      .features-grid,
      .services-grid,
      .portfolio-grid,
      .pricing-grid {
        grid-template-columns: 1fr;
      }

      .pricing-card.featured {
        transform: scale(1);
      }

      .footer-links {
        grid-template-columns: 1fr;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
    }
  `]
})
export class NeonLandingComponent {
  stats = [
    { icon: '⚡', value: '99.9%', label: 'Uptime' },
    { icon: '🚀', value: '10K+', label: 'Users' },
    { icon: '⭐', value: '5.0', label: 'Rating' }
  ];

  features = [
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
      title: 'Lightning Fast',
      description: 'Optimized performance with cutting-edge technology for instant load times and smooth interactions.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
      title: 'Ultra Secure',
      description: 'Enterprise-grade security with end-to-end encryption, multi-factor authentication and compliance.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"></path><polyline points="23 3 23 7 19 7"></polyline><polyline points="1 21 1 17 5 17"></polyline></svg>',
      title: 'AI Powered',
      description: 'Intelligent automation and machine learning capabilities to supercharge your workflow.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
      title: 'Real-time Analytics',
      description: 'Comprehensive insights with live data visualization and predictive analytics dashboard.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
      title: 'Cost Effective',
      description: 'Transparent pricing with no hidden fees. Pay only for what you use with flexible plans.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      title: 'Team Collaboration',
      description: 'Work together efficiently with powerful collaboration tools and real-time synchronization.'
    }
  ];

  services = [
    {
      number: '01',
      icon: '💻',
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks and cutting-edge technologies.',
      items: ['React & Angular', 'Node.js & Python', 'Cloud Deployment', 'CI/CD Pipeline']
    },
    {
      number: '02',
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
      items: ['React Native', 'Flutter Development', 'App Store Optimization', 'Push Notifications']
    },
    {
      number: '03',
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love with modern design systems.',
      items: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing']
    }
  ];

  portfolio = [
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: ['Web', 'AI'],
      title: 'Analytics Dashboard',
      description: 'Real-time analytics platform with AI-powered insights'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
      tags: ['Mobile', 'Fintech'],
      title: 'Banking App',
      description: 'Secure mobile banking with biometric authentication'
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tags: ['SaaS', 'Cloud'],
      title: 'Cloud Platform',
      description: 'Enterprise cloud management and monitoring solution'
    }
  ];

  pricing = [
    {
      name: 'Starter',
      price: '29',
      description: 'Perfect for individuals and small projects',
      features: [
        '5 Projects',
        '10GB Storage',
        'Basic Analytics',
        'Email Support',
        'Community Access'
      ],
      buttonText: 'Get Started',
      featured: false
    },
    {
      name: 'Pro',
      price: '99',
      badge: 'POPULAR',
      description: 'Best for growing teams and businesses',
      features: [
        'Unlimited Projects',
        '100GB Storage',
        'Advanced Analytics',
        'Priority Support',
        'API Access',
        'Custom Integrations'
      ],
      buttonText: 'Start Free Trial',
      featured: true
    },
    {
      name: 'Enterprise',
      price: '299',
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Pro',
        'Unlimited Storage',
        'Dedicated Support',
        'Custom Development',
        'SLA Guarantee',
        'On-premise Option'
      ],
      buttonText: 'Contact Sales',
      featured: false
    }
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/templates']);
  }
}
