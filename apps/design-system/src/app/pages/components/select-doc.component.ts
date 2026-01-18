import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '../../../../../../libs/select/src';

@Component({
  selector: 'muxima-select-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent],
  templateUrl: './select-doc.component.html',
  styleUrls: ['./select-doc.component.scss']
})
export class SelectDocComponent {
  // Basic Options
  basicValue: any = null;
  basicOptions: SelectOption[] = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Python', value: 'py' },
    { label: 'Java', value: 'java' },
    { label: 'C#', value: 'csharp' }
  ];

  // Options with Icons
  iconValue: any = null;
  iconOptions: SelectOption[] = [
    { label: 'React', value: 'react', icon: '⚛️' },
    { label: 'Angular', value: 'angular', icon: '🅰️' },
    { label: 'Vue', value: 'vue', icon: '💚' },
    { label: 'Svelte', value: 'svelte', icon: '🔥' }
  ];

  // Countries
  countryValue: any = null;
  countryOptions: SelectOption[] = [
    { label: 'Brasil', value: 'br', icon: '🇧🇷' },
    { label: 'Portugal', value: 'pt', icon: '🇵🇹' },
    { label: 'Estados Unidos', value: 'us', icon: '🇺🇸' },
    { label: 'Espanha', value: 'es', icon: '🇪🇸' },
    { label: 'França', value: 'fr', icon: '🇫🇷' },
    { label: 'Alemanha', value: 'de', icon: '🇩🇪' }
  ];

  // Variants
  defaultValue: any = null;
  outlinedValue: any = null;
  filledValue: any = null;
  gradientValue: any = null;
  glassValue: any = null;

  // Sizes
  smallValue: any = null;
  mediumValue: any = null;
  largeValue: any = null;

  // States
  normalValue: any = null;
  errorValue: any = null;
  disabledValue: any = 'disabled';

  // Multiple Selection
  multipleValue: any[] = [];

  // Searchable
  searchableValue: any = null;
  searchableOptions: SelectOption[] = [
    { label: 'Angular', value: 'angular', icon: '🅰️' },
    { label: 'React', value: 'react', icon: '⚛️' },
    { label: 'Vue', value: 'vue', icon: '💚' },
    { label: 'Svelte', value: 'svelte', icon: '🔥' },
    { label: 'Next.js', value: 'nextjs', icon: '▲' },
    { label: 'Nuxt.js', value: 'nuxtjs', icon: '💎' },
    { label: 'Remix', value: 'remix', icon: '💿' },
    { label: 'Astro', value: 'astro', icon: '🚀' }
  ];

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode(): string {
    return `import { SelectComponent, SelectOption } from '@muxima-ui/select';

// No seu componente
export class MyComponent {
  selectedValue: any = null;
  
  options: SelectOption[] = [
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
    { label: 'Opção 3', value: '3' }
  ];
}`;
  }

  get basicCode(): string {
    return `<muxima-select
  label="Linguagem de Programação"
  [(ngModel)]="selectedValue"
  [options]="options"
  placeholder="Selecione uma linguagem"
  helperText="Escolha sua linguagem favorita"
></muxima-select>`;
  }

  get variantsCode(): string {
    return `<!-- Default -->
<muxima-select
  variant="default"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>

<!-- Outlined -->
<muxima-select
  variant="outlined"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>

<!-- Filled -->
<muxima-select
  variant="filled"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>

<!-- Gradient -->
<muxima-select
  variant="gradient"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>

<!-- Glassmorphism -->
<muxima-select
  variant="glass"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>`;
  }

  get sizesCode(): string {
    return `<!-- Small -->
<muxima-select size="sm" [(ngModel)]="value" [options]="options"></muxima-select>

<!-- Medium (default) -->
<muxima-select size="md" [(ngModel)]="value" [options]="options"></muxima-select>

<!-- Large -->
<muxima-select size="lg" [(ngModel)]="value" [options]="options"></muxima-select>`;
  }

  get featuresCode(): string {
    return `<!-- Searchable -->
<muxima-select
  [searchable]="true"
  label="Buscar Framework"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>

<!-- Multiple Selection -->
<muxima-select
  [multiple]="true"
  label="Selecione múltiplos"
  [(ngModel)]="values"
  [options]="options"
></muxima-select>

<!-- Clearable -->
<muxima-select
  [clearable]="true"
  label="Com botão limpar"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>

<!-- With Prefix Icon -->
<muxima-select
  prefixIcon="🌍"
  label="País"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>`;
  }

  get statesCode(): string {
    return `<!-- Normal -->
<muxima-select [(ngModel)]="value" [options]="options"></muxima-select>

<!-- With Error -->
<muxima-select
  [hasError]="true"
  errorMessage="Por favor, selecione uma opção"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>

<!-- Disabled -->
<muxima-select
  [disabled]="true"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>

<!-- Readonly -->
<muxima-select
  [readonly]="true"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>`;
  }
}
