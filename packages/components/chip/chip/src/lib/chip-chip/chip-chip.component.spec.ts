import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipChipComponent } from './chip-chip.component';

describe('ChipChipComponent', () => {
  let component: ChipChipComponent;
  let fixture: ComponentFixture<ChipChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
