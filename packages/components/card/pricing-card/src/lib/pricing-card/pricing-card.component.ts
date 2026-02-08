import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PricingCardVariant = 'default' | 'glass' | 'neon' | 'gradient';
export type PricingFeature = {
  text: string;
  included: boolean;
};

@Component({
  selector: 'muxima-pricing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.scss'],
})
export class PricingCardComponent {
  /** Plan name */
  @Input() planName = '';
  
  /** Price amount */
  @Input() price = '';
  
  /** Billing period (e.g., "per month", "per year") */
  @Input() period = '';
  
  /** Plan description */
  @Input() description = '';
  
  /** List of features */
  @Input() features: PricingFeature[] = [];
  
  /** Button text */
  @Input() buttonText = 'Get Started';
  
  /** Highlight as popular/recommended */
  @Input() popular = false;
  
  /** Popular badge text */
  @Input() popularText = 'Most Popular';
  
  /** Visual variant */
  @Input() variant: PricingCardVariant = 'default';
  
  /** Enable hover effect */
  @Input() hoverable = true;
  
  /** Button click event */
  @Output() buttonClick = new EventEmitter<void>();
  
  onButtonClick() {
    this.buttonClick.emit();
  }
}
