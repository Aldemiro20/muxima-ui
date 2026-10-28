import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  Injector,
  computed,
  contentChildren,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { injectMxMessages } from '@muxima-ui/core/i18n';
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
  host: { class: 'mx-select', '[attr.aria-label]': 'null', '[attr.data-size]': 'size() === "md" ? null : size()' },
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
      [attr.aria-busy]="loading() ? 'true' : null"
      [disabled]="isDisabled()"
      (click)="toggle()"
      (keydown)="onKeydown($event)"
      (blur)="onTriggerBlur()"
    >
      <span class="mx-select-value" [class.mx-select-placeholder]="!selectedLabel()">
        {{ selectedLabel() || placeholderText() }}
      </span>
      @if (loading()) {
        <span class="mx-spinner mx-select-spinner" aria-hidden="true"></span>
      } @else {
        <svg class="mx-select-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      }
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
        [attr.aria-multiselectable]="multiple() ? 'true' : null"
        [attr.aria-busy]="loading() ? 'true' : null"
        [id]="panelId"
        [attr.aria-labelledby]="field?.labelId() ?? null"
        [attr.aria-label]="field?.labelId() ? null : (ariaLabel() ?? placeholderText())"
      >
        <ng-content />
        @if (loading()) {
          <div class="mx-select-empty mx-select-loading" role="option" aria-disabled="true" aria-selected="false"><span class="mx-spinner mx-select-spinner" aria-hidden="true"></span>{{ loadingText() ?? i18n().select.loading }}</div>
        } @else if (optionCount() === 0) {
          <div class="mx-select-empty" role="option" aria-disabled="true" aria-selected="false">{{ emptyText() ?? i18n().select.empty }}</div>
        }
      </div>
    </ng-template>
  `,
})
export class MxSelect<T = unknown> implements ControlValueAccessor, MxFormFieldControl, AfterContentInit {
  /** Valor seleccionado. Também funciona com ngModel e Reactive Forms. */
  readonly value = model<T | T[] | null>(null);
  /** Escolha múltipla: o valor passa a ser uma lista e o painel não fecha ao escolher. */
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly placeholder = input<string>();
  protected readonly i18n = injectMxMessages();
  protected readonly placeholderText = computed(() => this.placeholder() ?? this.i18n().select.placeholder);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  /** Força o estado de erro (sem formulário). Com Reactive Forms o erro vem do controlo. */
  readonly invalid = input(false, { transform: booleanAttribute });
  /** Altura: sm 32 px, md 36 px, lg 40 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  /** Texto mostrado quando não há opções. */
  readonly emptyText = input<string>();
  /** Opções a carregar (ex.: de um servidor): mostra um indicador no botão e no painel. */
  readonly loading = input(false, { transform: booleanAttribute });
  readonly loadingText = input<string>();
  readonly id = input<string | undefined>(undefined);
  /** Nome acessível quando não existe um `label[mxLabel]` no campo. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Compara opções com o valor (útil para objectos). */
  readonly compareWith = input<(a: T | null, b: T | null) => boolean>((a, b) => Object.is(a, b));

  readonly opened = output<void>();
  readonly closed = output<void>();

  private readonly options = contentChildren<MxOption<T>>(MxOption, { descendants: true });
  private readonly injector = inject(Injector);

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
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  protected readonly optionCount = computed(() => {
    return this.options().length;
  });

  protected readonly selectedLabel = computed(() => {
    const options = this.options();
    if (this.multiple()) {
      const labels = options.filter((o) => this.isSelected(o.value())).map((o) => o.getLabel());
      if (labels.length > 2) return `${labels.length} seleccionados`;
      return labels.join(', ');
    }
    const v = this.value() as T | null;
    return options.find((o) => this.compareWith()(o.value(), v))?.getLabel() ?? '';
  });

  private keyManager?: ActiveDescendantKeyManager<MxOption<T>>;
  private onChange: (value: T | T[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  ngAfterContentInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.options, this.injector)
      .withWrap(false)
      .withVerticalOrientation()
      .withHomeAndEnd()
      .withTypeAhead(250)
      .skipPredicate((o) => o.disabled);
    const sub = this.keyManager.change.subscribe(() => this.activeId.set(this.keyManager?.activeItem?.id ?? null));
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
      this.keyManager?.destroy();
    });
  }

  isSelected(value: T): boolean {
    const current = this.value();
    if (this.multiple()) return Array.isArray(current) && current.some((c) => this.compareWith()(value, c));
    return this.compareWith()(value, current as T | null);
  }

  open(): void {
    if (this.isDisabled() || this.isOpen()) return;
    this.panelWidth.set(this.host.getBoundingClientRect().width);
    this.isOpen.set(true);
    this.opened.emit();
    queueMicrotask(() => {
      const index = this.options().findIndex((o) => this.isSelected(o.value()));
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
    if (this.multiple()) {
      const current = Array.isArray(this.value()) ? (this.value() as T[]) : [];
      const next = this.isSelected(v) ? current.filter((c) => !this.compareWith()(v, c)) : [...current, v];
      this.value.set(next);
      this.onChange(next);
      // o painel fica aberto; a opção activa passa a ser a escolhida
      const index = this.options().indexOf(option);
      if (index >= 0) this.keyManager?.setActiveItem(index);
      return;
    }
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
    if (this.invalid()) return true;
    const c = this.ngControl;
    return !!c && !!c.invalid && !!(c.touched || c.dirty);
  }

  isRequired(): boolean {
    return this.required() || !!this.ngControl?.control?.hasValidator?.(Validators.required);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: T | T[] | null): void {
    this.value.set(this.multiple() ? (Array.isArray(value) ? value : []) : (value ?? null));
  }
  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
