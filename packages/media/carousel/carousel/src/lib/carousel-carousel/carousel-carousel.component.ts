import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselItem {
  image?: string;
  title?: string;
  description?: string;
  link?: string;
}

@Component({
  selector: 'muxima-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-carousel.component.html',
  styleUrls: ['./carousel-carousel.component.scss'],
})
export class CarouselCarouselComponent implements OnInit, OnDestroy {
  @Input() items: CarouselItem[] = [];
  @Input() autoPlay = true;
  @Input() interval = 5000;
  @Input() showArrows = true;
  @Input() showDots = true;
  @Input() height = '400px';
  @Input() animationType: 'slide' | 'fade' = 'slide';

  currentIndex = 0;
  private autoPlayInterval: any;
  isTransitioning = false;

  ngOnInit() {
    if (this.autoPlay && this.items.length > 1) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, this.interval);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  next() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    setTimeout(() => (this.isTransitioning = false), 500);
  }

  prev() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
    setTimeout(() => (this.isTransitioning = false), 500);
  }

  goToSlide(index: number) {
    if (this.isTransitioning || index === this.currentIndex) return;
    this.isTransitioning = true;
    this.currentIndex = index;
    setTimeout(() => (this.isTransitioning = false), 500);
  }

  onMouseEnter() {
    if (this.autoPlay) {
      this.stopAutoPlay();
    }
  }

  onMouseLeave() {
    if (this.autoPlay && this.items.length > 1) {
      this.startAutoPlay();
    }
  }
}
