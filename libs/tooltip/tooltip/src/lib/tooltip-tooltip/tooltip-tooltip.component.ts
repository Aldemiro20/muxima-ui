import { Component, Input, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant = 'dark' | 'light' | 'primary' | 'success' | 'warning' | 'error';
export type TooltipSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'muxima-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip-tooltip.component.html',
  styleUrls: ['./tooltip-tooltip.component.scss'],
})
export class TooltipComponent implements OnDestroy {
  @Input() text: string = '';
  @Input() position: TooltipPosition = 'top';
  @Input() variant: TooltipVariant = 'dark';
  @Input() size: TooltipSize = 'md';
  @Input() disabled: boolean = false;
  @Input() delay: number = 200;
  @Input() maxWidth: string = '250px';
  @Input() showArrow: boolean = true;

  visible: boolean = false;
  private showTimeout: any;
  private hideTimeout: any;

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.disabled || !this.text) return;
    
    clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => {
      this.visible = true;
    }, this.delay);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => {
      this.visible = false;
    }, 100);
  }

  @HostListener('click')
  onClick() {
    if (this.disabled) return;
    this.visible = false;
  }

  get tooltipClasses(): string[] {
    const classes = ['muxima-tooltip'];
    classes.push(`muxima-tooltip--${this.position}`);
    classes.push(`muxima-tooltip--${this.variant}`);
    classes.push(`muxima-tooltip--${this.size}`);
    if (this.visible) classes.push('muxima-tooltip--visible');
    if (!this.showArrow) classes.push('muxima-tooltip--no-arrow');
    return classes;
  }

  ngOnDestroy() {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);
  }
}
