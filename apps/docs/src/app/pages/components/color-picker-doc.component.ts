import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerComponent, ColorFormat, ColorPalette } from '@muxima-ui/color-picker';

@Component({
  selector: 'app-color-picker-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, ColorPickerComponent],
  templateUrl: './color-picker-doc.component.html',
  styleUrls: ['./color-picker-doc.component.scss']
})
export class ColorPickerDocComponent {
  selectedColor: string = '#667eea';
  colorWithAlpha: string = '#667eea';
  gradientColor: string = '#667eea';
  customPalettes: ColorPalette[] = [
    {
      name: 'Muxima',
      colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe']
    }
  ];
  colorFormat: ColorFormat | null = null;
  format: 'hex' | 'rgb' | 'hsl' = 'hex';

  onColorChange(format: ColorFormat) {
    this.colorFormat = format;
  }

  onFormatChange(fmt: 'hex' | 'rgb' | 'hsl') {
    this.format = fmt;
  }
}
