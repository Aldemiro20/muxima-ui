import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

export type ToastType = 'success' | 'info' | 'warning' | 'error' | 'default';
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
export type ToastVariant = 'filled' | 'outlined' | 'soft';

@Component({
  selector: 'muxima-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"muxima-toast--" + position'
  },
  animations: [
    trigger('toastAnimation', [
      state('visible', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      state('hidden', style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' })),
      transition('hidden => visible', [
        style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
        animate('350ms cubic-bezier(0.22, 1, 0.36, 1)')
      ]),
      transition('visible => hidden', [
        animate('250ms cubic-bezier(0.55, 0, 0.55, 0.2)')
      ]),
    ]),
  ]
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() type: ToastType = 'default';
  @Input() variant: ToastVariant = 'filled';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() icon: string = '';
  @Input() showIcon: boolean = true;
  @Input() closable: boolean = true;
  @Input() position: ToastPosition = 'top-right';
  @Input() duration: number = 5000;
  @Input() pauseOnHover: boolean = true;
  @Input() showProgress: boolean = true;
  @Input() actionLabel: string = '';
  @Input() showTimestamp: boolean = false;
  
  @Output() closed = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<void>();

  state: 'visible' | 'hidden' = 'visible';
  progress: number = 100;
  timestamp: string = '';

  private timeoutId: any;
  private startTime: number = 0;
  private remainingTime: number = 0;
  private isPaused: boolean = false;
  private animationFrameId: any;

  get toastClasses(): string[] {
    const classes = ['muxima-toast'];
    classes.push(`muxima-toast--${this.type}`);
    classes.push(`muxima-toast--${this.variant}`);
    return classes;
  }

  get defaultIcon(): string {
    if (this.icon) return this.icon;
    
    switch (this.type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  }

  ngOnInit() {
    if (this.showTimestamp) {
      this.timestamp = new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }

    if (this.duration > 0) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.clearTimer();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  startTimer() {
    this.startTime = Date.now();
    this.remainingTime = this.duration;
    this.progress = 100;
    
    this.timeoutId = setTimeout(() => this.hide(), this.remainingTime);
    
    if (this.showProgress) {
      this.animateProgress();
    }
  }

  clearTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  animateProgress() {
    if (!this.showProgress || this.isPaused || this.duration <= 0) return;

    const initialRemaining = this.remainingTime;
    const startAnimation = Date.now();

    const animate = () => {
      if (this.isPaused) return;

      const elapsed = Date.now() - startAnimation;
      const timeLeft = Math.max(0, initialRemaining - elapsed);
      this.progress = (timeLeft / this.duration) * 100;

      if (timeLeft > 0 && this.state === 'visible') {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.progress = 0;
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  onMouseEnter() {
    if (this.pauseOnHover && this.duration > 0 && !this.isPaused) {
      this.isPaused = true;
      this.clearTimer();
      this.remainingTime -= Date.now() - this.startTime;
    }
  }

  onMouseLeave() {
    if (this.pauseOnHover && this.duration > 0 && this.isPaused) {
      this.isPaused = false;
      this.startTime = Date.now();
      
      this.timeoutId = setTimeout(() => this.hide(), this.remainingTime);
      
      if (this.showProgress) {
        this.animateProgress();
      }
    }
  }

  hide() {
    this.state = 'hidden';
    setTimeout(() => this.close(), 250);
  }

  close() {
    this.clearTimer();
    this.closed.emit();
  }

  onActionClick() {
    this.actionClick.emit();
  }
}
