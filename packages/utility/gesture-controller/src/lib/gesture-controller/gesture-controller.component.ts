import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GestureEvent {
  type: 'swipe' | 'pinch' | 'rotate' | 'tap' | 'doubletap' | 'longpress';
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  scale?: number;
  rotation?: number;
  touches?: number;
  timestamp: Date;
}

@Component({
  selector: 'muxima-gesture-controller',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #gestureZone class="gesture-zone" 
         [style.width.px]="width"
         [style.height.px]="height">
      <div class="gesture-content">
        <ng-content></ng-content>
        
        <div class="gesture-feedback" *ngIf="showFeedback && lastGesture">
          <div class="feedback-icon">{{ getGestureIcon() }}</div>
          <div class="feedback-text">{{ getGestureText() }}</div>
        </div>

        <div class="gesture-help" *ngIf="showHelp">
          <h4>Gestos Disponíveis</h4>
          <ul>
            <li>👆 <strong>Swipe</strong> - Deslize em qualquer direção</li>
            <li>🤏 <strong>Pinch</strong> - Aproxime/afaste dois dedos</li>
            <li>🔄 <strong>Rotate</strong> - Rotacione com dois dedos</li>
            <li>👉 <strong>Tap</strong> - Toque único</li>
            <li>👉👉 <strong>Double Tap</strong> - Toque duplo rápido</li>
            <li>👇 <strong>Long Press</strong> - Toque longo (500ms)</li>
          </ul>
          <p class="help-footer">Sistema por Aldemiro Valentim</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gesture-zone {
      position: relative;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border: 3px dashed #667eea;
      border-radius: 16px;
      overflow: hidden;
      touch-action: none;
      user-select: none;
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    }

    .gesture-content {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .gesture-feedback {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(102, 126, 234, 0.95);
      color: white;
      padding: 24px 32px;
      border-radius: 16px;
      text-align: center;
      animation: feedbackPop 0.3s ease-out;
      pointer-events: none;
      z-index: 10;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .feedback-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }

    .feedback-text {
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .gesture-help {
      position: absolute;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      h4 {
        color: #667eea;
        margin-bottom: 12px;
        font-size: 16px;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0 0 12px 0;

        li {
          padding: 8px 0;
          font-size: 14px;
          color: #374151;

          strong {
            color: #667eea;
          }
        }
      }

      .help-footer {
        margin: 0;
        font-size: 12px;
        color: #6b7280;
        font-style: italic;
        text-align: right;
      }
    }

    @keyframes feedbackPop {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.1);
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }
  `]
})
export class GestureControllerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gestureZone') gestureZone!: ElementRef<HTMLDivElement>;
  
  @Input() width = 600;
  @Input() height = 400;
  @Input() showFeedback = true;
  @Input() showHelp = true;
  @Input() swipeThreshold = 50;
  @Input() pinchThreshold = 0.1;
  @Input() rotateThreshold = 10;
  @Input() longPressDelay = 500;

  @Output() gesture = new EventEmitter<GestureEvent>();
  @Output() swipe = new EventEmitter<GestureEvent>();
  @Output() pinch = new EventEmitter<GestureEvent>();
  @Output() rotate = new EventEmitter<GestureEvent>();
  @Output() tap = new EventEmitter<GestureEvent>();
  @Output() doubleTap = new EventEmitter<GestureEvent>();
  @Output() longPress = new EventEmitter<GestureEvent>();

  lastGesture: GestureEvent | null = null;
  private startX = 0;
  private startY = 0;
  private startDistance = 0;
  private startAngle = 0;
  private startTime = 0;
  private lastTapTime = 0;
  private longPressTimer: any;
  private touchCount = 0;

  ngAfterViewInit() {
    this.setupGestureListeners();
  }

  private setupGestureListeners() {
    const element = this.gestureZone.nativeElement;

    // Touch events
    element.addEventListener('touchstart', this.handleTouchStart.bind(this));
    element.addEventListener('touchmove', this.handleTouchMove.bind(this));
    element.addEventListener('touchend', this.handleTouchEnd.bind(this));

    // Mouse events (for desktop)
    element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    element.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  private handleTouchStart(event: TouchEvent) {
    this.touchCount = event.touches.length;
    this.startTime = Date.now();

    if (event.touches.length === 1) {
      const touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;

      // Long press detection
      this.longPressTimer = setTimeout(() => {
        this.emitGesture({
          type: 'longpress',
          touches: 1,
          timestamp: new Date()
        });
      }, this.longPressDelay);

    } else if (event.touches.length === 2) {
      clearTimeout(this.longPressTimer);
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      
      this.startDistance = this.getDistance(touch1, touch2);
      this.startAngle = this.getAngle(touch1, touch2);
    }
  }

  private handleTouchMove(event: TouchEvent) {
    clearTimeout(this.longPressTimer);

    if (event.touches.length === 1) {
      // Swipe detection
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.startX;
      const deltaY = touch.clientY - this.startY;
      
      // Preview swipe direction (optional)
      
    } else if (event.touches.length === 2) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      
      // Pinch detection
      const currentDistance = this.getDistance(touch1, touch2);
      const scale = currentDistance / this.startDistance;
      
      if (Math.abs(scale - 1) > this.pinchThreshold) {
        this.emitGesture({
          type: 'pinch',
          scale,
          touches: 2,
          timestamp: new Date()
        });
      }

      // Rotate detection
      const currentAngle = this.getAngle(touch1, touch2);
      const rotation = currentAngle - this.startAngle;
      
      if (Math.abs(rotation) > this.rotateThreshold) {
        this.emitGesture({
          type: 'rotate',
          rotation,
          touches: 2,
          timestamp: new Date()
        });
      }
    }
  }

  private handleTouchEnd(event: TouchEvent) {
    clearTimeout(this.longPressTimer);

    if (this.touchCount === 1 && event.changedTouches.length === 1) {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - this.startX;
      const deltaY = touch.clientY - this.startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const duration = Date.now() - this.startTime;

      if (distance < 10 && duration < 300) {
        // Tap or Double Tap
        const now = Date.now();
        if (now - this.lastTapTime < 300) {
          this.emitGesture({
            type: 'doubletap',
            touches: 1,
            timestamp: new Date()
          });
        } else {
          this.emitGesture({
            type: 'tap',
            touches: 1,
            timestamp: new Date()
          });
        }
        this.lastTapTime = now;

      } else if (distance > this.swipeThreshold) {
        // Swipe
        const direction = this.getSwipeDirection(deltaX, deltaY);
        this.emitGesture({
          type: 'swipe',
          direction,
          distance,
          touches: 1,
          timestamp: new Date()
        });
      }
    }
  }

  private handleMouseDown(event: MouseEvent) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startTime = Date.now();
  }

  private handleMouseMove(event: MouseEvent) {
    if (event.buttons === 1) {
      // Mouse drag (treated as swipe preview)
    }
  }

  private handleMouseUp(event: MouseEvent) {
    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > this.swipeThreshold) {
      const direction = this.getSwipeDirection(deltaX, deltaY);
      this.emitGesture({
        type: 'swipe',
        direction,
        distance,
        touches: 1,
        timestamp: new Date()
      });
    } else if (distance < 10) {
      this.emitGesture({
        type: 'tap',
        touches: 1,
        timestamp: new Date()
      });
    }
  }

  private getDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private getAngle(touch1: Touch, touch2: Touch): number {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  private getSwipeDirection(deltaX: number, deltaY: number): 'up' | 'down' | 'left' | 'right' {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }

  private emitGesture(gestureEvent: GestureEvent) {
    this.lastGesture = gestureEvent;
    this.gesture.emit(gestureEvent);

    // Emit specific event
    switch (gestureEvent.type) {
      case 'swipe':
        this.swipe.emit(gestureEvent);
        break;
      case 'pinch':
        this.pinch.emit(gestureEvent);
        break;
      case 'rotate':
        this.rotate.emit(gestureEvent);
        break;
      case 'tap':
        this.tap.emit(gestureEvent);
        break;
      case 'doubletap':
        this.doubleTap.emit(gestureEvent);
        break;
      case 'longpress':
        this.longPress.emit(gestureEvent);
        break;
    }

    // Clear feedback after delay
    setTimeout(() => {
      if (this.lastGesture === gestureEvent) {
        this.lastGesture = null;
      }
    }, 1000);
  }

  getGestureIcon(): string {
    if (!this.lastGesture) return '';
    
    switch (this.lastGesture.type) {
      case 'swipe':
        return {
          'up': '⬆️',
          'down': '⬇️',
          'left': '⬅️',
          'right': '➡️'
        }[this.lastGesture.direction!] || '👆';
      case 'pinch':
        return this.lastGesture.scale! > 1 ? '🔍+' : '🔍-';
      case 'rotate':
        return '🔄';
      case 'tap':
        return '👉';
      case 'doubletap':
        return '👉👉';
      case 'longpress':
        return '👇';
      default:
        return '✨';
    }
  }

  getGestureText(): string {
    if (!this.lastGesture) return '';
    
    switch (this.lastGesture.type) {
      case 'swipe':
        return `Swipe ${this.lastGesture.direction}`;
      case 'pinch':
        return this.lastGesture.scale! > 1 ? 'Zoom In' : 'Zoom Out';
      case 'rotate':
        return `Rotate ${this.lastGesture.rotation!.toFixed(0)}°`;
      case 'tap':
        return 'Tap';
      case 'doubletap':
        return 'Double Tap';
      case 'longpress':
        return 'Long Press';
      default:
        return 'Gesture';
    }
  }

  ngOnDestroy() {
    clearTimeout(this.longPressTimer);
  }
}
