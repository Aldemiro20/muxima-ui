import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipTooltipComponent } from './tooltip-tooltip.component';

describe('TooltipTooltipComponent', () => {
  let component: TooltipTooltipComponent;
  let fixture: ComponentFixture<TooltipTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
