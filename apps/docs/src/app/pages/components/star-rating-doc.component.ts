import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from '@muxima-ui/star-rating';

@Component({
  selector: 'app-star-rating-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, StarRatingComponent],
  templateUrl: './star-rating-doc.component.html',
  styleUrls: ['./star-rating-doc.component.scss']
})
export class StarRatingDocComponent {
  // Exemplo 1: Rating básico
  basicRating: number = 0;

  // Exemplo 2: Rating com half-stars
  halfRating: number = 3.5;

  // Exemplo 3: Rating readonly
  readonlyRating: number = 4.5;

  // Exemplo 4: Rating com labels
  labelRating: number = 0;

  // Exemplo 5: Tamanhos diferentes
  smallRating: number = 3;
  mediumRating: number = 4;
  largeRating: number = 5;

  // Exemplo 6: Cores customizadas
  customColorRating: number = 0;

  // Exemplo 7: Produto rating
  productRating: number = 4.2;
  productReviews: number = 127;

  // Exemplo 8: User feedback
  userFeedback: { rating: number; label: string } | null = null;

  // Exemplo 9: Rating com estatísticas
  ratingsData = [
    { stars: 5, count: 150, percentage: 60 },
    { stars: 4, count: 50, percentage: 20 },
    { stars: 3, count: 25, percentage: 10 },
    { stars: 2, count: 15, percentage: 6 },
    { stars: 1, count: 10, percentage: 4 }
  ];
  averageRating: number = 4.2;
  totalReviews: number = 250;

  customLabels = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente'];

  onRatingChange(rating: number): void {
    console.log('Rating mudou para:', rating);
  }

  onRatingHover(rating: number): void {
    console.log('Hovering rating:', rating);
  }

  submitFeedback(rating: number): void {
    const labels = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente'];
    const label = labels[Math.ceil(rating) - 1];
    this.userFeedback = { rating, label };
    console.log('Feedback enviado:', this.userFeedback);
  }

  typescriptCode = `import { StarRatingComponent } from '@muxima-ui/star-rating';

export class MyComponent {
  rating: number = 0;
  customLabels = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente'];

  onRatingChange(rating: number) {
    console.log('Nova avaliação:', rating);
    this.saveRating(rating);
  }

  onRatingHover(rating: number) {
    console.log('Hovering:', rating);
  }

  async saveRating(rating: number) {
    await this.api.submitRating({
      productId: this.productId,
      rating: rating,
      userId: this.userId
    });
  }
}`;

  htmlCode = `<!-- Rating básico -->
<muxima-star-rating
  [(ngModel)]="rating"
  [maxStars]="5"
  [allowHalf]="true"
  (ratingChange)="onRatingChange($event)">
</muxima-star-rating>

<!-- Rating readonly -->
<muxima-star-rating
  [rating]="4.5"
  [readonly]="true"
  [showCount]="true">
</muxima-star-rating>

<!-- Rating com labels -->
<muxima-star-rating
  [(ngModel)]="rating"
  [showLabel]="true"
  [customLabels]="customLabels"
  size="large">
</muxima-star-rating>

<!-- Cores customizadas -->
<muxima-star-rating
  [(ngModel)]="rating"
  color="#f43f5e"
  emptyColor="#fecdd3">
</muxima-star-rating>`;

  productCode = `// Exemplo de avaliação de produto
<div class="product-rating">
  <muxima-star-rating
    [rating]="product.averageRating"
    [readonly]="true"
    size="small">
  </muxima-star-rating>
  <span class="rating-text">
    {{ product.averageRating }} ({{ product.reviewCount }} avaliações)
  </span>
</div>

// Formulário de avaliação
<div class="rating-form">
  <h3>Avalie este produto</h3>
  <muxima-star-rating
    [(ngModel)]="userRating"
    [showLabel]="true"
    size="large"
    (ratingChange)="submitRating($event)">
  </muxima-star-rating>
</div>`;

  stylingCode = `// Customizar via CSS
::ng-deep muxima-star-rating {
  .star-icon {
    filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3));
  }

  .rating-label {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    font-weight: 700;
  }
}`;
}
