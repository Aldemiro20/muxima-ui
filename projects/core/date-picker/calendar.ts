import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  Injector,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { mxUniqueId } from '@muxima-ui/core/form-field';

/** Data sem horas, para comparar dias. */
export function mxStartOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
export function mxSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
/** Intervalo de datas. Enquanto se escolhe, `end` fica null. */
export interface MxDateRange {
  start: Date | null;
  end: Date | null;
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}
function addMonths(d: Date, n: number): Date {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last));
}

/**
 * Calendário mensal acessível (grelha WAI-ARIA). Pode ser usado sozinho ou dentro do MxDatePicker.
 *
 * ```html
 * <mx-calendar [(value)]="data" [min]="hoje" />
 * <mx-calendar mode="range" [(range)]="periodo" />
 * ```
 *
 * Em `mode="range"` o primeiro clique marca o início e o segundo o fim (se for anterior,
 * os dois trocam). Entre os dois cliques o intervalo é pré-visualizado com o rato ou o teclado.
 *
 * Teclas: setas (dia e semana), Home/End (início e fim da semana), Page Up/Down (mês),
 * Shift + Page Up/Down (ano), Enter ou Espaço para escolher.
 */
@Component({
  selector: 'mx-calendar',
  exportAs: 'mxCalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-calendar' },
  template: `
    <div class="mx-calendar-header">
      <button type="button" class="mx-calendar-nav" (click)="moveMonth(-1)" [attr.aria-label]="'Mês anterior, ' + monthLabel(-1)">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 4L6 8l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
      <p class="mx-calendar-title" [id]="titleId" aria-live="polite">{{ monthLabel(0) }}</p>
      <button type="button" class="mx-calendar-nav" (click)="moveMonth(1)" [attr.aria-label]="'Mês seguinte, ' + monthLabel(1)">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
    </div>
    <table class="mx-calendar-grid" role="grid" [attr.aria-labelledby]="titleId" (keydown)="onKeydown($event)">
      <thead>
        <tr>
          @for (d of weekdays(); track d.long) {
            <th scope="col" [attr.abbr]="d.long"><span aria-hidden="true">{{ d.short }}</span><span class="mx-visually-hidden">{{ d.long }}</span></th>
          }
        </tr>
      </thead>
      <tbody>
        @for (week of weeks(); track $index) {
          <tr>
            @for (day of week; track day.date.getTime()) {
              <td
                role="gridcell"
                [attr.aria-selected]="day.selected"
                [attr.data-range-start]="day.rangeStart ? '' : null"
                [attr.data-range-end]="day.rangeEnd ? '' : null"
                [attr.data-in-range]="day.inRange ? '' : null"
              >
                <button
                  type="button"
                  class="mx-calendar-day"
                  [attr.data-outside]="day.outside ? '' : null"
                  [attr.data-today]="day.today ? '' : null"
                  [attr.aria-current]="day.today ? 'date' : null"
                  [attr.aria-label]="day.label"
                  [attr.data-date]="day.key"
                  [tabIndex]="day.focus ? 0 : -1"
                  [attr.aria-disabled]="day.disabled ? 'true' : null"
                  (click)="select(day.date)"
                  (mouseenter)="hover(day.date)"
                >
                  {{ day.date.getDate() }}
                </button>
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
    @if (mode() === 'range') {
      <p class="mx-visually-hidden" aria-live="polite">{{ rangeHint() }}</p>
    }
  `,
})
export class MxCalendar {
  readonly value = model<Date | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  /** Dias que não se podem escolher (ex.: fins-de-semana). */
  readonly dateDisabled = input<(d: Date) => boolean>(() => false);
  readonly locale = input('pt-AO');
  /** Primeiro dia da semana: 1 = segunda-feira. */
  readonly firstDayOfWeek = input(1);
  readonly selected = output<Date>();
  /** `single` escolhe um dia; `range` escolhe um intervalo em [(range)]. */
  readonly mode = input<'single' | 'range'>('single');
  readonly range = model<MxDateRange | null>(null);
  /** Emite quando o intervalo fica completo (início e fim). */
  readonly rangeSelected = output<{ start: Date; end: Date }>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);
  protected readonly titleId = mxUniqueId('mx-calendar-title');
  /** Dia com foco na grelha. */
  readonly focusDate = signal(mxStartOfDay(new Date()));
  private initialised = false;
  /** Dia sob o rato ou o foco enquanto falta o fim do intervalo. */
  private readonly preview = signal<Date | null>(null);
  private readonly awaitingEnd = computed(() => this.mode() === 'range' && !!this.range()?.start && !this.range()?.end);

  protected readonly rangeHint = computed(() => {
    const r = this.range();
    if (!r?.start) return '';
    const f = new Intl.DateTimeFormat(this.locale(), { day: 'numeric', month: 'long', year: 'numeric' });
    return r.end ? `Intervalo de ${f.format(r.start)} a ${f.format(r.end)}.` : `Início ${f.format(r.start)}. Escolhe a data de fim.`;
  });

  /** Início e fim efectivos (com pré-visualização), ordenados. */
  private readonly bounds = computed<[Date, Date] | null>(() => {
    if (this.mode() !== 'range') return null;
    const r = this.range();
    if (!r?.start) return null;
    const end = r.end ?? (this.awaitingEnd() ? this.preview() : null) ?? r.start;
    return r.start <= end ? [r.start, end] : [end, r.start];
  });

  protected readonly weekdays = computed(() => {
    const short = new Intl.DateTimeFormat(this.locale(), { weekday: 'narrow' });
    const long = new Intl.DateTimeFormat(this.locale(), { weekday: 'long' });
    // 2024-01-01 foi segunda-feira
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(2024, 0, 1 + ((this.firstDayOfWeek() - 1 + i + 7) % 7));
      return { short: short.format(d).toUpperCase(), long: long.format(d) };
    });
  });

  protected readonly weeks = computed(() => {
    const focus = this.focusDate();
    const first = new Date(focus.getFullYear(), focus.getMonth(), 1);
    const offset = (first.getDay() - this.firstDayOfWeek() + 7) % 7;
    const start = addDays(first, -offset);
    const today = mxStartOfDay(new Date());
    const fmt = new Intl.DateTimeFormat(this.locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const bounds = this.bounds();
    const isRange = this.mode() === 'range';
    const weeks = [];
    for (let w = 0; w < 6; w++) {
      const row = [];
      for (let i = 0; i < 7; i++) {
        const date = addDays(start, w * 7 + i);
        const rangeStart = !!bounds && mxSameDay(date, bounds[0]);
        const rangeEnd = !!bounds && mxSameDay(date, bounds[1]);
        const inRange = !!bounds && date > bounds[0] && date < bounds[1];
        const isStart = isRange && mxSameDay(date, this.range()?.start);
        const isEnd = isRange && mxSameDay(date, this.range()?.end);
        const label = fmt.format(date) + (isStart && isEnd ? ', início e fim do intervalo' : isStart ? ', início do intervalo' : isEnd ? ', fim do intervalo' : '');
        row.push({
          date,
          key: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          label,
          outside: date.getMonth() !== focus.getMonth(),
          today: mxSameDay(date, today),
          rangeStart,
          rangeEnd,
          inRange,
          selected: isRange ? rangeStart || rangeEnd || inRange : mxSameDay(date, this.value()),
          focus: mxSameDay(date, focus),
          disabled: this.isDisabled(date),
        });
      }
      weeks.push(row);
    }
    return weeks;
  });

  constructor() {
    afterNextRender(() => {
      if (!this.initialised) {
        const v = this.mode() === 'range' ? this.range()?.start : this.value();
        if (v) this.focusDate.set(mxStartOfDay(v));
        this.initialised = true;
      }
    });
  }

  /** Põe o foco no dia activo (seleccionado ou hoje). */
  focus(): void {
    const v = this.mode() === 'range' ? this.range()?.start : this.value();
    if (v) this.focusDate.set(mxStartOfDay(v));
    this.focusActiveDay();
  }

  protected monthLabel(delta: number): string {
    const d = addMonths(this.focusDate(), delta);
    const s = new Intl.DateTimeFormat(this.locale(), { month: 'long', year: 'numeric' }).format(d);
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  protected moveMonth(delta: number): void {
    this.focusDate.set(addMonths(this.focusDate(), delta));
  }

  protected hover(date: Date): void {
    if (this.awaitingEnd()) this.preview.set(date);
  }

  protected select(date: Date): void {
    if (this.isDisabled(date)) return;
    if (this.mode() === 'range') {
      const r = this.range();
      if (r?.start && !r.end) {
        const [start, end] = date < r.start ? [date, r.start] : [r.start, date];
        this.range.set({ start, end });
        this.rangeSelected.emit({ start, end });
      } else {
        this.range.set({ start: date, end: null });
      }
      this.preview.set(null);
      this.focusDate.set(date);
      return;
    }
    this.value.set(date);
    this.focusDate.set(date);
    this.selected.emit(date);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const f = this.focusDate();
    const dow = (f.getDay() - this.firstDayOfWeek() + 7) % 7;
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(f, -1),
      ArrowRight: () => addDays(f, 1),
      ArrowUp: () => addDays(f, -7),
      ArrowDown: () => addDays(f, 7),
      Home: () => addDays(f, -dow),
      End: () => addDays(f, 6 - dow),
      PageUp: () => addMonths(f, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(f, event.shiftKey ? 12 : 1),
    };
    if (event.key === 'Enter' || event.key === ' ') {
      // escolhe o dia activo, mesmo que o foco ainda não tenha chegado ao botão
      event.preventDefault();
      this.select(this.focusDate());
      return;
    }
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      this.focusDate.set(this.clamp(move()));
      this.hover(this.focusDate());
      this.focusActiveDay();
    }
  }

  private clamp(d: Date): Date {
    const min = this.min();
    const max = this.max();
    if (min && d < mxStartOfDay(min)) return mxStartOfDay(min);
    if (max && d > mxStartOfDay(max)) return mxStartOfDay(max);
    return d;
  }

  private isDisabled(d: Date): boolean {
    const min = this.min();
    const max = this.max();
    return (!!min && d < mxStartOfDay(min)) || (!!max && d > mxStartOfDay(max)) || this.dateDisabled()(d);
  }

  private focusActiveDay(): void {
    afterNextRender(
      () => {
        const f = this.focusDate();
        const key = `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`;
        this.host.querySelector<HTMLButtonElement>(`[data-date="${key}"]`)?.focus();
      },
      { injector: this.injector },
    );
  }
}
