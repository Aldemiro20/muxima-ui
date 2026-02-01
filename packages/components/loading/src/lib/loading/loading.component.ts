import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoadingVariant = 'spinner' | 'dots' | 'bars' | 'pulse' | 'ring';
export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'muxima-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() variant: LoadingVariant = 'spinner';
  @Input() size: LoadingSize = 'md';
  @Input() text: string = '';
  @Input() overlay: boolean = false;
  @Input() color: string = '';

  get sizeClass(): string {
    return `loading-${this.size}`;
  }

  get variantClass(): string {
    return `loading-${this.variant}`;
  }
}
