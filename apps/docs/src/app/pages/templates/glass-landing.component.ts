import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '@muxima-ui/button';

@Component({
  selector: 'muxima-glass-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="glass-landing">
      <!-- Background -->
      <div class="background-gradient">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>

      <!-- Navigation -->
      <nav class="glass-nav">
        <div class="nav-container">
          <div class="logo">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <span class="logo-text">Muxima Glass</span>
          </div>
          <div class="nav-links">
            <a href="#features" class="nav-link">Features</a>
            <a href="#services" class="nav-link">Services</a>
            <a href="#portfolio" class="nav-link">Portfolio</a>
            <a href="#contact" class="nav-link">Contact</a>
          </div>
          <div class="nav-actions">
            <muxima-button text="Get Started" variant="primary" size="sm"></muxima-button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>New: AI-Powered Solutions</span>
          </div>
          <h1 class="hero-title">
            Next Generation
            <span class="gradient-text">Digital Experience</span>
          </h1>
          <p class="hero-description">
            Transform your business with cutting-edge technology and stunning design.
            We create immersive digital experiences that captivate and convert.
          </p>
          <div class="hero-actions">
            <muxima-button text="Start Free Trial" variant="primary" size="lg"></muxima-button>
            <muxima-button text="Watch Demo" variant="ghost" size="lg"></muxima-button>
          </div>
          <div class="hero-stats">
            <div class="stat-item" *ngFor="let stat of stats">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section" id="features">
        <div class="section-container">
          <div class="section-header">
            <span class="section-tag">Features</span>
            <h2 class="section-title">Powerful Features for Modern Business</h2>
            <p class="section-description">
              Everything you need to build, scale, and succeed in the digital age
            </p>
          </div>
          <div class="features-grid">
            <div class="feature-card glass-card" *ngFor="let feature of features">
              <div class="feature-icon" [innerHTML]="feature.icon"></div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="services-section" id="services">
        <div class="section-container">
          <div class="section-header">
            <span class="section-tag">Services</span>
            <h2 class="section-title">What We Offer</h2>
          </div>
          <div class="services-grid">
            <div class="service-card glass-card" *ngFor="let service of services">
              <div class="service-number">{{ service.number }}</div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <ul class="service-list">
                <li *ngFor="let item of service.items">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Portfolio Section -->
      <section class="portfolio-section" id="portfolio">
        <div class="section-container">
          <div class="section-header">
            <span class="section-tag">Portfolio</span>
            <h2 class="section-title">Recent Projects</h2>
          </div>
          <div class="portfolio-grid">
            <div class="portfolio-card glass-card" *ngFor="let project of portfolio">
              <div class="portfolio-image" [style.background-image]="'url(' + project.image + ')'"></div>
              <div class="portfolio-content">
                <div class="portfolio-tags">
                  <span class="tag" *ngFor="let tag of project.tags">{{ tag }}</span>
                </div>
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials-section">
        <div class="section-container">
          <div class="section-header">
            <span class="section-tag">Testimonials</span>
            <h2 class="section-title">What Our Clients Say</h2>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial-card glass-card" *ngFor="let testimonial of testimonials">
              <div class="testimonial-quote">"</div>
              <p class="testimonial-text">{{ testimonial.text }}</p>
              <div class="testimonial-author">
                <div class="author-avatar">{{ testimonial.avatar }}</div>
                <div class="author-info">
                  <div class="author-name">{{ testimonial.name }}</div>
                  <div class="author-position">{{ testimonial.position }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section" id="contact">
        <div class="cta-container glass-card">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of companies already using our platform</p>
          <div class="cta-actions">
            <muxima-button text="Start Free Trial" variant="primary" size="lg"></muxima-button>
            <muxima-button text="Contact Sales" variant="outline" size="lg"></muxima-button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="glass-footer">
        <div class="footer-container">
          <div class="footer-content">
            <div class="footer-brand">
              <div class="logo">
                <div class="logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <span class="logo-text">Muxima Glass</span>
              </div>
              <p>Creating beautiful digital experiences</p>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4>Product</h4>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">Security</a>
              </div>
              <div class="footer-column">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
              </div>
              <div class="footer-column">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact</a>
                <a href="#">Status</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2026 Muxima Glass. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <!-- Back Button -->
      <div class="template-back">
        <muxima-button 
          text="← Back to Templates" 
          variant="outline" 
          size="md"
          (click)="goBack()">
        </muxima-button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b0764 50%, #581c87 100%);
      min-height: 100vh;
    }

    .glass-landing {
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
      background: transparent;
    }

    /* Background */
    .background-gradient {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b0764 50%, #581c87 100%);
      z-index: -1;
    }

    .gradient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.5;
      animation: float 20s infinite ease-in-out;
    }

    .orb-1 {
      width: 400px;
      height: 400px;
      background: rgba(59, 130, 246, 0.4);
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 500px;
      height: 500px;
      background: rgba(139, 92, 246, 0.4);
      bottom: 10%;
      right: 10%;
      animation-delay: 7s;
    }

    .orb-3 {
      width: 300px;
      height: 300px;
      background: rgba(168, 85, 247, 0.4);
      top: 50%;
      left: 50%;
      animation-delay: 14s;
    }

    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(50px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-50px, 50px) scale(0.9);
      }
    }

    /* Glass Card Style */
    .glass-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }

    /* Navigation */
    .glass-nav {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 40px);
      max-width: 1200px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      padding: 16px 24px;
      z-index: 1000;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }

    .nav-container {
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
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
    }

    .logo-icon svg {
      width: 20px;
      height: 20px;
      stroke: white;
    }

    .logo-text {
      font-size: 18px;
      font-weight: 800;
      color: white;
    }

    .nav-links {
      display: flex;
      gap: 32px;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.2s;
    }

    .nav-link:hover {
      color: white;
      transform: translateY(-2px);
    }

    /* Hero Section */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 32px 80px;
    }

    .hero-container {
      max-width: 900px;
      text-align: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 8px 20px;
      border-radius: 100px;
      color: white;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 32px;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      animation: pulse-dot 2s infinite;
    }

    @keyframes pulse-dot {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.2);
      }
    }

    .hero-title {
      font-size: 72px;
      font-weight: 900;
      color: white;
      line-height: 1.1;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }

    .gradient-text {
      display: block;
      background: linear-gradient(135deg, #fbbf24, #fb923c, #f87171);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-description {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.7;
      margin-bottom: 40px;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-bottom: 60px;
    }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      max-width: 600px;
      margin: 0 auto;
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 40px;
      font-weight: 900;
      color: white;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 600;
    }

    /* Sections */
    section {
      padding: 100px 32px;
      position: relative;
    }

    .section-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-tag {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 6px 16px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 48px;
      font-weight: 900;
      color: white;
      margin-bottom: 16px;
    }

    .section-description {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      max-width: 600px;
      margin: 0 auto;
    }

    /* Features Grid */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .feature-card {
      padding: 40px;
      transition: all 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    }

    .feature-icon {
      width: 64px;
      height: 64px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .feature-icon svg {
      width: 32px;
      height: 32px;
      stroke: white;
    }

    .feature-card h3 {
      font-size: 20px;
      font-weight: 800;
      color: white;
      margin-bottom: 12px;
    }

    .feature-card p {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.6;
    }

    /* Services Grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .service-card {
      padding: 40px;
      transition: all 0.3s;
    }

    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    }

    .service-number {
      font-size: 64px;
      font-weight: 900;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 20px;
    }

    .service-card h3 {
      font-size: 24px;
      font-weight: 800;
      color: white;
      margin-bottom: 16px;
    }

    .service-card p {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .service-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .service-list li {
      color: rgba(255, 255, 255, 0.8);
      padding: 8px 0;
      padding-left: 24px;
      position: relative;
    }

    .service-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: 700;
    }

    /* Portfolio Grid */
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .portfolio-card {
      overflow: hidden;
      transition: all 0.3s;
    }

    .portfolio-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    }

    .portfolio-image {
      width: 100%;
      height: 250px;
      background-size: cover;
      background-position: center;
      border-radius: 12px;
      margin-bottom: 20px;
    }

    .portfolio-content {
      padding: 0 24px 24px;
    }

    .portfolio-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .tag {
      background: rgba(255, 255, 255, 0.25);
      color: white;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
    }

    .portfolio-card h3 {
      font-size: 20px;
      font-weight: 800;
      color: white;
      margin-bottom: 12px;
    }

    .portfolio-card p {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.6;
    }

    /* Testimonials Grid */
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .testimonial-card {
      padding: 40px;
      transition: all 0.3s;
      position: relative;
    }

    .testimonial-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    }

    .testimonial-quote {
      font-size: 80px;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.25);
      line-height: 1;
      position: absolute;
      top: 20px;
      left: 30px;
    }

    .testimonial-text {
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.7;
      font-size: 16px;
      margin-bottom: 24px;
      position: relative;
      z-index: 1;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .author-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 18px;
    }

    .author-name {
      font-weight: 700;
      color: white;
      margin-bottom: 4px;
    }

    .author-position {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
    }

    /* CTA Section */
    .cta-section {
      padding: 60px 32px;
    }

    .cta-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 80px 60px;
      text-align: center;
    }

    .cta-container h2 {
      font-size: 48px;
      font-weight: 900;
      color: white;
      margin-bottom: 16px;
    }

    .cta-container p {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 40px;
    }

    .cta-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    /* Footer */
    .glass-footer {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(20px);
      padding: 60px 32px 32px;
      margin-top: 100px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 60px;
      margin-bottom: 40px;
    }

    .footer-brand p {
      color: rgba(255, 255, 255, 0.7);
      margin-top: 16px;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }

    .footer-column h4 {
      color: white;
      font-weight: 700;
      margin-bottom: 16px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .footer-column a {
      display: block;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      margin-bottom: 12px;
      transition: all 0.2s;
    }

    .footer-column a:hover {
      color: white;
      transform: translateX(4px);
    }

    .footer-bottom {
      padding-top: 32px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
    }

    .footer-bottom p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
    }

    /* Back Button */
    .template-back {
      position: fixed;
      bottom: 32px;
      left: 32px;
      z-index: 999;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .nav-links {
        display: none;
      }

      .hero-title {
        font-size: 48px;
      }

      .section-title {
        font-size: 36px;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 36px;
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
      .testimonials-grid {
        grid-template-columns: 1fr;
      }

      .footer-links {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }
  `]
})
export class GlassLandingComponent {
  stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ];

  features = [
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
      title: 'Lightning Fast',
      description: 'Optimized performance with cutting-edge technology for instant load times.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
      title: 'Secure by Default',
      description: 'Enterprise-grade security with end-to-end encryption and compliance.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
      title: 'Real-time Analytics',
      description: 'Comprehensive insights and metrics to track your business growth.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"></path><polyline points="23 3 23 7 19 7"></polyline><polyline points="1 21 1 17 5 17"></polyline></svg>',
      title: 'API First',
      description: 'Powerful REST APIs and webhooks for seamless integrations.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
      title: 'Automated Workflows',
      description: 'Save time with intelligent automation and smart workflows.'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      title: 'Team Collaboration',
      description: 'Work together efficiently with powerful collaboration tools.'
    }
  ];

  services = [
    {
      number: '01',
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks and best practices.',
      items: ['React & Angular', 'Node.js Backend', 'Cloud Deployment', 'Performance Optimization']
    },
    {
      number: '02',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      items: ['React Native', 'Flutter', 'App Store Optimization', 'Push Notifications']
    },
    {
      number: '03',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love to interact with.',
      items: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    }
  ];

  portfolio = [
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: ['Web', 'Design'],
      title: 'E-commerce Platform',
      description: 'Modern online shopping experience with AI recommendations'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
      tags: ['Mobile', 'Fintech'],
      title: 'Banking App',
      description: 'Secure mobile banking with biometric authentication'
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tags: ['SaaS', 'Analytics'],
      title: 'Dashboard Analytics',
      description: 'Real-time business intelligence and data visualization'
    }
  ];

  testimonials = [
    {
      avatar: 'JD',
      name: 'John Doe',
      position: 'CEO at TechCorp',
      text: 'Working with this team has been an absolute pleasure. They delivered beyond our expectations and the results speak for themselves.'
    },
    {
      avatar: 'SM',
      name: 'Sarah Miller',
      position: 'Product Manager at StartupX',
      text: 'The attention to detail and commitment to quality is exceptional. Our users love the new design and functionality.'
    },
    {
      avatar: 'MJ',
      name: 'Michael Johnson',
      position: 'Founder at InnovateCo',
      text: 'From concept to launch, the process was smooth and efficient. Highly recommend their services to anyone.'
    }
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/templates']);
  }
}
