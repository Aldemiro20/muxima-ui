import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogService, ConfirmationConfig, ConfirmationVariant } from './confirmation-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'muxima-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  @Input() title = 'Confirmar Ação';
  @Input() message = 'Tem certeza que deseja realizar esta ação?';
  @Input() variant: ConfirmationVariant = 'info';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  @Input() icon?: string;
  @Input() isOpen = false;
  
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  
  private subscription?: Subscription;

  constructor(private confirmationService: ConfirmationDialogService) {}

  ngOnInit(): void {
    this.subscription = this.confirmationService.openDialog$.subscribe((config) => {
      this.applyConfig(config);
      this.open();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.cancel();
    }
  }

  open(): void {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen = false;
    this.closed.emit();
    document.body.style.overflow = '';
  }

  confirm(): void {
    this.confirmed.emit();
    this.confirmationService.sendResult(true);
    this.close();
  }

  cancel(): void {
    this.cancelled.emit();
    this.confirmationService.sendResult(false);
    this.close();
  }

  private applyConfig(config: ConfirmationConfig): void {
    this.title = config.title;
    this.message = config.message;
    if (config.variant) this.variant = config.variant;
    if (config.confirmText) this.confirmText = config.confirmText;
    if (config.cancelText) this.cancelText = config.cancelText;
    if (config.icon) this.icon = config.icon;
  }

  getVariantIcon(): string {
    if (this.icon) return this.icon;
    
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
