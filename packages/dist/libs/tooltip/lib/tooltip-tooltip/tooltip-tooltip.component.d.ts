import { ElementRef, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant = 'dark' | 'light' | 'primary' | 'success' | 'warning' | 'error';
export type TooltipSize = 'sm' | 'md' | 'lg';
export declare class TooltipComponent implements OnDestroy {
    private elementRef;
    text: string;
    position: TooltipPosition;
    variant: TooltipVariant;
    size: TooltipSize;
    disabled: boolean;
    delay: number;
    maxWidth: string;
    showArrow: boolean;
    visible: boolean;
    private showTimeout;
    private hideTimeout;
    constructor(elementRef: ElementRef);
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(): void;
    get tooltipClasses(): string[];
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipComponent, "muxima-tooltip", never, { "text": "text"; "position": "position"; "variant": "variant"; "size": "size"; "disabled": "disabled"; "delay": "delay"; "maxWidth": "maxWidth"; "showArrow": "showArrow"; }, {}, never, ["*"], true, never>;
}
