import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressProgressComponent } from './progress-progress.component';

describe('ProgressProgressComponent', () => {
  let component: ProgressProgressComponent;
  let fixture: ComponentFixture<ProgressProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
