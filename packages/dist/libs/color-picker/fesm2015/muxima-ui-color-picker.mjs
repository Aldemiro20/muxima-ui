import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

class ColorPickerComponent {
    constructor() {
        this.format = 'hex';
        this.showPalettes = true;
        this.showGradient = false;
        this.customPalettes = [];
        this.disabled = false;
        this.size = 'medium';
        this.showAlpha = false;
        this.inline = false;
        this.colorChange = new EventEmitter();
        this.formatChange = new EventEmitter();
        this.currentColor = '#667eea';
        this.isOpen = false;
        this.hue = 240;
        this.saturation = 76;
        this.lightness = 72;
        this.alpha = 1;
        this.defaultPalettes = [
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
        this.gradientStart = '#667eea';
        this.gradientEnd = '#764ba2';
        this.gradientAngle = 135;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    ngOnInit() {
        if (this.inline) {
            this.isOpen = true;
        }
        this.updateFromHex(this.currentColor);
    }
    writeValue(value) {
        if (value) {
            this.currentColor = value;
            this.updateFromHex(value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    togglePicker() {
        if (!this.disabled && !this.inline) {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.onTouched();
            }
        }
    }
    closePicker() {
        if (!this.inline) {
            this.isOpen = false;
        }
    }
    onHueChange(event) {
        this.hue = +event.target.value;
        this.updateColorFromHSL();
    }
    onSaturationChange(event) {
        this.saturation = +event.target.value;
        this.updateColorFromHSL();
    }
    onLightnessChange(event) {
        this.lightness = +event.target.value;
        this.updateColorFromHSL();
    }
    onAlphaChange(event) {
        this.alpha = +event.target.value;
        this.updateColorFromHSL();
    }
    selectPaletteColor(color) {
        this.currentColor = color;
        this.updateFromHex(color);
        this.emitColor();
    }
    onHexInput(event) {
        const hex = event.target.value;
        if (this.isValidHex(hex)) {
            this.currentColor = hex;
            this.updateFromHex(hex);
            this.emitColor();
        }
    }
    updateColorFromHSL() {
        const rgb = this.hslToRgb(this.hue, this.saturation, this.lightness);
        this.currentColor = this.rgbToHex(rgb.r, rgb.g, rgb.b);
        this.emitColor();
    }
    updateFromHex(hex) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
            this.hue = hsl.h;
            this.saturation = hsl.s;
            this.lightness = hsl.l;
        }
    }
    emitColor() {
        const rgb = this.hexToRgb(this.currentColor);
        const colorFormat = {
            hex: this.currentColor,
            rgb: rgb || { r: 0, g: 0, b: 0 },
            hsl: { h: this.hue, s: this.saturation, l: this.lightness }
        };
        this.onChange(this.currentColor);
        this.colorChange.emit(colorFormat);
    }
    changeFormat(newFormat) {
        this.format = newFormat;
        this.formatChange.emit(newFormat);
    }
    getFormattedColor() {
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
    onGradientStartChange(color) {
        this.gradientStart = color;
    }
    onGradientEndChange(color) {
        this.gradientEnd = color;
    }
    onGradientAngleChange(event) {
        this.gradientAngle = +event.target.value;
    }
    getGradientStyle() {
        return `linear-gradient(${this.gradientAngle}deg, ${this.gradientStart}, ${this.gradientEnd})`;
    }
    copyGradientCSS() {
        const css = `background: ${this.getGradientStyle()};`;
        navigator.clipboard.writeText(css);
    }
    // Color conversion utilities
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
    rgbToHsl(r, g, b) {
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
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        }
        else {
            const hue2rgb = (p, q, t) => {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
    isValidHex(hex) {
        return /^#?([a-f\d]{6}|[a-f\d]{3})$/i.test(hex);
    }
    getPalettes() {
        return this.customPalettes.length > 0 ? this.customPalettes : this.defaultPalettes;
    }
    asFormat(fmt) {
        if (fmt === 'hex' || fmt === 'rgb' || fmt === 'hsl')
            return fmt;
        return 'hex';
    }
}
ColorPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColorPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ColorPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ColorPickerComponent, isStandalone: true, selector: "muxima-color-picker", inputs: { format: "format", showPalettes: "showPalettes", showGradient: "showGradient", customPalettes: "customPalettes", disabled: "disabled", size: "size", showAlpha: "showAlpha", inline: "inline" }, outputs: { colorChange: "colorChange", formatChange: "formatChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorPickerComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"color-picker-wrapper\" [attr.data-size]=\"size\" [class.disabled]=\"disabled\">\r\n  <!-- Trigger Button -->\r\n  <button \r\n    *ngIf=\"!inline\"\r\n    class=\"color-trigger\"\r\n    [style.background]=\"currentColor\"\r\n    [disabled]=\"disabled\"\r\n    (click)=\"togglePicker()\"\r\n    type=\"button\">\r\n    <span class=\"color-value\">{{ getFormattedColor() }}</span>\r\n  </button>\r\n\r\n  <!-- Picker Dropdown/Inline -->\r\n  <div class=\"color-picker-panel\" [class.open]=\"isOpen\" [class.inline]=\"inline\">\r\n    <div class=\"picker-header\">\r\n      <div class=\"format-tabs\">\r\n        <button \r\n          *ngFor=\"let fmt of ['hex', 'rgb', 'hsl']\"\r\n          [class.active]=\"format === fmt\"\r\n          (click)=\"changeFormat(asFormat(fmt))\"\r\n          type=\"button\">\r\n          {{ fmt.toUpperCase() }}\r\n        </button>\r\n      </div>\r\n      <button *ngIf=\"!inline\" class=\"close-btn\" (click)=\"closePicker()\" type=\"button\">\u00D7</button>\r\n    </div>\r\n\r\n    <!-- Color Preview -->\r\n    <div class=\"color-preview\">\r\n      <div class=\"preview-box\" [style.background]=\"currentColor\"></div>\r\n      <input \r\n        type=\"text\" \r\n        class=\"color-input\"\r\n        [value]=\"getFormattedColor()\"\r\n        (input)=\"onHexInput($event)\"\r\n        [disabled]=\"disabled\"\r\n      />\r\n    </div>\r\n\r\n    <!-- HSL Sliders -->\r\n    <div class=\"color-sliders\">\r\n      <div class=\"slider-group\">\r\n        <label>Matiz</label>\r\n        <input \r\n          type=\"range\" \r\n          min=\"0\" \r\n          max=\"360\" \r\n          [value]=\"hue\"\r\n          (input)=\"onHueChange($event)\"\r\n          [disabled]=\"disabled\"\r\n          class=\"slider hue-slider\"\r\n        />\r\n        <span class=\"slider-value\">{{ hue }}\u00B0</span>\r\n      </div>\r\n\r\n      <div class=\"slider-group\">\r\n        <label>Satura\u00E7\u00E3o</label>\r\n        <input \r\n          type=\"range\" \r\n          min=\"0\" \r\n          max=\"100\" \r\n          [value]=\"saturation\"\r\n          (input)=\"onSaturationChange($event)\"\r\n          [disabled]=\"disabled\"\r\n          class=\"slider saturation-slider\"\r\n          [style.--base-color]=\"'hsl(' + hue + ', 100%, 50%)'\"\r\n        />\r\n        <span class=\"slider-value\">{{ saturation }}%</span>\r\n      </div>\r\n\r\n      <div class=\"slider-group\">\r\n        <label>Luminosidade</label>\r\n        <input \r\n          type=\"range\" \r\n          min=\"0\" \r\n          max=\"100\" \r\n          [value]=\"lightness\"\r\n          (input)=\"onLightnessChange($event)\"\r\n          [disabled]=\"disabled\"\r\n          class=\"slider lightness-slider\"\r\n          [style.--base-color]=\"'hsl(' + hue + ', ' + saturation + '%, 50%)'\"\r\n        />\r\n        <span class=\"slider-value\">{{ lightness }}%</span>\r\n      </div>\r\n\r\n      <div class=\"slider-group\" *ngIf=\"showAlpha\">\r\n        <label>Opacidade</label>\r\n        <input \r\n          type=\"range\" \r\n          min=\"0\" \r\n          max=\"1\" \r\n          step=\"0.01\"\r\n          [value]=\"alpha\"\r\n          (input)=\"onAlphaChange($event)\"\r\n          [disabled]=\"disabled\"\r\n          class=\"slider alpha-slider\"\r\n        />\r\n        <span class=\"slider-value\">{{ (alpha * 100).toFixed(0) }}%</span>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Color Palettes -->\r\n    <div class=\"palettes-section\" *ngIf=\"showPalettes\">\r\n      <div class=\"palette\" *ngFor=\"let palette of getPalettes()\">\r\n        <h4>{{ palette.name }}</h4>\r\n        <div class=\"palette-colors\">\r\n          <button\r\n            *ngFor=\"let color of palette.colors\"\r\n            class=\"palette-color\"\r\n            [style.background]=\"color\"\r\n            [class.selected]=\"currentColor === color\"\r\n            (click)=\"selectPaletteColor(color)\"\r\n            [disabled]=\"disabled\"\r\n            type=\"button\"\r\n          ></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Gradient Section -->\r\n    <div class=\"gradient-section\" *ngIf=\"showGradient\">\r\n      <h4>Criador de Gradiente</h4>\r\n      \r\n      <div class=\"gradient-preview\" [style.background]=\"getGradientStyle()\"></div>\r\n      \r\n      <div class=\"gradient-controls\">\r\n        <div class=\"gradient-colors\">\r\n          <div class=\"gradient-color-input\">\r\n            <label>In\u00EDcio</label>\r\n            <input \r\n              type=\"color\" \r\n              [(ngModel)]=\"gradientStart\"\r\n              (change)=\"onGradientStartChange(gradientStart)\"\r\n              [disabled]=\"disabled\"\r\n            />\r\n            <span>{{ gradientStart }}</span>\r\n          </div>\r\n          \r\n          <div class=\"gradient-color-input\">\r\n            <label>Fim</label>\r\n            <input \r\n              type=\"color\" \r\n              [(ngModel)]=\"gradientEnd\"\r\n              (change)=\"onGradientEndChange(gradientEnd)\"\r\n              [disabled]=\"disabled\"\r\n            />\r\n            <span>{{ gradientEnd }}</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"slider-group\">\r\n          <label>\u00C2ngulo</label>\r\n          <input \r\n            type=\"range\" \r\n            min=\"0\" \r\n            max=\"360\" \r\n            [value]=\"gradientAngle\"\r\n            (input)=\"onGradientAngleChange($event)\"\r\n            [disabled]=\"disabled\"\r\n            class=\"slider\"\r\n          />\r\n          <span class=\"slider-value\">{{ gradientAngle }}\u00B0</span>\r\n        </div>\r\n\r\n        <button class=\"copy-btn\" (click)=\"copyGradientCSS()\" [disabled]=\"disabled\" type=\"button\">\r\n          \uD83D\uDCCB Copiar CSS\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".color-picker-wrapper{position:relative;display:inline-block}.color-picker-wrapper[data-size=small] .color-trigger{height:32px;font-size:.875rem}.color-picker-wrapper[data-size=large] .color-trigger{height:48px;font-size:1.125rem}.color-picker-wrapper.disabled{opacity:.5;cursor:not-allowed}.color-trigger{display:flex;align-items:center;gap:.5rem;height:40px;padding:.5rem 1rem;border:2px solid #e5e7eb;border-radius:8px;cursor:pointer;transition:all .3s ease;font-family:Courier New,monospace;font-weight:500;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.3)}.color-trigger:hover:not(:disabled){border-color:#667eea;box-shadow:0 4px 12px #667eea33}.color-trigger:disabled{cursor:not-allowed}.color-trigger .color-value{flex:1;text-align:center}.color-picker-panel{position:absolute;top:calc(100% + 8px);left:0;background:white;border-radius:16px;box-shadow:0 10px 40px #00000026;padding:1.5rem;width:320px;z-index:1000;opacity:0;visibility:hidden;transform:translateY(-10px);transition:all .3s ease}.color-picker-panel.open{opacity:1;visibility:visible;transform:translateY(0)}.color-picker-panel.inline{position:relative;top:0;left:0;opacity:1;visibility:visible;transform:none;box-shadow:0 2px 8px #0000001a}.picker-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.picker-header .format-tabs{display:flex;gap:.5rem}.picker-header .format-tabs button{padding:.5rem 1rem;border:1px solid #e5e7eb;border-radius:6px;background:white;cursor:pointer;transition:all .2s ease;font-weight:500;font-size:.875rem;color:#6b7280}.picker-header .format-tabs button:hover{background:#f9fafb;border-color:#667eea}.picker-header .format-tabs button.active{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-color:transparent}.picker-header .close-btn{width:32px;height:32px;border:none;border-radius:50%;background:#f3f4f6;cursor:pointer;font-size:1.5rem;line-height:1;color:#6b7280;transition:all .2s ease}.picker-header .close-btn:hover{background:#ef4444;color:#fff}.color-preview{display:flex;gap:1rem;margin-bottom:1.5rem}.color-preview .preview-box{width:60px;height:60px;border-radius:12px;border:3px solid #e5e7eb;box-shadow:0 2px 8px #0000001a}.color-preview .color-input{flex:1;padding:.75rem;border:2px solid #e5e7eb;border-radius:8px;font-family:Courier New,monospace;font-size:.875rem;font-weight:500;text-align:center;transition:border-color .2s ease}.color-preview .color-input:focus{outline:none;border-color:#667eea}.color-sliders{margin-bottom:1.5rem}.color-sliders .slider-group{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.75rem;margin-bottom:1rem}.color-sliders .slider-group label{font-size:.875rem;font-weight:500;color:#374151;min-width:90px}.color-sliders .slider-group .slider-value{font-size:.875rem;font-weight:600;color:#667eea;font-family:Courier New,monospace;min-width:45px;text-align:right}.color-sliders .slider{-webkit-appearance:none;width:100%;height:8px;border-radius:4px;outline:none;cursor:pointer}.color-sliders .slider::-webkit-slider-thumb{appearance:none;width:18px;height:18px;border-radius:50%;background:white;border:3px solid #667eea;cursor:pointer;box-shadow:0 2px 6px #0003;-webkit-transition:all .2s ease;transition:all .2s ease}.color-sliders .slider::-webkit-slider-thumb:hover{transform:scale(1.2)}.color-sliders .slider::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:white;border:3px solid #667eea;cursor:pointer;box-shadow:0 2px 6px #0003}.color-sliders .slider.hue-slider{background:linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(0,100%,50%))}.color-sliders .slider.saturation-slider{background:linear-gradient(to right,hsl(var(--hue, 240),0%,50%),var(--base-color, hsl(240, 100%, 50%)))}.color-sliders .slider.lightness-slider{background:linear-gradient(to right,hsl(var(--hue, 240),var(--sat, 100%),0%),var(--base-color, hsl(240, 100%, 50%)),hsl(var(--hue, 240),var(--sat, 100%),100%))}.color-sliders .slider.alpha-slider{background:linear-gradient(to right,transparent,currentColor),repeating-conic-gradient(#ccc 0% 25%,white 0% 50%) 0 0/10px 10px}.color-sliders .slider:disabled{opacity:.5;cursor:not-allowed}.palettes-section{margin-top:1.5rem;padding-top:1.5rem;border-top:2px solid #f3f4f6}.palettes-section .palette{margin-bottom:1.5rem}.palettes-section .palette:last-child{margin-bottom:0}.palettes-section .palette h4{font-size:.875rem;font-weight:600;color:#374151;margin-bottom:.75rem}.palettes-section .palette .palette-colors{display:grid;grid-template-columns:repeat(8,1fr);gap:.5rem}.palettes-section .palette .palette-colors .palette-color{width:100%;aspect-ratio:1;border:2px solid transparent;border-radius:6px;cursor:pointer;transition:all .2s ease}.palettes-section .palette .palette-colors .palette-color:hover{transform:scale(1.1);box-shadow:0 4px 12px #0003}.palettes-section .palette .palette-colors .palette-color.selected{border-color:#667eea;box-shadow:0 0 0 3px #667eea33}.palettes-section .palette .palette-colors .palette-color:disabled{opacity:.5;cursor:not-allowed}.gradient-section{margin-top:1.5rem;padding-top:1.5rem;border-top:2px solid #f3f4f6}.gradient-section h4{font-size:.875rem;font-weight:600;color:#374151;margin-bottom:1rem}.gradient-section .gradient-preview{height:100px;border-radius:12px;margin-bottom:1rem;box-shadow:0 4px 12px #0000001a}.gradient-section .gradient-controls .gradient-colors{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}.gradient-section .gradient-controls .gradient-colors .gradient-color-input{display:flex;flex-direction:column;gap:.5rem}.gradient-section .gradient-controls .gradient-colors .gradient-color-input label{font-size:.875rem;font-weight:500;color:#374151}.gradient-section .gradient-controls .gradient-colors .gradient-color-input input[type=color]{width:100%;height:40px;border:2px solid #e5e7eb;border-radius:8px;cursor:pointer}.gradient-section .gradient-controls .gradient-colors .gradient-color-input input[type=color]::-webkit-color-swatch-wrapper{padding:0}.gradient-section .gradient-controls .gradient-colors .gradient-color-input input[type=color]::-webkit-color-swatch{border:none;border-radius:6px}.gradient-section .gradient-controls .gradient-colors .gradient-color-input span{font-size:.75rem;font-family:Courier New,monospace;color:#6b7280;text-align:center}.gradient-section .gradient-controls .copy-btn{width:100%;padding:.75rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;transition:all .2s ease;margin-top:1rem}.gradient-section .gradient-controls .copy-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px #667eea66}.gradient-section .gradient-controls .copy-btn:active:not(:disabled){transform:translateY(0)}.gradient-section .gradient-controls .copy-btn:disabled{opacity:.5;cursor:not-allowed}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ColorPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-color-picker', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ColorPickerComponent),
                            multi: true
                        }
                    ], template: "<div class=\"color-picker-wrapper\" [attr.data-size]=\"size\" [class.disabled]=\"disabled\">\r\n  <!-- Trigger Button -->\r\n  <button \r\n    *ngIf=\"!inline\"\r\n    class=\"color-trigger\"\r\n    [style.background]=\"currentColor\"\r\n    [disabled]=\"disabled\"\r\n    (click)=\"togglePicker()\"\r\n    type=\"button\">\r\n    <span class=\"color-value\">{{ getFormattedColor() }}</span>\r\n  </button>\r\n\r\n  <!-- Picker Dropdown/Inline -->\r\n  <div class=\"color-picker-panel\" [class.open]=\"isOpen\" [class.inline]=\"inline\">\r\n    <div class=\"picker-header\">\r\n      <div class=\"format-tabs\">\r\n        <button \r\n          *ngFor=\"let fmt of ['hex', 'rgb', 'hsl']\"\r\n          [class.active]=\"format === fmt\"\r\n          (click)=\"changeFormat(asFormat(fmt))\"\r\n          type=\"button\">\r\n          {{ fmt.toUpperCase() }}\r\n        </button>\r\n      </div>\r\n      <button *ngIf=\"!inline\" class=\"close-btn\" (click)=\"closePicker()\" type=\"button\">\u00D7</button>\r\n    </div>\r\n\r\n    <!-- Color Preview -->\r\n    <div class=\"color-preview\">\r\n      <div class=\"preview-box\" [style.background]=\"currentColor\"></div>\r\n      <input \r\n        type=\"text\" \r\n        class=\"color-input\"\r\n        [value]=\"getFormattedColor()\"\r\n        (input)=\"onHexInput($event)\"\r\n        [disabled]=\"disabled\"\r\n      />\r\n    </div>\r\n\r\n    <!-- HSL Sliders -->\r\n    <div class=\"color-sliders\">\r\n      <div class=\"slider-group\">\r\n        <label>Matiz</label>\r\n        <input \r\n          type=\"range\" \r\n          min=\"0\" \r\n          max=\"360\" \r\n          [value]=\"hue\"\r\n          (input)=\"onHueChange($event)\"\r\n          [disabled]=\"disabled\"\r\n          class=\"slider hue-slider\"\r\n        />\r\n        <span class=\"slider-value\">{{ hue }}\u00B0</span>\r\n      </div>\r\n\r\n      <div class=\"slider-group\">\r\n        <label>Satura\u00E7\u00E3o</label>\r\n        <input \r\n          type=\"range\" \r\n          min=\"0\" \r\n          max=\"100\" \r\n          [value]=\"saturation\"\r\n          (input)=\"onSaturationChange($event)\"\r\n          [disabled]=\"disabled\"\r\n          class=\"slider saturation-slider\"\r\n          [style.--base-color]=\"'hsl(' + hue + ', 100%, 50%)'\"\r\n        />\r\n        <span class=\"slider-value\">{{ saturation }}%</span>\r\n      </div>\r\n\r\n      <div class=\"slider-group\">\r\n        <label>Luminosidade</label>\r\n        <input \r\n          type=\"range\" \r\n          min=\"0\" \r\n          max=\"100\" \r\n          [value]=\"lightness\"\r\n          (input)=\"onLightnessChange($event)\"\r\n          [disabled]=\"disabled\"\r\n          class=\"slider lightness-slider\"\r\n          [style.--base-color]=\"'hsl(' + hue + ', ' + saturation + '%, 50%)'\"\r\n        />\r\n        <span class=\"slider-value\">{{ lightness }}%</span>\r\n      </div>\r\n\r\n      <div class=\"slider-group\" *ngIf=\"showAlpha\">\r\n        <label>Opacidade</label>\r\n        <input \r\n          type=\"range\" \r\n          min=\"0\" \r\n          max=\"1\" \r\n          step=\"0.01\"\r\n          [value]=\"alpha\"\r\n          (input)=\"onAlphaChange($event)\"\r\n          [disabled]=\"disabled\"\r\n          class=\"slider alpha-slider\"\r\n        />\r\n        <span class=\"slider-value\">{{ (alpha * 100).toFixed(0) }}%</span>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Color Palettes -->\r\n    <div class=\"palettes-section\" *ngIf=\"showPalettes\">\r\n      <div class=\"palette\" *ngFor=\"let palette of getPalettes()\">\r\n        <h4>{{ palette.name }}</h4>\r\n        <div class=\"palette-colors\">\r\n          <button\r\n            *ngFor=\"let color of palette.colors\"\r\n            class=\"palette-color\"\r\n            [style.background]=\"color\"\r\n            [class.selected]=\"currentColor === color\"\r\n            (click)=\"selectPaletteColor(color)\"\r\n            [disabled]=\"disabled\"\r\n            type=\"button\"\r\n          ></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Gradient Section -->\r\n    <div class=\"gradient-section\" *ngIf=\"showGradient\">\r\n      <h4>Criador de Gradiente</h4>\r\n      \r\n      <div class=\"gradient-preview\" [style.background]=\"getGradientStyle()\"></div>\r\n      \r\n      <div class=\"gradient-controls\">\r\n        <div class=\"gradient-colors\">\r\n          <div class=\"gradient-color-input\">\r\n            <label>In\u00EDcio</label>\r\n            <input \r\n              type=\"color\" \r\n              [(ngModel)]=\"gradientStart\"\r\n              (change)=\"onGradientStartChange(gradientStart)\"\r\n              [disabled]=\"disabled\"\r\n            />\r\n            <span>{{ gradientStart }}</span>\r\n          </div>\r\n          \r\n          <div class=\"gradient-color-input\">\r\n            <label>Fim</label>\r\n            <input \r\n              type=\"color\" \r\n              [(ngModel)]=\"gradientEnd\"\r\n              (change)=\"onGradientEndChange(gradientEnd)\"\r\n              [disabled]=\"disabled\"\r\n            />\r\n            <span>{{ gradientEnd }}</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"slider-group\">\r\n          <label>\u00C2ngulo</label>\r\n          <input \r\n            type=\"range\" \r\n            min=\"0\" \r\n            max=\"360\" \r\n            [value]=\"gradientAngle\"\r\n            (input)=\"onGradientAngleChange($event)\"\r\n            [disabled]=\"disabled\"\r\n            class=\"slider\"\r\n          />\r\n          <span class=\"slider-value\">{{ gradientAngle }}\u00B0</span>\r\n        </div>\r\n\r\n        <button class=\"copy-btn\" (click)=\"copyGradientCSS()\" [disabled]=\"disabled\" type=\"button\">\r\n          \uD83D\uDCCB Copiar CSS\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".color-picker-wrapper{position:relative;display:inline-block}.color-picker-wrapper[data-size=small] .color-trigger{height:32px;font-size:.875rem}.color-picker-wrapper[data-size=large] .color-trigger{height:48px;font-size:1.125rem}.color-picker-wrapper.disabled{opacity:.5;cursor:not-allowed}.color-trigger{display:flex;align-items:center;gap:.5rem;height:40px;padding:.5rem 1rem;border:2px solid #e5e7eb;border-radius:8px;cursor:pointer;transition:all .3s ease;font-family:Courier New,monospace;font-weight:500;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.3)}.color-trigger:hover:not(:disabled){border-color:#667eea;box-shadow:0 4px 12px #667eea33}.color-trigger:disabled{cursor:not-allowed}.color-trigger .color-value{flex:1;text-align:center}.color-picker-panel{position:absolute;top:calc(100% + 8px);left:0;background:white;border-radius:16px;box-shadow:0 10px 40px #00000026;padding:1.5rem;width:320px;z-index:1000;opacity:0;visibility:hidden;transform:translateY(-10px);transition:all .3s ease}.color-picker-panel.open{opacity:1;visibility:visible;transform:translateY(0)}.color-picker-panel.inline{position:relative;top:0;left:0;opacity:1;visibility:visible;transform:none;box-shadow:0 2px 8px #0000001a}.picker-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.picker-header .format-tabs{display:flex;gap:.5rem}.picker-header .format-tabs button{padding:.5rem 1rem;border:1px solid #e5e7eb;border-radius:6px;background:white;cursor:pointer;transition:all .2s ease;font-weight:500;font-size:.875rem;color:#6b7280}.picker-header .format-tabs button:hover{background:#f9fafb;border-color:#667eea}.picker-header .format-tabs button.active{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-color:transparent}.picker-header .close-btn{width:32px;height:32px;border:none;border-radius:50%;background:#f3f4f6;cursor:pointer;font-size:1.5rem;line-height:1;color:#6b7280;transition:all .2s ease}.picker-header .close-btn:hover{background:#ef4444;color:#fff}.color-preview{display:flex;gap:1rem;margin-bottom:1.5rem}.color-preview .preview-box{width:60px;height:60px;border-radius:12px;border:3px solid #e5e7eb;box-shadow:0 2px 8px #0000001a}.color-preview .color-input{flex:1;padding:.75rem;border:2px solid #e5e7eb;border-radius:8px;font-family:Courier New,monospace;font-size:.875rem;font-weight:500;text-align:center;transition:border-color .2s ease}.color-preview .color-input:focus{outline:none;border-color:#667eea}.color-sliders{margin-bottom:1.5rem}.color-sliders .slider-group{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.75rem;margin-bottom:1rem}.color-sliders .slider-group label{font-size:.875rem;font-weight:500;color:#374151;min-width:90px}.color-sliders .slider-group .slider-value{font-size:.875rem;font-weight:600;color:#667eea;font-family:Courier New,monospace;min-width:45px;text-align:right}.color-sliders .slider{-webkit-appearance:none;width:100%;height:8px;border-radius:4px;outline:none;cursor:pointer}.color-sliders .slider::-webkit-slider-thumb{appearance:none;width:18px;height:18px;border-radius:50%;background:white;border:3px solid #667eea;cursor:pointer;box-shadow:0 2px 6px #0003;-webkit-transition:all .2s ease;transition:all .2s ease}.color-sliders .slider::-webkit-slider-thumb:hover{transform:scale(1.2)}.color-sliders .slider::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:white;border:3px solid #667eea;cursor:pointer;box-shadow:0 2px 6px #0003}.color-sliders .slider.hue-slider{background:linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(0,100%,50%))}.color-sliders .slider.saturation-slider{background:linear-gradient(to right,hsl(var(--hue, 240),0%,50%),var(--base-color, hsl(240, 100%, 50%)))}.color-sliders .slider.lightness-slider{background:linear-gradient(to right,hsl(var(--hue, 240),var(--sat, 100%),0%),var(--base-color, hsl(240, 100%, 50%)),hsl(var(--hue, 240),var(--sat, 100%),100%))}.color-sliders .slider.alpha-slider{background:linear-gradient(to right,transparent,currentColor),repeating-conic-gradient(#ccc 0% 25%,white 0% 50%) 0 0/10px 10px}.color-sliders .slider:disabled{opacity:.5;cursor:not-allowed}.palettes-section{margin-top:1.5rem;padding-top:1.5rem;border-top:2px solid #f3f4f6}.palettes-section .palette{margin-bottom:1.5rem}.palettes-section .palette:last-child{margin-bottom:0}.palettes-section .palette h4{font-size:.875rem;font-weight:600;color:#374151;margin-bottom:.75rem}.palettes-section .palette .palette-colors{display:grid;grid-template-columns:repeat(8,1fr);gap:.5rem}.palettes-section .palette .palette-colors .palette-color{width:100%;aspect-ratio:1;border:2px solid transparent;border-radius:6px;cursor:pointer;transition:all .2s ease}.palettes-section .palette .palette-colors .palette-color:hover{transform:scale(1.1);box-shadow:0 4px 12px #0003}.palettes-section .palette .palette-colors .palette-color.selected{border-color:#667eea;box-shadow:0 0 0 3px #667eea33}.palettes-section .palette .palette-colors .palette-color:disabled{opacity:.5;cursor:not-allowed}.gradient-section{margin-top:1.5rem;padding-top:1.5rem;border-top:2px solid #f3f4f6}.gradient-section h4{font-size:.875rem;font-weight:600;color:#374151;margin-bottom:1rem}.gradient-section .gradient-preview{height:100px;border-radius:12px;margin-bottom:1rem;box-shadow:0 4px 12px #0000001a}.gradient-section .gradient-controls .gradient-colors{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}.gradient-section .gradient-controls .gradient-colors .gradient-color-input{display:flex;flex-direction:column;gap:.5rem}.gradient-section .gradient-controls .gradient-colors .gradient-color-input label{font-size:.875rem;font-weight:500;color:#374151}.gradient-section .gradient-controls .gradient-colors .gradient-color-input input[type=color]{width:100%;height:40px;border:2px solid #e5e7eb;border-radius:8px;cursor:pointer}.gradient-section .gradient-controls .gradient-colors .gradient-color-input input[type=color]::-webkit-color-swatch-wrapper{padding:0}.gradient-section .gradient-controls .gradient-colors .gradient-color-input input[type=color]::-webkit-color-swatch{border:none;border-radius:6px}.gradient-section .gradient-controls .gradient-colors .gradient-color-input span{font-size:.75rem;font-family:Courier New,monospace;color:#6b7280;text-align:center}.gradient-section .gradient-controls .copy-btn{width:100%;padding:.75rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;transition:all .2s ease;margin-top:1rem}.gradient-section .gradient-controls .copy-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px #667eea66}.gradient-section .gradient-controls .copy-btn:active:not(:disabled){transform:translateY(0)}.gradient-section .gradient-controls .copy-btn:disabled{opacity:.5;cursor:not-allowed}\n"] }]
        }], propDecorators: { format: [{
                type: Input
            }], showPalettes: [{
                type: Input
            }], showGradient: [{
                type: Input
            }], customPalettes: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], showAlpha: [{
                type: Input
            }], inline: [{
                type: Input
            }], colorChange: [{
                type: Output
            }], formatChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ColorPickerComponent };
//# sourceMappingURL=muxima-ui-color-picker.mjs.map
