import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CopyStatus = 'idle' | 'copying' | 'success' | 'error';

@Component({
  selector: 'muxima-copy-to-clipboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss']
})
export class CopyToClipboardComponent {
  @Input() content: string = '';
  @Input() label: string = 'Copiar';
  @Input() successMessage: string = 'Copiado!';
  @Input() errorMessage: string = 'Erro ao copiar';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variant: 'button' | 'icon' | 'inline' = 'button';
  @Input() showFeedback: boolean = true;
  @Input() feedbackDuration: number = 2000;
  @Input() showTooltip: boolean = true;

  @Output() copied = new EventEmitter<string>();
  @Output() error = new EventEmitter<Error>();

  status: CopyStatus = 'idle';
  tooltipVisible: boolean = false;

  private feedbackTimeout: any;

  async copyToClipboard(): Promise<void> {
    if (this.disabled || !this.content) return;

    this.status = 'copying';

    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(this.content);
      } else {
        // Fallback for older browsers or non-secure contexts
        this.copyUsingExecCommand();
      }

      this.status = 'success';
      this.copied.emit(this.content);

      if (this.showFeedback) {
        this.showFeedbackMessage();
      }
    } catch (err) {
      this.status = 'error';
      const error = err instanceof Error ? err : new Error('Failed to copy');
      this.error.emit(error);
      console.error('Copy failed:', err);

      if (this.showFeedback) {
        this.showFeedbackMessage();
      }
    }
  }

  private copyUsingExecCommand(): void {
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
    } finally {
      document.body.removeChild(textArea);
    }
  }

  private showFeedbackMessage(): void {
    if (this.feedbackTimeout) {
      clearTimeout(this.feedbackTimeout);
    }

    this.feedbackTimeout = setTimeout(() => {
      this.status = 'idle';
    }, this.feedbackDuration);
  }

  showTooltipHandler(): void {
    if (this.showTooltip && this.status === 'idle') {
      this.tooltipVisible = true;
    }
  }

  hideTooltipHandler(): void {
    this.tooltipVisible = false;
  }

  getButtonClass(): string {
    const classes = ['copy-btn', `copy-btn--${this.variant}`, `copy-btn--${this.size}`];
    
    if (this.disabled) {
      classes.push('copy-btn--disabled');
    }
    
    if (this.status !== 'idle') {
      classes.push(`copy-btn--${this.status}`);
    }

    return classes.join(' ');
  }

  getIcon(): string {
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

  getLabel(): string {
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

  ngOnDestroy(): void {
    if (this.feedbackTimeout) {
      clearTimeout(this.feedbackTimeout);
    }
  }
}
