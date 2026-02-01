import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerService, DrawerConfig } from './drawer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'muxima-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() position: 'left' | 'right' | 'top' | 'bottom' = 'right';
  @Input() size = '400px';
  @Input() hasBackdrop = true;
  @Input() closeOnBackdropClick = true;
  @Input() closeOnEscape = true;
  @Input() isOpen = false;
  
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  
  private subscriptions: Subscription[] = [];

  constructor(private drawerService: DrawerService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.drawerService.openDrawer$.subscribe(({ config }) => {
        this.applyConfig(config);
        this.open();
      }),
      this.drawerService.closeDrawer$.subscribe(() => {
        this.close();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.closeOnEscape && this.isOpen) {
      this.close();
    }
  }

  open(): void {
    this.isOpen = true;
    this.opened.emit();
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen = false;
    this.closed.emit();
    document.body.style.overflow = '';
  }

  onBackdropClick(): void {
    if (this.closeOnBackdropClick) {
      this.close();
    }
  }

  private applyConfig(config: DrawerConfig): void {
    if (config.position) this.position = config.position;
    if (config.size) this.size = config.size;
    if (config.hasBackdrop !== undefined) this.hasBackdrop = config.hasBackdrop;
    if (config.closeOnBackdropClick !== undefined) this.closeOnBackdropClick = config.closeOnBackdropClick;
    if (config.closeOnEscape !== undefined) this.closeOnEscape = config.closeOnEscape;
  }

  getDrawerStyle(): any {
    const styles: any = {};
    
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
