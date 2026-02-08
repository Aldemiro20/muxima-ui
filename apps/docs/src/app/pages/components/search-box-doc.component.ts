import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from '@muxima-ui/search-box';

@Component({
  selector: 'app-search-box-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBoxComponent],
  templateUrl: './search-box-doc.component.html',
  styleUrls: ['./search-box-doc.component.scss']
})
export class SearchBoxDocComponent {
  searchValue1 = '';
  searchValue2 = '';
  searchValue3 = '';
  searchValue4 = '';
  searchValue5 = '';
  isLoading = false;

  onSearch(value: string): void {
    console.log('Pesquisando:', value);
  }

  onClear(): void {
    console.log('Pesquisa limpa');
  }

  simulateSearch(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getCodeExample(type: string): string {
    const examples: { [key: string]: string } = {
      basic: `<muxima-search-box
  placeholder="Pesquisar..."
  [(ngModel)]="searchValue"
  (search)="onSearch($event)">
</muxima-search-box>`,
      
      sizes: `<!-- Pequeno -->
<muxima-search-box
  placeholder="Pesquisar..."
  size="sm">
</muxima-search-box>

<!-- Médio (padrão) -->
<muxima-search-box
  placeholder="Pesquisar..."
  size="md">
</muxima-search-box>

<!-- Grande -->
<muxima-search-box
  placeholder="Pesquisar..."
  size="lg">
</muxima-search-box>`,
      
      variants: `<!-- Padrão -->
<muxima-search-box
  placeholder="Pesquisar..."
  variant="default">
</muxima-search-box>

<!-- Contornado -->
<muxima-search-box
  placeholder="Pesquisar..."
  variant="outlined">
</muxima-search-box>

<!-- Preenchido -->
<muxima-search-box
  placeholder="Pesquisar..."
  variant="filled">
</muxima-search-box>`,
      
      loading: `<muxima-search-box
  placeholder="Pesquisar produtos..."
  [(ngModel)]="searchValue"
  [loading]="isLoading"
  (search)="performSearch($event)">
</muxima-search-box>`,
      
      disabled: `<muxima-search-box
  placeholder="Pesquisa desabilitada"
  [disabled]="true">
</muxima-search-box>`,
      
      advanced: `<muxima-search-box
  placeholder="Pesquisar com debounce customizado..."
  [(ngModel)]="searchValue"
  [debounceTime]="500"
  [clearable]="true"
  (search)="onSearch($event)"
  (clear)="onClear()"
  (focus)="onFocus()"
  (blur)="onBlur()">
</muxima-search-box>`
    };
    return examples[type] || '';
  }
}
