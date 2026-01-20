import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface ColorFormat {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export interface ColorPalette {
  name: string;
  colors: string[];
}

@Component({
  selector: 'muxima-color-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements ControlValueAccessor, OnInit {
  @Input() format: 'hex' | 'rgb' | 'hsl' = 'hex';
  @Input() showPalettes: boolean = true;
  @Input() showGradient: boolean = false;
  @Input() customPalettes: ColorPalette[] = [];
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showAlpha: boolean = false;
  @Input() inline: boolean = false;

  @Output() colorChange = new EventEmitter<ColorFormat>();
  @Output() formatChange = new EventEmitter<'hex' | 'rgb' | 'hsl'>();

  currentColor: string = '#667eea';
  isOpen: boolean = false;
  hue: number = 240;
  saturation: number = 76;
  lightness: number = 72;
  alpha: number = 1;

  defaultPalettes: ColorPalette[] = [
    {
      name: 'Material',
      colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4']
    },
    {
      name: 'Pastéis',
      colors: ['#ffc1cc', '#ffabab', '#ffd4a3', '#fff9a3', '#c1ffc1', '#a3d4ff', '#c1a3ff', '#ffa3ff']
    },
    {
      name: 'Neutros',
      colors: ['#ffffff', '#f5f5f5', '#e0e0e0', '#bdbdbd', '#9e9e9e', '#757575', '#424242', '#212121']
    }
  ];

  gradientStart: string = '#667eea';
  gradientEnd: string = '#764ba2';
  gradientAngle: number = 135;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    if (this.inline) {
      this.isOpen = true;
    }
    this.updateFromHex(this.currentColor);
  }

  writeValue(value: string): void {
    if (value) {
      this.currentColor = value;
      this.updateFromHex(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  togglePicker(): void {
    if (!this.disabled && !this.inline) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onTouched();
      }
    }
  }

  closePicker(): void {
    if (!this.inline) {
      this.isOpen = false;
    }
  }

  onHueChange(event: Event): void {
    this.hue = +(event.target as HTMLInputElement).value;
    this.updateColorFromHSL();
  }

  onSaturationChange(event: Event): void {
    this.saturation = +(event.target as HTMLInputElement).value;
    this.updateColorFromHSL();
  }

  onLightnessChange(event: Event): void {
    this.lightness = +(event.target as HTMLInputElement).value;
    this.updateColorFromHSL();
  }

  onAlphaChange(event: Event): void {
    this.alpha = +(event.target as HTMLInputElement).value;
    this.updateColorFromHSL();
  }

  selectPaletteColor(color: string): void {
    this.currentColor = color;
    this.updateFromHex(color);
    this.emitColor();
  }

  onHexInput(event: Event): void {
    const hex = (event.target as HTMLInputElement).value;
    if (this.isValidHex(hex)) {
      this.currentColor = hex;
      this.updateFromHex(hex);
      this.emitColor();
    }
  }

  updateColorFromHSL(): void {
    const rgb = this.hslToRgb(this.hue, this.saturation, this.lightness);
    this.currentColor = this.rgbToHex(rgb.r, rgb.g, rgb.b);
    this.emitColor();
  }

  updateFromHex(hex: string): void {
    const rgb = this.hexToRgb(hex);
    if (rgb) {
      const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
      this.hue = hsl.h;
      this.saturation = hsl.s;
      this.lightness = hsl.l;
    }
  }

  emitColor(): void {
    const rgb = this.hexToRgb(this.currentColor);
    const colorFormat: ColorFormat = {
      hex: this.currentColor,
      rgb: rgb || { r: 0, g: 0, b: 0 },
      hsl: { h: this.hue, s: this.saturation, l: this.lightness }
    };

    this.onChange(this.currentColor);
    this.colorChange.emit(colorFormat);
  }

  changeFormat(newFormat: 'hex' | 'rgb' | 'hsl'): void {
    this.format = newFormat;
    this.formatChange.emit(newFormat);
  }

  getFormattedColor(): string {
    switch (this.format) {
      case 'hex':
        return this.currentColor;
      case 'rgb':
        const rgb = this.hexToRgb(this.currentColor);
        return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';
      case 'hsl':
        return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
      default:
        return this.currentColor;
    }
  }

  // Gradient methods
  onGradientStartChange(color: string): void {
    this.gradientStart = color;
  }

  onGradientEndChange(color: string): void {
    this.gradientEnd = color;
  }

  onGradientAngleChange(event: Event): void {
    this.gradientAngle = +(event.target as HTMLInputElement).value;
  }

  getGradientStyle(): string {
    return `linear-gradient(${this.gradientAngle}deg, ${this.gradientStart}, ${this.gradientEnd})`;
  }

  copyGradientCSS(): void {
    const css = `background: ${this.getGradientStyle()};`;
    navigator.clipboard.writeText(css);
  }

  // Color conversion utilities
  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  isValidHex(hex: string): boolean {
    return /^#?([a-f\d]{6}|[a-f\d]{3})$/i.test(hex);
  }


  getPalettes(): ColorPalette[] {
    return this.customPalettes.length > 0 ? this.customPalettes : this.defaultPalettes;
  }

  asFormat(fmt: string): 'hex' | 'rgb' | 'hsl' {
    if (fmt === 'hex' || fmt === 'rgb' || fmt === 'hsl') return fmt;
    return 'hex';
  }
}
