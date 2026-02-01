import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'muxima-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip-chip.component.html',
  styleUrls: ['./chip-chip.component.css'],
})
export class ChipChipComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() avatar = '';
  @Input() removable = false;
  @Input() disabled = false;
  @Input() selected = false;
  @Input() clickable = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'filled' | 'outlined' | 'light' = 'filled';
  @Input() color: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'default';
  
  @Output() removed = new EventEmitter<void>();
  @Output() clicked = new EventEmitter<void>();

  getClasses() {
    return [
      'muxima--chip',
      `muxima--chip--${this.size}`,
      `muxima--chip--${this.variant}`,
      `muxima--chip--${this.color}`,
      this.disabled ? 'muxima--chip--disabled' : '',
      this.selected ? 'muxima--chip--selected' : '',
      this.clickable && !this.disabled ? 'muxima--chip--clickable' : '',
    ].filter(Boolean);
  }

  handleClick() {
    if (!this.disabled && this.clickable) {
      this.clicked.emit();
    }
  }

  handleRemove(event: Event) {
    event.stopPropagation();
    if (!this.disabled) {
      this.removed.emit();
    }
  }
}

