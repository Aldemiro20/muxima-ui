import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output, HostListener } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class SliderRangeComponent {
    constructor() {
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.disabled = false;
        this.showTooltip = true;
        this.showTicks = false;
        this.ticksCount = 10;
        this.rangeChange = new EventEmitter();
        this.value = { min: 0, max: 100 };
        this.isDraggingMin = false;
        this.isDraggingMax = false;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        if (value) {
            this.value = value;
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
    onMouseMove(event) {
        if (this.disabled || (!this.isDraggingMin && !this.isDraggingMax))
            return;
        const slider = event.currentTarget;
        const sliderElement = document.querySelector('.slider-track');
        if (!sliderElement)
            return;
        const rect = sliderElement.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
        const value = this.percentToValue(percent);
        if (this.isDraggingMin) {
            this.value.min = Math.min(value, this.value.max - this.step);
        }
        else if (this.isDraggingMax) {
            this.value.max = Math.max(value, this.value.min + this.step);
        }
        this.emitValue();
    }
    onMouseUp() {
        if (this.isDraggingMin || this.isDraggingMax) {
            this.isDraggingMin = false;
            this.isDraggingMax = false;
            this.onTouched();
        }
    }
    onMinMouseDown() {
        if (!this.disabled) {
            this.isDraggingMin = true;
        }
    }
    onMaxMouseDown() {
        if (!this.disabled) {
            this.isDraggingMax = true;
        }
    }
    getMinPosition() {
        return ((this.value.min - this.min) / (this.max - this.min)) * 100;
    }
    getMaxPosition() {
        return ((this.value.max - this.min) / (this.max - this.min)) * 100;
    }
    getTicks() {
        const ticks = [];
        const tickStep = (this.max - this.min) / (this.ticksCount - 1);
        for (let i = 0; i < this.ticksCount; i++) {
            ticks.push(this.min + (tickStep * i));
        }
        return ticks;
    }
    getTickPosition(tickValue) {
        return ((tickValue - this.min) / (this.max - this.min)) * 100;
    }
    percentToValue(percent) {
        const value = this.min + ((percent / 100) * (this.max - this.min));
        return Math.round(value / this.step) * this.step;
    }
    emitValue() {
        this.onChange(this.value);
        this.rangeChange.emit(this.value);
    }
}
SliderRangeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SliderRangeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SliderRangeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SliderRangeComponent, isStandalone: true, selector: "muxima-slider-range", inputs: { min: "min", max: "max", step: "step", disabled: "disabled", showTooltip: "showTooltip", showTicks: "showTicks", ticksCount: "ticksCount" }, outputs: { rangeChange: "rangeChange" }, host: { listeners: { "document:mousemove": "onMouseMove($event)", "document:mouseup": "onMouseUp()" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SliderRangeComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"slider-range-wrapper\" [class.disabled]=\"disabled\">\r\n  <div class=\"slider-container\">\r\n    <div class=\"slider-track\">\r\n      <div \r\n        class=\"slider-range-fill\"\r\n        [style.left.%]=\"getMinPosition()\"\r\n        [style.width.%]=\"getMaxPosition() - getMinPosition()\"\r\n      ></div>\r\n\r\n      <div *ngIf=\"showTicks\" class=\"slider-ticks\">\r\n        <div\r\n          *ngFor=\"let tick of getTicks()\"\r\n          class=\"tick\"\r\n          [style.left.%]=\"getTickPosition(tick)\"\r\n        ></div>\r\n      </div>\r\n\r\n      <div \r\n        class=\"slider-thumb slider-thumb-min\"\r\n        [style.left.%]=\"getMinPosition()\"\r\n        (mousedown)=\"onMinMouseDown()\"\r\n        [class.dragging]=\"isDraggingMin\"\r\n      >\r\n        <div *ngIf=\"showTooltip\" class=\"thumb-tooltip\">\r\n          {{ value.min }}\r\n        </div>\r\n      </div>\r\n\r\n      <div \r\n        class=\"slider-thumb slider-thumb-max\"\r\n        [style.left.%]=\"getMaxPosition()\"\r\n        (mousedown)=\"onMaxMouseDown()\"\r\n        [class.dragging]=\"isDraggingMax\"\r\n      >\r\n        <div *ngIf=\"showTooltip\" class=\"thumb-tooltip\">\r\n          {{ value.max }}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"slider-labels\">\r\n    <span class=\"label-min\">{{ min }}</span>\r\n    <span class=\"label-max\">{{ max }}</span>\r\n  </div>\r\n</div>\r\n", styles: [".slider-range-wrapper{width:100%;padding:20px 0;-webkit-user-select:none;user-select:none}.slider-range-wrapper.disabled{opacity:.5;pointer-events:none}.slider-container{position:relative;padding:20px 0}.slider-track{position:relative;height:8px;background:#e5e7eb;border-radius:12px}.slider-range-fill{position:absolute;top:0;height:100%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px;transition:all .1s ease}.slider-ticks{position:absolute;top:0;left:0;right:0;height:100%}.tick{position:absolute;top:50%;transform:translate(-50%,-50%);width:2px;height:12px;background:white;border-radius:2px}.slider-thumb{position:absolute;top:50%;transform:translate(-50%,-50%);width:24px;height:24px;background:white;border:3px solid #667eea;border-radius:50%;cursor:grab;transition:all .2s ease;z-index:10}.slider-thumb:hover{transform:translate(-50%,-50%) scale(1.2);box-shadow:0 4px 12px #667eea66}.slider-thumb.dragging{cursor:grabbing;transform:translate(-50%,-50%) scale(1.3);box-shadow:0 6px 16px #667eea80;z-index:11}.slider-thumb.dragging .thumb-tooltip{opacity:1;transform:translate(-50%)}.thumb-tooltip{position:absolute;bottom:100%;left:50%;transform:translate(-50%,-10px);padding:6px 12px;background:#1f2937;color:#fff;font-size:13px;font-weight:600;border-radius:8px;white-space:nowrap;opacity:0;transition:all .2s ease;pointer-events:none}.thumb-tooltip:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);border:6px solid transparent;border-top-color:#1f2937}.slider-thumb:hover .thumb-tooltip{opacity:1;transform:translate(-50%)}.slider-labels{display:flex;justify-content:space-between;margin-top:12px;padding:0 12px}.label-min,.label-max{font-size:14px;font-weight:600;color:#6b7280}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SliderRangeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-slider-range', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SliderRangeComponent),
                            multi: true
                        }
                    ], template: "<div class=\"slider-range-wrapper\" [class.disabled]=\"disabled\">\r\n  <div class=\"slider-container\">\r\n    <div class=\"slider-track\">\r\n      <div \r\n        class=\"slider-range-fill\"\r\n        [style.left.%]=\"getMinPosition()\"\r\n        [style.width.%]=\"getMaxPosition() - getMinPosition()\"\r\n      ></div>\r\n\r\n      <div *ngIf=\"showTicks\" class=\"slider-ticks\">\r\n        <div\r\n          *ngFor=\"let tick of getTicks()\"\r\n          class=\"tick\"\r\n          [style.left.%]=\"getTickPosition(tick)\"\r\n        ></div>\r\n      </div>\r\n\r\n      <div \r\n        class=\"slider-thumb slider-thumb-min\"\r\n        [style.left.%]=\"getMinPosition()\"\r\n        (mousedown)=\"onMinMouseDown()\"\r\n        [class.dragging]=\"isDraggingMin\"\r\n      >\r\n        <div *ngIf=\"showTooltip\" class=\"thumb-tooltip\">\r\n          {{ value.min }}\r\n        </div>\r\n      </div>\r\n\r\n      <div \r\n        class=\"slider-thumb slider-thumb-max\"\r\n        [style.left.%]=\"getMaxPosition()\"\r\n        (mousedown)=\"onMaxMouseDown()\"\r\n        [class.dragging]=\"isDraggingMax\"\r\n      >\r\n        <div *ngIf=\"showTooltip\" class=\"thumb-tooltip\">\r\n          {{ value.max }}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"slider-labels\">\r\n    <span class=\"label-min\">{{ min }}</span>\r\n    <span class=\"label-max\">{{ max }}</span>\r\n  </div>\r\n</div>\r\n", styles: [".slider-range-wrapper{width:100%;padding:20px 0;-webkit-user-select:none;user-select:none}.slider-range-wrapper.disabled{opacity:.5;pointer-events:none}.slider-container{position:relative;padding:20px 0}.slider-track{position:relative;height:8px;background:#e5e7eb;border-radius:12px}.slider-range-fill{position:absolute;top:0;height:100%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px;transition:all .1s ease}.slider-ticks{position:absolute;top:0;left:0;right:0;height:100%}.tick{position:absolute;top:50%;transform:translate(-50%,-50%);width:2px;height:12px;background:white;border-radius:2px}.slider-thumb{position:absolute;top:50%;transform:translate(-50%,-50%);width:24px;height:24px;background:white;border:3px solid #667eea;border-radius:50%;cursor:grab;transition:all .2s ease;z-index:10}.slider-thumb:hover{transform:translate(-50%,-50%) scale(1.2);box-shadow:0 4px 12px #667eea66}.slider-thumb.dragging{cursor:grabbing;transform:translate(-50%,-50%) scale(1.3);box-shadow:0 6px 16px #667eea80;z-index:11}.slider-thumb.dragging .thumb-tooltip{opacity:1;transform:translate(-50%)}.thumb-tooltip{position:absolute;bottom:100%;left:50%;transform:translate(-50%,-10px);padding:6px 12px;background:#1f2937;color:#fff;font-size:13px;font-weight:600;border-radius:8px;white-space:nowrap;opacity:0;transition:all .2s ease;pointer-events:none}.thumb-tooltip:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);border:6px solid transparent;border-top-color:#1f2937}.slider-thumb:hover .thumb-tooltip{opacity:1;transform:translate(-50%)}.slider-labels{display:flex;justify-content:space-between;margin-top:12px;padding:0 12px}.label-min,.label-max{font-size:14px;font-weight:600;color:#6b7280}\n"] }]
        }], propDecorators: { min: [{
                type: Input
            }], max: [{
                type: Input
            }], step: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showTooltip: [{
                type: Input
            }], showTicks: [{
                type: Input
            }], ticksCount: [{
                type: Input
            }], rangeChange: [{
                type: Output
            }], onMouseMove: [{
                type: HostListener,
                args: ['document:mousemove', ['$event']]
            }], onMouseUp: [{
                type: HostListener,
                args: ['document:mouseup']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { SliderRangeComponent };
//# sourceMappingURL=muxima-ui-slider-range.mjs.map
