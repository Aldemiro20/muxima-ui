import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type CardVariant = 'default' | 'bordered' | 'elevated' | 'african-pattern' | 
                   'gradient-blue' | 'gradient-purple' | 'gradient-sunset' | 
                   'glassmorphism' | 'neon' | 'minimal' | 'shadow-lg' | 
                   'outline-gradient' | 'dark';
type CardSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'muxima-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-card.component.html',
  styleUrls: ['./card-card.component.scss'],
})
export class CardCardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() size: CardSize = 'md';
  @Input() hoverable = false;
  @Input() clickable = false;
  @Input() loading = false;
}
