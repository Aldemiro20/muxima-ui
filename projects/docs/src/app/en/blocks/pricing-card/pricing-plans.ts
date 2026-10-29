import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';

interface Plan {
  name: string;
  descricao: string;
  /** Monthly price in dollars. */
  monthly: number;
  includes: string[];
  recommended?: boolean;
}

/** Three plans with monthly or yearly billing (two months free on yearly). */
@Component({
  selector: 'app-pricing-plans',
  imports: [MxBadge, MxButton],
  templateUrl: './pricing-plans.html',
  styleUrl: './pricing-plans.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPlans {
  protected readonly period = signal<'monthly' | 'yearly'>('yearly');

  protected readonly plans: Plan[] = [
    {
      name: 'Basic',
      descricao: 'For those just getting started.',
      monthly: 9.9,
      includes: ['1 user', 'Unlimited invoices and receipts', 'Up to 200 customers', 'Email support'],
    },
    {
      name: 'Professional',
      descricao: 'For teams that sell every day.',
      monthly: 24.9,
      recommended: true,
      includes: ['5 users', 'Everything in Basic', 'Stock in 2 warehouses', 'Payment reminders', 'VAT report'],
    },
    {
      name: 'Business',
      descricao: 'For several stores and departments.',
      monthly: 59.9,
      includes: ['Unlimited users', 'Everything in Professional', 'Unlimited warehouses', 'Per-department permissions', 'Dedicated account manager'],
    },
  ];

  private readonly usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  /** Monthly price to show: on yearly, 10 months divided by 12. */
  protected monthPrice(p: Plan): string {
    const v = this.period() === 'yearly' ? Math.round(((p.monthly * 10) / 12) * 100) / 100 : p.monthly;
    return this.usd.format(v);
  }
  protected yearPrice(p: Plan): string {
    return this.usd.format(p.monthly * 10);
  }

  protected readonly notice = computed(() =>
    this.period() === 'yearly' ? 'Prices with yearly billing: two months free.' : 'Prices with monthly billing.',
  );
}
