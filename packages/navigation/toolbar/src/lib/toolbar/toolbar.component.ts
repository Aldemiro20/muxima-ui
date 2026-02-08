import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToolbarVariant = 'default' | 'compact' | 'minimal';
export type ToolbarAlignment = 'start' | 'center' | 'between' | 'end';

@Component({
  selector: 'muxima-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() variant: ToolbarVariant = 'default';
  @Input() alignment: ToolbarAlignment = 'between';
  @Input() sticky: boolean = false;
  @Input() shadow: boolean = true;

  get variantClass(): string {
    return `toolbar-${this.variant}`;
  }

  get alignmentClass(): string {
    return `toolbar-align-${this.alignment}`;
  }
}
