import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '@muxima-ui/select';


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
    { label: 'React', value: 'react', icon: 'âš›ï¸' },
    { label: 'Angular', value: 'angular', icon: 'ðŸ…°ï¸' },
    { label: 'Vue', value: 'vue', icon: 'ðŸ’š' },
    { label: 'Svelte', value: 'svelte', icon: 'ðŸ”¥' }
  ];

  // Countries
  countryValue: any = null;
  countryOptions: SelectOption[] = [
    { label: 'Brasil', value: 'br', icon: 'ðŸ‡§ðŸ‡·' },
    { label: 'Portugal', value: 'pt', icon: 'ðŸ‡µðŸ‡¹' },
    { label: 'Estados Unidos', value: 'us', icon: 'ðŸ‡ºðŸ‡¸' },
    { label: 'Espanha', value: 'es', icon: 'ðŸ‡ªðŸ‡¸' },
    { label: 'FranÃ§a', value: 'fr', icon: 'ðŸ‡«ðŸ‡·' },
    { label: 'Alemanha', value: 'de', icon: 'ðŸ‡©ðŸ‡ª' }
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
    { label: 'Angular', value: 'angular', icon: 'ðŸ…°ï¸' },
    { label: 'React', value: 'react', icon: 'âš›ï¸' },
    { label: 'Vue', value: 'vue', icon: 'ðŸ’š' },
    { label: 'Svelte', value: 'svelte', icon: 'ðŸ”¥' },
    { label: 'Next.js', value: 'nextjs', icon: 'â–²' },
    { label: 'Nuxt.js', value: 'nuxtjs', icon: 'ðŸ’Ž' },
    { label: 'Remix', value: 'remix', icon: 'ðŸ’¿' },
    { label: 'Astro', value: 'astro', icon: 'ðŸš€' }
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
    { label: 'OpÃ§Ã£o 1', value: '1' },
    { label: 'OpÃ§Ã£o 2', value: '2' },
    { label: 'OpÃ§Ã£o 3', value: '3' }
  ];
}`;
  }

  get basicCode(): string {
    return `<muxima-select
  label="Linguagem de ProgramaÃ§Ã£o"
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
  label="Selecione mÃºltiplos"
  [(ngModel)]="values"
  [options]="options"
></muxima-select>

<!-- Clearable -->
<muxima-select
  [clearable]="true"
  label="Com botÃ£o limpar"
  [(ngModel)]="value"
  [options]="options"
></muxima-select>

<!-- With Prefix Icon -->
<muxima-select
  prefixIcon="ðŸŒ"
  label="PaÃ­s"
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
  errorMessage="Por favor, selecione uma opÃ§Ã£o"
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
