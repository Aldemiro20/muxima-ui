import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SettingsItemVariant = 'default' | 'toggle' | 'action';

@Component({
  selector: 'muxima-settings-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utility-settings-item-settings-item.component.html',
  styleUrls: ['./utility-settings-item-settings-item.component.scss'],
})
export class UtilitySettingsItemSettingsItemComponent {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() variant: SettingsItemVariant = 'default';
}
