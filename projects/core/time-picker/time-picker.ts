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
  numberAttribute,
  signal,
} from '@angular/core';
import { injectMxMessages } from '@muxima-ui/core/i18n';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MX_FORM_FIELD_CONTROL, MxFormField, MxFormFieldControl, mxUniqueId } from '@muxima-ui/core/form-field';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
];

/**
 * Converte o que se escreve numa hora "HH:mm". Aceita "9", "930", "9:30", "9h30", "9.30" e "21h".
 * Devolve null se não for uma hora válida.
 */
export function mxParseTime(text: string): string | null {
  const t = text.trim().toLowerCase().replace(/\s+/g, '');
  if (!t) return null;
  let h: number;
  let m = 0;
  const sep = t.match(/^(\d{1,2})[:h.](\d{0,2})$/);
  if (sep) {
    h = Number(sep[1]);
    m = sep[2] ? Number(sep[2].padEnd(2, '0')) : 0;
  } else if (/^\d{1,4}$/.test(t)) {
    if (t.length <= 2) h = Number(t);
    else {
      h = Number(t.slice(0, t.length - 2));
      m = Number(t.slice(-2));
    }
  } else return null;
  if (h > 23 || m > 59) return null;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Minutos desde a meia-noite de uma hora "HH:mm". */
export function mxTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(min: number): string {
  return `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
}

/**
 * Campo de hora: escreve-se (9, 930, 9h30, 09:30) ou escolhe-se numa lista com o intervalo
 * definido em `step`. Padrão WAI-ARIA "combobox com lista".
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Hora da reunião</label>
 *   <mx-time-picker formControlName="hora" [step]="15" min="08:00" max="18:00" />
 * </mx-form-field>
 * ```
 *
 * O valor é uma string "HH:mm" (24 horas) ou null. Uma hora fora de min/max deixa o campo com erro.
 * Para uma hora isolada sem lista, o input type=time nativo com mxInput também serve.
 */
@Component({
  selector: 'mx-time-picker',
  exportAs: 'mxTimePicker',
  imports: [CdkOverlayOrigin, CdkConnectedOverlay],
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxTimePicker }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-time-picker', '[attr.aria-label]': 'null' },
  template: `
    <div class="mx-time-picker-field" cdkOverlayOrigin #origin="cdkOverlayOrigin">
      <input
        class="mx-input mx-time-picker-input"
        type="text"
        role="combobox"
        inputmode="numeric"
        autocomplete="off"
        aria-autocomplete="none"
        [id]="controlId()"
        [placeholder]="placeholder() ?? i18n().timePicker.placeholder"
        [value]="text()"
        [disabled]="isDisabled()"
        [attr.data-size]="size() === 'md' ? null : size()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="isOpen() ? listId : null"
        [attr.aria-activedescendant]="isOpen() && active() >= 0 ? optionId(active()) : null"
        [attr.aria-invalid]="errorState() ? 'true' : null"
        [attr.aria-required]="isRequired() ? 'true' : null"
        [attr.aria-describedby]="field?.describedBy() ?? null"
        [attr.aria-label]="ariaLabel() ?? null"
        (input)="onInput($event)"
        (keydown)="onKeydown($event)"
        (click)="open()"
        (blur)="onBlur()"
      />
      <svg class="mx-time-picker-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="5.75" stroke="currentColor" stroke-width="1.3" />
        <path d="M8 5v3.2l2 1.3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayWidth]="panelWidth()"
      (overlayOutsideClick)="onOutside($event)"
      (attach)="scrollToActive()"
      (detach)="close()"
    >
      <ul class="mx-select-panel mx-time-picker-panel" role="listbox" [id]="listId" [attr.aria-labelledby]="field?.labelId() ?? null" [attr.aria-label]="field?.labelId() ? null : (ariaLabel() ?? i18n().timePicker.label)">
        @for (s of slots(); track s; let i = $index) {
          <li
            class="mx-option"
            role="option"
            [id]="optionId(i)"
            [attr.aria-selected]="s === value()"
            [attr.data-active]="i === active() ? '' : null"
            (mousedown)="$event.preventDefault()"
            (mousemove)="active.set(i)"
            (click)="choose(s)"
          >
            {{ s }}
          </li>
        }
      </ul>
    </ng-template>
  `,
})
export class MxTimePicker implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model<string | null>(null);
  /** Minutos entre as horas da lista. */
  readonly step = input(30, { transform: numberAttribute });
  /** Primeira e última hora permitidas, "HH:mm". */
  readonly min = input<string | null>(null);
  readonly max = input<string | null>(null);
  readonly placeholder = input<string>();
  protected readonly i18n = injectMxMessages();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly positions = POSITIONS;
  protected readonly listId = mxUniqueId('mx-time-list');
  private readonly generatedId = mxUniqueId('mx-time');
  readonly controlId = computed(() => this.id() ?? this.generatedId);
  protected readonly isOpen = signal(false);
  protected readonly panelWidth = signal(0);
  protected readonly active = signal(-1);
  private readonly draft = signal<string | null>(null);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly text = computed(() => this.draft() ?? this.value() ?? '');

  protected readonly slots = computed(() => {
    const step = Math.max(1, this.step());
    const from = this.min() ? mxTimeToMinutes(this.min()!) : 0;
    const to = this.max() ? mxTimeToMinutes(this.max()!) : 24 * 60 - 1;
    const out: string[] = [];
    for (let m = from; m <= to; m += step) out.push(minutesToTime(m));
    return out;
  });

  /** Texto que não é hora, ou hora fora de min/max. */
  readonly badValue = computed(() => {
    const d = this.draft();
    if (d && !mxParseTime(d)) return true;
    const v = this.value();
    if (!v) return false;
    const m = mxTimeToMinutes(v);
    return (!!this.min() && m < mxTimeToMinutes(this.min()!)) || (!!this.max() && m > mxTimeToMinutes(this.max()!));
  });

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  protected optionId(i: number): string {
    return `${this.listId}-${i}`;
  }

  /** Índice da hora da lista mais próxima de um valor (ou da hora actual). */
  private nearest(time: string | null): number {
    const slots = this.slots();
    if (!slots.length) return -1;
    const now = new Date();
    const target = time ? mxTimeToMinutes(time) : now.getHours() * 60 + now.getMinutes();
    let best = 0;
    slots.forEach((s, i) => {
      if (Math.abs(mxTimeToMinutes(s) - target) < Math.abs(mxTimeToMinutes(slots[best]) - target)) best = i;
    });
    return best;
  }

  open(): void {
    if (this.isDisabled() || this.isOpen()) return;
    this.panelWidth.set(this.host.getBoundingClientRect().width);
    this.active.set(this.nearest(this.value()));
    this.isOpen.set(true);
  }
  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.active.set(-1);
  }

  protected scrollToActive(): void {
    queueMicrotask(() => document.getElementById(this.optionId(this.active()))?.scrollIntoView?.({ block: 'nearest' }));
  }

  protected choose(time: string): void {
    this.draft.set(null);
    this.setValue(time);
    this.close();
  }

  protected onInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    const parsed = mxParseTime(text);
    this.draft.set(text || null);
    this.setValue(parsed);
    if (this.isOpen() && parsed) {
      this.active.set(this.nearest(parsed));
      this.scrollToActive();
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const n = this.slots().length;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen() || event.altKey) {
          this.open();
          break;
        }
        this.active.set(Math.min(this.active() + 1, n - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (event.altKey) this.close();
        else if (this.isOpen()) this.active.set(Math.max(this.active() - 1, 0));
        break;
      case 'PageDown':
      case 'PageUp':
        if (!this.isOpen()) return;
        event.preventDefault();
        this.active.set(Math.min(Math.max(this.active() + (event.key === 'PageDown' ? 8 : -8), 0), n - 1));
        break;
      case 'Enter':
        if (this.isOpen() && this.active() >= 0) {
          event.preventDefault();
          this.choose(this.slots()[this.active()]);
        }
        return;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        return;
      case 'Tab':
        this.close();
        return;
      default:
        return;
    }
    this.scrollToActive();
  }

  protected onOutside(event: MouseEvent): void {
    if (!this.host.contains(event.target as Node)) this.close();
  }

  protected onBlur(): void {
    // "930" passa a "09:30" quando é válido
    if (!this.isOpen() && this.draft() && mxParseTime(this.draft()!)) this.draft.set(null);
    this.onTouched();
  }

  private setValue(v: string | null): void {
    if (v === this.value()) return;
    this.value.set(v);
    this.onChange(v);
  }

  // ---- MxFormFieldControl ----
  errorState(): boolean {
    if (this.invalid() || this.badValue()) return true;
    const c = this.ngControl;
    return !!c && !!c.invalid && !!(c.touched || c.dirty);
  }
  isRequired(): boolean {
    return this.required() || !!this.ngControl?.control?.hasValidator?.(Validators.required);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: string | null): void {
    this.value.set(value ? mxParseTime(value) : null);
    this.draft.set(null);
  }
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
