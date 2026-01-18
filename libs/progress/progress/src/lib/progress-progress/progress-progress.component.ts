import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ProgressType = 'linear' | 'circular';
type ProgressColor = 'primary' | 'success' | 'warning' | 'error';

@Component({
  selector: 'muxima-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-progress.component.html',
  styleUrls: ['./progress-progress.component.scss'],
})
export class ProgressProgressComponent {
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() type: ProgressType = 'linear';
  @Input() color: ProgressColor = 'primary';
  @Input() showLabel = false;
  @Input() striped = false;
  @Input() animated = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get percentage(): number {
    return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
  }

  get strokeDashoffset(): number {
    const circumference = 2 * Math.PI * 45;
    return circumference - (this.percentage / 100) * circumference;
  }
}
