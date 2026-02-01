import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class StepperComponent {
    constructor() {
        this.steps = [];
        this.currentStep = 0;
        this.orientation = 'horizontal';
        this.clickable = true;
        this.stepChange = new EventEmitter();
    }
    isActive(index) {
        return this.currentStep === index;
    }
    isCompleted(index) {
        var _a;
        return index < this.currentStep || ((_a = this.steps[index]) === null || _a === void 0 ? void 0 : _a.completed) === true;
    }
    isDisabled(index) {
        var _a;
        return ((_a = this.steps[index]) === null || _a === void 0 ? void 0 : _a.disabled) === true;
    }
    goToStep(index) {
        if (!this.clickable || this.isDisabled(index)) {
            return;
        }
        this.currentStep = index;
        this.stepChange.emit(index);
    }
    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            const nextIndex = this.currentStep + 1;
            if (!this.isDisabled(nextIndex)) {
                this.currentStep = nextIndex;
                this.stepChange.emit(nextIndex);
            }
        }
    }
    previousStep() {
        if (this.currentStep > 0) {
            const prevIndex = this.currentStep - 1;
            if (!this.isDisabled(prevIndex)) {
                this.currentStep = prevIndex;
                this.stepChange.emit(prevIndex);
            }
        }
    }
    canGoNext() {
        return this.currentStep < this.steps.length - 1 &&
            !this.isDisabled(this.currentStep + 1);
    }
    canGoPrevious() {
        return this.currentStep > 0 &&
            !this.isDisabled(this.currentStep - 1);
    }
}
StepperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StepperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StepperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: StepperComponent, isStandalone: true, selector: "muxima-stepper", inputs: { steps: "steps", currentStep: "currentStep", orientation: "orientation", clickable: "clickable" }, outputs: { stepChange: "stepChange" }, ngImport: i0, template: "<div class=\"muxima-stepper\" [class.vertical]=\"orientation === 'vertical'\" [class.horizontal]=\"orientation === 'horizontal'\">\n  <div class=\"stepper-container\">\n    <div *ngFor=\"let step of steps; let i = index\" \n         class=\"step-wrapper\"\n         [class.active]=\"isActive(i)\"\n         [class.completed]=\"isCompleted(i)\"\n         [class.disabled]=\"isDisabled(i)\"\n         [class.clickable]=\"clickable && !isDisabled(i)\"\n         (click)=\"goToStep(i)\">\n      \n      <!-- Step Indicator -->\n      <div class=\"step-indicator\">\n        <div class=\"step-circle\">\n          <!-- Completed Icon -->\n          <svg *ngIf=\"isCompleted(i)\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" class=\"check-icon\">\n            <path d=\"M16.6668 5L7.50016 14.1667L3.3335 10\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n          \n          <!-- Step Number or Icon -->\n          <span *ngIf=\"!isCompleted(i)\" class=\"step-number\">\n            <span *ngIf=\"!step.icon\">{{ i + 1 }}</span>\n            <span *ngIf=\"step.icon\" class=\"step-icon\">{{ step.icon }}</span>\n          </span>\n        </div>\n        \n        <!-- Connector Line -->\n        <div *ngIf=\"i < steps.length - 1\" class=\"step-connector\"></div>\n      </div>\n      \n      <!-- Step Content -->\n      <div class=\"step-content\">\n        <div class=\"step-label\">{{ step.label }}</div>\n        <div *ngIf=\"step.description\" class=\"step-description\">{{ step.description }}</div>\n      </div>\n    </div>\n  </div>\n</div>\r\n", styles: [".muxima-stepper{width:100%}.stepper-container{display:flex;gap:0}.horizontal .stepper-container{flex-direction:row;align-items:flex-start}.horizontal .step-wrapper{flex:1;display:flex;flex-direction:column;align-items:center;position:relative}.horizontal .step-wrapper.clickable{cursor:pointer}.horizontal .step-wrapper:hover:not(.disabled) .step-circle{transform:scale(1.1)}.horizontal .step-indicator{display:flex;align-items:center;width:100%;margin-bottom:1rem}.horizontal .step-circle{margin:0 auto}.horizontal .step-connector{flex:1;height:3px;background:#e5e7eb;margin:0 1rem;transition:all .3s ease}.horizontal .step-wrapper.completed .step-connector,.horizontal .step-wrapper.active .step-connector{background:linear-gradient(90deg,#667eea 0%,#764ba2 100%)}.horizontal .step-content{text-align:center;width:100%}.vertical .stepper-container{flex-direction:column;align-items:stretch}.vertical .step-wrapper{display:flex;flex-direction:row;align-items:flex-start;gap:1.5rem;padding:1.5rem 0}.vertical .step-wrapper.clickable{cursor:pointer}.vertical .step-wrapper:hover:not(.disabled) .step-circle{transform:scale(1.1)}.vertical .step-indicator{display:flex;flex-direction:column;align-items:center;position:relative}.vertical .step-connector{width:3px;height:100%;min-height:40px;background:#e5e7eb;margin:.5rem 0;transition:all .3s ease}.vertical .step-wrapper.completed .step-connector,.vertical .step-wrapper.active .step-connector{background:linear-gradient(180deg,#667eea 0%,#764ba2 100%)}.vertical .step-content{flex:1;padding-top:.25rem}.step-circle{width:48px;height:48px;border-radius:50%;background:white;border:3px solid #e5e7eb;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.125rem;color:#9ca3af;transition:all .3s ease;flex-shrink:0;position:relative;z-index:1}.step-wrapper.active .step-circle{border-color:#667eea;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;box-shadow:0 8px 24px #667eea66;animation:pulse 1.5s ease-in-out infinite}.step-wrapper.completed .step-circle{border-color:#10b981;background:#10b981;color:#fff}.step-wrapper.disabled .step-circle{opacity:.4;cursor:not-allowed}.check-icon{animation:checkmark .3s ease-out}.step-number{display:flex;align-items:center;justify-content:center}.step-icon{font-size:1.5rem}.step-label{font-size:.95rem;font-weight:600;color:#4b5563;margin-bottom:.25rem;transition:color .3s ease}.step-wrapper.active .step-label{color:#667eea;font-weight:700}.step-wrapper.completed .step-label{color:#10b981}.step-wrapper.disabled .step-label{color:#d1d5db}.step-description{font-size:.875rem;color:#6b7280;line-height:1.4;transition:color .3s ease}.step-wrapper.disabled .step-description{color:#d1d5db}@keyframes pulse{0%,to{box-shadow:0 8px 24px #667eea66}50%{box-shadow:0 8px 32px #667eea99}}@keyframes checkmark{0%{transform:scale(0) rotate(-45deg)}50%{transform:scale(1.2) rotate(0)}to{transform:scale(1) rotate(0)}}@media (max-width: 768px){.horizontal .stepper-container{flex-direction:column}.horizontal .step-wrapper{flex-direction:row;align-items:flex-start;gap:1rem;padding:1rem 0}.horizontal .step-indicator{flex-direction:column}.horizontal .step-connector{width:3px!important;height:100%!important;min-height:30px;margin:.5rem 0!important}.horizontal .step-content{text-align:left!important;padding-top:.25rem}.horizontal .step-circle{margin:0!important}.step-circle{width:40px;height:40px;font-size:1rem}.step-icon{font-size:1.25rem}.step-label{font-size:.875rem}.step-description{font-size:.8125rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StepperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-stepper', standalone: true, imports: [CommonModule], template: "<div class=\"muxima-stepper\" [class.vertical]=\"orientation === 'vertical'\" [class.horizontal]=\"orientation === 'horizontal'\">\n  <div class=\"stepper-container\">\n    <div *ngFor=\"let step of steps; let i = index\" \n         class=\"step-wrapper\"\n         [class.active]=\"isActive(i)\"\n         [class.completed]=\"isCompleted(i)\"\n         [class.disabled]=\"isDisabled(i)\"\n         [class.clickable]=\"clickable && !isDisabled(i)\"\n         (click)=\"goToStep(i)\">\n      \n      <!-- Step Indicator -->\n      <div class=\"step-indicator\">\n        <div class=\"step-circle\">\n          <!-- Completed Icon -->\n          <svg *ngIf=\"isCompleted(i)\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" class=\"check-icon\">\n            <path d=\"M16.6668 5L7.50016 14.1667L3.3335 10\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n          \n          <!-- Step Number or Icon -->\n          <span *ngIf=\"!isCompleted(i)\" class=\"step-number\">\n            <span *ngIf=\"!step.icon\">{{ i + 1 }}</span>\n            <span *ngIf=\"step.icon\" class=\"step-icon\">{{ step.icon }}</span>\n          </span>\n        </div>\n        \n        <!-- Connector Line -->\n        <div *ngIf=\"i < steps.length - 1\" class=\"step-connector\"></div>\n      </div>\n      \n      <!-- Step Content -->\n      <div class=\"step-content\">\n        <div class=\"step-label\">{{ step.label }}</div>\n        <div *ngIf=\"step.description\" class=\"step-description\">{{ step.description }}</div>\n      </div>\n    </div>\n  </div>\n</div>\r\n", styles: [".muxima-stepper{width:100%}.stepper-container{display:flex;gap:0}.horizontal .stepper-container{flex-direction:row;align-items:flex-start}.horizontal .step-wrapper{flex:1;display:flex;flex-direction:column;align-items:center;position:relative}.horizontal .step-wrapper.clickable{cursor:pointer}.horizontal .step-wrapper:hover:not(.disabled) .step-circle{transform:scale(1.1)}.horizontal .step-indicator{display:flex;align-items:center;width:100%;margin-bottom:1rem}.horizontal .step-circle{margin:0 auto}.horizontal .step-connector{flex:1;height:3px;background:#e5e7eb;margin:0 1rem;transition:all .3s ease}.horizontal .step-wrapper.completed .step-connector,.horizontal .step-wrapper.active .step-connector{background:linear-gradient(90deg,#667eea 0%,#764ba2 100%)}.horizontal .step-content{text-align:center;width:100%}.vertical .stepper-container{flex-direction:column;align-items:stretch}.vertical .step-wrapper{display:flex;flex-direction:row;align-items:flex-start;gap:1.5rem;padding:1.5rem 0}.vertical .step-wrapper.clickable{cursor:pointer}.vertical .step-wrapper:hover:not(.disabled) .step-circle{transform:scale(1.1)}.vertical .step-indicator{display:flex;flex-direction:column;align-items:center;position:relative}.vertical .step-connector{width:3px;height:100%;min-height:40px;background:#e5e7eb;margin:.5rem 0;transition:all .3s ease}.vertical .step-wrapper.completed .step-connector,.vertical .step-wrapper.active .step-connector{background:linear-gradient(180deg,#667eea 0%,#764ba2 100%)}.vertical .step-content{flex:1;padding-top:.25rem}.step-circle{width:48px;height:48px;border-radius:50%;background:white;border:3px solid #e5e7eb;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.125rem;color:#9ca3af;transition:all .3s ease;flex-shrink:0;position:relative;z-index:1}.step-wrapper.active .step-circle{border-color:#667eea;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;box-shadow:0 8px 24px #667eea66;animation:pulse 1.5s ease-in-out infinite}.step-wrapper.completed .step-circle{border-color:#10b981;background:#10b981;color:#fff}.step-wrapper.disabled .step-circle{opacity:.4;cursor:not-allowed}.check-icon{animation:checkmark .3s ease-out}.step-number{display:flex;align-items:center;justify-content:center}.step-icon{font-size:1.5rem}.step-label{font-size:.95rem;font-weight:600;color:#4b5563;margin-bottom:.25rem;transition:color .3s ease}.step-wrapper.active .step-label{color:#667eea;font-weight:700}.step-wrapper.completed .step-label{color:#10b981}.step-wrapper.disabled .step-label{color:#d1d5db}.step-description{font-size:.875rem;color:#6b7280;line-height:1.4;transition:color .3s ease}.step-wrapper.disabled .step-description{color:#d1d5db}@keyframes pulse{0%,to{box-shadow:0 8px 24px #667eea66}50%{box-shadow:0 8px 32px #667eea99}}@keyframes checkmark{0%{transform:scale(0) rotate(-45deg)}50%{transform:scale(1.2) rotate(0)}to{transform:scale(1) rotate(0)}}@media (max-width: 768px){.horizontal .stepper-container{flex-direction:column}.horizontal .step-wrapper{flex-direction:row;align-items:flex-start;gap:1rem;padding:1rem 0}.horizontal .step-indicator{flex-direction:column}.horizontal .step-connector{width:3px!important;height:100%!important;min-height:30px;margin:.5rem 0!important}.horizontal .step-content{text-align:left!important;padding-top:.25rem}.horizontal .step-circle{margin:0!important}.step-circle{width:40px;height:40px;font-size:1rem}.step-icon{font-size:1.25rem}.step-label{font-size:.875rem}.step-description{font-size:.8125rem}}\n"] }]
        }], propDecorators: { steps: [{
                type: Input
            }], currentStep: [{
                type: Input
            }], orientation: [{
                type: Input
            }], clickable: [{
                type: Input
            }], stepChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { StepperComponent };
//# sourceMappingURL=agt-ui-stepper.mjs.map
