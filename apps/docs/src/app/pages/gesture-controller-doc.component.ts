import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestureControllerComponent, GestureEvent } from '@muxima-ui/gesture-controller';

@Component({
  selector: 'muxima-gesture-controller-doc',
  standalone: true,
  imports: [CommonModule, GestureControllerComponent],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>🎮 Gesture Controller</h1>
        <p class="doc-description">
          Controle por gestos touch: swipe, pinch, rotate, tap, double tap e long press.
          Sistema revolucionário por <strong>Aldemiro Valentim</strong>.
        </p>
      </div>

      <section class="doc-section">
        <h2>Demo Interativa</h2>
        
        <div class="example-card">
          <h3>Galeria de Fotos - Aldemiro Valentim</h3>
          <muxima-gesture-controller
            [width]="600"
            [height]="400"
            [showHelp]="true"
            (swipe)="onSwipe($event)"
            (pinch)="onPinch($event)"
            (rotate)="onRotate($event)"
            (tap)="onTap($event)"
            (doubleTap)="onDoubleTap($event)"
            (longPress)="onLongPress($event)">
            <div class="demo-content">
              <img [src]="currentImage" [alt]="'Foto ' + currentIndex" 
                   [style.transform]="imageTransform">
              <div class="image-info">
                <h4>{{ currentImageName }}</h4>
                <p>Foto {{ currentIndex + 1 }} de {{ images.length }}</p>
                <small>Por Aldemiro Valentim</small>
              </div>
            </div>
          </muxima-gesture-controller>
        </div>

        <div class="gesture-log" *ngIf="gestureHistory.length > 0">
          <h3>📊 Histórico de Gestos</h3>
          <div class="log-item" *ngFor="let g of gestureHistory.slice(-5).reverse()">
            <span class="log-type">{{ g.type }}</span>
            <span class="log-detail">{{ getGestureDetail(g) }}</span>
            <span class="log-time">{{ g.timestamp | date:'HH:mm:ss' }}</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2>Gestos Suportados</h2>
        <div class="gestures-grid">
          <div class="gesture-card">
            <span class="gesture-icon">👆</span>
            <h4>Swipe</h4>
            <p>Deslize em 4 direções</p>
            <code>Up, Down, Left, Right</code>
          </div>
          <div class="gesture-card">
            <span class="gesture-icon">🤏</span>
            <h4>Pinch</h4>
            <p>Zoom in/out</p>
            <code>Scale: 0.5 - 2.0</code>
          </div>
          <div class="gesture-card">
            <span class="gesture-icon">🔄</span>
            <h4>Rotate</h4>
            <p>Gire com 2 dedos</p>
            <code>Rotation: -180° a 180°</code>
          </div>
          <div class="gesture-card">
            <span class="gesture-icon">👉</span>
            <h4>Tap</h4>
            <p>Toque único</p>
            <code>Quick touch</code>
          </div>
          <div class="gesture-card">
            <span class="gesture-icon">👉👉</span>
            <h4>Double Tap</h4>
            <p>Toque duplo rápido</p>
            <code>&lt; 300ms interval</code>
          </div>
          <div class="gesture-card">
            <span class="gesture-icon">👇</span>
            <h4>Long Press</h4>
            <p>Toque prolongado</p>
            <code>&gt; 500ms</code>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ 6 tipos de gestos (swipe, pinch, rotate, tap, double tap, long press)</li>
          <li>✅ Touch e Mouse support</li>
          <li>✅ Multi-touch (até 2 dedos)</li>
          <li>✅ Threshold configurável</li>
          <li>✅ Feedback visual em tempo real</li>
          <li>✅ Eventos tipados com TypeScript</li>
          <li>✅ Performance otimizada</li>
          <li>✅ Mobile-first design</li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .doc-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .doc-header {
      margin-bottom: 48px;

      h1 {
        font-size: 48px;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 16px;
      }

      .doc-description {
        font-size: 20px;
        color: #6b7280;
        line-height: 1.6;
        strong { color: #667eea; }
      }
    }

    .doc-section {
      margin-bottom: 48px;

      h2 {
        font-size: 32px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 3px solid #667eea;
      }
    }

    .example-card {
      margin-bottom: 32px;

      h3 {
        font-size: 20px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 24px;
      }
    }

    .demo-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;

      img {
        max-width: 80%;
        max-height: 60%;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
      }
    }

    .image-info {
      margin-top: 20px;
      text-align: center;

      h4 {
        color: #667eea;
        margin-bottom: 8px;
      }

      p {
        color: #374151;
        margin: 4px 0;
      }

      small {
        color: #6b7280;
        font-style: italic;
      }
    }

    .gesture-log {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      h3 {
        color: #667eea;
        margin-bottom: 16px;
      }
    }

    .log-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;

      &:last-child { border-bottom: none; }

      .log-type {
        font-weight: 700;
        color: #667eea;
        text-transform: uppercase;
        min-width: 100px;
      }

      .log-detail {
        flex: 1;
        color: #374151;
      }

      .log-time {
        color: #6b7280;
        font-family: monospace;
      }
    }

    .gestures-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .gesture-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }

      .gesture-icon {
        font-size: 48px;
        display: block;
        margin-bottom: 12px;
      }

      h4 {
        color: #667eea;
        margin-bottom: 8px;
      }

      p {
        color: #6b7280;
        font-size: 14px;
        margin-bottom: 12px;
      }

      code {
        background: #f3f4f6;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        color: #374151;
      }
    }

    .features-list {
      list-style: none;
      padding: 0;

      li {
        padding: 12px 0;
        color: #374151;
        font-size: 16px;
        line-height: 1.6;
      }
    }
  `]
})
export class GestureControllerDocComponent {
  currentIndex = 0;
  currentScale = 1;
  currentRotation = 0;
  gestureHistory: GestureEvent[] = [];

  images = [
    'https://via.placeholder.com/600x400/667eea/ffffff?text=Foto+1+-+Aldemiro',
    'https://via.placeholder.com/600x400/764ba2/ffffff?text=Foto+2+-+Valentim',
    'https://via.placeholder.com/600x400/10b981/ffffff?text=Foto+3+-+Portfolio'
  ];

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  get currentImageName(): string {
    return `Projeto ${this.currentIndex + 1} - Aldemiro Valentim`;
  }

  get imageTransform(): string {
    return `scale(${this.currentScale}) rotate(${this.currentRotation}deg)`;
  }

  onSwipe(event: GestureEvent) {
    console.log('Swipe detected by Aldemiro Valentim system:', event);
    this.gestureHistory.push(event);

    if (event.direction === 'left') {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    } else if (event.direction === 'right') {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }

  onPinch(event: GestureEvent) {
    console.log('Pinch:', event);
    this.gestureHistory.push(event);
    if (event.scale) {
      this.currentScale = Math.max(0.5, Math.min(2, event.scale));
    }
  }

  onRotate(event: GestureEvent) {
    console.log('Rotate:', event);
    this.gestureHistory.push(event);
    if (event.rotation) {
      this.currentRotation = event.rotation;
    }
  }

  onTap(event: GestureEvent) {
    console.log('Tap by Aldemiro Valentim');
    this.gestureHistory.push(event);
  }

  onDoubleTap(event: GestureEvent) {
    console.log('Double Tap - Reset');
    this.gestureHistory.push(event);
    this.currentScale = 1;
    this.currentRotation = 0;
  }

  onLongPress(event: GestureEvent) {
    console.log('Long Press - Info');
    this.gestureHistory.push(event);
    alert(`Informações detalhadas\nDesenvolvido por Aldemiro Valentim`);
  }

  getGestureDetail(gesture: GestureEvent): string {
    switch (gesture.type) {
      case 'swipe':
        return `Direction: ${gesture.direction}, Distance: ${gesture.distance?.toFixed(0)}px`;
      case 'pinch':
        return `Scale: ${gesture.scale?.toFixed(2)}`;
      case 'rotate':
        return `Rotation: ${gesture.rotation?.toFixed(0)}°`;
      default:
        return `${gesture.touches} touch(es)`;
    }
  }
}
