import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, HostListener } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class AvatarAvatarComponent {
    constructor() {
        this.alt = 'Avatar';
        this.size = 'md';
        this.status = 'none';
        this.shape = 'circle';
        this.clickable = false;
        this.avatarClick = new EventEmitter();
        this.imageError = false;
        this.showTooltip = false;
    }
    onClick(event) {
        if (this.clickable) {
            this.avatarClick.emit(event);
        }
    }
    onMouseEnter() {
        if (this.tooltip) {
            this.showTooltip = true;
        }
    }
    onMouseLeave() {
        this.showTooltip = false;
    }
    getInitials() {
        if (!this.name)
            return '?';
        const names = this.name.trim().split(' ');
        if (names.length === 1)
            return names[0].charAt(0).toUpperCase();
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
    onImageError() {
        this.imageError = true;
    }
    getRandomColor() {
        if (this.bgColor)
            return this.bgColor;
        // Cores inspiradas no logo Muxima - Gradiente azul para rosa
        const muximaColors = [
            '#3B82F6',
            '#6366F1',
            '#8B5CF6',
            '#A855F7',
            '#C026D3',
            '#D946EF', // Rosa magenta
        ];
        const hash = this.name ? this.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
        return muximaColors[hash % muximaColors.length];
    }
    getTooltipText() {
        return this.tooltip || this.name || this.alt;
    }
}
AvatarAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AvatarAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AvatarAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: AvatarAvatarComponent, isStandalone: true, selector: "muxima-avatar", inputs: { src: "src", alt: "alt", name: "name", size: "size", status: "status", badge: "badge", shape: "shape", bgColor: "bgColor", clickable: "clickable", tooltip: "tooltip" }, outputs: { avatarClick: "avatarClick" }, host: { listeners: { "click": "onClick($event)", "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, ngImport: i0, template: "<div \n  class=\"muxima-avatar\" \n  [ngClass]=\"[\n    'muxima-avatar-' + size,\n    'muxima-avatar-' + shape,\n    clickable ? 'muxima-avatar-clickable' : ''\n  ]\">\n  <!-- Imagem -->\n  <img \n    *ngIf=\"src && !imageError\" \n    [src]=\"src\" \n    [alt]=\"alt\"\n    (error)=\"onImageError()\"\n    class=\"muxima-avatar-image\">\n  \n  <!-- Iniciais -->\n  <div \n    *ngIf=\"!src || imageError\" \n    class=\"muxima-avatar-initials\"\n    [style.background]=\"getRandomColor()\">\n    {{ getInitials() }}\n  </div>\n\n  <!-- Status Badge -->\n  <span \n    *ngIf=\"status !== 'none'\" \n    class=\"muxima-avatar-status\"\n    [ngClass]=\"'muxima-avatar-status-' + status\">\n  </span>\n\n  <!-- Notification Badge -->\n  <span \n    *ngIf=\"badge !== undefined\" \n    class=\"muxima-avatar-badge\">\n    {{ badge }}\n  </span>\n\n  <!-- Tooltip -->\n  <div \n    *ngIf=\"showTooltip && (tooltip || name)\" \n    class=\"muxima-avatar-tooltip\">\n    {{ getTooltipText() }}\n  </div>\n</div>\n", styles: [".muxima-avatar-container{position:relative;display:inline-flex;align-items:center;justify-content:center}.muxima-avatar{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(135deg,#3B82F6,#6366F1,#8B5CF6);color:#fff;font-weight:600;-webkit-user-select:none;user-select:none;flex-shrink:0;border:3px solid white;box-shadow:0 4px 6px #00000012,0 0 0 1px #0000000d,inset 0 -2px 4px #0000001a;transition:all .3s cubic-bezier(.4,0,.2,1)}.muxima-avatar:before{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.2) 0%,transparent 50%,rgba(0,0,0,.1) 100%);pointer-events:none}.muxima-avatar:hover{transform:scale(1.05);box-shadow:0 10px 15px #0000001a,0 0 0 1px #0000000d,inset 0 -2px 4px #0000001a}.muxima-avatar img{width:100%;height:100%;object-fit:cover;position:relative;z-index:1}.muxima-avatar .muxima-avatar-initials{font-size:inherit;line-height:1;text-transform:uppercase;position:relative;z-index:1;text-shadow:0 1px 2px rgba(0,0,0,.2)}.muxima-avatar-circle{border-radius:9999px}.muxima-avatar-square{border-radius:.375rem}.muxima-avatar-rounded{border-radius:.75rem}.muxima-avatar-xs{width:1.5rem;height:1.5rem;font-size:.625rem;border-width:2px}.muxima-avatar-sm{width:2rem;height:2rem;font-size:.75rem;border-width:2px}.muxima-avatar-md{width:2.5rem;height:2.5rem;font-size:.875rem;border-width:2.5px}.muxima-avatar-lg{width:3rem;height:3rem;font-size:1rem;border-width:3px}.muxima-avatar-xl{width:4rem;height:4rem;font-size:1.25rem;border-width:3px}.muxima-avatar-2xl{width:5rem;height:5rem;font-size:1.5rem;border-width:4px}.muxima-avatar-status{position:absolute;bottom:0;right:0;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 4px #00000026,0 1px 2px #0000001a;z-index:2;transition:transform .2s ease}.muxima-avatar-status.muxima-avatar-status-online{background:linear-gradient(135deg,#10B981,#059669);animation:pulse-status 2s cubic-bezier(.4,0,.6,1) infinite}.muxima-avatar-status.muxima-avatar-status-offline{background:linear-gradient(135deg,#94A3B8,#64748B)}.muxima-avatar-status.muxima-avatar-status-away{background:linear-gradient(135deg,#F59E0B,#D97706)}.muxima-avatar-status.muxima-avatar-status-busy{background:linear-gradient(135deg,#EF4444,#DC2626)}.muxima-avatar-xs .muxima-avatar-status{width:.375rem;height:.375rem;bottom:-1px;right:-1px;border-width:1.5px}.muxima-avatar-sm .muxima-avatar-status{width:.5rem;height:.5rem;bottom:-1px;right:-1px;border-width:2px}.muxima-avatar-md .muxima-avatar-status{width:.625rem;height:.625rem;bottom:0;right:0;border-width:2.5px}.muxima-avatar-lg .muxima-avatar-status{width:.75rem;height:.75rem;bottom:1px;right:1px;border-width:2.5px}.muxima-avatar-xl .muxima-avatar-status{width:1rem;height:1rem;bottom:2px;right:2px;border-width:3px}.muxima-avatar-2xl .muxima-avatar-status{width:1.25rem;height:1.25rem;bottom:3px;right:3px;border-width:3px}@keyframes pulse-status{0%,to{opacity:1;transform:scale(1)}50%{opacity:.8;transform:scale(1.1)}}.muxima-avatar-badge{position:absolute;top:-6px;right:-6px;min-width:1.5rem;height:1.5rem;padding:0 .5rem;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#EF4444 0%,#DC2626 100%);color:#fff;font-size:.75rem;font-weight:700;line-height:1;border-radius:9999px;border:3px solid white;box-shadow:0 4px 12px #ef444480,0 2px 4px #0000004d;z-index:3;animation:bounce-in .3s cubic-bezier(.68,-.55,.265,1.55),badge-pulse 2s ease-in-out infinite;transition:transform .2s ease}.muxima-avatar-badge:hover{transform:scale(1.15);animation:none}.muxima-avatar-xs .muxima-avatar-badge{top:-4px;right:-4px;min-width:1rem;height:1rem;padding:0 .3rem;font-size:.5rem;border-width:2px}.muxima-avatar-sm .muxima-avatar-badge{top:-5px;right:-5px;min-width:1.125rem;height:1.125rem;padding:0 .35rem;font-size:.6rem;border-width:2px}.muxima-avatar-md .muxima-avatar-badge{top:-5px;right:-5px;min-width:1.25rem;height:1.25rem;padding:0 .4rem;font-size:.65rem;border-width:2.5px}.muxima-avatar-lg .muxima-avatar-badge{top:-6px;right:-6px;min-width:1.5rem;height:1.5rem;padding:0 .5rem;font-size:.75rem;border-width:3px}.muxima-avatar-xl .muxima-avatar-badge{top:-8px;right:-8px;min-width:1.875rem;height:1.875rem;padding:0 .6rem;font-size:.875rem;border-width:3px}.muxima-avatar-2xl .muxima-avatar-badge{top:-10px;right:-10px;min-width:2.25rem;height:2.25rem;padding:0 .75rem;font-size:1rem;border-width:4px}@keyframes bounce-in{0%{transform:scale(0);opacity:0}50%{transform:scale(1.2)}to{transform:scale(1);opacity:1}}@keyframes badge-pulse{0%,to{box-shadow:0 4px 12px #ef444480,0 2px 4px #0000004d}50%{box-shadow:0 4px 16px #ef4444b3,0 2px 6px #0006}}.muxima-avatar-clickable{cursor:pointer}.muxima-avatar-clickable:active{transform:scale(.95)}.muxima-avatar-tooltip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translate(-50%);padding:.5rem .75rem;background:rgba(0,0,0,.9);color:#fff;font-size:.75rem;font-weight:500;line-height:1.2;border-radius:.375rem;white-space:nowrap;z-index:50;pointer-events:none;animation:tooltip-fade-in .2s ease;box-shadow:0 4px 6px #0000001a}.muxima-avatar-tooltip:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);border:4px solid transparent;border-top-color:#000000e6}@keyframes tooltip-fade-in{0%{opacity:0;transform:translate(-50%) translateY(-4px)}to{opacity:1;transform:translate(-50%) translateY(0)}}.muxima-avatar-group{display:flex;align-items:center}.muxima-avatar-group .muxima-avatar-container{margin-left:-.5rem;transition:all .2s}.muxima-avatar-group .muxima-avatar-container:first-child{margin-left:0}.muxima-avatar-group .muxima-avatar-container:hover{transform:translateY(-4px);z-index:10}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AvatarAvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-avatar', standalone: true, imports: [CommonModule], template: "<div \n  class=\"muxima-avatar\" \n  [ngClass]=\"[\n    'muxima-avatar-' + size,\n    'muxima-avatar-' + shape,\n    clickable ? 'muxima-avatar-clickable' : ''\n  ]\">\n  <!-- Imagem -->\n  <img \n    *ngIf=\"src && !imageError\" \n    [src]=\"src\" \n    [alt]=\"alt\"\n    (error)=\"onImageError()\"\n    class=\"muxima-avatar-image\">\n  \n  <!-- Iniciais -->\n  <div \n    *ngIf=\"!src || imageError\" \n    class=\"muxima-avatar-initials\"\n    [style.background]=\"getRandomColor()\">\n    {{ getInitials() }}\n  </div>\n\n  <!-- Status Badge -->\n  <span \n    *ngIf=\"status !== 'none'\" \n    class=\"muxima-avatar-status\"\n    [ngClass]=\"'muxima-avatar-status-' + status\">\n  </span>\n\n  <!-- Notification Badge -->\n  <span \n    *ngIf=\"badge !== undefined\" \n    class=\"muxima-avatar-badge\">\n    {{ badge }}\n  </span>\n\n  <!-- Tooltip -->\n  <div \n    *ngIf=\"showTooltip && (tooltip || name)\" \n    class=\"muxima-avatar-tooltip\">\n    {{ getTooltipText() }}\n  </div>\n</div>\n", styles: [".muxima-avatar-container{position:relative;display:inline-flex;align-items:center;justify-content:center}.muxima-avatar{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(135deg,#3B82F6,#6366F1,#8B5CF6);color:#fff;font-weight:600;-webkit-user-select:none;user-select:none;flex-shrink:0;border:3px solid white;box-shadow:0 4px 6px #00000012,0 0 0 1px #0000000d,inset 0 -2px 4px #0000001a;transition:all .3s cubic-bezier(.4,0,.2,1)}.muxima-avatar:before{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.2) 0%,transparent 50%,rgba(0,0,0,.1) 100%);pointer-events:none}.muxima-avatar:hover{transform:scale(1.05);box-shadow:0 10px 15px #0000001a,0 0 0 1px #0000000d,inset 0 -2px 4px #0000001a}.muxima-avatar img{width:100%;height:100%;object-fit:cover;position:relative;z-index:1}.muxima-avatar .muxima-avatar-initials{font-size:inherit;line-height:1;text-transform:uppercase;position:relative;z-index:1;text-shadow:0 1px 2px rgba(0,0,0,.2)}.muxima-avatar-circle{border-radius:9999px}.muxima-avatar-square{border-radius:.375rem}.muxima-avatar-rounded{border-radius:.75rem}.muxima-avatar-xs{width:1.5rem;height:1.5rem;font-size:.625rem;border-width:2px}.muxima-avatar-sm{width:2rem;height:2rem;font-size:.75rem;border-width:2px}.muxima-avatar-md{width:2.5rem;height:2.5rem;font-size:.875rem;border-width:2.5px}.muxima-avatar-lg{width:3rem;height:3rem;font-size:1rem;border-width:3px}.muxima-avatar-xl{width:4rem;height:4rem;font-size:1.25rem;border-width:3px}.muxima-avatar-2xl{width:5rem;height:5rem;font-size:1.5rem;border-width:4px}.muxima-avatar-status{position:absolute;bottom:0;right:0;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 4px #00000026,0 1px 2px #0000001a;z-index:2;transition:transform .2s ease}.muxima-avatar-status.muxima-avatar-status-online{background:linear-gradient(135deg,#10B981,#059669);animation:pulse-status 2s cubic-bezier(.4,0,.6,1) infinite}.muxima-avatar-status.muxima-avatar-status-offline{background:linear-gradient(135deg,#94A3B8,#64748B)}.muxima-avatar-status.muxima-avatar-status-away{background:linear-gradient(135deg,#F59E0B,#D97706)}.muxima-avatar-status.muxima-avatar-status-busy{background:linear-gradient(135deg,#EF4444,#DC2626)}.muxima-avatar-xs .muxima-avatar-status{width:.375rem;height:.375rem;bottom:-1px;right:-1px;border-width:1.5px}.muxima-avatar-sm .muxima-avatar-status{width:.5rem;height:.5rem;bottom:-1px;right:-1px;border-width:2px}.muxima-avatar-md .muxima-avatar-status{width:.625rem;height:.625rem;bottom:0;right:0;border-width:2.5px}.muxima-avatar-lg .muxima-avatar-status{width:.75rem;height:.75rem;bottom:1px;right:1px;border-width:2.5px}.muxima-avatar-xl .muxima-avatar-status{width:1rem;height:1rem;bottom:2px;right:2px;border-width:3px}.muxima-avatar-2xl .muxima-avatar-status{width:1.25rem;height:1.25rem;bottom:3px;right:3px;border-width:3px}@keyframes pulse-status{0%,to{opacity:1;transform:scale(1)}50%{opacity:.8;transform:scale(1.1)}}.muxima-avatar-badge{position:absolute;top:-6px;right:-6px;min-width:1.5rem;height:1.5rem;padding:0 .5rem;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#EF4444 0%,#DC2626 100%);color:#fff;font-size:.75rem;font-weight:700;line-height:1;border-radius:9999px;border:3px solid white;box-shadow:0 4px 12px #ef444480,0 2px 4px #0000004d;z-index:3;animation:bounce-in .3s cubic-bezier(.68,-.55,.265,1.55),badge-pulse 2s ease-in-out infinite;transition:transform .2s ease}.muxima-avatar-badge:hover{transform:scale(1.15);animation:none}.muxima-avatar-xs .muxima-avatar-badge{top:-4px;right:-4px;min-width:1rem;height:1rem;padding:0 .3rem;font-size:.5rem;border-width:2px}.muxima-avatar-sm .muxima-avatar-badge{top:-5px;right:-5px;min-width:1.125rem;height:1.125rem;padding:0 .35rem;font-size:.6rem;border-width:2px}.muxima-avatar-md .muxima-avatar-badge{top:-5px;right:-5px;min-width:1.25rem;height:1.25rem;padding:0 .4rem;font-size:.65rem;border-width:2.5px}.muxima-avatar-lg .muxima-avatar-badge{top:-6px;right:-6px;min-width:1.5rem;height:1.5rem;padding:0 .5rem;font-size:.75rem;border-width:3px}.muxima-avatar-xl .muxima-avatar-badge{top:-8px;right:-8px;min-width:1.875rem;height:1.875rem;padding:0 .6rem;font-size:.875rem;border-width:3px}.muxima-avatar-2xl .muxima-avatar-badge{top:-10px;right:-10px;min-width:2.25rem;height:2.25rem;padding:0 .75rem;font-size:1rem;border-width:4px}@keyframes bounce-in{0%{transform:scale(0);opacity:0}50%{transform:scale(1.2)}to{transform:scale(1);opacity:1}}@keyframes badge-pulse{0%,to{box-shadow:0 4px 12px #ef444480,0 2px 4px #0000004d}50%{box-shadow:0 4px 16px #ef4444b3,0 2px 6px #0006}}.muxima-avatar-clickable{cursor:pointer}.muxima-avatar-clickable:active{transform:scale(.95)}.muxima-avatar-tooltip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translate(-50%);padding:.5rem .75rem;background:rgba(0,0,0,.9);color:#fff;font-size:.75rem;font-weight:500;line-height:1.2;border-radius:.375rem;white-space:nowrap;z-index:50;pointer-events:none;animation:tooltip-fade-in .2s ease;box-shadow:0 4px 6px #0000001a}.muxima-avatar-tooltip:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);border:4px solid transparent;border-top-color:#000000e6}@keyframes tooltip-fade-in{0%{opacity:0;transform:translate(-50%) translateY(-4px)}to{opacity:1;transform:translate(-50%) translateY(0)}}.muxima-avatar-group{display:flex;align-items:center}.muxima-avatar-group .muxima-avatar-container{margin-left:-.5rem;transition:all .2s}.muxima-avatar-group .muxima-avatar-container:first-child{margin-left:0}.muxima-avatar-group .muxima-avatar-container:hover{transform:translateY(-4px);z-index:10}\n"] }]
        }], propDecorators: { src: [{
                type: Input
            }], alt: [{
                type: Input
            }], name: [{
                type: Input
            }], size: [{
                type: Input
            }], status: [{
                type: Input
            }], badge: [{
                type: Input
            }], shape: [{
                type: Input
            }], bgColor: [{
                type: Input
            }], clickable: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], avatarClick: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });

