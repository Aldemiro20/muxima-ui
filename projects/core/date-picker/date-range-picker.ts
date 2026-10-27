import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MX_FORM_FIELD_CONTROL, MxFormField, MxFormFieldControl, mxUniqueId } from '@muxima-ui/core/form-field';
import { MxCalendar, MxDateRange, mxStartOfDay } from './calendar';
import { mxFormatDate, mxParseDate } from './date-picker';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

/** Atalho de intervalo mostrado ao lado do calendário. */
export interface MxDateRangePreset {
  label: string;
  /** Função, para que "hoje" seja calculado no momento do clique. */
  range: () => { start: Date; end: Date };
}

/** Atalhos comuns: últimos 7 e 30 dias, este mês e o mês passado. */
export function mxDefaultRangePresets(): MxDateRangePreset[] {
  const today = () => mxStartOfDay(new Date());
  const shift = (d: Date, days: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
  return [
    { label: 'Últimos 7 dias', range: () => ({ start: shift(today(), -6), end: today() }) },
    { label: 'Últimos 30 dias', range: () => ({ start: shift(today(), -29), end: today() }) },
    {
      label: 'Este mês',
      range: () => {
        const t = today();
        return { start: new Date(t.getFullYear(), t.getMonth(), 1), end: new Date(t.getFullYear(), t.getMonth() + 1, 0) };
      },
    },
    {
      label: 'Mês passado',
      range: () => {
        const t = today();
        return { start: new Date(t.getFullYear(), t.getMonth() - 1, 1), end: new Date(t.getFullYear(), t.getMonth(), 0) };
      },
    },
  ];
}

/**
 * Campo de intervalo de datas: dois campos (início e fim) que se escrevem em "dd/mm/aaaa"
 * ou se escolhem num calendário, com atalhos opcionais.
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Período</label>
 *   <mx-date-range-picker formControlName="periodo" [presets]="atalhos" />
 * </mx-form-field>
 * ```
 *
 * O valor é `{ start, end }` (datas sem horas) ou null. Cada campo é anunciado com o rótulo
 * do campo e "início" ou "fim". Fim anterior ao início deixa o campo com erro.
 */
@Component({
  selector: 'mx-date-range-picker',
  exportAs: 'mxDateRangePicker',
  imports: [CdkOverlayOrigin, CdkConnectedOverlay, MxCalendar],
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxDateRangePicker }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-date-range-picker', '[attr.aria-label]': 'null' },
  template: `
    <div
      class="mx-date-range-field"
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [attr.data-size]="size() === 'md' ? null : size()"
      [attr.data-invalid]="errorState() ? '' : null"
      [attr.data-disabled]="isDisabled() ? '' : null"
    >
      <input
        class="mx-date-range-input"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        [id]="controlId()"
        [placeholder]="placeholder()"
        [value]="startText()"
        [disabled]="isDisabled()"
        [attr.aria-labelledby]="labelledBy(startLabelId)"
        [attr.aria-invalid]="errorState() ? 'true' : null"
        [attr.aria-required]="isRequired() ? 'true' : null"
        [attr.aria-describedby]="field?.describedBy() ?? null"
        (input)="onInput('start', $event)"
        (blur)="onTouched()"
        (keydown.alt.arrowdown)="$event.preventDefault(); open()"
      />
      <span class="mx-date-range-sep" aria-hidden="true">–</span>
      <input
        class="mx-date-range-input"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        [placeholder]="placeholder()"
        [value]="endText()"
        [disabled]="isDisabled()"
        [attr.aria-labelledby]="labelledBy(endLabelId)"
        [attr.aria-invalid]="errorState() ? 'true' : null"
        [attr.aria-required]="isRequired() ? 'true' : null"
        [attr.aria-describedby]="field?.describedBy() ?? null"
        (input)="onInput('end', $event)"
        (blur)="onTouched()"
        (keydown.alt.arrowdown)="$event.preventDefault(); open()"
      />
      <span class="mx-visually-hidden" [id]="startLabelId">{{ startLabel() }}</span>
      <span class="mx-visually-hidden" [id]="endLabelId">{{ endLabel() }}</span>
      @if (!field?.labelId()) {
        <span class="mx-visually-hidden" [id]="nameId">{{ nameText() }}</span>
      }
      <button
        #toggleButton
        type="button"
        class="mx-date-picker-toggle"
        aria-haspopup="dialog"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-label]="toggleLabel()"
        [disabled]="isDisabled()"
        (click)="toggle()"
      >
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" stroke-width="1.3" />
          <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      (overlayOutsideClick)="onOutside($event)"
      (overlayKeydown)="onOverlayKey($event)"
      (attach)="onAttach()"
      (detach)="close(false)"
    >
      <div class="mx-date-picker-panel mx-date-range-panel" role="dialog" aria-modal="false" aria-label="Escolher intervalo">
        @if (presets().length) {
          <ul class="mx-date-range-presets" aria-label="Atalhos">
            @for (p of presets(); track p.label) {
              <li><button type="button" class="mx-date-range-preset" (click)="applyPreset(p)">{{ p.label }}</button></li>
            }
          </ul>
        }
        <mx-calendar
          #calendar
          mode="range"
          [(range)]="draftRange"
          [min]="min()"
          [max]="max()"
          [dateDisabled]="dateDisabled()"
          [locale]="locale()"
          (rangeSelected)="choose($event)"
        />
      </div>
    </ng-template>
  `,
})
export class MxDateRangePicker implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model<MxDateRange | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  readonly dateDisabled = input<(d: Date) => boolean>(() => false);
  readonly presets = input<MxDateRangePreset[]>([]);
  readonly locale = input('pt-AO');
  readonly placeholder = input('dd/mm/aaaa');
  readonly startLabel = input('início');
  readonly endLabel = input('fim');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly id = input<string | undefined>(undefined);
  /** Nome do campo quando não há mxLabel. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly calendar = viewChild<MxCalendar>('calendar');
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggleButton');

  protected readonly positions = POSITIONS;
  private readonly generatedId = mxUniqueId('mx-date-range');
  readonly controlId = computed(() => this.id() ?? this.generatedId);
  protected readonly startLabelId = mxUniqueId('mx-date-range-start');
  protected readonly endLabelId = mxUniqueId('mx-date-range-end');
  protected readonly nameId = mxUniqueId('mx-date-range-name');
  protected readonly isOpen = signal(false);
  /** Intervalo a ser escolhido no calendário aberto. */
  protected readonly draftRange = signal<MxDateRange | null>(null);
  /** Texto escrito que ainda não é uma data válida, por campo. */
  private readonly draftText = signal<{ start: string | null; end: string | null }>({ start: null, end: null });
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  protected readonly startText = computed(() => this.draftText().start ?? mxFormatDate(this.value()?.start ?? null));
  protected readonly endText = computed(() => this.draftText().end ?? mxFormatDate(this.value()?.end ?? null));

  /** true quando há texto que não é data, ou o fim é anterior ao início. */
  readonly badFormat = computed(() => {
    const d = this.draftText();
    const v = this.value();
    return (!!d.start && !mxParseDate(d.start)) || (!!d.end && !mxParseDate(d.end)) || (!!v?.start && !!v?.end && v.end < v.start);
  });

  protected readonly toggleLabel = computed(() => {
    const v = this.value();
    if (!v?.start || !v?.end) return 'Escolher intervalo';
    const f = new Intl.DateTimeFormat(this.locale(), { day: 'numeric', month: 'long', year: 'numeric' });
    return `Mudar intervalo, ${f.format(v.start)} a ${f.format(v.end)}`;
  });

  private onChange: (value: MxDateRange | null) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  /** aria-labelledby: rótulo do form field (ou aria-label) + "início"/"fim". */
  protected labelledBy(partId: string): string {
    const label = this.field?.labelId();
    return `${label ?? this.nameId} ${partId}`;
  }
  // nome escondido quando se usa aria-label em vez de mxLabel
  protected readonly nameText = computed(() => this.ariaLabel() ?? '');

  open(): void {
    if (this.isDisabled()) return;
    const v = this.value();
    this.draftRange.set(v?.start ? { start: v.start, end: v.end } : null);
    this.isOpen.set(true);
  }
  toggle(): void {
    if (this.isOpen()) this.close();
    else this.open();
  }
  close(restoreFocus = true): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    if (restoreFocus) this.toggleButton().nativeElement.focus();
  }

  protected onAttach(): void {
    queueMicrotask(() => this.calendar()?.focus());
  }
  protected onOverlayKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
  protected onOutside(event: MouseEvent): void {
    if (!this.host.contains(event.target as Node)) this.close(false);
  }

  protected choose(range: { start: Date; end: Date }): void {
    this.draftText.set({ start: null, end: null });
    this.setValue({ start: mxStartOfDay(range.start), end: mxStartOfDay(range.end) });
    this.close();
  }

  protected applyPreset(p: MxDateRangePreset): void {
    this.choose(p.range());
  }

  protected onInput(part: 'start' | 'end', event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    const parsed = mxParseDate(text);
    this.draftText.update((d) => ({ ...d, [part]: parsed || !text ? null : text }));
    const current = this.value() ?? { start: null, end: null };
    const next = { ...current, [part]: parsed };
    this.setValue(next.start || next.end ? next : null);
  }

  private setValue(v: MxDateRange | null): void {
    const prev = this.value();
    const same = (a: Date | null | undefined, b: Date | null | undefined) => (a?.getTime() ?? null) === (b?.getTime() ?? null);
    if (same(prev?.start, v?.start) && same(prev?.end, v?.end)) return;
    this.value.set(v);
    this.onChange(v);
  }

  // ---- MxFormFieldControl ----
  errorState(): boolean {
    if (this.invalid() || this.badFormat()) return true;
    const c = this.ngControl;
    return !!c && !!c.invalid && !!(c.touched || c.dirty);
  }
  isRequired(): boolean {
    return this.required() || !!this.ngControl?.control?.hasValidator?.(Validators.required);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: MxDateRange | null): void {
    this.value.set(
      value ? { start: value.start ? mxStartOfDay(value.start) : null, end: value.end ? mxStartOfDay(value.end) : null } : null,
    );
    this.draftText.set({ start: null, end: null });
  }
  registerOnChange(fn: (value: MxDateRange | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}

/** Validador: exige início e fim. Usa com `Validators.required` não chega, porque {start, end: null} não é vazio. */
export function mxDateRangeComplete(control: { value: MxDateRange | null }): { rangeIncomplete: true } | null {
  const v = control.value;
  return v && (!v.start || !v.end) ? { rangeIncomplete: true } : null;
}
