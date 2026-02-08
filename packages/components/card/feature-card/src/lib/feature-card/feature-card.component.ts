import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FeatureCardVariant = 'default' | 'glass' | 'neon' | 'gradient';
export type FeatureCardSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'muxima-feature-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss'],
})
export class FeatureCardComponent {
  /** Icon to display (emoji or icon class) */
  @Input() icon = '✨';
  
  /** Card title */
  @Input() title = '';
  
  /** Card description */
  @Input() description = '';
  
  /** Optional link text */
  @Input() linkText = '';
  
  /** Optional link URL */
  @Input() linkUrl = '';
  
  /** Visual variant */
  @Input() variant: FeatureCardVariant = 'default';
  
  /** Card size */
  @Input() size: FeatureCardSize = 'md';
  
  /** Enable hover effect */
  @Input() hoverable = true;
  
  /** Icon background color (for default variant) */
  @Input() iconColor: 'primary' | 'success' | 'warning' | 'error' | 'info' = 'primary';
}
