import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardCardComponent } from './card-card.component';

describe('CardCardComponent', () => {
  let component: CardCardComponent;
  let fixture: ComponentFixture<CardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
