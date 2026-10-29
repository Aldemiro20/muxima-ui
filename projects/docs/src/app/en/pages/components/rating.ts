import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFieldset, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxRating } from '@muxima-ui/core/rating';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';
import { MxProgress } from '@muxima-ui/core/progress';

@Component({
  selector: 'doc-rating-page',
  imports: [
    DOC_UI,
    MxRating,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    MxButton,
    ReactiveFormsModule,
    MxFieldset,
    MxProgress,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Rating' }]"
        title="Rating"
        lead="Star rating. To choose, it uses native radio buttons (the arrows change the rating); read-only it's an image with the text 4.5 of 5 stars, with half stars."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Rating example">
          <mx-form-field>
            <label mxLabel>How was the service?</label>
            <mx-rating [(value)]="rating" showValue />
            <mx-hint>{{ rating() ? labels[rating()! - 1] : 'Choose from 1 to 5.' }}</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxRating } from '@muxima-ui/core/rating';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          A group of radios hidden under drawn stars; each radio has a written
          name, for screen readers only.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'role=radiogroup',
            topRight: 'Value (optional)',
            bottomLeft: '24 px star',
            bottomRight: 'Name: 3 stars',
            bottom: 'The value is a number or null',
          }"
        >
          <mx-rating aria-label="Example" [value]="3" showValue />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"><mx-rating aria-label="Empty" /></doc-state>
          <doc-state name="With rating"><mx-rating aria-label="With rating" [value]="4" /></doc-state>
          <doc-state name="Read-only" note="Accepts half stars."
            ><mx-rating [value]="3.5" readonly showValue
          /></doc-state>
          <doc-state name="Disabled"
            ><mx-rating aria-label="Disabled" [value]="2" disabled
          /></doc-state>
          <doc-state name="Error"><mx-rating aria-label="Error" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Average on a product card"
            note="readonly: an image with the full text, no focus."
          >
            <div class="rating-summary">
              <strong>Kianda Logistics</strong>
              <div class="row-wrap">
                <mx-rating [value]="4.3" readonly showValue size="sm" /><span class="muted"
                  >128 reviews</span
                >
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Required in a form"
            note="Validators.required; clearable lets you clear it by pressing the same rating again."
          >
            <form
              class="stack w-full"
              [formGroup]="review"
              (ngSubmit)="review.markAllAsTouched()"
            >
              <mx-form-field>
                <label mxLabel>Rate the delivery</label>
                <mx-rating formControlName="delivery" clearable />
                <mx-error>Choose a rating from 1 to 5.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit" size="sm">Submit rating</button></div>
            </form>
          </doc-example>
          <doc-example
            title="10-point scale"
            [note]="'Rating: ' + (ten() ?? 'none') + '. max changes the number of stars.'"
          >
            <mx-form-field class="w-full">
              <label mxLabel>Would you recommend us to a colleague?</label>
              <mx-rating [(value)]="ten" [max]="10" size="sm" [starLabel]="points" />
            </mx-form-field>
          </doc-example>
          <doc-example title="Sizes">
            <div class="stack">
              <mx-rating size="sm" [value]="4" readonly />
              <mx-rating [value]="4" readonly />
              <mx-rating size="lg" [value]="4" readonly />
            </div>
          </doc-example>
          <doc-example
            title="Rating distribution"
            note="A read-only average and one bar per rating, with the number written."
          >
            <div class="rating-dist">
              <div class="rating-dist-head">
                <strong class="rating-big">{{ average() }}</strong>
                <div>
                  <mx-rating [value]="averageNum()" readonly size="sm" /><span class="muted"
                    >{{ totalReviews() }} reviews</span
                  >
                </div>
              </div>
              <ul class="rating-bars" aria-label="Reviews by rating">
                @for (b of distribution; track b.stars) {
                  <li>
                    <span>{{ b.stars }} ★</span>
                    <progress
                      mxProgress
                      [value]="b.total"
                      [max]="totalReviews()"
                      [attr.aria-label]="b.stars + ' stars'"
                    >
                      {{ b.total }}
                    </progress>
                    <span class="muted">{{ b.total }}</span>
                  </li>
                }
              </ul>
            </div>
          </doc-example>
          <doc-example
            title="Several categories"
            note="One rating per category, each with its own label; the average is computed."
          >
            <fieldset mxFieldset class="w-full">
              <legend>Rate your experience</legend>
              @for (c of categories; track c.name) {
                <mx-form-field class="rating-row">
                  <label mxLabel>{{ c.name }}</label>
                  <mx-rating [(value)]="c.rating" size="sm" />
                </mx-form-field>
              }
              <p class="muted">Average: {{ categoryAverage() }}</p>
            </fieldset>
          </doc-example>
          <doc-example
            title="Review list"
            note="Fictional examples; each rating is an image with text, so it's not in the tab order."
          >
            <ul class="review-list">
              @for (r of reviews; track r.author) {
                <li>
                  <div class="review-head">
                    <strong>{{ r.author }}</strong
                    ><mx-rating [value]="r.rating" readonly size="sm" />
                  </div>
                  <p>{{ r.text }}</p>
                  <span class="muted">{{ r.data }}</span>
                </li>
              }
            </ul>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            {
              key: 'Tab',
              action: 'Enters the group at the chosen rating (or the first one) and leaves with another Tab.',
            },
            { key: '← → ↑ ↓', action: 'Change the rating, as in any radio group.' },
            { key: 'Space', action: 'With clearable, on the chosen rating, clears it.' },
          ]"
          [aria]="[
            'Native radios: screen readers say 3 stars, 3 of 5, selected.',
            'The group has the label of the form field (aria-labelledby).',
            'Read-only it is role=img with the text 4.5 of 5 stars; the stars are hidden.',
            'The star color is --mx-warning, with contrast in both themes.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Radio' }, { name: 'Slider' }, { name: 'Badge' }]" />
      </section>
    </article>
  `,
})
export class RatingPage {
  protected readonly rating = signal<number | null>(null);
  protected readonly labels = ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent'];
  protected readonly ten = signal<number | null>(8);
  protected readonly points = (n: number) => `${n} of 10`;
  protected readonly review = new FormGroup({
    delivery: new FormControl<number | null>(null, Validators.required),
  });

  protected readonly distribution = [
    { stars: 5, total: 72 },
    { stars: 4, total: 31 },
    { stars: 3, total: 14 },
    { stars: 2, total: 6 },
    { stars: 1, total: 5 },
  ];
  protected readonly totalReviews = computed(() =>
    this.distribution.reduce((a, b) => a + b.total, 0),
  );
  protected readonly averageNum = computed(
    () =>
      Math.round(
        (this.distribution.reduce((a, b) => a + b.stars * b.total, 0) / this.totalReviews()) *
          10,
      ) / 10,
  );
  protected readonly average = computed(() => this.averageNum().toLocaleString('en-US'));
  protected readonly categories = [
    { name: 'Speed', rating: signal<number | null>(4) },
    { name: 'Friendliness', rating: signal<number | null>(5) },
    { name: 'Price', rating: signal<number | null>(null) },
  ];
  protected readonly categoryAverage = computed(() => {
    const ratings = this.categories.map((c) => c.rating()).filter((n): n is number => n !== null);
    return ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toLocaleString('en-US', {
          maximumFractionDigits: 1,
        })
      : 'no ratings';
  });
  protected readonly reviews = [
    {
      author: 'Customer A',
      rating: 5,
      text: 'Delivered on the agreed day and everything in order.',
      data: 'Oct 20, 2026',
    },
    {
      author: 'Customer B',
      rating: 3.5,
      text: 'Good service, but support was slow to reply.',
      data: 'Oct 12, 2026',
    },
    {
      author: 'Customer C',
      rating: 4,
      text: 'Clear invoices, easy to pay.',
      data: 'Oct 2, 2026',
    },
  ];

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>How was the service?</label>
  <mx-rating formControlName="rating" showValue />
</mx-form-field>

<mx-rating [value]="4.5" readonly showValue />`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'value',
      type: 'number | null (model)',
      description: 'Also with ngModel and Reactive Forms.',
    },
    { kind: 'Input', name: 'max', type: 'number', default: '5' },
    {
      kind: 'Input',
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Display only; accepts half stars.',
    },
    {
      kind: 'Input',
      name: 'clearable',
      type: 'boolean',
      default: 'false',
      description: 'Pressing the chosen rating clears it.',
    },
    {
      kind: 'Input',
      name: 'showValue',
      type: 'boolean',
      default: 'false',
      description: 'Number next to the stars.',
    },
    {
      kind: 'Input',
      name: 'starLabel',
      type: '(n) => string',
      default: 'n stars',
      description: 'Name of each option.',
    },
    {
      kind: 'Input',
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: '18, 24 or 32 px stars.',
    },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
  ];
}
