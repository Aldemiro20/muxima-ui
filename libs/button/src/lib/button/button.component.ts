import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonType = 'submit' | 'reset' |'button' | ''

@Component({
  selector: 'muxima-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() text?: string; 
  @Input() disabled = false;

  @Input() type: ButtonType = 'submit'
  @Input() icon?: string
  @Input() wFull = false

  @Input() iconPosition: 'left' | 'right' = 'left'

  /** How large should the button be? */
  @Input() size:  'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'lg';

  /** Button variants with modern styles */
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'gradient' | 'glass' | 'outline' | 'ghost' | 'neon' = 'primary'

  getClasses() {
    return ['agt--button', `agt--button--${this.size}`, `agt--button--${this.variant}`, `${this.wFull ? 'agt--button-w-full' : ''}`];
  }
}
