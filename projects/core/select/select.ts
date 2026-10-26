import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  QueryList,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import {
  MX_FORM_FIELD_CONTROL,
  MxFormField,
  MxFormFieldControl,
  mxUniqueId,
} from '@muxima-ui/core/form-field';

/** Opção de um `<mx-select>`. */
@Component({
  selector: 'mx-option',
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mx-option',
    role: 'option',
    '[id]': 'id',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'disabled ? "true" : null',
    '[attr.data-active]': 'active() ? "" : null',
    '(click)': 'select()',
    '(mousedown)': '$event.preventDefault()',
  },
})
export class MxOption<T = unknown> implements Highlightable {
  readonly value = input.required<T>();
  readonly optionDisabled = input(false, { alias: 'disabled', transform: booleanAttribute });

  /** Lido pelo gestor de teclado do CDK. */
  get disabled(): boolean {
    return this.optionDisabled();
  }

  readonly id = mxUniqueId('mx-option');
  readonly active = signal(false);

  private readonly parent = inject<MxSelect<T>>(MxSelect);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly selected = computed(() => this.parent.isSelected(this.value()));

  /** Texto usado no gatilho e na pesquisa por letra. */
  getLabel(): string {
    return (this.element.textContent ?? '').trim();
  }

  setActiveStyles(): void {
    this.active.set(true);
    this.element.scrollIntoView?.({ block: 'nearest' });
  }

  setInactiveStyles(): void {
    this.active.set(false);
  }

  protected select(): void {
    if (!this.disabled) this.parent.choose(this);
  }
}

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
];

/**
 * Lista de escolha única, acessível e controlável por teclado
 * (padrão WAI-ARIA "select-only combobox").
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Província</label>
 *   <mx-select placeholder="Escolhe uma" [formControl]="provincia">
 *     <mx-option value="luanda">Luanda</mx-option>
 *     <mx-option value="benguela">Benguela</mx-option>
 *   </mx-select>
 * </mx-form-field>
 * ```
 */
@Component({
  selector: 'mx-select',
  exportAs: 'mxSelect',
  imports: [CdkOverlayOrigin, CdkConnectedOverlay],
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxSelect }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mx-select' },
  template: `
    <button
      #trigger
      type="button"
      class="mx-select-trigger"
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      role="combobox"
      aria-haspopup="listbox"
      [id]="controlId()"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="isOpen() ? panelId : null"
      [attr.aria-activedescendant]="isOpen() ? activeId() : null"
      [attr.aria-invalid]="errorState() ? 'true' : null"
      [attr.aria-required]="isRequired() ? 'true' : null"
      [attr.aria-describedby]="field?.describedBy() ?? null"
      [attr.aria-label]="ariaLabel() ?? null"
      [disabled]="isDisabled()"
      (click)="toggle()"
      (keydown)="onKeydown($event)"
      (blur)="onTriggerBlur()"
    >
      <span class="mx-select-value" [class.mx-select-placeholder]="!selectedLabel()">
        {{ selectedLabel() || placeholder() }}
      </span>
      <svg class="mx-select-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayWidth]="panelWidth()"
      (overlayOutsideClick)="close()"
      (detach)="close()"
    >
      <div
        class="mx-select-panel"
        role="listbox"
        [id]="panelId"
        [attr.aria-labelledby]="field?.labelId() ?? null"
        [attr.aria-label]="field?.labelId() ? null : (ariaLabel() ?? placeholder())"
      >
        <ng-content />
      </div>
    </ng-template>
  `,
})
export class MxSelect<T = unknown> implements ControlValueAccessor, MxFormFieldControl, AfterContentInit {
  /** Valor seleccionado. Também funciona com ngModel e Reactive Forms. */
  readonly value = model<T | null>(null);
  readonly placeholder = input('Seleccionar');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly id = input<string | undefined>(undefined);
  /** Nome acessível quando não existe um `label[mxLabel]` no campo. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Compara opções com o valor (útil para objectos). */
  readonly compareWith = input<(a: T | null, b: T | null) => boolean>((a, b) => Object.is(a, b));

