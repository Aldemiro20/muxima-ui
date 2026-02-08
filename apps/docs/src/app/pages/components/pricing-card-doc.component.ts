import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingCardComponent, PricingFeature } from '@muxima-ui/pricing-card';

@Component({
  selector: 'muxima-pricing-card-doc',
  standalone: true,
  imports: [CommonModule, PricingCardComponent],
  templateUrl: './pricing-card-doc.component.html',
  styleUrls: ['./pricing-card-doc.component.scss']
})
export class PricingCardDocComponent {
  // Basic features
  basicFeatures: PricingFeature[] = [
    { text: '5 Projects', included: true },
    { text: '10 GB Storage', included: true },
    { text: 'Email Support', included: true },
    { text: 'Advanced Analytics', included: false },
    { text: 'Priority Support', included: false }
  ];

  // Pro features
  proFeatures: PricingFeature[] = [
    { text: 'Unlimited Projects', included: true },
    { text: '100 GB Storage', included: true },
    { text: 'Priority Email Support', included: true },
    { text: 'Advanced Analytics', included: true },
    { text: 'API Access', included: true },
    { text: 'Custom Integrations', included: false }
  ];

  // Enterprise features
  enterpriseFeatures: PricingFeature[] = [
    { text: 'Unlimited Everything', included: true },
    { text: 'Unlimited Storage', included: true },
    { text: '24/7 Phone Support', included: true },
    { text: 'Advanced Analytics', included: true },
    { text: 'Full API Access', included: true },
    { text: 'Custom Integrations', included: true },
    { text: 'Dedicated Account Manager', included: true }
  ];

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  handlePricingClick(plan: string) {
    console.log('Selected plan:', plan);
  }

  get importCode() {
    return `import { PricingCardComponent, PricingFeature } from '@muxima-ui/pricing-card';

@Component({
  imports: [PricingCardComponent]
})`;
  }

  get basicCode() {
    return `features: PricingFeature[] = [
  { text: '5 Projects', included: true },
  { text: '10 GB Storage', included: true },
  { text: 'Email Support', included: true },
  { text: 'Advanced Analytics', included: false }
];

<muxima-pricing-card
  planName="Starter"
  price="$9"
  period="per month"
  description="Perfect for individuals and small projects"
  [features]="features"
  buttonText="Start Free Trial"
  (buttonClick)="onPlanSelect()"
></muxima-pricing-card>`;
  }

  get variantsCode() {
    return `<!-- Default -->
<muxima-pricing-card variant="default" planName="Basic" price="$19" period="per month" [features]="features"></muxima-pricing-card>

<!-- Glass -->
<muxima-pricing-card variant="glass" planName="Pro" price="$49" period="per month" [features]="features"></muxima-pricing-card>

<!-- Neon -->
<muxima-pricing-card variant="neon" planName="Elite" price="$99" period="per month" [features]="features"></muxima-pricing-card>

<!-- Gradient -->
<muxima-pricing-card variant="gradient" planName="Premium" price="$79" period="per month" [features]="features"></muxima-pricing-card>`;
  }

  get popularCode() {
    return `<muxima-pricing-card
  planName="Pro"
  price="$49"
  period="per month"
  [popular]="true"
  popularText="Most Popular"
  [features]="proFeatures"
></muxima-pricing-card>`;
  }

  get glassCode() {
    return `<muxima-pricing-card
  variant="glass"
  planName="Premium"
  price="$79"
  period="per month"
  description="Advanced features for growing teams"
  [features]="proFeatures"
  buttonText="Upgrade Now"
  [popular]="true"
></muxima-pricing-card>`;
  }

  get neonCode() {
    return `<muxima-pricing-card
  variant="neon"
  planName="Elite Gaming"
  price="$99"
  period="per month"
  description="Ultimate performance for serious gamers"
  [features]="enterpriseFeatures"
  buttonText="Join Elite"
  [popular]="true"
  popularText="BEST VALUE"
></muxima-pricing-card>`;
  }
}
