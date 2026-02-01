import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonShape = 'rectangle' | 'circle' | 'text' | 'avatar' | 'card';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';
export type SkeletonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'muxima-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() shape: SkeletonShape = 'rectangle';
  @Input() animation: SkeletonAnimation = 'pulse';
  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() size: SkeletonSize = 'md';
  @Input() count: number = 1;
  @Input() borderRadius: string = '0.375rem';

  get skeletonStyle() {
    const styles: any = {
      width: this.width,
      height: this.height,
      borderRadius: this.borderRadius
    };

    if (this.shape === 'circle' || this.shape === 'avatar') {
      const size = this.getSizeValue();
      styles.width = size;
      styles.height = size;
      styles.borderRadius = '50%';
    }

    if (this.shape === 'text') {
      styles.height = this.getTextHeight();
      styles.borderRadius = '0.25rem';
    }

    return styles;
  }

  private getSizeValue(): string {
    switch (this.size) {
      case 'sm': return '32px';
      case 'md': return '48px';
      case 'lg': return '64px';
      default: return '48px';
    }
  }

  private getTextHeight(): string {
    switch (this.size) {
      case 'sm': return '12px';
      case 'md': return '16px';
      case 'lg': return '20px';
      default: return '16px';
    }
  }

  get animationClass(): string {
    return `skeleton-${this.animation}`;
  }

  get countArray(): number[] {
    return Array(this.count).fill(0);
  }
}