  readonly opened = output<void>();
  readonly closed = output<void>();

  @ContentChildren(MxOption, { descendants: true }) private options!: QueryList<MxOption<T>>;

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  protected readonly positions = POSITIONS;
  protected readonly panelId = mxUniqueId('mx-select-panel');
  private readonly generatedId = mxUniqueId('mx-select');
  readonly controlId = computed(() => this.id() ?? this.generatedId);

  protected readonly isOpen = signal(false);
  protected readonly panelWidth = signal<number>(0);
  protected readonly activeId = signal<string | null>(null);
  private readonly formDisabled = signal(false);
  private readonly optionsVersion = signal(0);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  protected readonly selectedLabel = computed(() => {
    this.optionsVersion();
    const v = this.value();
    return this.options?.find((o) => this.compareWith()(o.value(), v))?.getLabel() ?? '';
  });

  private keyManager?: ActiveDescendantKeyManager<MxOption<T>>;
  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  ngAfterContentInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.options)
      .withWrap(false)
      .withVerticalOrientation()
      .withHomeAndEnd()
      .withTypeAhead(250)
      .skipPredicate((o) => o.disabled);
    const sub = this.keyManager.change.subscribe(() => this.activeId.set(this.keyManager?.activeItem?.id ?? null));
    const changes = this.options.changes.subscribe(() => this.optionsVersion.update((n) => n + 1));
    this.optionsVersion.update((n) => n + 1);
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
      changes.unsubscribe();
      this.keyManager?.destroy();
    });
  }

  isSelected(value: T): boolean {
    return this.compareWith()(value, this.value());
  }

  open(): void {
    if (this.isDisabled() || this.isOpen()) return;
    this.panelWidth.set(this.host.getBoundingClientRect().width);
    this.isOpen.set(true);
    this.opened.emit();
    queueMicrotask(() => {
      const index = this.options.toArray().findIndex((o) => this.isSelected(o.value()));
      if (index >= 0) this.keyManager?.setActiveItem(index);
      else this.keyManager?.setFirstItemActive();
    });
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.keyManager?.setActiveItem(-1);
    this.activeId.set(null);
    this.onTouched();
    this.closed.emit();
  }

  toggle(): void {
    if (this.isOpen()) this.close();
    else this.open();
  }

  /** Chamado por uma opção quando é escolhida. */
  choose(option: MxOption<T>): void {
    const v = option.value();
    this.value.set(v);
    this.onChange(v);
    this.close();
    this.focus();
  }

  focus(): void {
    this.host.querySelector<HTMLButtonElement>('.mx-select-trigger')?.focus();
  }

  protected onKeydown(event: KeyboardEvent): void {
    const km = this.keyManager;
    if (!km) return;
    const key = event.key;

    if (!this.isOpen()) {
      if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ') {
        event.preventDefault();
        this.open();
      } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        this.open();
        queueMicrotask(() => km.onKeydown(event));
      }
      return;
    }

    if (key === 'Escape' || (key === 'ArrowUp' && event.altKey)) {
      event.preventDefault();
      this.close();
    } else if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      const active = km.activeItem;
      if (active && !active.disabled) this.choose(active);
    } else if (key === 'Tab') {
      this.close();
    } else if (key === 'ArrowDown') {
      event.preventDefault();
      km.setNextItemActive();
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      km.setPreviousItemActive();
    } else if (key === 'Home' || key === 'PageUp') {
      event.preventDefault();
      km.setFirstItemActive();
    } else if (key === 'End' || key === 'PageDown') {
      event.preventDefault();
      km.setLastItemActive();
    } else {
      // pesquisa por letra
      km.onKeydown(event);
    }
  }

  protected onTriggerBlur(): void {
    if (!this.isOpen()) this.onTouched();
  }

  // ---- MxFormFieldControl ----
  errorState(): boolean {
    const c = this.ngControl;
    return !!c && !!c.invalid && !!(c.touched || c.dirty);
  }

  isRequired(): boolean {
    return this.required() || !!this.ngControl?.control?.hasValidator?.(Validators.required);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: T | null): void {
    this.value.set(value ?? null);
  }
  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
