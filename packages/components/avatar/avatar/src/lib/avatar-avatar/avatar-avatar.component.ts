import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';
type AvatarShape = 'circle' | 'square' | 'rounded';

@Component({
  selector: 'muxima-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-avatar.component.html',
  styleUrls: ['./avatar-avatar.component.scss'],
})
export class AvatarAvatarComponent {
  @Input() src?: string;
  @Input() alt: string = 'Avatar';
  @Input() name?: string;
  @Input() size: AvatarSize = 'md';
  @Input() status: AvatarStatus = 'none';
  @Input() badge?: string | number;
  @Input() shape: AvatarShape = 'circle';
  @Input() bgColor?: string;
  @Input() clickable: boolean = false;
  @Input() tooltip?: string;
  
  @Output() avatarClick = new EventEmitter<MouseEvent>();
  
  imageError = false;
  showTooltip = false;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.clickable) {
      this.avatarClick.emit(event);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltip) {
      this.showTooltip = true;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.showTooltip = false;
  }

  getInitials(): string {
    if (!this.name) return '?';
    const names = this.name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  onImageError(): void {
    this.imageError = true;
  }

  getRandomColor(): string {
    if (this.bgColor) return this.bgColor;
    // Cores inspiradas no logo Muxima - Gradiente azul para rosa
    const muximaColors = [
      '#3B82F6', // Azul vibrante
      '#6366F1', // Índigo
      '#8B5CF6', // Roxo
      '#A855F7', // Púrpura
      '#C026D3', // Fúcsia
      '#D946EF', // Rosa magenta
    ];
    const hash = this.name ? this.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    return muximaColors[hash % muximaColors.length];
  }

  getTooltipText(): string {
    return this.tooltip || this.name || this.alt;
  }
}
