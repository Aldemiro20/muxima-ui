import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TrendDirection = 'up' | 'down' | 'neutral';
export type StatsSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'muxima-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() icon: string = '';
  @Input() trend: number = 0;
  @Input() trendLabel: string = '';
  @Input() color: string = 'primary';
  @Input() size: StatsSize = 'md';
  @Input() loading: boolean = false;
  @Input() sparklineData: number[] = [];

  get trendDirection(): TrendDirection {
    if (this.trend > 0) return 'up';
    if (this.trend < 0) return 'down';
    return 'neutral';
  }

  get trendClass(): string {
    return `trend-${this.trendDirection}`;
  }

  get colorClass(): string {
    return `stats-${this.color}`;
  }

  get sizeClass(): string {
    return `stats-${this.size}`;
  }

  get hasSparkline(): boolean {
    return this.sparklineData.length > 0;
  }

  getSparklinePath(): string {
    if (!this.hasSparkline) return '';

    const width = 100;
    const height = 30;
    const max = Math.max(...this.sparklineData);
    const min = Math.min(...this.sparklineData);
    const range = max - min || 1;

    const points = this.sparklineData.map((value, index) => {
      const x = (index / (this.sparklineData.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  }
}
