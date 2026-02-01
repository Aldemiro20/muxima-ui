import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleToggleComponent } from '@muxima-ui/toggle';

@Component({
  selector: 'muxima-toggle-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, ToggleToggleComponent],
  templateUrl: './toggle-doc.component.html',
  styleUrls: ['./toggle-doc.component.scss']
})
export class ToggleDocComponent {
  basicToggle = false;
  disabledToggle = true;
  sizes = {
    small: false,
    medium: true,
    large: false
  };

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode() {
    return `import { ToggleToggleComponent } from '@muxima-ui/toggle';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [ToggleToggleComponent, FormsModule]
})`;
  }

  get basicCode() {
    return `<muxima-toggle-toggle 
  [(ngModel)]="isEnabled"
  label="Ativar notificaÃ§Ãµes">
</muxima-toggle-toggle>`;
  }

  get sizesCode() {
    return `<!-- Pequeno -->
<muxima-toggle-toggle 
  [(ngModel)]="value"
  size="sm">
</muxima-toggle-toggle>

<!-- MÃ©dio (padrÃ£o) -->
<muxima-toggle-toggle 
  [(ngModel)]="value"
  size="md">
</muxima-toggle-toggle>

<!-- Grande -->
<muxima-toggle-toggle 
  [(ngModel)]="value"
  size="lg">
</muxima-toggle-toggle>`;
  }
}

