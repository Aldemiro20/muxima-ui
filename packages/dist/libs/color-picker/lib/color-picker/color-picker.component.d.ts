import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export interface ColorFormat {
    hex: string;
    rgb: {
        r: number;
        g: number;
        b: number;
    };
    hsl: {
        h: number;
        s: number;
        l: number;
    };
}
export interface ColorPalette {
    name: string;
    colors: string[];
}
export declare class ColorPickerComponent implements ControlValueAccessor, OnInit {
    format: 'hex' | 'rgb' | 'hsl';
    showPalettes: boolean;
    showGradient: boolean;
    customPalettes: ColorPalette[];
    disabled: boolean;
    size: 'small' | 'medium' | 'large';
    showAlpha: boolean;
    inline: boolean;
    colorChange: EventEmitter<ColorFormat>;
    formatChange: EventEmitter<"hex" | "rgb" | "hsl">;
    currentColor: string;
    isOpen: boolean;
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
    defaultPalettes: ColorPalette[];
    gradientStart: string;
    gradientEnd: string;
    gradientAngle: number;
    private onChange;
    private onTouched;
    ngOnInit(): void;
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    togglePicker(): void;
    closePicker(): void;
    onHueChange(event: Event): void;
    onSaturationChange(event: Event): void;
    onLightnessChange(event: Event): void;
    onAlphaChange(event: Event): void;
    selectPaletteColor(color: string): void;
    onHexInput(event: Event): void;
    updateColorFromHSL(): void;
    updateFromHex(hex: string): void;
    emitColor(): void;
    changeFormat(newFormat: 'hex' | 'rgb' | 'hsl'): void;
    getFormattedColor(): string;
    onGradientStartChange(color: string): void;
    onGradientEndChange(color: string): void;
    onGradientAngleChange(event: Event): void;
    getGradientStyle(): string;
    copyGradientCSS(): void;
    hexToRgb(hex: string): {
        r: number;
        g: number;
        b: number;
    } | null;
    rgbToHex(r: number, g: number, b: number): string;
    rgbToHsl(r: number, g: number, b: number): {
        h: number;
        s: number;
        l: number;
    };
    hslToRgb(h: number, s: number, l: number): {
        r: number;
        g: number;
        b: number;
    };
    isValidHex(hex: string): boolean;
    getPalettes(): ColorPalette[];
    asFormat(fmt: string): 'hex' | 'rgb' | 'hsl';
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColorPickerComponent, "muxima-color-picker", never, { "format": "format"; "showPalettes": "showPalettes"; "showGradient": "showGradient"; "customPalettes": "customPalettes"; "disabled": "disabled"; "size": "size"; "showAlpha": "showAlpha"; "inline": "inline"; }, { "colorChange": "colorChange"; "formatChange": "formatChange"; }, never, never, true, never>;
}
