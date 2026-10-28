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
import { injectMxMessages } from '@muxima-ui/core/i18n';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MX_FORM_FIELD_CONTROL, MxFormField, MxFormFieldControl, mxUniqueId } from '@muxima-ui/core/form-field';
import { MxCalendar, mxStartOfDay } from './calendar';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

/** Converte "dd/mm/aaaa" numa data. Aceita também "-" e "." como separadores. */
/** Ordem do dia (d), mês (m) e ano (y) numa data escrita. */
export type MxDateOrder = 'dmy' | 'mdy' | 'ymd';

export function mxParseDate(text: string, order: MxDateOrder = 'dmy'): Date | null {
  const t = text.trim();
  const m =
    order === 'ymd'
      ? t.match(/^(\d{4})[/.-](\d{1,2})[/.-](\d{1,2})$/)
      : t.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (!m) return null;
  const n = [Number(m[1]), Number(m[2]), Number(m[3])];
  const [d, mo, y] =
    order === 'ymd' ? [n[2], n[1] - 1, n[0]] : order === 'mdy' ? [n[1], n[0] - 1, n[2]] : [n[0], n[1] - 1, n[2]];
  const date = new Date(y, mo, d);
  return date.getFullYear() === y && date.getMonth() === mo && date.getDate() === d ? date : null;
}

export function mxFormatDate(d: Date | null, order: MxDateOrder = 'dmy'): string {
  if (!d) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  const [day, month, year] = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()];
  if (order === 'ymd') return `${year}-${month}-${day}`;
  return order === 'mdy' ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
}

/**
 * Campo de data: escreve-se "dd/mm/aaaa" ou escolhe-se no calendário.
 * O calendário abre num diálogo não modal com foco no dia; Escape fecha.
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Data de vencimento</label>
 *   <mx-date-picker formControlName="vencimento" [min]="hoje" />
 *   <mx-hint>dd/mm/aaaa</mx-hint>
 * </mx-form-field>
 * ```
 *
 * O valor é um `Date` (sem horas) ou null. Texto inválido deixa o campo com erro de formato.
 */
@Component({
  selector: 'mx-date-picker',
  exportAs: 'mxDatePicker',
  imports: [CdkOverlayOrigin, CdkConnectedOverlay, MxCalendar],
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxDatePicker }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-date-picker', '[attr.aria-label]': 'null' },
  template: `
    <div class="mx-date-picker-field" cdkOverlayOrigin #origin="cdkOverlayOrigin">
      <input
        class="mx-input mx-date-picker-input"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        [id]="controlId()"
        [placeholder]="placeholder() ?? msg().placeholder"
        [value]="text()"
        [disabled]="isDisabled()"
        [attr.data-size]="size() === 'md' ? null : size()"
        [attr.aria-invalid]="errorState() ? 'true' : null"
        [attr.aria-required]="isRequired() ? 'true' : null"
        [attr.aria-describedby]="field?.describedBy() ?? null"
        [attr.aria-label]="ariaLabel() ?? null"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (keydown.alt.arrowdown)="$event.preventDefault(); open()"
      />
      <button
        #toggleButton
        type="button"
        class="mx-date-picker-toggle"
        aria-haspopup="dialog"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-label]="value() ? msg().change(longLabel()) : msg().choose"
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
      <div class="mx-date-picker-panel" role="dialog" aria-modal="false" [attr.aria-label]="msg().choose">
        <mx-calendar
          #calendar
          [value]="value()"
          [min]="min()"
          [max]="max()"
          [dateDisabled]="dateDisabled()"
          [locale]="loc()"
          (selected)="choose($event)"
        />
      </div>
    </ng-template>
  `,
})
export class MxDatePicker implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model<Date | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  readonly dateDisabled = input<(d: Date) => boolean>(() => false);
  /** Locale dos nomes dos meses e dos dias; por omissão o do idioma activo. */
  readonly locale = input<string>();
  /** Por omissão "dd/mm/aaaa" em português e "mm/dd/yyyy" em inglês. */
  readonly placeholder = input<string>();
  private readonly i18n = injectMxMessages();
  protected readonly msg = computed(() => this.i18n().datePicker);
  protected readonly loc = computed(() => this.locale() ?? this.i18n().intlLocale);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly calendar = viewChild<MxCalendar>('calendar');
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggleButton');

  protected readonly positions = POSITIONS;
  private readonly generatedId = mxUniqueId('mx-date');
  readonly controlId = computed(() => this.id() ?? this.generatedId);
  protected readonly isOpen = signal(false);
  /** Texto escrito que ainda não é uma data válida. */
  private readonly draft = signal<string | null>(null);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly text = computed(() => this.draft() ?? mxFormatDate(this.value(), this.i18n().dateOrder));
  protected readonly longLabel = computed(() =>
    this.value() ? new Intl.DateTimeFormat(this.loc(), { dateStyle: 'full' }).format(this.value()!) : '',
  );
  /** true quando há texto que não é uma data válida. */
  readonly badFormat = computed(() => !!this.draft() && !mxParseDate(this.draft()!, this.i18n().dateOrder));

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  open(): void {
    if (!this.isDisabled()) this.isOpen.set(true);
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

  protected choose(date: Date): void {
    this.setValue(mxStartOfDay(date));
    this.draft.set(null);
    this.close();
  }

  protected onInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    const parsed = mxParseDate(text, this.i18n().dateOrder);
    if (parsed) {
      this.draft.set(null);
      this.setValue(parsed);
    } else {
      this.draft.set(text || null);
      this.setValue(null);
    }
  }

  protected onBlur(): void {
    this.onTouched();
  }

  private setValue(v: Date | null): void {
    const prev = this.value();
    if ((prev?.getTime() ?? null) === (v?.getTime() ?? null)) return;
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
  writeValue(value: Date | null): void {
    this.value.set(value ? mxStartOfDay(value) : null);
    this.draft.set(null);
  }
  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
