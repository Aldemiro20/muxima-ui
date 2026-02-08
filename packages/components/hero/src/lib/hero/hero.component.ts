import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HeroVariant = 'default' | 'centered' | 'split' | 'minimal' | 'gradient' | 'image-bg';
export type HeroSize = 'sm' | 'md' | 'lg' | 'xl';
export type HeroAlignment = 'left' | 'center' | 'right';

@Component({
  selector: 'muxima-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section 
      class="hero" 
      [class]="'hero-' + variant + ' hero-' + size + ' hero-align-' + alignment"
      [style.background-image]="backgroundImage ? 'url(' + backgroundImage + ')' : null">
      
      <!-- Background Overlay (for image-bg variant) -->
      <div class="hero-overlay" *ngIf="variant === 'image-bg'"></div>

      <div class="hero-container">
        <!-- Split Layout: Content Left, Visual Right -->
        <div class="hero-content" *ngIf="variant === 'split' || variant === 'default'">
          <!-- Announcement Badge -->
          <div class="hero-announcement" *ngIf="announcement">
            <span class="announcement-badge" *ngIf="announcementBadge">{{ announcementBadge }}</span>
            <span class="announcement-text" [innerHTML]="announcement"></span>
          </div>

          <!-- Title -->
          <h1 class="hero-title">
            <ng-content select="[title]"></ng-content>
            <span class="gradient-text" *ngIf="highlightText">{{ highlightText }}</span>
          </h1>

          <!-- Subtitle -->
          <p class="hero-subtitle" *ngIf="subtitle">{{ subtitle }}</p>

          <!-- CTA Buttons -->
          <div class="hero-cta" *ngIf="showCta">
            <ng-content select="[cta]"></ng-content>
          </div>

          <!-- Features List -->
          <div class="hero-features" *ngIf="features.length > 0">
            <div class="feature-item" *ngFor="let feature of features">
              <span class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span>{{ feature }}</span>
            </div>
          </div>
        </div>

        <!-- Centered Layout -->
        <div class="hero-content-centered" *ngIf="variant === 'centered' || variant === 'minimal' || variant === 'gradient' || variant === 'image-bg'">
          <!-- Announcement Badge -->
          <div class="hero-announcement" *ngIf="announcement">
            <span class="announcement-badge" *ngIf="announcementBadge">{{ announcementBadge }}</span>
            <span class="announcement-text" [innerHTML]="announcement"></span>
          </div>

          <!-- Title -->
          <h1 class="hero-title">
            <ng-content select="[title]"></ng-content>
            <span class="gradient-text" *ngIf="highlightText">{{ highlightText }}</span>
          </h1>

          <!-- Subtitle -->
          <p class="hero-subtitle" *ngIf="subtitle">{{ subtitle }}</p>

          <!-- CTA Buttons -->
          <div class="hero-cta" *ngIf="showCta">
            <ng-content select="[cta]"></ng-content>
          </div>

          <!-- Features List -->
          <div class="hero-features" *ngIf="features.length > 0">
            <div class="feature-item" *ngFor="let feature of features">
              <span class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span>{{ feature }}</span>
            </div>
          </div>
        </div>

        <!-- Visual/Mockup (for split and default variants) -->
        <div class="hero-visual" *ngIf="(variant === 'split' || variant === 'default') && showVisual">
          <ng-content select="[visual]"></ng-content>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      padding: 140px 32px 100px;
      overflow: hidden;
    }

    .hero-default {
      background: radial-gradient(ellipse at top, rgba(102, 126, 234, 0.05) 0%, transparent 60%);
    }

    .hero-gradient {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    }

    .hero-image-bg {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
      z-index: 0;
    }

    .hero-container {
      max-width: 1280px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    /* Split Layout */
    .hero-split .hero-container,
    .hero-default .hero-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    /* Centered Layout */
    .hero-centered .hero-container,
    .hero-minimal .hero-container,
    .hero-gradient .hero-container,
    .hero-image-bg .hero-container {
      text-align: center;
      max-width: 900px;
    }

    .hero-content,
    .hero-content-centered {
      animation: fadeInUp 0.8s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Announcement */
    .hero-announcement {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      padding: 8px 16px;
      border-radius: 100px;
      margin-bottom: 24px;
      border: 1px solid rgba(102, 126, 234, 0.2);
    }

    .hero-image-bg .hero-announcement {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .announcement-badge {
      background: var(--muxima-gradient, linear-gradient(135deg, #667eea, #764ba2));
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

    .hero-image-bg .announcement-text {
      color: rgba(255, 255, 255, 0.95);
    }

    /* Title */
    .hero-title {
      font-size: 72px;
      font-weight: 900;
      line-height: 1.1;
      color: #111827;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }

    .hero-image-bg .hero-title {
      color: white;
    }

    .hero-sm .hero-title { font-size: 48px; }
    .hero-md .hero-title { font-size: 60px; }
    .hero-lg .hero-title { font-size: 72px; }
    .hero-xl .hero-title { font-size: 84px; }

    .gradient-text {
      background: var(--muxima-gradient, linear-gradient(135deg, #667eea, #764ba2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: block;
    }

    /* Subtitle */
    .hero-subtitle {
      font-size: 20px;
      color: #6b7280;
      line-height: 1.7;
      margin-bottom: 40px;
    }

    .hero-centered .hero-subtitle,
    .hero-minimal .hero-subtitle,
    .hero-gradient .hero-subtitle,
    .hero-image-bg .hero-subtitle {
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 40px;
    }

    .hero-image-bg .hero-subtitle {
      color: rgba(255, 255, 255, 0.9);
    }

    .hero-sm .hero-subtitle { font-size: 16px; }
    .hero-md .hero-subtitle { font-size: 18px; }
    .hero-lg .hero-subtitle { font-size: 20px; }
    .hero-xl .hero-subtitle { font-size: 22px; }

    /* CTA */
    .hero-cta {
      display: flex;
      gap: 16px;
      margin-bottom: 40px;
    }

    .hero-centered .hero-cta,
    .hero-minimal .hero-cta,
    .hero-gradient .hero-cta,
    .hero-image-bg .hero-cta {
      justify-content: center;
    }

    .hero-align-right .hero-cta {
      justify-content: flex-end;
    }

    /* Features */
    .hero-features {
      display: flex;
      gap: 32px;
      flex-wrap: wrap;
    }

    .hero-centered .hero-features,
    .hero-minimal .hero-features,
    .hero-gradient .hero-features,
    .hero-image-bg .hero-features {
      justify-content: center;
    }

    .hero-align-right .hero-features {
      justify-content: flex-end;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #6b7280;
      font-size: 14px;
    }

    .hero-image-bg .feature-item {
      color: rgba(255, 255, 255, 0.9);
    }

    .feature-icon {
      color: #10b981;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .feature-icon svg {
      width: 16px;
      height: 16px;
      stroke: #10b981;
      stroke-width: 2.5;
    }

    .hero-image-bg .feature-icon svg {
      stroke: #10b981;
    }

    /* Visual */
    .hero-visual {
      animation: fadeInRight 0.8s ease-out;
    }

    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Minimal Variant */
    .hero-minimal {
      padding: 100px 32px 80px;
      background: transparent;
    }

    .hero-minimal .hero-title {
      font-size: 56px;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .hero-split .hero-container,
      .hero-default .hero-container {
        grid-template-columns: 1fr;
        gap: 48px;
      }

      .hero-title {
        font-size: 48px !important;
      }

      .hero-xl .hero-title {
        font-size: 56px !important;
      }
    }

    @media (max-width: 768px) {
      .hero {
        padding: 100px 24px 60px;
      }

      .hero-title {
        font-size: 36px !important;
      }

      .hero-subtitle {
        font-size: 16px !important;
      }

      .hero-cta {
        flex-direction: column;
      }

      .hero-features {
        flex-direction: column;
        gap: 16px;
      }
    }
  `]
})
export class HeroComponent {
  @Input() variant: HeroVariant = 'default';
  @Input() size: HeroSize = 'lg';
  @Input() alignment: HeroAlignment = 'left';
  @Input() announcement: string = '';
  @Input() announcementBadge: string = '';
  @Input() highlightText: string = '';
  @Input() subtitle: string = '';
  @Input() features: string[] = [];
  @Input() showCta: boolean = true;
  @Input() showVisual: boolean = true;
  @Input() backgroundImage: string = '';

  @Output() ctaClick = new EventEmitter<void>();
}
