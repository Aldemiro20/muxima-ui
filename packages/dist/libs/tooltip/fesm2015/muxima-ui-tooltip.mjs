import * as i0 from '@angular/core';
import { Component, Input, HostListener } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class TooltipComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.text = '';
        this.position = 'top';
        this.variant = 'dark';
        this.size = 'md';
        this.disabled = false;
        this.delay = 200;
        this.maxWidth = '250px';
        this.showArrow = true;
        this.visible = false;
    }
    onMouseEnter() {
        if (this.disabled || !this.text)
            return;
        clearTimeout(this.hideTimeout);
        this.showTimeout = setTimeout(() => {
            this.visible = true;
        }, this.delay);
    }
    onMouseLeave() {
        clearTimeout(this.showTimeout);
        this.hideTimeout = setTimeout(() => {
            this.visible = false;
        }, 100);
    }
    onClick() {
        if (this.disabled)
            return;
        this.visible = false;
    }
    get tooltipClasses() {
        const classes = ['muxima-tooltip'];
        classes.push(`muxima-tooltip--${this.position}`);
        classes.push(`muxima-tooltip--${this.variant}`);
        classes.push(`muxima-tooltip--${this.size}`);
        if (this.visible)
            classes.push('muxima-tooltip--visible');
        if (!this.showArrow)
            classes.push('muxima-tooltip--no-arrow');
        return classes;
    }
    ngOnDestroy() {
        clearTimeout(this.showTimeout);
        clearTimeout(this.hideTimeout);
    }
}
TooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TooltipComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
TooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TooltipComponent, isStandalone: true, selector: "muxima-tooltip", inputs: { text: "text", position: "position", variant: "variant", size: "size", disabled: "disabled", delay: "delay", maxWidth: "maxWidth", showArrow: "showArrow" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "click": "onClick()" } }, ngImport: i0, template: "<div class=\"muxima-tooltip-wrapper\">\n  <ng-content></ng-content>\n  \n  <div \n    [ngClass]=\"tooltipClasses\"\n    [style.max-width]=\"maxWidth\"\n    role=\"tooltip\">\n    <span class=\"muxima-tooltip-text\">{{ text }}</span>\n    <div class=\"muxima-tooltip-arrow\" *ngIf=\"showArrow\"></div>\n  </div>\n</div>\n", styles: [".muxima-tooltip-wrapper{position:relative;display:inline-block}.muxima-tooltip{position:absolute;z-index:10000;padding:.5rem .75rem;border-radius:8px;font-size:.875rem;line-height:1.4;font-weight:500;white-space:normal;word-wrap:break-word;pointer-events:none;opacity:0;visibility:hidden;transition:all .2s cubic-bezier(.4,0,.2,1);box-shadow:0 4px 12px #00000026;backdrop-filter:blur(8px)}.muxima-tooltip--visible{opacity:1;visibility:visible}.muxima-tooltip-text{display:block}.muxima-tooltip-arrow{position:absolute;width:8px;height:8px;transform:rotate(45deg)}.muxima-tooltip--top{bottom:calc(100% + 8px);left:50%;transform:translate(-50%) translateY(4px)}.muxima-tooltip--top .muxima-tooltip-arrow{bottom:-4px;left:50%;margin-left:-4px}.muxima-tooltip--top.muxima-tooltip--visible{transform:translate(-50%) translateY(0)}.muxima-tooltip--bottom{top:calc(100% + 8px);left:50%;transform:translate(-50%) translateY(-4px)}.muxima-tooltip--bottom .muxima-tooltip-arrow{top:-4px;left:50%;margin-left:-4px}.muxima-tooltip--bottom.muxima-tooltip--visible{transform:translate(-50%) translateY(0)}.muxima-tooltip--left{right:calc(100% + 8px);top:50%;transform:translateY(-50%) translate(4px)}.muxima-tooltip--left .muxima-tooltip-arrow{right:-4px;top:50%;margin-top:-4px}.muxima-tooltip--left.muxima-tooltip--visible{transform:translateY(-50%) translate(0)}.muxima-tooltip--right{left:calc(100% + 8px);top:50%;transform:translateY(-50%) translate(-4px)}.muxima-tooltip--right .muxima-tooltip-arrow{left:-4px;top:50%;margin-top:-4px}.muxima-tooltip--right.muxima-tooltip--visible{transform:translateY(-50%) translate(0)}.muxima-tooltip--dark{background:linear-gradient(135deg,#1f2937 0%,#374151 100%);color:#fff}.muxima-tooltip--dark .muxima-tooltip-arrow{background:#1f2937}.muxima-tooltip--light{background:#ffffff;color:#1f2937;border:1px solid #e5e7eb}.muxima-tooltip--light .muxima-tooltip-arrow{background:#ffffff;border-right:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb}.muxima-tooltip--primary{background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);color:#fff}.muxima-tooltip--primary .muxima-tooltip-arrow{background:#3b82f6}.muxima-tooltip--success{background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#fff}.muxima-tooltip--success .muxima-tooltip-arrow{background:#10b981}.muxima-tooltip--warning{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff}.muxima-tooltip--warning .muxima-tooltip-arrow{background:#f59e0b}.muxima-tooltip--error{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);color:#fff}.muxima-tooltip--error .muxima-tooltip-arrow{background:#ef4444}.muxima-tooltip--sm{padding:.375rem .625rem;font-size:.75rem;border-radius:6px}.muxima-tooltip--sm .muxima-tooltip-arrow{width:6px;height:6px}.muxima-tooltip--sm.muxima-tooltip--top .muxima-tooltip-arrow,.muxima-tooltip--sm.muxima-tooltip--bottom .muxima-tooltip-arrow{margin-left:-3px}.muxima-tooltip--sm.muxima-tooltip--left .muxima-tooltip-arrow,.muxima-tooltip--sm.muxima-tooltip--right .muxima-tooltip-arrow{margin-top:-3px}.muxima-tooltip--md{padding:.5rem .75rem;font-size:.875rem;border-radius:8px}.muxima-tooltip--lg{padding:.625rem .875rem;font-size:1rem;border-radius:10px}.muxima-tooltip--lg .muxima-tooltip-arrow{width:10px;height:10px}.muxima-tooltip--lg.muxima-tooltip--top .muxima-tooltip-arrow,.muxima-tooltip--lg.muxima-tooltip--bottom .muxima-tooltip-arrow{margin-left:-5px}.muxima-tooltip--lg.muxima-tooltip--left .muxima-tooltip-arrow,.muxima-tooltip--lg.muxima-tooltip--right .muxima-tooltip-arrow{margin-top:-5px}.muxima-tooltip--no-arrow .muxima-tooltip-arrow{display:none}@media (max-width: 640px){.muxima-tooltip{max-width:calc(100vw - 2rem)!important;font-size:.813rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-tooltip', standalone: true, imports: [CommonModule], template: "<div class=\"muxima-tooltip-wrapper\">\n  <ng-content></ng-content>\n  \n  <div \n    [ngClass]=\"tooltipClasses\"\n    [style.max-width]=\"maxWidth\"\n    role=\"tooltip\">\n    <span class=\"muxima-tooltip-text\">{{ text }}</span>\n    <div class=\"muxima-tooltip-arrow\" *ngIf=\"showArrow\"></div>\n  </div>\n</div>\n", styles: [".muxima-tooltip-wrapper{position:relative;display:inline-block}.muxima-tooltip{position:absolute;z-index:10000;padding:.5rem .75rem;border-radius:8px;font-size:.875rem;line-height:1.4;font-weight:500;white-space:normal;word-wrap:break-word;pointer-events:none;opacity:0;visibility:hidden;transition:all .2s cubic-bezier(.4,0,.2,1);box-shadow:0 4px 12px #00000026;backdrop-filter:blur(8px)}.muxima-tooltip--visible{opacity:1;visibility:visible}.muxima-tooltip-text{display:block}.muxima-tooltip-arrow{position:absolute;width:8px;height:8px;transform:rotate(45deg)}.muxima-tooltip--top{bottom:calc(100% + 8px);left:50%;transform:translate(-50%) translateY(4px)}.muxima-tooltip--top .muxima-tooltip-arrow{bottom:-4px;left:50%;margin-left:-4px}.muxima-tooltip--top.muxima-tooltip--visible{transform:translate(-50%) translateY(0)}.muxima-tooltip--bottom{top:calc(100% + 8px);left:50%;transform:translate(-50%) translateY(-4px)}.muxima-tooltip--bottom .muxima-tooltip-arrow{top:-4px;left:50%;margin-left:-4px}.muxima-tooltip--bottom.muxima-tooltip--visible{transform:translate(-50%) translateY(0)}.muxima-tooltip--left{right:calc(100% + 8px);top:50%;transform:translateY(-50%) translate(4px)}.muxima-tooltip--left .muxima-tooltip-arrow{right:-4px;top:50%;margin-top:-4px}.muxima-tooltip--left.muxima-tooltip--visible{transform:translateY(-50%) translate(0)}.muxima-tooltip--right{left:calc(100% + 8px);top:50%;transform:translateY(-50%) translate(-4px)}.muxima-tooltip--right .muxima-tooltip-arrow{left:-4px;top:50%;margin-top:-4px}.muxima-tooltip--right.muxima-tooltip--visible{transform:translateY(-50%) translate(0)}.muxima-tooltip--dark{background:linear-gradient(135deg,#1f2937 0%,#374151 100%);color:#fff}.muxima-tooltip--dark .muxima-tooltip-arrow{background:#1f2937}.muxima-tooltip--light{background:#ffffff;color:#1f2937;border:1px solid #e5e7eb}.muxima-tooltip--light .muxima-tooltip-arrow{background:#ffffff;border-right:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb}.muxima-tooltip--primary{background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);color:#fff}.muxima-tooltip--primary .muxima-tooltip-arrow{background:#3b82f6}.muxima-tooltip--success{background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#fff}.muxima-tooltip--success .muxima-tooltip-arrow{background:#10b981}.muxima-tooltip--warning{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff}.muxima-tooltip--warning .muxima-tooltip-arrow{background:#f59e0b}.muxima-tooltip--error{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);color:#fff}.muxima-tooltip--error .muxima-tooltip-arrow{background:#ef4444}.muxima-tooltip--sm{padding:.375rem .625rem;font-size:.75rem;border-radius:6px}.muxima-tooltip--sm .muxima-tooltip-arrow{width:6px;height:6px}.muxima-tooltip--sm.muxima-tooltip--top .muxima-tooltip-arrow,.muxima-tooltip--sm.muxima-tooltip--bottom .muxima-tooltip-arrow{margin-left:-3px}.muxima-tooltip--sm.muxima-tooltip--left .muxima-tooltip-arrow,.muxima-tooltip--sm.muxima-tooltip--right .muxima-tooltip-arrow{margin-top:-3px}.muxima-tooltip--md{padding:.5rem .75rem;font-size:.875rem;border-radius:8px}.muxima-tooltip--lg{padding:.625rem .875rem;font-size:1rem;border-radius:10px}.muxima-tooltip--lg .muxima-tooltip-arrow{width:10px;height:10px}.muxima-tooltip--lg.muxima-tooltip--top .muxima-tooltip-arrow,.muxima-tooltip--lg.muxima-tooltip--bottom .muxima-tooltip-arrow{margin-left:-5px}.muxima-tooltip--lg.muxima-tooltip--left .muxima-tooltip-arrow,.muxima-tooltip--lg.muxima-tooltip--right .muxima-tooltip-arrow{margin-top:-5px}.muxima-tooltip--no-arrow .muxima-tooltip-arrow{display:none}@media (max-width: 640px){.muxima-tooltip{max-width:calc(100vw - 2rem)!important;font-size:.813rem}}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { text: [{
                type: Input
            }], position: [{
                type: Input
            }], variant: [{
                type: Input
            }], size: [{
                type: Input
            }], disabled: [{
                type: Input
            }], delay: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], showArrow: [{
                type: Input
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TooltipComponent };
//# sourceMappingURL=muxima-ui-tooltip.mjs.map
