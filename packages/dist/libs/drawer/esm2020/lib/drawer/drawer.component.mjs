import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./drawer.service";
import * as i2 from "@angular/common";
export class DrawerComponent {
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
DrawerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerComponent, deps: [{ token: i1.DrawerService }], target: i0.ɵɵFactoryTarget.Component });
DrawerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: DrawerComponent, isStandalone: true, selector: "muxima-drawer", inputs: { position: "position", size: "size", hasBackdrop: "hasBackdrop", closeOnBackdropClick: "closeOnBackdropClick", closeOnEscape: "closeOnEscape", isOpen: "isOpen" }, outputs: { opened: "opened", closed: "closed" }, host: { listeners: { "document:keydown.escape": "onEscapeKey()" } }, ngImport: i0, template: "<div class=\"drawer-container\" *ngIf=\"isOpen\">\r\n  <div \r\n    *ngIf=\"hasBackdrop\" \r\n    class=\"drawer-backdrop\" \r\n    (click)=\"onBackdropClick()\"\r\n    [@fadeIn]\r\n  ></div>\r\n\r\n  <div \r\n    class=\"drawer-panel\" \r\n    [class.position-left]=\"position === 'left'\"\r\n    [class.position-right]=\"position === 'right'\"\r\n    [class.position-top]=\"position === 'top'\"\r\n    [class.position-bottom]=\"position === 'bottom'\"\r\n    [ngStyle]=\"getDrawerStyle()\"\r\n    [@slideIn]=\"position\"\r\n  >\r\n    <div class=\"drawer-header\">\r\n      <ng-content select=\"[drawer-header]\"></ng-content>\r\n      \r\n      <button class=\"drawer-close\" (click)=\"close()\" aria-label=\"Close drawer\">\r\n        <svg viewBox=\"0 0 24 24\">\r\n          <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"drawer-content\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n\r\n    <div class=\"drawer-footer\">\r\n      <ng-content select=\"[drawer-footer]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".drawer-container{position:fixed;inset:0;z-index:9999;pointer-events:none}.drawer-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);pointer-events:all;animation:fadeIn .3s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.drawer-panel{position:absolute;background:white;box-shadow:0 20px 25px -5px #0000001a,0 10px 10px -5px #0000000a;display:flex;flex-direction:column;pointer-events:all;overflow:hidden}.drawer-panel.position-left{animation:slideInLeft .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-right{animation:slideInRight .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-top{animation:slideInTop .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-bottom{animation:slideInBottom .3s cubic-bezier(.4,0,.2,1)}@keyframes slideInLeft{0%{transform:translate(-100%)}to{transform:translate(0)}}@keyframes slideInRight{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes slideInTop{0%{transform:translateY(-100%)}to{transform:translateY(0)}}@keyframes slideInBottom{0%{transform:translateY(100%)}to{transform:translateY(0)}}.drawer-header{padding:24px;border-bottom:2px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,rgba(102,126,234,.05) 0%,rgba(118,75,162,.05) 100%);min-height:72px}.drawer-close{width:40px;height:40px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:all .2s ease}.drawer-close:hover{background:rgba(239,68,68,.1)}.drawer-close:hover svg{fill:#ef4444}.drawer-close svg{width:24px;height:24px;fill:#6b7280;transition:fill .2s ease}.drawer-content{flex:1;overflow-y:auto;padding:24px}.drawer-content::-webkit-scrollbar{width:8px}.drawer-content::-webkit-scrollbar-track{background:#f3f4f6}.drawer-content::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px}.drawer-footer{padding:24px;border-top:2px solid #e5e7eb;background:#f9fafb;min-height:72px}@media (max-width: 768px){.drawer-panel.position-left,.drawer-panel.position-right{width:85vw!important;max-width:400px}.drawer-panel.position-top,.drawer-panel.position-bottom{height:70vh!important;max-height:600px}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-drawer', standalone: true, imports: [CommonModule], template: "<div class=\"drawer-container\" *ngIf=\"isOpen\">\r\n  <div \r\n    *ngIf=\"hasBackdrop\" \r\n    class=\"drawer-backdrop\" \r\n    (click)=\"onBackdropClick()\"\r\n    [@fadeIn]\r\n  ></div>\r\n\r\n  <div \r\n    class=\"drawer-panel\" \r\n    [class.position-left]=\"position === 'left'\"\r\n    [class.position-right]=\"position === 'right'\"\r\n    [class.position-top]=\"position === 'top'\"\r\n    [class.position-bottom]=\"position === 'bottom'\"\r\n    [ngStyle]=\"getDrawerStyle()\"\r\n    [@slideIn]=\"position\"\r\n  >\r\n    <div class=\"drawer-header\">\r\n      <ng-content select=\"[drawer-header]\"></ng-content>\r\n      \r\n      <button class=\"drawer-close\" (click)=\"close()\" aria-label=\"Close drawer\">\r\n        <svg viewBox=\"0 0 24 24\">\r\n          <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\r\n        </svg>\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"drawer-content\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n\r\n    <div class=\"drawer-footer\">\r\n      <ng-content select=\"[drawer-footer]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".drawer-container{position:fixed;inset:0;z-index:9999;pointer-events:none}.drawer-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);pointer-events:all;animation:fadeIn .3s ease}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.drawer-panel{position:absolute;background:white;box-shadow:0 20px 25px -5px #0000001a,0 10px 10px -5px #0000000a;display:flex;flex-direction:column;pointer-events:all;overflow:hidden}.drawer-panel.position-left{animation:slideInLeft .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-right{animation:slideInRight .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-top{animation:slideInTop .3s cubic-bezier(.4,0,.2,1)}.drawer-panel.position-bottom{animation:slideInBottom .3s cubic-bezier(.4,0,.2,1)}@keyframes slideInLeft{0%{transform:translate(-100%)}to{transform:translate(0)}}@keyframes slideInRight{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes slideInTop{0%{transform:translateY(-100%)}to{transform:translateY(0)}}@keyframes slideInBottom{0%{transform:translateY(100%)}to{transform:translateY(0)}}.drawer-header{padding:24px;border-bottom:2px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,rgba(102,126,234,.05) 0%,rgba(118,75,162,.05) 100%);min-height:72px}.drawer-close{width:40px;height:40px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:all .2s ease}.drawer-close:hover{background:rgba(239,68,68,.1)}.drawer-close:hover svg{fill:#ef4444}.drawer-close svg{width:24px;height:24px;fill:#6b7280;transition:fill .2s ease}.drawer-content{flex:1;overflow-y:auto;padding:24px}.drawer-content::-webkit-scrollbar{width:8px}.drawer-content::-webkit-scrollbar-track{background:#f3f4f6}.drawer-content::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px}.drawer-footer{padding:24px;border-top:2px solid #e5e7eb;background:#f9fafb;min-height:72px}@media (max-width: 768px){.drawer-panel.position-left,.drawer-panel.position-right{width:85vw!important;max-width:400px}.drawer-panel.position-top,.drawer-panel.position-bottom{height:70vh!important;max-height:600px}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DrawerService }]; }, propDecorators: { position: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL292ZXJsYXkvZHJhd2VyL3NyYy9saWIvZHJhd2VyL2RyYXdlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9vdmVybGF5L2RyYXdlci9zcmMvbGliL2RyYXdlci9kcmF3ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQVcvQyxNQUFNLE9BQU8sZUFBZTtJQWExQixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVp2QyxhQUFRLEdBQXdDLE9BQU8sQ0FBQztRQUN4RCxTQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIseUJBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQzVCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNsQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUVwQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFFUSxDQUFDO0lBRXBELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFD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LENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO2dCQUNwQixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE1BQU07U0FDVDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OzZHQS9GVSxlQUFlO2lHQUFmLGVBQWUsMldDWjVCLDhwQ0FvQ0EsbXVFRDVCWSxZQUFZOzRGQUlYLGVBQWU7a0JBUDNCLFNBQVM7K0JBQ0UsZUFBZSxjQUNiLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQztvR0FLZCxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQXVCUCxXQUFXO3NCQURWLFlBQVk7dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSwgRHJhd2VyQ29uZmlnIH0gZnJvbSAnLi9kcmF3ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdXhpbWEtZHJhd2VyJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kcmF3ZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2RyYXdlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEcmF3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgcG9zaXRpb246ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wJyB8ICdib3R0b20nID0gJ3JpZ2h0JztcclxuICBASW5wdXQoKSBzaXplID0gJzQwMHB4JztcclxuICBASW5wdXQoKSBoYXNCYWNrZHJvcCA9IHRydWU7XHJcbiAgQElucHV0KCkgY2xvc2VPbkJhY2tkcm9wQ2xpY2sgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGNsb3NlT25Fc2NhcGUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGlzT3BlbiA9IGZhbHNlO1xyXG4gIFxyXG4gIEBPdXRwdXQoKSBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICBcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHJhd2VyU2VydmljZTogRHJhd2VyU2VydmljZSkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5kcmF3ZXJTZXJ2aWNlLm9wZW5EcmF3ZXIkLnN1YnNjcmliZSgoeyBjb25maWcgfSkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwbHlDb25maWcoY29uZmlnKTtcclxuICAgICAgICB0aGlzLm9wZW4oKTtcclxuICAgICAgfSksXHJcbiAgICAgIHRoaXMuZHJhd2VyU2VydmljZS5jbG9zZURyYXdlciQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5lc2NhcGUnKVxyXG4gIG9uRXNjYXBlS2V5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY2xvc2VPbkVzY2FwZSAmJiB0aGlzLmlzT3Blbikge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvcGVuKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gIH1cclxuXHJcbiAgb25CYWNrZHJvcENsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY2xvc2VPbkJhY2tkcm9wQ2xpY2spIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseUNvbmZpZyhjb25maWc6IERyYXdlckNvbmZpZyk6IHZvaWQge1xyXG4gICAgaWYgKGNvbmZpZy5wb3NpdGlvbikgdGhpcy5wb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcclxuICAgIGlmIChjb25maWcuc2l6ZSkgdGhpcy5zaXplID0gY29uZmlnLnNpemU7XHJcbiAgICBpZiAoY29uZmlnLmhhc0JhY2tkcm9wICE9PSB1bmRlZmluZWQpIHRoaXMuaGFzQmFja2Ryb3AgPSBjb25maWcuaGFzQmFja2Ryb3A7XHJcbiAgICBpZiAoY29uZmlnLmNsb3NlT25CYWNrZHJvcENsaWNrICE9PSB1bmRlZmluZWQpIHRoaXMuY2xvc2VPbkJhY2tkcm9wQ2xpY2sgPSBjb25maWcuY2xvc2VPbkJhY2tkcm9wQ2xpY2s7XHJcbiAgICBpZiAoY29uZmlnLmNsb3NlT25Fc2NhcGUgIT09IHVuZGVmaW5lZCkgdGhpcy5jbG9zZU9uRXNjYXBlID0gY29uZmlnLmNsb3NlT25Fc2NhcGU7XHJcbiAgfVxyXG5cclxuICBnZXREcmF3ZXJTdHlsZSgpOiBhbnkge1xyXG4gICAgY29uc3Qgc3R5bGVzOiBhbnkgPSB7fTtcclxuICAgIFxyXG4gICAgc3dpdGNoICh0aGlzLnBvc2l0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgIHN0eWxlcy5sZWZ0ID0gJzAnO1xyXG4gICAgICAgIHN0eWxlcy50b3AgPSAnMCc7XHJcbiAgICAgICAgc3R5bGVzLmJvdHRvbSA9ICcwJztcclxuICAgICAgICBzdHlsZXMud2lkdGggPSB0aGlzLnNpemU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgICBzdHlsZXMucmlnaHQgPSAnMCc7XHJcbiAgICAgICAgc3R5bGVzLnRvcCA9ICcwJztcclxuICAgICAgICBzdHlsZXMuYm90dG9tID0gJzAnO1xyXG4gICAgICAgIHN0eWxlcy53aWR0aCA9IHRoaXMuc2l6ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICBzdHlsZXMubGVmdCA9ICcwJztcclxuICAgICAgICBzdHlsZXMucmlnaHQgPSAnMCc7XHJcbiAgICAgICAgc3R5bGVzLnRvcCA9ICcwJztcclxuICAgICAgICBzdHlsZXMuaGVpZ2h0ID0gdGhpcy5zaXplO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdib3R0b20nOlxyXG4gICAgICAgIHN0eWxlcy5sZWZ0ID0gJzAnO1xyXG4gICAgICAgIHN0eWxlcy5yaWdodCA9ICcwJztcclxuICAgICAgICBzdHlsZXMuYm90dG9tID0gJzAnO1xyXG4gICAgICAgIHN0eWxlcy5oZWlnaHQgPSB0aGlzLnNpemU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJkcmF3ZXItY29udGFpbmVyXCIgKm5nSWY9XCJpc09wZW5cIj5cclxuICA8ZGl2IFxyXG4gICAgKm5nSWY9XCJoYXNCYWNrZHJvcFwiIFxyXG4gICAgY2xhc3M9XCJkcmF3ZXItYmFja2Ryb3BcIiBcclxuICAgIChjbGljayk9XCJvbkJhY2tkcm9wQ2xpY2soKVwiXHJcbiAgICBbQGZhZGVJbl1cclxuICA+PC9kaXY+XHJcblxyXG4gIDxkaXYgXHJcbiAgICBjbGFzcz1cImRyYXdlci1wYW5lbFwiIFxyXG4gICAgW2NsYXNzLnBvc2l0aW9uLWxlZnRdPVwicG9zaXRpb24gPT09ICdsZWZ0J1wiXHJcbiAgICBbY2xhc3MucG9zaXRpb24tcmlnaHRdPVwicG9zaXRpb24gPT09ICdyaWdodCdcIlxyXG4gICAgW2NsYXNzLnBvc2l0aW9uLXRvcF09XCJwb3NpdGlvbiA9PT0gJ3RvcCdcIlxyXG4gICAgW2NsYXNzLnBvc2l0aW9uLWJvdHRvbV09XCJwb3NpdGlvbiA9PT0gJ2JvdHRvbSdcIlxyXG4gICAgW25nU3R5bGVdPVwiZ2V0RHJhd2VyU3R5bGUoKVwiXHJcbiAgICBbQHNsaWRlSW5dPVwicG9zaXRpb25cIlxyXG4gID5cclxuICAgIDxkaXYgY2xhc3M9XCJkcmF3ZXItaGVhZGVyXCI+XHJcbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltkcmF3ZXItaGVhZGVyXVwiPjwvbmctY29udGVudD5cclxuICAgICAgXHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJkcmF3ZXItY2xvc2VcIiAoY2xpY2spPVwiY2xvc2UoKVwiIGFyaWEtbGFiZWw9XCJDbG9zZSBkcmF3ZXJcIj5cclxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyelwiLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiZHJhd2VyLWNvbnRlbnRcIj5cclxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImRyYXdlci1mb290ZXJcIj5cclxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2RyYXdlci1mb290ZXJdXCI+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=