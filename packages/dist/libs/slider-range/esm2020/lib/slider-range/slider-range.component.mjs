import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SliderRangeComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLXJhbmdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2Zvcm0vc2xpZGVyLXJhbmdlL3NyYy9saWIvc2xpZGVyLXJhbmdlL3NsaWRlci1yYW5nZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mb3JtL3NsaWRlci1yYW5nZS9zcmMvbGliL3NsaWRlci1yYW5nZS9zbGlkZXItcmFuZ2UuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQXFCekUsTUFBTSxPQUFPLG9CQUFvQjtJQWRqQztRQWVXLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixRQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ1YsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBRWYsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUU3RCxVQUFLLEdBQXFCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFZCxhQUFRLEdBQXNDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN2RCxjQUFTLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFD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QUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2tIQTdHVSxvQkFBb0I7c0dBQXBCLG9CQUFvQiwwV0FScEI7UUFDVDtZQUNFLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUNuRCxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsMEJDckJILHc2Q0E4Q0Esa3hERGxDWSxZQUFZOzRGQVdYLG9CQUFvQjtrQkFkaEMsU0FBUzsrQkFDRSxxQkFBcUIsY0FDbkIsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLGFBR1o7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUM7NEJBQ25ELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGOzhCQUdRLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksV0FBVztzQkFBcEIsTUFBTTtnQkE0QlAsV0FBVztzQkFEVixZQUFZO3VCQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQXNCOUMsU0FBUztzQkFEUixZQUFZO3VCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTbGlkZXJSYW5nZVZhbHVlIHtcclxuICBtaW46IG51bWJlcjtcclxuICBtYXg6IG51bWJlcjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdXhpbWEtc2xpZGVyLXJhbmdlJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbGlkZXItcmFuZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NsaWRlci1yYW5nZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpZGVyUmFuZ2VDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNsaWRlclJhbmdlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIEBJbnB1dCgpIG1pbiA9IDA7XHJcbiAgQElucHV0KCkgbWF4ID0gMTAwO1xyXG4gIEBJbnB1dCgpIHN0ZXAgPSAxO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2hvd1Rvb2x0aXAgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNob3dUaWNrcyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRpY2tzQ291bnQgPSAxMDtcclxuICBcclxuICBAT3V0cHV0KCkgcmFuZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlclJhbmdlVmFsdWU+KCk7XHJcbiAgXHJcbiAgdmFsdWU6IFNsaWRlclJhbmdlVmFsdWUgPSB7IG1pbjogMCwgbWF4OiAxMDAgfTtcclxuICBpc0RyYWdnaW5nTWluID0gZmFsc2U7XHJcbiAgaXNEcmFnZ2luZ01heCA9IGZhbHNlO1xyXG4gIFxyXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogU2xpZGVyUmFuZ2VWYWx1ZSkgPT4gdm9pZCA9ICgpID0+IHt9O1xyXG4gIHByaXZhdGUgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IFNsaWRlclJhbmdlVmFsdWUpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcclxuICBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgKCF0aGlzLmlzRHJhZ2dpbmdNaW4gJiYgIXRoaXMuaXNEcmFnZ2luZ01heCkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBzbGlkZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3Qgc2xpZGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItdHJhY2snKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGlmICghc2xpZGVyRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHJlY3QgPSBzbGlkZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgcGVyY2VudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgKChldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIHJlY3Qud2lkdGgpICogMTAwKSk7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGVyY2VudFRvVmFsdWUocGVyY2VudCk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNEcmFnZ2luZ01pbikge1xyXG4gICAgICB0aGlzLnZhbHVlLm1pbiA9IE1hdGgubWluKHZhbHVlLCB0aGlzLnZhbHVlLm1heCAtIHRoaXMuc3RlcCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNEcmFnZ2luZ01heCkge1xyXG4gICAgICB0aGlzLnZhbHVlLm1heCA9IE1hdGgubWF4KHZhbHVlLCB0aGlzLnZhbHVlLm1pbiArIHRoaXMuc3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbWl0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNldXAnKVxyXG4gIG9uTW91c2VVcCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzRHJhZ2dpbmdNaW4gfHwgdGhpcy5pc0RyYWdnaW5nTWF4KSB7XHJcbiAgICAgIHRoaXMuaXNEcmFnZ2luZ01pbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmlzRHJhZ2dpbmdNYXggPSBmYWxzZTtcclxuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTWluTW91c2VEb3duKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuaXNEcmFnZ2luZ01pbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1heE1vdXNlRG93bigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmlzRHJhZ2dpbmdNYXggPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TWluUG9zaXRpb24oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiAoKHRoaXMudmFsdWUubWluIC0gdGhpcy5taW4pIC8gKHRoaXMubWF4IC0gdGhpcy5taW4pKSAqIDEwMDtcclxuICB9XHJcblxyXG4gIGdldE1heFBvc2l0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gKCh0aGlzLnZhbHVlLm1heCAtIHRoaXMubWluKSAvICh0aGlzLm1heCAtIHRoaXMubWluKSkgKiAxMDA7XHJcbiAgfVxyXG5cclxuICBnZXRUaWNrcygpOiBudW1iZXJbXSB7XHJcbiAgICBjb25zdCB0aWNrczogbnVtYmVyW10gPSBbXTtcclxuICAgIGNvbnN0IHRpY2tTdGVwID0gKHRoaXMubWF4IC0gdGhpcy5taW4pIC8gKHRoaXMudGlja3NDb3VudCAtIDEpO1xyXG4gICAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGlja3NDb3VudDsgaSsrKSB7XHJcbiAgICAgIHRpY2tzLnB1c2godGhpcy5taW4gKyAodGlja1N0ZXAgKiBpKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB0aWNrcztcclxuICB9XHJcblxyXG4gIGdldFRpY2tQb3NpdGlvbih0aWNrVmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gKCh0aWNrVmFsdWUgLSB0aGlzLm1pbikgLyAodGhpcy5tYXggLSB0aGlzLm1pbikpICogMTAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwZXJjZW50VG9WYWx1ZShwZXJjZW50OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLm1pbiArICgocGVyY2VudCAvIDEwMCkgKiAodGhpcy5tYXggLSB0aGlzLm1pbikpO1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbWl0VmFsdWUoKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgdGhpcy5yYW5nZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwic2xpZGVyLXJhbmdlLXdyYXBwZXJcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cclxuICA8ZGl2IGNsYXNzPVwic2xpZGVyLWNvbnRhaW5lclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInNsaWRlci10cmFja1wiPlxyXG4gICAgICA8ZGl2IFxyXG4gICAgICAgIGNsYXNzPVwic2xpZGVyLXJhbmdlLWZpbGxcIlxyXG4gICAgICAgIFtzdHlsZS5sZWZ0LiVdPVwiZ2V0TWluUG9zaXRpb24oKVwiXHJcbiAgICAgICAgW3N0eWxlLndpZHRoLiVdPVwiZ2V0TWF4UG9zaXRpb24oKSAtIGdldE1pblBvc2l0aW9uKClcIlxyXG4gICAgICA+PC9kaXY+XHJcblxyXG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd1RpY2tzXCIgY2xhc3M9XCJzbGlkZXItdGlja3NcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgdGljayBvZiBnZXRUaWNrcygpXCJcclxuICAgICAgICAgIGNsYXNzPVwidGlja1wiXHJcbiAgICAgICAgICBbc3R5bGUubGVmdC4lXT1cImdldFRpY2tQb3NpdGlvbih0aWNrKVwiXHJcbiAgICAgICAgPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgXHJcbiAgICAgICAgY2xhc3M9XCJzbGlkZXItdGh1bWIgc2xpZGVyLXRodW1iLW1pblwiXHJcbiAgICAgICAgW3N0eWxlLmxlZnQuJV09XCJnZXRNaW5Qb3NpdGlvbigpXCJcclxuICAgICAgICAobW91c2Vkb3duKT1cIm9uTWluTW91c2VEb3duKClcIlxyXG4gICAgICAgIFtjbGFzcy5kcmFnZ2luZ109XCJpc0RyYWdnaW5nTWluXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93VG9vbHRpcFwiIGNsYXNzPVwidGh1bWItdG9vbHRpcFwiPlxyXG4gICAgICAgICAge3sgdmFsdWUubWluIH19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBcclxuICAgICAgICBjbGFzcz1cInNsaWRlci10aHVtYiBzbGlkZXItdGh1bWItbWF4XCJcclxuICAgICAgICBbc3R5bGUubGVmdC4lXT1cImdldE1heFBvc2l0aW9uKClcIlxyXG4gICAgICAgIChtb3VzZWRvd24pPVwib25NYXhNb3VzZURvd24oKVwiXHJcbiAgICAgICAgW2NsYXNzLmRyYWdnaW5nXT1cImlzRHJhZ2dpbmdNYXhcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cInNob3dUb29sdGlwXCIgY2xhc3M9XCJ0aHVtYi10b29sdGlwXCI+XHJcbiAgICAgICAgICB7eyB2YWx1ZS5tYXggfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInNsaWRlci1sYWJlbHNcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwibGFiZWwtbWluXCI+e3sgbWluIH19PC9zcGFuPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJsYWJlbC1tYXhcIj57eyBtYXggfX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=