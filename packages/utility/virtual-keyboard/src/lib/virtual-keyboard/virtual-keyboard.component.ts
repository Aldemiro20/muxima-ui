import { Component, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type KeyboardLayout = 'qwerty' | 'numeric' | 'symbols' | 'custom';

interface Key {
  label: string;
  value: string;
  width?: number;
  action?: 'backspace' | 'enter' | 'space' | 'shift' | 'capslock' | 'layout';
  layoutSwitch?: KeyboardLayout;
}

@Component({
  selector: 'muxima-virtual-keyboard',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VirtualKeyboardComponent),
      multi: true
    }
  ],
  template: `
    <div class="virtual-keyboard" [class.compact]="compact">
      <div class="keyboard-display" *ngIf="showDisplay">
        <input 
          type="text" 
          [value]="currentValue"
          readonly
          [placeholder]="placeholder"
          class="keyboard-input">
        <button class="btn-clear" (click)="clear()" *ngIf="currentValue">✕</button>
      </div>

      <div class="keyboard-keys">
        <div class="keyboard-row" *ngFor="let row of getCurrentLayout()">
          <button
            *ngFor="let key of row"
            type="button"
            class="key"
            [class.key-action]="key.action"
            [class.key-active]="isKeyActive(key)"
            [style.flex]="key.width || 1"
            (click)="handleKeyPress(key)"
            (mousedown)="$event.preventDefault()">
            {{ getKeyLabel(key) }}
          </button>
        </div>
      </div>

      <div class="keyboard-footer">
        <small>🔐 Teclado Virtual por Aldemiro Valentim</small>
      </div>
    </div>
  `,
  styles: [`
    .virtual-keyboard {
      background: white;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      max-width: 800px;
      margin: 0 auto;

      &.compact {
        max-width: 400px;
        padding: 12px;
      }
    }

    .keyboard-display {
      position: relative;
      margin-bottom: 16px;
    }

    .keyboard-input {
      width: 100%;
      padding: 16px 48px 16px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 20px;
      font-family: monospace;
      background: #f9fafb;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
    }

    .btn-clear {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 8px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;

      &:hover {
        background: #dc2626;
        transform: translateY(-50%) scale(1.1);
      }
    }

    .keyboard-keys {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .keyboard-row {
      display: flex;
      gap: 6px;
      justify-content: center;
    }

    .key {
      flex: 1;
      min-width: 0;
      padding: 16px 8px;
      border: 2px solid #e5e7eb;
      background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      color: #374151;
      cursor: pointer;
      transition: all 0.1s;
      user-select: none;

      &:hover {
        background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
        border-color: #667eea;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0) scale(0.95);
        background: linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%);
      }

      &.key-action {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-color: #667eea;
        font-size: 14px;

        &:hover {
          background: linear-gradient(135deg, #5568d3 0%, #64408a 100%);
        }
      }

      &.key-active {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border-color: #10b981;
      }
    }

    .keyboard-footer {
      margin-top: 12px;
      text-align: center;

      small {
        color: #6b7280;
        font-size: 12px;
      }
    }

    .compact {
      .key {
        padding: 12px 6px;
        font-size: 14px;
      }

      .keyboard-input {
        padding: 12px 40px 12px 12px;
        font-size: 16px;
      }
    }
  `]
})
export class VirtualKeyboardComponent implements ControlValueAccessor {
  @Input() showDisplay = true;
  @Input() compact = false;
  @Input() placeholder = 'Digite aqui...';
  @Input() initialLayout: KeyboardLayout = 'qwerty';
  @Input() customKeys: Key[][] = [];

