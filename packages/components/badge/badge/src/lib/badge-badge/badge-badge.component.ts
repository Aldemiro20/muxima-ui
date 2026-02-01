import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'solid' | 'outline' | 'soft';
type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'muxima-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge-badge.component.html',
  styleUrls: ['./badge-badge.component.scss'],
})
export class BadgeBadgeComponent {
  @Input() variant: BadgeVariant = 'solid';
  @Input() color: BadgeColor = 'primary';
  @Input() size: BadgeSize = 'md';
  @Input() dot = false;
  @Input() removable = false;
}
