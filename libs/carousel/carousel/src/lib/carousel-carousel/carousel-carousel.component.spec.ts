import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselCarouselComponent } from './carousel-carousel.component';

describe('CarouselCarouselComponent', () => {
  let component: CarouselCarouselComponent;
  let fixture: ComponentFixture<CarouselCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