  @Output() keyPress = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  currentValue = '';
  currentLayout: KeyboardLayout = 'qwerty';
  isShiftActive = false;
  isCapsLockActive = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  private qwertyLayout: Key[][] = [
    [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '0', value: '0' }
    ],
    [
      { label: 'Q', value: 'q' },
      { label: 'W', value: 'w' },
      { label: 'E', value: 'e' },
      { label: 'R', value: 'r' },
      { label: 'T', value: 't' },
      { label: 'Y', value: 'y' },
      { label: 'U', value: 'u' },
      { label: 'I', value: 'i' },
      { label: 'O', value: 'o' },
      { label: 'P', value: 'p' }
    ],
    [
      { label: 'A', value: 'a' },
      { label: 'S', value: 's' },
      { label: 'D', value: 'd' },
      { label: 'F', value: 'f' },
      { label: 'G', value: 'g' },
      { label: 'H', value: 'h' },
      { label: 'J', value: 'j' },
      { label: 'K', value: 'k' },
      { label: 'L', value: 'l' }
    ],
    [
      { label: '⇧', value: '', width: 1.5, action: 'shift' },
      { label: 'Z', value: 'z' },
      { label: 'X', value: 'x' },
      { label: 'C', value: 'c' },
      { label: 'V', value: 'v' },
      { label: 'B', value: 'b' },
      { label: 'N', value: 'n' },
      { label: 'M', value: 'm' },
      { label: '⌫', value: '', width: 1.5, action: 'backspace' }
    ],
    [
      { label: '123', value: '', width: 1.5, action: 'layout', layoutSwitch: 'numeric' },
      { label: '@', value: '@' },
      { label: ' ', value: ' ', width: 4, action: 'space' },
      { label: '.', value: '.' },
      { label: '↵', value: '\n', width: 1.5, action: 'enter' }
    ]
  ];

  private numericLayout: Key[][] = [
    [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' }
    ],
    [
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' }
    ],
    [
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' }
    ],
    [
      { label: '#+=', value: '', width: 1.5, action: 'layout', layoutSwitch: 'symbols' },
      { label: '0', value: '0', width: 1 },
      { label: '⌫', value: '', width: 1.5, action: 'backspace' }
    ],
    [
      { label: 'ABC', value: '', width: 2, action: 'layout', layoutSwitch: 'qwerty' },
      { label: ' ', value: ' ', width: 2, action: 'space' },
      { label: '↵', value: '\n', width: 2, action: 'enter' }
    ]
  ];

  private symbolsLayout: Key[][] = [
    [
      { label: '!', value: '!' },
      { label: '@', value: '@' },
      { label: '#', value: '#' },
      { label: '$', value: '$' },
      { label: '%', value: '%' },
      { label: '^', value: '^' },
      { label: '&', value: '&' },
      { label: '*', value: '*' },
      { label: '(', value: '(' },
      { label: ')', value: ')' }
    ],
    [
      { label: '-', value: '-' },
      { label: '_', value: '_' },
      { label: '=', value: '=' },
      { label: '+', value: '+' },
      { label: '[', value: '[' },
      { label: ']', value: ']' },
      { label: '{', value: '{' },
      { label: '}', value: '}' }
    ],
    [
      { label: '\\', value: '\\' },
      { label: '|', value: '|' },
      { label: ';', value: ';' },
      { label: ':', value: ':' },
      { label: '\'', value: '\'' },
      { label: '"', value: '"' },
      { label: ',', value: ',' },
      { label: '.', value: '.' }
    ],
    [
      { label: '<', value: '<' },
      { label: '>', value: '>' },
      { label: '/', value: '/' },
      { label: '?', value: '?' },
      { label: '⌫', value: '', width: 2, action: 'backspace' }
    ],
    [
      { label: '123', value: '', width: 2, action: 'layout', layoutSwitch: 'numeric' },
      { label: ' ', value: ' ', width: 2, action: 'space' },
      { label: 'ABC', value: '', width: 2, action: 'layout', layoutSwitch: 'qwerty' }
    ]
  ];

  ngOnInit() {
    this.currentLayout = this.initialLayout;
  }

  getCurrentLayout(): Key[][] {
    if (this.customKeys.length > 0) {
      return this.customKeys;
    }

    switch (this.currentLayout) {
      case 'numeric':
        return this.numericLayout;
      case 'symbols':
        return this.symbolsLayout;
      case 'qwerty':
      default:
        return this.qwertyLayout;
    }
  }

  handleKeyPress(key: Key) {
    if (key.action) {
      this.handleAction(key);
    } else {
      let value = key.value;
      
      if (this.currentLayout === 'qwerty' && (this.isShiftActive || this.isCapsLockActive)) {
        value = value.toUpperCase();
      }
      
      this.currentValue += value;
      this.updateValue();
      this.keyPress.emit(value);

      // Reset shift after key press
      if (this.isShiftActive && !this.isCapsLockActive) {
        this.isShiftActive = false;
      }
    }
  }

  private handleAction(key: Key) {
    switch (key.action) {
      case 'backspace':
        this.currentValue = this.currentValue.slice(0, -1);
        this.updateValue();
        break;
      
      case 'enter':
        this.currentValue += '\n';
        this.updateValue();
        this.keyPress.emit('enter');
        break;
      
      case 'space':
        this.currentValue += ' ';
        this.updateValue();
        break;
      
      case 'shift':
        this.isShiftActive = !this.isShiftActive;
        break;
      
      case 'capslock':
        this.isCapsLockActive = !this.isCapsLockActive;
        this.isShiftActive = false;
        break;
      
      case 'layout':
        if (key.layoutSwitch) {
          this.currentLayout = key.layoutSwitch;
        }
        break;
    }
  }

  clear() {
    this.currentValue = '';
    this.updateValue();
  }

  private updateValue() {
    this.valueChange.emit(this.currentValue);
    this.onChange(this.currentValue);
    this.onTouched();
  }

  getKeyLabel(key: Key): string {
    if (this.currentLayout === 'qwerty' && !key.action && (this.isShiftActive || this.isCapsLockActive)) {
      return key.label.toUpperCase();
    }
    return key.label;
  }

  isKeyActive(key: Key): boolean {
    if (key.action === 'shift') {
      return this.isShiftActive;
    }
    if (key.action === 'capslock') {
      return this.isCapsLockActive;
    }
    return false;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.currentValue = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
