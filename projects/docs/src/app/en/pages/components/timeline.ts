import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_TIMELINE } from '@muxima-ui/core/timeline';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-timeline-page',
  imports: [DOC_UI, MX_TIMELINE, MxBadge, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Timeline' }]"
        title="Timeline"
        lead="Events in order: an invoice's history, an order's steps, an activity log. It's a native ordered list with markers, so screen readers announce how many there are and each one's position."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Timeline example">
          <ol mxTimeline aria-label="Invoice FT 2026/0196 history" class="w-320">
            <li mxTimelineItem variant="success">
              <time mxTimelineTime datetime="2026-10-27T08:12">Oct 27, 08:12</time>
              <p mxTimelineTitle>Paid</p>
              <p mxTimelineDescription>Huíla Agro paid by transfer.</p>
            </li>
            <li mxTimelineItem variant="accent">
              <time mxTimelineTime datetime="2026-10-20T10:00">Oct 20, 10:00</time>
              <p mxTimelineTitle>Reminder sent</p>
            </li>
            <li mxTimelineItem>
              <time mxTimelineTime datetime="2026-10-15T09:30">Oct 15, 09:30</time>
              <p mxTimelineTitle>Issued</p>
              <p mxTimelineDescription>By Ana Kiala.</p>
            </li>
          </ol>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_TIMELINE } from '@muxima-ui/core/timeline';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          Each item is an li with a marker and a line to the next; the date appears above the title.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Marker',
            topRight: 'Date (time)',
            bottomLeft: 'Line',
            bottomRight: 'Title and description',
            bottom: 'ol mxTimeline > li mxTimelineItem',
          }"
        >
          <ol mxTimeline aria-label="Example" class="w-180">
            <li mxTimelineItem variant="accent">
              <time mxTimelineTime>Today</time>
              <p mxTimelineTitle>Sent</p>
            </li>
            <li mxTimelineItem>
              <time mxTimelineTime>Yesterday</time>
              <p mxTimelineTitle>Created</p>
            </li>
          </ol>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Default"
            ><ol mxTimeline aria-label="Default">
              <li mxTimelineItem><p mxTimelineTitle>Created</p></li>
            </ol></doc-state
          >
          <doc-state name="Accent"
            ><ol mxTimeline aria-label="Accent">
              <li mxTimelineItem variant="accent"><p mxTimelineTitle>Sent</p></li>
            </ol></doc-state
          >
          <doc-state name="Success"
            ><ol mxTimeline aria-label="Success">
              <li mxTimelineItem variant="success"><p mxTimelineTitle>Paid</p></li>
            </ol></doc-state
          >
          <doc-state name="Warning"
            ><ol mxTimeline aria-label="Warning">
              <li mxTimelineItem variant="warning"><p mxTimelineTitle>Due today</p></li>
            </ol></doc-state
          >
          <doc-state name="Danger"
            ><ol mxTimeline aria-label="Danger">
              <li mxTimelineItem variant="danger"><p mxTimelineTitle>Overdue</p></li>
            </ol></doc-state
          >
          <doc-state name="Pending" note="A step that hasn't happened yet."
            ><ol mxTimeline aria-label="Pending">
              <li mxTimelineItem pending><p mxTimelineTitle>Archive</p></li>
            </ol></doc-state
          >
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Order tracking"
            note="Done and pending steps; the text gives the status, not just the marker."
          >
            <ol mxTimeline aria-label="Order 4821 status">
              @for (p of order; track p.title) {
                <li mxTimelineItem [variant]="p.done ? 'success' : 'default'" [pending]="!p.done">
                  <time mxTimelineTime [attr.datetime]="p.iso">{{ p.when }}</time>
                  <p mxTimelineTitle>
                    {{ p.title
                    }}<span class="mx-visually-hidden">{{
                      p.done ? ', completed' : ', upcoming'
                    }}</span>
                  </p>
                </li>
              }
            </ol>
          </doc-example>
          <doc-example
            title="With icons"
            note="icon enlarges the marker; the svg goes in mxTimelineIcon."
          >
            <ol mxTimeline aria-label="Customer activity">
              <li mxTimelineItem icon variant="success">
                <svg mxTimelineIcon viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.5 8.5l3 3 6-7"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <time mxTimelineTime datetime="2026-10-27">Today</time>
                <p mxTimelineTitle>Payment received</p>
                <p mxTimelineDescription>$250.00 for FT 2026/0201.</p>
              </li>
              <li mxTimelineItem icon variant="accent">
                <svg mxTimelineIcon viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2.5 4.5h11v8h-11zM2.5 4.5l5.5 4 5.5-4"
                    stroke="currentColor"
                    stroke-width="1.3"
                    stroke-linejoin="round"
                  />
                </svg>
                <time mxTimelineTime datetime="2026-10-26">Yesterday</time>
                <p mxTimelineTitle>Email opened</p>
              </li>
              <li mxTimelineItem icon variant="warning">
                <svg mxTimelineIcon viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2.5l6 11H2z M8 7v3 M8 11.8h.01"
                    stroke="currentColor"
                    stroke-width="1.3"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  />
                </svg>
                <time mxTimelineTime datetime="2026-10-24">Oct 24</time>
                <p mxTimelineTitle>Credit limit nearly reached</p>
              </li>
            </ol>
          </doc-example>
          <doc-example
            title="Horizontal"
            note='orientation="horizontal"; scrolls sideways on narrow screens.'
          >
            <ol mxTimeline orientation="horizontal" aria-label="Project phases" class="w-full">
              <li mxTimelineItem variant="success">
                <time mxTimelineTime>Jan</time>
                <p mxTimelineTitle>Discovery</p>
              </li>
              <li mxTimelineItem variant="success">
                <time mxTimelineTime>Mar</time>
                <p mxTimelineTitle>Design</p>
              </li>
              <li mxTimelineItem variant="accent">
                <time mxTimelineTime>Jun</time>
                <p mxTimelineTitle>Development</p>
              </li>
              <li mxTimelineItem pending>
                <time mxTimelineTime>Sep</time>
                <p mxTimelineTitle>Launch</p>
              </li>
            </ol>
          </doc-example>
          <doc-example
            title="Activity log with content"
            note="Each item accepts any content: badges, buttons, quotes."
          >
            <ol mxTimeline size="sm" aria-label="Invoice log">
              <li mxTimelineItem variant="danger">
                <time mxTimelineTime datetime="2026-10-26T23:00">Oct 26, 23:00</time>
                <p mxTimelineTitle>
                  Became <span mxBadge variant="danger" size="sm">Overdue</span>
                </p>
                <div>
                  <button mxButton size="sm" variant="outline" type="button">
                    Send reminder
                  </button>
                </div>
              </li>
              <li mxTimelineItem>
                <time mxTimelineTime datetime="2026-10-20T14:10">Oct 20, 14:10</time>
                <p mxTimelineTitle>Comment from Pedro Neto</p>
                <blockquote class="timeline-quote">
                  The customer asked for 10 more days to pay.
                </blockquote>
              </li>
              <li mxTimelineItem>
                <time mxTimelineTime datetime="2026-09-26T09:00">Sep 26, 09:00</time>
                <p mxTimelineTitle>Issued</p>
              </li>
            </ol>
          </doc-example>
          <doc-example
            title="Alternating"
            note='align="alternate" on wide screens; on phones it goes back to one column.'
          >
            <ol mxTimeline align="alternate" aria-label="Company history" class="w-full">
              @for (m of history; track m.year) {
                <li mxTimelineItem variant="accent">
                  <time mxTimelineTime>{{ m.year }}</time>
                  <p mxTimelineTitle>{{ m.title }}</p>
                  <p mxTimelineDescription>{{ m.text }}</p>
                </li>
              }
            </ol>
          </doc-example>
          <doc-example
            title="Grouped by day"
            note="A heading per day and a list under each one."
          >
            <div class="stack w-full">
              @for (d of days; track d.day) {
                <section class="timeline-day" [attr.aria-labelledby]="'dia-' + $index">
                  <h3 class="timeline-day-title" [id]="'dia-' + $index">{{ d.day }}</h3>
                  <ul mxTimeline size="sm" [attr.aria-labelledby]="'dia-' + $index">
                    @for (e of d.events; track e.time) {
                      <li mxTimelineItem [variant]="e.type">
                        <time mxTimelineTime>{{ e.time }}</time>
                        <p mxTimelineTitle>{{ e.text }}</p>
                      </li>
                    }
                  </ul>
                </section>
              }
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Only enters whatever is interactive in the item (buttons, links).' },
          ]"
          [aria]="[
            'native ol: screen readers announce list, 3 items and the position of each one.',
            'Name the list with aria-label or aria-labelledby.',
            'The date goes in a time with datetime; it appears above, but is read in HTML order.',
            'The marker color is not enough: give the status in the text (Paid, Overdue, upcoming).',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related
          [items]="[{ name: 'Stepper' }, { name: 'Notification center' }, { name: 'Badge' }]"
        />
      </section>
    </article>
  `,
})
export class TimelinePage {
  protected readonly order = [
    { title: 'Order received', when: 'Oct 24, 10:15', iso: '2026-10-24T10:15', done: true },
    { title: 'Being prepared', when: 'Oct 25, 09:00', iso: '2026-10-25T09:00', done: true },
    {
      title: 'On the way to Benguela',
      when: 'Oct 27, 07:40',
      iso: '2026-10-27T07:40',
      done: true,
    },
    { title: 'Delivered', when: 'Expected Oct 29', iso: '2026-10-29', done: false },
  ];
  protected readonly history = [
    { year: '2019', title: 'Founded', text: 'First office in Luanda.' },
    { year: '2021', title: 'Benguela', text: 'Second store opens.' },
    { year: '2024', title: '100 customers', text: 'Companies in 6 provinces.' },
    { year: '2026', title: 'Online platform', text: 'E-invoicing for everyone.' },
  ];
  protected readonly days = [
    {
      day: 'Today',
      events: [
        { time: '09:40', text: 'Ana Kiala issued FT 2026/0200', type: 'accent' as const },
        { time: '08:12', text: 'Huíla Agro paid FT 2026/0196', type: 'success' as const },
      ],
    },
    {
      day: 'Yesterday',
      events: [
        { time: '23:00', text: '3 invoices became overdue', type: 'danger' as const },
        {
          time: '16:25',
          text: 'Pedro Neto added the customer Uíge Café',
          type: 'default' as const,
        },
      ],
    },
  ];

  protected readonly previewCode = `<ol mxTimeline aria-label="Invoice history">
  <li mxTimelineItem variant="success">
    <time mxTimelineTime datetime="2026-10-27T08:12">Oct 27, 08:12</time>
    <p mxTimelineTitle>Paid</p>
    <p mxTimelineDescription>Huíla Agro paid by transfer.</p>
  </li>
  <li mxTimelineItem>
    <time mxTimelineTime datetime="2026-10-15T09:30">Oct 15, 09:30</time>
    <p mxTimelineTitle>Issued</p>
  </li>
