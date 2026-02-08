import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class ToggleToggleComponent {
    constructor() {
        this.checked = false;
        this.disabled = false;
        this.size = 'md';
        this.color = 'primary';
        this.checkedChange = new EventEmitter();
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    toggle() {
        if (this.disabled)
            return;
        this.checked = !this.checked;
        this.onChange(this.checked);
        this.checkedChange.emit(this.checked);
    }
    writeValue(value) {
        this.checked = value;
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
}
ToggleToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToggleToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ToggleToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ToggleToggleComponent, isStandalone: true, selector: "muxima-toggle", inputs: { checked: "checked", disabled: "disabled", size: "size", color: "color", label: "label" }, outputs: { checkedChange: "checkedChange" }, providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleToggleComponent),
            multi: true
        }], ngImport: i0, template: "<label \n  class=\"muxima-toggle-container\"\n  [ngClass]=\"[\n    'muxima-toggle-' + size,\n    disabled ? 'muxima-toggle-disabled' : ''\n  ]\">\n  <div \n    class=\"muxima-toggle-switch\"\n    [ngClass]=\"[\n      'muxima-toggle-' + color,\n      checked ? 'muxima-toggle-checked' : ''\n    ]\"\n    (click)=\"toggle()\">\n    <div class=\"muxima-toggle-thumb\"></div>\n  </div>\n  <span *ngIf=\"label\" class=\"muxima-toggle-label\">{{ label }}</span>\n</label>\n", styles: [".muxima-toggle-container{display:inline-flex;align-items:center;gap:.75rem;cursor:pointer;-webkit-user-select:none;user-select:none;transition:all .2s ease}.muxima-toggle-container:hover:not(.muxima-toggle-disabled){transform:translateY(-1px)}.muxima-toggle-container.muxima-toggle-disabled{cursor:not-allowed;opacity:.5}.muxima-toggle-switch{position:relative;border-radius:9999px;background:linear-gradient(to right,#c3c8d0,#d1d5db);transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:inset 0 2px 4px #0000001a,0 1px 2px #0000000d}.muxima-toggle-sm .muxima-toggle-switch{width:2.75rem;height:1.375rem}.muxima-toggle-md .muxima-toggle-switch{width:3.25rem;height:1.625rem}.muxima-toggle-lg .muxima-toggle-switch{width:3.75rem;height:1.875rem}.muxima-toggle-thumb{position:absolute;top:50%;left:.1875rem;transform:translateY(-50%);background:linear-gradient(135deg,#ffffff 0%,#f9fafb 100%);border-radius:50%;box-shadow:0 2px 8px #00000026,0 1px 2px #0000001a,inset 0 1px #fffc;transition:all .3s cubic-bezier(.4,0,.2,1)}.muxima-toggle-sm .muxima-toggle-thumb{width:1rem;height:1rem}.muxima-toggle-md .muxima-toggle-thumb{width:1.25rem;height:1.25rem}.muxima-toggle-lg .muxima-toggle-thumb{width:1.5rem;height:1.5rem}.muxima-toggle-checked.muxima-toggle-primary{background:linear-gradient(135deg,#3B82F6 0%,#6366F1 50%,#8B5CF6 100%);box-shadow:0 4px 12px #3b82f666,inset 0 1px #fff3}.muxima-toggle-checked.muxima-toggle-success{background:linear-gradient(135deg,#10B981 0%,#22C55E 50%,#34D399 100%);box-shadow:0 4px 12px #22c55e66,inset 0 1px #fff3}.muxima-toggle-checked.muxima-toggle-warning{background:linear-gradient(135deg,#F59E0B 0%,#FBBF24 50%,#FCD34D 100%);box-shadow:0 4px 12px #f59e0b66,inset 0 1px #fff3}.muxima-toggle-checked.muxima-toggle-error{background:linear-gradient(135deg,#EF4444 0%,#F87171 50%,#FCA5A5 100%);box-shadow:0 4px 12px #ef444466,inset 0 1px #fff3}.muxima-toggle-checked .muxima-toggle-thumb{box-shadow:0 4px 12px #0003,0 2px 4px #0000001a,inset 0 1px #ffffffe6}.muxima-toggle-sm .muxima-toggle-checked .muxima-toggle-thumb{left:calc(100% - 1.1875rem)}.muxima-toggle-md .muxima-toggle-checked .muxima-toggle-thumb{left:calc(100% - 1.4375rem)}.muxima-toggle-lg .muxima-toggle-checked .muxima-toggle-thumb{left:calc(100% - 1.6875rem)}.muxima-toggle-label{font-size:.9375rem;color:#1f2937;font-weight:600;letter-spacing:.01em}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-switch{box-shadow:0 0 0 4px #3b82f61a,inset 0 2px 4px #0000001a,0 2px 8px #0000001a}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-checked.muxima-toggle-primary{box-shadow:0 0 0 4px #3b82f626,0 6px 16px #3b82f680,inset 0 1px #ffffff4d}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-checked.muxima-toggle-success{box-shadow:0 0 0 4px #22c55e26,0 6px 16px #22c55e80,inset 0 1px #ffffff4d}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-checked.muxima-toggle-warning{box-shadow:0 0 0 4px #f59e0b26,0 6px 16px #f59e0b80,inset 0 1px #ffffff4d}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-checked.muxima-toggle-error{box-shadow:0 0 0 4px #ef444426,0 6px 16px #ef444480,inset 0 1px #ffffff4d}.muxima-toggle-container:active:not(.muxima-toggle-disabled) .muxima-toggle-thumb{transform:translateY(-50%) scale(.95)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToggleToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-toggle', standalone: true, imports: [CommonModule], providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ToggleToggleComponent),
                            multi: true
                        }], template: "<label \n  class=\"muxima-toggle-container\"\n  [ngClass]=\"[\n    'muxima-toggle-' + size,\n    disabled ? 'muxima-toggle-disabled' : ''\n  ]\">\n  <div \n    class=\"muxima-toggle-switch\"\n    [ngClass]=\"[\n      'muxima-toggle-' + color,\n      checked ? 'muxima-toggle-checked' : ''\n    ]\"\n    (click)=\"toggle()\">\n    <div class=\"muxima-toggle-thumb\"></div>\n  </div>\n  <span *ngIf=\"label\" class=\"muxima-toggle-label\">{{ label }}</span>\n</label>\n", styles: [".muxima-toggle-container{display:inline-flex;align-items:center;gap:.75rem;cursor:pointer;-webkit-user-select:none;user-select:none;transition:all .2s ease}.muxima-toggle-container:hover:not(.muxima-toggle-disabled){transform:translateY(-1px)}.muxima-toggle-container.muxima-toggle-disabled{cursor:not-allowed;opacity:.5}.muxima-toggle-switch{position:relative;border-radius:9999px;background:linear-gradient(to right,#c3c8d0,#d1d5db);transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:inset 0 2px 4px #0000001a,0 1px 2px #0000000d}.muxima-toggle-sm .muxima-toggle-switch{width:2.75rem;height:1.375rem}.muxima-toggle-md .muxima-toggle-switch{width:3.25rem;height:1.625rem}.muxima-toggle-lg .muxima-toggle-switch{width:3.75rem;height:1.875rem}.muxima-toggle-thumb{position:absolute;top:50%;left:.1875rem;transform:translateY(-50%);background:linear-gradient(135deg,#ffffff 0%,#f9fafb 100%);border-radius:50%;box-shadow:0 2px 8px #00000026,0 1px 2px #0000001a,inset 0 1px #fffc;transition:all .3s cubic-bezier(.4,0,.2,1)}.muxima-toggle-sm .muxima-toggle-thumb{width:1rem;height:1rem}.muxima-toggle-md .muxima-toggle-thumb{width:1.25rem;height:1.25rem}.muxima-toggle-lg .muxima-toggle-thumb{width:1.5rem;height:1.5rem}.muxima-toggle-checked.muxima-toggle-primary{background:linear-gradient(135deg,#3B82F6 0%,#6366F1 50%,#8B5CF6 100%);box-shadow:0 4px 12px #3b82f666,inset 0 1px #fff3}.muxima-toggle-checked.muxima-toggle-success{background:linear-gradient(135deg,#10B981 0%,#22C55E 50%,#34D399 100%);box-shadow:0 4px 12px #22c55e66,inset 0 1px #fff3}.muxima-toggle-checked.muxima-toggle-warning{background:linear-gradient(135deg,#F59E0B 0%,#FBBF24 50%,#FCD34D 100%);box-shadow:0 4px 12px #f59e0b66,inset 0 1px #fff3}.muxima-toggle-checked.muxima-toggle-error{background:linear-gradient(135deg,#EF4444 0%,#F87171 50%,#FCA5A5 100%);box-shadow:0 4px 12px #ef444466,inset 0 1px #fff3}.muxima-toggle-checked .muxima-toggle-thumb{box-shadow:0 4px 12px #0003,0 2px 4px #0000001a,inset 0 1px #ffffffe6}.muxima-toggle-sm .muxima-toggle-checked .muxima-toggle-thumb{left:calc(100% - 1.1875rem)}.muxima-toggle-md .muxima-toggle-checked .muxima-toggle-thumb{left:calc(100% - 1.4375rem)}.muxima-toggle-lg .muxima-toggle-checked .muxima-toggle-thumb{left:calc(100% - 1.6875rem)}.muxima-toggle-label{font-size:.9375rem;color:#1f2937;font-weight:600;letter-spacing:.01em}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-switch{box-shadow:0 0 0 4px #3b82f61a,inset 0 2px 4px #0000001a,0 2px 8px #0000001a}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-checked.muxima-toggle-primary{box-shadow:0 0 0 4px #3b82f626,0 6px 16px #3b82f680,inset 0 1px #ffffff4d}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-checked.muxima-toggle-success{box-shadow:0 0 0 4px #22c55e26,0 6px 16px #22c55e80,inset 0 1px #ffffff4d}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-checked.muxima-toggle-warning{box-shadow:0 0 0 4px #f59e0b26,0 6px 16px #f59e0b80,inset 0 1px #ffffff4d}.muxima-toggle-container:hover:not(.muxima-toggle-disabled) .muxima-toggle-checked.muxima-toggle-error{box-shadow:0 0 0 4px #ef444426,0 6px 16px #ef444480,inset 0 1px #ffffff4d}.muxima-toggle-container:active:not(.muxima-toggle-disabled) .muxima-toggle-thumb{transform:translateY(-50%) scale(.95)}\n"] }]
        }], propDecorators: { checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }], label: [{
                type: Input
            }], checkedChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ToggleToggleComponent };
//# sourceMappingURL=muxima-ui-toggle.mjs.map
