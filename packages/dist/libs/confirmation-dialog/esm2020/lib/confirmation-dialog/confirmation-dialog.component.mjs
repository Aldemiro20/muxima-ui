import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./confirmation-dialog.service";
import * as i2 from "@angular/common";
export class ConfirmationDialogComponent {
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
ConfirmationDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogComponent, deps: [{ token: i1.ConfirmationDialogService }], target: i0.ɵɵFactoryTarget.Component });
ConfirmationDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ConfirmationDialogComponent, isStandalone: true, selector: "muxima-confirmation-dialog", inputs: { title: "title", message: "message", variant: "variant", confirmText: "confirmText", cancelText: "cancelText", icon: "icon", isOpen: "isOpen" }, outputs: { confirmed: "confirmed", cancelled: "cancelled", closed: "closed" }, host: { listeners: { "document:keydown.escape": "onEscapeKey()" } }, ngImport: i0, template: "<div class=\"confirmation-dialog-container\" *ngIf=\"isOpen\">\r\n  <div class=\"dialog-backdrop\" (click)=\"cancel()\"></div>\r\n\r\n  <div class=\"dialog-panel\" [class]=\"'variant-' + variant\">\r\n    <div class=\"dialog-icon\">\r\n      <span class=\"icon-emoji\">{{ getVariantIcon() }}</span>\r\n    </div>\r\n\r\n    <div class=\"dialog-header\">\r\n      <h2 class=\"dialog-title\">{{ title }}</h2>\r\n    </div>\r\n\r\n    <div class=\"dialog-content\">\r\n      <p class=\"dialog-message\">{{ message }}</p>\r\n    </div>\r\n\r\n    <div class=\"dialog-footer\">\r\n      <button class=\"btn btn-cancel\" (click)=\"cancel()\">\r\n        {{ cancelText }}\r\n      </button>\r\n      <button class=\"btn btn-confirm\" [class]=\"'btn-' + variant\" (click)=\"confirm()\">\r\n        {{ confirmText }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".confirmation-dialog-container{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px}.dialog-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);animation:fadeIn .2s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.dialog-panel{position:relative;background:white;border-radius:20px;box-shadow:0 25px 50px -12px #00000040;max-width:500px;width:100%;padding:32px;animation:scaleIn .3s cubic-bezier(.4,0,.2,1)}@keyframes scaleIn{0%{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}.dialog-icon{display:flex;align-items:center;justify-content:center;margin-bottom:24px}.dialog-icon .icon-emoji{font-size:64px;animation:bounceIn .5s cubic-bezier(.68,-.55,.265,1.55)}@keyframes bounceIn{0%{transform:scale(0)}50%{transform:scale(1.1)}to{transform:scale(1)}}.dialog-header{margin-bottom:16px;text-align:center}.dialog-title{font-size:28px;font-weight:800;color:#1f2937;margin:0}.dialog-content{margin-bottom:32px;text-align:center}.dialog-message{font-size:16px;line-height:1.6;color:#6b7280;margin:0}.dialog-footer{display:flex;gap:12px;justify-content:flex-end}.btn{padding:12px 24px;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:all .3s ease;outline:none}.btn:active{transform:scale(.95)}.btn-cancel{background:#f3f4f6;color:#6b7280}.btn-cancel:hover{background:#e5e7eb;color:#374151}.btn-confirm{color:#fff;min-width:120px}.btn-info{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);box-shadow:0 4px 12px #667eea66}.btn-info:hover{box-shadow:0 6px 16px #667eea80;transform:translateY(-2px)}.btn-success{background:linear-gradient(135deg,#10b981 0%,#059669 100%);box-shadow:0 4px 12px #10b98166}.btn-success:hover{box-shadow:0 6px 16px #10b98180;transform:translateY(-2px)}.btn-warning{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);box-shadow:0 4px 12px #f59e0b66}.btn-warning:hover{box-shadow:0 6px 16px #f59e0b80;transform:translateY(-2px)}.btn-danger{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);box-shadow:0 4px 12px #ef444466}.btn-danger:hover{box-shadow:0 6px 16px #ef444480;transform:translateY(-2px)}.variant-danger{border-top:4px solid #ef4444}.variant-warning{border-top:4px solid #f59e0b}.variant-success{border-top:4px solid #10b981}.variant-info{border-top:4px solid #667eea}@media (max-width: 640px){.dialog-panel{padding:24px}.dialog-icon .icon-emoji{font-size:48px}.dialog-title{font-size:24px}.dialog-message{font-size:14px}.dialog-footer{flex-direction:column-reverse}.dialog-footer .btn{width:100%}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-confirmation-dialog', standalone: true, imports: [CommonModule], template: "<div class=\"confirmation-dialog-container\" *ngIf=\"isOpen\">\r\n  <div class=\"dialog-backdrop\" (click)=\"cancel()\"></div>\r\n\r\n  <div class=\"dialog-panel\" [class]=\"'variant-' + variant\">\r\n    <div class=\"dialog-icon\">\r\n      <span class=\"icon-emoji\">{{ getVariantIcon() }}</span>\r\n    </div>\r\n\r\n    <div class=\"dialog-header\">\r\n      <h2 class=\"dialog-title\">{{ title }}</h2>\r\n    </div>\r\n\r\n    <div class=\"dialog-content\">\r\n      <p class=\"dialog-message\">{{ message }}</p>\r\n    </div>\r\n\r\n    <div class=\"dialog-footer\">\r\n      <button class=\"btn btn-cancel\" (click)=\"cancel()\">\r\n        {{ cancelText }}\r\n      </button>\r\n      <button class=\"btn btn-confirm\" [class]=\"'btn-' + variant\" (click)=\"confirm()\">\r\n        {{ confirmText }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".confirmation-dialog-container{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px}.dialog-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);animation:fadeIn .2s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.dialog-panel{position:relative;background:white;border-radius:20px;box-shadow:0 25px 50px -12px #00000040;max-width:500px;width:100%;padding:32px;animation:scaleIn .3s cubic-bezier(.4,0,.2,1)}@keyframes scaleIn{0%{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}.dialog-icon{display:flex;align-items:center;justify-content:center;margin-bottom:24px}.dialog-icon .icon-emoji{font-size:64px;animation:bounceIn .5s cubic-bezier(.68,-.55,.265,1.55)}@keyframes bounceIn{0%{transform:scale(0)}50%{transform:scale(1.1)}to{transform:scale(1)}}.dialog-header{margin-bottom:16px;text-align:center}.dialog-title{font-size:28px;font-weight:800;color:#1f2937;margin:0}.dialog-content{margin-bottom:32px;text-align:center}.dialog-message{font-size:16px;line-height:1.6;color:#6b7280;margin:0}.dialog-footer{display:flex;gap:12px;justify-content:flex-end}.btn{padding:12px 24px;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:all .3s ease;outline:none}.btn:active{transform:scale(.95)}.btn-cancel{background:#f3f4f6;color:#6b7280}.btn-cancel:hover{background:#e5e7eb;color:#374151}.btn-confirm{color:#fff;min-width:120px}.btn-info{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);box-shadow:0 4px 12px #667eea66}.btn-info:hover{box-shadow:0 6px 16px #667eea80;transform:translateY(-2px)}.btn-success{background:linear-gradient(135deg,#10b981 0%,#059669 100%);box-shadow:0 4px 12px #10b98166}.btn-success:hover{box-shadow:0 6px 16px #10b98180;transform:translateY(-2px)}.btn-warning{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);box-shadow:0 4px 12px #f59e0b66}.btn-warning:hover{box-shadow:0 6px 16px #f59e0b80;transform:translateY(-2px)}.btn-danger{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);box-shadow:0 4px 12px #ef444466}.btn-danger:hover{box-shadow:0 6px 16px #ef444480;transform:translateY(-2px)}.variant-danger{border-top:4px solid #ef4444}.variant-warning{border-top:4px solid #f59e0b}.variant-success{border-top:4px solid #10b981}.variant-info{border-top:4px solid #667eea}@media (max-width: 640px){.dialog-panel{padding:24px}.dialog-icon .icon-emoji{font-size:48px}.dialog-title{font-size:24px}.dialog-message{font-size:14px}.dialog-footer{flex-direction:column-reverse}.dialog-footer .btn{width:100%}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ConfirmationDialogService }]; }, propDecorators: { title: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9vdmVybGF5L2NvbmZpcm1hdGlvbi1kaWFsb2cvc3JjL2xpYi9jb25maXJtYXRpb24tZGlhbG9nL2NvbmZpcm1hdGlvbi1kaWFsb2cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vb3ZlcmxheS9jb25maXJtYXRpb24tZGlhbG9nL3NyYy9saWIvY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFXL0MsTUFBTSxPQUFPLDJCQUEyQjtJQWV0QyxZQUFvQixtQkFBOEM7UUFBOUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEyQjtRQWR6RCxVQUFLLEdBQUcsZ0JBQWdCLENBQUM7UUFDekIsWUFBTyxHQUFHLDRDQUE0QyxDQUFDO1FBQ3ZELFlBQU8sR0FBd0IsTUFBTSxDQUFDO1FBQ3RDLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzFCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFFeEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVkLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3JDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3JDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBSXlCLENBQUM7SUFFdEUsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUs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bEIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBa0JQLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2dTZXJ2aWNlLCBDb25maXJtYXRpb25Db25maWcsIENvbmZpcm1hdGlvblZhcmlhbnQgfSBmcm9tICcuL2NvbmZpcm1hdGlvbi1kaWFsb2cuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdXhpbWEtY29uZmlybWF0aW9uLWRpYWxvZycsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgdGl0bGUgPSAnQ29uZmlybWFyIEHDp8Ojbyc7XHJcbiAgQElucHV0KCkgbWVzc2FnZSA9ICdUZW0gY2VydGV6YSBxdWUgZGVzZWphIHJlYWxpemFyIGVzdGEgYcOnw6NvPyc7XHJcbiAgQElucHV0KCkgdmFyaWFudDogQ29uZmlybWF0aW9uVmFyaWFudCA9ICdpbmZvJztcclxuICBASW5wdXQoKSBjb25maXJtVGV4dCA9ICdDb25maXJtYXInO1xyXG4gIEBJbnB1dCgpIGNhbmNlbFRleHQgPSAnQ2FuY2VsYXInO1xyXG4gIEBJbnB1dCgpIGljb24/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaXNPcGVuID0gZmFsc2U7XHJcbiAgXHJcbiAgQE91dHB1dCgpIGNvbmZpcm1lZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICBAT3V0cHV0KCkgY2FuY2VsbGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG4gIEBPdXRwdXQoKSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgXHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlybWF0aW9uU2VydmljZTogQ29uZmlybWF0aW9uRGlhbG9nU2VydmljZSkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuY29uZmlybWF0aW9uU2VydmljZS5vcGVuRGlhbG9nJC5zdWJzY3JpYmUoKGNvbmZpZykgPT4ge1xyXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKGNvbmZpZyk7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5lc2NhcGUnKVxyXG4gIG9uRXNjYXBlS2V5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvcGVuKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gIH1cclxuXHJcbiAgY29uZmlybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29uZmlybWVkLmVtaXQoKTtcclxuICAgIHRoaXMuY29uZmlybWF0aW9uU2VydmljZS5zZW5kUmVzdWx0KHRydWUpO1xyXG4gICAgdGhpcy5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jYW5jZWxsZWQuZW1pdCgpO1xyXG4gICAgdGhpcy5jb25maXJtYXRpb25TZXJ2aWNlLnNlbmRSZXN1bHQoZmFsc2UpO1xyXG4gICAgdGhpcy5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseUNvbmZpZyhjb25maWc6IENvbmZpcm1hdGlvbkNvbmZpZyk6IHZvaWQge1xyXG4gICAgdGhpcy50aXRsZSA9IGNvbmZpZy50aXRsZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IGNvbmZpZy5tZXNzYWdlO1xyXG4gICAgaWYgKGNvbmZpZy52YXJpYW50KSB0aGlzLnZhcmlhbnQgPSBjb25maWcudmFyaWFudDtcclxuICAgIGlmIChjb25maWcuY29uZmlybVRleHQpIHRoaXMuY29uZmlybVRleHQgPSBjb25maWcuY29uZmlybVRleHQ7XHJcbiAgICBpZiAoY29uZmlnLmNhbmNlbFRleHQpIHRoaXMuY2FuY2VsVGV4dCA9IGNvbmZpZy5jYW5jZWxUZXh0O1xyXG4gICAgaWYgKGNvbmZpZy5pY29uKSB0aGlzLmljb24gPSBjb25maWcuaWNvbjtcclxuICB9XHJcblxyXG4gIGdldFZhcmlhbnRJY29uKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5pY29uKSByZXR1cm4gdGhpcy5pY29uO1xyXG4gICAgXHJcbiAgICBzd2l0Y2ggKHRoaXMudmFyaWFudCkge1xyXG4gICAgICBjYXNlICdkYW5nZXInOlxyXG4gICAgICAgIHJldHVybiAn4pqg77iPJztcclxuICAgICAgY2FzZSAnd2FybmluZyc6XHJcbiAgICAgICAgcmV0dXJuICfimqEnO1xyXG4gICAgICBjYXNlICdzdWNjZXNzJzpcclxuICAgICAgICByZXR1cm4gJ+KchSc7XHJcbiAgICAgIGNhc2UgJ2luZm8nOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiAn4oS577iPJztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImNvbmZpcm1hdGlvbi1kaWFsb2ctY29udGFpbmVyXCIgKm5nSWY9XCJpc09wZW5cIj5cclxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWJhY2tkcm9wXCIgKGNsaWNrKT1cImNhbmNlbCgpXCI+PC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctcGFuZWxcIiBbY2xhc3NdPVwiJ3ZhcmlhbnQtJyArIHZhcmlhbnRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctaWNvblwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImljb24tZW1vamlcIj57eyBnZXRWYXJpYW50SWNvbigpIH19PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZy1oZWFkZXJcIj5cclxuICAgICAgPGgyIGNsYXNzPVwiZGlhbG9nLXRpdGxlXCI+e3sgdGl0bGUgfX08L2gyPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250ZW50XCI+XHJcbiAgICAgIDxwIGNsYXNzPVwiZGlhbG9nLW1lc3NhZ2VcIj57eyBtZXNzYWdlIH19PC9wPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZy1mb290ZXJcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tY2FuY2VsXCIgKGNsaWNrKT1cImNhbmNlbCgpXCI+XHJcbiAgICAgICAge3sgY2FuY2VsVGV4dCB9fVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tY29uZmlybVwiIFtjbGFzc109XCInYnRuLScgKyB2YXJpYW50XCIgKGNsaWNrKT1cImNvbmZpcm0oKVwiPlxyXG4gICAgICAgIHt7IGNvbmZpcm1UZXh0IH19XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=