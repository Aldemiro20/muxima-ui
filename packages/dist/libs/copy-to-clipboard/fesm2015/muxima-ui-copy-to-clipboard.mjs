import { __awaiter } from 'tslib';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class CopyToClipboardComponent {
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
    copyToClipboard() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.disabled || !this.content)
                return;
            this.status = 'copying';
            try {
                // Try modern Clipboard API first
                if (navigator.clipboard && window.isSecureContext) {
                    yield navigator.clipboard.writeText(this.content);
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
        });
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

/**
 * Generated bundle index. Do not edit.
 */

export { CopyToClipboardComponent };
//# sourceMappingURL=muxima-ui-copy-to-clipboard.mjs.map
