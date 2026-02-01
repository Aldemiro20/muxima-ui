import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, HostListener } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

class ConfirmationDialogService {
    constructor() {
        this.openDialogSubject = new Subject();
        this.dialogResultSubject = new Subject();
        this.openDialog$ = this.openDialogSubject.asObservable();
        this.dialogResult$ = this.dialogResultSubject.asObservable();
    }
    confirm(config) {
        return new Promise((resolve) => {
            this.openDialogSubject.next(config);
            const subscription = this.dialogResult$.subscribe((result) => {
                resolve(result.confirmed);
                subscription.unsubscribe();
            });
        });
    }
    sendResult(confirmed) {
        this.dialogResultSubject.next({ confirmed });
    }
}
ConfirmationDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmationDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class ConfirmationDialogComponent {
    constructor(confirmationService) {
        this.confirmationService = confirmationService;
        this.title = 'Confirmar Ação';
        this.message = 'Tem certeza que deseja realizar esta ação?';
        this.variant = 'info';
        this.confirmText = 'Confirmar';
        this.cancelText = 'Cancelar';
        this.isOpen = false;
        this.confirmed = new EventEmitter();
        this.cancelled = new EventEmitter();
        this.closed = new EventEmitter();
    }
    ngOnInit() {
        this.subscription = this.confirmationService.openDialog$.subscribe((config) => {
            this.applyConfig(config);
            this.open();
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    onEscapeKey() {
        if (this.isOpen) {
            this.cancel();
        }
    }
    open() {
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }
    close() {
        this.isOpen = false;
        this.closed.emit();
        document.body.style.overflow = '';
    }
    confirm() {
        this.confirmed.emit();
        this.confirmationService.sendResult(true);
        this.close();
    }
    cancel() {
        this.cancelled.emit();
        this.confirmationService.sendResult(false);
        this.close();
    }
    applyConfig(config) {
        this.title = config.title;
        this.message = config.message;
        if (config.variant)
            this.variant = config.variant;
        if (config.confirmText)
            this.confirmText = config.confirmText;
        if (config.cancelText)
            this.cancelText = config.cancelText;
        if (config.icon)
            this.icon = config.icon;
    }
    getVariantIcon() {
        if (this.icon)
            return this.icon;
        switch (this.variant) {
            case 'danger':
                return '⚠️';
            case 'warning':
                return '⚡';
            case 'success':
                return '✅';
            case 'info':
            default:
                return 'ℹ️';
        }
    }
}
ConfirmationDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogComponent, deps: [{ token: ConfirmationDialogService }], target: i0.ɵɵFactoryTarget.Component });
ConfirmationDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ConfirmationDialogComponent, isStandalone: true, selector: "muxima-confirmation-dialog", inputs: { title: "title", message: "message", variant: "variant", confirmText: "confirmText", cancelText: "cancelText", icon: "icon", isOpen: "isOpen" }, outputs: { confirmed: "confirmed", cancelled: "cancelled", closed: "closed" }, host: { listeners: { "document:keydown.escape": "onEscapeKey()" } }, ngImport: i0, template: "<div class=\"confirmation-dialog-container\" *ngIf=\"isOpen\">\r\n  <div class=\"dialog-backdrop\" (click)=\"cancel()\"></div>\r\n\r\n  <div class=\"dialog-panel\" [class]=\"'variant-' + variant\">\r\n    <div class=\"dialog-icon\">\r\n      <span class=\"icon-emoji\">{{ getVariantIcon() }}</span>\r\n    </div>\r\n\r\n    <div class=\"dialog-header\">\r\n      <h2 class=\"dialog-title\">{{ title }}</h2>\r\n    </div>\r\n\r\n    <div class=\"dialog-content\">\r\n      <p class=\"dialog-message\">{{ message }}</p>\r\n    </div>\r\n\r\n    <div class=\"dialog-footer\">\r\n      <button class=\"btn btn-cancel\" (click)=\"cancel()\">\r\n        {{ cancelText }}\r\n      </button>\r\n      <button class=\"btn btn-confirm\" [class]=\"'btn-' + variant\" (click)=\"confirm()\">\r\n        {{ confirmText }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".confirmation-dialog-container{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px}.dialog-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);animation:fadeIn .2s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.dialog-panel{position:relative;background:white;border-radius:20px;box-shadow:0 25px 50px -12px #00000040;max-width:500px;width:100%;padding:32px;animation:scaleIn .3s cubic-bezier(.4,0,.2,1)}@keyframes scaleIn{0%{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}.dialog-icon{display:flex;align-items:center;justify-content:center;margin-bottom:24px}.dialog-icon .icon-emoji{font-size:64px;animation:bounceIn .5s cubic-bezier(.68,-.55,.265,1.55)}@keyframes bounceIn{0%{transform:scale(0)}50%{transform:scale(1.1)}to{transform:scale(1)}}.dialog-header{margin-bottom:16px;text-align:center}.dialog-title{font-size:28px;font-weight:800;color:#1f2937;margin:0}.dialog-content{margin-bottom:32px;text-align:center}.dialog-message{font-size:16px;line-height:1.6;color:#6b7280;margin:0}.dialog-footer{display:flex;gap:12px;justify-content:flex-end}.btn{padding:12px 24px;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:all .3s ease;outline:none}.btn:active{transform:scale(.95)}.btn-cancel{background:#f3f4f6;color:#6b7280}.btn-cancel:hover{background:#e5e7eb;color:#374151}.btn-confirm{color:#fff;min-width:120px}.btn-info{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);box-shadow:0 4px 12px #667eea66}.btn-info:hover{box-shadow:0 6px 16px #667eea80;transform:translateY(-2px)}.btn-success{background:linear-gradient(135deg,#10b981 0%,#059669 100%);box-shadow:0 4px 12px #10b98166}.btn-success:hover{box-shadow:0 6px 16px #10b98180;transform:translateY(-2px)}.btn-warning{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);box-shadow:0 4px 12px #f59e0b66}.btn-warning:hover{box-shadow:0 6px 16px #f59e0b80;transform:translateY(-2px)}.btn-danger{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);box-shadow:0 4px 12px #ef444466}.btn-danger:hover{box-shadow:0 6px 16px #ef444480;transform:translateY(-2px)}.variant-danger{border-top:4px solid #ef4444}.variant-warning{border-top:4px solid #f59e0b}.variant-success{border-top:4px solid #10b981}.variant-info{border-top:4px solid #667eea}@media (max-width: 640px){.dialog-panel{padding:24px}.dialog-icon .icon-emoji{font-size:48px}.dialog-title{font-size:24px}.dialog-message{font-size:14px}.dialog-footer{flex-direction:column-reverse}.dialog-footer .btn{width:100%}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-confirmation-dialog', standalone: true, imports: [CommonModule], template: "<div class=\"confirmation-dialog-container\" *ngIf=\"isOpen\">\r\n  <div class=\"dialog-backdrop\" (click)=\"cancel()\"></div>\r\n\r\n  <div class=\"dialog-panel\" [class]=\"'variant-' + variant\">\r\n    <div class=\"dialog-icon\">\r\n      <span class=\"icon-emoji\">{{ getVariantIcon() }}</span>\r\n    </div>\r\n\r\n    <div class=\"dialog-header\">\r\n      <h2 class=\"dialog-title\">{{ title }}</h2>\r\n    </div>\r\n\r\n    <div class=\"dialog-content\">\r\n      <p class=\"dialog-message\">{{ message }}</p>\r\n    </div>\r\n\r\n    <div class=\"dialog-footer\">\r\n      <button class=\"btn btn-cancel\" (click)=\"cancel()\">\r\n        {{ cancelText }}\r\n      </button>\r\n      <button class=\"btn btn-confirm\" [class]=\"'btn-' + variant\" (click)=\"confirm()\">\r\n        {{ confirmText }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".confirmation-dialog-container{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px}.dialog-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);animation:fadeIn .2s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.dialog-panel{position:relative;background:white;border-radius:20px;box-shadow:0 25px 50px -12px #00000040;max-width:500px;width:100%;padding:32px;animation:scaleIn .3s cubic-bezier(.4,0,.2,1)}@keyframes scaleIn{0%{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}.dialog-icon{display:flex;align-items:center;justify-content:center;margin-bottom:24px}.dialog-icon .icon-emoji{font-size:64px;animation:bounceIn .5s cubic-bezier(.68,-.55,.265,1.55)}@keyframes bounceIn{0%{transform:scale(0)}50%{transform:scale(1.1)}to{transform:scale(1)}}.dialog-header{margin-bottom:16px;text-align:center}.dialog-title{font-size:28px;font-weight:800;color:#1f2937;margin:0}.dialog-content{margin-bottom:32px;text-align:center}.dialog-message{font-size:16px;line-height:1.6;color:#6b7280;margin:0}.dialog-footer{display:flex;gap:12px;justify-content:flex-end}.btn{padding:12px 24px;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:all .3s ease;outline:none}.btn:active{transform:scale(.95)}.btn-cancel{background:#f3f4f6;color:#6b7280}.btn-cancel:hover{background:#e5e7eb;color:#374151}.btn-confirm{color:#fff;min-width:120px}.btn-info{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);box-shadow:0 4px 12px #667eea66}.btn-info:hover{box-shadow:0 6px 16px #667eea80;transform:translateY(-2px)}.btn-success{background:linear-gradient(135deg,#10b981 0%,#059669 100%);box-shadow:0 4px 12px #10b98166}.btn-success:hover{box-shadow:0 6px 16px #10b98180;transform:translateY(-2px)}.btn-warning{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);box-shadow:0 4px 12px #f59e0b66}.btn-warning:hover{box-shadow:0 6px 16px #f59e0b80;transform:translateY(-2px)}.btn-danger{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);box-shadow:0 4px 12px #ef444466}.btn-danger:hover{box-shadow:0 6px 16px #ef444480;transform:translateY(-2px)}.variant-danger{border-top:4px solid #ef4444}.variant-warning{border-top:4px solid #f59e0b}.variant-success{border-top:4px solid #10b981}.variant-info{border-top:4px solid #667eea}@media (max-width: 640px){.dialog-panel{padding:24px}.dialog-icon .icon-emoji{font-size:48px}.dialog-title{font-size:24px}.dialog-message{font-size:14px}.dialog-footer{flex-direction:column-reverse}.dialog-footer .btn{width:100%}}\n"] }]
        }], ctorParameters: function () { return [{ type: ConfirmationDialogService }]; }, propDecorators: { title: [{
                type: Input
            }], message: [{
                type: Input
            }], variant: [{
                type: Input
            }], confirmText: [{
                type: Input
            }], cancelText: [{
                type: Input
            }], icon: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], confirmed: [{
                type: Output
            }], cancelled: [{
                type: Output
            }], closed: [{
                type: Output
            }], onEscapeKey: [{
                type: HostListener,
                args: ['document:keydown.escape']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ConfirmationDialogComponent, ConfirmationDialogService };
//# sourceMappingURL=muxima-ui-confirmation-dialog.mjs.map
