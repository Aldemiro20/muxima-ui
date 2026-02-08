import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export interface SliderRangeValue {
    min: number;
    max: number;
}
export declare class SliderRangeComponent implements ControlValueAccessor {
    min: number;
    max: number;
    step: number;
    disabled: boolean;
    showTooltip: boolean;
    showTicks: boolean;
    ticksCount: number;
    rangeChange: EventEmitter<SliderRangeValue>;
    value: SliderRangeValue;
    isDraggingMin: boolean;
    isDraggingMax: boolean;
    private onChange;
    private onTouched;
    writeValue(value: SliderRangeValue): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    onMouseMove(event: MouseEvent): void;
    onMouseUp(): void;
    onMinMouseDown(): void;
    onMaxMouseDown(): void;
    getMinPosition(): number;
    getMaxPosition(): number;
    getTicks(): number[];
    getTickPosition(tickValue: number): number;
    private percentToValue;
    private emitValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<SliderRangeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SliderRangeComponent, "muxima-slider-range", never, { "min": "min"; "max": "max"; "step": "step"; "disabled": "disabled"; "showTooltip": "showTooltip"; "showTicks": "showTicks"; "ticksCount": "ticksCount"; }, { "rangeChange": "rangeChange"; }, never, never, true, never>;
}
