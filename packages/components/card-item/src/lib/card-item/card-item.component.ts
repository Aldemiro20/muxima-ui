import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardItemVariant = 'default' | 'compact' | 'minimal';
export type CardItemOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'muxima-card-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {
  @Input() image: string = '';
  @Input() imageAlt: string = '';
  @Input() badge: string = '';
  @Input() badgeColor: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'primary';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() description: string = '';
  @Input() variant: CardItemVariant = 'default';
  @Input() orientation: CardItemOrientation = 'vertical';
  @Input() hoverable: boolean = true;
  @Input() loading: boolean = false;

  @Output() click = new EventEmitter<void>();
  @Output() imageClick = new EventEmitter<void>();

  get variantClass(): string {
    return `card-item-${this.variant}`;
  }

  get orientationClass(): string {
    return `card-item-${this.orientation}`;
  }

  get badgeColorClass(): string {
    return `badge-${this.badgeColor}`;
  }

  onCardClick(): void {
    this.click.emit();
  }

  onImageClick(event: Event): void {
    event.stopPropagation();
    this.imageClick.emit();
  }
}
