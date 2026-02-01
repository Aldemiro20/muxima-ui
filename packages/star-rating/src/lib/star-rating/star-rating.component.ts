import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'muxima-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() maxStars: number = 5;
  @Input() allowHalf: boolean = true;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: string = '#fbbf24';
  @Input() emptyColor: string = '#d1d5db';
  @Input() showCount: boolean = true;
  @Input() showLabel: boolean = false;
  @Input() customLabels: string[] = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente'];
  
  @Input()
  set rating(value: number) {
    this._rating = value;
    this.onChange(value);
  }
  get rating(): number {
    return this._rating;
  }
  
  @Output() ratingChange = new EventEmitter<number>();
  @Output() ratingHover = new EventEmitter<number>();
  
  private _rating: number = 0;
  hoverRating: number = 0;
  stars: number[] = [];
  
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.stars = Array(this.maxStars).fill(0).map((_, i) => i + 1);
  }

  writeValue(value: number): void {
    this._rating = value || 0;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onStarClick(star: number, event: MouseEvent): void {
    if (this.readonly || this.disabled) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const starWidth = rect.width;
    
    let newRating = star;
    
    if (this.allowHalf && clickPosition < starWidth / 2) {
      newRating = star - 0.5;
    }

    // Toggle off if clicking the same rating
    if (this._rating === newRating) {
      newRating = 0;
    }

    this._rating = newRating;
    this.onChange(this._rating);
    this.onTouched();
    this.ratingChange.emit(this._rating);
  }

  onStarHover(star: number, event: MouseEvent): void {
    if (this.readonly || this.disabled) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const hoverPosition = event.clientX - rect.left;
    const starWidth = rect.width;
    
    if (this.allowHalf && hoverPosition < starWidth / 2) {
      this.hoverRating = star - 0.5;
    } else {
      this.hoverRating = star;
    }

    this.ratingHover.emit(this.hoverRating);
  }

  onMouseLeave(): void {
    this.hoverRating = 0;
    this.ratingHover.emit(0);
  }

  getStarFill(star: number): 'full' | 'half' | 'empty' {
    const currentRating = this.hoverRating || this._rating;
    
    if (currentRating >= star) {
      return 'full';
    } else if (this.allowHalf && currentRating >= star - 0.5) {
      return 'half';
    }
    return 'empty';
  }

  getCurrentLabel(): string {
    const currentRating = Math.ceil(this.hoverRating || this._rating);
    if (currentRating > 0 && currentRating <= this.customLabels.length) {
      return this.customLabels[currentRating - 1];
    }
    return '';
  }

  trackByStar(index: number): number {
    return index;
  }
}
