import * as i0 from '@angular/core';
import { Injectable, Component, Input } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

class DialogService {
    constructor() {
        this.dialogState = {};
    }
    getDialogSubject(id) {
        if (!this.dialogState[id]) {
            this.dialogState[id] = new BehaviorSubject(false);
        }
        return this.dialogState[id];
    }
    isOpen$(id) {
        return this.getDialogSubject(id).asObservable();
    }
    open(id) {
        this.getDialogSubject(id).next(true);
    }
    close(id) {
        this.getDialogSubject(id).next(false);
    }
}
DialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class DialogComponent {
    constructor(dialogService) {
        this.dialogService = dialogService;
        this.isOpen = false;
    }
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit() {
        this.dialogService.isOpen$(this.id).subscribe(state => {
            this.isOpen = state;
        });
    }
    close() {
        this.dialogService.close(this.id);
    }
}
DialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DialogComponent, deps: [{ token: DialogService }], target: i0.ɵɵFactoryTarget.Component });
DialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: DialogComponent, isStandalone: true, selector: "muxima-dialog", inputs: { id: "id", title: "title", subtitle: "subtitle", icon: "icon" }, ngImport: i0, template: "<div class=\"muxima--dialog-backdrop\" *ngIf=\"isOpen\">\r\n  <div class=\"muxima--dialog-content\">\r\n    <header class=\"muxima--dialog-header\">\r\n      <div class=\"muxima--dialog-header-left\">\r\n        <!-- <div *ngIf=\"icon\" class=\"muxima--dialog-header-icon\">\r\n          <ng-container *ngTemplateOutlet=\"icon\"></ng-container>\r\n        </div> -->\r\n\r\n        <div *ngIf=\"icon\" class=\"muxima--dialog-header-icon\">\r\n          <img [src]=\"icon\" alt=\"icon\" >\r\n        </div>\r\n        <div class=\"muxima-dialog-header-titles\">\r\n          <span class=\"muxima--dialog-title\">{{title}}</span>\r\n          <span *ngIf=\"subtitle\" class=\"muxima--dialog-subtitle\">{{subtitle}}</span>\r\n        </div>\r\n      </div>\r\n      <button class=\"close--btn\" (click)=\"close()\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#505151\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>\r\n      </button>\r\n    </header>\r\n\r\n    <div class=\"muxima--dialog-outlet\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n", styles: [".muxima--dialog-backdrop{position:fixed;width:100vw;height:100vh;inset:0;background:rgba(0,0,0,.4);overflow:hidden;z-index:1000}.muxima--dialog-content{position:relative;left:50%;top:50%;transform:translate(-50%,-50%);max-width:var(--modal-max-width, 760px);min-height:var(--modal-min-height, 480px);background-color:#fff;width:100%;padding:24px;margin:0 24px;z-index:50;display:flex;flex-direction:column}.muxima--dialog-header{display:flex;justify-content:space-between;padding-bottom:16px;border-bottom:2px solid #f1f1f1}.muxima-dialog-header-titles{display:flex;flex-direction:column}.muxima--dialog-title{font-family:Montserrat,sans-serif;font-weight:700;font-size:20px;color:#667085}.muxima--dialog-subtitle{font-family:Roboto,Inter,\"sans-serif\";font-size:14px;color:#667085;margin-top:4px}.muxima--dialog-header-icon{background-color:#f1f1f1;width:46px;height:46px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:100%}.muxima--dialog-header-icon>svg{width:20px;height:20px}.muxima--dialog-header-left{display:flex;align-items:center;gap:8px}.close--btn{display:flex;align-items:center;justify-content:center;background-color:#f1f1f1;border:none;width:32px;height:32px;flex-shrink:0;border-radius:100%;cursor:pointer}.muxima--dialog-outlet{flex:1;max-height:calc(80vh - 48px);overflow-y:auto}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-dialog', standalone: true, imports: [CommonModule], template: "<div class=\"muxima--dialog-backdrop\" *ngIf=\"isOpen\">\r\n  <div class=\"muxima--dialog-content\">\r\n    <header class=\"muxima--dialog-header\">\r\n      <div class=\"muxima--dialog-header-left\">\r\n        <!-- <div *ngIf=\"icon\" class=\"muxima--dialog-header-icon\">\r\n          <ng-container *ngTemplateOutlet=\"icon\"></ng-container>\r\n        </div> -->\r\n\r\n        <div *ngIf=\"icon\" class=\"muxima--dialog-header-icon\">\r\n          <img [src]=\"icon\" alt=\"icon\" >\r\n        </div>\r\n        <div class=\"muxima-dialog-header-titles\">\r\n          <span class=\"muxima--dialog-title\">{{title}}</span>\r\n          <span *ngIf=\"subtitle\" class=\"muxima--dialog-subtitle\">{{subtitle}}</span>\r\n        </div>\r\n      </div>\r\n      <button class=\"close--btn\" (click)=\"close()\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#505151\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>\r\n      </button>\r\n    </header>\r\n\r\n    <div class=\"muxima--dialog-outlet\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n", styles: [".muxima--dialog-backdrop{position:fixed;width:100vw;height:100vh;inset:0;background:rgba(0,0,0,.4);overflow:hidden;z-index:1000}.muxima--dialog-content{position:relative;left:50%;top:50%;transform:translate(-50%,-50%);max-width:var(--modal-max-width, 760px);min-height:var(--modal-min-height, 480px);background-color:#fff;width:100%;padding:24px;margin:0 24px;z-index:50;display:flex;flex-direction:column}.muxima--dialog-header{display:flex;justify-content:space-between;padding-bottom:16px;border-bottom:2px solid #f1f1f1}.muxima-dialog-header-titles{display:flex;flex-direction:column}.muxima--dialog-title{font-family:Montserrat,sans-serif;font-weight:700;font-size:20px;color:#667085}.muxima--dialog-subtitle{font-family:Roboto,Inter,\"sans-serif\";font-size:14px;color:#667085;margin-top:4px}.muxima--dialog-header-icon{background-color:#f1f1f1;width:46px;height:46px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:100%}.muxima--dialog-header-icon>svg{width:20px;height:20px}.muxima--dialog-header-left{display:flex;align-items:center;gap:8px}.close--btn{display:flex;align-items:center;justify-content:center;background-color:#f1f1f1;border:none;width:32px;height:32px;flex-shrink:0;border-radius:100%;cursor:pointer}.muxima--dialog-outlet{flex:1;max-height:calc(80vh - 48px);overflow-y:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: DialogService }]; }, propDecorators: { id: [{
                type: Input
            }], title: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], icon: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { DialogComponent, DialogService };
//# sourceMappingURL=muxima-ui-dialog.mjs.map
