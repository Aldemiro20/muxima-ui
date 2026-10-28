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
import {
  MX_FORM_FIELD_CONTROL,
  MxFormField,
  MxFormFieldControl,
  mxUniqueId,
} from '@muxima-ui/core/form-field';
import { mxColorName, mxParseColor } from './color';
import { MxColorPanel, MxColorSwatch } from './color-panel';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

/**
 * Campo de cor: escreve-se o hex (ou rgb()) ou escolhe-se no painel que abre no botão
 * da amostra. Funciona com ngModel e Reactive Forms; o valor é um hex ou null.
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Cor da marca</label>
 *   <mx-color-picker formControlName="cor" [swatches]="sugestoes" />
 * </mx-form-field>
 * ```
 */
@Component({
  selector: 'mx-color-picker',
  exportAs: 'mxColorPicker',
  imports: [CdkOverlayOrigin, CdkConnectedOverlay, MxColorPanel],
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxColorPicker }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-color-picker', '[attr.aria-label]': 'null' },
  template: `
    <div class="mx-color-picker-field" cdkOverlayOrigin #origin="cdkOverlayOrigin">
      <button
        #toggleButton
        type="button"
        class="mx-color-picker-toggle"
        aria-haspopup="dialog"
        [style.--mx-swatch]="value() ?? 'transparent'"
        [attr.data-empty]="value() ? null : ''"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-label]="toggleLabel()"
        [disabled]="isDisabled()"
        (click)="toggle()"
      ></button>
      <input
        class="mx-input mx-color-picker-input"
        spellcheck="false"
        autocomplete="off"
        [id]="controlId()"
        [placeholder]="placeholder()"
        [value]="draft() ?? value() ?? ''"
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
      <div
        class="mx-color-picker-panel"
        role="dialog"
        aria-modal="false"
        [attr.aria-label]="(dialogLabel() ?? msg().choose)"
        #panel
      >
        <mx-color-panel
          [value]="value() ?? '#1F6F78'"
          (valueChange)="setValue($event)"
          [alpha]="alpha()"
          [swatches]="swatches()"
          [showInput]="false"
        />
      </div>
    </ng-template>
  `,
})
export class MxColorPicker implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model<string | null>(null);
  readonly alpha = input(false, { transform: booleanAttribute });
  readonly swatches = input<MxColorSwatch[]>([]);
  readonly placeholder = input('#RRGGBB');
  readonly dialogLabel = input<string>();
  private readonly i18n = injectMxMessages();
  protected readonly msg = computed(() => this.i18n().colorPicker);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggleButton');
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  protected readonly positions = POSITIONS;
  private readonly generatedId = mxUniqueId('mx-color');
  readonly controlId = computed(() => this.id() ?? this.generatedId);
  protected readonly isOpen = signal(false);
  protected readonly draft = signal<string | null>(null);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  readonly badFormat = computed(() => !!this.draft() && !mxParseColor(this.draft()!));
  protected readonly toggleLabel = computed(() => {
    const v = this.value();
    const t = this.msg();
    return v ? t.change(mxColorName(v, t.names), v) : t.choose;
  });

  private onChange: (value: string | null) => void = () => {};
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
    queueMicrotask(() =>
      this.panel()?.nativeElement.querySelector<HTMLElement>('.mx-color-area-thumb')?.focus(),
    );
  }
  protected onOverlayKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
  }
  protected onOutside(e: MouseEvent): void {
    if (!this.host.contains(e.target as Node)) this.close(false);
  }

  protected setValue(v: string | null): void {
    this.draft.set(null);
    if (v === this.value()) return;
    this.value.set(v);
    this.onChange(v);
  }

  protected onInput(e: Event): void {
    const text = (e.target as HTMLInputElement).value;
    const v = mxParseColor(text);
    this.draft.set(text && !v ? text : null);
    if (v || !text) this.setValue(v);
    if (v) this.draft.set(text);
  }

  protected onBlur(): void {
    if (!this.badFormat()) this.draft.set(null);
    this.onTouched();
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
  writeValue(value: string | null): void {
    this.value.set(value ? mxParseColor(value) : null);
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