class AvatarGroupComponent {
    constructor() {
        this.size = 'md';
        this.totalCount = 0;
    }
}
AvatarGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AvatarGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AvatarGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: AvatarGroupComponent, isStandalone: true, selector: "muxima-avatar-group", inputs: { max: "max", size: "size", totalCount: "totalCount" }, ngImport: i0, template: `
    <div class="muxima-avatar-group" [ngClass]="'muxima-avatar-group-' + size">
      <ng-content></ng-content>
      <div *ngIf="max && max < totalCount" 
           class="muxima-avatar muxima-avatar-more"
           [ngClass]="'muxima-avatar-' + size">
        <div class="muxima-avatar-initials">
          +{{ totalCount - max }}
        </div>
      </div>
    </div>
  `, isInline: true, styles: [".muxima-avatar-group{display:flex;align-items:center;position:relative;::ng-deep muxima-avatar {margin-left: -.5rem; transition: all .2s; position: relative; &:first-child {margin-left: 0;} &:hover {transform: translateY(-4px); z-index: 10;}} .muxima-avatar-more {background: linear-gradient(135deg,#64748B,#475569); cursor: pointer; &:hover {transform: translateY(-4px) scale(1.05);}}}.muxima-avatar-group-xs ::ng-deep muxima-avatar{margin-left:-.375rem}.muxima-avatar-group-sm ::ng-deep muxima-avatar{margin-left:-.5rem}.muxima-avatar-group-md ::ng-deep muxima-avatar{margin-left:-.625rem}.muxima-avatar-group-lg ::ng-deep muxima-avatar{margin-left:-.75rem}.muxima-avatar-group-xl ::ng-deep muxima-avatar{margin-left:-1rem}.muxima-avatar-group-2xl ::ng-deep muxima-avatar{margin-left:-1.25rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AvatarGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-avatar-group', standalone: true, imports: [CommonModule], template: `
    <div class="muxima-avatar-group" [ngClass]="'muxima-avatar-group-' + size">
      <ng-content></ng-content>
      <div *ngIf="max && max < totalCount" 
           class="muxima-avatar muxima-avatar-more"
           [ngClass]="'muxima-avatar-' + size">
        <div class="muxima-avatar-initials">
          +{{ totalCount - max }}
        </div>
      </div>
    </div>
  `, styles: [".muxima-avatar-group{display:flex;align-items:center;position:relative;::ng-deep muxima-avatar {margin-left: -.5rem; transition: all .2s; position: relative; &:first-child {margin-left: 0;} &:hover {transform: translateY(-4px); z-index: 10;}} .muxima-avatar-more {background: linear-gradient(135deg,#64748B,#475569); cursor: pointer; &:hover {transform: translateY(-4px) scale(1.05);}}}.muxima-avatar-group-xs ::ng-deep muxima-avatar{margin-left:-.375rem}.muxima-avatar-group-sm ::ng-deep muxima-avatar{margin-left:-.5rem}.muxima-avatar-group-md ::ng-deep muxima-avatar{margin-left:-.625rem}.muxima-avatar-group-lg ::ng-deep muxima-avatar{margin-left:-.75rem}.muxima-avatar-group-xl ::ng-deep muxima-avatar{margin-left:-1rem}.muxima-avatar-group-2xl ::ng-deep muxima-avatar{margin-left:-1.25rem}\n"] }]
        }], propDecorators: { max: [{
                type: Input
            }], size: [{
                type: Input
            }], totalCount: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { AvatarAvatarComponent, AvatarGroupComponent };
//# sourceMappingURL=muxima-ui-avatar.mjs.map
