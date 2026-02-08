import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataProductCardProductCardComponent } from './data-product-card-product-card.component';

describe('DataProductCardProductCardComponent', () => {
  let component: DataProductCardProductCardComponent;
  let fixture: ComponentFixture<DataProductCardProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataProductCardProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataProductCardProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
