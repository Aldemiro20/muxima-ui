import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_CARD } from '@muxima-ui/core/card';
import { MxCarousel, MxCarouselSlide } from '@muxima-ui/core/carousel';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

/** Sample SVG image (no network requests). */
function image(color: string, text: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240"><rect width="400" height="240" fill="${color}"/><circle cx="320" cy="60" r="90" fill="#ffffff" fill-opacity=".12"/><text x="28" y="212" font-family="sans-serif" font-size="26" fill="#ffffff">${text}</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

@Component({
  selector: 'doc-carousel-page',
  imports: [DOC_UI, MxCarousel, MxCarouselSlide, MX_CARD, MxButton, MxBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Carousel' }]"
        title="Carousel"
        lead="Content shown in slides: highlights, galleries, products. It follows the WAI-ARIA Carousel pattern, swipes with a finger and only rotates on its own with a pause button."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Carousel example">
          <mx-carousel aria-label="What's new" class="w-full">
            @for (d of highlights; track d.title) {
              <mx-carousel-slide>
                <div class="slide-banner" [style.background]="d.color">
                  <span class="slide-kicker">{{ d.kicker }}</span>
                  <p class="slide-title">{{ d.title }}</p>
                  <a mxButton size="sm" variant="secondary" href="#"
                    >Learn more<span class="mx-visually-hidden"> about {{ d.title }}</span></a
                  >
                </div>
              </mx-carousel-slide>
            }
          </mx-carousel>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxCarousel, MxCarouselSlide } from '@muxima-ui/core/carousel';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          A strip with horizontal scroll and snap, previous and next buttons, and indicators
          below.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Region: carousel',
            topRight: 'Slide: 1 of 3',
            bottomLeft: 'Previous',
            bottomRight: 'Indicators and next',
            bottom: 'The hidden ones are inert',
          }"
        >
          <mx-carousel aria-label="Example" class="w-320">
            @for (d of highlights; track d.title) {
              <mx-carousel-slide
                ><div class="slide-banner slide-banner-sm" [style.background]="d.color">
                  <p class="slide-title">{{ d.kicker }}</p>
                </div></mx-carousel-slide
              >
            }
          </mx-carousel>
        </doc-structure>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Several per view"
            note='perView="2"; the buttons move one at a time.'
          >
            <mx-carousel aria-label="Featured products" [perView]="2" [gap]="12" class="w-full">
              @for (p of products; track p.name) {
                <mx-carousel-slide>
                  <article mxCard class="slide-card">
                    <div mxCardContent>
                      <span mxBadge variant="secondary" size="sm">{{ p.category }}</span>
                      <h3 class="slide-card-title">{{ p.name }}</h3>
                      <p class="muted small">{{ p.price }}</p>
                    </div>
                  </article>
                </mx-carousel-slide>
              }
            </mx-carousel>
          </doc-example>
          <doc-example
            title="Automatic rotation"
            note="autoplay in ms and loop; it stops on hover or focus, and doesn't start with reduced motion."
          >
            <mx-carousel aria-label="Tips" [autoplay]="5000" loop class="w-full">
              @for (d of tips; track d) {
                <mx-carousel-slide>
                  <div class="slide-tip">
                    <p>{{ d }}</p>
                  </div>
                </mx-carousel-slide>
              }
            </mx-carousel>
          </doc-example>
          <doc-example
            title="Image gallery"
            note="Each image has alt text; the slide name can be custom (label)."
          >
            <mx-carousel aria-label="Property photos" class="w-full">
              @for (f of photos; track f.alt) {
                <mx-carousel-slide [label]="f.alt">
                  <img class="slide-img" [src]="f.src" [alt]="f.alt" />
                </mx-carousel-slide>
              }
            </mx-carousel>
          </doc-example>
          <doc-example
            title="Welcome steps"
            [note]="
              '[(index)] binds the carousel to your own buttons. Step ' +
              (step() + 1) +
              ' of ' +
              welcome.length +
              '.'
            "
          >
            <div class="stack w-full">
              <mx-carousel
                aria-label="Welcome"
                [(index)]="step"
                [indicators]="false"
                [controls]="false"
                class="w-full"
              >
                @for (b of welcome; track b.title) {
                  <mx-carousel-slide>
                    <div class="slide-tip">
                      <p class="slide-card-title">{{ b.title }}</p>
                      <p class="muted small">{{ b.text }}</p>
                    </div>
                  </mx-carousel-slide>
                }
              </mx-carousel>
              <div class="row-wrap">
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  [disabled]="step() === 0"
                  (click)="step.set(step() - 1)"
                >
                  Back
                </button>
                @if (step() < welcome.length - 1) {
                  <button mxButton size="sm" type="button" (click)="step.set(step() + 1)">
                    Continue
                  </button>
                } @else {
                  <button mxButton size="sm" type="button" (click)="step.set(0)">Get started</button>
                }
              </div>
            </div>
          </doc-example>
          <doc-example
            title="No indicators, looping"
            note="indicators=false and loop: after the last one it goes back to the first."
          >
            <mx-carousel
              aria-label="Partners"
              [indicators]="false"
              loop
              [perView]="3"
              [gap]="8"
              class="w-full"
            >
              @for (p of partners; track p) {
                <mx-carousel-slide
                  ><div class="slide-logo">{{ p }}</div></mx-carousel-slide
                >
              }
            </mx-carousel>
          </doc-example>
          <doc-example
            title="Button texts"
            note="prevLabel and nextLabel change the button names, for example to another language."
          >
            <mx-carousel
              aria-label="Destaques"
              prevLabel="Diapositivo anterior"
              nextLabel="Diapositivo seguinte"
              class="w-full"
            >
              @for (d of highlights; track d.title) {
                <mx-carousel-slide
                  ><div class="slide-banner slide-banner-sm" [style.background]="d.color">
                    <p class="slide-title">{{ d.kicker }}</p>
                  </div></mx-carousel-slide
                >
              }
            </mx-carousel>
          </doc-example>
        </div>
        <doc-callout
          >Use a carousel for content that can stay hidden. If everything matters, a grid
          or a list is quicker to read.</doc-callout
        >
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            {
              key: 'Tab',
              action:
                'Pause button (if any), visible content, previous, indicators and next.',
            },
            { key: 'Enter Space', action: 'Change slides or stop the rotation.' },
            { key: 'Swipe', action: 'On touch screens, snapping to each slide.' },
          ]"
          [aria]="[
            'The carousel is a region with aria-roledescription=carousel and the name you give it.',
            'Each slide is a group with aria-roledescription=slide and the name 2 of 5.',
            'Slides out of view are inert: Tab does not enter them.',
            'Without rotation, the change is announced (aria-live=polite); while rotating, it stays silent.',
            'Rotation stops with the mouse or focus inside, and the pause button comes first.',
            'With reduced motion on, it does not rotate by itself or animate the scroll.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Card' }, { name: 'Tabs' }, { name: 'Stepper' }]" />
      </section>
    </article>
  `,
})
export class CarouselPage {
  protected readonly highlights = [
    {
      kicker: 'New',
      title: 'E-invoicing in every province',
      color: 'linear-gradient(135deg, #0F5257, #1F8A8A)',
    },
    {
      kicker: 'Webinar',
      title: 'Fiscal year close without surprises',
      color: 'linear-gradient(135deg, #4A2C6F, #7A4E9F)',
    },
    {
      kicker: 'Tip',
      title: 'Automatic reminders reduce late payments',
      color: 'linear-gradient(135deg, #8A3B12, #C2621E)',
    },
  ];
  protected readonly products = [
    { name: 'Ergonomic chair', category: 'Office', price: '$85' },
    { name: '140 cm desk', category: 'Office', price: '$210' },
    { name: 'LED lamp', category: 'Lighting', price: '$18.50' },
    { name: 'Modular shelving', category: 'Storage', price: '$145' },
    { name: 'Whiteboard', category: 'Meetings', price: '$32' },
  ];
  protected readonly tips = [
    'Use Ctrl + K to search on any page.',
    'Mark invoices as paid from the list, without opening each one.',
    'Export to CSV and open in Excel with one click.',
  ];
  protected readonly photos = [
    { alt: 'Living room with large windows', src: image('#2F4858', 'Living room') },
    { alt: 'Fitted kitchen', src: image('#33658A', 'Kitchen') },
    { alt: 'Main bedroom with balcony', src: image('#86BBD8', 'Bedroom') },
    { alt: 'View of the building from the street', src: image('#758E4F', 'Façade') },
  ];
  protected readonly welcome = [
    { title: 'Welcome to Kianda', text: 'In three steps your company is ready to invoice.' },
    { title: 'Add your customers', text: 'Import a CSV or create them as you invoice.' },
    {
      title: 'Issue your first invoice',
      text: 'Choose the customer, the amount and the due date.',
    },
  ];
  protected readonly step = signal(0);
  protected readonly partners = [
    'Kianda',
    'Mutamba',
    'Huíla Agro',
    'Cuanza',
    'Atlântico',
    'Lobito',
  ];

  protected readonly previewCode = `<mx-carousel aria-label="What's new">
  @for (d of highlights; track d.title) {
    <mx-carousel-slide>
      <div class="banner">
        <p>{{ d.title }}</p>
        <a mxButton href="/news">Learn more<span class="mx-visually-hidden"> about {{ d.title }}</span></a>
      </div>
    </mx-carousel-slide>
  }
</mx-carousel>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'index',
      type: 'number (model)',
      default: '0',
      description: 'First visible slide.',
    },
    { kind: 'Input', name: 'perView', type: 'number', default: '1' },
    { kind: 'Input', name: 'gap', type: 'number (px)', default: '16' },
    {
      kind: 'Input',
      name: 'autoplay',
      type: 'number (ms)',
      default: '0',
      description: '0 = no automatic rotation.',
    },
    { kind: 'Input', name: 'loop', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'indicators', type: 'boolean', default: 'true' },
    {
      kind: 'Input',
      name: 'controls',
      type: 'boolean',
      default: 'true',
      description: 'Previous and next buttons.',
    },
    {
      kind: 'Input',
      name: 'prevLabel, nextLabel',
      type: 'string',
      default: 'Previous slide, Next slide (from the language)',
    },
    { kind: 'Método', name: 'go(i), next(), prev(), togglePlay()', type: 'void' },
    {
      kind: 'Componente',
      name: 'mx-carousel-slide',
      type: 'label',
      description: 'Custom name; 2 of 5 by default.',
    },
  ];
}
