import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

type ProgressType = 'linear' | 'circular' | 'bar' | 'gradient' | 'indeterminate';
type ProgressColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple';
type ProgressVariant = 'default' | 'rounded' | 'square' | 'pill';

@Component({
  selector: 'muxima-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-progress.component.html',
  styleUrls: ['./progress-progress.component.scss'],
})
export class ProgressProgressComponent implements OnInit, OnDestroy {
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() type: ProgressType = 'linear';
  @Input() color: ProgressColor = 'primary';
  @Input() showLabel = false;
  @Input() striped = false;
  @Input() animated = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: ProgressVariant = 'default';
  @Input() thickness: 'thin' | 'medium' | 'thick' = 'medium';
  @Input() showPercentage = false;
  @Input() buffer: number = 0; // For buffer progress (like video loading)
  @Input() multiColor = false; // For gradient multi-color effect
  @Input() pulse = false; // For pulsing animation
  @Input() glow = false; // For glow effect

  private pulseInterval: any;

  ngOnInit() {
    if (this.pulse && this.type === 'indeterminate') {
      this.startPulseAnimation();
    }
  }

  ngOnDestroy() {
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
    }
  }

  get percentage(): number {
    return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
  }

  get bufferPercentage(): number {
    return Math.min(Math.max((this.buffer / this.max) * 100, 0), 100);
  }

  get strokeDashoffset(): number {
    const radius = this.getCircularRadius();
    const circumference = 2 * Math.PI * radius;
    return circumference - (this.percentage / 100) * circumference;
  }

  get strokeDasharray(): number {
    const radius = this.getCircularRadius();
    return 2 * Math.PI * radius;
  }

  getCircularRadius(): number {
    switch (this.size) {
      case 'sm': return 38;
      case 'lg': return 42;
      default: return 40;
    }
  }

  getStrokeWidth(): number {
    switch (this.thickness) {
      case 'thin': return 4;
      case 'thick': return 10;
      default: return 6;
    }
  }

  getColorClass(): string {
    if (this.multiColor) {
      if (this.percentage < 33) return 'error';
      if (this.percentage < 66) return 'warning';
      return 'success';
    }
    return this.color;
  }

  getGradientId(): string {
    return `gradient-${this.getColorClass()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private startPulseAnimation() {
    let increasing = true;
    this.pulseInterval = setInterval(() => {
      if (increasing) {
        this.value += 2;
        if (this.value >= 100) {
          increasing = false;
        }
      } else {
        this.value -= 2;
        if (this.value <= 0) {
          increasing = true;
        }
      }
    }, 50);
  }
}
