import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

class ToastComponent {
    constructor() {
        this.type = 'default';
        this.variant = 'filled';
        this.title = '';
        this.message = '';
        this.icon = '';
        this.showIcon = true;
        this.closable = true;
        this.position = 'top-right';
        this.duration = 5000;
        this.pauseOnHover = true;
        this.showProgress = true;
        this.actionLabel = '';
        this.showTimestamp = false;
        this.closed = new EventEmitter();
        this.actionClick = new EventEmitter();
        this.state = 'visible';
        this.progress = 100;
        this.timestamp = '';
        this.startTime = 0;
        this.remainingTime = 0;
        this.isPaused = false;
    }
    get toastClasses() {
        const classes = ['muxima-toast'];
        classes.push(`muxima-toast--${this.type}`);
        classes.push(`muxima-toast--${this.variant}`);
        return classes;
    }
    get defaultIcon() {
        if (this.icon)
            return this.icon;
        switch (this.type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '📢';
        }
    }
    ngOnInit() {
        if (this.showTimestamp) {
            this.timestamp = new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        if (this.duration > 0) {
            this.startTimer();
        }
    }
    ngOnDestroy() {
        this.clearTimer();
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
    startTimer() {
        this.startTime = Date.now();
        this.remainingTime = this.duration;
        this.progress = 100;
        this.timeoutId = setTimeout(() => this.hide(), this.remainingTime);
        if (this.showProgress) {
            this.animateProgress();
        }
    }
    clearTimer() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    animateProgress() {
        if (!this.showProgress || this.isPaused || this.duration <= 0)
            return;
        const initialRemaining = this.remainingTime;
        const startAnimation = Date.now();
        const animate = () => {
            if (this.isPaused)
                return;
            const elapsed = Date.now() - startAnimation;
            const timeLeft = Math.max(0, initialRemaining - elapsed);
            this.progress = (timeLeft / this.duration) * 100;
            if (timeLeft > 0 && this.state === 'visible') {
                this.animationFrameId = requestAnimationFrame(animate);
            }
            else {
                this.progress = 0;
            }
        };
        this.animationFrameId = requestAnimationFrame(animate);
    }
    onMouseEnter() {
        if (this.pauseOnHover && this.duration > 0 && !this.isPaused) {
            this.isPaused = true;
            this.clearTimer();
            this.remainingTime -= Date.now() - this.startTime;
        }
    }
    onMouseLeave() {
        if (this.pauseOnHover && this.duration > 0 && this.isPaused) {
            this.isPaused = false;
            this.startTime = Date.now();
            this.timeoutId = setTimeout(() => this.hide(), this.remainingTime);
            if (this.showProgress) {
                this.animateProgress();
            }
        }
    }
    hide() {
        this.state = 'hidden';
        setTimeout(() => this.close(), 250);
    }
    close() {
        this.clearTimer();
        this.closed.emit();
    }
    onActionClick() {
        this.actionClick.emit();
    }
}
ToastComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ToastComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ToastComponent, isStandalone: true, selector: "muxima-toast", inputs: { type: "type", variant: "variant", title: "title", message: "message", icon: "icon", showIcon: "showIcon", closable: "closable", position: "position", duration: "duration", pauseOnHover: "pauseOnHover", showProgress: "showProgress", actionLabel: "actionLabel", showTimestamp: "showTimestamp" }, outputs: { closed: "closed", actionClick: "actionClick" }, host: { properties: { "class": "\"muxima-toast--\" + position" } }, ngImport: i0, template: "<div \n  [ngClass]=\"toastClasses\"\n  [@toastAnimation]=\"state\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\"\n  role=\"alert\"\n  aria-live=\"polite\">\n  \n  <!-- Icon -->\n  <div class=\"muxima-toast-icon\" *ngIf=\"showIcon\">\n    <span class=\"muxima-toast-icon-emoji\">{{ defaultIcon }}</span>\n  </div>\n\n  <!-- Content -->\n  <div class=\"muxima-toast-content\">\n    <div class=\"muxima-toast-header\" *ngIf=\"title || showTimestamp\">\n      <h4 class=\"muxima-toast-title\" *ngIf=\"title\">{{ title }}</h4>\n      <span class=\"muxima-toast-timestamp\" *ngIf=\"showTimestamp\">{{ timestamp }}</span>\n    </div>\n    \n    <p class=\"muxima-toast-message\" *ngIf=\"message\">{{ message }}</p>\n    \n    <button \n      *ngIf=\"actionLabel\"\n      class=\"muxima-toast-action\"\n      (click)=\"onActionClick()\">\n      {{ actionLabel }}\n    </button>\n  </div>\n\n  <!-- Close Button -->\n  <button \n    *ngIf=\"closable\"\n    class=\"muxima-toast-close\"\n    (click)=\"hide()\"\n    aria-label=\"Fechar notifica\u00E7\u00E3o\">\n    <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\">\n      <path d=\"M1 1L13 13M1 13L13 1\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n    </svg>\n  </button>\n\n  <!-- Progress Bar -->\n  <div \n    *ngIf=\"showProgress && duration > 0\"\n    class=\"muxima-toast-progress\"\n    [style.width.%]=\"progress\">\n  </div>\n</div>\r\n", styles: [":host{--muxima-white: #FFFFFF;display:block;position:fixed;z-index:9999}.muxima-toast{display:flex;align-items:flex-start;gap:.75rem;min-width:320px;max-width:420px;padding:1rem;border-radius:12px;box-shadow:0 10px 25px #0000001a;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);position:relative;overflow:hidden;transition:all .3s ease}.muxima-toast:hover{box-shadow:0 15px 35px #00000026;transform:translateY(-2px)}.muxima-toast-icon{flex-shrink:0;width:2.5rem;height:2.5rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.25rem}.muxima-toast-content{flex:1}.muxima-toast-header{display:flex;justify-content:space-between;gap:.5rem;margin-bottom:.25rem}.muxima-toast-title{font-size:.9375rem;font-weight:600;margin:0}.muxima-toast-timestamp{font-size:.75rem;opacity:.7}.muxima-toast-message{font-size:.875rem;margin:0;opacity:.9}.muxima-toast-action{margin-top:.75rem;padding:.375rem .75rem;border:none;border-radius:6px;font-size:.8125rem;font-weight:600;cursor:pointer;transition:all .2s ease}.muxima-toast-close{flex-shrink:0;width:1.5rem;height:1.5rem;border:none;background:transparent;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease;opacity:.6}.muxima-toast-close:hover{opacity:1;background:rgba(0,0,0,.1);transform:rotate(90deg)}.muxima-toast-progress{position:absolute;bottom:0;left:0;height:3px;transition:width .1s linear}.muxima-toast--success.muxima-toast--filled{background:linear-gradient(135deg,#10B981 0%,#047857 100%);color:#fff}.muxima-toast--success.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--success.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--success.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--error.muxima-toast--filled{background:linear-gradient(135deg,#EF4444 0%,#B91C1C 100%);color:#fff}.muxima-toast--error.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--error.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--error.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--warning.muxima-toast--filled{background:linear-gradient(135deg,#F59E0B 0%,#B45309 100%);color:#fff}.muxima-toast--warning.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--warning.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--warning.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--info.muxima-toast--filled{background:linear-gradient(135deg,#3B82F6 0%,#1E40AF 100%);color:#fff}.muxima-toast--info.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--info.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--info.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--default.muxima-toast--filled{background:linear-gradient(135deg,#6B7280 0%,#374151 100%);color:#fff}.muxima-toast--default.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--default.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--default.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--success.muxima-toast--outlined{background:white;color:#047857;border:2px solid #10B981}.muxima-toast--success.muxima-toast--outlined .muxima-toast-icon{background:#D1FAE5;color:#047857}.muxima-toast--success.muxima-toast--outlined .muxima-toast-action{background:#10B981;color:#fff}.muxima-toast--success.muxima-toast--outlined .muxima-toast-progress{background:#10B981}.muxima-toast--error.muxima-toast--outlined{background:white;color:#b91c1c;border:2px solid #EF4444}.muxima-toast--error.muxima-toast--outlined .muxima-toast-icon{background:#FEE2E2;color:#b91c1c}.muxima-toast--error.muxima-toast--outlined .muxima-toast-action{background:#EF4444;color:#fff}.muxima-toast--error.muxima-toast--outlined .muxima-toast-progress{background:#EF4444}.muxima-toast--warning.muxima-toast--outlined{background:white;color:#b45309;border:2px solid #F59E0B}.muxima-toast--warning.muxima-toast--outlined .muxima-toast-icon{background:#FEF3C7;color:#b45309}.muxima-toast--warning.muxima-toast--outlined .muxima-toast-action{background:#F59E0B;color:#fff}.muxima-toast--warning.muxima-toast--outlined .muxima-toast-progress{background:#F59E0B}.muxima-toast--info.muxima-toast--outlined{background:white;color:#1e40af;border:2px solid #3B82F6}.muxima-toast--info.muxima-toast--outlined .muxima-toast-icon{background:#DBEAFE;color:#1e40af}.muxima-toast--info.muxima-toast--outlined .muxima-toast-action{background:#3B82F6;color:#fff}.muxima-toast--info.muxima-toast--outlined .muxima-toast-progress{background:#3B82F6}.muxima-toast--default.muxima-toast--outlined{background:white;color:#374151;border:2px solid #6B7280}.muxima-toast--default.muxima-toast--outlined .muxima-toast-icon{background:#F3F4F6;color:#374151}.muxima-toast--default.muxima-toast--outlined .muxima-toast-action{background:#6B7280;color:#fff}.muxima-toast--default.muxima-toast--outlined .muxima-toast-progress{background:#6B7280}.muxima-toast--success.muxima-toast--soft{background:#D1FAE5;color:#047857}.muxima-toast--success.muxima-toast--soft .muxima-toast-icon,.muxima-toast--success.muxima-toast--soft .muxima-toast-action{background:#10B981;color:#fff}.muxima-toast--success.muxima-toast--soft .muxima-toast-progress{background:#10B981}.muxima-toast--error.muxima-toast--soft{background:#FEE2E2;color:#b91c1c}.muxima-toast--error.muxima-toast--soft .muxima-toast-icon,.muxima-toast--error.muxima-toast--soft .muxima-toast-action{background:#EF4444;color:#fff}.muxima-toast--error.muxima-toast--soft .muxima-toast-progress{background:#EF4444}.muxima-toast--warning.muxima-toast--soft{background:#FEF3C7;color:#b45309}.muxima-toast--warning.muxima-toast--soft .muxima-toast-icon,.muxima-toast--warning.muxima-toast--soft .muxima-toast-action{background:#F59E0B;color:#fff}.muxima-toast--warning.muxima-toast--soft .muxima-toast-progress{background:#F59E0B}.muxima-toast--info.muxima-toast--soft{background:#DBEAFE;color:#1e40af}.muxima-toast--info.muxima-toast--soft .muxima-toast-icon,.muxima-toast--info.muxima-toast--soft .muxima-toast-action{background:#3B82F6;color:#fff}.muxima-toast--info.muxima-toast--soft .muxima-toast-progress{background:#3B82F6}.muxima-toast--default.muxima-toast--soft{background:#F3F4F6;color:#374151}.muxima-toast--default.muxima-toast--soft .muxima-toast-icon,.muxima-toast--default.muxima-toast--soft .muxima-toast-action{background:#6B7280;color:#fff}.muxima-toast--default.muxima-toast--soft .muxima-toast-progress{background:#6B7280}:host(.muxima-toast--top-right){top:1rem;right:1rem;left:auto;bottom:auto;transform:none}:host(.muxima-toast--top-left){top:1rem;left:1rem;right:auto;bottom:auto;transform:none}:host(.muxima-toast--top-center){top:1rem;left:50%;right:auto;bottom:auto;transform:translate(-50%)}:host(.muxima-toast--bottom-right){bottom:1rem;right:1rem;top:auto;left:auto;transform:none}:host(.muxima-toast--bottom-left){bottom:1rem;left:1rem;top:auto;right:auto;transform:none}:host(.muxima-toast--bottom-center){bottom:1rem;left:50%;top:auto;right:auto;transform:translate(-50%)}@media (max-width: 640px){.muxima-toast{min-width:calc(100vw - 2rem);max-width:calc(100vw - 2rem)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('toastAnimation', [
            state('visible', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
            state('hidden', style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' })),
            transition('hidden => visible', [
                style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
                animate('350ms cubic-bezier(0.22, 1, 0.36, 1)')
            ]),
            transition('visible => hidden', [
                animate('250ms cubic-bezier(0.55, 0, 0.55, 0.2)')
            ]),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToastComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-toast', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': '"muxima-toast--" + position'
                    }, animations: [
                        trigger('toastAnimation', [
                            state('visible', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
                            state('hidden', style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' })),
                            transition('hidden => visible', [
                                style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
                                animate('350ms cubic-bezier(0.22, 1, 0.36, 1)')
                            ]),
                            transition('visible => hidden', [
                                animate('250ms cubic-bezier(0.55, 0, 0.55, 0.2)')
                            ]),
                        ]),
                    ], template: "<div \n  [ngClass]=\"toastClasses\"\n  [@toastAnimation]=\"state\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\"\n  role=\"alert\"\n  aria-live=\"polite\">\n  \n  <!-- Icon -->\n  <div class=\"muxima-toast-icon\" *ngIf=\"showIcon\">\n    <span class=\"muxima-toast-icon-emoji\">{{ defaultIcon }}</span>\n  </div>\n\n  <!-- Content -->\n  <div class=\"muxima-toast-content\">\n    <div class=\"muxima-toast-header\" *ngIf=\"title || showTimestamp\">\n      <h4 class=\"muxima-toast-title\" *ngIf=\"title\">{{ title }}</h4>\n      <span class=\"muxima-toast-timestamp\" *ngIf=\"showTimestamp\">{{ timestamp }}</span>\n    </div>\n    \n    <p class=\"muxima-toast-message\" *ngIf=\"message\">{{ message }}</p>\n    \n    <button \n      *ngIf=\"actionLabel\"\n      class=\"muxima-toast-action\"\n      (click)=\"onActionClick()\">\n      {{ actionLabel }}\n    </button>\n  </div>\n\n  <!-- Close Button -->\n  <button \n    *ngIf=\"closable\"\n    class=\"muxima-toast-close\"\n    (click)=\"hide()\"\n    aria-label=\"Fechar notifica\u00E7\u00E3o\">\n    <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\">\n      <path d=\"M1 1L13 13M1 13L13 1\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n    </svg>\n  </button>\n\n  <!-- Progress Bar -->\n  <div \n    *ngIf=\"showProgress && duration > 0\"\n    class=\"muxima-toast-progress\"\n    [style.width.%]=\"progress\">\n  </div>\n</div>\r\n", styles: [":host{--muxima-white: #FFFFFF;display:block;position:fixed;z-index:9999}.muxima-toast{display:flex;align-items:flex-start;gap:.75rem;min-width:320px;max-width:420px;padding:1rem;border-radius:12px;box-shadow:0 10px 25px #0000001a;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);position:relative;overflow:hidden;transition:all .3s ease}.muxima-toast:hover{box-shadow:0 15px 35px #00000026;transform:translateY(-2px)}.muxima-toast-icon{flex-shrink:0;width:2.5rem;height:2.5rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.25rem}.muxima-toast-content{flex:1}.muxima-toast-header{display:flex;justify-content:space-between;gap:.5rem;margin-bottom:.25rem}.muxima-toast-title{font-size:.9375rem;font-weight:600;margin:0}.muxima-toast-timestamp{font-size:.75rem;opacity:.7}.muxima-toast-message{font-size:.875rem;margin:0;opacity:.9}.muxima-toast-action{margin-top:.75rem;padding:.375rem .75rem;border:none;border-radius:6px;font-size:.8125rem;font-weight:600;cursor:pointer;transition:all .2s ease}.muxima-toast-close{flex-shrink:0;width:1.5rem;height:1.5rem;border:none;background:transparent;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease;opacity:.6}.muxima-toast-close:hover{opacity:1;background:rgba(0,0,0,.1);transform:rotate(90deg)}.muxima-toast-progress{position:absolute;bottom:0;left:0;height:3px;transition:width .1s linear}.muxima-toast--success.muxima-toast--filled{background:linear-gradient(135deg,#10B981 0%,#047857 100%);color:#fff}.muxima-toast--success.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--success.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--success.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--error.muxima-toast--filled{background:linear-gradient(135deg,#EF4444 0%,#B91C1C 100%);color:#fff}.muxima-toast--error.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--error.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--error.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--warning.muxima-toast--filled{background:linear-gradient(135deg,#F59E0B 0%,#B45309 100%);color:#fff}.muxima-toast--warning.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--warning.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--warning.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--info.muxima-toast--filled{background:linear-gradient(135deg,#3B82F6 0%,#1E40AF 100%);color:#fff}.muxima-toast--info.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--info.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--info.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--default.muxima-toast--filled{background:linear-gradient(135deg,#6B7280 0%,#374151 100%);color:#fff}.muxima-toast--default.muxima-toast--filled .muxima-toast-icon{background:rgba(255,255,255,.2)}.muxima-toast--default.muxima-toast--filled .muxima-toast-action{background:rgba(255,255,255,.2);color:#fff}.muxima-toast--default.muxima-toast--filled .muxima-toast-progress{background:rgba(255,255,255,.5)}.muxima-toast--success.muxima-toast--outlined{background:white;color:#047857;border:2px solid #10B981}.muxima-toast--success.muxima-toast--outlined .muxima-toast-icon{background:#D1FAE5;color:#047857}.muxima-toast--success.muxima-toast--outlined .muxima-toast-action{background:#10B981;color:#fff}.muxima-toast--success.muxima-toast--outlined .muxima-toast-progress{background:#10B981}.muxima-toast--error.muxima-toast--outlined{background:white;color:#b91c1c;border:2px solid #EF4444}.muxima-toast--error.muxima-toast--outlined .muxima-toast-icon{background:#FEE2E2;color:#b91c1c}.muxima-toast--error.muxima-toast--outlined .muxima-toast-action{background:#EF4444;color:#fff}.muxima-toast--error.muxima-toast--outlined .muxima-toast-progress{background:#EF4444}.muxima-toast--warning.muxima-toast--outlined{background:white;color:#b45309;border:2px solid #F59E0B}.muxima-toast--warning.muxima-toast--outlined .muxima-toast-icon{background:#FEF3C7;color:#b45309}.muxima-toast--warning.muxima-toast--outlined .muxima-toast-action{background:#F59E0B;color:#fff}.muxima-toast--warning.muxima-toast--outlined .muxima-toast-progress{background:#F59E0B}.muxima-toast--info.muxima-toast--outlined{background:white;color:#1e40af;border:2px solid #3B82F6}.muxima-toast--info.muxima-toast--outlined .muxima-toast-icon{background:#DBEAFE;color:#1e40af}.muxima-toast--info.muxima-toast--outlined .muxima-toast-action{background:#3B82F6;color:#fff}.muxima-toast--info.muxima-toast--outlined .muxima-toast-progress{background:#3B82F6}.muxima-toast--default.muxima-toast--outlined{background:white;color:#374151;border:2px solid #6B7280}.muxima-toast--default.muxima-toast--outlined .muxima-toast-icon{background:#F3F4F6;color:#374151}.muxima-toast--default.muxima-toast--outlined .muxima-toast-action{background:#6B7280;color:#fff}.muxima-toast--default.muxima-toast--outlined .muxima-toast-progress{background:#6B7280}.muxima-toast--success.muxima-toast--soft{background:#D1FAE5;color:#047857}.muxima-toast--success.muxima-toast--soft .muxima-toast-icon,.muxima-toast--success.muxima-toast--soft .muxima-toast-action{background:#10B981;color:#fff}.muxima-toast--success.muxima-toast--soft .muxima-toast-progress{background:#10B981}.muxima-toast--error.muxima-toast--soft{background:#FEE2E2;color:#b91c1c}.muxima-toast--error.muxima-toast--soft .muxima-toast-icon,.muxima-toast--error.muxima-toast--soft .muxima-toast-action{background:#EF4444;color:#fff}.muxima-toast--error.muxima-toast--soft .muxima-toast-progress{background:#EF4444}.muxima-toast--warning.muxima-toast--soft{background:#FEF3C7;color:#b45309}.muxima-toast--warning.muxima-toast--soft .muxima-toast-icon,.muxima-toast--warning.muxima-toast--soft .muxima-toast-action{background:#F59E0B;color:#fff}.muxima-toast--warning.muxima-toast--soft .muxima-toast-progress{background:#F59E0B}.muxima-toast--info.muxima-toast--soft{background:#DBEAFE;color:#1e40af}.muxima-toast--info.muxima-toast--soft .muxima-toast-icon,.muxima-toast--info.muxima-toast--soft .muxima-toast-action{background:#3B82F6;color:#fff}.muxima-toast--info.muxima-toast--soft .muxima-toast-progress{background:#3B82F6}.muxima-toast--default.muxima-toast--soft{background:#F3F4F6;color:#374151}.muxima-toast--default.muxima-toast--soft .muxima-toast-icon,.muxima-toast--default.muxima-toast--soft .muxima-toast-action{background:#6B7280;color:#fff}.muxima-toast--default.muxima-toast--soft .muxima-toast-progress{background:#6B7280}:host(.muxima-toast--top-right){top:1rem;right:1rem;left:auto;bottom:auto;transform:none}:host(.muxima-toast--top-left){top:1rem;left:1rem;right:auto;bottom:auto;transform:none}:host(.muxima-toast--top-center){top:1rem;left:50%;right:auto;bottom:auto;transform:translate(-50%)}:host(.muxima-toast--bottom-right){bottom:1rem;right:1rem;top:auto;left:auto;transform:none}:host(.muxima-toast--bottom-left){bottom:1rem;left:1rem;top:auto;right:auto;transform:none}:host(.muxima-toast--bottom-center){bottom:1rem;left:50%;top:auto;right:auto;transform:translate(-50%)}@media (max-width: 640px){.muxima-toast{min-width:calc(100vw - 2rem);max-width:calc(100vw - 2rem)}}\n"] }]
        }], propDecorators: { type: [{
                type: Input
            }], variant: [{
                type: Input
            }], title: [{
                type: Input
            }], message: [{
                type: Input
            }], icon: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], closable: [{
                type: Input
            }], position: [{
                type: Input
            }], duration: [{
                type: Input
            }], pauseOnHover: [{
                type: Input
            }], showProgress: [{
                type: Input
            }], actionLabel: [{
                type: Input
            }], showTimestamp: [{
                type: Input
            }], closed: [{
                type: Output
            }], actionClick: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ToastComponent };
//# sourceMappingURL=agt-ui-toast.mjs.map
