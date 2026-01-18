import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../../../../libs/input/src';

@Component({
  selector: 'muxima-input-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent],
  templateUrl: './input-doc.component.html',
  styleUrls: ['./input-doc.component.scss']
})
export class InputDocComponent {
  textValue = '';
  emailValue = '';
  passwordValue = '';
  searchValue = '';
  
  copyCode(code: string): void {
    navigator.clipboard.writeText(code);
  }

  get importCode(): string {
    return `import { InputComponent } from '@muxima-ui/input';

@Component({
  imports: [InputComponent, FormsModule]
})`;
  }

  get basicCode(): string {
    return `<muxima-input 
  [(ngModel)]="value"
  placeholder="Digite algo...">
</muxima-input>`;
  }

  get variantsCode(): string {
    return `<!-- Default -->
<muxima-input variant="default"></muxima-input>

<!-- Outlined -->
<muxima-input variant="outlined"></muxima-input>

<!-- Filled -->
<muxima-input variant="filled"></muxima-input>

<!-- Underlined -->
<muxima-input variant="underlined"></muxima-input>

<!-- Gradient -->
<muxima-input variant="gradient"></muxima-input>`;
  }

  get sizesCode(): string {
    return `<muxima-input size="sm"></muxima-input>
<muxima-input size="md"></muxima-input>
<muxima-input size="lg"></muxima-input>`;
  }

  get withIconsCode(): string {
    return `<!-- Prefix Icon -->
<muxima-input 
  prefixIcon="🔍"
  placeholder="Buscar...">
</muxima-input>

<!-- Suffix Icon -->
<muxima-input 
  suffixIcon="📧"
  placeholder="Email...">
</muxima-input>

<!-- Password with Toggle -->
<muxima-input 
  type="password"
  [showPasswordToggle]="true">
</muxima-input>`;
  }
}
