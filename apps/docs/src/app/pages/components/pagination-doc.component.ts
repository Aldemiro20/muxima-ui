import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'muxima-pagination-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-doc.component.html',
  styleUrls: ['./pagination-doc.component.scss']
})
export class PaginationDocComponent {
  // Basic Pagination
  currentPage = 1;
  totalPages = 10;
  itemsPerPage = 10;
  totalItems = 100;

  // Compact Pagination
  compactPage = 1;
  compactTotal = 5;

  // Simple Pagination
  simplePage = 3;
  simpleTotal = 20;

  // Minimal Pagination
  minimalPage = 1;
  minimalTotal = 8;

  // Rounded Pagination
  roundedPage = 4;
  roundedTotal = 12;

  // Outlined Pagination
  outlinedPage = 2;
  outlinedTotal = 15;

  pages: number[] = [];

  ngOnInit() {
    this.updatePages();
  }

  updatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Compact methods
  compactPrevious() {
    if (this.compactPage > 1) this.compactPage--;
  }

  compactNext() {
    if (this.compactPage < this.compactTotal) this.compactPage++;
  }

  // Simple methods
  simplePrevious() {
    if (this.simplePage > 1) this.simplePage--;
  }

  simpleNext() {
    if (this.simplePage < this.simpleTotal) this.simplePage++;
  }

  simpleGoTo(page: number) {
    if (page >= 1 && page <= this.simpleTotal) {
      this.simplePage = page;
    }
  }

  // Minimal methods
  minimalPrevious() {
    if (this.minimalPage > 1) this.minimalPage--;
  }

  minimalNext() {
    if (this.minimalPage < this.minimalTotal) this.minimalPage++;
  }

  // Rounded methods
  roundedPrevious() {
    if (this.roundedPage > 1) this.roundedPage--;
  }

  roundedNext() {
    if (this.roundedPage < this.roundedTotal) this.roundedPage++;
  }

  roundedGoTo(page: number) {
    if (page >= 1 && page <= this.roundedTotal) {
      this.roundedPage = page;
    }
  }

  // Outlined methods
  outlinedPrevious() {
    if (this.outlinedPage > 1) this.outlinedPage--;
  }

  outlinedNext() {
    if (this.outlinedPage < this.outlinedTotal) this.outlinedPage++;
  }

  outlinedGoTo(page: number) {
    if (page >= 1 && page <= this.outlinedTotal) {
      this.outlinedPage = page;
    }
  }

  getVisiblePages(): (number | string)[] {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= this.totalPages; i++) {
      if (i === 1 || i === this.totalPages || (i >= this.currentPage - delta && i <= this.currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach(i => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }

  getSimplePages(): number[] {
    const delta = 1;
    const range: number[] = [];
    
    for (let i = Math.max(1, this.simplePage - delta); i <= Math.min(this.simpleTotal, this.simplePage + delta); i++) {
      range.push(i);
    }
    
    return range;
  }

  getRoundedPages(): number[] {
    const delta = 2;
    const range: number[] = [];
    
    for (let i = Math.max(1, this.roundedPage - delta); i <= Math.min(this.roundedTotal, this.roundedPage + delta); i++) {
      range.push(i);
    }
    
    return range;
  }

  getOutlinedPages(): number[] {
    const delta = 2;
    const range: number[] = [];
    
    for (let i = Math.max(1, this.outlinedPage - delta); i <= Math.min(this.outlinedTotal, this.outlinedPage + delta); i++) {
      range.push(i);
    }
    
    return range;
  }

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
      install: `npm install @muxima-ui/pagination`,
      
      import: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  // ...
})`,

      basic: `<nav class="pagination">
  <button class="pagination-btn pagination-prev" 
          (click)="previousPage()" 
          [disabled]="currentPage === 1">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path d="M10 12L6 8L10 4" stroke-width="2" stroke-linecap="round"/>
    </svg>
    Anterior
  </button>

  <button *ngFor="let page of getVisiblePages()"
          class="pagination-btn"
          [class.pagination-active]="page === currentPage"
          [class.pagination-dots]="page === '...'"
          [disabled]="page === '...'"
          (click)="page !== '...' && goToPage(+page)">
    {{ page }}
  </button>

  <button class="pagination-btn pagination-next" 
          (click)="nextPage()" 
          [disabled]="currentPage === totalPages">
    Próximo
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path d="M6 4L10 8L6 12" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>
</nav>`,

      basicTs: `export class MyComponent {
  currentPage = 1;
  totalPages = 10;
  totalItems = 100;

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  getVisiblePages(): (number | string)[] {
    // Implementação para mostrar ... entre páginas
  }
}`,

      compact: `<nav class="pagination pagination-compact">
  <button class="pagination-btn" 
          (click)="compactPrevious()" 
          [disabled]="compactPage === 1">
    ‹
  </button>
  <span class="pagination-info">{{ compactPage }} / {{ compactTotal }}</span>
  <button class="pagination-btn" 
          (click)="compactNext()" 
          [disabled]="compactPage === compactTotal">
    ›
  </button>
</nav>`,

      simple: `<nav class="pagination pagination-simple">
  <button class="pagination-btn" 
          (click)="simplePrevious()" 
          [disabled]="simplePage === 1">
    ← Anterior
  </button>

  <button *ngFor="let page of getSimplePages()"
          class="pagination-btn"
          [class.pagination-active]="page === simplePage"
          (click)="simpleGoTo(page)">
    {{ page }}
  </button>

  <button class="pagination-btn" 
          (click)="simpleNext()" 
          [disabled]="simplePage === simpleTotal">
    Próximo →
  </button>
</nav>`,

      minimal: `<nav class="pagination pagination-minimal">
  <button (click)="minimalPrevious()" [disabled]="minimalPage === 1">
    Anterior
  </button>
  <span>Página {{ minimalPage }} de {{ minimalTotal }}</span>
  <button (click)="minimalNext()" [disabled]="minimalPage === minimalTotal">
    Próximo
  </button>
</nav>`,

      rounded: `<nav class="pagination pagination-rounded">
  <button class="pagination-btn" 
          (click)="roundedPrevious()" 
          [disabled]="roundedPage === 1">
    ‹
  </button>

  <button *ngFor="let page of getRoundedPages()"
          class="pagination-btn"
          [class.pagination-active]="page === roundedPage"
          (click)="roundedGoTo(page)">
    {{ page }}
  </button>

  <button class="pagination-btn" 
          (click)="roundedNext()" 
          [disabled]="roundedPage === roundedTotal">
    ›
  </button>
</nav>`,

      outlined: `<nav class="pagination pagination-outlined">
  <button class="pagination-btn" 
          (click)="outlinedPrevious()" 
          [disabled]="outlinedPage === 1">
    ← Anterior
  </button>

  <button *ngFor="let page of getOutlinedPages()"
          class="pagination-btn"
          [class.pagination-active]="page === outlinedPage"
          (click)="outlinedGoTo(page)">
    {{ page }}
  </button>

  <button class="pagination-btn" 
          (click)="outlinedNext()" 
          [disabled]="outlinedPage === outlinedTotal">
    Próximo →
  </button>
</nav>`,

      scss: `.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #667eea;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.pagination-active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }
  }
}`
    };

    return examples[type] || '';
  }
}