</ol>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Directiva',
      name: 'ol[mxTimeline], ul[mxTimeline]',
      type: 'orientation, size, align',
      description: 'The list.',
    },
    { kind: 'Input', name: 'orientation', type: "'vertical' | 'horizontal'", default: 'vertical' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md'", default: 'md' },
    {
      kind: 'Input',
      name: 'align',
      type: "'start' | 'alternate'",
      default: 'start',
      description: 'Alternating only on screens 720 px and wider.',
    },
    {
      kind: 'Directiva',
      name: 'li[mxTimelineItem]',
      type: 'variant, pending, icon',
      description: 'An event.',
    },
    {
      kind: 'Input',
      name: 'variant',
      type: "'default' | 'accent' | 'success' | 'warning' | 'danger'",
      default: 'default',
    },
    {
      kind: 'Input',
      name: 'pending',
      type: 'boolean',
      default: 'false',
      description: 'Dashed marker and dimmed title.',
    },
    {
      kind: 'Input',
      name: 'icon',
      type: 'boolean',
      default: 'false',
      description: '28 px marker for an mxTimelineIcon.',
    },
    {
      kind: 'Directiva',
      name: 'mxTimelineTime, mxTimelineTitle, mxTimelineDescription, mxTimelineIcon',
      type: 'style',
      description: 'Parts of the item.',
    },
  ];
}
