import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderSliderComponent } from './slider-slider.component';

describe('SliderSliderComponent', () => {
  let component: SliderSliderComponent;
  let fixture: ComponentFixture<SliderSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
