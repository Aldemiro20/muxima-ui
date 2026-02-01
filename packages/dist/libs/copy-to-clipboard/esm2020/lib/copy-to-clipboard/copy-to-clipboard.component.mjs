import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class CopyToClipboardComponent {
    constructor() {
        this.content = '';
        this.label = 'Copiar';
        this.successMessage = 'Copiado!';
        this.errorMessage = 'Erro ao copiar';
        this.disabled = false;
        this.size = 'medium';
        this.variant = 'button';
        this.showFeedback = true;
        this.feedbackDuration = 2000;
        this.showTooltip = true;
        this.copied = new EventEmitter();
        this.error = new EventEmitter();
        this.status = 'idle';
        this.tooltipVisible = false;
    }
    async copyToClipboard() {
        if (this.disabled || !this.content)
            return;
        this.status = 'copying';
        try {
            // Try modern Clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(this.content);
            }
            else {
                // Fallback for older browsers or non-secure contexts
                this.copyUsingExecCommand();
            }
            this.status = 'success';
            this.copied.emit(this.content);
            if (this.showFeedback) {
                this.showFeedbackMessage();
            }
        }
        catch (err) {
            this.status = 'error';
            const error = err instanceof Error ? err : new Error('Failed to copy');
            this.error.emit(error);
            console.error('Copy failed:', err);
            if (this.showFeedback) {
                this.showFeedbackMessage();
            }
        }
    }
    copyUsingExecCommand() {
        const textArea = document.createElement('textarea');
        textArea.value = this.content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (!successful) {
                throw new Error('execCommand returned false');
            }
        }
        finally {
            document.body.removeChild(textArea);
        }
    }
    showFeedbackMessage() {
        if (this.feedbackTimeout) {
            clearTimeout(this.feedbackTimeout);
        }
        this.feedbackTimeout = setTimeout(() => {
            this.status = 'idle';
        }, this.feedbackDuration);
    }
    showTooltipHandler() {
        if (this.showTooltip && this.status === 'idle') {
            this.tooltipVisible = true;
        }
    }
    hideTooltipHandler() {
        this.tooltipVisible = false;
    }
    getButtonClass() {
        const classes = ['copy-btn', `copy-btn--${this.variant}`, `copy-btn--${this.size}`];
        if (this.disabled) {
            classes.push('copy-btn--disabled');
        }
        if (this.status !== 'idle') {
            classes.push(`copy-btn--${this.status}`);
        }
        return classes.join(' ');
    }
    getIcon() {
        switch (this.status) {
            case 'copying':
                return '⏳';
            case 'success':
                return '✓';
            case 'error':
                return '✗';
            default:
                return this.variant === 'icon' ? '📋' : '';
        }
    }
    getLabel() {
        switch (this.status) {
            case 'copying':
                return 'Copiando...';
            case 'success':
                return this.successMessage;
            case 'error':
                return this.errorMessage;
            default:
                return this.label;
        }
    }
    ngOnDestroy() {
        if (this.feedbackTimeout) {
            clearTimeout(this.feedbackTimeout);
        }
    }
}
CopyToClipboardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CopyToClipboardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CopyToClipboardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CopyToClipboardComponent, isStandalone: true, selector: "muxima-copy-to-clipboard", inputs: { content: "content", label: "label", successMessage: "successMessage", errorMessage: "errorMessage", disabled: "disabled", size: "size", variant: "variant", showFeedback: "showFeedback", feedbackDuration: "feedbackDuration", showTooltip: "showTooltip" }, outputs: { copied: "copied", error: "error" }, ngImport: i0, template: "<button\r\n  [class]=\"getButtonClass()\"\r\n  (click)=\"copyToClipboard()\"\r\n  (mouseenter)=\"showTooltipHandler()\"\r\n  (mouseleave)=\"hideTooltipHandler()\"\r\n  [disabled]=\"disabled\"\r\n  type=\"button\">\r\n  \r\n  <!-- Icon -->\r\n  <span class=\"copy-icon\" *ngIf=\"variant === 'icon' || status !== 'idle'\">\r\n    {{ getIcon() }}\r\n  </span>\r\n\r\n  <!-- Label -->\r\n  <span class=\"copy-label\" *ngIf=\"variant !== 'icon'\">\r\n    {{ getLabel() }}\r\n  </span>\r\n\r\n  <!-- Tooltip -->\r\n  <span class=\"copy-tooltip\" *ngIf=\"tooltipVisible && status === 'idle'\">\r\n    {{ label }}\r\n  </span>\r\n</button>\r\n", styles: ["@keyframes pulse{0%,to{transform:scale(1)}50%{transform:scale(1.05)}}@keyframes checkmark{0%{transform:scale(0) rotate(0)}50%{transform:scale(1.2) rotate(180deg)}to{transform:scale(1) rotate(360deg)}}@keyframes shake{0%,to{transform:translate(0)}25%{transform:translate(-5px)}75%{transform:translate(5px)}}.copy-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.75rem 1.5rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:8px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 12px #667eea4d;-webkit-user-select:none;user-select:none}.copy-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px #667eea66}.copy-btn:active:not(:disabled){transform:translateY(0);box-shadow:0 2px 8px #667eea4d}.copy-btn:focus-visible{outline:2px solid #667eea;outline-offset:2px}.copy-btn--small{padding:.5rem 1rem;font-size:.875rem;border-radius:6px}.copy-btn--small.copy-btn--icon{width:32px;height:32px;padding:0}.copy-btn--medium{padding:.75rem 1.5rem;font-size:1rem}.copy-btn--medium.copy-btn--icon{width:40px;height:40px;padding:0}.copy-btn--large{padding:1rem 2rem;font-size:1.125rem;border-radius:10px}.copy-btn--large.copy-btn--icon{width:48px;height:48px;padding:0}.copy-btn--inline{background:transparent;color:#667eea;box-shadow:none;padding:.25rem .5rem;text-decoration:underline;text-decoration-style:dashed}.copy-btn--inline:hover:not(:disabled){background:rgba(102,126,234,.1);transform:none;box-shadow:none}.copy-btn--icon{padding:0;width:40px;height:40px;border-radius:50%}.copy-btn--icon .copy-label{display:none}.copy-btn--icon .copy-icon{font-size:1.25rem}.copy-btn--copying .copy-icon{animation:pulse 1s ease-in-out infinite}.copy-btn--success{background:linear-gradient(135deg,#10b981 0%,#059669 100%);box-shadow:0 4px 12px #10b9814d}.copy-btn--success .copy-icon{animation:checkmark .5s ease-out}.copy-btn--error{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);box-shadow:0 4px 12px #ef44444d}.copy-btn--error .copy-icon{animation:shake .5s ease-out}.copy-btn--disabled,.copy-btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important;box-shadow:none!important}.copy-icon{display:flex;align-items:center;justify-content:center;font-size:1.125rem;line-height:1}.copy-label{white-space:nowrap}.copy-tooltip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translate(-50%);background:#1f2937;color:#fff;padding:.5rem 1rem;border-radius:6px;font-size:.875rem;font-weight:500;white-space:nowrap;pointer-events:none;z-index:1000;box-shadow:0 4px 12px #00000026}.copy-tooltip:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);border:6px solid transparent;border-top-color:#1f2937}@media (max-width: 768px){.copy-btn--small{padding:.4rem .8rem;font-size:.8rem}.copy-btn--medium{padding:.6rem 1.2rem;font-size:.9rem}.copy-btn--large{padding:.8rem 1.6rem;font-size:1rem}.copy-tooltip{font-size:.75rem;padding:.4rem .8rem}}@media print{.copy-btn{display:none}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CopyToClipboardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-copy-to-clipboard', standalone: true, imports: [CommonModule], template: "<button\r\n  [class]=\"getButtonClass()\"\r\n  (click)=\"copyToClipboard()\"\r\n  (mouseenter)=\"showTooltipHandler()\"\r\n  (mouseleave)=\"hideTooltipHandler()\"\r\n  [disabled]=\"disabled\"\r\n  type=\"button\">\r\n  \r\n  <!-- Icon -->\r\n  <span class=\"copy-icon\" *ngIf=\"variant === 'icon' || status !== 'idle'\">\r\n    {{ getIcon() }}\r\n  </span>\r\n\r\n  <!-- Label -->\r\n  <span class=\"copy-label\" *ngIf=\"variant !== 'icon'\">\r\n    {{ getLabel() }}\r\n  </span>\r\n\r\n  <!-- Tooltip -->\r\n  <span class=\"copy-tooltip\" *ngIf=\"tooltipVisible && status === 'idle'\">\r\n    {{ label }}\r\n  </span>\r\n</button>\r\n", styles: ["@keyframes pulse{0%,to{transform:scale(1)}50%{transform:scale(1.05)}}@keyframes checkmark{0%{transform:scale(0) rotate(0)}50%{transform:scale(1.2) rotate(180deg)}to{transform:scale(1) rotate(360deg)}}@keyframes shake{0%,to{transform:translate(0)}25%{transform:translate(-5px)}75%{transform:translate(5px)}}.copy-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.75rem 1.5rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:8px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 12px #667eea4d;-webkit-user-select:none;user-select:none}.copy-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px #667eea66}.copy-btn:active:not(:disabled){transform:translateY(0);box-shadow:0 2px 8px #667eea4d}.copy-btn:focus-visible{outline:2px solid #667eea;outline-offset:2px}.copy-btn--small{padding:.5rem 1rem;font-size:.875rem;border-radius:6px}.copy-btn--small.copy-btn--icon{width:32px;height:32px;padding:0}.copy-btn--medium{padding:.75rem 1.5rem;font-size:1rem}.copy-btn--medium.copy-btn--icon{width:40px;height:40px;padding:0}.copy-btn--large{padding:1rem 2rem;font-size:1.125rem;border-radius:10px}.copy-btn--large.copy-btn--icon{width:48px;height:48px;padding:0}.copy-btn--inline{background:transparent;color:#667eea;box-shadow:none;padding:.25rem .5rem;text-decoration:underline;text-decoration-style:dashed}.copy-btn--inline:hover:not(:disabled){background:rgba(102,126,234,.1);transform:none;box-shadow:none}.copy-btn--icon{padding:0;width:40px;height:40px;border-radius:50%}.copy-btn--icon .copy-label{display:none}.copy-btn--icon .copy-icon{font-size:1.25rem}.copy-btn--copying .copy-icon{animation:pulse 1s ease-in-out infinite}.copy-btn--success{background:linear-gradient(135deg,#10b981 0%,#059669 100%);box-shadow:0 4px 12px #10b9814d}.copy-btn--success .copy-icon{animation:checkmark .5s ease-out}.copy-btn--error{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);box-shadow:0 4px 12px #ef44444d}.copy-btn--error .copy-icon{animation:shake .5s ease-out}.copy-btn--disabled,.copy-btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important;box-shadow:none!important}.copy-icon{display:flex;align-items:center;justify-content:center;font-size:1.125rem;line-height:1}.copy-label{white-space:nowrap}.copy-tooltip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translate(-50%);background:#1f2937;color:#fff;padding:.5rem 1rem;border-radius:6px;font-size:.875rem;font-weight:500;white-space:nowrap;pointer-events:none;z-index:1000;box-shadow:0 4px 12px #00000026}.copy-tooltip:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);border:6px solid transparent;border-top-color:#1f2937}@media (max-width: 768px){.copy-btn--small{padding:.4rem .8rem;font-size:.8rem}.copy-btn--medium{padding:.6rem 1.2rem;font-size:.9rem}.copy-btn--large{padding:.8rem 1.6rem;font-size:1rem}.copy-tooltip{font-size:.75rem;padding:.4rem .8rem}}@media print{.copy-btn{display:none}}\n"] }]
        }], propDecorators: { content: [{
                type: Input
            }], label: [{
                type: Input
            }], successMessage: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], variant: [{
                type: Input
            }], showFeedback: [{
                type: Input
            }], feedbackDuration: [{
                type: Input
            }], showTooltip: [{
                type: Input
            }], copied: [{
                type: Output
            }], error: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10by1jbGlwYm9hcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdXRpbGl0eS9jb3B5LXRvLWNsaXBib2FyZC9zcmMvbGliL2NvcHktdG8tY2xpcGJvYXJkL2NvcHktdG8tY2xpcGJvYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3V0aWxpdHkvY29weS10by1jbGlwYm9hcmQvc3JjL2xpYi9jb3B5LXRvLWNsaXBib2FyZC9jb3B5LXRvLWNsaXBib2FyZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBVy9DLE1BQU0sT0FBTyx3QkFBd0I7SUFQckM7UUFRVyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFVBQUssR0FBVyxRQUFRLENBQUM7UUFDekIsbUJBQWMsR0FBVyxVQUFVLENBQUM7UUFDcEMsaUJBQVksR0FBVyxnQkFBZ0IsQ0FBQztRQUN4QyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLFNBQUksR0FBaUMsUUFBUSxDQUFDO1FBQzlDLFlBQU8sR0FBaUMsUUFBUSxDQUFDO1FBQ2pELGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLHFCQUFnQixHQUFXLElBQUksQ0FBQztRQUNoQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUUzQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNwQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUU1QyxXQUFNLEdBQWUsTUFBTSxDQUFDO1FBQzVCLG1CQUFjLEdBQVksS0FBSyxDQUFDO0tBeUhqQztJQXJIQyxLQUFLLENBQUMsZUFBZTtRQUNuQixJQUFJLElBQUksQ0FBQyxR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U0FDcEM7SUFDSCxDQUFDOztzSEF4SVUsd0JBQXdCOzBHQUF4Qix3QkFBd0IsMllDWnJDLDZuQkF1QkEsNG9HRGZZLFlBQVk7NEZBSVgsd0JBQXdCO2tCQVBwQyxTQUFTOytCQUNFLDBCQUEwQixjQUN4QixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUM7OEJBS2QsT0FBTztzQkFBZixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBDb3B5U3RhdHVzID0gJ2lkbGUnIHwgJ2NvcHlpbmcnIHwgJ3N1Y2Nlc3MnIHwgJ2Vycm9yJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXV4aW1hLWNvcHktdG8tY2xpcGJvYXJkJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb3B5LXRvLWNsaXBib2FyZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29weS10by1jbGlwYm9hcmQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29weVRvQ2xpcGJvYXJkQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBjb250ZW50OiBzdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nID0gJ0NvcGlhcic7XHJcbiAgQElucHV0KCkgc3VjY2Vzc01lc3NhZ2U6IHN0cmluZyA9ICdDb3BpYWRvISc7XHJcbiAgQElucHV0KCkgZXJyb3JNZXNzYWdlOiBzdHJpbmcgPSAnRXJybyBhbyBjb3BpYXInO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2l6ZTogJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJyA9ICdtZWRpdW0nO1xyXG4gIEBJbnB1dCgpIHZhcmlhbnQ6ICdidXR0b24nIHwgJ2ljb24nIHwgJ2lubGluZScgPSAnYnV0dG9uJztcclxuICBASW5wdXQoKSBzaG93RmVlZGJhY2s6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGZlZWRiYWNrRHVyYXRpb246IG51bWJlciA9IDIwMDA7XHJcbiAgQElucHV0KCkgc2hvd1Rvb2x0aXA6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgY29waWVkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxFcnJvcj4oKTtcclxuXHJcbiAgc3RhdHVzOiBDb3B5U3RhdHVzID0gJ2lkbGUnO1xyXG4gIHRvb2x0aXBWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgZmVlZGJhY2tUaW1lb3V0OiBhbnk7XHJcblxyXG4gIGFzeW5jIGNvcHlUb0NsaXBib2FyZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmNvbnRlbnQpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnN0YXR1cyA9ICdjb3B5aW5nJztcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBUcnkgbW9kZXJuIENsaXBib2FyZCBBUEkgZmlyc3RcclxuICAgICAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQgJiYgd2luZG93LmlzU2VjdXJlQ29udGV4dCkge1xyXG4gICAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRoaXMuY29udGVudCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRmFsbGJhY2sgZm9yIG9sZGVyIGJyb3dzZXJzIG9yIG5vbi1zZWN1cmUgY29udGV4dHNcclxuICAgICAgICB0aGlzLmNvcHlVc2luZ0V4ZWNDb21tYW5kKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc3RhdHVzID0gJ3N1Y2Nlc3MnO1xyXG4gICAgICB0aGlzLmNvcGllZC5lbWl0KHRoaXMuY29udGVudCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5zaG93RmVlZGJhY2spIHtcclxuICAgICAgICB0aGlzLnNob3dGZWVkYmFja01lc3NhZ2UoKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzID0gJ2Vycm9yJztcclxuICAgICAgY29uc3QgZXJyb3IgPSBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyciA6IG5ldyBFcnJvcignRmFpbGVkIHRvIGNvcHknKTtcclxuICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcclxuICAgICAgY29uc29sZS5lcnJvcignQ29weSBmYWlsZWQ6JywgZXJyKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNob3dGZWVkYmFjaykge1xyXG4gICAgICAgIHRoaXMuc2hvd0ZlZWRiYWNrTWVzc2FnZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvcHlVc2luZ0V4ZWNDb21tYW5kKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgdGV4dEFyZWEudmFsdWUgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICB0ZXh0QXJlYS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcbiAgICB0ZXh0QXJlYS5zdHlsZS5sZWZ0ID0gJy05OTk5OTlweCc7XHJcbiAgICB0ZXh0QXJlYS5zdHlsZS50b3AgPSAnLTk5OTk5OXB4JztcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xyXG4gICAgdGV4dEFyZWEuZm9jdXMoKTtcclxuICAgIHRleHRBcmVhLnNlbGVjdCgpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHN1Y2Nlc3NmdWwgPSBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgICBpZiAoIXN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4ZWNDb21tYW5kIHJldHVybmVkIGZhbHNlJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dEFyZWEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93RmVlZGJhY2tNZXNzYWdlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZmVlZGJhY2tUaW1lb3V0KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZlZWRiYWNrVGltZW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5mZWVkYmFja1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zdGF0dXMgPSAnaWRsZSc7XHJcbiAgICB9LCB0aGlzLmZlZWRiYWNrRHVyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgc2hvd1Rvb2x0aXBIYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2hvd1Rvb2x0aXAgJiYgdGhpcy5zdGF0dXMgPT09ICdpZGxlJykge1xyXG4gICAgICB0aGlzLnRvb2x0aXBWaXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGVUb29sdGlwSGFuZGxlcigpOiB2b2lkIHtcclxuICAgIHRoaXMudG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldEJ1dHRvbkNsYXNzKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBjbGFzc2VzID0gWydjb3B5LWJ0bicsIGBjb3B5LWJ0bi0tJHt0aGlzLnZhcmlhbnR9YCwgYGNvcHktYnRuLS0ke3RoaXMuc2l6ZX1gXTtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgY2xhc3Nlcy5wdXNoKCdjb3B5LWJ0bi0tZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc3RhdHVzICE9PSAnaWRsZScpIHtcclxuICAgICAgY2xhc3Nlcy5wdXNoKGBjb3B5LWJ0bi0tJHt0aGlzLnN0YXR1c31gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICBnZXRJY29uKCk6IHN0cmluZyB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuc3RhdHVzKSB7XHJcbiAgICAgIGNhc2UgJ2NvcHlpbmcnOlxyXG4gICAgICAgIHJldHVybiAn4o+zJztcclxuICAgICAgY2FzZSAnc3VjY2Vzcyc6XHJcbiAgICAgICAgcmV0dXJuICfinJMnO1xyXG4gICAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgICAgcmV0dXJuICfinJcnO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhcmlhbnQgPT09ICdpY29uJyA/ICfwn5OLJyA6ICcnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcclxuICAgIHN3aXRjaCAodGhpcy5zdGF0dXMpIHtcclxuICAgICAgY2FzZSAnY29weWluZyc6XHJcbiAgICAgICAgcmV0dXJuICdDb3BpYW5kby4uLic7XHJcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1Y2Nlc3NNZXNzYWdlO1xyXG4gICAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JNZXNzYWdlO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5mZWVkYmFja1RpbWVvdXQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZmVlZGJhY2tUaW1lb3V0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGJ1dHRvblxyXG4gIFtjbGFzc109XCJnZXRCdXR0b25DbGFzcygpXCJcclxuICAoY2xpY2spPVwiY29weVRvQ2xpcGJvYXJkKClcIlxyXG4gIChtb3VzZWVudGVyKT1cInNob3dUb29sdGlwSGFuZGxlcigpXCJcclxuICAobW91c2VsZWF2ZSk9XCJoaWRlVG9vbHRpcEhhbmRsZXIoKVwiXHJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgXHJcbiAgPCEtLSBJY29uIC0tPlxyXG4gIDxzcGFuIGNsYXNzPVwiY29weS1pY29uXCIgKm5nSWY9XCJ2YXJpYW50ID09PSAnaWNvbicgfHwgc3RhdHVzICE9PSAnaWRsZSdcIj5cclxuICAgIHt7IGdldEljb24oKSB9fVxyXG4gIDwvc3Bhbj5cclxuXHJcbiAgPCEtLSBMYWJlbCAtLT5cclxuICA8c3BhbiBjbGFzcz1cImNvcHktbGFiZWxcIiAqbmdJZj1cInZhcmlhbnQgIT09ICdpY29uJ1wiPlxyXG4gICAge3sgZ2V0TGFiZWwoKSB9fVxyXG4gIDwvc3Bhbj5cclxuXHJcbiAgPCEtLSBUb29sdGlwIC0tPlxyXG4gIDxzcGFuIGNsYXNzPVwiY29weS10b29sdGlwXCIgKm5nSWY9XCJ0b29sdGlwVmlzaWJsZSAmJiBzdGF0dXMgPT09ICdpZGxlJ1wiPlxyXG4gICAge3sgbGFiZWwgfX1cclxuICA8L3NwYW4+XHJcbjwvYnV0dG9uPlxyXG4iXX0=