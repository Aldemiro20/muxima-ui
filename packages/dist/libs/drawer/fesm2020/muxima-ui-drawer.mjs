import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, HostListener } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

class DrawerService {
    constructor() {
        this.openDrawerSubject = new Subject();
        this.closeDrawerSubject = new Subject();
        this.openDrawer$ = this.openDrawerSubject.asObservable();
        this.closeDrawer$ = this.closeDrawerSubject.asObservable();
    }
    open(config = {}, content) {
        const afterClosed = new Subject();
        this.openDrawerSubject.next({ config, content });
        return {
            close: () => {
                this.closeDrawerSubject.next();
                afterClosed.complete();
            },
            afterClosed
        };
    }
    close() {
        this.closeDrawerSubject.next();
    }
}
DrawerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DrawerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class DrawerComponent {
    constructor(drawerService) {
        this.drawerService = drawerService;
        this.position = 'right';
        this.size = '400px';
        this.hasBackdrop = true;
        this.closeOnBackdropClick = true;
        this.closeOnEscape = true;
        this.isOpen = false;
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.subscriptions = [];
    }
    ngOnInit() {
        this.subscriptions.push(this.drawerService.openDrawer$.subscribe(({ config }) => {
            this.applyConfig(config);
            this.open();
        }), this.drawerService.closeDrawer$.subscribe(() => {
            this.close();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    onEscapeKey() {
        if (this.closeOnEscape && this.isOpen) {
            this.close();
        }
    }
    open() {
        this.isOpen = true;
        this.opened.emit();
        document.body.style.overflow = 'hidden';
    }
    close() {
        this.isOpen = false;
        this.closed.emit();
        document.body.style.overflow = '';
    }
    onBackdropClick() {
        if (this.closeOnBackdropClick) {
            this.close();
        }
    }
    applyConfig(config) {
        if (config.position)
            this.position = config.position;
        if (config.size)
            this.size = config.size;
        if (config.hasBackdrop !== undefined)
            this.hasBackdrop = config.hasBackdrop;
        if (config.closeOnBackdropClick !== undefined)
            this.closeOnBackdropClick = config.closeOnBackdropClick;
        if (config.closeOnEscape !== undefined)
            this.closeOnEscape = config.closeOnEscape;
    }
    getDrawerStyle() {
        const styles = {};
        switch (this.position) {
            case 'left':
                styles.left = '0';
                styles.top = '0';
                styles.bottom = '0';
                styles.width = this.size;
                break;
            case 'right':
                styles.right = '0';
                styles.top = '0';
                styles.bottom = '0';
                styles.width = this.size;
                break;
            case 'top':
                styles.left = '0';
                styles.right = '0';
                styles.top = '0';
                styles.height = this.size;
                break;
            case 'bottom':
                styles.left = '0';
                styles.right = '0';
                styles.bottom = '0';
                styles.height = this.size;
                break;
        }
        return styles;
    }
}
DrawerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerComponent, deps: [{ token: DrawerService }], target: i0.ɵɵFactoryTarget.Component });
DrawerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: DrawerComponent, isStandalone: true, selector: "muxima-drawer", inputs: { position: "position", size: "size", hasBackdrop: "hasBackdrop", closeOnBackdropClick: "closeOnBackdropClick", closeOnEscape: "closeOnEscape", isOpen: "isOpen" }, outputs: { opened: "opened", closed: "closed" }, host: { listeners: { "document:keydown.escape": "onEscapeKey()" } }, ngImport: i0, template: "<div class=\"drawer-container\" *ngIf=\"isOpen\">\r\n  <div \r\n    *ngIf=\"hasBackdrop\" \r\n    class=\"drawer-backdrop\" \r\n    (click)=\"onBackdropClick()\"\r\n    [@fadeIn]\r\n  ></div>\r\n\r\n  <div \r\n    class=\"drawer-panel\" \r\n    [class.position-left]=\"position === 'left'\"\r\n    [class.position-right]=\"position === 'right'\"\r\n    [class.position-top]=\"position === 'top'\"\r\n    [class.position-bottom]=\"position === 'bottom'\"\r\n    [ngStyle]=\"getDrawerStyle()\"\r\n    [@slideIn]=\"position\"\r\n  >\r\n    <div class=\"drawer-header\">\r\n      <ng-content select=\"[drawer-header]\"></ng-content>\r\n      \r\n      <button class=\"drawer-close\" (click)=\"close()\" aria-label=\"Close drawer\">\r\n        <svg viewBox=\"0 0 24 24\">\r\n          <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"drawer-content\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n\r\n    <div class=\"drawer-footer\">\r\n      <ng-content select=\"[drawer-footer]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".drawer-container{position:fixed;inset:0;z-index:9999;pointer-events:none}.drawer-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);pointer-events:all;animation:fadeIn .3s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.drawer-panel{position:absolute;background:white;box-shadow:0 20px 25px -5px #0000001a,0 10px 10px -5px #0000000a;display:flex;flex-direction:column;pointer-events:all;overflow:hidden}.drawer-panel.position-left{animation:slideInLeft .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-right{animation:slideInRight .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-top{animation:slideInTop .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-bottom{animation:slideInBottom .3s cubic-bezier(.4,0,.2,1)}@keyframes slideInLeft{0%{transform:translate(-100%)}to{transform:translate(0)}}@keyframes slideInRight{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes slideInTop{0%{transform:translateY(-100%)}to{transform:translateY(0)}}@keyframes slideInBottom{0%{transform:translateY(100%)}to{transform:translateY(0)}}.drawer-header{padding:24px;border-bottom:2px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,rgba(102,126,234,.05) 0%,rgba(118,75,162,.05) 100%);min-height:72px}.drawer-close{width:40px;height:40px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:all .2s ease}.drawer-close:hover{background:rgba(239,68,68,.1)}.drawer-close:hover svg{fill:#ef4444}.drawer-close svg{width:24px;height:24px;fill:#6b7280;transition:fill .2s ease}.drawer-content{flex:1;overflow-y:auto;padding:24px}.drawer-content::-webkit-scrollbar{width:8px}.drawer-content::-webkit-scrollbar-track{background:#f3f4f6}.drawer-content::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px}.drawer-footer{padding:24px;border-top:2px solid #e5e7eb;background:#f9fafb;min-height:72px}@media (max-width: 768px){.drawer-panel.position-left,.drawer-panel.position-right{width:85vw!important;max-width:400px}.drawer-panel.position-top,.drawer-panel.position-bottom{height:70vh!important;max-height:600px}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-drawer', standalone: true, imports: [CommonModule], template: "<div class=\"drawer-container\" *ngIf=\"isOpen\">\r\n  <div \r\n    *ngIf=\"hasBackdrop\" \r\n    class=\"drawer-backdrop\" \r\n    (click)=\"onBackdropClick()\"\r\n    [@fadeIn]\r\n  ></div>\r\n\r\n  <div \r\n    class=\"drawer-panel\" \r\n    [class.position-left]=\"position === 'left'\"\r\n    [class.position-right]=\"position === 'right'\"\r\n    [class.position-top]=\"position === 'top'\"\r\n    [class.position-bottom]=\"position === 'bottom'\"\r\n    [ngStyle]=\"getDrawerStyle()\"\r\n    [@slideIn]=\"position\"\r\n  >\r\n    <div class=\"drawer-header\">\r\n      <ng-content select=\"[drawer-header]\"></ng-content>\r\n      \r\n      <button class=\"drawer-close\" (click)=\"close()\" aria-label=\"Close drawer\">\r\n        <svg viewBox=\"0 0 24 24\">\r\n          <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"drawer-content\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n\r\n    <div class=\"drawer-footer\">\r\n      <ng-content select=\"[drawer-footer]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".drawer-container{position:fixed;inset:0;z-index:9999;pointer-events:none}.drawer-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);pointer-events:all;animation:fadeIn .3s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.drawer-panel{position:absolute;background:white;box-shadow:0 20px 25px -5px #0000001a,0 10px 10px -5px #0000000a;display:flex;flex-direction:column;pointer-events:all;overflow:hidden}.drawer-panel.position-left{animation:slideInLeft .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-right{animation:slideInRight .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-top{animation:slideInTop .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-bottom{animation:slideInBottom .3s cubic-bezier(.4,0,.2,1)}@keyframes slideInLeft{0%{transform:translate(-100%)}to{transform:translate(0)}}@keyframes slideInRight{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes slideInTop{0%{transform:translateY(-100%)}to{transform:translateY(0)}}@keyframes slideInBottom{0%{transform:translateY(100%)}to{transform:translateY(0)}}.drawer-header{padding:24px;border-bottom:2px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,rgba(102,126,234,.05) 0%,rgba(118,75,162,.05) 100%);min-height:72px}.drawer-close{width:40px;height:40px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:all .2s ease}.drawer-close:hover{background:rgba(239,68,68,.1)}.drawer-close:hover svg{fill:#ef4444}.drawer-close svg{width:24px;height:24px;fill:#6b7280;transition:fill .2s ease}.drawer-content{flex:1;overflow-y:auto;padding:24px}.drawer-content::-webkit-scrollbar{width:8px}.drawer-content::-webkit-scrollbar-track{background:#f3f4f6}.drawer-content::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px}.drawer-footer{padding:24px;border-top:2px solid #e5e7eb;background:#f9fafb;min-height:72px}@media (max-width: 768px){.drawer-panel.position-left,.drawer-panel.position-right{width:85vw!important;max-width:400px}.drawer-panel.position-top,.drawer-panel.position-bottom{height:70vh!important;max-height:600px}}\n"] }]
        }], ctorParameters: function () { return [{ type: DrawerService }]; }, propDecorators: { position: [{
                type: Input
            }], size: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], closeOnBackdropClick: [{
                type: Input
            }], closeOnEscape: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], opened: [{
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

export { DrawerComponent, DrawerService };
//# sourceMappingURL=muxima-ui-drawer.mjs.map
