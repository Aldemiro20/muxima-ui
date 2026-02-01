import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export interface Step {
    label: string;
    description?: string;
    icon?: string;
    completed?: boolean;
    disabled?: boolean;
}
export declare class StepperComponent {
    steps: Step[];
    currentStep: number;
    orientation: 'horizontal' | 'vertical';
    clickable: boolean;
    stepChange: EventEmitter<number>;
    isActive(index: number): boolean;
    isCompleted(index: number): boolean;
    isDisabled(index: number): boolean;
    goToStep(index: number): void;
    nextStep(): void;
    previousStep(): void;
    canGoNext(): boolean;
    canGoPrevious(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StepperComponent, "muxima-stepper", never, { "steps": "steps"; "currentStep": "currentStep"; "orientation": "orientation"; "clickable": "clickable"; }, { "stepChange": "stepChange"; }, never, never, true, never>;
}
