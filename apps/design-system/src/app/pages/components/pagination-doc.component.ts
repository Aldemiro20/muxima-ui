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
  currentPage = 1;
  totalPages = 10;
  itemsPerPage = 10;
  totalItems = 100;

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

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode(): string {
    return `import { PaginationComponent } from '@agt-ui/pagination';

@Component({
  standalone: true,
  imports: [PaginationComponent],
  // ...
})`;
  }

  get basicCode(): string {
    return `<nav class="pagination">
  <button class="pagination-btn" (click)="previousPage()" [disabled]="currentPage === 1">
    ‹ Anterior
  </button>
  
  <button *ngFor="let page of pages"
          class="pagination-btn"
          [class.active]="page === currentPage"
          (click)="goToPage(page)">
    {{ page }}
  </button>
  
  <button class="pagination-btn" (click)="nextPage()" [disabled]="currentPage === totalPages">
    Próximo ›
  </button>
</nav>`;
  }
}
