import * as i0 from '@angular/core';
import { forwardRef, Component, Input } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

class AccordionComponent {
    constructor() {
        this.title = ''; // Title of the accordion
        this.subtitle = ''; // Subtitle of the accordion
        this.iconUrl = null;
        this.expanded = false; // Whether the accordion is expanded
        this.checked = false;
        this.disabled = false;
        this.size = 'sm';
        this.children = [];
        this.isChild = false;
        this.childLevel = 0;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    toggleCheck() {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onChange(this.checked); // Notify the form control of the change
            this.onTouched(); // Mark as touched
        }
    }
    toggleAccordion() {
        this.expanded = !this.expanded;
    }
    // ControlValueAccessor methods
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
    getPaddingClass() {
        if (!this.isChild || !this.expanded)
            return '';
        return `padding-level-${this.childLevel || 1}`;
    }
}
AccordionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AccordionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: AccordionComponent, isStandalone: true, selector: "muxima-accordion", inputs: { title: "title", subtitle: "subtitle", icon: "icon", iconUrl: "iconUrl", expanded: "expanded", checked: "checked", disabled: "disabled", size: "size", children: "children", isChild: "isChild", childLevel: "childLevel" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AccordionComponent),
            multi: true,
        },
    ], ngImport: i0, template: "<div class=\"custom-accordion\"  [ngClass]=\"{ 'child-accordion': isChild }\">\r\n\r\n  <div class=\"accordion-header\" (click)=\"toggleAccordion()\">\r\n    <div class=\"accordion-icon\" *ngIf=\"icon || iconUrl\">\r\n      <!-- \u00CDcone via Template -->\r\n      <ng-container *ngIf=\"icon\">\r\n        <ng-container *ngTemplateOutlet=\"icon\"></ng-container>\r\n      </ng-container>\r\n\r\n      <!-- \u00CDcone via URL -->\r\n      <img\r\n        *ngIf=\"iconUrl && !icon\"\r\n        [src]=\"iconUrl\"\r\n        class=\"accordion-icon-img\"\r\n        alt=\"\u00CDcone\"\r\n      \r\n      />\r\n    </div>\r\n\r\n    <div class=\"accordion-text\" >\r\n      <div class=\"accordion-title\">{{ title }}</div>\r\n      <div class=\"accordion-subtitle\" *ngIf=\"subtitle\" >{{ subtitle }}</div>\r\n    </div>\r\n    <div class=\"accordion-toggle\">\r\n      <svg\r\n        [ngClass]=\"{ expanded: expanded }\"\r\n        xmlns=\"http://www.w3.org/2000/svg\"\r\n        viewBox=\"0 0 24 24\"\r\n        fill=\"none\"\r\n        stroke=\"currentColor\"\r\n        stroke-width=\"2\"\r\n        stroke-linecap=\"round\"\r\n        stroke-linejoin=\"round\"\r\n        class=\"icon-chevron\"\r\n      >\r\n        <polyline points=\"9 6 15 12 9 18\"></polyline>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"accordion-content\" [@expandCollapse]=\"expanded ? 'expanded' : 'collapsed'\">\r\n    <ng-content *ngIf=\"!children || children.length === 0\"></ng-content>\r\n\r\n    <div *ngIf=\"children && children.length > 0\" class=\"accordion-children\"  [ngClass]=\"getPaddingClass()\">\r\n      <muxima-accordion\r\n        *ngFor=\"let child of children\"\r\n        [title]=\"child.title\"\r\n        [subtitle]=\"child.subtitle\"\r\n        [children]=\"child.children\"\r\n        [iconUrl]=\"child.iconUrl\"\r\n        [isChild]=\"true\"\r\n        [childLevel]=\"(childLevel || 0) + 2\"\r\n      >\r\n      </muxima-accordion>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: ["@import\"https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap\";.custom-accordion .padding-level-1 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-1 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-1 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-1 .custom-accordion.child-accordion .accordion-title{padding-left:24px!important}.custom-accordion .padding-level-2 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-2 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-2 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-2 .custom-accordion.child-accordion .accordion-title{padding-left:48px!important}.custom-accordion .padding-level-3 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-3 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-3 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-3 .custom-accordion.child-accordion .accordion-title{padding-left:72px!important}.custom-accordion .padding-level-4 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-4 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-4 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-4 .custom-accordion.child-accordion .accordion-title{padding-left:96px!important}.custom-accordion .padding-level-5 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-5 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-5 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-5 .custom-accordion.child-accordion .accordion-title{padding-left:120px!important}.custom-accordion.child-accordion{border:none;background-color:transparent}.custom-accordion.child-accordion .accordion-header{border:none;border-bottom:1px solid #eaecf0}.custom-accordion.child-accordion .accordion-icon,.custom-accordion.child-accordion .accordion-subtitle,.custom-accordion.child-accordion .accordion-title{padding-left:15px}.custom-accordion.child-accordion .accordion-content{border:none}.accordion-header{display:flex;padding:14px 24px;justify-content:space-between;align-items:center;align-self:stretch;border:1px solid var(--BlueGray-BlueGray-300, #cbd5e1);background:#fff;cursor:pointer;transition:all .2s ease;position:relative}.accordion-header:before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(135deg,#3B82F6,#8B5CF6);transition:width .3s ease}.accordion-header:hover{background:#fafbfc;border-color:#3b82f6}.accordion-header:hover:before{width:4px}.accordion-header:hover .icon-chevron{stroke:#3b82f6}.accordion-header:active{background:#f4f6f8}.accordion-icon{display:flex;width:40px;height:40px;justify-content:center;align-items:center;gap:8px;background:var(--50, #eef4ff);margin-right:8px}.accordion-icon-img{width:24px;height:24px;flex-shrink:0}.accordion-text{display:flex;flex-direction:column;align-items:flex-start;flex:1 0 0}.accordion-title{color:var(--gray-800, #1d2939);font-family:Montserrat,sans-serif!important;font-size:14px;font-style:normal;font-weight:600;line-height:150%;letter-spacing:-.14px}.accordion-subtitle{align-self:stretch;color:var(--gray-2, #6d7471);font-family:Roboto,sans-serif!important;font-size:12px;font-style:normal;font-weight:400;line-height:150%}.accordion-toggle{width:32px;height:32px;border-radius:50%;background-color:#f2f4f7;display:flex;align-items:center;justify-content:center;transition:background-color .2s ease,transform .3s ease}.accordion-toggle:hover{background-color:#e4e7ec}.icon-chevron{width:16px;height:16px;stroke:#667085;transition:transform .3s ease}.icon-chevron.expanded{transform:rotate(90deg)}.accordion-content{display:flex;flex-direction:column;padding:0;border-width:0px 1px 1px 1px;border-style:solid;border-color:var(--BlueGray-BlueGray-300, #cbd5e1);background:#fff}.accordion-content ::ng-deep>*{padding:16px 24px}.accordion-content ::ng-deep>*:first-child{padding-top:16px}.accordion-content ::ng-deep>*:last-child{padding-bottom:16px}.accordion-header.non-expandable{cursor:default}.accordion-header.non-expandable .accordion-toggle{display:none}\n"], dependencies: [{ kind: "component", type: AccordionComponent, selector: "muxima-accordion", inputs: ["title", "subtitle", "icon", "iconUrl", "expanded", "checked", "disabled", "size", "children", "isChild", "childLevel"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: FormsModule }], animations: [
        trigger('expandCollapse', [
            state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
            state('expanded', style({ height: '*', opacity: 1, overflow: 'hidden' })),
            transition('collapsed <=> expanded', [
                animate('300ms ease-in-out')
            ]),
        ]),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-accordion', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AccordionComponent),
                            multi: true,
                        },
                    ], animations: [
                        trigger('expandCollapse', [
                            state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
                            state('expanded', style({ height: '*', opacity: 1, overflow: 'hidden' })),
                            transition('collapsed <=> expanded', [
                                animate('300ms ease-in-out')
                            ]),
                        ]),
                    ], template: "<div class=\"custom-accordion\"  [ngClass]=\"{ 'child-accordion': isChild }\">\r\n\r\n  <div class=\"accordion-header\" (click)=\"toggleAccordion()\">\r\n    <div class=\"accordion-icon\" *ngIf=\"icon || iconUrl\">\r\n      <!-- \u00CDcone via Template -->\r\n      <ng-container *ngIf=\"icon\">\r\n        <ng-container *ngTemplateOutlet=\"icon\"></ng-container>\r\n      </ng-container>\r\n\r\n      <!-- \u00CDcone via URL -->\r\n      <img\r\n        *ngIf=\"iconUrl && !icon\"\r\n        [src]=\"iconUrl\"\r\n        class=\"accordion-icon-img\"\r\n        alt=\"\u00CDcone\"\r\n      \r\n      />\r\n    </div>\r\n\r\n    <div class=\"accordion-text\" >\r\n      <div class=\"accordion-title\">{{ title }}</div>\r\n      <div class=\"accordion-subtitle\" *ngIf=\"subtitle\" >{{ subtitle }}</div>\r\n    </div>\r\n    <div class=\"accordion-toggle\">\r\n      <svg\r\n        [ngClass]=\"{ expanded: expanded }\"\r\n        xmlns=\"http://www.w3.org/2000/svg\"\r\n        viewBox=\"0 0 24 24\"\r\n        fill=\"none\"\r\n        stroke=\"currentColor\"\r\n        stroke-width=\"2\"\r\n        stroke-linecap=\"round\"\r\n        stroke-linejoin=\"round\"\r\n        class=\"icon-chevron\"\r\n      >\r\n        <polyline points=\"9 6 15 12 9 18\"></polyline>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"accordion-content\" [@expandCollapse]=\"expanded ? 'expanded' : 'collapsed'\">\r\n    <ng-content *ngIf=\"!children || children.length === 0\"></ng-content>\r\n\r\n    <div *ngIf=\"children && children.length > 0\" class=\"accordion-children\"  [ngClass]=\"getPaddingClass()\">\r\n      <muxima-accordion\r\n        *ngFor=\"let child of children\"\r\n        [title]=\"child.title\"\r\n        [subtitle]=\"child.subtitle\"\r\n        [children]=\"child.children\"\r\n        [iconUrl]=\"child.iconUrl\"\r\n        [isChild]=\"true\"\r\n        [childLevel]=\"(childLevel || 0) + 2\"\r\n      >\r\n      </muxima-accordion>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: ["@import\"https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap\";.custom-accordion .padding-level-1 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-1 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-1 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-1 .custom-accordion.child-accordion .accordion-title{padding-left:24px!important}.custom-accordion .padding-level-2 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-2 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-2 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-2 .custom-accordion.child-accordion .accordion-title{padding-left:48px!important}.custom-accordion .padding-level-3 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-3 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-3 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-3 .custom-accordion.child-accordion .accordion-title{padding-left:72px!important}.custom-accordion .padding-level-4 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-4 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-4 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-4 .custom-accordion.child-accordion .accordion-title{padding-left:96px!important}.custom-accordion .padding-level-5 .custom-accordion.child-accordion .accordion-subtitle,.custom-accordion .padding-level-5 .custom-accordion.child-accordion .accordion-icon,.custom-accordion .padding-level-5 .custom-accordion.child-accordion .accordion-icon-img,.custom-accordion .padding-level-5 .custom-accordion.child-accordion .accordion-title{padding-left:120px!important}.custom-accordion.child-accordion{border:none;background-color:transparent}.custom-accordion.child-accordion .accordion-header{border:none;border-bottom:1px solid #eaecf0}.custom-accordion.child-accordion .accordion-icon,.custom-accordion.child-accordion .accordion-subtitle,.custom-accordion.child-accordion .accordion-title{padding-left:15px}.custom-accordion.child-accordion .accordion-content{border:none}.accordion-header{display:flex;padding:14px 24px;justify-content:space-between;align-items:center;align-self:stretch;border:1px solid var(--BlueGray-BlueGray-300, #cbd5e1);background:#fff;cursor:pointer;transition:all .2s ease;position:relative}.accordion-header:before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(135deg,#3B82F6,#8B5CF6);transition:width .3s ease}.accordion-header:hover{background:#fafbfc;border-color:#3b82f6}.accordion-header:hover:before{width:4px}.accordion-header:hover .icon-chevron{stroke:#3b82f6}.accordion-header:active{background:#f4f6f8}.accordion-icon{display:flex;width:40px;height:40px;justify-content:center;align-items:center;gap:8px;background:var(--50, #eef4ff);margin-right:8px}.accordion-icon-img{width:24px;height:24px;flex-shrink:0}.accordion-text{display:flex;flex-direction:column;align-items:flex-start;flex:1 0 0}.accordion-title{color:var(--gray-800, #1d2939);font-family:Montserrat,sans-serif!important;font-size:14px;font-style:normal;font-weight:600;line-height:150%;letter-spacing:-.14px}.accordion-subtitle{align-self:stretch;color:var(--gray-2, #6d7471);font-family:Roboto,sans-serif!important;font-size:12px;font-style:normal;font-weight:400;line-height:150%}.accordion-toggle{width:32px;height:32px;border-radius:50%;background-color:#f2f4f7;display:flex;align-items:center;justify-content:center;transition:background-color .2s ease,transform .3s ease}.accordion-toggle:hover{background-color:#e4e7ec}.icon-chevron{width:16px;height:16px;stroke:#667085;transition:transform .3s ease}.icon-chevron.expanded{transform:rotate(90deg)}.accordion-content{display:flex;flex-direction:column;padding:0;border-width:0px 1px 1px 1px;border-style:solid;border-color:var(--BlueGray-BlueGray-300, #cbd5e1);background:#fff}.accordion-content ::ng-deep>*{padding:16px 24px}.accordion-content ::ng-deep>*:first-child{padding-top:16px}.accordion-content ::ng-deep>*:last-child{padding-bottom:16px}.accordion-header.non-expandable{cursor:default}.accordion-header.non-expandable .accordion-toggle{display:none}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconUrl: [{
                type: Input
            }], expanded: [{
                type: Input
            }], checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], children: [{
                type: Input
            }], isChild: [{
                type: Input
            }], childLevel: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { AccordionComponent };
//# sourceMappingURL=muxima-ui-accordion.mjs.map
